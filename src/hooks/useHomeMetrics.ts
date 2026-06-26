import { useState, useEffect, useMemo } from 'react';
import { useClient } from '../contexts/ClientContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { pct, diasAteVencimento } from '../utils/formatters';
import { CORES } from '../utils/colors';

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
}

export interface CarteiraPersonalizada {
    id: string;
    nome: string;
    instituicoes: string[];
    criada_em: string;
}

interface AtivoCanonico {
    id: string;
    nome_canonico: string;
    classe_avere: string | null;
    liquidez_avere: string | null;
    emissor_id: string | null;
    conglomerado_id: string | null;
    data_vencimento: string | null;
    taxa_canonica: string | null;
    benchmark_canonico: string | null;
    sub_tipo_canonico: string | null;
    is_fii: boolean;
    is_coe: boolean;
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

interface ExcecaoClassificacao {
    ativo_canonico_id: string;
    cliente_id: string | null;
    consultor_id: string;
    classe_customizada: string | null;
    liquidez_customizada: string | null;
    vencimento_customizado: string | null;
    emissor_customizado_id: string | null;
    apelido_ativo: string | null;
}

// ── Helpers de cor ────────────────────────────────────────────────────────────

function resolveCorClasse(keyBusca: string, colorMap: Map<string, string>): string {
    const cor = colorMap.get(keyBusca);
    if (cor) return cor;
    if (keyBusca === 'CLASSIFICAR') return '#EF4444';
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

// Monta a lista de fontes (sem parsear ativos) a partir dos snapshots por conta.
function montarFontesMeta(
    apiSnapshots: Record<'btg' | 'xp' | 'avenue' | 'agora', any[]>,
    contas: any[],
    manualSnapshots: any[],
    instituicoesDb: InstituicaoDb[],
): FonteMeta[] {
    const contaById = new Map<string, any>(contas.map(c => [c.id, c]));
    const corFallback: Record<string, string> = { BTG: CORES.btg, XP: CORES.xp, AVENUE: CORES.avenue, AGORA: CORES.agora };
    const fontes: FonteMeta[] = [];

    for (const def of API_DEFS) {
        const list = apiSnapshots[def.key] || [];
        // lista vem ordenada por data desc → 1º por conta_id é o mais recente
        const latestByConta = new Map<string, any>();
        for (const snap of list) {
            const cid = snap.conta_id ?? '__none__';
            if (!latestByConta.has(cid)) latestByConta.set(cid, snap);
        }
        if (latestByConta.size === 0) continue;

        const inst = instApiDb(def.base, instituicoesDb);
        const cor = inst?.cor_primaria || corFallback[def.base];
        const nomeBase = inst?.nome || def.nomeBase;
        const entries = Array.from(latestByConta.entries())
            .map(([cid, snap]) => {
                const conta = cid !== '__none__' ? contaById.get(cid) : null;
                return { cid: cid === '__none__' ? null : cid, snap, apelido: conta?.apelido ?? null, ordem: conta?.ordem ?? 1 };
            })
            .sort((a, b) => a.ordem - b.ordem);
        const multi = entries.length > 1;
        entries.forEach((e, i) => {
            const label = (e.apelido && e.apelido.trim()) || (multi ? `${nomeBase} ${i + 1}` : nomeBase);
            // BTG: a conta corrente já entra como ATIVO (CASH) → não somar saldo_cc
            // aqui senão duplica em "Conta Corrente / Outros". Mantém só o cripto,
            // que não vem como ativo no parser.
            const saldoOutros = def.base === 'BTG' ? (Number(e.snap?.saldo_cripto) || 0)
                              : def.base === 'XP'  ? (Number(e.snap?.saldo_coe) || 0) : 0;
            fontes.push({
                key: e.cid ? `CONTA:${e.cid}` : `CONTA:${def.base}`,
                grupoKey: def.base,
                baseInst: def.base, label, cor, contaId: e.cid,
                snapshot: e.snap, dataRef: e.snap?.data_referencia, ativosKey: def.ativosKey,
                saldoOutros,
            });
        });
    }

    // Manuais: mais recente POR CONTA (fallback por instituição se sem conta_id).
    const manualLatest = new Map<string, any>();
    (manualSnapshots || []).forEach((s: any) => {
        const k = s.conta_id ?? `inst:${s.instituicao}`;
        if (!manualLatest.has(k)) manualLatest.set(k, s);
    });
    // Agrupa por instituição para numerar "Inst 1 / Inst 2".
    const manualPorInst = new Map<string, any[]>();
    manualLatest.forEach((snap) => {
        const arr = manualPorInst.get(snap.instituicao) || [];
        arr.push(snap);
        manualPorInst.set(snap.instituicao, arr);
    });
    manualPorInst.forEach((snaps, inst) => {
        const cor = instituicoesDb.find(i => i.nome.toUpperCase() === inst.toUpperCase())?.cor_primaria || '#64748B';
        const ordenados = snaps
            .map((s: any) => ({ s, conta: s.conta_id ? contaById.get(s.conta_id) : null }))
            .sort((a, b) => (a.conta?.ordem ?? 1) - (b.conta?.ordem ?? 1));
        const multi = ordenados.length > 1;
        ordenados.forEach(({ s, conta }, i) => {
            const label = (conta?.apelido && conta.apelido.trim()) || (multi ? `${inst} ${i + 1}` : inst);
            fontes.push({
                key: s.conta_id ? `CONTA:${s.conta_id}` : `MANUAL:${inst}`,
                grupoKey: `MANUAL:${inst}`,
                baseInst: 'MANUAL', label, cor, contaId: s.conta_id ?? null,
                snapshot: s, dataRef: s.data_referencia, ativosKey: 'posicao_manual_ativos',
                saldoOutros: 0,
            });
        });
    });

    return fontes;
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

export function useHomeMetrics() {
    const { selectedClient, consultorPerfilId } = useClient();
    const { perfil } = useAuth();

    const [loading, setLoading] = useState(false);
    const [snapshotData, setSnapshotData] = useState<Record<'btg' | 'xp' | 'avenue' | 'agora', any[]>>({ btg: [], xp: [], avenue: [], agora: [] });
    const [contas, setContas] = useState<any[]>([]);

    const [canonicos, setCanonicos] = useState<AtivoCanonico[]>([]);
    const [emissores, setEmissores] = useState<Emissor[]>([]);
    const [conglomeradosDb, setConglomeradosDb] = useState<ConglomeradoDb[]>([]);
    const [manualSnapshots, setManualSnapshots] = useState<any[]>([]);
    const [classesMaster, setClassesMaster] = useState<ClasseMaster[]>([]);
    const [instituicoesDb, setInstituicoesDb] = useState<InstituicaoDb[]>([]);
    const [excecoes, setExcecoes] = useState<ExcecaoClassificacao[]>([]);
    const [liquidezSubtipo, setLiquidezSubtipo] = useState<any[]>([]);

    // Período: 'LIVE' (posição atual) ou 'YYYY-MM' (relatório fechado, read-only).
    const [periodo, setPeriodo] = useState<string>('LIVE');
    const [mesesFechados, setMesesFechados] = useState<string[]>([]);
    const [fechadoData, setFechadoData] = useState<{ fontes: FonteMeta[]; ativos: Map<string, ConsolidatedAtivo[]> } | null>(null);

    const [diasVencimento, setDiasVencimento] = useState(9999); // default: "Todos os Ativos"
    const [drawerCarteirasAberto, setDrawerCarteirasAberto] = useState(false);
    const [carteiraAtiva, setCarteiraAtiva] = useState<string>('CONSOLIDADA');
    const [carteirasPersonalizadas, setCarteirasPersonalizadas] = useState<CarteiraPersonalizada[]>([]);

    useEffect(() => {
        async function fetchLatestSnapshots() {
            if (!selectedClient?.id) return;
            setLoading(true);
            try {
                // Pagina tabelas globais (o Supabase corta cada request em 1000 linhas) —
                // mantém o shape {data,error}. Sem isto, com a base cheia os ativos além do
                // 1000º canônico ficavam SEM classe/taxa na Home.
                const selectAllRows = async (tabela: string, colunas: string) => {
                    const PAGE = 1000; const acc: any[] = [];
                    for (let from = 0; ; from += PAGE) {
                        const { data, error } = await supabase.from(tabela).select(colunas).range(from, from + PAGE - 1);
                        if (error) return { data: acc, error };
                        acc.push(...(data ?? []));
                        if (!data || data.length < PAGE) break;
                    }
                    return { data: acc, error: null };
                };

                // Índices fixos: 0=BTG, 1=XP, 2=Avenue, 3=Ágora, 4=canonicos, 5=emissores, 6=classes, 7=instituicoes
                // Índice 8 (opcional): excecoes
                const queries: any[] = [
                    // 0: BTG
                    supabase
                        .from('posicao_btg_snapshots')
                        .select(`
                            conta_id, patrimonio_total, data_referencia, saldo_cc, saldo_cripto,
                            posicao_btg_ativos (
                                id, ativo_canonico_id, emissor, sub_tipo, tipo, asset_class,
                                valor_liquido, valor_bruto, maturity_date, isin, ticker, fund_cnpj,
                                ir, quantidade, preco_mercado, rentabilidade, benchmark,
                                tax_free, is_liquidity, cetip_code, selic_code, issue_date, yield_avg, iof_tax,
                                posicao_btg_aquisicoes (
                                    acquisition_date, quantity, initial_investment_value, cost_price, gross_value, net_value, income_tax, yield_to_maturity, index_yield_rate
                                ),
                                posicao_btg_janelas_liquidez (
                                    type, from_date, to_date
                                )
                            )
                        `)
                        .eq('cliente_id', selectedClient.id)
                        .order('data_referencia', { ascending: false }),

                    // 1: XP
                    supabase
                        .from('posicao_xp_snapshots')
                        .select(`
                            conta_id, patrimonio_total, patrimonio_total_liquido, data_referencia, saldo_coe,
                            posicao_xp_ativos (
                                id, ativo_canonico_id, nome, sub_tipo, tipo, asset_class,
                                codigo_ativo, isin, ticker, cnpj, emissor,
                                valor_aplicado, valor_bruto, valor_liquido,
                                valor_imposto_renda, valor_iof, valor_rendimento,
                                is_isento_ir, resultado, resultado_percentual,
                                quantidade, preco_unitario, preco_medio, valor_cota, quantidade_cotas,
                                indexador, percentual_indexador, benchmark,
                                data_vencimento, data_aplicacao, data_adesao, data_posicao,
                                periodo_cotizacao, periodo_liquidacao,
                                cenario_base, cenario_pessimista, barreira_crescimento, tipo_certificado,
                                is_liquidity
                            )
                        `)
                        .eq('cliente_id', selectedClient.id)
                        .order('data_referencia', { ascending: false }),

                    // 2: Avenue
                    supabase
                        .from('posicao_avenue_snapshots')
                        .select(`
                            conta_id, patrimonio_total, data_referencia,
                            posicao_avenue_ativos (
                                id, ativo_canonico_id, asset_class, tipo, sub_tipo, nome, ticker,
                                cusip, isin, product_type, office_name,
                                valor_bruto_brl, valor_bruto_usd, quantidade, maturity_date, is_liquidity
                            )
                        `)
                        .eq('cliente_id', selectedClient.id)
                        .order('data_referencia', { ascending: false }),

                    // 3: Ágora
                    supabase
                        .from('posicao_agora_snapshots')
                        .select(`
                            conta_id, patrimonio_total, data_referencia,
                            posicao_agora_ativos (
                                id, ativo_canonico_id, tipo, sub_tipo, asset_class, instrument_type,
                                emissor, ticker, security_code,
                                valor_bruto, valor_liquido, custo, custo_total,
                                quantidade, preco_mercado, preco_unitario,
                                percentual_patrimonio, valorizacao_reais, valorizacao_pct,
                                taxa, taxa_percentual, indexer_percentual,
                                valorizacao, percent_valorizacao,
                                ir_valor, iof_valor, ir_descricao, ir_percentual,
                                data_vencimento, data_aplicacao, liquidez_diaria,
                                posicao_agora_aquisicoes (
                                    tipo_aquisicao, application_date, reference_date,
                                    quantity, gross_value, net_value, ir_value, iof_value,
                                    operation_status, purchase_price, market_price, profit_value,
                                    tax_rate, days, market_type, issuer_name, bond_name, index_name
                                )
                            )
                        `)
                        .eq('cliente_id', selectedClient.id)
                        .order('data_referencia', { ascending: false }),

                    // 4, 5, 6, 7: Infraestrutura
                    selectAllRows('ativos_canonicos', 'id, nome_canonico, classe_avere, liquidez_avere, emissor_id, conglomerado_id, data_vencimento, taxa_canonica, benchmark_canonico, sub_tipo_canonico, is_fii, is_coe'),
                    selectAllRows('dicionario_emissores', 'id, nome_fantasia, cnpj_raiz, setor_id, setores(nome, cor_hex)'),
                    supabase.from('dicionario_classes').select('*').order('ordem_exibicao'),
                    supabase.from('instituicoes').select('*'),
                    // 8: Conglomerados (com porte) p/ visão de crédito bancário FGC
                    selectAllRows('dicionario_conglomerados', 'id, nome_lider, porte'),
                    // 9: Posições manuais (todas instituições/datas do cliente; latest por instituição é escolhido no metrics)
                    supabase
                        .from('posicao_manual_snapshots')
                        .select(`
                            id, conta_id, instituicao, data_referencia, patrimonio_total,
                            saldo_cc, saldo_rf, saldo_fundos, saldo_rv, saldo_prev, saldo_cripto, saldo_outros,
                            posicao_manual_ativos (
                                id, ativo_canonico_id, asset_class, tipo, sub_tipo, emissor, cnpj, ticker, isin,
                                valor_bruto, valor_liquido, quantidade, preco_mercado,
                                data_vencimento, data_aplicacao, benchmark, rentabilidade, yield_avg
                            )
                        `)
                        .eq('cliente_id', selectedClient.id)
                        .order('data_referencia', { ascending: false }),
                ];

                // 10: Exceções pela LENTE DO HEADER (consultor selecionado no topo).
                // Consultor específico → aplica as exceções dele; 'Todos' → consultorPerfilId
                // é null → nenhuma exceção → visão master/genérica do cliente.
                if (consultorPerfilId) {
                    queries.push(supabase.from('excecoes_classificacao').select('*').eq('consultor_id', consultorPerfilId));
                }

                const results = await Promise.all(queries);

                setSnapshotData({
                    btg: results[0].data ?? [], xp: results[1].data ?? [],
                    avenue: results[2].data ?? [], agora: results[3].data ?? [],
                });

                // Contas do cliente (para rotular as fontes: XP 1 / XP 2, apelidos…)
                const { data: contasData } = await supabase
                    .from('cliente_contas')
                    .select('id, instituicao_id, apelido, ordem')
                    .eq('cliente_id', selectedClient.id)
                    .order('ordem', { ascending: true });
                setContas(contasData ?? []);

                // Liquidez padrão por subtipo (global + override do consultor da lente)
                const { data: liqSubData } = await supabase
                    .from('liquidez_subtipo')
                    .select('consultor_id, sub_tipo, liquidez_dias, padronizar')
                    .or(consultorPerfilId ? `consultor_id.is.null,consultor_id.eq.${consultorPerfilId}` : 'consultor_id.is.null');
                setLiquidezSubtipo(liqSubData ?? []);

                if (results[4].data) setCanonicos(results[4].data);
                if (results[5].data) setEmissores(results[5].data.map((r: any) => ({
                    id: r.id,
                    nome_fantasia: r.nome_fantasia,
                    cnpj_raiz: r.cnpj_raiz,
                    setor: r.setores?.nome ?? '',
                    setorCor: r.setores?.cor_hex ?? null,
                })));
                if (results[6].data) setClassesMaster(results[6].data);
                if (results[7].data) setInstituicoesDb(results[7].data);
                if (results[8].data) setConglomeradosDb(results[8].data);
                if (results[9].data) setManualSnapshots(results[9].data);
                setExcecoes(results[10]?.data ?? []);

                setCarteiraAtiva('CONSOLIDADA');
            } catch (err) {
                console.error('Erro na carga da Home:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchLatestSnapshots();
    }, [selectedClient?.id, consultorPerfilId, perfil?.id]);

    useEffect(() => {
        async function fetchCarteirasPersonalizadas() {
            if (!selectedClient?.id) return;
            const { data } = await supabase.from('carteiras_personalizadas').select('id, nome, instituicoes, criada_em').eq('cliente_id', selectedClient.id).order('criada_em', { ascending: true });
            if (data) setCarteirasPersonalizadas(data);
        }
        fetchCarteirasPersonalizadas();
    }, [selectedClient?.id, drawerCarteirasAberto]);

    // Ao trocar de cliente, volta para a posição atual (e carteira consolidada).
    useEffect(() => { setPeriodo('LIVE'); setCarteiraAtiva('CONSOLIDADA'); }, [selectedClient?.id]);

    // Lista de meses com fechamento (para o seletor de período).
    useEffect(() => {
        async function fetchMeses() {
            if (!selectedClient?.id) { setMesesFechados([]); return; }
            const { data } = await supabase.from('snapshots_fechados').select('mes_referencia').eq('cliente_id', selectedClient.id);
            const meses = Array.from(new Set((data ?? []).map((r: any) => r.mes_referencia as string))).sort().reverse();
            setMesesFechados(meses);
        }
        fetchMeses();
    }, [selectedClient?.id]);

    // Carga do relatório fechado do mês selecionado (read-only).
    useEffect(() => {
        async function fetchFechado() {
            if (periodo === 'LIVE' || !selectedClient?.id) { setFechadoData(null); return; }
            setLoading(true);
            try {
                const { data } = await supabase
                    .from('snapshots_fechados')
                    .select('id, conta_id, instituicao, data_referencia, patrimonio_total, saldo_caixa_outros, posicoes_fechadas(*)')
                    .eq('cliente_id', selectedClient.id)
                    .eq('mes_referencia', periodo);
                setFechadoData(montarFechado(data ?? [], contas, instituicoesDb));
            } catch (err) {
                console.error('Erro ao carregar relatório fechado:', err);
                setFechadoData(null);
            } finally {
                setLoading(false);
            }
        }
        fetchFechado();
    }, [periodo, selectedClient?.id, contas, instituicoesDb]);

    const opcoesCarteira = useMemo(() => {
        const fontes = montarFontesMeta(snapshotData, contas, manualSnapshots, instituicoesDb);
        return [
            { label: 'Consolidada', value: 'CONSOLIDADA' },
            ...fontes.map(f => ({ label: f.label, value: f.key })),
            ...carteirasPersonalizadas.map(c => ({ label: c.nome, value: c.id })),
        ];
    }, [snapshotData, contas, manualSnapshots, instituicoesDb, carteirasPersonalizadas]);

    // Nomes distintos das instituições manuais (p/ montar carteiras personalizadas)
    const instituicoesManuais = useMemo(
        () => Array.from(new Set((manualSnapshots || []).map((s: any) => s.instituicao))) as string[],
        [manualSnapshots],
    );

    const metrics = useMemo(() => {
        // ── Maps de resolução ────────────────────────────────────────────────
        const canonicoMap = new Map<string, AtivoCanonico>();
        canonicos.forEach(c => canonicoMap.set(c.id, c));

        const excecaoGlobalMap = new Map<string, ExcecaoClassificacao>();
        const excecaoClienteMap = new Map<string, ExcecaoClassificacao>();
        excecoes.forEach(e => {
            if (!e.ativo_canonico_id) return;
            if (e.cliente_id === null || e.cliente_id === undefined) excecaoGlobalMap.set(e.ativo_canonico_id, e);
            else if (e.cliente_id === selectedClient?.id) excecaoClienteMap.set(e.ativo_canonico_id, e);
        });

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

        // ── Relatório FECHADO (read-only): classificação já carimbada, sem lente ──
        if (periodo !== 'LIVE') {
            if (!fechadoData) return computeMetrics({ fontesIncluidas: [], fontesTodas: [], ativosPorFonte: new Map(), emissores, emissorMap, conglomeradoMap, colorMap, orderMap, diasVencimento });
            const personalizadaF = carteirasPersonalizadas.find(c => c.id === carteiraAtiva);
            const fontesIncluidasF = filtrarFontes(fechadoData.fontes, carteiraAtiva, personalizadaF);
            const ativosPorFonteF = new Map<string, ConsolidatedAtivo[]>();
            fontesIncluidasF.forEach(f => ativosPorFonteF.set(f.key, fechadoData.ativos.get(f.key) || []));
            return computeMetrics({ fontesIncluidas: fontesIncluidasF, fontesTodas: fechadoData.fontes, ativosPorFonte: ativosPorFonteF, emissores, emissorMap, conglomeradoMap, colorMap, orderMap, diasVencimento });
        }

        // ── Resolução canônico + exceções (lookup O(1)) ──────────────────────
        // Padronização de liquidez por subtipo (consultor override > global).
        const subtipoLiqMap = new Map<string, { padronizar: boolean; dias: number | null }>();
        liquidezSubtipo.filter((r: any) => !r.consultor_id).forEach((r: any) =>
            subtipoLiqMap.set((r.sub_tipo || '').toUpperCase().trim(), { padronizar: !!r.padronizar, dias: r.liquidez_dias }));
        liquidezSubtipo.filter((r: any) => r.consultor_id === consultorPerfilId).forEach((r: any) =>
            subtipoLiqMap.set((r.sub_tipo || '').toUpperCase().trim(), { padronizar: !!r.padronizar, dias: r.liquidez_dias }));

        const classificar = (ativoCanonicoId: string | null | undefined) => {
            if (!ativoCanonicoId) {
                return { classe: 'Classificar', liquidez: null, liquidezCustomizada: null, apelido: null, emissorId: null, conglomeradoId: null, vencimento: null, taxa: null, subTipo: null, benchmark: null };
            }
            const canonico = canonicoMap.get(ativoCanonicoId) ?? null;
            const eCliente = excecaoClienteMap.get(ativoCanonicoId);
            const eGlobal  = excecaoGlobalMap.get(ativoCanonicoId);
            return {
                classe:     eCliente?.classe_customizada     ?? eGlobal?.classe_customizada     ?? canonico?.classe_avere       ?? 'Classificar',
                liquidez:   eCliente?.liquidez_customizada   ?? eGlobal?.liquidez_customizada   ?? canonico?.liquidez_avere     ?? null,
                liquidezCustomizada: eCliente?.liquidez_customizada ?? eGlobal?.liquidez_customizada ?? null,
                apelido:    eCliente?.apelido_ativo           ?? eGlobal?.apelido_ativo           ?? null,
                emissorId:  eCliente?.emissor_customizado_id  ?? eGlobal?.emissor_customizado_id  ?? canonico?.emissor_id         ?? null,
                conglomeradoId: canonico?.conglomerado_id ?? null,
                vencimento: eCliente?.vencimento_customizado  ?? eGlobal?.vencimento_customizado  ?? canonico?.data_vencimento    ?? null,
                taxa:       canonico?.taxa_canonica ?? null,
                subTipo:    canonico?.sub_tipo_canonico ?? null,
                benchmark:  canonico?.benchmark_canonico ?? null,
            };
        };

        const isCash = (a: any) => a?.asset_class === 'CASH';
        const classeComFallback = (a: any, cls: any) => (isCash(a) && cls.classe === 'Classificar') ? 'Conta Corrente' : cls.classe;
        const liquidezComFallback = (a: any, cls: any) => (isCash(a) && !cls.liquidez) ? '0' : cls.liquidez;
        const naoZerado = (a: ConsolidatedAtivo) => (a.valorLiquido && a.valorLiquido > 0) || (a.valorBruto && a.valorBruto > 0);

        // Liquidez efetiva (alimenta só o gráfico de liquidez):
        //   exceção per-ativo > padronização por subtipo > dias até o vencimento > D+ atual.
        // Para renda fixa com vencimento, o D+ é os dias até a DATA de vencimento, calculados
        // a cada render — a data é a verdade durável; o liquidez_avere do sync fica congelado
        // no 1º sync (ignoreDuplicates) e drifta, então não o usamos quando há vencimento.
        const resolverLiquidez = (at: ConsolidatedAtivo, a: any, cls: any): string | null => {
            if (cls.liquidezCustomizada != null && cls.liquidezCustomizada !== '') return String(cls.liquidezCustomizada);
            const venc = cls.vencimento || a.maturity_date || a.data_vencimento;
            if (venc) {
                const st = (cls.subTipo ?? a.sub_tipo ?? '').toUpperCase().trim();
                const cfg = subtipoLiqMap.get(st);
                if (cfg?.padronizar && cfg.dias != null) return String(cfg.dias);
                const dias = diasAteVencimento(venc);
                if (dias != null) return String(Math.max(0, dias));
            }
            return at.liquidez ?? null;
        };

        // ── Parser de ativos por base de instituição (instituicao = rótulo da fonte) ──
        const parseFonteAtivos = (f: FonteMeta): ConsolidatedAtivo[] => {
            const list = f.snapshot?.[f.ativosKey] || [];
            const out: ConsolidatedAtivo[] = [];
            list.forEach((a: any, i: number) => {
                const cls = classificar(a.ativo_canonico_id);
                const at: ConsolidatedAtivo = {
                    rowId: `${f.key}-${i}`,
                    nome: cls.apelido || a.emissor || a.nome || '-',
                    tipo: classeComFallback(a, cls),
                    subTipo: cls.subTipo ?? a.sub_tipo,
                    valorLiquido: 0,
                    valorBruto: 0,
                    vencimento: cls.vencimento || a.maturity_date || a.data_vencimento,
                    instituicao: f.label,
                    instituicaoBase: f.baseInst,
                    emissorId: cls.emissorId,
                    conglomeradoId: cls.conglomeradoId,
                    ativoCanonicoId: a.ativo_canonico_id,
                    liquidez: liquidezComFallback(a, cls),
                    rawData: a,
                    benchmark: cls.benchmark || '-',
                    taxa: cls.taxa,
                };
                if (f.baseInst === 'BTG') {
                    at.nome = cls.apelido || a.emissor || '-';
                    at.valorLiquido = parseFloat(a.valor_liquido || 0);
                    at.valorBruto = parseFloat(a.valor_bruto || 0);
                } else if (f.baseInst === 'XP') {
                    at.nome = cls.apelido || a.nome || a.emissor || '-';
                    at.valorLiquido = parseFloat(a.valor_liquido || 0);
                    at.valorBruto = parseFloat(a.valor_bruto || 0);
                } else if (f.baseInst === 'AVENUE') {
                    at.nome = cls.apelido || a.nome || '-';
                    at.valorLiquido = parseFloat(a.valor_bruto_brl || 0);
                    at.valorBruto = parseFloat(a.valor_bruto_brl || 0);
                    at.liquidez = a.is_liquidity ? '0' : liquidezComFallback(a, cls);
                    at.benchmark = '-';
                } else if (f.baseInst === 'AGORA') {
                    at.nome = cls.apelido || a.emissor || '-';
                    at.valorLiquido = parseFloat(a.valor_liquido || 0);
                    at.valorBruto = parseFloat(a.valor_bruto || 0);
                } else { // MANUAL
                    at.nome = cls.apelido || a.emissor || '-';
                    at.valorLiquido = parseFloat(a.valor_liquido ?? a.valor_bruto ?? 0);
                    at.valorBruto = parseFloat(a.valor_bruto || 0);
                    // Sem canônico = Camada 1: exibe o dado RASO da própria linha (ex.: o
                    // benchmark "IPCA" que a IA extraiu) e marca como NÃO VERIFICADO. Com
                    // canônico = Camada 2: já herdou o global acima. Ver posicao-manual-politica.
                    if (!a.ativo_canonico_id) {
                        at.benchmark = a.benchmark || '-';
                        at.naoVerificado = true;
                    }
                }
                at.liquidez = resolverLiquidez(at, a, cls);
                if (naoZerado(at)) out.push(at);
            });
            return out;
        };

        // ── Fontes VIVAS (carteiras) + filtro pela carteira ativa ────────────
        const fontes = montarFontesMeta(snapshotData, contas, manualSnapshots, instituicoesDb);
        const personalizada = carteirasPersonalizadas.find(c => c.id === carteiraAtiva);
        const fontesIncluidas = filtrarFontes(fontes, carteiraAtiva, personalizada);

        const ativosPorFonte = new Map<string, ConsolidatedAtivo[]>();
        fontesIncluidas.forEach(f => ativosPorFonte.set(f.key, parseFonteAtivos(f)));

        return computeMetrics({ fontesIncluidas, fontesTodas: fontes, ativosPorFonte, emissores, emissorMap, conglomeradoMap, colorMap, orderMap, diasVencimento });
    }, [periodo, fechadoData, snapshotData, contas, manualSnapshots, liquidezSubtipo, consultorPerfilId, diasVencimento, carteiraAtiva, carteirasPersonalizadas, canonicos, emissores, conglomeradosDb, classesMaster, instituicoesDb, excecoes, selectedClient]);

    return { selectedClient, loading, metrics, snapshotData, diasVencimento, setDiasVencimento, drawerCarteirasAberto, setDrawerCarteirasAberto, carteiraAtiva, setCarteiraAtiva, opcoesCarteira, instituicoesManuais, periodo, setPeriodo, mesesFechados };
}
