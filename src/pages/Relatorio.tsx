import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, ShieldAlert, Briefcase, LayoutList, BarChart2 } from 'lucide-react';
import {
    PieChart, Pie, Cell, Legend, Label,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, ReferenceLine,
} from 'recharts';

import { useHomeMetrics } from '../hooks/useHomeMetrics';
import { useFaixas } from '../hooks/useFaixas';
import {
    agregarLiquidez, agregarVencimentos,
    FAIXAS_LIQUIDEZ_DEFAULT, FAIXAS_VENC_DEFAULT, type FaixaAgregada,
} from '../utils/faixas';
import { fmt, fmtDate, fmtK } from '../utils/formatters';
import logoAvere from '../assets/A_Azul.svg';

// ── FGC / porte (espelha o CreditoBancarioFGC da Home) ────────────────────────
const TETO_FGC = 250_000;
const PORTE_COR: Record<string, string> = { S1: '#15803D', S2: '#22C55E', S3: '#0083CB', S4: '#F59E0B', S5: '#EF4444' };
const corPorte = (p: string | null) => (p && PORTE_COR[p] ? PORTE_COR[p] : '#9CA3AF');
const corPorPct = (pct: number) => (pct > 25 ? '#EF4444' : pct > 15 ? '#F59E0B' : '#10B981');
const PALETA_SETOR = ['#0083CB', '#00B4D8', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444', '#F97316', '#6366F1', '#84CC16'];

// ── Estilos de tabela ─────────────────────────────────────────────────────────
const thP: React.CSSProperties = { padding: '8px 10px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', textAlign: 'left', borderBottom: '2px solid #E5E7EB', whiteSpace: 'nowrap', fontFamily: 'Montserrat, sans-serif' };
const tdP: React.CSSProperties = { padding: '9px 10px', fontSize: '11px', fontWeight: 500, color: '#374151', borderBottom: '1px solid #F3F4F6', fontFamily: 'Montserrat, sans-serif' };
const tdR: React.CSSProperties = { ...tdP, textAlign: 'right' };
const thR: React.CSSProperties = { ...thP, textAlign: 'right' };

function PageHeader({ titulo }: { titulo: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid #0083CB' }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0083CB' }}>{titulo}</span>
            <img src={logoAvere} style={{ height: 16, opacity: 0.3 }} alt="" />
        </div>
    );
}
function SecaoTitulo({ children, mt = 0 }: { children: React.ReactNode; mt?: number }) {
    return <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: 14, marginTop: mt }}>{children}</p>;
}

// ── Gráficos (replicam os tipos da Home; tamanho fixo p/ impressão) ───────────

// Donut (composição por instituição) — com o total no centro, igual ao ResumoCards.
function DonutInstituicoes({ data, total }: { data: { name: string; value: number; fill: string }[]; total: number }) {
    return (
        <PieChart width={230} height={200}>
            <Pie data={data} cx={115} cy={95} innerRadius={58} outerRadius={86} paddingAngle={3} dataKey="value" isAnimationActive={false}>
                {data.map((e, i) => <Cell key={i} fill={e.fill} stroke="none" />)}
                <Label content={({ viewBox }: any) => {
                    const { cx, cy } = viewBox;
                    const v = fmt(total);
                    const fs = v.length <= 10 ? 16 : v.length <= 13 ? 14 : 12;
                    return (
                        <g>
                            <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: '#9CA3AF', letterSpacing: '0.05em' }}>TOTAL</text>
                            <text x={cx} y={cy + 11} textAnchor="middle" style={{ fontSize: fs, fontWeight: 800, fill: '#1F2937' }}>{v}</text>
                        </g>
                    );
                }} />
            </Pie>
        </PieChart>
    );
}

// Donut setorial — igual ao DistribuicaoSetorial.
function DonutSetor({ data }: { data: { setor: string; value: number; fill: string }[] }) {
    return (
        <PieChart width={230} height={200}>
            <Pie data={data} cx={115} cy={95} innerRadius={56} outerRadius={86} paddingAngle={2} dataKey="value" isAnimationActive={false}>
                {data.map((e, i) => <Cell key={i} fill={e.fill} stroke="none" />)}
            </Pie>
        </PieChart>
    );
}

