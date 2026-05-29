import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Badge, Select } from 'avere-ui';
import { Calendar } from 'lucide-react';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt, fmtDate } from '../../../utils/formatters';
import { CORES } from '../../../utils/colors';

// ── Faixas de vencimento ──────────────────────────────────────────────────────
const FAIXAS_VENC = [
    { id: 'ate30',    label: 'Curto Prazo',   desc: 'Até 30 dias',      min: 0,   max: 30,       cor: '#10B981' },
    { id: 'ate90',    label: 'Médio Prazo',   desc: '31 a 90 dias',     min: 31,  max: 90,       cor: '#0083CB' },
    { id: 'ate180',   label: '6 Meses',       desc: '91 a 180 dias',    min: 91,  max: 180,      cor: '#06B6D4' },
    { id: 'ate365',   label: '1 Ano',         desc: '181 a 365 dias',   min: 181, max: 365,      cor: '#F59E0B' },
    { id: 'mais365',  label: 'Longo Prazo',   desc: 'Acima de 1 ano',   min: 366, max: Infinity, cor: '#EF4444' },
] as const;

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
    color: 'var(--color-secundaria)'
};

const COR_INSTITUICAO: Record<string, string> = {
    'BTG Pactual': CORES.btg,
    'XP Investimentos': CORES.xp,
    'Avenue': CORES.avenue,
    'Ágora': CORES.agora,
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

    // Patrimônio total da carteira (todos os ativos, não só os filtrados)
    // — usado como denominador dos percentuais para refletir o todo
    const patrimonioTotal = useMemo(() =>
        (ativos ?? []).reduce((acc, curr) => acc + (curr.valorLiquido || 0), 0)
        , [ativos]);

    // 3. Agrupamento por faixas de vencimento
    const faixasAgregadas = useMemo(() => {
        const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
        const acc: Record<string, number> = {};
        FAIXAS_VENC.forEach(f => { acc[f.id] = 0; });

        ativosFiltrados.forEach(a => {
            const dataStr = a.vencimento || a.data_vencimento;
            if (!dataStr) return;
            const dataVenc = new Date(dataStr); dataVenc.setHours(0, 0, 0, 0);
            const dias = Math.round((dataVenc.getTime() - hoje.getTime()) / 86_400_000);
            const faixa = FAIXAS_VENC.find(f => dias >= f.min && dias <= f.max);
            if (faixa) acc[faixa.id] += (a.valorLiquido || 0);
        });

        return FAIXAS_VENC.map(f => ({
            ...f,
            value: acc[f.id],
            // Percentual sobre patrimônio total (não sobre o subconjunto filtrado)
            pct: patrimonioTotal > 0 ? (acc[f.id] / patrimonioTotal) * 100 : 0,
        })).filter(f => f.value > 0);
    }, [ativosFiltrados, patrimonioTotal]);

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
                                            <Badge variant="ghost" style={{ fontSize: '10px', color: COR_INSTITUICAO[a.instituicao] ?? 'var(--color-primaria)' }}>
                                                {a.instituicao}
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
                    faixasAgregadas.length === 0 ? (
                        <Typography variant="p" style={{ textAlign: 'center', opacity: 0.5, padding: '20px', fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>
                            Nenhum vencimento para o período selecionado.
                        </Typography>
                    ) : (
                        <>
                            {/* Barra empilhada */}
                            <div style={{
                                display: 'flex', height: '10px', borderRadius: '8px',
                                overflow: 'hidden', gap: '2px', marginBottom: '28px',
                            }}>
                                {faixasAgregadas.map(f => (
                                    <div
                                        key={f.id}
                                        title={`${f.label}: ${f.pct.toFixed(1)}%`}
                                        style={{
                                            width: `${f.pct}%`, background: f.cor,
                                            borderRadius: '2px', transition: 'width 0.8s ease',
                                            minWidth: f.pct > 0 ? '4px' : '0',
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Lista de faixas */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                {faixasAgregadas.map((f, i) => (
                                    <div
                                        key={f.id}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '12px 1fr auto auto',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 0',
                                            borderBottom: i < faixasAgregadas.length - 1
                                                ? '1px solid rgba(0,0,0,0.05)' : 'none',
                                        }}
                                    >
                                        {/* Indicador de cor */}
                                        <div style={{
                                            width: '4px', height: '36px', borderRadius: '4px',
                                            background: f.cor, flexShrink: 0,
                                        }} />

                                        {/* Label + desc + barra interna */}
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '5px' }}>
                                                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-secundaria)' }}>
                                                    {f.label}
                                                </span>
                                                <span style={{ fontSize: '11px', opacity: 0.4, fontWeight: 500 }}>
                                                    {f.desc}
                                                </span>
                                            </div>
                                            <div style={{ height: '4px', width: '100%', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{
                                                    height: '100%',
                                                    width: `${Math.min(f.pct, 100)}%`,
                                                    background: f.cor,
                                                    borderRadius: '4px',
                                                    opacity: 0.7,
                                                    transition: 'width 0.8s ease',
                                                }} />
                                            </div>
                                        </div>

                                        {/* Valor */}
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-secundaria)', opacity: 0.7, whiteSpace: 'nowrap' }}>
                                            {fmt(f.value)}
                                        </span>

                                        {/* Percentagem */}
                                        <span style={{
                                            fontSize: '14px', fontWeight: 800,
                                            color: f.cor, minWidth: '48px', textAlign: 'right',
                                        }}>
                                            {f.pct.toFixed(1)}%
                                        </span>
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