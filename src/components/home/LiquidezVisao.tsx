import { useState } from 'react';
import { Card, CardContent, Typography, Button } from 'avere-ui';
import { Droplets, BarChart2, List } from 'lucide-react';
import { fmt } from '../../utils/formatters';

interface LiquidezVisaoProps {
    dados: { name: string; value: number; pct: number }[];
}

export function LiquidezVisao({ dados }: LiquidezVisaoProps) {
    const [modo, setModo] = useState<'GRAFICO' | 'TABELA'>('GRAFICO');

    if (!dados || dados.length === 0) return null;

    return (
        <Card style={{ marginTop: '24px' }}>
            <CardContent style={{ padding: '24px' }}>

                {/* Cabeçalho com Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(0, 180, 216, 0.1)', padding: '8px', borderRadius: '8px', color: '#00B4D8' }}>
                            <Droplets size={20} />
                        </div>
                        <div>
                            <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700 }}>Perfil de Liquidez</Typography>
                            <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6 }}>Disponibilidade do património no tempo</Typography>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '8px' }}>
                        <Button
                            variant={modo === 'GRAFICO' ? 'solid' : 'ghost'}
                            onClick={() => setModo('GRAFICO')}
                            style={{ height: '32px', padding: '0 12px', borderRadius: '6px', background: modo === 'GRAFICO' ? '#fff' : 'transparent', color: modo === 'GRAFICO' ? '#081F28' : '#6B7280', boxShadow: modo === 'GRAFICO' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                        >
                            <BarChart2 size={16} />
                        </Button>
                        <Button
                            variant={modo === 'TABELA' ? 'solid' : 'ghost'}
                            onClick={() => setModo('TABELA')}
                            style={{ height: '32px', padding: '0 12px', borderRadius: '6px', background: modo === 'TABELA' ? '#fff' : 'transparent', color: modo === 'TABELA' ? '#081F28' : '#6B7280', boxShadow: modo === 'TABELA' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
                        >
                            <List size={16} />
                        </Button>
                    </div>
                </div>

                {/* MODO GRÁFICO (Barras Horizontais) */}
                {modo === 'GRAFICO' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dados.map((liq, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>{liq.name}</Typography>
                                    <Typography variant="p" style={{ fontWeight: 700, fontSize: '13px', color: '#00B4D8' }}>
                                        {liq.pct.toFixed(1)}% <span style={{ opacity: 0.5, fontWeight: 400, fontSize: '11px', marginLeft: '6px' }}>({fmt(liq.value)})</span>
                                    </Typography>
                                </div>
                                <div style={{ height: '8px', width: '100%', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            height: '100%', width: `${Math.min(liq.pct, 100)}%`,
                                            background: 'linear-gradient(90deg, #0083CB 0%, #00B4D8 100%)',
                                            borderRadius: '4px', transition: 'width 1s ease-in-out'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* MODO TABELA */}
                {modo === 'TABELA' && (
                    <div style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: 'rgba(0,0,0,0.02)' }}>
                                <tr>
                                    <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Prazo de Resgate</th>
                                    <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textAlign: 'right' }}>Valor Consolidado</th>
                                    <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#6B7280', textAlign: 'right' }}>% da Carteira</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dados.map((liq, index) => (
                                    <tr key={index} style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600 }}>{liq.name}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '13px', textAlign: 'right', fontFamily: 'monospace' }}>{fmt(liq.value)}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '13px', textAlign: 'right', fontWeight: 700, color: '#00B4D8' }}>{liq.pct.toFixed(1)}%</td>
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