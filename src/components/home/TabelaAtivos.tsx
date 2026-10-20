import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TabelaConsulta, CampoBusca, type ColunaTabela } from 'avere-ui';
import { List, SearchX } from 'lucide-react';
import { fmtDate, padronizarTaxaExibicao } from '../../utils/formatters';
import { rotuloAtivo } from '../../utils/rotuloAtivo';
import { CORES } from '../../utils/colors';
import { EstadoVazio } from '../shared/EstadoVazio';
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

const COR_BASE: Record<string, string> = { BTG: CORES.btg, XP: CORES.xp, AVENUE: CORES.avenue, AGORA: CORES.agora };
const corInstituicao = (a: ConsolidatedAtivo) => COR_BASE[(a.instituicaoBase ?? '').toUpperCase()] ?? CORES.outros;
const siglaInstituicao = (inst: string) => inst.replace(/^BTG Pactual\b/, 'BTG').replace(/^XP Investimentos\b/, 'XP');
const semAcento = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// Larguras em proporção (somam 97%; o resto é a seta ›). A 1ª coluna leva o recuo de 37px sob o
// nome do grupo, então Tipo precisa caber recuo + selo (o maior hoje: "COMPROMISSADA").
const COLUNAS: ColunaTabela<ConsolidatedAtivo>[] = [
    { id: 'tipo', titulo: 'Tipo', tipo: 'selo', largura: '11%', filtro: 'lista', valor: a => a.subTipo },
    {
        id: 'ativo', titulo: 'Ativo', tipo: 'texto', destaque: true, largura: '32%', valor: a => rotuloAtivo(a),
        // Emissor = entidade vinculada no canônico (risco/FGC). Sem vínculo, nada — nunca texto cru rotulado de emissor.
        secundario: a => a.emissorNome,
        depois: a => (
            // data-linha: marca da TELA para o link dos e-mails achar a linha (rolar + destacar).
            <span data-linha={a.rowId}>
                {a.naoVerificado && (
                    <span
                        title="Entrada manual sem identificador único — não vinculada à biblioteca (dado não verificado)"
                        style={{ fontSize: 'var(--text-2xs)', fontWeight: 600, color: 'var(--color-warning-text)', background: 'var(--color-warning-bg)', padding: '1px 6px', borderRadius: 'var(--radius-sm)', whiteSpace: 'nowrap' }}
                    >manual · não verif.</span>
                )}
            </span>
        ),
    },
    {
        id: 'taxa', titulo: 'Taxa', tipo: 'texto', apagado: true, largura: '13%',
        valor: a => { const t = padronizarTaxaExibicao(a.taxa || a.benchmark); return t && t !== '-' ? t : null; },
    },
    {
        id: 'inst', titulo: 'Instituição', tipo: 'cadastro', largura: '12%', filtro: 'lista',
        valor: a => siglaInstituicao(a.instituicao), cor: corInstituicao,
    },
    {
        id: 'venc', titulo: 'Venc. / Liquidez', tipo: 'data', largura: '14%',
        dica: 'Data de vencimento; sem ela, o prazo de resgate (D+N).',
        valor: a => a.vencimento || null,
        celula: a => {
            if (a.vencimento) return fmtDate(a.vencimento);
            if (a.liquidez !== null && a.liquidez !== undefined && a.liquidez !== '') return `D+${a.liquidez}`;
            return null;
        },
    },
    { id: 'valor', titulo: 'Valor bruto', tipo: 'moeda', largura: '15%', somar: true, valor: a => a.valorBruto ?? a.valorLiquido },
];

