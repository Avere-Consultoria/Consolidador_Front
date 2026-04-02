import { useState, useEffect, useMemo } from 'react';
import { useClient } from '../contexts/ClientContext';
import { supabase } from '../services/supabase';
import { pct } from '../utils/formatters';
import { CORES } from '../utils/colors';

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces (Exportadas para podermos tipar os componentes depois)
// ─────────────────────────────────────────────────────────────────────────────
export interface ConsolidatedAtivo {
    rowId: string;
    nome: string;
    tipo: string;
    subTipo?: string;
    valorLiquido: number;
    vencimento?: string | null;
    instituicao: 'BTG Pactual' | 'XP Investimentos';
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
    const [diasVencimento, setDiasVencimento] = useState(30);
    const [drawerCarteirasAberto, setDrawerCarteirasAberto] = useState(false);

    const [carteiraAtiva, setCarteiraAtiva] = useState<string>('CONSOLIDADA');
    const [carteirasPersonalizadas, setCarteirasPersonalizadas] = useState<CarteiraPersonalizada[]>([]);

    // ── Busca os snapshots mais recentes
    useEffect(() => {
        async function fetchLatestSnapshots() {
            if (!selectedClient?.id) return;
            setLoading(true);
            try {
                const [btgRes, xpRes] = await Promise.all([
                    supabase
                        .from('posicao_btg_snapshots')
                        .select(`
              patrimonio_total, data_referencia,
              saldo_cc, saldo_rf, saldo_fundos, saldo_rv, saldo_prev, saldo_cripto,
              posicao_btg_ativos ( id, emissor, sub_tipo, tipo, valor_liquido, maturity_date )
            `)
                        .eq('cliente_id', selectedClient.id)
                        .order('data_referencia', { ascending: false })
                        .limit(1)
                        .maybeSingle(),

                    supabase
                        .from('posicao_xp_snapshots')
                        .select(`
              patrimonio_total, patrimonio_total_liquido, data_referencia,
              saldo_acoes, saldo_fundos, saldo_renda_fixa, saldo_tesouro_direto,
              saldo_previdencia, saldo_coe,
              posicao_xp_ativos ( id, nome, sub_tipo, tipo, valor_liquido, data_vencimento )
            `)
                        .eq('cliente_id', selectedClient.id)
                        .order('data_referencia', { ascending: false })
                        .limit(1)
                        .maybeSingle(),
                ]);

                setSnapshotData({ btg: btgRes.data, xp: xpRes.data });
                setCarteiraAtiva('CONSOLIDADA');
            } catch (err) {
                console.error('Erro na carga da Home:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchLatestSnapshots();
    }, [selectedClient]);

    // ── Busca as carteiras personalizadas
    useEffect(() => {
        async function fetchCarteirasPersonalizadas() {
            if (!selectedClient?.id) return;
            const { data } = await supabase
                .from('carteiras_personalizadas')
                .select('id, nome, instituicoes, criada_em')
                .eq('cliente_id', selectedClient.id)
                .order('criada_em', { ascending: true });
            if (data) setCarteirasPersonalizadas(data);
        }
        fetchCarteirasPersonalizadas();
    }, [selectedClient, drawerCarteirasAberto]);

    // ── Prepara as opções do Select
    const opcoesCarteira = useMemo(() => {
        const bases = [
            { label: 'Consolidada', value: 'CONSOLIDADA' },
            { label: 'BTG Pactual', value: 'BTG' },
            { label: 'XP Investimentos', value: 'XP' },
        ];
        const personalizadas = carteirasPersonalizadas.map(c => ({
            label: c.nome,
            value: c.id
        }));
        return [...bases, ...personalizadas];
    }, [carteirasPersonalizadas]);

    // ── Métricas consolidadas
    const metrics = useMemo(() => {
        let incluirBtg = true;
        let incluirXp = true;

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

        const btgAtivos: ConsolidatedAtivo[] = incluirBtg ? (snapshotData.btg?.posicao_btg_ativos || [])
            .map((a: any, i: number) => ({
                rowId: `btg-${i}-${a.id}`,
                nome: a.emissor ?? '-',
                tipo: a.tipo ?? '-',
                subTipo: a.sub_tipo,
                valorLiquido: parseFloat(a.valor_liquido || 0),
                vencimento: a.maturity_date,
                instituicao: 'BTG Pactual' as const,
            })) : [];

        const xpAtivos: ConsolidatedAtivo[] = incluirXp ? (snapshotData.xp?.posicao_xp_ativos || [])
            .map((a: any, i: number) => ({
                rowId: `xp-${i}-${a.id}`,
                nome: a.nome ?? '-',
                tipo: a.tipo ?? '-',
                subTipo: a.sub_tipo,
                valorLiquido: parseFloat(a.valor_liquido || 0),
                vencimento: a.data_vencimento,
                instituicao: 'XP Investimentos' as const,
            })) : [];

        const totalAtivos = [...btgAtivos, ...xpAtivos];

        const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
        const limiteData = new Date(); limiteData.setDate(hoje.getDate() + diasVencimento);
        const vencimentosProx = totalAtivos.filter(a => {
            if (!a.vencimento) return false;
            const d = new Date(a.vencimento);
            return d > hoje && (diasVencimento === 9999 || d <= limiteData);
        });

        const todosAtivos = [...totalAtivos].sort((a, b) => b.valorLiquido - a.valorLiquido);

        const btgRF = incluirBtg ? (snapshotData.btg?.saldo_rf || 0) : 0;
        const btgFundos = incluirBtg ? (snapshotData.btg?.saldo_fundos || 0) : 0;
        const btgRV = incluirBtg ? (snapshotData.btg?.saldo_rv || 0) : 0;
        const btgPrev = incluirBtg ? (snapshotData.btg?.saldo_prev || 0) : 0;
        const btgOutros = incluirBtg ? ((snapshotData.btg?.saldo_cc || 0) + (snapshotData.btg?.saldo_cripto || 0)) : 0;

        const xpRF = incluirXp ? ((snapshotData.xp?.saldo_renda_fixa || 0) + (snapshotData.xp?.saldo_tesouro_direto || 0)) : 0;
        const xpFundos = incluirXp ? (snapshotData.xp?.saldo_fundos || 0) : 0;
        const xpRV = incluirXp ? (snapshotData.xp?.saldo_acoes || 0) : 0;
        const xpPrev = incluirXp ? (snapshotData.xp?.saldo_previdencia || 0) : 0;
        const xpOutros = incluirXp ? (snapshotData.xp?.saldo_coe || 0) : 0;

        const alocacao = {
            rendaFixa: btgRF + xpRF,
            fundos: btgFundos + xpFundos,
            rendaVariavel: btgRV + xpRV,
            previdencia: btgPrev + xpPrev,
            outros: btgOutros + xpOutros,
        };

        const donutData = [
            ...(btgTotal > 0 ? [{ name: 'BTG Pactual', value: btgTotal, pct: pct(btgTotal, patrimonioTotal), fill: CORES.btg }] : []),
            ...(xpTotal > 0 ? [{ name: 'XP Investimentos', value: xpTotal, pct: pct(xpTotal, patrimonioTotal), fill: CORES.xp }] : []),
        ];

        const alocacaoData = [
            { name: 'Renda Fixa', value: alocacao.rendaFixa, pct: pct(alocacao.rendaFixa, patrimonioTotal), fill: CORES.rendaFixa },
            { name: 'Fundos', value: alocacao.fundos, pct: pct(alocacao.fundos, patrimonioTotal), fill: CORES.fundos },
            { name: 'Renda Variável', value: alocacao.rendaVariavel, pct: pct(alocacao.rendaVariavel, patrimonioTotal), fill: CORES.rendaVariavel },
            { name: 'Previdência', value: alocacao.previdencia, pct: pct(alocacao.previdencia, patrimonioTotal), fill: CORES.previdencia },
            { name: 'Outros / CC', value: alocacao.outros, pct: pct(alocacao.outros, patrimonioTotal), fill: CORES.outros },
        ].filter(d => d.value > 0).sort((a, b) => b.value - a.value);

        const comparativoData = [
            { name: 'Renda Fixa', BTG: btgRF, XP: xpRF },
            { name: 'Fundos', BTG: btgFundos, XP: xpFundos },
            { name: 'Renda Var.', BTG: btgRV, XP: xpRV },
            { name: 'Previdência', BTG: btgPrev, XP: xpPrev },
        ].filter(d => d.BTG > 0 || d.XP > 0);

        return {
            patrimonioTotal, btgTotal, xpTotal,
            vencimentosProx, todosAtivos, alocacao,
            donutData, alocacaoData, comparativoData,
            hasData: patrimonioTotal > 0,
            dataRefBtg: snapshotData.btg?.data_referencia,
            dataRefXp: snapshotData.xp?.data_referencia,
        };
    }, [snapshotData, diasVencimento, carteiraAtiva, carteirasPersonalizadas]);

    return {
        selectedClient,
        loading,
        metrics,
        snapshotData,
        diasVencimento, setDiasVencimento,
        drawerCarteirasAberto, setDrawerCarteirasAberto,
        carteiraAtiva, setCarteiraAtiva,
        opcoesCarteira,
    };
}