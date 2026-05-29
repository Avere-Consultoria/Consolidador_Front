import { Typography, Badge, Button } from 'avere-ui';
import { X, GitMerge } from 'lucide-react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
export interface VisaoInstitucionalDetalhe {
    instituicao_origem: 'BTG' | 'XP' | 'AVENUE' | 'AGORA';
    codigo_identificador: string;
    tipo_identificador: string;
    nome_ativo: string;
    emissor_original: string | null;
    classe_original: string | null;
    liquidez_api_original: string | null;
    vencimento_api_original: string | null;
    index_rate: string | null;
}

export interface CanonicoDetalhe {
    id: string;
    nome_canonico: string;
    classe_avere: string;
    liquidez_avere: string;
    data_vencimento: string;
    emissor_id: string;
    taxa_canonica: string;
    benchmark_canonico: string;
    sub_tipo_canonico: string;
    is_fii: boolean;
    is_coe: boolean;
    notas: string;
    visoes: VisaoInstitucionalDetalhe[];
}

interface DrawerCanonicoProps {
    isOpen: boolean;
    onClose: () => void;
    canonico: CanonicoDetalhe | null;
    emissoresMap: Map<string, string>;
    onFundir: (canonico: CanonicoDetalhe) => void;
}

// ── Cores por instituição ────────────────────────────────────────────────────
const CORES_INST: Record<string, { bg: string; fg: string; border: string }> = {
    BTG:    { bg: '#E0F2FE', fg: '#0369A1', border: '#7DD3FC' },
    XP:     { bg: '#FFEDD5', fg: '#C2410C', border: '#FDBA74' },
    AVENUE: { bg: '#FEF3C7', fg: '#92400E', border: '#FCD34D' },
    AGORA:  { bg: '#DCFCE7', fg: '#15803D', border: '#86EFAC' },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatarDataBR(iso: string | null | undefined): string {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

// ── Linha de campo (label + valor) ────────────────────────────────────────────
function Campo({ label, valor }: { label: string; valor: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Typography variant="p" style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {label}
            </Typography>
            <Typography variant="p" style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                {valor || <span style={{ color: '#9CA3AF', fontStyle: 'italic', fontWeight: 400 }}>—</span>}
            </Typography>
        </div>
    );
}

// ── Card de visão institucional ───────────────────────────────────────────────
function CardVisaoInstitucional({ visao }: { visao: VisaoInstitucionalDetalhe }) {
    const cor = CORES_INST[visao.instituicao_origem] ?? { bg: '#F3F4F6', fg: '#374151', border: '#D1D5DB' };

    return (
        <div style={{
            background: cor.bg,
            border: `1px solid ${cor.border}`,
            borderRadius: '8px',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        }}>
            {/* Cabeçalho */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                    background: '#fff',
                    color: cor.fg,
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.05em',
                }}>
                    {visao.instituicao_origem}
                </span>
                <Typography variant="p" style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: cor.fg }}>
                    {visao.codigo_identificador}
                </Typography>
                <span style={{ fontSize: '9px', color: cor.fg, fontWeight: 600, opacity: 0.7 }}>
                    {visao.tipo_identificador}
                </span>
            </div>

            {/* Campos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
                <Campo label="Nome na API"      valor={visao.nome_ativo} />
                <Campo label="Emissor original" valor={visao.emissor_original} />
                <Campo label="Classe original"  valor={visao.classe_original} />
                <Campo label="Index Rate"       valor={visao.index_rate} />
                <Campo label="Liquidez API"     valor={visao.liquidez_api_original ? `D+${visao.liquidez_api_original}` : null} />
                <Campo label="Venc. API"        valor={formatarDataBR(visao.vencimento_api_original)} />
            </div>
        </div>
    );
}

// ── Componente principal ──────────────────────────────────────────────────────
export function DrawerCanonico({ isOpen, onClose, canonico, emissoresMap, onFundir }: DrawerCanonicoProps) {
    if (!isOpen || !canonico) return null;

    const emissorNome = canonico.emissor_id ? emissoresMap.get(canonico.emissor_id) : null;
    const instituicoesDistintas = Array.from(new Set(canonico.visoes.map(v => v.instituicao_origem)));

    return (
        <div
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(8,31,40,0.45)', backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 9999, padding: '24px',
                fontFamily: 'var(--font-family)',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: '#fff', borderRadius: '14px',
                    width: '100%', maxWidth: '720px', maxHeight: '90vh',
                    display: 'flex', flexDirection: 'column',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* ── Cabeçalho ── */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexShrink: 0 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h2" style={{ fontSize: '18px', margin: 0, color: 'var(--color-secundaria)', fontWeight: 700 }}>
                            {canonico.nome_canonico}
                        </Typography>
                        <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {instituicoesDistintas.map(inst => {
                                const cor = CORES_INST[inst] ?? { bg: '#E5E7EB', fg: '#374151' };
                                return (
                                    <span key={inst} style={{
                                        background: cor.bg, color: cor.fg,
                                        fontSize: '9px', fontWeight: 800,
                                        padding: '3px 7px', borderRadius: '4px',
                                    }}>
                                        {inst}
                                    </span>
                                );
                            })}
                            {canonico.is_fii && <Badge intent="primaria" variant="ghost" style={{ fontSize: '9px' }}>FII</Badge>}
                            {canonico.is_coe && <Badge intent="alerta"   variant="ghost" style={{ fontSize: '9px' }}>COE</Badge>}
                        </div>
                    </div>
                    <X size={20} color="#9CA3AF" style={{ cursor: 'pointer', flexShrink: 0 }} onClick={onClose} />
                </div>

                {/* ── Corpo ── */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>

                    {/* Identidade Avere */}
                    <section>
                        <Typography variant="p" style={{ fontSize: '11px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                            Identidade Avere
                        </Typography>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px 20px', background: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <Campo label="Classe Avere"   valor={canonico.classe_avere} />
                            <Campo label="Liquidez"       valor={canonico.liquidez_avere ? `D+${canonico.liquidez_avere}` : null} />
                            <Campo label="Vencimento"     valor={formatarDataBR(canonico.data_vencimento)} />
                            <Campo label="Emissor"        valor={emissorNome} />
                            <Campo label="Taxa"           valor={canonico.taxa_canonica} />
                            <Campo label="Benchmark"      valor={canonico.benchmark_canonico} />
                            <Campo label="Sub-tipo"       valor={canonico.sub_tipo_canonico} />
                            <Campo label="Notas"          valor={canonico.notas} />
                        </div>
                    </section>

                    {/* Visões Institucionais */}
                    <section>
                        <Typography variant="p" style={{ fontSize: '11px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                            Como cada instituição vê este ativo ({canonico.visoes.length})
                        </Typography>
                        {canonico.visoes.length === 0 ? (
                            <Typography variant="p" style={{ fontSize: '13px', color: '#9CA3AF', fontStyle: 'italic' }}>
                                Nenhuma visão institucional registrada ainda.
                            </Typography>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {canonico.visoes.map((v, i) => (
                                    <CardVisaoInstitucional key={`${v.instituicao_origem}-${v.codigo_identificador}-${i}`} visao={v} />
                                ))}
                            </div>
                        )}
                    </section>

                </div>

                {/* ── Rodapé ── */}
                <div style={{ padding: '16px 24px', background: '#F9FAFB', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', gap: '12px', borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px', flexShrink: 0 }}>
                    <Button variant="outline" onClick={() => onFundir(canonico)}>
                        <GitMerge size={16} style={{ marginRight: '8px' }} />
                        Fundir com outro canônico
                    </Button>
                    <Button variant="solid" onClick={onClose}>Fechar</Button>
                </div>

            </div>
        </div>
    );
}
