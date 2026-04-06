import { useState, useEffect } from 'react';
import { Typography, Card, Button, DataTable, Spinner, Badge } from 'avere-ui';
import { SlidersHorizontal, Plus, Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ModalNovaRegra } from '../components/personalizarAtivos/ModalNovaRegra';

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
    const [clientes, setClientes] = useState<Cliente[]>([]); // <-- NOVO ESTADO

    // Controlo do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [regraEdicao, setRegraEdicao] = useState<Excecao | null>(null);

    const fetchData = async () => {
        if (!perfil) return;
        setLoading(true);
        try {
            // Se o RLS estiver ativo, isto já traz apenas os clientes do consultor logado
            const { data: clientesData } = await supabase.from('clientes').select('id, nome').order('nome');

            const { data: dictData } = await supabase.from('dicionario_ativos').select('codigo_identificador, nome_ativo, classe_avere, liquidez_avere');
            const { data: classData } = await supabase.from('dicionario_classes').select('nome').order('ordem_exibicao');
            const { data: regrasData } = await supabase.from('excecoes_classificacao').select('*').eq('consultor_id', perfil.id);

            if (clientesData) setClientes(clientesData);
            if (dictData) setDicionario(dictData);
            if (classData) setClassesDisponiveis(classData.map(c => c.nome));

            if (regrasData && dictData) {
                const regrasCompletas = regrasData.map(regra => {
                    const master = dictData.find(d => d.codigo_identificador === regra.codigo_identificador);
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
        if (!window.confirm('Excluir esta regra de personalização? O ativo voltará a usar o Padrão Avere.')) return;
        try {
            await supabase.from('excecoes_classificacao').delete().eq('id', id);
            fetchData();
        } catch (err) {
            alert('Erro ao excluir regra.');
        }
    };

    // Função passada para o Modal executar quando o utilizador clicar em Salvar
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
            alert('Erro ao guardar. Verifique se já não existe uma regra para este ativo neste escopo.');
        } finally {
            setSalvando(false);
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', fontFamily: 'inherit' }}>

            {/* HEADER */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <SlidersHorizontal size={28} color="#081F28" />
                        <Typography variant="h1">Personalizar Ativos</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>
                        Crie as suas próprias nomenclaturas e regras para a sua carteira de clientes.
                    </Typography>
                </div>
                <Button variant="solid" onClick={openNewModal}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> Nova Regra
                </Button>
            </header>

            {/* TABELA DE REGRAS */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <DataTable
                    data={regras}
                    columns={[
                        {
                            header: 'Identificador',
                            accessorKey: 'codigo_identificador',
                            cell: (item: Excecao) => <Typography variant="p" style={{ fontFamily: 'monospace', fontWeight: 600 }}>{item.codigo_identificador}</Typography>
                        },
                        {
                            header: 'Padrão Avere (Original)',
                            accessorKey: 'master_nome',
                            cell: (item: Excecao) => (
                                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '8px', borderRadius: '6px' }}>
                                    <Typography variant="p" style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>{item.master_nome}</Typography>
                                    <Typography variant="p" style={{ fontSize: '10px', color: '#9CA3AF' }}>{item.master_classe} • D+{item.master_liquidez}</Typography>
                                </div>
                            )
                        },
                        {
                            header: 'Sua Personalização',
                            accessorKey: 'apelido_ativo',
                            cell: (item: Excecao) => (
                                <div style={{ padding: '8px' }}>
                                    <Typography variant="p" style={{ fontSize: '13px', color: '#0083CB', fontWeight: 700 }}>
                                        {item.apelido_ativo || <span style={{ opacity: 0.5, fontStyle: 'italic' }}>Usa nome original</span>}
                                    </Typography>
                                    {(item.classe_customizada || item.liquidez_customizada) && (
                                        <Typography variant="p" style={{ fontSize: '11px', color: '#081F28', marginTop: '4px' }}>
                                            {item.classe_customizada || item.master_classe} • D+{item.liquidez_customizada || item.master_liquidez}
                                        </Typography>
                                    )}
                                </div>
                            )
                        },
                        {
                            header: 'Escopo',
                            accessorKey: 'cliente_id',
                            cell: (item: Excecao) => {
                                const clienteNome = clientes.find(c => c.id === item.cliente_id)?.nome;
                                return item.cliente_id
                                    ? <Badge variant="outline" style={{ borderColor: '#F59E0B', color: '#F59E0B' }} title={clienteNome}>Cliente Específico</Badge>
                                    : <Badge variant="outline" style={{ borderColor: '#10B981', color: '#10B981' }}>Carteira Global</Badge>
                            }
                        },
                        {
                            header: '',
                            accessorKey: 'id',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2 size={16} color="#6B7280" style={{ cursor: 'pointer' }} onClick={() => openEditModal(item)} />
                                    <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)} />
                                </div>
                            )
                        }
                    ]}
                    keyExtractor={(item) => item.id}
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