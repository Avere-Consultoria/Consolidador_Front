import { useState, useEffect } from 'react';
import { Typography, Badge, Button, Spinner, toast } from 'avere-ui';
import { X, GitMerge, Save } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { camposBibliotecaPorSubtipo, normalizarChave } from '../../config/bibliotecaSchema';

// ── Tipos ─────────────────────────────────────────────────────────────────────
export interface VisaoInstitucionalDetalhe {
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

export interface CanonicoDetalhe {
    id: string;
    nome_canonico: string;
    classe_avere: string;
    liquidez_avere: string;
    data_vencimento: string;
    emissor_id: string;
    conglomerado_id: string;
    taxa_canonica: string;
    taxa_formatada?: string;
    benchmark_canonico: string;
    sub_tipo_canonico: string;
    is_fii: boolean;
    is_coe: boolean;
    notas: string;
    visoes: VisaoInstitucionalDetalhe[];
}

interface DrawerCanonicoProps {
    isOpen: boolean;
    onClose: () => void;
    canonico: CanonicoDetalhe | null;
    emissores: { id: string; nome_fantasia: string }[];
    conglomerados: { id: string; nome_lider: string }[];
    classes: { nome: string }[];
    onFundir: (canonico: CanonicoDetalhe) => void;
    onSalvo: () => void;
}

const SUBTIPOS_BANCARIO = new Set(['CDB', 'LCI', 'LCA', 'LF', 'LIG', 'RDB', 'LH', 'LC', 'LCD', 'DPGE', 'RDC']);
const isBancario = (subTipo: string) => SUBTIPOS_BANCARIO.has((subTipo || '').toUpperCase().trim());

const CORES_INST: Record<string, { bg: string; fg: string; border: string }> = {
    BTG:    { bg: '#E0F2FE', fg: '#0369A1', border: '#7DD3FC' },
    XP:     { bg: '#FFEDD5', fg: '#C2410C', border: '#FDBA74' },
    AVENUE: { bg: '#FEF3C7', fg: '#92400E', border: '#FCD34D' },
    AGORA:  { bg: '#DCFCE7', fg: '#15803D', border: '#86EFAC' },
};

const ctrlStyle: React.CSSProperties = {
    width: '100%', height: '38px', boxSizing: 'border-box',
    padding: '0 10px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)',
    fontSize: '13px', fontFamily: 'var(--font-family)', outline: 'none', background: '#fff',
};
const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '10px', fontWeight: 700, color: '#6B7280',
    textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px',
};

