import { useState, useEffect, useMemo } from 'react';
import { Typography, Card, Spinner, Badge, Button, TextField, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, toast } from 'avere-ui';
import { FileText, Search, FileStack, ArrowDownRight, Pencil, ArrowUp, Fingerprint, Link2, ChevronDown } from 'lucide-react';
import { supabase } from '../services/supabase';
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
}

// Data/hora do envio (ISO) → DD/MM HH:mm, timezone-safe o suficiente p/ exibição.
function fmtEnvio(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function StatusEnvio({ status }: { status: string }) {
    const s = (status || '').toLowerCase();
    if (s === 'processado') return <Badge variant="ghost" style={{ fontSize: 11, background: 'rgba(16,185,129,0.1)', color: '#059669' }}>Processado</Badge>;
    if (s === 'erro' || s === 'falha') return <Badge variant="ghost" style={{ fontSize: 11, background: 'rgba(239,68,68,0.1)', color: '#DC2626' }}>Com erro</Badge>;
    return <Badge variant="ghost" style={{ fontSize: 11, background: 'rgba(245,158,11,0.12)', color: '#B45309' }}>Enviado</Badge>;
}

function identidade(a: ManualAtivo): { label: string; ok: boolean } {
    if (a.cnpj) return { label: `CNPJ ${a.cnpj}`, ok: true };
    if (a.ticker) return { label: `Ticker ${a.ticker}`, ok: true };
    if (a.isin) return { label: `ISIN ${a.isin}`, ok: true };
    return { label: 'sem identificador', ok: false };
}

const th: React.CSSProperties = { padding: '10px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', textAlign: 'left', whiteSpace: 'nowrap' };
const td: React.CSSProperties = { padding: '11px 12px', fontSize: 13, color: '#374151', borderTop: '1px solid #F3F4F6' };
const lbl: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.03em' };
const ctrl: React.CSSProperties = { width: '100%', height: 38, boxSizing: 'border-box', padding: '0 10px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', fontSize: 13, outline: 'none', background: '#fff' };

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
                <span style={{ color: sel ? '#111827' : '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sel ? sel.label : (placeholder || 'Selecione...')}</span>
                <ChevronDown size={16} color="#9CA3AF" style={{ flexShrink: 0, marginLeft: 6 }} />
            </div>
            {open && (
                <>
                    <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 49 }} />
                    <div style={{ position: 'absolute', top: 41, left: 0, right: 0, zIndex: 50, background: '#fff', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', maxHeight: 240, overflowY: 'auto' }}>
                        <input autoFocus value={q} onChange={e => setQ(e.target.value)} onClick={e => e.stopPropagation()} placeholder="Buscar..." style={{ width: '100%', height: 34, border: 'none', borderBottom: '1px solid #F3F4F6', padding: '0 10px', outline: 'none', fontSize: 13, boxSizing: 'border-box' }} />
                        {filtered.length === 0 && <div style={{ padding: 10, fontSize: 12, color: '#9CA3AF' }}>Nenhum resultado</div>}
                        {filtered.slice(0, 200).map(o => (
                            <div key={o.value} onClick={() => { onChange(o.value); setOpen(false); setQ(''); }}
                                style={{ padding: '8px 10px', fontSize: 13, cursor: 'pointer', background: o.value === value ? 'rgba(0,131,203,0.06)' : '#fff' }}
                                onMouseEnter={ev => (ev.currentTarget.style.background = '#F3F4F6')}
                                onMouseLeave={ev => (ev.currentTarget.style.background = o.value === value ? 'rgba(0,131,203,0.06)' : '#fff')}>
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
    const [consultoresMap, setConsultoresMap] = useState<Map<string, string>>(new Map());

    const [selecionado, setSelecionado] = useState<Envio | null>(null);
    const [ativos, setAtivos] = useState<ManualAtivo[]>([]);
    const [loadingAtivos, setLoadingAtivos] = useState(false);

    const [busca, setBusca] = useState('');
    const [filtroStatus, setFiltroStatus] = useState<'todos' | 'processado' | 'erro'>('todos');

    const [classes, setClasses] = useState<string[]>([]);
    const [emissores, setEmissores] = useState<{ id: string; nome: string }[]>([]);
    const [promover, setPromover] = useState<ManualAtivo | null>(null);
    const [form, setForm] = useState({ classe: '', emissor_id: '', sub_tipo: '', benchmark: '', percentual: '', spread: '', vencimento: '', liquidez: '' });
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [enviosRes, clientesRes, consultoresRes, classesRes, emissoresRes] = await Promise.all([
                supabase.from('envio_pdf_manual').select('*').order('enviado_em', { ascending: false }).limit(500),
                supabase.from('clientes').select('id, nome'),
                supabase.from('consultores').select('id, nome'),
                supabase.from('dicionario_classes').select('nome').order('ordem_exibicao'),
                supabase.from('dicionario_emissores').select('id, nome_fantasia').order('nome_fantasia'),
            ]);
            setEnvios((enviosRes.data as Envio[]) || []);
            setClientesMap(new Map((clientesRes.data || []).map((c: any) => [c.id, c.nome])));
            setConsultoresMap(new Map((consultoresRes.data || []).map((c: any) => [c.id, c.nome])));
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
            .select('id, ativo_canonico_id, tipo, sub_tipo, emissor, cnpj, ticker, isin, valor_bruto, benchmark, data_vencimento')
            .eq('snapshot_id', snapId)
            .order('valor_bruto', { ascending: false });
        setAtivos((data as ManualAtivo[]) || []);
        setLoadingAtivos(false);
    };

    const enviosFiltrados = useMemo(() => {
        const q = busca.trim().toLowerCase();
        return envios.filter(e => {
            if (filtroStatus !== 'todos') {
                const s = (e.status || '').toLowerCase();
                if (filtroStatus === 'erro' ? !(s === 'erro' || s === 'falha') : s !== filtroStatus) return false;
            }
            if (!q) return true;
            const cliente = (clientesMap.get(e.cliente_id) || '').toLowerCase();
            return cliente.includes(q) || (e.instituicao || '').toLowerCase().includes(q) || (e.arquivo_nome || '').toLowerCase().includes(q);
        });
    }, [envios, busca, filtroStatus, clientesMap]);

    const emBreve = () => toast('Ação em desenvolvimento — próxima etapa.');

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

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <FileStack size={28} color="var(--color-secundaria)" />
                    <Typography variant="h1">Documentos Manuais</Typography>
                </div>
                <Typography variant="p" style={{ opacity: 0.6 }}>
                    Histórico dos envios processados sem API — auditar, corrigir o que a IA extraiu e promover ao global.
                </Typography>
            </header>

            {/* ── Nível 1 — Histórico de documentos ── */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField leftIcon={Search} placeholder="Buscar por cliente, instituição ou arquivo..." value={busca} onChange={e => setBusca(e.target.value)} style={{ width: '320px' }} />
                <div style={{ display: 'flex', gap: 4, background: 'rgba(0,0,0,0.05)', padding: 4, borderRadius: 8 }}>
                    {(['todos', 'processado', 'erro'] as const).map(s => (
                        <button key={s} onClick={() => setFiltroStatus(s)} style={{ height: 28, padding: '0 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', background: filtroStatus === s ? '#fff' : 'transparent', color: filtroStatus === s ? 'var(--color-primaria)' : '#6B7280', boxShadow: filtroStatus === s ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                            {s === 'todos' ? 'Todos' : s === 'processado' ? 'Processados' : 'Com erro'}
                        </button>
                    ))}
                </div>
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#F9FAFB' }}>
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
                            return (
                                <tr key={e.id} onClick={() => abrirDoc(e)} style={{ cursor: 'pointer', background: sel ? 'rgba(0,131,203,0.06)' : undefined }}>
                                    <td style={td}>{fmtEnvio(e.enviado_em)}</td>
                                    <td style={td}>
                                        <div style={{ fontWeight: 600 }}>{clientesMap.get(e.cliente_id) || '—'}</div>
                                        <div style={{ fontSize: 11, color: '#9CA3AF' }}>por {consultoresMap.get(e.consultor_id || '') || e.enviado_por || '—'}</div>
                                    </td>
                                    <td style={td}><span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.12)' }}>{e.instituicao}</span></td>
                                    <td style={{ ...td, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <FileText size={14} style={{ verticalAlign: -2, marginRight: 6, color: '#9CA3AF' }} />{e.arquivo_nome || '—'}
                                    </td>
                                    <td style={td}>{fmtDate(e.data_referencia)}</td>
                                    <td style={td}><StatusEnvio status={e.status} /></td>
                                </tr>
                            );
                        })}
                        {enviosFiltrados.length === 0 && (
                            <tr><td colSpan={6} style={{ ...td, textAlign: 'center', color: '#9CA3AF', padding: '32px' }}>Nenhum documento manual encontrado.</td></tr>
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
                        <span style={{ fontSize: 12, color: '#9CA3AF' }}>
                            {selecionado.arquivo_nome || '—'} · {ativos.length} ativo{ativos.length === 1 ? '' : 's'}
                            {ativos.length > 0 && ` · ${fmt(ativos.reduce((s, a) => s + (a.valor_bruto || 0), 0))}`}
                        </span>
                    </div>

                    <Card style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(0,131,203,0.25)' }}>
                        {loadingAtivos ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Spinner size="md" /></div>
                        ) : ativos.length === 0 ? (
                            <div style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>
                                Sem ativos importados para este cliente/instituição/data — o documento foi enviado mas ainda não há posição manual correspondente.
                            </div>
                        ) : (
                            ativos.map(a => {
                                const id = identidade(a);
                                const verificado = !!a.ativo_canonico_id;
                                return (
                                    <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: '1px solid #F3F4F6' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: 13, fontWeight: 600 }}>{a.emissor || a.ticker || '—'}</div>
                                            <div style={{ fontSize: 11, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                                {a.sub_tipo && <span style={{ background: '#F3F4F6', padding: '1px 6px', borderRadius: 4 }}>{a.sub_tipo}</span>}
                                                {a.benchmark && <span>{a.benchmark}</span>}
                                                {a.data_vencimento && <span>venc. {fmtDate(a.data_vencimento)}</span>}
                                                <span style={{ color: id.ok ? '#059669' : '#9CA3AF', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                                                    {id.ok ? <Fingerprint size={12} /> : null}{id.label}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{fmt(a.valor_bruto || 0)}</div>
                                        {verificado
                                            ? <Badge variant="ghost" style={{ fontSize: 11, background: 'rgba(16,185,129,0.1)', color: '#059669' }}><Link2 size={11} style={{ verticalAlign: -1, marginRight: 3 }} />Verificado</Badge>
                                            : <Badge variant="ghost" style={{ fontSize: 11, background: 'rgba(245,158,11,0.12)', color: '#B45309' }}>Classificar</Badge>}
                                        <Button variant="outline" onClick={emBreve} style={{ fontSize: 12, padding: '5px 10px' }}><Pencil size={14} style={{ marginRight: 4 }} />Editar</Button>
                                        {!verificado && (
                                            id.ok
                                                ? <Button variant="outline" onClick={() => openPromover(a)} style={{ fontSize: 12, padding: '5px 10px', borderColor: 'var(--color-primaria)', color: 'var(--color-primaria)' }}><ArrowUp size={14} style={{ marginRight: 4 }} />Promover</Button>
                                                : <Button variant="outline" onClick={emBreve} style={{ fontSize: 12, padding: '5px 10px' }}>Classificar local</Button>
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
                            <div style={{ fontSize: 12, color: '#6B7280' }}>{promover ? identidade(promover).label : ''}</div>
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
                                    <input disabled value={derivarTaxa(form.benchmark, form.percentual, form.spread) || '—'} style={{ ...ctrl, background: '#F3F4F6', color: '#374151', fontWeight: 700 }} />
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
        </div>
    );
}
