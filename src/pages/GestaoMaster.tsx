import { useState, useEffect, useRef } from 'react';
import { Typography, Card, Button, DataTable, Spinner, Badge } from 'avere-ui';
import { Settings, Building2, PieChart, Plus, Save, Trash2, Edit2, X, GripVertical, Landmark } from 'lucide-react';
import { supabase } from '../services/supabase';

// Dependências do DnD Kit
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ── Tipos ─────────────────────────────────────────────────────────────────
interface Emissor {
    id: string;
    nome_fantasia: string;
    cnpj_raiz: string;
    setor: string;
    ticker_referencia: string;
}

interface ClasseAtivo {
    id: string;
    nome: string;
    cor_hex: string;
    ordem_exibicao: number;
}

interface Instituicao {
    id: string;
    nome: string;
    cor_primaria: string;
    cor_secundaria: string;
}

// ── Componente de Item Arrastável (Linha da Classe) ────────────────────────
function SortableClasseItem({
    classe,
    onEdit,
    onDelete
}: {
    classe: ClasseAtivo;
    onEdit: (c: ClasseAtivo) => void;
    onDelete: (id: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: classe.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.6 : 1,
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        background: isDragging ? '#f0f9ff' : '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        gap: '12px',
        boxShadow: isDragging ? '0 5px 15px rgba(0,0,0,0.1)' : 'none',
        borderRadius: isDragging ? '8px' : '0'
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div {...attributes} {...listeners} style={{ cursor: 'grab', display: 'flex', alignItems: 'center', padding: '0 4px', opacity: 0.3 }}>
                <GripVertical size={20} />
            </div>

            <div style={{ width: '60px', minWidth: '60px', textAlign: 'center' }}>
                <Typography variant="p" style={{ fontSize: '12px', opacity: 0.4, fontWeight: 700 }}>
                    {classe.ordem_exibicao}
                </Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '200px' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: classe.cor_hex, border: '1px solid rgba(0,0,0,0.1)' }} />
                <Typography variant="p" style={{ fontWeight: 600, fontSize: '14px', color: '#081F28' }}>
                    {classe.nome}
                </Typography>
            </div>

            <div style={{ width: '120px', minWidth: '120px', textAlign: 'center' }}>
                <Typography variant="p" style={{ fontSize: '12px', fontFamily: 'monospace', opacity: 0.5 }}>
                    {classe.cor_hex.toUpperCase()}
                </Typography>
            </div>

            <div style={{ width: '100px', minWidth: '100px', display: 'flex', gap: '16px', justifyContent: 'flex-end', paddingRight: '8px' }}>
                <Edit2 size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => onEdit(classe)} />
                <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => onDelete(classe.id)} />
            </div>
        </div>
    );
}

