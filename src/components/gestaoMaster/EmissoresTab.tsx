import { useState, useEffect } from 'react';
import { Card, Button, DataTable, Spinner, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, TextField, Combobox, toast } from 'avere-ui';
import { Plus, Edit2, Trash2, Search, Landmark } from 'lucide-react';
import { supabase } from '../../services/supabase';

// Emissor = catálogo de crédito PRIVADO (debêntures, CRA, CRI, FIDC...).
// Conglomerado bancário (FGC) é um conceito separado — vive na aba FGC.
interface Emissor {
    id: string;
    nome_fantasia: string;
    cnpj_raiz: string | null;
    setor_id: string | null;
    setor_nome: string | null;   // derivado do join (apenas exibição)
    ticker_referencia: string | null;
}

interface SetorOpcao { id: string; nome: string; }

export default function EmissoresTab() {
    const [data, setData] = useState<Emissor[]>([]);
    const [setores, setSetores] = useState<SetorOpcao[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Emissor>>({
        nome_fantasia: '', cnpj_raiz: '', setor_id: null, ticker_referencia: '',
    });
    const [aliasesForm, setAliasesForm] = useState<string[]>([]);
    // Importação assistida de bancos (conglomerados FGC) como emissores
    const [conglomerados, setConglomerados] = useState<{ id: string; nome: string }[]>([]);
    const [importadosCongl, setImportadosCongl] = useState<Set<string>>(new Set());
    const [importOpen, setImportOpen] = useState(false);
    const [importSel, setImportSel] = useState<Set<string>>(new Set());
    const [importSearch, setImportSearch] = useState('');
    const [importing, setImporting] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const [{ data: res, error }, { data: setoresDb }, { data: conglDb }] = await Promise.all([
                supabase
                    .from('dicionario_emissores')
                    .select('id, nome_fantasia, cnpj_raiz, setor_id, ticker_referencia, setores(nome)')
                    .order('nome_fantasia'),
                supabase.from('setores').select('id, nome').order('ordem_exibicao'),
                supabase.from('dicionario_conglomerados').select('id, nome_lider, nome_fantasia').order('nome_lider'),
            ]);
            if (error) throw error;
            const emissoresList: Emissor[] = (res ?? []).map((r: any) => ({
                id: r.id,
                nome_fantasia: r.nome_fantasia,
                cnpj_raiz: r.cnpj_raiz,
                setor_id: r.setor_id,
                setor_nome: r.setores?.nome ?? null,
                ticker_referencia: r.ticker_referencia,
            }));
            setData(emissoresList);
            setSetores(setoresDb ?? []);
            const conglList = (conglDb ?? []).map((c: any) => ({ id: c.id, nome: c.nome_fantasia || c.nome_lider }));
            setConglomerados(conglList);
            // "Já importado" = banco cujo nome já existe como emissor (sem coluna de vínculo).
            const nomesEmissores = new Set(emissoresList.map(e => e.nome_fantasia.trim().toLowerCase()));
            setImportadosCongl(new Set(conglList.filter(c => nomesEmissores.has(c.nome.trim().toLowerCase())).map(c => c.id)));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleSave = async () => {
        const norm = (v: string | undefined | null) => {
            const s = (v ?? '').trim();
            return s === '' ? null : s;
        };
        const payload = {
            nome_fantasia:     norm(formData.nome_fantasia) ?? '',
            cnpj_raiz:         norm(formData.cnpj_raiz),
            setor_id:          formData.setor_id || null,
            ticker_referencia: norm(formData.ticker_referencia),
        };

        if (!payload.nome_fantasia) {
            toast.error('Nome Fantasia é obrigatório.');
            return;
        }

        try {
            let emissorId = editId;
            if (editId) {
                const { error } = await supabase.from('dicionario_emissores').update(payload).eq('id', editId);
                if (error) {
                    toast.error(error.code === '23505' ? 'Já existe um emissor com esse CNPJ.' : `Erro ao salvar emissor: ${error.message}`);
                    return;
                }
            } else {
                const { data: novo, error } = await supabase.from('dicionario_emissores').insert([payload]).select('id').single();
                if (error) {
                    toast.error(error.code === '23505' ? 'Já existe um emissor com esse CNPJ.' : `Erro ao salvar emissor: ${error.message}`);
                    return;
                }
                emissorId = novo!.id;
            }

            // Sincroniza aliases (substitui a lista do emissor)
            const aliasesLimpos = Array.from(new Set(aliasesForm.map(a => a.trim()).filter(Boolean)));
            await supabase.from('emissor_aliases').delete().eq('emissor_id', emissorId);
            if (aliasesLimpos.length > 0) {
                await supabase.from('emissor_aliases').insert(aliasesLimpos.map(alias => ({ emissor_id: emissorId, alias })));
            }

            setIsModalOpen(false);
            toast.success(editId ? `Emissor "${payload.nome_fantasia}" atualizado.` : `Emissor "${payload.nome_fantasia}" cadastrado.`);
            load();
        } catch (err: any) {
            console.error(err);
            toast.error(`Erro ao salvar emissor: ${err.message ?? 'erro desconhecido'}`);
        }
    };

    const handleImportar = async () => {
        const ids = Array.from(importSel).filter(id => !importadosCongl.has(id));
        if (ids.length === 0) { toast.error('Selecione ao menos um banco ainda não importado.'); return; }
        const financeiro = setores.find(s => /financeiro/i.test(s.nome));
        setImporting(true);
        try {
            const rows = ids.map(id => {
                const c = conglomerados.find(x => x.id === id)!;
                return { nome_fantasia: c.nome, setor_id: financeiro?.id ?? null };
            });
            const { error } = await supabase.from('dicionario_emissores').insert(rows);
            if (error) throw error;
            toast.success(`${rows.length} banco(s) importado(s) como emissor${financeiro ? ' (setor Financeiro)' : ''}.`);
            setImportOpen(false);
            setImportSel(new Set());
            setImportSearch('');
            load();
        } catch (err: any) {
            toast.error(`Falha ao importar: ${err?.message ?? 'tente novamente.'}`);
        } finally {
            setImporting(false);
        }
    };

    const conglFiltrados = conglomerados.filter(c => c.nome.toLowerCase().includes(importSearch.toLowerCase()));

    const filtered = data.filter(i =>
        i.nome_fantasia.toLowerCase().includes(search.toLowerCase())
    );

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
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant="outline" onClick={() => { setImportSel(new Set()); setImportSearch(''); setImportOpen(true); }}>
                        <Landmark size={16} style={{ marginRight: 8 }} /> Importar bancos (FGC)
                    </Button>
                    <Button variant="solid" onClick={() => {
                        setEditId(null);
                        setFormData({ nome_fantasia: '', cnpj_raiz: '', setor_id: null, ticker_referencia: '' });
                        setAliasesForm([]);
                        setIsModalOpen(true);
                    }}>
                        <Plus size={16} style={{ marginRight: 8 }} /> Novo Emissor
                    </Button>
                </div>
            </div>

            <Card style={{ padding: 0 }}>
                <DataTable
                    data={filtered}
                    selectable={false}
                    keyExtractor={(item) => item.id}
                    columns={[
                        { header: 'Nome Fantasia', accessorKey: 'nome_fantasia' },
                        {
                            header: 'Setor',
                            cell: (item: Emissor) => (
                                <span style={{ color: item.setor_nome ? 'inherit' : '#9CA3AF' }}>
                                    {item.setor_nome ?? '— sem setor —'}
                                </span>
                            ),
                        },
                        {
                            header: '',
                            cell: (item: Emissor) => (
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingRight: '16px' }}>
                                    <Edit2
                                        size={16} color="#9CA3AF" style={{ cursor: 'pointer' }}
                                        onClick={async () => {
                                            setEditId(item.id);
                                            setFormData(item);
                                            setAliasesForm([]);
                                            setIsModalOpen(true);
                                            const { data } = await supabase.from('emissor_aliases').select('alias').eq('emissor_id', item.id).order('alias');
                                            setAliasesForm((data ?? []).map((a: any) => a.alias));
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
                                                        toast.error(error.code === '23503'
                                                            ? 'Não é possível excluir: o emissor está vinculado a ativos.'
                                                            : error.code === '42501'
                                                                ? 'Sem permissão para excluir (RLS).'
                                                                : `Erro ao excluir: ${error.message}`);
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
                        <ModalDescription>Emissor de crédito privado (debêntures, CRA, CRI, FIDC).</ModalDescription>
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
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', marginBottom: '6px' }}>
                                Setor
                            </label>
                            <Combobox
                                options={setores.map(s => ({ label: s.nome, value: s.id }))}
                                value={formData.setor_id || ''}
                                onChange={(v: string) => setFormData({ ...formData, setor_id: v || null })}
                                placeholder="Selecione o setor..."
                            />
                            <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '6px' }}>
                                Lista curada (Gestão Master → Setores). Para um setor inexistente, cadastre-o primeiro lá.
                            </p>
                        </div>

                        {/* Nomes alternativos (aliases) — como as APIs escrevem o emissor */}
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', marginBottom: '6px' }}>
                                Nomes alternativos (como as APIs escrevem)
                            </label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {aliasesForm.map((a, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <div style={{ flex: 1 }}>
                                            <TextField
                                                value={a}
                                                placeholder="Ex: BCO ABC BRASIL"
                                                onChange={e => setAliasesForm(prev => prev.map((x, j) => j === i ? e.target.value : x))}
                                            />
                                        </div>
                                        <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer', flexShrink: 0 }}
                                            onClick={() => setAliasesForm(prev => prev.filter((_, j) => j !== i))} />
                                    </div>
                                ))}
                                <Button variant="outline" onClick={() => setAliasesForm(prev => [...prev, ''])} style={{ alignSelf: 'flex-start' }}>
                                    <Plus size={14} style={{ marginRight: 6 }} /> Adicionar nome alternativo
                                </Button>
                            </div>
                            <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '6px', lineHeight: 1.4 }}>
                                Quando uma corretora enviar o emissor com grafia diferente, registre aqui — o auto-classify passa a casar por qualquer um desses nomes.
                            </p>
                        </div>
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSave}>Salvar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Importação assistida: bancos (conglomerados FGC) → emissores */}
            <Modal open={importOpen} onOpenChange={setImportOpen}>
                <ModalContent style={{ maxWidth: '560px', width: '92vw', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
                    <ModalHeader>
                        <ModalTitle>Importar bancos como emissores</ModalTitle>
                        <ModalDescription>Selecione os bancos (base FGC) que também emitem crédito privado. São criados como emissores no setor Financeiro, vinculados ao conglomerado.</ModalDescription>
                    </ModalHeader>
                    <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1, minHeight: 0 }}>
                        <TextField leftIcon={Search} placeholder="Buscar banco..." value={importSearch} onChange={e => setImportSearch(e.target.value)} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {conglFiltrados.length === 0 && <p style={{ fontSize: '13px', color: '#9CA3AF', padding: '12px' }}>Nenhum banco encontrado.</p>}
                            {conglFiltrados.map(c => {
                                const jaImportado = importadosCongl.has(c.id);
                                const sel = importSel.has(c.id);
                                return (
                                    <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', cursor: jaImportado ? 'default' : 'pointer', background: sel ? 'rgba(0,131,203,0.06)' : 'transparent', opacity: jaImportado ? 0.5 : 1 }}>
                                        <input
                                            type="checkbox"
                                            disabled={jaImportado}
                                            checked={jaImportado || sel}
                                            onChange={() => setImportSel(prev => {
                                                const n = new Set(prev);
                                                n.has(c.id) ? n.delete(c.id) : n.add(c.id);
                                                return n;
                                            })}
                                        />
                                        <span style={{ fontSize: '13px', color: 'var(--color-secundaria)' }}>{c.nome}</span>
                                        {jaImportado && <span style={{ fontSize: '10px', color: '#9CA3AF', marginLeft: 'auto' }}>já é emissor</span>}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <ModalFooter>
                        <Button variant="outline" onClick={() => setImportOpen(false)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleImportar} disabled={importing}>
                            {importing ? <Spinner size="sm" /> : `Importar (${Array.from(importSel).filter(id => !importadosCongl.has(id)).length})`}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
