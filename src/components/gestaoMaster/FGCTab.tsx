import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, Button, Spinner, Typography, TextField, Badge, toast } from 'avere-ui';
import { RefreshCw, Search, Building2, ShieldCheck, ChevronDown, ChevronRight, Landmark } from 'lucide-react';
import { supabase } from '../../services/supabase';

interface Conglomerado {
    id: string;
    nome_lider: string;
    nome_fantasia: string | null;
    porte: string | null;
    porte_origem: string | null;
    cnpj: string | null;
    instituicoes: Instituicao[];
}

interface Instituicao {
    id: string;
    nome_instituicao: string;
    link_fgc: string | null;
    primeira_letra: string | null;
    cnpj: string | null;
}

interface SyncLog {
    id: string;
    started_at: string;
    finished_at: string | null;
    status: string;
    total_conglomerados: number;
    total_instituicoes: number;
    erro: string | null;
}

// ── Segmentação BCB (Res. CMN 4.553/2017) ───────────────────────────────────
const PORTE_INFO: Record<string, { cor: string; desc: string }> = {
    S1: { cor: '#15803D', desc: 'Sistêmico (≥10% PIB)' },
    S2: { cor: '#22C55E', desc: 'Grande (1–10% PIB)' },
    S3: { cor: '#0083CB', desc: 'Médio (0,1–1% PIB)' },
    S4: { cor: '#F59E0B', desc: 'Pequeno (<0,1% PIB)' },
    S5: { cor: '#EF4444', desc: 'Micro / Financeira' },
};
const PORTES = ['S1', 'S2', 'S3', 'S4', 'S5'];

function PorteBadge({ porte, origem }: { porte: string | null; origem: string | null }) {
    if (!porte) {
        return <Badge variant="ghost" style={{ fontSize: 10, opacity: 0.4 }}>sem porte</Badge>;
    }
    const info = PORTE_INFO[porte] ?? { cor: '#6B7280', desc: porte };
    return (
        <span
            title={`${info.desc}${origem === 'MANUAL' ? ' · definido manualmente' : ' · fonte BCB'}`}
            style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: `${info.cor}1A`, color: info.cor,
                fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 6,
                fontFamily: 'Montserrat, sans-serif',
                border: origem === 'MANUAL' ? `1px dashed ${info.cor}` : `1px solid ${info.cor}33`,
            }}
        >
            {porte}
            {origem === 'MANUAL' && <span style={{ fontSize: 8, opacity: 0.7 }}>✎</span>}
        </span>
    );
}

