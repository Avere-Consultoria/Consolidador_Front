import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Badge, Button } from 'avere-ui';
import { ShieldAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt } from '../../../utils/formatters';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface RiscoEmissorProps {
    dados: {
        name: string; setor: string; value: number; pct: number;
        cor?: string | null;
        semEmissor?: boolean;
        detalhes?: { nome: string; valor: number }[];
    }[];
}

// Cor da barra = cor do setor cadastrada (Gestão Master). Fallback cinza.
const COR_SEM_SETOR = '#9CA3AF';
function corSetor(d: { cor?: string | null }): string {
    return d.cor ?? COR_SEM_SETOR;
}

// ── Estilos de Tabela ────────────────────────────────────────────────────────
const tableStyle: React.CSSProperties = {
    width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'Montserrat, sans-serif',
};
const thStyle: React.CSSProperties = {
    textAlign: 'left', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4,
    textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em',
};
const tdStyle: React.CSSProperties = {
    padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontWeight: 500, color: 'var(--color-secundaria)',
};

// ── Cor por concentração ─────────────────────────────────────────────────────
function corPorPct(pct: number): string {
    if (pct > 25) return '#EF4444';  // vermelho
    if (pct > 15) return '#F59E0B';  // amarelo
    return '#10B981';                // verde
}

// ── Tooltip ──────────────────────────────────────────────────────────────────
function TooltipBar({ active, payload }: any) {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0].payload;
    if (!p?.name) return null;
    return (
        <div style={{
            background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8,
            padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontFamily: 'Montserrat, sans-serif', maxWidth: 280,
        }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-secundaria)', marginBottom: 4 }}>{p.name}</div>
            {p.setor && p.setor !== 'Sem setor' && (
                <div style={{ fontSize: 10, opacity: 0.5, marginBottom: 6 }}>{p.setor}</div>
            )}
            <div style={{ fontSize: 15, fontWeight: 800, color: corPorPct(p.pct ?? 0) }}>{(p.pct ?? 0).toFixed(1)}%</div>
            <div style={{ fontSize: 12, color: 'var(--color-secundaria)', opacity: 0.7, marginTop: 2 }}>{fmt(p.value ?? 0)}</div>
        </div>
    );
}

