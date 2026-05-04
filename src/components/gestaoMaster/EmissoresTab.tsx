import { useState, useEffect } from 'react';
import { Card, Button, DataTable, Spinner, Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, TextField } from 'avere-ui';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { supabase } from '../../services/supabase';

// 1. Definição da Interface para o TypeScript
interface Emissor {
    id: string;
    nome_fantasia: string;
    cnpj_raiz: string;
    setor: string;
    ticker_referencia: string;
}

export default function EmissoresTab() {
    // 2. Tipagem do useState: <Emissor[]> evita o erro de 'never[]'
    const [data, setData] = useState<Emissor[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Emissor>>({
        nome_fantasia: '',
        cnpj_raiz: '',
        setor: '',
        ticker_referencia: ''
    });

    const load = async () => {
        setLoading(true);
        try {
            const { data: res, error } = await supabase
                .from('dicionario_emissores')
                .select('*')
                .order('nome_fantasia');

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
        try {
            if (editId) {
                await supabase.from('dicionario_emissores').update(formData).eq('id', editId);
            } else {
                await supabase.from('dicionario_emissores').insert([formData]);
            }
            setIsModalOpen(false);
            load();
        } catch (err) {
            alert('Erro ao salvar emissor');
        }
    };

    const filtered = data.filter((i) =>
        i.nome_fantasia.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}><Spinner size="lg" /></div>;

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 12, top: 12, opacity: 0.4 }} />
                    <input
                        className="avere-input"
                        style={{ paddingLeft: 40, width: 280 }}
                        placeholder="Buscar emissor..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <Button variant="solid" onClick={() => {
                    setEditId(null);
                    setFormData({ nome_fantasia: '', cnpj_raiz: '', setor: '', ticker_referencia: '' });
                    setIsModalOpen(true);
                }}>
                    <Plus size={16} style={{ marginRight: 8 }} /> Novo Emissor
                </Button>
            </div>

            <Card style={{ padding: 0 }}>
                <DataTable
                    data={filtered}
                    // 3. keyExtractor adicionado conforme exigido pelo erro da linha 47
                    keyExtractor={(item) => item.id}
                    columns={[
                        { header: 'Nome Fantasia', accessorKey: 'nome_fantasia' },
                        { header: 'Setor', accessorKey: 'setor' },
                        { header: 'Ticker', accessorKey: 'ticker_referencia' },
                        {
                            header: '',
                            cell: (item: Emissor) => ( // Tipagem do item no render da célula
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2
                                        size={16}
                                        color="#9CA3AF"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setEditId(item.id);
                                            setFormData(item);
                                            setIsModalOpen(true);
                                        }}
                                    />
                                    <Trash2
                                        size={16}
                                        color="#EF4444"
                                        style={{ cursor: 'pointer' }}
                                        onClick={async () => {
                                            if (confirm('Excluir este emissor?')) {
                                                await supabase.from('dicionario_emissores').delete().eq('id', item.id);
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
                    <ModalHeader><ModalTitle>{editId ? 'Editar Emissor' : 'Novo Emissor'}</ModalTitle></ModalHeader>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label="Nome Fantasia"
                            value={formData.nome_fantasia || ''}
                            onChange={e => setFormData({ ...formData, nome_fantasia: e.target.value })}
                        />
                        <TextField
                            label="CNPJ Raiz"
                            value={formData.cnpj_raiz || ''}
                            onChange={e => setFormData({ ...formData, cnpj_raiz: e.target.value })}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <TextField
                                label="Setor"
                                value={formData.setor || ''}
                                onChange={e => setFormData({ ...formData, setor: e.target.value })}
                            />
                            <TextField
                                label="Ticker"
                                value={formData.ticker_referencia || ''}
                                onChange={e => setFormData({ ...formData, ticker_referencia: e.target.value.toUpperCase() })}
                            />
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