import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Badge, Button, Spinner } from 'avere-ui';
import { MailWarning, ArrowRight } from 'lucide-react';
import { supabase } from '../../services/supabase';

// Fila de E-MAILS das notificações: e-mail que ficou parado (pendente, em erro ou
// "enviando") por mais de 1 hora. Sem este aviso, uma queda do worker da VPS ou do
// token do Microsoft fica silenciosa — o consultor só deixa de receber.

interface ItemFila {
    id: string;
    consultor: string | null;
    email: string;
    tipo: string;
    status: 'pendente' | 'erro' | 'enviando';
    tentativas: number;
    erro: string | null;
    criado_em: string;
}
interface Alerta { parados: number; erros_24h: number; ultimo_envio: string | null; itens: ItemFila[] }

const fmtHora = (iso: string | null) => {
    if (!iso) return '—';
    try { const d = new Date(iso); return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
    catch { return iso; }
};
const TIPO: Record<string, string> = { aniversario: 'Aniversários', vencimento: 'Vencimentos', teste: 'Teste' };
const STATUS: Record<ItemFila['status'], string> = { pendente: 'Não saiu', erro: 'Falhou', enviando: 'Travado no envio' };

export default function FilaEmails() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [alerta, setAlerta] = useState<Alerta | null>(null);
    const [falhaLeitura, setFalhaLeitura] = useState(false);

    useEffect(() => {
        let vivo = true;
        (async () => {
            const { data, error } = await supabase.rpc('notificacoes_alerta_fila');
            if (!vivo) return;
            if (error) { console.error('Pendências: falha ao ler a fila de e-mails', error); setFalhaLeitura(true); }
            setAlerta((data as Alerta) ?? null);
            setLoading(false);
        })();
        return () => { vivo = false; };
    }, []);

    const parados = alerta?.parados ?? 0;

    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <MailWarning size={20} style={{ color: 'var(--color-primaria)' }} />
                <Typography variant="h2" style={{ margin: 0 }}>E-mails de notificação</Typography>
                {parados > 0 && <Badge intent="alerta" variant="solid" style={{ fontSize: '12px' }}>{parados}</Badge>}
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}><Spinner size="md" /></div>
            ) : falhaLeitura ? (
                <Typography variant="p" style={{ margin: 0, color: 'var(--color-danger-text)' }}>
                    Não foi possível conferir a fila de e-mails agora.
                </Typography>
            ) : parados === 0 ? (
                <Typography variant="p" style={{ margin: 0, color: 'var(--color-text-secondary)', padding: '4px 0' }}>
                    Nenhum e-mail parado. ✓ Último envio: {fmtHora(alerta?.ultimo_envio ?? null)}
                </Typography>
            ) : (
                <>
                    <Typography variant="p" style={{ margin: 0, color: 'var(--color-text-secondary)', maxWidth: 760, fontSize: 'var(--text-sm)' }}>
                        Estes e-mails estão na fila há mais de uma hora e <strong>não chegaram ao consultor</strong>.
                        Em geral é o serviço de envio na VPS parado ou a autorização do Microsoft vencida.
                        Último envio que funcionou: <strong>{fmtHora(alerta?.ultimo_envio ?? null)}</strong>.
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(alerta?.itens ?? []).map(i => (
                            <Card key={i.id} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        <Typography variant="p" style={{ margin: 0, fontWeight: 700, color: 'var(--color-secundaria)' }}>
                                            {i.consultor ?? i.email}
                                        </Typography>
                                        <Badge intent="neutro" variant="ghost" style={{ fontSize: '10px' }}>{TIPO[i.tipo] ?? i.tipo}</Badge>
                                        <Badge intent="alerta" variant="ghost" style={{ fontSize: '10px' }}>{STATUS[i.status]}</Badge>
                                    </div>
                                    <Typography variant="p" style={{ margin: '4px 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                                        Na fila desde {fmtHora(i.criado_em)} · {i.tentativas} {i.tentativas === 1 ? 'tentativa' : 'tentativas'}
                                        {i.erro ? ` · ${i.erro}` : ''}
                                    </Typography>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div>
                        <Button variant="outline" onClick={() => navigate('/configuracoes/notificacoes')}>
                            Ver últimos envios
                            <ArrowRight size={15} style={{ marginLeft: 6 }} />
                        </Button>
                    </div>
                </>
            )}
        </section>
    );
}
