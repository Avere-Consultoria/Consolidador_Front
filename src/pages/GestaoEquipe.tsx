import { useState, useEffect } from 'react';
import { Typography, Card, Button, DataTable, Spinner, Badge } from 'avere-ui';
import { Users, Plus, Save, Trash2, Edit2, X, Mail, Shield } from 'lucide-react';
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
        if (!formData.nome || !formData.email_professional || !formData.perfil_id) return alert('Campos obrigatórios!');
        setSalvando(true);
        try {
            if (editId) await supabase.from('consultores').update(formData).eq('id', editId);
            else await supabase.from('consultores').insert([formData]);
            setIsModalOpen(false);
            fetchData();
        } catch (err) { alert('Erro ao salvar.'); } finally { setSalvando(false); }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', fontFamily: 'Montserrat, sans-serif' }}>
            <style>{`
                .avere-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(8, 31, 40, 0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 24px; }
                .avere-modal-content { background: #fff; border-radius: 12px; width: 100%; max-width: 480px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden; }
                .avere-input { width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.1); font-family: 'Montserrat', sans-serif; font-size: 14px; outline: none; background: #fcfcfc; box-sizing: border-box; }
                .avere-label { display: block; font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; }
            `}</style>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Users size={28} color="#081F28" />
                        <Typography variant="h1">Gestão de Equipe</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Administração de Consultores e Vínculos de Acesso</Typography>
                </div>
                <Button variant="solid" onClick={() => { setEditId(null); setFormData({ nome: '', email_professional: '', perfil_id: '', ativo: true }); setIsModalOpen(true); }}>
                    <Plus size={16} style={{ marginRight: 8 }} /> Novo Consultor
                </Button>
            </header>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <DataTable
                    data={consultores}
                    columns={[
                        { header: 'Nome', accessorKey: 'nome', cell: (item) => <Typography variant="p" style={{ fontWeight: 600 }}>{item.nome}</Typography> },
                        { header: 'E-mail', accessorKey: 'email_professional', cell: (item) => <Typography variant="p" style={{ opacity: 0.6 }}>{item.email_professional}</Typography> },
                        { header: 'Status', cell: (item) => <Badge variant="ghost" intent={item.ativo ? "primaria" : "secundaria"}>{item.ativo ? 'Ativo' : 'Inativo'}</Badge> },
                        {
                            header: '',
                            cell: (item) => (
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2 size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => { setFormData({ ...item }); setEditId(item.id); setIsModalOpen(true); }} />
                                    <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer' }} onClick={() => { if (window.confirm('Excluir?')) supabase.from('consultores').delete().eq('id', item.id).then(() => fetchData()); }} />
                                </div>
                            )
                        }
                    ]}
                    keyExtractor={(item) => item.id}
                />
            </Card>

            {isModalOpen && (
                <div className="avere-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="avere-modal-content" onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h2" style={{ fontSize: '16px', fontWeight: 700 }}>{editId ? 'Editar Consultor' : 'Novo Consultor'}</Typography>
                            <X size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div><label className="avere-label">Nome Completo</label><input className="avere-input" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} /></div>
                            <div><label className="avere-label">E-mail Profissional</label><input className="avere-input" value={formData.email_professional} onChange={e => setFormData({ ...formData, email_professional: e.target.value })} /></div>
                            <div><label className="avere-label">ID do Perfil (UUID Auth)</label><input className="avere-input" value={formData.perfil_id} onChange={e => setFormData({ ...formData, perfil_id: e.target.value })} /></div>
                        </div>
                        <div style={{ padding: '16px 24px', background: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button variant="solid" onClick={handleSave} disabled={salvando}>
                                {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: 8 }} />} Salvar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}