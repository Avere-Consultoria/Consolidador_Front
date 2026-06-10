import { useState, useEffect, useMemo } from 'react';
import { Typography, Card, Button, Badge, Spinner, toast } from 'avere-ui';
import { Calendar, CheckCircle2, AlertCircle, Lock, GitCompareArrows } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useClient } from '../contexts/ClientContext';

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface ContaStatus {
    conta_id: string | null;
    instituicao: string;            // base ('BTG'/'XP'/...) ou nome da instituição manual
    disponivel_data_referencia: string | null;
    disponivel_patrimonio: number | null;
    fechado_data_referencia: string | null;
    fechado_patrimonio: number | null;
    fechado_em: string | null;
}
interface MesFechamento {
    mes_referencia: string;
    contas: ContaStatus[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const MESES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function formatarMesReferencia(mes: string): string {
    const [ano, m] = mes.split('-');
    return `${MESES_PT[parseInt(m, 10) - 1]} ${ano}`;
}
function formatarDataBR(iso: string | null | undefined): string {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}
function formatarTimestampBR(iso: string | null | undefined): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function formatarMoeda(v: number | null | undefined): string {
    if (v == null) return '—';
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}

const CORES_INST: Record<string, { bg: string; fg: string; border: string }> = {
    BTG:    { bg: '#E0F2FE', fg: '#0369A1', border: '#7DD3FC' },
    XP:     { bg: '#FFEDD5', fg: '#C2410C', border: '#FDBA74' },
    AVENUE: { bg: '#FEF3C7', fg: '#92400E', border: '#FCD34D' },
    AGORA:  { bg: '#DCFCE7', fg: '#15803D', border: '#86EFAC' },
};
const COR_MANUAL = { bg: '#F1F5F9', fg: '#475569', border: '#CBD5E1' };
const corDe = (inst: string) => CORES_INST[inst] ?? COR_MANUAL;

// ── Card por conta ───────────────────────────────────────────────────────────
function CardConta({ status, label }: { status: ContaStatus; label: string }) {
    const cor = corDe(status.instituicao);
    const isFechado = status.fechado_data_referencia !== null;
    return (
        <div style={{ background: cor.bg, border: `1px solid ${cor.border}`, borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ background: '#fff', color: cor.fg, fontSize: '10px', fontWeight: 800, padding: '3px 7px', borderRadius: '4px', letterSpacing: '0.04em' }}>
                    {label}
                </span>
                {isFechado ? <Lock size={12} color={cor.fg} /> : <CheckCircle2 size={12} color={cor.fg} opacity={0.5} />}
            </div>
            <div>
                <Typography variant="p" style={{ fontSize: '10px', color: cor.fg, opacity: 0.7, fontWeight: 600 }}>{isFechado ? 'FECHADO EM' : 'FOTO DE'}</Typography>
                <Typography variant="p" style={{ fontSize: '12px', color: cor.fg, fontWeight: 700 }}>
                    {formatarDataBR(isFechado ? status.fechado_data_referencia : status.disponivel_data_referencia)}
                </Typography>
            </div>
            <div>
                <Typography variant="p" style={{ fontSize: '10px', color: cor.fg, opacity: 0.7, fontWeight: 600 }}>PATRIMÔNIO</Typography>
                <Typography variant="p" style={{ fontSize: '11px', color: cor.fg, fontWeight: 700 }}>
                    {formatarMoeda(isFechado ? status.fechado_patrimonio : status.disponivel_patrimonio)}
                </Typography>
            </div>
        </div>
    );
}

// ── Card do mês ──────────────────────────────────────────────────────────────
function CardMes({ mes, apelidoMap, onRevisar }: {
    mes: MesFechamento;
    apelidoMap: Map<string, string>;
    onRevisar: (mes: string) => void;
}) {
    const contas = mes.contas ?? [];

    // Rótulo por conta: apelido > "Inst N" (numerado quando há >1 da mesma instituição) > Inst.
    const labeled = useMemo(() => {
        const countPorInst = new Map<string, number>();
        contas.forEach(c => countPorInst.set(c.instituicao, (countPorInst.get(c.instituicao) || 0) + 1));
        const idxPorInst = new Map<string, number>();
        return contas.map(c => {
            const ap = c.conta_id ? apelidoMap.get(c.conta_id) : null;
            let label: string;
            if (ap) label = ap;
            else if ((countPorInst.get(c.instituicao) || 0) > 1) {
                const i = (idxPorInst.get(c.instituicao) || 0) + 1;
                idxPorInst.set(c.instituicao, i);
                label = `${c.instituicao} ${i}`;
            } else label = c.instituicao;
            return { c, label };
        });
    }, [contas, apelidoMap]);

    const fechadas = contas.filter(c => c.fechado_data_referencia);
    const disponiveis = contas.filter(c => c.disponivel_data_referencia && !c.fechado_data_referencia);
    const algumFechado = fechadas.length > 0;
    const todasFechadas = algumFechado && disponiveis.length === 0;
    const dataFechamento = fechadas.length > 0 ? fechadas.map(f => f.fechado_em).filter(Boolean).sort().reverse()[0] : null;

    return (
        <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', border: todasFechadas ? '1px solid rgba(21, 128, 61, 0.2)' : '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <Calendar size={18} color="var(--color-primaria)" />
                        <Typography variant="h2" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-secundaria)', margin: 0 }}>
                            {formatarMesReferencia(mes.mes_referencia)}
                        </Typography>
                        {todasFechadas && <Badge intent="primaria" variant="ghost" style={{ fontSize: '10px' }}>FECHADO</Badge>}
                        {algumFechado && !todasFechadas && <Badge intent="alerta" variant="ghost" style={{ fontSize: '10px' }}>PARCIAL</Badge>}
                        {!algumFechado && disponiveis.length > 0 && <Badge intent="neutro" variant="ghost" style={{ fontSize: '10px' }}>ABERTO</Badge>}
                    </div>
                    {dataFechamento && (
                        <Typography variant="p" style={{ fontSize: '12px', color: '#6B7280' }}>
                            Último fechamento: {formatarTimestampBR(dataFechamento)}
                        </Typography>
                    )}
                </div>
                <Button variant="solid" style={{ flexShrink: 0 }} onClick={() => onRevisar(mes.mes_referencia)}>
                    <GitCompareArrows size={16} style={{ marginRight: '8px' }} />
                    Revisar e fechar
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
                {labeled.map(({ c, label }, i) => (
                    <CardConta key={c.conta_id ?? `${c.instituicao}-${i}`} status={c} label={label} />
                ))}
            </div>
        </Card>
    );
}

// ── Página principal ─────────────────────────────────────────────────────────
export default function FechamentoMes() {
    const { selectedClient } = useClient();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [meses, setMeses] = useState<MesFechamento[]>([]);
    const [apelidoMap, setApelidoMap] = useState<Map<string, string>>(new Map());

    const fetchMeses = async () => {
        if (!selectedClient?.id) return;
        setLoading(true);
        try {
            const [{ data, error }, { data: contas }] = await Promise.all([
                supabase.rpc('listar_meses_fechamento', { p_cliente_id: selectedClient.id }),
                supabase.from('cliente_contas').select('id, apelido').eq('cliente_id', selectedClient.id),
            ]);
            if (error) throw error;
            setMeses((data ?? []) as MesFechamento[]);
            const m = new Map<string, string>();
            (contas ?? []).forEach((c: any) => { if (c.apelido && c.apelido.trim()) m.set(c.id, c.apelido.trim()); });
            setApelidoMap(m);
        } catch (err: any) {
            console.error(err);
            toast.error('Erro ao carregar meses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMeses(); }, [selectedClient?.id]);

    if (!selectedClient?.id) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
                    <AlertCircle size={32} />
                    <Typography variant="p">Selecione um cliente para visualizar os fechamentos.</Typography>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ background: 'rgba(0, 131, 203, 0.1)', padding: '8px', borderRadius: '8px' }}>
                            <Calendar size={24} color="var(--color-primaria)" />
                        </div>
                        <Typography variant="h1" style={{ fontWeight: 700, fontSize: '24px' }}>Fechamento de Mês</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontSize: '14px' }}>
                        Materializa a posição do final de cada mês de forma imutável, por conta. Cliente: <strong>{selectedClient.nome}</strong>
                    </Typography>
                </div>
            </header>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size="lg" /></div>
            ) : meses.length === 0 ? (
                <Card style={{ padding: '40px', textAlign: 'center' }}>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Nenhum mês com dados de posição encontrado para este cliente.</Typography>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {meses.map(mes => (
                        <CardMes key={mes.mes_referencia} mes={mes} apelidoMap={apelidoMap} onRevisar={(m) => navigate(`/fechamento/movimentacoes/${m}`)} />
                    ))}
                </div>
            )}
        </div>
    );
}
