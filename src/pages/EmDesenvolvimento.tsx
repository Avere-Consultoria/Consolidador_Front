import { Typography } from 'avere-ui';
import { Construction } from 'lucide-react';

export default function EmDesenvolvimento() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '64px 32px',
        textAlign: 'center',
      }}
    >
      <Construction size={48} style={{ opacity: 0.3 }} />
      <Typography variant="h2">Módulo em Construção</Typography>
      <Typography variant="p" style={{ opacity: 0.5, maxWidth: '400px' }}>
        Este módulo ainda está sendo desenvolvido. Volte em breve para novidades!
      </Typography>
    </div>
  );
}
