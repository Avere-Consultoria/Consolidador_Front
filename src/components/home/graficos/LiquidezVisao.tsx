import { useMemo, useState } from 'react';
import { Card, CardContent } from 'avere-ui';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, LabelList,
} from 'recharts';
import { fmt } from '../../../utils/formatters';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

type LiquidezItem = { name: string; value: number; pct: number };

interface LiquidezVisaoProps {
    dados: LiquidezItem[];        // Geral (sem Prev e sem RV)
    dadosPrev?: LiquidezItem[];   // Previdência
    dadosRV?: LiquidezItem[];     // Renda Variável (FIIs, Ações, Crypto)
}

// ── Faixas (mantidas pra cor + tabela) ────────────────────────────────────────

const FAIXAS = [
    { id: 'imediata',    label: 'Imediata',         desc: 'D+0',             min: 0,   max: 0,        cor: '#10B981' },
    { id: 'curto',       label: 'Curto Prazo',      desc: 'D+1 até D+30',    min: 1,   max: 30,       cor: '#0083CB' },
    { id: 'medio',       label: 'Médio Prazo',      desc: 'D+31 até D+180',  min: 31,  max: 180,      cor: '#06B6D4' },
    { id: 'longo',       label: 'Longo Prazo',      desc: 'D+181 até D+720', min: 181, max: 720,      cor: '#F59E0B' },
    { id: 'muito_longo', label: 'Muito Longo',      desc: 'D+720+',          min: 721, max: Infinity, cor: '#EF4444' },
    { id: 'nao_class',   label: 'Não Classificada', desc: '—',               min: -1,  max: -1,       cor: '#D1D5DB' },
] as const;

function parseDias(name: string): number {
    if (name === 'Não Classificada') return -1;
    const match = name.match(/D\+(\d+)/);
    return match ? parseInt(match[1], 10) : -1;
}

// Labels compactos para o eixo X
const LABEL_CURTO: Record<string, string> = {
    imediata:    'Imediata',
    curto:       'Curto',
    medio:       'Médio',
    longo:       'Longo',
    muito_longo: 'Muito Longo',
    nao_class:   'N/C',
};

// ── Hook de agregação por faixas (usado na tabela) ────────────────────────────

function useFaixasAgregadas(dados: LiquidezItem[]) {
    const total = useMemo(() => dados.reduce((s, d) => s + d.value, 0), [dados]);
    return useMemo(() => {
        const acc: Record<string, number> = {};
        FAIXAS.forEach(f => { acc[f.id] = 0; });
        dados.forEach(d => {
            const dias = parseDias(d.name);
            if (dias === -1) { acc['nao_class'] += d.value; return; }
            const faixa = FAIXAS.find(f => f.min !== -1 && dias >= f.min && dias <= f.max);
            if (faixa) acc[faixa.id] += d.value;
        });
        return FAIXAS.map(f => ({
            ...f,
            value: acc[f.id],
            pct: total > 0 ? (acc[f.id] / total) * 100 : 0,
        })).filter(f => f.value > 0);
    }, [dados, total]);
}

// ── Tooltip customizado do bar chart ────────────────────────────────────────

function TooltipBarras({ active, payload }: any) {
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
            <div style={{ fontSize: '11px', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                {p.label}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: p.cor }}>
                {p.pct.toFixed(1)}%
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-secundaria)', opacity: 0.7, marginTop: '2px' }}>
                {fmt(p.value)}
            </div>
            <div style={{ fontSize: '10px', opacity: 0.4, marginTop: '4px' }}>
                {p.desc}
            </div>
        </div>
    );
}

// ── Bar Chart Vertical ──────────────────────────────────────────────────────

