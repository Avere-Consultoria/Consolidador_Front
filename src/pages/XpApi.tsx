import { useState, useEffect } from 'react';
import {
  Wallet, RefreshCw, LayoutGrid, Calendar,
  Landmark, BarChart3, PieChart, TrendingUp,
  Shield, ChevronRight, Building2
} from 'lucide-react';
import {
  Card, CardContent, Typography, Badge,
  Button, Spinner, DataTable,
  Drawer, DrawerContent, DrawerHeader, DrawerBody,
  DrawerTitle, DrawerDescription, DrawerSeparator,
} from 'avere-ui';

import { useClient } from '../contexts/ClientContext';
import { supabase } from '../services/supabase';

// ─────────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────────

interface XpAtivo {
  // Identificação
  tipo: string;          // "Renda Fixa", "Fundos", "Ações", "Tesouro Direto", "Previdência", "COE"
  subTipo: string;       // "CDB", "LCI", "LCA", "CRA", "Debênture", "Ação", "FII"...
  nome: string;          // Nome do ativo/fundo
  emissor?: string;
  codigoAtivo?: string;
  cnpj?: string;
  // Financeiro
  valorAplicado: number;
  valorBruto: number;
  valorLiquido: number;
  valorImpostoRenda?: number;
  valorIof?: number;
  valorRendimento?: number;
  isIsentoIR?: boolean;
  resultado?: number;
  resultadoPercentual?: number;
  // Quantidade e preço
  quantidade?: number | null;
  precoUnitario?: number | null;
  precoMedio?: number | null;
  valorCota?: number | null;
  quantidadeCotas?: number | null;
  // Indexador
  indexador?: string | null;
  percentualIndexador?: number | null;
  // Datas
  dataVencimento?: string | null;
  dataAplicacao?: string | null;
  dataAdesao?: string | null;
  dataPosicao?: string | null;
  // Fundos
  periodoCotizacaoResgate?: string | null;
  periodoLiquidacaoResgate?: string | null;
  // COE
  cenarioBase?: string | null;
  cenarioPessimista?: string | null;
  barreiraCrescimento?: number | null;
  // Controle
  _uniqueId: string;
}

