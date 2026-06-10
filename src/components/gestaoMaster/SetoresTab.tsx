import { useState, useEffect } from 'react';
import { Card, Button, Typography, Spinner, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, TextField, toast } from 'avere-ui';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { isValidHex } from '../../utils/colors';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Setor = taxonomia do mundo crédito privado (emissor). Lista curada e editável.
interface Setor {
    id: string;
    nome: string;
    cor_hex: string;
    ordem_exibicao: number;
}

function SortableItem({ setor, onEdit, onDelete }: {
    setor: Setor,
    onEdit: (s: Setor) => void,
    onDelete: (id: string) => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: setor.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.6 : 1,
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        background: isDragging ? '#f9fafb' : '#fff',
        borderBottom: '1px solid #f0f0f0',
    };
    return (
        <div ref={setNodeRef} style={style}>
            <div {...attributes} {...listeners} style={{ cursor: 'grab', opacity: 0.3, marginRight: '12px' }}>
                <GripVertical size={20} />
            </div>
            <div style={{ width: '50px', fontSize: '11px', fontWeight: 700, color: '#9CA3AF' }}>
                {String(setor.ordem_exibicao).padStart(2, '0')}
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: setor.cor_hex, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
                <Typography variant="p" style={{ fontWeight: 600, fontSize: '14px', margin: 0, lineHeight: 1 }}>{setor.nome}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <Edit2 size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => onEdit(setor)} />
                <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => onDelete(setor.id)} />
            </div>
        </div>
    );
}

export default function SetoresTab() {
    const [setores, setSetores] = useState<Setor[]>([]);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Setor>>({ nome: '', cor_hex: '#0083CB', ordem_exibicao: 1 });

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    const loadData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('setores')
            .select('id, nome, cor_hex, ordem_exibicao')
            .order('ordem_exibicao', { ascending: true });
        if (error) {
            console.error('Erro ao carregar setores:', error);
            toast.error('Falha ao carregar setores.');
        } else if (data) {
            setSetores(data);
        }
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = setores.findIndex(s => s.id === active.id);
        const newIndex = setores.findIndex(s => s.id === over.id);
        const newArray = arrayMove(setores, oldIndex, newIndex).map((s, i) => ({ ...s, ordem_exibicao: i + 1 }));
        setSetores(newArray);
        const { error } = await supabase
            .from('setores')
            .upsert(newArray.map(({ id, nome, cor_hex, ordem_exibicao }) => ({ id, nome, cor_hex, ordem_exibicao })));
        if (error) {
            console.error('Erro ao salvar ordem:', error);
            toast.error('Falha ao salvar a nova ordem.');
            loadData();
        }
    };

    const handleSave = async () => {
        const nome = (formData.nome ?? '').trim();
        if (!nome) { toast.error('Preencha o nome do setor.'); return; }
        const cor = (formData.cor_hex || '').startsWith('#') ? formData.cor_hex! : `#${formData.cor_hex || ''}`;
        if (!isValidHex(cor)) { toast.error('Cor inválida (use formato hex, ex: #0083CB).'); return; }

        setSalvando(true);
        const payload = {
            nome,
            cor_hex: cor.toUpperCase(),
            ordem_exibicao: editId ? formData.ordem_exibicao : setores.length + 1,
        };
        try {
            const { error } = editId
                ? await supabase.from('setores').update(payload).eq('id', editId)
                : await supabase.from('setores').insert([payload]);
            if (error) {
                toast.error(error.code === '23505' ? 'Já existe um setor com esse nome.' : `Falha ao salvar: ${error.message}`);
                return;
            }
            setIsModalOpen(false);
            toast.success(editId ? `Setor "${nome}" atualizado.` : `Setor "${nome}" cadastrado.`);
            loadData();
        } finally {
            setSalvando(false);
        }
    };

    if (loading && setores.length === 0) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}><Spinner size="lg" /></div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6, margin: 0 }}>
                    Taxonomia de setores do crédito privado. Lista curada — adicionar novos setores deve ser exceção.
                </Typography>
                <Button variant="solid" onClick={() => {
                    setEditId(null);
                    setFormData({ nome: '', cor_hex: '#0083CB', ordem_exibicao: setores.length + 1 });
                    setIsModalOpen(true);
                }}>
                    <Plus size={16} style={{ marginRight: 8 }} /> Novo Setor
                </Button>
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={setores} strategy={verticalListSortingStrategy}>
                        {setores.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>Nenhum setor cadastrado.</div>
                        ) : (
                            setores.map(s => (
                                <SortableItem
                                    key={s.id}
                                    setor={s}
                                    onEdit={(item) => { setEditId(item.id); setFormData(item); setIsModalOpen(true); }}
                                    onDelete={(id) => {
                                        toast('Excluir este setor?', {
                                            action: { label: 'Excluir', onClick: async () => {
                                                const { error } = await supabase.from('setores').delete().eq('id', id);
                                                if (error) { toast.error('Falha ao excluir setor.'); return; }
                                                toast.success('Setor excluído. Emissores ligados ficam sem setor.');
                                                loadData();
                                            }},
                                            cancel: { label: 'Cancelar', onClick: () => {} },
                                        });
                                    }}
                                />
                            ))
                        )}
                    </SortableContext>
                </DndContext>
            </Card>

            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>{editId ? 'Editar Setor' : 'Novo Setor'}</ModalTitle>
                        <ModalDescription>Defina o nome e a cor de identificação do setor.</ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <TextField
                            label="Nome do setor"
                            placeholder="Ex: Energia Elétrica"
                            value={formData.nome || ''}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        />
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', marginBottom: '8px' }}>
                                Cor de identificação (HEX)
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <input
                                    type="color"
                                    value={isValidHex(formData.cor_hex) ? formData.cor_hex! : '#000000'}
                                    onChange={e => setFormData({ ...formData, cor_hex: e.target.value.toUpperCase() })}
                                    style={{ border: 'none', width: '42px', height: '42px', cursor: 'pointer', background: 'none', padding: 0 }}
                                />
                                <div style={{ flex: 1 }}>
                                    <TextField
                                        value={formData.cor_hex || ''}
                                        onChange={e => setFormData({ ...formData, cor_hex: e.target.value.toUpperCase() })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSave} disabled={salvando}>
                            {salvando ? <Spinner size="sm" /> : 'Salvar Alterações'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
