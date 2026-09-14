import { useCallback, useEffect, useMemo, useState } from 'react';
import { Typography, Card, Badge, Button, Spinner, Switch, TextField, Combobox, toast } from 'avere-ui';
import { BellRing, RotateCcw, Eye, History, Send, CalendarCheck2, Users, UserX, Cake, AlarmClock, Mail, RefreshCw, Plus } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';
import { EstadoVazio } from '../components/shared/EstadoVazio';
import { fmt, fmtDate } from '../utils/formatters';

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
type PreviaDia = { data_envio: string; itens: { tipo: string; cliente_nome: string; titulo?: string; instituicao?: string; valor?: number; data: string; dias: number }[] };
type Envio = { id: string; consultor_id: string; email_destino: string; data_ref: string; status: string; enviada_em: string | null; erro: string | null; assunto: string };

const VAZIA: Pref = { consultor_id: null, ativo: null, email_destino: null, hora_envio: null, somente_dia_util: null, aniversario_ativo: null, aniversario_dias: null, vencimento_ativo: null, vencimento_dias: null };
const PADRAO = 'padrao';
const hhmm = (t: string | null | undefined) => (t ? t.slice(0, 5) : '');
const OPCOES_DIAS = [0, 1, 3, 7, 15, 30];
const rotuloDias = (n: number) => (n === 0 ? 'no dia' : n === 1 ? '1 dia antes' : `${n} dias antes`);
const fmtQuando = (iso: string | null) => { if (!iso) return '—'; try { const d = new Date(iso); return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); } catch { return iso; } };
// "seg, 15 set" — meio-dia evita o deslocamento de fuso do date puro.
const diaCurto = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).replace('.', '');

// Mesmos estilos de tabela de Alertas / Documentos Manuais
const th: React.CSSProperties = { padding: '9px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', textAlign: 'left', whiteSpace: 'nowrap' };
const td: React.CSSProperties = { padding: '10px 12px', fontSize: 13, color: 'var(--color-text-primary)', borderTop: '1px solid var(--color-surface-sunken)' };
const ctrl: React.CSSProperties = {
    height: 36, padding: '6px 10px', borderRadius: 6,
    border: '1px solid color-mix(in srgb, var(--color-secundaria), transparent 80%)',
    fontSize: 14, fontFamily: 'var(--font-family)', outline: 'none', color: 'var(--color-secundaria)', background: 'var(--color-white)',
};

const STATUS_ENVIO: Record<string, { rotulo: string; intent: 'primaria' | 'erro' | 'neutro' | 'alerta' }> = {
    enviada: { rotulo: 'Enviada', intent: 'primaria' },
    erro: { rotulo: 'Erro', intent: 'erro' },
    pendente: { rotulo: 'Na fila', intent: 'alerta' },
    enviando: { rotulo: 'Enviando', intent: 'alerta' },
    cancelada: { rotulo: 'Cancelada', intent: 'neutro' },
};

