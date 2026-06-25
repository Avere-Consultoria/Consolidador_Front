// ─────────────────────────────────────────────────────────────────────────────
// Schema da biblioteca de ativos — campos curáveis por subtipo (vão no jsonb
// `detalhes` de biblioteca_ativos). É o que dirige o editor do Master: adicionar
// um subtipo = adicionar uma entrada aqui (sem mexer na tela).
// Derivado dos specs em docs/biblioteca-ativos/*.md.
// ─────────────────────────────────────────────────────────────────────────────

export type TipoCampo = 'text' | 'number' | 'select' | 'boolean';

export interface CampoDetalhe {
    key: string;          // chave dentro de detalhes jsonb
    label: string;
    tipo: TipoCampo;
    opcoes?: string[];    // p/ select
}

// Obs.: indexador, % do indexador e spread NÃO ficam aqui — são o "construtor da taxa"
// no drawer (campos próprios que derivam a Taxa). Aqui só os demais detalhes.
const RF: CampoDetalhe[] = [
    { key: 'tipo_ativo',           label: 'Tipo',                   tipo: 'select', opcoes: ['Privado', 'Público'] },
    { key: 'rating',               label: 'Rating (nota · agência)', tipo: 'text' },
    { key: 'isento_ir',            label: 'Isento de IR',           tipo: 'boolean' },
    { key: 'fgc',                  label: 'Cobertura FGC',          tipo: 'boolean' },
    { key: 'custodiante',          label: 'Custodiante',            tipo: 'text' },
    { key: 'periodicidade_juros',  label: 'Periodicidade de juros', tipo: 'text' },
    { key: 'carencia',             label: 'Carência',               tipo: 'text' },
    { key: 'projecao_inflacao',    label: 'Projeção de inflação',   tipo: 'text' },
    { key: 'lag_indexacao',        label: 'Lag de indexação',       tipo: 'text' },
    { key: 'inadimplencia',        label: 'Em inadimplência',       tipo: 'boolean' },
];

const FUNDO: CampoDetalhe[] = [
    { key: 'gestor',           label: 'Gestor',              tipo: 'text' },
    { key: 'tipo_cvm',         label: 'Tipo CVM (código)',   tipo: 'number' },
    { key: 'entidade',         label: 'Entidade',            tipo: 'select', opcoes: ['Fundo (C)', 'Classe/Subclasse (S)'] },
    { key: 'aberto_aplicacao', label: 'Aberto p/ aplicação', tipo: 'boolean' },
    { key: 'aberto_resgate',   label: 'Aberto p/ resgate',   tipo: 'boolean' },
];

const RV: CampoDetalhe[] = [
    { key: 'setor',         label: 'Setor',                          tipo: 'text' },
    { key: 'tipo_papel',    label: 'Tipo de papel (ON/PN/UNT/COTAS)', tipo: 'text' },
    { key: 'mercado',       label: 'Mercado',                        tipo: 'text' },
    { key: 'fator_cotacao', label: 'Fator de cotação',               tipo: 'text' },
];

const COE: CampoDetalhe[] = [
    { key: 'estrategia',        label: 'Estratégia',         tipo: 'text' },
    { key: 'indice_subjacente', label: 'Índice subjacente',  tipo: 'text' },
    { key: 'capital_protegido', label: 'Capital protegido',  tipo: 'boolean' },
    { key: 'descricao',         label: 'Descrição',          tipo: 'text' },
    { key: 'status',            label: 'Status',             tipo: 'text' },
    { key: 'carencia',          label: 'Carência',           tipo: 'text' },
];

const ESTRUTURADA: CampoDetalhe[] = [
    { key: 'tipo_estrutura',    label: 'Tipo de estrutura',    tipo: 'text' },
    { key: 'ativo_base',        label: 'Ativo-base',           tipo: 'text' },
    { key: 'data_encerramento', label: 'Data de encerramento', tipo: 'text' },
    { key: 'estrategia',        label: 'Estratégia',           tipo: 'text' },
    { key: 'capital_protegido', label: 'Capital protegido',    tipo: 'boolean' },
    { key: 'status',            label: 'Status',               tipo: 'text' },
];

const GRUPOS = { RF, FUNDO, RV, COE, ESTRUTURADA } as const;

const SUBTIPO_GRUPO: Record<string, keyof typeof GRUPOS> = {
    // Renda Fixa
    CDB: 'RF', LCI: 'RF', LCA: 'RF', CRA: 'RF', CRI: 'RF', DEB: 'RF', 'DEBÊNTURE': 'RF',
    CDCA: 'RF', LF: 'RF', LFT: 'RF', LTN: 'RF', 'NTN-B': 'RF', 'NTN-F': 'RF', NTNB: 'RF',
    NTNF: 'RF', NTNC: 'RF', LCD: 'RF', RDB: 'RF', LIG: 'RF', COMPROMISSADA: 'RF', CAIXA: 'RF',
    // Fundos
    FUNDO: 'FUNDO', FI: 'FUNDO',
    // Renda Variável / FII
    'AÇÃO': 'RV', ACAO: 'RV', ETF: 'RV', FII: 'RV',
    // COE / Estruturada
    COE: 'COE',
    ESTRUTURADA: 'ESTRUTURADA',
};

export function camposBibliotecaPorSubtipo(subTipo: string | null | undefined): CampoDetalhe[] {
    const st = (subTipo || '').toUpperCase().trim();
    const grupo = SUBTIPO_GRUPO[st];
    return grupo ? [...GRUPOS[grupo]] : [];
}

// Normaliza identificador → chave da biblioteca (CNPJ 14 díg.; demais upper/trim).
export function normalizarChave(codigo: string | null | undefined): string | null {
    if (!codigo) return null;
    const digitos = String(codigo).replace(/\D/g, '');
    return digitos.length === 14 ? digitos : String(codigo).toUpperCase().trim();
}