export default function FGCTab() {
    const [conglomerados, setConglomerados] = useState<Conglomerado[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [syncingBcb, setSyncingBcb] = useState(false);
    const [busca, setBusca] = useState('');
    const [expandidos, setExpandidos] = useState<Set<string>>(new Set());
    const [ultimoLog, setUltimoLog] = useState<SyncLog | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const [{ data: congls, error: errC }, { data: insts, error: errI }, { data: log }] = await Promise.all([
                supabase.from('dicionario_conglomerados').select('id, nome_lider, nome_fantasia, porte, porte_origem, cnpj').order('nome_lider'),
                supabase.from('instituicoes_fgc').select('id, conglomerado_id, nome_instituicao, link_fgc, primeira_letra, cnpj').order('nome_instituicao'),
                supabase.from('fgc_sync_log').select('*').order('started_at', { ascending: false }).limit(1).maybeSingle(),
            ]);
            if (errC) throw errC;
            if (errI) throw errI;

            const byCongl: Record<string, Instituicao[]> = {};
            (insts ?? []).forEach((i: any) => {
                (byCongl[i.conglomerado_id] = byCongl[i.conglomerado_id] || []).push(i);
            });

            setConglomerados((congls ?? []).map((c: any) => ({
                ...c,
                instituicoes: byCongl[c.id] ?? [],
            })));
            setUltimoLog(log ?? null);
        } catch (err: any) {
            toast.error(`Erro ao carregar: ${err.message ?? err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleSync = async () => {
        if (!confirm('Sincronizar lista do FGC agora? Pode levar 1-2 minutos.')) return;
        setSyncing(true);
        try {
            const { data, error } = await supabase.functions.invoke('sync-fgc-associados');
            if (error) throw error;
            toast.success(`Sincronizado: ${data.conglomerados} conglomerados, ${data.instituicoes} instituições.`);
            await load();
        } catch (err: any) {
            toast.error(`Erro na sync: ${err.message ?? err}`);
        } finally {
            setSyncing(false);
        }
    };

    const handleSyncBcb = async () => {
        if (!confirm('Atualizar porte (segmentação S1–S5) e CNPJ a partir do BCB?')) return;
        setSyncingBcb(true);
        try {
            const { data, error } = await supabase.functions.invoke('sync-bcb-instituicoes');
            if (error) throw error;
            toast.success(`Porte atualizado: ${data.conglom_com_porte} conglomerados classificados (base ${data.anomes}).`);
            await load();
        } catch (err: any) {
            toast.error(`Erro na sync BCB: ${err.message ?? err}`);
        } finally {
            setSyncingBcb(false);
        }
    };

    const handleSetPorte = async (conglomeradoId: string, porte: string) => {
        // porte === '' → volta para automático (limpa override)
        const patch = porte
            ? { porte, porte_origem: 'MANUAL' }
            : { porte: null, porte_origem: null };
        const { error } = await supabase.from('dicionario_conglomerados').update(patch).eq('id', conglomeradoId);
        if (error) { toast.error(`Erro ao salvar porte: ${error.message}`); return; }
        setConglomerados(prev => prev.map(c => c.id === conglomeradoId ? { ...c, ...patch } as Conglomerado : c));
    };

    const filtrados = useMemo(() => {
        const q = busca.trim().toLowerCase();
        if (!q) return conglomerados;
        return conglomerados
            .map(c => {
                const liderMatch = c.nome_lider.toLowerCase().includes(q);
                const fantMatch  = (c.nome_fantasia ?? '').toLowerCase().includes(q);
                const instFilt   = c.instituicoes.filter(i => i.nome_instituicao.toLowerCase().includes(q));
                if (liderMatch || fantMatch) return c;
                if (instFilt.length) return { ...c, instituicoes: instFilt };
                return null;
            })
            .filter(Boolean) as Conglomerado[];
    }, [conglomerados, busca]);

    const toggle = (id: string) => {
        setExpandidos(prev => {
            const n = new Set(prev);
            if (n.has(id)) n.delete(id); else n.add(id);
            return n;
        });
    };

    const totalInst = conglomerados.reduce((s, c) => s + c.instituicoes.length, 0);
    const comPorte  = conglomerados.filter(c => c.porte).length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header + ações */}
            <Card>
                <CardContent style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '10px', color: '#10B981' }}>
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <Typography variant="h3">Conglomerados FGC</Typography>
                            <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6 }}>
                                {conglomerados.length} conglomerados · {totalInst} instituições · {comPorte} com porte
                                {ultimoLog?.finished_at && ` · Lista FGC: ${new Date(ultimoLog.finished_at).toLocaleDateString('pt-BR')}`}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Button variant="outline" onClick={handleSyncBcb} disabled={syncingBcb}>
                            <Landmark size={16} style={{ marginRight: 8 }} className={syncingBcb ? 'spin' : ''} />
                            {syncingBcb ? 'Atualizando...' : 'Atualizar Porte (BCB)'}
                        </Button>
                        <Button variant="solid" onClick={handleSync} disabled={syncing}>
                            <RefreshCw size={16} style={{ marginRight: 8 }} className={syncing ? 'spin' : ''} />
                            {syncing ? 'Sincronizando...' : 'Atualizar lista'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Legenda de portes */}
            <Card>
                <CardContent style={{ padding: '12px 16px', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography variant="p" style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Porte (BCB)
                    </Typography>
                    {PORTES.map(p => (
                        <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <PorteBadge porte={p} origem={null} />
                            <span style={{ fontSize: 11, opacity: 0.6 }}>{PORTE_INFO[p].desc}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {ultimoLog?.status === 'error' && (
                <Card style={{ border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)' }}>
                    <CardContent style={{ padding: '12px 16px' }}>
                        <Typography variant="p" style={{ fontSize: '12px', color: '#B91C1C' }}>
                            <strong>Erro na última sync:</strong> {ultimoLog.erro}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {/* Busca */}
            <Card>
                <CardContent style={{ padding: '12px 16px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                        <TextField
                            value={busca}
                            onChange={(e: any) => setBusca(e.target.value)}
                            placeholder="Buscar conglomerado ou instituição..."
                            style={{ paddingLeft: 36 }}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Lista */}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size="lg" /></div>
            ) : filtrados.length === 0 ? (
                <Card>
                    <CardContent style={{ padding: '60px', textAlign: 'center', opacity: 0.6 }}>
                        <Building2 size={32} style={{ marginBottom: 12 }} />
                        <Typography variant="p">
                            {conglomerados.length === 0
                                ? 'Nenhum conglomerado cadastrado. Clique em "Atualizar lista" para importar do FGC.'
                                : 'Nenhum resultado para a busca.'}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filtrados.map(c => {
                        const aberto = expandidos.has(c.id);
                        return (
                            <Card key={c.id} style={{ overflow: 'hidden' }}>
                                <div
                                    onClick={() => toggle(c.id)}
                                    style={{
                                        padding: '14px 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                    }}
                                >
                                    {aberto ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    <Building2 size={16} style={{ opacity: 0.5 }} />
                                    <div style={{ flex: 1 }}>
                                        <Typography variant="p" style={{ fontWeight: 700, fontSize: '13px' }}>{c.nome_lider}</Typography>
                                        {c.cnpj && (
                                            <Typography variant="p" style={{ fontSize: '11px', opacity: 0.4 }}>CNPJ raiz: {c.cnpj}</Typography>
                                        )}
                                    </div>
                                    <PorteBadge porte={c.porte} origem={c.porte_origem} />
                                    <Badge variant="ghost">{c.instituicoes.length}</Badge>
                                </div>
                                {aberto && (
                                    <div style={{ padding: '0 16px 14px 42px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {/* Override de porte */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', marginBottom: 4, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                                            <Typography variant="p" style={{ fontSize: 11, fontWeight: 600, opacity: 0.6 }}>Porte:</Typography>
                                            <select
                                                value={c.porte ?? ''}
                                                onChange={(e) => handleSetPorte(c.id, e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                style={{
                                                    fontSize: 12, padding: '4px 8px', borderRadius: 6,
                                                    border: '1px solid rgba(0,0,0,0.15)', fontFamily: 'Montserrat, sans-serif',
                                                    background: '#fff', cursor: 'pointer',
                                                }}
                                            >
                                                <option value="">— (automático/sem porte)</option>
                                                {PORTES.map(p => (
                                                    <option key={p} value={p}>{p} — {PORTE_INFO[p].desc}</option>
                                                ))}
                                            </select>
                                            <span style={{ fontSize: 10, opacity: 0.45 }}>
                                                {c.porte_origem === 'MANUAL' ? 'definido manualmente' : c.porte_origem === 'AUTO_BCB' ? 'fonte: BCB' : ''}
                                            </span>
                                        </div>

                                        {c.instituicoes.map(i => (
                                            <div key={i.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, padding: '4px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                                <span style={{ flex: 1 }}>{i.nome_instituicao}</span>
                                                {i.cnpj && <span style={{ fontSize: 10, opacity: 0.4 }}>{i.cnpj}</span>}
                                                {i.link_fgc && (
                                                    <a href={i.link_fgc} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#0083CB' }}>
                                                        FGC ↗
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}

            <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
