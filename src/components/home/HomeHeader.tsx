import { Typography, Select, Button } from 'avere-ui';
import { fmtDate } from '../../utils/formatters';

interface HomeHeaderProps {
    cliente: any; // Podes tipar melhor com a interface do teu ClientContext depois
    carteiraAtiva: string;
    setCarteiraAtiva: (val: string) => void;
    opcoesCarteira: { label: string; value: string }[];
    dataRefBtg?: string;
    dataRefXp?: string;
    onOpenGerenciarCarteiras: () => void;
}

export function HomeHeader({
    cliente,
    carteiraAtiva,
    setCarteiraAtiva,
    opcoesCarteira,
    dataRefBtg,
    dataRefXp,
    onOpenGerenciarCarteiras
}: HomeHeaderProps) {
    return (
        <header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Typography variant="h1">
                        Carteira {cliente?.codigoAvere ?? '—'}
                    </Typography>
                    <Select
                        label="Visão da Carteira"
                        placeholder="Selecione uma visão..."
                        value={carteiraAtiva}
                        onChange={setCarteiraAtiva}
                        options={opcoesCarteira}
                    />
                </div>
                <div>
                    <Button variant="solid" onClick={onOpenGerenciarCarteiras}>
                        + Gerir Carteiras
                    </Button>
                </div>
            </div>
            <Typography variant="p" style={{ opacity: 0.6 }}>
                {cliente?.nome}
                {dataRefBtg && ` · BTG: ${fmtDate(dataRefBtg + 'T12:00:00Z')}`}
                {dataRefXp && ` · XP: ${fmtDate(dataRefXp + 'T12:00:00Z')}`}
            </Typography>
        </header>
    );
}