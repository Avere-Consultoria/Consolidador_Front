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
                                <text x={cx} y={cy - 10} textAnchor="middle" style={{ fontSize: 10, fontWeight: 600, fill: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>TOTAL</text>
                                <text x={cx} y={cy + 13} textAnchor="middle" style={{ fontSize: fs, fontWeight: 700, fill: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{valor}</text>
                            </g>
                        );
                    }} />
                </Pie>
                <Tooltip content={<TooltipCustom />} />
                <Legend
                    iconType="circle"
                    iconSize={10}
                    formatter={(value, entry: any) => (
                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)' as any, color: 'var(--color-text-primary)' }}>
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
                <Typography variant="p" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-semibold)' as any, fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', color: 'var(--color-text-muted)' }}>
                    Patrimônio Total
                </Typography>
                <Typography variant="h1" style={{ fontSize: '28px', fontWeight: 'var(--weight-bold)' as any, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', letterSpacing: 'var(--tracking-tight)' }}>
                    {fmt(metrics.patrimonioTotal)}
                </Typography>
            </div>
            <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <th style={{ paddingBottom: '12px', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)' as any, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Instituição</th>
                        <th style={{ paddingBottom: '12px', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)' as any, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Ref.</th>
                        <th style={{ paddingBottom: '12px', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)' as any, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', textAlign: 'right' }}>Valor</th>
                        <th style={{ paddingBottom: '12px', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)' as any, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', textAlign: 'right' }}>Share</th>
                    </tr>
                </thead>
                <tbody>
                    {instituicoes.map((inst: any) => (
                        <tr key={inst.id} style={{ borderBottom: '1px solid var(--color-surface-sunken)' }}>
                            <td style={{ padding: '14px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: 10, height: 10, borderRadius: 'var(--radius-full)', background: inst.cor }} />
                                    <Typography variant="p" style={{ fontWeight: 'var(--weight-medium)' as any, fontSize: 'var(--text-md)', color: 'var(--color-text-primary)' }}>
                                        {inst.nome}
                                    </Typography>
                                </div>
                            </td>
                            <td style={{ padding: '14px 8px' }}>
                                <Typography variant="p" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                                    {inst.ref ? fmtDate(inst.ref + 'T12:00:00Z') : '—'}
                                </Typography>
                            </td>
                            <td style={{ textAlign: 'right', padding: '14px 0' }}>
                                <Typography variant="p" style={{ fontWeight: 'var(--weight-semibold)' as any, fontSize: 'var(--text-md)', fontVariantNumeric: 'tabular-nums' }}>
                                    {fmt(inst.total)}
                                </Typography>
                            </td>
                            <td style={{ textAlign: 'right', padding: '14px 0' }}>
                                <Badge variant="ghost" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)' as any, color: inst.cor, fontVariantNumeric: 'tabular-nums' }}>
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
        <Card style={{ border: '1px solid var(--color-border-subtle)', overflow: 'hidden', background: 'var(--color-surface)' }}>
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
