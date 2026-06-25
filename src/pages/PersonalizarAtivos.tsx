import { useState, useEffect, useMemo } from 'react';
import { Typography, Card, Button, Spinner, Badge, TextField, toast } from 'avere-ui';
import { SlidersHorizontal, Plus, Search } from 'lucide-react';
import { supabase } from '../services/supabase';
import { padronizarTaxaExibicao } from '../utils/formatters';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';
import { DrawerRegra } from '../components/personalizarAtivos/DrawerRegra';
import { LiquidezSubtipoConsultor } from '../components/personalizarAtivos/LiquidezSubtipoConsultor';

const thPA: React.CSSProperties = {
    padding: '12px 16px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.05em', color: '#9CA3AF', textAlign: 'left', whiteSpace: 'nowrap',
};
const tdPA: React.CSSProperties = { padding: '12px 16px', verticalAlign: 'middle' };

const CORES_INST: Record<string, { bg: string; fg: string }> = {
    BTG:    { bg: '#E0F2FE', fg: '#0369A1' },
    XP:     { bg: '#FFEDD5', fg: '#C2410C' },
    AVENUE: { bg: '#FEF3C7', fg: '#92400E' },
    AGORA:  { bg: '#DCFCE7', fg: '#15803D' },
};

function fmtDataPA(iso: string | null | undefined): string {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}
// Modelo Home: vencimento quando existe, senão liquidez (D+N), senão vazio.
function vencLiq(venc: string | null | undefined, liq: string | null | undefined): string {
    if (venc) return fmtDataPA(venc);
    if (liq !== null && liq !== undefined && String(liq) !== '') return `D+${liq}`;
    return '';
}

// ── Tipos ─────────────────────────────────────────────────────────────────

export interface VisaoInstitucional {
    instituicao_origem: string;
    codigo_identificador: string;
    tipo_identificador: string;
    nome_ativo: string;
    emissor_original: string | null;
    classe_original: string | null;
    liquidez_api_original: string | null;
    vencimento_api_original: string | null;
    index_rate: string | null;
    taxa_formatada: string | null;
}

export interface AtivoCanonicoOption {
    id: string;
    nome_canonico: string;
    classe_avere: string | null;
    liquidez_avere: string | null;
    data_vencimento: string | null;
    emissor_id: string | null;
    sub_tipo_canonico: string | null;
    taxa_canonica: string | null;
    taxa_formatada: string | null;
    benchmark_canonico: string | null;
    instituicoes_visoes: string[];     // ex: ['BTG','XP']
    identificador_exibicao: string;    // primeiro código (ex: ISIN ou ticker) pra busca
    visoes: VisaoInstitucional[];      // como cada instituição vê o ativo (referência)
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
    const { consultorPerfilId } = useClient();
    // Dono das personalizações = perfil_id (auth) do consultor selecionado no header.
    // Resolvido no MainLayout; null quando nenhum consultor específico está selecionado.
    const consultorContextoId = consultorPerfilId;

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
    const [busca, setBusca]               = useState('');
    const [aba, setAba]                   = useState<'REGRAS' | 'LIQUIDEZ'>('REGRAS');

