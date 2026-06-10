import { useState, useEffect } from 'react';
import {
    Typography, Card, Button, DataTable, Spinner, Badge, toast,
    Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, TextField
} from 'avere-ui';
import { Users, Plus, Save, Trash2, Edit2, Search, Mail, Loader2, KeyRound } from 'lucide-react';
import { supabase } from '../services/supabase';

interface Consultor {
    id: string;
    nome: string;
    email_professional: string;
    ativo: boolean;
    perfil_id: string;
}

// Padrão de e-mail institucional: <primeiro nome>@averepartners.com.br
const DOMINIO_AVERE = '@averepartners.com.br';
const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
const primeiroNomeSlug = (nome: string) =>
    (nome.trim().split(/\s+/)[0] ?? '')
        .toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')   // remove acentos
        .replace(/[^a-z0-9]/g, '');

export default function GestaoEquipe() {
    const [loading, setLoading] = useState(true);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ nome: '', email_professional: '', perfil_id: '', ativo: true });
    const [busca, setBusca] = useState('');
    const [convite, setConvite] = useState<string | null>(null); // id do consultor sendo provisionado
    const [acessoResult, setAcessoResult] = useState<{ email: string; senha: string } | null>(null);
    const [emailTocado, setEmailTocado] = useState(false);       // e-mail editado manualmente?
    const [erros, setErros] = useState<{ nome?: string; email?: string }>({});

    // Nome muda → sugere e-mail institucional (enquanto não for editado à mão)
    const onChangeNome = (v: string) => {
        setFormData(p => {
            const next = { ...p, nome: v };
            if (!emailTocado) {
                const slug = primeiroNomeSlug(v);
                next.email_professional = slug ? slug + DOMINIO_AVERE : '';
            }
            return next;
        });
        if (erros.nome) setErros(e => ({ ...e, nome: undefined }));
    };

    const onChangeEmail = (v: string) => {
        setEmailTocado(true);
        setFormData(p => ({ ...p, email_professional: v }));
        if (erros.email) setErros(e => ({ ...e, email: undefined }));
    };

    const validar = () => {
        const e: { nome?: string; email?: string } = {};
        if (!formData.nome.trim()) e.nome = 'Nome é obrigatório.';
        else if (formData.nome.trim().length < 3) e.nome = 'Nome muito curto.';
        if (!formData.email_professional.trim()) e.email = 'E-mail é obrigatório.';
        else if (!emailValido(formData.email_professional)) e.email = 'E-mail inválido.';
        setErros(e);
        return Object.keys(e).length === 0;
    };

    const fetchData = async () => {
        setLoading(true);
        const { data } = await supabase.from('consultores').select('*').order('nome');
        if (data) setConsultores(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        if (!validar()) return;
        setSalvando(true);
        // perfil_id vazio não é UUID válido — converte para null
        const payload = {
            ...formData,
            email_professional: formData.email_professional.trim(),
            perfil_id: formData.perfil_id || null,
        };
        try {
            const { error } = editId
                ? await supabase.from('consultores').update(payload).eq('id', editId)
                : await supabase.from('consultores').insert([payload]);
            if (error) {
                if (error.code === '23505') {
                    setErros(e => ({ ...e, email: 'E-mail já cadastrado para outro consultor.' }));
                    toast.error('E-mail já cadastrado para outro consultor.');
                } else {
                    toast.error(`Erro ao salvar: ${error.message}`);
                }
                return;
            }
            setIsModalOpen(false);
            toast.success(editId
                ? `Consultor "${payload.nome}" atualizado com sucesso.`
                : `Consultor "${payload.nome}" cadastrado com sucesso.`);
            fetchData();
        } catch (err: any) {
            toast.error(`Erro ao salvar: ${err?.message ?? 'tente novamente.'}`);
        } finally {
            setSalvando(false);
        }
    };

    const handleEditar = (item: Consultor) => {
        setFormData({ nome: item.nome, email_professional: item.email_professional, perfil_id: item.perfil_id, ativo: item.ativo });
        setEditId(item.id);
        setEmailTocado(true);   // não sobrescreve e-mail existente ao digitar o nome
        setErros({});
        setIsModalOpen(true);
    };

    const handleNovo = () => {
        setEditId(null);
        setFormData({ nome: '', email_professional: '', perfil_id: '', ativo: true });
        setEmailTocado(false);
        setErros({});
        setIsModalOpen(true);
    };

    // Senha temporária forte (sem caracteres ambíguos).
    const gerarSenhaTemp = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        let s = '';
        for (let i = 0; i < 10; i++) s += chars[Math.floor(Math.random() * chars.length)];
        return `Av!${s}`;
    };

    const handleConvidar = async (item: Consultor) => {
        setConvite(item.id);
        const senha = gerarSenhaTemp();
        try {
            const { error } = await supabase.functions.invoke('invite-consultor', {
                body: { consultor_id: item.id, email: item.email_professional, nome: item.nome, senha, role: 'CONSULTOR' }
            });
            if (error) throw error;
            setAcessoResult({ email: item.email_professional, senha });
            toast.success(`Acesso criado para ${item.nome}.`);
            fetchData();
        } catch (err: any) {
            let msg = err?.message ?? 'verifique o e-mail e tente novamente.';
            try { const body = await err?.context?.json?.(); if (body?.error) msg = typeof body.error === 'string' ? body.error : (body.error?.message ?? msg); } catch { /* ignore */ }
            toast.error(`Erro ao criar acesso: ${msg}`);
        } finally {
            setConvite(null);
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Users size={28} color="var(--color-secundaria)" />
                        <Typography variant="h1">Gestão de Equipe</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Administração de Consultores e Vínculos de Acesso</Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <TextField
                        leftIcon={Search}
                        placeholder="Pesquisar consultor..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        style={{ width: '240px' }}
                    />
                    <Button variant="solid" onClick={handleNovo}>
                        <Plus size={16} style={{ marginRight: 8 }} /> Novo Consultor
                    </Button>
                </div>
            </header>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <DataTable
                    data={consultores.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))}
                    selectable={false}
                    keyExtractor={(item) => item.id}
                    columns={[
                        {
                            header: 'Nome',
                            accessorKey: 'nome',
                            cell: (item) => <Typography variant="p" style={{ fontWeight: 600 }}>{item.nome}</Typography>
                        },
                        {
                            header: 'E-mail',
                            accessorKey: 'email_professional',
                            cell: (item) => <Typography variant="p" style={{ opacity: 0.6 }}>{item.email_professional}</Typography>
                        },
                        {
                            header: 'Status',
                            cell: (item) => (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <Badge variant="ghost" intent={item.ativo ? 'primaria' : 'secundaria'}>
                                        {item.ativo ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                    <Badge variant="ghost" intent={item.perfil_id ? 'primaria' : 'neutro'} style={{ fontSize: '10px', opacity: 0.7 }}>
                                        {item.perfil_id ? '● Vinculado' : '○ Sem acesso'}
                                    </Badge>
                                </div>
                            )
                        },
                        {
                            header: '',
                            cell: (item) => (
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px', alignItems: 'center' }}>
                                    {convite === item.id
                                        ? <Loader2 size={16} color="var(--color-primaria)" style={{ animation: 'spin 1s linear infinite' }} />
                                        : (item.perfil_id ? <KeyRound
                                            size={16} color="var(--color-primaria)" style={{ cursor: 'pointer', opacity: 0.7 }}
                                            title="Redefinir senha de acesso"
                                            onClick={() => {
                                                toast(`Redefinir a senha de ${item.nome}? Será gerada uma nova senha temporária.`, {
                                                    action: { label: 'Redefinir', onClick: () => handleConvidar(item) },
                                                    cancel: { label: 'Cancelar', onClick: () => {} },
                                                });
                                            }}
                                        /> : <Mail
                                            size={16} color="var(--color-primaria)" style={{ cursor: 'pointer', opacity: 0.7 }}
                                            title="Criar acesso (senha temporária)"
                                            onClick={() => {
                                                toast(`Criar acesso para ${item.nome}? Será gerada uma senha temporária para você repassar.`, {
                                                    action: { label: 'Criar acesso', onClick: () => handleConvidar(item) },
                                                    cancel: { label: 'Cancelar', onClick: () => {} },
                                                });
                                            }}
                                        />)}
                                    <Edit2
                                        size={16} color="#9CA3AF" style={{ cursor: 'pointer' }}
                                        onClick={() => handleEditar(item)}
                                    />
                                    <Trash2
                                        size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: 0.8 }}
                                        onClick={() => {
                                            toast(`Excluir o consultor ${item.nome}?`, {
                                                action: { label: 'Excluir', onClick: async () => {
                                                    const { error } = await supabase.from('consultores').delete().eq('id', item.id);
                                                    if (error) {
                                                        toast.error(`Não foi possível excluir: ${error.message}`);
                                                        return;
                                                    }
                                                    toast.success('Consultor excluído.');
                                                    fetchData();
                                                }},
                                                cancel: { label: 'Cancelar', onClick: () => {} },
                                            });
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
                    <ModalHeader>
                        <ModalTitle>{editId ? 'Editar Consultor' : 'Novo Consultor'}</ModalTitle>
                        <ModalDescription>Preencha os dados do consultor. O vínculo de acesso pode ser configurado depois.</ModalDescription>
                    </ModalHeader>

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <TextField
                                label="Nome Completo"
                                placeholder="Ex: João Silva"
                                value={formData.nome}
                                onChange={e => onChangeNome(e.target.value)}
                            />
                            {erros.nome && (
                                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#EF4444' }}>{erros.nome}</p>
                            )}
                        </div>
                        <div>
                            <TextField
                                label="E-mail Profissional"
                                placeholder={`joao${DOMINIO_AVERE}`}
                                value={formData.email_professional}
                                onChange={e => onChangeEmail(e.target.value)}
                            />
                            {erros.email
                                ? <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#EF4444' }}>{erros.email}</p>
                                : <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#9CA3AF' }}>
                                    Sugerido pelo padrão <strong>{`primeironome${DOMINIO_AVERE}`}</strong> — ajuste se necessário.
                                  </p>}
                        </div>
                        <p style={{ margin: '0', fontSize: '12px', color: '#9CA3AF', lineHeight: 1.5 }}>
                            Após salvar, use o ícone <strong style={{ color: 'var(--color-primaria)' }}>✉ Criar acesso</strong> na tabela. Será gerada uma <strong>senha temporária</strong> e o vínculo de login criado na hora — você repassa a senha ao consultor (peça para trocá-la no primeiro acesso).
                        </p>
                    </div>

                    <ModalFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSave} disabled={salvando}>
                            {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: 8 }} />}
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal open={!!acessoResult} onOpenChange={(o) => { if (!o) setAcessoResult(null); }}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Acesso criado ✅</ModalTitle>
                        <ModalDescription>Repasse estas credenciais ao consultor. A senha é temporária — peça para ele trocá-la no primeiro acesso.</ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: '#6B7280' }}>E-MAIL</label>
                            <div style={{ padding: '10px 12px', background: '#F3F4F6', borderRadius: 8, fontFamily: 'monospace', fontSize: 13 }}>{acessoResult?.email}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: '#6B7280' }}>SENHA TEMPORÁRIA</label>
                            <div style={{ padding: '10px 12px', background: '#F3F4F6', borderRadius: 8, fontFamily: 'monospace', fontSize: 13, fontWeight: 700 }}>{acessoResult?.senha}</div>
                        </div>
                        <Button variant="outline" onClick={() => {
                            navigator.clipboard?.writeText(`E-mail: ${acessoResult?.email}\nSenha temporária: ${acessoResult?.senha}`);
                            toast.success('Credenciais copiadas.');
                        }}>Copiar credenciais</Button>
                    </div>
                    <ModalFooter>
                        <Button variant="solid" onClick={() => setAcessoResult(null)}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
