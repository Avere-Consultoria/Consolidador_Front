// ─────────────────────────────────────────────────────────────────────────────
// Paleta categórica oficial de dataviz (19/ago/2026).
// Gerada em OKLCH ancorada na marca e validada por script (banda de
// luminosidade, piso de croma, separação CVD, piso de visão normal) — a MESMA
// paleta semeada em dicionario_classes.cor_hex / setores.cor_hex.
// Rollback do banco: docs/rollback-cores-2026-08-19.sql
//
// Regras (ficha dataviz):
// - ordem FIXA — nunca "girar" a paleta nem gerar matiz novo p/ 17ª categoria;
// - vermelho-erro (#DC…/#EF…) e verde-sucesso puros NÃO entram em categórica;
// - cores de STATUS (ganho/perda/alerta) vêm dos tokens semânticos, nunca daqui.
// ─────────────────────────────────────────────────────────────────────────────

/** Ordem = ordem_exibicao das classes (famílias: RF azuis → Internacional índigos). */
export const PALETA_CATEGORICA = [
    '#0A5C8E', '#1E96D9', '#2EC6D8', '#6D4FC4', '#0E9987', '#C98A12',
    '#2F6BB0', '#C973AC', '#3547AD', '#6472DB', '#97A4F2', '#8A63D6',
    '#D9A428', '#A87422', '#6F9FE0', '#8A3D6B',
] as const;

/** Subconjunto espaçado para LINHAS (séries temporais): máximo contraste mútuo. */
export const PALETA_LINHAS = [
    '#0A5C8E', '#C98A12', '#0E9987', '#6D4FC4', '#C2477F', '#B65C33',
] as const;
