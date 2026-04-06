import { useState, useEffect } from 'react';
import { Typography, Card, Badge, Button, DataTable, Spinner } from 'avere-ui';
import { Filter, Save } from 'lucide-react';
import { supabase } from '../services/supabase';

// ── Tipos ─────────────────────────────────────────────────────────────────
interface AtivoMaster {
    id: string;
    codigo_identificador: string;
    tipo_identificador: string;
    nome_ativo: string;
    instituicao_origem: string;
    classe_original: string;
    classe_avere: string;
    liquidez_avere: string;
    emissor_id: string; // <-- NOVO CAMPO
    status: 'PENDENTE' | 'CLASSIFICADO';
}

interface Emissor {
    id: string;
    nome_fantasia: string;
}

const CLASSES_AVERE = [
    { label: 'Não classificado', value: '' },
    { label: 'RF Pré', value: 'RF Pré' },
    { label: 'RF IPCA', value: 'RF IPCA' },
    { label: 'RF Pós', value: 'RF Pós' },
    { label: 'Multimercado', value: 'MM' },
    { label: 'Renda Variável', value: 'RV' },
    { label: 'Internacional', value: 'Internacional' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Componente Principal
// ─────────────────────────────────────────────────────────────────────────────

export default function MasterAtivos() {
    const [ativos, setAtivos] = useState<AtivoMaster[]>([]);
    const [emissores, setEmissores] = useState<Emissor[]>([]); // <-- NOVO ESTADO
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [filtroStatus, setFiltroStatus] = useState<'TODOS' | 'PENDENTE' | 'CLASSIFICADO'>('PENDENTE');

    const [idsModificados, setIdsModificados] = useState<Set<string>>(new Set());

    // 1. Carregar dados reais do Supabase (Ativos e Emissores)
    const fetchData = async () => {
        setLoading(true);
        try {
            // Busca emissores e ativos em paralelo para ser mais rápido
            const [emissoresRes, ativosRes] = await Promise.all([
                supabase.from('dicionario_emissores').select('id, nome_fantasia').order('nome_fantasia'),
                supabase.from('dicionario_ativos').select('*').order('criado_em', { ascending: false })
            ]);

            if (emissoresRes.error) throw emissoresRes.error;
            if (ativosRes.error) throw ativosRes.error;

            setEmissores(emissoresRes.data || []);

            const ativosFormatados: AtivoMaster[] = (ativosRes.data || []).map(row => {
                const estaClassificado = row.classe_avere && row.liquidez_avere !== null && row.liquidez_avere !== '' && row.emissor_id;

                return {
                    ...row,
                    classe_avere: row.classe_avere || '',
                    liquidez_avere: row.liquidez_avere || '',
                    emissor_id: row.emissor_id || '',
                    instituicao_origem: row.instituicao_origem || 'Desconhecida',
                    classe_original: row.classe_original || '—',
                    status: estaClassificado ? 'CLASSIFICADO' : 'PENDENTE'
                };
            });

            setAtivos(ativosFormatados);
            setIdsModificados(new Set());
        } catch (err) {
            console.error('Erro ao buscar dicionário:', err);
            alert('Erro ao carregar os ativos e emissores.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const pendentesCount = ativos.filter(a => a.status === 'PENDENTE').length;
    const ativosFiltrados = ativos.filter(a =>
        filtroStatus === 'TODOS' ? true : a.status === filtroStatus
    );

    // 2. Atualizar estado local
    const handleAtualizarAtivo = (id: string, campo: 'classe_avere' | 'liquidez_avere' | 'emissor_id', valor: string) => {
        setAtivos(prev => prev.map(ativo => {
            if (ativo.id !== id) return ativo;

            const novoAtivo = { ...ativo, [campo]: valor };
            // Nova regra de validação rigorosa (Precisa de Classe + Liquidez + Emissor)
            if (novoAtivo.classe_avere && novoAtivo.liquidez_avere.trim() !== '' && novoAtivo.emissor_id) {
                novoAtivo.status = 'CLASSIFICADO';
            } else {
                novoAtivo.status = 'PENDENTE';
            }
            return novoAtivo;
        }));

        setIdsModificados(prev => new Set(prev).add(id));
    };

    // 3. Salvar alterações no Supabase
    const handleSalvarClassificacoes = async () => {
        if (idsModificados.size === 0) return;
        setSalvando(true);
        try {
            const ativosParaSalvar = ativos.filter(a => idsModificados.has(a.id));

            const promessas = ativosParaSalvar.map(ativo =>
                supabase
                    .from('dicionario_ativos')
                    .update({
                        classe_avere: ativo.classe_avere,
                        liquidez_avere: ativo.liquidez_avere,
                        emissor_id: ativo.emissor_id || null, // Salva null se o campo estiver vazio
                        atualizado_em: new Date().toISOString()
                    })
                    .eq('id', ativo.id)
            );

            await Promise.all(promessas);
            alert(`${idsModificados.size} ativo(s) atualizado(s) com sucesso!`);
            setIdsModificados(new Set());
        } catch (err) {
            console.error('Erro ao salvar:', err);
            alert('Ocorreu um erro ao salvar. Tente novamente.');
        } finally {
            setSalvando(false);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
            <Spinner size="lg" />
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>

            <style>{`
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Typography variant="h1">Master de Ativos</Typography>
                        <Badge intent={pendentesCount > 0 ? 'primaria' : 'secundaria'} variant="solid">
                            {pendentesCount} Órfãos Pendentes
                        </Badge>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>
                        Dicionário Universal de Classificação e Risco da Avere
                    </Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline" onClick={() => setFiltroStatus(prev => prev === 'PENDENTE' ? 'TODOS' : 'PENDENTE')}>
                        <Filter size={16} style={{ marginRight: '8px' }} />
                        {filtroStatus === 'PENDENTE' ? 'Ver Todos' : 'Ver Pendentes'}
                    </Button>
                    <Button variant="solid" onClick={handleSalvarClassificacoes} disabled={salvando || idsModificados.size === 0}>
                        {salvando ? <Spinner size="sm" style={{ marginRight: '8px' }} /> : <Save size={16} style={{ marginRight: '8px' }} />}
                        {salvando ? 'A guardar...' : `Salvar Alterações (${idsModificados.size})`}
                    </Button>
                </div>
            </header>

            {/* Tabela Master */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <DataTable
                    data={ativosFiltrados}
                    columns={[
                        {
                            header: 'Identificador',
                            accessorKey: 'codigo_identificador',
                            cell: (item: AtivoMaster) => (
                                <div>
                                    <Typography variant="p" style={{ fontWeight: 700, fontSize: '13px', fontFamily: 'monospace' }}>
                                        {item.codigo_identificador}
                                    </Typography>
                                    <Typography variant="p" style={{ fontSize: '10px', opacity: 0.5 }}>{item.tipo_identificador}</Typography>
                                </div>
                            ),
                        },
                        {
                            header: 'Ativo (Origem)',
                            accessorKey: 'nome_ativo',
                            cell: (item: AtivoMaster) => (
                                <div>
                                    <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px', color: '#081F28' }}>
                                        {item.nome_ativo}
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                        <Badge variant="ghost" style={{ fontSize: '9px' }}>{item.instituicao_origem}</Badge>
                                        <Badge variant="ghost" style={{ fontSize: '9px', opacity: 0.6 }}>Origem: {item.classe_original}</Badge>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            header: 'Emissor (Risco)',
                            accessorKey: 'emissor_id',
                            cell: (item: AtivoMaster) => (
                                <div style={{ width: '160px' }}>
                                    <select
                                        value={item.emissor_id}
                                        onChange={(e) => handleAtualizarAtivo(item.id, 'emissor_id', e.target.value)}
                                        style={{
                                            width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '12px', fontFamily: 'inherit', outline: 'none',
                                            background: item.emissor_id ? '#fff' : 'rgba(239, 68, 68, 0.05)',
                                            borderColor: item.emissor_id ? 'rgba(0,0,0,0.1)' : 'rgba(239, 68, 68, 0.4)',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                    >
                                        <option value="">Selecione o Emissor...</option>
                                        {emissores.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.nome_fantasia}</option>
                                        ))}
                                    </select>
                                </div>
                            ),
                        },
                        {
                            header: 'Classe Avere',
                            accessorKey: 'classe_avere',
                            cell: (item: AtivoMaster) => (
                                <div style={{ width: '140px' }}>
                                    <select
                                        value={item.classe_avere}
                                        onChange={(e) => handleAtualizarAtivo(item.id, 'classe_avere', e.target.value)}
                                        style={{
                                            width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '12px', fontFamily: 'inherit', outline: 'none',
                                            background: item.classe_avere ? '#fff' : 'rgba(245, 158, 11, 0.05)',
                                            borderColor: item.classe_avere ? 'rgba(0,0,0,0.1)' : 'rgba(245, 158, 11, 0.4)',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                    >
                                        {CLASSES_AVERE.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            ),
                        },
                        {
                            header: 'Liquidez (Dias)',
                            accessorKey: 'liquidez_avere',
                            cell: (item: AtivoMaster) => (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100px' }}>
                                    <Typography variant="p" style={{ fontSize: '13px', fontWeight: 700, color: '#081F28', opacity: 0.6 }}>
                                        D+
                                    </Typography>
                                    <input
                                        type="number" min="0" placeholder="Ex: 30"
                                        value={item.liquidez_avere}
                                        onChange={(e) => handleAtualizarAtivo(item.id, 'liquidez_avere', e.target.value)}
                                        style={{
                                            width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '12px', fontFamily: 'inherit', outline: 'none',
                                            background: item.liquidez_avere !== '' ? '#fff' : 'rgba(245, 158, 11, 0.05)',
                                            borderColor: item.liquidez_avere !== '' ? 'rgba(0,0,0,0.1)' : 'rgba(245, 158, 11, 0.4)'
                                        }}
                                    />
                                </div>
                            ),
                        },
                        {
                            header: 'Status',
                            accessorKey: 'status',
                            cell: (item: AtivoMaster) => (
                                <Badge intent={item.status === 'CLASSIFICADO' ? 'primaria' : 'secundaria'} variant="ghost" style={{ fontSize: '10px' }}>
                                    {item.status}
                                </Badge>
                            ),
                        },
                    ]}
                    keyExtractor={(item: AtivoMaster) => item.id}
                    selectable={false}
                />
            </Card>
        </div>
    );
}