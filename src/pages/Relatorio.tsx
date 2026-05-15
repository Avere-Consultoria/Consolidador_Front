import { useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, ShieldAlert, Briefcase } from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
} from 'recharts';

import { useHomeMetrics } from '../hooks/useHomeMetrics';
import { fmt, fmtDate, fmtK } from '../utils/formatters';
import logoAvere from '../assets/A_Azul.svg';

// ── Helpers de layout ─────────────────────────────────────────────────────────

function SecaoTitulo({ children }: { children: string }) {
    return (
        <div style={{ marginBottom: '16px', marginTop: '32px', paddingBottom: '8px', borderBottom: '2px solid var(--color-primaria)' }}>
            <span style={{
                fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.12em', color: 'var(--color-primaria)'
            }}>
                {children}
            </span>
        </div>
    );
}

const thPrint: React.CSSProperties = {
    padding: '8px 12px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.05em', color: '#9CA3AF', textAlign: 'left',
    borderBottom: '1px solid #E5E7EB', whiteSpace: 'nowrap',
};
const tdPrint: React.CSSProperties = {
    padding: '10px 12px', fontSize: '12px', fontWeight: 500,
    color: '#374151', borderBottom: '1px solid #F3F4F6',
};
const tdRight: React.CSSProperties = { ...tdPrint, textAlign: 'right' };
const thRight: React.CSSProperties = { ...thPrint, textAlign: 'right' };

function BarraHorizontal({ pct, cor }: { pct: number; cor: string }) {
    return (
        <div style={{ height: '6px', width: '100%', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: cor, borderRadius: '4px' }} />
        </div>
    );
}

// ── Componente Principal ──────────────────────────────────────────────────────

