import { useState } from 'react';
import { Card, CardContent } from 'avere-ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { CORES } from '../../../utils/colors';
import { TooltipBarras } from './Tooltips';
import { fmt, fmtK } from '../../../utils/formatters';

// ── Estilos Locais ───────────────────────────────────────────────────────────
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
    color: 'var(--color-secundaria)'
};

// ── Componente Principal ─────────────────────────────────────────────────────
export function GraficoComparativo({ data }: { data: any[] }) {
    const [modoTabela, setModoTabela] = useState(false);

    if (!data || data.length === 0) return null;

    // Cores dinâmicas do primeiro item (fallback para CORES se não vier do banco)
    const corBtg = data[0].cor_btg || CORES.btg;
    const corXp = data[0].cor_xp || CORES.xp;
    const corAvenue = data[0].cor_avenue || CORES.avenue;
    const corAgora = data[0].cor_agora || CORES.agora;

    // Detecta quais corretoras têm dados — evita barras/colunas vazias
    const temBtg = data.some(d => d.BTG > 0);
    const temXp = data.some(d => d.XP > 0);
    const temAvenue = data.some(d => d.AVENUE > 0);
    const temAgora = data.some(d => d.AGORA > 0);

    // Colunas da tabela (apenas as ativas)
    const colunas = [
        temBtg && { key: 'BTG', label: 'BTG Pactual', cor: corBtg },
        temXp && { key: 'XP', label: 'XP Investimentos', cor: corXp },
        temAvenue && { key: 'AVENUE', label: 'Avenue', cor: corAvenue },
        temAgora && { key: 'AGORA', label: 'Ágora', cor: corAgora },
    ].filter(Boolean) as { key: string; label: string; cor: string }[];

    return (
        <Card style={{ gridColumn: '1 / -1' }}>
            <CardContent style={{ padding: '24px', height: '100%' }}>
                <CardHeaderComSwitch
                    titulo="Comparativo por Classe"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />

                {modoTabela ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Classe de Ativo</th>
                                    {colunas.map(c => (
                                        <th key={c.key} style={thStyle}>{c.label}</th>
                                    ))}
                                    <th style={{ ...thStyle, textAlign: 'right' }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((d) => {
                                    const total = colunas.reduce((sum, c) => sum + (d[c.key] || 0), 0);
                                    return (
                                        <tr key={d.name}>
                                            <td style={tdStyle}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ width: 8, height: 8, borderRadius: '2px', background: d.cor_classe || '#9CA3AF' }} />
                                                    {d.name}
                                                </div>
                                            </td>
                                            {colunas.map(c => (
                                                <td key={c.key} style={{ ...tdStyle, color: c.cor, fontWeight: 600 }}>
                                                    {fmt(d[c.key] || 0)}
                                                </td>
                                            ))}
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
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tickFormatter={fmtK}
                                tick={{ fontSize: 11, opacity: 0.4 }}
                                axisLine={false}
                                tickLine={false}
                                width={70}
                            />
                            <Tooltip content={<TooltipBarras />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                            <Legend
                                iconType="circle"
                                iconSize={10}
                                formatter={(value) => (
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-secundaria)' }}>
                                        {value}
                                    </span>
                                )}
                            />
                            {temBtg && (
                                <Bar
                                    dataKey="BTG" name="BTG Pactual" fill={corBtg} stackId="a"
                                    radius={!temXp && !temAvenue && !temAgora ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                    animationDuration={800}
                                />
                            )}
                            {temXp && (
                                <Bar
                                    dataKey="XP" name="XP Investimentos" fill={corXp} stackId="a"
                                    radius={!temAvenue && !temAgora ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                    animationDuration={900}
                                />
                            )}
                            {temAvenue && (
                                <Bar
                                    dataKey="AVENUE" name="Avenue" fill={corAvenue} stackId="a"
                                    radius={!temAgora ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                    animationDuration={1000}
                                />
                            )}
                            {temAgora && (
                                <Bar
                                    dataKey="AGORA" name="Ágora" fill={corAgora} stackId="a"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1100}
                                />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
