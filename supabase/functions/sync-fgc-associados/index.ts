// Sincroniza conglomerados e instituições do FGC via API pública do Power BI.
// Endpoint público (sem auth real): wabi-brazil-south-b com X-PowerBI-ResourceKey fixo.
// Estrutura DSR retornada parseada conforme groupings com Subtotal:1 (pai/filho).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FGC_ENDPOINT = 'https://wabi-brazil-south-b-primary-api.analysis.windows.net/public/reports/querydata?synchronous=true';
const FGC_RESOURCE_KEY = '12025ef2-63d5-4128-907c-ca85ea259b52';
const FGC_DATASET_ID = '91b7f73f-817a-4bb6-af6f-46a3bbea7d21';
const FGC_REPORT_ID = 'c6a47fab-c4c0-4e25-a867-33f5eb376aed';
const FGC_VISUAL_ID = 'd86330d038e0971ec1b4';

const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function buildPayload(letra: string) {
    return {
        version: '1.0.0',
        queries: [{
            Query: {
                Commands: [{
                    SemanticQueryDataShapeCommand: {
                        Query: {
                            Version: 2,
                            From: [
                                { Name: 'c', Entity: 'Consulta1', Type: 0 },
                                { Name: 'p', Entity: 'Planilha1', Type: 0 },
                            ],
                            Select: [
                                { Column: { Expression: { SourceRef: { Source: 'c' } }, Property: 'NOMEINSTITUICAOLIDER' }, Name: 'Consulta1.NOMEINSTITUICAOLIDER' },
                                { Column: { Expression: { SourceRef: { Source: 'c' } }, Property: 'NOMEINSTITUICAO' },       Name: 'Consulta1.NOMEINSTITUICAO' },
                                { Aggregation: { Expression: { Column: { Expression: { SourceRef: { Source: 'p' } }, Property: 'Link' } }, Function: 3 }, Name: 'Min(Planilha1.Link)' },
                                { Measure: { Expression: { SourceRef: { Source: 'p' } }, Property: 'Título' }, Name: 'Planilha1.Título' },
                            ],
                            Where: [{
                                Condition: {
                                    In: {
                                        Expressions: [{ Column: { Expression: { SourceRef: { Source: 'c' } }, Property: 'Primeiros caracteres' } }],
                                        Values: [[{ Literal: { Value: `'${letra}'` } }]],
                                    },
                                },
                            }],
                            OrderBy: [{
                                Direction: 1,
                                Expression: { Column: { Expression: { SourceRef: { Source: 'c' } }, Property: 'NOMEINSTITUICAOLIDER' } },
                            }],
                        },
                        Binding: {
                            Primary: { Groupings: [{ Projections: [0, 2], Subtotal: 1 }] },
                            Projections: [3],
                            DataReduction: { DataVolume: 3, Primary: { Window: { Count: 500 } } },
                            Version: 1,
                        },
                        ExecutionMetricsKind: 1,
                    },
                }],
            },
            QueryId: '',
            ApplicationContext: {
                DatasetId: FGC_DATASET_ID,
                Sources: [{ ReportId: FGC_REPORT_ID, VisualId: FGC_VISUAL_ID }],
            },
        }],
        cancelQueries: [],
        modelId: 3627629,
    };
}

async function fetchLetra(letra: string): Promise<Array<{ lider: string; instituicao: string; link?: string }>> {
    const resp = await fetch(FGC_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'https://app.powerbi.com',
            'Referer': 'https://app.powerbi.com/',
            'X-PowerBI-ResourceKey': FGC_RESOURCE_KEY,
            'ActivityId': crypto.randomUUID(),
            'RequestId': crypto.randomUUID(),
        },
        body: JSON.stringify(buildPayload(letra)),
    });

    if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`Letra ${letra}: HTTP ${resp.status} — ${txt.slice(0, 300)}`);
    }
    const json = await resp.json();
    return parseDSR(json);
}

