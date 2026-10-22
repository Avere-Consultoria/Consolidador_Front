import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Spinner, TextField, toast, CabecalhoPagina } from 'avere-ui';
import { Search, Lock, PanelRightOpen, ChevronUp, ChevronDown } from 'lucide-react';
import { supabase } from '../services/supabase';
import { padronizarTaxaExibicao } from '../utils/formatters';
import { normalizarChave } from '../config/bibliotecaSchema';
import { DrawerCanonico, type CanonicoDetalhe } from '../components/masterAtivos/DrawerCanonico';
import { ModalFundirCanonicos, type CanonicoOpcaoDestino } from '../components/masterAtivos/ModalFundirCanonicos';

// ─── Master Ativos = TABELA DE TRABALHO (22/10/2026) ──────────────────────────
// Uma linha por canônico, um dado por coluna, edição na própria célula.
// Filas por pendência (sem classe / crédito sem emissor / bancário sem FGC),
// ordenadas pelo peso na base (R$ e nº de clientes — RPC master_exposicao_ativos).
// Toda edição do master trava o campo no banco (gatilho trava_campos_curados):
// o sync não sobrescreve depois. Classe também vai para a biblioteca (durável),
// mesma regra do DrawerCanonico, que segue disponível para taxa/detalhes/fundir.

