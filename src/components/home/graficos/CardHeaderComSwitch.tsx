import { Typography, Button } from 'avere-ui';
import { BarChart2, List } from 'lucide-react';

interface CardHeaderComSwitchProps {
    titulo: string;
    modoTabela: boolean;
    setModoTabela: (v: boolean) => void;
}

export function CardHeaderComSwitch({
    titulo,
    modoTabela,
    setModoTabela
}: CardHeaderComSwitchProps) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
        }}>
            <Typography
                variant="p"
                style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    opacity: 0.4,
                    letterSpacing: '0.05em',
                    margin: 0
                }}
            >
                {titulo}
            </Typography>

            {/* Novo Seletor de Modo (Botões) */}
            <div style={{
                display: 'flex',
                gap: '4px',
                background: 'rgba(0,0,0,0.05)',
                padding: '4px',
                borderRadius: '8px'
            }}>
                <Button
                    variant={!modoTabela ? 'solid' : 'ghost'}
                    onClick={() => setModoTabela(false)}
                    style={{
                        height: '32px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        background: !modoTabela ? '#fff' : 'transparent',
                        color: !modoTabela ? '#081F28' : '#6B7280',
                        boxShadow: !modoTabela ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    <BarChart2 size={16} />
                </Button>

                <Button
                    variant={modoTabela ? 'solid' : 'ghost'}
                    onClick={() => setModoTabela(true)}
                    style={{
                        height: '32px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        background: modoTabela ? '#fff' : 'transparent',
                        color: modoTabela ? '#081F28' : '#6B7280',
                        boxShadow: modoTabela ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    <List size={16} />
                </Button>
            </div>
        </div>
    );
}