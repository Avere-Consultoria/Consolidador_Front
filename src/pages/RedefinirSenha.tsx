import { useEffect, useState } from 'react';
import { Typography, Button, Spinner } from 'avere-ui';
import { Lock } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';
import LogoAvere from '../assets/B_Azul.svg';

// Destino do link de redefinição enviado por e-mail. O Supabase autentica a
// sessão de recuperação automaticamente pela URL (detectSessionInUrl); aqui só
// validamos que ela existe e trocamos a senha via updateUser.
export default function RedefinirSenha() {
    const [senha, setSenha] = useState('');
    const [confirma, setConfirma] = useState('');
    const [pronto, setPronto] = useState(false);          // sessão de recuperação válida?
    const [verificando, setVerificando] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let ativo = true;
        // o token do link pode levar um instante para virar sessão
        const checa = async () => {
            const { data } = await supabase.auth.getSession();
            if (ativo && data.session) { setPronto(true); setVerificando(false); }
        };
        checa();
        const { data: sub } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
                setPronto(true);
                setVerificando(false);
            }
        });
        const timeout = setTimeout(() => { if (ativo) setVerificando(false); }, 4000);
        return () => { ativo = false; sub.subscription.unsubscribe(); clearTimeout(timeout); };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        if (senha.length < 8) { setErrorMsg('A senha deve ter ao menos 8 caracteres.'); return; }
        if (senha !== confirma) { setErrorMsg('As senhas não conferem.'); return; }
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: senha });
            if (error) { setErrorMsg(error.message); return; }
            setSucesso(true);
            setTimeout(() => navigate('/'), 1800);
        } catch {
            setErrorMsg('Erro inesperado. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px',
        border: '1px solid #D1D5DB', fontSize: '15px', color: '#111827', outline: 'none',
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', background: '#F9FAFB' }}>
            <div style={{ width: '100%', maxWidth: '400px', background: '#FFF', borderRadius: '14px', padding: '40px 32px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <img src={LogoAvere} alt="Logo" height="80" />
                    <Typography variant="h2" style={{ fontSize: '20px', marginTop: '12px', color: 'var(--color-secundaria)' }}>
                        Redefinir senha
                    </Typography>
                </div>

                {verificando ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}><Spinner size="lg" /></div>
                ) : !pronto ? (
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant="p" style={{ fontSize: '14px', color: '#DC2626', marginBottom: '16px' }}>
                            Link inválido ou expirado. Solicite um novo na tela de login.
                        </Typography>
                        <Button variant="solid" onClick={() => navigate('/login')}>Ir para o login</Button>
                    </div>
                ) : sucesso ? (
                    <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                        <Typography variant="p" style={{ fontSize: '14px', color: '#047857', fontWeight: 600 }}>
                            Senha redefinida! Entrando…
                        </Typography>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '14px', color: '#9CA3AF' }}><Lock size={18} /></div>
                            <input type="password" required value={senha} onChange={e => setSenha(e.target.value)}
                                   placeholder="Nova senha (mín. 8 caracteres)" style={inputStyle} />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '14px', color: '#9CA3AF' }}><Lock size={18} /></div>
                            <input type="password" required value={confirma} onChange={e => setConfirma(e.target.value)}
                                   placeholder="Confirme a nova senha" style={inputStyle} />
                        </div>
                        {errorMsg && (
                            <Typography variant="p" style={{ fontSize: '13px', color: '#DC2626', fontWeight: 500, margin: 0 }}>{errorMsg}</Typography>
                        )}
                        <Button variant="solid" type="submit" disabled={loading} style={{ height: '46px', fontWeight: 600 }}>
                            {loading ? <Spinner size="md" /> : 'Salvar nova senha'}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
