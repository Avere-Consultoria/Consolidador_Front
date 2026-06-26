import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Badge, Select } from 'avere-ui';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer,
} from 'recharts';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt, fmtDate } from '../../../utils/formatters';
import { CORES } from '../../../utils/colors';
import { useFaixas } from '../../../hooks/useFaixas';
import { agregarVencimentos, FAIXAS_VENC_DEFAULT } from '../../../utils/faixas';

interface VencimentosVisaoProps {
    ativos: any[];
    diasVencimento: number;
    setDiasVencimento: (dias: number) => void;
}

const OPCOES_PERIODO = [
    { label: 'Próx. 7 dias', value: '7' },
    { label: 'Próx. 15 dias', value: '15' },
    { label: 'Próx. 30 dias', value: '30' },
    { label: 'Próx. 60 dias', value: '60' },
    { label: 'Próx. 90 dias', value: '90' },
    { label: 'Próx. 6 meses', value: '180' },
    { label: 'Próx. 1 ano', value: '365' },
    { label: 'Todos os Ativos', value: '9999' },
];

const MES_ABBR = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function fmtCompact(v: number): string {
    const abs = Math.abs(v);
    if (abs >= 1e6) return `R$ ${(v / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi`;
    if (abs >= 1e3) return `R$ ${(v / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} mil`;
    return `R$ ${v.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
}

const COR_BARRA = '#F59E0B';
const COR_LINHA = '#0083CB';

// Rótulo do valor da barra "de pé" (vertical), acima da barra.
const renderRotatedLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (!value) return null;
    const cx = Number(x) + Number(width) / 2;
    const py = Number(y) - 6;
    return (
        <text x={cx} y={py} fill="#6B7280" fontSize={9} fontFamily="Montserrat, sans-serif" textAnchor="start" transform={`rotate(-90, ${cx}, ${py})`}>
            {fmtCompact(Number(value))}
        </text>
    );
};

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginTop: '8px', fontFamily: 'Montserrat, sans-serif' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '8px 4px', borderBottom: '1px solid rgba(0,0,0,0.06)', opacity: 0.4, textTransform: 'uppercase', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' };
const tdStyle: React.CSSProperties = { padding: '12px 4px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontWeight: 500, color: 'var(--color-secundaria)' };
const segBtn = (active: boolean): React.CSSProperties => ({ padding: '6px 12px', fontSize: 12, border: 'none', cursor: 'pointer', background: active ? 'var(--color-primaria)' : '#fff', color: active ? '#fff' : '#6B7280', fontWeight: active ? 700 : 500 });

// Cor pela BASE da instituição (estável a renomeações no cadastro).
const CORES_BASE: Record<string, string> = {
    BTG: CORES.btg, XP: CORES.xp, AVENUE: CORES.avenue, AGORA: CORES.agora,
};

export function VencimentosVisao({ ativos, diasVencimento, setDiasVencimento }: VencimentosVisaoProps) {
    const [modoTabela, setModoTabela] = useState(false);
    const [modoGrafico, setModoGrafico] = useState<'mensal' | 'faixas'>('mensal');
    const faixas = useFaixas('VENCIMENTO', FAIXAS_VENC_DEFAULT);

    const ativosFiltrados = useMemo(() => {
        if (!ativos) return [];
        const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
        const diasNum = Number(diasVencimento);
        const limiteData = new Date(hoje); limiteData.setDate(hoje.getDate() + diasNum);

        return ativos
            .filter(a => {
                const dataStr = a.vencimento || a.data_vencimento;
                if (!dataStr) return false;
                const dataVenc = new Date(dataStr); dataVenc.setHours(0, 0, 0, 0);
                return dataVenc >= hoje && (diasNum === 9999 || dataVenc <= limiteData);
            })
            .sort((a, b) => new Date(a.vencimento || a.data_vencimento).getTime() - new Date(b.vencimento || b.data_vencimento).getTime());
    }, [ativos, diasVencimento]);

    const totalFinanceiro = useMemo(
        () => ativosFiltrados.reduce((acc, c) => acc + (c.valorBruto || 0), 0),
        [ativosFiltrados],
    );

    const patrimonioTotal = useMemo(
        () => (ativos ?? []).reduce((acc, c) => acc + (c.valorBruto || 0), 0),
        [ativos],
    );

    // Agrupamento por MÊS de vencimento + acumulado (visão "fluxo de caixa projetado").
    const dadosMensais = useMemo(() => {
        const map = new Map<string, number>();
        ativosFiltrados.forEach(a => {
            const dataStr = a.vencimento || a.data_vencimento;
            if (!dataStr) return;
            const d = new Date(dataStr);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            map.set(key, (map.get(key) ?? 0) + (a.valorBruto || 0));
        });
        let acc = 0;
        return Array.from(map.keys()).sort().map(k => {
            const valor = map.get(k)!;
            acc += valor;
            const [y, m] = k.split('-');
            return { mes: `${MES_ABBR[parseInt(m, 10) - 1]}/${y.slice(2)}`, valor, acumulado: acc };
        });
    }, [ativosFiltrados]);

    // Agrupamento por FAIXA de prazo (visão clássica).
    const faixasAgregadas = useMemo(
        () => agregarVencimentos(ativosFiltrados, faixas, patrimonioTotal),
        [ativosFiltrados, patrimonioTotal, faixas],
    );

    const handleSelectChange = (value: string) => setDiasVencimento(Number(value));

    return (
        <Card style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch titulo="Agenda de Vencimentos" modoTabela={modoTabela} setModoTabela={setModoTabela} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '12px', flexWrap: 'wrap' }}>
                    <div>
                        <Typography variant="p" style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', marginBottom: '2px', fontFamily: 'Montserrat, sans-serif' }}>
                            Total a vencer · {ativosFiltrados.length} ativo{ativosFiltrados.length === 1 ? '' : 's'}
                        </Typography>
                        <Typography variant="p" style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'Montserrat, sans-serif', color: 'var(--color-secundaria)' }}>
                            {fmt(totalFinanceiro)}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {!modoTabela && (
                            <div style={{ display: 'flex', border: '1px solid var(--color-borda)', borderRadius: 8, overflow: 'hidden' }}>
                                <button onClick={() => setModoGrafico('mensal')} style={segBtn(modoGrafico === 'mensal')}>Mensal</button>
                                <button onClick={() => setModoGrafico('faixas')} style={segBtn(modoGrafico === 'faixas')}>Faixas</button>
                            </div>
                        )}
                        <div style={{ width: '160px' }}>
                            <Select value={String(diasVencimento)} onChange={handleSelectChange} options={OPCOES_PERIODO} placeholder="Selecionar período..." />
                        </div>
                    </div>
                </div>

                {modoTabela ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Ativo</th>
                                    <th style={thStyle}>Instituição</th>
                                    <th style={thStyle}>Data</th>
                                    <th style={{ ...thStyle, textAlign: 'right' }}>Valor Líquido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ativosFiltrados.map((a, i) => (
                                    <tr key={a.rowId || i}>
                                        <td style={tdStyle}>{a.nome}</td>
                                        <td style={tdStyle}>
                                            <Badge variant="ghost" style={{ fontSize: '10px', color: CORES_BASE[a.instituicaoBase] ?? 'var(--color-primaria)' }}>
                                                {a.instituicao}
                                            </Badge>
                                        </td>
                                        <td style={{ ...tdStyle, fontWeight: 600 }}>{fmtDate(a.vencimento || a.data_vencimento)}</td>
                                        <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>{fmt(a.valorBruto)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : modoGrafico === 'mensal' ? (
                    dadosMensais.length === 0 ? (
                        <Typography variant="p" style={{ textAlign: 'center', opacity: 0.5, padding: '20px', fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>
                            Nenhum vencimento para o período selecionado.
                        </Typography>
                    ) : (
                        <ResponsiveContainer width="100%" height={360}>
                            <ComposedChart data={dadosMensais} margin={{ top: 64, right: 20, left: 10, bottom: 8 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                                <XAxis dataKey="mes" tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif' }} tickLine={false} axisLine={{ stroke: 'rgba(0,0,0,0.1)' }} />
                                <YAxis tickFormatter={(v) => fmtCompact(Number(v))} tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif' }} width={72} tickLine={false} axisLine={false} />
                                <Tooltip
                                    formatter={(v: any, name: any) => [fmt(Number(v)), name === 'valor' ? 'No mês' : 'Acumulado']}
                                    labelStyle={{ fontWeight: 700 }}
                                    contentStyle={{ fontSize: 12, borderRadius: 8, fontFamily: 'Montserrat, sans-serif' }}
                                />
                                <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Montserrat, sans-serif' }} formatter={(value) => value === 'valor' ? 'No mês' : 'Acumulado'} />
                                <Bar dataKey="valor" name="valor" fill={COR_BARRA} radius={[4, 4, 0, 0]} maxBarSize={56} isAnimationActive={false}>
                                    <LabelList dataKey="valor" content={renderRotatedLabel} />
                                </Bar>
                                <Line type="stepAfter" dataKey="acumulado" name="acumulado" stroke={COR_LINHA} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} isAnimationActive={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    )
                ) : (
                    faixasAgregadas.length === 0 ? (
                        <Typography variant="p" style={{ textAlign: 'center', opacity: 0.5, padding: '20px', fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>
                            Nenhum vencimento para o período selecionado.
                        </Typography>
                    ) : (
                        <>
                            {/* Barra empilhada por faixa */}
                            <div style={{ display: 'flex', height: '10px', borderRadius: '8px', overflow: 'hidden', gap: '2px', marginBottom: '28px' }}>
                                {faixasAgregadas.map((f, i) => (
                                    <div key={i} title={`${f.label}: ${f.pct.toFixed(1)}%`} style={{ width: `${f.pct}%`, background: f.cor, borderRadius: '2px', transition: 'width 0.8s ease', minWidth: f.pct > 0 ? '4px' : '0' }} />
                                ))}
                            </div>

                            {/* Lista de faixas */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                {faixasAgregadas.map((f, i) => (
                                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '12px 1fr auto auto', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < faixasAgregadas.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                                        <div style={{ width: '4px', height: '36px', borderRadius: '4px', background: f.cor, flexShrink: 0 }} />
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '5px' }}>
                                                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-secundaria)' }}>{f.label}</span>
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
                    )
                )}
            </CardContent>
        </Card>
    );
}
