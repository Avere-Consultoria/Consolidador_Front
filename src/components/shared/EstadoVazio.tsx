import type { ElementType, ReactNode } from 'react';
import { Typography } from 'avere-ui';

interface EstadoVazioProps {
    icon: ElementType;
    titulo: string;
    dica?: string;
    acao?: ReactNode;
    /** Compacto para dentro de tabelas/cards; padrão ocupa mais respiro. */
    compacto?: boolean;
    /** Vazio POSITIVO (ficha estados-nao-ideais): 'nenhuma pendência' é
     *  conquista, não ausência — círculo verde no lugar do azul. */
    positivo?: boolean;
}

// Estado vazio padrão do sistema (ficha estados-nao-ideais: vazio informa
// o que é a área e como sair dele — nunca só "nenhum registro").
export function EstadoVazio({ icon: Icon, titulo, dica, acao, compacto, positivo }: EstadoVazioProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '6px',
            padding: compacto ? '40px 24px' : '64px 24px',
        }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                background: positivo ? 'var(--color-success-bg)' : 'var(--color-accent-subtle)',
                color: positivo ? 'var(--color-success-text)' : 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '6px',
            }}>
                <Icon size={22} strokeWidth={1.8} />
            </div>
            <Typography variant="p" style={{ fontWeight: 'var(--weight-semibold)' as any, fontSize: 'var(--text-md)', color: 'var(--color-text-primary)', margin: 0 }}>
                {titulo}
            </Typography>
            {dica && (
                <Typography variant="p" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '420px', margin: 0 }}>
                    {dica}
                </Typography>
            )}
            {acao && <div style={{ marginTop: '10px' }}>{acao}</div>}
        </div>
    );
}
