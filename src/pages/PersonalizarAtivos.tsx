import { useState, useEffect } from 'react';
import { Typography, Card, Button, DataTable, Spinner, Badge } from 'avere-ui';
import { SlidersHorizontal, Plus, Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ModalNovaRegra } from '../components/personalizarAtivos/ModalNovaRegra';

// ── Tipos ─────────────────────────────────────────────────────────────────
interface DicionarioMaster {
    codigo_identificador: string;
    nome_ativo: string;
    classe_avere: string;
    liquidez_avere: string;
}

interface Excecao {
    id: string;
    cliente_id: string | null;
    codigo_identificador: string;
    apelido_ativo: string | null;
    classe_customizada: string | null;
    liquidez_customizada: string | null;
    master_nome?: string;
    master_classe?: string;
    master_liquidez?: string;
}

interface Cliente {
    id: string;
    nome: string;
}

export default function PersonalizarAtivos() {
    const { perfil } = useAuth();
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);

    // Dados
    const [regras, setRegras] = useState<Excecao[]>([]);
    const [dicionario, setDicionario] = useState<DicionarioMaster[]>([]);
    const [classesDisponiveis, setClassesDisponiveis] = useState<string[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);

    // Controlo do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [regraEdicao, setRegraEdicao] = useState<Excecao | null>(null);

    const fetchData = async () => {
        if (!perfil) return;
        setLoading(true);
        try {
            const [clientesRes, dictRes, classRes, regrasRes] = await Promise.all([
                supabase.from('clientes').select('id, nome').order('nome'),
                supabase.from('dicionario_ativos').select('codigo_identificador, nome_ativo, classe_avere, liquidez_avere'),
                supabase.from('dicionario_classes').select('nome').order('ordem_exibicao'),
                supabase.from('excecoes_classificacao').select('*').eq('consultor_id', perfil.id)
            ]);

            if (clientesRes.data) setClientes(clientesRes.data);
            if (dictRes.data) setDicionario(dictRes.data);
            if (classRes.data) setClassesDisponiveis(classRes.data.map(c => c.nome));

            if (regrasRes.data && dictRes.data) {
                const regrasCompletas = regrasRes.data.map(regra => {
                    const master = dictRes.data.find(d => d.codigo_identificador === regra.codigo_identificador);
                    return {
                        ...regra,
                        master_nome: master?.nome_ativo || 'Desconhecido',
                        master_classe: master?.classe_avere || 'Não classificado',
                        master_liquidez: master?.liquidez_avere || 'N/A'
                    };
                });
                setRegras(regrasCompletas);
            }
        } catch (err) {
            console.error('Erro ao carregar dados:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [perfil?.id]);

    const openNewModal = () => {
        setRegraEdicao(null);
        setIsModalOpen(true);
    };

    const openEditModal = (regra: Excecao) => {
        setRegraEdicao(regra);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Excluir esta regra de personalização?')) return;
        try {
            await supabase.from('excecoes_classificacao').delete().eq('id', id);
            fetchData();
        } catch (err) {
            alert('Erro ao excluir regra.');
        }
    };

    const handleSaveRegra = async (payload: any, editId: string | null) => {
        setSalvando(true);
        try {
            const payloadFinal = { ...payload, consultor_id: perfil!.id };
            if (editId) {
                await supabase.from('excecoes_classificacao').update(payloadFinal).eq('id', editId);
            } else {
                await supabase.from('excecoes_classificacao').insert([payloadFinal]);
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            alert('Erro ao guardar as alterações.');
        } finally {
            setSalvando(false);
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', fontFamily: 'Montserrat, sans-serif' }}>

            {/* HEADER */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ background: 'rgba(0, 131, 203, 0.1)', padding: '8px', borderRadius: '8px' }}>
                            <SlidersHorizontal size={24} color="var(--color-primaria)" />
                        </div>
                        <Typography variant="h1" style={{ fontWeight: 700, fontSize: '24px' }}>Personalizar Ativos</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontSize: '14px' }}>
                        Crie exceções de nomenclatura e classificação para carteiras específicas ou globais.
                    </Typography>
                </div>
                <Button variant="solid" onClick={openNewModal}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> Nova Regra
                </Button>
            </header>

            {/* TABELA DE REGRAS */}
            <Card style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <DataTable
                    data={regras}
                    columns={[
                        {
                            header: 'Identificador',
                            accessorKey: 'codigo_identificador',
                            cell: (item: Excecao) => (
                                <Typography variant="p" style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '12px', color: '#6B7280' }}>
                                    {item.codigo_identificador}
                                </Typography>
                            )
                        },
                        {
                            header: 'Ativo (Original / Personalizado)',
                            accessorKey: 'apelido_ativo',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '4px 0' }}>
                                    <Typography variant="p" style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                                        {item.master_nome}
                                    </Typography>
                                    <Typography variant="p" style={{ fontSize: '14px', color: '#0083CB', fontWeight: 700 }}>
                                        {item.apelido_ativo || <span style={{ opacity: 0.4, fontWeight: 500, fontStyle: 'italic' }}>Nome original mantido</span>}
                                    </Typography>
                                </div>
                            )
                        },
                        {
                            header: 'Classe',
                            accessorKey: 'classe_customizada',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="p" style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 700, textTransform: 'uppercase' }}>
                                        {item.master_classe}
                                    </Typography>
                                    <Typography variant="p" style={{ fontSize: '13px', color: item.classe_customizada ? '#081F28' : '#9CA3AF', fontWeight: 600 }}>
                                        {item.classe_customizada || 'Sem alteração'}
                                    </Typography>
                                </div>
                            )
                        },
                        {
                            header: 'Liquidez',
                            accessorKey: 'liquidez_customizada',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="p" style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>
                                        D+{item.master_liquidez}
                                    </Typography>
                                    <Typography variant="p" style={{ fontSize: '13px', color: item.liquidez_customizada ? '#081F28' : '#9CA3AF', fontWeight: 700 }}>
                                        {item.liquidez_customizada ? `D+${item.liquidez_customizada}` : '—'}
                                    </Typography>
                                </div>
                            )
                        },
                        {
                            header: 'Escopo',
                            accessorKey: 'cliente_id',
                            cell: (item: Excecao) => {
                                const clienteNome = clientes.find(c => c.id === item.cliente_id)?.nome;
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {item.cliente_id ? (
                                            <>
                                                <Badge variant="ghost" style={{ background: '#FFF7ED', color: '#C2410C', fontSize: '10px', border: 'none' }}>
                                                    Cliente Específico
                                                </Badge>
                                                <Typography variant="p" style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', paddingLeft: '4px' }}>
                                                    {clienteNome}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Badge variant="ghost" style={{ background: '#ECFDF5', color: '#047857', fontSize: '10px', border: 'none' }}>
                                                Carteira Global
                                            </Badge>
                                        )}
                                    </div>
                                );
                            }
                        },
                        {
                            header: '',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2
                                        size={16}
                                        color="#9CA3AF"
                                        style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                                        className="hover:text-blue-500"
                                        onClick={() => openEditModal(item)}
                                    />
                                    <Trash2
                                        size={16}
                                        color="#EF4444"
                                        style={{ cursor: 'pointer', opacity: 0.7 }}
                                        onClick={() => handleDelete(item.id)}
                                    />
                                </div>
                            )
                        }
                    ]}
                    keyExtractor={(item) => item.id}
                    selectable={false}
                />
            </Card>

            <ModalNovaRegra
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRegra}
                salvando={salvando}
                regraEdicao={regraEdicao}
                dicionario={dicionario}
                classesDisponiveis={classesDisponiveis}
                clientes={clientes}
            />
        </div>
    );
}