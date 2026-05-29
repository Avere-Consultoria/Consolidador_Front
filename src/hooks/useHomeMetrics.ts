import { useState, useEffect, useMemo } from 'react';
import { useClient } from '../contexts/ClientContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { pct, formatarTaxa } from '../utils/formatters';
import { CORES } from '../utils/colors';

export interface ConsolidatedAtivo {
    rowId: string;
    nome: string;
    tipo: string;
    subTipo?: string;
    valorLiquido: number;
    valorBruto?: number;
    vencimento?: string | null;
    instituicao: 'BTG Pactual' | 'XP Investimentos' | 'Avenue' | 'Ágora';
    emissorId?: string | null;
    ativoCanonicoId?: string | null;
    liquidez?: string | null;
    rawData?: any;
    benchmark?: string | null;
    taxa?: string | null;
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
}

interface ClasseMaster {
    nome: string;
    cor_hex: string;
    ordem_exibicao: number;
}

interface InstituicaoDb {
    nome: string;
    cor_primaria: string;
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
        raw[a.emissorId].valor += a.valorLiquido;
    });
    return Object.values(raw)
        .map(e => ({ name: e.nome, setor: e.setor, value: e.valor, pct: pct(e.valor, patrimonioTotal) }))
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
        map[liqKey] = (map[liqKey] || 0) + a.valorLiquido;
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

function buildComparativoData(
    btgClasses: Record<string, number>,
    xpClasses: Record<string, number>,
    avenueClasses: Record<string, number>,
    agoraClasses: Record<string, number>,
    colorMap: Map<string, string>,
    orderMap: Map<string, number>,
    corBtg: string,
    corXp: string,
    corAvenue: string,
    corAgora: string,
) {
    const todasAsClasses = Array.from(new Set([
        ...Object.keys(btgClasses),
        ...Object.keys(xpClasses),
        ...Object.keys(avenueClasses),
        ...Object.keys(agoraClasses),
    ]));
    return todasAsClasses
        .map(name => {
            const key = name.trim().toUpperCase();
            return {
                name,
                BTG: btgClasses[name] || 0,
                XP: xpClasses[name] || 0,
                AVENUE: avenueClasses[name] || 0,
                AGORA: agoraClasses[name] || 0,
                ordem: orderMap.get(key) || 999,
                cor_classe: resolveCorClasse(key, colorMap),
                cor_btg: corBtg,
                cor_xp: corXp,
                cor_avenue: corAvenue,
                cor_agora: corAgora,
            };
        })
        .filter(d => d.BTG > 0 || d.XP > 0 || d.AVENUE > 0 || d.AGORA > 0)
        .sort((a, b) => a.ordem - b.ordem);
}

