export const fmt = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

export const fmtK = (v: number) => {
    if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(0)}K`;
    return fmt(v);
};

export const fmtDate = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString('pt-BR') : '-';

export const pct = (v: number, total: number) =>
    total > 0 ? (v / total) * 100 : 0;