import { useState, useEffect } from 'react';
import { Typography, Card, Button, Spinner, Badge } from 'avere-ui';
import { Users, Save, Search } from 'lucide-react';
import { supabase } from '../services/supabase';

// ── Tipos ──────────────────────────────────────────────────────────────────
interface Consultor {
    id: string;
    nome: string;
    email: string;
    role: string;
}

interface Cliente {
    id: string;
    nome: string;
}

interface Instituicao {
    id: string;
    nome: string;
    cor_primaria: string;
}

interface CodigoCliente {
    id: string;
    cliente_id: string;
    consultor_id: string | null;
    codigo_avere: string;
    codigos_instituicoes: Record<string, string>; // { instituicao_id: codigo }
}

interface LinhaTabela {
    clienteId: string;
    clienteNome: string;
    consultorId: string;
    codigoAvere: string;
    codigos: Record<string, string>;
    modificado: boolean;
    registroId: string | null;
}

// ── Estilos ────────────────────────────────────────────────────────────────
const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#6B7280',
    background: '#F9FAFB',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    whiteSpace: 'nowrap',
    position: 'sticky',
    top: 0,
    zIndex: 1,
};

const tdStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    verticalAlign: 'middle',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid rgba(0,0,0,0.1)',
    fontSize: '12px',
    fontFamily: 'Montserrat, sans-serif',
    outline: 'none',
    background: '#fff',
    minWidth: '110px',
    boxSizing: 'border-box' as const,
};

