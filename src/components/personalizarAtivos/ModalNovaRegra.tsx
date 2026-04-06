import { useState, useEffect, useRef } from 'react';
import { Typography, Button, Spinner } from 'avere-ui';
import { X, Save, ArrowRight, Search, ChevronDown } from 'lucide-react';

// ── COMPONENTE COMBOBOX (Pesquisável) ──
function Combobox({ options, value, onChange, placeholder }: { options: { value: string, label: string }[], value: string, onChange: (val: string) => void, placeholder: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setIsOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(o => o.value === value);
    const filteredOptions = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: '100%', fontFamily: 'var(--font-family)' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '10px 12px', borderRadius: '6px',
                    border: '1px solid rgba(0,0,0,0.1)', background: 'var(--color-white)', cursor: 'pointer',
                    fontFamily: 'var(--font-family)', fontSize: 'var(--text-body-m-size)',
                    color: selectedOption ? 'var(--color-secundaria)' : '#9CA3AF',
                    fontWeight: selectedOption ? 'var(--weight-medium)' : 'var(--weight-regular)'
                }}
            >
                {selectedOption ? selectedOption.label : placeholder}
                <ChevronDown size={16} color="#9CA3AF" />
            </div>

            {isOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: 'var(--color-white)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 50 }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <Search size={14} color="#9CA3AF" style={{ marginRight: '8px' }} />
                        <input
                            autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar..."
                            style={{ border: 'none', outline: 'none', width: '100%', fontSize: 'var(--text-body-m-size)', fontFamily: 'var(--font-family)' }}
                        />
                    </div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {filteredOptions.length === 0 ? (
                            <div style={{ padding: '12px', fontSize: 'var(--text-body-m-size)', color: '#9CA3AF', textAlign: 'center', fontFamily: 'var(--font-family)' }}>
                                Nenhum resultado encontrado.
                            </div>
                        ) : (
                            filteredOptions.map(opt => (
                                <div
                                    key={opt.value}
                                    onClick={() => { onChange(opt.value); setIsOpen(false); setSearch(''); }}
                                    style={{ padding: '10px 12px', fontSize: 'var(--text-body-m-size)', cursor: 'pointer', transition: 'background 0.2s', color: 'var(--color-secundaria)', fontFamily: 'var(--font-family)' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,131,203,0.05)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    {opt.label}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── MODAL PRINCIPAL ──

export interface ModalNovaRegraProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (payload: any, editId: string | null) => Promise<void>;
    salvando: boolean;
    regraEdicao: any | null;
    dicionario: { codigo_identificador: string, nome_ativo: string, classe_avere: string, liquidez_avere: string }[];
    classesDisponiveis: string[];
    clientes: { id: string, nome: string }[];
}

export function ModalNovaRegra({ isOpen, onClose, onSave, salvando, regraEdicao, dicionario, classesDisponiveis, clientes }: ModalNovaRegraProps) {
    const [formAtivo, setFormAtivo] = useState('');
    const [formApelido, setFormApelido] = useState('');
    const [formClasse, setFormClasse] = useState('');
    const [formLiquidez, setFormLiquidez] = useState('');
    const [formEscopo, setFormEscopo] = useState<'GLOBAL' | 'CLIENTE'>('GLOBAL');
    const [formClienteId, setFormClienteId] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (regraEdicao) {
                setFormAtivo(regraEdicao.codigo_identificador);
                setFormApelido(regraEdicao.apelido_ativo || '');
                setFormClasse(regraEdicao.classe_customizada || '');
                setFormLiquidez(regraEdicao.liquidez_customizada || '');
                setFormEscopo(regraEdicao.cliente_id ? 'CLIENTE' : 'GLOBAL');
                setFormClienteId(regraEdicao.cliente_id || '');
            } else {
                setFormAtivo(''); setFormApelido(''); setFormClasse(''); setFormLiquidez('');
                setFormEscopo('GLOBAL'); setFormClienteId('');
            }
        }
    }, [isOpen, regraEdicao]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!formAtivo) return alert('Selecione um ativo para personalizar.');
        if (formEscopo === 'CLIENTE' && !formClienteId) return alert('Selecione o Cliente.');

        onSave({
            codigo_identificador: formAtivo,
            cliente_id: formEscopo === 'CLIENTE' ? formClienteId : null,
            apelido_ativo: formApelido || null,
            classe_customizada: formClasse || null,
            liquidez_customizada: formLiquidez || null
        }, regraEdicao?.id || null);
    };

    const ativoSelecionado = dicionario.find(d => d.codigo_identificador === formAtivo);

    const opcoesAtivos = dicionario.map(d => ({ value: d.codigo_identificador, label: `${d.codigo_identificador} - ${d.nome_ativo}` }));
    const opcoesClasses = [{ value: '', label: 'Manter original' }, ...classesDisponiveis.map(c => ({ value: c, label: c }))];
    const opcoesClientes = clientes.map(c => ({ value: c.id, label: c.nome }));

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(8, 31, 40, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px', fontFamily: 'var(--font-family)' }} onClick={onClose}>
            <div style={{ background: 'var(--color-white)', borderRadius: '12px', width: '100%', maxWidth: '540px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>

                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h2" style={{ fontSize: '18px', margin: 0, color: 'var(--color-secundaria)' }}>{regraEdicao ? 'Editar Regra' : 'Nova Personalização'}</Typography>
                    <X size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={onClose} />
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Seleção do Ativo (Combobox) */}
                    <div style={{ position: 'relative', zIndex: 30 }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'var(--weight-semibold)', marginBottom: '6px', color: 'var(--color-secundaria)' }}>Ativo (ISIN, CNPJ ou Ticker)</label>
                        {regraEdicao ? (
                            <input disabled value={`${formAtivo} - ${ativoSelecionado?.nome_ativo || ''}`} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', background: '#F3F4F6', color: '#6B7280', fontSize: 'var(--text-body-m-size)', fontFamily: 'var(--font-family)', fontWeight: 'var(--weight-medium)' }} />
                        ) : (
                            <Combobox options={opcoesAtivos} value={formAtivo} onChange={setFormAtivo} placeholder="Pesquise o ativo na base Avere..." />
                        )}
                    </div>

                    {/* View do Padrão Avere */}
                    {ativoSelecionado && (
                        <div style={{ background: '#F9FAFB', padding: '14px', borderRadius: '8px', border: '1px dashed #D1D5DB', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ flex: 1 }}>
                                <Typography variant="p" style={{ fontSize: '10px', fontWeight: 'var(--weight-bold)', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Padrão Master Avere</Typography>
                                <Typography variant="p" style={{ fontSize: '13px', fontWeight: 'var(--weight-semibold)', color: 'var(--color-secundaria)', marginTop: '2px' }}>{ativoSelecionado.nome_ativo}</Typography>
                                <Typography variant="p" style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Classe: <span style={{ fontWeight: 'var(--weight-medium)' }}>{ativoSelecionado.classe_avere}</span> | Liq: <span style={{ fontWeight: 'var(--weight-medium)' }}>D+{ativoSelecionado.liquidez_avere}</span></Typography>
                            </div>
                            <ArrowRight size={20} color="#9CA3AF" />
                        </div>
                    )}

                    {/* Inputs de Customização */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 20 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'var(--weight-semibold)', marginBottom: '6px', color: 'var(--color-primaria)' }}>Seu Apelido para o Ativo (Opcional)</label>
                            <input value={formApelido} onChange={e => setFormApelido(e.target.value)} placeholder="Deixe em branco para usar o original" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(0, 131, 203, 0.3)', outline: 'none', fontSize: 'var(--text-body-m-size)', fontFamily: 'var(--font-family)', transition: 'border-color 0.2s', color: 'var(--color-secundaria)', fontWeight: 'var(--weight-medium)' }} onFocus={e => e.target.style.borderColor = 'var(--color-primaria)'} onBlur={e => e.target.style.borderColor = 'rgba(0, 131, 203, 0.3)'} />
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 2 }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'var(--weight-semibold)', marginBottom: '6px', color: 'var(--color-secundaria)' }}>Nova Classe (Opcional)</label>
                                <Combobox options={opcoesClasses} value={formClasse} onChange={setFormClasse} placeholder="Manter original" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'var(--weight-semibold)', marginBottom: '6px', color: 'var(--color-secundaria)' }}>Nova Liq (D+)</label>
                                <input type="number" min="0" value={formLiquidez} onChange={e => setFormLiquidez(e.target.value)} placeholder="Manter" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', fontSize: 'var(--text-body-m-size)', fontFamily: 'var(--font-family)', outline: 'none', color: 'var(--color-secundaria)', fontWeight: 'var(--weight-medium)' }} onFocus={e => e.target.style.borderColor = 'var(--color-primaria)'} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'} />
                            </div>
                        </div>
                    </div>

                    {/* Escopo da Regra */}
                    <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.1)', position: 'relative', zIndex: 10 }}>
                        <Typography variant="p" style={{ fontSize: '12px', fontWeight: 'var(--weight-bold)', color: '--color-alerta', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alcance da Regra</Typography>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: formEscopo === 'CLIENTE' ? '16px' : '0' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 'var(--weight-medium)', color: 'var(--color-secundaria)', fontFamily: 'var(--font-family)' }}>
                                <input type="radio" checked={formEscopo === 'GLOBAL'} onChange={() => setFormEscopo('GLOBAL')} style={{ accentColor: 'var(--color-alerta)' }} /> Global (Todos os clientes)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 'var(--weight-medium)', color: 'var(--color-secundaria)', fontFamily: 'var(--font-family)' }}>
                                <input type="radio" checked={formEscopo === 'CLIENTE'} onChange={() => setFormEscopo('CLIENTE')} style={{ accentColor: 'var(--color-alerta)' }} /> Cliente Específico
                            </label>
                        </div>

                        {/* Combobox de Clientes */}
                        {formEscopo === 'CLIENTE' && (
                            <div style={{ animation: 'fadeIn 0.2s ease-in-out' }}>
                                <Combobox options={opcoesClientes} value={formClienteId} onChange={setFormClienteId} placeholder="Pesquise o cliente..." />
                            </div>
                        )}
                    </div>

                </div>

                <div style={{ padding: '16px 24px', background: '#F9FAFB', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button variant="solid" onClick={handleSave} disabled={salvando}>
                        {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />} Salvar Regra
                    </Button>
                </div>

            </div>
        </div>
    );
}