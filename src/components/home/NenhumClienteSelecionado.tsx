import { Typography } from 'avere-ui';
import { UserSearch, ArrowUpRight } from 'lucide-react';

export function NenhumClienteSelecionado() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            padding: '40px',
            animation: 'fadeIn 0.5s ease-in-out'
        }}>

            {/* Ícone de Destaque */}
            <div style={{
                width: '88px',
                height: '88px',
                background: 'rgba(0, 131, 203, 0.05)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0083CB',
                marginBottom: '24px',
                border: '8px solid rgba(0, 131, 203, 0.02)'
            }}>
                <UserSearch size={40} strokeWidth={1.5} />
            </div>

            {/* Textos Principais */}
            <Typography variant="h2" style={{ fontSize: '24px', color: '#081F28', marginBottom: '12px' }}>
                Nenhum cliente selecionado
            </Typography>

            <Typography variant="p" style={{ fontSize: '16px', color: '#6B7280', maxWidth: '460px', lineHeight: '1.5' }}>
                Para visualizar as carteiras, selecione um cliente no menu superior.
            </Typography>

            {/* Indicador Visual (A apontar metaforicamente para o topo) */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '32px',
                background: 'rgba(0, 131, 203, 0.08)',
                padding: '10px 20px',
                borderRadius: '100px',
                color: '#0083CB'
            }}>
                <Typography variant="p" style={{ fontSize: '14px', fontWeight: 600 }}>
                    Utilize o seletor no topo da página
                </Typography>
                <ArrowUpRight size={18} />
            </div>

            {/* Pequena injeção de CSS para a animação suave */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

        </div>
    );
}