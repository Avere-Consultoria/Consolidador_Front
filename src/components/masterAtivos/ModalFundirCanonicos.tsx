import { useState, useMemo } from 'react';
import { Typography, Button, Combobox, Badge, Spinner, toast } from 'avere-ui';
import { X, GitMerge, AlertTriangle } from 'lucide-react';
import { supabase } from '../../services/supabase';
import type { CanonicoDetalhe } from './DrawerCanonico';

// ── Tipos ─────────────────────────────────────────────────────────────────────
export interface CanonicoOpcaoDestino {
    id: string;
    nome_canonico: string;
    classe_avere: string | null;
    instituicoes_visoes: string[];
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    origem: CanonicoDetalhe | null;
    candidatosDestino: CanonicoOpcaoDestino[];   // todos os canônicos EXCETO o origem
    onSuccess: () => void;
}

const CORES_INST: Record<string, { bg: string; fg: string }> = {
    BTG:    { bg: 'var(--color-info-bg)', fg: 'var(--color-info-text)' },
    XP:     { bg: 'var(--color-warning-bg)', fg: 'var(--color-warning-text)' },
    AVENUE: { bg: 'var(--color-warning-bg)', fg: 'var(--color-warning-text)' },
    AGORA:  { bg: 'var(--color-success-bg)', fg: 'var(--color-success-text)' },
};

function CardCanonico({ titulo, nome, classe, instituicoes }: { titulo: string; nome: string; classe: string | null; instituicoes: string[] }) {
    return (
        <div style={{ background: 'var(--gray-50)', border: '1px solid var(--color-border-subtle)', borderRadius: '8px', padding: '14px 16px' }}>
            <Typography variant="p" style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                {titulo}
            </Typography>
            <Typography variant="p" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                {nome}
            </Typography>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                {classe && (
                    <Badge intent="neutro" variant="ghost" style={{ fontSize: '9px' }}>
                        {classe}
                    </Badge>
                )}
                {instituicoes.map(inst => {
                    const cor = CORES_INST[inst] ?? { bg: 'var(--color-border-subtle)', fg: 'var(--color-text-primary)' };
                    return (
                        <span key={inst} style={{
                            background: cor.bg, color: cor.fg,
                            fontSize: '9px', fontWeight: 700,
                            padding: '3px 7px', borderRadius: '4px',
                        }}>
                            {inst}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export function ModalFundirCanonicos({ isOpen, onClose, origem, candidatosDestino, onSuccess }: Props) {
    const [destinoId, setDestinoId] = useState('');
    const [fundindo, setFundindo]   = useState(false);

    const destino = useMemo(
        () => candidatosDestino.find(c => c.id === destinoId) ?? null,
        [candidatosDestino, destinoId]
    );

    const opcoes = useMemo(
        () => candidatosDestino.map(c => ({
            value: c.id,
            label: `${c.nome_canonico}${c.classe_avere ? ` — ${c.classe_avere}` : ''}${c.instituicoes_visoes.length ? ` (${c.instituicoes_visoes.join('/')})` : ''}`,
        })),
        [candidatosDestino]
    );

    const handleFundir = async () => {
        if (!origem || !destinoId) {
            toast.error('Selecione o canônico destino.');
            return;
        }
        setFundindo(true);
        try {
            const { data, error } = await supabase.rpc('fundir_ativo_canonico', {
                p_origem_id:  origem.id,
                p_destino_id: destinoId,
            });

            if (error) throw error;

            const r = data as any;
            const totalMovido = (r?.dicionario_movidas ?? 0) + (r?.posicoes_btg ?? 0) + (r?.posicoes_xp ?? 0) + (r?.posicoes_avenue ?? 0) + (r?.posicoes_agora ?? 0) + (r?.excecoes_movidas ?? 0) + (r?.fechadas_movidas ?? 0);
            toast.success(`Fusão concluída — ${totalMovido} referência(s) re-linkadas.`);

            setDestinoId('');
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Erro ao fundir:', err);
            toast.error(`Falha na fusão: ${err.message ?? 'erro desconhecido'}`);
        } finally {
            setFundindo(false);
        }
    };

    if (!isOpen || !origem) return null;

    const instOrigem = Array.from(new Set(origem.visoes.map(v => v.instituicao_origem)));

    return (
        <div
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(8,31,40,0.55)', backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10000, padding: '24px',
                fontFamily: 'var(--font-family)',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'var(--color-white)', borderRadius: '14px',
                    width: '100%', maxWidth: '560px', maxHeight: '90vh',
                    display: 'flex', flexDirection: 'column',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* ── Cabeçalho ── */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <GitMerge size={20} color="var(--color-primaria)" />
                        <Typography variant="h2" style={{ fontSize: '18px', margin: 0, color: 'var(--color-secundaria)' }}>
                            Fundir Canônicos
                        </Typography>
                    </div>
                    <X size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} onClick={onClose} />
                </div>

                {/* ── Corpo ── */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>

                    {/* Origem */}
                    <CardCanonico
                        titulo="Origem (será deletada)"
                        nome={origem.nome_canonico}
                        classe={origem.classe_avere || null}
                        instituicoes={instOrigem}
                    />

                    {/* Seta */}
                    <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '20px' }}>↓</div>

                    {/* Selecionar destino */}
                    <div style={{ position: 'relative', zIndex: 50 }}>
                        <Typography variant="p" style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                            Destino (vai absorver as visões da origem)
                        </Typography>
                        <Combobox
                            options={opcoes}
                            value={destinoId}
                            onChange={setDestinoId}
                            placeholder="Pesquise o canônico destino..."
                        />
                    </div>

                    {/* Preview do destino */}
                    {destino && (
                        <CardCanonico
                            titulo="Destino selecionado"
                            nome={destino.nome_canonico}
                            classe={destino.classe_avere}
                            instituicoes={destino.instituicoes_visoes}
                        />
                    )}

                    {/* Aviso */}
                    {destino && (
                        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid var(--color-warning-border)', borderRadius: '8px', padding: '14px 16px', display: 'flex', gap: '12px' }}>
                            <AlertTriangle size={20} color="var(--color-warning-solid)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div style={{ flex: 1 }}>
                                <Typography variant="p" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-warning-text)', marginBottom: '6px' }}>
                                    Ao confirmar:
                                </Typography>
                                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: 'var(--color-warning-text)', lineHeight: 1.6 }}>
                                    <li>Todas as visões institucionais da origem serão re-linkadas ao destino.</li>
                                    <li>Todas as posições (BTG/XP/Avenue/Ágora) que apontavam pra origem passam a apontar pro destino.</li>
                                    <li>Exceções de classificação são preservadas (duplicatas exatas são removidas).</li>
                                    <li>O canônico de origem é deletado <strong>permanentemente</strong>.</li>
                                </ul>
                            </div>
                        </div>
                    )}

                </div>

                {/* ── Rodapé ── */}
                <div style={{ padding: '16px 24px', background: 'var(--gray-50)', borderTop: '1px solid var(--color-surface-sunken)', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px', flexShrink: 0 }}>
                    <Button variant="outline" onClick={onClose} disabled={fundindo}>Cancelar</Button>
                    <Button variant="solid" onClick={handleFundir} disabled={fundindo || !destinoId}>
                        {fundindo ? <Spinner size="sm" /> : <GitMerge size={16} style={{ marginRight: '8px' }} />}
                        Confirmar Fusão
                    </Button>
                </div>

            </div>
        </div>
    );
}
