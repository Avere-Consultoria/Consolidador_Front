import { useState } from 'react';
import { Typography, Button, Spinner } from 'avere-ui';
import { Mail, Lock } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';
import LogoAvere from '../assets/B_Azul.svg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [modoReset, setModoReset] = useState(false);
    const [resetEnviado, setResetEnviado] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                setErrorMsg('E-mail ou senha incorretos. Tente novamente.');
                return;
            }

            navigate('/');
        } catch {
            setErrorMsg('Erro inesperado na aplicação. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);
        try {
            await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/redefinir-senha`,
            });
            // Resposta neutra de propósito: não revela se o e-mail existe na base.
            setResetEnviado(true);
        } catch {
            setErrorMsg('Não foi possível enviar o link. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: '#FFFFFF' }}>

            {/* LADO ESQUERDO: Branding (Oculto em ecrãs muito pequenos) */}
            <div style={{
                flex: 1.2,
                background: 'linear-gradient(135deg, var(--color-secundaria) 0%, #004D7A 100%)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '60px',
                color: 'white'
            }}>
                {/* Elementos Gráficos Decorativos (Círculos desfocados) */}
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'var(--color-primaria)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.4 }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: '#00B4D8', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.3 }} />

                {/* Topo do lado esquerdo */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <Typography variant="h1" style={{ color: '#FFF', fontSize: '32px', letterSpacing: '-1px' }}>
                        Avere Consultoria de Investimentos
                    </Typography>
                    <div style={{ width: '40px', height: '4px', background: '#00B4D8', marginTop: '16px', borderRadius: '2px' }} />
                </div>

                {/* Centro do lado esquerdo */}
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '480px' }}>
                    <Typography variant="h1" style={{ color: '#FFF', fontSize: '48px', lineHeight: '1.1', marginBottom: '24px' }}>
                        A evolução da Gestão de Património.
                    </Typography>
                    <Typography variant="p" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: '1.6' }}>
                        Consolidação inteligente, análise de risco profunda e relatórios de excelência para os seus clientes.
                    </Typography>
                </div>

                {/* Rodapé do lado esquerdo */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <Typography variant="p" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                        © {new Date().getFullYear()} Avere Consultoria de Investimentos. Todos os direitos reservados.
                    </Typography>
                </div>
            </div>

            {/* LADO DIREITO: Formulário de Login */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFFFF',
                position: 'relative'
            }}>
                <div style={{ width: '100%', maxWidth: '380px', padding: '0 24px' }}>

                    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <div>
                            <img src={LogoAvere} alt="Logo" height="120" />
                        </div>
                    </div>

                    <form onSubmit={modoReset ? handleReset : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {modoReset && (
                            <Typography variant="p" style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.5 }}>
                                Informe seu e-mail e enviaremos um link para redefinir a senha.
                            </Typography>
                        )}

                        {/* Input Email com Ícone */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>E-mail</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '14px', color: '#9CA3AF' }}>
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="exemplo@avere.com"
                                    style={{
                                        width: '100%', padding: '12px 12px 12px 42px',
                                        borderRadius: '8px', border: '1px solid #D1D5DB',
                                        fontSize: '15px', color: '#111827', outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s'
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-primaria)'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 131, 203, 0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                        </div>

                        {/* input das Senhas */}
                        {!modoReset && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Senha</label>
                                <button
                                    type="button"
                                    onClick={() => { setModoReset(true); setErrorMsg(''); setResetEnviado(false); }}
                                    style={{ fontSize: '12px', color: 'var(--color-primaria)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}
                                >
                                    Esqueceu a senha?
                                </button>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '14px', color: '#9CA3AF' }}>
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%', padding: '12px 12px 12px 42px',
                                        borderRadius: '8px', border: '1px solid #D1D5DB',
                                        fontSize: '15px', color: '#111827', outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s'
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-primaria)'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 131, 203, 0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                        </div>
                        )}

                        {modoReset && resetEnviado && (
                            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px', padding: '10px 14px' }}>
                                <Typography variant="p" style={{ fontSize: '13px', color: '#047857', fontWeight: 500 }}>
                                    Se este e-mail estiver cadastrado, um link de redefinição foi enviado. Confira também a caixa de spam.
                                </Typography>
                            </div>
                        )}

                        {errorMsg && (
                            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '10px 14px' }}>
                                <Typography variant="p" style={{ fontSize: '13px', color: '#DC2626', fontWeight: 500 }}>{errorMsg}</Typography>
                            </div>
                        )}

                        <Button
                            variant="solid"
                            type="submit"
                            disabled={loading}
                            style={{
                                marginTop: '12px', height: '48px', fontSize: '16px', fontWeight: 600,
                                borderRadius: '8px', background: 'var(--color-primaria)'
                            }}
                        >
                            {loading ? <Spinner size="md" /> : (modoReset ? 'Enviar link de redefinição' : 'Entrar na Plataforma')}
                        </Button>

                        {modoReset && (
                            <button
                                type="button"
                                onClick={() => { setModoReset(false); setErrorMsg(''); setResetEnviado(false); }}
                                style={{ fontSize: '13px', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}
                            >
                                ← Voltar ao login
                            </button>
                        )}
                    </form>

                </div>
            </div>
        </div>
    );
}