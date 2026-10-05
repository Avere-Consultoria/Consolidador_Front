import { useState, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useClient } from '../contexts/ClientContext';
import { supabase } from '../services/supabase';
import { pct, diasAteVencimento } from '../utils/formatters';
import { CORES } from '../utils/colors';
import { carregarPosicaoAvere, montarFontesJuncao, linhaParaAtivo, chaveFonte, corDaBase, type LinhaAvere } from './juncaoPosicao';

export interface ConsolidatedAtivo {
    rowId: string;
    nome: string;
    tipo: string;
    subTipo?: string;
    valorLiquido: number;
    valorBruto: number;   // padrão de exibição/agregação da Home (sempre preenchido)
    vencimento?: string | null;
    instituicao: string;       // rótulo da fonte/carteira (ex.: 'BTG Pactual 2')
    instituicaoBase?: string;  // base p/ lógica: 'BTG' | 'XP' | 'AVENUE' | 'AGORA' | 'MANUAL'
    emissorId?: string | null;
    conglomeradoId?: string | null;
    ativoCanonicoId?: string | null;
    liquidez?: string | null;
    rawData?: any;
    benchmark?: string | null;
    taxa?: string | null;
    naoVerificado?: boolean;   // entrada manual sem canônico (Camada 1): dado raso, não vinculado
    // Separação ativo × emissor (ver utils/rotuloAtivo): `nome` continua sendo apelido || cru;
    // estes três permitem à tela derivar o rótulo sem perder o rastro.
    nomeCru?: string | null;      // string da corretora, intocada
    apelido?: string | null;      // personalização do consultor
    emissorNome?: string | null;  // entidade do dicionário vinculada ao canônico (null = não vinculado)
}

export interface CarteiraPersonalizada {
    id: string;
    nome: string;
    instituicoes: string[];
    criada_em: string;
}

interface Emissor {
    id: string;
    nome_fantasia: string;
    setor: string;
    setorCor?: string | null;
    cnpj_raiz: string | null;
}

interface ConglomeradoDb {
    id: string;
    nome_lider: string;
    porte: string | null;
}

// Sub-tipos cobertos pelo FGC (crédito bancário) vs crédito privado (corporate).
// A resolução de risco (emissor/conglomerado) é feita e PERSISTIDA pelo Master
// (classificar-riscos). A Home apenas LÊ o que está no canônico — fonte única.
const SUBTIPOS_BANCARIO_FGC = new Set(['CDB', 'LCI', 'LCA', 'LF', 'LIG', 'RDB', 'LH', 'LC', 'LCD', 'DPGE', 'RDC']);
const SUBTIPOS_CREDITO_PRIVADO = new Set(['DEB', 'CRA', 'CRI', 'FIDC', 'NP', 'NC', 'CCB', 'CCI']);

interface ClasseMaster {
    nome: string;
    cor_hex: string;
    ordem_exibicao: number;
}

interface InstituicaoDb {
    nome: string;
    cor_primaria: string;
    tipo?: string | null;     // 'API' | 'MANUAL'
    codigo?: string | null;   // 'BTG' | 'XP' | 'AVENUE' | 'AGORA' (chave estável)
}

// ── Helpers de cor ────────────────────────────────────────────────────────────

function resolveCorClasse(keyBusca: string, colorMap: Map<string, string>): string {
    const cor = colorMap.get(keyBusca);
    if (cor) return cor;
    if (keyBusca === 'CLASSIFICAR' || keyBusca === 'A CLASSIFICAR') return '#EF4444';
    if (keyBusca === 'CONTA CORRENTE / OUTROS') return '#10B981';
    return '#9CA3AF';
}

// ── Builders de dados para os gráficos ────────────────────────────────────────

function buildExposicaoRisco(
    ativos: ConsolidatedAtivo[],
    emissorMap: Map<string, Emissor>,
    patrimonioTotal: number,
) {
    const raw: Record<string, { nome: string; setor: string; valor: number }> = {};
    ativos.forEach(a => {
        if (!a.emissorId || !emissorMap.has(a.emissorId)) return;
        const emissor = emissorMap.get(a.emissorId)!;
        if (!raw[a.emissorId]) raw[a.emissorId] = { nome: emissor.nome_fantasia, setor: emissor.setor, valor: 0 };
        raw[a.emissorId].valor += a.valorBruto;
    });
    return Object.values(raw)
        .map(e => ({ name: e.nome, setor: e.setor, value: e.valor, pct: pct(e.valor, patrimonioTotal) }))
        .sort((a, b) => b.value - a.value);
}

