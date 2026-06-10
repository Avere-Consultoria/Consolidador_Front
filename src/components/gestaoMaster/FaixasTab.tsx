import { useState, useEffect } from 'react';
import { Card, Button, Typography, Spinner, TextField, Badge, toast } from 'avere-ui';
import { Plus, Trash2, Clock, CalendarClock, Info } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { isValidHex } from '../../utils/colors';

type Tipo = 'LIQUIDEZ' | 'VENCIMENTO';

interface FaixaRow {
    label: string;
    dias_min: string;   // string para edição livre nos inputs
    dias_max: string;   // '' = aberta (∞)
    cor: string;
}

const DEFAULTS: Record<Tipo, FaixaRow[]> = {
    LIQUIDEZ: [
        { label: 'D+0',       dias_min: '0',   dias_max: '0',   cor: '#10B981' },
        { label: 'D+1–30',    dias_min: '1',   dias_max: '30',  cor: '#0083CB' },
        { label: 'D+31–180',  dias_min: '31',  dias_max: '180', cor: '#06B6D4' },
        { label: 'D+181–720', dias_min: '181', dias_max: '720', cor: '#F59E0B' },
        { label: 'D+720+',    dias_min: '721', dias_max: '',    cor: '#EF4444' },
    ],
    VENCIMENTO: [
        { label: 'Até 30 dias',       dias_min: '0',   dias_max: '30',  cor: '#10B981' },
        { label: '31 a 90 dias',      dias_min: '31',  dias_max: '90',  cor: '#0083CB' },
        { label: '91 a 180 dias',     dias_min: '91',  dias_max: '180', cor: '#06B6D4' },
        { label: '181 a 365 dias',    dias_min: '181', dias_max: '365', cor: '#F59E0B' },
        { label: 'Acima de 365 dias', dias_min: '366', dias_max: '',    cor: '#EF4444' },
    ],
};

const META: Record<Tipo, { titulo: string; icone: typeof Clock; ajuda: string }> = {
    LIQUIDEZ: {
        titulo: 'Perfil de Liquidez',
        icone: Clock,
        ajuda: 'Faixas de prazo de liquidez (em dias D+) usadas no gráfico "Perfil de Liquidez" da Home.',
    },
    VENCIMENTO: {
        titulo: 'Agenda de Vencimentos',
        icone: CalendarClock,
        ajuda: 'Faixas de prazo até o vencimento (em dias) usadas no gráfico "Agenda de Vencimentos" da Home.',
    },
};

