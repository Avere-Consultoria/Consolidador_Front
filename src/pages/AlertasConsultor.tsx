import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Spinner } from 'avere-ui';
import { CalendarClock, ChevronRight, ShieldAlert, Landmark } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';
import { fmt, fmtDate } from '../utils/formatters';

interface Vencimento {
    cliente_id: string;
    cliente_nome: string;
    instituicao: string;
    nome: string;
    sub_tipo: string | null;
    classe: string | null;
    data_vencimento: string;
    valor: number;
}
interface FgcAlerta {
    cliente_id: string;
    cliente_nome: string;
    conglomerado: string;
    sub_tipos: string[];
    num_ativos: number;
    exposicao: number;
    vencimento_proximo: string | null;
    pct_limite: number;
    folga: number;
    nivel: 'Estourado' | 'Alerta' | 'Atenção';
}
interface CreditoAlerta {
    cliente_id: string;
    cliente_nome: string;
    emissor: string;
    exposicao: number;
    num_ativos: number;
    sub_tipos: string[];
    venc_proximo: string | null;
    pl_cliente: number;
    pct_pl: number;
    nivel: 'Crítico' | 'Alto' | 'Médio';
}

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const mesLabel = (ym: string) => { const [a, m] = ym.split('-'); return `${MESES[Number(m) - 1]}/${a}`; };