// ── Mundo 1: Crédito Bancário (FGC) — agrega por conglomerado ──────────────────
// LÊ o conglomerado_id PERSISTIDO no canônico (resolvido/corrigido no Master).
// Não-classificados → "Sem conglomerado FGC" (sinaliza o que falta classificar).
function buildCreditoBancario(
    ativos: ConsolidatedAtivo[],
    conglomeradoMap: Map<string, ConglomeradoDb>,
    patrimonioTotal: number,
) {
    const SEM = '__SEM__';
    const raw: Record<string, { name: string; porte: string | null; value: number }> = {};
    const semNomes = new Map<string, number>();
    ativos.forEach(a => {
        const st = (a.subTipo ?? '').toUpperCase().trim();
        if (!SUBTIPOS_BANCARIO_FGC.has(st)) return;

        let key = SEM, nome = 'Sem conglomerado FGC', porte: string | null = null;
        if (a.conglomeradoId && conglomeradoMap.has(a.conglomeradoId)) {
            const c = conglomeradoMap.get(a.conglomeradoId)!;
            key = a.conglomeradoId;
            nome = c.nome_lider;
            porte = c.porte;
        } else {
            const bruto = (a.rawData?.emissor ?? a.nome ?? '—').toString().trim() || '—';
            semNomes.set(bruto, (semNomes.get(bruto) ?? 0) + a.valorBruto);
        }
        if (!raw[key]) raw[key] = { name: nome, porte, value: 0 };
        raw[key].value += a.valorBruto;
    });
    const detalhesSem = Array.from(semNomes.entries())
        .map(([nome, valor]) => ({ nome, valor }))
        .sort((a, b) => b.valor - a.valor);
    return Object.entries(raw)
        .map(([key, e]) => ({
            ...e,
            semConglomerado: key === SEM,
            pct: pct(e.value, patrimonioTotal),
            detalhes: key === SEM ? detalhesSem : undefined,
        }))
        .sort((a, b) => b.value - a.value);
}

// ── Mundo 2: Crédito Privado (não-FGC) — agrega por emissor (+ setor) ──────────
// LÊ o emissor_id PERSISTIDO no canônico (resolvido/corrigido no Master).
function buildCreditoPrivado(
    ativos: ConsolidatedAtivo[],
    emissorMap: Map<string, Emissor>,
    patrimonioTotal: number,
) {
    const SEM = '__SEM__';
    const raw: Record<string, { name: string; setor: string; cor: string | null; value: number }> = {};
    const semNomes = new Map<string, number>();
    ativos.forEach(a => {
        const st = (a.subTipo ?? '').toUpperCase().trim();
        if (!SUBTIPOS_CREDITO_PRIVADO.has(st)) return;

        let key = SEM, nome = 'Sem emissor', setor = 'Sem setor', cor: string | null = null;
        if (a.emissorId && emissorMap.has(a.emissorId)) {
            const e = emissorMap.get(a.emissorId)!;
            key = a.emissorId;
            nome = e.nome_fantasia;
            setor = e.setor && e.setor.trim() !== '' ? e.setor : 'Sem setor';
            cor = e.setorCor ?? null;
        } else {
            const bruto = (a.rawData?.emissor ?? a.nome ?? '—').toString().trim() || '—';
            semNomes.set(bruto, (semNomes.get(bruto) ?? 0) + a.valorBruto);
        }
        if (!raw[key]) raw[key] = { name: nome, setor, cor, value: 0 };
        raw[key].value += a.valorBruto;
    });
    const detalhesSem = Array.from(semNomes.entries())
        .map(([nome, valor]) => ({ nome, valor }))
        .sort((a, b) => b.valor - a.valor);
    return Object.entries(raw)
        .map(([key, e]) => ({
            name: e.name, setor: e.setor, cor: e.cor, value: e.value,
            pct: pct(e.value, patrimonioTotal),
            semEmissor: key === SEM,
            detalhes: key === SEM ? detalhesSem : undefined,
        }))
        .sort((a, b) => b.value - a.value);
}

function buildLiquidezData(ativos: ConsolidatedAtivo[], _patrimonioTotal: number) {
    const map: Record<string, number> = {};
    ativos.forEach(a => {
        let liqKey = 'Não Classificada';
        if (a.liquidez !== null && a.liquidez !== '') {
            liqKey = `D+${a.liquidez}`;
        } else if (a.tipo === 'Conta Corrente / Outros' || a.nome.toLowerCase().includes('saldo')) {
            liqKey = 'D+0 (Imediata)';
        }
        map[liqKey] = (map[liqKey] || 0) + a.valorBruto;
    });
    const totalLiquidez = Object.values(map).reduce((s, v) => s + v, 0);
    return Object.entries(map)
        .map(([name, value]) => ({ name, value, pct: pct(value, totalLiquidez) }))
        .sort((a, b) => {
            if (a.name === 'Não Classificada') return 1;
            if (b.name === 'Não Classificada') return -1;
            if (a.name.includes('Imediata')) return -1;
            if (b.name.includes('Imediata')) return 1;
            return (parseInt(a.name.replace(/\D/g, '')) || 0) - (parseInt(b.name.replace(/\D/g, '')) || 0);
        });
}

