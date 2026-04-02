import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerTitle, DrawerDescription, DrawerSeparator, Badge, Typography } from 'avere-ui';
import { fmt, fmtDate, pct } from '../../../utils/formatters';
import { CORES } from '../../../utils/colors';
import type { ConsolidatedAtivo } from '../../../hooks/useHomeMetrics';

function InfoItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div style={{ background: 'rgba(0,131,203,0.05)', borderRadius: '8px', padding: '10px 12px' }}>
            <div style={{ fontSize: '11px', opacity: 0.45, marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '14px', fontWeight: highlight ? 700 : 500, color: highlight ? 'var(--color-primaria, #0083CB)' : 'inherit' }}>{value}</div>
        </div>
    );
}

interface DrawerDetalheProps {
    ativo: ConsolidatedAtivo;
    aberto: boolean;
    onClose: (v: boolean) => void;
    patrimonioTotal: number;
}

export function DrawerDetalheConsolidado({ ativo, aberto, onClose, patrimonioTotal }: DrawerDetalheProps) {
    const corInst = ativo.instituicao === 'BTG Pactual' ? CORES.btg : CORES.xp;

    return (
        <Drawer open={aberto} onOpenChange={onClose}>
            <DrawerContent side="right">
                <DrawerHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        {ativo.subTipo && <Badge intent="primaria" variant="solid" style={{ fontSize: '12px' }}>{ativo.subTipo}</Badge>}
                        <Badge variant="ghost" style={{ fontSize: '12px', color: corInst, borderColor: corInst }}>
                            {ativo.instituicao}
                        </Badge>
                    </div>
                    <DrawerTitle>{ativo.nome}</DrawerTitle>
                    <DrawerDescription>{ativo.tipo}</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <section>
                            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '10px', letterSpacing: '0.05em' }}>Valores</Typography>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <InfoItem label="Valor Líquido" value={fmt(ativo.valorLiquido)} highlight />
                                <InfoItem label="% do Portfólio" value={`${pct(ativo.valorLiquido, patrimonioTotal).toFixed(2)}%`} />
                            </div>
                        </section>
                        <DrawerSeparator />
                        <section>
                            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '10px', letterSpacing: '0.05em' }}>Classificação</Typography>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <InfoItem label="Tipo" value={ativo.tipo} />
                                {ativo.subTipo && <InfoItem label="Subtipo" value={ativo.subTipo} />}
                                <InfoItem label="Instituição" value={ativo.instituicao} />
                            </div>
                        </section>
                        {ativo.vencimento && (
                            <>
                                <DrawerSeparator />
                                <section>
                                    <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '10px', letterSpacing: '0.05em' }}>Datas</Typography>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                        <InfoItem label="Vencimento" value={fmtDate(ativo.vencimento)} />
                                    </div>
                                </section>
                            </>
                        )}
                        <div style={{ marginTop: '8px', padding: '12px', background: 'rgba(0,131,203,0.05)', borderRadius: '8px', fontSize: '12px', opacity: 0.6, lineHeight: 1.5 }}>
                            Para ver todos os detalhes deste ativo, aceda à página <strong>{ativo.instituicao === 'BTG Pactual' ? 'BTG API' : 'XP API'}</strong>.
                        </div>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}