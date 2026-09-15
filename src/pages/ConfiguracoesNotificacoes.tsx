import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Typography, Card, Badge, Button, Spinner, Switch, TextField, Combobox, toast } from 'avere-ui';
import { BellRing, RotateCcw, Eye, History, Send, CalendarCheck2, Users, UserX, Cake, AlarmClock, Mail, RefreshCw, Plus, Check, Undo2 } from 'lucide-react';
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
//
// Regras (Bruno, 15/09):
//  • sem "chave geral" no padrão — a chave da casa é POR TIPO (aniversário/vencimento):
//    desligado no padrão, ninguém recebe aquele tipo, mesmo quem personalizou;
//  • e-mail de destino é espelho do cadastro (Equipe); consultor pode, se quiser, usar outro;
//  • tudo salva sozinho ao mudar (sem botão Salvar);
//  • master pode "restaurar o padrão para todos" (apaga as personalizações).
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
const fmtHora = (d: Date) => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
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

// ── Hora com máscara HH:MM (digita só números; valida ao sair do campo / Enter)
function HoraInput({ value, onCommit }: { value: string; onCommit: (v: string) => void }) {
    const [texto, setTexto] = useState(value);
    useEffect(() => { setTexto(value); }, [value]);
    const mascarar = (s: string) => {
        const d = s.replace(/\D/g, '').slice(0, 4);
        return d.length <= 2 ? d : `${d.slice(0, 2)}:${d.slice(2)}`;
    };
    const confirmar = () => {
        const m = texto.match(/^(\d{1,2}):?(\d{2})$/);
        const h = m ? parseInt(m[1], 10) : NaN, mi = m ? parseInt(m[2], 10) : NaN;
        if (!m || h > 23 || mi > 59) { toast.error('Hora inválida. Use HH:MM, ex.: 07:30.'); setTexto(value); return; }
        const norm = `${String(h).padStart(2, '0')}:${String(mi).padStart(2, '0')}`;
        setTexto(norm);
        if (norm !== value) onCommit(norm);
    };
    return (
        <input value={texto} inputMode="numeric" placeholder="HH:MM" maxLength={5}
            onChange={e => setTexto(mascarar(e.target.value))}
            onBlur={confirmar}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); (e.target as HTMLInputElement).blur(); } }}
            style={{ ...ctrl, width: 84, textAlign: 'center', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em' }} />
    );
}

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
function Linha({ titulo, descricao, origem, controle, vertical }: { titulo: React.ReactNode; descricao?: React.ReactNode; origem?: React.ReactNode; controle?: React.ReactNode; vertical?: boolean }) {
    return (
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-surface-sunken)', display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: vertical ? 'stretch' : 'center', justifyContent: 'space-between', gap: vertical ? 10 : 24 }}>
            <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <Typography variant="p" style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--color-secundaria)' }}>{titulo}</Typography>
                    {origem}
                </div>
                {descricao && <Typography variant="p" style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>{descricao}</Typography>}
            </div>
            {controle && <div style={{ flexShrink: 0 }}>{controle}</div>}
        </div>
    );
}

function Secao({ icone: Icone, titulo, extra }: { icone: React.ElementType; titulo: string; extra?: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'var(--gray-50)', borderTop: '1px solid var(--color-surface-sunken)' }}>
            <Icone size={14} color="var(--color-text-muted)" />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>{titulo}</span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>{extra}</div>
        </div>
    );
}

