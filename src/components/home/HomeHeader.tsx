import { useState } from 'react';
import { Typography, Select, Button, Badge } from 'avere-ui';
import { FileText, Lock, Calendar, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fmtDate } from '../../utils/formatters';
import { ModalEnvioPDF } from './modais/ModalEnvioPDF';

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
    const [modalPdf, setModalPdf] = useState(false);
    const fechado = periodo !== 'LIVE';
    const opcoesPeriodo = [
        { label: 'Posição atual', value: 'LIVE' },
        ...mesesFechados.map(m => ({ label: `${formatarMes(m)} (fechado)`, value: m })),
    ];

    // Data de referência consolidada = o FECHAMENTO que a carteira representa.
    // BTG e XP são D0; sincronizados de manhã, ambos refletem o último fechamento —
    // só rotulam diferente (BTG a abertura do dia D, XP o close de D-1). Não estão
    // descasados. A data honesta é a mais antiga entre as fontes (o close que todas
    // alcançam); a XP, que rotula pelo close, ancora isso.
    const refs = fontesRef.map(f => f.dataRef).filter(Boolean) as string[];
    const dataRef = refs.length ? refs.reduce((a, b) => (b < a ? b : a)) : null;

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
                    <Button variant="outline" onClick={() => setModalPdf(true)} disabled={!cliente?.id}>
                        <Upload size={15} style={{ marginRight: 6 }} />
                        Enviar arquivos
                    </Button>
                    <Button variant="solid" onClick={onOpenGerenciarCarteiras}>
                        + Gerir Carteiras
                    </Button>
                </div>
            </div>

            {/* Carimbo único: o FECHAMENTO que a carteira representa (não o dia do sync). */}
            <div style={{ opacity: 0.6, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {cliente?.nome}
                {dataRef && !fechado && (
                    <Badge intent="secundaria" variant="ghost"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                        <Calendar size={12} /> Posição de {fmtDate(dataRef + 'T12:00:00Z')}
                    </Badge>
                )}
            </div>

            <ModalEnvioPDF aberto={modalPdf} onClose={() => setModalPdf(false)} cliente={cliente} />
        </header>
    );
}