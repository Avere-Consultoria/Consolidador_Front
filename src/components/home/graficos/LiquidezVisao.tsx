import { useMemo, useState } from 'react';
import { Card, CardContent } from 'avere-ui';
import { fmt } from '../../../utils/formatters';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';

type LiquidezItem = { name: string; value: number; pct: number };

interface LiquidezVisaoProps {
    dados: LiquidezItem[];        // Geral (sem Prev e sem RV)
    dadosPrev?: LiquidezItem[];   // Previdência
    dadosRV?: LiquidezItem[];     // Renda Variável (FIIs, Ações, Crypto)
}

// ── Faixas ───────────────────────────────────────────────────────────────────

const FAIXAS = [
    { id: 'imediata',    label: 'Imediata',         desc: 'D+0',             min: 0,   max: 0,        cor: '#10B981' },
    { id: 'curto',       label: 'Curto Prazo',      desc: 'D+1 até D+30',    min: 1,   max: 30,       cor: '#0083CB' },
    { id: 'medio',       label: 'Médio Prazo',      desc: 'D+31 até D+180',  min: 31,  max: 180,      cor: '#06B6D4' },
    { id: 'longo',       label: 'Longo Prazo',      desc: 'D+181 até D+720', min: 181, max: 720,      cor: '#F59E0B' },
    { id: 'muito_longo', label: 'Muito Longo',      desc: 'D+720+',          min: 721, max: Infinity,  cor: '#EF4444' },
    { id: 'nao_class',   label: 'Não Classificada', desc: '—',               min: -1,  max: -1,       cor: '#D1D5DB' },
] as const;

function parseDias(name: string): number {
    if (name === 'Não Classificada') return -1;
    const match = name.match(/D\+(\d+)/);
    return match ? parseInt(match[1], 10) : -1;
}

function useAgregacao(dados: LiquidezItem[]) {
    const total = useMemo(() => dados.reduce((s, d) => s + d.value, 0), [dados]);
    const faixasAgregadas = useMemo(() => {
        const acc: Record<string, number> = {};
        FAIXAS.forEach(f => { acc[f.id] = 0; });
        dados.forEach(d => {
            const dias = parseDias(d.name);
            if (dias === -1) { acc['nao_class'] += d.value; return; }
            const faixa = FAIXAS.find(f => f.min !== -1 && dias >= f.min && dias <= f.max);
            if (faixa) acc[faixa.id] += d.value;
        });
        return FAIXAS.map(f => ({
            ...f,
            value: acc[f.id],
            pct: total > 0 ? (acc[f.id] / total) * 100 : 0,
        })).filter(f => f.value > 0);
    }, [dados, total]);
    return faixasAgregadas;
}

// ── Bloco individual ─────────────────────────────────────────────────────────

function LiquidezBloco({ titulo, dados }: { titulo: string; dados: LiquidezItem[] }) {
    const [modoTabela, setModoTabela] = useState(false);
    const faixasAgregadas = useAgregacao(dados);

    if (!dados || dados.length === 0) return null;

    return (
        <Card style={{ height: '100%' }}>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch
                    titulo={titulo}
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />

                {modoTabela ? (
                    /* ── MODO TABELA ── */
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'Montserrat, sans-serif' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' }}>Faixa</th>
                                <th style={{ textAlign: 'left', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' }}>Prazo</th>
                                <th style={{ textAlign: 'right', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' }}>Valor</th>
                                <th style={{ textAlign: 'right', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' }}>%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faixasAgregadas.map(f => (
                                <tr key={f.id}>
                                    <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontWeight: 600, color: 'var(--color-secundaria)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.cor, flexShrink: 0 }} />
                                            {f.label}
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: '11px', opacity: 0.45 }}>{f.desc}</td>
                                    <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', textAlign: 'right', fontWeight: 700, color: 'var(--color-secundaria)' }}>{fmt(f.value)}</td>
                                    <td style={{ padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', textAlign: 'right', fontWeight: 800, color: f.cor }}>{f.pct.toFixed(1)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <>
                        {/* Barra empilhada */}
                        <div style={{ display: 'flex', height: '10px', borderRadius: '8px', overflow: 'hidden', gap: '2px', marginBottom: '28px' }}>
                            {faixasAgregadas.map(f => (
                                <div key={f.id} title={`${f.label}: ${f.pct.toFixed(1)}%`}
                                    style={{ width: `${f.pct}%`, background: f.cor, borderRadius: '2px', transition: 'width 0.8s ease', minWidth: f.pct > 0 ? '4px' : '0' }}
                                />
                            ))}
                        </div>

                        {/* Faixas */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {faixasAgregadas.map((f, i) => (
                                <div key={f.id} style={{
                                    display: 'grid', gridTemplateColumns: '12px 1fr auto auto',
                                    alignItems: 'center', gap: '12px', padding: '12px 0',
                                    borderBottom: i < faixasAgregadas.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                                }}>
                                    <div style={{ width: '4px', height: '36px', borderRadius: '4px', background: f.cor, flexShrink: 0 }} />
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '5px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-secundaria)' }}>{f.label}</span>
                                            <span style={{ fontSize: '11px', opacity: 0.4, fontWeight: 500 }}>{f.desc}</span>
                                        </div>
                                        <div style={{ height: '4px', width: '100%', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${Math.min(f.pct, 100)}%`, background: f.cor, borderRadius: '4px', opacity: 0.7, transition: 'width 0.8s ease' }} />
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-secundaria)', opacity: 0.7, whiteSpace: 'nowrap' }}>{fmt(f.value)}</span>
                                    <span style={{ fontSize: '14px', fontWeight: 800, color: f.cor, minWidth: '48px', textAlign: 'right' }}>{f.pct.toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </CardContent>
        </Card>
    );
}

// ── Componente principal ──────────────────────────────────────────────────────

export function LiquidezVisao({ dados, dadosPrev, dadosRV }: LiquidezVisaoProps) {
    const temGeral = dados && dados.length > 0;
    const temPrev  = dadosPrev && dadosPrev.length > 0;
    const temRV    = dadosRV && dadosRV.length > 0;

    if (!temGeral && !temPrev && !temRV) return null;

    // Conta quantos blocos existem para definir o grid
    const totalBlocos = [temGeral, temPrev, temRV].filter(Boolean).length;
    const cols = totalBlocos === 1 ? '1fr' : totalBlocos === 2 ? '1fr 1fr' : '1fr 1fr 1fr';

    return (
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '32px', alignItems: 'start' }}>
            {temGeral && <LiquidezBloco titulo="Perfil de Liquidez" dados={dados} />}
            {temPrev  && <LiquidezBloco titulo="Liquidez — Previdência" dados={dadosPrev!} />}
            {temRV    && <LiquidezBloco titulo="Liquidez — Renda Variável" dados={dadosRV!} />}
        </div>
    );
}
