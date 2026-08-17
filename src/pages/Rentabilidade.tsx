import { useState, useEffect, useMemo, useCallback } from 'react';
import { Typography, Card, Select, Spinner, Badge, toast } from 'avere-ui';
import { Sparkles, PenLine, AlertTriangle, Check, X, Trash2 } from 'lucide-react';

import { supabase } from '../services/supabase';
import { useClient } from '../contexts/ClientContext';
import { fmt } from '../utils/formatters';
import { NenhumClienteSelecionado } from '../components/home/NenhumClienteSelecionado';

// ─────────────────────────────────────────────────────────────────────────────
// Rentabilidade — matriz de janelas (Mês · Ano · 12m · 24m · 36m nas colunas).
// O front NÃO calcula nada: renderiza o contrato da RPC
// rentabilidade_cliente_janelas (linhas POR CONTA + consolidado + réguas).
// Spec: financial-consolidator/lab/rentabilidade/SPEC-fase1-rentabilidade.md
// ─────────────────────────────────────────────────────────────────────────────

const JANELAS = [
    { key: 'mes', label: 'Mês' },
    { key: 'ytd', label: 'Ano' },
    { key: '12m', label: '12 meses' },
    { key: '24m', label: '24 meses' },
    { key: '36m', label: '36 meses' },
] as const;
type JanelaKey = typeof JANELAS[number]['key'];

interface Linha {
    instituicao: string;
    conta_codigo: string;
    apelido: string | null;
    chave: string;
    net: number | null;
    origem: 'auto' | 'manual' | null;
    tem_dados: boolean;
    rent: Partial<Record<JanelaKey, number | null>>;
}
interface Contrato {
    mes_referencia: string;
    linhas: Linha[];
    consolidado: {
        net_bloco: number;
        rent: Partial<Record<JanelaKey, number | null>>;
        cobertura: Partial<Record<JanelaKey, number | null>>;
    };
    benchmarks: { indexador: string; valores: Partial<Record<JanelaKey, number | null>> }[];
    avisos: string[];
}

const MESES_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

// Últimos 18 meses FECHADOS (mês corrente não aparece — decisão da Fase 1)
function mesesFechados(): { value: string; label: string }[] {
    const out: { value: string; label: string }[] = [];
    const d = new Date();
    d.setDate(1);
    for (let i = 0; i < 18; i++) {
        d.setMonth(d.getMonth() - 1);
        const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
        out.push({ value, label: `${MESES_PT[d.getMonth()]} ${d.getFullYear()}` });
    }
    return out;
}

const pct = (v: number | null | undefined, casas = 2) =>
    v === null || v === undefined ? null : `${(v * 100).toFixed(casas).replace('.', ',')}%`;

const corRent = (v: number | null | undefined) =>
    v === null || v === undefined ? '#9CA3AF' : v < 0 ? '#DC2626' : 'var(--color-secundaria)';

// Aceita "150.000,50", "150000,50" e "150000.50"; vazio → null.
function parseNumBR(s: string): number | null {
    const t = s.trim();
    if (!t) return null;
    const norm = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t;
    const n = Number(norm);
    return Number.isFinite(n) ? n : null;
}

