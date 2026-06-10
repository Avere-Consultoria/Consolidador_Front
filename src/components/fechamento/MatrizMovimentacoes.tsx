import { Fragment, useEffect, useMemo, useState } from 'react';
import { Typography, Button, Spinner, Badge, Select, Card } from 'avere-ui';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Filter, Lock, ChevronDown, ChevronRight, ChevronsRightLeft, Search } from 'lucide-react';
import { supabase } from '../../services/supabase';

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface Props {
    clienteId: string;
    mes: string;                       // 'YYYY-MM'
    mesLabel: string;
    apelidoMap: Map<string, string>;   // conta_id → apelido
}
interface Posicao {
    date: string;
    contaId: string | null;
    base: string;
    canonicoId: string | null;
    nome: string;
    classe: string;
    valor: number;
}
interface CaixaRow { date: string; contaId: string | null; base: string; valor: number; }

const contaKey = (contaId: string | null, base: string) => contaId ?? base;
type Tipo = 'entrada' | 'saida' | 'variacao' | 'estatico';
interface Linha {
    key: string;
    nome: string;
    classe: string;
    base: string;
    valores: Map<string, number>;
    primeiro: number | null;
    ultimo: number | null;
    delta: number;
    tipo: Tipo;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtDiaMes(iso: string): string { const [, m, d] = iso.split('-'); return `${d}/${m}`; }
function fmtCompacto(v: number | null | undefined): string {
    if (v == null) return '—';
    const abs = Math.abs(v);
    if (abs >= 1e6) return `${(v / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mi`;
    if (abs >= 1e3) return `${(v / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil`;
    return v.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
}
function fmtMoeda(v: number | null | undefined): string {
    if (v == null) return '—';
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}
function fmtDelta(v: number): string { return `${v >= 0 ? '+' : '−'}${fmtCompacto(Math.abs(v))}`; }
function fmtPct(num: number, den: number): string {
    if (!den) return '';
    const p = (num / Math.abs(den)) * 100;
    return `${p >= 0 ? '+' : '−'}${Math.abs(p).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;
}

const baseFromInst = (inst: string): string =>
    (['BTG', 'XP', 'AVENUE', 'AGORA'].includes((inst || '').toUpperCase()) ? (inst || '').toUpperCase() : (inst || 'MANUAL'));

function prevMonth(mes: string): string {
    const [y, m] = mes.split('-').map(Number);
    const d = new Date(y, m - 2, 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
function lastDayISO(mes: string): string {
    const [y, m] = mes.split('-').map(Number);
    return `${mes}-${String(new Date(y, m, 0).getDate()).padStart(2, '0')}`;
}

export function MatrizMovimentacoes({ clienteId, mes, mesLabel, apelidoMap }: Props) {
    const [loading, setLoading] = useState(true);
    const [posicoes, setPosicoes] = useState<Posicao[]>([]);
    const [caixaRaw, setCaixaRaw] = useState<CaixaRow[]>([]);
    const [baselineDate, setBaselineDate] = useState<string | null>(null);

    const [escopo, setEscopo] = useState('CONSOLIDADO');
    const [soMudancas, setSoMudancas] = useState(true);
    const [tipoFiltro, setTipoFiltro] = useState<'TODOS' | Tipo>('TODOS');
    const [busca, setBusca] = useState('');
    const [colsOcultas, setColsOcultas] = useState<Set<string>>(new Set());
    const [classesRecolhidas, setClassesRecolhidas] = useState<Set<string>>(new Set());

    useEffect(() => {
        async function fetchTudo() {
            setLoading(true);
            try {
                const ini = `${mes}-01`;
                const [y, m] = mes.split('-').map(Number);
                const fim = `${mes}-${String(new Date(y, m, 0).getDate()).padStart(2, '0')}`;
                const inMes = (q: any) => q.eq('cliente_id', clienteId).gte('data_referencia', ini).lte('data_referencia', fim);
                const prev = prevMonth(mes);

                const [btg, xp, avenue, agora, manual, canon, baseSnap] = await Promise.all([
                    inMes(supabase.from('posicao_btg_snapshots').select('data_referencia, conta_id, saldo_cc, saldo_cripto, posicao_btg_ativos(ativo_canonico_id, emissor, valor_liquido, valor_bruto)')),
                    inMes(supabase.from('posicao_xp_snapshots').select('data_referencia, conta_id, saldo_coe, posicao_xp_ativos(ativo_canonico_id, nome, emissor, valor_liquido, valor_bruto)')),
                    inMes(supabase.from('posicao_avenue_snapshots').select('data_referencia, conta_id, posicao_avenue_ativos(ativo_canonico_id, nome, valor_bruto_brl)')),
                    inMes(supabase.from('posicao_agora_snapshots').select('data_referencia, conta_id, posicao_agora_ativos(ativo_canonico_id, emissor, valor_liquido, valor_bruto)')),
                    inMes(supabase.from('posicao_manual_snapshots').select('data_referencia, conta_id, instituicao, posicao_manual_ativos(ativo_canonico_id, emissor, valor_liquido, valor_bruto)')),
                    supabase.from('ativos_canonicos').select('id, nome_canonico, classe_avere'),
                    supabase.from('snapshots_fechados').select('conta_id, instituicao, saldo_caixa_outros, posicoes_fechadas(ativo_canonico_id, nome_exibicao, classe_avere, valor_liquido, valor_bruto)').eq('cliente_id', clienteId).eq('mes_referencia', prev),
                ]);

                const canonMap = new Map<string, { nome: string; classe: string }>();
                (canon.data ?? []).forEach((c: any) => canonMap.set(c.id, { nome: c.nome_canonico, classe: c.classe_avere ?? '—' }));

                const out: Posicao[] = [];
                const caixa: CaixaRow[] = [];
                const addCaixa = (date: string, contaId: string | null, base: string, valor: number) => { if (valor) caixa.push({ date, contaId, base, valor }); };
                const push = (date: string, contaId: string | null, base: string, a: any, valor: number, nomeRaw: string) => {
                    if (!valor) return;
                    const can = a.ativo_canonico_id ? canonMap.get(a.ativo_canonico_id) : null;
                    out.push({ date, contaId, base, canonicoId: a.ativo_canonico_id ?? null, nome: can?.nome || nomeRaw || '—', classe: can?.classe || '—', valor });
                };

                (btg.data ?? []).forEach((s: any) => {
                    addCaixa(s.data_referencia, s.conta_id, 'BTG', (Number(s.saldo_cc) || 0) + (Number(s.saldo_cripto) || 0));
                    (s.posicao_btg_ativos ?? []).forEach((a: any) => push(s.data_referencia, s.conta_id, 'BTG', a, Number(a.valor_liquido ?? a.valor_bruto ?? 0), a.emissor));
                });
                (xp.data ?? []).forEach((s: any) => {
                    addCaixa(s.data_referencia, s.conta_id, 'XP', Number(s.saldo_coe) || 0);
                    (s.posicao_xp_ativos ?? []).forEach((a: any) => push(s.data_referencia, s.conta_id, 'XP', a, Number(a.valor_liquido ?? a.valor_bruto ?? 0), a.nome || a.emissor));
                });
                (avenue.data ?? []).forEach((s: any) => {
                    (s.posicao_avenue_ativos ?? []).forEach((a: any) => push(s.data_referencia, s.conta_id, 'AVENUE', a, Number(a.valor_bruto_brl ?? 0), a.nome));
                });
                (agora.data ?? []).forEach((s: any) => {
                    (s.posicao_agora_ativos ?? []).forEach((a: any) => push(s.data_referencia, s.conta_id, 'AGORA', a, Number(a.valor_liquido ?? a.valor_bruto ?? 0), a.emissor));
                });
                (manual.data ?? []).forEach((s: any) => {
                    const base = baseFromInst(s.instituicao);
                    (s.posicao_manual_ativos ?? []).forEach((a: any) => push(s.data_referencia, s.conta_id, base, a, Number(a.valor_liquido ?? a.valor_bruto ?? 0), a.emissor));
                });

                const baseDate = lastDayISO(prev);
                let temBaseline = false;
                (baseSnap.data ?? []).forEach((s: any) => {
                    temBaseline = true;
                    const base = baseFromInst(s.instituicao);
                    addCaixa(baseDate, s.conta_id, base, Number(s.saldo_caixa_outros) || 0);
                    (s.posicoes_fechadas ?? []).forEach((p: any) => {
                        const valor = Number(p.valor_liquido ?? p.valor_bruto ?? 0);
                        if (!valor) return;
                        out.push({ date: baseDate, contaId: s.conta_id, base, canonicoId: p.ativo_canonico_id ?? null, nome: p.nome_exibicao || '—', classe: p.classe_avere || '—', valor });
                    });
                });

                setBaselineDate(temBaseline ? baseDate : null);
                setPosicoes(out);
                setCaixaRaw(caixa);
            } catch (err) {
                console.error('Erro ao carregar movimentações:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchTudo();
    }, [clienteId, mes]);

    // Opções do select de conta.
    const opcoesConta = useMemo(() => {
        const byKey = new Map<string, { base: string; contaId: string | null }>();
        const add = (contaId: string | null, base: string) => { const k = contaKey(contaId, base); if (!byKey.has(k)) byKey.set(k, { base, contaId }); };
        posicoes.forEach(p => add(p.contaId, p.base));
        caixaRaw.forEach(c => add(c.contaId, c.base));
        const porBase = new Map<string, { k: string; contaId: string | null }[]>();
        byKey.forEach((v, k) => { const arr = porBase.get(v.base) ?? []; arr.push({ k, contaId: v.contaId }); porBase.set(v.base, arr); });
        const opts = [{ label: 'Consolidado', value: 'CONSOLIDADO' }];
        Array.from(porBase.entries()).sort((a, b) => a[0].localeCompare(b[0])).forEach(([base, arr]) => {
            arr.sort((a, b) => (a.contaId ?? '').localeCompare(b.contaId ?? ''));
            const multi = arr.length > 1;
            arr.forEach((it, i) => {
                const apelido = it.contaId ? apelidoMap.get(it.contaId) : null;
                opts.push({ label: apelido || (multi ? `${base} ${i + 1}` : base), value: it.k });
            });
        });
        return opts;
    }, [posicoes, caixaRaw, apelidoMap]);

    const posicoesEscopo = useMemo(
        () => escopo === 'CONSOLIDADO' ? posicoes : posicoes.filter(p => contaKey(p.contaId, p.base) === escopo),
        [posicoes, escopo],
    );

    const caixaPorData = useMemo(() => {
        const m = new Map<string, number>();
        caixaRaw.forEach(c => {
            if (escopo !== 'CONSOLIDADO' && contaKey(c.contaId, c.base) !== escopo) return;
            if (c.valor) m.set(c.date, (m.get(c.date) ?? 0) + c.valor);
        });
        return m;
    }, [caixaRaw, escopo]);

    const datas = useMemo(() => {
        const s = new Set<string>();
        posicoesEscopo.forEach(p => s.add(p.date));
        caixaPorData.forEach((_, d) => s.add(d));
        return Array.from(s).sort();
    }, [posicoesEscopo, caixaPorData]);

    // Para cada coluna expandida, qual é a coluna expandida anterior (p/ comparar cores).
    const prevExpandedOf = useMemo(() => {
        const m = new Map<string, string | null>();
        let last: string | null = null;
        datas.forEach(d => { if (!colsOcultas.has(d)) { m.set(d, last); last = d; } });
        return m;
    }, [datas, colsOcultas]);

    // Linhas + classificação (vs. baseline = primeira data).
    const linhas = useMemo<Linha[]>(() => {
        if (datas.length === 0) return [];
        const primeiraData = datas[0];
        const ultimaData = datas[datas.length - 1];
        const map = new Map<string, Linha>();
        posicoesEscopo.forEach(p => {
            const key = p.canonicoId || `${p.base}|${p.nome}`;
            let row = map.get(key);
            if (!row) { row = { key, nome: p.nome, classe: p.classe, base: p.base, valores: new Map(), primeiro: null, ultimo: null, delta: 0, tipo: 'estatico' }; map.set(key, row); }
            row.valores.set(p.date, (row.valores.get(p.date) ?? 0) + p.valor);
        });
        const arr = Array.from(map.values());
        arr.forEach(row => {
            const pri = row.valores.has(primeiraData) ? row.valores.get(primeiraData)! : null;
            const ult = row.valores.has(ultimaData) ? row.valores.get(ultimaData)! : null;
            row.primeiro = pri; row.ultimo = ult;
            if (pri == null && ult != null) { row.tipo = 'entrada'; row.delta = ult; }
            else if (pri != null && ult == null) { row.tipo = 'saida'; row.delta = -pri; }
            else if (pri != null && ult != null) { row.delta = ult - pri; row.tipo = Math.abs(row.delta) > 0.005 ? 'variacao' : 'estatico'; }
            else { row.tipo = 'estatico'; row.delta = 0; }
        });
        const prioridade: Record<Tipo, number> = { entrada: 0, saida: 1, variacao: 2, estatico: 3 };
        return arr.sort((a, b) => prioridade[a.tipo] - prioridade[b.tipo] || Math.abs(b.delta) - Math.abs(a.delta));
    }, [posicoesEscopo, datas]);

    const totaisPorData = useMemo(() => {
        const t = new Map<string, number>();
        posicoesEscopo.forEach(p => t.set(p.date, (t.get(p.date) ?? 0) + p.valor));
        caixaPorData.forEach((v, d) => t.set(d, (t.get(d) ?? 0) + v));
        return t;
    }, [posicoesEscopo, caixaPorData]);

    // KPIs do mês (sempre sobre o conjunto completo do escopo, ignorando filtros visuais).
    const kpis = useMemo(() => {
        if (datas.length < 2) return null;
        const inicio = totaisPorData.get(datas[0]) ?? 0;
        const fim = totaisPorData.get(datas[datas.length - 1]) ?? 0;
        let entradas = 0, nEnt = 0, saidas = 0, nSai = 0, variacao = 0;
        linhas.forEach(l => {
            if (l.tipo === 'entrada') { entradas += l.delta; nEnt++; }
            else if (l.tipo === 'saida') { saidas += -l.delta; nSai++; }
            else if (l.tipo === 'variacao') { variacao += l.delta; }
        });
        const caixaD = (caixaPorData.get(datas[datas.length - 1]) ?? 0) - (caixaPorData.get(datas[0]) ?? 0);
        const maiorEnt = linhas.filter(l => l.tipo === 'entrada').sort((a, b) => b.delta - a.delta)[0] ?? null;
        const maiorSai = linhas.filter(l => l.tipo === 'saida').sort((a, b) => a.delta - b.delta)[0] ?? null;
        return { inicio, fim, deltaTotal: fim - inicio, entradas, nEnt, saidas, nSai, variacao, caixaD, maiorEnt, maiorSai };
    }, [linhas, totaisPorData, caixaPorData, datas]);

    // Filtros visuais → agrupamento por classe.
    const linhasFiltradas = useMemo(() => linhas.filter(l =>
        (!soMudancas || l.tipo !== 'estatico')
        && (tipoFiltro === 'TODOS' || l.tipo === tipoFiltro)
        && (!busca.trim() || l.nome.toLowerCase().includes(busca.trim().toLowerCase()))
    ), [linhas, soMudancas, tipoFiltro, busca]);

    const grupos = useMemo(() => {
        const g = new Map<string, Linha[]>();
        linhasFiltradas.forEach(l => { const k = l.classe || '—'; const arr = g.get(k) ?? []; arr.push(l); g.set(k, arr); });
        const ultima = datas[datas.length - 1];
        return Array.from(g.entries()).map(([classe, rows]) => {
            const valores = new Map<string, number>();
            rows.forEach(r => r.valores.forEach((v, d) => valores.set(d, (valores.get(d) ?? 0) + v)));
            return { classe, rows, valores, delta: rows.reduce((s, r) => s + r.delta, 0), totalFim: valores.get(ultima) ?? 0 };
        }).sort((a, b) => b.totalFim - a.totalFim);
    }, [linhasFiltradas, datas]);

    const baseLabel = baselineDate ? `Fech. ${fmtDiaMes(baselineDate)}` : null;
    const nDateCols = datas.length + 2;

    const expandir = (d: string) => setColsOcultas(s => { const n = new Set(s); n.delete(d); return n; });
    const recolher = (d: string) => setColsOcultas(s => new Set(s).add(d));

    // Célula fina de coluna recolhida — clique reabre.
    const slimTd = (d: string) => (
        <td key={d} style={slimCellStyle} onClick={() => expandir(d)} title={`Mostrar ${fmtDiaMes(d)}`} />
    );

    // Célula com cor vs. coluna EXPANDIDA anterior.
    const tdColored = (valores: Map<string, number>, d: string) => {
        if (colsOcultas.has(d)) return slimTd(d);
        const v = valores.has(d) ? valores.get(d)! : null;
        const pd = prevExpandedOf.get(d) ?? null;
        const prev = pd != null ? (valores.has(pd) ? valores.get(pd)! : null) : null;
        let bg = 'transparent', color = '#374151', peso = 500;
        if (v != null && prev == null && pd != null) { bg = '#DCFCE7'; color = '#15803D'; peso = 700; }
        else if (v == null && prev != null) { return <td key={d} style={tdCell('#FEF2F2')}><span style={{ color: '#DC2626' }}>—</span></td>; }
        else if (v != null && prev != null) { if (v > prev + 0.005) color = '#15803D'; else if (v < prev - 0.005) color = '#DC2626'; }
        return <td key={d} style={tdCell(bg)} title={fmtMoeda(v)}><span style={{ color, fontWeight: peso }}>{v == null ? '—' : fmtCompacto(v)}</span></td>;
    };

    // Célula simples (total / subtotal de classe).
    const tdPlain = (v: number | null, d: string, bold: boolean, bg: string) => {
        if (colsOcultas.has(d)) return slimTd(d);
        return <td key={d} style={tdCell(bg)} title={fmtMoeda(v)}><span style={{ fontWeight: bold ? 800 : 700 }}>{fmtCompacto(v)}</span></td>;
    };

    const badgeTipo = (t: Tipo) => {
        if (t === 'entrada') return <Badge intent="primaria" variant="ghost" style={pill}><ArrowUpRight size={10} /> Entrada</Badge>;
        if (t === 'saida') return <Badge intent="erro" variant="ghost" style={pill}><ArrowDownRight size={10} /> Saída</Badge>;
        if (t === 'variacao') return <Badge intent="neutro" variant="ghost" style={pill}><TrendingUp size={10} /> Variação</Badge>;
        return <Badge intent="secundaria" variant="ghost" style={pill}>—</Badge>;
    };

    const chip = (label: string, val: 'TODOS' | Tipo) => (
        <button onClick={() => setTipoFiltro(val)} style={{ ...chipStyle, ...(tipoFiltro === val ? chipAtivo : {}) }}>{label}</button>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* KPIs do mês */}
            {!loading && kpis && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    <KpiCard titulo="Patrimônio" valor={fmtMoeda(kpis.fim)}
                        sub={`${fmtMoeda(kpis.inicio)} → ${fmtMoeda(kpis.fim)}`}
                        destaque={fmtDelta(kpis.deltaTotal)} destaqueCor={kpis.deltaTotal >= 0 ? '#15803D' : '#DC2626'}
                        destaque2={fmtPct(kpis.deltaTotal, kpis.inicio)} />
                    <KpiCard titulo="Captação líquida" valor={fmtDelta(kpis.entradas - kpis.saidas)}
                        valorCor={(kpis.entradas - kpis.saidas) >= 0 ? '#15803D' : '#DC2626'}
                        sub={`entradas − saídas`} />
                    <KpiCard titulo="Entradas" valor={fmtCompacto(kpis.entradas)} valorCor="#15803D"
                        sub={`${kpis.nEnt} ativo(s)`} extra={kpis.maiorEnt ? `maior: ${kpis.maiorEnt.nome}` : undefined} />
                    <KpiCard titulo="Saídas" valor={fmtCompacto(kpis.saidas)} valorCor="#DC2626"
                        sub={`${kpis.nSai} ativo(s)`} extra={kpis.maiorSai ? `maior: ${kpis.maiorSai.nome}` : undefined} />
                    <KpiCard titulo="Variação (mantidos)" valor={fmtDelta(kpis.variacao)}
                        valorCor={kpis.variacao >= 0 ? '#15803D' : '#DC2626'} sub="≈ rendimento / marcação" />
                </div>
            )}

            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {chip('Tudo', 'TODOS')}{chip('Entradas', 'entrada')}{chip('Saídas', 'saida')}{chip('Variações', 'variacao')}
                    <div style={{ position: 'relative', marginLeft: 6 }}>
                        <Search size={13} style={{ position: 'absolute', left: 8, top: 8, color: '#9CA3AF' }} />
                        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar ativo…"
                            style={{ padding: '6px 10px 6px 28px', border: '1px solid var(--color-borda)', borderRadius: 6, fontSize: 12, width: 160 }} />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {colsOcultas.size > 0 && (
                        <Button variant="ghost" onClick={() => setColsOcultas(new Set())}>Expandir todas ({colsOcultas.size})</Button>
                    )}
                    <Button variant={soMudancas ? 'solid' : 'outline'} onClick={() => setSoMudancas(s => !s)}>
                        <Filter size={14} style={{ marginRight: 6 }} /> {soMudancas ? 'Só mudanças' : 'Tudo'}
                    </Button>
                    <Select value={escopo} onChange={setEscopo} options={opcoesConta} />
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><Spinner size="lg" /></div>
            ) : datas.length <= 1 ? (
                <Card style={{ padding: '60px', textAlign: 'center', color: '#6B7280' }}>
                    <Typography variant="p">Não há histórico diário suficiente para comparar.</Typography>
                    <Typography variant="p" style={{ fontSize: '12px', marginTop: 8, opacity: 0.7 }}>
                        Esta análise usa o fechamento do mês anterior + os snapshots diários do mês (que existem antes da poda).
                    </Typography>
                </Card>
            ) : (
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 360px)' }}>
                        <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: '100%', fontSize: '12px' }}>
                            <thead>
                                <tr>
                                    <th style={{ ...thSticky, left: 0, zIndex: 3, width: 240, minWidth: 240, textAlign: 'left' }}>Ativo</th>
                                    <th style={{ ...thSticky, left: 240, zIndex: 3, width: 130, minWidth: 130, textAlign: 'left' }}>Δ no mês</th>
                                    {datas.map(d => {
                                        if (colsOcultas.has(d)) {
                                            return (
                                                <th key={d} style={{ ...thSticky, ...slimHeaderStyle }} onClick={() => expandir(d)} title={`Reabrir ${fmtDiaMes(d)}`}>
                                                    <span style={{ fontSize: 9, color: '#9CA3AF' }}>{d.split('-')[2]}</span>
                                                </th>
                                            );
                                        }
                                        const ehBase = d === baselineDate;
                                        const ehUlt = d === datas[datas.length - 1];
                                        return (
                                            <th key={d} style={{ ...thSticky, zIndex: 2, textAlign: 'right', minWidth: 92, color: ehBase ? '#7C3AED' : ehUlt ? 'var(--color-primaria)' : '#6B7280' }}>
                                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                                                    {ehBase ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Lock size={9} /> {baseLabel}</span> : `${fmtDiaMes(d)}${ehUlt ? ' •' : ''}`}
                                                    <ChevronsRightLeft size={11} style={{ cursor: 'pointer', opacity: 0.4 }} onClick={() => recolher(d)} />
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {caixaPorData.size > 0 && (
                                    <tr style={{ background: '#FFFBEB' }}>
                                        <td style={{ ...tdSticky, left: 0, fontWeight: 700, background: '#FFFBEB' }}>Caixa / saldo</td>
                                        <td style={{ ...tdSticky, left: 240, background: '#FFFBEB' }}>{renderDeltaResumo(deltaSerie(caixaPorData, datas))}</td>
                                        {datas.map(d => tdColored(caixaPorData, d))}
                                    </tr>
                                )}
                                <tr style={{ background: '#F8FAFC' }}>
                                    <td style={{ ...tdSticky, left: 0, fontWeight: 800, background: '#F8FAFC' }}>Patrimônio total</td>
                                    <td style={{ ...tdSticky, left: 240, background: '#F8FAFC' }}>{renderDeltaResumo(deltaSerie(totaisPorData, datas))}</td>
                                    {datas.map(d => tdPlain(totaisPorData.get(d) ?? null, d, true, 'transparent'))}
                                </tr>

                                {grupos.map(g => {
                                    const recolhido = classesRecolhidas.has(g.classe);
                                    return (
                                        <Fragment key={g.classe}>
                                            <tr style={{ background: '#EEF2FF', cursor: 'pointer' }}
                                                onClick={() => setClassesRecolhidas(s => { const n = new Set(s); n.has(g.classe) ? n.delete(g.classe) : n.add(g.classe); return n; })}>
                                                <td style={{ ...tdSticky, left: 0, fontWeight: 700, background: '#EEF2FF' }}>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                                        {recolhido ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
                                                        {g.classe} <span style={{ color: '#6B7280', fontWeight: 500 }}>({g.rows.length})</span>
                                                    </span>
                                                </td>
                                                <td style={{ ...tdSticky, left: 240, background: '#EEF2FF' }}>{renderDeltaResumo(g.delta)}</td>
                                                {datas.map(d => tdPlain(g.valores.get(d) ?? null, d, false, '#EEF2FF'))}
                                            </tr>
                                            {!recolhido && g.rows.map(l => (
                                                <tr key={l.key} style={{ borderTop: '1px solid #F1F5F9' }}>
                                                    <td style={{ ...tdSticky, left: 0 }}>
                                                        <div style={{ fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 216, paddingLeft: 16 }}>{l.nome}</div>
                                                    </td>
                                                    <td style={{ ...tdSticky, left: 240 }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                            {badgeTipo(l.tipo)}
                                                            {l.tipo !== 'estatico' && (
                                                                <span style={{ fontSize: '11px', fontWeight: 700, color: l.delta >= 0 ? '#15803D' : '#DC2626' }}>
                                                                    {fmtDelta(l.delta)} {l.tipo === 'variacao' && l.primeiro ? <span style={{ opacity: 0.7 }}>({fmtPct(l.delta, l.primeiro)})</span> : null}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    {datas.map(d => tdColored(l.valores, d))}
                                                </tr>
                                            ))}
                                        </Fragment>
                                    );
                                })}
                                {grupos.length === 0 && (
                                    <tr><td colSpan={nDateCols} style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF' }}>Nenhum ativo com os filtros atuais.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {!loading && datas.length > 1 && (
                <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#6B7280', flexWrap: 'wrap' }}>
                    {baselineDate && <span><Lock size={10} style={{ verticalAlign: 'middle' }} /> referência = fechamento do mês anterior</span>}
                    <span><span style={legBox('#DCFCE7')} /> entrou / subiu</span>
                    <span><span style={legBox('#FEF2F2')} /> saiu</span>
                    <span>• coluna marcada = posição mais recente (hoje)</span>
                    <span>clique no ⟨⟩ do cabeçalho para retrair uma coluna; clique na faixa fina para reabrir</span>
                </div>
            )}
        </div>
    );
}

// ── Subcomponentes / helpers de render ────────────────────────────────────────
function KpiCard({ titulo, valor, valorCor, sub, extra, destaque, destaqueCor, destaque2 }:
    { titulo: string; valor: string; valorCor?: string; sub?: string; extra?: string; destaque?: string; destaqueCor?: string; destaque2?: string }) {
    return (
        <Card style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="p" style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{titulo}</Typography>
            <Typography variant="p" style={{ fontSize: 18, fontWeight: 800, color: valorCor ?? '#111827' }}>{valor}</Typography>
            {destaque && <span style={{ fontSize: 12, fontWeight: 700, color: destaqueCor }}>{destaque} {destaque2 ? <span style={{ opacity: 0.7 }}>({destaque2})</span> : null}</span>}
            {sub && <span style={{ fontSize: 11, color: '#6B7280' }}>{sub}</span>}
            {extra && <span style={{ fontSize: 10, color: '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{extra}</span>}
        </Card>
    );
}

function deltaSerie(serie: Map<string, number>, datas: string[]): number {
    if (datas.length < 2) return 0;
    return (serie.get(datas[datas.length - 1]) ?? 0) - (serie.get(datas[0]) ?? 0);
}
function renderDeltaResumo(delta: number) {
    if (Math.abs(delta) < 0.005) return <span style={{ fontSize: '11px', color: '#9CA3AF' }}>—</span>;
    return <span style={{ fontSize: '11px', fontWeight: 700, color: delta >= 0 ? '#15803D' : '#DC2626' }}>{fmtDelta(delta)}</span>;
}

// ── Estilos ───────────────────────────────────────────────────────────────────
const thSticky: React.CSSProperties = { position: 'sticky', top: 0, background: '#F8FAFC', padding: '10px 12px', fontSize: '11px', fontWeight: 700, color: '#6B7280', borderBottom: '1px solid var(--color-borda)' };
const tdSticky: React.CSSProperties = { position: 'sticky', background: '#fff', padding: '8px 12px', verticalAlign: 'top', borderRight: '1px solid #F1F5F9' };
const tdCell = (bg: string): React.CSSProperties => ({ padding: '8px 12px', textAlign: 'right', background: bg, whiteSpace: 'nowrap' });
const slimHeaderStyle: React.CSSProperties = { width: 18, minWidth: 18, padding: '10px 0', textAlign: 'center', cursor: 'pointer', background: '#EEF1F5', borderLeft: '1px solid var(--color-borda)' };
const slimCellStyle: React.CSSProperties = { width: 18, minWidth: 18, padding: 0, cursor: 'pointer', background: '#F3F4F6', borderLeft: '1px solid #E5E7EB' };
const pill: React.CSSProperties = { fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: 3, width: 'fit-content' };
const legBox = (c: string): React.CSSProperties => ({ display: 'inline-block', width: 10, height: 10, background: c, borderRadius: 2, marginRight: 4, verticalAlign: 'middle' });
const chipStyle: React.CSSProperties = { padding: '5px 10px', fontSize: 12, border: '1px solid var(--color-borda)', borderRadius: 16, background: '#fff', color: '#6B7280', cursor: 'pointer' };
const chipAtivo: React.CSSProperties = { background: 'var(--color-primaria)', color: '#fff', borderColor: 'var(--color-primaria)', fontWeight: 700 };
