import { useState, useEffect, useMemo } from 'react';
import { Card, Button, DataTable, Spinner, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, TextField, Badge, toast } from 'avere-ui';
import { Plus, Edit2, Trash2, Search, Sparkles, X as XIcon, ShieldCheck } from 'lucide-react';
import { supabase } from '../../services/supabase';

interface Emissor {
    id: string;
    nome_fantasia: string;
    cnpj_raiz: string | null;
    setor: string | null;
    ticker_referencia: string | null;
    conglomerado_id: string | null;
}

interface Conglomerado { id: string; nome_lider: string; }
interface InstituicaoFGC { id: string; conglomerado_id: string; nome_instituicao: string; }

// ── Fuzzy match utilitário ─────────────────────────────────────────────────
const STOPWORDS = new Set([
    's', 'sa', 'as', 'sas', 'ltda', 'me', 'eireli', 'banco', 'bco', 'cia',
    'sociedade', 'de', 'do', 'da', 'dos', 'das', 'e', 'em', 'no', 'na',
    'credito', 'crédito', 'financiamento', 'investimento', 'investimentos',
    'cfi', 'holding', 'brasil', 'brasileira', 'brasileiro', 's/a',
    'multiplo', 'múltiplo', 'mult', 'corretora', 'distribuidora', 'cvm', 'dtvm',
]);
function normalize(s: string): string {
    return (s || '').toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function tokens(s: string): string[] {
    return normalize(s).split(' ').filter(t => t.length >= 2 && !STOPWORDS.has(t));
}
function similarity(a: string, b: string): number {
    const ta = new Set(tokens(a));
    const tb = new Set(tokens(b));
    if (ta.size === 0 || tb.size === 0) return 0;
    let inter = 0;
    for (const t of ta) if (tb.has(t)) inter++;
    return inter / Math.min(ta.size, tb.size);
}

export default function EmissoresTab() {
    const [data, setData] = useState<Emissor[]>([]);
    const [conglomerados, setConglomerados] = useState<Conglomerado[]>([]);
    const [instituicoes, setInstituicoes] = useState<InstituicaoFGC[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Emissor>>({
        nome_fantasia: '', cnpj_raiz: '', setor: '', ticker_referencia: '', conglomerado_id: null,
    });
    const [conglomBusca, setConglomBusca] = useState('');
    const [conglomDropdownOpen, setConglomDropdownOpen] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const [{ data: emissores, error: e1 }, { data: congls, error: e2 }, { data: insts, error: e3 }] = await Promise.all([
                supabase.from('dicionario_emissores').select('*').order('nome_fantasia'),
                supabase.from('dicionario_conglomerados').select('id, nome_lider').order('nome_lider'),
                supabase.from('instituicoes_fgc').select('id, conglomerado_id, nome_instituicao'),
            ]);
            if (e1) throw e1;
            if (e2) throw e2;
            if (e3) throw e3;
            setData(emissores ?? []);
            setConglomerados(congls ?? []);
            setInstituicoes(insts ?? []);
        } catch (err: any) {
            console.error(err);
            toast.error(`Erro ao carregar: ${err.message ?? err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    // Mapas para lookup O(1)
    const congPorId = useMemo(() => {
        const m = new Map<string, string>();
        conglomerados.forEach(c => m.set(c.id, c.nome_lider));
        return m;
    }, [conglomerados]);

    // ── Sugestão automática baseada em nome_fantasia ──────────────────────
    const sugestao = useMemo(() => {
        const nome = (formData.nome_fantasia ?? '').trim();
        if (nome.length < 3 || instituicoes.length === 0) return null;
        let best: { conglomerado_id: string; nome_instituicao: string; score: number } | null = null;
        for (const inst of instituicoes) {
            const s = similarity(nome, inst.nome_instituicao);
            if (s > 0.5 && (!best || s > best.score)) {
                best = { conglomerado_id: inst.conglomerado_id, nome_instituicao: inst.nome_instituicao, score: s };
            }
        }
        if (!best) return null;
        const liderNome = congPorId.get(best.conglomerado_id);
        if (!liderNome) return null;
        // Não sugere se já está selecionado
        if (formData.conglomerado_id === best.conglomerado_id) return null;
        return { ...best, nome_lider: liderNome };
    }, [formData.nome_fantasia, formData.conglomerado_id, instituicoes, congPorId]);

    // Conglomerados filtrados na busca do dropdown
    const conglomFiltrados = useMemo(() => {
        const q = conglomBusca.trim().toLowerCase();
        const lista = q
            ? conglomerados.filter(c => c.nome_lider.toLowerCase().includes(q))
            : conglomerados;
        return lista.slice(0, 50);
    }, [conglomerados, conglomBusca]);

    const handleSave = async () => {
        const norm = (v: string | undefined | null) => {
            const s = (v ?? '').trim();
            return s === '' ? null : s;
        };
        const payload = {
            nome_fantasia:     norm(formData.nome_fantasia) ?? '',
            cnpj_raiz:         norm(formData.cnpj_raiz),
            setor:             norm(formData.setor),
            ticker_referencia: norm(formData.ticker_referencia),
            conglomerado_id:   formData.conglomerado_id ?? null,
        };

        if (!payload.nome_fantasia) {
            toast.error('Nome Fantasia é obrigatório.');
            return;
        }

        try {
            const { error } = editId
                ? await supabase.from('dicionario_emissores').update(payload).eq('id', editId)
                : await supabase.from('dicionario_emissores').insert([payload]);

            if (error) {
                if (error.code === '23505') {
                    toast.error('Já existe um emissor com esse CNPJ.');
                } else {
                    toast.error(`Erro ao salvar emissor: ${error.message}`);
                }
                return;
            }
            setIsModalOpen(false);
            load();
        } catch (err: any) {
            console.error(err);
            toast.error(`Erro ao salvar emissor: ${err.message ?? 'erro desconhecido'}`);
        }
    };

    const filtered = data.filter(i =>
        i.nome_fantasia.toLowerCase().includes(search.toLowerCase())
    );

    const liderSelecionado = formData.conglomerado_id ? congPorId.get(formData.conglomerado_id) : null;

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}><Spinner size="lg" /></div>;

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <TextField
                    leftIcon={Search}
                    placeholder="Buscar emissor..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: 280 }}
                />
                <Button variant="solid" onClick={() => {
                    setEditId(null);
                    setFormData({ nome_fantasia: '', cnpj_raiz: '', setor: '', ticker_referencia: '', conglomerado_id: null });
                    setConglomBusca('');
                    setIsModalOpen(true);
                }}>
                    <Plus size={16} style={{ marginRight: 8 }} /> Novo Emissor
                </Button>
            </div>

            <Card style={{ padding: 0 }}>
                <DataTable
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    columns={[
                        { header: 'Nome Fantasia', accessorKey: 'nome_fantasia' },
                        { header: 'Setor', accessorKey: 'setor' },
                        {
                            header: 'Conglomerado FGC',
                            cell: (item: Emissor) => {
                                const lider = item.conglomerado_id ? congPorId.get(item.conglomerado_id) : null;
                                return lider
                                    ? <Badge variant="ghost" style={{ fontSize: 10, background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>{lider}</Badge>
                                    : <span style={{ opacity: 0.3, fontSize: 11 }}>—</span>;
                            },
                        },
                        {
                            header: '',
                            cell: (item: Emissor) => (
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2
                                        size={16} color="#9CA3AF" style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setEditId(item.id);
                                            setFormData(item);
                                            setConglomBusca('');
                                            setIsModalOpen(true);
                                        }}
                                    />
                                    <Trash2
                                        size={16} color="#EF4444" style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            toast('Excluir este emissor?', {
                                                action: { label: 'Excluir', onClick: async () => {
                                                    const { error } = await supabase.from('dicionario_emissores').delete().eq('id', item.id);
                                                    if (error) {
                                                        console.error('Erro ao excluir emissor:', error);
                                                        toast.error('Sem permissão para excluir. Verifique as políticas RLS.');
                                                        return;
                                                    }
                                                    toast.success('Emissor excluído.');
                                                    load();
                                                }},
                                                cancel: { label: 'Cancelar', onClick: () => {} },
                                            });
                                        }}
                                    />
                                </div>
                            ),
                        },
                    ]}
                />
            </Card>

            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>{editId ? 'Editar Emissor' : 'Novo Emissor'}</ModalTitle>
                        <ModalDescription>Preencha os dados do emissor de risco.</ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label="Nome Fantasia"
                            value={formData.nome_fantasia || ''}
                            onChange={e => setFormData({ ...formData, nome_fantasia: e.target.value })}
                        />
                        <TextField
                            label="CNPJ Raiz"
                            value={formData.cnpj_raiz || ''}
                            onChange={e => setFormData({ ...formData, cnpj_raiz: e.target.value })}
                        />
                        <TextField
                            label="Setor"
                            value={formData.setor || ''}
                            onChange={e => setFormData({ ...formData, setor: e.target.value })}
                        />

                        {/* ── Campo Conglomerado FGC ────────────────────────────── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-secundaria)' }}>
                                Conglomerado FGC
                            </label>

                            {/* Sugestão automática */}
                            {sugestao && (
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '8px 10px', borderRadius: 8,
                                    background: 'rgba(245, 158, 11, 0.08)',
                                    border: '1px solid rgba(245, 158, 11, 0.25)',
                                }}>
                                    <Sparkles size={14} color="#B45309" style={{ flexShrink: 0 }} />
                                    <div style={{ flex: 1, fontSize: 11, lineHeight: 1.3 }}>
                                        <div style={{ opacity: 0.7 }}>Sugestão (match {(sugestao.score * 100).toFixed(0)}% com "{sugestao.nome_instituicao}"):</div>
                                        <div style={{ fontWeight: 700, color: '#92400E' }}>{sugestao.nome_lider}</div>
                                    </div>
                                    <Button
                                        variant="solid"
                                        onClick={() => setFormData({ ...formData, conglomerado_id: sugestao.conglomerado_id })}
                                        style={{ height: 28, padding: '0 10px', fontSize: 11 }}
                                    >
                                        Aplicar
                                    </Button>
                                </div>
                            )}

                            {/* Selecionado */}
                            {liderSelecionado ? (
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '10px 12px', borderRadius: 8,
                                    background: 'rgba(16, 185, 129, 0.08)',
                                    border: '1px solid rgba(16, 185, 129, 0.25)',
                                }}>
                                    <ShieldCheck size={14} color="#10B981" style={{ flexShrink: 0 }} />
                                    <span style={{ flex: 1, fontSize: 12, fontWeight: 600 }}>{liderSelecionado}</span>
                                    <XIcon
                                        size={14} color="#6B7280" style={{ cursor: 'pointer' }}
                                        onClick={() => setFormData({ ...formData, conglomerado_id: null })}
                                    />
                                </div>
                            ) : (
                                <div style={{ position: 'relative' }}>
                                    <TextField
                                        placeholder="Buscar conglomerado FGC..."
                                        value={conglomBusca}
                                        onChange={e => { setConglomBusca(e.target.value); setConglomDropdownOpen(true); }}
                                        onFocus={() => setConglomDropdownOpen(true)}
                                    />
                                    {conglomDropdownOpen && conglomFiltrados.length > 0 && (
                                        <div style={{
                                            position: 'absolute', top: '100%', left: 0, right: 0,
                                            background: '#fff', border: '1px solid rgba(0,0,0,0.1)',
                                            borderRadius: 8, marginTop: 4, maxHeight: 220, overflowY: 'auto',
                                            zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        }}>
                                            {conglomFiltrados.map(c => (
                                                <div
                                                    key={c.id}
                                                    onClick={() => {
                                                        setFormData({ ...formData, conglomerado_id: c.id });
                                                        setConglomBusca('');
                                                        setConglomDropdownOpen(false);
                                                    }}
                                                    style={{
                                                        padding: '8px 12px', fontSize: 12, cursor: 'pointer',
                                                        borderBottom: '1px solid rgba(0,0,0,0.04)',
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,131,203,0.06)')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                                >
                                                    {c.nome_lider}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSave}>Salvar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
