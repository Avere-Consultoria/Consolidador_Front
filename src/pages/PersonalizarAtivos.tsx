import { useState, useEffect, useMemo } from 'react';
import { Typography, Card, Button, DataTable, Spinner, Badge, toast } from 'avere-ui';
import { SlidersHorizontal, Plus, Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ModalNovaRegra } from '../components/personalizarAtivos/ModalNovaRegra';

// ── Tipos ─────────────────────────────────────────────────────────────────

export interface AtivoCanonicoOption {
    id: string;
    nome_canonico: string;
    classe_avere: string | null;
    liquidez_avere: string | null;
    data_vencimento: string | null;
    emissor_id: string | null;
    instituicoes_visoes: string[];     // ex: ['BTG','XP']
    identificador_exibicao: string;    // primeiro código (ex: ISIN ou ticker) pra busca
}

interface Excecao {
    id: string;
    cliente_id: string | null;
    ativo_canonico_id: string;
    apelido_ativo: string | null;
    classe_customizada: string | null;
    liquidez_customizada: string | null;
    vencimento_customizado: string | null;
    emissor_customizado_id: string | null;
    // Campos derivados (do canônico) para exibição
    canonico_nome?:        string;
    canonico_classe?:      string | null;
    canonico_liquidez?:    string | null;
    canonico_vencimento?:  string | null;
    canonico_emissor_id?:  string | null;
}

interface Cliente {
    id: string;
    nome: string;
}

