// ─────────────────────────────────────────────────────────────────────────────
// Agregação por faixas — FONTE ÚNICA usada pela Home (LiquidezVisao /
// VencimentosVisao) E pelo Relatório/PDF. Mantém os dois sempre com o MESMO
// cálculo. A Home é a referência: qualquer ajuste de regra entra aqui.
// ─────────────────────────────────────────────────────────────────────────────
import { type Faixa } from '../hooks/useFaixas';
import { diasAteVencimento } from './formatters';

export type LiquidezItem = { name: string; value: number; pct: number };
export type FaixaAgregada = { label: string; cor: string; value: number; pct: number };

export const COR_NAO_CLASS = '#D1D5DB';

// Faixas default (fallback quando faixas_temporais está vazia). Espelham os
// componentes da Home — passe os mesmos defaults ao useFaixas nos dois lados.
export const FAIXAS_LIQUIDEZ_DEFAULT: Faixa[] = [
    { label: 'D+0',        min: 0,   max: 0,        cor: '#10B981' },
    { label: 'D+1–30',     min: 1,   max: 30,       cor: '#0083CB' },
    { label: 'D+31–180',   min: 31,  max: 180,      cor: '#06B6D4' },
    { label: 'D+181–720',  min: 181, max: 720,      cor: '#F59E0B' },
    { label: 'D+720+',     min: 721, max: Infinity, cor: '#EF4444' },
];

export const FAIXAS_VENC_DEFAULT: Faixa[] = [
    { label: 'Até 30 dias',       min: 0,   max: 30,       cor: '#10B981' },
    { label: '31 a 90 dias',      min: 31,  max: 90,       cor: '#0083CB' },
    { label: '91 a 180 dias',     min: 91,  max: 180,      cor: '#06B6D4' },
    { label: '181 a 365 dias',    min: 181, max: 365,      cor: '#F59E0B' },
    { label: 'Acima de 365 dias', min: 366, max: Infinity, cor: '#EF4444' },
];

// Extrai o D+ do nome do item de liquidez ("D+30" → 30). -1 = não classificada.
export function parseDias(name: string): number {
    if (name === 'Não Classificada') return -1;
    const match = name.match(/D\+(\d+)/);
    return match ? parseInt(match[1], 10) : -1;
}

// Liquidez: agrupa os itens (D+N) por faixa. `denominador` (ex.: patrimônio total):
// quando informado, o % é sobre ele — normaliza os 3 gráficos pelo TODO da carteira
// (somam 100% entre si) em vez de cada um fechar 100% isolado.
export function agregarLiquidez(dados: LiquidezItem[], faixas: Faixa[], denominador?: number): FaixaAgregada[] {
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

// Vencimentos: agrupa ativos (com .vencimento/.data_vencimento + .valorBruto) por
// faixa de prazo, usando diasAteVencimento (timezone-safe — sem o bug de fuso do
// new Date()). Já vencido (dias < 0) fica de fora. % sobre o denominador (patrimônio).
export function agregarVencimentos(ativos: any[], faixas: Faixa[], denominador: number): FaixaAgregada[] {
    const acc = faixas.map(() => 0);
    (ativos || []).forEach(a => {
        const dias = diasAteVencimento(a?.vencimento || a?.data_vencimento);
        if (dias == null || dias < 0) return;
        const idx = faixas.findIndex(f => dias >= f.min && dias <= f.max);
        if (idx >= 0) acc[idx] += (a.valorBruto || 0);
    });
    return faixas.map((f, i) => ({
        label: f.label, cor: f.cor, value: acc[i],
        pct: denominador > 0 ? (acc[i] / denominador) * 100 : 0,
    })).filter(f => f.value > 0);
}