// ── Componente principal ─────────────────────────────────────────────────────
export function RiscoEmissor({ dados }: RiscoEmissorProps) {
    const isWide = useMediaQuery('(min-width: 1280px)');
    const [modoTabela, setModoTabela] = useState(false);
    const [viewMode, setViewMode] = useState<string>('5');

    const dadosFiltrados = useMemo(() => {
        if (!dados) return [];
        const sorted = [...dados].sort((a, b) => b.value - a.value);
        if (viewMode === '5') return sorted.slice(0, 5);
        if (viewMode === '10') return sorted.slice(0, 10);
        return sorted;
    }, [dados, viewMode]);

    const opcoesVisualizacao = [
        { label: 'Top 5', value: '5' },
        { label: 'Top 10', value: '10' },
        { label: 'Todos', value: 'ALL' },
    ];

    const chartHeight = Math.max(200, dadosFiltrados.length * 38 + 40);

    const renderBarras = () => (
        dadosFiltrados.length === 0 ? null : (
            <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart data={dadosFiltrados} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
                    <CartesianGrid horizontal={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis
                        type="number"
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                        tick={{ fontSize: 10, fontFamily: 'Montserrat, sans-serif', fill: 'var(--color-secundaria)' }}
                    />
                    <YAxis
                        type="category"
                        dataKey="name"
                        width={140}
                        tick={{ fontSize: 10, fontFamily: 'Montserrat, sans-serif', fill: 'var(--color-secundaria)' }}
                        tickFormatter={(v: string) => (v.length > 22 ? v.slice(0, 22) + '…' : v)}
                    />
                    <Tooltip content={<TooltipBar />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                        {dadosFiltrados.map((d, i) => <Cell key={i} fill={corSetor(d)} />)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        )
    );

    const renderTabela = () => (
        <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Emissor</th>
                        <th style={thStyle}>Setor</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Valor</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>% Total</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosFiltrados.map((emissor, i) => (
                        <tr key={i}>
                            <td style={tdStyle}>
                                {emissor.name}
                            </td>
                            <td style={tdStyle}>
                                <Badge variant="ghost" style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif', color: corSetor(emissor), background: `${corSetor(emissor)}1A` }}>
                                    {emissor.setor || 'N/A'}
                                </Badge>
                            </td>
                            <td style={{ ...tdStyle, fontWeight: 700, textAlign: 'right' }}>{fmt(emissor.value)}</td>
                            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 800, color: corPorPct(emissor.pct) }}>
                                {emissor.pct.toFixed(1)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <Card style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch
                    titulo="Crédito Privado (por Emissor)"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                    mostrarSwitch={!isWide}
                />

                {/* ── Sub-header: controle de visualização ── */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>

                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '8px' }}>
                        {opcoesVisualizacao.map(opt => (
                            <Button
                                key={opt.value}
                                variant={viewMode === opt.value ? 'solid' : 'ghost'}
                                onClick={() => setViewMode(opt.value)}
                                style={{
                                    height: '28px', padding: '0 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                    fontFamily: 'Montserrat, sans-serif',
                                    background: viewMode === opt.value ? '#fff' : 'transparent',
                                    color: viewMode === opt.value ? 'var(--color-secundaria)' : '#6B7280',
                                    boxShadow: viewMode === opt.value ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                }}
                            >
                                {opt.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* ── Conteúdo ── */}
                {(!dados || dados.length === 0) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: '12px', opacity: 0.4 }}>
                        <ShieldAlert size={32} />
                        <Typography variant="p" style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>
                            Nenhum emissor classificado
                        </Typography>
                        <Typography variant="p" style={{ fontSize: '11px', fontFamily: 'Montserrat, sans-serif', textAlign: 'center', lineHeight: '1.5' }}>
                            Associe emissores aos ativos no Master para visualizar a concentração de crédito.
                        </Typography>
                    </div>
                ) : isWide ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
                        <div>{renderBarras()}</div>
                        <div>{renderTabela()}</div>
                    </div>
                ) : (
                    modoTabela ? renderTabela() : renderBarras()
                )}

                {dados && dados.some(d => d.pct > 15 && !d.semEmissor) && (
                    <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', display: 'flex', gap: '8px', color: '#B45309', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <Typography variant="p" style={{ fontSize: '12px', lineHeight: '1.4', fontFamily: 'Montserrat, sans-serif' }}>
                            <strong>Atenção:</strong> A carteira possui concentração superior a 15% num único emissor.
                        </Typography>
                    </div>
                )}

                {(() => {
                    const sem = (dados || []).find(d => d.semEmissor);
                    if (!sem || !sem.detalhes || sem.detalhes.length === 0) return null;
                    return (
                        <div style={{ marginTop: 16, padding: 12, background: 'rgba(0,0,0,0.02)', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
                            <Typography variant="p" style={{ fontSize: 11, fontWeight: 700, opacity: 0.6, fontFamily: 'Montserrat, sans-serif', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Sem emissor — não reconhecidos
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {sem.detalhes.map((d, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12, fontFamily: 'Montserrat, sans-serif', padding: '3px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                        <span style={{ color: 'var(--color-secundaria)' }}>{d.nome}</span>
                                        <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{fmt(d.valor)}</span>
                                    </div>
                                ))}
                            </div>
                            <Typography variant="p" style={{ fontSize: 10, opacity: 0.45, fontFamily: 'Montserrat, sans-serif', marginTop: 8, lineHeight: 1.4 }}>
                                Cadastre esses emissores (com setor) em Gestão Master → Emissores. Depois de criados, os ativos classificam sozinhos.
                            </Typography>
                        </div>
                    );
                })()}
            </CardContent>
        </Card>
    );
}
