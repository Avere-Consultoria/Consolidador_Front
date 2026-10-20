import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, CampoBusca, TabelaConsulta, aplicarFiltros, type ColunaTabela, type FiltrosTabela, type Ordenacao, CabecalhoPagina } from 'avere-ui';
import { Users } from 'lucide-react';
import { supabase } from '../services/supabase';
import { EstadoVazio } from '../components/shared/EstadoVazio';
import DocumentosManuais from './DocumentosManuais';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';
import { CORES } from '../utils/colors';

interface ClienteRow {
    cliente_id: string;
    nome: string;
    codigo_avere: string;
    pl_total: number;
    pl_btg: number;
    pl_xp: number;
    pl_avenue: number;
    pl_agora: number;
    pl_manual: number;
    contas_xp?: number;
    contas_btg?: number;
    contas_avenue?: number;
    contas_agora?: number;
    contas_manual?: number;
}

type ChavePl = 'pl_xp' | 'pl_btg' | 'pl_avenue' | 'pl_agora' | 'pl_manual';
type ChaveContas = 'contas_xp' | 'contas_btg' | 'contas_avenue' | 'contas_agora' | 'contas_manual';

// Plataformas exibidas (na ordem e cor da identidade Avere).
const PLATAFORMAS: { key: ChavePl; contasKey: ChaveContas; label: string; cor: string }[] = [
    { key: 'pl_xp', contasKey: 'contas_xp', label: 'XP', cor: CORES.xp },
    { key: 'pl_btg', contasKey: 'contas_btg', label: 'BTG', cor: CORES.btg },
    { key: 'pl_avenue', contasKey: 'contas_avenue', label: 'Avenue', cor: CORES.avenue },
    { key: 'pl_agora', contasKey: 'contas_agora', label: 'Ágora', cor: CORES.agora },
    { key: 'pl_manual', contasKey: 'contas_manual', label: 'Manual', cor: CORES.outros },
];

// Filtros e ordenação da Base de clientes ficam lembrados POR USUÁRIO neste navegador.
// A chave ainda diz "dashboard" de propósito: a tabela veio de lá (20/10/2026) e assim as preferências já salvas continuam valendo.
const CHAVE_PREF = 'dashboard:base-clientes';
function lerPref<T>(usuario: string | undefined, sufixo: string, padrao: T): T {
    if (!usuario) return padrao;
    try {
        const bruto = localStorage.getItem(`${CHAVE_PREF}:${usuario}:${sufixo}`);
        return bruto ? (JSON.parse(bruto) as T) : padrao;
    } catch { return padrao; }
}
function gravarPref(usuario: string | undefined, sufixo: string, valor: unknown) {
    if (!usuario) return;
    try { localStorage.setItem(`${CHAVE_PREF}:${usuario}:${sufixo}`, JSON.stringify(valor)); } catch { /* sem storage: só não lembra */ }
}
const ORDEM_PADRAO: Ordenacao = { coluna: 'pl', decrescente: true };


