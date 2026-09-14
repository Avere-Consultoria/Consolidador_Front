import { useCallback, useEffect, useMemo, useState } from 'react';
import { Typography, Card, Badge, Button, Spinner, Switch, TextField, TagInput, toast } from 'avere-ui';
import { BellRing, RotateCcw, Eye, History } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

// ─────────────────────────────────────────────────────────────────────────────
// Configurações → Notificações
// Padrão Avere (linha consultor_id NULL, só o master edita) + override PARCIAL por
// consultor: campo NULL herda o padrão. O banco resolve a preferência efetiva
// (notificacao_pref_efetiva) e monta a prévia real (notificacoes_previa).
// ─────────────────────────────────────────────────────────────────────────────

type Pref = {
    id?: string;
    consultor_id: string | null;
    ativo: boolean | null;
    email_destino: string | null;
    hora_envio: string | null;          // 'HH:MM'
    somente_dia_util: boolean | null;
    aniversario_ativo: boolean | null;
    aniversario_dias: number[] | null;
    vencimento_ativo: boolean | null;
    vencimento_dias: number[] | null;
};
type Consultor = { id: string; nome: string; email_professional: string | null; perfil_id: string | null };
type PreviaDia = { data_envio: string; itens: { tipo: string; cliente_nome: string; titulo?: string; data: string; dias: number }[] };
type Envio = { id: string; consultor_id: string; email_destino: string; data_ref: string; status: string; enviada_em: string | null; erro: string | null; assunto: string };

const VAZIA: Pref = { consultor_id: null, ativo: null, email_destino: null, hora_envio: null, somente_dia_util: null, aniversario_ativo: null, aniversario_dias: null, vencimento_ativo: null, vencimento_dias: null };
const hhmm = (t: string | null | undefined) => (t ? t.slice(0, 5) : '');
const diasParaTags = (d: number[] | null | undefined) => (d ?? []).map(n => (n === 0 ? 'no dia' : `${n} dias antes`));
const tagsParaDias = (tags: string[]) => Array.from(new Set(tags.map(t => {
    const s = t.trim().toLowerCase();
    if (s === 'no dia' || s === 'hoje' || s === '0') return 0;
    const n = parseInt(s.replace(/\D/g, ''), 10);
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), 30) : NaN;
}).filter(n => !Number.isNaN(n)))).sort((a, b) => b - a);
const fmtData = (iso: string) => { try { return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR'); } catch { return iso; } };
const fmtQuando = (iso: string | null) => { if (!iso) return '—'; try { const d = new Date(iso); return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); } catch { return iso; } };

const rotulo: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' };
const linha: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: '1px solid var(--color-border-subtle)' };

// Badge "padrão Avere" + botão de voltar ao padrão, para campos herdados/personalizados
function Herdado({ herdado, onReset, permitir }: { herdado: boolean; onReset: () => void; permitir: boolean }) {
    if (!permitir) return null;
    return herdado
        ? <Badge intent="neutro" variant="ghost" style={{ fontSize: '10px' }}>padrão Avere</Badge>
        : <button type="button" onClick={onReset} title="Voltar ao padrão Avere"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '10px', color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <RotateCcw size={11} /> voltar ao padrão
          </button>;
}

