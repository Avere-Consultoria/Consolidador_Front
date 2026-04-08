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
    benchmark: string; // Coluna recém-criada no banco
    instituicao_origem: string;
    classe_original: string;
    classe_avere: string;
    liquidez_avere: string;
    emissor_id: string;
    status: 'PENDENTE' | 'CLASSIFICADO';
}

interface Emissor {
    id: string;
    nome_fantasia: string;
}

interface ClasseDinamica {
    nome: string;
}

export default function MasterAtivos() {
    const [ativos, setAtivos] = useState<AtivoMaster[]>([]);
    const [emissores, setEmissores] = useState<Emissor[]>([]);
    const [classesAvere, setClassesAvere] = useState<ClasseDinamica[]>([]);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [filtroStatus, setFiltroStatus] = useState<'TODOS' | 'PENDENTE' | 'CLASSIFICADO'>('PENDENTE');
    const [idsModificados, setIdsModificados] = useState<Set<string>>(new Set());

    const fetchData = async () => {
        setLoading(true);
        try {
            const [emissoresRes, ativosRes, classesRes] = await Promise.all([
                supabase.from('dicionario_emissores').select('id, nome_fantasia').order('nome_fantasia'),
                supabase.from('dicionario_ativos').select('*').order('criado_em', { ascending: false }),
                supabase.from('dicionario_classes').select('nome').order('ordem_exibicao')
            ]);

            if (emissoresRes.error) throw emissoresRes.error;
            if (ativosRes.error) throw ativosRes.error;
            if (classesRes.error) throw classesRes.error;

            setEmissores(emissoresRes.data || []);
            setClassesAvere(classesRes.data || []);

            const ativosFormatados: AtivoMaster[] = (ativosRes.data || []).map(row => {
                const estaClassificado = row.classe_avere && row.liquidez_avere !== null && row.liquidez_avere !== '' && row.emissor_id;

                return {
                    ...row,
                    classe_avere: row.classe_avere || '',
                    liquidez_avere: row.liquidez_avere || '',
                    emissor_id: row.emissor_id || '',
                    // Agora lê o campo benchmark que você criou no banco
                    benchmark: row.benchmark || '—',
                    instituicao_origem: row.instituicao_origem || 'Desconhecida',
                    classe_original: row.classe_original || '—',
                    status: estaClassificado ? 'CLASSIFICADO' : 'PENDENTE'
                };
            });

            setAtivos(ativosFormatados);
            setIdsModificados(new Set());
        } catch (err) {
            console.error('Erro ao buscar dicionário:', err);
            alert('Erro ao carregar os dados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAtualizarAtivo = (id: string, campo: 'classe_avere' | 'liquidez_avere' | 'emissor_id', valor: string) => {
        setAtivos(prev => prev.map(ativo => {
            if (ativo.id !== id) return ativo;
            const novoAtivo = { ...ativo, [campo]: valor };
            novoAtivo.status = (novoAtivo.classe_avere && novoAtivo.liquidez_avere.trim() !== '' && novoAtivo.emissor_id)
                ? 'CLASSIFICADO' : 'PENDENTE';
            return novoAtivo;
        }));
        setIdsModificados(prev => new Set(prev).add(id));
    };

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
                        emissor_id: ativo.emissor_id || null,
                        atualizado_em: new Date().toISOString()
                    })
                    .eq('id', ativo.id)
            );
            await Promise.all(promessas);
            alert(`${idsModificados.size} ativo(s) atualizado(s) com sucesso!`);
            setIdsModificados(new Set());
        } catch (err) {
            console.error('Erro ao salvar:', err);
            alert('Erro ao salvar no banco.');
        } finally {
            setSalvando(false);
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    const ativosFiltrados = ativos.filter(a => filtroStatus === 'TODOS' ? true : a.status === filtroStatus);
    const pendentesCount = ativos.filter(a => a.status === 'PENDENTE').length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', fontFamily: 'Montserrat, sans-serif' }}>

            <style>{`
                input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                input[type=number] { -moz-appearance: textfield; }
                .cell-wrap { 
                    white-space: normal !important; 
                    word-break: break-word; 
                    min-width: 250px; 
                    line-height: 1.5;
                }
            `}</style>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Typography variant="h1" style={{ fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>Master de Ativos</Typography>
                        <Badge intent={pendentesCount > 0 ? 'primaria' : 'secundaria'} variant="solid">
                            {pendentesCount} Pendentes
                        </Badge>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontFamily: 'Montserrat, sans-serif' }}>
                        Dicionário Universal de Classificação e Risco da Avere
                    </Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline" onClick={() => setFiltroStatus(prev => prev === 'PENDENTE' ? 'TODOS' : 'PENDENTE')}>
                        <Filter size={16} style={{ marginRight: '8px' }} />
                        {filtroStatus === 'PENDENTE' ? 'Ver Todos' : 'Ver Pendentes'}
                    </Button>
                    <Button variant="solid" onClick={handleSalvarClassificacoes} disabled={salvando || idsModificados.size === 0}>
                        {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />}
                        {salvando ? 'A guardar...' : `Salvar Alterações (${idsModificados.size})`}
                    </Button>
                </div>
            </header>

            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <DataTable
                    data={ativosFiltrados}
                    columns={[
                        {
                            header: 'Identificador',
                            accessorKey: 'codigo_identificador',
                            cell: (item: AtivoMaster) => (
                                <div style={{ minWidth: '120px' }}>
                                    <Typography variant="p" style={{ fontWeight: 700, fontSize: '12px', fontFamily: 'monospace' }}>
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
                                <div className="cell-wrap">
                                    <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px', color: '#081F28', fontFamily: 'Montserrat, sans-serif' }}>
                                        {item.nome_ativo}
                                    </Typography>
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                                        <Badge variant="ghost" style={{ fontSize: '9px' }}>{item.instituicao_origem}</Badge>
                                        <Badge variant="ghost" style={{ fontSize: '9px', opacity: 0.6 }}>Origem: {item.classe_original}</Badge>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            header: 'Benchmark',
                            accessorKey: 'benchmark',
                            cell: (item: AtivoMaster) => (
                                <div style={{
                                    background: 'rgba(107, 114, 128, 0.08)',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    display: 'inline-block',
                                    minWidth: '80px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(0,0,0,0.03)'
                                }}>
                                    <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, color: '#4B5563', fontFamily: 'Montserrat, sans-serif' }}>
                                        {item.benchmark}
                                    </Typography>
                                </div>
                            ),
                        },
                        {
                            header: 'Emissor (Risco)',
                            accessorKey: 'emissor_id',
                            cell: (item: AtivoMaster) => (
                                <div style={{ width: '200px' }}>
                                    <select
                                        value={item.emissor_id}
                                        onChange={(e) => handleAtualizarAtivo(item.id, 'emissor_id', e.target.value)}
                                        style={{
                                            width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '12px', fontFamily: 'Montserrat, sans-serif', outline: 'none',
                                            background: item.emissor_id ? '#fff' : 'rgba(239, 68, 68, 0.05)'
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
                                <div style={{ width: '160px' }}>
                                    <select
                                        value={item.classe_avere}
                                        onChange={(e) => handleAtualizarAtivo(item.id, 'classe_avere', e.target.value)}
                                        style={{
                                            width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '12px', fontFamily: 'Montserrat, sans-serif', outline: 'none',
                                            background: item.classe_avere ? '#fff' : 'rgba(245, 158, 11, 0.05)'
                                        }}
                                    >
                                        <option value="">Não classificado</option>
                                        {classesAvere.map(opt => (
                                            <option key={opt.nome} value={opt.nome}>{opt.nome}</option>
                                        ))}
                                    </select>
                                </div>
                            ),
                        },
                        {
                            header: 'Liquidez',
                            accessorKey: 'liquidez_avere',
                            cell: (item: AtivoMaster) => (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '80px' }}>
                                    <Typography variant="p" style={{ fontSize: '12px', fontWeight: 700, opacity: 0.5 }}>D+</Typography>
                                    <input
                                        type="number" min="0"
                                        value={item.liquidez_avere}
                                        onChange={(e) => handleAtualizarAtivo(item.id, 'liquidez_avere', e.target.value)}
                                        style={{
                                            width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '12px', fontFamily: 'Montserrat, sans-serif', outline: 'none'
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