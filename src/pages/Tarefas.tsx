import { useState, useEffect, useMemo, useCallback } from 'react';
import { Typography, Card, Spinner, Button, Combobox, Badge, toast } from 'avere-ui';
import { Plus, Sparkles, Trash2, CalendarPlus, Check, X, RotateCcw } from 'lucide-react';
import { supabase } from '../services/supabase';
import { EstadoVazio } from '../components/shared/EstadoVazio';
import { CheckCircle2, ListChecks } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';

interface Tarefa {
    id: string;
    titulo: string;
    descricao: string | null;
    consultor_id: string;
    cliente_id: string | null;
    origem: 'MANUAL' | 'SISTEMA';
    tipo: string | null;
    prazo: string | null;
    status: 'ABERTA' | 'CONCLUIDA';
    cliente?: { nome: string } | null;
}

type ConsultorRow = { perfil_id: string | null; nome: string };

// Data local no formato YYYY-MM-DD (sv-SE devolve ISO) — comparável com o `date` do banco.
const iso = (d: Date) => d.toLocaleDateString('sv-SE');
const emDias = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };

// "quinta-feira, 30 de julho" — meio-dia evita o deslocamento de fuso do date puro.
const diaExtenso = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });

export default function Tarefas() {
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';
    const { selectedClient, consultorPerfilId } = useClient();

    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [clientes, setClientes] = useState<{ id: string; nome: string }[]>([]);
    const [consultores, setConsultores] = useState<{ perfil_id: string; nome: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [verConcluidas, setVerConcluidas] = useState(false);
    const [modal, setModal] = useState(false);

    const [fTitulo, setFTitulo] = useState('');
    const [fDescricao, setFDescricao] = useState('');
    const [fCliente, setFCliente] = useState('');
    const [fPrazo, setFPrazo] = useState(iso(new Date()));
    const [fDono, setFDono] = useState('');

    const carregar = useCallback(async () => {
        const { data, error } = await supabase
            .from('tarefas')
            .select('*, cliente:clientes(nome)')
            .order('prazo', { ascending: true, nullsFirst: false });
        if (error) { toast.error('Erro ao carregar tarefas.'); return; }
        setTarefas((data as Tarefa[]) || []);
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            // Gera/atualiza as tarefas automáticas antes de listar (idempotente).
            await supabase.rpc('sincronizar_tarefas_sistema', { p_janela_dias: 30 });
            const [, cliRes, conRes] = await Promise.all([
                carregar(),
                supabase.from('clientes').select('id, nome').order('nome'),
                isMaster
                    ? supabase.from('consultores').select('perfil_id, nome').eq('ativo', true).order('nome')
                    : Promise.resolve({ data: [] as ConsultorRow[] }),
            ]);
            setClientes(cliRes.data || []);
            const cons = (conRes.data as ConsultorRow[] | null) || [];
            setConsultores(cons.filter((c): c is { perfil_id: string; nome: string } => !!c.perfil_id));
            setLoading(false);
        })();
    }, [carregar, isMaster]);

    // Os seletores do topo filtram a lista (não navegam) — igual em Alertas.
    // consultorPerfilId: null = "Todos os consultores" (só o master chega nisso);
    // para o consultor logado ele é o próprio id, então o filtro é inócuo (o RLS já cortou).
    const visiveis = useMemo(() => {
        let base = tarefas;
        if (consultorPerfilId) base = base.filter(t => t.consultor_id === consultorPerfilId);
        if (selectedClient) base = base.filter(t => t.cliente_id === selectedClient.id);
        return base.filter(t => (verConcluidas ? t.status === 'CONCLUIDA' : t.status === 'ABERTA'));
    }, [tarefas, consultorPerfilId, selectedClient, verConcluidas]);

    // Um bloco por DIA (dias sem tarefa não aparecem); sem prazo vai para o fim.
    const { dias, semPrazo } = useMemo(() => {
        const hoje = iso(new Date());
        const amanha = emDias(1);
        const porDia = new Map<string, Tarefa[]>();
        const sem: Tarefa[] = [];
        for (const t of visiveis) {
            if (!t.prazo) { sem.push(t); continue; }
            if (!porDia.has(t.prazo)) porDia.set(t.prazo, []);
            porDia.get(t.prazo)!.push(t);
        }
        const lista = [...porDia.keys()].sort().map(data => ({
            data,
            itens: porDia.get(data)!,
            atrasado: data < hoje,
            rotulo: data === hoje ? 'Hoje' : data === amanha ? 'Amanhã' : data < hoje ? 'Atrasada' : null,
        }));
        return { dias: lista, semPrazo: sem };
    }, [visiveis]);

    const abertasHoje = useMemo(() => {
        const hoje = iso(new Date());
        return dias.filter(d => d.data <= hoje).reduce((s, d) => s + d.itens.length, 0);
    }, [dias]);

    const concluir = async (t: Tarefa) => {
        const virandoAberta = t.status === 'CONCLUIDA';
        const { error } = await supabase.from('tarefas').update(
            virandoAberta
                ? { status: 'ABERTA', concluida_em: null, concluida_por: null }
                : { status: 'CONCLUIDA', concluida_em: new Date().toISOString(), concluida_por: perfil?.id },
        ).eq('id', t.id);
        if (error) { toast.error('Não foi possível atualizar a tarefa.'); return; }
        carregar();
    };

    const adiar = async (t: Tarefa, dias: number) => {
        const { error } = await supabase.from('tarefas').update({ prazo: emDias(dias) }).eq('id', t.id);
        if (error) { toast.error('Não foi possível adiar.'); return; }
        toast.success(dias === 1 ? 'Adiada para amanhã.' : `Adiada por ${dias} dias.`);
        carregar();
    };

    const excluir = async (t: Tarefa) => {
        const { error } = await supabase.from('tarefas').delete().eq('id', t.id);
        if (error) { toast.error('Não foi possível excluir.'); return; }
        carregar();
    };

    const salvar = async () => {
        if (!fTitulo.trim()) { toast.error('Informe o título da tarefa.'); return; }
        const dono = isMaster ? (fDono || perfil?.id) : perfil?.id;
        if (!dono) { toast.error('Selecione o consultor responsável.'); return; }
        setSalvando(true);
        const { error } = await supabase.from('tarefas').insert([{
            titulo: fTitulo.trim(),
            descricao: fDescricao.trim() || null,
            cliente_id: fCliente || null,
            consultor_id: dono,
            prazo: fPrazo || null,
            origem: 'MANUAL',
            criado_por: perfil?.id,
        }]);
        setSalvando(false);
        if (error) { toast.error('Erro ao criar a tarefa.'); return; }
        toast.success('Tarefa criada.');
        setModal(false);
        setFTitulo(''); setFDescricao(''); setFCliente(''); setFPrazo(iso(new Date())); setFDono('');
        carregar();
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <header style={{ borderBottom: '1px solid var(--color-borda)', paddingBottom: 20, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                    <Typography variant="h1">Tarefas</Typography>
                    <Typography variant="p" style={{ color: 'var(--color-text-secondary)' }}>
                        {selectedClient
                            ? `Foco no cliente: ${selectedClient.nome}`
                            : abertasHoje > 0 ? `${abertasHoje} para hoje (incluindo atrasadas).` : 'Nada pendente para hoje.'}
                    </Typography>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="outline" onClick={() => setVerConcluidas(v => !v)}>
                        {verConcluidas ? 'Ver abertas' : 'Ver concluídas'}
                    </Button>
                    <Button variant="solid" onClick={() => { setFDono(isMaster ? (consultorPerfilId ?? '') : ''); setModal(true); }}>
                        <Plus size={15} style={{ marginRight: 6 }} /> Nova tarefa
                    </Button>
                </div>
            </header>

                        {visiveis.length === 0 && (
                <Card style={{ padding: 0 }}>
                    {verConcluidas
                        ? <EstadoVazio compacto icon={ListChecks} titulo="Nenhuma tarefa concluída" dica="As tarefas que você concluir aparecem aqui." />
                        : <EstadoVazio compacto positivo icon={CheckCircle2} titulo="Tudo em dia" dica="Nenhuma tarefa aberta — os geradores criam novas quando surgirem vencimentos ou aniversários." />}
                </Card>
            )}

            {dias.map(d => (
                <BlocoDia
                    key={d.data}
                    titulo={diaExtenso(d.data)}
                    rotulo={d.rotulo}
                    cor={d.atrasado ? 'var(--color-danger-solid)' : d.rotulo === 'Hoje' ? 'var(--color-primaria)' : 'var(--gray-400)'}
                    itens={d.itens}
                    onConcluir={concluir} onAdiar={adiar} onExcluir={excluir}
                />
            ))}

            {semPrazo.length > 0 && (
                <BlocoDia
                    titulo="Sem prazo definido" rotulo={null} cor="#94A3B8" itens={semPrazo}
                    onConcluir={concluir} onAdiar={adiar} onExcluir={excluir}
                />
            )}

            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,31,40,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 24 }}>
                    <div style={{ background: '#fff', borderRadius: 14, width: '100%', maxWidth: 520, boxShadow: 'var(--shadow-modal)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h2" style={{ fontSize: 18, margin: 0, fontWeight: 700, color: 'var(--color-secundaria)' }}>Nova tarefa</Typography>
                            <X size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} onClick={() => setModal(false)} />
                        </div>

                        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={label}>Título</label>
                                <input value={fTitulo} onChange={e => setFTitulo(e.target.value)} placeholder="Ex.: Entrar em contato com o cliente" style={ctrl} />
                            </div>
                            <div>
                                <label style={label}>Descrição (opcional)</label>
                                <input value={fDescricao} onChange={e => setFDescricao(e.target.value)} placeholder="Detalhes da tarefa" style={ctrl} />
                            </div>
                            <div style={{ position: 'relative', zIndex: 30 }}>
                                <label style={label}>Cliente (opcional)</label>
                                <Combobox
                                    options={[{ value: '', label: 'Sem cliente' }, ...clientes.map(c => ({ value: c.id, label: c.nome }))]}
                                    value={fCliente} onChange={setFCliente} placeholder="Pesquise o cliente..."
                                />
                            </div>
                            {isMaster && (
                                <div style={{ position: 'relative', zIndex: 20 }}>
                                    <label style={label}>Responsável</label>
                                    <Combobox
                                        options={[{ value: '', label: 'Eu mesmo' }, ...consultores.map(c => ({ value: c.perfil_id, label: c.nome }))]}
                                        value={fDono} onChange={setFDono} placeholder="Atribuir a um consultor..."
                                    />
                                </div>
                            )}
                            <div>
                                <label style={label}>Prazo</label>
                                <input type="date" value={fPrazo} onChange={e => setFPrazo(e.target.value)} style={ctrl} />
                            </div>
                        </div>

                        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <Button variant="outline" onClick={() => setModal(false)}>Cancelar</Button>
                            <Button variant="solid" onClick={salvar} disabled={salvando}>
                                {salvando ? 'Salvando...' : 'Criar tarefa'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/** Um dia = um bloco fechado, com cabeçalho próprio e as tarefas daquele dia dentro. */
function BlocoDia({ titulo, rotulo, cor, itens, onConcluir, onAdiar, onExcluir }: {
    titulo: string;
    rotulo: string | null;
    cor: string;
    itens: Tarefa[];
    onConcluir: (t: Tarefa) => void;
    onAdiar: (t: Tarefa, dias: number) => void;
    onExcluir: (t: Tarefa) => void;
}) {
    return (
        <section style={{ border: '1px solid var(--color-borda)', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                background: `color-mix(in srgb, ${cor}, transparent 94%)`,
                borderBottom: '1px solid var(--color-borda)', borderLeft: `4px solid ${cor}`,
            }}>
                <Typography variant="p" style={{
                    margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--color-secundaria)',
                    textTransform: 'capitalize',
                }}>
                    {titulo}
                </Typography>
                {rotulo && (
                    <Badge variant="ghost" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', background: cor, color: '#fff' }}>
                        {rotulo.toUpperCase()}
                    </Badge>
                )}
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    {itens.length} {itens.length === 1 ? 'tarefa' : 'tarefas'}
                </span>
            </div>

            {itens.map((t, i) => (
                <div key={t.id} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px',
                    borderTop: i === 0 ? 'none' : '1px solid var(--color-surface-sunken)',
                }}>
                    <button
                        onClick={() => onConcluir(t)}
                        title={t.status === 'CONCLUIDA' ? 'Reabrir' : 'Concluir'}
                        style={{
                            width: 20, height: 20, marginTop: 2, flexShrink: 0, cursor: 'pointer',
                            borderRadius: 5, border: `1.5px solid ${t.status === 'CONCLUIDA' ? 'var(--color-primaria)' : 'var(--color-border-default)'}`,
                            background: t.status === 'CONCLUIDA' ? 'var(--color-primaria)' : '#fff',
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                        }}
                    >
                        {t.status === 'CONCLUIDA' && <Check size={13} strokeWidth={3} />}
                    </button>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <Typography variant="p" style={{
                                margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--color-secundaria)',
                                textDecoration: t.status === 'CONCLUIDA' ? 'line-through' : 'none',
                                opacity: t.status === 'CONCLUIDA' ? 0.5 : 1,
                            }}>
                                {t.titulo}
                            </Typography>
                            {t.origem === 'SISTEMA' && (
                                <Badge variant="ghost" style={{ fontSize: 9, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'color-mix(in srgb, var(--color-primaria), transparent 90%)', color: 'var(--color-primaria)', fontWeight: 700 }}>
                                    <Sparkles size={10} /> AUTOMÁTICA
                                </Badge>
                            )}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            {t.cliente?.nome && <span style={{ fontWeight: 600 }}>{t.cliente.nome}</span>}
                            {t.descricao && <span>{t.descricao}</span>}
                        </div>
                    </div>

                    {t.status === 'ABERTA' && (
                        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                            <button onClick={() => onAdiar(t, 1)} title="Adiar para amanhã" style={btnIcone}><CalendarPlus size={15} /></button>
                            <button onClick={() => onAdiar(t, 7)} title="Adiar 7 dias" style={btnIcone}><RotateCcw size={15} /></button>
                            {t.origem === 'MANUAL' && (
                                <button onClick={() => onExcluir(t)} title="Excluir" style={{ ...btnIcone, color: 'var(--color-danger-solid)' }}><Trash2 size={15} /></button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}

const btnIcone: React.CSSProperties = {
    background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)',
    padding: 4, borderRadius: 5, display: 'flex', alignItems: 'center',
};
const label: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)',
    textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6,
};
const ctrl: React.CSSProperties = {
    width: '100%', height: 40, padding: '8px 12px', borderRadius: 6,
    border: '1px solid color-mix(in srgb, var(--color-secundaria), transparent 80%)',
    fontSize: 14, fontFamily: 'var(--font-family)', outline: 'none', color: 'var(--color-secundaria)',
};