// ── Componente Principal ───────────────────────────────────────────────────
export default function CadastroClientes() {
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);

    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [linhas, setLinhas] = useState<LinhaTabela[]>([]);

    const [busca, setBusca] = useState('');

    // ── Carga inicial ──
    useEffect(() => {
        async function fetchAll() {
            setLoading(true);
            try {
                const [consultoresRes, clientesRes, instituicoesRes, codigosRes] = await Promise.all([
                    supabase.from('perfis').select('id, nome, email, role').order('nome'),
                    supabase.from('clientes').select('id, nome').order('nome'),
                    supabase.from('instituicoes').select('id, nome, cor_primaria').order('nome'),
                    supabase.from('clientes_codigos').select('*'),
                ]);

                const cons: Consultor[] = consultoresRes.data || [];
                const clis: Cliente[] = clientesRes.data || [];
                const insts: Instituicao[] = instituicoesRes.data || [];
                const codigos: CodigoCliente[] = codigosRes.data || [];

                setConsultores(cons);
                setInstituicoes(insts);
                setClientes(clis);

                // Montar uma linha por cliente
                const linhasBase: LinhaTabela[] = clis.map(cliente => {
                    const registro = codigos.find(c => c.cliente_id === cliente.id);
                    return {
                        clienteId: cliente.id,
                        clienteNome: cliente.nome,
                        consultorId: registro?.consultor_id || '',
                        codigoAvere: registro?.codigo_avere || '',
                        codigos: registro?.codigos_instituicoes || {},
                        modificado: false,
                        registroId: registro?.id || null,
                    };
                });

                setLinhas(linhasBase);
            } catch (err) {
                console.error('Erro ao carregar:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchAll();
    }, []);

    // ── Edição de campo ──
    const handleChange = (clienteId: string, campo: string, valor: string, isInstituicao = false) => {
        setLinhas(prev => prev.map(l => {
            if (l.clienteId !== clienteId) return l;
            if (isInstituicao) {
                return { ...l, codigos: { ...l.codigos, [campo]: valor }, modificado: true };
            }
            return { ...l, [campo]: valor, modificado: true };
        }));
    };

    // ── Salvar alterações ──
    const handleSalvar = async () => {
        const modificadas = linhas.filter(l => l.modificado);
        if (modificadas.length === 0) return;

        setSalvando(true);
        try {
            const promessas = modificadas.map(linha => {
                const payload = {
                    cliente_id: linha.clienteId,
                    consultor_id: linha.consultorId || null,
                    codigo_avere: linha.codigoAvere,
                    codigos_instituicoes: linha.codigos,
                };
                if (linha.registroId) {
                    return supabase.from('clientes_codigos').update(payload).eq('id', linha.registroId);
                } else {
                    return supabase.from('clientes_codigos').insert([payload]);
                }
            });

            await Promise.all(promessas);

            // Marcar como salvo e atualizar IDs dos novos registros
            const { data: codigosRes } = await supabase.from('clientes_codigos').select('*');
            const codigos: CodigoCliente[] = codigosRes || [];

            setLinhas(prev => prev.map(l => {
                const registro = codigos.find(c => c.cliente_id === l.clienteId);
                return { ...l, modificado: false, registroId: registro?.id || l.registroId };
            }));

            alert(`${modificadas.length} cliente(s) atualizado(s) com sucesso!`);
        } catch (err) {
            console.error('Erro ao salvar:', err);
            alert('Erro ao salvar. Verifique o console.');
        } finally {
            setSalvando(false);
        }
    };

    // ── Filtro de busca ──
    const linhasFiltradas = linhas.filter(l =>
        l.clienteNome.toLowerCase().includes(busca.toLowerCase())
    );

    const modificadasCount = linhas.filter(l => l.modificado).length;

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
            <Spinner size="lg" />
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', fontFamily: 'Montserrat, sans-serif' }}>

            {/* HEADER */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Users size={28} color="#081F28" />
                        <Typography variant="h1" style={{ fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>
                            Cadastro de Clientes
                        </Typography>
                        {modificadasCount > 0 && (
                            <Badge intent="primaria" variant="solid">{modificadasCount} alteração(ões)</Badge>
                        )}
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontFamily: 'Montserrat, sans-serif' }}>
                        Relacionamento de clientes com consultores e códigos por instituição
                    </Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {/* Busca */}
                    <div style={{ position: 'relative' }}>
                        <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                        <input
                            placeholder="Buscar cliente..."
                            value={busca}
                            onChange={e => setBusca(e.target.value)}
                            style={{ ...inputStyle, paddingLeft: '30px', minWidth: '200px' }}
                        />
                    </div>
                    <Button
                        variant="solid"
                        onClick={handleSalvar}
                        disabled={salvando || modificadasCount === 0}
                    >
                        {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />}
                        {salvando ? 'Salvando...' : `Salvar (${modificadasCount})`}
                    </Button>
                </div>
            </header>

            {/* TABELA */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr>
                                <th style={{ ...thStyle, minWidth: '200px' }}>Cliente</th>
                                <th style={{ ...thStyle, minWidth: '180px' }}>Consultor</th>
                                <th style={{ ...thStyle, minWidth: '130px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#0083CB' }} />
                                        Cód. Avere
                                    </div>
                                </th>
                                {instituicoes.map(inst => (
                                    <th key={inst.id} style={{ ...thStyle, minWidth: '130px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: inst.cor_primaria }} />
                                            {inst.nome}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {linhasFiltradas.length === 0 ? (
                                <tr>
                                    <td colSpan={3 + instituicoes.length} style={{ ...tdStyle, textAlign: 'center', padding: '40px', opacity: 0.4 }}>
                                        Nenhum cliente encontrado
                                    </td>
                                </tr>
                            ) : (
                                linhasFiltradas.map(linha => (
                                    <tr
                                        key={linha.clienteId}
                                        style={{ background: linha.modificado ? 'rgba(0, 131, 203, 0.02)' : 'transparent' }}
                                    >
                                        {/* Nome do cliente */}
                                        <td style={tdStyle}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {linha.modificado && (
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0083CB', flexShrink: 0 }} />
                                                )}
                                                <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px', color: '#081F28', fontFamily: 'Montserrat, sans-serif' }}>
                                                    {linha.clienteNome}
                                                </Typography>
                                            </div>
                                        </td>

                                        {/* Consultor (select) */}
                                        <td style={tdStyle}>
                                            <select
                                                value={linha.consultorId}
                                                onChange={e => handleChange(linha.clienteId, 'consultorId', e.target.value)}
                                                style={{
                                                    ...inputStyle,
                                                    minWidth: '160px',
                                                    background: linha.consultorId ? '#fff' : 'rgba(245, 158, 11, 0.04)',
                                                }}
                                            >
                                                <option value="">Sem consultor</option>
                                                {consultores.map(c => (
                                                    <option key={c.id} value={c.id}>{c.nome || c.email}</option>
                                                ))}
                                            </select>
                                        </td>

                                        {/* Código Avere */}
                                        <td style={tdStyle}>
                                            <input
                                                style={inputStyle}
                                                placeholder="AVE-000"
                                                value={linha.codigoAvere}
                                                onChange={e => handleChange(linha.clienteId, 'codigoAvere', e.target.value)}
                                            />
                                        </td>

                                        {/* Códigos por Instituição (dinâmico) */}
                                        {instituicoes.map(inst => (
                                            <td key={inst.id} style={tdStyle}>
                                                <input
                                                    style={inputStyle}
                                                    placeholder="—"
                                                    value={linha.codigos[inst.id] || ''}
                                                    onChange={e => handleChange(linha.clienteId, inst.id, e.target.value, true)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* RODAPÉ */}
                <div style={{
                    padding: '12px 20px',
                    background: '#F9FAFB',
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Typography variant="p" style={{ fontSize: '12px', opacity: 0.5, fontFamily: 'Montserrat, sans-serif' }}>
                        {linhasFiltradas.length} de {linhas.length} clientes
                    </Typography>
                    {instituicoes.length === 0 && (
                        <Typography variant="p" style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>
                            · Nenhuma instituição cadastrada. Adicione em Configurações → Instituições.
                        </Typography>
                    )}
                </div>
            </Card>
        </div>
    );
}