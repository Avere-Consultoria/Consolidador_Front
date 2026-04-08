import { useState } from 'react';
import { Card, CardContent } from 'avere-ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt, fmtK } from '../../../utils/formatters';
import { TooltipCustom } from './Tooltips';

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
export function GraficoAlocacaoClasse({ data }: { data: any[] }) {
    const [modoTabela, setModoTabela] = useState(false);

    return (
        <Card>
            <CardContent style={{ padding: '24px', height: '100%' }}>
                <CardHeaderComSwitch
                    titulo="Alocação por Classe"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />

                {modoTabela ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Classe</th>
                                    <th style={thStyle}>Valor</th>
                                    <th style={{ ...thStyle, textAlign: 'right' }}>%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((d) => (
                                    <tr key={d.name}>
                                        <td style={tdStyle}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {/* Marcador colorido da classe */}
                                                <div style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '2px',
                                                    background: d.fill
                                                }} />
                                                {d.name}
                                            </div>
                                        </td>
                                        <td style={{ ...tdStyle, fontWeight: 700 }}>
                                            {fmt(d.value)}
                                        </td>
                                        <td style={{ ...tdStyle, textAlign: 'right', opacity: 0.6 }}>
                                            {d.pct.toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
                            barSize={14}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.06)" />
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={95}
                                tick={{
                                    fontSize: 12,
                                    fontFamily: 'Montserrat, sans-serif',
                                    fill: '#081F28',
                                    opacity: 0.6
                                }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<TooltipCustom />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={800}>
                                {data.map((entry, i) => (
                                    <Cell key={i} fill={entry.fill} />
                                ))}
                                <LabelList
                                    dataKey="value"
                                    position="right"
                                    formatter={(v: any) => fmtK(Number(v))}
                                    style={{
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        fontFamily: 'Montserrat, sans-serif',
                                        fill: '#081F28',
                                        opacity: 0.7
                                    }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}