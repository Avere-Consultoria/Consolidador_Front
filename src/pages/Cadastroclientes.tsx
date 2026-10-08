import { useState, useEffect } from 'react';
import { Typography, Card, TextField, Spinner } from 'avere-ui';
import { Search, ExternalLink, Users as UsersIcon2 } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { EstadoVazio } from '../components/shared/EstadoVazio';
import { HUB_URL } from '../config/hub';
import { AvisoCadastroHub } from '../components/shared/AvisoCadastroHub';

// Base de Clientes — SOMENTE LEITURA desde 08/10/2026.
// Clientes, consultores e contas nascem e mudam no HUB Avere (avere-core); a
// edge function espelho-core copia para cá. Editar aqui seria desfeito na
// próxima rodada do espelho, por isso não há mais formulário nesta tela.

interface Consultor { id: string; nome: string; }
interface Instituicao { id: string; nome: string; tipo: string; }
interface Cliente {
    id: string;
    nome: string;
    consultor_id: string | null;
    codigo_avere: string | null;
    documento: string | null;
    ativo: boolean;
}
interface Conta {
    id: string;
    instituicao_id: string;
    apelido: string | null;
    codigo: string | null;
    documento: string | null;
    ordem?: number;
}

const isAgoraNome = (nome: string | undefined) => /agora|ágora/i.test(nome || '');

const thStyle: React.CSSProperties = {
    padding: '12px 16px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.05em', color: 'var(--color-text-muted)', textAlign: 'left', whiteSpace: 'nowrap',
};
const tdStyle: React.CSSProperties = { padding: '12px 16px', verticalAlign: 'middle' };
const selectFiltro: React.CSSProperties = {
    height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--color-border-default)',
    fontSize: '13px', fontFamily: 'var(--font-family)', background: 'var(--color-white)', outline: 'none',
    cursor: 'pointer', appearance: 'auto',
};

