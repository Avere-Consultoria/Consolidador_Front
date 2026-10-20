import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabelaConsulta, Segmentado, type ColunaTabela } from 'avere-ui';
import { CalendarCheck2 } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { EstadoVazio } from '../../components/shared/EstadoVazio';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';

// Aba Vencimentos de Clientes (/clientes/vencimentos) — era a seção principal da página Alertas
// (saiu em 20/10/2026). Mostra o escopo inteiro: master = todos ou o consultor do topo;
// consultor = os dele. Os vencimentos de UM cliente ficam na Posição dele.

interface Vencimento {
    cliente_id: string;
    cliente_nome: string;
    codigo_avere: string | null;
    instituicao: string;
    nome: string;
    sub_tipo: string | null;
    classe: string | null;
    data_vencimento: string;
    valor: number;
}

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const mesLabel = (ym: string) => { const [a, m] = ym.split('-'); return `${MESES[Number(m) - 1]}/${a}`; };

type Horizonte = '3' | '6' | '12' | 'todos';
const HORIZONTES: { value: Horizonte; rotulo: string; mostrarRotulo: true }[] = [
    { value: '3', rotulo: '3 meses', mostrarRotulo: true },
    { value: '6', rotulo: '6 meses', mostrarRotulo: true },
    { value: '12', rotulo: '12 meses', mostrarRotulo: true },
    { value: 'todos', rotulo: 'Todos', mostrarRotulo: true },
];
// A chave ainda diz "alertas" de propósito: assim o horizonte que cada um já escolheu continua valendo.
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

export default function Vencimentos() {
    const navigate = useNavigate();
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';
    const { consultorSelecionado, consultorPerfilId, setSelectedClient } = useClient();

    const [vencs, setVencs] = useState<LinhaVenc[]>([]);
    const [carregando, setCarregando] = useState(true);

    const pConsultor = isMaster && consultorSelecionado && consultorSelecionado !== 'todos' && consultorSelecionado !== 'meus'
        ? consultorSelecionado
        : null;

    // Horizonte (meses), lembrado por usuário neste navegador.
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

    // Horizonte vai para o banco, que devolve já recortado (e com o código de cada cliente).
    useEffect(() => {
        let vivo = true;
        (async () => {
            setCarregando(true);
            const { data, error } = await supabase.rpc('vencimentos_consultor', {
                p_consultor_id: pConsultor,
                p_meses: meses === 'todos' ? 0 : Number(meses),
            });
            if (!vivo) return;
            if (error) console.error('Vencimentos: falha ao carregar', error);
            // Sem a data 9999-12-31 (o "sem data" das corretoras); chave por posição (o mesmo papel repete entre contas).
            setVencs(((data as Vencimento[]) || [])
                .filter(x => x.data_vencimento && !x.data_vencimento.startsWith('9999'))
                .map((x, i) => ({ ...x, _k: `${i}|${x.cliente_id}|${x.data_vencimento}` })));
            setCarregando(false);
        })();
        return () => { vivo = false; };
    }, [pConsultor, meses]);

    const abrirCliente = (x: Vencimento) => {
        setSelectedClient({
            id: x.cliente_id,
            codigoAvere: x.codigo_avere ?? '',
            nome: x.cliente_nome,
            consultorId: isMaster ? consultorPerfilId : (perfil?.id ?? null),
        });
        navigate(`/cliente/${x.cliente_id}/posicao`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <TabelaConsulta
                subtitulo={carregando ? 'Carregando…' : `${vencs.length.toLocaleString('pt-BR')} ativos ${meses === 'todos' ? 'a vencer' : `nos próximos ${meses} meses`}`}
                acoes={<Segmentado<Horizonte> opcoes={HORIZONTES} valor={meses} onChange={mudarHorizonte} altura={36} />}
                dados={vencs}
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
                aoClicarLinha={abrirCliente}
                rotuloTotal="Total no horizonte"
                vazio={<EstadoVazio compacto icon={CalendarCheck2} titulo="Nenhum vencimento no radar" dica="Não há títulos vencendo no horizonte escolhido." />}
            />
        </div>
    );
}
