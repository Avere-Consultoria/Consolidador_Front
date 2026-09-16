// ─────────────────────────────────────────────────────────────────────────────
// Rótulo do ATIVO na tela (tabela e drawer).
//
// Três conceitos que a string da corretora traz colados: o papel (ativo), quem
// paga (emissor, entidade do dicionário) e o vencimento. A regra só decide COMO
// MOSTRAR — o nome cru fica intocado (tooltip, drawer, chave do casamento).
//
// Precedência: apelido do consultor → nome derivado → nome cru.
// Derivado (só renda fixa com prefixo/sufixo): "CDB BMG - NOV/2026" → "BMG";
// tipo e vencimento já têm coluna própria. Fundos, ações, FII, COE: cru.
// ─────────────────────────────────────────────────────────────────────────────

export interface AtivoRotulavel {
    nome: string;                 // o que o hook já resolveu (apelido || cru)
    nomeCru?: string | null;      // string da corretora, sem tratamento
    apelido?: string | null;      // personalização do consultor
    subTipo?: string | null;
}

const RF_COM_PREFIXO = ['CDB', 'LCI', 'LCA', 'LF', 'LCD', 'CRI', 'CRA', 'DEB', 'CDCA', 'LIG', 'DPGE', 'NTNB', 'NTNF', 'LTN', 'LFT'];
const SUFIXO_DATA = /\s*-\s*[A-Z]{3}\/\d{4}\s*$/;

/** Nome derivado da string crua: tira o prefixo de tipo e o sufixo " - MÊS/ANO". */
export function nomeDerivado(cru: string | null | undefined, subTipo: string | null | undefined): string | null {
    if (!cru) return null;
    const st = (subTipo ?? '').toUpperCase().trim();
    if (!RF_COM_PREFIXO.includes(st)) return null;
    let s = cru.trim().replace(SUFIXO_DATA, '');
    const prefixo = new RegExp(`^(?:${st}|DEB[EÊ]NTURES?|NTN-?B|NTN-?F)\\s+`, 'i');
    s = s.replace(prefixo, '').trim();
    if (!s || s.toUpperCase() === st) return null;          // "CDB" genérico do BTG: não há o que derivar
    return s === cru.trim() ? null : s;
}

/** Rótulo exibido do ativo. */
export function rotuloAtivo(a: AtivoRotulavel): string {
    if (a.apelido && a.apelido.trim()) return a.apelido.trim();
    const cru = a.nomeCru ?? a.nome;
    return nomeDerivado(cru, a.subTipo) ?? a.nome ?? '—';
}