export function TabelaAtivos({ ativos, patrimonioTotal, onPersonalizado, onPersonalizadoTudo }: TabelaAtivosProps) {
    const [ativoSelecionado, setAtivoSelecionado] = useState<ConsolidatedAtivo | null>(null);
    const [drawerAberto, setDrawerAberto] = useState(false);
    const [personalizar, setPersonalizar] = useState<{ canonicoId?: string; rascunho?: RascunhoInfo } | null>(null);
    const [busca, setBusca] = useState('');

    // Busca geral: a tela filtra antes; os filtros de coluna (funil) se aplicam depois, em E.
    const dados = useMemo(() => {
        const q = semAcento(busca.trim());
        if (!q) return ativos;
        return ativos.filter(a => semAcento([rotuloAtivo(a), a.nome, a.nomeCru, a.emissorNome, a.subTipo, a.instituicao, a.tipo]
            .filter(Boolean).join(' ')).includes(q));
    }, [ativos, busca]);

    // Deep-link (?canon=<ativo_canonico_id> | ?ativo=<nome>, opcional &venc=YYYY-MM-DD) vindo das
    // Notificações/Alertas: abre o grupo do ativo, rola até a linha, destaca por 10 s e abre o drawer.
    // A TabelaConsulta guarda sozinha quais grupos estão abertos; a tela acha o grupo e a linha pelas
    // próprias marcas (data-grupo no rótulo, data-linha na célula do ativo) e "clica" no grupo.
    const [searchParams, setSearchParams] = useSearchParams();
    const focoCanon = searchParams.get('canon');
    const focoNome = searchParams.get('ativo');
    const focoVenc = searchParams.get('venc');
    const focoTratado = React.useRef<string | null>(null);
    useEffect(() => {
        if ((!focoCanon && !focoNome) || ativos.length === 0) return;
        // O mesmo alvo não pode ser tratado duas vezes (ativos muda de referência antes da URL limpar).
        const chave = `${focoCanon}|${focoNome}|${focoVenc}`;
        if (focoTratado.current === chave) return;
        focoTratado.current = chave;
        const norm = (s?: string | null) => (s ?? '').trim().toLowerCase();
        const bateVenc = (a: ConsolidatedAtivo) => !focoVenc || (a.vencimento ?? '').slice(0, 10) === focoVenc;
        const alvo = ativos.find(a => focoCanon && a.ativoCanonicoId === focoCanon && bateVenc(a))
            ?? ativos.find(a => focoNome && norm(a.nome) === norm(focoNome) && bateVenc(a))
            ?? ativos.find(a => focoCanon && a.ativoCanonicoId === focoCanon)
            ?? ativos.find(a => focoNome && norm(a.nome) === norm(focoNome));
        if (alvo) {
            const grupo = alvo.tipo || 'Outros';
            let tentativas = 0;
            const abrirDrawer = () => { setAtivoSelecionado(alvo); setDrawerAberto(true); };
            const rolar = () => {
                if (tentativas === 0) setBusca('');      // a busca não pode esconder o alvo
                const linhaGrupo = document.querySelector(`[data-grupo="${CSS.escape(grupo)}"]`)?.closest('tr');
                if (linhaGrupo?.getAttribute('aria-expanded') === 'false') (linhaGrupo as HTMLElement).click();
                const linha = document.querySelector(`[data-linha="${CSS.escape(alvo.rowId)}"]`)?.closest('tr');
                if (!linha) {
                    // Sem achar a linha (ex.: filtro de coluna ativo), ainda abre o detalhe.
                    if (++tentativas < 60) requestAnimationFrame(rolar); else abrirDrawer();
                    return;
                }
                linha.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const celulas = Array.from(linha.cells);
                celulas.forEach(td => { td.style.transition = 'background 0.4s ease'; td.style.background = 'var(--color-accent-subtle)'; });
                // Volta ao estilo da tabela (sem inline) — nunca "restaurar" um fundo capturado.
                window.setTimeout(() => {
                    celulas.forEach(td => { td.style.background = ''; });
                    window.setTimeout(() => celulas.forEach(td => { td.style.transition = ''; }), 500);
                }, 10000);
                window.setTimeout(abrirDrawer, 400);
            };
            requestAnimationFrame(rolar);
        }
        searchParams.delete('canon'); searchParams.delete('ativo'); searchParams.delete('venc'); searchParams.delete('menu');
        setSearchParams(searchParams, { replace: true });
    }, [focoCanon, focoNome, focoVenc, ativos, searchParams, setSearchParams]);

    if (ativos.length === 0) return null;

    return (
        <section>
            {/* Colunas curtas (3 Taxa, 4 Instituição, 5 Venc./Liquidez): título E itens no centro, alinhados.
                Tipo/Ativo ficam à esquerda e Valor à direita (padrão da lib). Seletor dobrado para vencer
                o alinhamento à direita que a lib dá à coluna de data. Se a ordem das colunas mudar, rever. */}
            <style>{`.tabela-carteira.tabela-carteira table :is(th, td):is(:nth-child(3), :nth-child(4), :nth-child(5)) { text-align: center; }`}</style>
            <TabelaConsulta
                className="tabela-carteira"
                titulo="Detalhamento da Carteira"
                subtitulo={`${ativos.length.toLocaleString('pt-BR')} ${ativos.length === 1 ? 'ativo' : 'ativos'} · por classe de ativo`}
                icone={List}
                acoes={<div style={{ width: 'min(320px, 100%)' }}><CampoBusca valor={busca} onChange={setBusca} placeholder="Buscar ativo, emissor ou tipo…" /></div>}
                dados={dados}
                colunas={COLUNAS}
                chave={a => a.rowId}
                agrupar={{
                    por: a => a.tipo || 'Outros',
                    // data-grupo: marca da TELA (não da lib) para o link dos e-mails achar o grupo.
                    rotulo: k => <span data-grupo={k}>{k.replace(/_/g, ' ')}</span>,
                    nomeItem: ['ativo', 'ativos'],
                    ordem: 'total',
                }}
                ordenarPor={{ coluna: 'valor', decrescente: true }}
                // Fica no fim da página do cliente: com altura limitada à tela sobravam ~2 grupos
                // visíveis. Aqui a tabela cresce com o conteúdo e quem rola é a página.
                alturaFixa={false}
                aoClicarLinha={a => { setAtivoSelecionado(a); setDrawerAberto(true); }}
                rotuloTotal="Total da carteira"
                vazio={<EstadoVazio compacto icon={SearchX} titulo="Nenhum ativo encontrado" dica="Ajuste a busca ou os filtros das colunas." />}
            />

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