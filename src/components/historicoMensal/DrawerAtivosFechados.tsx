import { useMemo, useState } from 'react';
import { Typography, Badge, Button, DataTable } from 'avere-ui';
import { X } from 'lucide-react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
type Instituicao = 'BTG' | 'XP' | 'AVENUE' | 'AGORA';

export interface PosicaoFechadaDrawer {
    id: string;
    snapshot_fechado_id: string;
    instituicao: Instituicao;
    nome_exibicao: string;
    classe_avere: string | null;
    liquidez_avere: string | null;
    emissor_nome: string | null;
    data_vencimento: string | null;
    taxa: string | null;
    valor_bruto: number;
    valor_liquido: number | null;
    quantidade: number | null;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    mesReferencia: string | null;
    posicoes: PosicaoFechadaDrawer[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const MESES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
function formatarMesLongo(mes: string): string {
    const [ano, m] = mes.split('-');
    return `${MESES_PT[parseInt(m, 10) - 1]} ${ano}`;
}
function formatarDataBR(iso: string | null | undefined): string {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}
function formatarMoeda(v: number | null | undefined): string {
    if (v == null) return '—';
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}

const CORES_INST: Record<Instituicao, { bg: string; fg: string }> = {
    BTG:    { bg: '#E0F2FE', fg: '#0369A1' },
    XP:     { bg: '#FFEDD5', fg: '#C2410C' },
    AVENUE: { bg: '#FEF3C7', fg: '#92400E' },
    AGORA:  { bg: '#DCFCE7', fg: '#15803D' },
};

// ── Componente ────────────────────────────────────────────────────────────────
export function DrawerAtivosFechados({ isOpen, onClose, mesReferencia, posicoes }: Props) {
    const [filtroInst, setFiltroInst]     = useState<'TODAS' | Instituicao>('TODAS');
    const [filtroClasse, setFiltroClasse] = useState<string>('TODAS');

    const classesDisponiveis = useMemo(() => {
        const s = new Set<string>();
        posicoes.forEach(p => { if (p.classe_avere) s.add(p.classe_avere); });
        return Array.from(s).sort();
    }, [posicoes]);

    const filtradas = useMemo(() => {
        return posicoes
            .filter(p => filtroInst === 'TODAS' || p.instituicao === filtroInst)
            .filter(p => filtroClasse === 'TODAS' || p.classe_avere === filtroClasse)
            .sort((a, b) => b.valor_bruto - a.valor_bruto);
    }, [posicoes, filtroInst, filtroClasse]);

    const totalFiltrado = useMemo(() => filtradas.reduce((s, p) => s + p.valor_bruto, 0), [filtradas]);

    const instituicoesPresentes = useMemo(() => {
        const s = new Set<Instituicao>();
        posicoes.forEach(p => s.add(p.instituicao));
        return Array.from(s);
    }, [posicoes]);

    if (!isOpen || !mesReferencia) return null;

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
                    width: '100%', maxWidth: '1100px', maxHeight: '90vh',
                    display: 'flex', flexDirection: 'column',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* ── Cabeçalho ── */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexShrink: 0 }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h2" style={{ fontSize: '18px', margin: 0, color: 'var(--color-secundaria)', fontWeight: 700 }}>
                            Posição em {formatarMesLongo(mesReferencia)}
                        </Typography>
                        <Typography variant="p" style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                            {filtradas.length} ativo(s) · Total: <strong>{formatarMoeda(totalFiltrado)}</strong>
                        </Typography>
                    </div>
                    <X size={20} color="#9CA3AF" style={{ cursor: 'pointer', flexShrink: 0 }} onClick={onClose} />
                </div>

                {/* ── Filtros ── */}
                <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', flexShrink: 0, background: '#F9FAFB' }}>
                    <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '6px' }}>
                        Filtros:
                    </Typography>

                    {/* Instituição */}
                    <Button
                        variant={filtroInst === 'TODAS' ? 'solid' : 'outline'}
                        onClick={() => setFiltroInst('TODAS')}
                    >
                        Todas
                    </Button>
                    {instituicoesPresentes.map(inst => (
                        <Button
                            key={inst}
                            variant={filtroInst === inst ? 'solid' : 'outline'}
                            onClick={() => setFiltroInst(inst)}
                        >
                            {inst}
                        </Button>
                    ))}

                    <div style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', height: '24px', margin: '0 4px' }} />

                    {/* Classe */}
                    <select
                        value={filtroClasse}
                        onChange={e => setFiltroClasse(e.target.value)}
                        style={{
                            padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                            fontSize: '12px', fontFamily: 'var(--font-family)', outline: 'none',
                            background: '#fff',
                        }}
                    >
                        <option value="TODAS">Todas as classes</option>
                        {classesDisponiveis.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* ── Tabela ── */}
                <div style={{ overflowY: 'auto', flex: 1 }}>
                    <DataTable
                        data={filtradas}
                        columns={[
                            {
                                header: 'Ativo',
                                accessorKey: 'nome_exibicao',
                                cell: (item: PosicaoFechadaDrawer) => {
                                    const cor = CORES_INST[item.instituicao];
                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                            <Typography variant="p" style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                                                {item.nome_exibicao}
                                            </Typography>
                                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                <span style={{ background: cor.bg, color: cor.fg, fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                                                    {item.instituicao}
                                                </span>
                                                {item.emissor_nome && (
                                                    <Typography variant="p" style={{ fontSize: '11px', color: '#6B7280' }}>
                                                        {item.emissor_nome}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                    );
                                },
                            },
                            {
                                header: 'Classe',
                                accessorKey: 'classe_avere',
                                cell: (item: PosicaoFechadaDrawer) => (
                                    item.classe_avere
                                        ? <Badge intent="neutro" variant="ghost" style={{ fontSize: '10px' }}>{item.classe_avere}</Badge>
                                        : <span style={{ color: '#9CA3AF', fontSize: '12px', fontStyle: 'italic' }}>—</span>
                                ),
                            },
                            {
                                header: 'Liquidez',
                                accessorKey: 'liquidez_avere',
                                cell: (item: PosicaoFechadaDrawer) => (
                                    <Typography variant="p" style={{ fontSize: '12px', color: '#4B5563' }}>
                                        {item.liquidez_avere ? `D+${item.liquidez_avere}` : '—'}
                                    </Typography>
                                ),
                            },
                            {
                                header: 'Vencimento',
                                accessorKey: 'data_vencimento',
                                cell: (item: PosicaoFechadaDrawer) => (
                                    <Typography variant="p" style={{ fontSize: '12px', color: '#4B5563' }}>
                                        {formatarDataBR(item.data_vencimento)}
                                    </Typography>
                                ),
                            },
                            {
                                header: 'Taxa',
                                accessorKey: 'taxa',
                                cell: (item: PosicaoFechadaDrawer) => (
                                    item.taxa
                                        ? <Badge variant="ghost" style={{ fontSize: '10px' }}>{item.taxa}</Badge>
                                        : <span style={{ color: '#9CA3AF', fontSize: '12px' }}>—</span>
                                ),
                            },
                            {
                                header: 'Valor Bruto',
                                accessorKey: 'valor_bruto',
                                cell: (item: PosicaoFechadaDrawer) => (
                                    <Typography variant="p" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primaria)' }}>
                                        {formatarMoeda(item.valor_bruto)}
                                    </Typography>
                                ),
                            },
                        ]}
                        keyExtractor={(item: PosicaoFechadaDrawer) => item.id}
                        selectable={false}
                    />
                </div>

                {/* ── Rodapé ── */}
                <div style={{ padding: '12px 24px', background: '#F9FAFB', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'flex-end', borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px', flexShrink: 0 }}>
                    <Button variant="solid" onClick={onClose}>Fechar</Button>
                </div>

            </div>
        </div>
    );
}