export default function FaixasTab() {
    const [tipo, setTipo] = useState<Tipo>('LIQUIDEZ');
    const [rows, setRows] = useState<FaixaRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);

    const loadData = async (t: Tipo) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('faixas_temporais')
            .select('label, dias_min, dias_max, cor')
            .eq('tipo', t)
            .order('dias_min', { ascending: true });

        if (error) {
            console.error('Erro ao carregar faixas:', error);
            toast.error('Falha ao carregar faixas.');
            setRows(DEFAULTS[t]);
        } else if (data && data.length > 0) {
            setRows(data.map((f: any) => ({
                label: f.label ?? '',
                dias_min: String(f.dias_min ?? 0),
                dias_max: f.dias_max == null ? '' : String(f.dias_max),
                cor: f.cor || '#9CA3AF',
            })));
        } else {
            setRows(DEFAULTS[t]);
        }
        setLoading(false);
    };

    useEffect(() => { loadData(tipo); }, [tipo]);

    const update = (i: number, patch: Partial<FaixaRow>) =>
        setRows(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

    const addRow = () => {
        const ult = rows[rows.length - 1];
        const proxMin = ult && ult.dias_max ? String(Number(ult.dias_max) + 1) : '0';
        setRows([...rows, { label: '', dias_min: proxMin, dias_max: '', cor: '#9CA3AF' }]);
    };

    const removeRow = (i: number) => setRows(rows.filter((_, idx) => idx !== i));

    const handleSave = async () => {
        // Validação
        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            if (!r.label.trim()) { toast.error(`Faixa ${i + 1}: informe o rótulo.`); return; }
            if (r.dias_min === '' || isNaN(Number(r.dias_min))) { toast.error(`Faixa "${r.label}": "de" inválido.`); return; }
            if (r.dias_max !== '' && isNaN(Number(r.dias_max))) { toast.error(`Faixa "${r.label}": "até" inválido.`); return; }
            if (r.dias_max !== '' && Number(r.dias_max) < Number(r.dias_min)) {
                toast.error(`Faixa "${r.label}": "até" não pode ser menor que "de".`); return;
            }
            const cor = r.cor.startsWith('#') ? r.cor : `#${r.cor}`;
            if (!isValidHex(cor)) { toast.error(`Faixa "${r.label}": cor inválida.`); return; }
        }
        if (rows.length === 0) { toast.error('Cadastre pelo menos uma faixa.'); return; }

        setSalvando(true);
        try {
            const ordenadas = [...rows].sort((a, b) => Number(a.dias_min) - Number(b.dias_min));
            const payload = ordenadas.map((r, i) => ({
                tipo,
                label: r.label.trim(),
                dias_min: Number(r.dias_min),
                dias_max: r.dias_max === '' ? null : Number(r.dias_max),
                cor: (r.cor.startsWith('#') ? r.cor : `#${r.cor}`).toUpperCase(),
                ordem: i + 1,
            }));

            const { error: delErr } = await supabase.from('faixas_temporais').delete().eq('tipo', tipo);
            if (delErr) throw delErr;
            const { error: insErr } = await supabase.from('faixas_temporais').insert(payload);
            if (insErr) throw insErr;

            toast.success(`Faixas de ${META[tipo].titulo} salvas.`);
            loadData(tipo);
        } catch (err) {
            console.error('Erro ao salvar faixas:', err);
            toast.error('Falha ao salvar faixas no banco de dados.');
        } finally {
            setSalvando(false);
        }
    };

    const Icone = META[tipo].icone;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Seletor de tipo */}
            <div style={{ display: 'flex', gap: '8px' }}>
                {(['LIQUIDEZ', 'VENCIMENTO'] as Tipo[]).map(t => {
                    const I = META[t].icone;
                    return (
                        <Button key={t} variant={tipo === t ? 'solid' : 'ghost'} onClick={() => setTipo(t)}>
                            <I size={16} style={{ marginRight: 8 }} /> {META[t].titulo}
                        </Button>
                    );
                })}
            </div>

            {/* Ajuda contextual */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(0,131,203,0.06)', border: '1px solid rgba(0,131,203,0.15)', borderRadius: '8px', padding: '12px 14px' }}>
                <Info size={16} color="#0083CB" style={{ marginTop: 1, flexShrink: 0 }} />
                <Typography variant="p" style={{ fontSize: '12px', color: 'var(--color-secundaria)', opacity: 0.85, margin: 0, lineHeight: 1.4 }}>
                    {META[tipo].ajuda} Deixe o campo <strong>"até"</strong> vazio para uma faixa aberta (∞).
                </Typography>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}><Spinner size="lg" /></div>
            ) : (
                <Card style={{ padding: '20px', overflow: 'visible' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Icone size={18} color="var(--color-secundaria)" />
                        <Typography variant="p" style={{ fontWeight: 700, fontSize: '14px', margin: 0 }}>{META[tipo].titulo}</Typography>
                        <Badge variant="ghost" style={{ fontSize: '10px' }}>{rows.length} faixas</Badge>
                    </div>

                    {/* Cabeçalho */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 120px 36px', gap: '12px', padding: '0 4px 8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9CA3AF' }}>
                        <span>Rótulo</span>
                        <span>De (dias)</span>
                        <span>Até (dias)</span>
                        <span>Cor</span>
                        <span />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {rows.map((r, i) => {
                            const corValida = isValidHex(r.cor.startsWith('#') ? r.cor : `#${r.cor}`);
                            return (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 120px 36px', gap: '12px', alignItems: 'center' }}>
                                    <TextField value={r.label} placeholder="Ex: Curto prazo" onChange={e => update(i, { label: e.target.value })} />
                                    <TextField value={r.dias_min} inputMode="numeric" onChange={e => update(i, { dias_min: e.target.value.replace(/[^\d-]/g, '') })} />
                                    <TextField value={r.dias_max} inputMode="numeric" placeholder="∞" onChange={e => update(i, { dias_max: e.target.value.replace(/[^\d-]/g, '') })} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="color"
                                            value={corValida ? (r.cor.startsWith('#') ? r.cor : `#${r.cor}`) : '#000000'}
                                            onChange={e => update(i, { cor: e.target.value.toUpperCase() })}
                                            style={{ border: 'none', width: '36px', height: '36px', cursor: 'pointer', background: 'none', padding: 0, flexShrink: 0 }}
                                        />
                                        <TextField value={r.cor} onChange={e => update(i, { cor: e.target.value.toUpperCase() })} />
                                    </div>
                                    <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: rows.length > 1 ? 0.8 : 0.25, justifySelf: 'center' }}
                                        onClick={() => rows.length > 1 && removeRow(i)} />
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button variant="ghost" onClick={addRow}>
                            <Plus size={16} style={{ marginRight: 6 }} /> Adicionar faixa
                        </Button>
                        <Button variant="solid" onClick={handleSave} disabled={salvando}>
                            {salvando ? <Spinner size="sm" /> : 'Salvar Faixas'}
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
