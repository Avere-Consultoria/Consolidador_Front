import { useMemo, useState } from 'react';
import { Card, CardContent } from 'avere-ui';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import { fmt } from '../../../utils/formatters';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useFaixas, type Faixa } from '../../../hooks/useFaixas';

type LiquidezItem = { name: string; value: number; pct: number };

interface LiquidezVisaoProps {
    dados: LiquidezItem[];
    dadosPrev?: LiquidezItem[];
    dadosRV?: LiquidezItem[];
}

// Faixas default (fallback se a tabela faixas_temporais estiver vazia)
const FAIXAS_LIQUIDEZ_DEFAULT: Faixa[] = [
    { label: 'D+0',        min: 0,   max: 0,        cor: '#10B981' },
    { label: 'D+1–30',     min: 1,   max: 30,       cor: '#0083CB' },
    { label: 'D+31–180',   min: 31,  max: 180,      cor: '#06B6D4' },
    { label: 'D+181–720',  min: 181, max: 720,      cor: '#F59E0B' },
    { label: 'D+720+',     min: 721, max: Infinity, cor: '#EF4444' },
];
const COR_NAO_CLASS = '#D1D5DB';

function parseDias(name: string): number {
    if (name === 'Não Classificada') return -1;
    const match = name.match(/D\+(\d+)/);
    return match ? parseInt(match[1], 10) : -1;
}

type FaixaAgregada = { label: string; cor: string; value: number; pct: number };

function agregarPorFaixas(dados: LiquidezItem[], faixas: Faixa[]): FaixaAgregada[] {
    const total = dados.reduce((s, d) => s + d.value, 0);
    const acc = faixas.map(() => 0);
    let naoClass = 0;
    dados.forEach(d => {
        const dias = parseDias(d.name);
        if (dias === -1) { naoClass += d.value; return; }
        const idx = faixas.findIndex(f => dias >= f.min && dias <= f.max);
        if (idx >= 0) acc[idx] += d.value;
    });
    const out: FaixaAgregada[] = faixas.map((f, i) => ({
        label: f.label, cor: f.cor, value: acc[i],
        pct: total > 0 ? (acc[i] / total) * 100 : 0,
    })).filter(f => f.value > 0);
    if (naoClass > 0) {
        out.push({ label: 'Não Classificada', cor: COR_NAO_CLASS, value: naoClass, pct: total > 0 ? (naoClass / total) * 100 : 0 });
    }
    return out;
}

function TooltipBarras({ active, payload }: any) {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0].payload;
    return (
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontFamily: 'Montserrat, sans-serif' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-secundaria)', marginBottom: '4px' }}>{p.label}</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: p.cor }}>{p.pct.toFixed(1)}%</div>
            <div style={{ fontSize: '12px', color: 'var(--color-secundaria)', opacity: 0.7, marginTop: '2px' }}>{fmt(p.value)}</div>
        </div>
    );
}

function BarChartLiquidez({ dados, faixas }: { dados: LiquidezItem[]; faixas: Faixa[] }) {
    const chartData = useMemo(() => agregarPorFaixas(dados, faixas), [dados, faixas]);

    if (chartData.length === 0) {
        return <div style={{ padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '13px' }}>Sem dados de liquidez.</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 24, right: 12, left: -8, bottom: 8 }} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--color-secundaria)', opacity: 0.75, fontFamily: 'Montserrat, sans-serif' }}
                    axisLine={false} tickLine={false} interval={0} height={28}
                />
                <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 11, fill: 'var(--color-secundaria)', opacity: 0.45, fontFamily: 'Montserrat, sans-serif' }}
                    axisLine={false} tickLine={false} width={42}
                />
                <Tooltip content={<TooltipBarras />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="pct" radius={[6, 6, 0, 0]} animationDuration={700}>
                    {chartData.map((entry, i) => <Cell key={i} fill={entry.cor} />)}
                    <LabelList dataKey="pct" position="top" formatter={(v: any) => `${Number(v).toFixed(1)}%`}
                        style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fill: 'var(--color-secundaria)' }} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

const thStyle: React.CSSProperties = {
    textAlign: 'left', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4,
    textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em',
};
function TabelaFaixas({ dados, faixas }: { dados: LiquidezItem[]; faixas: Faixa[] }) {
    const agregadas = useMemo(() => agregarPorFaixas(dados, faixas), [dados, faixas]);
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'Montserrat, sans-serif' }}>
            <thead>
                <tr>
                    <th style={thStyle}>Prazo</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Valor</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>%</th>
                </tr>
            </thead>
            <tbody>
                {agregadas.map((f, i) => (
                    <tr key={i}>
                        <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontWeight: 600, color: 'var(--color-secundaria)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.cor, flexShrink: 0 }} />
                                {f.label}
                            </div>
                        </td>
                        <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', textAlign: 'right', fontWeight: 700, color: 'var(--color-secundaria)' }}>{fmt(f.value)}</td>
                        <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', textAlign: 'right', fontWeight: 800, color: f.cor }}>{f.pct.toFixed(1)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function LiquidezBloco({ titulo, dados, faixas }: { titulo: string; dados: LiquidezItem[]; faixas: Faixa[] }) {
    const isWide = useMediaQuery('(min-width: 1280px)');
    const [modoTabela, setModoTabela] = useState(false);

    if (!dados || dados.length === 0) return null;

    return (
        <Card>
            <CardContent style={{ padding: '24px' }}>
                <CardHeaderComSwitch titulo={titulo} modoTabela={modoTabela} setModoTabela={setModoTabela} mostrarSwitch={!isWide} />
                {isWide ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
                        <div><BarChartLiquidez dados={dados} faixas={faixas} /></div>
                        <div><TabelaFaixas dados={dados} faixas={faixas} /></div>
                    </div>
                ) : (
                    modoTabela ? <TabelaFaixas dados={dados} faixas={faixas} /> : <BarChartLiquidez dados={dados} faixas={faixas} />
                )}
            </CardContent>
        </Card>
    );
}

export function LiquidezVisao({ dados, dadosPrev, dadosRV }: LiquidezVisaoProps) {
    const faixas = useFaixas('LIQUIDEZ', FAIXAS_LIQUIDEZ_DEFAULT);
    const temGeral = dados && dados.length > 0;
    const temPrev  = dadosPrev && dadosPrev.length > 0;
    const temRV    = dadosRV && dadosRV.length > 0;

    if (!temGeral && !temPrev && !temRV) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {temGeral && <LiquidezBloco titulo="Perfil de Liquidez"        dados={dados}      faixas={faixas} />}
            {temPrev  && <LiquidezBloco titulo="Liquidez — Previdência"    dados={dadosPrev!} faixas={faixas} />}
            {temRV    && <LiquidezBloco titulo="Liquidez — Renda Variável" dados={dadosRV!}   faixas={faixas} />}
        </div>
    );
}
