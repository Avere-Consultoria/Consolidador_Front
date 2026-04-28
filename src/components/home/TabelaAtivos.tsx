import { useState, useMemo } from 'react';
import { Card, Typography, Badge, DataTable } from 'avere-ui';
import { LayoutGrid, ChevronRight, List } from 'lucide-react';
import { fmt, fmtDate } from '../../utils/formatters';
import { CORES } from '../../utils/colors';
import type { ConsolidatedAtivo } from '../../hooks/useHomeMetrics';
import { DrawerDetalheConsolidado } from './modais/DrawerDetalheConsolidado';

interface TabelaAtivosProps {
    ativos: ConsolidatedAtivo[];
    patrimonioTotal: number;
}

export function TabelaAtivos({ ativos, patrimonioTotal }: TabelaAtivosProps) {
    const [gruposAbertos, setGruposAbertos] = useState<Record<string, boolean>>({});
    const [ativoSelecionado, setAtivoSelecionado] = useState<ConsolidatedAtivo | null>(null);
    const [drawerAberto, setDrawerAberto] = useState(false);

    const grupos = useMemo(() => {
        const map: Record<string, ConsolidatedAtivo[]> = {};
        for (const a of ativos) {
            const key = a.tipo || 'Outros';
            if (!map[key]) map[key] = [];
            map[key].push(a);
        }
        return Object.entries(map)
            .map(([tipo, itens]) => ({
                tipo,
                itens: [...itens].sort((a, b) => b.valorLiquido - a.valorLiquido),
                total: itens.reduce((s, a) => s + a.valorLiquido, 0)
            }))
            .sort((a, b) => b.total - a.total);
    }, [ativos]);

    const corInstituicao = (inst: string) => inst === 'BTG Pactual' ? CORES.btg : CORES.xp;

    if (ativos.length === 0) return null;

    return (
        <section>
            {/* GRANDE MOLDURA UNIFICADA */}
            <Card style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>

                {/* 1º - HEADER INTEGRADO AO CARD */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '20px 24px',
                    background: 'rgba(0, 0, 0, 0.02)',
                    borderBottom: '1px solid rgba(0,0,0,0.06)'
                }}>
                    <div style={{ background: 'rgba(0, 131, 203, 0.1)', padding: '8px', borderRadius: '8px', color: 'var(--color-primaria)' }}>
                        <List size={20} />
                    </div>
                    <div>
                        <Typography variant="h2" style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', color: '#081F28' }}>
                            Detalhamento da Carteira
                        </Typography>
                        <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6, fontFamily: 'Montserrat, sans-serif' }}>
                            Visualização analítica por classe de ativo
                        </Typography>
                    </div>
                    <Badge variant="outline" style={{ marginLeft: 'auto', opacity: 0.6, fontFamily: 'Montserrat, sans-serif', fontSize: '11px' }}>
                        {ativos.length} Ativos Totais
                    </Badge>
                </div>

                {/* GRUPOS DE ATIVOS */}
                {grupos.map(({ tipo, itens, total }, index) => {
                    const aberto = gruposAbertos[tipo] ?? false;
                    const ehUltimo = index === grupos.length - 1;

                    return (
                        <div key={tipo} style={{
                            borderBottom: ehUltimo && !aberto ? 'none' : '1px solid rgba(0,0,0,0.05)',
                        }}>
                            {/* LINHA DO GRUPO */}
                            <div
                                onClick={() => setGruposAbertos(prev => ({ ...prev, [tipo]: !prev[tipo] }))}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    padding: '16px 24px',
                                    transition: 'all 0.15s ease',
                                    background: aberto ? 'rgba(0,131,203,0.02)' : 'transparent'
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.04)')}
                                onMouseLeave={e => (e.currentTarget.style.background = aberto ? 'rgba(0,131,203,0.02)' : 'transparent')}
                            >
                                <ChevronRight
                                    size={18}
                                    style={{
                                        opacity: 0.4,
                                        transition: 'transform 0.2s ease',
                                        transform: aberto ? 'rotate(90deg)' : 'rotate(0deg)'
                                    }}
                                />
                                <LayoutGrid size={16} style={{ opacity: 0.3 }} />
                                <Typography variant="h2" style={{
                                    textTransform: 'uppercase',
                                    fontWeight: 700,
                                    fontSize: '12px',
                                    opacity: 0.8,
                                    margin: 0,
                                    fontFamily: 'Montserrat, sans-serif',
                                    letterSpacing: '0.02em'
                                }}>
                                    {tipo.replace(/_/g, ' ')}
                                </Typography>
                                <Badge variant="ghost" style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif', opacity: 0.7 }}>
                                    {itens.length}
                                </Badge>

                                <div style={{ marginLeft: 'auto' }}>
                                    <Typography variant="p" style={{ fontSize: '14px', fontWeight: 700, color: '#081F28', fontFamily: 'Montserrat, sans-serif' }}>
                                        {fmt(total)}
                                    </Typography>
                                </div>
                            </div>

                            {/* TABELA EXPANDIDA */}
                            {aberto && (
                                <div style={{
                                    background: '#fcfcfc',
                                    borderTop: '1px solid rgba(0,0,0,0.03)',
                                    paddingBottom: '8px'
                                }}>
                                    <DataTable
                                        data={itens}
                                        columns={[
                                            {
                                                header: 'Tipo',
                                                accessorKey: 'subTipo',
                                                cell: (item: ConsolidatedAtivo) => item.subTipo
                                                    ? <Badge intent="primaria" variant="ghost" style={{ fontSize: '10px', fontWeight: 700, background: 'rgba(0,131,203,0.05)', fontFamily: 'Montserrat, sans-serif' }}>{item.subTipo}</Badge>
                                                    : <span style={{ opacity: 0.3 }}>—</span>,
                                            },
                                            {
                                                header: 'Emissor / Ativo',
                                                accessorKey: 'nome',
                                                cell: (item: ConsolidatedAtivo) => (
                                                    <div style={{ maxWidth: '300px' }}>
                                                        <Typography
                                                            variant="p"
                                                            style={{
                                                                fontWeight: 600,
                                                                fontSize: '13px',
                                                                color: '#081F28',
                                                                fontFamily: 'Montserrat, sans-serif',
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }}
                                                            title={item.nome}
                                                        >
                                                            {item.nome || '—'}
                                                        </Typography>
                                                    </div>
                                                ),
                                            },
                                            {
                                                header: 'Taxa',
                                                accessorKey: 'benchmark' as any,
                                                cell: (item: ConsolidatedAtivo) => (
                                                    <Typography variant="p" style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', fontFamily: 'Montserrat, sans-serif' }}>
                                                        {item.benchmark || '—'}
                                                    </Typography>
                                                ),
                                            },
                                            {
                                                header: 'Instituição',
                                                accessorKey: 'instituicao',
                                                cell: (item: ConsolidatedAtivo) => (
                                                    <Badge variant="ghost" style={{
                                                        fontSize: '10px', fontWeight: 700, fontFamily: 'Montserrat, sans-serif',
                                                        color: corInstituicao(item.instituicao),
                                                        borderColor: corInstituicao(item.instituicao),
                                                        background: `${corInstituicao(item.instituicao)}0A`
                                                    }}>
                                                        {item.instituicao === 'BTG Pactual' ? 'BTG' : 'XP'}
                                                    </Badge>
                                                ),
                                            },
                                            {
                                                header: 'Vencimento/Liquidez',
                                                accessorKey: 'vencimento',
                                                cell: (item: ConsolidatedAtivo) => item.vencimento
                                                    ? <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6, fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>{fmtDate(item.vencimento)}</Typography>
                                                    : <span style={{ opacity: 0.3 }}>—</span>,
                                            },
                                            {
                                                header: 'Valor Bruto',
                                                accessorKey: 'valorBruto',
                                                cell: (item: ConsolidatedAtivo) => <strong style={{ fontFamily: 'Montserrat, sans-serif' }}>{fmt(item.valorBruto ?? item.valorLiquido)}</strong>,
                                            },
                                            {
                                                header: '',
                                                accessorKey: 'rowId',
                                                cell: (item: ConsolidatedAtivo) => (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setAtivoSelecionado(item);
                                                            setDrawerAberto(true);
                                                        }}
                                                        style={{
                                                            background: 'none', border: 'none', cursor: 'pointer',
                                                            padding: '4px 8px', borderRadius: '6px',
                                                            display: 'flex', alignItems: 'center',
                                                            color: 'var(--color-primaria, #0083CB)',
                                                            opacity: 0.5, transition: 'opacity 0.15s',
                                                        }}
                                                        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                                                        onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
                                                    >
                                                        <ChevronRight size={18} />
                                                    </button>
                                                ),
                                            },
                                        ]}
                                        keyExtractor={(item: ConsolidatedAtivo) => item.rowId}
                                        selectable={false}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </Card>

            {/* DRAWER DE DETALHES */}
            {ativoSelecionado && (
                <DrawerDetalheConsolidado
                    ativo={ativoSelecionado}
                    aberto={drawerAberto}
                    onClose={setDrawerAberto}
                    patrimonioTotal={patrimonioTotal}
                />
            )}
        </section>
    );
}