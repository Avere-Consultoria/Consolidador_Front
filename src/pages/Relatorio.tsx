import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, ShieldAlert, Briefcase, LayoutList, BarChart2 } from 'lucide-react';
import {
    PieChart, Pie, Cell, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
} from 'recharts';

import { useHomeMetrics } from '../hooks/useHomeMetrics';
import { fmt, fmtDate, fmtK } from '../utils/formatters';
import logoAvere from '../assets/A_Azul.svg';

// ── Faixas de Liquidez (igual ao LiquidezVisao) ───────────────────────────────
const FAIXAS_LIQ = [
    { id: 'imediata',    label: 'Imediata',         desc: 'D+0',             min: 0,   max: 0,        cor: '#10B981' },
    { id: 'curto',       label: 'Curto Prazo',      desc: 'D+1 até D+30',    min: 1,   max: 30,       cor: '#0083CB' },
    { id: 'medio',       label: 'Médio Prazo',      desc: 'D+31 até D+180',  min: 31,  max: 180,      cor: '#06B6D4' },
    { id: 'longo',       label: 'Longo Prazo',      desc: 'D+181 até D+720', min: 181, max: 720,      cor: '#F59E0B' },
    { id: 'muito_longo', label: 'Muito Longo',      desc: 'D+720+',          min: 721, max: Infinity, cor: '#EF4444' },
    { id: 'nao_class',   label: 'Não Classificada', desc: '—',               min: -1,  max: -1,       cor: '#D1D5DB' },
] as const;

// ── Faixas de Vencimento (igual ao VencimentosVisao) ─────────────────────────
const FAIXAS_VENC = [
    { id: 'ate30',   label: 'Curto Prazo',  desc: 'Até 30 dias',     min: 0,   max: 30,       cor: '#10B981' },
    { id: 'ate90',   label: 'Médio Prazo',  desc: '31 a 90 dias',    min: 31,  max: 90,       cor: '#0083CB' },
    { id: 'ate180',  label: '6 Meses',      desc: '91 a 180 dias',   min: 91,  max: 180,      cor: '#06B6D4' },
    { id: 'ate365',  label: '1 Ano',        desc: '181 a 365 dias',  min: 181, max: 365,      cor: '#F59E0B' },
    { id: 'mais365', label: 'Longo Prazo',  desc: 'Acima de 1 ano',  min: 366, max: Infinity, cor: '#EF4444' },
] as const;

function parseDias(name: string): number {
    if (name === 'Não Classificada') return -1;
    const match = name.match(/D\+(\d+)/);
    return match ? parseInt(match[1], 10) : -1;
}

// ── Helpers visuais ──────────────────────────────────────────────────────────

const thP: React.CSSProperties = {
    padding: '8px 10px', fontSize: '10px', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF',
    textAlign: 'left', borderBottom: '2px solid #E5E7EB', whiteSpace: 'nowrap',
    fontFamily: 'Montserrat, sans-serif',
};
const tdP: React.CSSProperties = {
    padding: '9px 10px', fontSize: '11px', fontWeight: 500,
    color: '#374151', borderBottom: '1px solid #F3F4F6',
    fontFamily: 'Montserrat, sans-serif',
};
const tdR: React.CSSProperties = { ...tdP, textAlign: 'right' };
const thR: React.CSSProperties = { ...thP, textAlign: 'right' };

function FaixaRow({ label, desc, cor, value, pct, showBar = true }: { label: string; desc: string; cor: string; value: number; pct: number; showBar?: boolean }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: showBar ? '8px 140px 1fr 90px 52px' : '8px 140px 90px 52px', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
            <div style={{ width: 4, height: 28, borderRadius: 4, background: cor }} />
            <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#1F2937' }}>{label}</span>
                <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 6 }}>{desc}</span>
            </div>
            {showBar && (
                <div style={{ height: 4, background: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: cor, borderRadius: 4 }} />
                </div>
            )}
            <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textAlign: 'right' }}>{fmt(value)}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: cor, textAlign: 'right' }}>{pct.toFixed(1)}%</span>
        </div>
    );
}

function BarraEmpilhada({ faixas }: { faixas: { cor: string; pct: number; label: string }[] }) {
    return (
        <div style={{ display: 'flex', height: 8, borderRadius: 6, overflow: 'hidden', gap: 2, marginBottom: 16 }}>
            {faixas.map(f => (
                <div key={f.label} title={`${f.label}: ${f.pct.toFixed(1)}%`}
                    style={{ width: `${f.pct}%`, background: f.cor, borderRadius: 2, minWidth: f.pct > 0 ? 4 : 0 }} />
            ))}
        </div>
    );
}