function buildAlocacaoData(
    alocacaoMap: Record<string, number>,
    colorMap: Map<string, string>,
    orderMap: Map<string, number>,
    _patrimonioTotal: number,
) {
    const totalAlocado = Object.values(alocacaoMap).reduce((s, v) => s + v, 0);

    return Object.entries(alocacaoMap)
        .map(([name, value]) => {
            const key = name.trim().toUpperCase();
            return { name, value, pct: pct(value, totalAlocado), fill: resolveCorClasse(key, colorMap), ordem: orderMap.get(key) || 999 };
        })
        .filter(d => d.value > 0)
        .sort((a, b) => a.ordem - b.ordem);
}

interface InstituicaoComparativo {
    key: string;             // chave usada no dataKey do Recharts (ex: 'BTG', 'SANTANDER')
    label: string;
    cor: string;
    classes: Record<string, number>;
}

// Comparativo de classes por instituição — 100% dinâmico (N instituições, API + manuais)
function buildComparativoDinamico(
    instituicoes: InstituicaoComparativo[],
    colorMap: Map<string, string>,
    orderMap: Map<string, number>,
) {
    const todasAsClasses = Array.from(new Set(instituicoes.flatMap(i => Object.keys(i.classes))));
    return todasAsClasses
        .map(name => {
            const key = name.trim().toUpperCase();
            const row: any = {
                name,
                ordem: orderMap.get(key) || 999,
                cor_classe: resolveCorClasse(key, colorMap),
            };
            instituicoes.forEach(i => { row[i.key] = i.classes[name] || 0; });
            return row;
        })
        .filter(row => instituicoes.some(i => (row[i.key] || 0) > 0))
        .sort((a, b) => a.ordem - b.ordem);
}

// ── Fontes (carteiras): cada CONTA de API + cada instituição manual ───────────
// Unifica o caminho das APIs (BTG/XP/Avenue/Ágora) ao das manuais: a unidade é a
// CONTA. Um cliente com 3 contas XP gera 3 fontes (XP 1, XP 2, XP 3), nunca somadas.
type BaseInst = 'BTG' | 'XP' | 'AVENUE' | 'AGORA' | 'MANUAL';
interface FonteMeta {
    key: string;            // chave única da carteira: 'CONTA:<id>' | 'MANUAL:<inst>'
    grupoKey: string;       // chave de grupo p/ carteiras personalizadas: baseInst | 'MANUAL:<inst>'
    baseInst: BaseInst;
    label: string;          // 'XP 1', 'Avenue', 'Santander 2'...
    cor: string;
    contaId: string | null;
    snapshot: any;
    dataRef: string | undefined;
    ativosKey: string;      // chave do array de ativos no snapshot
    saldoOutros: number;    // caixa/outros do snapshot (BTG: cc+cripto; XP: coe) → fatia "Conta Corrente / Outros"
}

const API_DEFS: { base: Exclude<BaseInst, 'MANUAL'>; key: 'btg' | 'xp' | 'avenue' | 'agora'; nomeBase: string; ativosKey: string; match: RegExp }[] = [
    { base: 'BTG',    key: 'btg',    nomeBase: 'BTG Pactual',      ativosKey: 'posicao_btg_ativos',    match: /btg/i },
    { base: 'XP',     key: 'xp',     nomeBase: 'XP Investimentos', ativosKey: 'posicao_xp_ativos',     match: /xp/i },
    { base: 'AVENUE', key: 'avenue', nomeBase: 'Avenue',           ativosKey: 'posicao_avenue_ativos', match: /avenue/i },
    { base: 'AGORA',  key: 'agora',  nomeBase: 'Ágora',            ativosKey: 'posicao_agora_ativos',  match: /agora|ágora/i },
];

// Instituição de API correspondente no banco. Casa pelo CÓDIGO estável (chave),
// com fallback por palavra-chave no nome (compatibilidade pré-migration).
function instApiDb(base: BaseInst, instituicoesDb: InstituicaoDb[]): InstituicaoDb | undefined {
    const porCodigo = instituicoesDb.find(i => i.codigo === base);
    if (porCodigo) return porCodigo;
    const def = API_DEFS.find(d => d.base === base);
    return def ? instituicoesDb.find(i => i.tipo !== 'MANUAL' && def.match.test(i.nome)) : undefined;
}
// Nome de exibição da instituição de API: o cadastrado no banco (editável em Gestão Master) com fallback fixo.
function nomeApiBase(base: BaseInst, instituicoesDb: InstituicaoDb[]): string {
    const def = API_DEFS.find(d => d.base === base);
    return instApiDb(base, instituicoesDb)?.nome || def?.nomeBase || base;
}

