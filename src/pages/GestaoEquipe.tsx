import { useState, useEffect } from 'react';
import {
    Typography, Card, Button, DataTable, Spinner, Badge, toast,
    Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, TextField
} from 'avere-ui';
import { Users, Plus, Save, Trash2, Edit2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface Consultor {
    id: string;
    nome: string;
    email_professional: string;
    ativo: boolean;
    perfil_id: string;
}

export default function GestaoEquipe() {
    const [loading, setLoading] = useState(true);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ nome: '', email_professional: '', perfil_id: '', ativo: true });

    const fetchData = async () => {
        setLoading(true);
        const { data } = await supabase.from('consultores').select('*').order('nome');
        if (data) setConsultores(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        if (!formData.nome || !formData.email_professional || !formData.perfil_id) {
            toast.error('Preencha todos os campos obrigatórios.');
            return;
        }
        setSalvando(true);
        try {
            if (editId) await supabase.from('consultores').update(formData).eq('id', editId);
            else await supabase.from('consultores').insert([formData]);
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            toast.error('Erro ao salvar.');
        } finally {
            setSalvando(false);
        }
    };

    const handleEditar = (item: Consultor) => {
        setFormData({ nome: item.nome, email_professional: item.email_professional, perfil_id: item.perfil_id, ativo: item.ativo });
        setEditId(item.id);
        setIsModalOpen(true);
    };

    const handleNovo = () => {
        setEditId(null);
        setFormData({ nome: '', email_professional: '', perfil_id: '', ativo: true });
        setIsModalOpen(true);
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Users size={28} color="var(--color-secundaria)" />
                        <Typography variant="h1">Gestão de Equipe</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Administração de Consultores e Vínculos de Acesso</Typography>
                </div>
                <Button variant="solid" onClick={handleNovo}>
                    <Plus size={16} style={{ marginRight: 8 }} /> Novo Consultor
                </Button>
            </header>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <DataTable
                    data={consultores}
                    selectable={false}
                    keyExtractor={(item) => item.id}
                    columns={[
                        {
                            header: 'Nome',
                            accessorKey: 'nome',
                            cell: (item) => <Typography variant="p" style={{ fontWeight: 600 }}>{item.nome}</Typography>
                        },
                        {
                            header: 'E-mail',
                            accessorKey: 'email_professional',
                            cell: (item) => <Typography variant="p" style={{ opacity: 0.6 }}>{item.email_professional}</Typography>
                        },
                        {
                            header: 'Status',
                            cell: (item) => (
                                <Badge variant="ghost" intent={item.ativo ? 'primaria' : 'secundaria'}>
                                    {item.ativo ? 'Ativo' : 'Inativo'}
                                </Badge>
                            )
                        },
                        {
                            header: '',
                            cell: (item) => (
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2
                                        size={16} color="#9CA3AF" style={{ cursor: 'pointer' }}
                                        onClick={() => handleEditar(item)}
                                    />
                                    <Trash2
                                        size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: 0.8 }}
                                        onClick={() => {
                                            toast(`Excluir o consultor ${item.nome}?`, {
                                                action: { label: 'Excluir', onClick: async () => {
                                                    await supabase.from('consultores').delete().eq('id', item.id);
                                                    toast.success('Consultor excluído.');
                                                    fetchData();
                                                }},
                                                cancel: { label: 'Cancelar', onClick: () => {} },
                                            });
                                        }}
                                    />
                                </div>
                            )
                        }
                    ]}
                />
            </Card>

            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>{editId ? 'Editar Consultor' : 'Novo Consultor'}</ModalTitle>
                    </ModalHeader>

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label="Nome Completo"
                            placeholder="Ex: João Silva"
                            value={formData.nome}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        />
                        <TextField
                            label="E-mail Profissional"
                            placeholder="consultor@avere.com"
                            value={formData.email_professional}
                            onChange={e => setFormData({ ...formData, email_professional: e.target.value })}
                        />
                        <TextField
                            label="ID do Perfil (UUID Auth)"
                            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                            value={formData.perfil_id}
                            onChange={e => setFormData({ ...formData, perfil_id: e.target.value })}
                        />
                    </div>

                    <ModalFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSave} disabled={salvando}>
                            {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: 8 }} />}
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
