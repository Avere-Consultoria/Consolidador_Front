import { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, DataTable, Spinner, Badge } from 'avere-ui';
import { SlidersHorizontal, Plus, Edit2, Trash2, X, Save, ArrowRight } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

interface DicionarioMaster {
    codigo_identificador: string;
    nome_ativo: string;
    classe_avere: string;
    liquidez_avere: string;
}

interface Excecao {
    id: string;
    cliente_id: string | null;
    codigo_identificador: string;
    apelido_ativo: string | null;
    classe_customizada: string | null;
    liquidez_customizada: string | null;
    // Campos virtuais anexados do Master:
    master_nome?: string;
    master_classe?: string;
    master_liquidez?: string;
}

export default function PersonalizarAtivos() {
    const { perfil } = useAuth();
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);

    // Dados
    const [regras, setRegras] = useState<Excecao[]>([]);
    const [dicionario, setDicionario] = useState<DicionarioMaster[]>([]);
    const [classesDisponiveis, setClassesDisponiveis] = useState<string[]>([]);

    // Controlo do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    // Formulário
    const [formAtivo, setFormAtivo] = useState<string>(''); // codigo_identificador
    const [formApelido, setFormApelido] = useState('');
    const [formClasse, setFormClasse] = useState('');
    const [formLiquidez, setFormLiquidez] = useState('');
    const [formEscopo, setFormEscopo] = useState<'GLOBAL' | 'CLIENTE'>('GLOBAL');
    const [formClienteId, setFormClienteId] = useState('');

    const fetchData = async () => {
        if (!perfil) return;
        setLoading(true);
        try {
            // 1. Busca o Dicionário da Avere (Para comparação)
            const { data: dictData } = await supabase.from('dicionario_ativos').select('codigo_identificador, nome_ativo, classe_avere, liquidez_avere');

            // 2. Busca as Classes disponíveis
            const { data: classData } = await supabase.from('dicionario_classes').select('nome').order('ordem_exibicao');

            // 3. Busca as regras exclusivas deste Consultor
            const { data: regrasData } = await supabase.from('excecoes_classificacao').select('*').eq('consultor_id', perfil.id);

            if (dictData) setDicionario(dictData);
            if (classData) setClassesDisponiveis(classData.map(c => c.nome));

            if (regrasData && dictData) {
                // Junta a informação da regra com o padrão Avere
                const regrasCompletas = regrasData.map(regra => {
                    const master = dictData.find(d => d.codigo_identificador === regra.codigo_identificador);
                    return {
                        ...regra,
                        master_nome: master?.nome_ativo || 'Desconhecido',
                        master_classe: master?.classe_avere || 'Não classificado',
                        master_liquidez: master?.liquidez_avere || 'N/A'
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

    useEffect(() => {
        fetchData();
    }, [perfil]);

    // ── AÇÕES DO MODAL ──

    const openNewModal = () => {
        setEditId(null);
        setFormAtivo(''); setFormApelido(''); setFormClasse(''); setFormLiquidez('');
        setFormEscopo('GLOBAL'); setFormClienteId('');
        setIsModalOpen(true);
    };

    const openEditModal = (regra: Excecao) => {
        setEditId(regra.id);
        setFormAtivo(regra.codigo_identificador);
        setFormApelido(regra.apelido_ativo || '');
        setFormClasse(regra.classe_customizada || '');
        setFormLiquidez(regra.liquidez_customizada || '');
        setFormEscopo(regra.cliente_id ? 'CLIENTE' : 'GLOBAL');
        setFormClienteId(regra.cliente_id || '');
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Excluir esta regra de personalização? O ativo voltará a usar o Padrão Avere.')) return;
        try {
            await supabase.from('excecoes_classificacao').delete().eq('id', id);
            fetchData();
        } catch (err) {
            alert('Erro ao excluir regra.');
        }
    };

    const handleSave = async () => {
        if (!formAtivo) return alert('Selecione um ativo para personalizar.');
        if (formEscopo === 'CLIENTE' && !formClienteId) return alert('Introduza o ID do Cliente.');

        setSalvando(true);
        try {
            const payload = {
                consultor_id: perfil!.id,
                codigo_identificador: formAtivo,
                cliente_id: formEscopo === 'CLIENTE' ? formClienteId : null,
                apelido_ativo: formApelido || null,
                classe_customizada: formClasse || null,
                liquidez_customizada: formLiquidez || null
            };

            if (editId) {
                await supabase.from('excecoes_classificacao').update(payload).eq('id', editId);
            } else {
                await supabase.from('excecoes_classificacao').insert([payload]);
            }

            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            alert('Erro ao guardar. Verifique se já não existe uma regra para este ativo neste escopo.');
        } finally {
            setSalvando(false);
        }
    };

    // O ativo selecionado no formulário para mostrar o padrão Avere em tempo real
    const ativoSelecionado = dicionario.find(d => d.codigo_identificador === formAtivo);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>

            {/* HEADER */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <SlidersHorizontal size={28} color="#081F28" />
                        <Typography variant="h1">Personalizar Ativos</Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>
                        Crie as suas próprias nomenclaturas e regras para a sua carteira de clientes.
                    </Typography>
                </div>
                <Button variant="solid" onClick={openNewModal}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> Nova Regra
                </Button>
            </header>

            {/* TABELA DE REGRAS */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <DataTable
                    data={regras}
                    columns={[
                        {
                            header: 'Identificador',
                            accessorKey: 'codigo_identificador',
                            cell: (item: Excecao) => <Typography variant="p" style={{ fontFamily: 'monospace', fontWeight: 600 }}>{item.codigo_identificador}</Typography>
                        },
                        {
                            header: 'Padrão Avere (Original)',
                            accessorKey: 'master_nome',
                            cell: (item: Excecao) => (
                                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '8px', borderRadius: '6px' }}>
                                    <Typography variant="p" style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>{item.master_nome}</Typography>
                                    <Typography variant="p" style={{ fontSize: '10px', color: '#9CA3AF' }}>{item.master_classe} • D+{item.master_liquidez}</Typography>
                                </div>
                            )
                        },
                        {
                            header: 'Sua Personalização',
                            accessorKey: 'apelido_ativo',
                            cell: (item: Excecao) => (
                                <div style={{ padding: '8px' }}>
                                    <Typography variant="p" style={{ fontSize: '13px', color: '#0083CB', fontWeight: 700 }}>
                                        {item.apelido_ativo || <span style={{ opacity: 0.5, fontStyle: 'italic' }}>Usa nome original</span>}
                                    </Typography>
                                    {(item.classe_customizada || item.liquidez_customizada) && (
                                        <Typography variant="p" style={{ fontSize: '11px', color: '#081F28', marginTop: '4px' }}>
                                            {item.classe_customizada || item.master_classe} • D+{item.liquidez_customizada || item.master_liquidez}
                                        </Typography>
                                    )}
                                </div>
                            )
                        },
                        {
                            header: 'Escopo',
                            accessorKey: 'cliente_id',
                            cell: (item: Excecao) => (
                                item.cliente_id
                                    ? <Badge variant="outline" style={{ borderColor: '#F59E0B', color: '#F59E0B' }}>Cliente Específico</Badge>
                                    : <Badge variant="outline" style={{ borderColor: '#10B981', color: '#10B981' }}>Carteira Global</Badge>
                            )
                        },
                        {
                            header: '',
                            accessorKey: 'id',
                            cell: (item: Excecao) => (
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2 size={16} color="#6B7280" style={{ cursor: 'pointer' }} onClick={() => openEditModal(item)} />
                                    <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)} />
                                </div>
                            )
                        }
                    ]}
                    keyExtractor={(item) => item.id}
                />
            </Card>

            {/* ── MODAL DE EDIÇÃO / CRIAÇÃO ── */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(8, 31, 40, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px' }} onClick={() => setIsModalOpen(false)}>
                    <div style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>

                        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h2" style={{ fontSize: '18px' }}>{editId ? 'Editar Regra' : 'Nova Personalização'}</Typography>
                            <X size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
                        </div>

                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Seleção do Ativo */}
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Ativo (ISIN, CNPJ ou Ticker)</label>
                                <select
                                    value={formAtivo} onChange={e => setFormAtivo(e.target.value)} disabled={!!editId}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'inherit' }}
                                >
                                    <option value="">Selecione um ativo da base Avere...</option>
                                    {dicionario.map(d => (
                                        <option key={d.codigo_identificador} value={d.codigo_identificador}>
                                            {d.codigo_identificador} - {d.nome_ativo}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* View do Padrão Avere (Gatilho visual) */}
                            {ativoSelecionado && (
                                <div style={{ background: '#F9FAFB', padding: '12px', borderRadius: '8px', border: '1px dashed #D1D5DB', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ flex: 1 }}>
                                        <Typography variant="p" style={{ fontSize: '10px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Padrão Master Avere</Typography>
                                        <Typography variant="p" style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{ativoSelecionado.nome_ativo}</Typography>
                                        <Typography variant="p" style={{ fontSize: '11px', color: '#6B7280' }}>Classe: {ativoSelecionado.classe_avere} | Liq: D+{ativoSelecionado.liquidez_avere}</Typography>
                                    </div>
                                    <ArrowRight size={20} color="#9CA3AF" />
                                </div>
                            )}

                            {/* Os Inputs de Customização */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#0083CB' }}>Seu Apelido para o Ativo (Opcional)</label>
                                    <input value={formApelido} onChange={e => setFormApelido(e.target.value)} placeholder="Deixe em branco para usar o original" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #0083CB' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ flex: 2 }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Nova Classe (Opcional)</label>
                                        <select value={formClasse} onChange={e => setFormClasse(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)' }}>
                                            <option value="">Manter original</option>
                                            {classesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Nova Liq (D+)</label>
                                        <input type="number" min="0" value={formLiquidez} onChange={e => setFormLiquidez(e.target.value)} placeholder="Manter" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Escopo da Regra */}
                            <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '12px', borderRadius: '8px' }}>
                                <Typography variant="p" style={{ fontSize: '12px', fontWeight: 700, color: '#B45309', marginBottom: '8px' }}>Alcance da Regra</Typography>
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                                        <input type="radio" checked={formEscopo === 'GLOBAL'} onChange={() => setFormEscopo('GLOBAL')} /> Global (Todos os clientes)
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                                        <input type="radio" checked={formEscopo === 'CLIENTE'} onChange={() => setFormEscopo('CLIENTE')} /> Cliente Específico
                                    </label>
                                </div>
                                {formEscopo === 'CLIENTE' && (
                                    <input value={formClienteId} onChange={e => setFormClienteId(e.target.value)} placeholder="Digite o ID/Conta do Cliente" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '12px' }} />
                                )}
                            </div>

                        </div>

                        <div style={{ padding: '16px 24px', background: '#F9FAFB', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button variant="solid" onClick={handleSave} disabled={salvando}>
                                {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />} Salvar Regra
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}