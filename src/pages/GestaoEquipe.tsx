import { useState, useEffect } from 'react';
import {
    Typography, Card, Button, DataTable, Spinner, Badge, toast,
    Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, TextField
} from 'avere-ui';
import { Users, Search, Mail, Loader2, KeyRound } from 'lucide-react';
import { supabase } from '../services/supabase';
import { AvisoCadastroHub } from '../components/shared/AvisoCadastroHub';

interface Consultor {
    id: string;
    nome: string;
    email_professional: string;
    ativo: boolean;
    perfil_id: string;
}

// Consultores vêm do HUB Avere (espelho-core) desde 08/10/2026: nome, e-mail e
// status não se editam aqui. O vínculo de LOGIN (perfil_id, Criar acesso) continua
// local até o login único do HUB (SPEC core-identidade F1–F4).

export default function GestaoEquipe() {
    const [loading, setLoading] = useState(true);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [busca, setBusca] = useState('');
    const [convite, setConvite] = useState<string | null>(null); // id do consultor sendo provisionado
    const [acessoResult, setAcessoResult] = useState<{ email: string; senha: string } | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const { data } = await supabase.from('consultores').select('*').order('nome');
        if (data) setConsultores(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

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
                body: { consultor_id: item.id, email: item.email_professional, nome: item.nome, senha, role: 'CONSULTOR_INTERNO' }
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
                    <Typography variant="p" style={{ color: 'var(--color-text-secondary)' }}>Administração de Consultores e Vínculos de Acesso</Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <TextField
                        leftIcon={Search}
                        placeholder="Pesquisar consultor..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        style={{ width: '240px' }}
                    />
                </div>
            </header>

            <AvisoCadastroHub caminhoHub="/equipe" />

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
                            cell: (item) => <Typography variant="p" style={{ color: 'var(--color-text-secondary)' }}>{item.email_professional}</Typography>
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
                                        : (item.perfil_id ? <span
                                            title="Redefinir senha de acesso"
                                            style={{ display: 'inline-flex', cursor: 'pointer' }}
                                            onClick={() => {
                                                toast(`Redefinir a senha de ${item.nome}? Será gerada uma nova senha temporária.`, {
                                                    action: { label: 'Redefinir', onClick: () => handleConvidar(item) },
                                                    cancel: { label: 'Cancelar', onClick: () => {} },
                                                });
                                            }}
                                        ><KeyRound size={16} color="var(--color-primaria)" style={{ opacity: 0.7 }} /></span>
                                        : <span
                                            title="Criar acesso (senha temporária)"
                                            style={{ display: 'inline-flex', cursor: 'pointer' }}
                                            onClick={() => {
                                                toast(`Criar acesso para ${item.nome}? Será gerada uma senha temporária para você repassar.`, {
                                                    action: { label: 'Criar acesso', onClick: () => handleConvidar(item) },
                                                    cancel: { label: 'Cancelar', onClick: () => {} },
                                                });
                                            }}
                                        ><Mail size={16} color="var(--color-primaria)" style={{ opacity: 0.7 }} /></span>)}
                                </div>
                            )
                        }
                    ]}
                />
            </Card>

            <Modal open={!!acessoResult} onOpenChange={(o) => { if (!o) setAcessoResult(null); }}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>Acesso criado ✅</ModalTitle>
                        <ModalDescription>Repasse estas credenciais ao consultor. A senha é temporária — peça para ele trocá-la no primeiro acesso.</ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--color-text-secondary)' }}>E-MAIL</label>
                            <div style={{ padding: '10px 12px', background: 'var(--color-surface-sunken)', borderRadius: 8, fontFamily: 'monospace', fontSize: 13 }}>{acessoResult?.email}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--color-text-secondary)' }}>SENHA TEMPORÁRIA</label>
                            <div style={{ padding: '10px 12px', background: 'var(--color-surface-sunken)', borderRadius: 8, fontFamily: 'monospace', fontSize: 13, fontWeight: 700 }}>{acessoResult?.senha}</div>
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
