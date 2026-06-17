import { useState, useEffect } from 'react';
import { Card, Button, Typography, Spinner, TextField, Badge, toast } from 'avere-ui';
import { Info } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { FAMILIAS_LIQUIDEZ_FLAT } from '../../constants/familiasLiquidez';

interface Row { sub_tipo: string; dias: string; padronizar: boolean; }

export default function LiquidezSubtipoTab() {
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const { data: cfgData } = await supabase
            .from('liquidez_subtipo')
            .select('sub_tipo, liquidez_dias, padronizar')
            .is('consultor_id', null);
        // Lista FECHADA de famílias (constants/familiasLiquidez) — a tela não
        // deriva mais do que as APIs mandam (poluía com tickers e lixo).
        const cfg = new Map<string, { dias: string; padronizar: boolean }>();
        (cfgData || []).forEach((r: any) => cfg.set(r.sub_tipo, {
            dias: r.liquidez_dias != null ? String(r.liquidez_dias) : '',
            padronizar: !!r.padronizar,
        }));
        setRows(FAMILIAS_LIQUIDEZ_FLAT.map(st => ({
            sub_tipo: st,
            dias: cfg.get(st)?.dias ?? '',
            padronizar: cfg.get(st)?.padronizar ?? false,
        })));
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const update = (i: number, patch: Partial<Row>) =>
        setRows(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

    const handleSave = async () => {
        // padronizar ligado exige D+N
        const semDias = rows.find(r => r.padronizar && (r.dias === '' || isNaN(Number(r.dias))));
        if (semDias) { toast.error(`Defina a liquidez (D+N) para "${semDias.sub_tipo}" antes de padronizar.`); return; }

        setSalvando(true);
        try {
            const validos = rows.filter(r => r.padronizar || (r.dias !== '' && !isNaN(Number(r.dias))));
            const { error: delErr } = await supabase.from('liquidez_subtipo').delete().is('consultor_id', null);
            if (delErr) throw delErr;
            if (validos.length > 0) {
                const payload = validos.map(r => ({
                    consultor_id: null,
                    sub_tipo: r.sub_tipo,
                    liquidez_dias: r.dias === '' ? null : Number(r.dias),
                    padronizar: r.padronizar,
                }));
                const { error: insErr } = await supabase.from('liquidez_subtipo').insert(payload);
                if (insErr) throw insErr;
            }
            toast.success('Liquidez por subtipo salva.');
            loadData();
        } catch (err: any) {
            console.error(err);
            toast.error(`Falha ao salvar: ${err?.message ?? 'tente novamente.'}`);
        } finally {
            setSalvando(false);
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(0,131,203,0.06)', border: '1px solid rgba(0,131,203,0.15)', borderRadius: '8px', padding: '12px 14px' }}>
                <Info size={16} color="#0083CB" style={{ marginTop: 1, flexShrink: 0 }} />
                <Typography variant="p" style={{ fontSize: '12px', color: 'var(--color-secundaria)', opacity: 0.85, margin: 0, lineHeight: 1.4 }}>
                    Liquidez padrão por subtipo (D+N) usada nos gráficos de liquidez. Com <strong>Padronizar</strong> ligado, ativos
                    com vencimento desse subtipo passam a usar essa liquidez; <strong>desligado</strong>, mantêm o comportamento atual
                    (liquidez seguindo o vencimento). O vencimento nunca muda — segue na agenda de vencimentos.
                </Typography>
            </div>

            <Card style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 130px', gap: '12px', padding: '0 4px 8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9CA3AF' }}>
                    <span>Subtipo</span>
                    <span>Liquidez (D+)</span>
                    <span>Padronizar</span>
                </div>

                {rows.length === 0 ? (
                    <p style={{ fontSize: '13px', color: '#9CA3AF', padding: '20px', textAlign: 'center' }}>Nenhum subtipo no sistema ainda. Sincronize posições para popular.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {rows.map((r, i) => (
                            <div key={r.sub_tipo} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 130px', gap: '12px', alignItems: 'center' }}>
                                <Badge variant="ghost" style={{ fontSize: '12px', justifySelf: 'start', fontFamily: 'monospace' }}>{r.sub_tipo}</Badge>
                                <TextField value={r.dias} inputMode="numeric" placeholder="—" onChange={e => update(i, { dias: e.target.value.replace(/[^\d]/g, '') })} />
                                <button
                                    type="button"
                                    onClick={() => update(i, { padronizar: !r.padronizar })}
                                    style={{
                                        height: '34px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700,
                                        fontFamily: 'Montserrat, sans-serif',
                                        background: r.padronizar ? 'rgba(16,185,129,0.12)' : 'rgba(0,0,0,0.05)',
                                        color: r.padronizar ? '#047857' : '#9CA3AF',
                                    }}
                                >
                                    {r.padronizar ? '● Padronizado' : '○ Desligado'}
                                </button>
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