function formatarDataBR(iso: string | null | undefined): string {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

// Subtipos que têm taxa/benchmark (RF + fundos). RV/COE não usam o construtor.
const SUBTIPOS_COM_TAXA = new Set([
    'CDB','LCI','LCA','CRA','CRI','DEB','DEBÊNTURE','CDCA','LF','LFT','LTN',
    'NTN-B','NTN-F','NTNB','NTNF','LCD','RDB','LIG','FI','FUNDO',
]);

// Monta a Taxa a partir dos componentes (fonte única → saída padronizada).
const INDEXADORES = ['IPCA', 'IGP-M', 'CDI', 'SELIC', 'PRÉ', 'TR', 'DÓLAR'];
function derivarTaxa(indexador?: string, percentual?: any, spread?: any): string {
    const idx = (indexador || '').trim();
    const pct = percentual === '' || percentual == null ? null : Number(percentual);
    const spr = spread === '' || spread == null ? null : Number(spread);
    const f = (n: number) => n.toFixed(2).replace('.', ',');
    if (!idx) return spr != null ? `${f(spr)}% a.a.` : '';
    if (/^PR[EÉ]/i.test(idx)) return spr != null ? `${f(spr)}% a.a.` : 'PRÉ';
    if (pct != null && Math.abs(pct - 100) > 0.01) return `${f(pct)}% ${idx}`;
    if (spr != null && spr > 0) return `${idx} + ${f(spr)}%`;
    // Regra do master: CDI puro → "100% CDI"; demais indexadores ficam só o nome.
    return /^CDI$/i.test(idx) ? '100% CDI' : idx;
}

// Inverso do derivarTaxa: decompõe a taxa formatada (fonte exibida) de volta em
// indexador + % + spread. Necessário porque a API às vezes só manda a taxa
// pré-formatada (ex.: "103,25% do CDI") sem os componentes — sem isto a modal
// mostrava só o indexador e CORROMPIA a taxa ao salvar.
function parseTaxa(taxa?: string | null): { indexador: string; percentual: number | null; spread: number | null } | null {
    const s = (taxa || '').trim();
    if (!s) return null;
    const n = (t: string) => Number(String(t).replace(',', '.'));
    let idx = '';
    if (/IPCA|IPC-A/i.test(s)) idx = 'IPCA';
    else if (/IGP[-\s]?M/i.test(s)) idx = 'IGP-M';
    else if (/CDI/i.test(s)) idx = 'CDI';
    else if (/SELIC/i.test(s)) idx = 'SELIC';
    else if (/\bTR\b/i.test(s)) idx = 'TR';
    else if (/D[OÓ]LAR/i.test(s)) idx = 'DÓLAR';
    else if (/PR[EÉ]/i.test(s)) idx = 'PRÉ';
    const mSpread = s.match(/\+\s*(\d+(?:[.,]\d+)?)\s*%/);                 // "IDX + X%"
    if (mSpread) return { indexador: idx, percentual: null, spread: n(mSpread[1]) };
    const mPct = s.match(/(\d+(?:[.,]\d+)?)\s*%\s*(?:do\s+)?(?:IPCA|IGP[-\s]?M|CDI|SELIC|TR|D[OÓ]LAR)/i); // "X% [do] IDX"
    if (mPct) return { indexador: idx, percentual: n(mPct[1]), spread: null };
    const mPura = s.match(/^\+?\s*(\d+(?:[.,]\d+)?)\s*%(?:\s*a\.?\s*a\.?)?$/i);   // "X% a.a." (prefixado)
    if (mPura) return { indexador: idx || 'PRÉ', percentual: null, spread: n(mPura[1]) };
    return { indexador: idx, percentual: null, spread: null };
}

function Campo({ label, valor }: { label: string; valor: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="p" style={{ fontSize: '9px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0, lineHeight: 1.2 }}>
                {label}
            </Typography>
            <Typography variant="p" style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: 0, lineHeight: 1.3 }}>
                {valor || <span style={{ color: '#9CA3AF', fontStyle: 'italic', fontWeight: 400 }}>—</span>}
            </Typography>
        </div>
    );
}

function CardVisaoInstitucional({ visao }: { visao: VisaoInstitucionalDetalhe }) {
    const cor = CORES_INST[visao.instituicao_origem] ?? { bg: '#F3F4F6', fg: '#374151', border: '#D1D5DB' };
    return (
        <div style={{ background: cor.bg, border: `1px solid ${cor.border}`, borderRadius: '8px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#fff', color: cor.fg, fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.05em' }}>
                    {visao.instituicao_origem}
                </span>
                <Typography variant="p" style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: cor.fg }}>
                    {visao.codigo_identificador}
                </Typography>
                <span style={{ fontSize: '9px', color: cor.fg, fontWeight: 600, opacity: 0.7 }}>{visao.tipo_identificador}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
                <Campo label="Nome na API"      valor={visao.nome_ativo} />
                <Campo label="Emissor original" valor={visao.emissor_original} />
                <Campo label="Classe original"  valor={visao.classe_original} />
                <Campo label="Taxa"             valor={visao.taxa_formatada || visao.index_rate} />
                <Campo label="Liquidez API"     valor={visao.liquidez_api_original ? `D+${visao.liquidez_api_original}` : null} />
                <Campo label="Venc. API"        valor={formatarDataBR(visao.vencimento_api_original)} />
            </div>
        </div>
    );
}

export function DrawerCanonico({ isOpen, onClose, canonico, emissores, conglomerados, classes, onFundir, onSalvo }: DrawerCanonicoProps) {
    const [form, setForm] = useState({ classe_avere: '', liquidez_avere: '', data_vencimento: '', emissor_id: '', conglomerado_id: '', benchmark: '' });
    const [salvando, setSalvando] = useState(false);
    const [detalhes, setDetalhes] = useState<Record<string, any>>({});  // biblioteca_ativos.detalhes
    const [bibChave, setBibChave] = useState<string | null>(null);      // chave da linha na biblioteca

    useEffect(() => {
        if (!canonico) return;
        // Decompõe a taxa atual nos componentes do construtor (fonte de verdade exibida).
        const parsed = parseTaxa(canonico.taxa_formatada || canonico.taxa_canonica);
        setForm({
            classe_avere:    canonico.classe_avere || '',
            liquidez_avere:  canonico.liquidez_avere || '',
            data_vencimento: canonico.data_vencimento || '',
            emissor_id:      canonico.emissor_id || '',
            conglomerado_id: canonico.conglomerado_id || '',
            benchmark:       canonico.benchmark_canonico || parsed?.indexador || '',
        });
        // Carrega os detalhes curados da biblioteca (por qualquer identificador do ativo).
        const idents = canonico.visoes
            .map(v => normalizarChave(v.codigo_identificador))
            .filter((c): c is string => !!c);
        if (idents.length === 0) {
            setDetalhes(parsed ? { percentual_indexador: parsed.percentual, spread: parsed.spread } : {});
            setBibChave(null); return;
        }
        supabase.from('biblioteca_ativos').select('chave, detalhes').in('chave', idents).limit(1)
            .then(({ data }) => {
                const row = data?.[0];
                setBibChave(row?.chave ?? idents[0]);
                const det = { ...(row?.detalhes ?? {}) };
                // Construtor: quando a biblioteca não tem os componentes, deriva-os da taxa
                // do canônico — senão a saída ficava só o indexador e corrompia ao salvar.
                if (det.percentual_indexador == null || det.percentual_indexador === '') det.percentual_indexador = parsed?.percentual ?? null;
                if (det.spread == null || det.spread === '') det.spread = parsed?.spread ?? null;
                setDetalhes(det);
            });
    }, [canonico]);

    if (!isOpen || !canonico) return null;

    const bancario = isBancario(canonico.sub_tipo_canonico);
    const instituicoesDistintas = Array.from(new Set(canonico.visoes.map(v => v.instituicao_origem)));

    const handleSalvar = async () => {
        setSalvando(true);
        const classeMudou = (form.classe_avere || null) !== (canonico.classe_avere || null);
        const taxaDerivada = derivarTaxa(form.benchmark, detalhes.percentual_indexador, detalhes.spread);
        const { error } = await supabase.from('ativos_canonicos').update({
            classe_avere:       form.classe_avere || null,
            liquidez_avere:     form.liquidez_avere || null,
            data_vencimento:    form.data_vencimento || null,
            emissor_id:         bancario ? null : (form.emissor_id || null),
            conglomerado_id:    bancario ? (form.conglomerado_id || null) : null,
            benchmark_canonico: form.benchmark || null,
            taxa_formatada:     taxaDerivada || null,
            taxa_canonica:      taxaDerivada || null,
            // classe definida pelo Master é intocável por reprocessamentos
            ...(classeMudou ? { origem_classificacao: form.classe_avere ? 'manual' : null } : {}),
        }).eq('id', canonico.id);

        // Curadoria rica → biblioteca (durável; sobrevive a reset do canônico).
        if (!error && bibChave) {
            await supabase.from('biblioteca_ativos').upsert({
                chave:         bibChave,
                sub_tipo:      canonico.sub_tipo_canonico || null,
                nome_ref:      canonico.nome_canonico || null,
                classe_avere:   form.classe_avere || null,
                benchmark:      form.benchmark || null,
                taxa_formatada: taxaDerivada || null,
                detalhes,
                fonte:          'manual',
                atualizado_em: new Date().toISOString(),
            }, { onConflict: 'chave' });
        }

        setSalvando(false);
        if (error) { toast.error(`Erro ao salvar: ${error.message}`); return; }
        toast.success('Ativo classificado.');
        onSalvo();
        onClose();
    };

    return (
        <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(8,31,40,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px', fontFamily: 'var(--font-family)' }}
            onClick={onClose}
        >
            <div
                style={{ background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '720px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* ── Cabeçalho ── */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexShrink: 0 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h2" style={{ fontSize: '18px', margin: 0, color: 'var(--color-secundaria)', fontWeight: 700 }}>
                            {canonico.nome_canonico}
                        </Typography>
                        {canonico.visoes[0] && (
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline', marginTop: '4px' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#6B7280' }}>
                                    {canonico.visoes[0].codigo_identificador}
                                </span>
                                <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>
                                    {canonico.visoes[0].tipo_identificador}
                                </span>
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {instituicoesDistintas.map(inst => {
                                const cor = CORES_INST[inst] ?? { bg: '#E5E7EB', fg: '#374151' };
                                return <span key={inst} style={{ background: cor.bg, color: cor.fg, fontSize: '9px', fontWeight: 800, padding: '3px 7px', borderRadius: '4px' }}>{inst}</span>;
                            })}
                            <Badge variant="ghost" style={{ fontSize: '9px', background: bancario ? 'rgba(16,185,129,0.1)' : 'rgba(124,58,237,0.1)', color: bancario ? '#10B981' : '#7C3AED' }}>
                                {bancario ? '🏦 Bancário/FGC' : '🏭 Privado'}
                            </Badge>
                            {canonico.is_fii && <Badge intent="primaria" variant="ghost" style={{ fontSize: '9px' }}>FII</Badge>}
                            {canonico.is_coe && <Badge intent="alerta"   variant="ghost" style={{ fontSize: '9px' }}>COE</Badge>}
                        </div>
                    </div>
                    <X size={20} color="#9CA3AF" style={{ cursor: 'pointer', flexShrink: 0 }} onClick={onClose} />
                </div>

                {/* ── Corpo ── */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>

                    {/* Classificação Avere (EDITÁVEL) */}
                    <section>
                        <Typography variant="p" style={{ fontSize: '11px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                            Classificação Avere
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            {/* Risco (world-aware) — full */}
                            <div>
                                <label style={labelStyle}>{bancario ? 'Conglomerado (FGC)' : 'Emissor (risco)'}</label>
                                <select
                                    style={{ ...ctrlStyle, background: (bancario ? form.conglomerado_id : form.emissor_id) ? '#fff' : 'rgba(239,68,68,0.05)' }}
                                    value={bancario ? form.conglomerado_id : form.emissor_id}
                                    onChange={e => setForm(p => bancario ? { ...p, conglomerado_id: e.target.value } : { ...p, emissor_id: e.target.value })}
                                >
                                    <option value="">{bancario ? 'Selecione o conglomerado...' : 'Selecione o emissor...'}</option>
                                    {bancario
                                        ? conglomerados.map(c => <option key={c.id} value={c.id}>{c.nome_lider}</option>)
                                        : emissores.map(e => <option key={e.id} value={e.id}>{e.nome_fantasia}</option>)}
                                </select>
                            </div>

                            {/* Classe — full */}
                            <div>
                                <label style={labelStyle}>Classe Avere</label>
                                <select
                                    style={{ ...ctrlStyle, background: form.classe_avere ? '#fff' : 'rgba(245,158,11,0.05)' }}
                                    value={form.classe_avere}
                                    onChange={e => setForm(p => ({ ...p, classe_avere: e.target.value }))}
                                >
                                    <option value="">Não classificado</option>
                                    {classes.map(c => <option key={c.nome} value={c.nome}>{c.nome}</option>)}
                                </select>
                            </div>

                            {/* Liquidez | Vencimento */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                <div>
                                    <label style={labelStyle}>Liquidez (D+)</label>
                                    <input type="number" min="0" placeholder="D+" style={ctrlStyle}
                                        value={form.liquidez_avere}
                                        onChange={e => setForm(p => ({ ...p, liquidez_avere: e.target.value }))} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Vencimento (API)</label>
                                    <input type="date" disabled style={{ ...ctrlStyle, background: '#F3F4F6', color: '#6B7280' }}
                                        value={form.data_vencimento} />
                                </div>
                            </div>

                            {/* Construtor de Taxa — componentes (fonte) → Taxa (saída derivada) */}
                            {SUBTIPOS_COM_TAXA.has((canonico.sub_tipo_canonico || '').toUpperCase().trim()) && (
                                <>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.9fr', gap: '14px' }}>
                                        <div>
                                            <label style={labelStyle}>Indexador</label>
                                            <select style={ctrlStyle} value={form.benchmark}
                                                onChange={e => setForm(p => ({ ...p, benchmark: e.target.value }))}>
                                                <option value="">—</option>
                                                {INDEXADORES.map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={labelStyle}>% do indexador</label>
                                            <input type="number" style={ctrlStyle} placeholder="100"
                                                value={detalhes.percentual_indexador ?? ''}
                                                onChange={e => setDetalhes(p => ({ ...p, percentual_indexador: e.target.value === '' ? null : Number(e.target.value) }))} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Spread (% a.a.)</label>
                                            <input type="number" style={ctrlStyle}
                                                value={detalhes.spread ?? ''}
                                                onChange={e => setDetalhes(p => ({ ...p, spread: e.target.value === '' ? null : Number(e.target.value) }))} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Taxa (saída)</label>
                                        <input disabled
                                            value={derivarTaxa(form.benchmark, detalhes.percentual_indexador, detalhes.spread) || '—'}
                                            style={{ ...ctrlStyle, background: '#F3F4F6', color: '#374151', fontWeight: 700 }} />
                                    </div>
                                </>
                            )}

                            {/* Info read-only (origem da API) — separada da edição */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px', fontSize: '12px', color: '#6B7280' }}>
                                <span><strong style={{ color: '#374151' }}>Sub-tipo:</strong> {canonico.sub_tipo_canonico || '—'}</span>
                            </div>
                        </div>
                    </section>

                    {/* Detalhes do ativo (biblioteca) — curável por subtipo (schema-driven) */}
                    {camposBibliotecaPorSubtipo(canonico.sub_tipo_canonico).length > 0 && (
                        <section>
                            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                                Detalhes do ativo · {canonico.sub_tipo_canonico}
                                <span style={{ fontWeight: 500, textTransform: 'none', color: '#9CA3AF' }}> (biblioteca)</span>
                            </Typography>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', background: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                {camposBibliotecaPorSubtipo(canonico.sub_tipo_canonico).map(campo => (
                                    <div key={campo.key}>
                                        <label style={labelStyle}>{campo.label}</label>
                                        {campo.tipo === 'boolean' ? (
                                            <select style={ctrlStyle}
                                                value={detalhes[campo.key] === true ? 'sim' : detalhes[campo.key] === false ? 'nao' : ''}
                                                onChange={e => setDetalhes(p => ({ ...p, [campo.key]: e.target.value === '' ? null : e.target.value === 'sim' }))}>
                                                <option value="">—</option>
                                                <option value="sim">Sim</option>
                                                <option value="nao">Não</option>
                                            </select>
                                        ) : campo.tipo === 'select' ? (
                                            <select style={ctrlStyle}
                                                value={detalhes[campo.key] ?? ''}
                                                onChange={e => setDetalhes(p => ({ ...p, [campo.key]: e.target.value || null }))}>
                                                <option value="">—</option>
                                                {campo.opcoes!.map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        ) : (
                                            <input
                                                type={campo.tipo === 'number' ? 'number' : 'text'}
                                                style={ctrlStyle}
                                                value={detalhes[campo.key] ?? ''}
                                                onChange={e => setDetalhes(p => ({ ...p, [campo.key]: e.target.value === '' ? null : (campo.tipo === 'number' ? Number(e.target.value) : e.target.value) }))}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Visões Institucionais */}
                    <section>
                        <Typography variant="p" style={{ fontSize: '11px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                            Como cada instituição vê este ativo ({canonico.visoes.length})
                        </Typography>
                        {canonico.visoes.length === 0 ? (
                            <Typography variant="p" style={{ fontSize: '13px', color: '#9CA3AF', fontStyle: 'italic' }}>
                                Nenhuma visão institucional registrada ainda.
                            </Typography>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {canonico.visoes.map((v, i) => (
                                    <CardVisaoInstitucional key={`${v.instituicao_origem}-${v.codigo_identificador}-${i}`} visao={v} />
                                ))}
                            </div>
                        )}
                    </section>

                </div>

                {/* ── Rodapé ── */}
                <div style={{ padding: '16px 24px', background: '#F9FAFB', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', gap: '12px', borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px', flexShrink: 0 }}>
                    <Button variant="outline" onClick={() => onFundir(canonico)}>
                        <GitMerge size={16} style={{ marginRight: '8px' }} />
                        Fundir
                    </Button>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button variant="outline" onClick={onClose} disabled={salvando}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSalvar} disabled={salvando}>
                            {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />}
                            Salvar
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
