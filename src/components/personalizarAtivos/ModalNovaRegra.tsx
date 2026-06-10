import { useState, useEffect } from 'react';
import { Typography, Button, Spinner, Combobox, Badge, toast } from 'avere-ui';
import { X, Save } from 'lucide-react';
import type { AtivoCanonicoOption } from '../../pages/PersonalizarAtivos';

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatarDataBR(iso: string): string {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

// ── Tipos ─────────────────────────────────────────────────────────────────────
export interface ModalNovaRegraProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (payload: any, editId: string | null) => Promise<void>;
    salvando: boolean;
    regraEdicao: any | null;
    canonicos: AtivoCanonicoOption[];
    emissores: { id: string; nome_fantasia: string }[];
    classesDisponiveis: string[];
    clientes: { id: string; nome: string }[];
}

// ── Estilos compartilhados ────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    marginBottom: '6px',
    color: 'var(--color-secundaria)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid rgba(0,0,0,0.1)',
    fontSize: '13px',
    fontFamily: 'var(--font-family)',
    outline: 'none',
    color: 'var(--color-secundaria)',
    fontWeight: 500,
    boxSizing: 'border-box',
};

// ── Componente ────────────────────────────────────────────────────────────────
export function ModalNovaRegra({
    isOpen, onClose, onSave, salvando, regraEdicao,
    canonicos, emissores, classesDisponiveis, clientes
}: ModalNovaRegraProps) {

    const [formCanonicoId, setFormCanonicoId] = useState('');
    const [formApelido,    setFormApelido]    = useState('');
    const [formClasse,     setFormClasse]     = useState('');
    const [formLiquidez,   setFormLiquidez]   = useState('');
    const [formVencimento, setFormVencimento] = useState('');
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
            setFormVencimento(regraEdicao.vencimento_customizado || '');
            setFormEmissorId(regraEdicao.emissor_customizado_id || '');
            setFormEscopo(regraEdicao.cliente_id ? 'CLIENTE' : 'GLOBAL');
            setFormClienteId(regraEdicao.cliente_id || '');
        } else {
            setFormCanonicoId(''); setFormApelido(''); setFormClasse('');
            setFormLiquidez(''); setFormVencimento(''); setFormEmissorId('');
            setFormEscopo('GLOBAL'); setFormClienteId('');
        }
    }, [isOpen, regraEdicao]);

    if (!isOpen) return null;

    const canonicoSelecionado = canonicos.find(c => c.id === formCanonicoId);

    const handleSave = () => {
        if (!formCanonicoId) { toast.error('Selecione um ativo para personalizar.'); return; }
        if (formEscopo === 'CLIENTE' && !formClienteId) { toast.error('Selecione o cliente.'); return; }
        onSave({
            ativo_canonico_id:      formCanonicoId,
            cliente_id:             formEscopo === 'CLIENTE' ? formClienteId : null,
            apelido_ativo:          formApelido    || null,
            classe_customizada:     formClasse     || null,
            liquidez_customizada:   formLiquidez   || null,
            vencimento_customizado: formVencimento || null,
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
        <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(8,31,40,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px', fontFamily: 'var(--font-family)' }}
        >
            <div
                style={{ background: 'var(--color-white)', borderRadius: '14px', width: '100%', maxWidth: '580px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}
            >
                {/* ── Cabeçalho ── */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <Typography variant="h2" style={{ fontSize: '18px', margin: 0, color: 'var(--color-secundaria)' }}>
                        {regraEdicao ? 'Editar Regra' : 'Nova Personalização'}
                    </Typography>
                    <X size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={onClose} />
                </div>

                {/* ── Corpo ── (overflow visible: dropdowns dos Combobox não são cortados) */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px', overflowY: 'visible' }}>

                    {/* Seleção do Ativo Canônico */}
                    <div style={{ position: 'relative', zIndex: 50 }}>
                        <label style={labelStyle}>Ativo</label>
                        {regraEdicao ? (
                            <input
                                disabled
                                value={canonicoSelecionado ? `${canonicoSelecionado.nome_canonico} (${canonicoSelecionado.instituicoes_visoes.join(', ') || '—'})` : '—'}
                                style={{ ...inputStyle, background: '#F3F4F6', color: '#6B7280' }}
                            />
                        ) : (
                            <Combobox options={opcoesAtivos} value={formCanonicoId} onChange={setFormCanonicoId} placeholder="Pesquise o ativo canônico..." />
                        )}
                        {canonicoSelecionado && canonicoSelecionado.instituicoes_visoes.length > 0 && (
                            <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                                {canonicoSelecionado.instituicoes_visoes.map(inst => (
                                    <Badge key={inst} intent="neutro" variant="ghost" style={{ fontSize: '9px' }}>
                                        {inst}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Campos de Personalização ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 20 }}>

                        {/* Apelido */}
                        <div>
                            <label style={{ ...labelStyle, color: 'var(--color-primaria)' }}>Apelido do Ativo (Opcional)</label>
                            <input
                                value={formApelido}
                                onChange={e => setFormApelido(e.target.value)}
                                placeholder="Deixe em branco para usar o nome original"
                                style={inputStyle}
                                onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primaria)'}
                                onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}
                            />
                        </div>

                        {/* Classe + Liquidez */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', alignItems: 'start' }}>
                            <div style={{ position: 'relative', zIndex: 20 }}>
                                <label style={labelStyle}>Nova Classe (Opcional)</label>
                                <Combobox options={opcoesClasses} value={formClasse} onChange={setFormClasse} placeholder="Manter original" />
                                {canonicoSelecionado?.classe_avere && (
                                    <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap' }}>
                                        <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px' }}>
                                            Master: {canonicoSelecionado.classe_avere}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label style={labelStyle}>Nova Liq. (D+)</label>
                                <input
                                    type="number" min="0"
                                    value={formLiquidez}
                                    onChange={e => setFormLiquidez(e.target.value)}
                                    placeholder="Manter"
                                    style={{ ...inputStyle, MozAppearance: 'textfield' } as React.CSSProperties}
                                    onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primaria)'}
                                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}
                                />
                                {canonicoSelecionado?.liquidez_avere && (
                                    <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px', marginTop: '5px', display: 'inline-block' }}>
                                        Master: D+{canonicoSelecionado.liquidez_avere}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Vencimento */}
                        <div>
                            <label style={labelStyle}>Novo Vencimento (Opcional)</label>
                            <input
                                type="date"
                                value={formVencimento}
                                onChange={e => setFormVencimento(e.target.value)}
                                style={{ ...inputStyle, background: formVencimento ? '#fff' : 'transparent' }}
                                onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primaria)'}
                                onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}
                            />
                            {canonicoSelecionado?.data_vencimento && (
                                <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap' }}>
                                    <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px' }}>
                                        Master: {formatarDataBR(canonicoSelecionado.data_vencimento)}
                                    </Badge>
                                </div>
                            )}
                        </div>

                        {/* Emissor */}
                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <label style={labelStyle}>Novo Emissor (Opcional)</label>
                            <Combobox options={opcoesEmissores} value={formEmissorId} onChange={setFormEmissorId} placeholder="Manter original" />
                            {canonicoSelecionado?.emissor_id && (
                                <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap' }}>
                                    <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px' }}>
                                        Master: {emissores.find(e => e.id === canonicoSelecionado.emissor_id)?.nome_fantasia ?? '—'}
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Escopo da Regra ── */}
                    <div style={{ background: 'rgba(245,158,11,0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.15)', position: 'relative', zIndex: 5 }}>
                        <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                            Alcance da Regra
                        </Typography>
                        <div style={{ display: 'flex', gap: '24px', marginBottom: formEscopo === 'CLIENTE' ? '14px' : '0' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 500, color: 'var(--color-secundaria)', fontFamily: 'var(--font-family)' }}>
                                <input type="radio" checked={formEscopo === 'GLOBAL'} onChange={() => setFormEscopo('GLOBAL')} style={{ accentColor: 'var(--color-alerta)' }} />
                                Global (todos os clientes)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 500, color: 'var(--color-secundaria)', fontFamily: 'var(--font-family)' }}>
                                <input type="radio" checked={formEscopo === 'CLIENTE'} onChange={() => setFormEscopo('CLIENTE')} style={{ accentColor: 'var(--color-alerta)' }} />
                                Cliente específico
                            </label>
                        </div>
                        {formEscopo === 'CLIENTE' && (
                            <div style={{ position: 'relative', zIndex: 5 }}>
                                <Combobox options={opcoesClientes} value={formClienteId} onChange={setFormClienteId} placeholder="Pesquise o cliente..." />
                            </div>
                        )}
                    </div>

                </div>

                {/* ── Rodapé ── */}
                <div style={{ padding: '16px 24px', background: '#F9FAFB', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px', flexShrink: 0 }}>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button variant="solid" onClick={handleSave} disabled={salvando}>
                        {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />}
                        Salvar Regra
                    </Button>
                </div>

            </div>
        </div>
    );
}
