import { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerTitle, DrawerDescription, DrawerSeparator, Typography, Badge, Button } from 'avere-ui';
import { supabase } from '../../../services/supabase';
import { CORES } from '../../../utils/colors';
import type { CarteiraPersonalizada } from '../../../hooks/useHomeMetrics';
import { ModalCriarCarteira } from './ModalCriarCarteira';

interface DrawerGerenciarCarteirasProps {
    aberto: boolean;
    onClose: () => void;
    temBtg: boolean;
    temXp: boolean;
    clienteId: string | null;
}

export function DrawerGerenciarCarteiras({ aberto, onClose, temBtg, temXp, clienteId }: DrawerGerenciarCarteirasProps) {
    const temAlguma = temBtg || temXp;
    const [carteiras, setCarteiras] = useState<CarteiraPersonalizada[]>([]);
    const [modalCriarAberto, setModalCriarAberto] = useState(false);

    useEffect(() => {
        async function fetchCarteiras() {
            if (!clienteId) return;
            const { data } = await supabase
                .from('carteiras_personalizadas')
                .select('id, nome, instituicoes, criada_em')
                .eq('cliente_id', clienteId)
                .order('criada_em', { ascending: true });
            if (data) setCarteiras(data);
        }
        if (aberto) fetchCarteiras();
    }, [aberto, clienteId]);

    function handleCarteiraCriada(nova: CarteiraPersonalizada) {
        setCarteiras(prev => [...prev, nova]);
        setModalCriarAberto(false);
    }

    const labelStyle: React.CSSProperties = { fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.4, marginBottom: '8px' };
    const itemStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.03)', marginBottom: '6px' };
    const dotStyle = (cor: string): React.CSSProperties => ({ width: 8, height: 8, borderRadius: '50%', background: cor, flexShrink: 0 });
    const corInstituicao: Record<string, string> = { BTG: CORES.btg, XP: CORES.xp };

    return (
        <>
            <Drawer open={aberto} onOpenChange={onClose}>
                <DrawerContent side="right">
                    <DrawerHeader>
                        <DrawerTitle>Carteiras</DrawerTitle>
                        <DrawerDescription>Gere as carteiras vinculadas a este cliente.</DrawerDescription>
                    </DrawerHeader>

                    <DrawerBody>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <section>
                                <Typography variant="p" style={labelStyle}>Carteiras padrão</Typography>
                                {temAlguma && (
                                    <div style={itemStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={dotStyle('var(--color-primaria, #0083CB)')} />
                                            <div>
                                                <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>Consolidada</Typography>
                                                <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>Visão unificada de todas as corretoras</Typography>
                                            </div>
                                        </div>
                                        <Badge variant="ghost" style={{ fontSize: '10px', opacity: 0.5 }}>Padrão</Badge>
                                    </div>
                                )}
                                {temBtg && (
                                    <div style={itemStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={dotStyle(CORES.btg)} />
                                            <div>
                                                <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>BTG Pactual</Typography>
                                                <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>Posição BTG sincronizada</Typography>
                                            </div>
                                        </div>
                                        <Badge variant="ghost" style={{ fontSize: '10px', opacity: 0.5 }}>Padrão</Badge>
                                    </div>
                                )}
                                {temXp && (
                                    <div style={itemStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={dotStyle(CORES.xp)} />
                                            <div>
                                                <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>XP Investimentos</Typography>
                                                <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>Posição XP sincronizada</Typography>
                                            </div>
                                        </div>
                                        <Badge variant="ghost" style={{ fontSize: '10px', opacity: 0.5 }}>Padrão</Badge>
                                    </div>
                                )}
                            </section>

                            <DrawerSeparator />

                            <section>
                                <Typography variant="p" style={labelStyle}>Carteiras personalizadas</Typography>
                                {carteiras.length === 0 ? (
                                    <div style={{ padding: '24px 16px', textAlign: 'center', borderRadius: '10px', border: '1.5px dashed rgba(0,0,0,0.12)', marginBottom: '12px' }}>
                                        <Typography variant="p" style={{ fontSize: '13px', opacity: 0.4 }}>Nenhuma carteira personalizada criada ainda.</Typography>
                                    </div>
                                ) : (
                                    <div style={{ marginBottom: '12px' }}>
                                        {carteiras.map(c => (
                                            <div key={c.id} style={itemStyle}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ display: 'flex', gap: '3px' }}>
                                                        {c.instituicoes.map(inst => <div key={inst} style={dotStyle(corInstituicao[inst] ?? '#6B7280')} />)}
                                                    </div>
                                                    <div>
                                                        <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>{c.nome}</Typography>
                                                        <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>{c.instituicoes.join(' + ')}</Typography>
                                                    </div>
                                                </div>
                                                <Badge variant="ghost" style={{ fontSize: '10px' }}>Personalizada</Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <Button variant="outline" style={{ width: '100%' }} onClick={() => setModalCriarAberto(true)}>
                                    + Criar nova carteira
                                </Button>
                            </section>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {clienteId && (
                <ModalCriarCarteira
                    aberto={modalCriarAberto}
                    onClose={() => setModalCriarAberto(false)}
                    temBtg={temBtg}
                    temXp={temXp}
                    clienteId={clienteId}
                    onCriada={handleCarteiraCriada}
                />
            )}
        </>
    );
}