import { useState, useEffect } from 'react';
import {
    Typography, Card, Button, Spinner, toast,
    Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter,
    TextField
} from 'avere-ui';
import { Save, Plus, Trash2, Pencil } from 'lucide-react';
import { supabase } from '../services/supabase';

interface Consultor { id: string; nome: string; }
interface Cliente {
    id: string;
    nome: string;
    consultor_id: string | null;
    codigo_avere: string | null;
    codigo_xp: string | null;
    codigo_btg: string | null;
    codigo_avenue: string | null;
    cpf: string | null;
    codigo_agora: string | null;
}
interface LinhaTabela extends Cliente { modificado: boolean; }

export default function CadastroClientes() {
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [linhas, setLinhas] = useState<LinhaTabela[]>([]);
    const [busca, setBusca] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clienteEmEdicao, setClienteEmEdicao] = useState<string | null>(null);
    const [formCliente, setFormCliente] = useState<Partial<Cliente>>({
        nome: '', consultor_id: null, codigo_avere: '', codigo_btg: '', codigo_xp: '', codigo_avenue: '', cpf: '', codigo_agora: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [consRes, clisRes] = await Promise.all([
                supabase.from('consultores').select('id, nome').eq('ativo', true).order('nome'),
                supabase.from('clientes').select('*').order('nome')
            ]);
            if (consRes.data) setConsultores(consRes.data);
            if (clisRes.data) setLinhas(clisRes.data.map(c => ({ ...c, modificado: false })));
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleNovoCliente = () => {
        setClienteEmEdicao(null);
        setFormCliente({ nome: '', consultor_id: null, codigo_avere: '', codigo_btg: '', codigo_xp: '', codigo_avenue: '', cpf: '', codigo_agora: '' });
        setIsModalOpen(true);
    };

    const handleEditarNoModal = (cliente: Cliente) => {
        setClienteEmEdicao(cliente.id);
        setFormCliente({ ...cliente });
        setIsModalOpen(true);
    };

    const cleanPayload = (data: Partial<Cliente>) => ({
        nome: data.nome,
        consultor_id: data.consultor_id,
        codigo_avere: data.codigo_avere,
        codigo_btg: data.codigo_btg,
        codigo_xp: data.codigo_xp,
        codigo_avenue: data.codigo_avenue,
        cpf: data.cpf,
        codigo_agora: data.codigo_agora,
    });

    const handleSalvarModal = async () => {
        if (!formCliente.nome) { toast.error('Nome é obrigatório.'); return; }
        setSalvando(true);

        const payload = cleanPayload(formCliente);

        try {
            if (clienteEmEdicao) {
                const { error } = await supabase.from('clientes').update(payload).eq('id', clienteEmEdicao);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('clientes').insert([payload]);
                if (error) throw error;
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            console.error(err);
            toast.error('Erro ao salvar.');
        } finally { setSalvando(false); }
    };

    const handleExcluirCliente = (id: string, nome: string) => {
        toast(`Excluir o cliente ${nome}?`, {
            action: { label: 'Excluir', onClick: async () => {
                try {
                    await supabase.from('clientes').delete().eq('id', id);
                    toast.success('Cliente excluído.');
                    fetchData();
                } catch (err) { toast.error('Erro ao excluir.'); }
            }},
            cancel: { label: 'Cancelar', onClick: () => {} },
        });
    };

    const handleChangeTabela = (id: string, campo: keyof Cliente, valor: string | null) => {
        setLinhas(prev => prev.map(l =>
            l.id === id ? { ...l, [campo]: valor === "" ? null : valor, modificado: true } : l
        ));
    };

    const handleSalvarEdicoesTabela = async () => {
        const modificadas = linhas.filter(l => l.modificado);
        if (modificadas.length === 0) return;
        setSalvando(true);
        try {
            const upsertData = modificadas.map(l => ({
                id: l.id,
                ...cleanPayload(l)
            }));
            const { error } = await supabase.from('clientes').upsert(upsertData);
            if (error) throw error;
            fetchData();
        } catch (err) {
            console.error(err);
            toast.error('Erro ao salvar tabela.');
        } finally { setSalvando(false); }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Typography variant="h1">Base de Clientes</Typography>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Gestão de vínculos e APIs externas.</Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                        className="avere-input"
                        style={{ width: '280px' }}
                        placeholder="Pesquisar..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />
                    <Button onClick={handleNovoCliente}>
                        <Plus size={20} style={{ marginRight: 8 }} /> Novo Cliente
                    </Button>
                </div>
            </header>

            <Card style={{ padding: '0', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: '#F9FAFB', borderBottom: '1px solid #EEE' }}>
                            <th style={{ padding: '16px' }}>Nome</th>
                            <th style={{ padding: '16px' }}>CPF</th>
                            <th style={{ padding: '16px' }}>Consultor</th>
                            <th style={{ padding: '16px' }}>BTG</th>
                            <th style={{ padding: '16px' }}>XP</th>
                            <th style={{ padding: '16px' }}>Avenue</th>
                            <th style={{ padding: '16px' }}>Agora</th>
                            <th style={{ padding: '16px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas.filter(l => l.nome.toLowerCase().includes(busca.toLowerCase())).map(l => (
                            <tr key={l.id} style={{ borderBottom: '1px solid #F3F4F6', background: l.modificado ? 'rgba(255, 251, 235, 0.5)' : 'transparent' }}>
                                <td style={{ padding: '12px 16px' }}>
                                    <input
                                        style={{ border: 'none', background: 'transparent', width: '100%', fontWeight: 500 }}
                                        value={l.nome}
                                        onChange={e => handleChangeTabela(l.id, 'nome', e.target.value)}
                                    />
                                </td>
                                <td style={{ padding: '12px 16px' }}>
                                    <input style={{ border: 'none', background: 'transparent', width: '110px' }} value={l.cpf || ''} onChange={e => handleChangeTabela(l.id, 'cpf', e.target.value)} />
                                </td>
                                <td style={{ padding: '12px 16px' }}>
                                    <select
                                        style={{ border: 'none', background: 'transparent' }}
                                        value={l.consultor_id || ''}
                                        onChange={e => handleChangeTabela(l.id, 'consultor_id', e.target.value)}
                                    >
                                        <option value="">Selecione...</option>
                                        {consultores.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                    </select>
                                </td>
                                <td style={{ padding: '12px 16px' }}><input style={{ border: 'none', background: 'transparent', width: '80px' }} value={l.codigo_btg || ''} onChange={e => handleChangeTabela(l.id, 'codigo_btg', e.target.value)} /></td>
                                <td style={{ padding: '12px 16px' }}><input style={{ border: 'none', background: 'transparent', width: '80px' }} value={l.codigo_xp || ''} onChange={e => handleChangeTabela(l.id, 'codigo_xp', e.target.value)} /></td>
                                <td style={{ padding: '12px 16px' }}><input style={{ border: 'none', background: 'transparent', width: '80px' }} value={l.codigo_avenue || ''} onChange={e => handleChangeTabela(l.id, 'codigo_avenue', e.target.value)} /></td>
                                <td style={{ padding: '12px 16px' }}><input style={{ border: 'none', background: 'transparent', width: '80px' }} value={l.codigo_agora || ''} onChange={e => handleChangeTabela(l.id, 'codigo_agora', e.target.value)} /></td>
                                <td style={{ padding: '12px 16px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                    <button onClick={() => handleEditarNoModal(l)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primaria)' }}>
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => handleExcluirCliente(l.id, l.nome)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {linhas.some(l => l.modificado) && (
                <div style={{ position: 'fixed', bottom: '32px', right: '32px' }}>
                    <Button onClick={handleSalvarEdicoesTabela}><Save size={20} style={{ marginRight: 8 }} /> Salvar Alterações Tabela</Button>
                </div>
            )}

            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>{clienteEmEdicao ? 'Editar Cliente' : 'Novo Cliente'}</ModalTitle>
                        <ModalDescription>Preencha os dados de identificação e códigos de integração.</ModalDescription>
                    </ModalHeader>

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                            <TextField
                                label="Nome Completo"
                                value={formCliente.nome || ''}
                                onChange={e => setFormCliente(p => ({ ...p, nome: e.target.value }))}
                            />
                            <TextField
                                label="CPF"
                                value={formCliente.cpf || ''}
                                onChange={e => setFormCliente(p => ({ ...p, cpf: e.target.value }))}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Consultor Responsável</label>
                            <select
                                className="avere-input"
                                value={formCliente.consultor_id || ""}
                                onChange={(e) => setFormCliente(prev => ({ ...prev, consultor_id: e.target.value || null }))}
                            >
                                <option value="">Selecione um consultor...</option>
                                {consultores.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <TextField label="Cód. BTG" value={formCliente.codigo_btg || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_btg: e.target.value }))} />
                            <TextField label="Cód. XP" value={formCliente.codigo_xp || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_xp: e.target.value }))} />
                            <TextField label="Cód. Avenue" value={formCliente.codigo_avenue || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_avenue: e.target.value }))} />
                            <TextField label="Cód. Agora" value={formCliente.codigo_agora || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_agora: e.target.value }))} />
                            <TextField label="Cód. Avere" value={formCliente.codigo_avere || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_avere: e.target.value }))} />
                        </div>
                    </div>

                    <ModalFooter>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSalvarModal} disabled={salvando}>
                            {salvando ? <Spinner size="sm" /> : 'Confirmar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}