import { useState } from 'react';
import { Card, CardContent, Typography, Switch } from 'avere-ui';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
} from 'recharts';
import { fmt, fmtK } from '../../utils/formatters';
import { CORES } from '../../utils/colors';

// ── Tooltips Locais ────────────────────────────────────────────────────────
const TooltipCustom = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px', padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            fontFamily: 'Montserrat, sans-serif',
        }}>
            <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>{payload[0].name}</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: payload[0].fill || CORES.btg }}>
                {fmtK(payload[0].value)}
            </div>
            {payload[0].payload?.pct != null && (
                <div style={{ fontSize: '11px', opacity: 0.5 }}>{payload[0].payload.pct.toFixed(1)}% do total</div>
            )}
        </div>
    );
};

const TooltipBarras = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px', padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            fontFamily: 'Montserrat, sans-serif',
        }}>
            <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>{label}</div>
            {payload.map((p: any, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginBottom: '2px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '2px', background: p.fill }} />
                    <span style={{ fontWeight: 600 }}>{p.name}:</span>
                    <span>{fmtK(p.value)}</span>
                </div>
            ))}
        </div>
    );
};

// ── Estilos da Tabela ──────────────────────────────────────────────────────
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginTop: '8px' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' };
const tdStyle: React.CSSProperties = { padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontWeight: 500, color: '#081F28' };

// ── Componente de Cabeçalho do Card com Switch ──────────────────────────────
function CardHeaderComSwitch({ titulo, modoTabela, setModoTabela }: { titulo: string; modoTabela: boolean; setModoTabela: (v: boolean) => void }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.05em', margin: 0 }}>
                {titulo}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Typography variant="p" style={{ fontSize: '10px', fontWeight: 600, opacity: modoTabela ? 0.4 : 0.8 }}>Gráfico</Typography>
                <div style={{ transform: 'scale(0.85)', display: 'flex', alignItems: 'center' }}>
                    <Switch
                        checked={modoTabela}
                        onCheckedChange={setModoTabela}
                        onChange={(e: any) => setModoTabela(e.target ? e.target.checked : e)}
                    />
                </div>
                <Typography variant="p" style={{ fontSize: '10px', fontWeight: 600, opacity: modoTabela ? 0.8 : 0.4 }}>Tabela</Typography>
            </div>
        </div>
    );
}

interface GraficosProps {
    metrics: any;
}

