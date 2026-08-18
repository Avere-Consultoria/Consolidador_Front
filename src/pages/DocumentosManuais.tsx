import { useState, useEffect, useMemo } from 'react';
import { Typography, Card, Spinner, Badge, Button, TextField, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, toast } from 'avere-ui';
import { EstadoVazio } from '../components/shared/EstadoVazio';
import { FileText, Search, FileStack, ArrowDownRight, Pencil, ArrowUp, Fingerprint, Link2, ChevronDown, AlertTriangle, Trash2, Loader2, RotateCcw, Ban } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { fmt, fmtDate } from '../utils/formatters';

interface Envio {
    id: string;
    cliente_id: string;
    conta_id: string | null;
    instituicao: string;
    data_referencia: string;
    consultor_id: string | null;
    enviado_por: string | null;
    arquivo_nome: string | null;
    status: string;
    detalhe: string | null;
    enviado_em: string | null;
    processado_em: string | null;
    snapshot_id: string | null;
}

interface ManualAtivo {
    id: string;
    ativo_canonico_id: string | null;
    tipo: string | null;
    sub_tipo: string | null;
    emissor: string | null;
    cnpj: string | null;
    ticker: string | null;
    isin: string | null;
    valor_bruto: number | null;
    benchmark: string | null;
    data_vencimento: string | null;
    editado_em: string | null;
    conflito_reimport: boolean | null;
    conflito_dados: { tipo?: string; sub_tipo?: string; emissor?: string; benchmark?: string; data_vencimento?: string } | null;
}

