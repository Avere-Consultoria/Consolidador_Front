import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Spinner, TextField } from 'avere-ui';
import { Search, Users, Wallet, ChevronRight, LayoutDashboard } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';
import { fmt } from '../utils/formatters';
import { CORES } from '../utils/colors';

interface ClienteRow {
    cliente_id: string;
    nome: string;
    codigo_avere: string;
    pl_total: number;
    pl_btg: number;
    pl_xp: number;
    pl_avenue: number;
    pl_agora: number;
    pl_manual: number;
    contas_xp?: number;
    contas_btg?: number;
    contas_avenue?: number;
    contas_agora?: number;
}
interface Kpis {
    pl_total: number; pl_btg: number; pl_xp: number; pl_avenue: number; pl_agora: number; pl_manual: number;
    num_clientes: number; num_clientes_com_pl: number;
}

// Plataformas exibidas (na ordem e cor da identidade Avere).
const PLATAFORMAS: { key: 'pl_xp' | 'pl_btg' | 'pl_avenue' | 'pl_agora'; contasKey: 'contas_xp' | 'contas_btg' | 'contas_avenue' | 'contas_agora'; label: string; cor: string }[] = [
    { key: 'pl_xp', contasKey: 'contas_xp', label: 'XP', cor: CORES.xp },
    { key: 'pl_btg', contasKey: 'contas_btg', label: 'BTG', cor: CORES.btg },
    { key: 'pl_avenue', contasKey: 'contas_avenue', label: 'Avenue', cor: CORES.avenue },
    { key: 'pl_agora', contasKey: 'contas_agora', label: 'Ágora', cor: CORES.agora },
];


