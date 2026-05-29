import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, Button, Spinner, Typography, TextField, Badge, toast } from 'avere-ui';
import { RefreshCw, Search, Building2, ShieldCheck, ChevronDown, ChevronRight } from 'lucide-react';
import { supabase } from '../../services/supabase';

interface Conglomerado {
    id: string;
    nome_lider: string;
    nome_fantasia: string | null;
    instituicoes: Instituicao[];
}

interface Instituicao {
    id: string;
    nome_instituicao: string;
    link_fgc: string | null;
    primeira_letra: string | null;
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

export default function FGCTab() {
    const [conglomerados, setConglomerados] = useState<Conglomerado[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [busca, setBusca] = useState('');
    const [expandidos, setExpandidos] = useState<Set<string>>(new Set());
    const [ultimoLog, setUltimoLog] = useState<SyncLog | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const [{ data: congls, error: errC }, { data: insts, error: errI }, { data: log }] = await Promise.all([
                supabase.from('dicionario_conglomerados').select('id, nome_lider, nome_fantasia').order('nome_lider'),
                supabase.from('instituicoes_fgc').select('id, conglomerado_id, nome_instituicao, link_fgc, primeira_letra').order('nome_instituicao'),
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header + ação */}
            <Card>
                <CardContent style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '10px', color: '#10B981' }}>
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <Typography variant="h3">Conglomerados FGC</Typography>
                            <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6 }}>
                                {conglomerados.length} conglomerados · {totalInst} instituições
                                {ultimoLog?.finished_at && ` · Última sync: ${new Date(ultimoLog.finished_at).toLocaleString('pt-BR')}`}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {ultimoLog?.status === 'error' && (
                            <Badge variant="ghost" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
                                Último erro
                            </Badge>
                        )}
                        <Button variant="solid" onClick={handleSync} disabled={syncing}>
                            <RefreshCw size={16} style={{ marginRight: 8 }} className={syncing ? 'spin' : ''} />
                            {syncing ? 'Sincronizando...' : 'Atualizar lista'}
                        </Button>
                    </div>
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
                                        {c.nome_fantasia && (
                                            <Typography variant="p" style={{ fontSize: '11px', opacity: 0.6 }}>{c.nome_fantasia}</Typography>
                                        )}
                                    </div>
                                    <Badge variant="ghost">{c.instituicoes.length}</Badge>
                                </div>
                                {aberto && (
                                    <div style={{ padding: '0 16px 14px 42px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {c.instituicoes.map(i => (
                                            <div key={i.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, padding: '4px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                                <span style={{ flex: 1 }}>{i.nome_instituicao}</span>
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