// Parser do formato DSR do Power BI.
// Com Subtotal:1 + Groupings [Projections:[0,2]], a estrutura típica é:
//   results[0].result.data.dsr.DS[0].PH[0].DM0 = linhas
// Cada linha pode ser:
//   - subtotal do lider (contém Ø/M markers e somente C[0])
//   - detalhe com {C: [lider, link, instituicao]} OU referência via R (repeat) ao anterior
// Ø (omit) e R (repeat) são bitmasks: ausência de campo → repetir do registro anterior.
function parseDSR(json: any): Array<{ lider: string; instituicao: string; link?: string }> {
    const out: Array<{ lider: string; instituicao: string; link?: string }> = [];
    try {
        const ds = json?.results?.[0]?.result?.data?.dsr?.DS?.[0];
        if (!ds) return out;
        const dm0: any[] = ds.PH?.[0]?.DM0 ?? ds.PH?.[0]?.DM1 ?? [];
        // Value dictionaries (ValueDicts) para resolver índices
        const vd = ds.ValueDicts ?? {};

        let lastLider = '';
        let lastInst  = '';
        let lastLink: string | undefined = undefined;

        // Mapeamento de coluna → índice em C (pode mudar; tentamos detectar dinamicamente)
        // Pela ordem do Select: 0=lider, 1=instituicao, 2=link, mas o Binding agrupa [0,2] e projeta 3.
        // Em DSR PH[0]: cada row.C = valores das colunas presentes (não-omitidas, não-repetidas).
        // A ordem dentro de C segue a ordem dos Select. Como tudo entra no mesmo PH, esperamos:
        //   C[?] em ordem lider, instituicao, link
        // Resolver via R (repeat bitmask) e Ø (omit bitmask).

        const COL_LIDER = 0;
        const COL_INST  = 1;
        const COL_LINK  = 2;

        function resolveValue(raw: any): string | undefined {
            if (raw === null || raw === undefined) return undefined;
            if (typeof raw === 'string') return raw;
            if (typeof raw === 'number') return String(raw);
            return undefined;
        }

        function resolveDictRef(colIdx: number, raw: any): string | undefined {
            // Power BI às vezes coloca índices em dicts: D0, D1, etc.
            // Sem mapping confiável genérico, tratamos raw como literal.
            const v = resolveValue(raw);
            if (v === undefined) return undefined;
            // Se é número e existe dict para essa coluna, tenta lookup
            const dictKey = Object.keys(vd)[colIdx];
            if (dictKey && Array.isArray(vd[dictKey]) && /^\d+$/.test(v)) {
                return vd[dictKey][parseInt(v, 10)] ?? v;
            }
            return v;
        }

        for (const row of dm0) {
            const c: any[] = row.C ?? [];
            const repeatMask: number = row.R ?? 0;
            const omitMask:   number = row.Ø ?? 0;

            // Reconstruir as 3 colunas (lider, inst, link) na ordem
            const valores: (string | undefined)[] = [];
            let cIdx = 0;
            for (let col = 0; col < 3; col++) {
                const isOmit   = (omitMask   >> col) & 1;
                const isRepeat = (repeatMask >> col) & 1;
                if (isOmit) {
                    valores.push(undefined);
                } else if (isRepeat) {
                    valores.push(col === COL_LIDER ? lastLider : col === COL_INST ? lastInst : lastLink);
                } else {
                    valores.push(resolveDictRef(col, c[cIdx]));
                    cIdx++;
                }
            }

            const lider = valores[COL_LIDER] ?? lastLider;
            const inst  = valores[COL_INST];
            const link  = valores[COL_LINK];

            if (lider) lastLider = lider;
            if (inst)  lastInst  = inst;
            if (link)  lastLink  = link;

            // Subtotal do lider: instituicao ausente → não emite linha
            if (!inst || inst.trim() === '') continue;
            // Linha "Total" agregada do FGC: pula
            if (inst.trim().toLowerCase() === 'total') continue;

            out.push({ lider: lider.trim(), instituicao: inst.trim(), link: link?.trim() });
        }
    } catch (e) {
        console.error('parseDSR error:', e);
    }
    return out;
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Cria log
    const { data: logRow } = await supabase.from('fgc_sync_log').insert([{ status: 'running' }]).select().single();
    const logId = logRow?.id as string | undefined;

    const setLog = async (patch: Record<string, unknown>) => {
        if (!logId) return;
        await supabase.from('fgc_sync_log').update(patch).eq('id', logId);
    };

    try {
        // Cache local de conglomerado id por nome_lider
        const conglomMap = new Map<string, string>();
        let totalInst = 0;

        for (const letra of LETRAS) {
            const linhas = await fetchLetra(letra);

            for (const { lider, instituicao, link } of linhas) {
                let conglomId = conglomMap.get(lider);
                if (!conglomId) {
                    // upsert conglomerado
                    const { data: existing } = await supabase
                        .from('dicionario_conglomerados')
                        .select('id')
                        .eq('nome_lider', lider)
                        .maybeSingle();

                    if (existing?.id) {
                        conglomId = existing.id;
                    } else {
                        const { data: novo, error: errC } = await supabase
                            .from('dicionario_conglomerados')
                            .insert([{ nome_lider: lider }])
                            .select('id')
                            .single();
                        if (errC) throw new Error(`Insert conglomerado "${lider}": ${errC.message}`);
                        conglomId = novo!.id;
                    }
                    conglomMap.set(lider, conglomId);
                }

                // upsert instituição (chave: conglomerado_id + nome_instituicao)
                const { error: errI } = await supabase
                    .from('instituicoes_fgc')
                    .upsert(
                        {
                            conglomerado_id: conglomId,
                            nome_instituicao: instituicao,
                            link_fgc: link ?? null,
                            primeira_letra: letra,
                            last_seen_at: new Date().toISOString(),
                        },
                        { onConflict: 'conglomerado_id,nome_instituicao' }
                    );
                if (errI) throw new Error(`Upsert instituição "${instituicao}": ${errI.message}`);
                totalInst++;
            }

            // Suaviza ritmo p/ não bater rate-limit
            await new Promise(r => setTimeout(r, 150));
        }

        await setLog({
            status: 'success',
            finished_at: new Date().toISOString(),
            total_letras: LETRAS.length,
            total_conglomerados: conglomMap.size,
            total_instituicoes: totalInst,
        });

        return new Response(JSON.stringify({
            success: true,
            conglomerados: conglomMap.size,
            instituicoes: totalInst,
        }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        await setLog({ status: 'error', finished_at: new Date().toISOString(), erro: msg });
        return new Response(JSON.stringify({ error: msg }), {
            status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
