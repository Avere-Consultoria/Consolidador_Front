import { Typography, Select, Button, Badge } from 'avere-ui';
import { FileText, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fmtDate } from '../../utils/formatters';

const MESES_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
function formatarMes(mes: string): string {
    const [a, m] = mes.split('-');
    return `${MESES_PT[parseInt(m, 10) - 1]} ${a}`;
}

interface HomeHeaderProps {
    cliente: any;
    carteiraAtiva: string;
    setCarteiraAtiva: (val: string) => void;
    opcoesCarteira: { label: string; value: string }[];
    fontesRef: { label: string; dataRef?: string }[];
    onOpenGerenciarCarteiras: () => void;
    periodo: string;
    setPeriodo: (val: string) => void;
    mesesFechados: string[];
}


export function HomeHeader({
    cliente,
    carteiraAtiva,
    setCarteiraAtiva,
    opcoesCarteira,
    fontesRef,
    onOpenGerenciarCarteiras,
    periodo,
    setPeriodo,
    mesesFechados,
}: HomeHeaderProps) {
    const navigate = useNavigate();
    const fechado = periodo !== 'LIVE';
    const opcoesPeriodo = [
        { label: 'Posição atual', value: 'LIVE' },
        ...mesesFechados.map(m => ({ label: `${formatarMes(m)} (fechado)`, value: m })),
    ];

    return (
        <header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Typography variant="h1">
                        Carteira {cliente?.codigoAvere ?? '—'}
                    </Typography>
                    {mesesFechados.length > 0 && (
                        <Select
                            label="Período"
                            value={periodo}
                            onChange={setPeriodo}
                            options={opcoesPeriodo}
                        />
                    )}
                    <Select
                        label="Visão da Carteira"
                        placeholder="Selecione uma visão..."
                        value={carteiraAtiva}
                        onChange={setCarteiraAtiva}
                        options={opcoesCarteira}
                    />
                    {fechado && (
                        <Badge intent="secundaria" variant="ghost" style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Lock size={11} /> Relatório fechado · somente leitura
                        </Badge>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant="outline" onClick={() => navigate('/relatorio')}>
                        <FileText size={15} style={{ marginRight: 6 }} />
                        Exportar PDF
                    </Button>
                    <Button variant="solid" onClick={onOpenGerenciarCarteiras}>
                        + Gerir Carteiras
                    </Button>
                </div>
            </div>

            {/* Texto dinâmico com datas de referência de cada conta/fonte ativa */}
            <Typography variant="p" style={{ opacity: 0.6 }}>
                {cliente?.nome}
                {fontesRef.map(f => f.dataRef ? ` · ${f.label}: ${fmtDate(f.dataRef + 'T12:00:00Z')}` : '').join('')}
            </Typography>
        </header>
    );
}