export default function CadastroClientes() {
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';
    const [loading, setLoading] = useState(true);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [linhas, setLinhas] = useState<Cliente[]>([]);
    const [contasPorCliente, setContasPorCliente] = useState<Record<string, Conta[]>>({});
    const [busca, setBusca] = useState('');
    const [filtroConsultor, setFiltroConsultor] = useState('');
    const [filtroInstituicao, setFiltroInstituicao] = useState('');
    const [mostrarInativos, setMostrarInativos] = useState(false);

    const instMap = new Map(instituicoes.map(i => [i.id, i]));

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const [consRes, clisRes, instRes, contasRes] = await Promise.all([
                    supabase.from('consultores').select('id, nome').order('nome'),
                    supabase.from('clientes').select('id, nome, consultor_id, codigo_avere, documento, ativo').order('nome'),
                    supabase.from('instituicoes').select('id, nome, tipo').order('tipo').order('nome'),
                    supabase.from('cliente_contas').select('id, cliente_id, instituicao_id, apelido, codigo, documento, ordem')
                        .eq('ativo', true).order('ordem'),
                ]);
                if (consRes.data) setConsultores(consRes.data);
                if (clisRes.data) setLinhas(clisRes.data);
                if (instRes.data) setInstituicoes(instRes.data);
                const map: Record<string, Conta[]> = {};
                (contasRes.data || []).forEach((r: Conta & { cliente_id: string }) => {
                    (map[r.cliente_id] = map[r.cliente_id] || []).push(r);
                });
                setContasPorCliente(map);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        })();
    }, []);

    // Rótulo de uma conta: apelido > "Inst N" (se houver >1 da mesma inst) > "Inst"
    const labelConta = (conta: Conta, irmas: Conta[]) => {
        const nomeInst = instMap.get(conta.instituicao_id)?.nome ?? 'Instituição';
        if (conta.apelido && conta.apelido.trim()) return conta.apelido.trim();
        const mesmas = irmas.filter(c => c.instituicao_id === conta.instituicao_id);
        if (mesmas.length <= 1) return nomeInst;
        return `${nomeInst} ${mesmas.findIndex(c => c === conta) + 1}`;
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    const nomeConsultor = (id: string | null) => consultores.find(c => c.id === id)?.nome || '—';
    const inativos = linhas.filter(l => !l.ativo).length;

    const linhasFiltradas = linhas.filter(l => {
        const termo = busca.toLowerCase();
        const matchBusca = !termo || l.nome.toLowerCase().includes(termo) || (l.codigo_avere?.toLowerCase().includes(termo) ?? false);
        const matchConsultor = !filtroConsultor || l.consultor_id === filtroConsultor;
        const matchInstituicao = !filtroInstituicao || (contasPorCliente[l.id] || []).some(c => c.instituicao_id === filtroInstituicao);
        return (mostrarInativos || l.ativo) && matchBusca && matchConsultor && matchInstituicao;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
                <div>
                    <Typography variant="h1" style={{ fontWeight: 700 }}>Base de Clientes</Typography>
                    <Typography variant="p" style={{ color: 'var(--color-text-secondary)' }}>Vínculos e contas por instituição, vindos do HUB Avere.</Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField leftIcon={Search} placeholder="Pesquisar por nome ou cód. Avere..." value={busca} onChange={e => setBusca(e.target.value)} style={{ width: '280px' }} />
                    <select value={filtroConsultor} onChange={e => setFiltroConsultor(e.target.value)}
                        style={{ ...selectFiltro, minWidth: '200px', color: filtroConsultor ? 'var(--color-secundaria)' : 'var(--color-text-muted)' }}>
                        <option value="">Todos os consultores</option>
                        {consultores.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                    <select value={filtroInstituicao} onChange={e => setFiltroInstituicao(e.target.value)}
                        style={{ ...selectFiltro, minWidth: '180px', color: filtroInstituicao ? 'var(--color-secundaria)' : 'var(--color-text-muted)' }}>
                        <option value="">Todas as instituições</option>
                        {instituicoes.map(i => <option key={i.id} value={i.id}>{i.tipo === 'API' ? i.nome : `${i.nome} (manual)`}</option>)}
                    </select>
                    {inativos > 0 && (
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                            <input type="checkbox" checked={mostrarInativos} onChange={e => setMostrarInativos(e.target.checked)} />
                            Mostrar inativos ({inativos})
                        </label>
                    )}
                </div>
            </header>

            <AvisoCadastroHub caminhoHub="/clientes" />

            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>Cód. Avere</th>
                            <th style={thStyle}>Consultor</th>
                            <th style={thStyle}>Contas</th>
                            {isMaster && <th style={{ ...thStyle, textAlign: 'center' }}>HUB</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {linhasFiltradas.map(l => {
                            const contas = contasPorCliente[l.id] || [];
                            return (
                                <tr key={l.id} style={{ borderBottom: '1px solid var(--color-surface-sunken)', opacity: l.ativo ? 1 : 0.5 }}>
                                    <td style={{ ...tdStyle, minWidth: '160px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-secundaria)' }}>{l.nome}</span>
                                        {!l.ativo && <span style={{ marginLeft: 8, fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>inativo</span>}
                                    </td>
                                    <td style={{ ...tdStyle, minWidth: '110px' }}>
                                        <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 600, color: 'var(--color-primaria)' }}>{l.codigo_avere || '—'}</span>
                                    </td>
                                    <td style={{ ...tdStyle, minWidth: '150px' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--color-secundaria)' }}>{nomeConsultor(l.consultor_id)}</span>
                                    </td>
                                    <td style={{ ...tdStyle, minWidth: '320px' }}>
                                        {contas.length === 0 ? (
                                            <span style={{ opacity: 0.3, fontSize: '12px' }}>nenhuma conta</span>
                                        ) : (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {contas.map(c => {
                                                    const agora = isAgoraNome(instMap.get(c.instituicao_id)?.nome);
                                                    const detalhe = agora ? [c.documento, c.codigo].filter(Boolean).join(' · ') : c.codigo;
                                                    return (
                                                        <span key={c.id} title={detalhe || ''} style={{
                                                            display: 'inline-flex', alignItems: 'baseline', gap: '6px',
                                                            background: 'var(--color-surface-sunken)', borderRadius: '6px', padding: '3px 8px', fontSize: '11px',
                                                        }}>
                                                            <strong style={{ color: 'var(--color-secundaria)' }}>{labelConta(c, contas)}</strong>
                                                            <span style={{ fontFamily: 'monospace', opacity: 0.6 }}>{detalhe || '—'}</span>
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </td>
                                    {isMaster && (
                                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                                            <a href={`${HUB_URL}/clientes/${l.id}`} target="_blank" rel="noopener noreferrer" title="Editar no HUB Avere"
                                                style={{ color: 'var(--color-text-muted)', display: 'inline-flex' }}>
                                                <ExternalLink size={16} />
                                            </a>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                        {linhasFiltradas.length === 0 && (
                            <tr><td colSpan={isMaster ? 5 : 4}><EstadoVazio compacto icon={UsersIcon2} titulo="Nenhum cliente encontrado" dica="Ajuste a busca ou os filtros." /></td></tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