// ── Componente Principal ───────────────────────────────────────────────────
export default function GestaoMaster() {
    const [activeTab, setActiveTab] = useState<'EMISSORES' | 'CLASSES' | 'INSTITUICOES'>('EMISSORES');
    const [loading, setLoading] = useState(true);
    const [emissores, setEmissores] = useState<Emissor[]>([]);
    const [classes, setClasses] = useState<ClasseAtivo[]>([]);
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const [emissorEditId, setEmissorEditId] = useState<string | null>(null);
    const [novoEmissor, setNovoEmissor] = useState({ nome_fantasia: '', cnpj_raiz: '', setor: '', ticker_referencia: '' });

    const [classeEditId, setClasseEditId] = useState<string | null>(null);
    const [novaClasse, setNovaClasse] = useState({ nome: '', cor_hex: '#0083CB', ordem_exibicao: 99 });

    const [instituicaoEditId, setInstituicaoEditId] = useState<string | null>(null);
    const [novaInstituicao, setNovaInstituicao] = useState({ nome: '', cor_primaria: '#0083CB', cor_secundaria: '' });

    const saveTimeoutRef = useRef<any>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const fetchData = async () => {
        setLoading(true);
        try {
            const [emissoresRes, classesRes, instituicoesRes] = await Promise.all([
                supabase.from('dicionario_emissores').select('*').order('nome_fantasia'),
                supabase.from('dicionario_classes').select('*').order('ordem_exibicao'),
                supabase.from('instituicoes').select('*').order('nome')
            ]);
            if (emissoresRes.data) setEmissores(emissoresRes.data);
            if (classesRes.data) setClasses(classesRes.data);
            if (instituicoesRes.data) setInstituicoes(instituicoesRes.data);
        } catch (err) {
            console.error('Erro:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    // ── Drag & Drop de Classes ──
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = classes.findIndex((item) => item.id === active.id);
        const newIndex = classes.findIndex((item) => item.id === over.id);

        const newArray = arrayMove(classes, oldIndex, newIndex).map((item, idx) => ({
            ...item,
            ordem_exibicao: idx + 1
        }));

        setClasses(newArray);

        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(async () => {
            try {
                const updates = newArray.map(c => ({
                    id: c.id,
                    nome: c.nome,
                    cor_hex: c.cor_hex,
                    ordem_exibicao: c.ordem_exibicao
                }));
                await supabase.from('dicionario_classes').upsert(updates);
            } catch (err) {
                console.error("Erro no autosave:", err);
                fetchData();
            }
        }, 800);
    };

    // ── Emissores ──
    const handleOpenNewEmissor = () => {
        setEmissorEditId(null);
        setNovoEmissor({ nome_fantasia: '', cnpj_raiz: '', setor: '', ticker_referencia: '' });
        setIsModalOpen(true);
    };

    const handleSaveEmissor = async () => {
        if (!novoEmissor.nome_fantasia) return alert('Nome é obrigatório!');
        setSalvando(true);
        try {
            const payload = { ...novoEmissor, cnpj_raiz: novoEmissor.cnpj_raiz || null };
            if (emissorEditId) await supabase.from('dicionario_emissores').update(payload).eq('id', emissorEditId);
            else await supabase.from('dicionario_emissores').insert([payload]);
            closeModal(); fetchData();
        } catch (err) { alert('Erro ao salvar.'); } finally { setSalvando(false); }
    };

    // ── Classes ──
    const handleOpenNewClasse = () => {
        setClasseEditId(null);
        setNovaClasse({ nome: '', cor_hex: '#0083CB', ordem_exibicao: classes.length + 1 });
        setIsModalOpen(true);
    };

    const handleSaveClasse = async () => {
        if (!novaClasse.nome) return alert('Nome é obrigatório!');
        setSalvando(true);
        try {
            if (classeEditId) await supabase.from('dicionario_classes').update(novaClasse).eq('id', classeEditId);
            else await supabase.from('dicionario_classes').insert([novaClasse]);
            closeModal(); fetchData();
        } catch (err) { alert('Erro ao salvar.'); } finally { setSalvando(false); }
    };

    const handleDeleteClasse = async (id: string) => {
        if (!window.confirm('Excluir classe?')) return;
        await supabase.from('dicionario_classes').delete().eq('id', id);
        fetchData();
    };

    // ── Instituições ──
    const handleOpenNewInstituicao = () => {
        setInstituicaoEditId(null);
        setNovaInstituicao({ nome: '', cor_primaria: '#0083CB', cor_secundaria: '' });
        setIsModalOpen(true);
    };

    const handleSaveInstituicao = async () => {
        if (!novaInstituicao.nome) return alert('Nome é obrigatório!');
        setSalvando(true);
        try {
            const payload = { ...novaInstituicao, cor_secundaria: novaInstituicao.cor_secundaria || null };
            if (instituicaoEditId) await supabase.from('instituicoes').update(payload).eq('id', instituicaoEditId);
            else await supabase.from('instituicoes').insert([payload]);
            closeModal(); fetchData();
        } catch (err) { alert('Erro ao salvar.'); } finally { setSalvando(false); }
    };

    // ── Modal ──
    const closeModal = () => {
        setIsModalOpen(false);
        setEmissorEditId(null);
        setClasseEditId(null);
        setInstituicaoEditId(null);
    };

    const handleNovoClick = () => {
        if (activeTab === 'EMISSORES') handleOpenNewEmissor();
        else if (activeTab === 'CLASSES') handleOpenNewClasse();
        else handleOpenNewInstituicao();
    };

    const handleSalvarModal = () => {
        if (activeTab === 'EMISSORES') handleSaveEmissor();
        else if (activeTab === 'CLASSES') handleSaveClasse();
        else handleSaveInstituicao();
    };

    const labelNovo = activeTab === 'EMISSORES' ? 'Novo Emissor' : activeTab === 'CLASSES' ? 'Nova Classe' : 'Nova Instituição';

    const tituloModal = activeTab === 'EMISSORES'
        ? (emissorEditId ? 'Editar Emissor' : 'Novo Emissor')
        : activeTab === 'CLASSES'
            ? (classeEditId ? 'Editar Classe' : 'Nova Classe')
            : (instituicaoEditId ? 'Editar Instituição' : 'Nova Instituição');

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', fontFamily: 'Montserrat, sans-serif' }}>

            <style>{`
                .avere-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(8, 31, 40, 0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 24px; }
                .avere-modal-content { background: #fff; border-radius: 12px; width: 100%; max-width: 480px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden; animation: modalIn 0.2s ease-out; }
                @keyframes modalIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .avere-input { width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.1); font-family: 'Montserrat', sans-serif; font-size: 14px; outline: none; background: #fcfcfc; transition: border-color 0.2s; box-sizing: border-box; }
                .avere-input:focus { border-color: #0083CB; background: #fff; }
                .avere-label { display: block; font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; }
            `}</style>

            <header style={{ display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Settings size={28} color="#081F28" />
                        <Typography variant="h1">Configurações do Sistema</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Gestão de Cadastros Base e Hierarquia de Classes</Typography>
                </div>
            </header>

            {/* ABAS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant={activeTab === 'EMISSORES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('EMISSORES')}>
                        <Building2 size={16} style={{ marginRight: '8px' }} /> Emissores
                    </Button>
                    <Button variant={activeTab === 'CLASSES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('CLASSES')}>
                        <PieChart size={16} style={{ marginRight: '8px' }} /> Classes (Drag & Drop)
                    </Button>
                    <Button variant={activeTab === 'INSTITUICOES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('INSTITUICOES')}>
                        <Landmark size={16} style={{ marginRight: '8px' }} /> Instituições
                    </Button>
                </div>
                <Button variant="solid" onClick={handleNovoClick}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> {labelNovo}
                </Button>
            </div>

            {/* ABA EMISSORES */}
            {activeTab === 'EMISSORES' && (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <DataTable
                        data={emissores}
                        columns={[
                            { header: 'Emissor', accessorKey: 'nome_fantasia', cell: (item) => <Typography variant="p" style={{ fontWeight: 600 }}>{item.nome_fantasia}</Typography> },
                            { header: 'CNPJ Raiz', accessorKey: 'cnpj_raiz', cell: (item) => <Typography variant="p" style={{ fontFamily: 'monospace', opacity: 0.6 }}>{item.cnpj_raiz || '-'}</Typography> },
                            { header: 'Setor', accessorKey: 'setor', cell: (item) => <Badge variant="ghost">{item.setor || 'N/A'}</Badge> },
                            { header: 'Ticker', accessorKey: 'ticker_referencia', cell: (item) => <Typography variant="p">{item.ticker_referencia || '-'}</Typography> },
                            {
                                header: '',
                                cell: (item) => (
                                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                        <Edit2 size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => { setNovoEmissor({ ...item }); setEmissorEditId(item.id); setIsModalOpen(true); }} />
                                        <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => { if (window.confirm('Excluir?')) supabase.from('dicionario_emissores').delete().eq('id', item.id).then(() => fetchData()); }} />
                                    </div>
                                )
                            },
                        ]}
                        keyExtractor={(item) => item.id}
                    />
                </Card>
            )}

            {/* ABA CLASSES */}
            {activeTab === 'CLASSES' && (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        background: '#F9FAFB',
                        borderBottom: '1px solid rgba(0,0,0,0.08)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#6B7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        <div style={{ width: '20px', minWidth: '20px' }} />
                        <div style={{ width: '60px', minWidth: '60px', textAlign: 'center' }}>Ordem</div>
                        <div style={{ flex: 1, minWidth: '200px', paddingLeft: '22px' }}>Nome da Classe</div>
                        <div style={{ width: '120px', minWidth: '120px', textAlign: 'center' }}>Cor Hex</div>
                        <div style={{ width: '100px', minWidth: '100px', textAlign: 'right', paddingRight: '24px' }}>Ações</div>
                    </div>

                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={classes} strategy={verticalListSortingStrategy}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {classes.map((classe) => (
                                    <SortableClasseItem
                                        key={classe.id}
                                        classe={classe}
                                        onEdit={(c) => { setNovaClasse({ ...c }); setClasseEditId(c.id); setIsModalOpen(true); }}
                                        onDelete={handleDeleteClasse}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </Card>
            )}

            {/* ABA INSTITUIÇÕES */}
            {activeTab === 'INSTITUICOES' && (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <DataTable
                        data={instituicoes}
                        columns={[
                            {
                                header: 'Instituição',
                                accessorKey: 'nome',
                                cell: (item: Instituicao) => (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: item.cor_primaria, border: '1px solid rgba(0,0,0,0.1)' }} />
                                            {item.cor_secundaria && (
                                                <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: item.cor_secundaria, border: '1px solid rgba(0,0,0,0.1)' }} />
                                            )}
                                        </div>
                                        <Typography variant="p" style={{ fontWeight: 600 }}>{item.nome}</Typography>
                                    </div>
                                )
                            },
                            {
                                header: 'Cor Primária',
                                accessorKey: 'cor_primaria',
                                cell: (item: Instituicao) => (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: item.cor_primaria, border: '1px solid rgba(0,0,0,0.1)' }} />
                                        <Typography variant="p" style={{ fontFamily: 'monospace', opacity: 0.6, fontSize: '12px' }}>{item.cor_primaria.toUpperCase()}</Typography>
                                    </div>
                                )
                            },
                            {
                                header: 'Cor Secundária',
                                accessorKey: 'cor_secundaria',
                                cell: (item: Instituicao) => item.cor_secundaria ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: item.cor_secundaria, border: '1px solid rgba(0,0,0,0.1)' }} />
                                        <Typography variant="p" style={{ fontFamily: 'monospace', opacity: 0.6, fontSize: '12px' }}>{item.cor_secundaria.toUpperCase()}</Typography>
                                    </div>
                                ) : <span style={{ opacity: 0.3 }}>—</span>
                            },
                            {
                                header: '',
                                cell: (item: Instituicao) => (
                                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                        <Edit2 size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => {
                                            setNovaInstituicao({ nome: item.nome, cor_primaria: item.cor_primaria, cor_secundaria: item.cor_secundaria || '' });
                                            setInstituicaoEditId(item.id);
                                            setIsModalOpen(true);
                                        }} />
                                        <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => {
                                            if (window.confirm('Excluir instituição?')) supabase.from('instituicoes').delete().eq('id', item.id).then(() => fetchData());
                                        }} />
                                    </div>
                                )
                            },
                        ]}
                        keyExtractor={(item: Instituicao) => item.id}
                    />
                </Card>
            )}

            {/* MODAL */}
            {isModalOpen && (
                <div className="avere-modal-overlay" onClick={closeModal}>
                    <div className="avere-modal-content" onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700 }}>
                                {tituloModal}
                            </Typography>
                            <X size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={closeModal} />
                        </div>

                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                            {/* FORMULÁRIO EMISSORES */}
                            {activeTab === 'EMISSORES' && (
                                <>
                                    <div><label className="avere-label">Nome Fantasia</label><input className="avere-input" value={novoEmissor.nome_fantasia} onChange={e => setNovoEmissor({ ...novoEmissor, nome_fantasia: e.target.value })} /></div>
                                    <div><label className="avere-label">CNPJ Raiz (Opcional)</label><input className="avere-input" value={novoEmissor.cnpj_raiz} onChange={e => setNovoEmissor({ ...novoEmissor, cnpj_raiz: e.target.value })} maxLength={8} /></div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}><label className="avere-label">Setor</label><input className="avere-input" value={novoEmissor.setor} onChange={e => setNovoEmissor({ ...novoEmissor, setor: e.target.value })} /></div>
                                        <div style={{ flex: 1 }}><label className="avere-label">Ticker</label><input className="avere-input" value={novoEmissor.ticker_referencia} onChange={e => setNovoEmissor({ ...novoEmissor, ticker_referencia: e.target.value.toUpperCase() })} /></div>
                                    </div>
                                </>
                            )}

                            {/* FORMULÁRIO CLASSES */}
                            {activeTab === 'CLASSES' && (
                                <>
                                    <div><label className="avere-label">Nome da Classe</label><input className="avere-input" value={novaClasse.nome} onChange={e => setNovaClasse({ ...novaClasse, nome: e.target.value })} /></div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>
                                            <label className="avere-label">Cor</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px' }}>
                                                <input type="color" value={novaClasse.cor_hex} onChange={e => setNovaClasse({ ...novaClasse, cor_hex: e.target.value })} style={{ border: 'none', width: '24px', height: '24px', cursor: 'pointer', background: 'transparent' }} />
                                                <Typography variant="p" style={{ fontSize: '13px', fontFamily: 'monospace' }}>{novaClasse.cor_hex.toUpperCase()}</Typography>
                                            </div>
                                        </div>
                                        <div style={{ flex: 1 }}><label className="avere-label">Ordem</label><input type="number" className="avere-input" value={novaClasse.ordem_exibicao} onChange={e => setNovaClasse({ ...novaClasse, ordem_exibicao: Number(e.target.value) })} /></div>
                                    </div>
                                </>
                            )}

                            {/* FORMULÁRIO INSTITUIÇÕES */}
                            {activeTab === 'INSTITUICOES' && (
                                <>
                                    <div><label className="avere-label">Nome da Instituição</label><input className="avere-input" value={novaInstituicao.nome} onChange={e => setNovaInstituicao({ ...novaInstituicao, nome: e.target.value })} /></div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>
                                            <label className="avere-label">Cor Primária</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px' }}>
                                                <input type="color" value={novaInstituicao.cor_primaria} onChange={e => setNovaInstituicao({ ...novaInstituicao, cor_primaria: e.target.value })} style={{ border: 'none', width: '24px', height: '24px', cursor: 'pointer', background: 'transparent' }} />
                                                <Typography variant="p" style={{ fontSize: '13px', fontFamily: 'monospace' }}>{novaInstituicao.cor_primaria.toUpperCase()}</Typography>
                                            </div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label className="avere-label">Cor Secundária (Opcional)</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px' }}>
                                                <input type="color" value={novaInstituicao.cor_secundaria || '#cccccc'} onChange={e => setNovaInstituicao({ ...novaInstituicao, cor_secundaria: e.target.value })} style={{ border: 'none', width: '24px', height: '24px', cursor: 'pointer', background: 'transparent' }} />
                                                <Typography variant="p" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
                                                    {novaInstituicao.cor_secundaria ? novaInstituicao.cor_secundaria.toUpperCase() : '—'}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>

                        <div style={{ padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <Button variant="outline" onClick={closeModal}>Cancelar</Button>
                            <Button variant="solid" onClick={handleSalvarModal} disabled={salvando}>
                                {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />}
                                Salvar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}