export function Graficos({ metrics }: GraficosProps) {
    // Estados independentes para cada cartão
    const [tabelaProporcao, setTabelaProporcao] = useState(false);
    const [tabelaAlocacao, setTabelaAlocacao] = useState(false);
    const [tabelaComparativo, setTabelaComparativo] = useState(false);

    return (
        <section>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>

                {/* CARD 1: Proporção por Instituição */}
                <Card>
                    <CardContent style={{ padding: '24px', height: '100%' }}>
                        <CardHeaderComSwitch
                            titulo="Proporção por Instituição"
                            modoTabela={tabelaProporcao}
                            setModoTabela={setTabelaProporcao}
                        />

                        {tabelaProporcao ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr><th style={thStyle}>Instituição</th><th style={thStyle}>Valor</th><th style={{ ...thStyle, textAlign: 'right' }}>%</th></tr>
                                    </thead>
                                    <tbody>
                                        {metrics.donutData.map((d: any) => (
                                            <tr key={d.name}>
                                                <td style={tdStyle}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.fill }} />
                                                        {d.name}
                                                    </div>
                                                </td>
                                                <td style={{ ...tdStyle, fontWeight: 700 }}>{fmt(d.value)}</td>
                                                <td style={{ ...tdStyle, textAlign: 'right', opacity: 0.6 }}>{d.pct.toFixed(1)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={240}>
                                <PieChart>
                                    <Pie data={metrics.donutData} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3} dataKey="value" animationBegin={0} animationDuration={800}>
                                        {metrics.donutData.map((entry: any, i: number) => <Cell key={i} fill={entry.fill} stroke="none" />)}
                                    </Pie>
                                    <Tooltip content={<TooltipCustom />} />
                                    <Legend iconType="circle" iconSize={10} formatter={(value, entry: any) => (
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#081F28' }}>
                                            {value} — {entry.payload.pct.toFixed(1)}%
                                        </span>
                                    )} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* CARD 2: Alocação por Classe */}
                <Card>
                    <CardContent style={{ padding: '24px', height: '100%' }}>
                        <CardHeaderComSwitch
                            titulo="Alocação por Classe"
                            modoTabela={tabelaAlocacao}
                            setModoTabela={setTabelaAlocacao}
                        />

                        {tabelaAlocacao ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr><th style={thStyle}>Classe</th><th style={thStyle}>Valor</th><th style={{ ...thStyle, textAlign: 'right' }}>%</th></tr>
                                    </thead>
                                    <tbody>
                                        {metrics.alocacaoData.map((d: any) => (
                                            <tr key={d.name}>
                                                <td style={tdStyle}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ width: 8, height: 8, borderRadius: '2px', background: d.fill }} />
                                                        {d.name}
                                                    </div>
                                                </td>
                                                <td style={{ ...tdStyle, fontWeight: 700 }}>{fmt(d.value)}</td>
                                                <td style={{ ...tdStyle, textAlign: 'right', opacity: 0.6 }}>{d.pct.toFixed(1)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={metrics.alocacaoData} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }} barSize={14}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.06)" />
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" width={95} tick={{ fontSize: 12, fontFamily: 'Montserrat, sans-serif', fill: '#081F28', opacity: 0.6 }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<TooltipCustom />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={800}>
                                        {metrics.alocacaoData.map((entry: any, i: number) => <Cell key={i} fill={entry.fill} />)}
                                        <LabelList dataKey="value" position="right" formatter={(v: any) => fmtK(Number(v))} style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fill: '#081F28', opacity: 0.7 }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* CARD 3: Comparativo BTG vs XP */}
                <Card style={{ gridColumn: '1 / -1' }}>
                    <CardContent style={{ padding: '24px', height: '100%' }}>
                        <CardHeaderComSwitch
                            titulo="Comparativo por Classe — BTG vs XP"
                            modoTabela={tabelaComparativo}
                            setModoTabela={setTabelaComparativo}
                        />

                        {tabelaComparativo ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>Classe de Ativo</th>
                                            <th style={thStyle}>BTG Pactual</th>
                                            <th style={thStyle}>XP Investimentos</th>
                                            <th style={{ ...thStyle, textAlign: 'right' }}>Total Consolidado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {metrics.comparativoData.map((d: any) => {
                                            const total = (d.BTG || 0) + (d.XP || 0);
                                            return (
                                                <tr key={d.name}>
                                                    <td style={tdStyle}>{d.name}</td>
                                                    <td style={{ ...tdStyle, color: CORES.btg, fontWeight: 600 }}>{fmt(d.BTG || 0)}</td>
                                                    <td style={{ ...tdStyle, color: CORES.xp, fontWeight: 600 }}>{fmt(d.XP || 0)}</td>
                                                    <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>{fmt(total)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={metrics.comparativoData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barSize={28} barCategoryGap="35%">
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Montserrat, sans-serif', fill: '#081F28', opacity: 0.6 }} axisLine={false} tickLine={false} />
                                    <YAxis tickFormatter={fmtK} tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif', fill: '#081F28', opacity: 0.4 }} axisLine={false} tickLine={false} width={70} />
                                    <Tooltip content={<TooltipBarras />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                                    <Legend iconType="circle" iconSize={10} formatter={(value) => (
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#081F28' }}>{value}</span>
                                    )} />
                                    <Bar dataKey="BTG" name="BTG Pactual" fill={CORES.btg} stackId="a" radius={[0, 0, 0, 0]} animationDuration={800} />
                                    <Bar dataKey="XP" name="XP Investimentos" fill={CORES.xp} stackId="a" radius={[4, 4, 0, 0]} animationDuration={900} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

            </div>
        </section>
    );
}