interface XpPortfolio {
  codigoCliente: number;
  dataAtualizacao: string;
  patrimonioTotal: number;
  patrimonioTotalLiquido: number;
  valorDisponivel: number;
  alocacao: { classe: string; valor: number; icone: string }[];
  ativos: XpAtivo[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (v?: number | null) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('pt-BR') : '-';

const fmtNum = (v?: number | null, decimais = 2) =>
  v != null
    ? v.toLocaleString('pt-BR', { minimumFractionDigits: decimais, maximumFractionDigits: decimais })
    : '-';

const fmtPct = (v?: number | null) =>
  v != null ? `${fmtNum(v)}%` : '-';

// ─────────────────────────────────────────────────────────────────────────────
// Parser: converte posicaoDetalhada → XpPortfolio
// ─────────────────────────────────────────────────────────────────────────────

function parsePosicaoXp(raw: any): XpPortfolio {
  const pos = raw.posicaoDetalhada;
  const ativos: XpAtivo[] = [];
  let idx = 0;

  // ── Ações ──────────────────────────────────────────────────────────────────
  for (const item of pos.acoes?.itens ?? []) {
    ativos.push({
      tipo: 'Renda Variável',
      subTipo: 'Ação',
      nome: item.nomeAtivo ?? item.codigoAtivo,
      codigoAtivo: item.codigoAtivo,
      valorAplicado: item.valorAplicado ?? 0,
      valorBruto: item.valorAtual ?? 0,
      valorLiquido: item.valorLiquido ?? item.valorAtual ?? 0,
      resultado: item.resultado,
      resultadoPercentual: item.resultadoPercentual,
      quantidade: item.quantidade,
      precoUnitario: item.precoAtual,
      precoMedio: item.precoMedio,
      indexador: null,
      _uniqueId: `xp-${idx++}`,
    });
  }

  // ── Fundos de Investimento ─────────────────────────────────────────────────
  for (const item of pos.fundos?.itens ?? []) {
    ativos.push({
      tipo: 'Fundos',
      subTipo: 'FI',
      nome: item.nomeFundo,
      cnpj: item.cnpj,
      valorAplicado: item.valorAplicado ?? 0,
      valorBruto: item.valorBruto ?? 0,
      valorLiquido: item.valorLiquido ?? 0,
      valorImpostoRenda: item.valorImpostoRenda,
      valorIof: item.valorIof,
      valorRendimento: item.valorRendimento,
      valorCota: item.valorCota,
      quantidadeCotas: item.quantidadeCotas,
      periodoCotizacaoResgate: item.periodoCotizacaoResgate,
      periodoLiquidacaoResgate: item.periodoLiquidacaoResgate,
      dataPosicao: item.dataPosicao,
      indexador: null,
      _uniqueId: `xp-${idx++}`,
    });
  }

  // ── Renda Fixa ─────────────────────────────────────────────────────────────
  for (const item of pos.rendaFixa?.itens ?? []) {
    const pct = item.percentualIndexador;
    const indexador = pct && item.indexador
      ? `${pct}% ${item.indexador}`
      : item.indexador ?? null;

    ativos.push({
      tipo: 'Renda Fixa',
      subTipo: item.tipoProduto ?? 'RF',
      nome: item.nomeAtivo,
      codigoAtivo: item.codigoAtivo,
      emissor: item.emissor,
      valorAplicado: item.valorAplicado ?? 0,
      valorBruto: item.valorBruto ?? 0,
      valorLiquido: item.valorLiquido ?? 0,
      valorImpostoRenda: item.valorImpostoRenda,
      valorIof: item.valorIof,
      isIsentoIR: item.isIsentoIR ?? false,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
      indexador,
      percentualIndexador: item.percentualIndexador,
      dataVencimento: item.dataVencimento,
      dataAplicacao: item.dataAplicacao,
      _uniqueId: `xp-${idx++}`,
    });
  }

  // ── Tesouro Direto ─────────────────────────────────────────────────────────
  for (const item of pos.tesouroDireto?.itens ?? []) {
    ativos.push({
      tipo: 'Tesouro Direto',
      subTipo: item.indexador ?? 'TD',
      nome: item.nomeAtivo,
      codigoAtivo: item.codigoAtivo,
      emissor: 'Tesouro Nacional',
      valorAplicado: item.valorAplicado ?? 0,
      valorBruto: item.valorBruto ?? 0,
      valorLiquido: item.valorLiquido ?? 0,
      valorImpostoRenda: item.valorImpostoRenda,
      valorIof: item.valorIof,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
      indexador: item.indexador,
      dataVencimento: item.dataVencimento,
      dataAplicacao: item.dataAplicacao,
      _uniqueId: `xp-${idx++}`,
    });
  }

  // ── Previdência ────────────────────────────────────────────────────────────
  for (const item of pos.previdencia?.itens ?? []) {
    ativos.push({
      tipo: 'Previdência',
      subTipo: item.tipoCertificado ?? 'PREV',
      nome: item.nomeFundo,
      cnpj: item.cnpj,
      valorAplicado: item.valorAplicado ?? 0,
      valorBruto: item.valorAtual ?? item.valorBruto ?? 0,
      valorLiquido: item.valorLiquido ?? item.valorAtual ?? 0,
      valorRendimento: item.valorRendimento,
      valorCota: item.valorCota,
      quantidadeCotas: item.quantidadeCotas,
      dataAdesao: item.dataAdesao,
      indexador: null,
      _uniqueId: `xp-${idx++}`,
    });
  }

  // ── COE ────────────────────────────────────────────────────────────────────
  for (const item of pos.coe?.itens ?? []) {
    ativos.push({
      tipo: 'COE',
      subTipo: 'COE',
      nome: item.nomeAtivo,
      codigoAtivo: item.codigoAtivo,
      emissor: item.emissor,
      valorAplicado: item.valorAplicado ?? 0,
      valorBruto: item.valorAtual ?? item.valorBruto ?? 0,
      valorLiquido: item.valorLiquido ?? item.valorAtual ?? 0,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
      dataVencimento: item.dataVencimento,
      dataAplicacao: item.dataEmissao,
      cenarioBase: item.cenarioBase,
      cenarioPessimista: item.cenarioPessimista,
      barreiraCrescimento: item.barreiraCrescimento,
      indexador: null,
      _uniqueId: `xp-${idx++}`,
    });
  }

  // ── Fundos Imobiliários ────────────────────────────────────────────────────
  for (const item of pos.fundosImobiliarios?.itens ?? []) {
    ativos.push({
      tipo: 'Fundos',
      subTipo: 'FII',
      nome: item.nomeFundo ?? item.codigoAtivo,
      codigoAtivo: item.codigoAtivo,
      valorAplicado: item.valorAplicado ?? 0,
      valorBruto: item.valorAtual ?? 0,
      valorLiquido: item.valorLiquido ?? item.valorAtual ?? 0,
      quantidade: item.quantidade,
      precoUnitario: item.precoAtual,
      indexador: null,
      _uniqueId: `xp-${idx++}`,
    });
  }

  // ── Alocação ───────────────────────────────────────────────────────────────
  const alocacao = [
    { classe: 'Disponível', valor: pos.valorDisponivel ?? 0, icone: 'cc' },
    { classe: 'Renda Fixa', valor: pos.rendaFixa?.saldo ?? 0, icone: 'rf' },
    { classe: 'Tesouro Direto', valor: pos.tesouroDireto?.saldo ?? 0, icone: 'td' },
    { classe: 'Fundos', valor: pos.fundos?.saldo ?? 0, icone: 'fi' },
    { classe: 'Renda Variável', valor: pos.acoes?.saldo ?? 0, icone: 'rv' },
    { classe: 'Previdência', valor: pos.previdencia?.saldo ?? 0, icone: 'prev' },
    { classe: 'COE', valor: pos.coe?.saldo ?? 0, icone: 'coe' },
  ].filter(a => a.valor > 0);

  return {
    codigoCliente: raw.codigoCliente,
    dataAtualizacao: pos.dataAtualizacao,
    patrimonioTotal: pos.patrimonioTotal,
    patrimonioTotalLiquido: pos.patrimonioTotalLiquido,
    valorDisponivel: pos.valorDisponivel ?? 0,
    alocacao,
    ativos,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer de detalhes do ativo XP
// ─────────────────────────────────────────────────────────────────────────────

function DetalheItem({
  label, value, highlight = false, mono = false, fullWidth = false
}: {
  label: string; value: string;
  highlight?: boolean; mono?: boolean; fullWidth?: boolean;
}) {
  return (
    <div style={{
      background: 'rgba(0,131,203,0.05)', borderRadius: '8px', padding: '10px 12px',
      gridColumn: fullWidth ? '1 / -1' : undefined,
    }}>
      <div style={{ fontSize: '11px', opacity: 0.45, marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
      <div style={{
        fontSize: '14px', fontWeight: highlight ? 700 : 500, wordBreak: 'break-all',
        color: highlight ? 'var(--color-primaria, #0083CB)' : 'inherit',
        fontFamily: mono ? 'monospace' : 'inherit',
      }}>{value}</div>
    </div>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section>
      <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '10px', letterSpacing: '0.05em' }}>
        {titulo}
      </Typography>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {children}
      </div>
    </section>
  );
}

function DrawerDetalhes({ ativo, aberto, onClose }: {
  ativo: XpAtivo; aberto: boolean; onClose: (v: boolean) => void;
}) {
  const resultado = ativo.resultado ?? ((ativo.valorBruto ?? 0) - (ativo.valorAplicado ?? 0));
  const resultadoPct = ativo.resultadoPercentual ??
    (ativo.valorAplicado ? (resultado / ativo.valorAplicado) * 100 : null);
  const positivo = resultado >= 0;

  return (
    <Drawer open={aberto} onOpenChange={onClose}>
      <DrawerContent side="right">
        <DrawerHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <Badge intent="primaria" variant="solid" style={{ fontSize: '12px' }}>{ativo.subTipo}</Badge>
            {ativo.isIsentoIR && <Badge intent="primaria" variant="ghost" style={{ fontSize: '12px' }}>Isento IR</Badge>}
          </div>
          <DrawerTitle>{ativo.nome}</DrawerTitle>
          <DrawerDescription>
            {ativo.tipo}
            {ativo.emissor && ` · ${ativo.emissor}`}
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Valores */}
            <Secao titulo="Valores">
              <DetalheItem label="Valor Aplicado" value={fmt(ativo.valorAplicado)} />
              <DetalheItem label="Valor Bruto" value={fmt(ativo.valorBruto)} />
              <DetalheItem label="Valor Líquido" value={fmt(ativo.valorLiquido)} highlight />
              {(ativo.valorImpostoRenda ?? 0) > 0 && (
                <DetalheItem label="IR Estimado" value={fmt(ativo.valorImpostoRenda)} />
              )}
              {(ativo.valorIof ?? 0) > 0 && (
                <DetalheItem label="IOF" value={fmt(ativo.valorIof)} />
              )}
            </Secao>

            {/* Resultado */}
            {ativo.valorAplicado > 0 && (
              <>
                <DrawerSeparator />
                <Secao titulo="Resultado">
                  <div style={{
                    background: positivo ? 'rgba(0,180,100,0.07)' : 'rgba(220,50,50,0.07)',
                    borderRadius: '8px', padding: '10px 12px',
                  }}>
                    <div style={{ fontSize: '11px', opacity: 0.5, marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>Ganho / Perda</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: positivo ? '#00b464' : '#dc3232' }}>
                      {positivo ? '+' : ''}{fmt(resultado)}
                    </div>
                  </div>
                  {resultadoPct != null && (
                    <div style={{
                      background: positivo ? 'rgba(0,180,100,0.07)' : 'rgba(220,50,50,0.07)',
                      borderRadius: '8px', padding: '10px 12px',
                    }}>
                      <div style={{ fontSize: '11px', opacity: 0.5, marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>Rentabilidade</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: positivo ? '#00b464' : '#dc3232' }}>
                        {positivo ? '+' : ''}{fmtPct(resultadoPct)}
                      </div>
                    </div>
                  )}
                  {(ativo.valorRendimento ?? 0) > 0 && (
                    <DetalheItem label="Rendimento Acumulado" value={fmt(ativo.valorRendimento)} />
                  )}
                </Secao>
              </>
            )}

            {/* Indexador */}
            {ativo.indexador && (
              <>
                <DrawerSeparator />
                <Secao titulo="Indexador">
                  <DetalheItem label="Taxa / Índice" value={ativo.indexador} />
                  {ativo.percentualIndexador && (
                    <DetalheItem label="% do Índice" value={fmtPct(ativo.percentualIndexador)} />
                  )}
                </Secao>
              </>
            )}

            {/* Quantidade e preço */}
            {(ativo.quantidade != null || ativo.precoUnitario != null || ativo.precoMedio != null || ativo.valorCota != null) && (
              <>
                <DrawerSeparator />
                <Secao titulo="Quantidade e Preço">
                  {ativo.quantidade != null && (
                    <DetalheItem label="Quantidade / Títulos" value={fmtNum(ativo.quantidade, 0)} />
                  )}
                  {ativo.quantidadeCotas != null && (
                    <DetalheItem label="Quantidade de Cotas" value={fmtNum(ativo.quantidadeCotas, 6)} />
                  )}
                  {ativo.precoUnitario != null && (
                    <DetalheItem label="Preço Unitário (PU)" value={fmt(ativo.precoUnitario)} />
                  )}
                  {ativo.precoMedio != null && (
                    <DetalheItem label="Preço Médio" value={fmt(ativo.precoMedio)} />
                  )}
                  {ativo.valorCota != null && (
                    <DetalheItem label="Valor da Cota" value={fmt(ativo.valorCota)} />
                  )}
                </Secao>
              </>
            )}

            {/* Datas */}
            {(ativo.dataVencimento || ativo.dataAplicacao || ativo.dataAdesao || ativo.dataPosicao) && (
              <>
                <DrawerSeparator />
                <Secao titulo="Datas">
                  {ativo.dataAplicacao && <DetalheItem label="Data de Aplicação" value={fmtDate(ativo.dataAplicacao)} />}
                  {ativo.dataAdesao && <DetalheItem label="Data de Adesão" value={fmtDate(ativo.dataAdesao)} />}
                  {ativo.dataVencimento && <DetalheItem label="Vencimento" value={fmtDate(ativo.dataVencimento)} />}
                  {ativo.dataPosicao && <DetalheItem label="Data da Posição" value={fmtDate(ativo.dataPosicao)} />}
                </Secao>
              </>
            )}

            {/* Identificação */}
            {(ativo.codigoAtivo || ativo.cnpj) && (
              <>
                <DrawerSeparator />
                <Secao titulo="Identificação">
                  {ativo.codigoAtivo && <DetalheItem label="Código do Ativo" value={ativo.codigoAtivo} mono />}
                  {ativo.cnpj && <DetalheItem label="CNPJ" value={ativo.cnpj} mono />}
                  {ativo.emissor && <DetalheItem label="Emissor" value={ativo.emissor} fullWidth />}
                </Secao>
              </>
            )}

            {/* Liquidez de Fundos */}
            {(ativo.periodoCotizacaoResgate || ativo.periodoLiquidacaoResgate) && (
              <>
                <DrawerSeparator />
                <Secao titulo="Liquidez">
                  {ativo.periodoCotizacaoResgate && <DetalheItem label="Cotização" value={ativo.periodoCotizacaoResgate} />}
                  {ativo.periodoLiquidacaoResgate && <DetalheItem label="Liquidação" value={ativo.periodoLiquidacaoResgate} />}
                </Secao>
              </>
            )}

            {/* COE — cenários */}
            {ativo.tipo === 'COE' && ativo.cenarioBase && (
              <>
                <DrawerSeparator />
                <section>
                  <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '10px', letterSpacing: '0.05em' }}>
                    Cenários
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: 'rgba(0,180,100,0.07)', border: '1px solid rgba(0,180,100,0.15)', borderRadius: '8px', padding: '12px' }}>
                      <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>Cenário Base</div>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{ativo.cenarioBase}</div>
                    </div>
                    {ativo.cenarioPessimista && (
                      <div style={{ background: 'rgba(220,50,50,0.05)', border: '1px solid rgba(220,50,50,0.12)', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>Cenário Pessimista</div>
                        <div style={{ fontSize: '13px', fontWeight: 500 }}>{ativo.cenarioPessimista}</div>
                      </div>
                    )}
                    {ativo.barreiraCrescimento && (
                      <div style={{ background: 'rgba(0,131,203,0.05)', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>Barreira de Crescimento</div>
                        <div style={{ fontSize: '13px', fontWeight: 500 }}>{ativo.barreiraCrescimento}%</div>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}

          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ícones por classe de ativo
// ─────────────────────────────────────────────────────────────────────────────

function IconeClasse({ icone }: { icone: string }) {
  const map: Record<string, React.ReactNode> = {
    cc: <Landmark size={16} />,
    rf: <BarChart3 size={16} />,
    td: <Shield size={16} />,
    fi: <PieChart size={16} />,
    rv: <TrendingUp size={16} />,
    prev: <Building2 size={16} />,
    coe: <BarChart3 size={16} />,
  };
  return <>{map[icone] ?? <BarChart3 size={16} />}</>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Página principal
// ─────────────────────────────────────────────────────────────────────────────

export default function XpApi() {
  const { selectedClient } = useClient();
  const [portfolioData, setPortfolioData] = useState<XpPortfolio | null>(null);
  const [loading, setLoading] = useState(false);
  const [ativoSelecionado, setAtivoSelecionado] = useState<XpAtivo | null>(null);
  const [drawerAberto, setDrawerAberto] = useState(false);

  // ── Carregar mock ─────────────────────────────────────────────────────────
  async function carregarMock() {
    if (!selectedClient) return;
    setLoading(true);
    try {
      const res = await fetch('/mocks/xp-consolidated-position.json');
      const raw = await res.json();
      const portfolio = parsePosicaoXp(raw);
      setPortfolioData(portfolio);
      await persistirNoSupabase(portfolio);
    } catch (err) {
      console.error('Erro ao carregar mock XP:', err);
    } finally {
      setLoading(false);
    }
  }

  async function persistirNoSupabase(portfolio: XpPortfolio) {
    if (!selectedClient?.id) return;
    const hoje = new Date().toISOString().split('T')[0];

    // Totais por classe
    const saldos = portfolio.alocacao.reduce((acc, a) => {
      acc[a.classe] = a.valor;
      return acc;
    }, {} as Record<string, number>);

    // 1. Upsert snapshot
    const { data: snapshot, error: snapError } = await supabase
      .from('posicao_xp_snapshots')
      .upsert({
        cliente_id: selectedClient.id,
        data_referencia: hoje,
        patrimonio_total: portfolio.patrimonioTotal,
        patrimonio_total_liquido: portfolio.patrimonioTotalLiquido,
        valor_disponivel: portfolio.valorDisponivel,
        saldo_acoes: saldos['Renda Variável'] ?? 0,
        saldo_fundos: saldos['Fundos'] ?? 0,
        saldo_renda_fixa: saldos['Renda Fixa'] ?? 0,
        saldo_tesouro_direto: saldos['Tesouro Direto'] ?? 0,
        saldo_previdencia: saldos['Previdência'] ?? 0,
        saldo_coe: saldos['COE'] ?? 0,
        saldo_fii: 0,
        saldo_outros: saldos['Disponível'] ?? 0,
        dado_atualizado: true,
        source: 'XP_MOCK',
      }, { onConflict: 'cliente_id,data_referencia' })
      .select('id')
      .single();

    if (snapError || !snapshot) {
      console.error('Erro ao salvar snapshot XP:', snapError?.message);
      return;
    }

    // 2. Limpa ativos do dia e reinserere
    await supabase
      .from('posicao_xp_ativos')
      .delete()
      .eq('snapshot_id', snapshot.id);

    const ativosBulk = portfolio.ativos.map(a => ({
      snapshot_id: snapshot.id,
      tipo: a.tipo,
      sub_tipo: a.subTipo,
      nome: a.nome,
      codigo_ativo: a.codigoAtivo ?? null,
      cnpj: a.cnpj ?? null,
      emissor: a.emissor ?? null,
      valor_aplicado: a.valorAplicado,
      valor_bruto: a.valorBruto,
      valor_liquido: a.valorLiquido,
      valor_imposto_renda: a.valorImpostoRenda ?? 0,
      valor_iof: a.valorIof ?? 0,
      valor_rendimento: a.valorRendimento ?? null,
      is_isento_ir: a.isIsentoIR ?? false,
      resultado: a.resultado ?? null,
      resultado_percentual: a.resultadoPercentual ?? null,
      quantidade: a.quantidade ?? null,
      preco_unitario: a.precoUnitario ?? null,
      preco_medio: a.precoMedio ?? null,
      valor_cota: a.valorCota ?? null,
      quantidade_cotas: a.quantidadeCotas ?? null,
      indexador: a.indexador ?? null,
      percentual_indexador: a.percentualIndexador ?? null,
      data_vencimento: a.dataVencimento ? a.dataVencimento.split('T')[0] : null,
      data_aplicacao: a.dataAplicacao ? a.dataAplicacao.split('T')[0] : null,
      data_adesao: a.dataAdesao ? a.dataAdesao.split('T')[0] : null,
      data_posicao: a.dataPosicao ? a.dataPosicao.split('T')[0] : null,
      periodo_cotizacao: a.periodoCotizacaoResgate ?? null,
      periodo_liquidacao: a.periodoLiquidacaoResgate ?? null,
      cenario_base: a.cenarioBase ?? null,
      cenario_pessimista: a.cenarioPessimista ?? null,
      barreira_crescimento: a.barreiraCrescimento ?? null,
      tipo_certificado: a.tipo === 'Previdência' ? a.subTipo : null,
    }));

    const { error: ativosError } = await supabase
      .from('posicao_xp_ativos')
      .insert(ativosBulk);

    if (ativosError) {
      console.error('Erro ao salvar ativos XP:', ativosError.message);
    } else {
      console.log(`XP: ${ativosBulk.length} ativos salvos no Supabase`);
    }
  }

  useEffect(() => { carregarMock(); }, [selectedClient]);

  const getAlocVal = (classe: string) =>
    portfolioData?.alocacao.find(a => a.classe === classe)?.valor || 0;

  const ativosAgrupados = portfolioData?.ativos.reduce((acc, ativo) => {
    const tipo = ativo.tipo || 'Outros';
    if (!acc[tipo]) acc[tipo] = [];
    acc[tipo].push(ativo);
    return acc;
  }, {} as Record<string, XpAtivo[]>) || {};

  function abrirDrawer(ativo: XpAtivo) {
    setAtivoSelecionado(ativo);
    setDrawerAberto(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* HEADER */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Typography variant="h1">{selectedClient?.nome || 'Selecionar Cliente'}</Typography>
            {portfolioData && (
              <Badge intent="primaria" variant="ghost">
                <Calendar size={14} style={{ marginRight: 6 }} />
                Ref: {fmtDate(portfolioData.dataAtualizacao)}
              </Badge>
            )}
            <Badge variant="ghost" style={{ fontSize: '11px', opacity: 0.6 }}>
              🔧 Mock
            </Badge>
          </div>
          <Typography variant="p" style={{ opacity: 0.6 }}>Posição Consolidada XP Investimentos</Typography>
        </div>
        {selectedClient && (
          <Button onClick={carregarMock} disabled={loading}>
            {loading ? <Spinner size="sm" /> : <RefreshCw size={18} />} Atualizar Posição
          </Button>
        )}
      </header>

      {portfolioData ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* CARD PATRIMÔNIO */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card style={{ borderLeft: '4px solid var(--color-primaria)' }}>
              <CardContent style={{ padding: '24px' }}>
                <Typography variant="p" style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700 }}>
                  Patrimônio Bruto
                </Typography>
                <Typography variant="h2" style={{ color: 'var(--color-primaria)', fontWeight: 800, fontSize: '32px' }}>
                  {fmt(portfolioData.patrimonioTotal)}
                </Typography>
              </CardContent>
            </Card>
            <Card style={{ borderLeft: '4px solid #00b464' }}>
              <CardContent style={{ padding: '24px' }}>
                <Typography variant="p" style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700 }}>
                  Patrimônio Líquido
                </Typography>
                <Typography variant="h2" style={{ color: '#00b464', fontWeight: 800, fontSize: '32px' }}>
                  {fmt(portfolioData.patrimonioTotalLiquido)}
                </Typography>
              </CardContent>
            </Card>
          </div>

          {/* CARDS ALOCAÇÃO */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {portfolioData.alocacao.map(({ classe, valor, icone }) => (
              <Card key={classe}>
                <CardContent style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6, marginBottom: '8px' }}>
                    <IconeClasse icone={icone} />
                    <Typography variant="p" style={{ fontSize: '12px', fontWeight: 600 }}>{classe}</Typography>
                  </div>
                  <Typography variant="h2" style={{ fontSize: '18px', fontWeight: 700 }}>
                    {fmt(valor)}
                  </Typography>
                  <Typography variant="p" style={{ fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>
                    {portfolioData.patrimonioTotal > 0
                      ? `${((valor / portfolioData.patrimonioTotal) * 100).toFixed(1)}% do portfólio`
                      : ''}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* TABELAS POR TIPO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '8px' }}>
            {Object.entries(ativosAgrupados).map(([tipo, ativosDoTipo]) => (
              <section key={tipo}>
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LayoutGrid size={16} style={{ opacity: 0.4 }} />
                  <Typography variant="h2" style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '12px', opacity: 0.7 }}>
                    {tipo}
                  </Typography>
                  <Badge variant="ghost" style={{ fontSize: '11px' }}>{ativosDoTipo.length}</Badge>
                  <Typography variant="p" style={{ fontSize: '12px', opacity: 0.5, marginLeft: 'auto' }}>
                    {fmt(ativosDoTipo.reduce((s, a) => s + (a.valorLiquido ?? 0), 0))}
                  </Typography>
                </div>
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                  <DataTable
                    data={ativosDoTipo}
                    columns={[
                      {
                        header: 'Tipo',
                        accessorKey: 'subTipo',
                        cell: (item: XpAtivo) => (
                          <Badge intent="primaria" variant="ghost" style={{ fontSize: '11px', fontWeight: 700 }}>
                            {item.subTipo}
                          </Badge>
                        ),
                      },
                      {
                        header: 'Nome',
                        accessorKey: 'nome',
                        cell: (item: XpAtivo) => (
                          <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>
                            {item.nome}
                          </Typography>
                        ),
                      },
                      {
                        header: 'Taxa / Índice',
                        accessorKey: 'indexador',
                        cell: (item: XpAtivo) => item.indexador
                          ? <Badge variant="ghost">{item.indexador}</Badge>
                          : <span style={{ opacity: 0.3 }}>—</span>,
                      },
                      {
                        header: 'Valor Líquido',
                        accessorKey: 'valorLiquido',
                        cell: (item: XpAtivo) => <strong>{fmt(item.valorLiquido)}</strong>,
                      },
                      {
                        header: '',
                        accessorKey: '_uniqueId',
                        cell: (item: XpAtivo) => (
                          <button
                            onClick={() => abrirDrawer(item)}
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
                    keyExtractor={(item: XpAtivo) => item._uniqueId}
                    selectable={false}
                  />
                </Card>
              </section>
            ))}
          </div>
        </div>
      ) : (
        !loading && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '100px 0', opacity: 0.4,
          }}>
            <Wallet size={48} strokeWidth={1} />
            <Typography variant="h2" style={{ marginTop: '16px' }}>Nenhum dado disponível</Typography>
            <Typography variant="p" style={{ marginTop: '8px', opacity: 0.6 }}>
              {selectedClient ? 'Clique em Atualizar Posição' : 'Selecione um cliente'}
            </Typography>
          </div>
        )
      )}

      {/* DRAWER DE DETALHES */}
      {ativoSelecionado && (
        <DrawerDetalhes
          ativo={ativoSelecionado}
          aberto={drawerAberto}
          onClose={setDrawerAberto}
        />
      )}

    </div>
  );
}