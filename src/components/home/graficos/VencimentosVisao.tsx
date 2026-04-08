import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Badge, Select } from 'avere-ui';
import { Calendar } from 'lucide-react';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt, fmtDate } from '../../../utils/formatters';

interface VencimentosVisaoProps {
    ativos: any[];
    diasVencimento: number;
    setDiasVencimento: (dias: number) => void;
}

// 1. Valores em string para total compatibilidade com o Select raiz
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

const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    marginTop: '8px',
    fontFamily: 'Montserrat, sans-serif'
};

const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '8px 4px',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    opacity: 0.4,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: '10px',
    letterSpacing: '0.05em'
};

const tdStyle: React.CSSProperties = {
    padding: '12px 4px',
    borderBottom: '1px solid rgba(0,0,0,0.04)',
    fontWeight: 500,
    color: '#081F28'
};

export function VencimentosVisao({ ativos, diasVencimento, setDiasVencimento }: VencimentosVisaoProps) {
    const [modoTabela, setModoTabela] = useState(false);

    // 2. Filtro de Ativos Dinâmico
    const ativosFiltrados = useMemo(() => {
        if (!ativos) return [];

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const diasNum = Number(diasVencimento);
        const limiteData = new Date(hoje);
        limiteData.setDate(hoje.getDate() + diasNum);

        return ativos
            .filter(a => {
                // Suporta os mapeamentos btg (vencimento) e xp (data_vencimento)
                const dataStr = a.vencimento || a.data_vencimento;
                if (!dataStr) return false;

                const dataVenc = new Date(dataStr);
                dataVenc.setHours(0, 0, 0, 0);

                const isFuturoOuHoje = dataVenc >= hoje;
                const estaNoPrazo = diasNum === 9999 || dataVenc <= limiteData;

                return isFuturoOuHoje && estaNoPrazo;
            })
            .sort((a, b) => {
                const dA = new Date(a.vencimento || a.data_vencimento).getTime();
                const dB = new Date(b.vencimento || b.data_vencimento).getTime();
                return dA - dB;
            });
    }, [ativos, diasVencimento]);

    const totalFinanceiro = useMemo(() =>
        ativosFiltrados.reduce((acc, curr) => acc + (curr.valorLiquido || 0), 0)
        , [ativosFiltrados]);

    // 3. Agrupamento para Gráfico de Barras
    const dadosGrafico = useMemo(() => {
        const grupos: Record<string, { label: string, valor: number }> = {};

        ativosFiltrados.forEach(a => {
            const label = fmtDate(a.vencimento || a.data_vencimento);
            if (!grupos[label]) {
                grupos[label] = { label, valor: 0 };
            }
            grupos[label].valor += (a.valorLiquido || 0);
        });

        return Object.values(grupos).slice(0, 8);
    }, [ativosFiltrados]);

    // 4. Handler de Seleção (Força a reatividade)
    const handleSelectChange = (value: string) => {
        setDiasVencimento(Number(value));
    };

    return (
        <Card style={{ marginTop: '24px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <CardContent style={{ padding: '24px' }}>

                <CardHeaderComSwitch
                    titulo="Agenda de Vencimentos"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '8px', borderRadius: '8px', color: '#f59e0b' }}>
                            <Calendar size={20} />
                        </div>
                        <div>
                            <Typography variant="p" style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>
                                {fmt(totalFinanceiro)}
                            </Typography>
                            <Typography variant="p" style={{ fontSize: '11px', opacity: 0.6, fontFamily: 'Montserrat, sans-serif' }}>
                                {ativosFiltrados.length} ativos a vencer
                            </Typography>
                        </div>
                    </div>

                    <div style={{ width: '160px' }}>
                        <Select
                            value={String(diasVencimento)}
                            onChange={handleSelectChange}
                            options={OPCOES_PERIODO}
                            placeholder="Selecionar período..."
                        />
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
                                            <Badge variant="ghost" style={{ fontSize: '10px', color: a.instituicao.includes('BTG') ? '#0083CB' : '#FF6B00' }}>
                                                {a.instituicao.includes('BTG') ? 'BTG' : 'XP'}
                                            </Badge>
                                        </td>
                                        <td style={{ ...tdStyle, fontWeight: 600 }}>{fmtDate(a.vencimento || a.data_vencimento)}</td>
                                        <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>{fmt(a.valorLiquido)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dadosGrafico.length > 0 ? dadosGrafico.map((item, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>{item.label}</Typography>
                                    <Typography variant="p" style={{ fontWeight: 700, fontSize: '13px', color: '#f59e0b', fontFamily: 'Montserrat, sans-serif' }}>{fmt(item.valor)}</Typography>
                                </div>
                                <div style={{ height: '6px', width: '100%', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${totalFinanceiro > 0 ? (item.valor / totalFinanceiro) * 100 : 0}%`,
                                        background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
                                        borderRadius: '3px',
                                        transition: 'width 1s ease'
                                    }} />
                                </div>
                            </div>
                        )) : (
                            <Typography variant="p" style={{ textAlign: 'center', opacity: 0.5, padding: '20px', fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>
                                Nenhum vencimento para o período selecionado.
                            </Typography>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}