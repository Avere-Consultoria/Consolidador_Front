import { useState, useEffect } from 'react';
import {
    Typography, Card, Button, Spinner, toast, Combobox,
    Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter,
    TextField
} from 'avere-ui';
import { Save, Plus, Trash2, Pencil, Search } from 'lucide-react';
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

// Estilos compartilhados da tabela
const thStyle: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#9CA3AF',
    textAlign: 'left',
    whiteSpace: 'nowrap',
};

const inlineInputStyle: React.CSSProperties = {
    border: 'none',
    background: 'transparent',
    width: '100%',
    fontFamily: 'var(--font-family)',
    fontSize: '13px',
    color: 'var(--color-secundaria)',
    outline: 'none',
    lineHeight: '1.5',
    padding: 0,
    margin: 0,
};

const tdStyle: React.CSSProperties = {
    padding: '12px 16px',
    verticalAlign: 'middle',
};

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
        consultor_id: data.consultor_id || null,
        codigo_avere: data.codigo_avere || null,
        codigo_btg: data.codigo_btg || null,
        codigo_xp: data.codigo_xp || null,
        codigo_avenue: data.codigo_avenue || null,
        cpf: data.cpf || null,
        codigo_agora: data.codigo_agora || null,
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
            const upsertData = modificadas.map(l => ({ id: l.id, ...cleanPayload(l) }));
            const { error } = await supabase.from('clientes').upsert(upsertData);
            if (error) throw error;
            toast.success('Alterações salvas.');
            fetchData();
        } catch (err) {
            console.error(err);
            toast.error('Erro ao salvar tabela.');
        } finally { setSalvando(false); }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    const opcoesConsultores = [
        { value: '', label: 'Sem consultor' },
        ...consultores.map(c => ({ value: c.id, label: c.nome }))
    ];

    const nomeConsultor = (id: string | null) =>
        consultores.find(c => c.id === id)?.nome || '—';

    const linhasFiltradas = linhas.filter(l => l.nome.toLowerCase().includes(busca.toLowerCase()));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <Typography variant="h1" style={{ fontWeight: 700 }}>Base de Clientes</Typography>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Gestão de vínculos e APIs externas.</Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <TextField
                        leftIcon={Search}
                        placeholder="Pesquisar cliente..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        style={{ width: '260px' }}
                    />
                    <Button variant="solid" onClick={handleNovoCliente}>
                        <Plus size={16} style={{ marginRight: 8 }} /> Novo Cliente
                    </Button>
                </div>
            </header>

            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEEEEE' }}>
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>CPF</th>
                            <th style={thStyle}>Consultor</th>
                            <th style={thStyle}>BTG</th>
                            <th style={thStyle}>XP</th>
                            <th style={thStyle}>Avenue</th>
                            <th style={thStyle}>Ágora</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhasFiltradas.map(l => (
                                <tr key={l.id} style={{ borderBottom: '1px solid #F3F4F6', background: l.modificado ? 'rgba(255, 251, 235, 0.6)' : 'transparent' }}>
                                    <td style={{ ...tdStyle, minWidth: '160px' }}>
                                        <input
                                            style={{ ...inlineInputStyle, fontWeight: 600 }}
                                            value={l.nome}
                                            onChange={e => handleChangeTabela(l.id, 'nome', e.target.value)}
                                        />
                                    </td>
                                    <td style={{ ...tdStyle, minWidth: '120px' }}>
                                        <input
                                            style={{ ...inlineInputStyle, color: 'var(--color-primaria)' }}
                                            value={l.cpf || ''}
                                            onChange={e => handleChangeTabela(l.id, 'cpf', e.target.value)}
                                        />
                                    </td>
                                    <td style={{ ...tdStyle, minWidth: '160px' }}>
                                        <span style={{ fontSize: '13px', fontFamily: 'var(--font-family)', color: 'var(--color-secundaria)', lineHeight: '1.5' }}>
                                            {nomeConsultor(l.consultor_id)}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <input style={{ ...inlineInputStyle, width: '90px' }} value={l.codigo_btg || ''} onChange={e => handleChangeTabela(l.id, 'codigo_btg', e.target.value)} />
                                    </td>
                                    <td style={tdStyle}>
                                        <input style={{ ...inlineInputStyle, width: '90px' }} value={l.codigo_xp || ''} onChange={e => handleChangeTabela(l.id, 'codigo_xp', e.target.value)} />
                                    </td>
                                    <td style={tdStyle}>
                                        <input style={{ ...inlineInputStyle, width: '90px' }} value={l.codigo_avenue || ''} onChange={e => handleChangeTabela(l.id, 'codigo_avenue', e.target.value)} />
                                    </td>
                                    <td style={tdStyle}>
                                        <input style={{ ...inlineInputStyle, width: '90px' }} value={l.codigo_agora || ''} onChange={e => handleChangeTabela(l.id, 'codigo_agora', e.target.value)} />
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                            <Pencil size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => handleEditarNoModal(l)} />
                                            <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => handleExcluirCliente(l.id, l.nome)} />
                                        </div>
                                    </td>
                                </tr>
                        ))}
                        {linhasFiltradas.length === 0 && (
                            <tr>
                                <td colSpan={8} style={{ padding: '40px', textAlign: 'center', opacity: 0.4 }}>
                                    Nenhum cliente encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            {linhas.some(l => l.modificado) && (
                <div style={{ position: 'fixed', bottom: '32px', right: '32px' }}>
                    <Button variant="solid" onClick={handleSalvarEdicoesTabela} disabled={salvando}>
                        {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: 8 }} />}
                        Salvar Alterações
                    </Button>
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

                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                                Consultor Responsável
                            </label>
                            <Combobox
                                options={opcoesConsultores}
                                value={formCliente.consultor_id || ''}
                                onChange={(val) => setFormCliente(p => ({ ...p, consultor_id: val || null }))}
                                placeholder="Selecione um consultor..."
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <TextField label="Cód. BTG" value={formCliente.codigo_btg || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_btg: e.target.value }))} />
                            <TextField label="Cód. XP" value={formCliente.codigo_xp || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_xp: e.target.value }))} />
                            <TextField label="Cód. Avenue" value={formCliente.codigo_avenue || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_avenue: e.target.value }))} />
                            <TextField label="Cód. Ágora" value={formCliente.codigo_agora || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_agora: e.target.value }))} />
                            <TextField label="Cód. Avere" value={formCliente.codigo_avere || ''} onChange={e => setFormCliente(p => ({ ...p, codigo_avere: e.target.value }))} />
                        </div>
                    </div>

                    <ModalFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSalvarModal} disabled={salvando}>
                            {salvando ? <Spinner size="sm" /> : 'Confirmar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
