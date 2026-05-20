import { useState, useEffect } from 'react';
import {
    Typography, Card, Button, DataTable, Spinner, Badge, toast,
    Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, TextField
} from 'avere-ui';
import { Users, Plus, Save, Trash2, Edit2, Search, Mail, Loader2 } from 'lucide-react';
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
    const [busca, setBusca] = useState('');
    const [convite, setConvite] = useState<string | null>(null); // id do consultor sendo convidado

    const fetchData = async () => {
        setLoading(true);
        const { data } = await supabase.from('consultores').select('*').order('nome');
        if (data) setConsultores(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        if (!formData.nome || !formData.email_professional) {
            toast.error('Nome e e-mail são obrigatórios.');
            return;
        }
        setSalvando(true);
        // perfil_id vazio não é UUID válido — converte para null
        const payload = {
            ...formData,
            perfil_id: formData.perfil_id || null
        };
        try {
            if (editId) await supabase.from('consultores').update(payload).eq('id', editId);
            else await supabase.from('consultores').insert([payload]);
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

    const handleConvidar = async (item: Consultor) => {
        setConvite(item.id);
        try {
            const { error } = await supabase.functions.invoke('invite-consultor', {
                body: { consultor_id: item.id, email: item.email_professional, nome: item.nome }
            });
            if (error) throw error;
            toast.success(`Convite enviado para ${item.email_professional}!`);
        } catch {
            toast.error('Erro ao enviar convite. Verifique o e-mail e tente novamente.');
        } finally {
            setConvite(null);
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Users size={28} color="var(--color-secundaria)" />
                        <Typography variant="h1">Gestão de Equipe</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Administração de Consultores e Vínculos de Acesso</Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <TextField
                        leftIcon={Search}
                        placeholder="Pesquisar consultor..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        style={{ width: '240px' }}
                    />
                    <Button variant="solid" onClick={handleNovo}>
                        <Plus size={16} style={{ marginRight: 8 }} /> Novo Consultor
                    </Button>
                </div>
            </header>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <DataTable
                    data={consultores.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))}
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
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <Badge variant="ghost" intent={item.ativo ? 'primaria' : 'secundaria'}>
                                        {item.ativo ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                    <Badge variant="ghost" intent={item.perfil_id ? 'primaria' : 'neutro'} style={{ fontSize: '10px', opacity: 0.7 }}>
                                        {item.perfil_id ? '● Vinculado' : '○ Sem acesso'}
                                    </Badge>
                                </div>
                            )
                        },
                        {
                            header: '',
                            cell: (item) => (
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px', alignItems: 'center' }}>
                                    {!item.perfil_id && (
                                        convite === item.id
                                            ? <Loader2 size={16} color="var(--color-primaria)" style={{ animation: 'spin 1s linear infinite' }} />
                                            : <Mail
                                                size={16} color="var(--color-primaria)" style={{ cursor: 'pointer', opacity: 0.7 }}
                                                title="Enviar convite de acesso"
                                                onClick={() => {
                                                    toast(`Enviar convite para ${item.email_professional}?`, {
                                                        action: { label: 'Enviar', onClick: () => handleConvidar(item) },
                                                        cancel: { label: 'Cancelar', onClick: () => {} },
                                                    });
                                                }}
                                            />
                                    )}
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
                        <ModalDescription>Preencha os dados do consultor. O vínculo de acesso pode ser configurado depois.</ModalDescription>
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
                        <p style={{ margin: '0', fontSize: '12px', color: '#9CA3AF', lineHeight: 1.5 }}>
                            Após salvar, use o ícone <strong style={{ color: 'var(--color-primaria)' }}>✉ Convidar</strong> na tabela para enviar o e-mail de acesso ao consultor. O vínculo de conta será feito automaticamente quando ele aceitar o convite.
                        </p>
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
