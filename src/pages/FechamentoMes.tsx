import { useState, useEffect, useMemo } from 'react';
import { Typography, Card, Button, Badge, Spinner, toast } from 'avere-ui';
import { Calendar, CheckCircle2, AlertCircle, Lock, RefreshCw } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useClient } from '../contexts/ClientContext';
import { useAuth } from '../contexts/AuthContext';

// ── Tipos ─────────────────────────────────────────────────────────────────────
type Instituicao = 'BTG' | 'XP' | 'AVENUE' | 'AGORA';

interface InstituicaoStatus {
    instituicao: Instituicao;
    disponivel_data_referencia: string | null;
    disponivel_patrimonio: number | null;
    fechado_data_referencia: string | null;
    fechado_patrimonio: number | null;
    fechado_em: string | null;
}

interface MesFechamento {
    mes_referencia: string;       // "YYYY-MM"
    instituicoes: InstituicaoStatus[];
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

// ── Cores por instituição ────────────────────────────────────────────────────
const CORES_INST: Record<Instituicao, { bg: string; fg: string; border: string }> = {
    BTG:    { bg: '#E0F2FE', fg: '#0369A1', border: '#7DD3FC' },
    XP:     { bg: '#FFEDD5', fg: '#C2410C', border: '#FDBA74' },
    AVENUE: { bg: '#FEF3C7', fg: '#92400E', border: '#FCD34D' },
    AGORA:  { bg: '#DCFCE7', fg: '#15803D', border: '#86EFAC' },
};

const INSTITUICOES_ORDEM: Instituicao[] = ['BTG', 'XP', 'AVENUE', 'AGORA'];

// ── Card por instituição (dentro do card do mês) ─────────────────────────────
function CardInstituicao({ status }: { status: InstituicaoStatus | null; }) {
    if (!status || (!status.disponivel_data_referencia && !status.fechado_data_referencia)) {
        return (
            <div style={{
                background: '#F9FAFB', border: '1px dashed rgba(0,0,0,0.1)',
                borderRadius: '8px', padding: '12px',
                opacity: 0.5,
                display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
                <Typography variant="p" style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Sem dados
                </Typography>
            </div>
        );
    }

    const cor = CORES_INST[status.instituicao];
    const isFechado = status.fechado_data_referencia !== null;

    return (
        <div style={{
            background: cor.bg, border: `1px solid ${cor.border}`,
            borderRadius: '8px', padding: '12px',
            display: 'flex', flexDirection: 'column', gap: '6px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                    background: '#fff', color: cor.fg,
                    fontSize: '10px', fontWeight: 800,
                    padding: '3px 7px', borderRadius: '4px',
                    letterSpacing: '0.05em',
                }}>
                    {status.instituicao}
                </span>
                {isFechado ? (
                    <Lock size={12} color={cor.fg} />
                ) : (
                    <CheckCircle2 size={12} color={cor.fg} opacity={0.5} />
                )}
            </div>
            <div>
                <Typography variant="p" style={{ fontSize: '10px', color: cor.fg, opacity: 0.7, fontWeight: 600 }}>
                    {isFechado ? 'FECHADO EM' : 'FOTO DE'}
                </Typography>
                <Typography variant="p" style={{ fontSize: '12px', color: cor.fg, fontWeight: 700 }}>
                    {formatarDataBR(isFechado ? status.fechado_data_referencia : status.disponivel_data_referencia)}
                </Typography>
            </div>
            <div>
                <Typography variant="p" style={{ fontSize: '10px', color: cor.fg, opacity: 0.7, fontWeight: 600 }}>
                    PATRIMÔNIO
                </Typography>
                <Typography variant="p" style={{ fontSize: '11px', color: cor.fg, fontWeight: 700 }}>
                    {formatarMoeda(isFechado ? status.fechado_patrimonio : status.disponivel_patrimonio)}
                </Typography>
            </div>
        </div>
    );
}

// ── Card do mês ──────────────────────────────────────────────────────────────
function CardMes({
    mes, onFechar, fechandoMes,
}: {
    mes: MesFechamento;
    onFechar: (mes: string, jaFechado: boolean) => void;
    fechandoMes: string | null;
}) {
    const instituicoesMap = useMemo(() => {
        const m = new Map<Instituicao, InstituicaoStatus>();
        mes.instituicoes?.forEach(i => m.set(i.instituicao, i));
        return m;
    }, [mes.instituicoes]);

    const fechamentos = mes.instituicoes?.filter(i => i.fechado_data_referencia) ?? [];
    const disponiveis = mes.instituicoes?.filter(i => i.disponivel_data_referencia && !i.fechado_data_referencia) ?? [];
    const algumFechado = fechamentos.length > 0;
    const todasFechadas = fechamentos.length > 0 && disponiveis.length === 0;
    const estaProcessando = fechandoMes === mes.mes_referencia;

    const dataFechamento = fechamentos.length > 0
        ? fechamentos.map(f => f.fechado_em).filter(Boolean).sort().reverse()[0]
        : null;

    return (
        <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', border: todasFechadas ? '1px solid rgba(21, 128, 61, 0.2)' : '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <Calendar size={18} color="var(--color-primaria)" />
                        <Typography variant="h2" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-secundaria)', margin: 0 }}>
                            {formatarMesReferencia(mes.mes_referencia)}
                        </Typography>
                        {todasFechadas && (
                            <Badge intent="primaria" variant="ghost" style={{ fontSize: '10px' }}>
                                FECHADO
                            </Badge>
                        )}
                        {algumFechado && !todasFechadas && (
                            <Badge intent="alerta" variant="ghost" style={{ fontSize: '10px' }}>
                                PARCIAL
                            </Badge>
                        )}
                        {!algumFechado && disponiveis.length > 0 && (
                            <Badge intent="neutro" variant="ghost" style={{ fontSize: '10px' }}>
                                ABERTO
                            </Badge>
                        )}
                    </div>
                    {dataFechamento && (
                        <Typography variant="p" style={{ fontSize: '12px', color: '#6B7280' }}>
                            Último fechamento: {formatarTimestampBR(dataFechamento)}
                        </Typography>
                    )}
                </div>
                <Button
                    variant={algumFechado ? 'outline' : 'solid'}
                    onClick={() => onFechar(mes.mes_referencia, algumFechado)}
                    disabled={estaProcessando || (disponiveis.length === 0 && !algumFechado)}
                >
                    {estaProcessando ? (
                        <Spinner size="sm" />
                    ) : algumFechado ? (
                        <RefreshCw size={16} style={{ marginRight: '8px' }} />
                    ) : (
                        <Lock size={16} style={{ marginRight: '8px' }} />
                    )}
                    {algumFechado ? 'Refazer fechamento' : 'Fechar mês'}
                </Button>
            </div>

            {/* Grid de instituições */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {INSTITUICOES_ORDEM.map(inst => (
                    <CardInstituicao key={inst} status={instituicoesMap.get(inst) ?? null} />
                ))}
            </div>
        </Card>
    );
}

// ── Página principal ─────────────────────────────────────────────────────────
export default function FechamentoMes() {
    const { selectedClient } = useClient();
    const { perfil } = useAuth();

    const [loading, setLoading]     = useState(false);
    const [meses, setMeses]         = useState<MesFechamento[]>([]);
    const [fechandoMes, setFechandoMes] = useState<string | null>(null);

    const fetchMeses = async () => {
        if (!selectedClient?.id) return;
        setLoading(true);
        try {
            const { data, error } = await supabase.rpc('listar_meses_fechamento', {
                p_cliente_id: selectedClient.id,
            });
            if (error) throw error;
            setMeses((data ?? []) as MesFechamento[]);
        } catch (err: any) {
            console.error(err);
            toast.error('Erro ao carregar meses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeses();
    }, [selectedClient?.id]);

    const handleFechar = async (mes: string, jaFechado: boolean) => {
        if (!selectedClient?.id || !perfil?.id) return;

        const mensagem = jaFechado
            ? `Já existe fechamento de ${formatarMesReferencia(mes)}. Refazer apaga o anterior e recria com os dados e classificações atuais. Confirma?`
            : `Fechar ${formatarMesReferencia(mes)} de ${selectedClient.nome}? Os dados atuais serão materializados de forma imutável.`;

        const confirmar = window.confirm(mensagem);
        if (!confirmar) return;

        setFechandoMes(mes);
        try {
            const { data, error } = await supabase.rpc('fechar_mes', {
                p_cliente_id:     selectedClient.id,
                p_mes_referencia: mes,
                p_consultor_id:   perfil.id,
            });
            if (error) throw error;

            const fechamentos = (data as any)?.fechamentos ?? [];
            const totalAtivos = fechamentos.reduce((s: number, f: any) => s + (f.ativos_materializados || 0), 0);
            toast.success(`${formatarMesReferencia(mes)} fechado — ${totalAtivos} ativo(s) materializados.`);

            await fetchMeses();
        } catch (err: any) {
            console.error(err);
            toast.error(`Falha ao fechar mês: ${err.message ?? 'erro desconhecido'}`);
        } finally {
            setFechandoMes(null);
        }
    };

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
                        Materializa a posição do final de cada mês de forma imutável. Cliente: <strong>{selectedClient.nome}</strong>
                    </Typography>
                </div>
            </header>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size="lg" /></div>
            ) : meses.length === 0 ? (
                <Card style={{ padding: '40px', textAlign: 'center' }}>
                    <Typography variant="p" style={{ opacity: 0.6 }}>
                        Nenhum mês com dados de posição encontrado para este cliente.
                    </Typography>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {meses.map(mes => (
                        <CardMes
                            key={mes.mes_referencia}
                            mes={mes}
                            onFechar={handleFechar}
                            fechandoMes={fechandoMes}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}