// ── Seletor de antecedências: chips que ligam/desligam + "outro" numérico (0–60 dias)
function SeletorDias({ value, onChange }: { value: number[]; onChange: (v: number[]) => void }) {
    const [outroAberto, setOutroAberto] = useState(false);
    const [outro, setOutro] = useState('');
    const sel = new Set(value);
    const alternar = (n: number) => {
        const s = new Set(sel);
        if (s.has(n)) s.delete(n); else s.add(n);
        onChange(Array.from(s).sort((a, b) => b - a));
    };
    const adicionarOutro = () => {
        const n = parseInt(outro, 10);
        if (!Number.isFinite(n) || n < 0 || n > 60) { toast.error('Informe entre 0 e 60 dias.'); return; }
        if (!sel.has(n)) onChange(Array.from(new Set([...value, n])).sort((a, b) => b - a));
        setOutro(''); setOutroAberto(false);
    };
    const extras = value.filter(n => !OPCOES_DIAS.includes(n));
    const chip = (n: number, ativo: boolean) => (
        <button key={n} type="button" onClick={() => alternar(n)} aria-pressed={ativo}
            style={{
                height: 28, padding: '0 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)',
                border: `1px solid ${ativo ? 'var(--color-primaria)' : 'var(--color-border-default)'}`,
                background: ativo ? 'var(--color-accent-subtle)' : 'var(--color-white)',
                color: ativo ? 'var(--color-primaria)' : 'var(--color-text-secondary)',
            }}>
            {rotuloDias(n)}
        </button>
    );
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            {OPCOES_DIAS.map(n => chip(n, sel.has(n)))}
            {extras.map(n => chip(n, true))}
            {outroAberto ? (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <input type="number" min={0} max={60} autoFocus value={outro} onChange={e => setOutro(e.target.value)} placeholder="dias"
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); adicionarOutro(); } if (e.key === 'Escape') { setOutroAberto(false); setOutro(''); } }}
                        style={{ ...ctrl, height: 28, width: 70, fontSize: 12 }} />
                    <Button variant="outline" onClick={adicionarOutro} disabled={outro === ''} style={{ height: 28, padding: '0 10px', fontSize: 12 }}>OK</Button>
                </div>
            ) : (
                <button type="button" onClick={() => setOutroAberto(true)} title="Outra antecedência"
                    style={{ height: 28, padding: '0 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', border: '1px dashed var(--color-border-default)', background: 'transparent', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Plus size={12} /> outro
                </button>
            )}
            {value.length === 0 && <span style={{ fontSize: 12, color: 'var(--color-danger-text)' }}>escolha ao menos uma antecedência</span>}
        </div>
    );
}

// ── Origem do valor: herdado do padrão Avere ou personalizado (com "voltar ao padrão")
function Origem({ herdado, onReset, permitir }: { herdado: boolean; onReset: () => void; permitir: boolean }) {
    if (!permitir) return null;
    return herdado
        ? <Badge intent="neutro" variant="ghost" style={{ fontSize: 10 }}>padrão Avere</Badge>
        : <button type="button" onClick={onReset} title="Voltar ao padrão Avere"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'var(--color-primaria)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-family)' }}>
            <RotateCcw size={11} /> voltar ao padrão
          </button>;
}

// ── Linha de configuração: texto à esquerda, controle à direita (ou embaixo, se `vertical`)
function Linha({ titulo, descricao, origem, controle, vertical }: { titulo: React.ReactNode; descricao?: React.ReactNode; origem?: React.ReactNode; controle: React.ReactNode; vertical?: boolean }) {
    return (
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-surface-sunken)', display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: vertical ? 'stretch' : 'center', justifyContent: 'space-between', gap: vertical ? 10 : 24 }}>
            <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <Typography variant="p" style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--color-secundaria)' }}>{titulo}</Typography>
                    {origem}
                </div>
                {descricao && <Typography variant="p" style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>{descricao}</Typography>}
            </div>
            <div style={{ flexShrink: 0 }}>{controle}</div>
        </div>
    );
}

function Secao({ icone: Icone, titulo, extra }: { icone: React.ElementType; titulo: string; extra?: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'var(--gray-50)', borderTop: '1px solid var(--color-surface-sunken)' }}>
            <Icone size={14} color="var(--color-text-muted)" />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>{titulo}</span>
            <div style={{ marginLeft: 'auto' }}>{extra}</div>
        </div>
    );
}

function TituloCard({ icone: Icone, titulo, extra }: { icone: React.ElementType; titulo: React.ReactNode; extra?: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: '1px solid var(--color-surface-sunken)' }}>
            <Icone size={18} color="var(--color-secundaria)" />
            <Typography variant="p" style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--color-secundaria)' }}>{titulo}</Typography>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>{extra}</div>
        </div>
    );
}

