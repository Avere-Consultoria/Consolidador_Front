import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Spinner, CabecalhoPagina, TabelaConsulta, Segmentado, type ColunaTabela } from 'avere-ui';
import { CalendarClock, ShieldAlert, Landmark, Bell } from 'lucide-react';
import { supabase } from '../services/supabase';
import { EstadoVazio } from '../components/shared/EstadoVazio';
import { CalendarCheck2, ShieldCheck, PieChart as PieIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';
import { fmt, fmtDate } from '../utils/formatters';

interface Vencimento {
    cliente_id: string;
    cliente_nome: string;
    instituicao: string;
    nome: string;
    sub_tipo: string | null;
    classe: string | null;
    data_vencimento: string;
    valor: number;
}
interface FgcAlerta {
    cliente_id: string;
    cliente_nome: string;
    conglomerado: string;
    sub_tipos: string[];
    num_ativos: number;
    exposicao: number;
    vencimento_proximo: string | null;
    pct_limite: number;
    folga: number;
    nivel: 'Estourado' | 'Alerta' | 'Atenção';
}
interface CreditoAlerta {
    cliente_id: string;
    cliente_nome: string;
    emissor: string;
    exposicao: number;
    num_ativos: number;
    sub_tipos: string[];
    venc_proximo: string | null;
    pl_cliente: number;
    pct_pl: number;
    nivel: 'Crítico' | 'Alto' | 'Médio';
}

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const mesLabel = (ym: string) => { const [a, m] = ym.split('-'); return `${MESES[Number(m) - 1]}/${a}`; };

type Horizonte = '3' | '6' | '12' | '24';
const HORIZONTES: { value: Horizonte; rotulo: string; mostrarRotulo: true }[] = [
    { value: '3', rotulo: '3 meses', mostrarRotulo: true },
    { value: '6', rotulo: '6 meses', mostrarRotulo: true },
    { value: '12', rotulo: '12 meses', mostrarRotulo: true },
    { value: '24', rotulo: '24 meses', mostrarRotulo: true },
];
function lerHorizonte(chave: string): Horizonte {
    try {
        const v = localStorage.getItem(chave);
        return HORIZONTES.some(h => h.value === v) ? (v as Horizonte) : '12';
    } catch { return '12'; }
}

type LinhaVenc = Vencimento & { _k: string };
const COLUNAS_VENC: ColunaTabela<LinhaVenc>[] = [
    { id: 'cliente', titulo: 'Cliente', tipo: 'texto', destaque: true, largura: '22%', valor: x => x.cliente_nome },
    { id: 'tipo', titulo: 'Tipo', tipo: 'selo', valor: x => x.sub_tipo },
    { id: 'ativo', titulo: 'Ativo', tipo: 'texto', valor: x => x.nome },
    { id: 'inst', titulo: 'Inst.', tipo: 'texto', apagado: true, largura: 80, valor: x => x.instituicao },
    { id: 'venc', titulo: 'Venc.', tipo: 'data', valor: x => x.data_vencimento },
    // Larga o bastante para o total do mês e o do horizonte (R$ 851 mi) caberem inteiros.
    { id: 'valor', titulo: 'Valor', tipo: 'moeda', somar: true, largura: 190, valor: x => x.valor },
];

const th: React.CSSProperties = { padding: '9px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', textAlign: 'left', whiteSpace: 'nowrap' };
const thNum: React.CSSProperties = { ...th, textAlign: 'right' };
const td: React.CSSProperties = { padding: '10px 12px', fontSize: 13, color: 'var(--color-text-primary)', borderTop: '1px solid var(--color-surface-sunken)' };
const tdNum: React.CSSProperties = { ...td, textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' };

export default function AlertasConsultor() {
    const navigate = useNavigate();
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';
    const { consultorSelecionado, consultorPerfilId, setSelectedClient, selectedClient } = useClient();

    const [loading, setLoading] = useState(true);
    const [vencs, setVencs] = useState<Vencimento[]>([]);
    const [fgc, setFgc] = useState<FgcAlerta[]>([]);
    const [credito, setCredito] = useState<CreditoAlerta[]>([]);
    const [clientesMap, setClientesMap] = useState<Map<string, string>>(new Map());

    const pConsultor = isMaster && consultorSelecionado && consultorSelecionado !== 'todos' && consultorSelecionado !== 'meus'
        ? consultorSelecionado
        : null;

    // Horizonte dos vencimentos (meses), lembrado por usuário neste navegador.
    const chaveHorizonte = `alertas:horizonte:${perfil?.id ?? ''}`;
    const [meses, setMeses] = useState<Horizonte>(() => lerHorizonte(chaveHorizonte));
    const [horizonteDe, setHorizonteDe] = useState(chaveHorizonte);
    if (horizonteDe !== chaveHorizonte) {         // o perfil chegou depois do 1º render
        setHorizonteDe(chaveHorizonte);
        setMeses(lerHorizonte(chaveHorizonte));
    }
    const mudarHorizonte = (h: Horizonte) => {
        setMeses(h);
        try { localStorage.setItem(chaveHorizonte, h); } catch { /* sem storage: só não lembra */ }
    };
    const [carregandoVenc, setCarregandoVenc] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [fRes, cpRes, cRes] = await Promise.all([
                supabase.rpc('fgc_consultor', { p_consultor_id: pConsultor }),
                supabase.rpc('credito_privado_consultor', { p_consultor_id: pConsultor }),
                supabase.from('clientes').select('id, codigo_avere'),
            ]);
            setFgc((fRes.data as FgcAlerta[]) || []);
            setCredito((cpRes.data as CreditoAlerta[]) || []);
            setClientesMap(new Map((cRes.data || []).map((c: any) => [c.id, c.codigo_avere])));
            setLoading(false);
        })();
    }, [pConsultor]);

    // Vencimentos à parte: trocar o horizonte busca só eles, do banco, já recortados.
    useEffect(() => {
        let vivo = true;
        (async () => {
            setCarregandoVenc(true);
            const { data, error } = await supabase.rpc('vencimentos_consultor', { p_consultor_id: pConsultor, p_meses: Number(meses) });
            if (!vivo) return;
            if (error) console.error('Alertas: falha ao carregar vencimentos', error);
            setVencs((data as Vencimento[]) || []);
            setCarregandoVenc(false);
        })();
        return () => { vivo = false; };
    }, [pConsultor, meses]);

    const v = (valor: number) => fmt(valor);

    // Foco em 1 cliente via o seletor "Cliente Final" do topo (na página de Alertas
    // ele filtra em vez de navegar). Sem cliente = todos do escopo (consultor/casa).
    const alvo = selectedClient?.id ?? null;
    const vencsF = useMemo(() => (alvo ? vencs.filter(x => x.cliente_id === alvo) : vencs), [vencs, alvo]);
    const fgcF = useMemo(() => (alvo ? fgc.filter(x => x.cliente_id === alvo) : fgc), [fgc, alvo]);
    const creditoF = useMemo(() => (alvo ? credito.filter(x => x.cliente_id === alvo) : credito), [credito, alvo]);

    // Linhas da tabela: chave estável por posição (o mesmo papel pode repetir entre contas) e sem a
    // data 9999-12-31, que é o "sem data" das corretoras — não é vencimento.
    const vencsTabela = useMemo(
        () => vencsF.filter(x => x.data_vencimento && !x.data_vencimento.startsWith('9999'))
            .map((x, i) => ({ ...x, _k: `${i}|${x.cliente_id}|${x.data_vencimento}` })),
        [vencsF],
    );

    const abrirCliente = (clienteId: string, nome: string) => {
        setSelectedClient({
            id: clienteId,
            codigoAvere: clientesMap.get(clienteId) || '',
            nome,
            consultorId: isMaster ? consultorPerfilId : (perfil?.id ?? null),
        });
        navigate(`/cliente/${clienteId}/posicao`);
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <CabecalhoPagina
                titulo="Alertas"
                icone={Bell}
                descricao={selectedClient ? `Foco no cliente: ${selectedClient.nome}` : 'Vencimentos e riscos consolidados da sua carteira.'}
            />

            {/* ── Seção: Vencimentos — TabelaConsulta agrupada por mês (modelo B da avere-ui) ── */}
            <TabelaConsulta
                titulo="Vencimentos próximos"
                subtitulo={carregandoVenc ? 'Carregando…' : `${vencsTabela.length.toLocaleString('pt-BR')} ativos nos próximos ${meses} meses`}
                icone={CalendarClock}
                acoes={<Segmentado<Horizonte> opcoes={HORIZONTES} valor={meses} onChange={mudarHorizonte} altura={36} />}
                dados={vencsTabela}
                colunas={COLUNAS_VENC}
                chave={x => x._k}
                agrupar={{
                    por: x => x.data_vencimento.slice(0, 7),
                    rotulo: ym => mesLabel(ym),
                    resumo: itens => {
                        const n = new Set(itens.map(i => i.cliente_id)).size;
                        return `${n} cliente${n === 1 ? '' : 's'} · ${itens.length} ativo${itens.length === 1 ? '' : 's'}`;
                    },
                    ordem: 'chave',
                }}
                aoClicarLinha={x => abrirCliente(x.cliente_id, x.cliente_nome)}
                rotuloTotal="Total no horizonte"
                vazio={<EstadoVazio compacto icon={CalendarCheck2} titulo="Nenhum vencimento no radar" dica="Não há títulos vencendo no horizonte monitorado." />}
            />

            {/* ── Seção: Limite FGC ── */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <ShieldAlert size={20} color="var(--color-warning-text)" />
                    <Typography variant="p" style={{ fontWeight: 700, fontSize: 16 }}>Limite FGC</Typography>
                    <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{fgcF.length} alerta{fgcF.length === 1 ? '' : 's'} · exposições ≥70% do teto R$250k por conglomerado</span>
                </div>

                {fgcF.length === 0 ? (
                    <Card style={{ padding: 0 }}><EstadoVazio compacto positivo icon={ShieldCheck} titulo="Cobertura FGC em dia" dica="Nenhuma exposição acima de 70% do limite por conglomerado." /></Card>
                ) : (
                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
                                <thead>
                                    <tr style={{ background: 'var(--gray-50)' }}>
                                        <th style={th}>Cliente</th>
                                        <th style={th}>Conglomerado</th>
                                        <th style={th}>Ativos</th>
                                        <th style={thNum}>Exposição</th>
                                        <th style={thNum}>Venc.</th>
                                        <th style={th}>% Limite</th>
                                        <th style={th}>Nível</th>
                                        <th style={thNum}>Folga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fgcF.map((f, i) => {
                                        const pct = Math.min(f.pct_limite, 1) * 100;
                                        const critico = f.pct_limite >= 0.9;
                                        return (
                                            <tr key={i} onClick={() => abrirCliente(f.cliente_id, f.cliente_nome)} style={{ cursor: 'pointer' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-accent-subtle)')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                                <td style={{ ...td, fontWeight: 600 }}>{f.cliente_nome}</td>
                                                <td style={td}>{f.conglomerado}</td>
                                                <td style={{ ...td, fontSize: 12, color: 'var(--color-text-secondary)' }}>{(f.sub_tipos || []).join(', ')} · {f.num_ativos}</td>
                                                <td style={{ ...tdNum, fontWeight: 700 }}>{v(f.exposicao)}</td>
                                                <td style={tdNum}>{f.vencimento_proximo ? fmtDate(f.vencimento_proximo) : '—'}</td>
                                                <td style={td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <div style={{ width: 70, height: 6, background: 'var(--color-surface-sunken)', borderRadius: 3, overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', width: `${pct}%`, background: critico ? 'var(--color-danger-solid)' : 'var(--color-warning-solid)', borderRadius: 3 }} />
                                                        </div>
                                                        <span style={{ fontSize: 12, fontWeight: 600, color: critico ? 'var(--color-danger-solid)' : 'var(--color-warning-text)' }}>{(f.pct_limite * 100).toFixed(0)}%</span>
                                                    </div>
                                                </td>
                                                <td style={td}>
                                                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, ...(critico ? { background: 'var(--color-danger-bg)', color: 'var(--color-danger-text)' } : { background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }) }}>{f.nivel}</span>
                                                </td>
                                                <td style={{ ...tdNum, color: f.folga < 0 ? 'var(--color-danger-solid)' : 'var(--color-success-text)', fontWeight: 600 }}>{v(f.folga)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </section>

            {/* ── Seção: Crédito Privado ── */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <Landmark size={20} color="var(--color-secundaria)" />
                    <Typography variant="p" style={{ fontWeight: 700, fontSize: 16 }}>Crédito privado</Typography>
                    <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>concentração por emissor (% do PL do cliente)</span>
                    {creditoF.length > 0 && (
                        <div style={{ display: 'flex', gap: 6 }}>
                            {(['Crítico', 'Alto', 'Médio'] as const).map(n => {
                                const q = creditoF.filter(c => c.nivel === n).length;
                                if (!q) return null;
                                const cor = n === 'Crítico' ? 'var(--color-danger-solid)' : n === 'Alto' ? 'var(--color-warning-text)' : 'var(--color-warning-text)';
                                return <span key={n} style={{ fontSize: 11, fontWeight: 700, color: cor, background: `${cor}18`, padding: '2px 8px', borderRadius: 6 }}>{q} {n.toLowerCase()}{q > 1 ? 's' : ''}</span>;
                            })}
                        </div>
                    )}
                </div>

                {creditoF.length === 0 ? (
                    <Card style={{ padding: 0 }}><EstadoVazio compacto positivo icon={PieIcon} titulo="Concentrações sob controle" dica="Nenhum emissor de crédito privado acima de 5% do PL." /></Card>
                ) : (
                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
                                <thead>
                                    <tr style={{ background: 'var(--gray-50)' }}>
                                        <th style={th}>Cliente</th>
                                        <th style={th}>Emissor</th>
                                        <th style={th}>Ativos</th>
                                        <th style={thNum}>Exposição</th>
                                        <th style={th}>% do PL</th>
                                        <th style={th}>Nível</th>
                                        <th style={thNum}>Venc.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creditoF.map((c, i) => {
                                        const cor = c.nivel === 'Crítico' ? 'var(--color-danger-solid)' : c.nivel === 'Alto' ? 'var(--color-warning-text)' : 'var(--color-warning-text)';
                                        const pctBar = Math.min(c.pct_pl, 0.5) / 0.5 * 100;
                                        return (
                                            <tr key={i} onClick={() => abrirCliente(c.cliente_id, c.cliente_nome)} style={{ cursor: 'pointer' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-accent-subtle)')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                                <td style={{ ...td, fontWeight: 600 }}>{c.cliente_nome}</td>
                                                <td style={td}>{c.emissor}</td>
                                                <td style={{ ...td, fontSize: 12, color: 'var(--color-text-secondary)' }}>{(c.sub_tipos || []).join(', ')} · {c.num_ativos}</td>
                                                <td style={{ ...tdNum, fontWeight: 700 }}>{v(c.exposicao)}</td>
                                                <td style={td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <div style={{ width: 60, height: 6, background: 'var(--color-surface-sunken)', borderRadius: 3, overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', width: `${pctBar}%`, background: cor, borderRadius: 3 }} />
                                                        </div>
                                                        <span style={{ fontSize: 12, fontWeight: 700, color: cor }}>{(c.pct_pl * 100).toFixed(1)}%</span>
                                                    </div>
                                                </td>
                                                <td style={td}><span style={{ fontSize: 11, fontWeight: 700, color: cor, background: `${cor}18`, padding: '2px 8px', borderRadius: 6 }}>{c.nivel}</span></td>
                                                <td style={tdNum}>{c.venc_proximo ? fmtDate(c.venc_proximo) : '—'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </section>
        </div>
    );
}
