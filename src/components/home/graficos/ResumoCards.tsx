import { useState } from 'react';
import { Card, CardContent, Typography, Badge } from 'avere-ui';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label,
} from 'recharts';

import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { TooltipCustom } from './Tooltips';
import { fmt, fmtDate } from '../../../utils/formatters';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface ResumoCardsProps {
    metrics: any;
}

export function ResumoCards({ metrics }: ResumoCardsProps) {
    const isWide = useMediaQuery('(min-width: 1280px)');
    const [modoTabela, setModoTabela] = useState(false);

    // Cada fonte (conta de API ou instituição manual) é um card de composição.
    const instituicoes = (metrics.fontesData || []).filter((i: any) => i.total > 0);

    const pieData = instituicoes.map((i: any) => ({
        name: i.nome, value: i.total, fill: i.cor, pct: i.pct,
    }));

    // ── Renderizadores ───────────────────────────────────────────────────────

    const renderDonut = () => (
        <ResponsiveContainer width="100%" height={260}>
            <PieChart>
                <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={70} outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive={false}
                >
                    {pieData.map((entry: any, i: number) => (
                        <Cell key={i} fill={entry.fill} stroke="none" />
                    ))}
                    <Label content={({ viewBox }: any) => {
                        const { cx, cy } = viewBox;
                        const valor = fmt(metrics.patrimonioTotal);
                        // Fonte adaptativa: o valor cheio (com centavos) precisa caber no furo (~130px).
                        const fs = valor.length <= 10 ? 20 : valor.length <= 13 ? 17 : valor.length <= 16 ? 14 : 12;
                        return (
                            <g>
                                <text x={cx} y={cy - 10} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF', letterSpacing: '0.05em' }}>TOTAL</text>
                                <text x={cx} y={cy + 13} textAnchor="middle" style={{ fontSize: fs, fontWeight: 800, fill: 'var(--color-secundaria)' }}>{valor}</text>
                            </g>
                        );
                    }} />
                </Pie>
                <Tooltip content={<TooltipCustom />} />
                <Legend
                    iconType="circle"
                    iconSize={10}
                    formatter={(value, entry: any) => (
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-secundaria)' }}>
                            {value} — {entry.payload.pct.toFixed(1)}%
                        </span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    );

    const renderTabela = () => (
        <div>
            <div style={{ marginBottom: '16px' }}>
                <Typography variant="p" style={{ fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF' }}>
                    Patrimônio Total
                </Typography>
                <Typography variant="h1" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-secundaria)' }}>
                    {fmt(metrics.patrimonioTotal)}
                </Typography>
            </div>
            <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #F3F4F6' }}>
                        <th style={{ paddingBottom: '12px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase' }}>Instituição</th>
                        <th style={{ paddingBottom: '12px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase' }}>Ref.</th>
                        <th style={{ paddingBottom: '12px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', textAlign: 'right' }}>Valor</th>
                        <th style={{ paddingBottom: '12px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', textAlign: 'right' }}>Share</th>
                    </tr>
                </thead>
                <tbody>
                    {instituicoes.map((inst: any) => (
                        <tr key={inst.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                            <td style={{ padding: '14px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: inst.cor }} />
                                    <Typography variant="p" style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>
                                        {inst.nome}
                                    </Typography>
                                </div>
                            </td>
                            <td style={{ padding: '14px 8px' }}>
                                <Typography variant="p" style={{ fontSize: '12px', opacity: 0.4 }}>
                                    {inst.ref ? fmtDate(inst.ref + 'T12:00:00Z') : '—'}
                                </Typography>
                            </td>
                            <td style={{ textAlign: 'right', padding: '14px 0' }}>
                                <Typography variant="p" style={{ fontWeight: 700, fontSize: '14px' }}>
                                    {fmt(inst.total)}
                                </Typography>
                            </td>
                            <td style={{ textAlign: 'right', padding: '14px 0' }}>
                                <Badge variant="ghost" style={{ fontSize: '11px', fontWeight: 700, color: inst.cor }}>
                                    {inst.pct.toFixed(1)}%
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );

    return (
        <Card style={{ border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', background: '#fff' }}>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch
                    titulo="Composição da Carteira"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                    mostrarSwitch={!isWide}
                />

                {/* ── Conteúdo: lado a lado em desktop wide, toggle em telas menores ── */}
                {isWide ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                        alignItems: 'center',
                    }}>
                        <div>{renderDonut()}</div>
                        <div>{renderTabela()}</div>
                    </div>
                ) : (
                    modoTabela ? renderTabela() : renderDonut()
                )}

            </CardContent>
        </Card>
    );
}