// Página Clientes (/clientes): a Base de clientes do escopo (master: todos ou o consultor do topo; consultor: os dele).
// Substituiu o Dashboard em 20/10/2026. Clicar num cliente abre o detalhe dele (/cliente/<id>/posicao).
export default function Clientes() {
    const navigate = useNavigate();
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';
    const isConsultor = perfil?.role === 'CONSULTOR_INTERNO';
    const { consultorSelecionado, consultorPerfilId, setSelectedClient } = useClient();

    const [loading, setLoading] = useState(true);
    const [clientes, setClientes] = useState<ClienteRow[]>([]);
    const [busca, setBusca] = useState('');
    const [filtros, setFiltros] = useState<FiltrosTabela>(() => lerPref(perfil?.id, 'filtros', {}));
    const [ordenacao, setOrdenacao] = useState<Ordenacao | null>(() => lerPref(perfil?.id, 'ordem', ORDEM_PADRAO));
    const [coresInst, setCoresInst] = useState<Map<string, string>>(new Map());   // nome inst. (upper) → cor_primaria

    // O perfil pode chegar depois do primeiro render: ao mudar o usuário, carrega a preferência dele.
    const [prefDe, setPrefDe] = useState(perfil?.id);
    if (prefDe !== perfil?.id) {
        setPrefDe(perfil?.id);
        setFiltros(lerPref(perfil?.id, 'filtros', {}));
        setOrdenacao(lerPref(perfil?.id, 'ordem', ORDEM_PADRAO));
    }

    // Master foca 1 consultor pelo seletor da TopBar; consultor sempre null (a RLS corta).
    const pConsultor = isMaster && consultorSelecionado && consultorSelecionado !== 'todos' && consultorSelecionado !== 'meus'
        ? consultorSelecionado
        : null;

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [rpcRes, instRes] = await Promise.all([
                supabase.rpc('dashboard_consultor', { p_consultor_id: pConsultor }),
                supabase.from('instituicoes').select('nome, cor_primaria'),
            ]);
            const d = rpcRes.data as { clientes?: ClienteRow[] } | null;
            setClientes(d?.clientes ?? []);
            setCoresInst(new Map((instRes.data || []).map((i: { nome: string; cor_primaria: string }) => [String(i.nome).toUpperCase(), i.cor_primaria])));
            setLoading(false);
        })();
    }, [pConsultor]);

    // Busca geral: a tela filtra antes; os filtros de coluna (funil) se aplicam depois, em E.
    const dados = useMemo(() => {
        const q = busca.trim().toLowerCase();
        return q ? clientes.filter(c => `${c.codigo_avere ?? ''} ${c.nome}`.toLowerCase().includes(q)) : clientes;
    }, [clientes, busca]);

    // Coluna de instituição só aparece se algum cliente da lista tem posição nela (Manual, hoje, quase nunca).
    const plataformasComDado = useMemo(
        () => PLATAFORMAS.filter(p => p.key !== 'pl_manual' || clientes.some(c => (c.pl_manual ?? 0) > 0)),
        [clientes],
    );

    const colunas = useMemo<ColunaTabela<ClienteRow>[]>(() => {
        // Um selo por conta: cliente com duas contas no BTG mostra "BTG" "BTG".
        const contasDoCliente = (c: ClienteRow) => PLATAFORMAS.flatMap(p => {
            const n = (c[p.contasKey] ?? 0) || ((c[p.key] ?? 0) > 0 ? 1 : 0);
            return Array.from({ length: n }, () => p);
        });
        // Larguras pensadas para o maior valor real caber inteiro (R$ 416.935.189,35 no total do BTG).
        return [
            { id: 'codigo', titulo: 'Código', tipo: 'texto', apagado: true, largura: 110, valor: c => c.codigo_avere },
            { id: 'nome', titulo: 'Cliente', tipo: 'texto', destaque: true, valor: c => c.nome },
            {
                id: 'inst', titulo: 'Instituições', tipo: 'cadastro', largura: 170, semOrdenar: true,
                valor: c => contasDoCliente(c).map(p => p.label).join(' '),
                filtro: 'lista', valoresFiltro: c => [...new Set(contasDoCliente(c).map(p => p.label))],
                celula: c => {
                    const contas = contasDoCliente(c);
                    if (contas.length === 0) return null;
                    return (
                        <span style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' }}>
                            {contas.map((p, i) => {
                                const cor = coresInst.get(p.label.toUpperCase()) || p.cor;
                                return (
                                    <span key={i} style={{
                                        padding: '0 7px', borderRadius: 'var(--radius-full)', border: `1px solid ${cor}`,
                                        color: cor, fontSize: 'var(--text-2xs)', fontWeight: 600, whiteSpace: 'nowrap',
                                    }}>{p.label}</span>
                                );
                            })}
                        </span>
                    );
                },
            },
            ...plataformasComDado.map((p): ColunaTabela<ClienteRow> => ({
                id: p.key, titulo: p.label, tipo: 'moeda', largura: 175, filtro: 'faixa', somar: true,
                valor: c => ((c[p.key] ?? 0) > 0 ? c[p.key] : null),   // sem posição na instituição → "—"
            })),
            { id: 'pl', titulo: 'PL Total', tipo: 'moeda', largura: 185, filtro: 'faixa', somar: true, valor: c => c.pl_total },
        ];
    }, [coresInst, plataformasComDado]);

    // Quantos sobram depois da busca E dos filtros de coluna — mesma regra que a tabela aplica.
    const visiveis = useMemo(() => aplicarFiltros(dados, colunas, filtros).length, [dados, colunas, filtros]);

    const abrirCliente = (c: ClienteRow) => {
        setSelectedClient({
            id: c.cliente_id,
            codigoAvere: c.codigo_avere,
            nome: c.nome,
            consultorId: isMaster ? consultorPerfilId : (perfil?.id ?? null),
        });
        navigate(`/cliente/${c.cliente_id}/posicao`);
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size="lg" /></div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <CabecalhoPagina titulo="Clientes" icone={Users} />

            {/* ── Base de clientes — TabelaConsulta (avere-ui): busca na barra, funil por coluna, filtros lembrados ── */}
            <TabelaConsulta
                subtitulo={visiveis === clientes.length ? `${clientes.length} clientes` : `${visiveis} de ${clientes.length} clientes`}
                dados={dados}
                colunas={colunas}
                chave={c => c.cliente_id}
                acoes={<div style={{ width: 'min(340px, 100%)' }}><CampoBusca valor={busca} onChange={setBusca} placeholder="Buscar por nome ou número…" /></div>}
                filtros={filtros}
                onFiltrosChange={f => { setFiltros(f); gravarPref(perfil?.id, 'filtros', f); }}
                ordenacao={ordenacao}
                onOrdenacaoChange={o => { setOrdenacao(o); gravarPref(perfil?.id, 'ordem', o); }}
                aoClicarLinha={abrirCliente}
                rotuloTotal="Total da base"
                vazio={<EstadoVazio compacto icon={Users} titulo="Nenhum cliente encontrado" dica="Ajuste a busca, os filtros das colunas ou o consultor no topo." />}
            />

            {/* Meus Envios do consultor (envios manuais de PDF), como era a página própria — 20/10/2026.
                O master tem a versão de auditoria em Operação › Documentos Manuais. */}
            {isConsultor && <DocumentosManuais />}
        </div>
    );
}
