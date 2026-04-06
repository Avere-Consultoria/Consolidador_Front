import { Card, CardContent, Typography, Badge } from 'avere-ui';
import { ShieldAlert } from 'lucide-react';
import { fmt } from '../../utils/formatters';

interface RiscoEmissorProps {
    dados: { name: string; setor: string; value: number; pct: number }[];
}

export function RiscoEmissor({ dados }: RiscoEmissorProps) {
    if (!dados || dados.length === 0) return null;

    return (
        <Card style={{ marginTop: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <CardContent style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '8px', color: '#EF4444' }}>
                            <ShieldAlert size={20} />
                        </div>
                        <div>
                            <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700 }}>Exposição por Emissor</Typography>
                            <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6 }}>Concentração de Risco de Crédito</Typography>
                        </div>
                    </div>
                    <Badge variant="outline" style={{ fontSize: '11px', color: '#6B7280' }}>
                        Risco Matriz
                    </Badge>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {dados.map((emissor, index) => {
                        // Regra de Risco: > 25% é Perigo, > 15% é Alerta, senão é Seguro
                        const corBarra = emissor.pct > 25 ? '#EF4444' : emissor.pct > 15 ? '#F59E0B' : '#10B981';

                        return (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>
                                            {emissor.name}
                                        </Typography>
                                        {emissor.setor && (
                                            <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                                                {emissor.setor}
                                            </span>
                                        )}
                                    </div>
                                    <Typography variant="p" style={{ fontWeight: 700, fontSize: '13px', color: corBarra }}>
                                        {emissor.pct.toFixed(1)}% <span style={{ opacity: 0.5, fontWeight: 400, fontSize: '11px', marginLeft: '6px' }}>({fmt(emissor.value)})</span>
                                    </Typography>
                                </div>

                                {/* Barra de Progresso */}
                                <div style={{ height: '6px', width: '100%', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            height: '100%',
                                            width: `${Math.min(emissor.pct, 100)}%`,
                                            background: corBarra,
                                            borderRadius: '3px',
                                            transition: 'width 1s ease-in-out'
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {dados.some(d => d.pct > 15) && (
                    <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', display: 'flex', gap: '8px', color: '#B45309' }}>
                        <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <Typography variant="p" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                            <strong>Atenção:</strong> A carteira possui concentração superior a 15% num único emissor. Em caso de *default* corporativo, uma fatia significativa do património pode ser impactada.
                        </Typography>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}