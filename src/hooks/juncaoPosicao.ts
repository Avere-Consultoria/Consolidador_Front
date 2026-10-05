// ─────────────────────────────────────────────────────────────────────────────
// Posição no Padrão Avere — leitura da junção única do banco (Fase 3).
//
// A Home deixa de buscar snapshots, catálogo, exceções e liquidez por subtipo e de
// resolver tudo no cliente: `posicao_avere(cliente, lente)` devolve a linha já
// resolvida (classe, sub-tipo, emissor, taxa, liquidez, personalização do consultor).
// Aqui só se adapta essa linha ao formato que os gráficos e a tabela já consomem.
// Contrato: financial-consolidator/lab/padrao-avere/CONTRATO-posicao-avere.md (seção 5).
// ─────────────────────────────────────────────────────────────────────────────
import { supabase } from '../services/supabase';
import { CORES } from '../utils/colors';
import type { ConsolidatedAtivo } from './useHomeMetrics';

export type BaseInst = 'BTG' | 'XP' | 'AVENUE' | 'AGORA' | 'MANUAL';

/** Uma linha de `posicao_avere()` — só os campos que a tela usa. */
export interface LinhaAvere {
    cliente_id: string;
    conta_id: string | null;
    instituicao: string;            // 'BTG' | 'XP' | 'AVENUE' | 'AGORA' | nome da instituição manual
    origem: 'API' | 'MANUAL';
    conta_rotulo: string;
    snapshot_id: string;
    data_referencia: string;
    data_captura: string | null;
    data_posicao_fonte: string | null;
    linha_id: string;
    seq: number | null;
    ativo_id: string | null;
    vinculado: boolean;
    verificado: boolean;
    ativo: string;
    sub_tipo: string | null;
    classe: string;
    emissor_id: string | null;
    emissor: string | null;
    setor: string | null;
    conglomerado_id: string | null;
    conglomerado: string | null;
    porte: string | null;
    data_vencimento: string | null;
    taxa: string | null;
    benchmark: string | null;
    liquidez_dias: number | null;
    quantidade: number | null;
    preco_unitario: number | null;
    valor_bruto: number | null;
    valor_liquido: number | null;
    ir: number | null;
    iof: number | null;
    isento_ir: boolean | null;
    moeda: string;
    valor_bruto_origem: number | null;
    valor_referencia: number;
    zerada: boolean;
    asset_class: string | null;
    nome_fonte: string | null;
    nome_catalogo: string | null;
    sub_tipo_fonte: string | null;
    taxa_fonte: string | null;
    indexador_fonte: string | null;
    vencimento_fonte: string | null;
    liquidez_diaria_fonte: boolean | null;
    liquidez_catalogo: string | null;
    isin: string | null;
    ticker: string | null;
    cnpj: string | null;
    codigo_cetip: string | null;
    codigo_selic: string | null;
    cusip: string | null;
    codigo_fonte: string | null;
    apelido: string | null;
}

export async function carregarPosicaoAvere(clienteId: string, lente: string | null): Promise<LinhaAvere[]> {
    const { data, error } = await supabase.rpc('posicao_avere', { p_cliente_id: clienteId, p_lente: lente });
    if (error) throw error;
    return (data ?? []) as LinhaAvere[];
}

export function baseDe(l: Pick<LinhaAvere, 'instituicao' | 'origem'>): BaseInst {
    if (l.origem === 'MANUAL') return 'MANUAL';
    const i = l.instituicao.toUpperCase();
    return (['BTG', 'XP', 'AVENUE', 'AGORA'].includes(i) ? i : 'MANUAL') as BaseInst;
}

/** Uma fonte = uma conta com posição (mesmas chaves que as carteiras personalizadas já guardam). */
export interface FonteJuncao {
    key: string;          // 'CONTA:<conta_id>' | 'MANUAL:<inst>'
    grupoKey: string;     // base da API | 'MANUAL:<inst>'
    baseInst: BaseInst;
    instituicao: string;  // nome cru da instituição (p/ cor das manuais)
    label: string;        // rótulo da conta, já numerado no banco ('XP', 'BTG 1'…)
    contaId: string | null;
    dataRef: string;
    patrimonio: number;   // soma das linhas (D11)
}

const ORDEM_BASE: Record<BaseInst, number> = { BTG: 0, XP: 1, AVENUE: 2, AGORA: 3, MANUAL: 4 };

/** Chave da fonte de uma linha — a mesma que as carteiras personalizadas guardam. */
export function chaveFonte(l: Pick<LinhaAvere, 'conta_id' | 'instituicao' | 'origem'>): string {
    if (l.conta_id) return `CONTA:${l.conta_id}`;
    const base = baseDe(l);
    return base === 'MANUAL' ? `MANUAL:${l.instituicao}` : `CONTA:${base}`;
}

