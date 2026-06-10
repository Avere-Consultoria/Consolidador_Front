import { useState, useEffect } from 'react';
import { Typography, Badge, Button, Spinner, toast } from 'avere-ui';
import { X, Save, Trash2 } from 'lucide-react';
import type { AtivoCanonicoOption, VisaoInstitucional } from '../../pages/PersonalizarAtivos';

function formatarDataBR(iso: string | null | undefined): string {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

const CORES_INST: Record<string, { bg: string; fg: string; border: string }> = {
    BTG:    { bg: '#E0F2FE', fg: '#0369A1', border: '#7DD3FC' },
    XP:     { bg: '#FFEDD5', fg: '#C2410C', border: '#FDBA74' },
    AVENUE: { bg: '#FEF3C7', fg: '#92400E', border: '#FCD34D' },
    AGORA:  { bg: '#DCFCE7', fg: '#15803D', border: '#86EFAC' },
};

function Campo({ label, valor }: { label: string; valor: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="p" style={{ fontSize: '9px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0, lineHeight: 1.2 }}>{label}</Typography>
            <Typography variant="p" style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: 0, lineHeight: 1.3 }}>
                {valor || <span style={{ color: '#9CA3AF', fontStyle: 'italic', fontWeight: 400 }}>—</span>}
            </Typography>
        </div>
    );
}

function CardVisaoInstitucional({ visao }: { visao: VisaoInstitucional }) {
    const cor = CORES_INST[visao.instituicao_origem] ?? { bg: '#F3F4F6', fg: '#374151', border: '#D1D5DB' };
    return (
        <div style={{ background: cor.bg, border: `1px solid ${cor.border}`, borderRadius: '8px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#fff', color: cor.fg, fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.05em' }}>{visao.instituicao_origem}</span>
                <Typography variant="p" style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: cor.fg }}>{visao.codigo_identificador}</Typography>
                <span style={{ fontSize: '9px', color: cor.fg, fontWeight: 600, opacity: 0.7 }}>{visao.tipo_identificador}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
                <Campo label="Nome na API"      valor={visao.nome_ativo} />
                <Campo label="Emissor original" valor={visao.emissor_original} />
                <Campo label="Classe original"  valor={visao.classe_original} />
                <Campo label="Taxa"             valor={visao.taxa_formatada || visao.index_rate} />
                <Campo label="Liquidez API"     valor={visao.liquidez_api_original ? `D+${visao.liquidez_api_original}` : null} />
                <Campo label="Venc. API"        valor={formatarDataBR(visao.vencimento_api_original)} />
            </div>
        </div>
    );
}

export interface DrawerRegraProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (payload: any, editId: string | null) => Promise<void>;
    onDelete: (id: string) => void;
    salvando: boolean;
    regraEdicao: any | null;
    canonicos: AtivoCanonicoOption[];
    emissores: { id: string; nome_fantasia: string }[];
    classesDisponiveis: string[];
    clientes: { id: string; nome: string }[];
}

const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '10px', fontWeight: 700, color: '#6B7280',
    textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px',
};
const ctrlStyle: React.CSSProperties = {
    width: '100%', height: '38px', boxSizing: 'border-box', padding: '0 10px', borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.12)', fontSize: '13px', fontFamily: 'var(--font-family)', outline: 'none', background: '#fff',
};

// Referência ao valor do Master (original) abaixo de cada campo
function RefMaster({ children }: { children: React.ReactNode }) {
    return (
        <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px', marginTop: '5px', display: 'inline-block' }}>
            Master: {children}
        </Badge>
    );
}

