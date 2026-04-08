import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Badge, Button, Select } from 'avere-ui';
import { ShieldAlert } from 'lucide-react';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt } from '../../../utils/formatters';

interface RiscoEmissorProps {
    dados: { name: string; setor: string; value: number; pct: number }[];
}

// ── Estilos de Tabela (Padronizados) ──────────────────────────────────────────
const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    marginTop: '8px',
    fontFamily: 'Montserrat, sans-serif'
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
    color: '#081F28'
};

export function RiscoEmissor({ dados }: RiscoEmissorProps) {
    const [modoTabela, setModoTabela] = useState(false);
    const [viewMode, setViewMode] = useState<string>('5'); // Alterado para string para alinhar com o Select raiz

    const dadosFiltrados = useMemo(() => {
        if (!dados) return [];
        const sorted = [...dados].sort((a, b) => b.pct - a.pct);
        if (viewMode === '5') return sorted.slice(0, 5);
        if (viewMode === '10') return sorted.slice(0, 10);
        return sorted;
    }, [dados, viewMode]);

    const opcoesVisualizacao = [
        { label: 'Top 5', value: '5' },
        { label: 'Top 10', value: '10' },
        { label: 'Todos', value: 'ALL' }
    ];

    if (!dados || dados.length === 0) return null;

    return (
        <Card style={{ marginTop: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch
                    titulo="Exposição por Emissor"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '8px',
                    borderRadius: '8px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '8px', color: '#EF4444' }}>
                            <ShieldAlert size={20} />
                        </div>
                        <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6, fontFamily: 'Montserrat, sans-serif' }}>
                            Concentração de Crédito
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

                        {/* Opção 1: Segmented Control */}
                        <div style={{
                            display: 'flex',
                            gap: '4px',
                            background: 'rgba(0,0,0,0.05)',
                            padding: '4px',
                            borderRadius: '8px'
                        }}>
                            {opcoesVisualizacao.map((opt) => (
                                <Button
                                    key={opt.value}
                                    variant={viewMode === opt.value ? 'solid' : 'ghost'}
                                    onClick={() => setViewMode(opt.value)}
                                    style={{
                                        height: '28px',
                                        padding: '0 10px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        fontFamily: 'Montserrat, sans-serif',
                                        background: viewMode === opt.value ? '#fff' : 'transparent',
                                        color: viewMode === opt.value ? '#081F28' : '#6B7280',
                                        boxShadow: viewMode === opt.value ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                    }}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                        </div>

                        {/* Opção 2: Select Raiz (Corrigido) */}
                        <div style={{ width: '130px' }}>
                            <Select
                                value={viewMode}
                                onChange={(val) => setViewMode(val)} // Ajustado para receber apenas a string
                                options={opcoesVisualizacao}
                                placeholder="Filtrar..."
                                className="risk-select-custom" // Caso queira aplicar CSS via classe
                            />
                        </div>
                    </div>
                </div>

                {modoTabela ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Emissor</th>
                                    <th style={thStyle}>Setor</th>
                                    <th style={thStyle}>Valor</th>
                                    <th style={{ ...thStyle, textAlign: 'right' }}>% Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dadosFiltrados.map((emissor, i) => (
                                    <tr key={i}>
                                        <td style={tdStyle}>{emissor.name}</td>
                                        <td style={tdStyle}>
                                            <Badge variant="ghost" style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif' }}>
                                                {emissor.setor || 'N/A'}
                                            </Badge>
                                        </td>
                                        <td style={{ ...tdStyle, fontWeight: 700 }}>{fmt(emissor.value)}</td>
                                        <td style={{ ...tdStyle, textAlign: 'right', color: emissor.pct > 15 ? '#EF4444' : 'inherit' }}>
                                            {emissor.pct.toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dadosFiltrados.map((emissor, index) => {
                            const corBarra = emissor.pct > 25 ? '#EF4444' : emissor.pct > 15 ? '#F59E0B' : '#10B981';
                            return (
                                <div key={index}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>
                                                {emissor.name}
                                            </Typography>
                                            {emissor.setor && (
                                                <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'Montserrat, sans-serif' }}>
                                                    {emissor.setor}
                                                </span>
                                            )}
                                        </div>
                                        <Typography variant="p" style={{ fontWeight: 700, fontSize: '13px', color: corBarra, fontFamily: 'Montserrat, sans-serif' }}>
                                            {emissor.pct.toFixed(1)}% <span style={{ opacity: 0.5, fontWeight: 400, fontSize: '11px', marginLeft: '6px', color: '#081F28' }}>({fmt(emissor.value)})</span>
                                        </Typography>
                                    </div>
                                    <div style={{ height: '6px', width: '100%', background: 'rgba(0,0,0,0.05)', borderRadius: '3px' }}>
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
                )}

                {dados.some(d => d.pct > 15) && (
                    <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', display: 'flex', gap: '8px', color: '#B45309', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <Typography variant="p" style={{ fontSize: '12px', lineHeight: '1.4', fontFamily: 'Montserrat, sans-serif' }}>
                            <strong>Atenção:</strong> A carteira possui concentração superior a 15% num único emissor.
                        </Typography>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}