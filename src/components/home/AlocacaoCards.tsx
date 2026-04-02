import { Card, CardContent, Typography } from 'avere-ui';
import { PieChart as PieIcon } from 'lucide-react';
import { fmt, pct } from '../../utils/formatters';

interface AlocacaoCardsProps {
    alocacaoData: { name: string; value: number; pct: number; fill: string }[];
    patrimonioTotal: number;
}

export function AlocacaoCards({ alocacaoData, patrimonioTotal }: AlocacaoCardsProps) {
    if (!alocacaoData || alocacaoData.length === 0) return null;

    return (
        <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <PieIcon size={16} style={{ opacity: 0.4 }} />
                <Typography variant="h2" style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', opacity: 0.7 }}>
                    Alocação Detalhada
                </Typography>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {alocacaoData.map(({ name, value, fill }) => (
                    <Card key={name}>
                        <CardContent style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '2px', background: fill, flexShrink: 0 }} />
                                <Typography variant="p" style={{ fontSize: '11px', opacity: 0.5, fontWeight: 600, textTransform: 'uppercase' }}>
                                    {name}
                                </Typography>
                            </div>
                            <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                                {fmt(value)}
                            </Typography>
                            <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(0,0,0,0.07)' }}>
                                <div style={{ height: '100%', borderRadius: '2px', width: `${Math.min(pct(value, patrimonioTotal), 100)}%`, background: fill, transition: 'width 0.6s ease' }} />
                            </div>
                            <Typography variant="p" style={{ fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>
                                {pct(value, patrimonioTotal).toFixed(1)}%
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}