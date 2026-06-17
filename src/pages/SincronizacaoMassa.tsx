import { useState, useEffect, useRef, useMemo } from 'react';
import { Typography, Card, Button, Select, Badge, Spinner, toast } from 'avere-ui';
import { RefreshCw, Play, Square, CheckCircle2, AlertCircle, Clock, Search } from 'lucide-react';
import { supabase } from '../services/supabase';

const FN: Record<string, string> = {
    BTG: 'get-btg-position', XP: 'get-xp-position', AVENUE: 'get-avenue-position', AGORA: 'get-agora-position',
};
const OPCOES_INST = [
    { label: 'BTG', value: 'BTG' },
    { label: 'XP (requer certificado)', value: 'XP' },
    { label: 'Avenue', value: 'AVENUE' },
    { label: 'Ágora', value: 'AGORA' },
];

type Status = 'nunca' | 'sync' | 'ok' | 'erro';
interface Item {
    id: string; nome: string; codigoAvere: string; conta: string | null;
    status: Status; msg: string; ultimaSync: string | null;
}

function fmtSync(iso: string | null): string {
    if (!iso) return 'nunca';
    const d = new Date(iso); const min = Math.floor((Date.now() - d.getTime()) / 60000);
    if (min < 1) return 'agora'; if (min < 60) return `há ${min} min`;
    const h = Math.floor(min / 60); if (h < 24) return `há ${h}h`;
    const dias = Math.floor(h / 24); if (dias === 1) return 'ontem'; if (dias < 30) return `há ${dias} dias`;
    return d.toLocaleDateString('pt-BR');
}

interface SyncCfg {
    habilitado: boolean; hora_inicio: number; hora_fim: number;
    somente_dia_util: boolean; instituicoes: string[]; tamanho_lote: number;
}
interface SyncLog { iniciado_em: string; origem: string; total: number; ok: number; erro: number; }
const INSTS_AUTO = ['BTG', 'AVENUE', 'AGORA', 'XP'];