// Barras verticais de % por faixa — igual ao BarChartLiquidez (liquidez/vencimentos).
function BarrasFaixa({ faixas, width = 300, height = 200 }: { faixas: FaixaAgregada[]; width?: number; height?: number }) {
    return (
        <BarChart width={width} height={height} data={faixas} margin={{ top: 24, right: 12, left: -8, bottom: 8 }} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 9, fontWeight: 600, fill: '#6B7280', fontFamily: 'Montserrat, sans-serif' }} axisLine={false} tickLine={false} interval={0} height={28} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Montserrat, sans-serif' }} axisLine={false} tickLine={false} width={38} />
            <Bar dataKey="pct" radius={[6, 6, 0, 0]} isAnimationActive={false}>
                {faixas.map((e, i) => <Cell key={i} fill={e.cor} />)}
                <LabelList dataKey="pct" position="top" formatter={(v: any) => `${Number(v).toFixed(1)}%`} style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fill: '#374151' }} />
            </Bar>
        </BarChart>
    );
}

// Barras horizontais por valor — igual ao CreditoBancarioFGC / RiscoEmissor.
function BarrasHorizontais({ dados, teto = false, width = 620 }: { dados: { name: string; value: number; fill: string }[]; teto?: boolean; width?: number }) {
    const height = Math.max(160, dados.length * 34 + 44);
    return (
        <BarChart width={width} height={height} data={dados} layout="vertical" margin={{ top: teto ? 26 : 8, right: 70, left: 8, bottom: 8 }}>
            <CartesianGrid horizontal={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 9, fontFamily: 'Montserrat, sans-serif', fill: '#9CA3AF' }} />
            <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 9, fontFamily: 'Montserrat, sans-serif', fill: '#374151' }} tickFormatter={(v: string) => (v.length > 24 ? v.slice(0, 24) + '…' : v)} />
            {teto && <ReferenceLine x={TETO_FGC} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Teto FGC R$ 250k', position: 'top', fontSize: 8, fontWeight: 700, fill: '#EF4444' }} />}
            <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                {dados.map((e, i) => <Cell key={i} fill={e.fill} />)}
                <LabelList dataKey="value" position="right" formatter={(v: any) => fmtK(Number(v))} style={{ fontSize: 9, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fill: '#6B7280' }} />
            </Bar>
        </BarChart>
    );
}

