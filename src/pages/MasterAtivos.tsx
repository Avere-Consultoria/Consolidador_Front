import { useState, useEffect, useMemo } from 'react';
import { Typography, Card, Badge, Button, DataTable, Spinner, toast } from 'avere-ui';
import { Filter, Save, Eye } from 'lucide-react';
import { supabase } from '../services/supabase';
import { DrawerCanonico, type CanonicoDetalhe } from '../components/masterAtivos/DrawerCanonico';
import { ModalFundirCanonicos, type CanonicoOpcaoDestino } from '../components/masterAtivos/ModalFundirCanonicos';

function formatarDataBR(iso: string): string {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

// ── Tipos ─────────────────────────────────────────────────────────────────
interface VisaoInstitucional {
    instituicao_origem: 'BTG' | 'XP' | 'AVENUE' | 'AGORA';
    codigo_identificador: string;
    tipo_identificador: string;
    nome_ativo: string;
    emissor_original: string | null;
    classe_original: string | null;
    liquidez_api_original: string | null;
    vencimento_api_original: string | null;
    index_rate: string | null;
}

interface AtivoCanonicoMaster {
    id: string;
    nome_canonico: string;
    classe_avere: string;
    liquidez_avere: string;
    data_vencimento: string;
    emissor_id: string;
    taxa_canonica: string;
    benchmark_canonico: string;
    sub_tipo_canonico: string;
    is_fii: boolean;
    is_coe: boolean;
    notas: string;
    visoes: VisaoInstitucional[];
    status: 'PENDENTE' | 'CLASSIFICADO';
}

interface Emissor {
    id: string;
    nome_fantasia: string;
}

interface ClasseDinamica {
    nome: string;
}

function calcularStatus(c: { classe_avere: string; liquidez_avere: string; emissor_id: string }): 'CLASSIFICADO' | 'PENDENTE' {
    return (c.classe_avere && c.liquidez_avere.trim() !== '' && c.emissor_id) ? 'CLASSIFICADO' : 'PENDENTE';
}

const CORES_INST: Record<string, { bg: string; fg: string }> = {
    BTG:    { bg: '#E0F2FE', fg: '#0369A1' },
    XP:     { bg: '#FFEDD5', fg: '#C2410C' },
    AVENUE: { bg: '#FEF3C7', fg: '#92400E' },
    AGORA:  { bg: '#DCFCE7', fg: '#15803D' },
};

export default function MasterAtivos() {
    const [canonicos, setCanonicos] = useState<AtivoCanonicoMaster[]>([]);
    const [emissores, setEmissores] = useState<Emissor[]>([]);
    const [classesAvere, setClassesAvere] = useState<ClasseDinamica[]>([]);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [filtroStatus, setFiltroStatus] = useState<'TODOS' | 'PENDENTE' | 'CLASSIFICADO'>('PENDENTE');
    const [idsModificados, setIdsModificados] = useState<Set<string>>(new Set());

    // ── Drawer e modal de fundir ─────────────────────────────────────────
    const [drawerCanonicoId, setDrawerCanonicoId] = useState<string | null>(null);
    const [modalFundirAberto, setModalFundirAberto] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [canonicosRes, emissoresRes, classesRes, dicionarioRes] = await Promise.all([
                supabase
                    .from('ativos_canonicos')
                    .select('id, nome_canonico, classe_avere, liquidez_avere, data_vencimento, emissor_id, taxa_canonica, benchmark_canonico, sub_tipo_canonico, is_fii, is_coe, notas')
                    .order('nome_canonico'),
                supabase.from('dicionario_emissores').select('id, nome_fantasia').order('nome_fantasia'),
                supabase.from('dicionario_classes').select('nome').order('ordem_exibicao'),
                supabase.from('dicionario_ativos').select('ativo_canonico_id, instituicao_origem, codigo_identificador, tipo_identificador, nome_ativo, emissor_original, classe_original, liquidez_api_original, vencimento_api_original, index_rate'),
            ]);

            if (canonicosRes.error) throw canonicosRes.error;
            if (emissoresRes.error) throw emissoresRes.error;
            if (classesRes.error) throw classesRes.error;
            if (dicionarioRes.error) throw dicionarioRes.error;

            setEmissores(emissoresRes.data || []);
            setClassesAvere(classesRes.data || []);

            // Agrupa visões institucionais por canonico_id
            const visoesPorCanonico = new Map<string, VisaoInstitucional[]>();
            (dicionarioRes.data || []).forEach((d: any) => {
                if (!d.ativo_canonico_id) return;
                const arr = visoesPorCanonico.get(d.ativo_canonico_id) ?? [];
                arr.push({
                    instituicao_origem:      d.instituicao_origem,
                    codigo_identificador:    d.codigo_identificador,
                    tipo_identificador:      d.tipo_identificador,
                    nome_ativo:              d.nome_ativo,
                    emissor_original:        d.emissor_original,
                    classe_original:         d.classe_original,
                    liquidez_api_original:   d.liquidez_api_original,
                    vencimento_api_original: d.vencimento_api_original,
                    index_rate:              d.index_rate,
                });
                visoesPorCanonico.set(d.ativo_canonico_id, arr);
            });

            const lista: AtivoCanonicoMaster[] = (canonicosRes.data || []).map((c: any) => {
                const base = {
                    ...c,
                    classe_avere:       c.classe_avere || '',
                    liquidez_avere:     c.liquidez_avere || '',
                    data_vencimento:    c.data_vencimento || '',
                    emissor_id:         c.emissor_id || '',
                    taxa_canonica:      c.taxa_canonica || '',
                    benchmark_canonico: c.benchmark_canonico || '',
                    sub_tipo_canonico:  c.sub_tipo_canonico || '',
                    notas:              c.notas || '',
                    visoes:             visoesPorCanonico.get(c.id) ?? [],
                    status: 'PENDENTE' as const,
                };
                return { ...base, status: calcularStatus(base) };
            });

            setCanonicos(lista);
            setIdsModificados(new Set());
        } catch (err) {
            console.error('Erro ao buscar canônicos:', err);
            toast.error('Erro ao carregar os dados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAtualizarCanonico = (
        id: string,
        campo: 'classe_avere' | 'liquidez_avere' | 'data_vencimento' | 'emissor_id',
        valor: string,
    ) => {
        setCanonicos(prev => prev.map(c => {
            if (c.id !== id) return c;
            const novo = { ...c, [campo]: valor };
            return { ...novo, status: calcularStatus(novo) };
        }));
        setIdsModificados(prev => new Set(prev).add(id));
    };

    const handleSalvar = async () => {
        if (idsModificados.size === 0) return;
        setSalvando(true);
        try {
            const paraSalvar = canonicos.filter(c => idsModificados.has(c.id));
            const promessas = paraSalvar.map(c =>
                supabase
                    .from('ativos_canonicos')
                    .update({
                        classe_avere:    c.classe_avere || null,
                        liquidez_avere:  c.liquidez_avere || null,
                        data_vencimento: c.data_vencimento || null,
                        emissor_id:      c.emissor_id || null,
                    })
                    .eq('id', c.id),
            );
            await Promise.all(promessas);
            toast.success(`${idsModificados.size} ativo(s) atualizado(s) com sucesso!`);
            setIdsModificados(new Set());
        } catch (err) {
            console.error('Erro ao salvar:', err);
            toast.error('Erro ao salvar no banco.');
        } finally {
            setSalvando(false);
        }
    };

    const emissoresMap = useMemo(() => new Map(emissores.map(e => [e.id, e.nome_fantasia])), [emissores]);
    const emissoresOptions = useMemo(() => emissores.map(e => <option key={e.id} value={e.id}>{e.nome_fantasia}</option>), [emissores]);
    const classesOptions   = useMemo(() => classesAvere.map(c => <option key={c.nome} value={c.nome}>{c.nome}</option>), [classesAvere]);

    const { canonicosFiltrados, pendentesCount } = useMemo(() => ({
        canonicosFiltrados: canonicos.filter(c => filtroStatus === 'TODOS' || c.status === filtroStatus),
        pendentesCount:     canonicos.filter(c => c.status === 'PENDENTE').length,
    }), [canonicos, filtroStatus]);

    const canonicoSelecionado: CanonicoDetalhe | null = useMemo(() => {
        if (!drawerCanonicoId) return null;
        return canonicos.find(c => c.id === drawerCanonicoId) ?? null;
    }, [drawerCanonicoId, canonicos]);

    const candidatosDestino: CanonicoOpcaoDestino[] = useMemo(() => {
        if (!drawerCanonicoId) return [];
        return canonicos
            .filter(c => c.id !== drawerCanonicoId)
            .map(c => ({
                id: c.id,
                nome_canonico: c.nome_canonico,
                classe_avere: c.classe_avere || null,
                instituicoes_visoes: Array.from(new Set(c.visoes.map(v => v.instituicao_origem))),
            }));
    }, [drawerCanonicoId, canonicos]);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <style>{`
                input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                input[type=number] { -moz-appearance: textfield; }
            `}</style>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Typography variant="h1" style={{ fontWeight: 700 }}>Master de Ativos</Typography>
                        <Badge intent={pendentesCount > 0 ? 'primaria' : 'secundaria'} variant="solid">
                            {pendentesCount} Pendentes
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
                    <Button variant="solid" onClick={handleSalvar} disabled={salvando || idsModificados.size === 0}>
                        {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />}
                        {salvando ? 'A guardar...' : `Salvar Alterações (${idsModificados.size})`}
                    </Button>
                </div>
            </header>

            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <DataTable
                    data={canonicosFiltrados}
                    columns={[
                        {
                            header: 'Ativo',
                            accessorKey: 'nome_canonico',
                            cell: (item: AtivoCanonicoMaster) => {
                                const principal = item.visoes[0]; // visão usada pra exibir identificador padrão
                                const instituicoesDistintas = Array.from(new Set(item.visoes.map(v => v.instituicao_origem)));
                                return (
                                    <div style={{ width: '260px', minWidth: '260px', maxWidth: '260px', overflow: 'hidden' }}>
                                        {/* Linha 1: nome canônico */}
                                        <Typography
                                            variant="p"
                                            title={item.nome_canonico}
                                            style={{ fontWeight: 700, fontSize: '13px', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        >
                                            {item.nome_canonico}
                                            {item.is_fii && <span style={{ fontSize: '9px', marginLeft: '6px', color: '#7C3AED', fontWeight: 700 }}>FII</span>}
                                            {item.is_coe && <span style={{ fontSize: '9px', marginLeft: '6px', color: '#DC2626', fontWeight: 700 }}>COE</span>}
                                        </Typography>

                                        {/* Linha 2: identificador principal */}
                                        {principal && (
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                                                <Typography variant="p" style={{ fontWeight: 600, fontSize: '11px', fontFamily: 'monospace', color: '#6B7280' }}>
                                                    {principal.codigo_identificador}
                                                </Typography>
                                                <span style={{ fontSize: '9px', color: '#9CA3AF', fontWeight: 600 }}>
                                                    {principal.tipo_identificador}
                                                </span>
                                            </div>
                                        )}

                                        {/* Linha 3: badges de instituição + taxa + classe original */}
                                        <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                                            {instituicoesDistintas.map(inst => {
                                                const cor = CORES_INST[inst] ?? { bg: '#E5E7EB', fg: '#374151' };
                                                return (
                                                    <span
                                                        key={inst}
                                                        style={{
                                                            background: cor.bg,
                                                            color: cor.fg,
                                                            fontSize: '9px',
                                                            fontWeight: 700,
                                                            padding: '2px 6px',
                                                            borderRadius: '4px',
                                                        }}
                                                    >
                                                        {inst}
                                                    </span>
                                                );
                                            })}
                                            {item.taxa_canonica && (
                                                <Badge variant="ghost" style={{ fontSize: '9px' }}>{item.taxa_canonica}</Badge>
                                            )}
                                        </div>
                                    </div>
                                );
                            },
                        },
                        {
                            header: 'Emissor (Risco)',
                            accessorKey: 'emissor_id',
                            cell: (item: AtivoCanonicoMaster) => (
                                <div style={{ width: '170px' }}>
                                    <select
                                        value={item.emissor_id}
                                        onChange={(e) => handleAtualizarCanonico(item.id, 'emissor_id', e.target.value)}
                                        style={{
                                            width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '12px', fontFamily: 'var(--font-family)', outline: 'none',
                                            background: item.emissor_id ? '#fff' : 'rgba(239, 68, 68, 0.05)',
                                        }}
                                    >
                                        <option value="">Selecione o Emissor...</option>
                                        {emissoresOptions}
                                    </select>
                                </div>
                            ),
                        },
                        {
                            header: 'Classe Avere',
                            accessorKey: 'classe_avere',
                            cell: (item: AtivoCanonicoMaster) => {
                                const classeOriginal = item.visoes[0]?.classe_original;
                                return (
                                    <div style={{ width: '150px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <select
                                            value={item.classe_avere}
                                            onChange={(e) => handleAtualizarCanonico(item.id, 'classe_avere', e.target.value)}
                                            style={{
                                                width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                                fontSize: '12px', fontFamily: 'var(--font-family)', outline: 'none',
                                                background: item.classe_avere ? '#fff' : 'rgba(245, 158, 11, 0.05)',
                                            }}
                                        >
                                            <option value="">Não classificado</option>
                                            {classesOptions}
                                        </select>
                                        {classeOriginal && (
                                            <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px', width: 'fit-content' }}>
                                                Origem: {classeOriginal}
                                            </Badge>
                                        )}
                                    </div>
                                );
                            },
                        },
                        {
                            header: 'Liquidez',
                            accessorKey: 'liquidez_avere',
                            cell: (item: AtivoCanonicoMaster) => {
                                const liqApi = item.visoes[0]?.liquidez_api_original;
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <input
                                            type="number" min="0"
                                            value={item.liquidez_avere}
                                            onChange={(e) => handleAtualizarCanonico(item.id, 'liquidez_avere', e.target.value)}
                                            placeholder="D+"
                                            style={{
                                                width: '80px', padding: '6px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                                fontSize: '12px', fontFamily: 'var(--font-family)', outline: 'none',
                                            }}
                                        />
                                        {liqApi != null && (
                                            <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px', width: 'fit-content' }}>
                                                API: D+{liqApi}
                                            </Badge>
                                        )}
                                    </div>
                                );
                            },
                        },
                        {
                            header: 'Vencimento',
                            accessorKey: 'data_vencimento',
                            cell: (item: AtivoCanonicoMaster) => {
                                const vencApi = item.visoes[0]?.vencimento_api_original;
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <input
                                            type="date"
                                            value={item.data_vencimento}
                                            onChange={(e) => handleAtualizarCanonico(item.id, 'data_vencimento', e.target.value)}
                                            style={{
                                                width: '130px', padding: '6px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                                                fontSize: '12px', fontFamily: 'var(--font-family)', outline: 'none',
                                                background: item.data_vencimento ? '#fff' : 'transparent',
                                            }}
                                        />
                                        {vencApi && (
                                            <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px', width: 'fit-content' }}>
                                                API: {formatarDataBR(vencApi)}
                                            </Badge>
                                        )}
                                    </div>
                                );
                            },
                        },
                        {
                            header: 'Status',
                            accessorKey: 'status',
                            cell: (item: AtivoCanonicoMaster) => (
                                <Badge intent={item.status === 'CLASSIFICADO' ? 'primaria' : 'secundaria'} variant="ghost" style={{ fontSize: '10px' }}>
                                    {item.status}
                                </Badge>
                            ),
                        },
                        {
                            header: '',
                            cell: (item: AtivoCanonicoMaster) => (
                                <div
                                    style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '12px', cursor: 'pointer' }}
                                    onClick={() => setDrawerCanonicoId(item.id)}
                                    title="Ver detalhes e visões institucionais"
                                >
                                    <Eye size={16} color="#6B7280" />
                                </div>
                            ),
                        },
                    ]}
                    keyExtractor={(item: AtivoCanonicoMaster) => item.id}
                    selectable={false}
                />
            </Card>

            {/* ── Drawer com detalhes do canônico ── */}
            <DrawerCanonico
                isOpen={drawerCanonicoId !== null}
                onClose={() => setDrawerCanonicoId(null)}
                canonico={canonicoSelecionado}
                emissoresMap={emissoresMap}
                onFundir={() => setModalFundirAberto(true)}
            />

            {/* ── Modal de fundir canônicos ── */}
            <ModalFundirCanonicos
                isOpen={modalFundirAberto}
                onClose={() => setModalFundirAberto(false)}
                origem={canonicoSelecionado}
                candidatosDestino={candidatosDestino}
                onSuccess={() => {
                    setModalFundirAberto(false);
                    setDrawerCanonicoId(null);
                    fetchData();
                }}
            />
        </div>
    );
}
