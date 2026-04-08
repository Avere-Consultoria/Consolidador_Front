import { CORES } from '../../../utils/colors';
import { fmtK } from '../../../utils/formatters';



// ── Tooltip para Gráficos de Pizza e Barras Simples ────────────────────────
export const TooltipCustom = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;

    return (
        <div style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            fontFamily: 'Montserrat, sans-serif',
        }}>
            <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                {payload[0].name}
            </div>
            <div style={{
                fontSize: '14px',
                fontWeight: 700,
                color: payload[0].fill || CORES.btg
            }}>
                {fmtK(payload[0].value)}
            </div>
            {payload[0].payload?.pct != null && (
                <div style={{ fontSize: '11px', opacity: 0.5 }}>
                    {payload[0].payload.pct.toFixed(1)}% do total
                </div>
            )}
        </div>
    );
};

// ── Tooltip para Gráficos de Barras Comparativos (Múltiplos Payloads) ──────
export const TooltipBarras = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
        <div style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            fontFamily: 'Montserrat, sans-serif',
        }}>
            <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                {label}
            </div>
            {payload.map((p: any, i: number) => (
                <div
                    key={i}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        marginBottom: '2px'
                    }}
                >
                    <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '2px',
                        background: p.fill
                    }} />
                    <span style={{ fontWeight: 600 }}>{p.name}:</span>
                    <span>{fmtK(p.value)}</span>
                </div>
            ))}
        </div>
    );
};