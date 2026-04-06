import { useState } from 'react';
import { Typography, Card, CardContent } from 'avere-ui';
import { TrendingUp, TrendingDown, LineChart as LineIcon, BarChart3 } from 'lucide-react';
import {
    ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ReferenceLine, Cell
} from 'recharts';

import { useClient } from '../contexts/ClientContext';
import { NenhumClienteSelecionado } from '../components/home/NenhumClienteSelecionado';

// --- MOCK DATA: Histórico de 12 Meses ---
const mockHistorico = [
    { mes: 'Jan 25', portfolio: 1.2, cdi: 0.9, acumuladoPort: 1.2, acumuladoCdi: 0.9 },
    { mes: 'Fev 25', portfolio: 0.8, cdi: 0.8, acumuladoPort: 2.01, acumuladoCdi: 1.71 },
    { mes: 'Mar 25', portfolio: -0.5, cdi: 0.9, acumuladoPort: 1.50, acumuladoCdi: 2.62 },
    { mes: 'Abr 25', portfolio: 1.8, cdi: 0.8, acumuladoPort: 3.33, acumuladoCdi: 3.44 },
    { mes: 'Mai 25', portfolio: 2.1, cdi: 0.9, acumuladoPort: 5.50, acumuladoCdi: 4.37 },
    { mes: 'Jun 25', portfolio: 1.5, cdi: 0.8, acumuladoPort: 7.08, acumuladoCdi: 5.21 },
    { mes: 'Jul 25', portfolio: 0.9, cdi: 0.9, acumuladoPort: 8.04, acumuladoCdi: 6.16 },
    { mes: 'Ago 25', portfolio: -1.2, cdi: 0.8, acumuladoPort: 6.75, acumuladoCdi: 7.01 },
    { mes: 'Set 25', portfolio: 2.5, cdi: 0.9, acumuladoPort: 9.42, acumuladoCdi: 7.97 },
    { mes: 'Out 25', portfolio: 1.1, cdi: 0.8, acumuladoPort: 10.62, acumuladoCdi: 8.84 },
    { mes: 'Nov 25', portfolio: 3.0, cdi: 0.9, acumuladoPort: 13.94, acumuladoCdi: 9.82 },
    { mes: 'Dez 25', portfolio: 1.4, cdi: 0.8, acumuladoPort: 15.54, acumuladoCdi: 10.70 },
];

const fmtPct = (val: number) => `${val > 0 ? '+' : ''}${val.toFixed(2).replace('.', ',')}%`;

export default function Rentabilidade() {
    const { selectedClient } = useClient();
    const [periodo, setPeriodo] = useState('12M');

    // Se não houver cliente selecionado, bloqueia a tela com o nosso Empty State
    if (!selectedClient) {
        return <NenhumClienteSelecionado />;
    }

    // Cálculos de Resumo baseados no Mock
    const mesAtual = mockHistorico[mockHistorico.length - 1];
    const rentAcumulada = mesAtual.acumuladoPort;
    const cdiAcumulado = mesAtual.acumuladoCdi;
    const alpha = rentAcumulada - cdiAcumulado;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* HEADER */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Typography variant="h1">Rentabilidade Consolidada</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Análise de performance e histórico contra benchmarks</Typography>
                </div>

                {/* Seletor de Período (Visual por enquanto) */}
                <div style={{ display: 'flex', background: 'rgba(0,0,0,0.03)', padding: '4px', borderRadius: '8px' }}>
                    {['YTD', '12M', '24M', 'MAX'].map(p => (
                        <button
                            key={p}
                            onClick={() => setPeriodo(p)}
                            style={{
                                border: 'none', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
                                background: periodo === p ? '#fff' : 'transparent',
                                color: periodo === p ? 'var(--color-primaria)' : '#6B7280',
                                boxShadow: periodo === p ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                            }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </header>

            {/* CARDS DE RESUMO */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <Card>
                    <CardContent style={{ padding: '24px' }}>
                        <Typography variant="p" style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700, marginBottom: '8px' }}>
                            Acumulado ({periodo})
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <Typography variant="h2" style={{ color: rentAcumulada >= 0 ? '#10B981' : '#EF4444', fontSize: '32px' }}>
                                {fmtPct(rentAcumulada)}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent style={{ padding: '24px' }}>
                        <Typography variant="p" style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700, marginBottom: '8px' }}>
                            Alpha vs CDI
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Typography variant="h2" style={{ color: alpha >= 0 ? '#10B981' : '#EF4444', fontSize: '32px' }}>
                                {fmtPct(alpha)}
                            </Typography>
                            {alpha >= 0 ? <TrendingUp color="#10B981" size={24} /> : <TrendingDown color="#EF4444" size={24} />}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent style={{ padding: '24px' }}>
                        <Typography variant="p" style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700, marginBottom: '8px' }}>
                            Mês Atual
                        </Typography>
                        <Typography variant="h2" style={{ fontSize: '32px' }}>
                            {fmtPct(mesAtual.portfolio)}
                        </Typography>
                        <Typography variant="p" style={{ fontSize: '13px', opacity: 0.5, marginTop: '4px' }}>
                            vs {fmtPct(mesAtual.cdi)} (CDI)
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            {/* GRÁFICOS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>

                {/* Evolução Acumulada (Linha) */}
                <Card>
                    <CardContent style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                            <LineIcon size={20} color="#0083CB" />
                            <Typography variant="h2" style={{ fontSize: '18px' }}>Evolução Acumulada</Typography>
                        </div>
                        <div style={{ height: '350px', width: '100%' }}>
                            <ResponsiveContainer>
                                <LineChart data={mockHistorico} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(val) => `${val}%`} />
                                    <Tooltip
                                        formatter={(value: any) => [`${Number(value).toFixed(2)}%`, '']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                    <ReferenceLine y={0} stroke="#000" strokeOpacity={0.1} />

                                    <Line type="monotone" dataKey="acumuladoPort" name="Carteira" stroke="#0083CB" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="acumuladoCdi" name="CDI" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Retorno Mensal (Barras) */}
                <Card>
                    <CardContent style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                            <BarChart3 size={20} color="#0083CB" />
                            <Typography variant="h2" style={{ fontSize: '18px' }}>Retorno Mensal vs CDI</Typography>
                        </div>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer>
                                <BarChart data={mockHistorico} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(val) => `${val}%`} />
                                    <Tooltip
                                        formatter={(value: any) => [`${Number(value).toFixed(2)}%`, '']}
                                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                    <ReferenceLine y={0} stroke="#000" strokeOpacity={0.2} />

                                    <Bar dataKey="portfolio" name="Carteira" radius={[4, 4, 0, 0]}>
                                        {mockHistorico.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.portfolio >= 0 ? '#0083CB' : '#EF4444'} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="cdi" name="CDI" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}