// Filtra fontes pela carteira ativa (Consolidada / personalizada / fonte única). Igual p/ vivo e fechado.
function filtrarFontes(fontes: FonteMeta[], carteiraAtiva: string, personalizada?: CarteiraPersonalizada): FonteMeta[] {
    return fontes.filter(f => {
        if (carteiraAtiva === 'CONSOLIDADA') return true;
        if (personalizada) return personalizada.instituicoes.includes(f.key) || personalizada.instituicoes.includes(f.grupoKey);
        return f.key === carteiraAtiva;
    });
}

// ── Núcleo de métricas — agnóstico à fonte (vivo OU fechado) ──────────────────
// Recebe a lista normalizada de ativos por fonte e devolve tudo que a Home consome.
interface ComputeMetricsCtx {
    fontesIncluidas: FonteMeta[];
    fontesTodas: FonteMeta[];
    ativosPorFonte: Map<string, ConsolidatedAtivo[]>;
    emissores: Emissor[];
    emissorMap: Map<string, Emissor>;
    conglomeradoMap: Map<string, ConglomeradoDb>;
    colorMap: Map<string, string>;
    orderMap: Map<string, number>;
    diasVencimento: number;
}
function computeMetrics(ctx: ComputeMetricsCtx) {
    const { fontesIncluidas, fontesTodas, ativosPorFonte, emissores, emissorMap, conglomeradoMap, colorMap, orderMap, diasVencimento } = ctx;

    const totalFonte = (f: FonteMeta) => parseFloat(f.snapshot?.patrimonio_total || 0);
    const totalAtivos = fontesIncluidas.flatMap(f => ativosPorFonte.get(f.key) || []);
    const patrimonioTotal = fontesIncluidas.reduce((s, f) => s + totalFonte(f), 0);

    // Agenda de vencimentos: estritamente futuros (dias > 0) dentro da janela escolhida
    // (9999 = "Todos os Ativos"). Mesmo cálculo timezone-safe da liquidez.
    const vencimentosProx = totalAtivos.filter(a => {
        const dias = diasAteVencimento(a.vencimento);
        if (dias == null || dias <= 0) return false;
        return diasVencimento === 9999 || dias <= diasVencimento;
    });

    const todosAtivos = [...totalAtivos].sort((a, b) => b.valorBruto - a.valorBruto);

    const exposicaoRiscoData = buildExposicaoRisco(totalAtivos, emissorMap, patrimonioTotal);
    const creditoBancarioData = buildCreditoBancario(totalAtivos, conglomeradoMap, patrimonioTotal);
    const creditoPrivadoData = buildCreditoPrivado(totalAtivos, emissorMap, patrimonioTotal);

    const setorCorMap = new Map<string, string>();
    emissores.forEach(e => { if (e.setor && e.setor.trim() !== '' && e.setorCor) setorCorMap.set(e.setor, e.setorCor); });
    const setorMap: Record<string, number> = {};
    creditoPrivadoData.forEach(e => {
        const s = e.setor && e.setor.trim() !== '' ? e.setor : 'Sem setor';
        setorMap[s] = (setorMap[s] || 0) + e.value;
    });
    const totalClassificadoSetor = Object.values(setorMap).reduce((s, v) => s + v, 0);
    const setorialData = Object.entries(setorMap)
        .map(([setor, valor]) => ({
            setor, valor,
            pct: totalClassificadoSetor > 0 ? (valor / totalClassificadoSetor) * 100 : 0,
            cor: setor === 'Sem setor' ? '#D1D5DB' : (setorCorMap.get(setor) ?? null),
        }))
        .sort((a, b) => b.valor - a.valor);

    const CLASSES_RV = ['Renda Variável', 'FII-FIAgro', 'Internacional - Renda Variável'];
    const isPrevidencia = (a: ConsolidatedAtivo) => a.rawData?.asset_class === 'PENSION';
    const isRV          = (a: ConsolidatedAtivo) => CLASSES_RV.includes(a.tipo);
    const isGeral       = (a: ConsolidatedAtivo) => !isPrevidencia(a) && !isRV(a);

    const liquidezData     = buildLiquidezData(totalAtivos.filter(isGeral),        patrimonioTotal);
    const liquidezDataPrev = buildLiquidezData(totalAtivos.filter(isPrevidencia),  patrimonioTotal);
    const liquidezDataRV   = buildLiquidezData(totalAtivos.filter(isRV),           patrimonioTotal);

    const alocacaoMap: Record<string, number> = {};
    const compInput: InstituicaoComparativo[] = [];
    fontesIncluidas.forEach(f => {
        const classes: Record<string, number> = {};
        (ativosPorFonte.get(f.key) || []).forEach(a => { classes[a.tipo] = (classes[a.tipo] || 0) + a.valorBruto; });
        if (f.saldoOutros > 0) classes['Conta Corrente / Outros'] = (classes['Conta Corrente / Outros'] || 0) + f.saldoOutros;
        Object.keys(classes).forEach(k => { alocacaoMap[k] = (alocacaoMap[k] || 0) + classes[k]; });
        if (totalFonte(f) > 0) compInput.push({ key: f.key, label: f.label, cor: f.cor, classes });
    });

    const alocacaoData = buildAlocacaoData(alocacaoMap, colorMap, orderMap, patrimonioTotal);
    const comparativoInstituicoes = compInput.map(i => ({ key: i.key, label: i.label, cor: i.cor }));
    const comparativoData = buildComparativoDinamico(compInput, colorMap, orderMap);

    const donutData = fontesIncluidas.filter(f => totalFonte(f) > 0)
        .map(f => ({ name: f.label, value: totalFonte(f), pct: pct(totalFonte(f), patrimonioTotal), fill: f.cor }));
    const fontesData = fontesIncluidas.filter(f => totalFonte(f) > 0)
        .map(f => ({ id: f.key, nome: f.label, total: totalFonte(f), pct: pct(totalFonte(f), patrimonioTotal), ref: f.dataRef, cor: f.cor }));
    const fontesRef = fontesIncluidas.filter(f => totalFonte(f) > 0)
        .map(f => ({ label: f.label, dataRef: f.dataRef }));

    const temBtg    = fontesTodas.some(f => f.baseInst === 'BTG');
    const temXp     = fontesTodas.some(f => f.baseInst === 'XP');
    const temAvenue = fontesTodas.some(f => f.baseInst === 'AVENUE');
    const temAgora  = fontesTodas.some(f => f.baseInst === 'AGORA');

    return {
        patrimonioTotal, vencimentosProx, todosAtivos,
        donutData, alocacaoData, comparativoData, comparativoInstituicoes, exposicaoRiscoData, setorialData,
        creditoBancarioData, creditoPrivadoData,
        liquidezData, liquidezDataPrev, liquidezDataRV,
        hasData: patrimonioTotal > 0,
        fontesData, fontesRef,
        temBtg, temXp, temAvenue, temAgora,
    };
}

