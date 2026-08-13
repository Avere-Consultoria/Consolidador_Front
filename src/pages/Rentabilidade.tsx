import { useState, useEffect, useMemo, useCallback } from 'react';
import { Typography, Card, Select, Spinner, Badge, toast } from 'avere-ui';
import { Sparkles, PenLine, AlertTriangle, Check, X, Trash2 } from 'lucide-react';

import { supabase } from '../services/supabase';
import { useClient } from '../contexts/ClientContext';
import { fmt } from '../utils/formatters';
import { NenhumClienteSelecionado } from '../components/home/NenhumClienteSelecionado';

// ─────────────────────────────────────────────────────────────────────────────
// Rentabilidade — Fase 1 (espelhamento). O front NÃO calcula nada: renderiza o
// contrato da RPC rentabilidade_cliente (linhas POR CONTA + consolidado + CDI).
// Spec: financial-consolidator/lab/rentabilidade/SPEC-fase1-rentabilidade.md
// ─────────────────────────────────────────────────────────────────────────────

interface Linha {
    instituicao: string;
    conta_codigo: string;
    apelido: string | null;
    chave: string;
    net: number | null;
    rentabilidade: number | null;
    origem: 'auto' | 'manual' | null;
    tem_dados: boolean;
}
interface Contrato {
    janela: string;
    mes_referencia: string;
    linhas: Linha[];
    consolidado: {
        rentabilidade: number | null;
        net_bloco: number;
        cobertura: number | null;
        benchmark_cdi: number | null;
        benchmarks?: { indexador: string; valor: number | null }[];
    };
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
    v === null || v === undefined ? '—' : `${(v * 100).toFixed(casas).replace('.', ',')}%`;

// Aceita "150.000,50", "150000,50" e "150000.50"; vazio → null.
function parseNumBR(s: string): number | null {
    const t = s.trim();
    if (!t) return null;
    const norm = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t;
    const n = Number(norm);
    return Number.isFinite(n) ? n : null;
}

const corRent = (v: number | null | undefined) =>
    v === null || v === undefined ? '#9CA3AF' : v < 0 ? '#DC2626' : 'var(--color-secundaria)';

const JANELAS = [
    { id: 'mes', label: 'Mês' },
    { id: 'ytd', label: 'YTD' },
    { id: '12m', label: '12 meses' },
] as const;

export default function Rentabilidade() {
    const { selectedClient } = useClient();

    const opcoesMes = useMemo(mesesFechados, []);
    const [janela, setJanela] = useState<'mes' | 'ytd' | '12m'>('mes');
    const [mesRef, setMesRef] = useState(opcoesMes[0].value);

    const [universo, setUniverso] = useState<Contrato | null>(null);   // sempre sem bloco (todas as linhas)
    const [consolidadoBloco, setConsolidadoBloco] = useState<Contrato['consolidado'] | null>(null);
    const [avisosBloco, setAvisosBloco] = useState<string[]>([]);
    const [desmarcadas, setDesmarcadas] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    // Edição manual (só janela 'mes', só linha não-automática)
    const [editando, setEditando] = useState<string | null>(null);
    const [formNet, setFormNet] = useState('');
    const [formRent, setFormRent] = useState('');
    const [salvando, setSalvando] = useState(false);

    const carregar = useCallback(async (bloco: string[] | null) => {
        if (!selectedClient?.id) return null;
        const { data, error } = await supabase.rpc('rentabilidade_cliente', {
            p_cliente_id: selectedClient.id,
            p_janela: janela,
            p_mes_ref: mesRef,
            p_bloco: bloco,
        });
        if (error) { toast.error('Erro ao carregar a rentabilidade.'); console.error(error); return null; }
        return data as Contrato;
    }, [selectedClient?.id, janela, mesRef]);

    // Universo completo (linhas) — recarrega ao trocar cliente/janela/mês
    useEffect(() => {
        (async () => {
            setLoading(true);
            setDesmarcadas(new Set());
            const d = await carregar(null);
            setUniverso(d);
            setConsolidadoBloco(d?.consolidado ?? null);
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
            setConsolidadoBloco(d.consolidado);
            setAvisosBloco(d.avisos);
        } else {
            const marcadas = d.linhas.map(l => l.chave).filter(c => !desm.has(c));
            const b = await carregar(marcadas.length ? marcadas : ['__nenhuma__']);
            setConsolidadoBloco(b?.consolidado ?? null);
            setAvisosBloco(b?.avisos ?? []);
        }
    }, [carregar]);

    const iniciarEdicao = (l: Linha) => {
        setEditando(l.chave);
        setFormNet(l.net !== null ? String(l.net).replace('.', ',') : '');
        setFormRent(l.rentabilidade !== null ? (l.rentabilidade * 100).toFixed(4).replace('.', ',') : '');
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

    // Consolidado do bloco — o engine recalcula; o front nunca pondera nada
    const alternarConta = async (chave: string) => {
        if (!universo) return;
        const novo = new Set(desmarcadas);
        if (novo.has(chave)) novo.delete(chave); else novo.add(chave);
        setDesmarcadas(novo);
        const marcadas = universo.linhas.map(l => l.chave).filter(c => !novo.has(c));
        const d = await carregar(marcadas.length ? marcadas : ['__nenhuma__']);
        setConsolidadoBloco(d?.consolidado ?? null);
        setAvisosBloco(d?.avisos ?? []);
    };

    if (!selectedClient) return <NenhumClienteSelecionado />;
    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    const linhas = universo?.linhas ?? [];
    const cons = consolidadoBloco;
    // Réguas de comparação (fallback: só CDI, p/ RPC antiga)
    const reguas = (cons?.benchmarks ?? [{ indexador: 'CDI', valor: cons?.benchmark_cdi ?? null }])
        .filter(b => b.valor !== null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', borderBottom: '1px solid var(--color-borda)', paddingBottom: 20 }}>
                <div>
                    <Typography variant="h1">Rentabilidade</Typography>
                    <Typography variant="p" style={{ opacity: 0.6 }}>
                        O número de cada conta é o que a própria instituição acusa — igual ao app dela.
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                    <Select label="Mês de referência" value={mesRef} onChange={(v: string) => setMesRef(v)} options={opcoesMes} />
                    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.04)', padding: 4, borderRadius: 8 }}>
                        {JANELAS.map(j => (
                            <button key={j.id} onClick={() => setJanela(j.id)}
                                style={{
                                    padding: '7px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
                                    fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-family)',
                                    background: janela === j.id ? '#fff' : 'transparent',
                                    color: janela === j.id ? 'var(--color-primaria)' : '#6B7280',
                                    boxShadow: janela === j.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                }}>
                                {j.label}
                            </button>
                        ))}
                    </div>
                </div>
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

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#F9FAFB' }}>
                            <th style={{ ...th, width: 36 }} />
                            <th style={th}>Conta</th>
                            <th style={thNum}>NET de fechamento</th>
                            <th style={thNum}>Rentabilidade ({JANELAS.find(j => j.id === janela)?.label})</th>
                            <th style={{ ...th, width: 110, textAlign: 'center' }}>Origem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas.map(l => {
                            const fora = desmarcadas.has(l.chave);
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
                                    {editando === l.chave ? (
                                        <>
                                            <td style={tdNum}>
                                                <input value={formNet} onChange={e => setFormNet(e.target.value)} placeholder="NET (R$)" style={inputCel} autoFocus />
                                            </td>
                                            <td style={tdNum}>
                                                <input value={formRent} onChange={e => setFormRent(e.target.value)} placeholder="% no mês (ex.: 0,85)" style={inputCel} />
                                            </td>
                                            <td style={{ ...td, textAlign: 'center', whiteSpace: 'nowrap' }}>
                                                <button title="Salvar" disabled={salvando} onClick={() => salvarManual(l)} style={{ ...btnCel, color: '#047857' }}><Check size={16} /></button>
                                                <button title="Cancelar" onClick={() => setEditando(null)} style={btnCel}><X size={16} /></button>
                                                {l.origem === 'manual' && (
                                                    <button title="Apagar lançamento" onClick={() => apagarManual(l)} style={{ ...btnCel, color: '#DC2626' }}><Trash2 size={15} /></button>
                                                )}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td style={tdNum}>{l.net !== null ? fmt(l.net) : <SemDado />}</td>
                                            <td style={{ ...tdNum, fontWeight: 700, color: corRent(l.rentabilidade) }}>
                                                {l.rentabilidade !== null ? pct(l.rentabilidade) : <SemDado />}
                                            </td>
                                            <td style={{ ...td, textAlign: 'center', whiteSpace: 'nowrap' }}>
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
                                                {janela === 'mes' && l.origem !== 'auto' && (
                                                    <button title={l.origem === 'manual' ? 'Editar lançamento' : 'Lançar manualmente'}
                                                        onClick={() => iniciarEdicao(l)} style={{ ...btnCel, marginLeft: 6 }}>
                                                        <PenLine size={14} />
                                                    </button>
                                                )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr style={{ background: 'color-mix(in srgb, var(--color-primaria), transparent 94%)', borderTop: '2px solid color-mix(in srgb, var(--color-primaria), transparent 70%)' }}>
                            <td style={td} />
                            <td style={{ ...td, fontWeight: 800, color: 'var(--color-primaria)' }}>CONSOLIDADO</td>
                            <td style={{ ...tdNum, fontWeight: 800, color: 'var(--color-primaria)' }}>{cons ? fmt(cons.net_bloco) : '—'}</td>
                            <td style={{ ...tdNum, fontWeight: 800, fontSize: 15, color: cons && cons.rentabilidade !== null && cons.rentabilidade < 0 ? '#DC2626' : 'var(--color-primaria)' }}>
                                {pct(cons?.rentabilidade)}
                            </td>
                            <td style={{ ...td, textAlign: 'center', fontSize: 11, color: 'var(--color-primaria)', fontWeight: 600 }}>
                                {cons?.cobertura !== null && cons?.cobertura !== undefined ? `${(cons.cobertura * 100).toFixed(0)}% coberto` : '—'}
                            </td>
                        </tr>
                        {reguas.map(b => {
                            const alpha = cons?.rentabilidade !== null && cons?.rentabilidade !== undefined && b.valor !== null
                                ? cons.rentabilidade - b.valor
                                : null;
                            return (
                                <tr key={b.indexador}>
                                    <td style={td} />
                                    <td style={{ ...td, fontWeight: 600, color: '#6B7280' }}>{b.indexador} ({JANELAS.find(j => j.id === janela)?.label})</td>
                                    <td style={td} />
                                    <td style={{ ...tdNum, fontWeight: 600, color: '#6B7280' }}>{pct(b.valor)}</td>
                                    <td style={{ ...td, textAlign: 'center', fontSize: 11, color: alpha === null ? '#9CA3AF' : alpha >= 0 ? '#047857' : '#DC2626', fontWeight: 700 }}>
                                        {alpha !== null ? `${alpha >= 0 ? '+' : ''}${(alpha * 100).toFixed(2).replace('.', ',')}pp` : ''}
                                    </td>
                                </tr>
                            );
                        })}
                    </tfoot>
                </table>
            </Card>

            <Typography variant="p" style={{ fontSize: 12, color: '#9CA3AF' }}>
                Consolidado = média das rentabilidades ponderada pela NET de fechamento do mês, sobre as contas marcadas que têm número.
                Desmarcar uma conta recalcula o consolidado sem ela.
            </Typography>
        </div>
    );
}

function SemDado() {
    return <span style={{ color: '#D1D5DB' }}>—</span>;
}

const inputCel: React.CSSProperties = {
    width: 140, padding: '6px 10px', borderRadius: 6, fontSize: 13, textAlign: 'right',
    border: '1px solid color-mix(in srgb, var(--color-primaria), transparent 50%)',
    fontFamily: 'var(--font-family)', outline: 'none', color: 'var(--color-secundaria)',
};
const btnCel: React.CSSProperties = {
    background: 'transparent', border: 'none', cursor: 'pointer', color: '#9CA3AF',
    padding: 4, borderRadius: 5, verticalAlign: 'middle',
};
const th: React.CSSProperties = { padding: '10px 16px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', textAlign: 'left', whiteSpace: 'nowrap' };
const thNum: React.CSSProperties = { ...th, textAlign: 'right' };
const td: React.CSSProperties = { padding: '12px 16px', fontSize: 13, color: '#374151', borderTop: '1px solid #F3F4F6' };
const tdNum: React.CSSProperties = { ...td, textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' };
