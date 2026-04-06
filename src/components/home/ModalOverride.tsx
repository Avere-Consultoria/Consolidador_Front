import { useState, useEffect } from 'react';
import { Typography, Button, Spinner } from 'avere-ui';
import { X, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface ModalOverrideProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    clienteId: string;
    ativo: {
        codigo_identificador: string;
        nome_original: string;
        classe_original: string;
        liquidez_original: string | null;
    };
}

export function ModalOverride({ isOpen, onClose, onSuccess, clienteId, ativo }: ModalOverrideProps) {
    const { perfil } = useAuth();
    const [salvando, setSalvando] = useState(false);
    const [loadingDados, setLoadingDados] = useState(true);

    const [classesMaster, setClassesMaster] = useState<{ nome: string }[]>([]);

    // Estados do Formulário
    const [apelido, setApelido] = useState('');
    const [classe, setClasse] = useState('');
    const [liquidez, setLiquidez] = useState('');
    const [aplicarApenasNesteCliente, setAplicarApenasNesteCliente] = useState(true);

    // Carregar as classes disponíveis no sistema para o dropdown
    useEffect(() => {
        async function fetchData() {
            if (!isOpen) return;
            setLoadingDados(true);

            // 1. Busca as classes do sistema
            const resClasses = await supabase.from('dicionario_classes').select('nome').order('ordem_exibicao');
            if (resClasses.data) setClassesMaster(resClasses.data);

            // 2. Tenta encontrar se já existe uma exceção prévia para preencher o formulário
            if (perfil?.id) {
                const { data: excData } = await supabase
                    .from('excecoes_classificacao')
                    .select('*')
                    .eq('consultor_id', perfil.id)
                    .eq('codigo_identificador', ativo.codigo_identificador)
                    .eq('cliente_id', clienteId) // Tenta a específica primeiro
                    .maybeSingle();

                if (excData) {
                    setApelido(excData.apelido_ativo || '');
                    setClasse(excData.classe_customizada || '');
                    setLiquidez(excData.liquidez_customizada || '');
                    setAplicarApenasNesteCliente(true);
                } else {
                    // Valores por omissão (os originais do Master)
                    setApelido(ativo.nome_original);
                    setClasse(ativo.classe_original);
                    setLiquidez(ativo.liquidez_original || '');
                }
            }
            setLoadingDados(false);
        }
        fetchData();
    }, [isOpen, ativo, perfil, clienteId]);

    const handleSave = async () => {
        if (!perfil) return;
        setSalvando(true);

        try {
            const payload = {
                consultor_id: perfil.id,
                cliente_id: aplicarApenasNesteCliente ? clienteId : null,
                codigo_identificador: ativo.codigo_identificador,
                apelido_ativo: apelido,
                classe_customizada: classe || null,
                liquidez_customizada: liquidez || null
            };

            // Upsert: Atualiza se já existir, Insere se for novo (baseado nos nossos índices UNIQUE do SQL)
            const { error } = await supabase.from('excecoes_classificacao').upsert(payload, {
                onConflict: aplicarApenasNesteCliente ? 'consultor_id, codigo_identificador, cliente_id' : 'consultor_id, codigo_identificador'
            });

            if (error) throw error;

            onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            alert('Erro ao guardar a exceção: ' + err.message);
        } finally {
            setSalvando(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(8, 31, 40, 0.4)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px'
        }} onClick={onClose}>

            <div style={{
                background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '480px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <div>
                        <Typography variant="h2" style={{ fontSize: '18px', fontWeight: 700 }}>Personalizar Ativo</Typography>
                        <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6 }}>Identificador: {ativo.codigo_identificador}</Typography>
                    </div>
                    <X size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={onClose} />
                </div>

                {loadingDados ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Spinner size="md" /></div>
                ) : (
                    <>
                        {/* Body */}
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Apelido do Ativo (Como o cliente vai ver)</label>
                                <input
                                    value={apelido} onChange={e => setApelido(e.target.value)}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: 2 }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Classe Customizada</label>
                                    <select
                                        value={classe} onChange={e => setClasse(e.target.value)}
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'inherit', fontSize: '14px', outline: 'none', background: '#fff' }}
                                    >
                                        {classesMaster.map(c => <option key={c.nome} value={c.nome}>{c.nome}</option>)}
                                    </select>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>Liquidez (D+)</label>
                                    <input
                                        type="number" min="0" value={liquidez} onChange={e => setLiquidez(e.target.value)} placeholder="Ex: 30"
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <AlertCircle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <div>
                                        <Typography variant="p" style={{ fontSize: '13px', fontWeight: 600, color: '#92400E', marginBottom: '8px' }}>Escopo da Regra</Typography>

                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
                                            <input type="radio" checked={aplicarApenasNesteCliente} onChange={() => setAplicarApenasNesteCliente(true)} />
                                            <Typography variant="p" style={{ fontSize: '13px', color: '#92400E' }}>Aplicar <strong>apenas a este cliente</strong></Typography>
                                        </label>

                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <input type="radio" checked={!aplicarApenasNesteCliente} onChange={() => setAplicarApenasNesteCliente(false)} />
                                            <Typography variant="p" style={{ fontSize: '13px', color: '#92400E' }}>Aplicar globalmente (Todos os meus clientes)</Typography>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#F9FAFB' }}>
                            <Button variant="outline" onClick={onClose}>Cancelar</Button>
                            <Button variant="solid" onClick={handleSave} disabled={salvando}>
                                {salvando ? <Spinner size="sm" /> : <Save size={16} style={{ marginRight: '8px' }} />}
                                Salvar Exceção
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}