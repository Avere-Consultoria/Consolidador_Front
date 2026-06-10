import { useState, useMemo } from 'react';
import { Card, CardContent, Typography } from 'avere-ui';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Layers } from 'lucide-react';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt } from '../../../utils/formatters';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface DistribuicaoSetorialProps {
    dados: { setor: string; valor: number; pct: number; cor?: string | null }[];
}

// Paleta fallback — usada só quando o setor não tem cor cadastrada na Gestão Master
const PALETA_SETORES = [
    '#0083CB', '#00B4D8', '#8B5CF6', '#EC4899', '#F59E0B',
    '#10B981', '#EF4444', '#F97316', '#6366F1', '#84CC16',
    '#06B6D4', '#A855F7',
];

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

// ── Tooltip customizado ──────────────────────────────────────────────────────
function TooltipDonut({ active, payload }: any) {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0].payload;
    return (
        <div style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontFamily: 'Montserrat, sans-serif',
        }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-secundaria)', marginBottom: '4px' }}>
                {p.setor}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: p.fill }}>
                {p.pct.toFixed(1)}%
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-secundaria)', opacity: 0.7, marginTop: '2px' }}>
                {fmt(p.valor)}
            </div>
        </div>
    );
}

export function DistribuicaoSetorial({ dados }: DistribuicaoSetorialProps) {
    const isWide = useMediaQuery('(min-width: 1280px)');
    const [modoTabela, setModoTabela] = useState(false);

    const dataComCor = useMemo(() =>
        (dados || []).map((d, i) => ({
            ...d,
            // Cor cadastrada na Gestão Master tem prioridade; paleta é só fallback
            fill:  d.cor ?? PALETA_SETORES[i % PALETA_SETORES.length],
            value: d.valor,   // recharts usa "value" no Pie
        }))
    , [dados]);

    // ── Renderizadores ───────────────────────────────────────────────────────

    const renderDonut = () => (
        <ResponsiveContainer width="100%" height={280}>
            <PieChart>
                <Pie
                    data={dataComCor}
                    cx="50%" cy="50%"
                    innerRadius={70} outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={800}
                >
                    {dataComCor.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} stroke="none" />
                    ))}
                </Pie>
                <Tooltip content={<TooltipDonut />} />
                <Legend
                    iconType="circle"
                    iconSize={10}
                    formatter={(_value, entry: any) => (
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-secundaria)', fontFamily: 'Montserrat, sans-serif' }}>
                            {entry.payload.setor} — {entry.payload.pct.toFixed(1)}%
                        </span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    );

    const renderTabela = () => (
        <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Setor</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Valor</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>%</th>
                    </tr>
                </thead>
                <tbody>
                    {dataComCor.map((s, i) => (
                        <tr key={i}>
                            <td style={tdStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.fill, flexShrink: 0 }} />
                                    {s.setor}
                                </div>
                            </td>
                            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>{fmt(s.valor)}</td>
                            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 800, color: s.fill }}>{s.pct.toFixed(1)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <Card style={{ border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', background: '#fff' }}>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch
                    titulo="Distribuição Setorial"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                    mostrarSwitch={!isWide}
                />

                {/* Sub-header: ícone + descrição */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                }}>
                    <div style={{ background: 'rgba(0, 131, 203, 0.1)', padding: '8px', borderRadius: '8px', color: '#0083CB' }}>
                        <Layers size={20} />
                    </div>
                    <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6, fontFamily: 'Montserrat, sans-serif' }}>
                        Diversificação por setor dos emissores
                    </Typography>
                </div>

                {(!dados || dados.length === 0) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: '12px', opacity: 0.4 }}>
                        <Layers size={32} />
                        <Typography variant="p" style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>
                            Nenhum setor classificado
                        </Typography>
                        <Typography variant="p" style={{ fontSize: '11px', fontFamily: 'Montserrat, sans-serif', textAlign: 'center', lineHeight: '1.5' }}>
                            Preencha o setor dos emissores em Gestão Master para visualizar a distribuição.
                        </Typography>
                    </div>
                ) : isWide ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                        alignItems: 'center',
                    }}>
                        <div>{renderDonut()}</div>
                        <div>{renderTabela()}</div>
                    </div>
                ) : (
                    modoTabela ? renderTabela() : renderDonut()
                )}

            </CardContent>
        </Card>
    );
}