export default function Rentabilidade() {
    const { selectedClient } = useClient();

    const opcoesMes = useMemo(mesesFechados, []);
    const [mesRef, setMesRef] = useState(opcoesMes[0].value);

    const [universo, setUniverso] = useState<Contrato | null>(null);   // sempre sem bloco (todas as linhas)
    const [consBloco, setConsBloco] = useState<Contrato['consolidado'] | null>(null);
    const [avisosBloco, setAvisosBloco] = useState<string[]>([]);
    const [desmarcadas, setDesmarcadas] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    // Edição manual (célula do MÊS — o tijolo; as janelas derivam)
    const [editando, setEditando] = useState<string | null>(null);
    const [formNet, setFormNet] = useState('');
    const [formRent, setFormRent] = useState('');
    const [salvando, setSalvando] = useState(false);

    const carregar = useCallback(async (bloco: string[] | null) => {
        if (!selectedClient?.id) return null;
        const { data, error } = await supabase.rpc('rentabilidade_cliente_janelas', {
            p_cliente_id: selectedClient.id,
            p_mes_ref: mesRef,
            p_bloco: bloco,
        });
        if (error) { toast.error('Erro ao carregar a rentabilidade.'); console.error(error); return null; }
        return data as Contrato;
    }, [selectedClient?.id, mesRef]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setDesmarcadas(new Set());
            setEditando(null);
            const d = await carregar(null);
            setUniverso(d);
            setConsBloco(d?.consolidado ?? null);
            setAvisosBloco(d?.avisos ?? []);
            setLoading(false);
        })();
    }, [carregar]);

    // Recarrega universo E consolidado respeitando o bloco marcado atual
    const recarregarTudo = useCallback(async (desm: Set<string>) => {
        const d = await carregar(null);
        setUniverso(d);
        if (!d) return;
        if (desm.size === 0) {
            setConsBloco(d.consolidado);
            setAvisosBloco(d.avisos);
        } else {
            const marcadas = d.linhas.map(l => l.chave).filter(c => !desm.has(c));
            const b = await carregar(marcadas.length ? marcadas : ['__nenhuma__']);
            setConsBloco(b?.consolidado ?? null);
            setAvisosBloco(b?.avisos ?? []);
        }
    }, [carregar]);

    // Consolidado do bloco — o engine recalcula; o front nunca pondera nada
    const alternarConta = async (chave: string) => {
        if (!universo) return;
        const novo = new Set(desmarcadas);
        if (novo.has(chave)) novo.delete(chave); else novo.add(chave);
        setDesmarcadas(novo);
        const marcadas = universo.linhas.map(l => l.chave).filter(c => !novo.has(c));
        const d = await carregar(marcadas.length ? marcadas : ['__nenhuma__']);
        setConsBloco(d?.consolidado ?? null);
        setAvisosBloco(d?.avisos ?? []);
    };

    const iniciarEdicao = (l: Linha) => {
        setEditando(l.chave);
        setFormNet(l.net !== null ? String(l.net).replace('.', ',') : '');
        const rm = l.rent?.mes;
        setFormRent(rm !== null && rm !== undefined ? (rm * 100).toFixed(4).replace('.', ',') : '');
    };

    const salvarManual = async (l: Linha) => {
        if (!selectedClient?.id) return;
        const net = parseNumBR(formNet);
        const rentPct = parseNumBR(formRent);
        if (net === null && rentPct === null) { toast.error('Informe ao menos a NET ou a rentabilidade.'); return; }
        setSalvando(true);
        const { error } = await supabase.from('rentabilidade_mensal').upsert([{
            cliente_id: selectedClient.id,
            instituicao: l.instituicao,
            conta_codigo: l.conta_codigo ?? '',
            mes_referencia: mesRef,
            net_fechamento: net,
            rentabilidade_mes: rentPct === null ? null : rentPct / 100,   // digitado em %, guardado em fração
            origem: 'manual',
            fonte_detalhe: 'manual',
        }], { onConflict: 'cliente_id,instituicao,conta_codigo,mes_referencia' });
        setSalvando(false);
        if (error) { console.error(error); toast.error('Não foi possível salvar (linha automática não é editável).'); return; }
        toast.success('Lançamento manual salvo.');
        setEditando(null);
        recarregarTudo(desmarcadas);
    };

    const apagarManual = async (l: Linha) => {
        if (!selectedClient?.id) return;
        const { error } = await supabase.from('rentabilidade_mensal').delete().match({
            cliente_id: selectedClient.id,
            instituicao: l.instituicao,
            conta_codigo: l.conta_codigo ?? '',
            mes_referencia: mesRef,
            origem: 'manual',
        });
        if (error) { console.error(error); toast.error('Não foi possível apagar.'); return; }
        toast.success('Lançamento manual removido.');
        setEditando(null);
        recarregarTudo(desmarcadas);
    };

    if (!selectedClient) return <NenhumClienteSelecionado />;
    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    const linhas = universo?.linhas ?? [];
    const cons = consBloco;
    const coberturaMes = cons?.cobertura?.mes;
    const reguas = (universo && cons ? universo.benchmarks : [])
        .filter(b => JANELAS.some(j => b.valores?.[j.key] !== null && b.valores?.[j.key] !== undefined));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', borderBottom: '1px solid var(--color-borda)', paddingBottom: 20 }}>
                <div>
                    <Typography variant="h1">Rentabilidade</Typography>
                    <Typography variant="p" style={{ opacity: 0.6 }}>
                        O número de cada conta é o que a própria instituição acusa — igual ao app dela.
                    </Typography>
                </div>
                <Select label="Mês de referência" value={mesRef} onChange={(v: string) => setMesRef(v)} options={opcoesMes} />
            </header>

            {/* Avisos de cobertura — nunca fingir 100% quando há conta sem dados */}
            {avisosBloco.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {avisosBloco.map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '8px 14px', fontSize: 13, color: '#92400E' }}>
                            <AlertTriangle size={15} style={{ flexShrink: 0 }} /> {a}
                        </div>
                    ))}
                </div>
            )}

            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                    <thead>
                        <tr style={{ background: '#F9FAFB' }}>
                            <th style={{ ...th, width: 36 }} />
                            <th style={th}>Conta</th>
                            <th style={thNum}>NET de fechamento</th>
                            {JANELAS.map(j => <th key={j.key} style={thNum}>{j.label}</th>)}
                            <th style={{ ...th, width: 120, textAlign: 'center' }}>Origem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas.map(l => {
                            const fora = desmarcadas.has(l.chave);
                            const emEdicao = editando === l.chave;
                            return (
                                <tr key={l.chave} style={{ opacity: fora ? 0.38 : 1, transition: 'opacity 0.15s' }}>
                                    <td style={td}>
                                        <input type="checkbox" checked={!fora} onChange={() => alternarConta(l.chave)}
                                            style={{ accentColor: 'var(--color-primaria)', cursor: 'pointer' }} />
                                    </td>
                                    <td style={td}>
                                        <span style={{ fontWeight: 700, color: 'var(--color-secundaria)' }}>{l.instituicao}</span>
                                        {l.conta_codigo && <span style={{ color: '#9CA3AF', marginLeft: 8, fontSize: 12, fontFamily: 'monospace' }}>{l.conta_codigo}</span>}
                                        {l.apelido && <span style={{ color: '#6B7280', marginLeft: 8, fontSize: 12 }}>({l.apelido})</span>}
                                    </td>

                                    {/* NET */}
                                    <td style={tdNum}>
                                        {emEdicao
                                            ? <input value={formNet} onChange={e => setFormNet(e.target.value)} placeholder="NET (R$)" style={inputCel} autoFocus />
                                            : (l.net !== null ? fmt(l.net) : <SemDado />)}
                                    </td>

                                    {/* Janelas — só a célula do MÊS é editável (o tijolo) */}
                                    {JANELAS.map(j => (
                                        <td key={j.key} style={{ ...tdNum, fontWeight: j.key === 'mes' ? 700 : 500, color: corRent(l.rent?.[j.key]) }}>
                                            {emEdicao && j.key === 'mes'
                                                ? <input value={formRent} onChange={e => setFormRent(e.target.value)} placeholder="% (ex.: 0,85)" style={inputCel} />
                                                : (pct(l.rent?.[j.key]) ?? <SemDado />)}
                                        </td>
                                    ))}

                                    {/* Origem / ações */}
                                    <td style={{ ...td, textAlign: 'center', whiteSpace: 'nowrap' }}>
                                        {emEdicao ? (
                                            <>
                                                <button title="Salvar" disabled={salvando} onClick={() => salvarManual(l)} style={{ ...btnCel, color: '#047857' }}><Check size={16} /></button>
                                                <button title="Cancelar" onClick={() => setEditando(null)} style={btnCel}><X size={16} /></button>
                                                {l.origem === 'manual' && (
                                                    <button title="Apagar lançamento" onClick={() => apagarManual(l)} style={{ ...btnCel, color: '#DC2626' }}><Trash2 size={15} /></button>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {l.origem === 'auto' && (
                                                    <Badge variant="ghost" style={{ fontSize: 9, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'color-mix(in srgb, var(--color-primaria), transparent 90%)', color: 'var(--color-primaria)', fontWeight: 700 }}>
                                                        <Sparkles size={10} /> AUTO
                                                    </Badge>
                                                )}
                                                {l.origem === 'manual' && (
                                                    <Badge variant="ghost" style={{ fontSize: 9, display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FEF3C7', color: '#92400E', fontWeight: 700 }}>
                                                        <PenLine size={10} /> MANUAL
                                                    </Badge>
                                                )}
                                                {!l.tem_dados && <span style={{ fontSize: 11, color: '#9CA3AF', fontStyle: 'italic' }}>sem dados</span>}
                                                {l.origem !== 'auto' && (
                                                    <button title={l.origem === 'manual' ? 'Editar lançamento do mês' : 'Lançar manualmente (mês)'}
                                                        onClick={() => iniciarEdicao(l)} style={{ ...btnCel, marginLeft: 6 }}>
                                                        <PenLine size={14} />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr style={{ background: 'color-mix(in srgb, var(--color-primaria), transparent 94%)', borderTop: '2px solid color-mix(in srgb, var(--color-primaria), transparent 70%)' }}>
                            <td style={td} />
                            <td style={{ ...td, fontWeight: 800, color: 'var(--color-primaria)' }}>CONSOLIDADO</td>
                            <td style={{ ...tdNum, fontWeight: 800, color: 'var(--color-primaria)' }}>{cons ? fmt(cons.net_bloco) : '—'}</td>
                            {JANELAS.map(j => {
                                const v = cons?.rent?.[j.key];
                                return (
                                    <td key={j.key} style={{ ...tdNum, fontWeight: 800, color: v !== null && v !== undefined && v < 0 ? '#DC2626' : 'var(--color-primaria)' }}>
                                        {pct(v) ?? '—'}
                                    </td>
                                );
                            })}
                            <td style={{ ...td, textAlign: 'center', fontSize: 11, color: 'var(--color-primaria)', fontWeight: 600 }}>
                                {coberturaMes !== null && coberturaMes !== undefined ? `${(coberturaMes * 100).toFixed(0)}% coberto` : '—'}
                            </td>
                        </tr>
                        {reguas.map(b => (
                            <tr key={b.indexador}>
                                <td style={td} />
                                <td style={{ ...td, fontWeight: 600, color: '#6B7280' }}>{b.indexador}</td>
                                <td style={td} />
                                {JANELAS.map(j => (
                                    <td key={j.key} style={{ ...tdNum, fontWeight: 600, color: '#6B7280' }}>
                                        {pct(b.valores?.[j.key]) ?? <SemDado />}
                                    </td>
                                ))}
                                <td style={td} />
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </Card>

            <Typography variant="p" style={{ fontSize: 12, color: '#9CA3AF' }}>
                Consolidado = média das rentabilidades ponderada pela NET de fechamento do mês, por janela, sobre as contas marcadas que têm número.
                Ano = do 1º de janeiro ao mês de referência. Janelas longas usam o valor publicado pela instituição quando existe (BTG) ou o encadeamento
                dos meses disponíveis. Réguas de benchmark só aparecem com a janela completa. O lápis edita o MÊS — as janelas derivam dele.
            </Typography>
        </div>
    );
}

function SemDado() {
    return <span style={{ color: '#D1D5DB' }}>—</span>;
}

const inputCel: React.CSSProperties = {
    width: 110, padding: '6px 10px', borderRadius: 6, fontSize: 13, textAlign: 'right',
    border: '1px solid color-mix(in srgb, var(--color-primaria), transparent 50%)',
    fontFamily: 'var(--font-family)', outline: 'none', color: 'var(--color-secundaria)',
};
const btnCel: React.CSSProperties = {
    background: 'transparent', border: 'none', cursor: 'pointer', color: '#9CA3AF',
    padding: 4, borderRadius: 5, verticalAlign: 'middle',
};
const th: React.CSSProperties = { padding: '10px 14px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', textAlign: 'left', whiteSpace: 'nowrap' };
const thNum: React.CSSProperties = { ...th, textAlign: 'right' };
const td: React.CSSProperties = { padding: '11px 14px', fontSize: 13, color: '#374151', borderTop: '1px solid #F3F4F6' };
const tdNum: React.CSSProperties = { ...td, textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' };
