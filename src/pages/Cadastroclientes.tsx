import { useState, useEffect } from 'react';
import {
    Typography, Card, Button, Spinner, toast, Combobox,
    Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, TextField,
} from 'avere-ui';
import { Plus, Trash2, Pencil, Search, ChevronDown, GripVertical } from 'lucide-react';
import { supabase } from '../services/supabase';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Consultor { id: string; nome: string; }
interface Instituicao { id: string; nome: string; tipo: string; }
interface Cliente {
    id: string;
    nome: string;
    consultor_id: string | null;
    codigo_avere: string | null;
}
interface Conta {
    id?: string;
    uid?: string;          // id estável só para o drag-and-drop no formulário
    instituicao_id: string;
    apelido: string | null;
    codigo: string | null;
    documento: string | null;
    ordem?: number;
}

// CPF: máscara 000.000.000-00
const maskCPF = (v: string) => {
    const d = (v || '').replace(/\D/g, '').slice(0, 11);
    return d.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};
// CNPJ: máscara 00.000.000/0000-00
const maskCNPJ = (v: string) => {
    const d = (v || '').replace(/\D/g, '').slice(0, 14);
    return d.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};
const apenasDigitos = (v: string | null | undefined) => (v || '').replace(/\D/g, '');
const ehCnpj = (v: string | null | undefined) => apenasDigitos(v).length > 11;
const maskDoc = (v: string, tipo: 'PF' | 'PJ') => (tipo === 'PJ' ? maskCNPJ(v) : maskCPF(v));
const nomeTemNumero = (s: string) => /\d/.test(s);
const isAgoraNome = (nome: string | undefined) => /agora|ágora/i.test(nome || '');

const thStyle: React.CSSProperties = {
    padding: '12px 16px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.05em', color: '#9CA3AF', textAlign: 'left', whiteSpace: 'nowrap',
};
const tdStyle: React.CSSProperties = { padding: '12px 16px', verticalAlign: 'middle' };

// Select nativo estilizado como input avere — clicável dentro da modal (sem o
// conflito Radix Select × Dialog) e com dropdown do SO (nunca recortado).
const selectNativo: React.CSSProperties = {
    width: '100%', height: '40px', padding: '0 32px 0 12px', borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.15)', fontSize: '14px', fontFamily: 'var(--font-family)',
    background: '#fff', outline: 'none', cursor: 'pointer', appearance: 'none',
};

// Card de conta arrastável (a ordem é persistida em cliente_contas.ordem)
function ContaSortable({ conta, instituicoes, tipoDoc, onChange, onRemove }: {
    conta: Conta;
    instituicoes: Instituicao[];
    tipoDoc: 'PF' | 'PJ';
    onChange: (patch: Partial<Conta>) => void;
    onRemove: () => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: conta.uid! });
    const agora = isAgoraNome(instituicoes.find(i => i.id === conta.instituicao_id)?.nome);
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.7 : 1,
        border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '12px',
        background: isDragging ? '#fff' : (agora ? 'rgba(0,131,203,0.04)' : 'rgba(0,0,0,0.015)'),
        boxShadow: isDragging ? '0 6px 16px rgba(0,0,0,0.12)' : 'none',
    };
    return (
        <div ref={setNodeRef} style={style}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1.3fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
                <div {...attributes} {...listeners} style={{ cursor: 'grab', opacity: 0.3, alignSelf: 'center', paddingBottom: '2px', touchAction: 'none' }} title="Arraste para reordenar">
                    <GripVertical size={18} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#9CA3AF', marginBottom: '4px' }}>Instituição</label>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={conta.instituicao_id}
                            onChange={e => onChange({ instituicao_id: e.target.value })}
                            style={{ ...selectNativo, color: conta.instituicao_id ? 'var(--color-secundaria)' : '#9CA3AF' }}
                        >
                            <option value="">Selecione...</option>
                            {instituicoes.map(i => (
                                <option key={i.id} value={i.id}>{i.tipo === 'API' ? i.nome : `${i.nome} (manual)`}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
                    </div>
                </div>
                <TextField label="Apelido (opcional)" placeholder="ex.: XP Trader" value={conta.apelido || ''} onChange={e => onChange({ apelido: e.target.value })} />
                <TextField label={agora ? 'Conta (CLBC)' : 'Código da conta'} value={conta.codigo || ''} onChange={e => onChange({ codigo: e.target.value })} />
                <Trash2 size={18} color="#EF4444" style={{ cursor: 'pointer', marginBottom: '10px' }} onClick={onRemove} />
            </div>
            {agora && (
                <div style={{ marginTop: '10px', paddingLeft: '28px' }}>
                    <TextField
                        label={tipoDoc === 'PJ' ? 'CNPJ (Ágora)' : 'CPF (Ágora)'}
                        placeholder={tipoDoc === 'PJ' ? '00.000.000/0000-00' : '000.000.000-00'}
                        value={conta.documento || ''}
                        onChange={e => onChange({ documento: maskDoc(e.target.value, tipoDoc) })}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: '10px', color: '#9CA3AF' }}>A Ágora identifica a conta pelo documento + conta. As demais usam só o código.</p>
                </div>
            )}
        </div>
    );
}

