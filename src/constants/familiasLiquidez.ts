// ─────────────────────────────────────────────────────────────────────────────
// Famílias de produto com liquidez configurável (telas Liquidez/Subtipo).
//
// Lista FECHADA e curada — a tela não deriva mais os subtipos dinamicamente do
// que as APIs mandam (isso poluía a tela com 144 tickers de ações/FIIs e lixo
// de normalização). Ticker é identidade do papel, não família; RV/caixa têm
// liquidez por regra automática (D+2 bolsa, D+0 caixa) e ficam fora daqui.
//
// Se uma família nova surgir de verdade, adiciona-se AQUI (decisão consciente),
// não pela API.
// ─────────────────────────────────────────────────────────────────────────────

export const FAMILIAS_LIQUIDEZ: { grupo: string; familias: string[] }[] = [
    { grupo: 'Bancário (FGC)',     familias: ['CDB', 'LCI', 'LCA', 'LF', 'LFSN', 'LIG', 'LC', 'LCD', 'RDB', 'DPGE'] },
    { grupo: 'Crédito privado',    familias: ['DEB', 'CRA', 'CRI', 'CDCA', 'FIDC', 'NC', 'NP', 'CCB', 'CCI'] },
    { grupo: 'Tesouro Direto',     familias: ['LFT', 'LTN', 'NTNB', 'NTNF', 'NTNC'] },
    { grupo: 'Outros',             familias: ['FUNDO', 'COE', 'PREV', 'COMPROMISSADA'] },
];

export const FAMILIAS_LIQUIDEZ_FLAT: string[] =
    FAMILIAS_LIQUIDEZ.flatMap(g => g.familias);