const th: React.CSSProperties = { padding: '10px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', textAlign: 'left', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1, background: 'var(--gray-50)', boxShadow: 'inset 0 -1px 0 var(--color-border-subtle)' };
const thNum: React.CSSProperties = { ...th, textAlign: 'right' };
const td: React.CSSProperties = { padding: '11px 12px', fontSize: 13, color: 'var(--color-text-primary)', borderTop: '1px solid var(--color-surface-sunken)' };
const tdNum: React.CSSProperties = { ...td, textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' };

export default function DashboardConsultor() {
    const navigate = useNavigate();
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';
    const { consultorSelecionado, consultorPerfilId, setSelectedClient } = useClient();

    const [loading, setLoading] = useState(true);
    const [kpis, setKpis] = useState<Kpis | null>(null);
    const [clientes, setClientes] = useState<ClienteRow[]>([]);
    const [busca, setBusca] = useState('');
    const [coresInst, setCoresInst] = useState<Map<string, string>>(new Map());   // nome inst. (upper) → cor_primaria

    // Master foca 1 consultor pelo seletor da TopBar; consultor sempre null (a RLS corta).
    const pConsultor = isMaster && consultorSelecionado && consultorSelecionado !== 'todos' && consultorSelecionado !== 'meus'
        ? consultorSelecionado
        : null;

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [rpcRes, instRes] = await Promise.all([
                supabase.rpc('dashboard_consultor', { p_consultor_id: pConsultor }),
                supabase.from('instituicoes').select('nome, cor_primaria'),
            ]);
            const d = rpcRes.data as any;
            setKpis(d?.kpis ?? null);
            setClientes((d?.clientes ?? []) as ClienteRow[]);
            setCoresInst(new Map((instRes.data || []).map((i: any) => [String(i.nome).toUpperCase(), i.cor_primaria as string])));
            setLoading(false);
        })();
    }, [pConsultor]);

    const v = (valor: number) => fmt(valor);
    // Cor oficial da plataforma = cor_primaria da instituição (Gestão Master); fallback = colors.ts.
    const corPlat = (label: string, fallback: string) => coresInst.get(label.toUpperCase()) || fallback;

    const enviosFiltrados = useMemo(() => {
        const q = busca.trim().toLowerCase();
        const base = q ? clientes.filter(c => c.nome.toLowerCase().includes(q) || (c.codigo_avere || '').includes(q)) : clientes;
        return [...base].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    }, [clientes, busca]);

    const top10 = useMemo(() => clientes.filter(c => c.pl_total > 0).slice(0, 10), [clientes]);

    const abrirCliente = (c: ClienteRow) => {
        setSelectedClient({
            id: c.cliente_id,
            codigoAvere: c.codigo_avere,
            nome: c.nome,
            consultorId: isMaster ? consultorPerfilId : (perfil?.id ?? null),
        });
        navigate(`/cliente/${c.cliente_id}/posicao`);
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    const plataformasDoCliente = (c: ClienteRow) => PLATAFORMAS.filter(p => (c[p.key] as number) > 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* ── Cabeçalho ── */}
            <header style={{ borderBottom: '1px solid var(--color-borda)', paddingBottom: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <LayoutDashboard size={28} color="var(--color-secundaria)" />
                        <Typography variant="h1">Dashboard</Typography>
                    </div>
                    <Typography variant="p" style={{ color: 'var(--color-text-secondary)' }}>
                        {isMaster && !pConsultor ? 'Visão da casa toda — selecione um consultor na barra do topo para focar.' : 'Visão global da sua carteira de clientes.'}
                    </Typography>
                </div>
            </header>

            {/* ── KPIs ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                <Card style={{ padding: 20, borderTop: '3px solid var(--color-secundaria)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Wallet size={16} color="var(--color-secundaria)" /> Patrimônio Consolidado
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, marginTop: 10, color: 'var(--color-primaria)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{kpis ? v(kpis.pl_total) : '—'}</div>
                </Card>
                <Card style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Users size={16} /> Clientes
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 10 }}>
                        {kpis?.num_clientes_com_pl ?? 0}
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-muted)' }}> de {kpis?.num_clientes ?? 0}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>com posição / cadastrados</div>
                </Card>
                {PLATAFORMAS.filter(p => ((kpis?.[p.key] as number) ?? 0) > 0).map(p => {
                    const val = (kpis?.[p.key] as number) ?? 0;
                    const pct = kpis && kpis.pl_total > 0 ? (val / kpis.pl_total) * 100 : 0;
                    return (
                        <Card key={p.key} style={{ padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <span style={{ width: 10, height: 10, borderRadius: 3, background: corPlat(p.label, p.cor) }} /> PL {p.label}
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 10, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{v(val)}</div>
                            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{pct.toFixed(1)}% do total</div>
                        </Card>
                    );
                })}
            </div>

            {/* ── Top 10 ── */}
            {top10.length > 0 && (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-surface-sunken)', fontWeight: 700, fontSize: 13 }}>Top 10 clientes por PL</div>
                    <div style={{ padding: '8px 0' }}>
                        {top10.map((c, i) => {
                            const pct = kpis && kpis.pl_total > 0 ? (c.pl_total / kpis.pl_total) * 100 : 0;
                            return (
                                <div key={c.cliente_id} onClick={() => abrirCliente(c)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 16px', cursor: 'pointer', borderTop: i === 0 ? 'none' : '1px solid var(--color-surface-sunken)' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-50)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                    <span style={{ width: 22, fontSize: 13, fontWeight: 700, color: i < 3 ? 'var(--color-primaria)' : 'var(--color-text-muted)', textAlign: 'right' }}>{i + 1}</span>
                                    <div style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.nome}</div>
                                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{v(c.pl_total)}</div>
                                        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{pct.toFixed(1)}% da base</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}

            {/* ── Base de clientes ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <Typography variant="p" style={{ fontWeight: 700 }}>Base de clientes</Typography>
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{enviosFiltrados.length} de {clientes.length}</span>
                <div style={{ flex: 1 }} />
                <TextField leftIcon={Search} placeholder="Buscar por nome ou código..." value={busca} onChange={e => setBusca(e.target.value)} style={{ width: '300px' }} />
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 600 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                        <thead>
                            <tr style={{ background: 'var(--gray-50)' }}>
                                <th style={th}>Cliente</th>
                                <th style={th}>Instituições</th>
                                <th style={thNum}>XP</th>
                                <th style={thNum}>BTG</th>
                                <th style={thNum}>Avenue</th>
                                <th style={thNum}>Ágora</th>
                                <th style={thNum}>PL Total</th>
                                <th style={th}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {enviosFiltrados.map(c => (
                                <tr key={c.cliente_id} onClick={() => abrirCliente(c)} style={{ cursor: 'pointer' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-accent-subtle)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                    <td style={td}>
                                        <div style={{ fontWeight: 600 }}>{c.nome}</div>
                                        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{c.codigo_avere}</div>
                                    </td>
                                    <td style={td}>
                                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                            {plataformasDoCliente(c).map(p => {
                                                const cor = corPlat(p.label, p.cor);
                                                return (
                                                    <span key={p.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 700, color: 'var(--color-text-primary)', background: 'var(--color-surface-sunken)', padding: '2px 7px', borderRadius: 4 }}>
                                                        <span style={{ width: 8, height: 8, borderRadius: 2, background: cor, flexShrink: 0 }} />{p.label}{(c[p.contasKey] ?? 0) > 1 ? ` ·${c[p.contasKey]}` : ''}
                                                    </span>
                                                );
                                            })}
                                            {plataformasDoCliente(c).length === 0 && <span style={{ fontSize: 11, color: 'var(--color-text-disabled)' }}>—</span>}
                                        </div>
                                    </td>
                                    <td style={tdNum}>{c.pl_xp > 0 ? v(c.pl_xp) : '—'}</td>
                                    <td style={tdNum}>{c.pl_btg > 0 ? v(c.pl_btg) : '—'}</td>
                                    <td style={tdNum}>{c.pl_avenue > 0 ? v(c.pl_avenue) : '—'}</td>
                                    <td style={tdNum}>{c.pl_agora > 0 ? v(c.pl_agora) : '—'}</td>
                                    <td style={{ ...tdNum, fontWeight: 700, color: 'var(--color-text-primary)' }}>{v(c.pl_total)}</td>
                                    <td style={{ ...td, textAlign: 'right' }}><ChevronRight size={16} color="var(--color-border-default)" /></td>
                                </tr>
                            ))}
                            {enviosFiltrados.length === 0 && (
                                <tr><td colSpan={8} style={{ ...td, textAlign: 'center', color: 'var(--color-text-muted)', padding: '32px' }}>Nenhum cliente encontrado.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
