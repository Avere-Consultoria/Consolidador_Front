import { useState, useMemo } from 'react';
import { Card, Typography, Badge, DataTable } from 'avere-ui';
import { LayoutGrid, ChevronRight } from 'lucide-react';
import { fmt, fmtDate } from '../../utils/formatters';
import { CORES } from '../../utils/colors';
import type { ConsolidatedAtivo } from '../../hooks/useHomeMetrics';
import { DrawerDetalheConsolidado } from './modais/DrawerDetalheConsolidado';

interface TabelaAtivosProps {
    ativos: ConsolidatedAtivo[];
    patrimonioTotal: number;
}

export function TabelaAtivos({ ativos, patrimonioTotal }: TabelaAtivosProps) {
    // Estado para controlar quais grupos estão abertos.
    const [gruposAbertos, setGruposAbertos] = useState<Record<string, boolean>>({});

    const [ativoSelecionado, setAtivoSelecionado] = useState<ConsolidatedAtivo | null>(null);
    const [drawerAberto, setDrawerAberto] = useState(false);

    // Agrupamento dos ativos por classe
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
            {Object.entries(grupos).map(([_, { tipo, itens, total }]) => {
                const aberto = gruposAbertos[tipo] ?? false;

                return (
                    // Div container do grupo com espaçamento consistente entre blocos
                    <div key={tipo} style={{ marginBottom: aberto ? '24px' : '4px' }}>

                        {/* CABEÇALHO DO GRUPO (Clicável para Colapsar/Expandir) */}
                        {/* AGORA COM FUNDO BRANCO E ESTILO DE COMPONENTE ROBUSTO */}
                        <div
                            onClick={() => setGruposAbertos(prev => ({ ...prev, [tipo]: !prev[tipo] }))}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                                userSelect: 'none',
                                // --- NOVOS ESTILOS PARA SOLUCIONAR O PROBLEMA VISUAL ---
                                background: '#fff',             // Fundo Branco Puro
                                padding: '12px 16px',          // Aumentado o Padding para dar robustez
                                borderRadius: '8px',           // Cantos arredondados igual aos Cards
                                border: '1px solid rgba(0,0,0,0.05)', // Borda muito subtil para definição
                                boxShadow: '0 1px 2px rgba(0,0,0,0.02)', // Sombra quase invisível para flutuação
                                transition: 'all 0.15s ease',  // Transição suave para hovers
                            }}
                            // Efeito de hover subtil no fundo
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.01)')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                        >
                            <ChevronRight
                                size={18}
                                style={{
                                    opacity: 0.5,
                                    transition: 'transform 0.2s ease',
                                    // Se aberto, a seta aponta para baixo
                                    transform: aberto ? 'rotate(90deg)' : 'rotate(0deg)'
                                }}
                            />
                            <LayoutGrid size={16} style={{ opacity: 0.4 }} />
                            <Typography variant="h2" style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '13px', opacity: 0.8, margin: 0 }}>
                                {tipo.replace(/_/g, ' ')}
                            </Typography>
                            <Badge variant="ghost" style={{ fontSize: '11px' }}>{itens.length} ativos</Badge>

                            <div style={{ marginLeft: 'auto' }}>
                                <Typography variant="p" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primaria, #0083CB)' }}>
                                    {fmt(total)}
                                </Typography>
                            </div>
                        </div>

                        {/* TABELA DO GRUPO (Componente DataTable da avere-ui) */}
                        {aberto && (
                            // Adicionado margem superior para espaçamento elegante após o cabeçalho robusto
                            <Card style={{ padding: 0, overflow: 'hidden', marginTop: '12px' }}>
                                <DataTable
                                    data={itens}
                                    columns={[
                                        {
                                            header: 'Tipo',
                                            accessorKey: 'subTipo',
                                            cell: (item: ConsolidatedAtivo) => item.subTipo
                                                ? <Badge intent="primaria" variant="ghost" style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(0,131,203,0.05)' }}>{item.subTipo}</Badge>
                                                : <span style={{ opacity: 0.3 }}>—</span>,
                                        },
                                        {
                                            header: 'Emissor / Ativo',
                                            accessorKey: 'nome',
                                            cell: (item: ConsolidatedAtivo) => (
                                                <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px', color: '#081F28', lineHeight: 1.4 }}>
                                                    {item.nome || '—'}
                                                </Typography>
                                            ),
                                        },
                                        {
                                            header: 'Instituição',
                                            accessorKey: 'instituicao',
                                            cell: (item: ConsolidatedAtivo) => (
                                                <Badge variant="ghost" style={{
                                                    fontSize: '10px',
                                                    color: corInstituicao(item.instituicao),
                                                    borderColor: corInstituicao(item.instituicao),
                                                    background: `${corInstituicao(item.instituicao)}0A`
                                                }}>
                                                    {item.instituicao === 'BTG Pactual' ? 'BTG' : 'XP'}
                                                </Badge>
                                            ),
                                        },
                                        {
                                            header: 'Vencimento',
                                            accessorKey: 'vencimento',
                                            cell: (item: ConsolidatedAtivo) => item.vencimento
                                                ? <Typography variant="p" style={{ fontSize: '12px', opacity: 0.6, fontWeight: 500 }}>{fmtDate(item.vencimento)}</Typography>
                                                : <span style={{ opacity: 0.3 }}>—</span>,
                                        },
                                        {
                                            header: 'Valor Líquido',
                                            accessorKey: 'valorLiquido',
                                            cell: (item: ConsolidatedAtivo) => <strong>{fmt(item.valorLiquido)}</strong>,
                                        },
                                        {
                                            header: '',
                                            accessorKey: 'rowId',
                                            cell: (item: ConsolidatedAtivo) => (
                                                <button
                                                    onClick={() => { setAtivoSelecionado(item); setDrawerAberto(true); }}
                                                    title="Ver detalhes"
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
                                                    <ChevronRight size={16} />
                                                </button>
                                            ),
                                        },
                                    ]}
                                    keyExtractor={(item: ConsolidatedAtivo) => item.rowId}
                                    selectable={false}
                                />
                            </Card>
                        )}

                    </div>
                );
            })}

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