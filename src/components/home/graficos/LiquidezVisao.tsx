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
    patrimonioTotal: number;
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

// `denominador` (ex.: patrimônio total): quando informado, o % é calculado sobre ele —
// assim os 3 gráficos de liquidez ficam normalizados pelo TODO da carteira (somam 100%
// entre si), em vez de cada um fechar 100% isolado.
function agregarPorFaixas(dados: LiquidezItem[], faixas: Faixa[], denominador?: number): FaixaAgregada[] {
    const totalGrupo = dados.reduce((s, d) => s + d.value, 0);
    const base = (denominador && denominador > 0) ? denominador : totalGrupo;
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
        pct: base > 0 ? (acc[i] / base) * 100 : 0,
    })).filter(f => f.value > 0);
    if (naoClass > 0) {
        out.push({ label: 'Não Classificada', cor: COR_NAO_CLASS, value: naoClass, pct: base > 0 ? (naoClass / base) * 100 : 0 });
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

function BarChartLiquidez({ dados, faixas, total }: { dados: LiquidezItem[]; faixas: Faixa[]; total: number }) {
    const chartData = useMemo(() => agregarPorFaixas(dados, faixas, total), [dados, faixas, total]);

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
                <Bar dataKey="pct" radius={[6, 6, 0, 0]} isAnimationActive={false}>
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
function TabelaFaixas({ dados, faixas, total }: { dados: LiquidezItem[]; faixas: Faixa[]; total: number }) {
    const agregadas = useMemo(() => agregarPorFaixas(dados, faixas, total), [dados, faixas, total]);
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

function LiquidezBloco({ titulo, dados, faixas, total }: { titulo: string; dados: LiquidezItem[]; faixas: Faixa[]; total: number }) {
    const isWide = useMediaQuery('(min-width: 1280px)');
    const [modoTabela, setModoTabela] = useState(false);

    if (!dados || dados.length === 0) return null;

    return (
        <Card>
            <CardContent style={{ padding: '24px' }}>
                <CardHeaderComSwitch titulo={titulo} modoTabela={modoTabela} setModoTabela={setModoTabela} mostrarSwitch={!isWide} />
                {isWide ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
                        <div><BarChartLiquidez dados={dados} faixas={faixas} total={total} /></div>
                        <div><TabelaFaixas dados={dados} faixas={faixas} total={total} /></div>
                    </div>
                ) : (
                    modoTabela ? <TabelaFaixas dados={dados} faixas={faixas} total={total} /> : <BarChartLiquidez dados={dados} faixas={faixas} total={total} />
                )}
            </CardContent>
        </Card>
    );
}

// Versão COMPACTA p/ classes com poucas faixas (Previdência, Renda Variável):
// barra horizontal empilhada (100%) + legenda com % E valor (R$) por faixa.
function LiquidezCompacta({ titulo, dados, faixas, total }: { titulo: string; dados: LiquidezItem[]; faixas: Faixa[]; total: number }) {
    const agregadas = useMemo(() => agregarPorFaixas(dados, faixas, total), [dados, faixas, total]);
    if (!dados || dados.length === 0 || agregadas.length === 0) return null;
    return (
        <Card>
            <CardContent style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-secundaria)', marginBottom: '14px', fontFamily: 'Montserrat, sans-serif' }}>{titulo}</div>
                <div style={{ display: 'flex', height: 16, borderRadius: 8, overflow: 'hidden', background: 'rgba(0,0,0,0.04)' }}>
                    {agregadas.map((f, i) => (
                        <div key={i} title={`${f.label} · ${f.pct.toFixed(1)}% · ${fmt(f.value)}`} style={{ width: `${f.pct}%`, background: f.cor }} />
                    ))}
                </div>
                {/* Mesma tabela do "Liquidez — Geral" (Prazo · Valor · %), já normalizada pelo total. */}
                <div style={{ marginTop: 16 }}>
                    <TabelaFaixas dados={dados} faixas={faixas} total={total} />
                </div>
            </CardContent>
        </Card>
    );
}

export function LiquidezVisao({ dados, dadosPrev, dadosRV, patrimonioTotal }: LiquidezVisaoProps) {
    const faixas = useFaixas('LIQUIDEZ', FAIXAS_LIQUIDEZ_DEFAULT);
    const temGeral = dados && dados.length > 0;
    const temPrev  = dadosPrev && dadosPrev.length > 0;
    const temRV    = dadosRV && dadosRV.length > 0;

    if (!temGeral && !temPrev && !temRV) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Geral: mantém o gráfico completo (várias faixas). */}
            {temGeral && <LiquidezBloco titulo="Liquidez — Geral" dados={dados} faixas={faixas} total={patrimonioTotal} />}
            {/* Previdência / Renda Variável: compactos lado a lado (poucas faixas). */}
            {(temPrev || temRV) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {temPrev && <LiquidezCompacta titulo="Liquidez — Previdência"    dados={dadosPrev!} faixas={faixas} total={patrimonioTotal} />}
                    {temRV   && <LiquidezCompacta titulo="Liquidez — Renda Variável" dados={dadosRV!}   faixas={faixas} total={patrimonioTotal} />}
                </div>
            )}
        </div>
    );
}
