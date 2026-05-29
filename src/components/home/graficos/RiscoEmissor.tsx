import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Badge, Button } from 'avere-ui';
import { ShieldAlert } from 'lucide-react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt } from '../../../utils/formatters';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface RiscoEmissorProps {
    dados: { name: string; setor: string; value: number; pct: number }[];
}

// ── Estilos de Tabela ────────────────────────────────────────────────────────
const tableStyle: React.CSSProperties = {
    width: '100%', borderCollapse: 'collapse', fontSize: '12px',
    fontFamily: 'Montserrat, sans-serif',
};
const thStyle: React.CSSProperties = {
    textAlign: 'left', padding: '8px 4px',
    borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4,
    textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em',
};
const tdStyle: React.CSSProperties = {
    padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)',
    fontWeight: 500, color: 'var(--color-secundaria)',
};

// ── Cor por concentração ─────────────────────────────────────────────────────
function corPorPct(pct: number): string {
    if (pct > 25) return '#EF4444';  // vermelho
    if (pct > 15) return '#F59E0B';  // amarelo
    return '#10B981';                // verde
}

// ── Tooltip customizado ─────────────────────────────────────────────────────
function TooltipTreemap({ active, payload }: any) {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0].payload;
    if (!p?.name) return null;
    return (
        <div style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontFamily: 'Montserrat, sans-serif',
            maxWidth: '280px',
        }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-secundaria)', marginBottom: '4px' }}>
                {p.name}
            </div>
            {p.setor && p.setor !== 'Sem setor' && (
                <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '6px' }}>
                    {p.setor}
                </div>
            )}
            <div style={{ fontSize: '15px', fontWeight: 800, color: corPorPct(p.pct ?? 0) }}>
                {(p.pct ?? 0).toFixed(1)}%
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-secundaria)', opacity: 0.7, marginTop: '2px' }}>
                {fmt(p.value ?? 0)}
            </div>
        </div>
    );
}

// ── Cell customizada do Treemap ─────────────────────────────────────────────
function CustomTreemapCell(props: any) {
    const { x, y, width, height, name, pct, cor } = props;
    if (width < 1 || height < 1) return null;

    const showName = width > 50 && height > 28;
    const showPct  = width > 40 && height > 18;
    const nameFontSize = Math.min(width / 10, 14);

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={cor}
                stroke="#fff"
                strokeWidth={2}
                style={{ cursor: 'default' }}
            />
            {showName && (
                <text
                    x={x + 8}
                    y={y + 18}
                    fill="#fff"
                    fontSize={Math.max(10, Math.min(13, nameFontSize))}
                    fontWeight={700}
                    fontFamily="Montserrat, sans-serif"
                    style={{ pointerEvents: 'none' }}
                >
                    {name.length > Math.floor(width / 7)
                        ? name.slice(0, Math.floor(width / 7)) + '…'
                        : name}
                </text>
            )}
            {showPct && (
                <text
                    x={x + 8}
                    y={y + (showName ? 36 : 18)}
                    fill="#fff"
                    fontSize={11}
                    fontWeight={600}
                    opacity={0.9}
                    fontFamily="Montserrat, sans-serif"
                    style={{ pointerEvents: 'none' }}
                >
                    {(pct ?? 0).toFixed(1)}%
                </text>
            )}
        </g>
    );
}

// ── Componente principal ─────────────────────────────────────────────────────
export function RiscoEmissor({ dados }: RiscoEmissorProps) {
    const isWide = useMediaQuery('(min-width: 1280px)');
    const [modoTabela, setModoTabela] = useState(false);
    const [viewMode, setViewMode] = useState<string>('5');

    const dadosFiltrados = useMemo(() => {
        if (!dados) return [];
        const sorted = [...dados].sort((a, b) => b.pct - a.pct);
        if (viewMode === '5') return sorted.slice(0, 5);
        if (viewMode === '10') return sorted.slice(0, 10);
        return sorted;
    }, [dados, viewMode]);

    const treemapData = useMemo(() =>
        dadosFiltrados.map(d => ({
            name:  d.name,
            value: d.value,
            pct:   d.pct,
            setor: d.setor,
            cor:   corPorPct(d.pct),
        }))
    , [dadosFiltrados]);

    const opcoesVisualizacao = [
        { label: 'Top 5', value: '5' },
        { label: 'Top 10', value: '10' },
        { label: 'Todos', value: 'ALL' },
    ];

    // ── Renderizadores ───────────────────────────────────────────────────────

    const renderTreemap = () => (
        treemapData.length === 0 ? null : (
            <ResponsiveContainer width="100%" height={300}>
                <Treemap
                    data={treemapData}
                    dataKey="value"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    content={<CustomTreemapCell />}
                    isAnimationActive={true}
                    animationDuration={700}
                >
                    <Tooltip content={<TooltipTreemap />} />
                </Treemap>
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
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '2px', background: corPorPct(emissor.pct), flexShrink: 0 }} />
                                    {emissor.name}
                                </div>
                            </td>
                            <td style={tdStyle}>
                                <Badge variant="ghost" style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif' }}>
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
        <Card style={{ border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch
                    titulo="Exposição por Emissor"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                    mostrarSwitch={!isWide}
                />

                {/* ── Sub-header: ícone + segmented control ── */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '8px', color: '#EF4444' }}>
                            <ShieldAlert size={20} />
                        </div>
                        <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6, fontFamily: 'Montserrat, sans-serif' }}>
                            Concentração de Crédito
                        </Typography>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '4px',
                        background: 'rgba(0,0,0,0.05)',
                        padding: '4px',
                        borderRadius: '8px',
                    }}>
                        {opcoesVisualizacao.map(opt => (
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
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                        alignItems: 'start',
                    }}>
                        <div>{renderTreemap()}</div>
                        <div>{renderTabela()}</div>
                    </div>
                ) : (
                    modoTabela ? renderTabela() : renderTreemap()
                )}

                {dados && dados.some(d => d.pct > 15) && (
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
