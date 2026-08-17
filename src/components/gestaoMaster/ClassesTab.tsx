import { useState, useEffect } from 'react';
import { Card, Button, Typography, Spinner, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, TextField, toast } from 'avere-ui';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { isValidHex } from '../../utils/colors';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ── Interface de Tipagem ──────────────────────────────────────────────────
interface ClasseAtivo {
    id: string;
    nome: string;
    cor_hex: string;
    ordem_exibicao: number;
}

// ── Componente de Item da Lista (Sortable) ────────────────────────────────
function SortableItem({ classe, onEdit, onDelete }: {
    classe: ClasseAtivo,
    onEdit: (c: ClasseAtivo) => void,
    onDelete: (id: string) => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: classe.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.6 : 1,
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        background: isDragging ? '#f9fafb' : '#fff',
        borderBottom: '1px solid #f0f0f0'
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div {...attributes} {...listeners} style={{ cursor: 'grab', opacity: 0.3, marginRight: '12px' }}>
                <GripVertical size={20} />
            </div>
            <div style={{ width: '50px', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                {String(classe.ordem_exibicao).padStart(2, '0')}
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: classe.cor_hex, border: '1px solid var(--color-border-subtle)', flexShrink: 0 }} />
                <Typography variant="p" style={{ fontWeight: 600, fontSize: '14px', margin: 0, lineHeight: 1 }}>{classe.nome}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <Edit2 size={16} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} onClick={() => onEdit(classe)} />
                <Trash2 size={16} color="var(--color-danger-solid)" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => onDelete(classe.id)} />
            </div>
        </div>
    );
}

// ── Componente Principal da Aba ───────────────────────────────────────────
export default function ClassesTab() {
    const [classes, setClasses] = useState<ClasseAtivo[]>([]);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    // Estado do Formulário
    const [formData, setFormData] = useState<Partial<ClasseAtivo>>({
        nome: '',
        cor_hex: '#0083CB',
        ordem_exibicao: 1
    });

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    const loadData = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('dicionario_classes')
                .select('*')
                .order('ordem_exibicao', { ascending: true });

            if (error) throw error;
            if (data) setClasses(data);
        } catch (err) {
            console.error('Erro ao carregar classes:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    // Reordenar via Drag & Drop
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = classes.findIndex(c => c.id === active.id);
        const newIndex = classes.findIndex(c => c.id === over.id);

        const newArray = arrayMove(classes, oldIndex, newIndex).map((c, i) => ({
            ...c,
            ordem_exibicao: i + 1
        }));

        setClasses(newArray);

        // Persistir nova ordem no banco
        const { error } = await supabase
            .from('dicionario_classes')
            .upsert(newArray.map(({ id, nome, cor_hex, ordem_exibicao }) => ({
                id, nome, cor_hex, ordem_exibicao
            })));

        if (error) {
            console.error('Erro ao salvar ordem:', error);
            loadData();
        }
    };

    // Criar ou Editar
    const handleSave = async () => {
        const nome = (formData.nome ?? '').trim();
        if (!nome) { toast.error('Preencha o nome da classe.'); return; }
        const cor = (formData.cor_hex || '').startsWith('#') ? formData.cor_hex! : `#${formData.cor_hex || ''}`;
        if (!isValidHex(cor)) { toast.error('Cor inválida (use formato hex, ex: #0083CB).'); return; }

        setSalvando(true);
        const payload = {
            nome,
            cor_hex: cor.toUpperCase(),
            ordem_exibicao: editId ? formData.ordem_exibicao : classes.length + 1,
        };

        try {
            const { error } = editId
                ? await supabase.from('dicionario_classes').update(payload).eq('id', editId)
                : await supabase.from('dicionario_classes').insert([payload]);
            if (error) throw error;

            setIsModalOpen(false);
            toast.success(editId ? `Classe "${nome}" atualizada.` : `Classe "${nome}" cadastrada.`);
            loadData();
        } catch (err) {
            console.error('Erro ao salvar:', err);
            toast.error('Falha ao salvar alterações no banco de dados.');
        } finally {
            setSalvando(false);
        }
    };

    if (loading && classes.length === 0) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}><Spinner size="lg" /></div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="solid" onClick={() => {
                    setEditId(null);
                    setFormData({ nome: '', cor_hex: '#0083CB', ordem_exibicao: classes.length + 1 });
                    setIsModalOpen(true);
                }}>
                    <Plus size={16} style={{ marginRight: 8 }} /> Nova Classe
                </Button>
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={classes} strategy={verticalListSortingStrategy}>
                        {classes.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
                                Nenhuma classe cadastrada.
                            </div>
                        ) : (
                            classes.map(c => (
                                <SortableItem
                                    key={c.id}
                                    classe={c}
                                    onEdit={(item) => {
                                        setEditId(item.id);
                                        setFormData(item);
                                        setIsModalOpen(true);
                                    }}
                                    onDelete={(id) => {
                                        toast('Excluir esta classe?', {
                                            action: { label: 'Excluir', onClick: async () => {
                                                const { error } = await supabase.from('dicionario_classes').delete().eq('id', id);
                                                if (error) { toast.error('Falha ao excluir classe.'); return; }
                                                toast.success('Classe excluída.');
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
                        <ModalTitle>{editId ? 'Editar Classe' : 'Nova Classe'}</ModalTitle>
                        <ModalDescription>Defina o nome e a cor de identificação da classe.</ModalDescription>
                    </ModalHeader>

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <TextField
                            label="Nome da classe"
                            placeholder="Ex: Renda Fixa"
                            value={formData.nome || ''}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        />

                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
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