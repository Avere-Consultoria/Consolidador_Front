import { useState, useEffect, useMemo } from 'react';
import { Typography, Card, Badge, Button, DataTable, Spinner, toast } from 'avere-ui';
import { History, Eye, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { supabase } from '../services/supabase';
import { useClient } from '../contexts/ClientContext';
import { DrawerAtivosFechados } from '../components/historicoMensal/DrawerAtivosFechados';

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface SnapshotFechado {
    id: string;
    cliente_id: string;
    instituicao: string;            // base ('BTG'/'XP'/...) ou nome da instituição manual
    mes_referencia: string;
    data_referencia: string;
    patrimonio_total: number;
    frozen_at: string;
}
interface PosicaoFechada {
    id: string;
    snapshot_fechado_id: string;
    instituicao: string;
    nome_exibicao: string;
    classe_avere: string | null;
    liquidez_avere: string | null;
    emissor_nome: string | null;
    data_vencimento: string | null;
    taxa: string | null;
    valor_bruto: number;
    valor_liquido: number | null;
    quantidade: number | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const MESES_PT_SHORT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
function formatarMesCurto(mes: string): string {
    const [ano, m] = mes.split('-');
    return `${MESES_PT_SHORT[parseInt(m, 10) - 1]}/${ano.slice(2)}`;
}
const MESES_PT_LONG = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
function formatarMesLongo(mes: string): string {
    const [ano, m] = mes.split('-');
    return `${MESES_PT_LONG[parseInt(m, 10) - 1]} ${ano}`;
}
function formatarMoedaCurta(v: number): string {
    if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(2)}M`;
    if (v >= 1_000)     return `R$ ${(v / 1_000).toFixed(1)}k`;
    return `R$ ${v.toFixed(0)}`;
}
function formatarMoeda(v: number | null | undefined): string {
    if (v == null) return '—';
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}

const CORES_INST: Record<string, string> = {
    BTG: '#0369A1', XP: '#C2410C', AVENUE: '#92400E', AGORA: '#15803D',
};
const PALETA_INST = ['#0083CB', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16', '#06B6D4'];
const PALETA_CLASSES = ['#0083CB', '#00B4D8', '#F59E0B', '#8B5CF6', '#10B981', '#EF4444', '#EC4899', '#6366F1', '#F97316', '#84CC16'];

// ── Página principal ─────────────────────────────────────────────────────────
export default function HistoricoMensal() {
    const { selectedClient } = useClient();

    const [loading, setLoading]           = useState(false);
    const [snapshots, setSnapshots]       = useState<SnapshotFechado[]>([]);
    const [posicoes, setPosicoes]         = useState<PosicaoFechada[]>([]);
    const [coresClasses, setCoresClasses] = useState<Map<string, string>>(new Map());
    const [drawerMes, setDrawerMes]       = useState<string | null>(null);

    const fetchData = async () => {
        if (!selectedClient?.id) return;
        setLoading(true);
        try {
            const [snapsRes, classesRes] = await Promise.all([
                supabase
                    .from('snapshots_fechados')
                    .select('id, cliente_id, instituicao, mes_referencia, data_referencia, patrimonio_total, frozen_at')
                    .eq('cliente_id', selectedClient.id)
                    .order('mes_referencia', { ascending: true }),
                supabase.from('dicionario_classes').select('nome, cor_hex').order('ordem_exibicao'),
            ]);
            if (snapsRes.error)   throw snapsRes.error;
            if (classesRes.error) throw classesRes.error;

            const snaps = (snapsRes.data ?? []) as SnapshotFechado[];
            setSnapshots(snaps);

            const corMap = new Map<string, string>();
            (classesRes.data ?? []).forEach((c: any, i: number) => {
                corMap.set(c.nome, c.cor_hex || PALETA_CLASSES[i % PALETA_CLASSES.length]);
            });
            setCoresClasses(corMap);

            if (snaps.length > 0) {
                const snapIds = snaps.map(s => s.id);
                const { data: posRes, error: posErr } = await supabase
                    .from('posicoes_fechadas')
                    .select('id, snapshot_fechado_id, instituicao, nome_exibicao, classe_avere, liquidez_avere, emissor_nome, data_vencimento, taxa, valor_bruto, valor_liquido, quantidade')
                    .in('snapshot_fechado_id', snapIds);
                if (posErr) throw posErr;
                setPosicoes((posRes ?? []) as PosicaoFechada[]);
            } else {
                setPosicoes([]);
            }
        } catch (err: any) {
            console.error(err);
            toast.error('Erro ao carregar histórico');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [selectedClient?.id]);

    // ── Agregações (instituições dinâmicas: 4 APIs + manuais) ─────────────────
    const { mesesUnicos, evolucaoData, alocacaoData, classesAtivas, resumoPorMes, instituicoesPresentes, corInst } = useMemo(() => {
        const mesesArr = Array.from(new Set(snapshots.map(s => s.mes_referencia))).sort();

        // Instituições presentes (base) — agrega contas da mesma instituição.
        const instSet = Array.from(new Set(snapshots.map(s => s.instituicao))).sort();
        const corMapInst = new Map<string, string>();
        let p = 0;
        instSet.forEach(inst => corMapInst.set(inst, CORES_INST[inst] ?? PALETA_INST[p++ % PALETA_INST.length]));
        const corInstFn = (inst: string) => corMapInst.get(inst) ?? '#9CA3AF';

        // Patrimônio total + por instituição por mês
        const totaisPorMes = new Map<string, { total: number; porInst: Record<string, number> }>();
        snapshots.forEach(s => {
            const cur = totaisPorMes.get(s.mes_referencia) ?? { total: 0, porInst: {} };
            const v = Number(s.patrimonio_total) || 0;
            cur.total += v;
            cur.porInst[s.instituicao] = (cur.porInst[s.instituicao] || 0) + v;
            totaisPorMes.set(s.mes_referencia, cur);
        });

        const evolucao = mesesArr.map(m => {
            const t = totaisPorMes.get(m)!;
            const row: any = { mes: formatarMesCurto(m), mesRef: m, Total: t.total };
            instSet.forEach(inst => { row[inst] = t.porInst[inst] || 0; });
            return row;
        });

        // Alocação por classe ao longo dos meses
        const snapToMes = new Map<string, string>();
        snapshots.forEach(s => snapToMes.set(s.id, s.mes_referencia));
        const classesSet = new Set<string>();
        const alocPorMes = new Map<string, Map<string, number>>();
        posicoes.forEach(pos => {
            const mes = snapToMes.get(pos.snapshot_fechado_id);
            if (!mes) return;
            const classe = pos.classe_avere || 'Não classificado';
            classesSet.add(classe);
            const mapPorMes = alocPorMes.get(mes) ?? new Map();
            mapPorMes.set(classe, (mapPorMes.get(classe) || 0) + Number(pos.valor_bruto || 0));
            alocPorMes.set(mes, mapPorMes);
        });
        const classes = Array.from(classesSet).sort();
        const alocacao = mesesArr.map(m => {
            const row: any = { mes: formatarMesCurto(m), mesRef: m };
            const porMes = alocPorMes.get(m) ?? new Map();
            classes.forEach(c => { row[c] = porMes.get(c) || 0; });
            return row;
        });

        const resumo = mesesArr.map(m => {
            const t = totaisPorMes.get(m)!;
            const insts = instSet.filter(i => (t.porInst[i] || 0) > 0);
            const ativosMes = posicoes.filter(pos => snapToMes.get(pos.snapshot_fechado_id) === m).length;
            return { mes_referencia: m, patrimonio_total: t.total, instituicoes: insts, ativos_count: ativosMes };
        }).reverse();

        return { mesesUnicos: mesesArr, evolucaoData: evolucao, alocacaoData: alocacao, classesAtivas: classes, resumoPorMes: resumo, instituicoesPresentes: instSet, corInst: corInstFn };
    }, [snapshots, posicoes]);

    const posicoesDoMesSelecionado = useMemo(() => {
        if (!drawerMes) return [];
        const idsDoMes = snapshots.filter(s => s.mes_referencia === drawerMes).map(s => s.id);
        return posicoes.filter(pos => idsDoMes.includes(pos.snapshot_fechado_id));
    }, [drawerMes, snapshots, posicoes]);

    // ── Render ───────────────────────────────────────────────────────────────
    if (!selectedClient?.id) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
                    <AlertCircle size={32} />
                    <Typography variant="p">Selecione um cliente para visualizar o histórico.</Typography>
                </div>
            </div>
        );
    }
    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ background: 'rgba(0, 131, 203, 0.1)', padding: '8px', borderRadius: '8px' }}>
                            <History size={24} color="var(--color-primaria)" />
                        </div>
                        <Typography variant="h1" style={{ fontWeight: 700, fontSize: '24px' }}>Histórico Mensal</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontSize: '14px' }}>
                        Posição materializada de meses fechados. Cliente: <strong>{selectedClient.nome}</strong>
                    </Typography>
                </div>
            </header>

            {mesesUnicos.length === 0 ? (
                <Card style={{ padding: '40px', textAlign: 'center' }}>
                    <Typography variant="p" style={{ opacity: 0.6 }}>
                        Nenhum mês fechado ainda. Use a tela de <strong>Fechamento de Mês</strong> para materializar o primeiro.
                    </Typography>
                </Card>
            ) : (
                <>
                    <Card style={{ padding: '20px' }}>
                        <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-secundaria)', marginBottom: '16px' }}>
                            Evolução do Patrimônio
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={evolucaoData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                                <YAxis tickFormatter={formatarMoedaCurta} tick={{ fontSize: 11 }} width={80} />
                                <Tooltip formatter={(v: number) => formatarMoeda(v)} labelStyle={{ fontWeight: 700 }} />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Line type="monotone" dataKey="Total" stroke="#111827" strokeWidth={3} dot={{ r: 4 }} />
                                {instituicoesPresentes.map(inst => (
                                    <Line key={inst} type="monotone" dataKey={inst} stroke={corInst(inst)} strokeWidth={2} dot={{ r: 3 }} />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card style={{ padding: '20px' }}>
                        <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-secundaria)', marginBottom: '16px' }}>
                            Alocação por Classe Avere
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={alocacaoData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                                <YAxis tickFormatter={formatarMoedaCurta} tick={{ fontSize: 11 }} width={80} />
                                <Tooltip formatter={(v: number) => formatarMoeda(v)} labelStyle={{ fontWeight: 700 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                {classesAtivas.map((c, i) => (
                                    <Bar key={c} dataKey={c} stackId="a" fill={coresClasses.get(c) || PALETA_CLASSES[i % PALETA_CLASSES.length]} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        <DataTable
                            data={resumoPorMes}
                            columns={[
                                { header: 'Mês', accessorKey: 'mes_referencia', cell: (item: any) => (
                                    <Typography variant="p" style={{ fontWeight: 700, fontSize: '13px' }}>{formatarMesLongo(item.mes_referencia)}</Typography>
                                ) },
                                { header: 'Patrimônio Total', accessorKey: 'patrimonio_total', cell: (item: any) => (
                                    <Typography variant="p" style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-primaria)' }}>{formatarMoeda(item.patrimonio_total)}</Typography>
                                ) },
                                { header: 'Instituições', accessorKey: 'instituicoes', cell: (item: any) => (
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        {item.instituicoes.map((i: string) => (<Badge key={i} variant="ghost" style={{ fontSize: '9px' }}>{i}</Badge>))}
                                    </div>
                                ) },
                                { header: 'Ativos', accessorKey: 'ativos_count', cell: (item: any) => (
                                    <Typography variant="p" style={{ fontSize: '13px' }}>{item.ativos_count}</Typography>
                                ) },
                                { header: '', cell: (item: any) => (
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '12px' }}>
                                        <Button variant="outline" onClick={() => setDrawerMes(item.mes_referencia)}>
                                            <Eye size={14} style={{ marginRight: '6px' }} /> Ver ativos
                                        </Button>
                                    </div>
                                ) },
                            ]}
                            keyExtractor={(item: any) => item.mes_referencia}
                            selectable={false}
                        />
                    </Card>
                </>
            )}

            <DrawerAtivosFechados
                isOpen={drawerMes !== null}
                onClose={() => setDrawerMes(null)}
                mesReferencia={drawerMes}
                posicoes={posicoesDoMesSelecionado}
            />
        </div>
    );
}
