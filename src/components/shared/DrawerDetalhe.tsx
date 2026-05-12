import { Typography } from 'avere-ui';

interface DetalheItemProps {
    label: string;
    value: string;
    highlight?: boolean;
    mono?: boolean;
    fullWidth?: boolean;
    accentColor?: string;
}

export function DetalheItem({
    label, value, highlight = false, mono = false, fullWidth = false,
    accentColor = 'var(--color-primaria)',
}: DetalheItemProps) {
    return (
        <div style={{
            background: `color-mix(in srgb, ${accentColor} 5%, transparent)`,
            borderRadius: '8px',
            padding: '10px 12px',
            gridColumn: fullWidth ? '1 / -1' : undefined,
        }}>
            <div style={{ fontSize: '11px', opacity: 0.45, marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>
                {label}
            </div>
            <div style={{
                fontSize: '14px',
                fontWeight: highlight ? 700 : 500,
                wordBreak: 'break-all',
                color: highlight ? accentColor : 'inherit',
                fontFamily: mono ? 'monospace' : 'inherit',
            }}>
                {value}
            </div>
        </div>
    );
}

export function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
    return (
        <section style={{ marginBottom: '4px' }}>
            <Typography variant="p" style={{
                fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', opacity: 0.4,
                marginBottom: '10px', letterSpacing: '0.05em'
            }}>
                {titulo}
            </Typography>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {children}
            </div>
        </section>
    );
}