function formatarDataBR(iso: string): string {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

function formatarValor(v: number | undefined): string {
    if (v == null) return '—';
    if (Math.abs(v) >= 1e6) return `R$ ${(v / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi`;
    if (Math.abs(v) >= 1e3) return `R$ ${(v / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} mil`;
    return `R$ ${v.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
}

// ── Tipos ─────────────────────────────────────────────────────────────────
interface VisaoInstitucional {
    instituicao_origem: 'BTG' | 'XP' | 'AVENUE' | 'AGORA';
    codigo_identificador: string;
    tipo_identificador: string;
    nome_ativo: string;
    emissor_original: string | null;
    classe_original: string | null;
    liquidez_api_original: string | null;
    vencimento_api_original: string | null;
    index_rate: string | null;
    taxa_formatada: string | null;
}

interface AtivoCanonicoMaster {
    id: string;
    nome_canonico: string;
    classe_avere: string;
    liquidez_avere: string;
    data_vencimento: string;
    emissor_id: string;
    taxa_canonica: string;
    taxa_formatada: string;
    benchmark_canonico: string;
    sub_tipo_canonico: string;
    is_fii: boolean;
    is_coe: boolean;
    notas: string;
    conglomerado_id: string;
    campos_travados: string[];
    visoes: VisaoInstitucional[];
}

type Campo = 'classe_avere' | 'emissor_id' | 'conglomerado_id' | 'liquidez_avere';
type Fila = 'SEM_CLASSE' | 'CREDITO_SEM_EMISSOR' | 'BANCARIO_SEM_FGC' | 'TODOS';
type ColunaOrdem = 'nome' | 'sub_tipo' | 'valor' | 'clientes' | 'classe' | 'vencimento';

// Sub-tipos do mundo bancário (FGC) → risco = conglomerado; demais → emissor
const SUBTIPOS_BANCARIO = new Set(['CDB', 'LCI', 'LCA', 'LF', 'LIG', 'RDB', 'LH', 'LC', 'LCD', 'DPGE', 'RDC', 'LFSN']);
// Crédito privado: emissor é o que alimenta o gráfico "Crédito privado (por emissor)".
const SUBTIPOS_CREDITO = new Set(['DEB', 'CRA', 'CRI', 'FIDC', 'NP', 'NC', 'CCB', 'CCI', 'CDCA']);
const st = (s: string) => (s || '').toUpperCase().trim();
const isBancario = (s: string) => SUBTIPOS_BANCARIO.has(st(s));
const isCredito = (s: string) => SUBTIPOS_CREDITO.has(st(s));

function faltas(c: AtivoCanonicoMaster): string[] {
    const f: string[] = [];
    if (!c.classe_avere) f.push('classe');
    if (isCredito(c.sub_tipo_canonico) && !c.emissor_id) f.push('emissor');
    if (isBancario(c.sub_tipo_canonico) && !c.conglomerado_id) f.push('FGC');
    if (c.liquidez_avere === '' && !c.data_vencimento) f.push('liquidez');
    return f;
}

const FILAS: { id: Fila; label: string; filtro: (c: AtivoCanonicoMaster) => boolean }[] = [
    { id: 'SEM_CLASSE',          label: 'Sem classe',          filtro: c => !c.classe_avere },
    { id: 'CREDITO_SEM_EMISSOR', label: 'Crédito sem emissor', filtro: c => isCredito(c.sub_tipo_canonico) && !c.emissor_id },
    { id: 'BANCARIO_SEM_FGC',    label: 'Bancário sem FGC',    filtro: c => isBancario(c.sub_tipo_canonico) && !c.conglomerado_id },
    { id: 'TODOS',               label: 'Todos',               filtro: () => true },
];

const POR_PAGINA = 100;

type Exposicao = Map<string, { valor: number; clientes: number }>;
const expoDe = (m: Exposicao | null, id: string) => m?.get(id);

const CORES_INST: Record<string, { bg: string; fg: string }> = {
    BTG:    { bg: 'var(--color-info-bg)', fg: 'var(--color-info-text)' },
    XP:     { bg: 'var(--color-warning-bg)', fg: 'var(--color-warning-text)' },
    AVENUE: { bg: 'var(--color-warning-bg)', fg: 'var(--color-warning-text)' },
    AGORA:  { bg: 'var(--color-success-bg)', fg: 'var(--color-success-text)' },
};

// ── Estilos da planilha ───────────────────────────────────────────────────
const th: React.CSSProperties = {
    position: 'sticky', top: 0, zIndex: 2, background: 'var(--gray-50)',
    padding: '10px 12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.04em', color: 'var(--color-text-muted)', textAlign: 'left', whiteSpace: 'nowrap',
    borderBottom: '1px solid var(--color-border-subtle)', borderRight: '1px solid var(--color-border-subtle)',
};
const td: React.CSSProperties = {
    padding: '0 12px', height: '38px', fontSize: '13px', whiteSpace: 'nowrap', verticalAlign: 'middle',
    borderBottom: '1px solid var(--color-border-subtle)', borderRight: '1px solid var(--color-border-subtle)',
    color: 'var(--color-text-primary)',
};
const tdLeitura: React.CSSProperties = { ...td, color: 'var(--color-text-secondary)', background: 'var(--gray-50)' };
const editor: React.CSSProperties = {
    width: '100%', height: '30px', boxSizing: 'border-box', padding: '0 8px', fontSize: '13px',
    border: '1px solid var(--color-primaria)', borderRadius: '4px', outline: 'none',
    fontFamily: 'var(--font-family)', background: 'var(--color-white)',
};
const filtroSel: React.CSSProperties = {
    height: '36px', padding: '0 10px', fontSize: '13px', borderRadius: '8px',
    border: '1px solid var(--color-border-default)', background: 'var(--color-white)', fontFamily: 'var(--font-family)',
};

export default function MasterAtivos() {
    const [canonicos, setCanonicos] = useState<AtivoCanonicoMaster[]>([]);
    const [emissores, setEmissores] = useState<{ id: string; nome_fantasia: string }[]>([]);
    const [conglomerados, setConglomerados] = useState<{ id: string; nome_lider: string }[]>([]);
    const [classesAvere, setClassesAvere] = useState<{ nome: string }[]>([]);
    const [exposicao, setExposicao] = useState<Exposicao | null>(null);
    const [exposicaoErro, setExposicaoErro] = useState(false);
    const [loading, setLoading] = useState(true);

    const [fila, setFila] = useState<Fila>('SEM_CLASSE');
    const [filtroClasse, setFiltroClasse] = useState('');
    const [filtroSubtipo, setFiltroSubtipo] = useState('');
    const [filtroInst, setFiltroInst] = useState('');
    const [busca, setBusca] = useState('');
    const [ordem, setOrdem] = useState<{ col: ColunaOrdem; desc: boolean }>({ col: 'valor', desc: true });
    const [pagina, setPagina] = useState(0);

    const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
    const [editando, setEditando] = useState<{ id: string; campo: Campo } | null>(null);
    const [loteCampo, setLoteCampo] = useState<Campo>('classe_avere');
    const [loteValor, setLoteValor] = useState('');
    const [aplicandoLote, setAplicandoLote] = useState(false);

    const [drawerCanonicoId, setDrawerCanonicoId] = useState<string | null>(null);
    const [modalFundirAberto, setModalFundirAberto] = useState(false);

    // Deep-link da fila de Pendências (?focar=<id>) → abre o drawer do ativo direto.
    const [searchParams, setSearchParams] = useSearchParams();
    const focar = searchParams.get('focar');
    useEffect(() => {
        if (focar && canonicos.some(c => c.id === focar)) {
            setDrawerCanonicoId(focar);
            searchParams.delete('focar');
            setSearchParams(searchParams, { replace: true });
        }
    }, [focar, canonicos]);

    // Busca TODAS as linhas paginando — o Supabase corta CADA request em 1000 linhas.
    const selectAll = async (tabela: string, colunas: string, ordemCol?: string) => {
        const PAGE = 1000;
        const acc: any[] = [];
        for (let from = 0; ; from += PAGE) {
            let q = supabase.from(tabela).select(colunas).range(from, from + PAGE - 1);
            if (ordemCol) q = q.order(ordemCol);
            const { data, error } = await q;
            if (error) throw error;
            acc.push(...(data ?? []));
            if (!data || data.length < PAGE) break;
        }
        return acc;
    };

    const carregarExposicao = async () => {
        setExposicaoErro(false);
        const { data, error } = await supabase.rpc('master_exposicao_ativos');
        if (error) { console.error('exposição:', error); setExposicaoErro(true); return; }
        // [[ativo_id, valor, clientes], ...] — um jsonb só (conjunto de linhas era cortado em 1000).
        setExposicao(new Map(((data ?? []) as [string, number, number][]).map(([id, valor, clientes]) => [id, { valor: Number(valor), clientes }])));
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [canonicosData, dicionarioData, emissoresData, conglomeradosData, classesRes] = await Promise.all([
                selectAll('ativos_canonicos', 'id, nome_canonico, classe_avere, liquidez_avere, data_vencimento, emissor_id, conglomerado_id, taxa_canonica, taxa_formatada, benchmark_canonico, sub_tipo_canonico, is_fii, is_coe, notas, campos_travados', 'nome_canonico'),
                selectAll('dicionario_ativos', 'ativo_canonico_id, instituicao_origem, codigo_identificador, tipo_identificador, nome_ativo, emissor_original, classe_original, liquidez_api_original, vencimento_api_original, index_rate, taxa_formatada'),
                selectAll('dicionario_emissores', 'id, nome_fantasia', 'nome_fantasia'),
                selectAll('dicionario_conglomerados', 'id, nome_lider', 'nome_lider'),
                supabase.from('dicionario_classes').select('nome').order('ordem_exibicao'),
            ]);
            if (classesRes.error) throw classesRes.error;
            setEmissores(emissoresData || []);
            setConglomerados(conglomeradosData || []);
            setClassesAvere(classesRes.data || []);

            const visoesPorCanonico = new Map<string, VisaoInstitucional[]>();
            (dicionarioData || []).forEach((d: any) => {
                if (!d.ativo_canonico_id) return;
                const arr = visoesPorCanonico.get(d.ativo_canonico_id) ?? [];
                arr.push(d as VisaoInstitucional);
                visoesPorCanonico.set(d.ativo_canonico_id, arr);
            });

            setCanonicos((canonicosData || []).map((c: any) => ({
                ...c,
                classe_avere:       c.classe_avere || '',
                liquidez_avere:     c.liquidez_avere ?? '',
                data_vencimento:    c.data_vencimento || '',
                emissor_id:         c.emissor_id || '',
                taxa_canonica:      c.taxa_canonica || '',
                taxa_formatada:     c.taxa_formatada || '',
                benchmark_canonico: c.benchmark_canonico || '',
                sub_tipo_canonico:  c.sub_tipo_canonico || '',
                notas:              c.notas || '',
                conglomerado_id:    c.conglomerado_id || '',
                campos_travados:    c.campos_travados ?? [],
                visoes:             visoesPorCanonico.get(c.id) ?? [],
            })));
        } catch (err) {
            console.error('Erro ao buscar canônicos:', err);
            toast.error('Erro ao carregar os dados.');
        } finally {
            setLoading(false);
        }
    };

    // Exposição depois da lista: em paralelo as duas disputam o banco e a agregação
    // passava do teto de 8 s do PostgREST.
    useEffect(() => { fetchData().then(carregarExposicao); }, []);
    useEffect(() => { setPagina(0); setSelecionados(new Set()); }, [fila, filtroClasse, filtroSubtipo, filtroInst, busca]);

    const emissoresMap     = useMemo(() => new Map(emissores.map(e => [e.id, e.nome_fantasia])), [emissores]);
    const conglomeradosMap = useMemo(() => new Map(conglomerados.map(c => [c.id, c.nome_lider])), [conglomerados]);
    const emissorPorNome   = useMemo(() => new Map(emissores.map(e => [e.nome_fantasia.toLowerCase(), e.id])), [emissores]);
    const conglomPorNome   = useMemo(() => new Map(conglomerados.map(c => [c.nome_lider.toLowerCase(), c.id])), [conglomerados]);
    const subtipos = useMemo(() => Array.from(new Set(canonicos.map(c => c.sub_tipo_canonico).filter(Boolean))).sort(), [canonicos]);

    const expo = (id: string) => exposicao?.get(id);

    // ── Placar em R$ (o que os gráficos enxergam) ─────────────────────────
    const placar = useMemo(() => {
        if (!exposicao) return null;
        const p = { total: 0, comClasse: 0, credito: 0, creditoOk: 0, bancario: 0, bancarioOk: 0 };
        for (const c of canonicos) {
            const v = exposicao.get(c.id)?.valor ?? 0;
            if (!v) continue;
            p.total += v;
            if (c.classe_avere) p.comClasse += v;
            if (isCredito(c.sub_tipo_canonico)) { p.credito += v; if (c.emissor_id) p.creditoOk += v; }
            if (isBancario(c.sub_tipo_canonico)) { p.bancario += v; if (c.conglomerado_id) p.bancarioOk += v; }
        }
        return p;
    }, [canonicos, exposicao]);

    const contagemFila = useMemo(() => Object.fromEntries(FILAS.map(f => [f.id, canonicos.filter(f.filtro).length])), [canonicos]);

    const linhas = useMemo(() => {
        const q = busca.trim().toLowerCase();
        const filtroFila = FILAS.find(f => f.id === fila)!.filtro;
        const base = canonicos.filter(c => {
            if (!filtroFila(c)) return false;
            if (filtroClasse && (filtroClasse === '—' ? !!c.classe_avere : c.classe_avere !== filtroClasse)) return false;
            if (filtroSubtipo && c.sub_tipo_canonico !== filtroSubtipo) return false;
            if (filtroInst && !c.visoes.some(v => v.instituicao_origem === filtroInst)) return false;
            if (!q) return true;
            const ident = c.visoes.map(v => v.codigo_identificador).join(' ');
            const risco = c.emissor_id ? emissoresMap.get(c.emissor_id) ?? '' : (c.conglomerado_id ? conglomeradosMap.get(c.conglomerado_id) ?? '' : '');
            const emiOrig = c.visoes.map(v => v.emissor_original ?? '').join(' ');
            return `${c.nome_canonico} ${ident} ${risco} ${emiOrig}`.toLowerCase().includes(q);
        });
        const chave = (c: AtivoCanonicoMaster): string | number => {
            switch (ordem.col) {
                case 'valor':      return expoDe(exposicao, c.id)?.valor ?? -1;
                case 'clientes':   return expoDe(exposicao, c.id)?.clientes ?? -1;
                case 'sub_tipo':   return c.sub_tipo_canonico;
                case 'classe':     return c.classe_avere;
                case 'vencimento': return c.data_vencimento || '9999';
                default:           return c.nome_canonico.toLowerCase();
            }
        };
        return base.sort((a, b) => {
            const x = chave(a), y = chave(b);
            const r = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), 'pt-BR');
            return ordem.desc ? -r : r;
        });
    }, [canonicos, fila, filtroClasse, filtroSubtipo, filtroInst, busca, ordem, exposicao, emissoresMap, conglomeradosMap]);

    const paginas = Math.max(1, Math.ceil(linhas.length / POR_PAGINA));
    const visiveis = linhas.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA);

    // ── Gravação (célula e lote) ──────────────────────────────────────────
    // Classe vai também para a biblioteca (durável), como no DrawerCanonico.
    const gravarBiblioteca = async (itens: AtivoCanonicoMaster[], classe: string | null) => {
        const linhasBib = itens.flatMap(c => {
            const chave = c.visoes.map(v => normalizarChave(v.codigo_identificador)).find(Boolean);
            return chave ? [{ chave, sub_tipo: c.sub_tipo_canonico || null, nome_ref: c.nome_canonico || null, classe_avere: classe, fonte: 'manual', atualizado_em: new Date().toISOString() }] : [];
        });
        if (linhasBib.length) {
            const { error } = await supabase.from('biblioteca_ativos').upsert(linhasBib, { onConflict: 'chave' });
            if (error) toast.warning(`Classe salva, mas a biblioteca não atualizou: ${error.message}`);
        }
    };

    const aplicarLocal = (ids: string[], patch: Partial<AtivoCanonicoMaster>, campo: Campo) =>
        setCanonicos(prev => prev.map(c => ids.includes(c.id)
            ? { ...c, ...patch, campos_travados: Array.from(new Set([...c.campos_travados, campo])) }
            : c));

    const gravar = async (itens: AtivoCanonicoMaster[], campo: Campo, valor: string) => {
        const ids = itens.map(c => c.id);
        const anteriores = new Map(itens.map(c => [c.id, c]));
        const valorDb = valor === '' ? null : valor;
        aplicarLocal(ids, { [campo]: valor } as Partial<AtivoCanonicoMaster>, campo);
        const { error } = await supabase.from('ativos_canonicos').update({ [campo]: valorDb }).in('id', ids);
        if (error) {
            setCanonicos(prev => prev.map(c => anteriores.get(c.id) ?? c));
            toast.error(`Não salvou: ${error.message}`);
            return false;
        }
        if (campo === 'classe_avere') await gravarBiblioteca(itens, valorDb);
        return true;
    };

    const aplicarLote = async () => {
        const itens = canonicos.filter(c => selecionados.has(c.id));
        let alvo = itens;
        let valor = loteValor;
        if (loteCampo === 'emissor_id') {
            alvo = itens.filter(c => !isBancario(c.sub_tipo_canonico));
            valor = emissorPorNome.get(loteValor.trim().toLowerCase()) ?? '';
            if (loteValor.trim() && !valor) { toast.error('Esse emissor não existe no dicionário.'); return; }
        }
        if (loteCampo === 'conglomerado_id') {
            alvo = itens.filter(c => isBancario(c.sub_tipo_canonico));
            valor = conglomPorNome.get(loteValor.trim().toLowerCase()) ?? '';
            if (loteValor.trim() && !valor) { toast.error('Esse conglomerado não existe no dicionário.'); return; }
        }
        if (!alvo.length) { toast.warning('Nenhum dos selecionados aceita esse campo.'); return; }
        setAplicandoLote(true);
        const ok = await gravar(alvo, loteCampo, valor);
        setAplicandoLote(false);
        if (ok) {
            toast.success(`${alvo.length} ativo(s) atualizado(s)${alvo.length < itens.length ? ` — ${itens.length - alvo.length} não aceitam esse campo` : ''}.`);
            setSelecionados(new Set());
            setLoteValor('');
        }
    };

    const alternarOrdem = (col: ColunaOrdem) =>
        setOrdem(o => o.col === col ? { col, desc: !o.desc } : { col, desc: col === 'valor' || col === 'clientes' });

    const todosVisiveisMarcados = visiveis.length > 0 && visiveis.every(c => selecionados.has(c.id));
    const marcarVisiveis = () => setSelecionados(prev => {
        const n = new Set(prev);
        if (todosVisiveisMarcados) visiveis.forEach(c => n.delete(c.id)); else visiveis.forEach(c => n.add(c.id));
        return n;
    });

    const canonicoSelecionado: CanonicoDetalhe | null = useMemo(
        () => (drawerCanonicoId ? canonicos.find(c => c.id === drawerCanonicoId) ?? null : null),
        [drawerCanonicoId, canonicos]);
    const candidatosDestino: CanonicoOpcaoDestino[] = useMemo(() => {
        if (!drawerCanonicoId) return [];
        return canonicos.filter(c => c.id !== drawerCanonicoId).map(c => ({
            id: c.id, nome_canonico: c.nome_canonico, classe_avere: c.classe_avere || null,
            instituicoes_visoes: Array.from(new Set(c.visoes.map(v => v.instituicao_origem))),
        }));
    }, [drawerCanonicoId, canonicos]);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    const pct = (a: number, b: number) => (b ? `${Math.round(a / b * 100)}%` : '—');
    const Th = ({ col, children, alinhar }: { col?: ColunaOrdem; children: React.ReactNode; alinhar?: 'right' }) => (
        <th style={{ ...th, textAlign: alinhar ?? 'left', cursor: col ? 'pointer' : 'default' }} onClick={col ? () => alternarOrdem(col) : undefined}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {children}
                {col && ordem.col === col && (ordem.desc ? <ChevronDown size={12} /> : <ChevronUp size={12} />)}
            </span>
        </th>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <style>{`
                .mt-row:hover td { background: var(--color-accent-subtle); }
                .mt-cel { cursor: text; }
                .mt-cel:hover { box-shadow: inset 0 0 0 1px var(--color-primaria); }
            `}</style>

            <CabecalhoPagina
                titulo="Master de Ativos"
                acoes={<TextField leftIcon={Search} placeholder="Buscar ativo, código ou emissor..." value={busca} onChange={e => setBusca(e.target.value)} style={{ width: 300 }} />}
            />

            {/* ── Placar em R$ ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px' }}>
                {[
                    { rotulo: 'Patrimônio com classe', valor: placar ? pct(placar.comClasse, placar.total) : null, sub: placar ? `${formatarValor(placar.total - placar.comClasse)} sem classe` : null },
                    { rotulo: 'Crédito privado com emissor', valor: placar ? pct(placar.creditoOk, placar.credito) : null, sub: placar ? `${formatarValor(placar.credito - placar.creditoOk)} em aberto` : null },
                    { rotulo: 'Bancário com conglomerado FGC', valor: placar ? pct(placar.bancarioOk, placar.bancario) : null, sub: placar ? `${formatarValor(placar.bancario - placar.bancarioOk)} em aberto` : null },
                    { rotulo: 'Ativos na fila atual', valor: String(linhas.length), sub: `de ${canonicos.length} canônicos` },
                ].map(k => (
                    <div key={k.rotulo} style={{ background: 'var(--color-white)', border: '1px solid var(--color-border-subtle)', borderRadius: '10px', padding: '12px 16px' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{k.rotulo}</div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-secundaria)' }}>
                            {k.valor ?? (exposicaoErro ? '—' : <Spinner size="sm" />)}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{k.sub ?? (exposicaoErro ? 'valor na base indisponível' : 'calculando…')}</div>
                    </div>
                ))}
            </div>

            {/* ── Filas + filtros ── */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                {FILAS.map(f => {
                    const ativa = fila === f.id;
                    return (
                        <button key={f.id} onClick={() => setFila(f.id)} style={{
                            height: '36px', padding: '0 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                            border: `1px solid ${ativa ? 'var(--color-secundaria)' : 'var(--color-border-default)'}`,
                            background: ativa ? 'var(--color-secundaria)' : 'var(--color-white)',
                            color: ativa ? 'var(--color-white)' : 'var(--color-text-secondary)',
                        }}>
                            {f.label} · {contagemFila[f.id]}
                        </button>
                    );
                })}
                <span style={{ flex: 1 }} />
                <select style={filtroSel} value={filtroClasse} onChange={e => setFiltroClasse(e.target.value)}>
                    <option value="">Classe: todas</option>
                    <option value="—">Classe: sem classe</option>
                    {classesAvere.map(c => <option key={c.nome} value={c.nome}>{c.nome}</option>)}
                </select>
                <select style={filtroSel} value={filtroSubtipo} onChange={e => setFiltroSubtipo(e.target.value)}>
                    <option value="">Sub-tipo: todos</option>
                    {subtipos.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select style={filtroSel} value={filtroInst} onChange={e => setFiltroInst(e.target.value)}>
                    <option value="">Instituição: todas</option>
                    {['BTG', 'XP', 'AGORA', 'AVENUE'].map(i => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>

            {/* ── Barra de lote ── */}
            {selecionados.size > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', background: 'var(--color-info-bg)', color: 'var(--color-info-text)', fontSize: '13px', fontWeight: 600 }}>
                    <span>{selecionados.size} selecionado(s)</span>
                    <select style={filtroSel} value={loteCampo} onChange={e => { setLoteCampo(e.target.value as Campo); setLoteValor(''); }}>
                        <option value="classe_avere">Definir classe Avere</option>
                        <option value="emissor_id">Definir emissor</option>
                        <option value="conglomerado_id">Definir conglomerado FGC</option>
                        <option value="liquidez_avere">Definir liquidez (D+)</option>
                    </select>
                    {loteCampo === 'classe_avere' && (
                        <select style={filtroSel} value={loteValor} onChange={e => setLoteValor(e.target.value)}>
                            <option value="">— (limpar)</option>
                            {classesAvere.map(c => <option key={c.nome} value={c.nome}>{c.nome}</option>)}
                        </select>
                    )}
                    {(loteCampo === 'emissor_id' || loteCampo === 'conglomerado_id') && (
                        <input list={loteCampo === 'emissor_id' ? 'mt-emissores' : 'mt-conglomerados'} style={{ ...filtroSel, width: 260 }}
                            placeholder="Digite para buscar…" value={loteValor} onChange={e => setLoteValor(e.target.value)} />
                    )}
                    {loteCampo === 'liquidez_avere' && (
                        <input type="number" min={0} style={{ ...filtroSel, width: 90 }} placeholder="D+" value={loteValor} onChange={e => setLoteValor(e.target.value)} />
                    )}
                    <Button variant="solid" onClick={aplicarLote} disabled={aplicandoLote}>{aplicandoLote ? <Spinner size="sm" /> : 'Aplicar'}</Button>
                    <span style={{ flex: 1 }} />
                    <button onClick={() => setSelecionados(new Set())} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: '13px' }}>Limpar seleção</button>
                </div>
            )}

            <datalist id="mt-emissores">{emissores.map(e => <option key={e.id} value={e.nome_fantasia} />)}</datalist>
            <datalist id="mt-conglomerados">{conglomerados.map(c => <option key={c.id} value={c.nome_lider} />)}</datalist>

            {/* ── Planilha ── */}
            <div style={{ border: '1px solid var(--color-border-subtle)', borderRadius: '10px', overflow: 'auto', maxHeight: 'calc(100vh - 360px)', background: 'var(--color-white)' }}>
                <table style={{ borderCollapse: 'separate', borderSpacing: 0, minWidth: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ ...th, position: 'sticky', left: 0, zIndex: 3, width: 36 }}>
                                <input type="checkbox" checked={todosVisiveisMarcados} onChange={marcarVisiveis} aria-label="Selecionar página" />
                            </th>
                            <th style={{ ...th, position: 'sticky', left: 36, zIndex: 3, cursor: 'pointer', minWidth: 300 }} onClick={() => alternarOrdem('nome')}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>Ativo {ordem.col === 'nome' && (ordem.desc ? <ChevronDown size={12} /> : <ChevronUp size={12} />)}</span>
                            </th>
                            <Th col="sub_tipo">Sub-tipo</Th>
                            <Th>Identificador</Th>
                            <Th>Tipo id</Th>
                            <Th>Instituições</Th>
                            <Th col="valor" alinhar="right">Valor na base</Th>
                            <Th col="clientes" alinhar="right">Clientes</Th>
                            <Th>Classe (corretora)</Th>
                            <Th>Emissor (corretora)</Th>
                            <Th col="classe">Classe Avere</Th>
                            <Th>Emissor</Th>
                            <Th>Conglomerado FGC</Th>
                            <Th>Liquidez (D+)</Th>
                            <Th col="vencimento">Vencimento</Th>
                            <Th>Taxa</Th>
                            <Th>Falta</Th>
                            <Th> </Th>
                        </tr>
                    </thead>
                    <tbody>
                        {visiveis.map(c => {
                            const marcado = selecionados.has(c.id);
                            const bancario = isBancario(c.sub_tipo_canonico);
                            const principal = c.visoes[0];
                            const insts = Array.from(new Set(c.visoes.map(v => v.instituicao_origem)));
                            const classeOrig = c.visoes.map(v => v.classe_original).find(Boolean) ?? '';
                            const emissorOrig = c.visoes.map(v => (v.emissor_original ?? '').trim()).find(Boolean) ?? '';
                            const f = faltas(c);
                            const e = expo(c.id);
                            const fundo = marcado ? 'var(--color-info-bg)' : 'var(--color-white)';
                            return (
                                <tr key={c.id} className="mt-row">
                                    <td style={{ ...td, position: 'sticky', left: 0, zIndex: 1, background: fundo, width: 36 }}>
                                        <input type="checkbox" checked={marcado} aria-label={`Selecionar ${c.nome_canonico}`}
                                            onChange={() => setSelecionados(prev => { const n = new Set(prev); if (n.has(c.id)) n.delete(c.id); else n.add(c.id); return n; })} />
                                    </td>
                                    <td style={{ ...td, position: 'sticky', left: 36, zIndex: 1, background: fundo, fontWeight: 600, maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis' }} title={c.nome_canonico}>
                                        {c.nome_canonico}
                                    </td>
                                    <td style={tdLeitura}>{c.sub_tipo_canonico || '—'}</td>
                                    <td style={{ ...tdLeitura, fontFamily: 'monospace', fontSize: '12px' }}>{principal?.codigo_identificador ?? '—'}</td>
                                    <td style={tdLeitura}>{principal?.tipo_identificador ?? '—'}</td>
                                    <td style={tdLeitura}>
                                        <span style={{ display: 'inline-flex', gap: 4 }}>
                                            {insts.map(i => {
                                                const cor = CORES_INST[i] ?? { bg: 'var(--color-border-subtle)', fg: 'var(--color-text-primary)' };
                                                return <span key={i} style={{ background: cor.bg, color: cor.fg, fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>{i}</span>;
                                            })}
                                        </span>
                                    </td>
                                    <td style={{ ...tdLeitura, textAlign: 'right', fontWeight: 600, color: 'var(--color-text-primary)' }}>{e ? formatarValor(e.valor) : '—'}</td>
                                    <td style={{ ...tdLeitura, textAlign: 'right' }}>{e?.clientes ?? '—'}</td>
                                    <td style={tdLeitura} title={classeOrig}>{classeOrig || '—'}</td>
                                    <td style={{ ...tdLeitura, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis' }} title={emissorOrig}>{emissorOrig || '—'}</td>

                                    <CelulaEditavel
                                        valorExibido={c.classe_avere} obrigatorio travado={c.campos_travados.includes('classe_avere')}
                                        editando={editando?.id === c.id && editando.campo === 'classe_avere'}
                                        abrir={() => setEditando({ id: c.id, campo: 'classe_avere' })} fechar={() => setEditando(null)}
                                        tipo="select" opcoes={classesAvere.map(x => x.nome)} valorInicial={c.classe_avere}
                                        salvar={v => gravar([c], 'classe_avere', v)} />
                                    <CelulaEditavel
                                        valorExibido={c.emissor_id ? emissoresMap.get(c.emissor_id) ?? '?' : ''} naoSeAplica={bancario}
                                        obrigatorio={isCredito(c.sub_tipo_canonico)} travado={c.campos_travados.includes('emissor_id')}
                                        editando={editando?.id === c.id && editando.campo === 'emissor_id'}
                                        abrir={() => setEditando({ id: c.id, campo: 'emissor_id' })} fechar={() => setEditando(null)}
                                        tipo="lista" lista="mt-emissores" valorInicial={c.emissor_id ? emissoresMap.get(c.emissor_id) ?? '' : ''}
                                        salvar={v => {
                                            const id = v.trim() ? emissorPorNome.get(v.trim().toLowerCase()) : '';
                                            if (id === undefined) { toast.error('Esse emissor não existe no dicionário.'); return Promise.resolve(false); }
                                            return gravar([c], 'emissor_id', id);
                                        }} />
                                    <CelulaEditavel
                                        valorExibido={c.conglomerado_id ? conglomeradosMap.get(c.conglomerado_id) ?? '?' : ''} naoSeAplica={!bancario}
                                        obrigatorio travado={c.campos_travados.includes('conglomerado_id')}
                                        editando={editando?.id === c.id && editando.campo === 'conglomerado_id'}
                                        abrir={() => setEditando({ id: c.id, campo: 'conglomerado_id' })} fechar={() => setEditando(null)}
                                        tipo="lista" lista="mt-conglomerados" valorInicial={c.conglomerado_id ? conglomeradosMap.get(c.conglomerado_id) ?? '' : ''}
                                        salvar={v => {
                                            const id = v.trim() ? conglomPorNome.get(v.trim().toLowerCase()) : '';
                                            if (id === undefined) { toast.error('Esse conglomerado não existe no dicionário.'); return Promise.resolve(false); }
                                            return gravar([c], 'conglomerado_id', id);
                                        }} />
                                    <CelulaEditavel
                                        valorExibido={c.liquidez_avere !== '' ? `D+${c.liquidez_avere}` : ''} obrigatorio={!c.data_vencimento}
                                        travado={c.campos_travados.includes('liquidez_avere')}
                                        editando={editando?.id === c.id && editando.campo === 'liquidez_avere'}
                                        abrir={() => setEditando({ id: c.id, campo: 'liquidez_avere' })} fechar={() => setEditando(null)}
                                        tipo="numero" valorInicial={c.liquidez_avere}
                                        salvar={v => gravar([c], 'liquidez_avere', v)} />

                                    <td style={tdLeitura}>{c.data_vencimento ? formatarDataBR(c.data_vencimento) : '—'}</td>
                                    <td style={tdLeitura}>{(c.taxa_formatada || c.taxa_canonica) ? padronizarTaxaExibicao(c.taxa_formatada || c.taxa_canonica) : '—'}</td>
                                    <td style={{ ...td, color: f.length ? 'var(--color-warning-solid)' : 'var(--color-success-text)', fontWeight: 600, fontSize: '12px' }}>
                                        {f.length ? f.join(' · ') : 'completo'}
                                    </td>
                                    <td style={{ ...td, width: 40, textAlign: 'center' }}>
                                        <button onClick={() => setDrawerCanonicoId(c.id)} title="Detalhes, taxa e fundir" aria-label="Abrir detalhes"
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex' }}>
                                            <PanelRightOpen size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {visiveis.length === 0 && (
                            <tr><td colSpan={18} style={{ ...td, height: 80, textAlign: 'center', color: 'var(--color-text-muted)' }}>Nada nesta fila com esses filtros.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Paginação ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                <span>{linhas.length ? `${pagina * POR_PAGINA + 1}–${Math.min((pagina + 1) * POR_PAGINA, linhas.length)} de ${linhas.length}` : '0 ativos'}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="outline" disabled={pagina === 0} onClick={() => setPagina(p => p - 1)}>Anterior</Button>
                    <Button variant="outline" disabled={pagina >= paginas - 1} onClick={() => setPagina(p => p + 1)}>Próxima</Button>
                </div>
            </div>

            <DrawerCanonico
                isOpen={drawerCanonicoId !== null}
                onClose={() => setDrawerCanonicoId(null)}
                canonico={canonicoSelecionado}
                emissores={emissores}
                conglomerados={conglomerados}
                classes={classesAvere}
                onFundir={() => setModalFundirAberto(true)}
                onSalvo={fetchData}
            />
            <ModalFundirCanonicos
                isOpen={modalFundirAberto}
                onClose={() => setModalFundirAberto(false)}
                origem={canonicoSelecionado}
                candidatosDestino={candidatosDestino}
                onSuccess={() => { setModalFundirAberto(false); setDrawerCanonicoId(null); fetchData(); }}
            />
        </div>
    );
}

// ── Célula editável (clique → editor; Enter/blur salva; Esc cancela) ──────────
// Exibe texto até ser clicada: renderizar um <select> em cada linha deixaria a
// planilha pesada (milhares de linhas × ~180 emissores).
interface PropsCelula {
    valorExibido: string; valorInicial: string; editando: boolean; travado?: boolean; obrigatorio?: boolean; naoSeAplica?: boolean;
    tipo: 'select' | 'lista' | 'numero'; opcoes?: string[]; lista?: string;
    abrir: () => void; fechar: () => void; salvar: (v: string) => Promise<boolean>;
}

function CelulaEditavel(p: PropsCelula) {
    if (p.naoSeAplica) return <td style={{ ...tdLeitura, color: 'var(--color-text-muted)' }}>n/a</td>;
    if (p.editando) return <EditorCelula {...p} />;
    const vazio = !p.valorExibido;
    return (
        <td className="mt-cel" onClick={p.abrir} title="Clique para editar"
            style={{ ...td, minWidth: p.tipo === 'numero' ? 90 : 160, color: vazio ? (p.obrigatorio ? 'var(--color-warning-solid)' : 'var(--color-text-muted)') : 'var(--color-text-primary)', fontStyle: vazio ? 'italic' : 'normal' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                {vazio ? (p.obrigatorio ? 'preencher' : '—') : p.valorExibido}
                {p.travado && !vazio && <Lock size={11} color="var(--color-text-muted)" aria-label="Curado pelo master" />}
            </span>
        </td>
    );
}

// Montado só durante a edição: o rascunho nasce do valor atual a cada abertura.
function EditorCelula(p: PropsCelula) {
    const [rascunho, setRascunho] = useState(p.valorInicial);
    const salvando = useRef(false);

    const confirmar = async (v: string) => {
        if (salvando.current) return;
        if (v === p.valorInicial) { p.fechar(); return; }
        salvando.current = true;
        const ok = await p.salvar(v);
        salvando.current = false;
        if (ok) p.fechar();
    };

    const comum = {
        autoFocus: true, style: editor,
        onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Escape') p.fechar();
            if (e.key === 'Enter') void confirmar((e.target as HTMLInputElement).value);
        },
    };
    return (
        <td style={{ ...td, padding: '0 4px', minWidth: p.tipo === 'numero' ? 90 : 220 }}>
            {p.tipo === 'select' ? (
                <select {...comum} value={rascunho} onChange={e => void confirmar(e.target.value)} onBlur={p.fechar}>
                    <option value="">— sem classe —</option>
                    {p.opcoes!.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            ) : (
                <input {...comum} type={p.tipo === 'numero' ? 'number' : 'text'} min={p.tipo === 'numero' ? 0 : undefined}
                    list={p.lista} value={rascunho} placeholder={p.tipo === 'lista' ? 'Digite para buscar…' : 'D+'}
                    onChange={e => setRascunho(e.target.value)} onBlur={e => void confirmar(e.target.value)} />
            )}
        </td>
    );
}
