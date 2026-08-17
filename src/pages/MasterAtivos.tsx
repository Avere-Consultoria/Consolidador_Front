import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography, Card, Badge, Button, Spinner, TextField, toast } from 'avere-ui';
import { Wand2, Search } from 'lucide-react';
import { supabase } from '../services/supabase';
import { padronizarTaxaExibicao } from '../utils/formatters';
import { DrawerCanonico, type CanonicoDetalhe } from '../components/masterAtivos/DrawerCanonico';
import { ModalFundirCanonicos, type CanonicoOpcaoDestino } from '../components/masterAtivos/ModalFundirCanonicos';

function formatarDataBR(iso: string): string {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
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
    visoes: VisaoInstitucional[];
    status: 'PENDENTE' | 'CLASSIFICADO';
}

interface Emissor {
    id: string;
    nome_fantasia: string;
}

interface ConglomeradoOpt {
    id: string;
    nome_lider: string;
}

interface ClasseDinamica {
    nome: string;
}

// Sub-tipos do mundo bancário (FGC) → risco = conglomerado; demais → emissor
const SUBTIPOS_BANCARIO = new Set(['CDB', 'LCI', 'LCA', 'LF', 'LIG', 'RDB', 'LH', 'LC', 'LCD', 'DPGE', 'RDC', 'LFSN']);
const isBancario = (subTipo: string) => SUBTIPOS_BANCARIO.has((subTipo || '').toUpperCase().trim());

// Crédito privado: emissor é obrigatório. Fundos/ações/caixa/COE/títulos públicos
// não têm risco de crédito nesse modelo — não exigem emissor pra fechar o status.
const SUBTIPOS_CREDITO = new Set(['DEB', 'CRA', 'CRI', 'FIDC', 'NP', 'NC', 'CCB', 'CCI', 'CDCA']);

function calcularStatus(c: { classe_avere: string; liquidez_avere: string; sub_tipo_canonico: string; emissor_id: string; conglomerado_id: string }): 'CLASSIFICADO' | 'PENDENTE' {
    if (!c.classe_avere || c.liquidez_avere.trim() === '') return 'PENDENTE';
    const st = (c.sub_tipo_canonico || '').toUpperCase().trim();
    if (SUBTIPOS_BANCARIO.has(st) || SUBTIPOS_CREDITO.has(st)) {
        return (c.emissor_id || c.conglomerado_id) ? 'CLASSIFICADO' : 'PENDENTE';
    }
    return 'CLASSIFICADO';
}

const CORES_INST: Record<string, { bg: string; fg: string }> = {
    BTG:    { bg: 'var(--color-info-bg)', fg: 'var(--color-info-text)' },
    XP:     { bg: 'var(--color-warning-bg)', fg: 'var(--color-warning-text)' },
    AVENUE: { bg: 'var(--color-warning-bg)', fg: 'var(--color-warning-text)' },
    AGORA:  { bg: 'var(--color-success-bg)', fg: 'var(--color-success-text)' },
};

const thMA: React.CSSProperties = {
    padding: '12px 16px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.05em', color: 'var(--color-text-muted)', textAlign: 'left', whiteSpace: 'nowrap',
};
const tdMA: React.CSSProperties = { padding: '12px 16px', verticalAlign: 'middle' };

