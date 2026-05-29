import { useState, useEffect } from 'react';
import { Typography, Card, Button, Badge, Spinner, toast } from 'avere-ui';
import { Wrench, Lock, Trash2, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { supabase } from '../services/supabase';

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface MesElegivel {
    cliente_id: string;
    cliente_nome: string;
    mes_referencia: string;
    instituicoes_count: number;
    fim_mes: string;
    dias_desde_fim_mes: number;
    dias_para_auto_fechar?: number;
}

interface SnapshotsAPodar {
    BTG: number; XP: number; AVENUE: number; AGORA: number; total: number;
}

interface Status {
    mes_corrente: string;
    dias_buffer: number;
    elegiveis_auto_fechamento: MesElegivel[];
    no_buffer: MesElegivel[];
    snapshots_a_podar: SnapshotsAPodar;
}

const MESES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
function formatarMes(mes: string): string {
    const [a, m] = mes.split('-');
    return `${MESES_PT[parseInt(m, 10) - 1]} ${a}`;
}

// ── Componente ────────────────────────────────────────────────────────────────
export default function Manutencao() {
    const [loading, setLoading]                 = useState(false);
    const [status, setStatus]                   = useState<Status | null>(null);
    const [autoFechando, setAutoFechando]       = useState(false);
    const [podando, setPodando]                 = useState(false);

    const fetchStatus = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.rpc('listar_manutencao_status', { p_dias_buffer: 15 });
            if (error) throw error;
            setStatus(data as Status);
        } catch (err: any) {
            console.error(err);
            toast.error('Erro ao carregar status');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStatus(); }, []);

    const handleAutoFechar = async () => {
        if (!status?.elegiveis_auto_fechamento.length) return;
        const confirma = window.confirm(
            `Auto-fechar ${status.elegiveis_auto_fechamento.length} mês(es) elegível(eis)? Cada um terá os snapshots vivos materializados em snapshots_fechados + posicoes_fechadas.`
        );
        if (!confirma) return;

        setAutoFechando(true);
        try {
            const { data, error } = await supabase.rpc('auto_fechar_meses_pendentes', { p_dias_buffer: 15 });
            if (error) throw error;
            const total = (data as any)?.total_fechados ?? 0;
            toast.success(`${total} mês(es) fechado(s) automaticamente.`);
            await fetchStatus();
        } catch (err: any) {
            console.error(err);
            toast.error(`Falha no auto-fechamento: ${err.message ?? 'erro desconhecido'}`);
        } finally {
            setAutoFechando(false);
        }
    };

    const handlePodar = async () => {
        if (!status?.snapshots_a_podar.total) return;
        const confirma = window.confirm(
            `Apagar ${status.snapshots_a_podar.total} snapshot(s) vivos de meses passados (e todos os ativos vinculados)? ` +
            `Isso NÃO afeta os fechamentos já materializados em snapshots_fechados. Confirma?`
        );
        if (!confirma) return;

        setPodando(true);
        try {
            const { data, error } = await supabase.rpc('podar_snapshots_diarios');
            if (error) throw error;
            const total = (data as any)?.snapshots_apagados ?? 0;
            toast.success(`${total} snapshot(s) apagado(s) com sucesso.`);
            await fetchStatus();
        } catch (err: any) {
            console.error(err);
            toast.error(`Falha na poda: ${err.message ?? 'erro desconhecido'}`);
        } finally {
            setPodando(false);
        }
    };

    if (loading || !status) {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ background: 'rgba(0, 131, 203, 0.1)', padding: '8px', borderRadius: '8px' }}>
                            <Wrench size={24} color="var(--color-primaria)" />
                        </div>
                        <Typography variant="h1" style={{ fontWeight: 700, fontSize: '24px' }}>Manutenção</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontSize: '14px' }}>
                        Auto-fechamento de meses passados + poda de snapshots diários
                    </Typography>
                </div>
                <Typography variant="p" style={{ fontSize: '12px', color: '#6B7280' }}>
                    Mês corrente: <strong>{formatarMes(status.mes_corrente)}</strong> · Buffer: <strong>{status.dias_buffer} dias</strong>
                </Typography>
            </header>

            {/* ── Card 1: Elegíveis para auto-fechamento ── */}
            <Card style={{ padding: '20px', border: status.elegiveis_auto_fechamento.length > 0 ? '1px solid rgba(220, 38, 38, 0.2)' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Lock size={20} color={status.elegiveis_auto_fechamento.length > 0 ? '#DC2626' : '#9CA3AF'} />
                        <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                            Meses elegíveis para auto-fechamento
                        </Typography>
                        <Badge intent={status.elegiveis_auto_fechamento.length > 0 ? 'alerta' : 'secundaria'} variant="ghost" style={{ fontSize: '10px' }}>
                            {status.elegiveis_auto_fechamento.length}
                        </Badge>
                    </div>
                    <Button
                        variant="solid"
                        onClick={handleAutoFechar}
                        disabled={status.elegiveis_auto_fechamento.length === 0 || autoFechando}
                    >
                        {autoFechando ? <Spinner size="sm" /> : <Lock size={14} style={{ marginRight: '6px' }} />}
                        Auto-fechar todos
                    </Button>
                </div>

                {status.elegiveis_auto_fechamento.length === 0 ? (
                    <Typography variant="p" style={{ fontSize: '13px', color: '#9CA3AF', fontStyle: 'italic' }}>
                        Nenhum mês passou do buffer sem fechamento. Tudo em dia.
                    </Typography>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {status.elegiveis_auto_fechamento.map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'rgba(220, 38, 38, 0.05)', borderRadius: '6px', fontSize: '13px' }}>
                                <Typography variant="p" style={{ fontWeight: 700, color: '#111827', minWidth: '180px' }}>
                                    {m.cliente_nome}
                                </Typography>
                                <Typography variant="p" style={{ color: '#4B5563', flex: 1 }}>
                                    {formatarMes(m.mes_referencia)} · {m.instituicoes_count} instituição(ões) · há {m.dias_desde_fim_mes} dias
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* ── Card 2: Snapshots elegíveis para poda ── */}
            <Card style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Trash2 size={20} color={status.snapshots_a_podar.total > 0 ? '#D97706' : '#9CA3AF'} />
                        <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                            Snapshots vivos para podar
                        </Typography>
                        <Badge intent={status.snapshots_a_podar.total > 0 ? 'alerta' : 'secundaria'} variant="ghost" style={{ fontSize: '10px' }}>
                            {status.snapshots_a_podar.total}
                        </Badge>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handlePodar}
                        disabled={status.snapshots_a_podar.total === 0 || podando}
                    >
                        {podando ? <Spinner size="sm" /> : <Trash2 size={14} style={{ marginRight: '6px' }} />}
                        Executar poda
                    </Button>
                </div>

                <Typography variant="p" style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>
                    Apaga snapshots vivos de meses passados que <strong>não estão marcados como fim de mês</strong>.
                    O histórico em <code>snapshots_fechados</code> permanece intacto.
                </Typography>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {(['BTG', 'XP', 'AVENUE', 'AGORA'] as const).map(inst => (
                        <div key={inst} style={{ background: '#F9FAFB', borderRadius: '6px', padding: '10px 14px', textAlign: 'center' }}>
                            <Typography variant="p" style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {inst}
                            </Typography>
                            <Typography variant="p" style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>
                                {status.snapshots_a_podar[inst]}
                            </Typography>
                        </div>
                    ))}
                </div>
            </Card>

            {/* ── Card 3: Meses no buffer (informativo) ── */}
            <Card style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <Clock size={20} color="#6B7280" />
                    <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                        Meses ainda no buffer
                    </Typography>
                    <Badge intent="secundaria" variant="ghost" style={{ fontSize: '10px' }}>
                        {status.no_buffer.length}
                    </Badge>
                </div>

                <Typography variant="p" style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>
                    Meses sem fechamento manual mas ainda dentro do buffer de <strong>{status.dias_buffer} dias</strong>. O consultor responsável ainda tem tempo de fechar manualmente antes do auto-fechamento.
                </Typography>

                {status.no_buffer.length === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
                        <CheckCircle2 size={16} />
                        <Typography variant="p" style={{ fontSize: '13px' }}>Nenhum mês pendente no buffer.</Typography>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {status.no_buffer.map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#F9FAFB', borderRadius: '6px', fontSize: '13px' }}>
                                <AlertTriangle size={14} color="#D97706" />
                                <Typography variant="p" style={{ fontWeight: 700, color: '#111827', minWidth: '180px' }}>
                                    {m.cliente_nome}
                                </Typography>
                                <Typography variant="p" style={{ color: '#4B5563', flex: 1 }}>
                                    {formatarMes(m.mes_referencia)} · {m.instituicoes_count} instituição(ões)
                                </Typography>
                                <Badge variant="ghost" style={{ fontSize: '10px' }}>
                                    {m.dias_para_auto_fechar} dia(s) restante(s)
                                </Badge>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

        </div>
    );
}