export function DrawerRegra({
    isOpen, onClose, onSave, onDelete, salvando, regraEdicao,
    canonicos, emissores, classesDisponiveis, clientes,
}: DrawerRegraProps) {
    const [formCanonicoId, setFormCanonicoId] = useState('');
    const [formApelido,    setFormApelido]    = useState('');
    const [formClasse,     setFormClasse]     = useState('');
    const [formLiquidez,   setFormLiquidez]   = useState('');
    const [formEmissorId,  setFormEmissorId]  = useState('');
    const [formEscopo,     setFormEscopo]     = useState<'GLOBAL' | 'CLIENTE'>('GLOBAL');
    const [formClienteId,  setFormClienteId]  = useState('');

    useEffect(() => {
        if (!isOpen) return;
        if (regraEdicao) {
            setFormCanonicoId(regraEdicao.ativo_canonico_id);
            setFormApelido(regraEdicao.apelido_ativo || '');
            setFormClasse(regraEdicao.classe_customizada || '');
            setFormLiquidez(regraEdicao.liquidez_customizada || '');
            setFormEmissorId(regraEdicao.emissor_customizado_id || '');
            setFormEscopo(regraEdicao.cliente_id ? 'CLIENTE' : 'GLOBAL');
            setFormClienteId(regraEdicao.cliente_id || '');
        } else {
            setFormCanonicoId(''); setFormApelido(''); setFormClasse('');
            setFormLiquidez(''); setFormEmissorId('');
            setFormEscopo('GLOBAL'); setFormClienteId('');
        }
    }, [isOpen, regraEdicao]);

    if (!isOpen) return null;

    const canonicoSelecionado = canonicos.find(c => c.id === formCanonicoId);
    const emissorMasterNome = canonicoSelecionado?.emissor_id
        ? (emissores.find(e => e.id === canonicoSelecionado.emissor_id)?.nome_fantasia ?? '—')
        : null;

    const handleSave = () => {
        if (!formCanonicoId) { toast.error('Selecione um ativo para personalizar.'); return; }
        if (formEscopo === 'CLIENTE' && !formClienteId) { toast.error('Selecione o cliente.'); return; }
        onSave({
            ativo_canonico_id:      formCanonicoId,
            cliente_id:             formEscopo === 'CLIENTE' ? formClienteId : null,
            apelido_ativo:          formApelido    || null,
            classe_customizada:     formClasse     || null,
            liquidez_customizada:   formLiquidez   || null,
            vencimento_customizado: null,   // vencimento nunca é editável pelo consultor
            emissor_customizado_id: formEmissorId  || null,
        }, regraEdicao?.id || null);
    };

    const opcoesAtivos = canonicos.map(c => {
        const partes = [c.nome_canonico];
        if (c.identificador_exibicao) partes.push(c.identificador_exibicao);
        if (c.instituicoes_visoes.length > 0) partes.push(c.instituicoes_visoes.join('/'));
        return { value: c.id, label: partes.join(' — ') };
    });
    const opcoesClasses   = [{ value: '', label: 'Manter original' }, ...classesDisponiveis.map(c => ({ value: c, label: c }))];
    const opcoesEmissores = [{ value: '', label: 'Manter original' }, ...emissores.map(e => ({ value: e.id, label: e.nome_fantasia }))];
    const opcoesClientes  = clientes.map(c => ({ value: c.id, label: c.nome }));

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,31,40,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px', fontFamily: 'var(--font-family)' }}>
            <div style={{ background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '640px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}>

                {/* ── Cabeçalho ── */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexShrink: 0 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h2" style={{ fontSize: '18px', margin: 0, color: 'var(--color-secundaria)', fontWeight: 700 }}>
                            {regraEdicao ? (canonicoSelecionado?.nome_canonico ?? 'Editar Personalização') : 'Nova Personalização'}
                        </Typography>
                        <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {canonicoSelecionado?.instituicoes_visoes.map(inst => (
                                <span key={inst} style={{ background: '#E5E7EB', color: '#374151', fontSize: '9px', fontWeight: 800, padding: '3px 7px', borderRadius: '4px' }}>{inst}</span>
                            ))}
                            <Badge variant="ghost" style={{ fontSize: '9px', background: formEscopo === 'CLIENTE' ? '#FFF7ED' : '#ECFDF5', color: formEscopo === 'CLIENTE' ? '#C2410C' : '#047857' }}>
                                {formEscopo === 'CLIENTE' ? 'Cliente específico' : 'Carteira global'}
                            </Badge>
                        </div>
                    </div>
                    <X size={20} color="#9CA3AF" style={{ cursor: 'pointer', flexShrink: 0 }} onClick={onClose} />
                </div>

                {/* ── Corpo ── (overflow visible: dropdowns dos Combobox não são cortados) */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px', overflowY: 'auto' }}>

                    {/* ── Alcance (topo) ── */}
                    <section style={{ position: 'relative', zIndex: 60 }}>
                        <Typography variant="p" style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                            Alcance da regra
                        </Typography>
                        <div style={{ background: 'rgba(245,158,11,0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.15)' }}>
                            <div style={{ display: 'flex', gap: '24px', marginBottom: formEscopo === 'CLIENTE' ? '14px' : '0' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 500, color: 'var(--color-secundaria)' }}>
                                    <input type="radio" checked={formEscopo === 'GLOBAL'} onChange={() => setFormEscopo('GLOBAL')} style={{ accentColor: 'var(--color-alerta)' }} />
                                    Global (todos os clientes)
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 500, color: 'var(--color-secundaria)' }}>
                                    <input type="radio" checked={formEscopo === 'CLIENTE'} onChange={() => setFormEscopo('CLIENTE')} style={{ accentColor: 'var(--color-alerta)' }} />
                                    Cliente específico
                                </label>
                            </div>
                            {formEscopo === 'CLIENTE' && (
                                <select style={ctrlStyle} value={formClienteId} onChange={e => setFormClienteId(e.target.value)}>
                                    <option value="">Selecione o cliente...</option>
                                    {opcoesClientes.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            )}
                        </div>
                    </section>

                    {/* Ativo */}
                    <div style={{ position: 'relative', zIndex: 50 }}>
                        <label style={labelStyle}>Ativo</label>
                        {regraEdicao ? (
                            <input
                                disabled
                                value={canonicoSelecionado ? canonicoSelecionado.nome_canonico : '—'}
                                style={{ ...ctrlStyle, background: '#F3F4F6', color: '#6B7280' }}
                            />
                        ) : (
                            <select style={ctrlStyle} value={formCanonicoId} onChange={e => setFormCanonicoId(e.target.value)}>
                                <option value="">Selecione o ativo canônico...</option>
                                {opcoesAtivos.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        )}
                    </div>

                    {/* ── Personalização ── */}
                    <section>
                        <Typography variant="p" style={{ fontSize: '11px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                            Personalização
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>

                            {/* Apelido */}
                            <div>
                                <label style={{ ...labelStyle, color: 'var(--color-primaria)' }}>Apelido do ativo (opcional)</label>
                                <input value={formApelido} onChange={e => setFormApelido(e.target.value)} placeholder="Em branco = nome original" style={ctrlStyle} />
                            </div>

                            {/* Classe + Liquidez */}
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', alignItems: 'start', position: 'relative', zIndex: 20 }}>
                                <div>
                                    <label style={labelStyle}>Nova classe (opcional)</label>
                                    <select style={ctrlStyle} value={formClasse} onChange={e => setFormClasse(e.target.value)}>
                                        {opcoesClasses.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                    </select>
                                    {canonicoSelecionado?.classe_avere && <RefMaster>{canonicoSelecionado.classe_avere}</RefMaster>}
                                </div>
                                <div>
                                    <label style={labelStyle}>Nova liq. (D+)</label>
                                    <input type="number" min="0" value={formLiquidez} onChange={e => setFormLiquidez(e.target.value)} placeholder="Manter" style={ctrlStyle} />
                                    {canonicoSelecionado?.liquidez_avere && <RefMaster>D+{canonicoSelecionado.liquidez_avere}</RefMaster>}
                                </div>
                            </div>


                            {/* Emissor */}
                            <div style={{ position: 'relative', zIndex: 10 }}>
                                <label style={labelStyle}>Novo emissor (opcional)</label>
                                <select style={ctrlStyle} value={formEmissorId} onChange={e => setFormEmissorId(e.target.value)}>
                                    {opcoesEmissores.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                                {emissorMasterNome && <RefMaster>{emissorMasterNome}</RefMaster>}
                            </div>
                        </div>
                    </section>

                    {/* ── Visão Avere (Master) — referência da classificação canônica ── */}
                    {canonicoSelecionado && (
                        <section>
                            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                                Visão Avere (Master)
                            </Typography>
                            <div style={{ background: 'rgba(0,131,203,0.05)', border: '1px solid rgba(0,131,203,0.2)', borderRadius: '8px', padding: '14px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                    <span style={{ background: '#fff', color: 'var(--color-primaria)', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.05em' }}>AVERE</span>
                                    <Typography variant="p" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primaria)', margin: 0 }}>Classificação canônica atual</Typography>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
                                    <Campo label="Classe Avere"     valor={canonicoSelecionado.classe_avere} />
                                    <Campo label="Emissor (master)" valor={emissorMasterNome} />
                                    <Campo label="Liquidez"          valor={canonicoSelecionado.liquidez_avere ? `D+${canonicoSelecionado.liquidez_avere}` : null} />
                                    <Campo label="Vencimento"        valor={formatarDataBR(canonicoSelecionado.data_vencimento)} />
                                    <Campo label="Sub-tipo"          valor={canonicoSelecionado.sub_tipo_canonico} />
                                    <Campo label="Taxa"             valor={canonicoSelecionado.taxa_formatada || [canonicoSelecionado.taxa_canonica, canonicoSelecionado.benchmark_canonico].filter(Boolean).join(' · ') || null} />
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ── Como cada instituição vê este ativo (referência) ── */}
                    {canonicoSelecionado && canonicoSelecionado.visoes.length > 0 && (
                        <section>
                            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                                Como cada instituição vê este ativo ({canonicoSelecionado.visoes.length})
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {canonicoSelecionado.visoes.map((v, i) => (
                                    <CardVisaoInstitucional key={`${v.instituicao_origem}-${v.codigo_identificador}-${i}`} visao={v} />
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* ── Rodapé ── */}
                <div style={{ padding: '16px 24px', background: '#F9FAFB', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', gap: '12px', borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px', flexShrink: 0 }}>
                    {regraEdicao ? (
                        <Button variant="outline" onClick={() => onDelete(regraEdicao.id)} style={{ color: '#EF4444', borderColor: 'rgba(239,68,68,0.3)' }}>
                            <Trash2 size={16} style={{ marginRight: '8px' }} /> Excluir
                        </Button>
                    ) : <span />}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button variant="outline" onClick={onClose} disabled={salvando}>Cancelar</Button>
                        <Button variant="solid" onClick={handleSave} disabled={salvando}>
                            {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />}
                            Salvar
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