export default function ConfiguracoesNotificacoes() {
    const { user, perfil } = useAuth();
    const { consultorSelecionado } = useClient();
    const isMaster = perfil?.role === 'MASTER';

    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [padrao, setPadrao] = useState<Pref>(VAZIA);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [alvo, setAlvo] = useState<string | null>(null);   // consultor sendo editado ou PADRAO
    const [override, setOverride] = useState<Pref>(VAZIA);
    const [base, setBase] = useState<string>('');            // snapshot do que está salvo → detecta alteração pendente
    const [previa, setPrevia] = useState<PreviaDia[] | null>(null);
    const [envios, setEnvios] = useState<Envio[]>([]);
    const [testando, setTestando] = useState(false);
    const [atualizandoEnvios, setAtualizandoEnvios] = useState(false);

    const meuConsultor = useMemo(() => consultores.find(c => c.perfil_id === user?.id) ?? null, [consultores, user?.id]);
    const editandoPadrao = alvo === PADRAO;
    const consultorAlvo = useMemo(() => consultores.find(c => c.id === alvo) ?? null, [consultores, alvo]);
    const nomePorConsultor = useMemo(() => new Map(consultores.map(c => [c.id, c.nome])), [consultores]);

    const carregarEnvios = useCallback(async () => {
        const { data: hist } = await supabase.from('notificacoes')
            .select('id, consultor_id, email_destino, data_ref, status, enviada_em, erro, assunto')
            .order('criado_em', { ascending: false }).limit(50);
        const lista = (hist ?? []) as Envio[];
        setEnvios(lista);
        return lista;
    }, []);

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
            // Master: segue o consultor escolhido na barra do topo; senão o próprio; senão o padrão.
            const doTopo = isMaster && cons.some(c => c.id === consultorSelecionado) ? consultorSelecionado : null;
            setAlvo(prev => prev ?? (isMaster ? (doTopo ?? meu?.id ?? PADRAO) : (meu?.id ?? null)));
            if (isMaster) await carregarEnvios();
        } catch (err) {
            console.error('Notificações: falha ao carregar', err);
            toast.error('Não foi possível carregar as preferências.');
        } finally { setLoading(false); }
    }, [isMaster, user?.id, consultorSelecionado, carregarEnvios]);

    useEffect(() => { carregar(); }, [carregar]);

    // ao trocar o alvo, carrega o override dele (ou o padrão) e a prévia
    useEffect(() => {
        if (!alvo) return;
        let vivo = true;
        (async () => {
            if (alvo === PADRAO) { setOverride(padrao); setBase(JSON.stringify(padrao)); setPrevia(null); return; }
            const { data } = await supabase.from('notificacao_preferencias').select('*').eq('consultor_id', alvo).maybeSingle();
            if (!vivo) return;
            const ov = (data as Pref) ?? { ...VAZIA, consultor_id: alvo };
            setOverride(ov); setBase(JSON.stringify(ov));
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
    const alterado = JSON.stringify(editandoPadrao ? padrao : override) !== base;

    const salvar = async () => {
        setSalvando(true);
        try {
            if (editandoPadrao) {
                const { id, ...campos } = padrao;
                const { error } = id
                    ? await supabase.from('notificacao_preferencias').update({ ...campos, atualizado_em: new Date().toISOString(), atualizado_por: user?.id }).eq('id', id)
                    : await supabase.from('notificacao_preferencias').insert({ ...campos, consultor_id: null, atualizado_por: user?.id });
                if (error) throw error;
                setBase(JSON.stringify(padrao));
                toast.success('Padrão Avere salvo.');
            } else {
                const campos: Pref = { ...override };
                delete campos.id;
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

    // Acompanha o worker: consulta a cada 5 s até a linha sair de pendente/enviando (máx. 1 min)
    const acompanhar = useCallback((id: string) => {
        let tentativas = 0;
        const timer = setInterval(async () => {
            tentativas += 1;
            const lista = await carregarEnvios();
            const linha = lista.find(e => e.id === id);
            const terminou = linha && linha.status !== 'pendente' && linha.status !== 'enviando';
            if (terminou || tentativas >= 12) {
                clearInterval(timer);
                if (linha?.status === 'enviada') toast.success('E-mail de teste enviado.');
                else if (linha?.status === 'erro') toast.error(`Falha no envio: ${linha.erro ?? 'ver histórico'}`);
            }
        }, 5000);
    }, [carregarEnvios]);

    const enviarTeste = async () => {
        if (!alvo || alvo === PADRAO) return;
        setTestando(true);
        try {
            const { data, error } = await supabase.rpc('notificacoes_teste', { p_consultor_id: alvo });
            if (error) throw error;
            if (data?.ok) {
                toast.success(`E-mail de teste enfileirado para ${data.email} — acompanhando o envio…`);
                if (isMaster) { await carregarEnvios(); acompanhar(data.id); }
            } else {
                toast.error(data?.motivo ?? 'Não foi possível enfileirar o teste.');
            }
        } catch (err) {
            console.error('teste de notificação', err);
            toast.error(err instanceof Error ? err.message : 'Falha ao enviar o teste.');
        } finally { setTestando(false); }
    };

    const atualizarEnvios = async () => { setAtualizandoEnvios(true); await carregarEnvios(); setAtualizandoEnvios(false); };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    if (!isMaster && !meuConsultor) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <header style={{ borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <BellRing size={28} color="var(--color-secundaria)" />
                        <Typography variant="h1">Notificações</Typography>
                    </div>
                </header>
                <Card style={{ padding: 0 }}>
                    <EstadoVazio icon={UserX} titulo="Seu login ainda não está vinculado a um consultor" dica="Peça ao master para ajustar o vínculo em Cadastros → Equipe. Depois disso as preferências aparecem aqui." />
                </Card>
            </div>
        );
    }

    const permitirReset = !editandoPadrao;
    const emailEfetivo = ef('email_destino') || consultorAlvo?.email_professional || '';
    const masterDesligado = padrao.ativo === false;
    const opcoesAlvo = [{ value: PADRAO, label: 'Padrão Avere (todos)' }, ...consultores.map(c => ({ value: c.id, label: c.perfil_id === user?.id ? `${c.nome} (eu)` : c.nome }))];
    const totalPrevia = (previa ?? []).reduce((s, d) => s + d.itens.length, 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <BellRing size={28} color="var(--color-secundaria)" />
                        <Typography variant="h1">Notificações</Typography>
                        {isMaster && (
                            <Badge intent={masterDesligado ? 'neutro' : 'primaria'} variant="solid" style={{ fontSize: 11 }}>
                                {masterDesligado ? 'Envios desligados' : 'Envios ligados'}
                            </Badge>
                        )}
                    </div>
                    <Typography variant="p" style={{ color: 'var(--color-text-secondary)' }}>
                        {isMaster
                            ? 'Resumo diário por e-mail com aniversários de clientes e vencimentos. O padrão Avere vale para todos; cada consultor pode personalizar o que quiser.'
                            : 'Resumo diário por e-mail com os aniversários dos seus clientes e os vencimentos da sua carteira. O que você não personalizar segue o padrão Avere.'}
                    </Typography>
                </div>
                {isMaster && (
                    <div style={{ width: 300, flexShrink: 0 }}>
                        <Combobox options={opcoesAlvo} value={alvo ?? PADRAO} onChange={v => setAlvo(v)} placeholder="Configurar..." />
                    </div>
                )}
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: '24px', alignItems: 'start' }}>
                {/* ── Preferências ── */}
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <TituloCard
                        icone={editandoPadrao ? Users : Mail}
                        titulo={editandoPadrao ? 'Padrão Avere' : (isMaster ? `Preferências de ${consultorAlvo?.nome ?? ''}` : 'Minhas preferências')}
                        extra={<>
                            {!editandoPadrao && override.id && <Badge intent="primaria" variant="ghost" style={{ fontSize: 10 }}>personalizado</Badge>}
                            {alterado && <Badge intent="alerta" variant="ghost" style={{ fontSize: 10 }}>alterações não salvas</Badge>}
                        </>}
                    />

                    <Secao icone={Send} titulo="Entrega" />
                    <Linha
                        titulo="Receber notificações"
                        descricao={editandoPadrao ? 'Chave geral: desligada aqui, ninguém recebe — mesmo quem personalizou.' : 'Desligado, você não recebe nenhum e-mail.'}
                        origem={<Origem herdado={herdado('ativo')} onReset={() => reset('ativo')} permitir={permitirReset} />}
                        controle={<Switch checked={ef('ativo') ?? true} onCheckedChange={(v: boolean) => set('ativo', v)} />}
                    />
                    <Linha
                        vertical
                        titulo="E-mail de destino"
                        descricao={editandoPadrao ? 'Cada consultor recebe no próprio e-mail profissional.' : `Em branco = seu e-mail profissional (${consultorAlvo?.email_professional ?? '—'}).`}
                        origem={<Origem herdado={herdado('email_destino')} onReset={() => reset('email_destino')} permitir={permitirReset} />}
                        controle={
                            <TextField type="email" placeholder={editandoPadrao ? 'e-mail profissional de cada consultor' : (consultorAlvo?.email_professional ?? 'e-mail')}
                                value={ef('email_destino') ?? ''} onChange={e => set('email_destino', e.target.value || null)} disabled={editandoPadrao} />
                        }
                    />
                    <Linha
                        titulo="Hora do envio"
                        descricao="Horário de Brasília. O e-mail sai na primeira rodada após essa hora."
                        origem={<Origem herdado={herdado('hora_envio')} onReset={() => reset('hora_envio')} permitir={permitirReset} />}
                        controle={<input type="time" value={hhmm(ef('hora_envio')) || '07:30'} onChange={e => set('hora_envio', e.target.value || null)} style={{ ...ctrl, width: 110 }} />}
                    />
                    <Linha
                        titulo="Só em dias úteis"
                        descricao="Na véspera útil o resumo já cobre o fim de semana e os feriados."
                        origem={<Origem herdado={herdado('somente_dia_util')} onReset={() => reset('somente_dia_util')} permitir={permitirReset} />}
                        controle={<Switch checked={ef('somente_dia_util') ?? true} onCheckedChange={(v: boolean) => set('somente_dia_util', v)} />}
                    />

                    <Secao icone={Cake} titulo="Aniversários de clientes"
                        extra={<Switch checked={ef('aniversario_ativo') ?? true} onCheckedChange={(v: boolean) => set('aniversario_ativo', v)} />} />
                    <Linha
                        vertical
                        titulo="Avisar com antecedência de"
                        descricao="Cada antecedência marcada gera um lembrete. Clique para ligar ou desligar."
                        origem={<Origem herdado={herdado('aniversario_dias') && herdado('aniversario_ativo')} onReset={() => { reset('aniversario_dias'); reset('aniversario_ativo'); }} permitir={permitirReset} />}
                        controle={<SeletorDias value={ef('aniversario_dias') ?? []} onChange={v => set('aniversario_dias', v)} />}
                    />

                    <Secao icone={AlarmClock} titulo="Vencimentos (alertas do sistema)"
                        extra={<Switch checked={ef('vencimento_ativo') ?? true} onCheckedChange={(v: boolean) => set('vencimento_ativo', v)} />} />
                    <Linha
                        vertical
                        titulo="Avisar com antecedência de"
                        descricao="Vale para as tarefas automáticas de vencimento ainda abertas."
                        origem={<Origem herdado={herdado('vencimento_dias') && herdado('vencimento_ativo')} onReset={() => { reset('vencimento_dias'); reset('vencimento_ativo'); }} permitir={permitirReset} />}
                        controle={<SeletorDias value={ef('vencimento_dias') ?? []} onChange={v => set('vencimento_dias', v)} />}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, padding: '14px 20px', borderTop: '1px solid var(--color-borda)', background: 'var(--gray-50)', flexWrap: 'wrap' }}>
                        {!editandoPadrao ? (
                            <Button variant="outline" onClick={enviarTeste} disabled={testando} title={`Envia um e-mail de teste para ${emailEfetivo || 'o destino configurado'}`}>
                                <Send size={14} style={{ marginRight: 6 }} />{testando ? 'Enviando…' : 'Enviar e-mail de teste'}
                            </Button>
                        ) : <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Escolha um consultor para enviar um e-mail de teste.</span>}
                        <Button variant="solid" onClick={salvar} disabled={salvando || !alterado}>{salvando ? 'Salvando…' : 'Salvar'}</Button>
                    </div>
                </Card>

                {/* ── Prévia ── */}
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <TituloCard icone={Eye} titulo="Prévia dos próximos 7 dias"
                        extra={!editandoPadrao && previa && previa.length > 0 && <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{previa.length} e-mail{previa.length === 1 ? '' : 's'} · {totalPrevia} item{totalPrevia === 1 ? '' : 'ns'}</span>} />
                    {editandoPadrao && (
                        <EstadoVazio compacto icon={Users} titulo="Escolha um consultor" dica="A prévia usa os clientes e as tarefas reais do consultor selecionado no topo da página." />
                    )}
                    {!editandoPadrao && previa === null && <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Spinner size="md" /></div>}
                    {!editandoPadrao && previa && previa.length === 0 && (
                        <EstadoVazio compacto positivo icon={CalendarCheck2} titulo="Nenhum e-mail previsto" dica="Sem aniversários nem vencimentos no horizonte de 7 dias. Dias sem itens não geram e-mail." />
                    )}
                    {!editandoPadrao && previa && previa.map(dia => (
                        <div key={dia.data_envio}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', background: 'var(--gray-50)', borderTop: '1px solid var(--color-surface-sunken)' }}>
                                <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--color-primaria)', textTransform: 'capitalize' }}>{diaCurto(dia.data_envio)}</span>
                                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{fmtDate(dia.data_envio)}</span>
                                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600 }}>{dia.itens.length} {dia.itens.length === 1 ? 'item' : 'itens'}</span>
                            </div>
                            {dia.itens.map((it, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 20px', borderTop: '1px solid var(--color-surface-sunken)' }}>
                                    <Badge intent={it.tipo === 'aniversario' ? 'primaria' : 'alerta'} variant="ghost" style={{ fontSize: 10, flexShrink: 0 }}>
                                        {it.tipo === 'aniversario' ? 'aniversário' : 'vencimento'}
                                    </Badge>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-secundaria)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.cliente_nome ?? '—'}</div>
                                        {it.titulo && (
                                            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {it.titulo}{it.instituicao ? ` · ${it.instituicao}` : ''}{it.valor != null ? ` · ${fmt(it.valor)}` : ''}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <div style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{fmtDate(it.data)}</div>
                                        <div style={{ fontSize: 11, color: it.dias === 0 ? 'var(--color-primaria)' : 'var(--color-text-muted)', fontWeight: 600 }}>{it.dias === 0 ? 'hoje' : `em ${it.dias} dia${it.dias === 1 ? '' : 's'}`}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </Card>
            </div>

            {/* ── Histórico (master) ── */}
            {isMaster && (
                <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <History size={20} color="var(--color-secundaria)" />
                        <Typography variant="p" style={{ fontWeight: 700, fontSize: 16 }}>Últimos envios</Typography>
                        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{envios.length === 0 ? 'nenhum ainda' : `${envios.length} mais recentes`}</span>
                        <div style={{ flex: 1 }} />
                        <Button variant="ghost" onClick={atualizarEnvios} disabled={atualizandoEnvios} style={{ fontSize: 12 }}>
                            <RefreshCw size={14} style={{ marginRight: 6 }} />{atualizandoEnvios ? 'Atualizando…' : 'Atualizar'}
                        </Button>
                    </div>
                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        {envios.length === 0 ? (
                            <EstadoVazio compacto icon={Mail} titulo="Nenhum e-mail gerado ainda" dica="Os resumos diários e os e-mails de teste aparecem aqui com o status do envio." />
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
                                    <thead>
                                        <tr style={{ background: 'var(--gray-50)' }}>
                                            <th style={th}>Referência</th>
                                            <th style={th}>Consultor</th>
                                            <th style={th}>Destino</th>
                                            <th style={th}>Assunto</th>
                                            <th style={th}>Status</th>
                                            <th style={th}>Enviado em</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {envios.map(e => {
                                            const st = STATUS_ENVIO[e.status] ?? { rotulo: e.status, intent: 'neutro' as const };
                                            return (
                                                <tr key={e.id}>
                                                    <td style={{ ...td, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{fmtDate(e.data_ref)}</td>
                                                    <td style={{ ...td, fontWeight: 600 }}>{nomePorConsultor.get(e.consultor_id) ?? '—'}</td>
                                                    <td style={{ ...td, color: 'var(--color-text-secondary)' }}>{e.email_destino}</td>
                                                    <td style={{ ...td, maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.assunto}</td>
                                                    <td style={td}>
                                                        <Badge intent={st.intent} variant="ghost" style={{ fontSize: 10 }} title={e.erro ?? undefined}>{st.rotulo}</Badge>
                                                        {e.status === 'erro' && e.erro && <div style={{ fontSize: 11, color: 'var(--color-danger-solid)', maxWidth: 260, lineHeight: 1.35, marginTop: 4 }}>{e.erro}</div>}
                                                    </td>
                                                    <td style={{ ...td, whiteSpace: 'nowrap', color: 'var(--color-text-secondary)' }}>{fmtQuando(e.enviada_em)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </section>
            )}
        </div>
    );
}
