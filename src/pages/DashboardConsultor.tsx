import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Spinner, TextField } from 'avere-ui';
import { Eye, EyeOff, Search, Users, Wallet, ChevronRight, LayoutDashboard } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';
import { fmt } from '../utils/formatters';

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
}
interface Kpis {
    pl_total: number; pl_btg: number; pl_xp: number; pl_avenue: number; pl_agora: number; pl_manual: number;
    num_clientes: number; num_clientes_com_pl: number;
}

// Plataformas exibidas (na ordem e cor da identidade Avere).
const PLATAFORMAS: { key: 'pl_xp' | 'pl_btg' | 'pl_avenue' | 'pl_agora'; label: string; cor: string }[] = [
    { key: 'pl_xp', label: 'XP', cor: '#EAB308' },
    { key: 'pl_btg', label: 'BTG', cor: '#1E3A8A' },
    { key: 'pl_avenue', label: 'Avenue', cor: '#059669' },
    { key: 'pl_agora', label: 'Ágora', cor: '#DC2626' },
];

const MASCARA = 'R$ ••••••';

const th: React.CSSProperties = { padding: '10px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', textAlign: 'left', whiteSpace: 'nowrap' };
const thNum: React.CSSProperties = { ...th, textAlign: 'right' };
const td: React.CSSProperties = { padding: '11px 12px', fontSize: 13, color: '#374151', borderTop: '1px solid #F3F4F6' };
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
    const [mostrar, setMostrar] = useState(false);   // valores discretos por padrão

    // Master foca 1 consultor pelo seletor da TopBar; consultor sempre null (a RLS corta).
    const pConsultor = isMaster && consultorSelecionado && consultorSelecionado !== 'todos' && consultorSelecionado !== 'meus'
        ? consultorSelecionado
        : null;

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data, error } = await supabase.rpc('dashboard_consultor', { p_consultor_id: pConsultor });
            if (error) { setKpis(null); setClientes([]); setLoading(false); return; }
            const d = data as any;
            setKpis(d?.kpis ?? null);
            setClientes((d?.clientes ?? []) as ClienteRow[]);
            setLoading(false);
        })();
    }, [pConsultor]);

    const v = (valor: number) => (mostrar ? fmt(valor) : MASCARA);

    const enviosFiltrados = useMemo(() => {
        const q = busca.trim().toLowerCase();
        const base = q ? clientes.filter(c => c.nome.toLowerCase().includes(q) || (c.codigo_avere || '').includes(q)) : clientes;
        return base;
    }, [clientes, busca]);

    const top10 = useMemo(() => clientes.filter(c => c.pl_total > 0).slice(0, 10), [clientes]);

    const abrirCliente = (c: ClienteRow) => {
        setSelectedClient({
            id: c.cliente_id,
            codigoAvere: c.codigo_avere,
            nome: c.nome,
            consultorId: isMaster ? consultorPerfilId : (perfil?.id ?? null),
        });
        navigate('/');
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
                    <Typography variant="p" style={{ opacity: 0.6 }}>
                        {isMaster && !pConsultor ? 'Visão da casa toda — selecione um consultor na barra do topo para focar.' : 'Visão global da sua carteira de clientes.'}
                    </Typography>
                </div>
                <button
                    onClick={() => setMostrar(m => !m)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 38, padding: '0 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)', background: '#fff', color: '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                    title={mostrar ? 'Ocultar valores' : 'Mostrar valores'}>
                    {mostrar ? <EyeOff size={16} /> : <Eye size={16} />}
                    {mostrar ? 'Ocultar valores' : 'Mostrar valores'}
                </button>
            </header>

            {/* ── KPIs ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <Card style={{ padding: 20, background: 'linear-gradient(135deg, var(--color-primaria), var(--color-secundaria))', color: '#fff', border: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.85, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Wallet size={16} /> Patrimônio Consolidado
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8, letterSpacing: '-0.02em' }}>{kpis ? v(kpis.pl_total) : '—'}</div>
                </Card>
                <Card style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Users size={16} /> Clientes
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>
                        {kpis?.num_clientes_com_pl ?? 0}
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#9CA3AF' }}> de {kpis?.num_clientes ?? 0}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>com posição / cadastrados</div>
                </Card>
                {PLATAFORMAS.map(p => {
                    const val = (kpis?.[p.key] as number) ?? 0;
                    const pct = kpis && kpis.pl_total > 0 ? (val / kpis.pl_total) * 100 : 0;
                    return (
                        <Card key={p.key} style={{ padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <span style={{ width: 10, height: 10, borderRadius: 3, background: p.cor }} /> PL {p.label}
                            </div>
                            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}>{v(val)}</div>
                            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{pct.toFixed(1)}% do total</div>
                        </Card>
                    );
                })}
            </div>

            {/* ── Top 10 ── */}
            {top10.length > 0 && (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid #F3F4F6', fontWeight: 700, fontSize: 13 }}>Top 10 clientes por PL</div>
                    <div style={{ padding: '8px 0' }}>
                        {top10.map((c, i) => {
                            const pct = kpis && kpis.pl_total > 0 ? (c.pl_total / kpis.pl_total) * 100 : 0;
                            const larguraBarra = top10[0].pl_total > 0 ? (c.pl_total / top10[0].pl_total) * 100 : 0;
                            return (
                                <div key={c.cliente_id} onClick={() => abrirCliente(c)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', cursor: 'pointer' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                    <span style={{ width: 20, fontSize: 12, fontWeight: 700, color: '#9CA3AF', textAlign: 'right' }}>{i + 1}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.nome}</div>
                                        <div style={{ height: 6, background: '#F3F4F6', borderRadius: 3, marginTop: 4, overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${larguraBarra}%`, background: 'var(--color-secundaria)', borderRadius: 3 }} />
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{v(c.pl_total)}</div>
                                        <div style={{ fontSize: 11, color: '#9CA3AF' }}>{pct.toFixed(1)}% da base</div>
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
                <span style={{ fontSize: 12, color: '#9CA3AF' }}>{enviosFiltrados.length} de {clientes.length}</span>
                <div style={{ flex: 1 }} />
                <TextField leftIcon={Search} placeholder="Buscar por nome ou código..." value={busca} onChange={e => setBusca(e.target.value)} style={{ width: '300px' }} />
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB' }}>
                                <th style={th}>Cliente</th>
                                <th style={th}>Plataformas</th>
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
                                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.04)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                    <td style={td}>
                                        <div style={{ fontWeight: 600 }}>{c.nome}</div>
                                        <div style={{ fontSize: 11, color: '#9CA3AF' }}>{c.codigo_avere}</div>
                                    </td>
                                    <td style={td}>
                                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                            {plataformasDoCliente(c).map(p => (
                                                <span key={p.key} style={{ fontSize: 10, fontWeight: 700, color: p.cor, background: `${p.cor}18`, padding: '2px 6px', borderRadius: 4 }}>{p.label}</span>
                                            ))}
                                            {plataformasDoCliente(c).length === 0 && <span style={{ fontSize: 11, color: '#D1D5DB' }}>—</span>}
                                        </div>
                                    </td>
                                    <td style={tdNum}>{c.pl_xp > 0 ? v(c.pl_xp) : '—'}</td>
                                    <td style={tdNum}>{c.pl_btg > 0 ? v(c.pl_btg) : '—'}</td>
                                    <td style={tdNum}>{c.pl_avenue > 0 ? v(c.pl_avenue) : '—'}</td>
                                    <td style={tdNum}>{c.pl_agora > 0 ? v(c.pl_agora) : '—'}</td>
                                    <td style={{ ...tdNum, fontWeight: 700, color: '#111827' }}>{v(c.pl_total)}</td>
                                    <td style={{ ...td, textAlign: 'right' }}><ChevronRight size={16} color="#D1D5DB" /></td>
                                </tr>
                            ))}
                            {enviosFiltrados.length === 0 && (
                                <tr><td colSpan={8} style={{ ...td, textAlign: 'center', color: '#9CA3AF', padding: '32px' }}>Nenhum cliente encontrado.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
