import { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'avere-ui';
import { supabase } from '../services/supabase';

// Envios de arquivo (posição externa) deste cliente ainda na fila do worker do VPS.
// O worker grava a posição direto no banco: sem acompanhar, a Posição ficava com o
// dado de antes até o F5 (staleTime). Consulta a cada 15s só enquanto houver envio
// pendente; quando um termina, recarrega a posição e avisa o desfecho.
const PENDENTES = new Set(['enviado', 'processando']);
const JANELA_MS = 2 * 24 * 3_600_000;

interface EnvioResumo { id: string; instituicao: string; status: string | null; }

export const chaveEnviosEmAndamento = (clienteId: string) => ['envios-andamento', clienteId];

export function useEnviosEmAndamento(clienteId: string | null) {
    const queryClient = useQueryClient();
    const anteriores = useRef<Map<string, string> | null>(null);

    const q = useQuery({
        queryKey: chaveEnviosEmAndamento(clienteId ?? ''),
        enabled: !!clienteId,
        queryFn: async () => {
            const { data, error } = await supabase
                .from('envio_pdf_manual').select('id, instituicao, status')
                .eq('cliente_id', clienteId!)
                .gte('enviado_em', new Date(Date.now() - JANELA_MS).toISOString());
            if (error) throw error;
            return (data ?? []) as EnvioResumo[];
        },
        refetchInterval: query => ((query.state.data ?? []).some(e => PENDENTES.has((e.status ?? '').toLowerCase())) ? 15_000 : false),
    });

    useEffect(() => { anteriores.current = null; }, [clienteId]);

    useEffect(() => {
        if (!q.data) return;
        const atual = new Map(q.data.map(e => [e.id, (e.status ?? '').toLowerCase()]));
        const antes = anteriores.current;
        anteriores.current = atual;
        if (!antes) return;
        let mudouPosicao = false;
        for (const e of q.data) {
            const era = antes.get(e.id);
            const agora = atual.get(e.id)!;
            if (!era || !PENDENTES.has(era) || PENDENTES.has(agora)) continue;
            if (agora === 'processado') { mudouPosicao = true; toast.success(`Posição ${e.instituicao} processada.`); }
            else if (agora === 'quarentena') toast.warning(`Envio ${e.instituicao} foi para quarentena — ver Posição Externa.`);
            else toast.error(`Envio ${e.instituicao} terminou com erro — ver Posição Externa.`);
        }
        if (mudouPosicao) queryClient.invalidateQueries({ queryKey: ['home', 'juncao', clienteId] });
    }, [q.data, clienteId, queryClient]);
}
