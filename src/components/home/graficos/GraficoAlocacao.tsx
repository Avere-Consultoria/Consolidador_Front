import { useState } from 'react';
import { Card, CardContent } from 'avere-ui';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, LabelList, Legend,
} from 'recharts';
import { LayoutList, BarChart2 } from 'lucide-react';
import { fmt, fmtK } from '../../../utils/formatters';
import { TooltipCustom, TooltipBarras } from './Tooltips';
import { CORES } from '../../../utils/colors';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

// ── Tipos ────────────────────────────────────────────────────────────────────

interface AlocacaoItem {
    name: string;
    value: number;
    pct: number;
    fill: string;
}

interface ComparativoItem {
    name: string;
    cor_classe?: string;
    [instKey: string]: any;   // valor por instituição (dataKey dinâmico)
}

interface InstituicaoComparativo {
    key: string;
    label: string;
    cor: string;
}

interface GraficoAlocacaoProps {
    alocacaoData: AlocacaoItem[];
    comparativoData: ComparativoItem[];
    comparativoInstituicoes?: InstituicaoComparativo[];
}

type ModoVista = 'consolidado' | 'instituicao';

// ── Estilos de Tabela ────────────────────────────────────────────────────────

const tableStyle: React.CSSProperties = {
    width: '100%', borderCollapse: 'collapse', fontSize: '12px',
    marginTop: '8px', fontFamily: 'Montserrat, sans-serif',
};
const thStyle: React.CSSProperties = {
    textAlign: 'left', padding: '8px 4px',
    borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4,
    textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em',
};
const tdStyle: React.CSSProperties = {
    padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)',
    fontWeight: 500, color: 'var(--color-secundaria)',
};

// Tooltip da vista por instituição em modo %
function TooltipPctInst({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontFamily: 'Montserrat, sans-serif' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-secundaria)', marginBottom: '6px' }}>{label}</div>
            {payload.filter((p: any) => Number(p.value) > 0).map((p: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '12px', padding: '2px 0' }}>
                    <span style={{ color: p.color, fontWeight: 600 }}>{p.name}</span>
                    <strong>{Number(p.value).toFixed(1)}%</strong>
                </div>
            ))}
        </div>
    );
}

// ── Componente ────────────────────────────────────────────────────────────────