function BarChartLiquidez({ dados }: { dados: LiquidezItem[] }) {
    const faixasAgregadas = useFaixasAgregadas(dados);

    const chartData = useMemo(() =>
        faixasAgregadas.map(f => ({
            id:    f.id,
            label: LABEL_CURTO[f.id] ?? f.label,
            desc:  f.desc,
            pct:   f.pct,
            value: f.value,
            cor:   f.cor,
        })),
    [faixasAgregadas]);

    // Tick customizado de duas linhas (rótulo + prazo)
    const CustomTick = ({ x, y, payload }: any) => {
        const item = chartData.find(d => d.label === payload.value);
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={14} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--color-secundaria)" opacity={0.75} fontFamily="Montserrat, sans-serif">
                    {payload.value}
                </text>
                {item?.desc && item.desc !== '—' && (
                    <text x={0} y={28} textAnchor="middle" fontSize="9" fill="var(--color-secundaria)" opacity={0.4} fontFamily="Montserrat, sans-serif">
                        {item.desc}
                    </text>
                )}
            </g>
        );
    };

    if (chartData.length === 0) {
        return (
            <div style={{ padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '13px' }}>
                Sem dados de liquidez.
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 24, right: 12, left: -8, bottom: 18 }} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis
                    dataKey="label"
                    tick={<CustomTick />}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    height={48}
                />
                <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 11, fill: 'var(--color-secundaria)', opacity: 0.45, fontFamily: 'Montserrat, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                    width={42}
                />
                <Tooltip content={<TooltipBarras />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="pct" radius={[6, 6, 0, 0]} animationDuration={700}>
                    {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.cor} />
                    ))}
                    <LabelList
                        dataKey="pct"
                        position="top"
                        formatter={(v: any) => `${Number(v).toFixed(1)}%`}
                        style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            fontFamily: 'Montserrat, sans-serif',
                            fill: 'var(--color-secundaria)',
                        }}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

// ── Tabela (extraída do componente original) ────────────────────────────────

function TabelaFaixas({ dados }: { dados: LiquidezItem[] }) {
    const faixasAgregadas = useFaixasAgregadas(dados);
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'Montserrat, sans-serif' }}>
            <thead>
                <tr>
                    <th style={{ textAlign: 'left', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' }}>Faixa</th>
                    <th style={{ textAlign: 'left', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' }}>Prazo</th>
                    <th style={{ textAlign: 'right', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' }}>Valor</th>
                    <th style={{ textAlign: 'right', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' }}>%</th>
                </tr>
            </thead>
            <tbody>
                {faixasAgregadas.map(f => (
                    <tr key={f.id}>
                        <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontWeight: 600, color: 'var(--color-secundaria)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.cor, flexShrink: 0 }} />
                                {f.label}
                            </div>
                        </td>
                        <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: '11px', opacity: 0.45 }}>{f.desc}</td>
                        <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', textAlign: 'right', fontWeight: 700, color: 'var(--color-secundaria)' }}>{fmt(f.value)}</td>
                        <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', textAlign: 'right', fontWeight: 800, color: f.cor }}>{f.pct.toFixed(1)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// ── Bloco individual ─────────────────────────────────────────────────────────

function LiquidezBloco({ titulo, dados }: { titulo: string; dados: LiquidezItem[] }) {
    const isWide = useMediaQuery('(min-width: 1280px)');
    const [modoTabela, setModoTabela] = useState(false);

    if (!dados || dados.length === 0) return null;

    return (
        <Card>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch
                    titulo={titulo}
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                    mostrarSwitch={!isWide}
                />

                {isWide ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                        alignItems: 'start',
                    }}>
                        <div><BarChartLiquidez dados={dados} /></div>
                        <div><TabelaFaixas dados={dados} /></div>
                    </div>
                ) : (
                    modoTabela
                        ? <TabelaFaixas dados={dados} />
                        : <BarChartLiquidez dados={dados} />
                )}

            </CardContent>
        </Card>
    );
}

// ── Componente principal ──────────────────────────────────────────────────────

export function LiquidezVisao({ dados, dadosPrev, dadosRV }: LiquidezVisaoProps) {
    const temGeral = dados && dados.length > 0;
    const temPrev  = dadosPrev && dadosPrev.length > 0;
    const temRV    = dadosRV && dadosRV.length > 0;

    if (!temGeral && !temPrev && !temRV) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {temGeral && <LiquidezBloco titulo="Perfil de Liquidez"          dados={dados} />}
            {temPrev  && <LiquidezBloco titulo="Liquidez — Previdência"      dados={dadosPrev!} />}
            {temRV    && <LiquidezBloco titulo="Liquidez — Renda Variável"   dados={dadosRV!} />}
        </div>
    );
}
