import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Typography, Card, Spinner } from 'avere-ui';
import { AlertTriangle, ChevronDown, ChevronRight, PieChart as PieIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

import { supabase } from '../../services/supabase';
import { fmt } from '../../utils/formatters';
import { PALETA_LINHAS } from '../../utils/chartPalette';
import { isValidHex } from '../../utils/colors';
import { EstadoErro } from '../shared/EstadoErro';
import { EstadoVazio } from '../shared/EstadoVazio';

// ─────────────────────────────────────────────────────────────────────────────
// Rentabilidade POR ATIVO (Fase 2) — Composição por Estratégia + Posição por
// Ativo. O front NÃO calcula nada: renderiza o contrato da RPC
// rentabilidade_ativos (grupos por classe_avere da AVERE + guarda-corpos §5).
// Spec: financial-consolidator/lab/rentabilidade/SPEC-fase2-rentabilidade-por-ativo.md
// ─────────────────────────────────────────────────────────────────────────────

type JanKey = 'mes' | 'ytd' | '12m';

interface AtivoRow {
    nome: string;
    instituicao: string;
    conta_codigo: string;
    net: number | null;
    peso: number | null;
    rent: Partial<Record<JanKey | 'desde_compra', number | null>>;
    pct_cdi: Partial<Record<JanKey, number | null>>;
    contribuicao: number | null;
    qualidade: 'ok' | 'calculado_por_valor' | 'sem_rentabilidade';
}
interface Grupo {
    classe: string;
    cor: string | null;
    net: number | null;
    peso: number | null;
    rent: Partial<Record<JanKey, number | null>>;
    contribuicao: number | null;
    ativos: AtivoRow[];
}
interface ContratoAtivos {
    mes_referencia: string;
    grupos: Grupo[];
    consolidado: { net: number; rent: Partial<Record<JanKey, number | null>>; cobertura: number | null };
    benchmarks: { indexador: string; valores: Partial<Record<JanKey, number | null>> }[];
    avisos: string[];
}

const pct = (v: number | null | undefined, casas = 2) =>
    v === null || v === undefined ? null : `${(v * 100).toFixed(casas).replace('.', ',')}%`;

const corRent = (v: number | null | undefined) =>
    v === null || v === undefined ? 'var(--color-text-muted)' : v < 0 ? 'var(--color-danger-text)' : 'var(--color-success-text)';

const corGrupo = (g: Grupo, idx: number): string =>
    isValidHex(g.cor ?? undefined) ? (g.cor as string) : PALETA_LINHAS[idx % PALETA_LINHAS.length];

// Célula de janela: retorno em cima, %CDI discreto embaixo (guarda-corpo §5.3:
// a RPC manda null quando %CDI não faz sentido — aqui só some, nunca "-344%").
function CelJanela({ rent, cdi }: { rent: number | null | undefined; cdi?: number | null }) {
    const p = pct(rent);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.25 }}>
            <span style={{ fontWeight: 600, color: corRent(rent) }}>{p ?? '—'}</span>
            {cdi !== null && cdi !== undefined && (
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{Math.round(cdi * 100)}% CDI</span>
            )}
        </div>
    );
}

