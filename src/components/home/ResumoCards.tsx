import { Card, CardContent, Typography, Badge } from 'avere-ui';
import { Briefcase, Building2 } from 'lucide-react';
import { fmt, pct, fmtDate } from '../../utils/formatters';

interface ResumoCardsProps {
    metrics: any;
}

export function ResumoCards({ metrics }: ResumoCardsProps) {
    const montserrat = { fontFamily: 'Montserrat, sans-serif' };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>

            {/* PATRIMÔNIO TOTAL */}
            <Card style={{ borderLeft: '4px solid var(--color-primaria)', gridColumn: '1 / -1' }}>
                <CardContent style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primaria)', marginBottom: '8px' }}>
                        <Briefcase size={18} />
                        <Typography variant="p" style={{ ...montserrat, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Patrimônio Total da Visão
                        </Typography>
                    </div>
                    <Typography variant="h1" style={{ ...montserrat, fontSize: '40px', fontWeight: 800, color: 'var(--color-primaria)' }}>
                        {fmt(metrics.patrimonioTotal)}
                    </Typography>
                </CardContent>
            </Card>

            {/* BTG PACTUAL */}
            {metrics.btgTotal > 0 && (
                <Card>
                    <CardContent style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', opacity: 0.6 }}>
                            <Building2 size={16} />
                            <Typography variant="p" style={{ ...montserrat, fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>BTG Pactual</Typography>
                            <Badge variant="ghost" style={{ ...montserrat, fontSize: '10px', marginLeft: 'auto', fontWeight: 700 }}>
                                {pct(metrics.btgTotal, metrics.patrimonioTotal).toFixed(1)}%
                            </Badge>
                        </div>
                        <Typography variant="h2" style={{ ...montserrat, fontSize: '22px', fontWeight: 800 }}>
                            {fmt(metrics.btgTotal)}
                        </Typography>
                        {metrics.dataRefBtg && (
                            <Typography variant="p" style={{ ...montserrat, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>
                                Ref: {fmtDate(metrics.dataRefBtg + 'T12:00:00Z')}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* XP INVESTIMENTOS */}
            {metrics.xpTotal > 0 && (
                <Card>
                    <CardContent style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', opacity: 0.6 }}>
                            <Building2 size={16} />
                            <Typography variant="p" style={{ ...montserrat, fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>XP Investimentos</Typography>
                            <Badge variant="ghost" style={{ ...montserrat, fontSize: '10px', marginLeft: 'auto', fontWeight: 700 }}>
                                {pct(metrics.xpTotal, metrics.patrimonioTotal).toFixed(1)}%
                            </Badge>
                        </div>
                        <Typography variant="h2" style={{ ...montserrat, fontSize: '22px', fontWeight: 800 }}>
                            {fmt(metrics.xpTotal)}
                        </Typography>
                        {metrics.dataRefXp && (
                            <Typography variant="p" style={{ ...montserrat, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>
                                Ref: {fmtDate(metrics.dataRefXp + 'T12:00:00Z')}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            )}

        </div>
    );
}