export default function PersonalizarAtivos() {
    const { perfil } = useAuth();
    const [loading, setLoading]   = useState(true);
    const [salvando, setSalvando] = useState(false);

    // Dados
    const [regras, setRegras]                           = useState<Excecao[]>([]);
    const [canonicos, setCanonicos]                     = useState<AtivoCanonicoOption[]>([]);
    const [classesDisponiveis, setClassesDisponiveis]   = useState<string[]>([]);
    const [clientes, setClientes]                       = useState<Cliente[]>([]);
    const [emissores, setEmissores]                     = useState<{ id: string; nome_fantasia: string }[]>([]);

    // Controlo do Modal
    const [isModalOpen, setIsModalOpen]   = useState(false);
    const [regraEdicao, setRegraEdicao]   = useState<Excecao | null>(null);

    const fetchData = async () => {
        if (!perfil) return;
        setLoading(true);
        try {
            const [clientesRes, canonicosRes, dicionarioRes, classRes, regrasRes, emissoresRes] = await Promise.all([
                supabase.from('clientes').select('id, nome').order('nome'),
                supabase.from('ativos_canonicos').select('id, nome_canonico, classe_avere, liquidez_avere, data_vencimento, emissor_id').order('nome_canonico'),
                supabase.from('dicionario_ativos').select('ativo_canonico_id, instituicao_origem, codigo_identificador'),
                supabase.from('dicionario_classes').select('nome').order('ordem_exibicao'),
                supabase.from('excecoes_classificacao').select('*').eq('consultor_id', perfil.id),
                supabase.from('dicionario_emissores').select('id, nome_fantasia').order('nome_fantasia'),
            ]);

            if (clientesRes.data)  setClientes(clientesRes.data);
            if (classRes.data)     setClassesDisponiveis(classRes.data.map(c => c.nome));
            if (emissoresRes.data) setEmissores(emissoresRes.data);

            // Agrega visões institucionais por canonico (pra exibir busca + badges)
            const visoesPorCanonico = new Map<string, { instituicoes: Set<string>; primeiroCodigo: string | null }>();
            (dicionarioRes.data || []).forEach((d: any) => {
                if (!d.ativo_canonico_id) return;
                const atual = visoesPorCanonico.get(d.ativo_canonico_id) ?? { instituicoes: new Set<string>(), primeiroCodigo: null };
                atual.instituicoes.add(d.instituicao_origem);
                if (!atual.primeiroCodigo) atual.primeiroCodigo = d.codigo_identificador;
                visoesPorCanonico.set(d.ativo_canonico_id, atual);
            });

            const canonicosLista: AtivoCanonicoOption[] = (canonicosRes.data || []).map((c: any) => {
                const v = visoesPorCanonico.get(c.id);
                return {
                    ...c,
                    instituicoes_visoes:    v ? Array.from(v.instituicoes) : [],
                    identificador_exibicao: v?.primeiroCodigo ?? '',
                };
            });
            setCanonicos(canonicosLista);

            // Enriquece exceções com dados do canônico
            if (regrasRes.data) {
                const canonicosMap = new Map(canonicosLista.map(c => [c.id, c]));
                const regrasCompletas = regrasRes.data.map(r => {
                    const c = canonicosMap.get(r.ativo_canonico_id);
                    return {
                        ...r,
                        canonico_nome:       c?.nome_canonico ?? 'Canônico não encontrado',
                        canonico_classe:     c?.classe_avere  ?? null,
                        canonico_liquidez:   c?.liquidez_avere ?? null,
                        canonico_vencimento: c?.data_vencimento ?? null,
                        canonico_emissor_id: c?.emissor_id ?? null,
                    };
                });
                setRegras(regrasCompletas);
            }
        } catch (err) {
            console.error('Erro ao carregar dados:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [perfil?.id]);

    const emissoresMap = useMemo(() => new Map(emissores.map(e => [e.id, e.nome_fantasia])), [emissores]);

    const openNewModal = () => {
        setRegraEdicao(null);
        setIsModalOpen(true);
    };

    const openEditModal = (regra: Excecao) => {
        setRegraEdicao(regra);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        toast('Excluir esta regra de personalização?', {
            action: { label: 'Excluir', onClick: async () => {
                const { error } = await supabase.from('excecoes_classificacao').delete().eq('id', id);
                if (error) { toast.error('Erro ao excluir regra.'); return; }
                toast.success('Regra excluída com sucesso.');
                fetchData();
            }},
            cancel: { label: 'Cancelar', onClick: () => {} },
        });
    };

    const handleSaveRegra = async (payload: any, editId: string | null) => {
        setSalvando(true);
        try {
            const payloadFinal = { ...payload, consultor_id: perfil!.id };
            if (editId) {
                const { error } = await supabase.from('excecoes_classificacao').update(payloadFinal).eq('id', editId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('excecoes_classificacao').insert([payloadFinal]);
                if (error) throw error;
            }
            setIsModalOpen(false);
            toast.success(editId ? 'Regra atualizada com sucesso.' : 'Nova regra criada com sucesso.');
            fetchData();
        } catch (err: any) {
            console.error(err);
            toast.error('Erro ao guardar as alterações.');
        } finally {
            setSalvando(false);
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ background: 'rgba(0, 131, 203, 0.1)', padding: '8px', borderRadius: '8px' }}>
                            <SlidersHorizontal size={24} color="var(--color-primaria)" />
                        </div>
                        <Typography variant="h1" style={{ fontWeight: 700, fontSize: '24px' }}>Personalizar Ativos</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontSize: '14px' }}>
                        Crie exceções de nomenclatura e classificação para carteiras específicas ou globais.
                    </Typography>
                </div>
                <Button variant="solid" onClick={openNewModal}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> Nova Regra
                </Button>
            </header>

            <Card style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <DataTable
                    data={regras}
                    columns={[
                        {
                            header: 'Ativo (Master / Personalizado)',
                            accessorKey: 'apelido_ativo',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '4px 0' }}>
                                    <Typography variant="p" style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                                        {item.canonico_nome}
                                    </Typography>
                                    <Typography variant="p" style={{ fontSize: '14px', color: 'var(--color-primaria)', fontWeight: 700 }}>
                                        {item.apelido_ativo || <span style={{ opacity: 0.4, fontWeight: 500, fontStyle: 'italic' }}>Nome original mantido</span>}
                                    </Typography>
                                </div>
                            )
                        },
                        {
                            header: 'Classe',
                            accessorKey: 'classe_customizada',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="p" style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 700, textTransform: 'uppercase' }}>
                                        {item.canonico_classe || '—'}
                                    </Typography>
                                    <Typography variant="p" style={{ fontSize: '13px', color: item.classe_customizada ? 'var(--color-secundaria)' : '#9CA3AF', fontWeight: 600 }}>
                                        {item.classe_customizada || 'Sem alteração'}
                                    </Typography>
                                </div>
                            )
                        },
                        {
                            header: 'Liquidez',
                            accessorKey: 'liquidez_customizada',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="p" style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>
                                        {item.canonico_liquidez ? `D+${item.canonico_liquidez}` : '—'}
                                    </Typography>
                                    <Typography variant="p" style={{ fontSize: '13px', color: item.liquidez_customizada ? 'var(--color-secundaria)' : '#9CA3AF', fontWeight: 700 }}>
                                        {item.liquidez_customizada ? `D+${item.liquidez_customizada}` : '—'}
                                    </Typography>
                                </div>
                            )
                        },
                        {
                            header: 'Emissor',
                            accessorKey: 'emissor_customizado_id',
                            cell: (item: Excecao) => {
                                const original = item.canonico_emissor_id ? emissoresMap.get(item.canonico_emissor_id) : null;
                                const custom = item.emissor_customizado_id ? emissoresMap.get(item.emissor_customizado_id) : null;
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="p" style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>
                                            {original || '—'}
                                        </Typography>
                                        <Typography variant="p" style={{ fontSize: '13px', color: custom ? 'var(--color-secundaria)' : '#9CA3AF', fontWeight: 700 }}>
                                            {custom || '—'}
                                        </Typography>
                                    </div>
                                );
                            }
                        },
                        {
                            header: 'Escopo',
                            accessorKey: 'cliente_id',
                            cell: (item: Excecao) => {
                                const clienteNome = clientes.find(c => c.id === item.cliente_id)?.nome;
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {item.cliente_id ? (
                                            <>
                                                <Badge variant="ghost" style={{ background: '#FFF7ED', color: '#C2410C', fontSize: '10px', border: 'none' }}>
                                                    Cliente Específico
                                                </Badge>
                                                <Typography variant="p" style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', paddingLeft: '4px' }}>
                                                    {clienteNome}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Badge variant="ghost" style={{ background: '#ECFDF5', color: '#047857', fontSize: '10px', border: 'none' }}>
                                                Carteira Global
                                            </Badge>
                                        )}
                                    </div>
                                );
                            }
                        },
                        {
                            header: '',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2 size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => openEditModal(item)} />
                                    <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => handleDelete(item.id)} />
                                </div>
                            )
                        }
                    ]}
                    keyExtractor={(item) => item.id}
                    selectable={false}
                />
            </Card>

            <ModalNovaRegra
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRegra}
                salvando={salvando}
                regraEdicao={regraEdicao}
                canonicos={canonicos}
                emissores={emissores}
                classesDisponiveis={classesDisponiveis}
                clientes={clientes}
            />
        </div>
    );
}