    const fetchData = async () => {
        if (!perfil) return;
        if (!consultorContextoId) { setRegras([]); setLoading(false); return; }
        setLoading(true);
        try {
            const [clientesRes, canonicosRes, dicionarioRes, classRes, regrasRes, emissoresRes] = await Promise.all([
                supabase.from('clientes').select('id, nome').order('nome'),
                supabase.from('ativos_canonicos').select('id, nome_canonico, classe_avere, liquidez_avere, data_vencimento, emissor_id, sub_tipo_canonico, taxa_canonica, taxa_formatada, benchmark_canonico').order('nome_canonico'),
                supabase.from('dicionario_ativos').select('ativo_canonico_id, instituicao_origem, codigo_identificador, tipo_identificador, nome_ativo, emissor_original, classe_original, liquidez_api_original, vencimento_api_original, index_rate, taxa_formatada'),
                supabase.from('dicionario_classes').select('nome').order('ordem_exibicao'),
                supabase.from('excecoes_classificacao').select('*').eq('consultor_id', consultorContextoId),
                supabase.from('dicionario_emissores').select('id, nome_fantasia').order('nome_fantasia'),
            ]);

            const algumErro = [clientesRes, canonicosRes, dicionarioRes, classRes, regrasRes, emissoresRes].find(r => r.error);
            if (algumErro?.error) throw algumErro.error;

            if (clientesRes.data)  setClientes(clientesRes.data);
            if (classRes.data)     setClassesDisponiveis(classRes.data.map(c => c.nome));
            if (emissoresRes.data) setEmissores(emissoresRes.data);

            // Agrega visões institucionais por canonico (pra exibir busca + badges)
            const visoesPorCanonico = new Map<string, { instituicoes: Set<string>; primeiroCodigo: string | null; visoes: VisaoInstitucional[] }>();
            (dicionarioRes.data || []).forEach((d: any) => {
                if (!d.ativo_canonico_id) return;
                const atual = visoesPorCanonico.get(d.ativo_canonico_id) ?? { instituicoes: new Set<string>(), primeiroCodigo: null, visoes: [] };
                atual.instituicoes.add(d.instituicao_origem);
                if (!atual.primeiroCodigo) atual.primeiroCodigo = d.codigo_identificador;
                atual.visoes.push({
                    instituicao_origem:      d.instituicao_origem,
                    codigo_identificador:    d.codigo_identificador,
                    tipo_identificador:      d.tipo_identificador,
                    nome_ativo:              d.nome_ativo,
                    emissor_original:        d.emissor_original,
                    classe_original:         d.classe_original,
                    liquidez_api_original:   d.liquidez_api_original,
                    vencimento_api_original: d.vencimento_api_original,
                    index_rate:              d.index_rate,
                    taxa_formatada:          d.taxa_formatada,
                });
                visoesPorCanonico.set(d.ativo_canonico_id, atual);
            });

            const canonicosLista: AtivoCanonicoOption[] = (canonicosRes.data || []).map((c: any) => {
                const v = visoesPorCanonico.get(c.id);
                return {
                    ...c,
                    instituicoes_visoes:    v ? Array.from(v.instituicoes) : [],
                    identificador_exibicao: v?.primeiroCodigo ?? '',
                    visoes:                 v?.visoes ?? [],
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
        } catch (err: any) {
            console.error('Erro ao carregar dados:', err);
            toast.error(`Erro ao carregar: ${err?.message ?? 'tente novamente.'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [perfil?.id, consultorContextoId]);

    const emissoresMap = useMemo(() => new Map(emissores.map(e => [e.id, e.nome_fantasia])), [emissores]);
    const canonicosPorId = useMemo(() => new Map(canonicos.map(c => [c.id, c])), [canonicos]);

    const regrasFiltradas = useMemo(() => {
        const q = busca.trim().toLowerCase();
        if (!q) return regras;
        return regras.filter(r => {
            const clienteNome = clientes.find(c => c.id === r.cliente_id)?.nome ?? '';
            return (
                (r.canonico_nome ?? '').toLowerCase().includes(q) ||
                (r.apelido_ativo ?? '').toLowerCase().includes(q) ||
                clienteNome.toLowerCase().includes(q)
            );
        });
    }, [regras, busca, clientes]);

    const openNewModal = () => {
        if (!consultorContextoId) { toast.error('Selecione um consultor específico no seletor do topo para criar personalizações.'); return; }
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
                setIsModalOpen(false);
                fetchData();
            }},
            cancel: { label: 'Cancelar', onClick: () => {} },
        });
    };

    const handleSaveRegra = async (payload: any, editId: string | null) => {
        setSalvando(true);
        try {
            if (!consultorContextoId) { toast.error('Selecione um consultor no topo para personalizar.'); setSalvando(false); return; }
            const payloadFinal = { ...payload, consultor_id: consultorContextoId };
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
                {aba === 'REGRAS' && (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <TextField
                            leftIcon={Search}
                            placeholder="Buscar ativo, apelido ou cliente..."
                            value={busca}
                            onChange={e => setBusca(e.target.value)}
                            style={{ width: 280 }}
                        />
                        <Button variant="solid" onClick={openNewModal} disabled={!consultorContextoId}>
                            <Plus size={16} style={{ marginRight: '8px' }} /> Nova Regra
                        </Button>
                    </div>
                )}
            </header>

            {!consultorContextoId && (
                <Card style={{ padding: '16px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <Typography variant="p" style={{ fontSize: '13px', color: '#92400E', margin: 0 }}>
                        Selecione um <strong>consultor específico</strong> no seletor do topo para ver e criar personalizações. As exceções ficam atreladas ao consultor e refletem apenas nos clientes dele.
                    </Typography>
                </Card>
            )}

            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '12px' }}>
                <Button variant={aba === 'REGRAS' ? 'solid' : 'ghost'} onClick={() => setAba('REGRAS')}>Personalizações</Button>
                <Button variant={aba === 'LIQUIDEZ' ? 'solid' : 'ghost'} onClick={() => setAba('LIQUIDEZ')}>Liquidez por Subtipo</Button>
            </div>

            {aba === 'LIQUIDEZ' && consultorContextoId && (
                <LiquidezSubtipoConsultor consultorId={consultorContextoId} />
            )}

            {aba === 'REGRAS' && (
            <>
            <style>{`.regra-row:hover { background: rgba(0,131,203,0.04); }`}</style>
            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEEEEE' }}>
                            <th style={thPA}>Ativo (Master → Personalizado)</th>
                            <th style={thPA}>Classe</th>
                            <th style={thPA}>Vencimento / Liquidez</th>
                            <th style={thPA}>Emissor</th>
                            <th style={thPA}>Escopo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regrasFiltradas.map(item => {
                            const c = canonicosPorId.get(item.ativo_canonico_id);
                            const emissorOriginal = item.canonico_emissor_id ? emissoresMap.get(item.canonico_emissor_id) : null;
                            const emissorCustom = item.emissor_customizado_id ? emissoresMap.get(item.emissor_customizado_id) : null;
                            const clienteNome = clientes.find(cl => cl.id === item.cliente_id)?.nome;
                            const vlOrig = vencLiq(item.canonico_vencimento, item.canonico_liquidez);
                            const vlCustom = vencLiq(item.vencimento_customizado, item.liquidez_customizada);
                            const taxa = padronizarTaxaExibicao(c?.taxa_formatada || c?.taxa_canonica) || '';
                            return (
                                <tr key={item.id} className="regra-row" onClick={() => openEditModal(item)} style={{ borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }}>
                                    {/* Ativo (cartão estilo Master) */}
                                    <td style={{ ...tdPA, minWidth: '280px' }}>
                                        <Typography variant="p" title={item.canonico_nome} style={{ fontWeight: 700, fontSize: '13px', color: '#111827', margin: 0 }}>{item.canonico_nome}</Typography>
                                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primaria)' }}>
                                            {item.apelido_ativo
                                                ? <>→ {item.apelido_ativo}</>
                                                : <span style={{ opacity: 0.4, fontWeight: 500, fontStyle: 'italic' }}>nome original mantido</span>}
                                        </div>
                                        {c?.identificador_exibicao && (
                                            <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#6B7280', marginTop: '2px' }}>{c.identificador_exibicao}</div>
                                        )}
                                        <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                                            {(c?.instituicoes_visoes ?? []).map(inst => {
                                                const cor = CORES_INST[inst] ?? { bg: '#E5E7EB', fg: '#374151' };
                                                return <span key={inst} style={{ background: cor.bg, color: cor.fg, fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>{inst}</span>;
                                            })}
                                            {taxa && <Badge variant="ghost" style={{ fontSize: '9px' }}>{taxa}</Badge>}
                                        </div>
                                    </td>

                                    {/* Classe (orig → custom) */}
                                    <td style={tdPA}>
                                        <div style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 700, textTransform: 'uppercase' }}>{item.canonico_classe || '—'}</div>
                                        <div style={{ fontSize: '13px', color: item.classe_customizada ? 'var(--color-secundaria)' : '#9CA3AF', fontWeight: 600 }}>
                                            {item.classe_customizada || 'Sem alteração'}
                                        </div>
                                    </td>

                                    {/* Vencimento / Liquidez (orig → custom, modelo Home) */}
                                    <td style={tdPA}>
                                        <div style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>{vlOrig || '—'}</div>
                                        <div style={{ fontSize: '13px', color: vlCustom ? 'var(--color-secundaria)' : '#9CA3AF', fontWeight: 700 }}>
                                            {vlCustom || 'Sem alteração'}
                                        </div>
                                    </td>

                                    {/* Emissor (orig → custom) */}
                                    <td style={tdPA}>
                                        <div style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>{emissorOriginal || '—'}</div>
                                        <div style={{ fontSize: '13px', color: emissorCustom ? 'var(--color-secundaria)' : '#9CA3AF', fontWeight: 700 }}>
                                            {emissorCustom || '—'}
                                        </div>
                                    </td>

                                    {/* Escopo */}
                                    <td style={tdPA}>
                                        {item.cliente_id ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <Badge variant="ghost" style={{ background: '#FFF7ED', color: '#C2410C', fontSize: '10px', border: 'none' }}>Cliente Específico</Badge>
                                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', paddingLeft: '4px' }}>{clienteNome}</span>
                                            </div>
                                        ) : (
                                            <Badge variant="ghost" style={{ background: '#ECFDF5', color: '#047857', fontSize: '10px', border: 'none' }}>Carteira Global</Badge>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {regrasFiltradas.length === 0 && (
                            <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', opacity: 0.4 }}>Nenhuma personalização encontrada.</td></tr>
                        )}
                    </tbody>
                </table>
            </Card>
            </>
            )}

            <DrawerRegra
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRegra}
                onDelete={handleDelete}
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