// ── Adapter do RELATÓRIO FECHADO (read-only) ──────────────────────────────────
// Lê snapshots_fechados + posicoes_fechadas (classificação já carimbada) e produz
// a MESMA forma (FonteMeta[] + Map<ativos>) que o caminho vivo, por CONTA.
const baseFromInst = (inst: string): BaseInst =>
    (['BTG', 'XP', 'AVENUE', 'AGORA'].includes((inst || '').toUpperCase()) ? (inst || '').toUpperCase() : 'MANUAL') as BaseInst;

function parseFechada(p: any, label: string, base: BaseInst, fonteKey: string, idx: number): ConsolidatedAtivo {
    return {
        rowId: `${fonteKey}-${idx}`,
        nome: p.nome_exibicao || p.emissor_nome || '-',
        tipo: p.classe_avere || 'Classificar',
        subTipo: p.sub_tipo ?? undefined,
        valorLiquido: parseFloat(p.valor_liquido ?? p.valor_bruto ?? 0),
        valorBruto: parseFloat(p.valor_bruto ?? 0),
        vencimento: p.data_vencimento ?? null,
        instituicao: label,
        instituicaoBase: base,
        emissorId: p.emissor_id ?? null,
        conglomeradoId: p.conglomerado_id ?? null,
        ativoCanonicoId: p.ativo_canonico_id ?? null,
        liquidez: p.liquidez_avere ?? null,
        rawData: { asset_class: p.asset_class, emissor: p.emissor_nome },
        benchmark: p.benchmark ?? '-',
        taxa: p.taxa_formatada ?? p.taxa ?? null,
    };
}

