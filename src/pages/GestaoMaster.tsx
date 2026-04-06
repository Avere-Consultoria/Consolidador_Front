import { useState, useEffect } from 'react';
import { Typography, Card, Button, DataTable, Spinner, Badge } from 'avere-ui';
import { Settings, Building2, PieChart, Plus, Save, Trash2, Edit2, X } from 'lucide-react';
import { supabase } from '../services/supabase';

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

// ─────────────────────────────────────────────────────────────────────────────
// Componente Principal
// ─────────────────────────────────────────────────────────────────────────────

export default function GestaoMaster() {
    const [activeTab, setActiveTab] = useState<'EMISSORES' | 'CLASSES'>('EMISSORES');
    const [loading, setLoading] = useState(true);

    // Estados de Dados
    const [emissores, setEmissores] = useState<Emissor[]>([]);
    const [classes, setClasses] = useState<ClasseAtivo[]>([]);

    // Estados de Formulário e Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const [emissorEditId, setEmissorEditId] = useState<string | null>(null);
    const [novoEmissor, setNovoEmissor] = useState({ nome_fantasia: '', cnpj_raiz: '', setor: '', ticker_referencia: '' });

    const [classeEditId, setClasseEditId] = useState<string | null>(null);
    const [novaClasse, setNovaClasse] = useState({ nome: '', cor_hex: '#0083CB', ordem_exibicao: 99 });

    // 1. Carregar Dados Iniciais
    const fetchData = async () => {
        setLoading(true);
        try {
            const [emissoresRes, classesRes] = await Promise.all([
                supabase.from('dicionario_emissores').select('*').order('nome_fantasia'),
                supabase.from('dicionario_classes').select('*').order('ordem_exibicao')
            ]);

            if (emissoresRes.data) setEmissores(emissoresRes.data);
            if (classesRes.data) setClasses(classesRes.data);
        } catch (err) {
            console.error('Erro ao carregar configurações:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ── FUNÇÕES DE CONTROLO DO MODAL ──────────────────────────────────────────

    const openNewEmissorModal = () => {
        setEmissorEditId(null);
        setNovoEmissor({ nome_fantasia: '', cnpj_raiz: '', setor: '', ticker_referencia: '' });
        setIsModalOpen(true);
    };

    const openNewClasseModal = () => {
        setClasseEditId(null);
        setNovaClasse({ nome: '', cor_hex: '#0083CB', ordem_exibicao: classes.length + 1 });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEmissorEditId(null);
        setClasseEditId(null);
    };

    // ── FUNÇÕES CRUD: EMISSORES ───────────────────────────────────────────────

    const handleSaveEmissor = async () => {
        if (!novoEmissor.nome_fantasia || !novoEmissor.cnpj_raiz) return alert('Nome e CNPJ Raiz são obrigatórios!');
        setSalvando(true);
        try {
            if (emissorEditId) {
                const { error } = await supabase.from('dicionario_emissores').update(novoEmissor).eq('id', emissorEditId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('dicionario_emissores').insert([novoEmissor]);
                if (error) throw error;
            }
            closeModal();
            await fetchData();
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar emissor. Verifique se o CNPJ já existe.');
        } finally {
            setSalvando(false);
        }
    };

    const handleEditEmissor = (emissor: Emissor) => {
        setNovoEmissor({
            nome_fantasia: emissor.nome_fantasia || '',
            cnpj_raiz: emissor.cnpj_raiz || '',
            setor: emissor.setor || '',
            ticker_referencia: emissor.ticker_referencia || ''
        });
        setEmissorEditId(emissor.id);
        setIsModalOpen(true);
    };

    const handleDeleteEmissor = async (id: string) => {
        if (!window.confirm('Tem a certeza que deseja excluir este emissor? Se ele estiver vinculado a algum ativo, o vínculo será perdido.')) return;
        try {
            const { error } = await supabase.from('dicionario_emissores').delete().eq('id', id);
            if (error) throw error;
            await fetchData();
        } catch (err) {
            console.error(err);
            alert('Erro ao excluir emissor.');
        }
    };

    // ── FUNÇÕES CRUD: CLASSES ─────────────────────────────────────────────────

    const handleSaveClasse = async () => {
        if (!novaClasse.nome) return alert('O nome da classe é obrigatório!');
        setSalvando(true);
        try {
            if (classeEditId) {
                const { error } = await supabase.from('dicionario_classes').update(novaClasse).eq('id', classeEditId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('dicionario_classes').insert([novaClasse]);
                if (error) throw error;
            }
            closeModal();
            await fetchData();
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar classe. Verifique se o nome já existe.');
        } finally {
            setSalvando(false);
        }
    };

    const handleEditClasse = (classe: ClasseAtivo) => {
        setNovaClasse({
            nome: classe.nome,
            cor_hex: classe.cor_hex || '#000000',
            ordem_exibicao: classe.ordem_exibicao || 0
        });
        setClasseEditId(classe.id);
        setIsModalOpen(true);
    };

    const handleDeleteClasse = async (id: string) => {
        if (!window.confirm('Tem a certeza que deseja excluir esta classe? Pode quebrar os gráficos se houver ativos vinculados a ela.')) return;
        try {
            const { error } = await supabase.from('dicionario_classes').delete().eq('id', id);
            if (error) throw error;
            await fetchData();
        } catch (err) {
            console.error(err);
            alert('Erro ao excluir classe.');
        }
    };

    // ──────────────────────────────────────────────────────────────────────────

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>

            {/* ── ESTILOS GLOBAIS DO MODAL ── */}
            <style>{`
        .avere-modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(8, 31, 40, 0.4); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 24px;
        }
        .avere-modal-content {
          background: #fff; border-radius: 12px; width: 100%; max-width: 480px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }
        .avere-input {
          width: 100%; padding: 10px 12px; border-radius: 6px;
          border: 1px solid rgba(0,0,0,0.1); font-family: inherit; font-size: 14px;
          transition: border-color 0.2s; outline: none;
        }
        .avere-input:focus { border-color: #0083CB; }
        .avere-label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px; color: #374151; }
      `}</style>

            {/* ── CABEÇALHO ── */}
            <header style={{ display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Settings size={28} color="#081F28" />
                        <Typography variant="h1">Configurações do Sistema</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>
                        Gestão de Cadastros Base, Emissores e Classes de Ativos
                    </Typography>
                </div>
            </header>

            {/* ── TABS ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant={activeTab === 'EMISSORES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('EMISSORES')}>
                        <Building2 size={16} style={{ marginRight: '8px' }} /> Emissores (Risco)
                    </Button>
                    <Button variant={activeTab === 'CLASSES' ? 'solid' : 'ghost'} onClick={() => setActiveTab('CLASSES')}>
                        <PieChart size={16} style={{ marginRight: '8px' }} /> Classes de Ativos
                    </Button>
                </div>

                {/* BOTÃO PRINCIPAL DE ADICIONAR */}
                <Button variant="solid" onClick={activeTab === 'EMISSORES' ? openNewEmissorModal : openNewClasseModal}>
                    <Plus size={16} style={{ marginRight: '8px' }} />
                    {activeTab === 'EMISSORES' ? 'Novo Emissor' : 'Nova Classe'}
                </Button>
            </div>

            {/* ── TABELA DE EMISSORES ── */}
            {activeTab === 'EMISSORES' && (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <DataTable
                        data={emissores}
                        columns={[
                            { header: 'Nome do Emissor', accessorKey: 'nome_fantasia', cell: (item) => <Typography variant="p" style={{ fontWeight: 600 }}>{item.nome_fantasia}</Typography> },
                            { header: 'CNPJ Raiz', accessorKey: 'cnpj_raiz', cell: (item) => <Typography variant="p" style={{ fontFamily: 'monospace' }}>{item.cnpj_raiz}</Typography> },
                            { header: 'Setor', accessorKey: 'setor', cell: (item) => <Badge variant="ghost">{item.setor || 'N/A'}</Badge> },
                            { header: 'Ticker', accessorKey: 'ticker_referencia', cell: (item) => <Typography variant="p">{item.ticker_referencia || '-'}</Typography> },
                            {
                                header: 'Ações',
                                cell: (item) => (
                                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%', paddingRight: '16px' }}>
                                        <Edit2 size={16} color="#6B7280" style={{ cursor: 'pointer' }} onClick={() => handleEditEmissor(item)} />
                                        <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer' }} onClick={() => handleDeleteEmissor(item.id)} />
                                    </div>
                                )
                            },
                        ]}
                        keyExtractor={(item) => item.id}
                    />
                </Card>
            )}

            {/* ── TABELA DE CLASSES ── */}
            {activeTab === 'CLASSES' && (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <DataTable
                        data={classes}
                        columns={[
                            { header: 'Ordem', accessorKey: 'ordem_exibicao', cell: (item) => <Typography variant="p" style={{ opacity: 0.5 }}>{item.ordem_exibicao}</Typography> },
                            {
                                header: 'Nome da Classe',
                                accessorKey: 'nome',
                                cell: (item) => (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.cor_hex }} />
                                        <Typography variant="p" style={{ fontWeight: 600 }}>{item.nome}</Typography>
                                    </div>
                                )
                            },
                            { header: 'Cor Hexadecimal', accessorKey: 'cor_hex', cell: (item) => <Typography variant="p" style={{ fontFamily: 'monospace' }}>{item.cor_hex}</Typography> },
                            {
                                header: 'Ações',
                                cell: (item) => (
                                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%', paddingRight: '16px' }}>
                                        <Edit2 size={16} color="#6B7280" style={{ cursor: 'pointer' }} onClick={() => handleEditClasse(item)} />
                                        <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer' }} onClick={() => handleDeleteClasse(item.id)} />
                                    </div>
                                )
                            },
                        ]}
                        keyExtractor={(item) => item.id}
                    />
                </Card>
            )}

            {/* ── MODAL OVERLAY ── */}
            {isModalOpen && (
                <div className="avere-modal-overlay" onClick={closeModal}>
                    {/* Evita que o clique dentro do modal o feche */}
                    <div className="avere-modal-content" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <Typography variant="h2" style={{ fontSize: '18px', fontWeight: 700 }}>
                                {activeTab === 'EMISSORES'
                                    ? (emissorEditId ? 'Editar Emissor' : 'Novo Emissor')
                                    : (classeEditId ? 'Editar Classe' : 'Nova Classe')}
                            </Typography>
                            <X size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={closeModal} />
                        </div>

                        {/* Modal Body: EMISSORES */}
                        {activeTab === 'EMISSORES' && (
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label className="avere-label">Nome (Ex: Grupo Light)</label>
                                    <input className="avere-input" value={novoEmissor.nome_fantasia} onChange={e => setNovoEmissor({ ...novoEmissor, nome_fantasia: e.target.value })} />
                                </div>
                                <div>
                                    <label className="avere-label">CNPJ Raiz (8 dígitos iniciais)</label>
                                    <input className="avere-input" value={novoEmissor.cnpj_raiz} onChange={e => setNovoEmissor({ ...novoEmissor, cnpj_raiz: e.target.value })} maxLength={8} />
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label className="avere-label">Setor</label>
                                        <input className="avere-input" value={novoEmissor.setor} onChange={e => setNovoEmissor({ ...novoEmissor, setor: e.target.value })} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label className="avere-label">Ticker B3 (Opcional)</label>
                                        <input className="avere-input" value={novoEmissor.ticker_referencia} onChange={e => setNovoEmissor({ ...novoEmissor, ticker_referencia: e.target.value.toUpperCase() })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal Body: CLASSES */}
                        {activeTab === 'CLASSES' && (
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label className="avere-label">Nome da Classe</label>
                                    <input className="avere-input" value={novaClasse.nome} onChange={e => setNovaClasse({ ...novaClasse, nome: e.target.value })} placeholder="Ex: Criptoativos" />
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label className="avere-label">Cor do Gráfico</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid rgba(0,0,0,0.1)', padding: '6px 12px', borderRadius: '6px' }}>
                                            <input type="color" value={novaClasse.cor_hex} onChange={e => setNovaClasse({ ...novaClasse, cor_hex: e.target.value })} style={{ border: 'none', width: '28px', height: '28px', padding: 0, cursor: 'pointer', background: 'transparent' }} />
                                            <Typography variant="p" style={{ fontSize: '14px', fontFamily: 'monospace' }}>{novaClasse.cor_hex.toUpperCase()}</Typography>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label className="avere-label">Ordem de Exibição</label>
                                        <input type="number" className="avere-input" value={novaClasse.ordem_exibicao} onChange={e => setNovaClasse({ ...novaClasse, ordem_exibicao: Number(e.target.value) })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal Footer */}
                        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#F9FAFB' }}>
                            <Button variant="outline" onClick={closeModal}>Cancelar</Button>
                            <Button variant="solid" onClick={activeTab === 'EMISSORES' ? handleSaveEmissor : handleSaveClasse} disabled={salvando}>
                                {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />}
                                Salvar Alterações
                            </Button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}