export const fmt = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

export const fmtUsd = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

export const fmtK = (v: number) => {
    if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(0)}K`;
    return fmt(v);
};

export const fmtDate = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString('pt-BR') : '-';

export const fmtNum = (v?: number | null, decimais = 2) =>
    v != null
        ? v.toLocaleString('pt-BR', { minimumFractionDigits: decimais, maximumFractionDigits: decimais })
        : '-';

export const pct = (v: number, total: number) =>
    total > 0 ? (v / total) * 100 : 0;

// ── Taxa (padrão bancário BR) ─────────────────────────────────────────────────
// rentabilidade: string pré-formatado da API  ("100% IPCA", "110% CDI", "PRE", "CDI"…)
// benchmark:     índice isolado               ("IPCA", "CDI"…)
// yieldAvg:      spread/cupom numérico        (5.89, 11.28…)
//
// Regras:
//   "100% IPCA" + 5,89% cupom → "IPCA + 5,89% a.a."     (100% é implícito, omite)
//   "110% CDI"  + 2% cupom   → "110% CDI + 2,00% a.a."  (≠100% é relevante, mantém)
//   "110% CDI"  + sem cupom  → "110% CDI"
//   "PRE"       + 11,28%     → "11,28% a.a."
//   "CDI"       + 2%         → "CDI + 2,00% a.a."
//   "IPCA +5,36% a.a."       → "IPCA +5,36% a.a."        (já formatado, usa direto)
export function formatarTaxa(
    rentabilidade: string | null | undefined,
    benchmark:     string | null | undefined,
    yieldAvg:      string | number | null | undefined,
): string | null {
    const ya = (yieldAvg !== null && yieldAvg !== undefined && yieldAvg !== '')
        ? parseFloat(String(yieldAvg)) : null;
    const cupom = (ya !== null && !isNaN(ya) && ya > 0)
        ? `${ya.toFixed(2).replace('.', ',')}% a.a.` : null;
    const rent = rentabilidade?.trim() || null;

    if (rent) {
        // "X% BENCHMARK" (ex: "100% IPCA", "110% CDI")
        const m = rent.match(/^(\d+(?:[.,]\d+)?)\s*%\s*(.+)$/);
        if (m) {
            const pct100   = parseFloat(m[1].replace(',', '.'));
            const indexNm  = m[2].trim();
            if (Math.abs(pct100 - 100) < 0.01) {
                return cupom ? `${indexNm} + ${cupom}` : indexNm;
            }
            return cupom ? `${pct100}% ${indexNm} + ${cupom}` : `${pct100}% ${indexNm}`;
        }
        // Já formatado com "+" (ex: "IPCA +5,36% a.a.") — usa direto
        if (rent.includes('+')) return rent;
        // "PRE" — exibe apenas o cupom como taxa prefixada
        if (rent === 'PRE' || !benchmark) return cupom ?? null;
        // Benchmark puro sem percentual (ex: "CDI", "IPCA")
        return cupom ? `${rent} + ${cupom}` : rent;
    }

    // Sem rentabilidade — monta do zero
    const bm = benchmark?.trim() || null;
    if (bm && cupom) return `${bm} + ${cupom}`;
    if (!bm && cupom) return cupom;
    return bm ?? null;
}