function montarFechado(sfRows: any[], contas: any[], instituicoesDb: InstituicaoDb[]): { fontes: FonteMeta[]; ativos: Map<string, ConsolidatedAtivo[]> } {
    const contaById = new Map<string, any>(contas.map(c => [c.id, c]));
    const corFallback: Record<string, string> = { BTG: CORES.btg, XP: CORES.xp, AVENUE: CORES.avenue, AGORA: CORES.agora };
    const nomeBaseOf = (base: BaseInst, inst: string) =>
        base === 'MANUAL' ? inst : nomeApiBase(base, instituicoesDb);

    // Agrupa por base (API) ou por instituição manual, p/ numerar multi-conta (XP 1 / XP 2).
    const grupos = new Map<string, any[]>();
    (sfRows || []).forEach(sf => {
        const base = baseFromInst(sf.instituicao);
        const gk = base === 'MANUAL' ? `MANUAL:${sf.instituicao}` : base;
        const arr = grupos.get(gk) ?? [];
        arr.push({ sf, base });
        grupos.set(gk, arr);
    });

    const fontes: FonteMeta[] = [];
    const ativos = new Map<string, ConsolidatedAtivo[]>();
    grupos.forEach(items => {
        const ordenados = items
            .map(it => ({ ...it, conta: it.sf.conta_id ? contaById.get(it.sf.conta_id) : null }))
            .sort((a, b) => (a.conta?.ordem ?? 1) - (b.conta?.ordem ?? 1));
        const multi = ordenados.length > 1;
        ordenados.forEach((it, i) => {
            const inst: string = it.sf.instituicao;
            const base: BaseInst = it.base;
            const nomeBase = nomeBaseOf(base, inst);
            const label = (it.conta?.apelido && it.conta.apelido.trim()) || (multi ? `${nomeBase} ${i + 1}` : nomeBase);
            const cor = instituicoesDb.find(x => x.nome.toUpperCase() === inst.toUpperCase())?.cor_primaria
                || (base !== 'MANUAL' ? corFallback[base] : '#64748B');
            const key = it.sf.conta_id ? `CONTA:${it.sf.conta_id}` : (base === 'MANUAL' ? `MANUAL:${inst}` : `CONTA:${base}`);
            const grupoKey = base === 'MANUAL' ? `MANUAL:${inst}` : base;
            fontes.push({
                key, grupoKey, baseInst: base, label, cor,
                contaId: it.sf.conta_id ?? null,
                snapshot: { patrimonio_total: it.sf.patrimonio_total },
                dataRef: it.sf.data_referencia, ativosKey: '',
                saldoOutros: Number(it.sf.saldo_caixa_outros) || 0,
            });
            const rows = (it.sf.posicoes_fechadas || []) as any[];
            ativos.set(key, rows
                .map((p, idx) => parseFechada(p, label, base, key, idx))
                .filter(a => (a.valorLiquido && a.valorLiquido > 0) || (a.valorBruto && a.valorBruto > 0)));
        });
    });
    return { fontes, ativos };
}

// Refs estáveis para quando ainda não há dados — evita recomputar o metrics
// a cada render por causa de arrays/objetos novos.
const ARR_VAZIO: any[] = [];