export default function CadastroClientes() {
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [consultores, setConsultores] = useState<Consultor[]>([]);
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [linhas, setLinhas] = useState<Cliente[]>([]);
    const [contasPorCliente, setContasPorCliente] = useState<Record<string, Conta[]>>({});
    const [busca, setBusca] = useState('');
    const [filtroConsultor, setFiltroConsultor] = useState('');
    const [filtroInstituicao, setFiltroInstituicao] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clienteEmEdicao, setClienteEmEdicao] = useState<string | null>(null);
    const [formCliente, setFormCliente] = useState<Partial<Cliente>>({ nome: '', consultor_id: null, codigo_avere: '' });
    const [formContas, setFormContas] = useState<Conta[]>([]);
    const [erros, setErros] = useState<{ nome?: string; codigo_avere?: string }>({});
    const [tipoDoc, setTipoDoc] = useState<'PF' | 'PJ'>('PF');

    const instMap = new Map(instituicoes.map(i => [i.id, i]));
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    const handleContasDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        setFormContas(prev => {
            const oldIndex = prev.findIndex(c => c.uid === active.id);
            const newIndex = prev.findIndex(c => c.uid === over.id);
            if (oldIndex < 0 || newIndex < 0) return prev;
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [consRes, clisRes, instRes, contasRes] = await Promise.all([
                supabase.from('consultores').select('id, nome').eq('ativo', true).order('nome'),
                supabase.from('clientes').select('id, nome, consultor_id, codigo_avere').order('nome'),
                supabase.from('instituicoes').select('id, nome, tipo').order('tipo').order('nome'),
                supabase.from('cliente_contas').select('id, cliente_id, instituicao_id, apelido, codigo, documento, ordem').order('ordem'),
            ]);
            if (consRes.data) setConsultores(consRes.data);
            if (clisRes.data) setLinhas(clisRes.data);
            if (instRes.data) setInstituicoes(instRes.data);
            const map: Record<string, Conta[]> = {};
            (contasRes.data || []).forEach((r: any) => {
                (map[r.cliente_id] = map[r.cliente_id] || []).push({
                    id: r.id, instituicao_id: r.instituicao_id, apelido: r.apelido,
                    codigo: r.codigo, documento: r.documento, ordem: r.ordem,
                });
            });
            setContasPorCliente(map);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    // Rótulo de uma conta: apelido > "Inst N" (se houver >1 da mesma inst) > "Inst"
    const labelConta = (conta: Conta, irmas: Conta[]) => {
        const inst = instMap.get(conta.instituicao_id);
        const nomeInst = inst?.nome ?? 'Instituição';
        if (conta.apelido && conta.apelido.trim()) return conta.apelido.trim();
        const mesmas = irmas.filter(c => c.instituicao_id === conta.instituicao_id);
        if (mesmas.length <= 1) return nomeInst;
        const idx = mesmas.findIndex(c => c === conta);
        return `${nomeInst} ${idx + 1}`;
    };

    const handleNovoCliente = () => {
        setClienteEmEdicao(null);
        setFormCliente({ nome: '', consultor_id: null, codigo_avere: '' });
        setFormContas([]);
        setErros({});
        setTipoDoc('PF');
        setIsModalOpen(true);
    };

    const handleEditarNoModal = (cliente: Cliente) => {
        setClienteEmEdicao(cliente.id);
        setFormCliente({ id: cliente.id, nome: cliente.nome, consultor_id: cliente.consultor_id, codigo_avere: cliente.codigo_avere });
        const contas = (contasPorCliente[cliente.id] || []).map(c => ({ ...c, uid: c.id || crypto.randomUUID() }));
        setFormContas(contas);
        // infere PF/PJ pelo documento de alguma conta (Ágora)
        const docExistente = contas.find(c => c.documento)?.documento;
        setTipoDoc(ehCnpj(docExistente) ? 'PJ' : 'PF');
        setErros({});
        setIsModalOpen(true);
    };

    const validarModal = () => {
        const e: { nome?: string; codigo_avere?: string } = {};
        const nome = (formCliente.nome ?? '').trim();
        if (!nome) e.nome = 'Nome é obrigatório.';
        else if (tipoDoc === 'PF' && nomeTemNumero(nome)) e.nome = 'Nome não deve conter números.';
        else if (nome.length < 3) e.nome = 'Nome muito curto.';
        if (!(formCliente.codigo_avere ?? '').trim()) e.codigo_avere = 'Código Avere é obrigatório.';
        setErros(e);
        if (Object.keys(e).length > 0) return false;
        // toda conta preenchida precisa de instituição
        const semInst = formContas.find(c => (c.codigo || c.documento || c.apelido) && !c.instituicao_id);
        if (semInst) { toast.error('Há uma conta sem instituição selecionada.'); return false; }
        return true;
    };

    const handleSalvarModal = async () => {
        if (!validarModal()) return;
        setSalvando(true);
        try {
            let clienteId = clienteEmEdicao;
            const payload = {
                nome: (formCliente.nome ?? '').trim(),
                consultor_id: formCliente.consultor_id || null,
                codigo_avere: (formCliente.codigo_avere ?? '').trim() || null,
            };
            if (clienteEmEdicao) {
                const { error } = await supabase.from('clientes').update(payload).eq('id', clienteEmEdicao);
                if (error) throw error;
            } else {
                const { data: novo, error } = await supabase.from('clientes').insert([payload]).select('id').single();
                if (error) throw error;
                clienteId = novo!.id;
            }

            // Sincroniza contas PRESERVANDO os ids (NÃO apagar+recriar): os snapshots
            // de posição têm conta_id ON DELETE CASCADE — apagar uma conta apaga o
            // histórico dela. Então: UPDATE nas mantidas, INSERT nas novas, DELETE só
            // nas que o usuário removeu de fato. O trigger sincroniza colunas legadas.
            const contasValidas = formContas.filter(c => c.instituicao_id);
            const idsMantidos = contasValidas.filter(c => c.id).map(c => c.id as string);

            const { data: atuais } = await supabase.from('cliente_contas').select('id').eq('cliente_id', clienteId);
            const removidos = (atuais || []).map((r: any) => r.id).filter((id: string) => !idsMantidos.includes(id));
            if (removidos.length > 0) {
                const { error: delErr } = await supabase.from('cliente_contas').delete().in('id', removidos);
                if (delErr) throw delErr;
            }

            for (let i = 0; i < contasValidas.length; i++) {
                const c = contasValidas[i];
                const row = {
                    cliente_id: clienteId,
                    instituicao_id: c.instituicao_id,
                    apelido: (c.apelido || '').trim() || null,
                    codigo: (c.codigo || '').trim() || null,
                    documento: (c.documento || '').trim() || null,
                    ordem: i + 1,
                };
                const { error: upErr } = c.id
                    ? await supabase.from('cliente_contas').update(row).eq('id', c.id)
                    : await supabase.from('cliente_contas').insert(row);
                if (upErr) throw upErr;
            }

            setIsModalOpen(false);
            toast.success(clienteEmEdicao ? `Cliente "${payload.nome}" atualizado.` : `Cliente "${payload.nome}" cadastrado.`);
            fetchData();
        } catch (err: any) {
            if (err?.code === '23505') {
                toast.error('Código de conta já usado por outro cliente (número de conta deve ser único na instituição).');
            } else {
                console.error(err);
                toast.error(`Erro ao salvar: ${err?.message ?? 'tente novamente.'}`);
            }
        } finally { setSalvando(false); }
    };

    const handleExcluirCliente = (id: string, nome: string) => {
        toast(`Excluir o cliente ${nome}?`, {
            action: { label: 'Excluir', onClick: async () => {
                const { error } = await supabase.from('clientes').delete().eq('id', id);
                if (error) {
                    toast.error(error.code === '23503'
                        ? 'Não é possível excluir: o cliente possui posições/carteiras vinculadas.'
                        : `Erro ao excluir: ${error.message}`);
                    return;
                }
                toast.success('Cliente excluído.');
                fetchData();
            }},
            cancel: { label: 'Cancelar', onClick: () => {} },
        });
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    const opcoesConsultores = [{ value: '', label: 'Sem consultor' }, ...consultores.map(c => ({ value: c.id, label: c.nome }))];
    const nomeConsultor = (id: string | null) => consultores.find(c => c.id === id)?.nome || '—';

    const linhasFiltradas = linhas.filter(l => {
        const termo = busca.toLowerCase();
        const matchBusca = !termo || l.nome.toLowerCase().includes(termo) || (l.codigo_avere?.toLowerCase().includes(termo) ?? false);
        const matchConsultor = !filtroConsultor || l.consultor_id === filtroConsultor;
        const matchInstituicao = !filtroInstituicao || (contasPorCliente[l.id] || []).some(c => c.instituicao_id === filtroInstituicao);
        return matchBusca && matchConsultor && matchInstituicao;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px' }}>
                <div>
                    <Typography variant="h1" style={{ fontWeight: 700 }}>Base de Clientes</Typography>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Gestão de vínculos e contas por instituição.</Typography>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <TextField leftIcon={Search} placeholder="Pesquisar por nome ou cód. Avere..." value={busca} onChange={e => setBusca(e.target.value)} style={{ width: '280px' }} />
                    <select
                        value={filtroConsultor}
                        onChange={e => setFiltroConsultor(e.target.value)}
                        style={{ height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '13px', fontFamily: 'var(--font-family)', color: filtroConsultor ? 'var(--color-secundaria)' : '#9CA3AF', background: '#fff', outline: 'none', cursor: 'pointer', minWidth: '200px', appearance: 'auto' }}
                    >
                        <option value="">Todos os consultores</option>
                        {consultores.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                    <select
                        value={filtroInstituicao}
                        onChange={e => setFiltroInstituicao(e.target.value)}
                        style={{ height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '13px', fontFamily: 'var(--font-family)', color: filtroInstituicao ? 'var(--color-secundaria)' : '#9CA3AF', background: '#fff', outline: 'none', cursor: 'pointer', minWidth: '180px', appearance: 'auto' }}
                    >
                        <option value="">Todas as instituições</option>
                        {instituicoes.map(i => <option key={i.id} value={i.id}>{i.tipo === 'API' ? i.nome : `${i.nome} (manual)`}</option>)}
                    </select>
                    <Button variant="solid" onClick={handleNovoCliente}>
                        <Plus size={16} style={{ marginRight: 8 }} /> Novo Cliente
                    </Button>
                </div>
            </header>

            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEEEEE' }}>
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>Cód. Avere</th>
                            <th style={thStyle}>Consultor</th>
                            <th style={thStyle}>Contas</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhasFiltradas.map(l => {
                            const contas = contasPorCliente[l.id] || [];
                            return (
                                <tr key={l.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                    <td style={{ ...tdStyle, minWidth: '160px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-secundaria)' }}>{l.nome}</span>
                                    </td>
                                    <td style={{ ...tdStyle, minWidth: '110px' }}>
                                        <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 600, color: 'var(--color-primaria)' }}>{l.codigo_avere || '—'}</span>
                                    </td>
                                    <td style={{ ...tdStyle, minWidth: '150px' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--color-secundaria)' }}>{nomeConsultor(l.consultor_id)}</span>
                                    </td>
                                    <td style={{ ...tdStyle, minWidth: '320px' }}>
                                        {contas.length === 0 ? (
                                            <span style={{ opacity: 0.3, fontSize: '12px' }}>nenhuma conta</span>
                                        ) : (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {contas.map((c, i) => {
                                                    const inst = instMap.get(c.instituicao_id);
                                                    const agora = isAgoraNome(inst?.nome);
                                                    const detalhe = agora ? [c.documento, c.codigo].filter(Boolean).join(' · ') : c.codigo;
                                                    return (
                                                        <span key={c.id || i} title={detalhe || ''} style={{
                                                            display: 'inline-flex', alignItems: 'baseline', gap: '6px',
                                                            background: 'rgba(0,0,0,0.04)', borderRadius: '6px', padding: '3px 8px',
                                                            fontSize: '11px', fontFamily: 'Montserrat, sans-serif',
                                                        }}>
                                                            <strong style={{ color: 'var(--color-secundaria)' }}>{labelConta(c, contas)}</strong>
                                                            <span style={{ fontFamily: 'monospace', opacity: 0.6 }}>{detalhe || '—'}</span>
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                            <Pencil size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => handleEditarNoModal(l)} />
                                            <Trash2 size={16} color="#EF4444" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => handleExcluirCliente(l.id, l.nome)} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {linhasFiltradas.length === 0 && (
                            <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', opacity: 0.4 }}>Nenhum cliente encontrado.</td></tr>
                        )}
                    </tbody>
                </table>
            </Card>

            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent style={{ maxWidth: '760px', width: '92vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                    <ModalHeader>
                        <ModalTitle>{clienteEmEdicao ? 'Editar Cliente' : 'Novo Cliente'}</ModalTitle>
                        <ModalDescription>Identificação do cliente e suas contas por instituição.</ModalDescription>
                    </ModalHeader>

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1, minHeight: 0 }}>
                        {/* Perfil PF/PJ — governa labels e a máscara do documento (Ágora) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo de cliente</label>
                            <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.05)', padding: '3px', borderRadius: '8px' }}>
                                {([['PF', 'Pessoa Física'], ['PJ', 'Pessoa Jurídica']] as const).map(([t, rotulo]) => (
                                    <button key={t} type="button"
                                        onClick={() => {
                                            setTipoDoc(t);
                                            setFormContas(prev => prev.map(c => ({ ...c, documento: c.documento ? maskDoc(c.documento, t) : c.documento })));
                                        }}
                                        style={{
                                            border: 'none', cursor: 'pointer', height: '26px', padding: '0 14px', borderRadius: '6px',
                                            fontSize: '11px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif',
                                            background: tipoDoc === t ? '#fff' : 'transparent',
                                            color: tipoDoc === t ? 'var(--color-secundaria)' : '#9CA3AF',
                                            boxShadow: tipoDoc === t ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                                        }}>
                                        {rotulo}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <TextField
                                label={tipoDoc === 'PJ' ? 'Razão Social' : 'Nome Completo'}
                                value={formCliente.nome || ''}
                                onChange={e => { setFormCliente(p => ({ ...p, nome: e.target.value })); if (erros.nome) setErros(er => ({ ...er, nome: undefined })); }}
                            />
                            {erros.nome && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#EF4444' }}>{erros.nome}</p>}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'start' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Consultor Responsável</label>
                                <Combobox options={opcoesConsultores} value={formCliente.consultor_id || ''} onChange={(val) => setFormCliente(p => ({ ...p, consultor_id: val || null }))} placeholder="Selecione um consultor..." />
                            </div>
                            <div>
                                <TextField
                                    label="Cód. Avere"
                                    value={formCliente.codigo_avere || ''}
                                    onChange={e => { setFormCliente(p => ({ ...p, codigo_avere: e.target.value })); if (erros.codigo_avere) setErros(er => ({ ...er, codigo_avere: undefined })); }}
                                />
                                {erros.codigo_avere && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#EF4444' }}>{erros.codigo_avere}</p>}
                            </div>
                        </div>

                        {/* ── Contas por instituição ── */}
                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contas</label>
                                <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Um cliente pode ter várias contas na mesma instituição.</span>
                            </div>

                            {formContas.length === 0 && (
                                <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 10px' }}>Nenhuma conta. Adicione abaixo.</p>
                            )}

                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleContasDragEnd}>
                                <SortableContext items={formContas.map(c => c.uid!)} strategy={verticalListSortingStrategy}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {formContas.map((c, i) => (
                                            <ContaSortable
                                                key={c.uid}
                                                conta={c}
                                                instituicoes={instituicoes}
                                                tipoDoc={tipoDoc}
                                                onChange={(patch) => setFormContas(prev => prev.map((x, j) => j === i ? { ...x, ...patch } : x))}
                                                onRemove={() => setFormContas(prev => prev.filter((_, j) => j !== i))}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>

                            <Button variant="outline" onClick={() => setFormContas(prev => [...prev, { uid: crypto.randomUUID(), instituicao_id: '', apelido: '', codigo: '', documento: '' }])} style={{ marginTop: '10px' }}>
                                <Plus size={14} style={{ marginRight: 6 }} /> Adicionar conta
                            </Button>
                        </div>
                    </div>

                    <ModalFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSalvarModal} disabled={salvando}>
                            {salvando ? <Spinner size="sm" /> : 'Confirmar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
