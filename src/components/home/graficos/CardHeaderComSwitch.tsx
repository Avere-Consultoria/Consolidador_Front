import { Typography, Button } from 'avere-ui';
import { BarChart2, List } from 'lucide-react';

interface CardHeaderComSwitchProps {
    titulo: string;
    modoTabela: boolean;
    setModoTabela: (v: boolean) => void;
    mostrarSwitch?: boolean;
}

export function CardHeaderComSwitch({
    titulo,
    modoTabela,
    setModoTabela,
    mostrarSwitch = true
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
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    letterSpacing: 'var(--tracking-caps)',
                    margin: 0
                }}
            >
                {titulo}
            </Typography>

            {/* Novo Seletor de Modo (Botões) */}
            {mostrarSwitch && <div style={{
                display: 'flex',
                gap: '4px',
                background: 'var(--color-surface-sunken)',
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
                        color: !modoTabela ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
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
                        color: modoTabela ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        boxShadow: modoTabela ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    <List size={16} />
                </Button>
            </div>}
        </div>
    );
}