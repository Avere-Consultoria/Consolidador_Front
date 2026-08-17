import React, { useState, useMemo } from 'react';
import { Card, Typography, Badge, DataTable } from 'avere-ui';
import { LayoutGrid, ChevronRight, List } from 'lucide-react';
import { fmt, fmtDate, padronizarTaxaExibicao } from '../../utils/formatters';
import { CORES } from '../../utils/colors';
import type { ConsolidatedAtivo } from '../../hooks/useHomeMetrics';
import { DrawerDetalheConsolidado } from './modais/DrawerDetalheConsolidado';
import { DrawerPersonalizarInline, type RascunhoInfo } from './modais/DrawerPersonalizarInline';

interface TabelaAtivosProps {
    ativos: ConsolidatedAtivo[];
    patrimonioTotal: number;
    // Recarga leve (só exceções) — ativo já tinha canônico.
    onPersonalizado?: () => void;
    // Recarga completa (a posição mudou de canônico) — usada ao criar rascunho.
    onPersonalizadoTudo?: () => void;
}

// Identificador durável do ativo cru (p/ criar rascunho): ISIN > TICKER > CNPJ > código.
function extrairIdentidade(raw: any): { codigo: string; tipo: string } | null {
    if (!raw) return null;
    const pick = (v: any) => (v != null && String(v).trim() !== '' ? String(v).trim() : null);
    const isin = pick(raw.isin);
    if (isin) return { codigo: isin, tipo: 'ISIN' };
    const ticker = pick(raw.ticker);
    if (ticker) return { codigo: ticker, tipo: 'TICKER' };
    const cnpj = pick(raw.cnpj) || pick(raw.fund_cnpj);
    if (cnpj) return { codigo: cnpj, tipo: 'CNPJ' };
    const cod = pick(raw.codigo_ativo) || pick(raw.security_code) || pick(raw.cusip) || pick(raw.cetip_code) || pick(raw.selic_code);
    if (cod) return { codigo: cod, tipo: 'CODIGO' };
    return null;
}

