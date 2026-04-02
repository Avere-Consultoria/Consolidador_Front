import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Button, Typography } from 'avere-ui';
import { supabase } from '../../../services/supabase';
import { CORES } from '../../../utils/colors';
import type { CarteiraPersonalizada } from '../../../hooks/useHomeMetrics';

interface ModalCriarCarteiraProps {
    aberto: boolean;
    onClose: () => void;
    temBtg: boolean;
    temXp: boolean;
    clienteId: string;
    onSalva: (carteira: CarteiraPersonalizada, editando: boolean) => void;
    carteiraEditando?: CarteiraPersonalizada | null; // <-- Nova prop
}

export function ModalCriarCarteira({ aberto, onClose, temBtg, temXp, clienteId, onSalva, carteiraEditando }: ModalCriarCarteiraProps) {
    const [nome, setNome] = useState('');
    const [selecionadas, setSelecionadas] = useState<string[]>([]);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    // Preenche o formulário se for edição, ou limpa se for criação
    useEffect(() => {
        if (aberto) {
            if (carteiraEditando) {
                setNome(carteiraEditando.nome);
                setSelecionadas(carteiraEditando.instituicoes);
            } else {
                setNome('');
                setSelecionadas([]);
            }
            setErro('');
        }
    }, [aberto, carteiraEditando]);

    const instituicoesDisponiveis = [
        temBtg && { key: 'BTG', label: 'BTG Pactual', cor: CORES.btg, desc: 'Posição sincronizada via API' },
        temXp && { key: 'XP', label: 'XP Investimentos', cor: CORES.xp, desc: 'Posição sincronizada via API' },
    ].filter(Boolean) as { key: string; label: string; cor: string; desc: string }[];

    function toggleInstituicao(key: string) {
        setSelecionadas(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    }

    async function handleSalvar() {
        if (!nome.trim()) { setErro('Dê um nome para a carteira.'); return; }
        if (selecionadas.length === 0) { setErro('Selecione ao menos uma instituição.'); return; }

        setSalvando(true);
        setErro('');

        try {
            let result;

            if (carteiraEditando) {
                // Fluxo de Edição (UPDATE)
                result = await supabase
                    .from('carteiras_personalizadas')
                    .update({ nome: nome.trim(), instituicoes: selecionadas })
                    .eq('id', carteiraEditando.id)
                    .select('id, nome, instituicoes, criada_em')
                    .single();
            } else {
                // Fluxo de Criação (INSERT)
                result = await supabase
                    .from('carteiras_personalizadas')
                    .insert({ cliente_id: clienteId, nome: nome.trim(), instituicoes: selecionadas })
                    .select('id, nome, instituicoes, criada_em')
                    .single();
            }

            if (result.error) throw result.error;
            onSalva(result.data, !!carteiraEditando);
        } catch (e: any) {
            setErro('Erro ao guardar. Tente novamente.');
            console.error(e);
        } finally {
            setSalvando(false);
        }
    }

    const podeCriar = nome.trim().length > 0 && selecionadas.length > 0 && !salvando;
    const titulo = carteiraEditando ? 'Editar carteira' : 'Nova carteira personalizada';
    const textoBotao = salvando ? 'A guardar...' : (carteiraEditando ? 'Guardar alterações' : 'Criar carteira');

    return (
        <Modal open={aberto} onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>{titulo}</ModalTitle>
                    <ModalDescription>
                        {carteiraEditando
                            ? 'Altere o nome ou as instituições vinculadas a esta carteira.'
                            : 'Escolha um nome e selecione as instituições que farão parte desta carteira.'}
                    </ModalDescription>
                </ModalHeader>

                <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                            Nome da carteira
                        </label>
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Ex: BTG + Itaú"
                            maxLength={60}
                            style={{
                                width: '100%', boxSizing: 'border-box', padding: '10px 14px', fontSize: '14px',
                                fontFamily: 'Montserrat, sans-serif', border: '1.5px solid rgba(0,0,0,0.15)',
                                borderRadius: '8px', outline: 'none', background: 'transparent', transition: 'border-color 0.15s',
                            }}
                            onFocus={e => (e.target.style.borderColor = 'var(--color-primaria, #0083CB)')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.15)')}
                        />
                    </div>

                    <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                            Instituições
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {instituicoesDisponiveis.map(inst => {
                                const ativa = selecionadas.includes(inst.key);
                                return (
                                    <div
                                        key={inst.key}
                                        onClick={() => toggleInstituicao(inst.key)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                                            borderRadius: '10px', cursor: 'pointer', border: `1.5px solid ${ativa ? inst.cor : 'rgba(0,0,0,0.1)'}`,
                                            background: ativa ? `${inst.cor}0D` : 'transparent', transition: 'all 0.15s', userSelect: 'none',
                                        }}
                                    >
                                        <div style={{
                                            width: 18, height: 18, borderRadius: '5px', flexShrink: 0,
                                            border: `2px solid ${ativa ? inst.cor : 'rgba(0,0,0,0.2)'}`, background: ativa ? inst.cor : 'transparent',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                                        }}>
                                            {ativa && (
                                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: inst.cor, flexShrink: 0 }} />
                                        <div>
                                            <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>{inst.label}</Typography>
                                            <Typography variant="p" style={{ fontSize: '11px', opacity: 0.45 }}>{inst.desc}</Typography>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {erro && <Typography variant="p" style={{ fontSize: '12px', color: '#EF4444' }}>{erro}</Typography>}
                </div>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose} disabled={salvando}>Cancelar</Button>
                    <Button variant="solid" onClick={handleSalvar} disabled={!podeCriar}>
                        {textoBotao}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}