// ── Prévia: um bloco por dia de envio, com os itens daquele e-mail
function ListaDias({ dias }: { dias: PreviaDia[] }) {
    return (
        <>
            {dias.map(dia => (
                <div key={dia.data_envio}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 20px', background: 'var(--gray-50)', borderTop: '1px solid var(--color-surface-sunken)' }}>
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
        </>
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

// Indicador do autosave (rodapé do card)
function StatusSalvo({ estado, quando }: { estado: 'salvando' | 'salvo' | 'erro' | null; quando: Date | null }) {
    if (estado === 'salvando') return <span style={{ fontSize: 12, color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Spinner size="sm" /> Salvando…</span>;
    if (estado === 'erro') return <span style={{ fontSize: 12, color: 'var(--color-danger-text)', fontWeight: 600 }}>Não salvou. Tente de novo.</span>;
    if (estado === 'salvo' && quando) return <span style={{ fontSize: 12, color: 'var(--color-success-text)', display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600 }}><Check size={13} /> Salvo às {fmtHora(quando)}</span>;
    return <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>As mudanças são salvas automaticamente.</span>;
}

export default function ConfiguracoesNotificacoes() {
    const { user, perfil } = useAuth();
    const { consultorSelecionado } = useClient();
    const isMaster = perfil?.role === 'MASTER';

    const [loading, setLoading] = useState(true);
    const [padrao, setPadrao] = useState<Pref>(VAZIA);
    const [nPersonalizados, setNPersonalizados] = useState(0);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [alvo, setAlvo] = useState<string | null>(null);   // consultor sendo editado ou PADRAO
    const [override, setOverride] = useState<Pref>(VAZIA);
    const [outroEmail, setOutroEmail] = useState(false);     // consultor: mostrar campo de e-mail alternativo
    const [previa, setPrevia] = useState<PreviaDia[] | null>(null);
    const [previaCasa, setPreviaCasa] = useState<{ consultor: Consultor; dias: PreviaDia[] }[] | null>(null);   // Padrão Avere: casa inteira
    const [envios, setEnvios] = useState<Envio[]>([]);
    const [testando, setTestando] = useState(false);
    const [restaurando, setRestaurando] = useState(false);
    const [atualizandoEnvios, setAtualizandoEnvios] = useState(false);
    const [salvo, setSalvo] = useState<'salvando' | 'salvo' | 'erro' | null>(null);
    const [salvoEm, setSalvoEm] = useState<Date | null>(null);

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
            setNPersonalizados(prefs.filter(p => p.consultor_id !== null).length);
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

    // Prévia: do consultor (alvo) ou da casa inteira (Padrão) — uma RPC por consultor, em paralelo.
    const carregarPrevia = useCallback(async (quem: string, cons: Consultor[]) => {
        if (quem === PADRAO) {
            const res = await Promise.all(cons.map(async c => {
                const { data, error } = await supabase.rpc('notificacoes_previa', { p_consultor_id: c.id, p_dias: 7 });
                if (error) console.error('prévia', c.nome, error);
                return { consultor: c, dias: ((data ?? []) as PreviaDia[]) };
            }));
            const total = (d: PreviaDia[]) => d.reduce((s, x) => s + x.itens.length, 0);
            return { casa: res.filter(r => r.dias.length > 0).sort((a, b) => total(b.dias) - total(a.dias)) };
        }
        const { data, error } = await supabase.rpc('notificacoes_previa', { p_consultor_id: quem, p_dias: 7 });
        if (error) console.error('prévia', error);
        return { um: (data ?? []) as PreviaDia[] };
    }, []);

    // ao trocar o alvo, carrega o override dele e a prévia
    useEffect(() => {
        if (!alvo) return;
        let vivo = true;
        (async () => {
            setPrevia(null); setPreviaCasa(null); setSalvo(null); setSalvoEm(null);
            if (alvo !== PADRAO) {
                const { data } = await supabase.from('notificacao_preferencias').select('*').eq('consultor_id', alvo).maybeSingle();
                if (!vivo) return;
                const ov = (data as Pref) ?? { ...VAZIA, consultor_id: alvo };
                setOverride(ov);
                setOutroEmail(!!ov.email_destino);
            }
            const r = await carregarPrevia(alvo, consultores);
            if (!vivo) return;
            if (r.casa) setPreviaCasa(r.casa); else setPrevia(r.um ?? []);
        })();
        return () => { vivo = false; };
    }, [alvo, consultores, carregarPrevia]);

    // ── Autosave: cada mudança persiste na hora e atualiza a prévia ──
    const versao = useRef(0);
    const persistir = useCallback(async (next: Pref) => {
        const minha = ++versao.current;
        setSalvo('salvando');
        try {
            const carimbo = { atualizado_em: new Date().toISOString(), atualizado_por: user?.id };
            if (next.consultor_id === null) {
                const { id, ...campos } = next;
                const { error } = id
                    ? await supabase.from('notificacao_preferencias').update({ ...campos, ...carimbo }).eq('id', id)
                    : await supabase.from('notificacao_preferencias').insert({ ...campos, consultor_id: null, ...carimbo });
                if (error) throw error;
            } else {
                const campos: Pref = { ...next };
                delete campos.id;
                const { data, error } = await supabase.from('notificacao_preferencias')
                    .upsert({ ...campos, ...carimbo }, { onConflict: 'consultor_id' }).select('id').single();
                if (error) throw error;
                if (data?.id && !next.id) setOverride(p => ({ ...p, id: data.id }));
                setNPersonalizados(n => (next.id ? n : n + 1));
            }
            if (minha !== versao.current) return;   // veio outra mudança atrás desta
            setSalvo('salvo'); setSalvoEm(new Date());
            const r = await carregarPrevia(alvo ?? PADRAO, consultores);
            if (minha !== versao.current) return;
            if (r.casa) setPreviaCasa(r.casa); else setPrevia(r.um ?? []);
        } catch (err) {
            console.error('Notificações: falha ao salvar', err);
            setSalvo('erro');
            toast.error('Não foi possível salvar. Tente de novo.');
        }
    }, [user?.id, alvo, consultores, carregarPrevia]);

    // valor efetivo por campo = override ?? padrão
    const ef = <K extends keyof Pref>(k: K): Pref[K] => (editandoPadrao ? padrao[k] : (override[k] ?? padrao[k])) as Pref[K];
    const herdado = (k: keyof Pref) => !editandoPadrao && override[k] == null;
    const set = <K extends keyof Pref>(k: K, v: Pref[K]) => {
        if (editandoPadrao) { const next = { ...padrao, [k]: v }; setPadrao(next); persistir(next); }
        else { const next = { ...override, [k]: v }; setOverride(next); persistir(next); }
    };
    const reset = (...ks: (keyof Pref)[]) => {
        const next = { ...override };
        for (const k of ks) (next as Record<string, unknown>)[k] = null;
        setOverride(next); persistir(next);
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

    // Master: apaga todas as personalizações → todo mundo volta ao padrão Avere
    const restaurarPadrao = () => {
        toast(`Restaurar o padrão Avere para todos? As ${nPersonalizados} personalizações serão apagadas.`, {
            action: {
                label: 'Restaurar', onClick: async () => {
                    setRestaurando(true);
                    const { error } = await supabase.from('notificacao_preferencias').delete().not('consultor_id', 'is', null);
                    setRestaurando(false);
                    if (error) { toast.error(`Não foi possível restaurar: ${error.message}`); return; }
                    toast.success('Todos os consultores voltaram ao padrão Avere.');
                    await carregar();
                    const r = await carregarPrevia(PADRAO, consultores);
                    if (r.casa) setPreviaCasa(r.casa);
                },
            },
            cancel: { label: 'Cancelar', onClick: () => {} },
        });
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
    const emailCadastro = consultorAlvo?.email_professional ?? '';
    const emailEfetivo = ef('email_destino') || emailCadastro;
    const casaAniv = padrao.aniversario_ativo ?? true;
    const casaVenc = padrao.vencimento_ativo ?? true;
    const opcoesAlvo = [{ value: PADRAO, label: 'Padrão Avere (todos)' }, ...consultores.map(c => ({ value: c.id, label: c.perfil_id === user?.id ? `${c.nome} (eu)` : c.nome }))];
    const totalPrevia = (previa ?? []).reduce((s, d) => s + d.itens.length, 0);
    const totalCasa = (previaCasa ?? []).reduce((s, r) => s + r.dias.reduce((t, d) => t + d.itens.length, 0), 0);
    const emailsCasa = (previaCasa ?? []).reduce((s, r) => s + r.dias.length, 0);
    const semEmail = consultores.filter(c => !c.email_professional).length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <BellRing size={28} color="var(--color-secundaria)" />
                        <Typography variant="h1">Notificações</Typography>
                        {isMaster && (
                            <div style={{ display: 'flex', gap: 6 }}>
                                <Badge intent={casaAniv ? 'primaria' : 'neutro'} variant="solid" style={{ fontSize: 11 }}>Aniversários {casaAniv ? 'ligados' : 'desligados'}</Badge>
                                <Badge intent={casaVenc ? 'primaria' : 'neutro'} variant="solid" style={{ fontSize: 11 }}>Vencimentos {casaVenc ? 'ligados' : 'desligados'}</Badge>
                            </div>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: '24px', alignItems: 'stretch' }}>
                {/* ── Preferências ── */}
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <TituloCard
                        icone={editandoPadrao ? Users : Mail}
                        titulo={editandoPadrao ? 'Padrão Avere' : (isMaster ? `Preferências de ${consultorAlvo?.nome ?? ''}` : 'Minhas preferências')}
                        extra={<>
                            {editandoPadrao && nPersonalizados > 0 && <Badge intent="neutro" variant="ghost" style={{ fontSize: 10 }}>{nPersonalizados} consultor{nPersonalizados === 1 ? '' : 'es'} com personalização</Badge>}
                            {!editandoPadrao && override.id && <Badge intent="primaria" variant="ghost" style={{ fontSize: 10 }}>personalizado</Badge>}
                        </>}
                    />

                    <Secao icone={Send} titulo="Entrega" />
                    {!editandoPadrao && (
                        <Linha
                            titulo="Receber notificações"
                            descricao="Desligado, você não recebe nenhum e-mail."
                            origem={<Origem herdado={herdado('ativo')} onReset={() => reset('ativo')} permitir={permitirReset} />}
                            controle={<Switch checked={ef('ativo') ?? true} onCheckedChange={(v: boolean) => set('ativo', v)} />}
                        />
                    )}
                    {editandoPadrao ? (
                        <Linha
                            titulo="E-mail de destino"
                            descricao={<>Cada consultor recebe no <strong>e-mail profissional do cadastro</strong> (Cadastros → Equipe).{semEmail > 0 && <> <span style={{ color: 'var(--color-warning-text)', fontWeight: 600 }}>{semEmail} consultor{semEmail === 1 ? '' : 'es'} sem e-mail cadastrado.</span></>}</>}
                        />
                    ) : (
                        <Linha
                            vertical={outroEmail}
                            titulo="E-mail de destino"
                            descricao={outroEmail ? `Do cadastro: ${emailCadastro || '—'}. Em branco volta a usar o cadastro.` : 'E-mail profissional do cadastro (Cadastros → Equipe).'}
                            origem={<Origem herdado={herdado('email_destino')} onReset={() => { reset('email_destino'); setOutroEmail(false); }} permitir={permitirReset} />}
                            controle={outroEmail ? (
                                <TextField type="email" placeholder={emailCadastro || 'e-mail'} defaultValue={override.email_destino ?? ''}
                                    onBlur={e => { const v = e.target.value.trim() || null; if (v !== (override.email_destino ?? null)) set('email_destino', v); if (!v) setOutroEmail(false); }}
                                    onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-secundaria)' }}>{emailEfetivo || '—'}</span>
                                    <button type="button" onClick={() => setOutroEmail(true)}
                                        style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-primaria)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-family)' }}>
                                        usar outro
                                    </button>
                                </div>
                            )}
                        />
                    )}
                    <Linha
                        titulo="Hora do envio"
                        descricao="Horário de Brasília. O e-mail sai na primeira rodada após essa hora."
                        origem={<Origem herdado={herdado('hora_envio')} onReset={() => reset('hora_envio')} permitir={permitirReset} />}
                        controle={<HoraInput value={hhmm(ef('hora_envio')) || '07:30'} onCommit={v => set('hora_envio', v)} />}
                    />
                    <Linha
                        titulo="Só em dias úteis"
                        descricao="Ligado, a véspera útil já cobre o fim de semana e os feriados."
                        origem={<Origem herdado={herdado('somente_dia_util')} onReset={() => reset('somente_dia_util')} permitir={permitirReset} />}
                        controle={<Switch checked={ef('somente_dia_util') ?? false} onCheckedChange={(v: boolean) => set('somente_dia_util', v)} />}
                    />

                    <Secao icone={Cake} titulo="Aniversários de clientes"
                        extra={<>
                            {!editandoPadrao && !casaAniv && <Badge intent="neutro" variant="ghost" style={{ fontSize: 10 }}>desligado na casa</Badge>}
                            <Switch checked={editandoPadrao ? casaAniv : (ef('aniversario_ativo') ?? true)} disabled={!editandoPadrao && !casaAniv}
                                onCheckedChange={(v: boolean) => set('aniversario_ativo', v)} />
                        </>} />
                    <Linha
                        vertical
                        titulo="Avisar com antecedência de"
                        descricao={editandoPadrao ? 'Chave da casa: desligada acima, ninguém recebe aniversários — mesmo quem personalizou.' : 'Cada antecedência marcada gera um lembrete. Clique para ligar ou desligar.'}
                        origem={<Origem herdado={herdado('aniversario_dias') && herdado('aniversario_ativo')} onReset={() => reset('aniversario_dias', 'aniversario_ativo')} permitir={permitirReset} />}
                        controle={<SeletorDias value={ef('aniversario_dias') ?? []} onChange={v => set('aniversario_dias', v)} />}
                    />

                    <Secao icone={AlarmClock} titulo="Vencimentos (alertas do sistema)"
                        extra={<>
                            {!editandoPadrao && !casaVenc && <Badge intent="neutro" variant="ghost" style={{ fontSize: 10 }}>desligado na casa</Badge>}
                            <Switch checked={editandoPadrao ? casaVenc : (ef('vencimento_ativo') ?? true)} disabled={!editandoPadrao && !casaVenc}
                                onCheckedChange={(v: boolean) => set('vencimento_ativo', v)} />
                        </>} />
                    <Linha
                        vertical
                        titulo="Avisar com antecedência de"
                        descricao={editandoPadrao ? 'Chave da casa: desligada acima, ninguém recebe vencimentos — mesmo quem personalizou.' : 'Vale para os ativos da sua carteira com vencimento (posição viva).'}
                        origem={<Origem herdado={herdado('vencimento_dias') && herdado('vencimento_ativo')} onReset={() => reset('vencimento_dias', 'vencimento_ativo')} permitir={permitirReset} />}
                        controle={<SeletorDias value={ef('vencimento_dias') ?? []} onChange={v => set('vencimento_dias', v)} />}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, padding: '14px 20px', borderTop: '1px solid var(--color-borda)', background: 'var(--gray-50)', flexWrap: 'wrap' }}>
                        <StatusSalvo estado={salvo} quando={salvoEm} />
                        {editandoPadrao ? (
                            <Button variant="outline" onClick={restaurarPadrao} disabled={restaurando || nPersonalizados === 0}
                                title={nPersonalizados === 0 ? 'Ninguém personalizou nada' : 'Apaga as personalizações de todos os consultores'}>
                                <Undo2 size={14} style={{ marginRight: 6 }} />{restaurando ? 'Restaurando…' : 'Restaurar padrão para todos'}
                            </Button>
                        ) : (
                            <Button variant="outline" onClick={enviarTeste} disabled={testando} title={`Envia um e-mail de teste para ${emailEfetivo || 'o destino configurado'}`}>
                                <Send size={14} style={{ marginRight: 6 }} />{testando ? 'Enviando…' : 'Enviar e-mail de teste'}
                            </Button>
                        )}
                    </div>
                </Card>

                {/* ── Prévia ── contida na altura do card de preferências (posição absoluta num
                    wrapper esticado pela grid); a lista rola dentro do card. */}
                <div style={{ position: 'relative', minHeight: 360 }}>
                <Card style={{ padding: 0, overflow: 'hidden', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
                    <TituloCard icone={Eye} titulo={editandoPadrao ? 'Prévia da casa · próximos 7 dias' : 'Prévia dos próximos 7 dias'}
                        extra={
                            editandoPadrao
                                ? previaCasa && previaCasa.length > 0 && <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{previaCasa.length} consultor{previaCasa.length === 1 ? '' : 'es'} · {emailsCasa} e-mail{emailsCasa === 1 ? '' : 's'} · {totalCasa} {totalCasa === 1 ? 'item' : 'itens'}</span>
                                : previa && previa.length > 0 && <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{previa.length} e-mail{previa.length === 1 ? '' : 's'} · {totalPrevia} {totalPrevia === 1 ? 'item' : 'itens'}</span>
                        } />
                    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
                    {(editandoPadrao ? previaCasa === null : previa === null) && <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Spinner size="md" /></div>}
                    {editandoPadrao && previaCasa && previaCasa.length === 0 && (
                        <EstadoVazio compacto positivo icon={CalendarCheck2} titulo="Nenhum e-mail previsto na casa"
                            dica={!casaAniv && !casaVenc ? 'Os dois tipos de aviso estão desligados no padrão Avere.' : 'Nenhum consultor tem aniversário ou vencimento no horizonte de 7 dias.'} />
                    )}
                    {editandoPadrao && previaCasa && previaCasa.map(r => (
                        <div key={r.consultor.id}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', background: 'var(--color-accent-subtle)', borderTop: '1px solid var(--color-surface-sunken)' }}>
                                <Users size={14} color="var(--color-secundaria)" />
                                <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--color-secundaria)' }}>{r.consultor.nome}</span>
                                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600 }}>{r.dias.length} e-mail{r.dias.length === 1 ? '' : 's'}</span>
                            </div>
                            <ListaDias dias={r.dias} />
                        </div>
                    ))}
                    {!editandoPadrao && previa && previa.length === 0 && (
                        <EstadoVazio compacto positivo icon={CalendarCheck2} titulo="Nenhum e-mail previsto" dica="Sem aniversários nem vencimentos no horizonte de 7 dias. Dias sem itens não geram e-mail." />
                    )}
                    {!editandoPadrao && previa && <ListaDias dias={previa} />}
                    </div>
                </Card>
                </div>
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
