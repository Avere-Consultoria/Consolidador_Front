import { useState, useEffect, useRef, useMemo } from 'react';
import { Card, Button, Select, Badge, Spinner, Typography, toast } from 'avere-ui';
import { RefreshCw, Play, Square, CheckCircle2, AlertCircle, Clock, Search, Database } from 'lucide-react';
import { supabase } from '../../services/supabase';

// Reprocessa do raw arquivado (posicao_raw) por CONTA — sem chamar a corretora.
// Mesmo modelo da Central de Sincronização, mas chamando reprocessar-canonicos.
const OPCOES_INST = [
    { label: 'XP', value: 'XP' },
    { label: 'BTG', value: 'BTG' },
    { label: 'Ágora', value: 'AGORA' },
    { label: 'Avenue', value: 'AVENUE' },
];

type Status = 'nunca' | 'proc' | 'ok' | 'erro';
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

export default function ManutencaoTab() {
    const [inst, setInst] = useState('XP');
    const [itens, setItens] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [rodando, setRodando] = useState(false);
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState<'TODOS' | Status>('TODOS');
    const [run, setRun] = useState<{ feitos: number; total: number }>({ feitos: 0, total: 0 });
    const pararRef = useRef(false);

    const carregar = async (instituicao: string) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('cliente_contas')
                .select('id, codigo, ultima_sync, clientes(codigo_avere, nome), instituicoes!inner(codigo)')
                .eq('instituicoes.codigo', instituicao)
                .eq('ativo', true);
            if (error) throw error;
            const mapped: Item[] = (data ?? []).map((c: any) => ({
                id: c.id,
                nome: c.clientes?.nome ?? '—',
                codigoAvere: c.clientes?.codigo_avere ?? '—',
                conta: c.codigo ?? null,
                status: 'nunca' as Status,
                msg: '',
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

    // Reprocesso por CONTA: a edge processa só essa conta (bounded → sem 546).
    const reprocessar = async (alvo: Item[]) => {
        if (!alvo.length) return;
        setRodando(true); pararRef.current = false;
        let feitos = 0;
        setRun({ feitos: 0, total: alvo.length });
        for (const it of alvo) {
            if (pararRef.current) break;
            set(it.id, { status: 'proc', msg: '' });
            try {
                const { data, error } = await supabase.functions.invoke('reprocessar-canonicos', { body: { contaId: it.id } });
                if (error) throw error;
                const n = (data as any)?.ativos ?? 0;
                set(it.id, { status: 'ok', msg: `${n} ativo(s)` });
            } catch (err: any) {
                let msg = err?.message ?? 'erro';
                try { const b = await err?.context?.json?.(); if (b?.error) msg = typeof b.error === 'string' ? b.error : (b.error?.message ?? msg); } catch { /* */ }
                set(it.id, { status: 'erro', msg });
            }
            feitos++; setRun({ feitos, total: alvo.length });
        }
        setRodando(false);
        if (pararRef.current) toast('Reprocesso interrompido.');
        else toast.success('Reprocesso concluído.');
    };

    const cont = useMemo(() => {
        const c = { total: itens.length, ok: 0, erro: 0, nunca: 0, proc: 0 };
        itens.forEach(i => { (c as any)[i.status]++; });
        return c;
    }, [itens]);
    const falhas = itens.filter(i => i.status === 'erro');
    const pct = rodando && run.total ? Math.round((run.feitos / run.total) * 100)
        : (cont.total ? Math.round(((cont.ok + cont.erro) / cont.total) * 100) : 0);

    const itensVisiveis = useMemo(() => {
        const b = busca.trim().toLowerCase();
        return itens.filter(i =>
            (filtro === 'TODOS' || i.status === filtro)
            && (!b || i.nome.toLowerCase().includes(b) || i.codigoAvere.toLowerCase().includes(b) || (i.conta ?? '').toLowerCase().includes(b)));
    }, [itens, busca, filtro]);

    const badge = (s: Status) => {
        if (s === 'ok') return <Badge intent="primaria" variant="ghost" style={pill}><CheckCircle2 size={11} /> OK</Badge>;
        if (s === 'erro') return <Badge intent="erro" variant="ghost" style={pill}><AlertCircle size={11} /> Erro</Badge>;
        if (s === 'proc') return <Badge intent="alerta" variant="ghost" style={pill}><Spinner size="sm" /> …</Badge>;
        return <Badge intent="secundaria" variant="ghost" style={pill}><Clock size={11} /> —</Badge>;
    };
    const chip = (label: string, val: 'TODOS' | Status, n?: number) => (
        <button onClick={() => setFiltro(val)} style={{ ...chipS, ...(filtro === val ? chipA : {}) }}>{label}{n !== undefined ? ` (${n})` : ''}</button>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '16px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <Database size={22} color="var(--color-secundaria)" />
                        <Typography variant="h2" style={{ fontWeight: 700, fontSize: '20px' }}>Reprocessar canônicos do raw</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontSize: '13px', maxWidth: 720 }}>
                        Reaplica a classificação, a taxa e os detalhes <strong>atuais</strong> ao que já entrou, lendo o
                        payload cru arquivado — <strong>sem gastar a janela de chamada</strong> da corretora. Use após
                        mudar um mapeamento. Não toca em posições nem em curadorias manuais.
                    </Typography>
                </div>
                <div style={{ width: 200 }}>
                    <Select label="Instituição" value={inst} onChange={setInst} options={OPCOES_INST} />
                </div>
            </header>

            <Card style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {chip('Todas', 'TODOS', cont.total)}
                        {chip('OK', 'ok', cont.ok)}
                        {chip('Erro', 'erro', cont.erro)}
                        {chip('Pendente', 'nunca', cont.nunca)}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {falhas.length > 0 && !rodando && (
                            <Button variant="outline" onClick={() => reprocessar(falhas)}><RefreshCw size={14} style={{ marginRight: 6 }} /> Re-tentar falhas ({falhas.length})</Button>
                        )}
                        {rodando
                            ? <Button variant="outline" onClick={() => { pararRef.current = true; }}><Square size={14} style={{ marginRight: 6 }} /> Parar</Button>
                            : <Button variant="solid" onClick={() => reprocessar(itensVisiveis)} disabled={loading || itensVisiveis.length === 0}><Play size={14} style={{ marginRight: 6 }} /> Reprocessar todas</Button>}
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
                    <div style={{ maxHeight: 'calc(100vh - 360px)', overflow: 'auto' }}>
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
                                            <Button variant="ghost" onClick={() => reprocessar([it])} disabled={rodando} title="Reprocessar esta conta">
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