export function montarFontesJuncao(linhas: LinhaAvere[]): FonteJuncao[] {
    const porSnapshot = new Map<string, FonteJuncao>();
    for (const l of linhas) {
        let f = porSnapshot.get(l.snapshot_id);
        if (!f) {
            const base = baseDe(l);
            f = {
                key: chaveFonte(l),
                grupoKey: base === 'MANUAL' ? `MANUAL:${l.instituicao}` : base,
                baseInst: base, instituicao: l.instituicao, label: l.conta_rotulo,
                contaId: l.conta_id, dataRef: l.data_referencia, patrimonio: 0,
            };
            porSnapshot.set(l.snapshot_id, f);
        }
        f.patrimonio += Number(l.valor_referencia) || 0;
    }
    return Array.from(porSnapshot.values())
        .sort((a, b) => ORDEM_BASE[a.baseInst] - ORDEM_BASE[b.baseInst] || a.label.localeCompare(b.label));
}

export function corDaBase(base: BaseInst): string {
    return { BTG: CORES.btg, XP: CORES.xp, AVENUE: CORES.avenue, AGORA: CORES.agora, MANUAL: CORES.outros }[base];
}

// O drawer de detalhe e o atalho de personalização leem `rawData` com os nomes das
// colunas de cada corretora. A junção já traz o essencial; o resto (lotes de
// aquisição, campos exclusivos da API) o drawer busca pela `linha_id` quando abre.
function rawDaLinha(l: LinhaAvere, base: BaseInst): Record<string, unknown> {
    const comum = {
        id: l.linha_id, linha_id: l.linha_id, snapshot_id: l.snapshot_id,
        asset_class: l.asset_class, sub_tipo: l.sub_tipo_fonte,
        nome: l.nome_fonte, emissor: l.nome_fonte,
        isin: l.isin, ticker: l.ticker, cnpj: l.cnpj, cusip: l.cusip,
        quantidade: l.quantidade, valor_bruto: l.valor_bruto, valor_liquido: l.valor_liquido,
        data_posicao: l.data_posicao_fonte,
    };
    switch (base) {
        case 'BTG': return {
            ...comum, security_code: l.codigo_fonte, cetip_code: l.codigo_cetip, selic_code: l.codigo_selic, fund_cnpj: l.cnpj,
            preco_mercado: l.preco_unitario, ir: l.ir, iof_tax: l.iof, tax_free: l.isento_ir === true, is_liquidity: l.liquidez_diaria_fonte,
            maturity_date: l.vencimento_fonte, rentabilidade: l.taxa_fonte, benchmark: l.indexador_fonte,
        };
        case 'XP': return {
            ...comum, codigo_ativo: l.codigo_fonte, preco_unitario: l.preco_unitario, valor_imposto_renda: l.ir, valor_iof: l.iof,
            is_isento_ir: l.isento_ir === true, is_liquidity: l.liquidez_diaria_fonte, data_vencimento: l.vencimento_fonte,
            rentabilidade: l.taxa_fonte, benchmark: l.indexador_fonte,
        };
        case 'AVENUE': return {
            ...comum, valor_bruto_brl: l.valor_bruto, valor_bruto_usd: l.valor_bruto_origem, is_liquidity: l.liquidez_diaria_fonte,
            maturity_date: l.vencimento_fonte,
        };
        case 'AGORA': return {
            ...comum, security_code: l.codigo_fonte, preco_mercado: l.preco_unitario, ir_valor: l.ir, iof_valor: l.iof,
            is_isento_ir: l.isento_ir === true, liquidez_diaria: l.liquidez_diaria_fonte, data_vencimento: l.vencimento_fonte,
            taxa: l.taxa_fonte,
        };
        default: return {
            ...comum, preco_mercado: l.preco_unitario, data_vencimento: l.vencimento_fonte,
            rentabilidade: l.taxa_fonte, benchmark: l.indexador_fonte,
        };
    }
}

export function linhaParaAtivo(l: LinhaAvere, fonte: FonteJuncao): ConsolidatedAtivo {
    const valorBruto = Number(l.valor_referencia) || 0;
    return {
        rowId: l.linha_id,
        nome: l.ativo,
        tipo: l.classe,
        subTipo: l.sub_tipo ?? undefined,
        valorLiquido: l.valor_liquido != null ? Number(l.valor_liquido) : valorBruto,
        valorBruto,
        vencimento: l.data_vencimento,
        instituicao: fonte.label,
        instituicaoBase: fonte.baseInst,
        emissorId: l.emissor_id,
        conglomeradoId: l.conglomerado_id,
        ativoCanonicoId: l.ativo_id,
        liquidez: l.liquidez_dias != null ? String(l.liquidez_dias) : null,
        rawData: rawDaLinha(l, fonte.baseInst),
        benchmark: l.benchmark ?? '-',
        taxa: l.taxa,
        naoVerificado: !l.verificado,
        nomeCru: l.nome_fonte,
        apelido: l.apelido,
        emissorNome: l.emissor,
    };
}
