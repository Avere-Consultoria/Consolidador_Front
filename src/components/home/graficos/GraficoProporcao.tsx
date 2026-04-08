import { useState } from 'react';
import { Card, CardContent } from 'avere-ui';
import {
    PieChart as RePieChart,
    Pie as RePie,
    Cell as ReCell,
    Tooltip as ReTooltip,
    ResponsiveContainer as ReResponsiveContainer,
    Legend as ReLegend
} from 'recharts';

import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { TooltipCustom } from './Tooltips';
import { fmt } from '../../../utils/formatters';

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
export function GraficoProporcao({ data }: { data: any[] }) {
    const [modoTabela, setModoTabela] = useState(false);

    return (
        <Card>
            <CardContent style={{ padding: '24px', height: '100%' }}>
                <CardHeaderComSwitch
                    titulo="Proporção por Instituição"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />

                {modoTabela ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Instituição</th>
                                    <th style={thStyle}>Valor</th>
                                    <th style={{ ...thStyle, textAlign: 'right' }}>%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((d) => (
                                    <tr key={d.name}>
                                        <td style={tdStyle}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {/* Marcador circular da instituição */}
                                                <div style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
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
                    <ReResponsiveContainer width="100%" height={240}>
                        <RePieChart>
                            <RePie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={3}
                                dataKey="value"
                                animationBegin={0}
                                animationDuration={800}
                            >
                                {data.map((entry, i) => (
                                    <ReCell key={i} fill={entry.fill} stroke="none" />
                                ))}
                            </RePie>
                            <ReTooltip content={<TooltipCustom />} />
                            <ReLegend
                                iconType="circle"
                                iconSize={10}
                                formatter={(value, entry: any) => (
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#081F28' }}>
                                        {value} — {entry.payload.pct.toFixed(1)}%
                                    </span>
                                )}
                            />
                        </RePieChart>
                    </ReResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}