// Tabela de faixas (liquidez / vencimentos).
function TabelaFaixas({ faixas }: { faixas: FaixaAgregada[] }) {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th style={thP}>Prazo</th><th style={thR}>Valor</th><th style={thR}>%</th></tr></thead>
            <tbody>
                {faixas.map((f, i) => (
                    <tr key={i}>
                        <td style={tdP}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: f.cor, flexShrink: 0 }} />{f.label}</div></td>
                        <td style={{ ...tdR, fontWeight: 700 }}>{fmt(f.value)}</td>
                        <td style={{ ...tdR, fontWeight: 800, color: f.cor }}>{f.pct.toFixed(1)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// Bloco de liquidez (Geral / Prev / RV): gráfico de barras + tabela, como na Home.
function BlocoLiquidez({ titulo, faixas, visual }: { titulo: string; faixas: FaixaAgregada[]; visual: boolean }) {
    if (faixas.length === 0) return null;
    return (
        <div className="sem-quebra" style={{ marginBottom: 24 }}>
            <SecaoTitulo>{titulo}</SecaoTitulo>
            <div style={{ display: 'grid', gridTemplateColumns: visual ? '300px 1fr' : '1fr', gap: 24, alignItems: 'center' }}>
                {visual && <BarrasFaixa faixas={faixas} />}
                <TabelaFaixas faixas={faixas} />
            </div>
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

    const faixasLiq = useFaixas('LIQUIDEZ', FAIXAS_LIQUIDEZ_DEFAULT);
    const faixasVenc = useFaixas('VENCIMENTO', FAIXAS_VENC_DEFAULT);

    const pTotal = metrics.patrimonioTotal;
    const liqGeral = useMemo(() => agregarLiquidez(metrics.liquidezData || [], faixasLiq, pTotal), [metrics.liquidezData, faixasLiq, pTotal]);
    const liqPrev = useMemo(() => agregarLiquidez(metrics.liquidezDataPrev || [], faixasLiq, pTotal), [metrics.liquidezDataPrev, faixasLiq, pTotal]);
    const liqRV = useMemo(() => agregarLiquidez(metrics.liquidezDataRV || [], faixasLiq, pTotal), [metrics.liquidezDataRV, faixasLiq, pTotal]);
    const vencFaixas = useMemo(() => agregarVencimentos(metrics.todosAtivos || [], faixasVenc, pTotal), [metrics.todosAtivos, faixasVenc, pTotal]);

    const instituicoes = ((metrics.fontesData || []) as any[]).filter(i => i.total > 0).map(i => ({ nome: i.nome, total: i.total, cor: i.cor, ref: i.ref, pct: i.pct }));
    const pieData = instituicoes.map(i => ({ name: i.nome, value: i.total, fill: i.cor }));
    const alocacao = metrics.alocacaoData || [];
    const creditoBancario = [...((metrics.creditoBancarioData || []) as any[])].sort((a, b) => b.value - a.value);
    const creditoPrivado = [...((metrics.creditoPrivadoData || []) as any[])].sort((a, b) => b.value - a.value);
    const setorial = ((metrics.setorialData || []) as any[]).map((s, i) => ({ ...s, fill: s.cor ?? PALETA_SETOR[i % PALETA_SETOR.length] }));
    const acimaTeto = creditoBancario.filter(d => !d.semConglomerado && d.value > TETO_FGC);
    const comVencimento = [...((metrics.todosAtivos || []) as any[])].filter(a => a.vencimento).sort((a, b) => new Date(a.vencimento!).getTime() - new Date(b.vencimento!).getTime());

    // Dados prontos p/ as barras horizontais (top N + cor).
    const fgcBarras = creditoBancario.slice(0, 10).map(d => ({ name: d.name, value: d.value, fill: d.semConglomerado ? '#D1D5DB' : corPorte(d.porte) }));
    const emissorBarras = creditoPrivado.slice(0, 8).map(d => ({ name: d.name, value: d.value, fill: corPorPct(d.pct) }));

    const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const [modo, setModo] = useState<'visual' | 'conciso'>('visual');
    const visual = modo === 'visual';

    if (!selectedClient) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 16, fontFamily: 'Montserrat, sans-serif' }}>
            <p style={{ opacity: 0.5 }}>Nenhum cliente selecionado.</p>
            <button onClick={() => navigate('/')} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: 8, border: '1px solid #E5E7EB' }}>← Voltar</button>
        </div>
    );
    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Montserrat, sans-serif' }}>
            <p style={{ opacity: 0.4 }}>Preparando relatório...</p>
        </div>
    );

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; }
                body { font-family: 'Montserrat', sans-serif; background: #EAECF0; color: #111827; margin: 0; }
                .pagina { width: 210mm; min-height: 297mm; margin: 0 auto 16px auto; padding: 18mm 20mm 16mm 20mm; background: #fff; box-shadow: 0 2px 20px rgba(0,0,0,0.10); border-radius: 4px; display: flex; flex-direction: column; }
                .no-print { display: flex !important; }
                @media print {
                    @page { size: A4 portrait; margin: 12mm 14mm; }
                    html, body, #root { height: auto !important; min-height: 0 !important; overflow: visible !important; background: #fff; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    .relatorio-root { padding: 0 !important; }
                    .pagina {
                        width: 100% !important; min-height: 270mm !important; height: auto !important;
                        margin: 0 !important; padding: 0 !important;
                        box-shadow: none !important; border-radius: 0 !important;
                        display: flex !important; flex-direction: column !important;
                        page-break-after: always; break-after: page;
                    }
                    .pagina:last-child { page-break-after: auto; break-after: auto; }
                    .sem-quebra { page-break-inside: avoid; break-inside: avoid; }
                    table { break-inside: auto; }
                    tr { break-inside: avoid; }
                    svg { break-inside: avoid; }
                }
            `}</style>

            <div className="no-print" style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, gap: '8px', alignItems: 'center' }}>
                <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid #E5E7EB', background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Montserrat, sans-serif', color: '#374151' }}>
                    <ArrowLeft size={14} /> Voltar
                </button>
                <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 8, padding: 3, gap: 2 }}>
                    <button onClick={() => setModo('visual')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'Montserrat, sans-serif', background: visual ? '#fff' : 'transparent', color: visual ? '#0083CB' : '#6B7280', boxShadow: visual ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                        <BarChart2 size={13} /> Visual
                    </button>
                    <button onClick={() => setModo('conciso')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'Montserrat, sans-serif', background: !visual ? '#fff' : 'transparent', color: !visual ? '#0083CB' : '#6B7280', boxShadow: !visual ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                        <LayoutList size={13} /> Conciso
                    </button>
                </div>
                <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0083CB', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', color: '#fff' }}>
                    <Printer size={14} /> Imprimir / Salvar PDF
                </button>
            </div>

            <div className="relatorio-root" style={{ padding: '80px 0 48px 0' }}>

                {/* ════ CAPA ════ */}
                <div className="pagina" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <div style={{ width: 8, background: '#0083CB', flexShrink: 0 }} />
                        <div style={{ flex: 1, padding: '18mm 20mm 16mm 18mm', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
                                <img src={logoAvere} style={{ height: 32 }} alt="Avere" />
                                <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Confidencial</span>
                            </div>
                            <div style={{ marginBottom: 40 }}>
                                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#0083CB', fontWeight: 700, marginBottom: 10 }}>Relatório de Carteira</p>
                                <h1 style={{ fontSize: 42, fontWeight: 800, color: '#111827', lineHeight: 1.1, marginBottom: 8 }}>{selectedClient.nome}</h1>
                                <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>Gerado em {hoje}</p>
                            </div>
                            <div style={{ background: 'linear-gradient(135deg, #0083CB 0%, #0066A0 100%)', color: '#fff', padding: '20px 28px', borderRadius: 14, marginBottom: 28, display: 'inline-flex', flexDirection: 'column', gap: 6, alignSelf: 'flex-start' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: 0.85 }}>
                                    <Briefcase size={13} />
                                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Patrimônio Total</span>
                                </div>
                                <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>{fmt(pTotal)}</span>
                                <span style={{ fontSize: 11, opacity: 0.7 }}>{metrics.todosAtivos?.length || 0} ativos consolidados</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(instituicoes.length, 1)}, 1fr)`, gap: 10, marginBottom: 32 }}>
                                {instituicoes.map(inst => (
                                    <div key={inst.nome} style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${inst.cor}25`, background: `${inst.cor}08` }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: inst.cor, marginBottom: 8 }} />
                                        <p style={{ fontSize: 10, fontWeight: 700, color: '#6B7280', marginBottom: 4, lineHeight: 1.3 }}>{inst.nome}</p>
                                        <p style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 2 }}>{fmt(inst.total)}</p>
                                        <p style={{ fontSize: 11, fontWeight: 700, color: inst.cor }}>{inst.pct.toFixed(1)}%</p>
                                        {inst.ref && <p style={{ fontSize: 9, color: '#9CA3AF', marginTop: 4 }}>Ref. {fmtDate(inst.ref + 'T12:00:00Z')}</p>}
                                    </div>
                                ))}
                            </div>
                            <Rodape />
                        </div>
                    </div>
                </div>

                {/* ════ COMPOSIÇÃO + ALOCAÇÃO ════ */}
                <div className="pagina">
                    <PageHeader titulo="Composição da Carteira" />

                    <SecaoTitulo>Distribuição por Instituição</SecaoTitulo>
                    <div className="sem-quebra" style={{ display: 'grid', gridTemplateColumns: visual ? '230px 1fr' : '1fr', gap: 28, alignItems: 'center', marginBottom: 32 }}>
                        {visual && <DonutInstituicoes data={pieData} total={pTotal} />}
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead><tr><th style={thP}>Instituição</th><th style={thR}>Valor</th><th style={thR}>%</th></tr></thead>
                            <tbody>
                                {instituicoes.map(inst => (
                                    <tr key={inst.nome}>
                                        <td style={tdP}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 7, height: 7, borderRadius: '50%', background: inst.cor }} />{inst.nome}</div></td>
                                        <td style={{ ...tdR, fontWeight: 700 }}>{fmt(inst.total)}</td>
                                        <td style={{ ...tdR, fontWeight: 700, color: inst.cor }}>{inst.pct.toFixed(1)}%</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td style={{ ...tdP, fontWeight: 700, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>Total</td>
                                    <td style={{ ...tdR, fontWeight: 800, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>{fmt(pTotal)}</td>
                                    <td style={{ ...tdR, fontWeight: 800, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>100%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <SecaoTitulo>Alocação por Classe de Ativo</SecaoTitulo>
                    <div className="sem-quebra" style={{ display: 'grid', gridTemplateColumns: visual ? '260px 1fr' : '1fr', gap: 28, alignItems: 'center' }}>
                        {visual && (
                            <BarChart width={260} height={Math.max(150, alocacao.length * 28)} data={alocacao} layout="vertical" margin={{ top: 0, right: 52, left: 0, bottom: 0 }} barSize={11}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" width={92} tick={{ fontSize: 9, fontFamily: 'Montserrat, sans-serif', fill: '#6B7280' }} axisLine={false} tickLine={false} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                                    {alocacao.map((e: any, i: number) => <Cell key={i} fill={e.fill} />)}
                                    <LabelList dataKey="value" position="right" formatter={(v: any) => fmtK(Number(v))} style={{ fontSize: 9, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fill: '#6B7280' }} />
                                </Bar>
                            </BarChart>
                        )}
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead><tr><th style={thP}>Classe</th><th style={thR}>Valor</th><th style={thR}>%</th></tr></thead>
                            <tbody>
                                {alocacao.map((d: any) => (
                                    <tr key={d.name}>
                                        <td style={tdP}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 7, height: 7, borderRadius: 2, background: d.fill }} />{d.name}</div></td>
                                        <td style={{ ...tdR, fontWeight: 700 }}>{fmt(d.value)}</td>
                                        <td style={{ ...tdR, color: d.fill, fontWeight: 700 }}>{d.pct.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Rodape />
                </div>

                {/* ════ LIQUIDEZ ════ */}
                <div className="pagina">
                    <PageHeader titulo="Perfil de Liquidez" />
                    <BlocoLiquidez titulo="Liquidez Geral" faixas={liqGeral} visual={visual} />
                    <BlocoLiquidez titulo="Liquidez · Previdência" faixas={liqPrev} visual={visual} />
                    <BlocoLiquidez titulo="Liquidez · Renda Variável" faixas={liqRV} visual={visual} />
                    {liqGeral.length === 0 && liqPrev.length === 0 && liqRV.length === 0 && (
                        <p style={{ fontSize: 12, color: '#9CA3AF', fontFamily: 'Montserrat, sans-serif' }}>Sem dados de liquidez.</p>
                    )}
                    <Rodape />
                </div>

                {/* ════ CRÉDITO BANCÁRIO/FGC + RISCO EMISSOR ════ */}
                {(creditoBancario.length > 0 || creditoPrivado.length > 0) && (
                    <div className="pagina">
                        <PageHeader titulo="Análise de Risco" />

                        {creditoBancario.length > 0 && (
                            <div className="sem-quebra" style={{ marginBottom: 28 }}>
                                <SecaoTitulo>Crédito Bancário · Cobertura FGC</SecaoTitulo>
                                {acimaTeto.length > 0 && (
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 12px', borderRadius: 8, marginBottom: 12, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#B91C1C' }}>
                                        <ShieldAlert size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                                        <span style={{ fontSize: 10, fontFamily: 'Montserrat, sans-serif' }}><strong>{acimaTeto.length}</strong> conglomerado(s) acima do teto FGC ({fmt(TETO_FGC)} por CPF).</span>
                                    </div>
                                )}
                                {visual && <BarrasHorizontais dados={fgcBarras} teto />}
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: visual ? 8 : 0 }}>
                                    <thead><tr><th style={thP}>Conglomerado</th><th style={{ ...thP, textAlign: 'center' }}>Porte</th><th style={thR}>Exposição</th><th style={{ ...thP, textAlign: 'center' }}>FGC</th></tr></thead>
                                    <tbody>
                                        {creditoBancario.slice(0, 10).map((d, i) => {
                                            const acima = !d.semConglomerado && d.value > TETO_FGC;
                                            const cor = d.semConglomerado ? '#9CA3AF' : corPorte(d.porte);
                                            return (
                                                <tr key={i}>
                                                    <td style={tdP}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: cor, flexShrink: 0 }} />{d.name}</div></td>
                                                    <td style={{ ...tdP, textAlign: 'center', fontWeight: 800, color: cor }}>{d.porte || '—'}</td>
                                                    <td style={{ ...tdR, fontWeight: 700 }}>{fmt(d.value)}</td>
                                                    <td style={{ ...tdP, textAlign: 'center', fontSize: 9, fontWeight: 700, color: d.semConglomerado ? '#9CA3AF' : acima ? '#EF4444' : '#10B981' }}>{d.semConglomerado ? 'n/d' : acima ? 'acima' : 'coberto'}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {creditoPrivado.length > 0 && (
                            <div className="sem-quebra">
                                <SecaoTitulo mt={4}>Exposição por Emissor (Crédito Privado)</SecaoTitulo>
                                {creditoPrivado.some(d => d.pct > 15) && (
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 12px', borderRadius: 8, marginBottom: 12, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', color: '#B45309' }}>
                                        <ShieldAlert size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                                        <span style={{ fontSize: 10, fontFamily: 'Montserrat, sans-serif' }}><strong>Atenção:</strong> Concentração superior a 15% num único emissor.</span>
                                    </div>
                                )}
                                {visual && <BarrasHorizontais dados={emissorBarras} />}
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: visual ? 8 : 0 }}>
                                    <thead><tr><th style={thP}>Emissor</th><th style={thP}>Setor</th><th style={thR}>Valor</th><th style={thR}>% Total</th></tr></thead>
                                    <tbody>
                                        {creditoPrivado.slice(0, 8).map((e, i) => (
                                            <tr key={i}>
                                                <td style={tdP}>{e.name}</td>
                                                <td style={{ ...tdP, fontSize: 10, color: '#6B7280' }}>{e.setor && e.setor !== 'Sem setor' ? e.setor : '—'}</td>
                                                <td style={{ ...tdR, fontWeight: 700 }}>{fmt(e.value)}</td>
                                                <td style={{ ...tdR, fontWeight: 800, color: corPorPct(e.pct) }}>{e.pct.toFixed(1)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <Rodape />
                    </div>
                )}

                {/* ════ SETORIAL + VENCIMENTOS ════ */}
                {(setorial.length > 0 || vencFaixas.length > 0) && (
                    <div className="pagina">
                        <PageHeader titulo="Distribuição & Vencimentos" />

                        {setorial.length > 0 && (
                            <div className="sem-quebra" style={{ marginBottom: 32 }}>
                                <SecaoTitulo>Distribuição Setorial</SecaoTitulo>
                                <div style={{ display: 'grid', gridTemplateColumns: visual ? '230px 1fr' : '1fr', gap: 28, alignItems: 'center' }}>
                                    {visual && <DonutSetor data={setorial.map(s => ({ setor: s.setor, value: s.valor, fill: s.fill }))} />}
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead><tr><th style={thP}>Setor</th><th style={thR}>Valor</th><th style={thR}>%</th></tr></thead>
                                        <tbody>
                                            {setorial.map((s, i) => (
                                                <tr key={i}>
                                                    <td style={tdP}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 7, height: 7, borderRadius: '50%', background: s.fill }} />{s.setor}</div></td>
                                                    <td style={{ ...tdR, fontWeight: 700 }}>{fmt(s.valor)}</td>
                                                    <td style={{ ...tdR, fontWeight: 800, color: s.fill }}>{s.pct.toFixed(1)}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {vencFaixas.length > 0 && (
                            <div className="sem-quebra">
                                <SecaoTitulo>Agenda de Vencimentos</SecaoTitulo>
                                <div style={{ display: 'grid', gridTemplateColumns: visual ? '300px 1fr' : '1fr', gap: 24, alignItems: 'center' }}>
                                    {visual && <BarrasFaixa faixas={vencFaixas} />}
                                    <TabelaFaixas faixas={vencFaixas} />
                                </div>
                            </div>
                        )}
                        <Rodape />
                    </div>
                )}

                {/* ════ VENCIMENTOS DETALHADOS ════ */}
                {comVencimento.length > 0 && (
                    <div className="pagina">
                        <PageHeader titulo="Vencimentos Detalhados" />
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
                                    <tr><td colSpan={5} style={{ ...tdP, opacity: 0.4, textAlign: 'center', fontSize: 10 }}>+ {comVencimento.length - 20} ativos adicionais na carteira completa</td></tr>
                                )}
                            </tbody>
                        </table>
                        <Rodape />
                    </div>
                )}

                {/* ════ CARTEIRA COMPLETA ════ */}
                <div className="pagina">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid #0083CB' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0083CB' }}>Carteira Completa de Ativos</span>
                        <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'Montserrat, sans-serif' }}>{metrics.todosAtivos?.length || 0} ativos · {fmt(pTotal)}</span>
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
                            {(metrics.todosAtivos || []).map((a: any, i: number) => {
                                const peso = pTotal > 0 ? (a.valorLiquido / pTotal) * 100 : 0;
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
                                <td style={{ ...tdR, fontWeight: 800, fontSize: 13, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>{fmt(pTotal)}</td>
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
