import { useState, useEffect } from 'react';
import { Card, Button, DataTable, Spinner, Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, TextField } from 'avere-ui';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../../services/supabase';

// 1. Definição da Interface para acabar com os erros de 'never'
interface Instituicao {
    id: string;
    nome: string;
    cor_primaria: string;
    cor_secundaria: string | null;
}

export default function InstituicoesTab() {
    // 2. Tipagem explícita do estado <Instituicao[]>
    const [data, setData] = useState<Instituicao[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Instituicao>>({
        nome: '',
        cor_primaria: '#0083CB',
        cor_secundaria: ''
    });

    const load = async () => {
        setLoading(true);
        try {
            const { data: res, error } = await supabase
                .from('instituicoes')
                .select('*')
                .order('nome');
            if (error) throw error;
            if (res) setData(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleSave = async () => {
        const payload = { ...formData, cor_secundaria: formData.cor_secundaria || null };
        try {
            if (editId) await supabase.from('instituicoes').update(payload).eq('id', editId);
            else await supabase.from('instituicoes').insert([payload]);
            setIsModalOpen(false);
            load();
        } catch (err) {
            alert('Erro ao salvar instituição');
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}><Spinner size="lg" /></div>;

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <Button variant="solid" onClick={() => {
                    setEditId(null);
                    setFormData({ nome: '', cor_primaria: '#0083CB', cor_secundaria: '' });
                    setIsModalOpen(true);
                }}>
                    <Plus size={16} style={{ marginRight: 8 }} /> Nova Instituição
                </Button>
            </div>

            <Card style={{ padding: 0 }}>
                <DataTable
                    data={data}
                    // 3. Adicionado keyExtractor exigido na linha 41
                    keyExtractor={(item) => item.id}
                    columns={[
                        { header: 'Nome', accessorKey: 'nome' },
                        {
                            header: 'Cores',
                            cell: (item: Instituicao) => ( // Tipagem aqui resolve erros 47 e 48
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <div style={{ width: 20, height: 20, borderRadius: 4, background: item.cor_primaria, border: '1px solid rgba(0,0,0,0.1)' }} />
                                    {item.cor_secundaria && (
                                        <div style={{ width: 20, height: 20, borderRadius: 4, background: item.cor_secundaria, border: '1px solid rgba(0,0,0,0.1)' }} />
                                    )}
                                </div>
                            )
                        },
                        {
                            header: '',
                            cell: (item: Instituicao) => ( // Tipagem aqui resolve erro 56
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2
                                        size={16}
                                        color="#9CA3AF"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { setEditId(item.id); setFormData(item); setIsModalOpen(true); }}
                                    />
                                    <Trash2
                                        size={16}
                                        color="#EF4444"
                                        style={{ cursor: 'pointer' }}
                                        onClick={async () => {
                                            if (confirm('Excluir instituição?')) {
                                                await supabase.from('instituicoes').delete().eq('id', item.id);
                                                load();
                                            }
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
                    <ModalHeader><ModalTitle>{editId ? 'Editar Instituição' : 'Nova Instituição'}</ModalTitle></ModalHeader>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label="Nome"
                            value={formData.nome || ''}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: '#6B7280' }}>COR PRIMÁRIA</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="color" value={formData.cor_primaria} onChange={e => setFormData({ ...formData, cor_primaria: e.target.value })} style={{ border: 'none', width: '36px', height: '36px', cursor: 'pointer' }} />
                                    <TextField value={formData.cor_primaria} onChange={e => setFormData({ ...formData, cor_primaria: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: '#6B7280' }}>COR SECUNDÁRIA</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="color" value={formData.cor_secundaria || '#ffffff'} onChange={e => setFormData({ ...formData, cor_secundaria: e.target.value })} style={{ border: 'none', width: '36px', height: '36px', cursor: 'pointer' }} />
                                    <TextField value={formData.cor_secundaria || ''} onChange={e => setFormData({ ...formData, cor_secundaria: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSave}>Salvar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}