// Data/hora do envio (ISO) → DD/MM HH:mm, timezone-safe o suficiente p/ exibição.
function fmtEnvio(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// Chave de negócio p/ casar envio↔snapshot (o loop de auditoria nem sempre fecha).
function chaveNeg(clienteId: string | null, contaId: string | null, instituicao: string | null, dataRef: string | null): string {
    return `${clienteId ?? ''}|${contaId ?? ''}|${(instituicao ?? '').toUpperCase()}|${dataRef ?? ''}`;
}

// Envio 'enviado' há mais de X horas sem snapshot casado → provavelmente travado
// no pipeline (Zapier/IA/import). Sinaliza que precisa de atenção, não é fila normal.
const HORAS_TRAVADO = 48;

type StatusTipo = 'processado' | 'processando' | 'quarentena' | 'descartado' | 'erro' | 'travado' | 'fila';

function StatusEnvio({ tipo }: { tipo: StatusTipo }) {
    if (tipo === 'processado') return <Badge variant="ghost" style={{ fontSize: 11, background: 'var(--color-success-bg)', color: 'var(--color-success-text)' }}>Processado</Badge>;
    if (tipo === 'processando') return <Badge variant="ghost" style={{ fontSize: 11, background: 'var(--color-info-bg)', color: 'var(--color-info-text)', display: 'inline-flex', alignItems: 'center', gap: 5 }}><Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} />Processando</Badge>;
    if (tipo === 'quarentena') return <Badge variant="ghost" style={{ fontSize: 11, background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5 }}><AlertTriangle size={11} />Quarentena</Badge>;
    if (tipo === 'descartado') return <Badge variant="ghost" style={{ fontSize: 11, background: 'var(--color-surface-sunken)', color: 'var(--color-text-secondary)' }}>Descartado</Badge>;
    if (tipo === 'erro') return <Badge variant="ghost" style={{ fontSize: 11, background: 'var(--color-danger-bg)', color: 'var(--color-danger-text)' }}>Com erro</Badge>;
    if (tipo === 'travado') return <Badge variant="ghost" style={{ fontSize: 11, background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>Travado</Badge>;
    return <Badge variant="ghost" style={{ fontSize: 11, background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>Na fila</Badge>;
}

// Texto do selo de conflito: o que a IA reextraiu, diferente do que o master fixou.
function conflitoTooltip(a: ManualAtivo): string {
    const d = a.conflito_dados;
    if (!d) return 'A reimportação trouxe dados diferentes da sua edição.';
    const partes: string[] = [];
    if (d.tipo) partes.push(`classe "${d.tipo}"`);
    if (d.sub_tipo) partes.push(`sub-tipo "${d.sub_tipo}"`);
    if (d.emissor) partes.push(`emissor "${d.emissor}"`);
    if (d.benchmark) partes.push(`indexador "${d.benchmark}"`);
    if (d.data_vencimento) partes.push(`venc. ${d.data_vencimento}`);
    return `A IA reextraiu: ${partes.join(', ')}. Sua edição foi mantida — revise se quiser.`;
}

function identidade(a: ManualAtivo): { label: string; ok: boolean } {
    if (a.cnpj) return { label: `CNPJ ${a.cnpj}`, ok: true };
    if (a.ticker) return { label: `Ticker ${a.ticker}`, ok: true };
    if (a.isin) return { label: `ISIN ${a.isin}`, ok: true };
    return { label: 'sem identificador', ok: false };
}

const th: React.CSSProperties = { padding: '10px 12px', fontSize: 'var(--text-2xs)' as any, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', textAlign: 'left', whiteSpace: 'nowrap' };
const td: React.CSSProperties = { padding: '11px 12px', fontSize: 13, color: 'var(--color-text-primary)', borderTop: '1px solid var(--color-surface-sunken)' };
const lbl: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.03em' };
const ctrl: React.CSSProperties = { width: '100%', height: 38, boxSizing: 'border-box', padding: '0 10px', borderRadius: 8, border: '1px solid var(--color-border-default)', fontSize: 13, outline: 'none', background: '#fff' };

// Lista padrão de subtipos (espelha o bibliotecaSchema) + construtor de taxa (DrawerCanonico).
const SUBTIPOS = ['CDB', 'LCI', 'LCA', 'CRA', 'CRI', 'DEB', 'CDCA', 'LF', 'LFT', 'LTN', 'NTN-B', 'NTN-F', 'NTN-C', 'LCD', 'RDB', 'LIG', 'COMPROMISSADA', 'CAIXA', 'FUNDO', 'AÇÃO', 'ETF', 'FII', 'COE', 'ESTRUTURADA'];
const INDEXADORES = ['IPCA', 'IGP-M', 'CDI', 'SELIC', 'PRÉ', 'TR', 'DÓLAR'];
const SUBTIPOS_COM_TAXA = new Set(['CDB', 'LCI', 'LCA', 'CRA', 'CRI', 'DEB', 'CDCA', 'LF', 'LFT', 'LTN', 'NTN-B', 'NTN-F', 'NTN-C', 'LCD', 'RDB', 'LIG', 'FUNDO']);

function derivarTaxa(indexador?: string, percentual?: any, spread?: any): string {
    const idx = (indexador || '').trim();
    const pct = percentual === '' || percentual == null ? null : Number(percentual);
    const spr = spread === '' || spread == null ? null : Number(spread);
    const f = (n: number) => n.toFixed(2).replace('.', ',');
    if (!idx) return spr != null ? `${f(spr)}% a.a.` : '';
    if (/^PR[EÉ]/i.test(idx)) return spr != null ? `${f(spr)}% a.a.` : 'PRÉ';
    if (pct != null && Math.abs(pct - 100) > 0.01) return `${f(pct)}% ${idx}`;
    if (spr != null && spr > 0) return `${idx} + ${f(spr)}%`;
    return /^CDI$/i.test(idx) ? '100% CDI' : idx;
}

// Combobox com busca, inline (sem portal) — funciona dentro do modal, ao contrário
// do Select do avere-ui. Facilita selects longos (emissor tem centenas).
function Combo({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: { label: string; value: string }[]; placeholder?: string }) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState('');
    const sel = options.find(o => o.value === value);
    const filtered = q ? options.filter(o => o.label.toLowerCase().includes(q.toLowerCase())) : options;
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ ...ctrl, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
                <span style={{ color: sel ? 'var(--color-text-primary)' : 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sel ? sel.label : (placeholder || 'Selecione...')}</span>
                <ChevronDown size={16} color="var(--color-text-muted)" style={{ flexShrink: 0, marginLeft: 6 }} />
            </div>
            {open && (
                <>
                    <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 49 }} />
                    <div style={{ position: 'absolute', top: 41, left: 0, right: 0, zIndex: 50, background: '#fff', border: '1px solid var(--color-border-default)', borderRadius: 8, boxShadow: '0 8px 24px var(--color-border-default)', maxHeight: 240, overflowY: 'auto' }}>
                        <input autoFocus value={q} onChange={e => setQ(e.target.value)} onClick={e => e.stopPropagation()} placeholder="Buscar..." style={{ width: '100%', height: 34, border: 'none', borderBottom: '1px solid var(--color-surface-sunken)', padding: '0 10px', outline: 'none', fontSize: 13, boxSizing: 'border-box' }} />
                        {filtered.length === 0 && <div style={{ padding: 10, fontSize: 12, color: 'var(--color-text-muted)' }}>Nenhum resultado</div>}
                        {filtered.slice(0, 200).map(o => (
                            <div key={o.value} onClick={() => { onChange(o.value); setOpen(false); setQ(''); }}
                                style={{ padding: '8px 10px', fontSize: 13, cursor: 'pointer', background: o.value === value ? 'var(--color-accent-subtle)' : '#fff' }}
                                onMouseEnter={ev => (ev.currentTarget.style.background = 'var(--color-surface-sunken)')}
                                onMouseLeave={ev => (ev.currentTarget.style.background = o.value === value ? 'var(--color-accent-subtle)' : '#fff')}>
                                {o.label}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function DocumentosManuais() {
    const [loading, setLoading] = useState(true);
    const [envios, setEnvios] = useState<Envio[]>([]);
    const [clientesMap, setClientesMap] = useState<Map<string, string>>(new Map());
    // enviado_por (auth uid) → nome de quem realmente clicou enviar.
    const [remetentesMap, setRemetentesMap] = useState<Map<string, string>>(new Map());
    const [snapKeys, setSnapKeys] = useState<Set<string>>(new Set());
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';

    const [selecionado, setSelecionado] = useState<Envio | null>(null);
    const [ativos, setAtivos] = useState<ManualAtivo[]>([]);
    const [loadingAtivos, setLoadingAtivos] = useState(false);

    const [busca, setBusca] = useState('');
    const [filtroStatus, setFiltroStatus] = useState<'todos' | 'quarentena' | 'processando' | 'processado' | 'descartado' | 'erro'>('todos');

    const [classes, setClasses] = useState<string[]>([]);
    const [emissores, setEmissores] = useState<{ id: string; nome: string }[]>([]);
    const [promover, setPromover] = useState<ManualAtivo | null>(null);
    const [form, setForm] = useState({ classe: '', emissor_id: '', sub_tipo: '', benchmark: '', percentual: '', spread: '', vencimento: '', liquidez: '' });
    const [salvando, setSalvando] = useState(false);

    const [editar, setEditar] = useState<ManualAtivo | null>(null);
    const [formEdit, setFormEdit] = useState({ emissor: '', sub_tipo: '', benchmark: '', vencimento: '', cnpj: '', ticker: '', isin: '' });
    const [salvandoEdit, setSalvandoEdit] = useState(false);

    const [excluir, setExcluir] = useState<Envio | null>(null);
    const [previewEx, setPreviewEx] = useState<any>(null);
    const [removerPos, setRemoverPos] = useState(false);
    const [excluindo, setExcluindo] = useState(false);

    const [corrigir, setCorrigir] = useState<Envio | null>(null);
    const [corrigirData, setCorrigirData] = useState('');
    const [corrigindo, setCorrigindo] = useState(false);
    const [descartarEnvio, setDescartarEnvio] = useState<Envio | null>(null);
    const [descartando, setDescartando] = useState(false);

    // Re-busca só a fila + snapshots (silencioso). Usado no polling e após ações.
    const carregarEnvios = async () => {
        const [enviosRes, snapsRes] = await Promise.all([
            supabase.from('envio_pdf_manual').select('*').order('enviado_em', { ascending: false }).limit(500),
            supabase.from('posicao_manual_snapshots').select('cliente_id, conta_id, instituicao, data_referencia'),
        ]);
        setEnvios((enviosRes.data as Envio[]) || []);
        setSnapKeys(new Set((snapsRes.data || []).map((s: any) => chaveNeg(s.cliente_id, s.conta_id, s.instituicao, s.data_referencia))));
    };

    // Auto-refresh: o worker muda o status no banco; a tela reflete sozinha (~15s).
    useEffect(() => {
        const id = setInterval(() => { carregarEnvios(); }, 15000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [enviosRes, clientesRes, consultoresRes, classesRes, emissoresRes, perfisRes, snapsRes] = await Promise.all([
                supabase.from('envio_pdf_manual').select('*').order('enviado_em', { ascending: false }).limit(500),
                supabase.from('clientes').select('id, nome'),
                supabase.from('consultores').select('id, nome, perfil_id'),
                supabase.from('dicionario_classes').select('nome').order('ordem_exibicao'),
                supabase.from('dicionario_emissores').select('id, nome_fantasia').order('nome_fantasia'),
                supabase.from('perfis').select('id, nome'),
                supabase.from('posicao_manual_snapshots').select('cliente_id, conta_id, instituicao, data_referencia'),
            ]);
            setEnvios((enviosRes.data as Envio[]) || []);
            setClientesMap(new Map((clientesRes.data || []).map((c: any) => [c.id, c.nome])));
            // Status DERIVADO: existe snapshot pra esse cliente+instituição+data → processado,
            // mesmo sem o envio_id ecoado (loop de auditoria aberto). Filtra pela RLS do papel.
            setSnapKeys(new Set((snapsRes.data || []).map((s: any) => chaveNeg(s.cliente_id, s.conta_id, s.instituicao, s.data_referencia))));
            // Remetente real = enviado_por (auth uid). Resolve por perfis + perfil_id do
            // consultor; o que a RLS não devolver cai no fallback de exibição.
            const rem = new Map<string, string>();
            (perfisRes.data || []).forEach((p: any) => { if (p.id && p.nome) rem.set(p.id, p.nome); });
            (consultoresRes.data || []).forEach((c: any) => { if (c.perfil_id && !rem.has(c.perfil_id)) rem.set(c.perfil_id, c.nome); });
            setRemetentesMap(rem);
            setClasses((classesRes.data || []).map((c: any) => c.nome));
            setEmissores((emissoresRes.data || []).map((e: any) => ({ id: e.id, nome: e.nome_fantasia })));
            setLoading(false);
        })();
    }, []);

    const abrirDoc = async (e: Envio) => {
        setSelecionado(e);
        setAtivos([]);
        setLoadingAtivos(true);
        // O loop de auditoria (envio → snapshot_id) só fecha se a IA ecoa o envio_id.
        // Quando não fecha, casamos pelo negócio: cliente + instituição + data ref (+ conta).
        let snapId = e.snapshot_id;
        if (!snapId) {
            let q = supabase.from('posicao_manual_snapshots').select('id')
                .eq('cliente_id', e.cliente_id)
                .eq('instituicao', e.instituicao)
                .eq('data_referencia', e.data_referencia);
            if (e.conta_id) q = q.eq('conta_id', e.conta_id);
            const { data: snaps } = await q.order('data_sincronizacao', { ascending: false }).limit(1);
            snapId = snaps?.[0]?.id ?? null;
        }
        if (!snapId) { setLoadingAtivos(false); return; }
        const { data } = await supabase
            .from('posicao_manual_ativos')
            .select('id, ativo_canonico_id, tipo, sub_tipo, emissor, cnpj, ticker, isin, valor_bruto, benchmark, data_vencimento, editado_em, conflito_reimport, conflito_dados')
            .eq('snapshot_id', snapId)
            .order('valor_bruto', { ascending: false });
        setAtivos((data as ManualAtivo[]) || []);
        setLoadingAtivos(false);
    };

    const statusDe = (e: Envio): StatusTipo => {
        const s = (e.status || '').toLowerCase();
        // processado vence (posição existe, via loop ou casamento por chave de negócio).
        if (s === 'processado' || e.snapshot_id || snapKeys.has(chaveNeg(e.cliente_id, e.conta_id, e.instituicao, e.data_referencia))) return 'processado';
        if (s === 'descartado') return 'descartado';
        if (s === 'quarentena') return 'quarentena';
        if (s === 'erro' || s === 'falha') return 'erro';
        if (s === 'processando') return 'processando';
        if (e.enviado_em && (Date.now() - new Date(e.enviado_em).getTime()) / 3_600_000 > HORAS_TRAVADO) return 'travado';
        return 'fila';
    };

    const enviosFiltrados = useMemo(() => {
        const q = busca.trim().toLowerCase();
        return envios.filter(e => {
            if (filtroStatus !== 'todos' && statusDe(e) !== filtroStatus) return false;
            if (!q) return true;
            const cliente = (clientesMap.get(e.cliente_id) || '').toLowerCase();
            return cliente.includes(q) || (e.instituicao || '').toLowerCase().includes(q) || (e.arquivo_nome || '').toLowerCase().includes(q);
        });
    }, [envios, busca, filtroStatus, clientesMap, snapKeys]);

    const openEditar = (a: ManualAtivo) => {
        setEditar(a);
        setFormEdit({
            emissor: a.emissor || '',
            sub_tipo: (a.sub_tipo || '').toUpperCase(),
            benchmark: (a.benchmark || '').toUpperCase(),
            vencimento: a.data_vencimento ? a.data_vencimento.slice(0, 10) : '',
            cnpj: a.cnpj || '',
            ticker: a.ticker || '',
            isin: a.isin || '',
        });
    };
    const confirmarEditar = async () => {
        if (!editar) return;
        setSalvandoEdit(true);
        const { data, error } = await supabase.rpc('editar_ativo_manual', {
            p_id: editar.id,
            p_emissor: formEdit.emissor || null,
            p_sub_tipo: formEdit.sub_tipo || null,
            p_benchmark: formEdit.benchmark || null,
            p_data_vencimento: formEdit.vencimento || null,
            p_cnpj: formEdit.cnpj || null,
            p_ticker: formEdit.ticker || null,
            p_isin: formEdit.isin || null,
        });
        setSalvandoEdit(false);
        if (error) { toast.error(`Falha ao salvar: ${error.message}`); return; }
        toast.success((data as any)?.vinculado ? 'Salvo e vinculado a um canônico existente.' : 'Correção salva (fica local até promover).');
        setEditar(null);
        if (selecionado) abrirDoc(selecionado);
    };

    const openPromover = (a: ManualAtivo) => {
        setPromover(a);
        setForm({ classe: '', emissor_id: '', sub_tipo: (a.sub_tipo || '').toUpperCase(), benchmark: '', percentual: '', spread: '', vencimento: a.data_vencimento ? a.data_vencimento.slice(0, 10) : '', liquidez: '' });
    };
    const confirmarPromover = async () => {
        if (!promover) return;
        if (!form.classe) { toast.error('Classe é obrigatória.'); return; }
        setSalvando(true);
        const taxa = derivarTaxa(form.benchmark, form.percentual, form.spread);
        const { data, error } = await supabase.rpc('promover_ativo_manual', {
            p_manual_ativo_id: promover.id,
            p_classe: form.classe,
            p_emissor_id: form.emissor_id || null,
            p_sub_tipo: form.sub_tipo || null,
            p_benchmark: form.benchmark || null,
            p_taxa: taxa || null,
            p_vencimento: form.vencimento || null,
            p_liquidez: form.liquidez || null,
            p_percentual: form.percentual === '' ? null : Number(form.percentual),
            p_spread: form.spread === '' ? null : Number(form.spread),
        });
        setSalvando(false);
        if (error) { toast.error(`Falha ao promover: ${error.message}`); return; }
        toast.success((data as any)?.novo ? 'Ativo promovido ao global.' : 'Vinculado a um canônico existente.');
        setPromover(null);
        if (selecionado) abrirDoc(selecionado);
    };

    const abrirExcluir = async (e: Envio) => {
        setExcluir(e);
        setPreviewEx(null);
        setRemoverPos(false);
        const { data, error } = await supabase.rpc('excluir_envio_manual', { p_envio_id: e.id, p_dry_run: true });
        if (error) { toast.error(`Falha ao analisar: ${error.message}`); setExcluir(null); return; }
        setPreviewEx(data);
    };
    const confirmarExcluir = async () => {
        if (!excluir) return;
        setExcluindo(true);
        const removendoPos = removerPos && previewEx?.tem_posicao && !previewEx?.compartilhado;
        const { data, error } = await supabase.rpc('excluir_envio_manual', {
            p_envio_id: excluir.id,
            p_remover_posicao: removendoPos,
            p_dry_run: false,
        });
        setExcluindo(false);
        if (error) { toast.error(`Falha ao excluir: ${error.message}`); return; }
        const r = data as any;
        toast.success(r?.posicao_removida ? `Envio e posição (${r.ativos_removidos} ativos) excluídos.` : 'Envio excluído do histórico.');
        setEnvios(prev => prev.filter(x => x.id !== excluir.id));
        if (selecionado?.id === excluir.id) { setSelecionado(null); setAtivos([]); }
        setExcluir(null);
    };

    // ── Resolução de quarentena (master) ────────────────────────────────────
    const abrirCorrigir = (e: Envio) => {
        setCorrigir(e);
        setCorrigirData(e.data_referencia ? e.data_referencia.slice(0, 10) : '');
    };
    const confirmarCorrigir = async () => {
        if (!corrigir) return;
        setCorrigindo(true);
        const { error } = await supabase.rpc('corrigir_reenviar_envio', {
            p_envio_id: corrigir.id,
            p_data_referencia: corrigirData || null,
        });
        setCorrigindo(false);
        if (error) { toast.error(`Falha: ${error.message}`); return; }
        toast.success('Envio corrigido e reenfileirado — o worker vai reprocessar.');
        setCorrigir(null);
        carregarEnvios();
    };
    const confirmarDescartar = async () => {
        if (!descartarEnvio) return;
        setDescartando(true);
        const { error } = await supabase.rpc('descartar_envio', { p_envio_id: descartarEnvio.id });
        setDescartando(false);
        if (error) { toast.error(`Falha: ${error.message}`); return; }
        toast.success('Envio descartado.');
        setDescartarEnvio(null);
        carregarEnvios();
    };

    // Quem realmente enviou: pelo mapa de remetentes; senão o próprio master logado;
    // senão (uid não resolvido — só masters/consultores enviam) rotula "Master".
    const remetente = (uid: string | null): string => {
        if (!uid) return '—';
        return remetentesMap.get(uid) || (uid === perfil?.id ? (perfil?.nome ?? 'Master') : 'Master');
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <FileStack size={28} color="var(--color-secundaria)" />
                        <Typography variant="h1">{isMaster ? 'Documentos Manuais' : 'Meus Envios'}</Typography>
                    </div>
                    <Typography variant="p" style={{ color: 'var(--color-text-secondary)' }}>
                        {isMaster
                            ? 'Histórico dos envios processados sem API — auditar, corrigir o que a IA extraiu e promover ao global.'
                            : 'Acompanhe seus envios manuais: veja se já foram processados e corrija o que a IA extraiu.'}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <TextField leftIcon={Search} placeholder="Buscar por cliente, instituição ou arquivo..." value={busca} onChange={e => setBusca(e.target.value)} style={{ width: '320px' }} />
                </div>
            </header>

            {/* ── Nível 1 — Histórico de documentos (filtro de status em abas) ── */}
            <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--color-borda)', flexWrap: 'wrap' }}>
                {(['todos', 'quarentena', 'processando', 'processado', 'descartado', 'erro'] as const).map(s => (
                    <button key={s} onClick={() => setFiltroStatus(s)} style={{
                        padding: '10px 16px', fontSize: 14, fontWeight: 600, border: 'none', background: 'transparent', cursor: 'pointer',
                        color: filtroStatus === s ? 'var(--color-primaria)' : 'var(--color-text-secondary)',
                        borderBottom: filtroStatus === s ? '2px solid var(--color-primaria)' : '2px solid transparent',
                        marginBottom: -1,
                    }}>
                        {({ todos: 'Todos', quarentena: 'Quarentena', processando: 'Processando', processado: 'Processados', descartado: 'Descartados', erro: 'Com erro' } as const)[s]}
                    </button>
                ))}
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                            <th style={th}>Enviado</th>
                            <th style={th}>Cliente</th>
                            <th style={th}>Instituição</th>
                            <th style={th}>Arquivo</th>
                            <th style={th}>Ref.</th>
                            <th style={th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enviosFiltrados.map(e => {
                            const sel = selecionado?.id === e.id;
                            const st = statusDe(e);
                            return (
                                <tr key={e.id} onClick={() => abrirDoc(e)} style={{ cursor: 'pointer', background: sel ? 'var(--color-accent-subtle)' : undefined }}>
                                    <td style={td}>{fmtEnvio(e.enviado_em)}</td>
                                    <td style={td}>
                                        <div style={{ fontWeight: 600 }}>{clientesMap.get(e.cliente_id) || '—'}</div>
                                        {isMaster && <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>enviado por {remetente(e.enviado_por)}</div>}
                                    </td>
                                    <td style={td}><span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 6, border: '1px solid var(--color-border-default)' }}>{e.instituicao}</span></td>
                                    <td style={{ ...td, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <FileText size={14} style={{ verticalAlign: -2, marginRight: 6, color: 'var(--color-text-muted)' }} />{e.arquivo_nome || '—'}
                                    </td>
                                    <td style={td}>{fmtDate(e.data_referencia)}</td>
                                    <td style={td}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between', width: '100%' }}>
                                                <StatusEnvio tipo={st} />
                                                <button
                                                    title="Excluir envio"
                                                    onClick={(ev) => { ev.stopPropagation(); abrirExcluir(e); }}
                                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 6, border: '1px solid var(--color-border-subtle)', background: '#fff', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                                                    onMouseEnter={ev => { ev.currentTarget.style.color = 'var(--color-danger-solid)'; ev.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)'; ev.currentTarget.style.background = 'rgba(220,38,38,0.04)'; }}
                                                    onMouseLeave={ev => { ev.currentTarget.style.color = 'var(--color-text-muted)'; ev.currentTarget.style.borderColor = 'var(--color-border-subtle)'; ev.currentTarget.style.background = '#fff'; }}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            {(st === 'quarentena' || st === 'erro') && e.detalhe && (
                                                <div style={{ fontSize: 11, color: st === 'quarentena' ? 'var(--color-warning-text)' : 'var(--color-danger-solid)', maxWidth: 320, lineHeight: 1.35 }}>{e.detalhe}</div>
                                            )}
                                            {isMaster && st === 'quarentena' && (
                                                <div style={{ display: 'flex', gap: 6 }}>
                                                    <button onClick={(ev) => { ev.stopPropagation(); abrirCorrigir(e); }}
                                                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 26, padding: '0 10px', borderRadius: 6, border: '1px solid var(--color-primaria)', background: '#fff', color: 'var(--color-primaria)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                                        <RotateCcw size={12} />Corrigir e reenviar
                                                    </button>
                                                    <button onClick={(ev) => { ev.stopPropagation(); setDescartarEnvio(e); }}
                                                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 26, padding: '0 10px', borderRadius: 6, border: '1px solid var(--color-border-default)', background: '#fff', color: 'var(--color-text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                                        <Ban size={12} />Descartar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {enviosFiltrados.length === 0 && (
                            <tr><td colSpan={6} style={{ borderTop: '1px solid var(--color-surface-sunken)' }}>
                                <EstadoVazio
                                    compacto
                                    icon={FileStack}
                                    titulo={busca || filtroStatus !== 'todos' ? 'Nada encontrado com esses filtros' : 'Nenhum envio manual ainda'}
                                    dica={busca || filtroStatus !== 'todos'
                                        ? 'Ajuste a busca ou o filtro de status acima.'
                                        : 'Envios de PDF feitos no workspace do cliente aparecem aqui com o status do processamento.'}
                                />
                            </td></tr>
                        )}
                    </tbody>
                </table>
            </Card>

            {/* ── Nível 2 — Ativos do documento selecionado ── */}
            {selecionado && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowDownRight size={18} color="var(--color-primaria)" />
                        <Typography variant="p" style={{ fontWeight: 700 }}>Ativos do documento</Typography>
                        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                            {selecionado.arquivo_nome || '—'} · {ativos.length} ativo{ativos.length === 1 ? '' : 's'}
                            {ativos.length > 0 && ` · ${fmt(ativos.reduce((s, a) => s + (a.valor_bruto || 0), 0))}`}
                        </span>
                    </div>

                    <Card style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--primary-200)' }}>
                        {loadingAtivos ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Spinner size="md" /></div>
                        ) : ativos.length === 0 ? (
                            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
                                Sem ativos importados para este cliente/instituição/data — o documento foi enviado mas ainda não há posição manual correspondente.
                            </div>
                        ) : (
                            ativos.map(a => {
                                const id = identidade(a);
                                const verificado = !!a.ativo_canonico_id;
                                return (
                                    <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: '1px solid var(--color-surface-sunken)' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: 13, fontWeight: 600 }}>{a.emissor || a.ticker || '—'}</div>
                                            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                                {a.sub_tipo && <span style={{ background: 'var(--color-surface-sunken)', padding: '1px 6px', borderRadius: 4 }}>{a.sub_tipo}</span>}
                                                {a.benchmark && <span>{a.benchmark}</span>}
                                                {a.data_vencimento && <span>venc. {fmtDate(a.data_vencimento)}</span>}
                                                <span style={{ color: id.ok ? 'var(--color-success-text)' : 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                                                    {id.ok ? <Fingerprint size={12} /> : null}{id.label}
                                                </span>
                                                {a.editado_em && <span style={{ background: 'var(--color-info-bg)', color: '#4F46E5', padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>editado</span>}
                                                {a.conflito_reimport && (
                                                    <span title={conflitoTooltip(a)} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)', padding: '1px 6px', borderRadius: 4, fontWeight: 600, cursor: 'help' }}>
                                                        <AlertTriangle size={11} />a IA reextraiu diferente
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{fmt(a.valor_bruto || 0)}</div>
                                        {verificado
                                            ? <Badge variant="ghost" style={{ fontSize: 11, background: 'var(--color-success-bg)', color: 'var(--color-success-text)' }}><Link2 size={11} style={{ verticalAlign: -1, marginRight: 3 }} />Verificado</Badge>
                                            : <Badge variant="ghost" style={{ fontSize: 11, background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>Classificar</Badge>}
                                        <Button variant="outline" onClick={() => openEditar(a)} style={{ fontSize: 12, padding: '5px 10px' }}><Pencil size={14} style={{ marginRight: 4 }} />Editar</Button>
                                        {isMaster && !verificado && id.ok && (
                                            <Button variant="outline" onClick={() => openPromover(a)} style={{ fontSize: 12, padding: '5px 10px', borderColor: 'var(--color-primaria)', color: 'var(--color-primaria)' }}><ArrowUp size={14} style={{ marginRight: 4 }} />Promover</Button>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </Card>
                </>
            )}

            <Modal open={!!promover} onOpenChange={(o: boolean) => { if (!o) setPromover(null); }}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Promover ao global</ModalTitle>
                        <ModalDescription>Cria (ou reusa) um canônico a partir deste ativo. Passa a aparecer no Master Ativos e futuros ativos com a mesma identidade vinculam sozinhos.</ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{promover?.emissor || promover?.ticker || '—'}</div>
                            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{promover ? identidade(promover).label : ''}</div>
                        </div>
                        <div>
                            <label style={lbl}>Classe Avere *</label>
                            <Combo value={form.classe} onChange={v => setForm(f => ({ ...f, classe: v }))} options={classes.map(c => ({ label: c, value: c }))} placeholder="Selecione a classe..." />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={lbl}>Sub-tipo</label>
                                <Combo value={form.sub_tipo} onChange={v => setForm(f => ({ ...f, sub_tipo: v }))} options={SUBTIPOS.map(s => ({ label: s, value: s }))} placeholder="—" />
                            </div>
                            <div>
                                <label style={lbl}>Emissor (opcional)</label>
                                <Combo value={form.emissor_id} onChange={v => setForm(f => ({ ...f, emissor_id: v }))} options={[{ label: '(sem emissor)', value: '' }, ...emissores.map(em => ({ label: em.nome, value: em.id }))]} placeholder="(sem emissor)" />
                            </div>
                        </div>
                        {SUBTIPOS_COM_TAXA.has(form.sub_tipo.toUpperCase()) && (
                            <>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.9fr', gap: 12 }}>
                                    <div>
                                        <label style={lbl}>Indexador</label>
                                        <Combo value={form.benchmark} onChange={v => setForm(f => ({ ...f, benchmark: v }))} options={[{ label: '—', value: '' }, ...INDEXADORES.map(o => ({ label: o, value: o }))]} placeholder="—" />
                                    </div>
                                    <div>
                                        <label style={lbl}>% do indexador</label>
                                        <input type="number" style={ctrl} placeholder="100" value={form.percentual} onChange={e => setForm(f => ({ ...f, percentual: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label style={lbl}>Spread (% a.a.)</label>
                                        <input type="number" style={ctrl} value={form.spread} onChange={e => setForm(f => ({ ...f, spread: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label style={lbl}>Taxa (saída)</label>
                                    <input disabled value={derivarTaxa(form.benchmark, form.percentual, form.spread) || '—'} style={{ ...ctrl, background: 'var(--color-surface-sunken)', color: 'var(--color-text-primary)', fontWeight: 700 }} />
                                </div>
                            </>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={lbl}>Liquidez (D+)</label>
                                <input type="number" min="0" placeholder="D+" style={ctrl} value={form.liquidez} onChange={e => setForm(f => ({ ...f, liquidez: e.target.value }))} />
                            </div>
                            <div>
                                <label style={lbl}>Vencimento</label>
                                <input type="date" style={ctrl} value={form.vencimento} onChange={e => setForm(f => ({ ...f, vencimento: e.target.value }))} />
                            </div>
                        </div>
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setPromover(null)}>Cancelar</Button>
                        <Button variant="solid" onClick={confirmarPromover} disabled={salvando}>{salvando ? <Spinner size="sm" /> : 'Promover'}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal open={!!editar} onOpenChange={(o: boolean) => { if (!o) setEditar(null); }}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Editar o que a IA extraiu</ModalTitle>
                        <ModalDescription>Corrige os dados crus desta linha. Ao salvar com um identificador válido, religa a um canônico existente (se houver). A edição fica protegida de reimportações futuras.</ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Valor da posição: <strong style={{ color: 'var(--color-text-primary)' }}>{fmt(editar?.valor_bruto || 0)}</strong> · não editável (vem do documento)</div>
                        <div>
                            <label style={lbl}>Emissor / nome</label>
                            <input style={ctrl} value={formEdit.emissor} onChange={e => setFormEdit(f => ({ ...f, emissor: e.target.value }))} placeholder="Nome do emissor ou ativo" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={lbl}>Sub-tipo</label>
                                <Combo value={formEdit.sub_tipo} onChange={v => setFormEdit(f => ({ ...f, sub_tipo: v }))} options={SUBTIPOS.map(s => ({ label: s, value: s }))} placeholder="—" />
                            </div>
                            <div>
                                <label style={lbl}>Indexador</label>
                                <Combo value={formEdit.benchmark} onChange={v => setFormEdit(f => ({ ...f, benchmark: v }))} options={[{ label: '—', value: '' }, ...INDEXADORES.map(o => ({ label: o, value: o }))]} placeholder="—" />
                            </div>
                        </div>
                        <div>
                            <label style={lbl}>Vencimento</label>
                            <input type="date" style={ctrl} value={formEdit.vencimento} onChange={e => setFormEdit(f => ({ ...f, vencimento: e.target.value }))} />
                        </div>
                        <div style={{ borderTop: '1px solid var(--color-surface-sunken)', paddingTop: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 8 }}>Identificadores (religam ao global)</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={lbl}>CNPJ <span style={{ fontWeight: 400, textTransform: 'none' }}>(fundo)</span></label>
                                    <input style={ctrl} value={formEdit.cnpj} onChange={e => setFormEdit(f => ({ ...f, cnpj: e.target.value }))} placeholder="só fundo" />
                                </div>
                                <div>
                                    <label style={lbl}>Ticker</label>
                                    <input style={ctrl} value={formEdit.ticker} onChange={e => setFormEdit(f => ({ ...f, ticker: e.target.value }))} />
                                </div>
                                <div>
                                    <label style={lbl}>ISIN</label>
                                    <input style={ctrl} value={formEdit.isin} onChange={e => setFormEdit(f => ({ ...f, isin: e.target.value }))} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setEditar(null)}>Cancelar</Button>
                        <Button variant="solid" onClick={confirmarEditar} disabled={salvandoEdit}>{salvandoEdit ? <Spinner size="sm" /> : 'Salvar correção'}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal open={!!excluir} onOpenChange={(o: boolean) => { if (!o) setExcluir(null); }}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Excluir envio</ModalTitle>
                        <ModalDescription>
                            {excluir ? `${clientesMap.get(excluir.cliente_id) || '—'} · ${excluir.instituicao} · ${fmtDate(excluir.data_referencia)}` : ''}
                        </ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {!previewEx ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-text-secondary)', fontSize: 13 }}><Spinner size="sm" /> Analisando o que será removido…</div>
                        ) : !previewEx.tem_posicao ? (
                            <div style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
                                Este envio não gerou posição (ou ela já foi removida). Excluir remove <strong>apenas o registro do histórico</strong> — nenhuma carteira é afetada.
                            </div>
                        ) : (
                            <>
                                <div style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
                                    Este envio importou uma posição: <strong>{previewEx.ativos} ativo{previewEx.ativos === 1 ? '' : 's'}</strong> · {fmt(previewEx.valor_total || 0)}.
                                </div>
                                {previewEx.compartilhado ? (
                                    <div style={{ fontSize: 12, background: 'var(--color-info-bg)', color: '#1D4ED8', borderRadius: 8, padding: '10px 12px', display: 'flex', gap: 8 }}>
                                        <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                                        <span>A posição é <strong>compartilhada</strong> por outros envios na mesma conta/data. Pra não derrubar o que os outros trouxeram, a posição é <strong>preservada</strong> — só o registro deste envio é removido.</span>
                                    </div>
                                ) : (
                                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--color-text-primary)', cursor: 'pointer', background: 'var(--gray-50)', border: '1px solid var(--color-border-subtle)', borderRadius: 8, padding: '12px 14px' }}>
                                        <input type="checkbox" checked={removerPos} onChange={e => setRemoverPos(e.target.checked)} style={{ marginTop: 2 }} />
                                        <span>Remover <strong>também a posição</strong> da carteira do cliente (desfaz o import).</span>
                                    </label>
                                )}
                                {removerPos && !previewEx.compartilhado && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        {previewEx.afeta_home && (
                                            <div style={{ fontSize: 12, color: 'var(--color-warning-text)', display: 'flex', gap: 6 }}><AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />É a posição mais recente — a carteira do cliente na Home vai mudar.</div>
                                        )}
                                        {previewEx.editados > 0 && (
                                            <div style={{ fontSize: 12, color: 'var(--color-warning-text)', display: 'flex', gap: 6 }}><AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />{previewEx.editados} ativo{previewEx.editados === 1 ? '' : 's'} com correções suas — serão descartadas.</div>
                                        )}
                                        {previewEx.promovidos > 0 && (
                                            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'flex', gap: 6 }}><Link2 size={14} style={{ flexShrink: 0, marginTop: 1 }} />{previewEx.promovidos} já promovido{previewEx.promovidos === 1 ? '' : 's'} ao global — o canônico global permanece.</div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setExcluir(null)}>Cancelar</Button>
                        <Button variant="solid" onClick={confirmarExcluir} disabled={excluindo || !previewEx} style={{ background: 'var(--color-danger-solid)', borderColor: 'var(--color-danger-solid)' }}>
                            {excluindo ? <Spinner size="sm" /> : (removerPos && previewEx?.tem_posicao && !previewEx?.compartilhado ? 'Excluir envio + posição' : 'Excluir envio')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Corrigir e reenviar (quarentena → enviado) */}
            <Modal open={!!corrigir} onOpenChange={(o: boolean) => { if (!o) setCorrigir(null); }}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Corrigir e reenviar</ModalTitle>
                        <ModalDescription>
                            {corrigir ? `${clientesMap.get(corrigir.cliente_id) || '—'} · ${corrigir.instituicao}` : ''}
                        </ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {corrigir?.detalhe && (
                            <div style={{ fontSize: 12, background: 'rgba(245,158,11,0.1)', color: 'var(--color-warning-text)', borderRadius: 8, padding: '10px 12px', lineHeight: 1.4 }}>
                                <strong>Motivo da quarentena:</strong> {corrigir.detalhe}
                            </div>
                        )}
                        <div>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 6 }}>Data de referência</label>
                            <input type="date" value={corrigirData} onChange={ev => setCorrigirData(ev.target.value)}
                                style={{ height: 40, padding: '0 12px', borderRadius: 8, border: '1px solid var(--color-border-default)', fontSize: 14, width: '100%', boxSizing: 'border-box' }} />
                        </div>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--color-text-muted)' }}>Ao salvar, o envio volta pra fila e o worker reprocessa automaticamente.</p>
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setCorrigir(null)}>Cancelar</Button>
                        <Button variant="solid" onClick={confirmarCorrigir} disabled={corrigindo || !corrigirData}>
                            {corrigindo ? <Spinner size="sm" /> : 'Corrigir e reenviar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Descartar (quarentena → descartado) */}
            <Modal open={!!descartarEnvio} onOpenChange={(o: boolean) => { if (!o) setDescartarEnvio(null); }}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Descartar envio</ModalTitle>
                        <ModalDescription>
                            {descartarEnvio ? `${clientesMap.get(descartarEnvio.cliente_id) || '—'} · ${descartarEnvio.instituicao} · ${fmtDate(descartarEnvio.data_referencia)}` : ''}
                        </ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: 24, fontSize: 13, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
                        Marca este envio em quarentena como <strong>descartado</strong> — sai da fila e não será processado. Não afeta nenhuma carteira.
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setDescartarEnvio(null)}>Cancelar</Button>
                        <Button variant="solid" onClick={confirmarDescartar} disabled={descartando} style={{ background: 'var(--color-text-secondary)', borderColor: 'var(--color-text-secondary)' }}>
                            {descartando ? <Spinner size="sm" /> : 'Descartar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
