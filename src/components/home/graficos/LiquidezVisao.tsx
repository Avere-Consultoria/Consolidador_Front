import { useState } from 'react';
import { Card, CardContent, Typography } from 'avere-ui';
import { CardHeaderComSwitch } from './CardHeaderComSwitch';
import { fmt } from '../../../utils/formatters';

interface LiquidezVisaoProps {
    dados: { name: string; value: number; pct: number }[];
}

// ── Estilos de Tabela (Padronizados com os outros componentes) ───────────────
const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    marginTop: '8px',
    fontFamily: 'Montserrat, sans-serif'
};

const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '8px 4px',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    opacity: 0.4,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: '10px',
    letterSpacing: '0.05em'
};

const tdStyle: React.CSSProperties = {
    padding: '12px 4px',
    borderBottom: '1px solid rgba(0,0,0,0.04)',
    fontWeight: 500,
    color: '#081F28'
};

export function LiquidezVisao({ dados }: LiquidezVisaoProps) {
    const [modoTabela, setModoTabela] = useState(false);

    if (!dados || dados.length === 0) return null;

    return (
        <Card style={{ marginTop: '24px' }}>
            <CardContent style={{ padding: '24px' }}>

                {/* Cabeçalho Padronizado com Switch de Botões */}
                <CardHeaderComSwitch
                    titulo="Perfil de Liquidez"
                    modoTabela={modoTabela}
                    setModoTabela={setModoTabela}
                />


                {/* MODO TABELA */}
                {modoTabela ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Prazo de Resgate</th>
                                    <th style={thStyle}>Valor Consolidado</th>
                                    <th style={{ ...thStyle, textAlign: 'right' }}>% da Carteira</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dados.map((liq, index) => (
                                    <tr key={index}>
                                        <td style={tdStyle}>{liq.name}</td>
                                        <td style={{ ...tdStyle, fontWeight: 600 }}>{fmt(liq.value)}</td>
                                        <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: '#00B4D8' }}>
                                            {liq.pct.toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* MODO GRÁFICO (Barras Horizontais) */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {dados.map((liq, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>
                                        {liq.name}
                                    </Typography>
                                    <Typography variant="p" style={{ fontWeight: 700, fontSize: '13px', color: '#00B4D8', fontFamily: 'Montserrat, sans-serif' }}>
                                        {liq.pct.toFixed(1)}%
                                        <span style={{ opacity: 0.5, fontWeight: 400, fontSize: '11px', marginLeft: '6px', color: '#081F28' }}>
                                            ({fmt(liq.value)})
                                        </span>
                                    </Typography>
                                </div>
                                <div style={{ height: '8px', width: '100%', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            height: '100%',
                                            width: `${Math.min(liq.pct, 100)}%`,
                                            background: 'linear-gradient(90deg, #0083CB 0%, #00B4D8 100%)',
                                            borderRadius: '4px',
                                            transition: 'width 1s ease-in-out'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </CardContent>
        </Card>
    );
}