const th: React.CSSProperties = { padding: '9px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', textAlign: 'left', whiteSpace: 'nowrap' };
const thNum: React.CSSProperties = { ...th, textAlign: 'right' };
const td: React.CSSProperties = { padding: '10px 12px', fontSize: 13, color: '#374151', borderTop: '1px solid #F3F4F6' };
const tdNum: React.CSSProperties = { ...td, textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' };

export default function AlertasConsultor() {
    const navigate = useNavigate();
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';
    const { consultorSelecionado, consultorPerfilId, setSelectedClient, selectedClient } = useClient();

    const [loading, setLoading] = useState(true);
    const [vencs, setVencs] = useState<Vencimento[]>([]);
    const [fgc, setFgc] = useState<FgcAlerta[]>([]);
    const [credito, setCredito] = useState<CreditoAlerta[]>([]);
    const [clientesMap, setClientesMap] = useState<Map<string, string>>(new Map());

    const pConsultor = isMaster && consultorSelecionado && consultorSelecionado !== 'todos' && consultorSelecionado !== 'meus'
        ? consultorSelecionado
        : null;

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [vRes, fRes, cpRes, cRes] = await Promise.all([
                supabase.rpc('vencimentos_consultor', { p_consultor_id: pConsultor }),
                supabase.rpc('fgc_consultor', { p_consultor_id: pConsultor }),
                supabase.rpc('credito_privado_consultor', { p_consultor_id: pConsultor }),
                supabase.from('clientes').select('id, codigo_avere'),
            ]);
            setVencs((vRes.data as Vencimento[]) || []);
            setFgc((fRes.data as FgcAlerta[]) || []);
            setCredito((cpRes.data as CreditoAlerta[]) || []);
            setClientesMap(new Map((cRes.data || []).map((c: any) => [c.id, c.codigo_avere])));
            setLoading(false);
        })();
    }, [pConsultor]);

    const v = (valor: number) => fmt(valor);

    // Foco em 1 cliente via o seletor "Cliente Final" do topo (na página de Alertas
    // ele filtra em vez de navegar). Sem cliente = todos do escopo (consultor/casa).
    const alvo = selectedClient?.id ?? null;
    const vencsF = useMemo(() => (alvo ? vencs.filter(x => x.cliente_id === alvo) : vencs), [vencs, alvo]);
    const fgcF = useMemo(() => (alvo ? fgc.filter(x => x.cliente_id === alvo) : fgc), [fgc, alvo]);
    const creditoF = useMemo(() => (alvo ? credito.filter(x => x.cliente_id === alvo) : credito), [credito, alvo]);

    // Agrupa por mês (a lista já vem ordenada por data).
    const porMes = useMemo(() => {
        const grupos: { ym: string; itens: Vencimento[]; total: number; clientes: number }[] = [];
        const idx = new Map<string, number>();
        for (const it of vencsF) {
            const ym = (it.data_vencimento || '').slice(0, 7);
            if (!idx.has(ym)) { idx.set(ym, grupos.length); grupos.push({ ym, itens: [], total: 0, clientes: 0 }); }
            grupos[idx.get(ym)!].itens.push(it);
        }
        grupos.forEach(g => {
            g.total = g.itens.reduce((s, i) => s + (i.valor || 0), 0);
            g.clientes = new Set(g.itens.map(i => i.cliente_id)).size;
        });
        return grupos;
    }, [vencsF]);

    const totalGeral = useMemo(() => vencsF.reduce((s, i) => s + (i.valor || 0), 0), [vencsF]);

    const abrirCliente = (clienteId: string, nome: string) => {
        setSelectedClient({
            id: clienteId,
            codigoAvere: clientesMap.get(clienteId) || '',
            nome,
            consultorId: isMaster ? consultorPerfilId : (perfil?.id ?? null),
        });
        navigate(`/cliente/${clienteId}/posicao`);
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ borderBottom: '1px solid var(--color-borda)', paddingBottom: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                    <Typography variant="h1">Alertas</Typography>
                    <Typography variant="p" style={{ opacity: 0.6 }}>{selectedClient ? `Foco no cliente: ${selectedClient.nome}` : 'Vencimentos e riscos consolidados da sua carteira.'}</Typography>
                </div>
            </header>

            {/* ── Seção: Vencimentos ── */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CalendarClock size={20} color="var(--color-secundaria)" />
                    <Typography variant="p" style={{ fontWeight: 700, fontSize: 16 }}>Vencimentos próximos</Typography>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>{vencsF.length} ativos · {v(totalGeral)}</span>
                </div>

                {porMes.length === 0 && (
                    <Card style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>Nenhum vencimento futuro encontrado.</Card>
                )}

                {porMes.map(g => (
                    <Card key={g.ym} style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
                            <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--color-primaria)' }}>{mesLabel(g.ym)}</span>
                            <span style={{ fontSize: 12, color: '#6B7280' }}>{g.clientes} cliente{g.clientes === 1 ? '' : 's'} · {g.itens.length} ativo{g.itens.length === 1 ? '' : 's'}</span>
                            <div style={{ flex: 1 }} />
                            <span style={{ fontWeight: 700, fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>{v(g.total)}</span>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 680, tableLayout: 'fixed' }}>
                                <colgroup>
                                    <col style={{ width: '22%' }} />
                                    <col style={{ width: '9%' }} />
                                    <col style={{ width: '29%' }} />
                                    <col style={{ width: '9%' }} />
                                    <col style={{ width: '12%' }} />
                                    <col style={{ width: '15%' }} />
                                    <col style={{ width: '4%' }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th style={th}>Cliente</th>
                                        <th style={th}>Tipo</th>
                                        <th style={th}>Ativo</th>
                                        <th style={th}>Inst.</th>
                                        <th style={thNum}>Venc.</th>
                                        <th style={thNum}>Valor</th>
                                        <th style={th}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {g.itens.map((it, i) => (
                                        <tr key={i} onClick={() => abrirCliente(it.cliente_id, it.cliente_nome)} style={{ cursor: 'pointer' }}
                                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.04)')}
                                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                            <td style={{ ...td, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.cliente_nome}</td>
                                            <td style={td}>{it.sub_tipo ? <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-secundaria)', background: 'rgba(0,131,203,0.08)', padding: '2px 6px', borderRadius: 4 }}>{it.sub_tipo}</span> : '—'}</td>
                                            <td style={{ ...td, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.nome}</td>
                                            <td style={td}><span style={{ fontSize: 11, color: '#6B7280' }}>{it.instituicao}</span></td>
                                            <td style={tdNum}>{fmtDate(it.data_vencimento)}</td>
                                            <td style={{ ...tdNum, fontWeight: 700, color: '#111827' }}>{v(it.valor)}</td>
                                            <td style={{ ...td, textAlign: 'right' }}><ChevronRight size={15} color="#D1D5DB" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                ))}
            </section>

            {/* ── Seção: Limite FGC ── */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <ShieldAlert size={20} color="#B45309" />
                    <Typography variant="p" style={{ fontWeight: 700, fontSize: 16 }}>Limite FGC</Typography>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>{fgcF.length} alerta{fgcF.length === 1 ? '' : 's'} · exposições ≥70% do teto R$250k por conglomerado</span>
                </div>

                {fgcF.length === 0 ? (
                    <Card style={{ padding: '28px', textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>Nenhuma exposição FGC acima de 70% do limite. 👍</Card>
                ) : (
                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
                                <thead>
                                    <tr style={{ background: '#F9FAFB' }}>
                                        <th style={th}>Cliente</th>
                                        <th style={th}>Conglomerado</th>
                                        <th style={th}>Ativos</th>
                                        <th style={thNum}>Exposição</th>
                                        <th style={thNum}>Venc.</th>
                                        <th style={th}>% Limite</th>
                                        <th style={th}>Nível</th>
                                        <th style={thNum}>Folga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fgcF.map((f, i) => {
                                        const pct = Math.min(f.pct_limite, 1) * 100;
                                        const critico = f.pct_limite >= 0.9;
                                        return (
                                            <tr key={i} onClick={() => abrirCliente(f.cliente_id, f.cliente_nome)} style={{ cursor: 'pointer' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.04)')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                                <td style={{ ...td, fontWeight: 600 }}>{f.cliente_nome}</td>
                                                <td style={td}>{f.conglomerado}</td>
                                                <td style={{ ...td, fontSize: 12, color: '#6B7280' }}>{(f.sub_tipos || []).join(', ')} · {f.num_ativos}</td>
                                                <td style={{ ...tdNum, fontWeight: 700 }}>{v(f.exposicao)}</td>
                                                <td style={tdNum}>{f.vencimento_proximo ? fmtDate(f.vencimento_proximo) : '—'}</td>
                                                <td style={td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <div style={{ width: 70, height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', width: `${pct}%`, background: critico ? '#DC2626' : '#F59E0B', borderRadius: 3 }} />
                                                        </div>
                                                        <span style={{ fontSize: 12, fontWeight: 600, color: critico ? '#DC2626' : '#B45309' }}>{(f.pct_limite * 100).toFixed(0)}%</span>
                                                    </div>
                                                </td>
                                                <td style={td}>
                                                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, ...(critico ? { background: 'rgba(220,38,38,0.1)', color: '#DC2626' } : { background: 'rgba(245,158,11,0.14)', color: '#B45309' }) }}>{f.nivel}</span>
                                                </td>
                                                <td style={{ ...tdNum, color: f.folga < 0 ? '#DC2626' : '#059669', fontWeight: 600 }}>{v(f.folga)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </section>

            {/* ── Seção: Crédito Privado ── */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <Landmark size={20} color="var(--color-secundaria)" />
                    <Typography variant="p" style={{ fontWeight: 700, fontSize: 16 }}>Crédito privado</Typography>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>concentração por emissor (% do PL do cliente)</span>
                    {creditoF.length > 0 && (
                        <div style={{ display: 'flex', gap: 6 }}>
                            {(['Crítico', 'Alto', 'Médio'] as const).map(n => {
                                const q = creditoF.filter(c => c.nivel === n).length;
                                if (!q) return null;
                                const cor = n === 'Crítico' ? '#DC2626' : n === 'Alto' ? '#EA580C' : '#B45309';
                                return <span key={n} style={{ fontSize: 11, fontWeight: 700, color: cor, background: `${cor}18`, padding: '2px 8px', borderRadius: 6 }}>{q} {n.toLowerCase()}{q > 1 ? 's' : ''}</span>;
                            })}
                        </div>
                    )}
                </div>

                {creditoF.length === 0 ? (
                    <Card style={{ padding: '28px', textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>Nenhuma concentração de crédito privado acima de 5% do PL. 👍</Card>
                ) : (
                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
                                <thead>
                                    <tr style={{ background: '#F9FAFB' }}>
                                        <th style={th}>Cliente</th>
                                        <th style={th}>Emissor</th>
                                        <th style={th}>Ativos</th>
                                        <th style={thNum}>Exposição</th>
                                        <th style={th}>% do PL</th>
                                        <th style={th}>Nível</th>
                                        <th style={thNum}>Venc.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creditoF.map((c, i) => {
                                        const cor = c.nivel === 'Crítico' ? '#DC2626' : c.nivel === 'Alto' ? '#EA580C' : '#B45309';
                                        const pctBar = Math.min(c.pct_pl, 0.5) / 0.5 * 100;
                                        return (
                                            <tr key={i} onClick={() => abrirCliente(c.cliente_id, c.cliente_nome)} style={{ cursor: 'pointer' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.04)')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                                <td style={{ ...td, fontWeight: 600 }}>{c.cliente_nome}</td>
                                                <td style={td}>{c.emissor}</td>
                                                <td style={{ ...td, fontSize: 12, color: '#6B7280' }}>{(c.sub_tipos || []).join(', ')} · {c.num_ativos}</td>
                                                <td style={{ ...tdNum, fontWeight: 700 }}>{v(c.exposicao)}</td>
                                                <td style={td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <div style={{ width: 60, height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', width: `${pctBar}%`, background: cor, borderRadius: 3 }} />
                                                        </div>
                                                        <span style={{ fontSize: 12, fontWeight: 700, color: cor }}>{(c.pct_pl * 100).toFixed(1)}%</span>
                                                    </div>
                                                </td>
                                                <td style={td}><span style={{ fontSize: 11, fontWeight: 700, color: cor, background: `${cor}18`, padding: '2px 8px', borderRadius: 6 }}>{c.nivel}</span></td>
                                                <td style={tdNum}>{c.venc_proximo ? fmtDate(c.venc_proximo) : '—'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </section>
        </div>
    );
}