export function GraficoAlocacao({ alocacaoData, comparativoData, comparativoInstituicoes }: GraficoAlocacaoProps) {
    const isWide = useMediaQuery('(min-width: 1280px)');

    const [modoVista, setModoVista] = useState<ModoVista>('consolidado');
    const [modoTabela, setModoTabela] = useState(false);
    const [unidade, setUnidade] = useState<'valor' | 'pct'>('valor');   // só na vista por instituição

    // Instituições do comparativo — dinâmicas (API + manuais). Fallback p/ derivar
    // das chaves presentes caso a prop não venha (compat).
    const colunas: { key: string; label: string; cor: string }[] = (comparativoInstituicoes && comparativoInstituicoes.length > 0)
        ? comparativoInstituicoes
        : ([
            comparativoData.some(d => (d.BTG    || 0) > 0) && { key: 'BTG',    label: 'BTG Pactual',      cor: CORES.btg },
            comparativoData.some(d => (d.XP     || 0) > 0) && { key: 'XP',     label: 'XP Investimentos', cor: CORES.xp },
            comparativoData.some(d => (d.AVENUE || 0) > 0) && { key: 'AVENUE', label: 'Avenue',           cor: CORES.avenue },
            comparativoData.some(d => (d.AGORA  || 0) > 0) && { key: 'AGORA',  label: 'Ágora',            cor: CORES.agora },
        ].filter(Boolean) as { key: string; label: string; cor: string }[]);

    // Total geral do comparativo (p/ converter em % do patrimônio)
    const grandTotalInst = comparativoData.reduce((s, row) => s + colunas.reduce((s2, c) => s2 + (Number((row as any)[c.key]) || 0), 0), 0);
    const aPct = (v: number) => grandTotalInst > 0 ? (Number(v) / grandTotalInst) * 100 : 0;

    // ── Renderizadores de cada bloco ─────────────────────────────────────────

    const renderGrafico = () => (
        modoVista === 'consolidado' ? (
            <ResponsiveContainer width="100%" height={240}>
                <BarChart
                    data={alocacaoData}
                    layout="vertical"
                    margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
                    barSize={14}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.06)" />
                    <XAxis type="number" hide />
                    <YAxis
                        type="category" dataKey="name" width={128} interval={0}
                        tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif', fill: 'var(--color-secundaria)', opacity: 0.6 }}
                        axisLine={false} tickLine={false}
                    />
                    <Tooltip content={<TooltipCustom />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={800}>
                        {alocacaoData.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                        ))}
                        <LabelList
                            dataKey="value"
                            position="right"
                            formatter={(v: any) => fmtK(Number(v))}
                            style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fill: 'var(--color-secundaria)', opacity: 0.7 }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        ) : (
            <ResponsiveContainer width="100%" height={260}>
                <BarChart
                    data={unidade === 'pct'
                        ? comparativoData.map(row => {
                            const r: any = { name: row.name, cor_classe: (row as any).cor_classe };
                            colunas.forEach(c => { r[c.key] = aPct((row as any)[c.key] || 0); });
                            return r;
                          })
                        : comparativoData}
                    margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                    barSize={28}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif' }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={unidade === 'pct' ? (v) => `${Number(v).toFixed(0)}%` : fmtK} tick={{ fontSize: 11, opacity: 0.4, fontFamily: 'Montserrat, sans-serif' }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip content={unidade === 'pct' ? <TooltipPctInst /> : <TooltipBarras />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Legend
                        iconType="circle" iconSize={10}
                        formatter={(value) => (
                            <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'Montserrat, sans-serif', color: 'var(--color-secundaria)' }}>
                                {value}
                            </span>
                        )}
                    />
                    {colunas.map((c, i) => (
                        <Bar
                            key={c.key}
                            dataKey={c.key}
                            name={c.label}
                            fill={c.cor}
                            stackId="a"
                            radius={i === colunas.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                            animationDuration={800 + i * 100}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        )
    );

    const renderTabela = () => (
        <div style={{ overflowX: 'auto' }}>
            {modoVista === 'consolidado' ? (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Classe</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>Valor</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alocacaoData.map(d => (
                            <tr key={d.name}>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '2px', background: d.fill }} />
                                        {d.name}
                                    </div>
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>{fmt(d.value)}</td>
                                <td style={{ ...tdStyle, textAlign: 'right', opacity: 0.6 }}>{d.pct.toFixed(1)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Classe</th>
                            {colunas.map(c => (
                                <th key={c.key} style={{ ...thStyle, textAlign: 'right' }}>{c.label}</th>
                            ))}
                            <th style={{ ...thStyle, textAlign: 'right' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparativoData.map(d => {
                            const total = colunas.reduce((s, c) => s + ((d as any)[c.key] || 0), 0);
                            return (
                                <tr key={d.name}>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '2px', background: d.cor_classe || '#9CA3AF' }} />
                                            {d.name}
                                        </div>
                                    </td>
                                    {colunas.map(c => {
                                        const v = (d as any)[c.key] || 0;
                                        return (
                                            <td key={c.key} style={{ ...tdStyle, textAlign: 'right', color: c.cor, fontWeight: 600 }}>
                                                {unidade === 'pct' ? `${aPct(v).toFixed(1)}%` : fmt(v)}
                                            </td>
                                        );
                                    })}
                                    <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>
                                        {unidade === 'pct' ? `${aPct(total).toFixed(1)}%` : fmt(total)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );

    return (
        <Card>
            <CardContent style={{ padding: '24px' }}>

                {/* ── Header ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{
                        fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.08em', opacity: 0.45,
                    }}>
                        Alocação por Classe
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {/* Segmented control: Consolidado / Por Instituição */}
                        <div style={{
                            display: 'flex', gap: '2px',
                            background: 'rgba(0,0,0,0.05)',
                            padding: '3px', borderRadius: '8px',
                        }}>
                            {(['consolidado', 'instituicao'] as ModoVista[]).map(modo => (
                                <button
                                    key={modo}
                                    onClick={() => { setModoVista(modo); if (!isWide) setModoTabela(false); }}
                                    style={{
                                        border: 'none', cursor: 'pointer',
                                        padding: '4px 12px', borderRadius: '6px',
                                        fontSize: '11px', fontWeight: 600,
                                        fontFamily: 'Montserrat, sans-serif',
                                        background: modoVista === modo ? '#fff' : 'transparent',
                                        color: modoVista === modo ? 'var(--color-secundaria)' : '#6B7280',
                                        boxShadow: modoVista === modo ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        transition: 'all 0.15s ease',
                                    }}
                                >
                                    {modo === 'consolidado' ? 'Consolidado' : 'Por Instituição'}
                                </button>
                            ))}
                        </div>

                        {/* Toggle R$ / % — só na vista por instituição */}
                        {modoVista === 'instituicao' && (
                            <div style={{ display: 'flex', gap: '2px', background: 'rgba(0,0,0,0.05)', padding: '3px', borderRadius: '8px' }}>
                                {(['valor', 'pct'] as const).map(u => (
                                    <button
                                        key={u}
                                        onClick={() => setUnidade(u)}
                                        style={{
                                            border: 'none', cursor: 'pointer', padding: '4px 10px', borderRadius: '6px',
                                            fontSize: '11px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif',
                                            background: unidade === u ? '#fff' : 'transparent',
                                            color: unidade === u ? 'var(--color-secundaria)' : '#6B7280',
                                            boxShadow: unidade === u ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                            transition: 'all 0.15s ease',
                                        }}
                                    >
                                        {u === 'valor' ? 'R$' : '%'}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Toggle tabela — apenas em telas menores */}
                        {!isWide && (
                            <button
                                onClick={() => setModoTabela(v => !v)}
                                title={modoTabela ? 'Ver gráfico' : 'Ver tabela'}
                                style={{
                                    border: 'none', cursor: 'pointer',
                                    background: modoTabela ? 'rgba(0,0,0,0.08)' : 'transparent',
                                    color: modoTabela ? 'var(--color-secundaria)' : '#9CA3AF',
                                    padding: '6px', borderRadius: '6px',
                                    display: 'flex', alignItems: 'center',
                                    transition: 'all 0.15s ease',
                                }}
                            >
                                {modoTabela ? <BarChart2 size={16} /> : <LayoutList size={16} />}
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Conteúdo ── */}
                {isWide ? (
                    /* Tela grande: gráfico + tabela lado a lado */
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                        alignItems: 'start',
                    }}>
                        <div>{renderGrafico()}</div>
                        <div>{renderTabela()}</div>
                    </div>
                ) : (
                    /* Tela menor: um ou outro conforme toggle */
                    modoTabela ? renderTabela() : renderGrafico()
                )}

            </CardContent>
        </Card>
    );
}