export default function ConfiguracoesNotificacoes() {
    const { user, perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';

    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [padrao, setPadrao] = useState<Pref>(VAZIA);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [alvo, setAlvo] = useState<string | 'padrao' | null>(null);   // consultor sendo editado ou 'padrao'
    const [override, setOverride] = useState<Pref>(VAZIA);
    const [previa, setPrevia] = useState<PreviaDia[] | null>(null);
    const [envios, setEnvios] = useState<Envio[]>([]);

    const meuConsultor = useMemo(() => consultores.find(c => c.perfil_id === user?.id) ?? null, [consultores, user?.id]);
    const editandoPadrao = alvo === 'padrao';
    const consultorAlvo = useMemo(() => consultores.find(c => c.id === alvo) ?? null, [consultores, alvo]);

    const carregar = useCallback(async () => {
        setLoading(true);
        try {
            const [prefRes, consRes] = await Promise.all([
                supabase.from('notificacao_preferencias').select('*'),
                supabase.from('consultores').select('id, nome, email_professional, perfil_id').eq('ativo', true).order('nome'),
            ]);
            if (prefRes.error) throw prefRes.error;
            const prefs = (prefRes.data ?? []) as Pref[];
            setPadrao(prefs.find(p => p.consultor_id === null) ?? VAZIA);
            const cons = (consRes.data ?? []) as Consultor[];
            setConsultores(cons);
            const meu = cons.find(c => c.perfil_id === user?.id) ?? null;
            const inicial = isMaster ? (meu?.id ?? 'padrao') : (meu?.id ?? null);
            setAlvo(inicial);
            if (isMaster) {
                const { data } = await supabase.from('notificacoes')
                    .select('id, consultor_id, email_destino, data_ref, status, enviada_em, erro, assunto')
                    .order('criado_em', { ascending: false }).limit(50);
                setEnvios((data ?? []) as Envio[]);
            }
        } catch (err) {
            console.error('Notificações: falha ao carregar', err);
            toast.error('Não foi possível carregar as preferências.');
        } finally { setLoading(false); }
    }, [isMaster, user?.id]);

    useEffect(() => { carregar(); }, [carregar]);

    // ao trocar o alvo, carrega o override dele (ou o padrão) e a prévia
    useEffect(() => {
        if (!alvo) return;
        let vivo = true;
        (async () => {
            if (alvo === 'padrao') { setOverride(padrao); setPrevia(null); return; }
            const { data } = await supabase.from('notificacao_preferencias').select('*').eq('consultor_id', alvo).maybeSingle();
            if (!vivo) return;
            setOverride((data as Pref) ?? { ...VAZIA, consultor_id: alvo });
            const { data: pv, error } = await supabase.rpc('notificacoes_previa', { p_consultor_id: alvo, p_dias: 7 });
            if (!vivo) return;
            if (error) console.error('prévia', error);
            setPrevia((pv ?? []) as PreviaDia[]);
        })();
        return () => { vivo = false; };
    }, [alvo, padrao]);

    // valor efetivo por campo = override ?? padrão
    const ef = <K extends keyof Pref>(k: K): Pref[K] => (editandoPadrao ? padrao[k] : (override[k] ?? padrao[k])) as Pref[K];
    const herdado = (k: keyof Pref) => !editandoPadrao && override[k] == null;
    const set = <K extends keyof Pref>(k: K, v: Pref[K]) => {
        if (editandoPadrao) setPadrao(p => ({ ...p, [k]: v }));
        else setOverride(p => ({ ...p, [k]: v }));
    };
    const reset = (k: keyof Pref) => setOverride(p => ({ ...p, [k]: null }));

    const salvar = async () => {
        setSalvando(true);
        try {
            if (editandoPadrao) {
                const { id, ...campos } = padrao;
                const { error } = id
                    ? await supabase.from('notificacao_preferencias').update({ ...campos, atualizado_em: new Date().toISOString(), atualizado_por: user?.id }).eq('id', id)
                    : await supabase.from('notificacao_preferencias').insert({ ...campos, consultor_id: null, atualizado_por: user?.id });
                if (error) throw error;
                toast.success('Padrão Avere salvo.');
            } else {
                const { id: _id, ...campos } = override;
                const { error } = await supabase.from('notificacao_preferencias')
                    .upsert({ ...campos, consultor_id: alvo, atualizado_em: new Date().toISOString(), atualizado_por: user?.id }, { onConflict: 'consultor_id' });
                if (error) throw error;
                toast.success('Preferências salvas.');
                const { data: pv } = await supabase.rpc('notificacoes_previa', { p_consultor_id: alvo, p_dias: 7 });
                setPrevia((pv ?? []) as PreviaDia[]);
            }
            await carregar();
        } catch (err) {
            console.error('Notificações: falha ao salvar', err);
            toast.error('Falha ao salvar. Tente de novo.');
        } finally { setSalvando(false); }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    if (!isMaster && !meuConsultor) {
        return (
            <div style={{ padding: '40px 0' }}>
                <Typography variant="h1" style={{ margin: 0 }}>Notificações</Typography>
                <Typography variant="p" style={{ color: 'var(--color-text-secondary)', marginTop: 8 }}>
                    Seu login ainda não está vinculado a um consultor. Peça ao master para ajustar em Cadastros → Equipe.
                </Typography>
            </div>
        );
    }

    const emailPlaceholder = editandoPadrao ? 'e-mail profissional de cada consultor' : (consultorAlvo?.email_professional ?? '');
    const permitirReset = !editandoPadrao;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: 980 }}>
            <header style={{ borderBottom: '1px solid var(--color-borda)', paddingBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BellRing size={22} style={{ color: 'var(--color-primaria)' }} />
                    <Typography variant="h1" style={{ margin: 0 }}>Notificações por e-mail</Typography>
                </div>
                <Typography variant="p" style={{ color: 'var(--color-text-secondary)', marginTop: '6px', maxWidth: 760 }}>
                    Um resumo diário por e-mail com os <strong>aniversários dos seus clientes</strong> e os <strong>vencimentos</strong> da
                    sua carteira. O que você não personalizar segue o <strong>padrão Avere</strong>.
                </Typography>
            </header>

            {isMaster && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button variant={editandoPadrao ? 'solid' : 'outline'} onClick={() => setAlvo('padrao')}>Padrão Avere</Button>
                    {consultores.map(c => (
                        <Button key={c.id} variant={alvo === c.id ? 'solid' : 'ghost'} onClick={() => setAlvo(c.id)} style={{ fontSize: '12px' }}>
                            {c.nome.split(' ')[0]}{c.perfil_id === user?.id ? ' (eu)' : ''}
                        </Button>
                    ))}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
                {/* ── Preferências ── */}
                <Card style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Typography variant="h2" style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
                            {editandoPadrao ? 'Padrão Avere' : `Preferências de ${consultorAlvo?.nome ?? ''}`}
                        </Typography>
                        {!editandoPadrao && override.id && <Badge intent="primaria" variant="ghost" style={{ fontSize: '10px' }}>personalizado</Badge>}
                    </div>

                    <div style={linha}>
                        <div>
                            <span style={rotulo}>Receber notificações</span>
                            <Herdado herdado={herdado('ativo')} onReset={() => reset('ativo')} permitir={permitirReset} />
                        </div>
                        <Switch checked={ef('ativo') ?? true} onCheckedChange={(v: boolean) => set('ativo', v)} />
                    </div>

                    <div style={{ ...linha, flexDirection: 'column', alignItems: 'stretch' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={rotulo}>E-mail de destino</span>
                            <Herdado herdado={herdado('email_destino')} onReset={() => reset('email_destino')} permitir={permitirReset} />
                        </div>
                        <TextField type="email" placeholder={emailPlaceholder || 'e-mail'} value={ef('email_destino') ?? ''}
                            onChange={e => set('email_destino', e.target.value || null)} disabled={editandoPadrao} />
                        {!editandoPadrao && <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: 4 }}>Em branco = seu e-mail profissional ({consultorAlvo?.email_professional ?? '—'}).</span>}
                    </div>

                    <div style={linha}>
                        <div>
                            <span style={rotulo}>Hora do envio</span>
                            <Herdado herdado={herdado('hora_envio')} onReset={() => reset('hora_envio')} permitir={permitirReset} />
                        </div>
                        <input type="time" value={hhmm(ef('hora_envio')) || '07:30'} onChange={e => set('hora_envio', e.target.value || null)}
                            style={{ padding: '8px 10px', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }} />
                    </div>

                    <div style={linha}>
                        <div>
                            <span style={rotulo}>Só em dias úteis</span>
                            <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>A véspera útil cobre o fim de semana e feriados.</span><br />
                            <Herdado herdado={herdado('somente_dia_util')} onReset={() => reset('somente_dia_util')} permitir={permitirReset} />
                        </div>
                        <Switch checked={ef('somente_dia_util') ?? true} onCheckedChange={(v: boolean) => set('somente_dia_util', v)} />
                    </div>

                    <div style={{ ...linha, flexDirection: 'column', alignItems: 'stretch' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={rotulo}>🎂 Aniversários de clientes</span>
                            <Switch checked={ef('aniversario_ativo') ?? true} onCheckedChange={(v: boolean) => set('aniversario_ativo', v)} />
                        </div>
                        <TagInput label="Avisar com antecedência de" placeholder="ex.: 7 dias antes, no dia — Enter para adicionar"
                            value={diasParaTags(ef('aniversario_dias'))} onChange={tags => set('aniversario_dias', tagsParaDias(tags))} />
                        <div style={{ marginTop: 4 }}><Herdado herdado={herdado('aniversario_dias') && herdado('aniversario_ativo')} onReset={() => { reset('aniversario_dias'); reset('aniversario_ativo'); }} permitir={permitirReset} /></div>
                    </div>

                    <div style={{ ...linha, flexDirection: 'column', alignItems: 'stretch', borderBottom: 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={rotulo}>⏰ Vencimentos (alertas do sistema)</span>
                            <Switch checked={ef('vencimento_ativo') ?? true} onCheckedChange={(v: boolean) => set('vencimento_ativo', v)} />
                        </div>
                        <TagInput label="Avisar com antecedência de" placeholder="ex.: 7 dias antes, no dia — Enter para adicionar"
                            value={diasParaTags(ef('vencimento_dias'))} onChange={tags => set('vencimento_dias', tagsParaDias(tags))} />
                        <div style={{ marginTop: 4 }}><Herdado herdado={herdado('vencimento_dias') && herdado('vencimento_ativo')} onReset={() => { reset('vencimento_dias'); reset('vencimento_ativo'); }} permitir={permitirReset} /></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                        <Button variant="solid" onClick={salvar} disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</Button>
                    </div>
                </Card>

                {/* ── Prévia ── */}
                <Card style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <Eye size={16} style={{ color: 'var(--color-primaria)' }} />
                        <Typography variant="h2" style={{ margin: 0, fontSize: 'var(--text-lg)' }}>Prévia dos próximos 7 dias</Typography>
                    </div>
                    <Typography variant="p" style={{ margin: '0 0 12px', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                        {editandoPadrao ? 'Escolha um consultor para ver a prévia com os dados reais dele.' : 'Com as preferências salvas. Dias sem itens não geram e-mail.'}
                    </Typography>
                    {!editandoPadrao && previa === null && <Spinner size="sm" />}
                    {!editandoPadrao && previa && previa.length === 0 && (
                        <Typography variant="p" style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Nenhum e-mail previsto nos próximos 7 dias.</Typography>
                    )}
                    {!editandoPadrao && previa && previa.map(dia => (
                        <div key={dia.data_envio} style={{ padding: '10px 0', borderTop: '1px solid var(--color-border-subtle)' }}>
                            <Typography variant="p" style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                                {fmtData(dia.data_envio)} · {dia.itens.length} item(ns)
                            </Typography>
                            {dia.itens.map((it, i) => (
                                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 'var(--text-xs)', padding: '2px 0' }}>
                                    <Badge intent={it.tipo === 'aniversario' ? 'primaria' : 'alerta'} variant="ghost" style={{ fontSize: '10px' }}>
                                        {it.tipo === 'aniversario' ? 'aniversário' : 'vencimento'}
                                    </Badge>
                                    <span style={{ color: 'var(--color-text-primary)' }}>
                                        <strong>{it.cliente_nome ?? '—'}</strong>{it.titulo ? ` — ${it.titulo}` : ''} · {fmtData(it.data)}{it.dias === 0 ? ' · hoje' : ` · em ${it.dias} dia(s)`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </Card>
            </div>

            {/* ── Histórico (master) ── */}
            {isMaster && (
                <Card style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <History size={16} style={{ color: 'var(--color-primaria)' }} />
                        <Typography variant="h2" style={{ margin: 0, fontSize: 'var(--text-lg)' }}>Últimos envios</Typography>
                    </div>
                    {envios.length === 0 ? (
                        <Typography variant="p" style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Nenhum e-mail gerado ainda.</Typography>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-xs)' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>
                                        {['Data', 'Consultor', 'Destino', 'Assunto', 'Status', 'Enviado em'].map(h => <th key={h} style={{ padding: '6px 8px', borderBottom: '1px solid var(--color-border-default)' }}>{h}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {envios.map(e => (
                                        <tr key={e.id}>
                                            <td style={{ padding: '6px 8px' }}>{fmtData(e.data_ref)}</td>
                                            <td style={{ padding: '6px 8px' }}>{consultores.find(c => c.id === e.consultor_id)?.nome ?? '—'}</td>
                                            <td style={{ padding: '6px 8px' }}>{e.email_destino}</td>
                                            <td style={{ padding: '6px 8px' }}>{e.assunto}</td>
                                            <td style={{ padding: '6px 8px' }}>
                                                <Badge intent={e.status === 'enviada' ? 'primaria' : e.status === 'erro' ? 'erro' : 'neutro'} variant="ghost" style={{ fontSize: '10px' }} title={e.erro ?? undefined}>{e.status}</Badge>
                                            </td>
                                            <td style={{ padding: '6px 8px' }}>{fmtQuando(e.enviada_em)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
