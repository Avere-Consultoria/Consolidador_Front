import { useState } from 'react';
import { Card, CardContent, Typography, Badge } from 'avere-ui';
import { Briefcase } from 'lucide-react';
import { fmt, fmtDate } from '../../../utils/formatters';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';

interface ResumoCardsProps {
    metrics: any;
}

export function ResumoCards({ metrics }: ResumoCardsProps) {
    const [modoTabela, setModoTabela] = useState(false);
    const montserrat = { fontFamily: 'Montserrat, sans-serif' };

    // Cálculo de Share
    const xpPercent = (metrics.xpTotal / metrics.patrimonioTotal) * 100;
    const btgPercent = (metrics.btgTotal / metrics.patrimonioTotal) * 100;

    const instituicoes = [
        { id: 'btg', nome: 'BTG Pactual', total: metrics.btgTotal, percent: btgPercent, ref: metrics.dataRefBtg, color: '#172652' },
        { id: 'xp', nome: 'XP Investimentos', total: metrics.xpTotal, percent: xpPercent, ref: metrics.dataRefXp, color: '#FFC800' }
    ].filter(inst => inst.total > 0);

    return (
        <Card style={{ border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', background: '#fff' }}>
            <CardContent style={{ padding: '24px' }}>

                {/* HEADER COM O SEU COMPONENTE SWITCH */}
                <CardHeaderComSwitch
                    titulo="Composição da Carteira"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />

                {/* PATRIMÔNIO CONSOLIDADO (IMUTÁVEL) */}
                <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', marginBottom: '4px' }}>
                        <Briefcase size={16} />
                        <Typography variant="p" style={{ ...montserrat, fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Patrimônio Total da Visão
                        </Typography>
                    </div>
                    <Typography variant="h1" style={{ ...montserrat, fontSize: '36px', fontWeight: 800, color: '#081F28' }}>
                        {fmt(metrics.patrimonioTotal)}
                    </Typography>
                </div>

                {/* CONTEÚDO DINÂMICO */}
                {!modoTabela ? (
                    /* VISÃO EM GRÁFICO (BARRAS ESTILO VENCIMENTOS) */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {instituicoes.map(inst => (
                            <div key={inst.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <Typography variant="p" style={{ ...montserrat, fontWeight: 700, fontSize: '13px', color: '#4B5563' }}>
                                        {inst.nome}
                                        <span style={{ fontWeight: 400, opacity: 0.4, fontSize: '11px', marginLeft: '8px' }}>
                                            Ref: {fmtDate(inst.ref + 'T12:00:00Z')}
                                        </span>
                                    </Typography>
                                    <div style={{ textAlign: 'right' }}>
                                        <Typography variant="p" style={{ ...montserrat, fontWeight: 800, fontSize: '15px', color: '#081F28' }}>
                                            {fmt(inst.total)}
                                        </Typography>
                                        <Typography variant="p" style={{ ...montserrat, fontSize: '11px', fontWeight: 700, color: inst.color }}>
                                            {inst.percent.toFixed(1)}%
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '12px', background: '#F3F4F6', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${inst.percent}%`,
                                        height: '100%',
                                        background: inst.color,
                                        borderRadius: '10px',
                                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* VISÃO EM TABELA */
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', ...montserrat }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid #F3F4F6' }}>
                                    <th style={{ paddingBottom: '12px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase' }}>Instituição</th>
                                    <th style={{ paddingBottom: '12px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', textAlign: 'right' }}>Valor</th>
                                    <th style={{ paddingBottom: '12px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', textAlign: 'right' }}>Share</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instituicoes.map(inst => (
                                    <tr key={inst.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                                        <td style={{ padding: '14px 0' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: inst.color }} />
                                                <Typography variant="p" style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>{inst.nome}</Typography>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <Typography variant="p" style={{ fontWeight: 700, fontSize: '14px' }}>{fmt(inst.total)}</Typography>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <Badge variant="ghost" style={{ fontSize: '11px', fontWeight: 700, color: inst.color }}>
                                                {inst.percent.toFixed(1)}%
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}