export function RentabilidadeAtivos({ clienteId, mesRef, bloco }: {
    clienteId: string;
    mesRef: string;
    bloco: string[] | null;
}) {
    const [colapsados, setColapsados] = useState<Set<string>>(new Set());

    const q = useQuery({
        queryKey: ['rentabilidade', 'ativos', clienteId, mesRef, (bloco ?? []).join('|')],
        queryFn: async (): Promise<ContratoAtivos> => {
            const { data, error } = await supabase.rpc('rentabilidade_ativos', {
                p_cliente_id: clienteId,
                p_mes_ref: mesRef,
                p_bloco: bloco,
            });
            if (error) throw error;
            return data as ContratoAtivos;
        },
        enabled: !!clienteId,
    });

    if (q.error) {
        return <Card style={{ padding: 24 }}><EstadoErro compacto dica="A visão por ativo não pôde ser carregada." onRetry={() => q.refetch()} /></Card>;
    }
    if (!q.data) {
        return <Card style={{ padding: 40, display: 'flex', justifyContent: 'center' }}><Spinner size="md" /></Card>;
    }

    const { grupos, consolidado, benchmarks, avisos } = q.data;

    if (grupos.length === 0) {
        return (
            <Card style={{ padding: 24 }}>
                <EstadoVazio compacto icon={PieIcon} titulo="Sem rentabilidade por ativo neste mês"
                    dica="A visão por ativo nasce em julho/2026 — meses anteriores não têm o detalhamento. Para o mês atual, os dados chegam com o fechamento." />
            </Card>
        );
    }

    const alternar = (classe: string) => {
        setColapsados(prev => {
            const novo = new Set(prev);
            if (novo.has(classe)) novo.delete(classe); else novo.add(classe);
            return novo;
        });
    };

    const donutData = grupos.filter(g => (g.net ?? 0) > 0).map((g, i) => ({
        name: g.classe, value: g.net ?? 0, cor: corGrupo(g, i),
    }));

    return (
        <>
            {avisos.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {avisos.map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', borderRadius: 8, padding: '8px 14px', fontSize: 13, color: 'var(--color-warning-text)' }}>
                            <AlertTriangle size={15} style={{ flexShrink: 0 }} /> {a}
                        </div>
                    ))}
                </div>
            )}

            {/* ── Composição por Estratégia ── */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h2" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--color-secundaria)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Composição por Estratégia
                    </Typography>
                    {consolidado.cobertura !== null && (
                        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 600 }}>
                            {(consolidado.cobertura * 100).toFixed(1).replace('.', ',')}% do NET com rentabilidade
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', gap: 24, padding: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', width: 240, height: 240, flexShrink: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={donutData} dataKey="value" nameKey="name"
                                    innerRadius={72} outerRadius={104} paddingAngle={1} strokeWidth={0}>
                                    {donutData.map(d => <Cell key={d.name} fill={d.cor} />)}
                                </Pie>
                                <Tooltip formatter={(value) => fmt(Number(value))} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                            <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Total</span>
                            <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-secundaria)' }}>{fmt(consolidado.net)}</span>
                        </div>
                    </div>

                    <div style={{ flex: 1, minWidth: 480, overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={th}>Estratégia</th>
                                    <th style={thNum}>Saldo</th>
                                    <th style={thNum}>Peso</th>
                                    <th style={thNum}>Mês</th>
                                    <th style={thNum}>No ano</th>
                                    <th style={thNum}>12m</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grupos.map((g, i) => (
                                    <tr key={g.classe}>
                                        <td style={td}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--color-secundaria)' }}>
                                                <span style={{ width: 9, height: 9, borderRadius: '50%', background: corGrupo(g, i), flexShrink: 0 }} />
                                                {g.classe}
                                            </span>
                                        </td>
                                        <td style={tdNum}>{g.net !== null ? fmt(g.net) : '—'}</td>
                                        <td style={tdNum}>{g.peso !== null ? `${(g.peso * 100).toFixed(1).replace('.', ',')}%` : '—'}</td>
                                        <td style={{ ...tdNum, fontWeight: 600, color: corRent(g.rent?.mes) }}>{pct(g.rent?.mes) ?? '—'}</td>
                                        <td style={{ ...tdNum, fontWeight: 600, color: corRent(g.rent?.ytd) }}>{pct(g.rent?.ytd) ?? '—'}</td>
                                        <td style={{ ...tdNum, fontWeight: 600, color: corRent(g.rent?.['12m']) }}>{pct(g.rent?.['12m']) ?? '—'}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={6} style={{ ...td, paddingTop: 14, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                                        Benchmarks de referência
                                    </td>
                                </tr>
                                {benchmarks.map(b => (
                                    <tr key={b.indexador}>
                                        <td style={{ ...td, fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>{b.indexador}</td>
                                        <td style={tdNum}>—</td>
                                        <td style={tdNum}>—</td>
                                        <td style={{ ...tdNum, fontStyle: 'italic', color: corRent(b.valores?.mes) }}>{pct(b.valores?.mes) ?? '—'}</td>
                                        <td style={{ ...tdNum, fontStyle: 'italic', color: corRent(b.valores?.ytd) }}>{pct(b.valores?.ytd) ?? '—'}</td>
                                        <td style={{ ...tdNum, fontStyle: 'italic', color: corRent(b.valores?.['12m']) }}>{pct(b.valores?.['12m']) ?? '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>

            {/* ── Posição por Ativo ── */}
            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <Typography variant="h2" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--color-secundaria)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Posição por Ativo
                    </Typography>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 980 }}>
                    <thead>
                        <tr style={{ background: 'var(--color-surface-sunken)' }}>
                            <th style={{ ...th, paddingLeft: 20 }}>Ativo / Estratégia</th>
                            <th style={thNum}>Saldo</th>
                            <th style={thNum}>Peso</th>
                            <th style={thNum}>Mês</th>
                            <th style={thNum}>No ano</th>
                            <th style={thNum}>12m</th>
                            <th style={thNum}>Contrib. mês</th>
                            <th style={{ ...thNum, paddingRight: 20 }}>Desde a compra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grupos.map((g, gi) => {
                            const fechado = colapsados.has(g.classe);
                            return [
                                <tr key={g.classe} onClick={() => alternar(g.classe)}
                                    style={{ background: 'var(--color-surface-sunken)', cursor: 'pointer', borderTop: '1px solid var(--color-border-subtle)' }}>
                                    <td style={{ ...td, paddingLeft: 20 }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, color: 'var(--color-secundaria)' }}>
                                            {fechado ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                                            <span style={{ width: 9, height: 9, borderRadius: '50%', background: corGrupo(g, gi), flexShrink: 0 }} />
                                            {g.classe}
                                        </span>
                                    </td>
                                    <td style={{ ...tdNum, fontWeight: 700 }}>{g.net !== null ? fmt(g.net) : '—'}</td>
                                    <td style={{ ...tdNum, fontWeight: 700 }}>{g.peso !== null ? `${(g.peso * 100).toFixed(1).replace('.', ',')}%` : '—'}</td>
                                    <td style={{ ...tdNum, fontWeight: 700, color: corRent(g.rent?.mes) }}>{pct(g.rent?.mes) ?? ''}</td>
                                    <td style={{ ...tdNum, fontWeight: 700, color: corRent(g.rent?.ytd) }}>{pct(g.rent?.ytd) ?? ''}</td>
                                    <td style={{ ...tdNum, fontWeight: 700, color: corRent(g.rent?.['12m']) }}>{pct(g.rent?.['12m']) ?? ''}</td>
                                    <td style={{ ...tdNum, fontWeight: 700, color: corRent(g.contribuicao) }}>{pct(g.contribuicao) ?? ''}</td>
                                    <td style={{ ...td, paddingRight: 20 }} />
                                </tr>,
                                ...(fechado ? [] : g.ativos.map((a, ai) => (
                                    <tr key={`${g.classe}|${ai}`} style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                                        <td style={{ ...td, paddingLeft: 46 }}>
                                            <span style={{ color: 'var(--color-text-primary)' }}>{a.nome}</span>
                                            <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 700 }}>{a.instituicao}</span>
                                            {a.qualidade === 'calculado_por_valor' && (
                                                <span title="Calculado por variação de valor (fonte sem retorno diário confiável)"
                                                    style={{ marginLeft: 6, fontSize: 10, color: 'var(--color-warning-text)', fontWeight: 700 }}>≈</span>
                                            )}
                                            {a.qualidade === 'sem_rentabilidade' && (
                                                <span style={{ marginLeft: 6, fontSize: 10, fontStyle: 'italic', color: 'var(--color-text-muted)' }}>sem rentabilidade na fonte</span>
                                            )}
                                        </td>
                                        <td style={tdNum}>{a.net !== null ? fmt(a.net) : '—'}</td>
                                        <td style={tdNum}>{a.peso !== null ? `${(a.peso * 100).toFixed(1).replace('.', ',')}%` : '—'}</td>
                                        <td style={tdNum}><CelJanela rent={a.rent?.mes} cdi={a.pct_cdi?.mes} /></td>
                                        <td style={tdNum}><CelJanela rent={a.rent?.ytd} cdi={a.pct_cdi?.ytd} /></td>
                                        <td style={tdNum}><CelJanela rent={a.rent?.['12m']} cdi={a.pct_cdi?.['12m']} /></td>
                                        <td style={{ ...tdNum, color: corRent(a.contribuicao) }}>{pct(a.contribuicao) ?? '—'}</td>
                                        <td style={{ ...tdNum, paddingRight: 20, color: corRent(a.rent?.desde_compra) }}>{pct(a.rent?.desde_compra) ?? '—'}</td>
                                    </tr>
                                ))),
                            ];
                        })}
                    </tbody>
                </table>
            </Card>
        </>
    );
}

const th: React.CSSProperties = { padding: '9px 14px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', textAlign: 'left', whiteSpace: 'nowrap' };
const thNum: React.CSSProperties = { ...th, textAlign: 'right' };
const td: React.CSSProperties = { padding: '9px 14px', fontSize: 13, color: 'var(--color-text-primary)' };
const tdNum: React.CSSProperties = { ...td, textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' };