export default function SincronizacaoMassa() {
    const [inst, setInst] = useState('BTG');
    const [itens, setItens] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [rodando, setRodando] = useState(false);
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState<'TODOS' | Status>('TODOS');
    const [run, setRun] = useState<{ feitos: number; total: number }>({ feitos: 0, total: 0 });
    const pararRef = useRef(false);

    // ── Sincronização automática (config + última execução) ──────────────────
    const [cfg, setCfg] = useState<SyncCfg | null>(null);
    const [salvandoCfg, setSalvandoCfg] = useState(false);
    const [rodandoAuto, setRodandoAuto] = useState(false);
    const [ultimaAuto, setUltimaAuto] = useState<SyncLog | null>(null);

    const carregarCfg = async () => {
        const [cfgRes, logRes] = await Promise.all([
            supabase.from('sync_config').select('habilitado, hora_inicio, hora_fim, somente_dia_util, instituicoes, tamanho_lote').eq('id', 1).maybeSingle(),
            supabase.from('sync_log').select('iniciado_em, origem, total, ok, erro').order('iniciado_em', { ascending: false }).limit(1).maybeSingle(),
        ]);
        if (cfgRes.data) setCfg(cfgRes.data as SyncCfg);
        setUltimaAuto((logRes.data as SyncLog) ?? null);
    };
    useEffect(() => { carregarCfg(); }, []);

    const salvarCfg = async () => {
        if (!cfg) return;
        if (cfg.hora_fim <= cfg.hora_inicio) { toast.error('Hora fim deve ser maior que a hora início.'); return; }
        setSalvandoCfg(true);
        const { error } = await supabase.from('sync_config').update({ ...cfg, atualizado_em: new Date().toISOString() }).eq('id', 1);
        setSalvandoCfg(false);
        if (error) { toast.error(`Erro ao salvar: ${error.message}`); return; }
        toast.success('Configuração salva.');
    };

    const rodarAgora = async () => {
        setRodandoAuto(true);
        try {
            const { data, error } = await supabase.functions.invoke('sync-agendado', { body: { force: true } });
            if (error) throw error;
            const r = data as any;
            toast.success(`Rodada: ${r.ok ?? 0} OK, ${r.erro ?? 0} erro (lote de ${r.total ?? 0}).`);
            await Promise.all([carregarCfg(), carregar(inst)]);
        } catch (err: any) {
            toast.error(`Falha ao disparar: ${err?.message ?? 'erro'}`);
        } finally { setRodandoAuto(false); }
    };
    const upCfg = (patch: Partial<SyncCfg>) => setCfg(c => (c ? { ...c, ...patch } : c));

    const carregar = async (instituicao: string) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('cliente_contas')
                .select('id, codigo, ultima_sync, ultimo_status, ultimo_erro, clientes(codigo_avere, nome), instituicoes!inner(codigo)')
                .eq('instituicoes.codigo', instituicao)
                .eq('ativo', true);
            if (error) throw error;
            const mapped: Item[] = (data ?? []).map((c: any) => ({
                id: c.id,
                nome: c.clientes?.nome ?? '—',
                codigoAvere: c.clientes?.codigo_avere ?? '—',
                conta: c.codigo ?? null,
                status: (c.ultimo_status === 'ok' ? 'ok' : c.ultimo_status === 'erro' ? 'erro' : 'nunca') as Status,
                msg: c.ultimo_status === 'erro' ? (c.ultimo_erro ?? '') : '',
                ultimaSync: c.ultima_sync ?? null,
            })).sort((a: Item, b: Item) => a.nome.localeCompare(b.nome));
            setItens(mapped);
        } catch (err: any) {
            console.error(err); toast.error('Erro ao carregar contas.'); setItens([]);
        } finally { setLoading(false); }
    };
    useEffect(() => { carregar(inst); }, [inst]);

    const set = (id: string, patch: Partial<Item>) =>
        setItens(prev => prev.map(it => (it.id === id ? { ...it, ...patch } : it)));

    // Erro transitório da XP (posição em preparo / gateway) → vale re-tentar sozinho.
    const ehPendenteXp = (msg: string) => {
        const m = (msg || '').toLowerCase();
        return m.includes('prepara') || m.includes('xp_data_pending')
            || m.includes('502') || m.includes('bad gateway')
            || m.includes('504') || m.includes('tempo esgotado');
    };

    // Espera cancelável (respeita o botão Parar).
    const esperar = (ms: number) => new Promise<boolean>(resolve => {
        let passou = 0;
        const iv = setInterval(() => {
            passou += 1000;
            if (pararRef.current) { clearInterval(iv); resolve(false); }
            else if (passou >= ms) { clearInterval(iv); resolve(true); }
        }, 1000);
    });

    // Uma passada sequencial. Devolve os itens que ficaram pendentes na XP (re-tentáveis).
    const umaPassada = async (alvo: Item[]): Promise<Item[]> => {
        const fn = FN[inst];
        const pendentes: Item[] = [];
        let feitos = 0;
        setRun({ feitos: 0, total: alvo.length });
        for (const it of alvo) {
            if (pararRef.current) break;
            set(it.id, { status: 'sync', msg: '' });
            try {
                const { error } = await supabase.functions.invoke(fn, { body: { contaId: it.id } });
                if (error) throw error;
                set(it.id, { status: 'ok', msg: '', ultimaSync: new Date().toISOString() });
            } catch (err: any) {
                let msg = err?.message ?? 'erro';
                try { const b = await err?.context?.json?.(); if (b?.error) msg = typeof b.error === 'string' ? b.error : (b.error?.message ?? msg); } catch { /* */ }
                set(it.id, { status: 'erro', msg });
                // persiste o erro (sucesso é carimbado pela própria edge function)
                supabase.from('cliente_contas').update({ ultimo_status: 'erro', ultimo_erro: msg }).eq('id', it.id).then(() => {});
                if (inst === 'XP' && ehPendenteXp(msg)) pendentes.push(it);
            }
            feitos++; setRun({ feitos, total: alvo.length });
        }
        return pendentes;
    };

    // XP é assíncrona: a 1ª passada PRIMA as contas (volta "em preparo"); espera-se UMA
    // vez e re-tenta só as pendentes. Não é polling — é 1 retry após o preparo. O cap de
    // rodadas evita martelar (cada chamada à toa empurra o prazo da XP pra frente).
    const ESPERA_XP_MS = 90_000;
    const MAX_RETRY_XP = 3;

    const sincronizar = async (alvoInicial: Item[]) => {
        if (!alvoInicial.length) return;
        setRodando(true); pararRef.current = false;

        let pendentes = await umaPassada(alvoInicial);
        let rodada = 0;
        while (inst === 'XP' && pendentes.length > 0 && rodada < MAX_RETRY_XP && !pararRef.current) {
            rodada++;
            toast(`${pendentes.length} conta(s) em preparo na XP — aguardando ~90s e re-tentando (rodada ${rodada}/${MAX_RETRY_XP})…`);
            const seguiu = await esperar(ESPERA_XP_MS);
            if (!seguiu) break;            // cancelado durante a espera
            pendentes = await umaPassada(pendentes);
        }

        setRodando(false);
        if (pararRef.current) toast('Sincronização interrompida.');
        else if (inst === 'XP' && pendentes.length > 0)
            toast(`${pendentes.length} conta(s) ainda em preparo após ${rodada} re-tentativas — re-tente em alguns minutos.`);
        else toast.success('Sincronização concluída.');
    };

    const cont = useMemo(() => {
        const c = { total: itens.length, ok: 0, erro: 0, nunca: 0, sync: 0 };
        itens.forEach(i => { (c as any)[i.status]++; });
        return c;
    }, [itens]);
    const falhas = itens.filter(i => i.status === 'erro');
    const pct = rodando && run.total ? Math.round((run.feitos / run.total) * 100) : (cont.total ? Math.round(((cont.ok + cont.erro) / cont.total) * 100) : 0);

    const itensVisiveis = useMemo(() => {
        const b = busca.trim().toLowerCase();
        return itens.filter(i =>
            (filtro === 'TODOS' || i.status === filtro)
            && (!b || i.nome.toLowerCase().includes(b) || i.codigoAvere.toLowerCase().includes(b) || (i.conta ?? '').toLowerCase().includes(b)));
    }, [itens, busca, filtro]);

    const badge = (s: Status) => {
        if (s === 'ok') return <Badge intent="primaria" variant="ghost" style={pill}><CheckCircle2 size={11} /> OK</Badge>;
        if (s === 'erro') return <Badge intent="erro" variant="ghost" style={pill}><AlertCircle size={11} /> Erro</Badge>;
        if (s === 'sync') return <Badge intent="alerta" variant="ghost" style={pill}><Spinner size="sm" /> …</Badge>;
        return <Badge intent="secundaria" variant="ghost" style={pill}><Clock size={11} /> Nunca</Badge>;
    };
    const chip = (label: string, val: 'TODOS' | Status, n?: number) => (
        <button onClick={() => setFiltro(val)} style={{ ...chipS, ...(filtro === val ? chipA : {}) }}>{label}{n !== undefined ? ` (${n})` : ''}</button>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '16px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ background: 'rgba(0,131,203,0.1)', padding: '8px', borderRadius: '8px' }}><RefreshCw size={24} color="var(--color-primaria)" /></div>
                        <Typography variant="h1" style={{ fontWeight: 700, fontSize: '24px' }}>Central de Sincronização</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontSize: '14px' }}>
                        Estado e disparo da sincronização por conta. Mantenha a aba aberta durante execuções em massa.
                    </Typography>
                </div>
                <div style={{ width: 220 }}>
                    <Select label="Instituição" value={inst} onChange={setInst} options={OPCOES_INST} />
                </div>
            </header>

            {/* ── SINCRONIZAÇÃO AUTOMÁTICA ──────────────────────────────────── */}
            {cfg && (
                <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid rgba(0,131,203,0.18)', background: 'rgba(0,131,203,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Clock size={18} color="var(--color-primaria)" />
                            <Typography variant="h2" style={{ fontSize: 15, fontWeight: 700 }}>Sincronização automática</Typography>
                            <button onClick={() => upCfg({ habilitado: !cfg.habilitado })}
                                style={{ ...chipS, ...(cfg.habilitado ? { background: 'rgba(16,185,129,0.12)', color: '#047857', borderColor: 'rgba(16,185,129,0.4)', fontWeight: 700 } : {}) }}>
                                {cfg.habilitado ? '● Ligada' : '○ Desligada'}
                            </button>
                        </div>
                        <Typography variant="p" style={{ fontSize: 12, color: '#6B7280' }}>
                            {ultimaAuto
                                ? `Última: ${new Date(ultimaAuto.iniciado_em).toLocaleString('pt-BR')} — ${ultimaAuto.ok} OK, ${ultimaAuto.erro} erro (${ultimaAuto.origem})`
                                : 'Ainda não executou.'}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <label style={lblS}>Janela (h)
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <input type="number" min={0} max={23} value={cfg.hora_inicio} onChange={e => upCfg({ hora_inicio: Number(e.target.value) })} style={numS} />
                                <span style={{ color: '#9CA3AF' }}>às</span>
                                <input type="number" min={1} max={24} value={cfg.hora_fim} onChange={e => upCfg({ hora_fim: Number(e.target.value) })} style={numS} />
                            </div>
                        </label>
                        <label style={lblS}>Lote por rodada
                            <input type="number" min={1} max={200} value={cfg.tamanho_lote} onChange={e => upCfg({ tamanho_lote: Number(e.target.value) })} style={{ ...numS, width: 70 }} />
                        </label>
                        <button onClick={() => upCfg({ somente_dia_util: !cfg.somente_dia_util })} style={{ ...chipS, ...(cfg.somente_dia_util ? chipA : {}) }}>
                            {cfg.somente_dia_util ? '● Só dias úteis' : '○ Todos os dias'}
                        </button>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>Instituições</span>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {INSTS_AUTO.map(code => {
                                    const on = cfg.instituicoes.includes(code);
                                    return (
                                        <button key={code} onClick={() => upCfg({ instituicoes: on ? cfg.instituicoes.filter(i => i !== code) : [...cfg.instituicoes, code] })}
                                            title={code === 'XP' ? 'XP requer certificado mTLS' : ''}
                                            style={{ ...chipS, padding: '4px 10px', ...(on ? chipA : {}) }}>{code}</button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <Button variant="outline" onClick={rodarAgora} disabled={rodandoAuto}>
                            {rodandoAuto ? <Spinner size="sm" /> : <><Play size={14} style={{ marginRight: 6 }} /> Rodar agora (ignora janela)</>}
                        </Button>
                        <Button variant="solid" onClick={salvarCfg} disabled={salvandoCfg}>
                            {salvandoCfg ? <Spinner size="sm" /> : 'Salvar configuração'}
                        </Button>
                    </div>
                </Card>
            )}

            <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {chip('Todas', 'TODOS', cont.total)}
                        {chip('OK', 'ok', cont.ok)}
                        {chip('Erro', 'erro', cont.erro)}
                        {chip('Nunca', 'nunca', cont.nunca)}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {falhas.length > 0 && !rodando && (
                            <Button variant="outline" onClick={() => sincronizar(falhas)}><RefreshCw size={14} style={{ marginRight: 6 }} /> Re-tentar falhas ({falhas.length})</Button>
                        )}
                        {rodando
                            ? <Button variant="outline" onClick={() => { pararRef.current = true; }}><Square size={14} style={{ marginRight: 6 }} /> Parar</Button>
                            : <Button variant="solid" onClick={() => sincronizar(itens)} disabled={loading || itens.length === 0}><Play size={14} style={{ marginRight: 6 }} /> Sincronizar todas</Button>}
                    </div>
                </div>
                <div style={{ position: 'relative', maxWidth: 320 }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, top: 9, color: '#9CA3AF' }} />
                    <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar por cliente, código ou conta…"
                        style={{ width: '100%', padding: '7px 10px 7px 30px', border: '1px solid var(--color-borda)', borderRadius: 6, fontSize: 13 }} />
                </div>
                <div style={{ height: 8, background: '#F1F5F9', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-primaria)', transition: 'width 0.3s ease' }} />
                </div>
                {rodando && <Typography variant="p" style={{ fontSize: 11, color: '#9CA3AF' }}>{run.feitos}/{run.total} nesta execução ({pct}%)</Typography>}
            </Card>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size="lg" /></div>
            ) : itens.length === 0 ? (
                <Card style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}><Typography variant="p">Nenhuma conta {inst} encontrada.</Typography></Card>
            ) : (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ maxHeight: 'calc(100vh - 380px)', overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr>
                                    <th style={th}>Cliente</th><th style={th}>Cód.</th><th style={th}>Conta</th>
                                    <th style={th}>Status</th><th style={th}>Última sync</th><th style={th}>Detalhe</th><th style={th}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {itensVisiveis.map(it => (
                                    <tr key={it.id} style={{ borderTop: '1px solid #F1F5F9', background: it.status === 'erro' ? '#FEF2F2' : it.status === 'ok' ? '#F0FDF4' : 'transparent' }}>
                                        <td style={{ ...td, fontWeight: 600 }}>{it.nome}</td>
                                        <td style={{ ...td, color: '#6B7280' }}>{it.codigoAvere}</td>
                                        <td style={{ ...td, color: '#6B7280' }}>{it.conta ?? '—'}</td>
                                        <td style={td}>{badge(it.status)}</td>
                                        <td style={{ ...td, color: it.ultimaSync ? '#374151' : '#9CA3AF' }} title={it.ultimaSync ? new Date(it.ultimaSync).toLocaleString('pt-BR') : ''}>{fmtSync(it.ultimaSync)}</td>
                                        <td style={{ ...td, color: it.status === 'erro' ? '#DC2626' : '#9CA3AF', fontSize: 11, maxWidth: 280, whiteSpace: 'normal' }}>{it.msg}</td>
                                        <td style={td}>
                                            <Button variant="ghost" onClick={() => sincronizar([it])} disabled={rodando} title="Sincronizar esta conta">
                                                <RefreshCw size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {itensVisiveis.length === 0 && (
                                    <tr><td colSpan={7} style={{ padding: 28, textAlign: 'center', color: '#9CA3AF' }}>Nenhuma conta com esses filtros.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
}

const th: React.CSSProperties = { position: 'sticky', top: 0, background: '#F8FAFC', textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--color-borda)' };
const td: React.CSSProperties = { padding: '8px 14px', whiteSpace: 'nowrap', verticalAlign: 'middle' };
const pill: React.CSSProperties = { fontSize: 10, display: 'inline-flex', alignItems: 'center', gap: 4 };
const chipS: React.CSSProperties = { padding: '5px 12px', fontSize: 12, border: '1px solid var(--color-borda)', borderRadius: 16, background: '#fff', color: '#6B7280', cursor: 'pointer' };
const chipA: React.CSSProperties = { background: 'var(--color-primaria)', color: '#fff', borderColor: 'var(--color-primaria)', fontWeight: 700 };
const lblS: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11, color: '#6B7280', fontWeight: 600 };
const numS: React.CSSProperties = { width: 56, padding: '6px 8px', border: '1px solid var(--color-borda)', borderRadius: 6, fontSize: 13 };
