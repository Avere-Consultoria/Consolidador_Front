import { useState } from 'react';
import { Card, CardContent } from 'avere-ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { CORES } from '../../../utils/colors'; // Ajuste o caminho se necessário
import { TooltipBarras } from './Tooltips';
import { fmt, fmtK } from '../../../utils/formatters'; // Ajuste o caminho se necessário

// ── Estilos Locais (CSS-in-JS) ──────────────────────────────────────────────
const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    marginTop: '8px'
};

const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '8px 4px',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    opacity: 0.4,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: '10px',
    letterSpacing: '0.05em'
};

const tdStyle: React.CSSProperties = {
    padding: '12px 4px',
    borderBottom: '1px solid rgba(0,0,0,0.04)',
    fontWeight: 500,
    color: '#081F28'
};

// ── Componente Principal ─────────────────────────────────────────────────────
export function GraficoComparativo({ data }: { data: any[] }) {
    const [modoTabela, setModoTabela] = useState(false);

    return (
        <Card style={{ gridColumn: '1 / -1' }}>
            <CardContent style={{ padding: '24px', height: '100%' }}>
                <CardHeaderComSwitch
                    titulo="Comparativo por Classe — BTG vs XP"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />

                {modoTabela ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Classe de Ativo</th>
                                    <th style={thStyle}>BTG Pactual</th>
                                    <th style={thStyle}>XP Investimentos</th>
                                    <th style={{ ...thStyle, textAlign: 'right' }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((d) => {
                                    const total = (d.BTG || 0) + (d.XP || 0);
                                    return (
                                        <tr key={d.name}>
                                            <td style={tdStyle}>{d.name}</td>
                                            <td style={{ ...tdStyle, color: CORES.btg, fontWeight: 600 }}>
                                                {fmt(d.BTG || 0)}
                                            </td>
                                            <td style={{ ...tdStyle, color: CORES.xp, fontWeight: 600 }}>
                                                {fmt(d.XP || 0)}
                                            </td>
                                            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>
                                                {fmt(total)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart
                            data={data}
                            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                            barSize={28}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12, fontFamily: 'Montserrat, sans-serif' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tickFormatter={fmtK}
                                tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif', opacity: 0.4 }}
                                axisLine={false}
                                tickLine={false}
                                width={70}
                            />
                            <Tooltip content={<TooltipBarras />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                            <Legend
                                iconType="circle"
                                iconSize={10}
                                formatter={(value) => (
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#081F28' }}>
                                        {value}
                                    </span>
                                )}
                            />
                            <Bar
                                dataKey="BTG"
                                name="BTG Pactual"
                                fill={CORES.btg}
                                stackId="a"
                                animationDuration={800}
                            />
                            <Bar
                                dataKey="XP"
                                name="XP Investimentos"
                                fill={CORES.xp}
                                stackId="a"
                                radius={[4, 4, 0, 0]}
                                animationDuration={900}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}