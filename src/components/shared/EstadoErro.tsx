import { AlertTriangle, WifiOff, RotateCw } from 'lucide-react';
import { Typography, Button } from 'avere-ui';

interface EstadoErroProps {
    titulo?: string;
    /** O que o usuário perde com essa falha (nunca jargão técnico). */
    dica?: string;
    onRetry?: () => void;
    /** Compacto para dentro de um card; padrão ocupa a área da tela. */
    compacto?: boolean;
    /** Sem conexão: tom de aviso (âmbar), ícone de wifi e sem botão —
     *  o TanStack retoma sozinho quando a rede volta. */
    offline?: boolean;
}

// Estado de ERRO DE CARGA padrão (ficha estados-nao-ideais): mora NA TELA e
// oferece saída (tentar de novo). Toast é para feedback de AÇÃO — ele some em
// segundos e deixaria a tela quebrada sem explicação.
export function EstadoErro({
    titulo = 'Não conseguimos carregar os dados',
    dica = 'Pode ser uma instabilidade momentânea de conexão.',
    onRetry,
    compacto,
    offline,
}: EstadoErroProps) {
    const Icone = offline ? WifiOff : AlertTriangle;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '6px',
            padding: compacto ? '40px 24px' : '80px 24px',
        }} role="alert">
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                background: offline ? 'var(--color-warning-bg)' : 'var(--color-danger-bg)',
                color: offline ? 'var(--color-warning-text)' : 'var(--color-danger-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '6px',
            }}>
                <Icone size={22} strokeWidth={1.8} />
            </div>
            <Typography variant="p" style={{ fontWeight: 'var(--weight-semibold)' as any, fontSize: 'var(--text-md)', color: 'var(--color-text-primary)', margin: 0 }}>
                {titulo}
            </Typography>
            <Typography variant="p" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '420px', margin: 0 }}>
                {dica}
            </Typography>
            {onRetry && (
                <div style={{ marginTop: '12px' }}>
                    <Button variant="outline" onClick={onRetry}>
                        <RotateCw size={15} style={{ marginRight: 6 }} /> Tentar de novo
                    </Button>
                </div>
            )}
        </div>
    );
}