export default function MasterAtivos() {
    const [canonicos, setCanonicos] = useState<AtivoCanonicoMaster[]>([]);
    const [emissores, setEmissores] = useState<Emissor[]>([]);
    const [conglomerados, setConglomerados] = useState<ConglomeradoOpt[]>([]);
    const [classesAvere, setClassesAvere] = useState<ClasseDinamica[]>([]);
    const [loading, setLoading] = useState(true);
    const [classificando, setClassificando] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState<string>('CLASSIFICAR');   // 'CLASSIFICAR' | nome da classe
    const [busca, setBusca] = useState('');

    // ── Drawer e modal de fundir ─────────────────────────────────────────
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
    // Sem isto, com a base cheia os ativos além da 1000ª linha ficavam sem visão
    // (sem instituição/ISIN) e canônicos além de 1000 sumiam da lista.
    const selectAll = async (tabela: string, colunas: string, ordem?: string) => {
        const PAGE = 1000;
        const acc: any[] = [];
        for (let from = 0; ; from += PAGE) {
            let q = supabase.from(tabela).select(colunas).range(from, from + PAGE - 1);
            if (ordem) q = q.order(ordem);
            const { data, error } = await q;
            if (error) throw error;
            acc.push(...(data ?? []));
            if (!data || data.length < PAGE) break;
        }
        return acc;
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [canonicosData, dicionarioData, emissoresData, conglomeradosData, classesRes] = await Promise.all([
                selectAll('ativos_canonicos', 'id, nome_canonico, classe_avere, liquidez_avere, data_vencimento, emissor_id, conglomerado_id, taxa_canonica, taxa_formatada, benchmark_canonico, sub_tipo_canonico, is_fii, is_coe, notas', 'nome_canonico'),
                selectAll('dicionario_ativos', 'ativo_canonico_id, instituicao_origem, codigo_identificador, tipo_identificador, nome_ativo, emissor_original, classe_original, liquidez_api_original, vencimento_api_original, index_rate, taxa_formatada'),
                selectAll('dicionario_emissores', 'id, nome_fantasia', 'nome_fantasia'),
                selectAll('dicionario_conglomerados', 'id, nome_lider', 'nome_lider'),
                supabase.from('dicionario_classes').select('nome').order('ordem_exibicao'),
            ]);

            if (classesRes.error) throw classesRes.error;

            setEmissores(emissoresData || []);
            setConglomerados(conglomeradosData || []);
            setClassesAvere(classesRes.data || []);

            // Agrupa visões institucionais por canonico_id
            const visoesPorCanonico = new Map<string, VisaoInstitucional[]>();
            (dicionarioData || []).forEach((d: any) => {
                if (!d.ativo_canonico_id) return;
                const arr = visoesPorCanonico.get(d.ativo_canonico_id) ?? [];
                arr.push({
                    instituicao_origem:      d.instituicao_origem,
                    codigo_identificador:    d.codigo_identificador,
                    tipo_identificador:      d.tipo_identificador,
                    nome_ativo:              d.nome_ativo,
                    emissor_original:        d.emissor_original,
                    classe_original:         d.classe_original,
                    liquidez_api_original:   d.liquidez_api_original,
                    vencimento_api_original: d.vencimento_api_original,
                    index_rate:              d.index_rate,
                    taxa_formatada:          d.taxa_formatada,
                });
                visoesPorCanonico.set(d.ativo_canonico_id, arr);
            });

            const lista: AtivoCanonicoMaster[] = (canonicosData || []).map((c: any) => {
                const base = {
                    ...c,
                    classe_avere:       c.classe_avere || '',
                    liquidez_avere:     c.liquidez_avere || '',
                    data_vencimento:    c.data_vencimento || '',
                    emissor_id:         c.emissor_id || '',
                    taxa_canonica:      c.taxa_canonica || '',
                    taxa_formatada:     c.taxa_formatada || '',
                    benchmark_canonico: c.benchmark_canonico || '',
                    sub_tipo_canonico:  c.sub_tipo_canonico || '',
                    notas:              c.notas || '',
                    conglomerado_id:    c.conglomerado_id || '',
                    visoes:             visoesPorCanonico.get(c.id) ?? [],
                    status: 'PENDENTE' as const,
                };
                return { ...base, status: calcularStatus(base) };
            });

            setCanonicos(lista);
        } catch (err) {
            console.error('Erro ao buscar canônicos:', err);
            toast.error('Erro ao carregar os dados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAutoClassificar = async () => {
        setClassificando(true);
        try {
            const { data, error } = await supabase.functions.invoke('classificar-riscos');
            if (error) throw error;
            toast.success(`Auto-classificação: ${data.classificados_emissor} emissor(es) + ${data.classificados_conglomerado} conglomerado(s). ${data.sem_match} sem match.`);
            await fetchData();
        } catch (err: any) {
            toast.error(`Erro ao auto-classificar: ${err?.message ?? err}`);
        } finally {
            setClassificando(false);
        }
    };

    const emissoresMap     = useMemo(() => new Map(emissores.map(e => [e.id, e.nome_fantasia])), [emissores]);
    const conglomeradosMap = useMemo(() => new Map(conglomerados.map(c => [c.id, c.nome_lider])), [conglomerados]);

    // Contagem por aba: "Classificar" (sem classe) + uma por classe Avere.
    const contagemPorAba = useMemo(() => {
        const m: Record<string, number> = { CLASSIFICAR: 0 };
        for (const c of canonicos) {
            if (!c.classe_avere) m.CLASSIFICAR += 1;
            else m[c.classe_avere] = (m[c.classe_avere] ?? 0) + 1;
        }
        return m;
    }, [canonicos]);

    const canonicosFiltrados = useMemo(() => {
        const q = busca.trim().toLowerCase();
        const matchBusca = (c: AtivoCanonicoMaster) => {
            if (!q) return true;
            const ident = c.visoes[0]?.codigo_identificador ?? '';
            const bancario = isBancario(c.sub_tipo_canonico);
            const riscoNome = bancario
                ? (c.conglomerado_id ? conglomeradosMap.get(c.conglomerado_id) ?? '' : '')
                : (c.emissor_id ? emissoresMap.get(c.emissor_id) ?? '' : '');
            return (c.nome_canonico ?? '').toLowerCase().includes(q)
                || ident.toLowerCase().includes(q)
                || riscoNome.toLowerCase().includes(q);
        };
        const base = abaAtiva === 'CLASSIFICAR'
            ? canonicos.filter(c => !c.classe_avere)
            : canonicos.filter(c => c.classe_avere === abaAtiva);
        return base.filter(matchBusca);
    }, [canonicos, abaAtiva, busca, emissoresMap, conglomeradosMap]);

    const pendentesCount = contagemPorAba.CLASSIFICAR ?? 0;

    const canonicoSelecionado: CanonicoDetalhe | null = useMemo(() => {
        if (!drawerCanonicoId) return null;
        return canonicos.find(c => c.id === drawerCanonicoId) ?? null;
    }, [drawerCanonicoId, canonicos]);

    const candidatosDestino: CanonicoOpcaoDestino[] = useMemo(() => {
        if (!drawerCanonicoId) return [];
        return canonicos
            .filter(c => c.id !== drawerCanonicoId)
            .map(c => ({
                id: c.id,
                nome_canonico: c.nome_canonico,
                classe_avere: c.classe_avere || null,
                instituicoes_visoes: Array.from(new Set(c.visoes.map(v => v.instituicao_origem))),
            }));
    }, [drawerCanonicoId, canonicos]);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <style>{`
                input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                input[type=number] { -moz-appearance: textfield; }
                .master-row:hover { background: var(--color-accent-subtle); }
            `}</style>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Typography variant="h1" style={{ fontWeight: 700 }}>Master de Ativos</Typography>
                        <Badge intent={pendentesCount > 0 ? 'primaria' : 'secundaria'} variant="solid">
                            {pendentesCount} a classificar
                        </Badge>
                    </div>
                    <Typography variant="p" style={{ color: 'var(--color-text-secondary)' }}>
                        Dicionário Universal de Classificação e Risco da Avere
                    </Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <TextField
                        leftIcon={Search}
                        placeholder="Buscar ativo, código ou risco..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        style={{ width: 260 }}
                    />
                    <Button variant="solid" onClick={handleAutoClassificar} disabled={classificando}>
                        {classificando ? <Spinner size="sm" /> : <Wand2 size={16} style={{ marginRight: '8px' }} />}
                        {classificando ? 'Classificando...' : 'Auto-classificar'}
                    </Button>
                </div>
            </header>

            {/* ── Abas: Classificar (sem classe) + uma por Classe Avere ── */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[{ id: 'CLASSIFICAR', label: 'Classificar' }, ...classesAvere.map(c => ({ id: c.nome, label: c.nome }))].map(aba => {
                    const ativa = abaAtiva === aba.id;
                    const n = contagemPorAba[aba.id] ?? 0;
                    const fila = aba.id === 'CLASSIFICAR';
                    return (
                        <button
                            key={aba.id}
                            onClick={() => setAbaAtiva(aba.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '7px', whiteSpace: 'nowrap',
                                padding: '8px 14px', borderRadius: '999px', cursor: 'pointer',
                                border: `1px solid ${ativa ? 'transparent' : 'var(--color-borda)'}`,
                                background: ativa ? (fila ? 'var(--color-warning-solid)' : 'var(--color-secundaria)') : '#fff',
                                color: ativa ? '#fff' : (fila && n > 0 ? 'var(--color-warning-solid)' : 'var(--color-text-secondary)'),
                                fontSize: '12px', fontWeight: 700,
                            }}
                        >
                            {aba.label}
                            <span style={{
                                fontSize: '10px', fontWeight: 700, padding: '1px 7px', borderRadius: '999px',
                                background: ativa ? 'rgba(255,255,255,0.25)' : (fila && n > 0 ? 'rgba(217,119,6,0.12)' : 'var(--color-surface-sunken)'),
                                color: ativa ? '#fff' : (fila && n > 0 ? 'var(--color-warning-solid)' : 'var(--color-text-secondary)'),
                            }}>{n}</span>
                        </button>
                    );
                })}
            </div>

            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                            <th style={thMA}>Ativo</th>
                            <th style={thMA}>Risco</th>
                            <th style={thMA}>Classe Avere</th>
                            <th style={thMA}>Vencimento / Liquidez</th>
                            <th style={thMA}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {canonicosFiltrados.map(item => {
                            const principal = item.visoes[0];
                            const instituicoesDistintas = Array.from(new Set(item.visoes.map(v => v.instituicao_origem)));
                            // Emissor ORIGINAL (cru da API) — fato imutável; exibido ao lado do nome.
                            const emissorOriginal = item.visoes.map(v => (v.emissor_original ?? '').trim()).find(e => e) ?? '';
                            const bancario = isBancario(item.sub_tipo_canonico);
                            const riscoNome = bancario ? conglomeradosMap.get(item.conglomerado_id) : emissoresMap.get(item.emissor_id);
                            return (
                                <tr
                                    key={item.id}
                                    className="master-row"
                                    onClick={() => setDrawerCanonicoId(item.id)}
                                    style={{ borderBottom: '1px solid var(--color-surface-sunken)', cursor: 'pointer' }}
                                >
                                    {/* Ativo */}
                                    <td style={{ ...tdMA, minWidth: '260px' }}>
                                        <Typography variant="p" title={item.nome_canonico} style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-text-primary)' }}>
                                            {item.nome_canonico}
                                            {emissorOriginal && <span style={{ fontWeight: 500, fontSize: '11px', color: 'var(--color-text-secondary)', marginLeft: '8px' }}>· {emissorOriginal}</span>}
                                            {item.is_fii && <span style={{ fontSize: '9px', marginLeft: '6px', color: '#7C3AED', fontWeight: 700 }}>FII</span>}
                                            {item.is_coe && <span style={{ fontSize: '9px', marginLeft: '6px', color: 'var(--color-danger-solid)', fontWeight: 700 }}>COE</span>}
                                        </Typography>
                                        {principal && (
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                                                <span style={{ fontWeight: 600, fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>{principal.codigo_identificador}</span>
                                                <span style={{ fontSize: '9px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{principal.tipo_identificador}</span>
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                                            {instituicoesDistintas.map(inst => {
                                                const cor = CORES_INST[inst] ?? { bg: 'var(--color-border-subtle)', fg: 'var(--color-text-primary)' };
                                                return <span key={inst} style={{ background: cor.bg, color: cor.fg, fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>{inst}</span>;
                                            })}
                                            {(item.taxa_formatada || item.taxa_canonica) && <Badge variant="ghost" style={{ fontSize: '9px' }}>{padronizarTaxaExibicao(item.taxa_formatada || item.taxa_canonica)}</Badge>}
                                        </div>
                                    </td>

                                    {/* Risco (read-only) */}
                                    <td style={{ ...tdMA, minWidth: '170px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            {riscoNome
                                                ? <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{riscoNome}</span>
                                                : <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-danger-solid)' }}>—</span>}
                                            <span style={{ fontSize: '9px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{bancario ? '🏦 Bancário/FGC' : '🏭 Privado'}</span>
                                        </div>
                                    </td>

                                    {/* Classe */}
                                    <td style={tdMA}>
                                        {item.classe_avere
                                            ? <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{item.classe_avere}</span>
                                            : <span style={{ fontSize: '12px', color: 'var(--color-warning-solid)', fontStyle: 'italic' }}>Não classificado</span>}
                                    </td>

                                    {/* Vencimento / Liquidez (modelo Home: vencimento quando existe, senão liquidez) */}
                                    <td style={tdMA}>
                                        {item.data_vencimento
                                            ? <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{formatarDataBR(item.data_vencimento)}</span>
                                            : (item.liquidez_avere !== '' && item.liquidez_avere != null
                                                ? <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>D+{item.liquidez_avere}</span>
                                                : <span style={{ color: 'var(--color-text-muted)' }}>—</span>)}
                                    </td>

                                    {/* Status */}
                                    <td style={tdMA}>
                                        <Badge intent={item.status === 'CLASSIFICADO' ? 'primaria' : 'secundaria'} variant="ghost" style={{ fontSize: '10px' }}>
                                            {item.status}
                                        </Badge>
                                    </td>
                                </tr>
                            );
                        })}
                        {canonicosFiltrados.length === 0 && (
                            <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', opacity: 0.4 }}>Nenhum ativo encontrado.</td></tr>
                        )}
                    </tbody>
                </table>
            </Card>

            {/* ── Drawer com detalhes do canônico ── */}
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

            {/* ── Modal de fundir canônicos ── */}
            <ModalFundirCanonicos
                isOpen={modalFundirAberto}
                onClose={() => setModalFundirAberto(false)}
                origem={canonicoSelecionado}
                candidatosDestino={candidatosDestino}
                onSuccess={() => {
                    setModalFundirAberto(false);
                    setDrawerCanonicoId(null);
                    fetchData();
                }}
            />
        </div>
    );
}
