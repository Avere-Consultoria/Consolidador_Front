import { useState } from 'react';
import { Card, CardContent, Typography, Badge } from 'avere-ui';
import { Briefcase } from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { TooltipCustom } from './Tooltips';
import { fmt, fmtDate } from '../../../utils/formatters';
import { CORES } from '../../../utils/colors';

interface ResumoCardsProps {
    metrics: any;
}

export function ResumoCards({ metrics }: ResumoCardsProps) {
    const [modoTabela, setModoTabela] = useState(false);

    const corBtg    = metrics.coresInstituicoes?.btg    || CORES.btg;
    const corXp     = metrics.coresInstituicoes?.xp     || CORES.xp;
    const corAvenue = metrics.coresInstituicoes?.avenue || CORES.avenue;
    const corAgora  = metrics.coresInstituicoes?.agora  || CORES.agora;

    const pct = (valor: number) => metrics.patrimonioTotal > 0
        ? (valor / metrics.patrimonioTotal) * 100
        : 0;

    const instituicoes = [
        { id: 'btg',    nome: 'BTG Pactual',      total: metrics.btgTotal,    pct: pct(metrics.btgTotal),    ref: metrics.dataRefBtg,    cor: corBtg    },
        { id: 'xp',     nome: 'XP Investimentos', total: metrics.xpTotal,     pct: pct(metrics.xpTotal),     ref: metrics.dataRefXp,     cor: corXp     },
        { id: 'avenue', nome: 'Avenue',            total: metrics.avenueTotal, pct: pct(metrics.avenueTotal), ref: metrics.dataRefAvenue, cor: corAvenue },
        { id: 'agora',  nome: 'Ágora',             total: metrics.agoraTotal,  pct: pct(metrics.agoraTotal),  ref: metrics.dataRefAgora,  cor: corAgora  },
    ].filter(i => i.total > 0);

    // Dados para o PieChart — derivados do mesmo array
    const pieData = instituicoes.map(i => ({
        name: i.nome, value: i.total, fill: i.cor, pct: i.pct,
    }));

    return (
        <Card style={{ border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', background: '#fff' }}>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch
                    titulo="Composição da Carteira"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />

                {/* Patrimônio total — sempre visível */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', marginBottom: '4px' }}>
                        <Briefcase size={16} />
                        <Typography variant="p" style={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Patrimônio Total da Visão
                        </Typography>
                    </div>
                    <Typography variant="h1" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-secundaria)' }}>
                        {fmt(metrics.patrimonioTotal)}
                    </Typography>
                </div>

                {/* ── MODO GRÁFICO (Donut) ──────────────────────────────────── */}
                {!modoTabela ? (
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%" cy="50%"
                                innerRadius={70} outerRadius={100}
                                paddingAngle={3}
                                dataKey="value"
                                animationBegin={0}
                                animationDuration={800}
                            >
                                {pieData.map((entry, i) => (
                                    <Cell key={i} fill={entry.fill} stroke="none" />
                                ))}
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
                ) : (
                    /* ── MODO TABELA ────────────────────────────────────────── */
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
                                {instituicoes.map(inst => (
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
                                                {fmtDate(inst.ref + 'T12:00:00Z')}
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
                )}

            </CardContent>
        </Card>
    );
}
