import { useState, useEffect } from 'react';
import {
    Typography, Card, Button, Spinner,
    Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter,
    TextField
} from 'avere-ui';
import { Save, Plus } from 'lucide-react';
import { supabase } from '../services/supabase';

interface Consultor { id: string; nome: string; }
interface Cliente {
    id: string;
    nome: string;
    consultor_id: string | null;
    codigo_avere: string | null;
    codigo_xp: string | null;
    codigo_btg: string | null;
}
interface LinhaTabela extends Cliente { modificado: boolean; }

export default function CadastroClientes() {
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [linhas, setLinhas] = useState<LinhaTabela[]>([]);
    const [busca, setBusca] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novoCliente, setNovoCliente] = useState<Partial<Cliente>>({
        nome: '', consultor_id: null, codigo_avere: '', codigo_btg: '', codigo_xp: ''
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

    const handleChangeTabela = (id: string, campo: keyof Cliente, valor: string | null) => {
        setLinhas(prev => prev.map(l =>
            l.id === id ? { ...l, [campo]: valor === "" ? null : valor, modificado: true } : l
        ));
    };

    const handleSalvarEdicoes = async () => {
        const modificadas = linhas.filter(l => l.modificado);
        if (modificadas.length === 0) return;
        setSalvando(true);
        try {
            const upsertData = modificadas.map(({ modificado, ...dados }) => dados);
            await supabase.from('clientes').upsert(upsertData);
            fetchData();
        } catch (err) { alert('Erro ao salvar.'); } finally { setSalvando(false); }
    };

    const handleCriarCliente = async () => {
        if (!novoCliente.nome) return alert('Nome é obrigatório');
        setSalvando(true);
        try {
            await supabase.from('clientes').insert([novoCliente]);
            setIsModalOpen(false);
            setNovoCliente({ nome: '', consultor_id: null, codigo_avere: '', codigo_btg: '', codigo_xp: '' });
            fetchData();
        } catch (err) { alert('Erro ao cadastrar.'); } finally { setSalvando(false); }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Typography variant="h1">Base de Clientes</Typography>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Gerencie vínculos e códigos operacionais.</Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                        className="avere-input"
                        style={{ width: '280px' }}
                        placeholder="Pesquisar cliente..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus size={20} style={{ marginRight: 8 }} /> Novo Cliente
                    </Button>
                </div>
            </header>

            <Card style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: '#F9FAFB', borderBottom: '1px solid #EEE' }}>
                            <th style={{ padding: '16px' }}>Nome</th>
                            <th style={{ padding: '16px' }}>Consultor</th>
                            <th style={{ padding: '16px' }}>Avere</th>
                            <th style={{ padding: '16px' }}>BTG</th>
                            <th style={{ padding: '16px' }}>XP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas.filter(l => l.nome.toLowerCase().includes(busca.toLowerCase())).map(l => (
                            <tr key={l.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                <td style={{ padding: '12px 16px' }}>
                                    <input
                                        style={{ border: 'none', background: 'transparent', width: '100%', fontWeight: 500 }}
                                        value={l.nome}
                                        onChange={e => handleChangeTabela(l.id, 'nome', e.target.value)}
                                    />
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
                                <td style={{ padding: '12px 16px' }}><input style={{ border: 'none', background: 'transparent', width: '80px' }} value={l.codigo_avere || ''} onChange={e => handleChangeTabela(l.id, 'codigo_avere', e.target.value)} /></td>
                                <td style={{ padding: '12px 16px' }}><input style={{ border: 'none', background: 'transparent', width: '80px' }} value={l.codigo_btg || ''} onChange={e => handleChangeTabela(l.id, 'codigo_btg', e.target.value)} /></td>
                                <td style={{ padding: '12px 16px' }}><input style={{ border: 'none', background: 'transparent', width: '80px' }} value={l.codigo_xp || ''} onChange={e => handleChangeTabela(l.id, 'codigo_xp', e.target.value)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {linhas.some(l => l.modificado) && (
                <div style={{ position: 'fixed', bottom: '32px', right: '32px' }}>
                    <Button onClick={handleSalvarEdicoes}><Save size={20} style={{ marginRight: 8 }} /> Salvar Alterações</Button>
                </div>
            )}

            {/* Modal Corrigida conforme avere-ui */}
            {/* Modal de Cadastro com Seletor Convencional */}
            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent onInteractOutside={(e) => e.preventDefault()}>
                    <ModalHeader>
                        <ModalTitle>Cadastrar Novo Cliente</ModalTitle>
                    </ModalHeader>

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label="Nome Completo"
                            value={novoCliente.nome || ''}
                            onChange={e => setNovoCliente(p => ({ ...p, nome: e.target.value }))}
                        />

                        {/* Seletor Convencional para garantir o funcionamento */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                                Consultor Responsável
                            </label>
                            <select
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    background: '#fcfcfc',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                                value={novoCliente.consultor_id || ""}
                                onChange={(e) => {
                                    const valor = e.target.value;
                                    console.log("Selecionado via Nativo:", valor);
                                    setNovoCliente(prev => ({ ...prev, consultor_id: valor || null }));
                                }}
                            >
                                <option value="">Selecione um consultor...</option>
                                {consultores.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <TextField
                                label="Cód. Avere"
                                value={novoCliente.codigo_avere || ''}
                                onChange={e => setNovoCliente(p => ({ ...p, codigo_avere: e.target.value }))}
                            />
                            <TextField
                                label="Cód. BTG"
                                value={novoCliente.codigo_btg || ''}
                                onChange={e => setNovoCliente(p => ({ ...p, codigo_btg: e.target.value }))}
                            />
                            <TextField
                                label="Cód. XP"
                                value={novoCliente.codigo_xp || ''}
                                onChange={e => setNovoCliente(p => ({ ...p, codigo_xp: e.target.value }))}
                            />
                        </div>
                    </div>

                    <ModalFooter>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleCriarCliente}
                            disabled={salvando || !novoCliente.nome}
                        >
                            {salvando ? <Spinner size="sm" /> : 'Confirmar Cadastro'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}