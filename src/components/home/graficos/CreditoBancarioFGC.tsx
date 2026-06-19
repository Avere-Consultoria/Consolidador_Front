import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Badge, Button } from 'avere-ui';
import { Landmark, AlertTriangle, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt } from '../../../utils/formatters';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface CreditoBancarioItem {
    name: string;
    porte: string | null;
    value: number;
    pct: number;
    semConglomerado: boolean;
    detalhes?: { nome: string; valor: number }[];
}

interface Props {
    dados: CreditoBancarioItem[];
}

// Teto de garantia FGC por CPF por conglomerado
const TETO_FGC = 250_000;

const PORTE_INFO: Record<string, { cor: string; desc: string }> = {
    S1: { cor: '#15803D', desc: 'Sistêmico' },
    S2: { cor: '#22C55E', desc: 'Grande' },
    S3: { cor: '#0083CB', desc: 'Médio' },
    S4: { cor: '#F59E0B', desc: 'Pequeno' },
    S5: { cor: '#EF4444', desc: 'Micro/Fin.' },
};
const corPorte = (p: string | null) => (p && PORTE_INFO[p] ? PORTE_INFO[p].cor : '#9CA3AF');

const tableStyle: React.CSSProperties = {
    width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'Montserrat, sans-serif',
};
const thStyle: React.CSSProperties = {
    textAlign: 'left', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4,
    textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em',
};
const tdStyle: React.CSSProperties = {
    padding: '10px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontWeight: 500, color: 'var(--color-secundaria)',
};

function TooltipBar({ active, payload }: any) {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0].payload;
    const acima = p.value > TETO_FGC && !p.semConglomerado;
    return (
        <div style={{
            background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8,
            padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontFamily: 'Montserrat, sans-serif', maxWidth: 280,
        }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-secundaria)', marginBottom: 4 }}>{p.name}</div>
            {p.porte && (
                <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 4 }}>
                    Porte {p.porte} · {PORTE_INFO[p.porte]?.desc}
                </div>
            )}
            <div style={{ fontSize: 15, fontWeight: 800, color: corPorte(p.porte) }}>{fmt(p.value)}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{p.pct.toFixed(1)}% do patrimônio</div>
            {acima && (
                <div style={{ fontSize: 11, color: '#EF4444', marginTop: 6, fontWeight: 600 }}>
                    ⚠ Acima do teto FGC ({fmt(TETO_FGC)})
                </div>
            )}
        </div>
    );
}

