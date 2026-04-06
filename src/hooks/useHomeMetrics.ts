import { useState, useEffect, useMemo } from 'react';
import { useClient } from '../contexts/ClientContext';
import { supabase } from '../services/supabase';
import { pct } from '../utils/formatters';
import { CORES } from '../utils/colors';

export interface ConsolidatedAtivo {
    rowId: string;
    nome: string;
    tipo: string;
    subTipo?: string;
    valorLiquido: number;
    vencimento?: string | null;
    instituicao: 'BTG Pactual' | 'XP Investimentos';
    emissorId?: string | null;
}

export interface CarteiraPersonalizada {
    id: string;
    nome: string;
    instituicoes: string[];
    criada_em: string;
}

export function useHomeMetrics() {
    const { selectedClient } = useClient();
    const [loading, setLoading] = useState(false);
    const [snapshotData, setSnapshotData] = useState<{ btg: any; xp: any }>({ btg: null, xp: null });
    const [dicionario, setDicionario] = useState<any[]>([]);
    const [emissores, setEmissores] = useState<any[]>([]);
    const [classesMaster, setClassesMaster] = useState<any[]>([]); // <-- NOVO: Estado das Classes Dinâmicas
    const [diasVencimento, setDiasVencimento] = useState(30);
    const [drawerCarteirasAberto, setDrawerCarteirasAberto] = useState(false);
    const [carteiraAtiva, setCarteiraAtiva] = useState<string>('CONSOLIDADA');
    const [carteirasPersonalizadas, setCarteirasPersonalizadas] = useState<CarteiraPersonalizada[]>([]);

    useEffect(() => {
        async function fetchLatestSnapshots() {
            if (!selectedClient?.id) return;
            setLoading(true);
            try {
                const [btgRes, xpRes, dictRes, emissorRes, classesRes] = await Promise.all([
                    supabase
                        .from('posicao_btg_snapshots')
                        .select(`patrimonio_total, data_referencia, saldo_cc, saldo_cripto, posicao_btg_ativos ( id, emissor, sub_tipo, tipo, valor_liquido, maturity_date, isin, ticker, fund_cnpj )`)
                        .eq('cliente_id', selectedClient.id).order('data_referencia', { ascending: false }).limit(1).maybeSingle(),
                    supabase
                        .from('posicao_xp_snapshots')
                        .select(`patrimonio_total, patrimonio_total_liquido, data_referencia, saldo_coe, posicao_xp_ativos ( id, nome, sub_tipo, tipo, valor_liquido, data_vencimento, isin, ticker, cnpj )`)
                        .eq('cliente_id', selectedClient.id).order('data_referencia', { ascending: false }).limit(1).maybeSingle(),
                    supabase.from('dicionario_ativos').select('codigo_identificador, classe_avere, liquidez_avere, emissor_id'),
                    supabase.from('dicionario_emissores').select('id, nome_fantasia, setor'),
                    supabase.from('dicionario_classes').select('*').order('ordem_exibicao') // <-- BUSCA AS CORES E ORDEM
                ]);

                setSnapshotData({ btg: btgRes.data, xp: xpRes.data });
                if (dictRes.data) setDicionario(dictRes.data);
                if (emissorRes.data) setEmissores(emissorRes.data);
                if (classesRes.data) setClassesMaster(classesRes.data);
                setCarteiraAtiva('CONSOLIDADA');
            } catch (err) {
                console.error('Erro na carga da Home:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchLatestSnapshots();
    }, [selectedClient]);

    useEffect(() => {
        async function fetchCarteirasPersonalizadas() {
            if (!selectedClient?.id) return;
            const { data } = await supabase.from('carteiras_personalizadas').select('id, nome, instituicoes, criada_em').eq('cliente_id', selectedClient.id).order('criada_em', { ascending: true });
            if (data) setCarteirasPersonalizadas(data);
        }
        fetchCarteirasPersonalizadas();
    }, [selectedClient, drawerCarteirasAberto]);

    const opcoesCarteira = useMemo(() => {
        const bases = [{ label: 'Consolidada', value: 'CONSOLIDADA' }, { label: 'BTG Pactual', value: 'BTG' }, { label: 'XP Investimentos', value: 'XP' }];
        return [...bases, ...carteirasPersonalizadas.map(c => ({ label: c.nome, value: c.id }))];
    }, [carteirasPersonalizadas]);

    const metrics = useMemo(() => {
        let incluirBtg = true; let incluirXp = true;
        if (carteiraAtiva === 'BTG') incluirXp = false;
        if (carteiraAtiva === 'XP') incluirBtg = false;

        const personalizada = carteirasPersonalizadas.find(c => c.id === carteiraAtiva);
        if (personalizada) {
            incluirBtg = personalizada.instituicoes.includes('BTG');
            incluirXp = personalizada.instituicoes.includes('XP');
        }

        const btgTotal = incluirBtg ? parseFloat(snapshotData.btg?.patrimonio_total || 0) : 0;
        const xpTotal = incluirXp ? parseFloat(snapshotData.xp?.patrimonio_total || 0) : 0;
        const patrimonioTotal = btgTotal + xpTotal;

        // Mapas de Dicionário, Emissores e Cores Dinâmicas
        const dictMap = new Map();
        dicionario.forEach(d => dictMap.set(d.codigo_identificador, d));

        const emissorMap = new Map();
        emissores.forEach(e => emissorMap.set(e.id, e));

        const colorMap = new Map();
        const orderMap = new Map();
        classesMaster.forEach(c => {
            colorMap.set(c.nome, c.cor_hex);
            orderMap.set(c.nome, c.ordem_exibicao);
        });

        const classificar = (a: any, corretora: 'BTG' | 'XP') => {
            const isin = a.isin; const cnpj = corretora === 'BTG' ? a.fund_cnpj : a.cnpj; const ticker = a.ticker;
            let match = null;
            if (isin && dictMap.has(isin)) match = dictMap.get(isin);
            else if (cnpj && dictMap.has(cnpj)) match = dictMap.get(cnpj);
            else if (ticker && dictMap.has(ticker)) match = dictMap.get(ticker);

            return {
                classe: match?.classe_avere || a.tipo || 'Outros',
                emissorId: match?.emissor_id || null
            };
        };

        const btgAtivos: ConsolidatedAtivo[] = incluirBtg ? (snapshotData.btg?.posicao_btg_ativos || []).map((a: any, i: number) => {
            const cls = classificar(a, 'BTG');
            return { rowId: `btg-${i}`, nome: a.emissor ?? '-', tipo: cls.classe, subTipo: a.sub_tipo, valorLiquido: parseFloat(a.valor_liquido || 0), vencimento: a.maturity_date, instituicao: 'BTG Pactual', emissorId: cls.emissorId };
        }) : [];

        const xpAtivos: ConsolidatedAtivo[] = incluirXp ? (snapshotData.xp?.posicao_xp_ativos || []).map((a: any, i: number) => {
            const cls = classificar(a, 'XP');
            return { rowId: `xp-${i}`, nome: a.nome ?? '-', tipo: cls.classe, subTipo: a.sub_tipo, valorLiquido: parseFloat(a.valor_liquido || 0), vencimento: a.data_vencimento, instituicao: 'XP Investimentos', emissorId: cls.emissorId };
        }) : [];

        const totalAtivos = [...btgAtivos, ...xpAtivos];

        const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
        const limiteData = new Date(); limiteData.setDate(hoje.getDate() + diasVencimento);
        const vencimentosProx = totalAtivos.filter(a => {
            if (!a.vencimento) return false;
            const d = new Date(a.vencimento);
            return d > hoje && (diasVencimento === 9999 || d <= limiteData);
        });

        const todosAtivos = [...totalAtivos].sort((a, b) => b.valorLiquido - a.valorLiquido);

        // CÁLCULO DE EXPOSIÇÃO POR EMISSOR
        const exposicaoRaw: Record<string, { nome: string; setor: string; valor: number }> = {};
        totalAtivos.forEach(a => {
            if (a.emissorId && emissorMap.has(a.emissorId)) {
                const emissor = emissorMap.get(a.emissorId);
                if (!exposicaoRaw[a.emissorId]) exposicaoRaw[a.emissorId] = { nome: emissor.nome_fantasia, setor: emissor.setor, valor: 0 };
                exposicaoRaw[a.emissorId].valor += a.valorLiquido;
            }
        });

        const exposicaoRiscoData = Object.values(exposicaoRaw)
            .map(e => ({ name: e.nome, setor: e.setor, value: e.valor, pct: pct(e.valor, patrimonioTotal) }))
            .sort((a, b) => b.value - a.value);

        // CÁLCULO DAS CLASSES COM ORDENAÇÃO DINÂMICA
        const btgClasses: Record<string, number> = {}; const xpClasses: Record<string, number> = {};
        btgAtivos.forEach(a => btgClasses[a.tipo] = (btgClasses[a.tipo] || 0) + a.valorLiquido);
        xpAtivos.forEach(a => xpClasses[a.tipo] = (xpClasses[a.tipo] || 0) + a.valorLiquido);

        const btgOutros = incluirBtg ? ((snapshotData.btg?.saldo_cc || 0) + (snapshotData.btg?.saldo_cripto || 0)) : 0;
        const xpOutros = incluirXp ? (snapshotData.xp?.saldo_coe || 0) : 0;
        if (btgOutros > 0) btgClasses['Conta Corrente / Outros'] = (btgClasses['Conta Corrente / Outros'] || 0) + btgOutros;
        if (xpOutros > 0) xpClasses['Conta Corrente / Outros'] = (xpClasses['Conta Corrente / Outros'] || 0) + xpOutros;

        const alocacaoMap: Record<string, number> = {};
        Object.keys(btgClasses).forEach(k => alocacaoMap[k] = (alocacaoMap[k] || 0) + btgClasses[k]);
        Object.keys(xpClasses).forEach(k => alocacaoMap[k] = (alocacaoMap[k] || 0) + xpClasses[k]);

        const donutData = [
            ...(btgTotal > 0 ? [{ name: 'BTG Pactual', value: btgTotal, pct: pct(btgTotal, patrimonioTotal), fill: CORES.btg }] : []),
            ...(xpTotal > 0 ? [{ name: 'XP Investimentos', value: xpTotal, pct: pct(xpTotal, patrimonioTotal), fill: CORES.xp }] : []),
        ];

        // O SEGREDO: Aplica a Cor e Ordena pelo Master
        const alocacaoData = Object.entries(alocacaoMap)
            .map(([name, value]) => ({
                name,
                value,
                pct: pct(value, patrimonioTotal),
                fill: colorMap.get(name) || '#9CA3AF', // Usa a cor do Master, se não achar usa Cinza
                ordem: orderMap.get(name) || 999        // Usa a ordem do Master, se não achar atira pro fundo
            }))
            .filter(d => d.value > 0)
            .sort((a, b) => a.ordem - b.ordem); // Ordenação Mágica!

        const todasAsClasses = Array.from(new Set([...Object.keys(btgClasses), ...Object.keys(xpClasses)]));
        const comparativoData = todasAsClasses.map(name => ({
            name,
            BTG: btgClasses[name] || 0,
            XP: xpClasses[name] || 0,
            ordem: orderMap.get(name) || 999
        }))
            .filter(d => d.BTG > 0 || d.XP > 0)
            .sort((a, b) => a.ordem - b.ordem); // Aplica a mesma ordenação no gráfico de barras

        return {
            patrimonioTotal, btgTotal, xpTotal,
            vencimentosProx, todosAtivos,
            donutData, alocacaoData, comparativoData, exposicaoRiscoData,
            hasData: patrimonioTotal > 0,
            dataRefBtg: snapshotData.btg?.data_referencia,
            dataRefXp: snapshotData.xp?.data_referencia,
            incluirBtg, incluirXp
        };
    }, [snapshotData, diasVencimento, carteiraAtiva, carteirasPersonalizadas, dicionario, emissores, classesMaster]);

    return { selectedClient, loading, metrics, snapshotData, diasVencimento, setDiasVencimento, drawerCarteirasAberto, setDrawerCarteirasAberto, carteiraAtiva, setCarteiraAtiva, opcoesCarteira };
}