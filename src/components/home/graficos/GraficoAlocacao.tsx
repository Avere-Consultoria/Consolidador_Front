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

// ── Tipos ────────────────────────────────────────────────────────────────────

interface AlocacaoItem {
    name: string;
    value: number;
    pct: number;
    fill: string;
}

interface ComparativoItem {
    name: string;
    BTG?: number;
    XP?: number;
    AVENUE?: number;
    AGORA?: number;
    cor_classe?: string;
    cor_btg?: string;
    cor_xp?: string;
    cor_avenue?: string;
    cor_agora?: string;
}

interface GraficoAlocacaoProps {
    alocacaoData: AlocacaoItem[];
    comparativoData: ComparativoItem[];
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

// ── Componente ────────────────────────────────────────────────────────────────

export function GraficoAlocacao({ alocacaoData, comparativoData }: GraficoAlocacaoProps) {
    const [modoVista, setModoVista] = useState<ModoVista>('consolidado');
    const [modoTabela, setModoTabela] = useState(false);

    // Cores das instituições (vêm do primeiro item do comparativo, fallback para CORES)
    const corBtg    = comparativoData[0]?.cor_btg    || CORES.btg;
    const corXp     = comparativoData[0]?.cor_xp     || CORES.xp;
    const corAvenue = comparativoData[0]?.cor_avenue  || CORES.avenue;
    const corAgora  = comparativoData[0]?.cor_agora   || CORES.agora;

    const temBtg    = comparativoData.some(d => (d.BTG    || 0) > 0);
    const temXp     = comparativoData.some(d => (d.XP     || 0) > 0);
    const temAvenue = comparativoData.some(d => (d.AVENUE || 0) > 0);
    const temAgora  = comparativoData.some(d => (d.AGORA  || 0) > 0);

    const colunas = [
        temBtg    && { key: 'BTG',    label: 'BTG Pactual',      cor: corBtg    },
        temXp     && { key: 'XP',     label: 'XP Investimentos', cor: corXp     },
        temAvenue && { key: 'AVENUE', label: 'Avenue',            cor: corAvenue },
        temAgora  && { key: 'AGORA',  label: 'Ágora',            cor: corAgora  },
    ].filter(Boolean) as { key: string; label: string; cor: string }[];

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
                                    onClick={() => { setModoVista(modo); setModoTabela(false); }}
                                    style={{
                                        border: 'none', cursor: 'pointer',
                                        padding: '4px 12px', borderRadius: '6px',
                                        fontSize: '11px', fontWeight: 600,
                                        fontFamily: 'Montserrat, sans-serif',
                                        background: modoVista === modo && !modoTabela ? '#fff' : 'transparent',
                                        color: modoVista === modo && !modoTabela ? 'var(--color-secundaria)' : '#6B7280',
                                        boxShadow: modoVista === modo && !modoTabela ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        transition: 'all 0.15s ease',
                                    }}
                                >
                                    {modo === 'consolidado' ? 'Consolidado' : 'Por Instituição'}
                                </button>
                            ))}
                        </div>

                        {/* Toggle tabela */}
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
                    </div>
                </div>

                {/* ── Conteúdo ── */}
                {modoTabela ? (

                    /* TABELA */
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
                                                {colunas.map(c => (
                                                    <td key={c.key} style={{ ...tdStyle, textAlign: 'right', color: c.cor, fontWeight: 600 }}>
                                                        {fmt((d as any)[c.key] || 0)}
                                                    </td>
                                                ))}
                                                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>{fmt(total)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>

                ) : modoVista === 'consolidado' ? (

                    /* GRÁFICO CONSOLIDADO — barras horizontais por classe */
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
                                type="category" dataKey="name" width={95}
                                tick={{ fontSize: 12, fontFamily: 'Montserrat, sans-serif', fill: 'var(--color-secundaria)', opacity: 0.6 }}
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

                    /* GRÁFICO POR INSTITUIÇÃO — barras empilhadas verticais */
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart
                            data={comparativoData}
                            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                            barSize={28}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif' }}
                                axisLine={false} tickLine={false}
                            />
                            <YAxis
                                tickFormatter={fmtK}
                                tick={{ fontSize: 11, opacity: 0.4, fontFamily: 'Montserrat, sans-serif' }}
                                axisLine={false} tickLine={false} width={70}
                            />
                            <Tooltip content={<TooltipBarras />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                            <Legend
                                iconType="circle" iconSize={10}
                                formatter={(value) => (
                                    <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'Montserrat, sans-serif', color: 'var(--color-secundaria)' }}>
                                        {value}
                                    </span>
                                )}
                            />
                            {temBtg && (
                                <Bar dataKey="BTG" name="BTG Pactual" fill={corBtg} stackId="a"
                                    radius={!temXp && !temAvenue && !temAgora ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                    animationDuration={800} />
                            )}
                            {temXp && (
                                <Bar dataKey="XP" name="XP Investimentos" fill={corXp} stackId="a"
                                    radius={!temAvenue && !temAgora ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                    animationDuration={900} />
                            )}
                            {temAvenue && (
                                <Bar dataKey="AVENUE" name="Avenue" fill={corAvenue} stackId="a"
                                    radius={!temAgora ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                    animationDuration={1000} />
                            )}
                            {temAgora && (
                                <Bar dataKey="AGORA" name="Ágora" fill={corAgora} stackId="a"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1100} />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                )}

            </CardContent>
        </Card>
    );
}