export function useHomeMetrics() {
    const { selectedClient } = useClient();
    const { perfil } = useAuth();

    const [loading, setLoading] = useState(false);
    const [snapshotData, setSnapshotData] = useState<{ btg: any; xp: any; avenue: any; agora: any }>({ btg: null, xp: null, avenue: null, agora: null });

    const [canonicos, setCanonicos] = useState<AtivoCanonico[]>([]);
    const [emissores, setEmissores] = useState<Emissor[]>([]);
    const [classesMaster, setClassesMaster] = useState<ClasseMaster[]>([]);
    const [instituicoesDb, setInstituicoesDb] = useState<InstituicaoDb[]>([]);
    const [excecoes, setExcecoes] = useState<ExcecaoClassificacao[]>([]);

    const [diasVencimento, setDiasVencimento] = useState(30);
    const [drawerCarteirasAberto, setDrawerCarteirasAberto] = useState(false);
    const [carteiraAtiva, setCarteiraAtiva] = useState<string>('CONSOLIDADA');
    const [carteirasPersonalizadas, setCarteirasPersonalizadas] = useState<CarteiraPersonalizada[]>([]);

    useEffect(() => {
        async function fetchLatestSnapshots() {
            if (!selectedClient?.id) return;
            setLoading(true);
            try {
                // Índices fixos: 0=BTG, 1=XP, 2=Avenue, 3=Ágora, 4=canonicos, 5=emissores, 6=classes, 7=instituicoes
                // Índice 8 (opcional): excecoes
                const queries: any[] = [
                    // 0: BTG
                    supabase
                        .from('posicao_btg_snapshots')
                        .select(`
                            patrimonio_total, data_referencia, saldo_cc, saldo_cripto,
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
                        .order('data_referencia', { ascending: false })
                        .limit(1)
                        .maybeSingle(),

                    // 1: XP
                    supabase
                        .from('posicao_xp_snapshots')
                        .select(`
                            patrimonio_total, patrimonio_total_liquido, data_referencia, saldo_coe,
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
                        .order('data_referencia', { ascending: false })
                        .limit(1)
                        .maybeSingle(),

                    // 2: Avenue
                    supabase
                        .from('posicao_avenue_snapshots')
                        .select(`
                            patrimonio_total, data_referencia,
                            posicao_avenue_ativos (
                                id, ativo_canonico_id, asset_class, tipo, sub_tipo, nome, ticker,
                                cusip, isin, product_type, office_name,
                                valor_bruto_brl, valor_bruto_usd, quantidade, maturity_date, is_liquidity
                            )
                        `)
                        .eq('cliente_id', selectedClient.id)
                        .order('data_referencia', { ascending: false })
                        .limit(1)
                        .maybeSingle(),

                    // 3: Ágora
                    supabase
                        .from('posicao_agora_snapshots')
                        .select(`
                            patrimonio_total, data_referencia,
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
                        .order('data_referencia', { ascending: false })
                        .limit(1)
                        .maybeSingle(),

                    // 4, 5, 6, 7: Infraestrutura
                    supabase.from('ativos_canonicos').select('id, nome_canonico, classe_avere, liquidez_avere, emissor_id, data_vencimento, taxa_canonica, benchmark_canonico, sub_tipo_canonico, is_fii, is_coe'),
                    supabase.from('dicionario_emissores').select('id, nome_fantasia, setor'),
                    supabase.from('dicionario_classes').select('*').order('ordem_exibicao'),
                    supabase.from('instituicoes').select('*'),
                ];

                // 8: Exceções do consultor (opcional)
                if (perfil?.id) {
                    queries.push(supabase.from('excecoes_classificacao').select('*').eq('consultor_id', perfil.id));
                }

                const results = await Promise.all(queries);

                setSnapshotData({ btg: results[0].data, xp: results[1].data, avenue: results[2].data, agora: results[3].data });

                if (results[4].data) setCanonicos(results[4].data);
                if (results[5].data) setEmissores(results[5].data);
                if (results[6].data) setClassesMaster(results[6].data);
                if (results[7].data) setInstituicoesDb(results[7].data);
                if (perfil?.id && results[8]?.data) setExcecoes(results[8].data);

                setCarteiraAtiva('CONSOLIDADA');
            } catch (err) {
                console.error('Erro na carga da Home:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchLatestSnapshots();
    }, [selectedClient?.id, perfil?.id]);

    useEffect(() => {
        async function fetchCarteirasPersonalizadas() {
            if (!selectedClient?.id) return;
            const { data } = await supabase.from('carteiras_personalizadas').select('id, nome, instituicoes, criada_em').eq('cliente_id', selectedClient.id).order('criada_em', { ascending: true });
            if (data) setCarteirasPersonalizadas(data);
        }
        fetchCarteirasPersonalizadas();
    }, [selectedClient?.id, drawerCarteirasAberto]);

    const opcoesCarteira = useMemo(() => {
        const bases = [
            { label: 'Consolidada', value: 'CONSOLIDADA' },
            ...(snapshotData.btg ? [{ label: 'BTG Pactual', value: 'BTG' }] : []),
            ...(snapshotData.xp ? [{ label: 'XP Investimentos', value: 'XP' }] : []),
            ...(snapshotData.avenue ? [{ label: 'Avenue', value: 'AVENUE' }] : []),
            ...(snapshotData.agora ? [{ label: 'Ágora', value: 'AGORA' }] : []),
        ];
        return [...bases, ...carteirasPersonalizadas.map(c => ({ label: c.nome, value: c.id }))];
    }, [snapshotData, carteirasPersonalizadas]);

    const metrics = useMemo(() => {
        let incluirBtg = true, incluirXp = true, incluirAvenue = true, incluirAgora = true;
        if (carteiraAtiva === 'BTG') { incluirXp = false; incluirAvenue = false; incluirAgora = false; }
        if (carteiraAtiva === 'XP') { incluirBtg = false; incluirAvenue = false; incluirAgora = false; }
        if (carteiraAtiva === 'AVENUE') { incluirBtg = false; incluirXp = false; incluirAgora = false; }
        if (carteiraAtiva === 'AGORA') { incluirBtg = false; incluirXp = false; incluirAvenue = false; }

        const personalizada = carteirasPersonalizadas.find(c => c.id === carteiraAtiva);
        if (personalizada) {
            incluirBtg = personalizada.instituicoes.includes('BTG');
            incluirXp = personalizada.instituicoes.includes('XP');
            incluirAvenue = personalizada.instituicoes.includes('AVENUE');
            incluirAgora = personalizada.instituicoes.includes('AGORA');
        }

        const btgTotal = incluirBtg ? parseFloat(snapshotData.btg?.patrimonio_total || 0) : 0;
        const xpTotal = incluirXp ? parseFloat(snapshotData.xp?.patrimonio_total || 0) : 0;
        const avenueTotal = incluirAvenue ? parseFloat(snapshotData.avenue?.patrimonio_total || 0) : 0;
        const agoraTotal = incluirAgora ? parseFloat(snapshotData.agora?.patrimonio_total || 0) : 0;
        const patrimonioTotal = btgTotal + xpTotal + avenueTotal + agoraTotal;

        // ── Maps de resolução ────────────────────────────────────────────────
        const canonicoMap = new Map<string, AtivoCanonico>();
        canonicos.forEach(c => canonicoMap.set(c.id, c));

        const excecaoGlobalMap = new Map<string, ExcecaoClassificacao>();
        const excecaoClienteMap = new Map<string, ExcecaoClassificacao>();
        excecoes.forEach(e => {
            if (!e.ativo_canonico_id) return;
            if (e.cliente_id === null || e.cliente_id === undefined) {
                excecaoGlobalMap.set(e.ativo_canonico_id, e);
            } else if (e.cliente_id === selectedClient?.id) {
                excecaoClienteMap.set(e.ativo_canonico_id, e);
            }
        });

        const emissorMap = new Map<string, Emissor>();
        emissores.forEach(e => emissorMap.set(e.id, e));

        // ── Cores ───────────────────────────────────────────────────────────
        const colorMap = new Map();
        const orderMap = new Map();
        classesMaster.forEach(c => {
            const keyFormatada = c.nome.trim().toUpperCase();
            colorMap.set(keyFormatada, c.cor_hex);
            orderMap.set(keyFormatada, c.ordem_exibicao);
        });

        const corBtgDb = instituicoesDb.find(i => i.nome.toUpperCase().includes('BTG'))?.cor_primaria || CORES.btg;
        const corXpDb = instituicoesDb.find(i => i.nome.toUpperCase().includes('XP'))?.cor_primaria || CORES.xp;
        const corAvenueDb = instituicoesDb.find(i => i.nome.toUpperCase().includes('AVENUE'))?.cor_primaria || CORES.avenue;
        const corAgoraDb = instituicoesDb.find(i => i.nome.toUpperCase().includes('AGORA') || i.nome.toUpperCase().includes('ÁGORA'))?.cor_primaria || CORES.agora;

        // ── Resolução canônico + exceções (lookup O(1)) ──────────────────────
        const classificar = (ativoCanonicoId: string | null | undefined) => {
            if (!ativoCanonicoId) {
                return { classe: 'Classificar', liquidez: null, apelido: null, emissorId: null, vencimento: null, taxa: null, subTipo: null };
            }
            const canonico = canonicoMap.get(ativoCanonicoId) ?? null;
            const eCliente = excecaoClienteMap.get(ativoCanonicoId);
            const eGlobal  = excecaoGlobalMap.get(ativoCanonicoId);

            return {
                classe:     eCliente?.classe_customizada     ?? eGlobal?.classe_customizada     ?? canonico?.classe_avere       ?? 'Classificar',
                liquidez:   eCliente?.liquidez_customizada   ?? eGlobal?.liquidez_customizada   ?? canonico?.liquidez_avere     ?? null,
                apelido:    eCliente?.apelido_ativo           ?? eGlobal?.apelido_ativo           ?? null,
                emissorId:  eCliente?.emissor_customizado_id  ?? eGlobal?.emissor_customizado_id  ?? canonico?.emissor_id         ?? null,
                vencimento: eCliente?.vencimento_customizado  ?? eGlobal?.vencimento_customizado  ?? canonico?.data_vencimento    ?? null,
                taxa:       canonico?.taxa_canonica ?? null,
                subTipo:    canonico?.sub_tipo_canonico ?? null,
            };
        };

        // ── Mapeamento de ativos por instituição ─────────────────────────────
        // Helper: ativos CASH (Conta Corrente) sem canônico → auto-classifica
        const isCash = (a: any) => a?.asset_class === 'CASH';
        const classeComFallback = (a: any, cls: any) =>
            (isCash(a) && cls.classe === 'Classificar') ? 'Conta Corrente' : cls.classe;
        const liquidezComFallback = (a: any, cls: any) =>
            (isCash(a) && !cls.liquidez) ? '0' : cls.liquidez;
        // Esconde ativos zerados (valor bruto e líquido = 0)
        const naoZerado = (a: ConsolidatedAtivo) =>
            (a.valorLiquido && a.valorLiquido > 0) || (a.valorBruto && a.valorBruto > 0);

        const btgAtivos: ConsolidatedAtivo[] = incluirBtg ? (snapshotData.btg?.posicao_btg_ativos || []).map((a: any, i: number) => {
            const cls = classificar(a.ativo_canonico_id);
            return {
                rowId: `btg-${i}`,
                nome: cls.apelido || a.emissor || '-',
                tipo: classeComFallback(a, cls),
                subTipo: cls.subTipo ?? a.sub_tipo,
                valorLiquido: parseFloat(a.valor_liquido || 0),
                valorBruto: parseFloat(a.valor_bruto || 0),
                vencimento: cls.vencimento || a.maturity_date,
                instituicao: 'BTG Pactual',
                emissorId: cls.emissorId,
                ativoCanonicoId: a.ativo_canonico_id,
                liquidez: liquidezComFallback(a, cls),
                rawData: a,
                benchmark: a.benchmark || '-',
                taxa: formatarTaxa(a.rentabilidade, a.benchmark, a.yield_avg) || cls.taxa,
            };
        }).filter(naoZerado) : [];

        const xpAtivos: ConsolidatedAtivo[] = incluirXp ? (snapshotData.xp?.posicao_xp_ativos || []).map((a: any, i: number) => {
            const cls = classificar(a.ativo_canonico_id);
            return {
                rowId: `xp-${i}`,
                nome: cls.apelido || a.nome || a.emissor || '-',
                tipo: classeComFallback(a, cls),
                subTipo: cls.subTipo ?? a.sub_tipo,
                valorLiquido: parseFloat(a.valor_liquido || 0),
                valorBruto: parseFloat(a.valor_bruto || 0),
                vencimento: cls.vencimento || a.data_vencimento,
                instituicao: 'XP Investimentos',
                emissorId: cls.emissorId,
                ativoCanonicoId: a.ativo_canonico_id,
                liquidez: liquidezComFallback(a, cls),
                rawData: a,
                benchmark: a.benchmark || '-',
                taxa: cls.taxa,
            };
        }).filter(naoZerado) : [];

        const avenueAtivos: ConsolidatedAtivo[] = incluirAvenue
            ? (snapshotData.avenue?.posicao_avenue_ativos || []).map((a: any, i: number) => {
                const cls = classificar(a.ativo_canonico_id);
                return {
                    rowId: `avenue-${i}`,
                    nome: cls.apelido || a.nome || '-',
                    tipo: classeComFallback(a, cls),
                    subTipo: cls.subTipo ?? a.sub_tipo,
                    valorLiquido: parseFloat(a.valor_bruto_brl || 0),
                    valorBruto: parseFloat(a.valor_bruto_brl || 0),
                    vencimento: cls.vencimento || a.maturity_date,
                    instituicao: 'Avenue' as const,
                    emissorId: cls.emissorId,
                    ativoCanonicoId: a.ativo_canonico_id,
                    liquidez: a.is_liquidity ? '0' : liquidezComFallback(a, cls),
                    rawData: a,
                    benchmark: '-',
                    taxa: cls.taxa,
                };
            }).filter(naoZerado) : [];

        const agoraAtivos: ConsolidatedAtivo[] = incluirAgora
            ? (snapshotData.agora?.posicao_agora_ativos || []).map((a: any, i: number) => {
                const cls = classificar(a.ativo_canonico_id);
                return {
                    rowId: `agora-${i}`,
                    nome: cls.apelido || a.emissor || '-',
                    tipo: classeComFallback(a, cls),
                    subTipo: cls.subTipo ?? a.sub_tipo,
                    valorLiquido: parseFloat(a.valor_liquido || 0),
                    valorBruto: parseFloat(a.valor_bruto || 0),
                    vencimento: cls.vencimento || a.data_vencimento,
                    instituicao: 'Ágora' as const,
                    emissorId: cls.emissorId,
                    ativoCanonicoId: a.ativo_canonico_id,
                    liquidez: liquidezComFallback(a, cls),
                    rawData: a,
                    benchmark: '-',
                    taxa: a.taxa || cls.taxa || null,
                };
            }).filter(naoZerado) : [];

        const totalAtivos = [...btgAtivos, ...xpAtivos, ...avenueAtivos, ...agoraAtivos];

        const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
        const limiteData = new Date(); limiteData.setDate(hoje.getDate() + diasVencimento);
        const vencimentosProx = totalAtivos.filter(a => {
            if (!a.vencimento) return false;
            const d = new Date(a.vencimento);
            return d > hoje && (diasVencimento === 9999 || d <= limiteData);
        });

        const todosAtivos = [...totalAtivos].sort((a, b) => b.valorLiquido - a.valorLiquido);

        const exposicaoRiscoData = buildExposicaoRisco(totalAtivos, emissorMap, patrimonioTotal);

        // Distribuição setorial — agrega exposicaoRiscoData por setor
        const setorMap: Record<string, number> = {};
        exposicaoRiscoData.forEach(e => {
            const s = e.setor && e.setor.trim() !== '' ? e.setor : 'Sem setor';
            setorMap[s] = (setorMap[s] || 0) + e.value;
        });
        const totalClassificadoSetor = Object.values(setorMap).reduce((s, v) => s + v, 0);
        const setorialData = Object.entries(setorMap)
            .map(([setor, valor]) => ({
                setor,
                valor,
                pct: totalClassificadoSetor > 0 ? (valor / totalClassificadoSetor) * 100 : 0,
            }))
            .sort((a, b) => b.valor - a.valor);

        const CLASSES_RV = ['Renda Variável', 'FII-FIAgro', 'Internacional - Renda Variável'];
        const isPrevidencia = (a: ConsolidatedAtivo) => a.rawData?.asset_class === 'PENSION';
        const isRV          = (a: ConsolidatedAtivo) => CLASSES_RV.includes(a.tipo);
        const isGeral       = (a: ConsolidatedAtivo) => !isPrevidencia(a) && !isRV(a);

        const liquidezData      = buildLiquidezData(totalAtivos.filter(isGeral),  patrimonioTotal);
        const liquidezDataPrev  = buildLiquidezData(totalAtivos.filter(isPrevidencia), patrimonioTotal);
        const liquidezDataRV    = buildLiquidezData(totalAtivos.filter(isRV),     patrimonioTotal);

        const btgClasses: Record<string, number> = {};
        const xpClasses: Record<string, number> = {};
        const avenueClasses: Record<string, number> = {};
        const agoraClasses: Record<string, number> = {};
        btgAtivos.forEach(a => { btgClasses[a.tipo] = (btgClasses[a.tipo] || 0) + a.valorLiquido; });
        xpAtivos.forEach(a => { xpClasses[a.tipo] = (xpClasses[a.tipo] || 0) + a.valorLiquido; });
        avenueAtivos.forEach(a => { avenueClasses[a.tipo] = (avenueClasses[a.tipo] || 0) + a.valorLiquido; });
        agoraAtivos.forEach(a => { agoraClasses[a.tipo] = (agoraClasses[a.tipo] || 0) + a.valorLiquido; });

        const btgOutros = incluirBtg ? ((snapshotData.btg?.saldo_cc || 0) + (snapshotData.btg?.saldo_cripto || 0)) : 0;
        const xpOutros = incluirXp ? (snapshotData.xp?.saldo_coe || 0) : 0;
        if (btgOutros > 0) btgClasses['Conta Corrente / Outros'] = (btgClasses['Conta Corrente / Outros'] || 0) + btgOutros;
        if (xpOutros > 0) xpClasses['Conta Corrente / Outros'] = (xpClasses['Conta Corrente / Outros'] || 0) + xpOutros;

        const alocacaoMap: Record<string, number> = {};
        [btgClasses, xpClasses, avenueClasses, agoraClasses].forEach(classes => {
            Object.keys(classes).forEach(k => { alocacaoMap[k] = (alocacaoMap[k] || 0) + classes[k]; });
        });

        const donutData = [
            ...(btgTotal > 0 ? [{ name: 'BTG Pactual', value: btgTotal, pct: pct(btgTotal, patrimonioTotal), fill: corBtgDb }] : []),
            ...(xpTotal > 0 ? [{ name: 'XP Investimentos', value: xpTotal, pct: pct(xpTotal, patrimonioTotal), fill: corXpDb }] : []),
            ...(avenueTotal > 0 ? [{ name: 'Avenue', value: avenueTotal, pct: pct(avenueTotal, patrimonioTotal), fill: corAvenueDb }] : []),
            ...(agoraTotal > 0 ? [{ name: 'Ágora', value: agoraTotal, pct: pct(agoraTotal, patrimonioTotal), fill: corAgoraDb }] : []),
        ];

        const alocacaoData = buildAlocacaoData(alocacaoMap, colorMap, orderMap, patrimonioTotal);
        const comparativoData = buildComparativoData(btgClasses, xpClasses, avenueClasses, agoraClasses, colorMap, orderMap, corBtgDb, corXpDb, corAvenueDb, corAgoraDb);

        return {
            patrimonioTotal, btgTotal, xpTotal, avenueTotal, agoraTotal,
            vencimentosProx, todosAtivos,
            donutData, alocacaoData, comparativoData, exposicaoRiscoData, setorialData,
            liquidezData, liquidezDataPrev, liquidezDataRV,
            hasData: patrimonioTotal > 0,
            dataRefBtg: snapshotData.btg?.data_referencia,
            dataRefXp: snapshotData.xp?.data_referencia,
            dataRefAvenue: snapshotData.avenue?.data_referencia,
            dataRefAgora: snapshotData.agora?.data_referencia,
            incluirBtg, incluirXp, incluirAvenue, incluirAgora,
            coresInstituicoes: { btg: corBtgDb, xp: corXpDb, avenue: corAvenueDb, agora: corAgoraDb },
        };
    }, [snapshotData, diasVencimento, carteiraAtiva, carteirasPersonalizadas, canonicos, emissores, classesMaster, instituicoesDb, excecoes, selectedClient]);

    return { selectedClient, loading, metrics, snapshotData, diasVencimento, setDiasVencimento, drawerCarteirasAberto, setDrawerCarteirasAberto, carteiraAtiva, setCarteiraAtiva, opcoesCarteira };
}