export function TabelaAtivos({ ativos, patrimonioTotal, onPersonalizado, onPersonalizadoTudo }: TabelaAtivosProps) {
    const [gruposAbertos, setGruposAbertos] = useState<Record<string, boolean>>({});
    const [ativoSelecionado, setAtivoSelecionado] = useState<ConsolidatedAtivo | null>(null);
    const [drawerAberto, setDrawerAberto] = useState(false);
    const [personalizar, setPersonalizar] = useState<{ canonicoId?: string; rascunho?: RascunhoInfo } | null>(null);

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
                itens: [...itens].sort((a, b) => b.valorBruto - a.valorBruto),
                total: itens.reduce((s, a) => s + a.valorBruto, 0)
            }))
            .sort((a, b) => b.total - a.total);
    }, [ativos]);

    const COR_INSTITUICAO: Record<string, string> = {
        'BTG Pactual': CORES.btg,
        'XP Investimentos': CORES.xp,
        'Avenue': CORES.avenue,
        'Ágora': CORES.agora,
    };
    const corInstituicao = (inst: string) => COR_INSTITUICAO[inst] ?? CORES.btg;

    if (ativos.length === 0) return null;

    return (
        <section>
            {/* GRANDE MOLDURA UNIFICADA */}
            <Card style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--color-border-subtle)', background: 'var(--color-surface)' }}>

                {/* 1º - HEADER INTEGRADO AO CARD */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '20px 24px',
                    background: 'var(--color-surface-sunken)',
                    borderBottom: '1px solid var(--color-border-subtle)'
                }}>
                    <div style={{ background: 'var(--color-accent-subtle)', padding: '8px', borderRadius: 'var(--radius-md)', color: 'var(--color-accent)' }}>
                        <List size={20} />
                    </div>
                    <div>
                        <Typography variant="h2" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)' as any }}>
                            Detalhamento da Carteira
                        </Typography>
                        <Typography variant="p" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                            Visualização analítica por classe de ativo
                        </Typography>
                    </div>
                    <Badge variant="outline" style={{ marginLeft: 'auto', color: 'var(--color-text-secondary)', fontSize: 'var(--text-xs)' }}>
                        {ativos.length} Ativos Totais
                    </Badge>
                </div>

                {/* GRUPOS DE ATIVOS */}
                {grupos.map(({ tipo, itens, total }, index) => {
                    const aberto = gruposAbertos[tipo] ?? false;
                    const ehUltimo = index === grupos.length - 1;

                    return (
                        <div key={tipo} style={{
                            borderBottom: ehUltimo && !aberto ? 'none' : '1px solid var(--color-border-subtle)',
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
                                    fontWeight: 'var(--weight-semibold)' as any,
                                    fontSize: 'var(--text-xs)',
                                    color: 'var(--color-text-secondary)',
                                    margin: 0,
                                    fontFamily: 'var(--font-display)',
                                    letterSpacing: 'var(--tracking-caps)'
                                }}>
                                    {tipo.replace(/_/g, ' ')}
                                </Typography>
                                <Badge variant="ghost" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)' }}>
                                    {itens.length}
                                </Badge>

                                <div style={{ marginLeft: 'auto' }}>
                                    <Typography variant="p" style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)' as any, fontVariantNumeric: 'tabular-nums' }}>
                                        {fmt(total)}
                                    </Typography>
                                </div>
                            </div>

                            {/* TABELA EXPANDIDA */}
                            {aberto && (
                                <div style={{
                                    background: 'var(--gray-50)',
                                    borderTop: '1px solid var(--color-border-subtle)',
                                    paddingBottom: '8px'
                                }}>
                                    <style>{`
                                        .tabela-carteira td { vertical-align: middle; }
                                        .tabela-carteira td p { margin: 0; }
                                        /* Larguras FIXAS por coluna → todas as tabelas de grupo alinham entre si. */
                                        .tabela-carteira table { table-layout: fixed; width: 100%; }
                                        .tabela-carteira th:nth-child(1), .tabela-carteira td:nth-child(1) { width: 9%; }
                                        .tabela-carteira th:nth-child(2), .tabela-carteira td:nth-child(2) { width: 29%; }
                                        .tabela-carteira th:nth-child(3), .tabela-carteira td:nth-child(3) { width: 12%; }
                                        .tabela-carteira th:nth-child(4), .tabela-carteira td:nth-child(4) { width: 12%; }
                                        .tabela-carteira th:nth-child(5), .tabela-carteira td:nth-child(5) { width: 16%; }
                                        .tabela-carteira th:nth-child(6), .tabela-carteira td:nth-child(6) { width: 16%; }
                                        .tabela-carteira th:nth-child(7), .tabela-carteira td:nth-child(7) { width: 6%; }
                                        /* Coluna de valor: número à direita com dígitos tabulares (ficha: financeiro). */
                                        .tabela-carteira th:nth-child(6), .tabela-carteira td:nth-child(6) { text-align: right; }
                                        .tabela-carteira td:nth-child(6) { font-variant-numeric: tabular-nums lining-nums; }
                                    `}</style>
                                    <div className="tabela-carteira">
                                    <DataTable
                                        data={itens}
                                        columns={[
                                            {
                                                header: 'Tipo',
                                                accessorKey: 'subTipo',
                                                cell: (item: ConsolidatedAtivo) => (
                                                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                        {item.subTipo
                                                            ? <Badge intent="primaria" variant="ghost" style={{ fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)' as any, background: 'var(--color-accent-subtle)' }}>{item.subTipo}</Badge>
                                                            : <span style={{ color: 'var(--color-text-disabled)' }}>—</span>}
                                                    </div>
                                                ),
                                            },
                                            {
                                                header: 'Emissor / Ativo',
                                                accessorKey: 'nome',
                                                cell: (item: ConsolidatedAtivo) => (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, maxWidth: '300px', minWidth: 0 }}>
                                                        <Typography
                                                            variant="p"
                                                            style={{
                                                                fontWeight: 'var(--weight-medium)' as any,
                                                                fontSize: 'var(--text-sm)',
                                                                margin: 0,
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }}
                                                            title={item.nome}
                                                        >
                                                            {item.nome || '—'}
                                                        </Typography>
                                                        {item.naoVerificado && (
                                                            <Badge
                                                                variant="ghost"
                                                                title="Entrada manual sem identificador único — não vinculada à biblioteca (dado não verificado)"
                                                                style={{ flexShrink: 0, fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)' as any, color: 'var(--color-warning-text)', background: 'var(--color-warning-bg)' }}
                                                            >
                                                                manual · não verif.
                                                            </Badge>
                                                        )}
                                                    </div>
                                                ),
                                            },
                                            {
                                                header: 'Taxa',
                                                accessorKey: 'taxa' as any,
                                                cell: (item: ConsolidatedAtivo) => {
                                                    const valor = padronizarTaxaExibicao(item.taxa || item.benchmark);
                                                    return (
                                                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                            {(!valor || valor === '-')
                                                                ? <span style={{ color: 'var(--color-text-disabled)' }}>—</span>
                                                                : <Typography variant="p" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)' as any, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', margin: 0, fontVariantNumeric: 'tabular-nums' }}>{valor}</Typography>
                                                            }
                                                        </div>
                                                    );
                                                },
                                            },
                                            {
                                                header: 'Instituição',
                                                accessorKey: 'instituicao',
                                                cell: (item: ConsolidatedAtivo) => (
                                                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                        <Badge variant="ghost" style={{
                                                            fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)' as any,
                                                            color: corInstituicao(item.instituicao),
                                                            borderColor: corInstituicao(item.instituicao),
                                                            background: `${corInstituicao(item.instituicao)}0A`
                                                        }}>
                                                            {item.instituicao === 'BTG Pactual' ? 'BTG' : item.instituicao === 'XP Investimentos' ? 'XP' : item.instituicao}
                                                        </Badge>
                                                    </div>
                                                ),
                                            },
                                            {
                                                header: 'Vencimento/Liquidez',
                                                accessorKey: 'vencimento',
                                                cell: (item: ConsolidatedAtivo) => {
                                                    let conteudo: React.ReactNode = <span style={{ color: 'var(--color-text-disabled)' }}>—</span>;
                                                    if (item.vencimento) {
                                                        conteudo = <Typography variant="p" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, fontVariantNumeric: 'tabular-nums' }}>{fmtDate(item.vencimento)}</Typography>;
                                                    } else if (item.liquidez !== null && item.liquidez !== undefined && item.liquidez !== '') {
                                                        conteudo = <Typography variant="p" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, fontVariantNumeric: 'tabular-nums' }}>D+{item.liquidez}</Typography>;
                                                    }
                                                    return <div style={{ display: 'flex', justifyContent: 'flex-start' }}>{conteudo}</div>;
                                                },
                                            },
                                            {
                                                header: 'Valor Bruto',
                                                accessorKey: 'valorBruto',
                                                cell: (item: ConsolidatedAtivo) => (
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                        <span style={{ fontWeight: 'var(--weight-semibold)' as any, fontSize: 'var(--text-sm)' }}>{fmt(item.valorBruto ?? item.valorLiquido)}</span>
                                                    </div>
                                                ),
                                            },
                                            {
                                                header: '',
                                                accessorKey: 'rowId',
                                                cell: (item: ConsolidatedAtivo) => (
                                                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
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
                                                                color: 'var(--color-primaria)',
                                                                opacity: 0.5, transition: 'opacity 0.15s',
                                                            }}
                                                            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                                                            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
                                                        >
                                                            <ChevronRight size={18} />
                                                        </button>
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        keyExtractor={(item: ConsolidatedAtivo) => item.rowId}
                                        selectable={false}
                                    />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </Card>

            {/* DRAWER DE DETALHES */}
            {ativoSelecionado && (() => {
                const ident = extrairIdentidade(ativoSelecionado.rawData);
                const personalizavel = !!(ativoSelecionado.ativoCanonicoId || ident);
                const modoRascunho = !ativoSelecionado.ativoCanonicoId && !!ident;
                return (
                    <DrawerDetalheConsolidado
                        ativo={ativoSelecionado}
                        aberto={drawerAberto}
                        onClose={setDrawerAberto}
                        patrimonioTotal={patrimonioTotal}
                        personalizavel={personalizavel}
                        modoRascunho={modoRascunho}
                        onPersonalizar={() => {
                            if (ativoSelecionado.ativoCanonicoId) {
                                setPersonalizar({ canonicoId: ativoSelecionado.ativoCanonicoId });
                            } else if (ident && ativoSelecionado.rawData?.id) {
                                setPersonalizar({
                                    rascunho: {
                                        nome: ativoSelecionado.nome,
                                        codigo: ident.codigo,
                                        tipo: ident.tipo,
                                        base: ativoSelecionado.instituicaoBase ?? 'MANUAL',
                                        posicaoId: ativoSelecionado.rawData.id,
                                        subTipo: ativoSelecionado.subTipo ?? null,
                                    },
                                });
                            }
                        }}
                    />
                );
            })()}

            {/* ATALHO DE PERSONALIZAÇÃO (por cima do drawer de detalhes) */}
            {personalizar && (
                <DrawerPersonalizarInline
                    canonicoId={personalizar.canonicoId}
                    rascunho={personalizar.rascunho}
                    onClose={() => setPersonalizar(null)}
                    onSaved={() => { onPersonalizado?.(); setDrawerAberto(false); }}
                    onSavedRascunho={() => { onPersonalizadoTudo?.(); setDrawerAberto(false); }}
                />
            )}
        </section>
    );
}