export default function Relatorio() {
    const navigate = useNavigate();
    const { selectedClient, loading, metrics } = useHomeMetrics();

    if (!selectedClient) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 16, fontFamily: 'var(--font-family)' }}>
                <p style={{ opacity: 0.5 }}>Nenhum cliente seleccionado. Volta à Home e selecciona um cliente.</p>
                <button onClick={() => navigate('/')} style={{ padding: '8px 16px', cursor: 'pointer' }}>← Voltar</button>
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'var(--font-family)' }}>
                <p style={{ opacity: 0.4 }}>A preparar relatório...</p>
            </div>
        );
    }

    const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const cores = metrics.coresInstituicoes;

    const instituicoes = [
        { nome: 'BTG Pactual',      total: metrics.btgTotal,    pct: metrics.patrimonioTotal > 0 ? (metrics.btgTotal / metrics.patrimonioTotal) * 100 : 0,    cor: cores?.btg    || '#0083CB', ref: metrics.dataRefBtg    },
        { nome: 'XP Investimentos', total: metrics.xpTotal,     pct: metrics.patrimonioTotal > 0 ? (metrics.xpTotal / metrics.patrimonioTotal) * 100 : 0,     cor: cores?.xp     || '#FF6B00', ref: metrics.dataRefXp     },
        { nome: 'Avenue',           total: metrics.avenueTotal, pct: metrics.patrimonioTotal > 0 ? (metrics.avenueTotal / metrics.patrimonioTotal) * 100 : 0, cor: cores?.avenue || '#6366F1', ref: metrics.dataRefAvenue },
        { nome: 'Ágora',            total: metrics.agoraTotal,  pct: metrics.patrimonioTotal > 0 ? (metrics.agoraTotal / metrics.patrimonioTotal) * 100 : 0,  cor: cores?.agora  || '#10B981', ref: metrics.dataRefAgora  },
    ].filter(i => i.total > 0);

    // Vencimentos: todos os ativos com data de vencimento, ordenados
    const comVencimento = [...(metrics.todosAtivos || [])]
        .filter(a => a.vencimento)
        .sort((a, b) => new Date(a.vencimento!).getTime() - new Date(b.vencimento!).getTime());

    const riscoDados = [...(metrics.exposicaoRiscoData || [])].sort((a, b) => b.pct - a.pct);
    const temConcentracao = riscoDados.some(d => d.pct > 15);

    // Dados do PieChart com cores dinâmicas
    const pieData = instituicoes.map(i => ({ name: i.nome, value: i.total, fill: i.cor, pct: i.pct }));

    return (
        <>
            {/* ── Estilos globais + print ───────────────────────────────────────── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    font-family: 'Montserrat', sans-serif;
                    background: #F3F4F6;
                    color: #111827;
                }

                .pagina {
                    width: 210mm;
                    min-height: 297mm;
                    margin: 0 auto 12px auto;
                    padding: 20mm 18mm;
                    background: #fff;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.10);
                    border-radius: 4px;
                    position: relative;
                }

                .no-print { display: flex; }

                @media print {
                    @page { size: A4 portrait; margin: 14mm 16mm; }
                    body { background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    .pagina {
                        width: 100%; min-height: unset;
                        margin: 0; padding: 0;
                        box-shadow: none; border-radius: 0;
                        page-break-after: always;
                    }
                    .pagina:last-child { page-break-after: avoid; }
                    .quebra-antes { page-break-before: always; }
                    .sem-quebra { page-break-inside: avoid; }
                }
            `}</style>

            {/* ── Botões flutuantes (some no print) ────────────────────────────── */}
            <div className="no-print" style={{
                position: 'fixed', top: 24, right: 24, zIndex: 9999,
                gap: '8px', alignItems: 'center',
            }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '8px 14px', borderRadius: 8, border: '1px solid #E5E7EB',
                        background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                        fontFamily: 'Montserrat, sans-serif', color: '#374151',
                    }}
                >
                    <ArrowLeft size={14} /> Voltar
                </button>
                <button
                    onClick={() => window.print()}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '8px 18px', borderRadius: 8, border: 'none',
                        background: 'var(--color-primaria, #0083CB)', cursor: 'pointer',
                        fontSize: 13, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', color: '#fff',
                    }}
                >
                    <Printer size={14} /> Imprimir / Salvar PDF
                </button>
            </div>

            {/* ── Wrapper de tela ───────────────────────────────────────────────── */}
            <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 48 }} className="no-print" />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>

                {/* ════════════════════════════════════════════════════════════════
                    PÁGINA 1 — CAPA
                ════════════════════════════════════════════════════════════════ */}
                <div className="pagina" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                    {/* Cabeçalho da capa */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <img src={logoAvere} style={{ height: 36 }} alt="Avere" />
                        <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>
                            Confidencial
                        </span>
                    </div>

                    {/* Corpo da capa */}
                    <div>
                        <div style={{ marginBottom: 48 }}>
                            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9CA3AF', fontWeight: 700, marginBottom: 12 }}>
                                Relatório de Carteira
                            </p>
                            <h1 style={{ fontSize: 38, fontWeight: 800, color: '#111827', lineHeight: 1.1, marginBottom: 10 }}>
                                {selectedClient.nome}
                            </h1>
                            <p style={{ fontSize: 14, color: '#9CA3AF' }}>
                                Gerado em {hoje}
                            </p>
                        </div>

                        {/* Card do patrimônio */}
                        <div style={{
                            display: 'inline-block', background: 'var(--color-primaria, #0083CB)',
                            color: '#fff', padding: '24px 36px', borderRadius: 16,
                            marginBottom: 32,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, opacity: 0.85 }}>
                                <Briefcase size={14} />
                                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    Patrimônio Total
                                </p>
                            </div>
                            <p style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.5px' }}>
                                {fmt(metrics.patrimonioTotal)}
                            </p>
                        </div>

                        {/* Mini-tabela de corretoras */}
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${instituicoes.length}, 1fr)`, gap: 12 }}>
                            {instituicoes.map(inst => (
                                <div key={inst.nome} style={{
                                    padding: '16px', borderRadius: 10,
                                    border: `1px solid ${inst.cor}30`,
                                    background: `${inst.cor}08`,
                                }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: inst.cor, marginBottom: 8 }} />
                                    <p style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 4 }}>{inst.nome}</p>
                                    <p style={{ fontSize: 14, fontWeight: 800, color: '#111827' }}>{fmt(inst.total)}</p>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: inst.cor }}>{inst.pct.toFixed(1)}%</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rodapé da capa */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 20, borderTop: '1px solid #F3F4F6' }}>
                        <p style={{ fontSize: 9, color: '#D1D5DB' }}>
                            Este relatório é de uso exclusivo do cliente e do consultor. As informações aqui contidas são baseadas nos dados sincronizados com as instituições financeiras.
                        </p>
                        <img src={logoAvere} style={{ height: 18, opacity: 0.25 }} alt="" />
                    </div>
                </div>

                {/* ════════════════════════════════════════════════════════════════
                    PÁGINA 2 — COMPOSIÇÃO + ALOCAÇÃO
                ════════════════════════════════════════════════════════════════ */}
                <div className="pagina">

                    {/* Composição por Instituição */}
                    <SecaoTitulo>Composição por Instituição</SecaoTitulo>
                    <div className="sem-quebra" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', marginBottom: 8 }}>
                        {/* PieChart */}
                        <PieChart width={240} height={200}>
                            <Pie
                                data={pieData} cx={115} cy={95}
                                innerRadius={58} outerRadius={88}
                                paddingAngle={3} dataKey="value"
                                isAnimationActive={false}
                            >
                                {pieData.map((entry, i) => (
                                    <Cell key={i} fill={entry.fill} stroke="none" />
                                ))}
                            </Pie>
                            <Legend
                                iconType="circle" iconSize={8}
                                formatter={(value) => (
                                    <span style={{ fontSize: 11, fontWeight: 600, color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>

                        {/* Tabela */}
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={thPrint}>Instituição</th>
                                    <th style={thRight}>Valor</th>
                                    <th style={thRight}>%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instituicoes.map(inst => (
                                    <tr key={inst.nome}>
                                        <td style={tdPrint}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: inst.cor, flexShrink: 0 }} />
                                                {inst.nome}
                                            </div>
                                        </td>
                                        <td style={{ ...tdRight, fontWeight: 700 }}>{fmt(inst.total)}</td>
                                        <td style={{ ...tdRight, color: inst.cor, fontWeight: 700 }}>{inst.pct.toFixed(1)}%</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td style={{ ...tdPrint, fontWeight: 700, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>Total</td>
                                    <td style={{ ...tdRight, fontWeight: 800, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>{fmt(metrics.patrimonioTotal)}</td>
                                    <td style={{ ...tdRight, fontWeight: 800, borderTop: '2px solid #E5E7EB', borderBottom: 'none' }}>100%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Alocação por Classe */}
                    <SecaoTitulo>Alocação por Classe de Ativo</SecaoTitulo>
                    <div className="sem-quebra" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
                        {/* BarChart horizontal */}
                        <BarChart
                            width={260} height={Math.max(160, metrics.alocacaoData.length * 28)}
                            data={metrics.alocacaoData} layout="vertical"
                            margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
                            barSize={10}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.06)" />
                            <XAxis type="number" hide />
                            <YAxis
                                type="category" dataKey="name" width={90}
                                tick={{ fontSize: 10, fontFamily: 'Montserrat, sans-serif', fill: '#6B7280' }}
                                axisLine={false} tickLine={false}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                                {metrics.alocacaoData.map((entry: any, i: number) => (
                                    <Cell key={i} fill={entry.fill} />
                                ))}
                                <LabelList
                                    dataKey="value"
                                    position="right"
                                    formatter={(v: any) => fmtK(Number(v))}
                                    style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', fill: '#6B7280' }}
                                />
                            </Bar>
                        </BarChart>

                        {/* Tabela */}
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={thPrint}>Classe</th>
                                    <th style={thRight}>Valor</th>
                                    <th style={thRight}>%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.alocacaoData.map((d: any) => (
                                    <tr key={d.name}>
                                        <td style={tdPrint}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ width: 8, height: 8, borderRadius: 2, background: d.fill, flexShrink: 0 }} />
                                                {d.name}
                                            </div>
                                        </td>
                                        <td style={{ ...tdRight, fontWeight: 700 }}>{fmt(d.value)}</td>
                                        <td style={{ ...tdRight, opacity: 0.6 }}>{d.pct.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ════════════════════════════════════════════════════════════════
                    PÁGINA 3 — LIQUIDEZ + RISCO EMISSOR
                ════════════════════════════════════════════════════════════════ */}
                <div className="pagina">

                    {/* Perfil de Liquidez */}
                    <SecaoTitulo>Perfil de Liquidez</SecaoTitulo>
                    <div className="sem-quebra" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
                        {metrics.liquidezData.map((liq: any) => (
                            <div key={liq.name}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{liq.name}</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0083CB' }}>
                                        {liq.pct.toFixed(1)}%
                                        <span style={{ opacity: 0.45, fontWeight: 400, fontSize: 11, marginLeft: 6, color: '#374151' }}>
                                            ({fmt(liq.value)})
                                        </span>
                                    </span>
                                </div>
                                <BarraHorizontal pct={liq.pct} cor="linear-gradient(90deg, #0083CB, #00B4D8)" />
                            </div>
                        ))}
                    </div>

                    {/* Vencimentos próximos */}
                    {comVencimento.length > 0 && (
                        <>
                            <SecaoTitulo>Vencimentos</SecaoTitulo>
                            <div className="sem-quebra">
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th style={thPrint}>Ativo</th>
                                            <th style={thPrint}>Instituição</th>
                                            <th style={thPrint}>Classe</th>
                                            <th style={thRight}>Vencimento</th>
                                            <th style={thRight}>Valor Líquido</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comVencimento.slice(0, 15).map((a, i) => (
                                            <tr key={i}>
                                                <td style={{ ...tdPrint, fontWeight: 600, maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.nome}</td>
                                                <td style={tdPrint}>{a.instituicao}</td>
                                                <td style={tdPrint}><span style={{ fontSize: 10, background: '#F3F4F6', padding: '2px 6px', borderRadius: 4 }}>{a.tipo}</span></td>
                                                <td style={{ ...tdRight, fontWeight: 700 }}>{fmtDate(a.vencimento)}</td>
                                                <td style={{ ...tdRight, fontWeight: 700 }}>{fmt(a.valorLiquido)}</td>
                                            </tr>
                                        ))}
                                        {comVencimento.length > 15 && (
                                            <tr>
                                                <td colSpan={5} style={{ ...tdPrint, opacity: 0.4, textAlign: 'center', fontSize: 11 }}>
                                                    + {comVencimento.length - 15} activos adicionais na tabela completa
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* Exposição por Emissor */}
                    <SecaoTitulo>Exposição por Emissor</SecaoTitulo>
                    <div className="sem-quebra">
                        {temConcentracao && (
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: 8,
                                padding: '10px 14px', borderRadius: 8, marginBottom: 12,
                                background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)',
                                color: '#B45309'
                            }}>
                                <ShieldAlert size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                                <span style={{ fontSize: 11 }}>
                                    <strong>Atenção:</strong> A carteira possui concentração superior a 15% num único emissor.
                                </span>
                            </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {riscoDados.slice(0, 10).map((emissor, i) => {
                                const cor = emissor.pct > 25 ? '#EF4444' : emissor.pct > 15 ? '#F59E0B' : '#10B981';
                                return (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <span style={{ fontSize: 12, fontWeight: 600 }}>{emissor.name}</span>
                                                {emissor.setor && (
                                                    <span style={{ fontSize: 9, background: '#F3F4F6', padding: '2px 5px', borderRadius: 3, color: '#6B7280' }}>
                                                        {emissor.setor}
                                                    </span>
                                                )}
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: cor }}>
                                                {emissor.pct.toFixed(1)}%
                                                <span style={{ opacity: 0.45, fontWeight: 400, fontSize: 11, marginLeft: 6, color: '#374151' }}>
                                                    ({fmt(emissor.value)})
                                                </span>
                                            </span>
                                        </div>
                                        <BarraHorizontal pct={emissor.pct} cor={cor} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ════════════════════════════════════════════════════════════════
                    PÁGINA 4+ — TABELA COMPLETA DE ATIVOS
                ════════════════════════════════════════════════════════════════ */}
                <div className="pagina">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 4 }}>
                        <div style={{ borderBottom: '2px solid var(--color-primaria)', paddingBottom: 8, flex: 1 }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primaria)' }}>
                                Carteira Completa de Ativos
                            </span>
                        </div>
                        <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 12, marginBottom: 8 }}>
                            {metrics.todosAtivos.length} ativos · {fmt(metrics.patrimonioTotal)}
                        </span>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB' }}>
                                <th style={{ ...thPrint, width: '32%' }}>Ativo</th>
                                <th style={thPrint}>Instituição</th>
                                <th style={thPrint}>Classe</th>
                                <th style={thRight}>Vencimento</th>
                                <th style={thRight}>Valor Líquido</th>
                                <th style={thRight}>Peso %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.todosAtivos.map((a, i) => {
                                const peso = metrics.patrimonioTotal > 0 ? (a.valorLiquido / metrics.patrimonioTotal) * 100 : 0;
                                return (
                                    <tr key={i} style={{ pageBreakInside: 'avoid' }}>
                                        <td style={{ ...tdPrint, fontWeight: 600, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {a.nome}
                                            {a.subTipo && (
                                                <span style={{ display: 'block', fontSize: 10, fontWeight: 400, color: '#9CA3AF' }}>{a.subTipo}</span>
                                            )}
                                        </td>
                                        <td style={tdPrint}>{a.instituicao}</td>
                                        <td style={tdPrint}>
                                            <span style={{ fontSize: 10, background: '#F3F4F6', padding: '2px 6px', borderRadius: 4 }}>
                                                {a.tipo}
                                            </span>
                                        </td>
                                        <td style={{ ...tdRight, fontSize: 11 }}>{fmtDate(a.vencimento)}</td>
                                        <td style={{ ...tdRight, fontWeight: 700 }}>{fmt(a.valorLiquido)}</td>
                                        <td style={{ ...tdRight, fontWeight: 700, opacity: 0.6 }}>{peso.toFixed(2)}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr style={{ background: '#F9FAFB', borderTop: '2px solid #E5E7EB' }}>
                                <td colSpan={4} style={{ ...tdPrint, fontWeight: 700 }}>Total Consolidado</td>
                                <td style={{ ...tdRight, fontWeight: 800, fontSize: 13 }}>{fmt(metrics.patrimonioTotal)}</td>
                                <td style={{ ...tdRight, fontWeight: 800 }}>100%</td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Rodapé da última página */}
                    <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: 9, color: '#D1D5DB', maxWidth: '80%' }}>
                            Informações baseadas nos dados mais recentes sincronizados com cada instituição financeira. Valores sujeitos a alteração conforme cotações de mercado.
                        </p>
                        <img src={logoAvere} style={{ height: 18, opacity: 0.25 }} alt="" />
                    </div>
                </div>

            </div>
        </>
    );
}
