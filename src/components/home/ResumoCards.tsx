import { Card, CardContent, Typography, Badge } from 'avere-ui';
import { Briefcase, Building2, AlertCircle } from 'lucide-react';
import { fmt, pct, fmtDate } from '../../utils/formatters';

const PERIODOS = [
    { label: '7 dias', dias: 7 },
    { label: '15 dias', dias: 15 },
    { label: '30 dias', dias: 30 },
    { label: '60 dias', dias: 60 },
    { label: '90 dias', dias: 90 },
    { label: '6 meses', dias: 180 },
    { label: '1 ano', dias: 365 },
    { label: 'Todos', dias: 9999 },
];

interface ResumoCardsProps {
    metrics: any; // Tiparemos usando o Retorno do hook depois se quiseres
    diasVencimento: number;
    setDiasVencimento: (dias: number) => void;
}

export function ResumoCards({ metrics, diasVencimento, setDiasVencimento }: ResumoCardsProps) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>

            {/* PATRIMÓNIO TOTAL */}
            <Card style={{ borderLeft: '4px solid var(--color-primaria)', gridColumn: '1 / -1' }}>
                <CardContent style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primaria)', marginBottom: '8px' }}>
                        <Briefcase size={18} />
                        <Typography variant="p" style={{ fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>
                            Património Total da Visão
                        </Typography>
                    </div>
                    <Typography variant="h1" style={{ fontSize: '40px', fontWeight: 800, color: 'var(--color-primaria)' }}>
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
                            <Typography variant="p" style={{ fontWeight: 600, fontSize: '12px' }}>BTG Pactual</Typography>
                            <Badge variant="ghost" style={{ fontSize: '11px', marginLeft: 'auto' }}>
                                {pct(metrics.btgTotal, metrics.patrimonioTotal).toFixed(1)}%
                            </Badge>
                        </div>
                        <Typography variant="h2" style={{ fontSize: '22px', fontWeight: 700 }}>
                            {fmt(metrics.btgTotal)}
                        </Typography>
                        {metrics.dataRefBtg && (
                            <Typography variant="p" style={{ fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>
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
                            <Typography variant="p" style={{ fontWeight: 600, fontSize: '12px' }}>XP Investimentos</Typography>
                            <Badge variant="ghost" style={{ fontSize: '11px', marginLeft: 'auto' }}>
                                {pct(metrics.xpTotal, metrics.patrimonioTotal).toFixed(1)}%
                            </Badge>
                        </div>
                        <Typography variant="h2" style={{ fontSize: '22px', fontWeight: 700 }}>
                            {fmt(metrics.xpTotal)}
                        </Typography>
                        {metrics.dataRefXp && (
                            <Typography variant="p" style={{ fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>
                                Ref: {fmtDate(metrics.dataRefXp + 'T12:00:00Z')}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* VENCIMENTOS */}
            <Card style={{ borderLeft: '4px solid #f59e0b' }}>
                <CardContent style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <AlertCircle size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />
                        <Typography variant="p" style={{ fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: '#f59e0b' }}>
                            Vencimentos
                        </Typography>
                        <select
                            value={diasVencimento}
                            onChange={e => setDiasVencimento(Number(e.target.value))}
                            style={{
                                marginLeft: 'auto', fontSize: '11px', fontWeight: 600,
                                fontFamily: 'Montserrat, sans-serif',
                                border: '1px solid rgba(245,158,11,0.3)', borderRadius: '6px',
                                padding: '3px 6px', background: 'rgba(245,158,11,0.06)',
                                color: '#f59e0b', cursor: 'pointer', outline: 'none',
                            }}
                        >
                            {PERIODOS.map(p => (
                                <option key={p.dias} value={p.dias}>{p.label}</option>
                            ))}
                        </select>
                    </div>
                    <Typography variant="h2" style={{ fontSize: '28px', fontWeight: 800 }}>
                        {metrics.vencimentosProx.length} ativo{metrics.vencimentosProx.length !== 1 ? 's' : ''}
                    </Typography>
                    {metrics.vencimentosProx.length > 0 && (
                        <Typography variant="p" style={{ fontSize: '11px', opacity: 0.5, marginTop: '4px' }}>
                            {metrics.vencimentosProx.map((a: any) => a.nome).slice(0, 2).join(', ')}
                            {metrics.vencimentosProx.length > 2 && ` +${metrics.vencimentosProx.length - 2}`}
                        </Typography>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}