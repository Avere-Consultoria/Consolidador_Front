import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Typography, Card, Select, Spinner, Badge, Button, toast } from 'avere-ui';
import { Sparkles, PenLine, AlertTriangle, X, Trash2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { supabase } from '../services/supabase';
import { useClient } from '../contexts/ClientContext';
import { fmt } from '../utils/formatters';
import { CORES, isValidHex } from '../utils/colors';
import { PALETA_LINHAS } from '../utils/chartPalette';
import { NenhumClienteSelecionado } from '../components/home/NenhumClienteSelecionado';
import { EstadoErro } from '../components/shared/EstadoErro';
import { RentabilidadeAtivos } from '../components/rentabilidade/RentabilidadeAtivos';

// ─────────────────────────────────────────────────────────────────────────────
// Rentabilidade — matriz de janelas (Mês · Ano · 12m · 24m · 36m nas colunas).
// O front NÃO calcula nada: renderiza o contrato da RPC
// rentabilidade_cliente_janelas (linhas POR CONTA + consolidado + réguas).
// Spec: financial-consolidator/lab/rentabilidade/SPEC-fase1-rentabilidade.md
// ─────────────────────────────────────────────────────────────────────────────

const JANELAS = [
    { key: 'mes', label: 'Mês' },
    { key: 'ytd', label: 'Ano' },
    { key: '12m', label: '12 meses' },
    { key: '24m', label: '24 meses' },
    { key: '36m', label: '36 meses' },
] as const;
type JanelaKey = typeof JANELAS[number]['key'];

interface Linha {
    instituicao: string;
    conta_codigo: string;
    apelido: string | null;
    chave: string;
    net: number | null;
    origem: 'auto' | 'manual' | null;
    tem_dados: boolean;
    rent: Partial<Record<JanelaKey, number | null>>;
}
interface PontoSerie { mes: string; rent: number | null; acumulado: number | null }
interface SerieConta { instituicao: string; conta_codigo: string; chave: string; pontos: PontoSerie[] }
interface SerieData {
    mes_referencia: string;
    meses: string[];
    series: SerieConta[];
    consolidado: PontoSerie[];
    cdi: PontoSerie[];
}

interface Contrato {
    mes_referencia: string;
    linhas: Linha[];
    consolidado: {
        net_bloco: number;
        rent: Partial<Record<JanelaKey, number | null>>;
        cobertura: Partial<Record<JanelaKey, number | null>>;
    };
    benchmarks: { indexador: string; valores: Partial<Record<JanelaKey, number | null>> }[];
    avisos: string[];
}

const MESES_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

// Últimos 18 meses FECHADOS (mês corrente não aparece — decisão da Fase 1)
function mesesFechados(): { value: string; label: string }[] {
    const out: { value: string; label: string }[] = [];
    const d = new Date();
    d.setDate(1);
    for (let i = 0; i < 18; i++) {
        d.setMonth(d.getMonth() - 1);
        const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
        out.push({ value, label: `${MESES_PT[d.getMonth()]} ${d.getFullYear()}` });
    }
    return out;
}

const pct = (v: number | null | undefined, casas = 2) =>
    v === null || v === undefined ? null : `${(v * 100).toFixed(casas).replace('.', ',')}%`;

const MESES_ABREV = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const mesCurto = (ym: string) => {
    const [a, m] = ym.split('-');
    return `${MESES_ABREV[Number(m) - 1]}/${a.slice(2)}`;
};

// Paleta reserva das linhas (quando a instituição não tem cor cadastrada)
const PALETA = PALETA_LINHAS;

// Cor da instituição: cadastro (Gestão Master) > fallback fixo do sistema > paleta
function corInstituicao(nome: string, corDb: string | undefined, idx: number): string {
    if (isValidHex(corDb)) return corDb as string;
    if (/btg/i.test(nome)) return CORES.btg;
    if (/xp/i.test(nome)) return CORES.xp;
    if (/avenue/i.test(nome)) return CORES.avenue;
    if (/agora|ágora/i.test(nome)) return CORES.agora;
    return PALETA[idx % PALETA.length];
}

const corRent = (v: number | null | undefined) =>
    v === null || v === undefined ? 'var(--color-text-muted)' : v < 0 ? 'var(--color-danger-text)' : 'var(--color-text-primary)';

// ── Máscaras dos inputs do modal ─────────────────────────────────────────────
// Moeda: só dígitos; os 2 últimos são centavos → "9.941.367,82" enquanto digita.
const fmtMoedaBR = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function maskMoedaBR(s: string): string {
    const dig = s.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    if (!dig) return '';
    return fmtMoedaBR.format(Number(dig) / 100);
}
// Percentual: dígitos + UMA vírgula (até 4 decimais) + sinal negativo opcional.
function maskPctBR(s: string): string {
    let t = s.replace(/[^\d,-]/g, '');
    const neg = t.startsWith('-');
    t = t.replace(/-/g, '');
    const [inteiro, ...resto] = t.split(',');
    const dec = resto.join('').slice(0, 4);
    return (neg ? '-' : '') + inteiro + (resto.length ? ',' + dec : '');
}
// Número → texto do input (sem zeros à direita: 5 → "5", 0,7672 → "0,7672")
const pctParaInput = (v: number) => String(Number((v * 100).toFixed(4))).replace('.', ',');

// Aceita "150.000,50", "150000,50" e "150000.50"; vazio → null.
function parseNumBR(s: string): number | null {
    const t = s.trim();
    if (!t) return null;
    const norm = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t;
    const n = Number(norm);
    return Number.isFinite(n) ? n : null;
}

export default function Rentabilidade() {
    const { selectedClient } = useClient();
    const queryClient = useQueryClient();
    const clienteId = selectedClient?.id ?? null;

    const opcoesMes = useMemo(mesesFechados, []);
    const [mesRef, setMesRef] = useState(opcoesMes[0].value);

    const [desmarcadas, setDesmarcadas] = useState<Set<string>>(new Set());
    const [linhasOcultas, setLinhasOcultas] = useState<Set<string>>(new Set());

    // Correção do MÊS via modal (NET + rentabilidade — o tijolo; janelas derivam).
    // Vale também para linha AUTO (ex.: NET distorcida por valor em trânsito no
    // fim do mês); a próxima entrega da corretora sobrescreve — espelhamento manda.
    const [modalLinha, setModalLinha] = useState<Linha | null>(null);
    const [formNet, setFormNet] = useState('');
    const [formRent, setFormRent] = useState('');
    // Janelas no modal: só gravamos a que o usuário ALTERAR (comparado ao valor
    // inicial) — campo intocado continua derivando; campo limpo remove o manual.
    const [formJan, setFormJan] = useState<Record<string, string>>({});
    const [formJanInicial, setFormJanInicial] = useState<Record<string, string>>({});

    // Troca de cliente/mês limpa seleção e edição
    useEffect(() => { setDesmarcadas(new Set()); setModalLinha(null); }, [clienteId, mesRef]);

    // ── Consultas (cache do TanStack: voltar à aba dentro do staleTime = instantâneo) ──

    const fetchJanelas = async (bloco: string[] | null): Promise<Contrato> => {
        const { data, error } = await supabase.rpc('rentabilidade_cliente_janelas', {
            p_cliente_id: clienteId,
            p_mes_ref: mesRef,
            p_bloco: bloco,
        });
        if (error) throw error;
        return data as Contrato;
    };

    // Universo: sempre sem bloco (todas as linhas)
    const universoQ = useQuery({
        queryKey: ['rentabilidade', 'janelas', clienteId, mesRef],
        queryFn: () => fetchJanelas(null),
        enabled: !!clienteId,
    });
    const universo = universoQ.data ?? null;

    // Consolidado do bloco — o engine recalcula; o front nunca pondera nada.
    // Só há consulta própria quando existe conta desmarcada; a chave inclui a
    // seleção, então marcar/desmarcar de volta reaproveita o cache.
    const marcadas = useMemo(
        () => (universo?.linhas ?? []).map(l => l.chave).filter(c => !desmarcadas.has(c)),
        [universo, desmarcadas],
    );
    const blocoQ = useQuery({
        queryKey: ['rentabilidade', 'janelas', clienteId, mesRef, [...desmarcadas].sort().join('|')],
        queryFn: () => fetchJanelas(marcadas.length ? marcadas : ['__nenhuma__']),
        enabled: !!clienteId && desmarcadas.size > 0 && !!universo,
    });

    const consBloco = desmarcadas.size === 0 ? (universo?.consolidado ?? null) : (blocoQ.data?.consolidado ?? null);
    const avisosBloco = desmarcadas.size === 0 ? (universo?.avisos ?? []) : (blocoQ.data?.avisos ?? []);

    // Série do gráfico (acumulado 12m por conta + CDI) — independente do bloco
    const serieQ = useQuery({
        queryKey: ['rentabilidade', 'serie', clienteId, mesRef],
        queryFn: async () => {
            const { data, error } = await supabase.rpc('rentabilidade_cliente_serie', {
                p_cliente_id: clienteId,
                p_mes_ref: mesRef,
                p_meses: 12,
            });
            if (error) throw error;
            return data as SerieData;
        },
        enabled: !!clienteId,
    });
    const serie = serieQ.data ?? null;

    // Cores oficiais das instituições (as mesmas do resto do sistema) — quase estáticas
    const coresQ = useQuery({
        queryKey: ['instituicoes', 'cores'],
        queryFn: async () => {
            const { data, error } = await supabase.from('instituicoes').select('nome, cor_primaria');
            if (error) throw error;
            const mapa: Record<string, string> = {};
            for (const i of data ?? []) if (i.cor_primaria) mapa[String(i.nome).toUpperCase()] = i.cor_primaria;
            return mapa;
        },
        staleTime: 60 * 60 * 1000,
    });
    const coresDb: Record<string, string> = coresQ.data ?? {};

    // Erro da carga principal vira estado de tela (abaixo, no render) — não toast.
    useEffect(() => {
        if (universoQ.error) console.error(universoQ.error);
    }, [universoQ.error]);
    useEffect(() => {
        if (serieQ.error) console.error('Rentabilidade: série do gráfico falhou', serieQ.error);
    }, [serieQ.error]);

    const alternarLinha = (nome: string) => {
        setLinhasOcultas(prev => {
            const novo = new Set(prev);
            if (novo.has(nome)) novo.delete(nome); else novo.add(nome);
            return novo;
        });
    };

    // Dados do gráfico: uma linha por mês, colunas = contas + CDI (em %)
    const chartData = useMemo(() => {
        if (!serie) return [];
        return serie.meses.map((ym, i) => {
            const row: Record<string, number | string | null> = { mes: mesCurto(ym) };
            for (const s of serie.series) {
                const ac = s.pontos[i]?.acumulado;
                row[`${s.instituicao} ${s.conta_codigo}`.trim()] = ac === null || ac === undefined ? null : ac * 100;
            }
            const cons = serie.consolidado?.[i]?.acumulado;
            row.Consolidado = cons === null || cons === undefined ? null : cons * 100;
            const cdi = serie.cdi[i]?.acumulado;
            row.CDI = cdi === null || cdi === undefined ? null : cdi * 100;
            return row;
        });
    }, [serie]);

    // Legenda do gráfico: Consolidado primeiro, instituições no meio, CDI no fim.
    // payload custom porque a ordem natural da legenda seguiria a ordem de
    // desenho das linhas (e o Consolidado precisa continuar desenhado por cima).
    const legendaPayload = useMemo(() => {
        if (!serie) return [];
        const itens: any[] = [
            { value: 'Consolidado', dataKey: 'Consolidado', color: '#0F1A21', type: 'circle' },
        ];
        serie.series.forEach((sc, i) => {
            const nome = `${sc.instituicao} ${sc.conta_codigo}`.trim();
            itens.push({ value: nome, dataKey: nome, color: corInstituicao(sc.instituicao, coresDb[sc.instituicao.toUpperCase()], i), type: 'circle' });
        });
        itens.push({ value: 'CDI', dataKey: 'CDI', color: '#69747C', type: 'circle' });
        return itens;
    }, [serie, coresDb]);

    // Marcar/desmarcar conta: só muda o estado — a consulta do bloco reage sozinha
    const alternarConta = (chave: string) => {
        setDesmarcadas(prev => {
            const novo = new Set(prev);
            if (novo.has(chave)) novo.delete(chave); else novo.add(chave);
            return novo;
        });
    };

    const iniciarEdicao = (l: Linha) => {
        setModalLinha(l);
        setFormNet(l.net !== null ? fmtMoedaBR.format(l.net) : '');
        const rm = l.rent?.mes;
        setFormRent(rm !== null && rm !== undefined ? pctParaInput(rm) : '');
        const j: Record<string, string> = {};
        for (const k of ['ytd', '12m', '24m', '36m'] as const) {
            const v = l.rent?.[k];
            j[k] = v !== null && v !== undefined ? pctParaInput(v) : '';
        }
        setFormJan(j);
        setFormJanInicial(j);
    };

    // Escritas invalidam as chaves de rentabilidade → rebusca IMEDIATA (nunca espera o staleTime)
    const salvarMut = useMutation({
        mutationFn: async (l: Linha) => {
            const net = parseNumBR(formNet);
            const rentPct = parseNumBR(formRent);
            const janAlteradas = (['ytd', '12m', '24m', '36m'] as const).filter(k => formJan[k] !== formJanInicial[k]);
            if (net === null && rentPct === null && janAlteradas.length === 0) throw new Error('VALIDACAO');

            // Tijolo do mês (NET + rentabilidade) — só quando há o que gravar
            if (net !== null || rentPct !== null) {
                const { error } = await supabase.from('rentabilidade_mensal').upsert([{
                    cliente_id: clienteId,
                    instituicao: l.instituicao,
                    conta_codigo: l.conta_codigo ?? '',
                    mes_referencia: mesRef,
                    net_fechamento: net,
                    rentabilidade_mes: rentPct === null ? null : rentPct / 100,   // digitado em %, guardado em fração
                    origem: 'manual',
                    fonte_detalhe: 'manual',
                }], { onConflict: 'cliente_id,instituicao,conta_codigo,mes_referencia' });
                if (error) throw error;
            }

            // Janelas ALTERADAS: valor → grava manual (sobrepõe derivado/publicado);
            // campo limpo → remove o manual (volta a derivar).
            for (const k of janAlteradas) {
                const val = parseNumBR(formJan[k]);
                if (val === null) {
                    const { error } = await supabase.from('rentabilidade_janela').delete().match({
                        cliente_id: clienteId, instituicao: l.instituicao, conta_codigo: l.conta_codigo ?? '',
                        mes_referencia: mesRef, janela: k, origem: 'manual',
                    });
                    if (error) throw error;
                } else {
                    const { error } = await supabase.from('rentabilidade_janela').upsert([{
                        cliente_id: clienteId,
                        instituicao: l.instituicao,
                        conta_codigo: l.conta_codigo ?? '',
                        mes_referencia: mesRef,
                        janela: k,
                        rentabilidade: val / 100,
                        origem: 'manual',
                        fonte_detalhe: 'manual',
                    }], { onConflict: 'cliente_id,instituicao,conta_codigo,mes_referencia,janela' });
                    if (error) throw error;
                }
            }
        },
        onSuccess: (_data, l) => {
            toast.success(l.origem === 'auto' ? 'Correção do mês salva.' : 'Lançamento manual salvo.');
            setModalLinha(null);
            queryClient.invalidateQueries({ queryKey: ['rentabilidade'] });
        },
        onError: (err: any) => {
            if (err?.message === 'VALIDACAO') { toast.error('Informe ao menos a NET ou a rentabilidade.'); return; }
            console.error(err);
            toast.error('Não foi possível salvar a correção.');
        },
    });

    const apagarMut = useMutation({
        mutationFn: async (l: Linha) => {
            const { error } = await supabase.from('rentabilidade_mensal').delete().match({
                cliente_id: clienteId,
                instituicao: l.instituicao,
                conta_codigo: l.conta_codigo ?? '',
                mes_referencia: mesRef,
                origem: 'manual',
            });
            if (error) throw error;
            // Remove também as janelas manuais desta célula (voltam a derivar)
            const { error: eJan } = await supabase.from('rentabilidade_janela').delete().match({
                cliente_id: clienteId,
                instituicao: l.instituicao,
                conta_codigo: l.conta_codigo ?? '',
                mes_referencia: mesRef,
                origem: 'manual',
            });
            if (eJan) throw eJan;
        },
        onSuccess: () => {
            toast.success('Lançamento manual removido.');
            setModalLinha(null);
            queryClient.invalidateQueries({ queryKey: ['rentabilidade'] });
        },
        onError: (err: any) => { console.error(err); toast.error('Não foi possível apagar.'); },
    });

    const salvando = salvarMut.isPending;
    const loading = !!clienteId && universoQ.isPending;

    if (!selectedClient) return <NenhumClienteSelecionado />;
    if (universoQ.fetchStatus === 'paused' && universoQ.isPending) return (
        <EstadoErro offline titulo="Sem conexão" dica="Aguardando a rede voltar — a rentabilidade carrega sozinha assim que reconectar." />
    );
    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;
    if (universoQ.error) return (
        <EstadoErro
            titulo="Não conseguimos carregar a rentabilidade"
            dica="A consulta das janelas falhou. Tente de novo — se persistir, o engine pode estar reprocessando."
            onRetry={() => universoQ.refetch()}
        />
    );

    const linhas = universo?.linhas ?? [];
    const cons = consBloco;
    const coberturaMes = cons?.cobertura?.mes;
    const reguas = (universo && cons ? universo.benchmarks : [])
        .filter(b => JANELAS.some(j => b.valores?.[j.key] !== null && b.valores?.[j.key] !== undefined));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 20 }}>
                <div>
                    <Typography variant="h1">Rentabilidade</Typography>
                    <Typography variant="p" style={{ color: 'var(--color-text-secondary)' }}>
                        O número de cada conta é o que a própria instituição acusa — igual ao app dela.
                    </Typography>
                </div>
                <div style={{ width: 220, flexShrink: 0 }}>
                    <Select label="Mês de referência" value={mesRef} onChange={(v: string) => setMesRef(v)} options={opcoesMes} />
                </div>
            </header>

            {/* Avisos de cobertura — nunca fingir 100% quando há conta sem dados */}
            {avisosBloco.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {avisosBloco.map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', borderRadius: 'var(--radius-md)', padding: '8px 14px', fontSize: 'var(--text-sm)', color: 'var(--color-warning-text)' }}>
                            <AlertTriangle size={15} style={{ flexShrink: 0 }} /> {a}
                        </div>
                    ))}
                </div>
            )}

            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                    <thead>
                        <tr style={{ background: 'var(--color-surface-sunken)' }}>
                            <th style={{ ...th, width: 36 }} />
                            <th style={th}>Conta</th>
                            <th style={thNum}>NET de fechamento</th>
                            {JANELAS.map(j => <th key={j.key} style={thNum}>{j.label}</th>)}
                            <th style={{ ...th, width: 120, textAlign: 'center' }}>Origem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas.map(l => {
                            const fora = desmarcadas.has(l.chave);
                            return (
                                <tr key={l.chave} style={{ opacity: fora ? 0.38 : 1, transition: 'opacity 0.15s' }}>
                                    <td style={td}>
                                        <input type="checkbox" checked={!fora} onChange={() => alternarConta(l.chave)}
                                            style={{ accentColor: 'var(--color-primaria)', cursor: 'pointer' }} />
                                    </td>
                                    <td style={td}>
                                        <span style={{ fontWeight: 700, color: 'var(--color-secundaria)' }}>{l.instituicao}</span>
                                        {l.conta_codigo && <span style={{ color: 'var(--color-text-muted)', marginLeft: 8, fontSize: 12, fontFamily: 'var(--font-mono)' }}>{l.conta_codigo}</span>}
                                        {l.apelido && <span style={{ color: 'var(--color-text-secondary)', marginLeft: 8, fontSize: 12 }}>({l.apelido})</span>}
                                    </td>

                                    {/* NET */}
                                    <td style={tdNum}>{l.net !== null ? fmt(l.net) : <SemDado />}</td>

                                    {/* Janelas */}
                                    {JANELAS.map(j => (
                                        <td key={j.key} style={{ ...tdNum, fontWeight: j.key === 'mes' ? 700 : 500, color: corRent(l.rent?.[j.key]) }}>
                                            {pct(l.rent?.[j.key]) ?? <SemDado />}
                                        </td>
                                    ))}

                                    {/* Origem / ações — lápis em TODAS as linhas (auto = correção pontual do mês) */}
                                    <td style={{ ...td, textAlign: 'center', whiteSpace: 'nowrap' }}>
                                        {l.origem === 'auto' && (
                                            <Badge variant="ghost" style={{ fontSize: 9, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'color-mix(in srgb, var(--color-primaria), transparent 90%)', color: 'var(--color-primaria)', fontWeight: 700 }}>
                                                <Sparkles size={10} /> AUTO
                                            </Badge>
                                        )}
                                        {l.origem === 'manual' && (
                                            <Badge variant="ghost" style={{ fontSize: 9, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)', fontWeight: 600 }}>
                                                <PenLine size={10} /> MANUAL
                                            </Badge>
                                        )}
                                        {!l.tem_dados && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>sem dados</span>}
                                        <button
                                            title={l.origem === 'auto' ? 'Corrigir o mês (NET/rentabilidade)' : l.origem === 'manual' ? 'Editar lançamento do mês' : 'Lançar manualmente (mês)'}
                                            onClick={() => iniciarEdicao(l)} style={{ ...btnCel, marginLeft: 6 }}>
                                            <PenLine size={14} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr style={{ background: 'color-mix(in srgb, var(--color-primaria), transparent 94%)', borderTop: '2px solid color-mix(in srgb, var(--color-primaria), transparent 70%)' }}>
                            <td style={td} />
                            <td style={{ ...td, fontWeight: 700, color: 'var(--color-primaria)' }}>CONSOLIDADO</td>
                            <td style={{ ...tdNum, fontWeight: 700, color: 'var(--color-primaria)' }}>{cons ? fmt(cons.net_bloco) : '—'}</td>
                            {JANELAS.map(j => {
                                const v = cons?.rent?.[j.key];
                                return (
                                    <td key={j.key} style={{ ...tdNum, fontWeight: 700, color: v !== null && v !== undefined && v < 0 ? 'var(--color-danger-text)' : 'var(--color-primaria)' }}>
                                        {pct(v) ?? '—'}
                                    </td>
                                );
                            })}
                            <td style={{ ...td, textAlign: 'center', fontSize: 11, color: 'var(--color-primaria)', fontWeight: 600 }}>
                                {coberturaMes !== null && coberturaMes !== undefined ? `${(coberturaMes * 100).toFixed(0)}% coberto` : '—'}
                            </td>
                        </tr>
                        {reguas.map(b => (
                            <tr key={b.indexador}>
                                <td style={td} />
                                <td style={{ ...td, fontWeight: 500, color: 'var(--color-text-secondary)' }}>{b.indexador}</td>
                                <td style={td} />
                                {JANELAS.map(j => (
                                    <td key={j.key} style={{ ...tdNum, fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                                        {pct(b.valores?.[j.key]) ?? <SemDado />}
                                    </td>
                                ))}
                                <td style={td} />
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </Card>

            {/* ── Gráfico: acumulado 12m por conta vs CDI ── */}
            {chartData.length > 0 && serie && serie.series.length > 0 && (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: 'var(--color-secundaria)', color: '#fff' }}>
                        <Typography variant="p" style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: 'var(--tracking-caps)', color: '#fff' }}>
                            RENTABILIDADE ACUMULADA — ÚLTIMOS 12 MESES
                        </Typography>
                        <span style={{ fontSize: 11, opacity: 0.7, fontWeight: 600 }}>
                            REF. {mesCurto(serie.mes_referencia).toUpperCase()} · POR CONTA vs CDI
                        </span>
                    </div>
                    <div style={{ padding: '20px 12px 8px' }}>
                        <ResponsiveContainer width="100%" height={320}>
                            <LineChart data={chartData} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E4E8EB" vertical={false} />
                                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#4A565E' }} tickLine={false} axisLine={{ stroke: '#E4E8EB' }} />
                                <YAxis tick={{ fontSize: 11, fill: '#4A565E' }} tickLine={false} axisLine={false}
                                    tickFormatter={(v: number) => `${v.toFixed(1).replace('.', ',')}%`} width={52} />
                                <Tooltip
                                    formatter={(v: unknown) => [`${Number(v).toFixed(2).replace('.', ',')}%`]}
                                    labelStyle={{ fontWeight: 700, color: 'var(--color-secundaria)' }}
                                    contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border-subtle)', fontSize: 12, fontFamily: 'var(--font-family)' }}
                                />
                                <Legend
                                    content={() => (
                                        <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 18px', listStyle: 'none', margin: 0, padding: '6px 0 0' }}>
                                            {legendaPayload.map(item => {
                                                const oculta = linhasOcultas.has(item.dataKey);
                                                return (
                                                    <li key={item.dataKey} onClick={() => alternarLinha(item.dataKey)}
                                                        style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', userSelect: 'none', fontSize: 12, fontFamily: 'var(--font-family)' }}>
                                                        <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-full)', background: oculta ? 'var(--color-text-disabled)' : item.color, flexShrink: 0 }} />
                                                        <span style={{ color: oculta ? 'var(--color-text-disabled)' : 'var(--color-text-primary)', textDecoration: oculta ? 'line-through' : 'none' }}>
                                                            {item.value}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                />
                                {serie.series.map((s, i) => {
                                    const nome = `${s.instituicao} ${s.conta_codigo}`.trim();
                                    return (
                                        <Line key={s.chave} type="monotone" dataKey={nome} name={nome}
                                            stroke={corInstituicao(s.instituicao, coresDb[s.instituicao.toUpperCase()], i)}
                                            strokeWidth={2.5} dot={{ r: 2.5 }} activeDot={{ r: 4 }}
                                            connectNulls={false} hide={linhasOcultas.has(nome)} />
                                    );
                                })}
                                <Line type="monotone" dataKey="Consolidado" name="Consolidado" stroke="#0F1A21"
                                    strokeWidth={3.5} dot={{ r: 3 }} activeDot={{ r: 5 }} connectNulls={false}
                                    hide={linhasOcultas.has('Consolidado')} />
                                <Line type="monotone" dataKey="CDI" name="CDI" stroke="#69747C"
                                    strokeWidth={2} strokeDasharray="6 4" dot={false} connectNulls={false}
                                    hide={linhasOcultas.has('CDI')} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            )}

            {/* ── Fase 2: rentabilidade por ATIVO (Composição por Estratégia + Posição por Ativo) ── */}
            {clienteId && (
                <RentabilidadeAtivos clienteId={clienteId} mesRef={mesRef}
                    bloco={desmarcadas.size > 0 ? marcadas : null} />
            )}

            <Typography variant="p" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Consolidado = média das rentabilidades ponderada pela NET de fechamento do mês, por janela, sobre as contas marcadas que têm número.
                Ano = do 1º de janeiro ao mês de referência. Janelas longas usam o valor publicado pela instituição quando existe (BTG) ou o encadeamento
                dos meses disponíveis. Réguas de benchmark só aparecem com a janela completa. O lápis edita o MÊS — as janelas derivam dele.
            </Typography>

            {/* ── Modal: correção/lançamento do mês ── */}
            {modalLinha && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,31,40,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 24 }}>
                    <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 460, boxShadow: 'var(--shadow-modal)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                            <div>
                                <Typography variant="h2" style={{ fontSize: 17, margin: 0, fontWeight: 700, color: 'var(--color-secundaria)' }}>
                                    {modalLinha.origem === 'auto' ? 'Corrigir o mês' : modalLinha.origem === 'manual' ? 'Editar lançamento' : 'Lançar o mês'}
                                </Typography>
                                <Typography variant="p" style={{ margin: '4px 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                                    {modalLinha.instituicao}{modalLinha.conta_codigo ? ` · ${modalLinha.conta_codigo}` : ''} — {opcoesMes.find(o => o.value === mesRef)?.label}
                                </Typography>
                            </div>
                            <X size={20} style={{ cursor: 'pointer', flexShrink: 0, color: 'var(--color-text-muted)' }} onClick={() => setModalLinha(null)} />
                        </div>

                        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {modalLinha.origem === 'auto' && (
                                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', borderRadius: 'var(--radius-md)', padding: '10px 12px', fontSize: 'var(--text-xs)', color: 'var(--color-warning-text)', lineHeight: 1.45 }}>
                                    <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                                    <span>
                                        Correção pontual deste mês (ex.: NET distorcida por valor em trânsito).
                                        A próxima sincronização da corretora <strong>sobrescreve</strong> esta correção — o oficial sempre volta a valer.
                                    </span>
                                </div>
                            )}
                            <div>
                                <label style={mLabel}>NET de fechamento (R$)</label>
                                <input value={formNet} onChange={e => setFormNet(maskMoedaBR(e.target.value))}
                                    placeholder="0,00" inputMode="numeric" style={mCtrl} autoFocus />
                            </div>
                            <div>
                                <label style={mLabel}>Rentabilidade do mês (%)</label>
                                <input value={formRent} onChange={e => setFormRent(maskPctBR(e.target.value))}
                                    placeholder="ex.: 0,85" inputMode="decimal" style={mCtrl} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {([['ytd', 'Ano (%)'], ['12m', '12 meses (%)'], ['24m', '24 meses (%)'], ['36m', '36 meses (%)']] as const).map(([k, rotulo]) => (
                                    <div key={k}>
                                        <label style={mLabel}>{rotulo}</label>
                                        <input value={formJan[k] ?? ''} onChange={e => { const v = maskPctBR(e.target.value); setFormJan(prev => ({ ...prev, [k]: v })); }}
                                            placeholder="derivado" inputMode="decimal" style={mCtrl} />
                                    </div>
                                ))}
                            </div>
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                                Janelas: deixe como está para manter o valor derivado/publicado; alterar grava um valor manual;
                                limpar o campo volta a derivar dos meses.
                            </span>
                        </div>

                        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                            <div>
                                {modalLinha.origem === 'manual' && (
                                    <Button variant="outline" onClick={() => apagarMut.mutate(modalLinha)} disabled={apagarMut.isPending}
                                        style={{ color: 'var(--color-danger-text)', borderColor: 'var(--color-danger-border)' }}>
                                        <Trash2 size={14} style={{ marginRight: 6 }} /> Apagar
                                    </Button>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Button variant="outline" onClick={() => setModalLinha(null)}>Cancelar</Button>
                                <Button variant="solid" onClick={() => salvarMut.mutate(modalLinha)} disabled={salvando}>
                                    {salvando ? 'Salvando...' : 'Salvar'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function SemDado() {
    return <span style={{ color: 'var(--color-text-disabled)' }}>—</span>;
}

const mLabel: React.CSSProperties = {
    display: 'block', fontSize: 'var(--text-2xs)', fontWeight: 600, color: 'var(--color-text-secondary)',
    textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', marginBottom: 6,
};
const mCtrl: React.CSSProperties = {
    width: '100%', height: 40, padding: '8px 12px', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', textAlign: 'right',
    border: '1px solid color-mix(in srgb, var(--color-secundaria), transparent 80%)',
    fontFamily: 'var(--font-family)', outline: 'none', color: 'var(--color-secundaria)',
};
const btnCel: React.CSSProperties = {
    background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)',
    padding: 4, borderRadius: 5, verticalAlign: 'middle',
};
const th: React.CSSProperties = { padding: '10px 14px', fontSize: 'var(--text-2xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', color: 'var(--color-text-muted)', textAlign: 'left', whiteSpace: 'nowrap' };
const thNum: React.CSSProperties = { ...th, textAlign: 'right' };
const td: React.CSSProperties = { padding: '11px 14px', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', borderTop: '1px solid var(--color-border-subtle)' };
const tdNum: React.CSSProperties = { ...td, textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' };
