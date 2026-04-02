import { useState, useMemo } from 'react';
import { Card, Typography, Badge } from 'avere-ui';
import { LayoutGrid } from 'lucide-react';
import { fmt, fmtDate, pct } from '../../utils/formatters';
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
            .map(([tipo, itens]) => ({ tipo, itens: [...itens].sort((a, b) => b.valorLiquido - a.valorLiquido), total: itens.reduce((s, a) => s + a.valorLiquido, 0) }))
            .sort((a, b) => b.total - a.total);
    }, [ativos]);

    const corInstituicao = (inst: string) => inst === 'BTG Pactual' ? CORES.btg : CORES.xp;

    if (ativos.length === 0) return null;

    return (
        <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <LayoutGrid size={16} style={{ opacity: 0.4 }} />
                <Typography variant="h2" style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', opacity: 0.7 }}>
                    Carteira Detalhada
                </Typography>
                <Badge variant="ghost" style={{ fontSize: '11px' }}>{ativos.length} ativos</Badge>
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px 100px 110px 36px', padding: '10px 16px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: 'rgba(0,0,0,0.02)' }}>
                    {['', 'Ativo', 'Inst.', 'Vencimento', 'Valor Líquido', ''].map((h, i) => (
                        <span key={i} style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4 }}>{h}</span>
                    ))}
                </div>

                {grupos.map(({ tipo, itens, total }) => {
                    const aberto = gruposAbertos[tipo] ?? false;
                    return (
                        <div key={tipo}>
                            <div
                                onClick={() => setGruposAbertos(prev => ({ ...prev, [tipo]: !prev[tipo] }))}
                                style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px 100px 110px 36px', padding: '12px 16px', cursor: 'pointer', background: aberto ? 'rgba(0,131,203,0.04)' : 'transparent', borderBottom: '1px solid rgba(0,0,0,0.06)', alignItems: 'center', transition: 'background 0.15s', userSelect: 'none' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.06)')}
                                onMouseLeave={e => (e.currentTarget.style.background = aberto ? 'rgba(0,131,203,0.04)' : 'transparent')}
                            >
                                <span style={{ fontSize: '14px', opacity: 0.5, transition: 'transform 0.2s', display: 'inline-block', transform: aberto ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{tipo}</span>
                                    <Badge variant="ghost" style={{ fontSize: '10px' }}>{itens.length}</Badge>
                                </div>
                                <span /><span />
                                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primaria, #0083CB)' }}>{fmt(total)}</span>
                                <span style={{ fontSize: '11px', opacity: 0.4 }}>{pct(total, patrimonioTotal).toFixed(1)}%</span>
                            </div>

                            {aberto && itens.map((ativo, i) => (
                                <div
                                    key={ativo.rowId}
                                    style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px 100px 110px 36px', padding: '10px 16px', borderBottom: i < itens.length - 1 ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(0,0,0,0.06)', alignItems: 'center', background: 'rgba(0,0,0,0.008)', cursor: 'pointer', transition: 'background 0.12s' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,131,203,0.04)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.008)')}
                                    onClick={() => { setAtivoSelecionado(ativo); setDrawerAberto(true); }}
                                >
                                    <span />
                                    <div>
                                        <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>{ativo.nome}</Typography>
                                        {ativo.subTipo && <Badge intent="primaria" variant="ghost" style={{ fontSize: '10px', marginTop: '2px' }}>{ativo.subTipo}</Badge>}
                                    </div>
                                    <Badge variant="ghost" style={{ fontSize: '10px', color: corInstituicao(ativo.instituicao), borderColor: corInstituicao(ativo.instituicao) }}>
                                        {ativo.instituicao === 'BTG Pactual' ? 'BTG' : 'XP'}
                                    </Badge>
                                    <Typography variant="p" style={{ fontSize: '12px', opacity: 0.55 }}>{ativo.vencimento ? fmtDate(ativo.vencimento) : '—'}</Typography>
                                    <div>
                                        <strong style={{ fontSize: '13px' }}>{fmt(ativo.valorLiquido)}</strong>
                                        <div style={{ fontSize: '10px', opacity: 0.35 }}>{pct(ativo.valorLiquido, patrimonioTotal).toFixed(1)}%</div>
                                    </div>
                                    <span style={{ opacity: 0.35, fontSize: '16px' }}>›</span>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </Card>

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