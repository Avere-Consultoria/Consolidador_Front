import { useState, useEffect } from 'react';
import { Typography, Button, Spinner, Combobox, Badge, toast } from 'avere-ui';
import { X, Save } from 'lucide-react';

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
    dicionario: {
        codigo_identificador: string;
        nome_ativo: string;
        instituicao_origem: string | null;
        classe_avere: string;
        liquidez_avere: string;
        data_vencimento: string | null;
        classe_original: string | null;
        liquidez_api_original: string | null;
        vencimento_api_original: string | null;
    }[];
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
    dicionario, classesDisponiveis, clientes
}: ModalNovaRegraProps) {

    const [formAtivo,     setFormAtivo]     = useState('');
    const [formApelido,   setFormApelido]   = useState('');
    const [formClasse,    setFormClasse]    = useState('');
    const [formLiquidez,  setFormLiquidez]  = useState('');
    const [formVencimento,setFormVencimento]= useState('');
    const [formEscopo,    setFormEscopo]    = useState<'GLOBAL' | 'CLIENTE'>('GLOBAL');
    const [formClienteId, setFormClienteId] = useState('');

    useEffect(() => {
        if (!isOpen) return;
        if (regraEdicao) {
            setFormAtivo(regraEdicao.codigo_identificador);
            setFormApelido(regraEdicao.apelido_ativo || '');
            setFormClasse(regraEdicao.classe_customizada || '');
            setFormLiquidez(regraEdicao.liquidez_customizada || '');
            setFormVencimento(regraEdicao.vencimento_customizado || '');
            setFormEscopo(regraEdicao.cliente_id ? 'CLIENTE' : 'GLOBAL');
            setFormClienteId(regraEdicao.cliente_id || '');
        } else {
            setFormAtivo(''); setFormApelido(''); setFormClasse('');
            setFormLiquidez(''); setFormVencimento('');
            setFormEscopo('GLOBAL'); setFormClienteId('');
        }
    }, [isOpen, regraEdicao]);

    if (!isOpen) return null;

    const ativo = dicionario.find(d => d.codigo_identificador === formAtivo);

    const handleSave = () => {
        if (!formAtivo) { toast.error('Selecione um ativo para personalizar.'); return; }
        if (formEscopo === 'CLIENTE' && !formClienteId) { toast.error('Selecione o cliente.'); return; }
        onSave({
            codigo_identificador:  formAtivo,
            cliente_id:            formEscopo === 'CLIENTE' ? formClienteId : null,
            apelido_ativo:         formApelido   || null,
            classe_customizada:    formClasse    || null,
            liquidez_customizada:  formLiquidez  || null,
            vencimento_customizado: formVencimento || null,
            emissor_customizado_id: null,
        }, regraEdicao?.id || null);
    };

    const opcoesAtivos = dicionario.map(d => {
        const partes = [d.codigo_identificador, d.nome_ativo];
        if (d.classe_avere)       partes.push(d.classe_avere);
        if (d.instituicao_origem) partes.push(d.instituicao_origem);
        return { value: d.codigo_identificador, label: partes.join(' — ') };
    });
    const opcoesClasses  = [{ value: '', label: 'Manter original' }, ...classesDisponiveis.map(c => ({ value: c, label: c }))];
    const opcoesClientes = clientes.map(c => ({ value: c.id, label: c.nome }));

    return (
        <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(8,31,40,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px', fontFamily: 'var(--font-family)' }}
            onClick={onClose}
        >
            <div
                style={{ background: 'var(--color-white)', borderRadius: '14px', width: '100%', maxWidth: '580px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* ── Cabeçalho ── */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <Typography variant="h2" style={{ fontSize: '18px', margin: 0, color: 'var(--color-secundaria)' }}>
                        {regraEdicao ? 'Editar Regra' : 'Nova Personalização'}
                    </Typography>
                    <X size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={onClose} />
                </div>

                {/* ── Corpo com scroll ── */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px', overflowY: 'auto' }}>

                    {/* Seleção do Ativo */}
                    <div style={{ position: 'relative', zIndex: 50 }}>
                        <label style={labelStyle}>Ativo (ISIN, CNPJ ou Ticker)</label>
                        {regraEdicao ? (
                            <input
                                disabled
                                value={`${formAtivo}${ativo ? ` — ${ativo.nome_ativo}` : ''}`}
                                style={{ ...inputStyle, background: '#F3F4F6', color: '#6B7280' }}
                            />
                        ) : (
                            <Combobox options={opcoesAtivos} value={formAtivo} onChange={setFormAtivo} placeholder="Pesquise o ativo na base Avere..." />
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
                                {ativo && (
                                    <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap' }}>
                                        {ativo.classe_original && (
                                            <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px' }}>
                                                API: {ativo.classe_original}
                                            </Badge>
                                        )}
                                        {ativo.classe_avere && (
                                            <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px' }}>
                                                Master: {ativo.classe_avere}
                                            </Badge>
                                        )}
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
                            {ativo && (
                                <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap' }}>
                                    {ativo.vencimento_api_original && (
                                        <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px' }}>
                                            API: {formatarDataBR(ativo.vencimento_api_original)}
                                        </Badge>
                                    )}
                                    {ativo.data_vencimento && (
                                        <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px' }}>
                                            Master: {formatarDataBR(ativo.data_vencimento)}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Emissor — reservado */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <label style={{ ...labelStyle, margin: 0 }}>Emissor</label>
                                <Badge intent="alerta" variant="ghost" style={{ fontSize: '9px' }}>Em breve</Badge>
                            </div>
                            <input
                                disabled
                                placeholder="Override de emissor em desenvolvimento"
                                style={{ ...inputStyle, background: '#F9FAFB', color: '#9CA3AF', cursor: 'not-allowed' }}
                            />
                        </div>
                    </div>

                    {/* ── Escopo da Regra ── */}
                    <div style={{ background: 'rgba(245,158,11,0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.15)', position: 'relative', zIndex: 10 }}>
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
                            <div style={{ position: 'relative', zIndex: 10 }}>
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