export function CreditoBancarioFGC({ dados }: Props) {
    const isWide = useMediaQuery('(min-width: 1280px)');
    const [modoTabela, setModoTabela] = useState(false);
    const [viewMode, setViewMode] = useState<string>('10');

    const ordenados = useMemo(() => [...(dados || [])].sort((a, b) => b.value - a.value), [dados]);

    const dadosFiltrados = useMemo(() => {
        if (viewMode === '5') return ordenados.slice(0, 5);
        if (viewMode === '10') return ordenados.slice(0, 10);
        return ordenados;
    }, [ordenados, viewMode]);

    const acimaDoTeto = useMemo(
        () => ordenados.filter(d => !d.semConglomerado && d.value > TETO_FGC),
        [ordenados],
    );

    const opcoesVisualizacao = [
        { label: 'Top 5', value: '5' },
        { label: 'Top 10', value: '10' },
        { label: 'Todos', value: 'ALL' },
    ];

    // altura dinâmica: ~38px por barra
    const chartHeight = Math.max(200, dadosFiltrados.length * 38 + 40);

    const renderChart = () => (
        <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={dadosFiltrados} layout="vertical" margin={{ top: 26, right: 16, left: 8, bottom: 8 }}>
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
                <ReferenceLine x={TETO_FGC} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={1.5}
                    label={{ value: 'Teto FGC R$ 250k', position: 'top', fontSize: 9, fontWeight: 700, fill: '#EF4444' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={700}>
                    {dadosFiltrados.map((d, i) => (
                        <Cell key={i} fill={d.semConglomerado ? '#D1D5DB' : corPorte(d.porte)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );

    const renderTabela = () => (
        <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Conglomerado</th>
                        <th style={{ ...thStyle, textAlign: 'center' }}>
                            <span
                                title="Porte (segmentação do Banco Central, Res. CMN 4.553/2017): S1 = instituições sistêmicas (≥10% do PIB) … S5 = menores/financeiras. Quanto menor o número do S, maior e mais sólida a instituição."
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 3, cursor: 'help' }}
                            >
                                Porte <Info size={11} style={{ opacity: 0.5 }} />
                            </span>
                        </th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Exposição</th>
                        <th style={{ ...thStyle, textAlign: 'center' }}>FGC</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosFiltrados.map((d, i) => {
                        const acima = !d.semConglomerado && d.value > TETO_FGC;
                        return (
                            <tr key={i}>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: 2, background: d.semConglomerado ? '#D1D5DB' : corPorte(d.porte), flexShrink: 0 }} />
                                        {d.name}
                                    </div>
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'center' }}>
                                    {d.porte
                                        ? <span style={{ fontWeight: 800, fontSize: 11, color: corPorte(d.porte) }}>{d.porte}</span>
                                        : <span style={{ opacity: 0.3 }}>—</span>}
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>{fmt(d.value)}</td>
                                <td style={{ ...tdStyle, textAlign: 'center' }}>
                                    {d.semConglomerado
                                        ? <Badge variant="ghost" style={{ fontSize: 9 }}>n/d</Badge>
                                        : acima
                                            ? <Badge variant="ghost" style={{ fontSize: 9, background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>acima</Badge>
                                            : <Badge variant="ghost" style={{ fontSize: 9, background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>coberto</Badge>}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    return (
        <Card style={{ border: '1px solid rgba(16,185,129,0.2)' }}>
            <CardContent style={{ padding: '24px' }}>
                <CardHeaderComSwitch
                    titulo="Crédito Bancário (FGC)"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                    mostrarSwitch={!isWide}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 4, background: 'rgba(0,0,0,0.05)', padding: 4, borderRadius: 8 }}>
                        {opcoesVisualizacao.map(opt => (
                            <Button
                                key={opt.value}
                                variant={viewMode === opt.value ? 'solid' : 'ghost'}
                                onClick={() => setViewMode(opt.value)}
                                style={{
                                    height: 28, padding: '0 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
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

                {/* Aviso da escala de porte (BCB) */}
                <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 16,
                    padding: '8px 12px', background: 'rgba(0,131,203,0.05)', borderRadius: 8,
                    border: '1px solid rgba(0,131,203,0.12)',
                }}>
                    <Info size={14} color="#0083CB" style={{ flexShrink: 0, marginTop: 1 }} />
                    <Typography variant="p" style={{ fontSize: 11, color: '#475569', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.4, margin: 0 }}>
                        <strong>Porte (BCB):</strong> escala de <strong>S1</strong> (maiores/sistêmicas) a <strong>S5</strong> (menores/financeiras) — segmentação do Banco Central por tamanho da instituição.
                    </Typography>
                </div>

                {(!dados || dados.length === 0) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: 12, opacity: 0.4 }}>
                        <Landmark size={32} />
                        <Typography variant="p" style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>
                            Nenhum ativo bancário (FGC)
                        </Typography>
                        <Typography variant="p" style={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif', textAlign: 'center', lineHeight: 1.5 }}>
                            CDB, LCI, LCA, LF e afins aparecem aqui, agrupados pelo conglomerado do emissor.
                        </Typography>
                    </div>
                ) : isWide ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
                        <div>{renderChart()}</div>
                        <div>{renderTabela()}</div>
                    </div>
                ) : (
                    modoTabela ? renderTabela() : renderChart()
                )}

                {acimaDoTeto.length > 0 && (
                    <div style={{ marginTop: 20, padding: 12, background: 'rgba(239,68,68,0.08)', borderRadius: 8, display: 'flex', gap: 8, color: '#B91C1C', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                        <Typography variant="p" style={{ fontSize: 12, lineHeight: 1.4, fontFamily: 'Montserrat, sans-serif' }}>
                            <strong>{acimaDoTeto.length} conglomerado{acimaDoTeto.length > 1 ? 's' : ''} acima do teto FGC.</strong>{' '}
                            O valor que excede {fmt(TETO_FGC)} por CPF não tem cobertura da garantia: {acimaDoTeto.map(c => c.name).join(', ')}.
                        </Typography>
                    </div>
                )}

                {(() => {
                    const sem = ordenados.find(d => d.semConglomerado);
                    if (!sem || !sem.detalhes || sem.detalhes.length === 0) return null;
                    return (
                        <div style={{ marginTop: 16, padding: 12, background: 'rgba(0,0,0,0.02)', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
                            <Typography variant="p" style={{ fontSize: 11, fontWeight: 700, opacity: 0.6, fontFamily: 'Montserrat, sans-serif', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Sem conglomerado FGC — emissores não reconhecidos
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
                                Esses nomes (emissor bruto que a corretora envia) não casaram com a lista do FGC. Pode ser grafia divergente — me envie a lista para calibrar o match.
                            </Typography>
                        </div>
                    );
                })()}
            </CardContent>
        </Card>
    );
}
