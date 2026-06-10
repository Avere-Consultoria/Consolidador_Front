import { useState, useEffect } from 'react';
import { Card, Button, Typography, Spinner, TextField, Badge, toast } from 'avere-ui';
import { Info } from 'lucide-react';
import { supabase } from '../../services/supabase';

type Choice = 'HERDAR' | 'PADRONIZAR' | 'DESLIGAR';
interface Row {
    sub_tipo: string;
    choice: Choice;
    dias: string;
    global: { padronizar: boolean; dias: number | null } | null;  // referência do padrão global
}

const proximo: Record<Choice, Choice> = { HERDAR: 'PADRONIZAR', PADRONIZAR: 'DESLIGAR', DESLIGAR: 'HERDAR' };
const rotulo: Record<Choice, string> = { HERDAR: 'Herdar global', PADRONIZAR: '● Padronizar', DESLIGAR: '○ Desligar' };

export function LiquidezSubtipoConsultor({ consultorId }: { consultorId: string }) {
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const [canRes, globalRes, consRes] = await Promise.all([
            supabase.from('ativos_canonicos').select('sub_tipo_canonico'),
            supabase.from('liquidez_subtipo').select('sub_tipo, liquidez_dias, padronizar').is('consultor_id', null),
            supabase.from('liquidez_subtipo').select('sub_tipo, liquidez_dias, padronizar').eq('consultor_id', consultorId),
        ]);
        const subtipos = Array.from(new Set(
            (canRes.data || []).map((c: any) => (c.sub_tipo_canonico || '').trim()).filter((s: string) => s !== '')
        )).sort();

        const globalMap = new Map<string, { padronizar: boolean; dias: number | null }>();
        (globalRes.data || []).forEach((r: any) => globalMap.set(r.sub_tipo, { padronizar: !!r.padronizar, dias: r.liquidez_dias }));
        const consMap = new Map<string, { padronizar: boolean; dias: number | null }>();
        (consRes.data || []).forEach((r: any) => consMap.set(r.sub_tipo, { padronizar: !!r.padronizar, dias: r.liquidez_dias }));

        setRows(subtipos.map(st => {
            const c = consMap.get(st);
            const choice: Choice = c ? (c.padronizar ? 'PADRONIZAR' : 'DESLIGAR') : 'HERDAR';
            return {
                sub_tipo: st,
                choice,
                dias: c?.dias != null ? String(c.dias) : '',
                global: globalMap.get(st) ?? null,
            };
        }));
        setLoading(false);
    };

    useEffect(() => { loadData(); }, [consultorId]);

    const update = (i: number, patch: Partial<Row>) =>
        setRows(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

    const handleSave = async () => {
        const semDias = rows.find(r => r.choice === 'PADRONIZAR' && (r.dias === '' || isNaN(Number(r.dias))));
        if (semDias) { toast.error(`Defina a liquidez (D+N) para "${semDias.sub_tipo}".`); return; }

        setSalvando(true);
        try {
            const overrides = rows.filter(r => r.choice !== 'HERDAR');
            const { error: delErr } = await supabase.from('liquidez_subtipo').delete().eq('consultor_id', consultorId);
            if (delErr) throw delErr;
            if (overrides.length > 0) {
                const payload = overrides.map(r => ({
                    consultor_id: consultorId,
                    sub_tipo: r.sub_tipo,
                    liquidez_dias: r.choice === 'PADRONIZAR' ? Number(r.dias) : null,
                    padronizar: r.choice === 'PADRONIZAR',
                }));
                const { error: insErr } = await supabase.from('liquidez_subtipo').insert(payload);
                if (insErr) throw insErr;
            }
            toast.success('Liquidez por subtipo (consultor) salva.');
            loadData();
        } catch (err: any) {
            console.error(err);
            toast.error(`Falha ao salvar: ${err?.message ?? 'tente novamente.'}`);
        } finally {
            setSalvando(false);
        }
    };

    const refGlobal = (g: Row['global']) =>
        !g ? 'sem padrão global'
            : g.padronizar ? `global: D+${g.dias ?? '—'} padronizado`
                : 'global: desligado';

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(0,131,203,0.06)', border: '1px solid rgba(0,131,203,0.15)', borderRadius: '8px', padding: '12px 14px' }}>
                <Info size={16} color="#0083CB" style={{ marginTop: 1, flexShrink: 0 }} />
                <Typography variant="p" style={{ fontSize: '12px', color: 'var(--color-secundaria)', opacity: 0.85, margin: 0, lineHeight: 1.4 }}>
                    Override da liquidez por subtipo <strong>só para os clientes deste consultor</strong>. <strong>Herdar global</strong> = usa o padrão da Gestão Master;
                    <strong> Padronizar</strong> = força a sua liquidez (D+N); <strong>Desligar</strong> = mantém o vencimento (visão mais longa), mesmo que o global esteja padronizado.
                </Typography>
            </div>

            <Card style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 150px 110px', gap: '12px', padding: '0 4px 8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9CA3AF' }}>
                    <span>Subtipo</span>
                    <span>Referência global</span>
                    <span>Decisão</span>
                    <span>Liquidez (D+)</span>
                </div>

                {rows.length === 0 ? (
                    <p style={{ fontSize: '13px', color: '#9CA3AF', padding: '20px', textAlign: 'center' }}>Nenhum subtipo no sistema ainda.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {rows.map((r, i) => (
                            <div key={r.sub_tipo} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 150px 110px', gap: '12px', alignItems: 'center' }}>
                                <Badge variant="ghost" style={{ fontSize: '12px', justifySelf: 'start', fontFamily: 'monospace' }}>{r.sub_tipo}</Badge>
                                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{refGlobal(r.global)}</span>
                                <button
                                    type="button"
                                    onClick={() => update(i, { choice: proximo[r.choice] })}
                                    style={{
                                        height: '34px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700,
                                        fontFamily: 'Montserrat, sans-serif',
                                        background: r.choice === 'PADRONIZAR' ? 'rgba(16,185,129,0.12)' : r.choice === 'DESLIGAR' ? 'rgba(239,68,68,0.10)' : 'rgba(0,0,0,0.05)',
                                        color: r.choice === 'PADRONIZAR' ? '#047857' : r.choice === 'DESLIGAR' ? '#B91C1C' : '#6B7280',
                                    }}
                                >
                                    {rotulo[r.choice]}
                                </button>
                                {r.choice === 'PADRONIZAR'
                                    ? <TextField value={r.dias} inputMode="numeric" placeholder="D+" onChange={e => update(i, { dias: e.target.value.replace(/[^\d]/g, '') })} />
                                    : <span style={{ fontSize: '12px', color: '#D1D5DB', justifySelf: 'center' }}>—</span>}
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="solid" onClick={handleSave} disabled={salvando}>
                        {salvando ? <Spinner size="sm" /> : 'Salvar'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