// Posição viva no Padrão Avere: `posicao_avere(cliente, lente)` devolve a linha já
// resolvida no banco (classe, sub-tipo, emissor, taxa, liquidez, personalização do
// consultor). Aqui só se agrupa por conta e se alimentam os gráficos. O mês fechado
// continua lendo `snapshots_fechados` (classificação carimbada, sem lente).
export function useHomeMetrics() {
    const { selectedClient, consultorPerfilId } = useClient();
    const queryClient = useQueryClient();
    const clienteId = selectedClient?.id ?? null;

    // Período: 'LIVE' (posição atual) ou 'YYYY-MM' (relatório fechado, read-only).
    const [periodo, setPeriodo] = useState<string>('LIVE');
    const [diasVencimento, setDiasVencimento] = useState(9999); // default: "Todos os Ativos"
    const [drawerCarteirasAberto, setDrawerCarteirasAberto] = useState(false);
    const [carteiraAtiva, setCarteiraAtiva] = useState<string>('CONSOLIDADA');

    // ── Posição viva (cache por cliente + lente do consultor) ─────────────────
    // Personalizar um ativo invalida só esta consulta (~200 ms); os dicionários ficam.
    const juncaoQ = useQuery({
        queryKey: ['home', 'juncao', clienteId, consultorPerfilId],
        enabled: !!clienteId,
        queryFn: () => carregarPosicaoAvere(clienteId!, consultorPerfilId),
    });
    // Dicionários que os gráficos ainda leem por id (setor/cor do emissor, porte do
    // conglomerado, cor e ordem das classes, cor das instituições).
    const dicionariosQ = useQuery({
        queryKey: ['home', 'dicionarios'],
        enabled: !!clienteId,
        staleTime: 5 * 60 * 1000,
        queryFn: async () => {
            const [em, cl, inst, cg] = await Promise.all([
                supabase.from('dicionario_emissores').select('id, nome_fantasia, cnpj_raiz, setor_id, setores(nome, cor_hex)').range(0, 4999),
                supabase.from('dicionario_classes').select('*').order('ordem_exibicao'),
                supabase.from('instituicoes').select('*'),
                supabase.from('dicionario_conglomerados').select('id, nome_lider, porte').range(0, 4999),
            ]);
            const erro = em.error ?? cl.error ?? inst.error ?? cg.error;
            if (erro) throw erro;
            return {
                emissores: ((em.data ?? []) as any[]).map((r: any) => ({
                    id: r.id, nome_fantasia: r.nome_fantasia, cnpj_raiz: r.cnpj_raiz,
                    setor: r.setores?.nome ?? '', setorCor: r.setores?.cor_hex ?? null,
                })) as Emissor[],
                classesMaster: (cl.data ?? []) as ClasseMaster[],
                instituicoesDb: (inst.data ?? []) as InstituicaoDb[],
                conglomeradosDb: (cg.data ?? []) as ConglomeradoDb[],
            };
        },
    });
    // Contas do cliente: só o mês fechado ainda rotula as fontes aqui (XP 1 / XP 2,
    // apelidos); na posição viva o rótulo já vem da junção.
    const contasQ = useQuery({
        queryKey: ['home', 'contas', clienteId],
        enabled: !!clienteId,
        queryFn: async () => {
            const { data, error } = await supabase
                .from('cliente_contas').select('id, instituicao_id, apelido, ordem')
                .eq('cliente_id', clienteId!).order('ordem', { ascending: true });
            if (error) throw error;
            return data ?? [];
        },
    });

    const linhasJuncao = juncaoQ.data ?? (ARR_VAZIO as LinhaAvere[]);
    const fontesJuncao = useMemo(() => montarFontesJuncao(linhasJuncao), [linhasJuncao]);
    const dic = dicionariosQ.data;
    const emissores = dic?.emissores ?? (ARR_VAZIO as Emissor[]);
    const conglomeradosDb = dic?.conglomeradosDb ?? (ARR_VAZIO as ConglomeradoDb[]);
    const classesMaster = dic?.classesMaster ?? (ARR_VAZIO as ClasseMaster[]);
    const instituicoesDb = dic?.instituicoesDb ?? (ARR_VAZIO as InstituicaoDb[]);
    const contas = contasQ.data ?? (ARR_VAZIO as any[]);

    useEffect(() => {
        if (juncaoQ.error) console.error('Erro na carga da posição:', juncaoQ.error);
        if (dicionariosQ.error) console.error('Erro ao carregar dicionários:', dicionariosQ.error);
        if (contasQ.error) console.error('Erro ao carregar contas:', contasQ.error);
    }, [juncaoQ.error, dicionariosQ.error, contasQ.error]);

    // Carteiras personalizadas do cliente
    const carteirasQ = useQuery({
        queryKey: ['home', 'carteiras', clienteId],
        enabled: !!clienteId,
        queryFn: async () => {
            const { data, error } = await supabase
                .from('carteiras_personalizadas')
                .select('id, nome, instituicoes, criada_em')
                .eq('cliente_id', clienteId!)
                .order('criada_em', { ascending: true });
            if (error) throw error;
            return (data ?? []) as CarteiraPersonalizada[];
        },
    });
    const carteirasPersonalizadas = carteirasQ.data ?? (ARR_VAZIO as CarteiraPersonalizada[]);

    // O drawer cria/renomeia/exclui carteiras — alternar revalida a lista
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['home', 'carteiras'] });
    }, [drawerCarteirasAberto, queryClient]);

    // Ao trocar de cliente, volta para a posição atual (e carteira consolidada).
    useEffect(() => { setPeriodo('LIVE'); setCarteiraAtiva('CONSOLIDADA'); }, [clienteId]);

    // Lista de meses com fechamento (para o seletor de período).
    const mesesQ = useQuery({
        queryKey: ['home', 'meses-fechados', clienteId],
        enabled: !!clienteId,
        queryFn: async () => {
            const { data, error } = await supabase
                .from('snapshots_fechados').select('mes_referencia')
                .eq('cliente_id', clienteId!);
            if (error) throw error;
            return Array.from(new Set((data ?? []).map((r: any) => r.mes_referencia as string))).sort().reverse();
        },
    });
    const mesesFechados = mesesQ.data ?? (ARR_VAZIO as string[]);

    // Relatório fechado do mês selecionado (read-only).
    const fechadoQ = useQuery({
        queryKey: ['home', 'fechado', clienteId, periodo],
        enabled: !!clienteId && periodo !== 'LIVE',
        queryFn: async () => {
            const { data, error } = await supabase
                .from('snapshots_fechados')
                .select('id, conta_id, instituicao, data_referencia, patrimonio_total, saldo_caixa_outros, posicoes_fechadas(*)')
                .eq('cliente_id', clienteId!)
                .eq('mes_referencia', periodo);
            if (error) throw error;
            return data ?? [];
        },
    });
    const fechadoData = useMemo(
        () => (periodo === 'LIVE' || !fechadoQ.data ? null : montarFechado(fechadoQ.data, contas, instituicoesDb)),
        [periodo, fechadoQ.data, contas, instituicoesDb],
    );
    useEffect(() => {
        if (fechadoQ.error) console.error('Erro ao carregar relatório fechado:', fechadoQ.error);
    }, [fechadoQ.error]);

    const loading = !!clienteId && (juncaoQ.isPending || dicionariosQ.isPending || contasQ.isPending || (periodo !== 'LIVE' && fechadoQ.isPending));

    // Fontes vivas: uma fonte = uma conta com linhas; o total é a soma das linhas
    // (D11) e não há "saldo por fora" (D14).
    const fontesVivas = useMemo<FonteMeta[]>(() => fontesJuncao.map(f => ({
        key: f.key, grupoKey: f.grupoKey, baseInst: f.baseInst, label: f.label, contaId: f.contaId,
        cor: (f.baseInst === 'MANUAL'
            ? instituicoesDb.find(i => i.nome.toUpperCase() === f.instituicao.toUpperCase())?.cor_primaria
            : instApiDb(f.baseInst, instituicoesDb)?.cor_primaria) || corDaBase(f.baseInst),
        snapshot: { patrimonio_total: f.patrimonio }, dataRef: f.dataRef, ativosKey: '', saldoOutros: 0,
    })), [fontesJuncao, instituicoesDb]);

    const opcoesCarteira = useMemo(() => [
        { label: 'Consolidada', value: 'CONSOLIDADA' },
        ...fontesVivas.map(f => ({ label: f.label, value: f.key })),
        ...carteirasPersonalizadas.map(c => ({ label: c.nome, value: c.id })),
    ], [fontesVivas, carteirasPersonalizadas]);

    // Nomes distintos das instituições manuais (p/ montar carteiras personalizadas)
    const instituicoesManuais = useMemo(
        () => Array.from(new Set(fontesJuncao.filter(f => f.baseInst === 'MANUAL').map(f => f.instituicao))),
        [fontesJuncao],
    );

    const metrics = useMemo(() => {
        const emissorMap = new Map<string, Emissor>();
        emissores.forEach(e => emissorMap.set(e.id, e));
        const conglomeradoMap = new Map<string, ConglomeradoDb>();
        conglomeradosDb.forEach(c => conglomeradoMap.set(c.id, c));

        const colorMap = new Map();
        const orderMap = new Map();
        classesMaster.forEach(c => {
            const k = c.nome.trim().toUpperCase();
            colorMap.set(k, c.cor_hex); orderMap.set(k, c.ordem_exibicao);
        });
        const personalizada = carteirasPersonalizadas.find(c => c.id === carteiraAtiva);

        // ── Relatório FECHADO (read-only): classificação já carimbada, sem lente ──
        if (periodo !== 'LIVE') {
            if (!fechadoData) return computeMetrics({ fontesIncluidas: [], fontesTodas: [], ativosPorFonte: new Map(), emissores, emissorMap, conglomeradoMap, colorMap, orderMap, diasVencimento });
            const fontesIncluidasF = filtrarFontes(fechadoData.fontes, carteiraAtiva, personalizada);
            const ativosPorFonteF = new Map<string, ConsolidatedAtivo[]>();
            fontesIncluidasF.forEach(f => ativosPorFonteF.set(f.key, fechadoData.ativos.get(f.key) || []));
            return computeMetrics({ fontesIncluidas: fontesIncluidasF, fontesTodas: fechadoData.fontes, ativosPorFonte: ativosPorFonteF, emissores, emissorMap, conglomeradoMap, colorMap, orderMap, diasVencimento });
        }

        // ── Posição VIVA: linha já resolvida no banco — só agrupa por fonte ──
        const fontesIncluidas = filtrarFontes(fontesVivas, carteiraAtiva, personalizada);
        const fontePorKey = new Map(fontesJuncao.map(f => [f.key, f]));
        const ativosPorFonte = new Map<string, ConsolidatedAtivo[]>();
        fontesIncluidas.forEach(f => ativosPorFonte.set(f.key, []));
        linhasJuncao.forEach(l => {
            const fonte = fontePorKey.get(chaveFonte(l));
            const lista = fonte && ativosPorFonte.get(fonte.key);
            if (fonte && lista) lista.push(linhaParaAtivo(l, fonte));
        });
        return computeMetrics({ fontesIncluidas, fontesTodas: fontesVivas, ativosPorFonte, emissores, emissorMap, conglomeradoMap, colorMap, orderMap, diasVencimento });
    }, [periodo, fechadoData, linhasJuncao, fontesJuncao, fontesVivas, diasVencimento, carteiraAtiva, carteirasPersonalizadas, emissores, conglomeradosDb, classesMaster]);

    // Personalizar um ativo pelo drawer da carteira: a lente é aplicada no banco,
    // então basta rebuscar a posição (os dicionários ficam no cache).
    function recarregar() {
        queryClient.invalidateQueries({ queryKey: ['home', 'juncao'] });
    }

    // Recarga completa (posições + carteiras). Usada quando a posição muda de
    // canônico no banco (criação de rascunho).
    function recarregarTudo() {
        queryClient.invalidateQueries({ queryKey: ['home'] });
    }

    const erroCarga = !!juncaoQ.error || !!dicionariosQ.error || !!contasQ.error;
    const semRede = juncaoQ.fetchStatus === 'paused' && juncaoQ.isPending;
    return { selectedClient, loading, erroCarga, semRede, metrics, diasVencimento, setDiasVencimento, drawerCarteirasAberto, setDrawerCarteirasAberto, carteiraAtiva, setCarteiraAtiva, opcoesCarteira, instituicoesManuais, periodo, setPeriodo, mesesFechados, recarregar, recarregarTudo };
}
