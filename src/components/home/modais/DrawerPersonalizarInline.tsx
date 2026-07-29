import { useState, useEffect } from 'react';
import { Spinner, toast } from 'avere-ui';
import { supabase } from '../../../services/supabase';
import { useClient } from '../../../contexts/ClientContext';
import { DrawerRegra } from '../../personalizarAtivos/DrawerRegra';
import type { AtivoCanonicoOption } from '../../../pages/PersonalizarAtivos';

// Identidade crua para criar o rascunho quando o ativo ainda não tem canônico.
export interface RascunhoInfo {
    nome: string;
    codigo: string;
    tipo: string;   // ISIN | TICKER | CNPJ | CODIGO
    base: string;   // BTG | XP | AVENUE | AGORA | MANUAL
    posicaoId: string;
    subTipo?: string | null;
}

interface Props {
    canonicoId?: string;      // modo: ativo já tem canônico
    rascunho?: RascunhoInfo;  // modo: criar rascunho ao salvar
    onClose: () => void;
    onSaved?: () => void;         // recarga leve (só exceções)
    onSavedRascunho?: () => void; // recarga completa (a posição mudou de canônico)
}

const RASCUNHO_ID = '__rascunho__';

// Atalho "Personalizar classificação" do drawer de posição da carteira.
// Carrega só o necessário para ESTE ativo e reusa o DrawerRegra em modo focado
// (ativo travado via `regraEdicao` semente). Se o ativo não tem canônico, cria
// um rascunho no ato de salvar e pendura a exceção nele.
export function DrawerPersonalizarInline({ canonicoId, rascunho, onClose, onSaved, onSavedRascunho }: Props) {
    const { selectedClient, consultorPerfilId } = useClient();

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [canonico, setCanonico] = useState<AtivoCanonicoOption | null>(null);
    const [emissores, setEmissores] = useState<{ id: string; nome_fantasia: string }[]>([]);
    const [classes, setClasses] = useState<string[]>([]);
    const [regraEdicao, setRegraEdicao] = useState<any | null>(null);

    useEffect(() => {
        let vivo = true;
        (async () => {
            setCarregando(true);
            try {
                const [emissoresRes, classesRes] = await Promise.all([
                    supabase.from('dicionario_emissores').select('id, nome_fantasia').order('nome_fantasia'),
                    supabase.from('dicionario_classes').select('nome').order('ordem_exibicao'),
                ]);
                if (!vivo) return;
                if (emissoresRes.data) setEmissores(emissoresRes.data);
                if (classesRes.data) setClasses(classesRes.data.map((r: any) => r.nome));

                if (rascunho) {
                    // Casca sintética: ativo travado pelo nome cru; classe/emissor em branco.
                    setCanonico({
                        id: RASCUNHO_ID, nome_canonico: rascunho.nome,
                        classe_avere: null, liquidez_avere: null, data_vencimento: null,
                        emissor_id: null, sub_tipo_canonico: rascunho.subTipo ?? null,
                        taxa_canonica: null, taxa_formatada: null, benchmark_canonico: null,
                        instituicoes_visoes: [], identificador_exibicao: '', visoes: [],
                    });
                    setRegraEdicao({ ativo_canonico_id: RASCUNHO_ID, cliente_id: null });
                    return;
                }

                // Modo canônico existente
                const [canonRes, excecaoRes] = await Promise.all([
                    supabase.from('ativos_canonicos')
                        .select('id, nome_canonico, classe_avere, liquidez_avere, data_vencimento, emissor_id, sub_tipo_canonico, taxa_canonica, taxa_formatada, benchmark_canonico')
                        .eq('id', canonicoId).single(),
                    consultorPerfilId
                        ? supabase.from('excecoes_classificacao').select('*')
                            .eq('consultor_id', consultorPerfilId)
                            .eq('ativo_canonico_id', canonicoId)
                            .is('cliente_id', null).maybeSingle()
                        : Promise.resolve({ data: null, error: null }),
                ]);
                if (!vivo) return;

                if (canonRes.data) {
                    const c: any = canonRes.data;
                    setCanonico({
                        id: c.id, nome_canonico: c.nome_canonico,
                        classe_avere: c.classe_avere, liquidez_avere: c.liquidez_avere,
                        data_vencimento: c.data_vencimento, emissor_id: c.emissor_id,
                        sub_tipo_canonico: c.sub_tipo_canonico, taxa_canonica: c.taxa_canonica,
                        taxa_formatada: c.taxa_formatada, benchmark_canonico: c.benchmark_canonico,
                        instituicoes_visoes: [], identificador_exibicao: '', visoes: [],
                    });
                }
                setRegraEdicao(excecaoRes.data ?? { ativo_canonico_id: canonicoId, cliente_id: null });
            } catch (err) {
                console.error(err);
                toast.error('Erro ao carregar o ativo para personalização.');
                onClose();
            } finally {
                if (vivo) setCarregando(false);
            }
        })();
        return () => { vivo = false; };
    }, [canonicoId, rascunho, consultorPerfilId]);

    const handleSave = async (payload: any, editId: string | null) => {
        if (!consultorPerfilId) {
            toast.error('Selecione um consultor no topo para personalizar.');
            return;
        }
        setSalvando(true);
        try {
            let canonicoAlvo = payload.ativo_canonico_id;

            // Modo rascunho: cria a casca no ato e pendura a exceção nela.
            if (rascunho && canonicoAlvo === RASCUNHO_ID) {
                const { data, error } = await supabase.rpc('criar_canonico_rascunho', {
                    p_nome: rascunho.nome,
                    p_codigo: rascunho.codigo,
                    p_tipo: rascunho.tipo,
                    p_base: rascunho.base,
                    p_posicao_id: rascunho.posicaoId,
                    p_sub_tipo: rascunho.subTipo ?? null,
                });
                if (error) throw error;
                canonicoAlvo = (data as any)?.canonico_id;
                if (!canonicoAlvo) throw new Error('RPC não retornou canonico_id');
            }

            const payloadFinal = { ...payload, ativo_canonico_id: canonicoAlvo, consultor_id: consultorPerfilId };
            if (editId) {
                const { error } = await supabase.from('excecoes_classificacao').update(payloadFinal).eq('id', editId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('excecoes_classificacao').insert([payloadFinal]);
                if (error) throw error;
            }

            toast.success(rascunho ? 'Rascunho criado e personalizado.' : (editId ? 'Personalização atualizada.' : 'Personalização criada.'));
            if (rascunho) onSavedRascunho?.(); else onSaved?.();
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.message ? `Erro: ${err.message}` : 'Erro ao guardar a personalização.');
        } finally {
            setSalvando(false);
        }
    };

    const handleDelete = async (id: string) => {
        setSalvando(true);
        try {
            const { error } = await supabase.from('excecoes_classificacao').delete().eq('id', id);
            if (error) throw error;
            toast.success('Personalização removida.');
            onSaved?.();
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error('Erro ao remover a personalização.');
        } finally {
            setSalvando(false);
        }
    };

    if (carregando || !canonico) {
        return (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,31,40,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <DrawerRegra
            isOpen
            onClose={onClose}
            onSave={handleSave}
            onDelete={handleDelete}
            salvando={salvando}
            regraEdicao={regraEdicao}
            canonicos={[canonico]}
            emissores={emissores}
            classesDisponiveis={classes}
            clientes={selectedClient ? [{ id: selectedClient.id, nome: selectedClient.nome }] : []}
            aviso={rascunho
                ? 'Este ativo ainda não tem cadastro canônico. Ao salvar, criamos um rascunho provisório (só pra você, marcado para curadoria do master) e aplicamos sua personalização. O master finaliza depois em Pendências.'
                : undefined}
        />
    );
}