function Rodape() {
    return (
        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 8, color: '#D1D5DB', maxWidth: '80%', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.5 }}>
                Relatório de uso exclusivo do cliente e do consultor. Informações baseadas nos dados sincronizados com as instituições financeiras. Valores sujeitos a alteração conforme cotações de mercado.
            </p>
            <img src={logoAvere} style={{ height: 16, opacity: 0.2 }} alt="" />
        </div>
    );
}

// ── Componente Principal ──────────────────────────────────────────────────────

export default function Relatorio() {
    const navigate = useNavigate();
    const { selectedClient, loading, metrics } = useHomeMetrics();

    // ── Agregação de Liquidez por faixas ──
    const liquidezAgregada = useMemo(() => {
        const dados = metrics.liquidezData || [];
        const total = dados.reduce((s: number, d: any) => s + d.value, 0);
        const acc: Record<string, number> = {};
        FAIXAS_LIQ.forEach(f => { acc[f.id] = 0; });

        dados.forEach((d: any) => {
            const dias = parseDias(d.name);
            if (dias === -1) { acc['nao_class'] += d.value; return; }
            const faixa = FAIXAS_LIQ.find(f => f.min !== -1 && dias >= f.min && dias <= f.max);
            if (faixa) acc[faixa.id] += d.value;
        });

        return FAIXAS_LIQ.map(f => ({
            ...f, value: acc[f.id],
            pct: total > 0 ? (acc[f.id] / total) * 100 : 0,
        })).filter(f => f.value > 0);
    }, [metrics.liquidezData]);

    // ── Agregação de Vencimentos por faixas ──
    const vencimentosAgregados = useMemo(() => {
        const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
        const ativos = (metrics.todosAtivos || []).filter((a: any) => a.vencimento);
        const total = ativos.reduce((s: number, a: any) => s + (a.valorLiquido || 0), 0);
        const acc: Record<string, number> = {};
        FAIXAS_VENC.forEach(f => { acc[f.id] = 0; });

        ativos.forEach((a: any) => {
            const dataVenc = new Date(a.vencimento); dataVenc.setHours(0, 0, 0, 0);
            const dias = Math.round((dataVenc.getTime() - hoje.getTime()) / 86_400_000);
            if (dias < 0) return;
            const faixa = FAIXAS_VENC.find(f => dias >= f.min && dias <= f.max);
            if (faixa) acc[faixa.id] += (a.valorLiquido || 0);
        });

        return FAIXAS_VENC.map(f => ({
            ...f, value: acc[f.id],
            pct: total > 0 ? (acc[f.id] / total) * 100 : 0,
        })).filter(f => f.value > 0);
    }, [metrics.todosAtivos]);

    // ── Dados auxiliares ──
    const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const cores = metrics.coresInstituicoes;

    const instituicoes = [
        { nome: 'BTG Pactual',      total: metrics.btgTotal,    cor: cores?.btg    || '#0083CB', ref: metrics.dataRefBtg    },
        { nome: 'XP Investimentos', total: metrics.xpTotal,     cor: cores?.xp     || '#FF6B00', ref: metrics.dataRefXp     },
        { nome: 'Avenue',           total: metrics.avenueTotal, cor: cores?.avenue || '#6366F1', ref: metrics.dataRefAvenue },
        { nome: 'Ágora',            total: metrics.agoraTotal,  cor: cores?.agora  || '#10B981', ref: metrics.dataRefAgora  },
    ].filter(i => i.total > 0).map(i => ({
        ...i, pct: metrics.patrimonioTotal > 0 ? (i.total / metrics.patrimonioTotal) * 100 : 0,
    }));

    const pieData = instituicoes.map(i => ({ name: i.nome, value: i.total, fill: i.cor }));
    const riscoDados = [...(metrics.exposicaoRiscoData || [])].sort((a, b) => b.pct - a.pct);
    const comVencimento = [...(metrics.todosAtivos || [])].filter(a => a.vencimento).sort((a, b) => new Date(a.vencimento!).getTime() - new Date(b.vencimento!).getTime());

    // ── Modo do relatório ──
    const [modo, setModo] = useState<'visual' | 'conciso'>('visual');
    const visual = modo === 'visual';

    // ── Guards ──
    if (!selectedClient) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 16, fontFamily: 'Montserrat, sans-serif' }}>
            <p style={{ opacity: 0.5 }}>Nenhum cliente seleccionado.</p>
            <button onClick={() => navigate('/')} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: 8, border: '1px solid #E5E7EB' }}>← Voltar</button>
        </div>
    );

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Montserrat, sans-serif' }}>
            <p style={{ opacity: 0.4 }}>A preparar relatório...</p>
        </div>
    );

    return (
        <>
            {/* ── Estilos globais + print ── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; }
                body { font-family: 'Montserrat', sans-serif; background: #EAECF0; color: #111827; margin: 0; }

                .pagina {
                    width: 210mm;
                    min-height: 297mm;
                    margin: 0 auto 16px auto;
                    padding: 18mm 20mm 16mm 20mm;
                    background: #ffffff;
                    box-shadow: 0 2px 20px rgba(0,0,0,0.10);
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                }

                .no-print { display: flex !important; }

                @media print {
                    @page { size: A4 portrait; margin: 14mm 16mm; }
                    body { background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    .pagina {
                        width: 100%; min-height: unset; height: 100vh;
                        margin: 0; padding: 0;
                        box-shadow: none; border-radius: 0;
                        page-break-after: always;
                        break-after: page;
                    }
                    .pagina:last-child { page-break-after: avoid; break-after: avoid; }
                    .sem-quebra { page-break-inside: avoid; break-inside: avoid; }
                }
            `}</style>

            {/* ── Botões flutuantes ── */}
            <div className="no-print" style={{
                position: 'fixed', top: 24, right: 24, zIndex: 9999,
                gap: '8px', alignItems: 'center',
            }}>
                <button onClick={() => navigate('/')} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
                    borderRadius: 8, border: '1px solid #E5E7EB', background: '#fff',
                    cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif', color: '#374151',
                }}>
                    <ArrowLeft size={14} /> Voltar
                </button>

                {/* Toggle Visual / Conciso */}
                <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 8, padding: 3, gap: 2 }}>
                    <button onClick={() => setModo('visual')} style={{
                        display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px',
                        borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                        fontFamily: 'Montserrat, sans-serif',
                        background: visual ? '#fff' : 'transparent',
                        color: visual ? '#0083CB' : '#6B7280',
                        boxShadow: visual ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.15s ease',
                    }}>
                        <BarChart2 size={13} /> Visual
                    </button>
                    <button onClick={() => setModo('conciso')} style={{
                        display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px',
                        borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                        fontFamily: 'Montserrat, sans-serif',
                        background: !visual ? '#fff' : 'transparent',
                        color: !visual ? '#0083CB' : '#6B7280',
                        boxShadow: !visual ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.15s ease',
                    }}>
                        <LayoutList size={13} /> Conciso
                    </button>
                </div>

                <button onClick={() => window.print()} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px',
                    borderRadius: 8, border: 'none', background: '#0083CB',
                    cursor: 'pointer', fontSize: 13, fontWeight: 700,
                    fontFamily: 'Montserrat, sans-serif', color: '#fff',
                }}>
                    <Printer size={14} /> Imprimir / Salvar PDF
                </button>
            </div>

            {/* ── Wrapper de páginas ── */}
            <div style={{ padding: '80px 0 48px 0' }}>

                {/* ════════════════════════════════════
                    PÁGINA 1 — CAPA
                ════════════════════════════════════ */}
                <div className="pagina" style={{ padding: 0, overflow: 'hidden' }}>

                    {/* Faixa azul lateral esquerda */}
                    <div style={{ display: 'flex', flex: 1 }}>
                        <div style={{ width: 8, background: '#0083CB', flexShrink: 0 }} />

                        <div style={{ flex: 1, padding: '18mm 20mm 16mm 18mm', display: 'flex', flexDirection: 'column' }}>

                            {/* Topo */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
                                <img src={logoAvere} style={{ height: 32 }} alt="Avere" />
                                <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    Confidencial
                                </span>
                            </div>

                            {/* Título */}
                            <div style={{ marginBottom: 40 }}>
                                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#0083CB', fontWeight: 700, marginBottom: 10 }}>
                                    Relatório de Carteira
                                </p>
                                <h1 style={{ fontSize: 42, fontWeight: 800, color: '#111827', lineHeight: 1.1, marginBottom: 8 }}>
                                    {selectedClient.nome}
                                </h1>
                                <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
                                    Gerado em {hoje}
                                </p>
                            </div>

                            {/* Card Patrimônio */}
                            <div style={{
                                background: 'linear-gradient(135deg, #0083CB 0%, #0066A0 100%)',
                                color: '#fff', padding: '20px 28px', borderRadius: 14,
                                marginBottom: 28, display: 'inline-flex', flexDirection: 'column', gap: 6,
                                alignSelf: 'flex-start',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: 0.85 }}>
                                    <Briefcase size={13} />
                                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        Patrimônio Total
                                    </span>
                                </div>
                                <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>
                                    {fmt(metrics.patrimonioTotal)}
                                </span>
                                <span style={{ fontSize: 11, opacity: 0.7 }}>
                                    {metrics.todosAtivos?.length || 0} ativos consolidados
                                </span>
                            </div>

                            {/* Cards de instituições */}
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${instituicoes.length}, 1fr)`, gap: 10, marginBottom: 32 }}>
                                {instituicoes.map(inst => (
                                    <div key={inst.nome} style={{
                                        padding: '14px 16px', borderRadius: 10,
                                        border: `1px solid ${inst.cor}25`,
                                        background: `${inst.cor}08`,
                                    }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: inst.cor, marginBottom: 8 }} />
                                        <p style={{ fontSize: 10, fontWeight: 700, color: '#6B7280', marginBottom: 4, lineHeight: 1.3 }}>{inst.nome}</p>
                                        <p style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 2 }}>{fmt(inst.total)}</p>
                                        <p style={{ fontSize: 11, fontWeight: 700, color: inst.cor }}>{inst.pct.toFixed(1)}%</p>
                                        {inst.ref && (
                                            <p style={{ fontSize: 9, color: '#9CA3AF', marginTop: 4 }}>Ref. {fmtDate(inst.ref + 'T12:00:00Z')}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <Rodape />
                        </div>
                    </div>
                </div>

                {/* ════════════════════════════════════
                    PÁGINA 2 — COMPOSIÇÃO + ALOCAÇÃO
                ════════════════════════════════════ */}
                <div className="pagina">

                    {/* Header da página */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid #0083CB' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0083CB' }}>
                            Composição da Carteira
                        </span>
                        <img src={logoAvere} style={{ height: 16, opacity: 0.3 }} alt="" />
                    </div>

                    {/* Composição por Instituição */}
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: 16 }}>
                        Distribuição por Instituição
                    </p>
                    <div className="sem-quebra" style={{ display: 'grid', gridTemplateColumns: visual ? '220px 1fr' : '1fr', gap: 28, alignItems: 'center', marginBottom: 32 }}>
                        {visual && (
                            <PieChart width={220} height={180}>
                                <Pie data={pieData} cx={105} cy={85} innerRadius={52} outerRadius={80}
                                    paddingAngle={3} dataKey="value" isAnimationActive={false}>
                                    {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} stroke="none" />)}
                                </Pie>
                                <Legend iconType="circle" iconSize={8}
                                    formatter={(value) => (
                                        <span style={{ fontSize: 10, fontWeight: 600, color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>{value}</span>
                                    )}
                                />
                            </PieChart>
                        )}

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={thP}>Instituição</th>
                                    <th style={thR}>Valor</th>
                                    <th style={thR}>%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instituicoes.map(inst => (
                                    <tr key={inst.nome}>
                                        <td style={tdP}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ width: 7, height: 7, borderRadius: '50%', background: inst.cor }} />
                                                {inst.nome}
                                            </div>
                                        </td>
                                        <td style={{ ...tdR, fontWeight: 700 }}>{fmt(inst.total)}</td>
                                        <td style={{ ...tdR, fontWeight: 700, color: inst.cor }}>{inst.pct.toFixed(1)}%</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td style={{ ...tdP, fontWeight: 700, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>Total</td>
                                    <td style={{ ...tdR, fontWeight: 800, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>{fmt(metrics.patrimonioTotal)}</td>
                                    <td style={{ ...tdR, fontWeight: 800, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>100%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Alocação por Classe */}
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: 16 }}>
                        Alocação por Classe de Ativo
                    </p>
                    <div className="sem-quebra" style={{ display: 'grid', gridTemplateColumns: visual ? '240px 1fr' : '1fr', gap: 28, alignItems: 'center', marginBottom: 24 }}>
                        {visual && (
                            <BarChart
                                width={240} height={Math.max(150, metrics.alocacaoData.length * 26)}
                                data={metrics.alocacaoData} layout="vertical"
                                margin={{ top: 0, right: 48, left: 0, bottom: 0 }} barSize={9}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" width={88}
                                    tick={{ fontSize: 10, fontFamily: 'Montserrat, sans-serif', fill: '#6B7280' }}
                                    axisLine={false} tickLine={false}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                                    {metrics.alocacaoData.map((entry: any, i: number) => <Cell key={i} fill={entry.fill} />)}
                                    <LabelList dataKey="value" position="right" formatter={(v: any) => fmtK(Number(v))}
                                        style={{ fontSize: 9, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fill: '#6B7280' }}
                                    />
                                </Bar>
                            </BarChart>
                        )}

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={thP}>Classe</th>
                                    <th style={thR}>Valor</th>
                                    <th style={thR}>%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.alocacaoData.map((d: any) => (
                                    <tr key={d.name}>
                                        <td style={tdP}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ width: 7, height: 7, borderRadius: 2, background: d.fill }} />
                                                {d.name}
                                            </div>
                                        </td>
                                        <td style={{ ...tdR, fontWeight: 700 }}>{fmt(d.value)}</td>
                                        <td style={{ ...tdR, color: d.fill, fontWeight: 700 }}>{d.pct.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Rodape />
                </div>

                {/* ════════════════════════════════════
                    PÁGINA 3 — LIQUIDEZ + RISCO EMISSOR
                ════════════════════════════════════ */}
                <div className="pagina">

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid #0083CB' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0083CB' }}>
                            Análise de Risco
                        </span>
                        <img src={logoAvere} style={{ height: 16, opacity: 0.3 }} alt="" />
                    </div>

                    {/* Perfil de Liquidez */}
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: 14 }}>
                        Perfil de Liquidez
                    </p>
                    <div className="sem-quebra" style={{ marginBottom: 28 }}>
                        {visual && <BarraEmpilhada faixas={liquidezAgregada} />}
                        {liquidezAgregada.map(f => (
                            <FaixaRow key={f.id} label={f.label} desc={f.desc} cor={f.cor} value={f.value} pct={f.pct} showBar={visual} />
                        ))}
                    </div>

                    {/* Agenda de Vencimentos — faixas */}
                    {vencimentosAgregados.length > 0 && (
                        <>
                            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: 14, marginTop: 24 }}>
                                Agenda de Vencimentos
                            </p>
                            <div className="sem-quebra" style={{ marginBottom: 28 }}>
                                {visual && <BarraEmpilhada faixas={vencimentosAgregados} />}
                                {vencimentosAgregados.map(f => (
                                    <FaixaRow key={f.id} label={f.label} desc={f.desc} cor={f.cor} value={f.value} pct={f.pct} showBar={visual} />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Exposição por Emissor */}
                    {riscoDados.length > 0 && (
                        <>
                            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: 14, marginTop: 24 }}>
                                Exposição por Emissor
                            </p>
                            <div className="sem-quebra">
                                {riscoDados.some(d => d.pct > 15) && (
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 12px', borderRadius: 8, marginBottom: 12, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', color: '#B45309' }}>
                                        <ShieldAlert size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                                        <span style={{ fontSize: 10, fontFamily: 'Montserrat, sans-serif' }}>
                                            <strong>Atenção:</strong> Concentração superior a 15% num único emissor.
                                        </span>
                                    </div>
                                )}
                                {riscoDados.slice(0, 8).map((emissor, i) => {
                                    const cor = emissor.pct > 25 ? '#EF4444' : emissor.pct > 15 ? '#F59E0B' : '#10B981';
                                    return (
                                        <div key={i} style={{ display: 'grid', gridTemplateColumns: visual ? '8px 160px 1fr 80px 52px' : '8px 160px 80px 52px', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                            <div style={{ width: 4, height: 28, borderRadius: 4, background: cor }} />
                                            <div>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: '#1F2937' }}>{emissor.name}</span>
                                                {emissor.setor && <span style={{ fontSize: 9, color: '#9CA3AF', marginLeft: 6 }}>{emissor.setor}</span>}
                                            </div>
                                            {visual && (
                                                <div style={{ height: 4, background: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min(emissor.pct, 100)}%`, background: cor, borderRadius: 4 }} />
                                                </div>
                                            )}
                                            <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textAlign: 'right' }}>{fmt(emissor.value)}</span>
                                            <span style={{ fontSize: 12, fontWeight: 800, color: cor, textAlign: 'right' }}>{emissor.pct.toFixed(1)}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    <Rodape />
                </div>

                {/* ════════════════════════════════════
                    PÁGINA 4 — VENCIMENTOS (tabela) + CARTEIRA COMPLETA
                ════════════════════════════════════ */}
                {comVencimento.length > 0 && (
                    <div className="pagina">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid #0083CB' }}>
                            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0083CB' }}>
                                Vencimentos Detalhados
                            </span>
                            <img src={logoAvere} style={{ height: 16, opacity: 0.3 }} alt="" />
                        </div>

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#F9FAFB' }}>
                                    <th style={{ ...thP, width: '35%' }}>Ativo</th>
                                    <th style={thP}>Instituição</th>
                                    <th style={thP}>Classe</th>
                                    <th style={thR}>Vencimento</th>
                                    <th style={thR}>Valor Líquido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comVencimento.slice(0, 20).map((a, i) => (
                                    <tr key={i} className="sem-quebra">
                                        <td style={{ ...tdP, fontWeight: 600, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.nome}</td>
                                        <td style={tdP}>{a.instituicao}</td>
                                        <td style={tdP}><span style={{ fontSize: 9, background: '#F3F4F6', padding: '2px 5px', borderRadius: 4 }}>{a.tipo}</span></td>
                                        <td style={{ ...tdR, fontWeight: 700 }}>{fmtDate(a.vencimento)}</td>
                                        <td style={{ ...tdR, fontWeight: 700 }}>{fmt(a.valorLiquido)}</td>
                                    </tr>
                                ))}
                                {comVencimento.length > 20 && (
                                    <tr>
                                        <td colSpan={5} style={{ ...tdP, opacity: 0.4, textAlign: 'center', fontSize: 10 }}>
                                            + {comVencimento.length - 20} ativos adicionais na carteira completa
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <Rodape />
                    </div>
                )}

                {/* ════════════════════════════════════
                    PÁGINA FINAL — CARTEIRA COMPLETA
                ════════════════════════════════════ */}
                <div className="pagina">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid #0083CB' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0083CB' }}>
                            Carteira Completa de Ativos
                        </span>
                        <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'Montserrat, sans-serif' }}>
                            {metrics.todosAtivos?.length || 0} ativos · {fmt(metrics.patrimonioTotal)}
                        </span>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB' }}>
                                <th style={{ ...thP, width: '32%' }}>Ativo</th>
                                <th style={thP}>Instituição</th>
                                <th style={thP}>Classe</th>
                                <th style={thR}>Vencimento</th>
                                <th style={thR}>Valor Líquido</th>
                                <th style={thR}>Peso %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.todosAtivos.map((a: any, i: number) => {
                                const peso = metrics.patrimonioTotal > 0 ? (a.valorLiquido / metrics.patrimonioTotal) * 100 : 0;
                                return (
                                    <tr key={i} className="sem-quebra">
                                        <td style={{ ...tdP, fontWeight: 600, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {a.nome}
                                            {a.subTipo && <span style={{ display: 'block', fontSize: 9, fontWeight: 400, color: '#9CA3AF' }}>{a.subTipo}</span>}
                                        </td>
                                        <td style={tdP}>{a.instituicao}</td>
                                        <td style={tdP}><span style={{ fontSize: 9, background: '#F3F4F6', padding: '2px 5px', borderRadius: 4 }}>{a.tipo}</span></td>
                                        <td style={{ ...tdR, fontSize: 10 }}>{fmtDate(a.vencimento)}</td>
                                        <td style={{ ...tdR, fontWeight: 700 }}>{fmt(a.valorLiquido)}</td>
                                        <td style={{ ...tdR, fontWeight: 700, opacity: 0.6 }}>{peso.toFixed(2)}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr style={{ background: '#F9FAFB' }}>
                                <td colSpan={4} style={{ ...tdP, fontWeight: 700, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>Total Consolidado</td>
                                <td style={{ ...tdR, fontWeight: 800, fontSize: 13, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>{fmt(metrics.patrimonioTotal)}</td>
                                <td style={{ ...tdR, fontWeight: 800, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>100%</td>
                            </tr>
                        </tfoot>
                    </table>

                    <Rodape />
                </div>

            </div>
        </>
    );
}
