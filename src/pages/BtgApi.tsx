import { useState, useEffect } from 'react';
import {
  Wallet, RefreshCw, LayoutGrid, Calendar,
  Landmark, BarChart3, PieChart, ChevronRight
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
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────

interface Acquisition {
  acquisitionDate?: string | null;
  quantity?: number | null;
  costPrice?: number | null;
  initialInvestmentValue?: number | null;
  grossValue?: number | null;
  netValue?: number | null;
  incomeTax?: number | null;
  iofTax?: number | null;
  yieldToMaturity?: number | null;
  indexYieldRate?: string | null;
  ftsId?: string | null;
  interfaceDate?: string | null;
  isVirtual?: boolean;
}

interface EarlyTermination {
  type?: string | null;
  indexRateMultiplier?: number | null;
  rate?: number | null;
  fromDate?: string | null;
  toDate?: string | null;
}

interface AtivoExtra {
  isin?: string | null;
  cetipCode?: string | null;
  selicCode?: string | null;
  issuer?: string | null;
  issuerCgeCode?: string | null;
  issueDate?: string | null;
  issuerType?: string | null;
  taxFree?: boolean;
  isRepo?: boolean;
  isLiquidity?: boolean;
  yieldAvg?: number | null;
  iofTax?: number | null;
  priceIncomeTax?: number | null;
  priceVirtualIOF?: number | null;
  acquisitions?: Acquisition[];
  earlyTerminationSchedules?: EarlyTermination[];
  manager?: string | null;
  cnpj?: string | null;
  fundLiquidity?: string | null;
}

interface AvereAtivo {
  tipo?: string;
  subTipo?: string;
  emissor?: string;
  codigo?: string;
  ticker?: string;
  valorLiquido?: number;
  valorBruto?: number;
  ir?: number | null;
  quantidade?: number | null;
  precoMercado?: number | null;
  rentabilidade?: string | null;
  benchmark?: string | null;
  vencimento?: string | null;
  extra?: AtivoExtra;
  _uniqueId?: string;
}

interface AverePortfolio {
  patrimonioTotal: number;
  dataReferencia: string;
  ativos: AvereAtivo[];
  alocacao: { classe: string; valor: number }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers de formatação
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (v?: number | null) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('pt-BR') : '-';

const fmtNum = (v?: number | null, decimais = 2) =>
  v != null
    ? v.toLocaleString('pt-BR', { minimumFractionDigits: decimais, maximumFractionDigits: decimais })
    : '-';

// ─────────────────────────────────────────────────────────────────────────────
// Componentes auxiliares do Drawer
// ─────────────────────────────────────────────────────────────────────────────

function DetalheItem({
  label, value, highlight = false, mono = false, fullWidth = false
}: {
  label: string; value: string;
  highlight?: boolean; mono?: boolean; fullWidth?: boolean;
}) {
  return (
    <div style={{
      background: 'rgba(0,131,203,0.05)',
      borderRadius: '8px',
      padding: '10px 12px',
      gridColumn: fullWidth ? '1 / -1' : undefined,
    }}>
      <div style={{ fontSize: '11px', opacity: 0.45, marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{
        fontSize: '14px',
        fontWeight: highlight ? 700 : 500,
        wordBreak: 'break-all',
        color: highlight ? 'var(--color-primaria, #0083CB)' : 'inherit',
        fontFamily: mono ? 'monospace' : 'inherit',
      }}>
        {value}
      </div>
    </div>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '4px' }}>
      <Typography variant="p" style={{
        fontSize: '11px', fontWeight: 700,
        textTransform: 'uppercase', opacity: 0.4,
        marginBottom: '10px', letterSpacing: '0.05em'
      }}>
        {titulo}
      </Typography>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {children}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer de detalhes do ativo
// ─────────────────────────────────────────────────────────────────────────────

function DrawerDetalhes({ ativo, aberto, onClose }: {
  ativo: AvereAtivo;
  aberto: boolean;
  onClose: (v: boolean) => void;
}) {
  const ex = ativo.extra || {};
  const acquisitions = ex.acquisitions || [];
  const schedules = ex.earlyTerminationSchedules || [];

  return (
    <Drawer open={aberto} onOpenChange={onClose}>
      <DrawerContent side="right">

        {/* Header fixo */}
        <DrawerHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {ativo.subTipo && (
              <Badge intent="primaria" variant="solid" style={{ fontSize: '12px' }}>
                {ativo.subTipo}
              </Badge>
            )}
            {ex.taxFree && (
              <Badge intent="primaria" variant="ghost" style={{ fontSize: '12px' }}>
                Isento IR
              </Badge>
            )}
            {ex.isLiquidity && (
              <Badge intent="primaria" variant="ghost" style={{ fontSize: '12px' }}>
                Liquidez
              </Badge>
            )}
            {ex.isRepo && (
              <Badge variant="ghost" style={{ fontSize: '12px' }}>
                Compromissada
              </Badge>
            )}
          </div>
          <DrawerTitle>
            {ativo.emissor || ativo.ticker || 'Ativo'}
          </DrawerTitle>
          <DrawerDescription>
            {ativo.tipo}
            {ativo.ticker && ` · ${ativo.ticker}`}
          </DrawerDescription>
        </DrawerHeader>

        {/* Body com scroll */}
        <DrawerBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Valores */}
            <Secao titulo="Valores">
              <DetalheItem label="Valor Bruto" value={fmt(ativo.valorBruto)} />
              <DetalheItem label="Valor Líquido" value={fmt(ativo.valorLiquido)} highlight />
              {(ativo.ir ?? 0) > 0 && (
                <DetalheItem label="IR Estimado" value={fmt(ativo.ir)} />
              )}
              {(ex.iofTax ?? 0) > 0 && (
                <DetalheItem label="IOF" value={fmt(ex.iofTax)} />
              )}
              {(ex.priceIncomeTax ?? 0) > 0 && (
                <DetalheItem label="IR no Preço Unitário" value={fmt(ex.priceIncomeTax)} />
              )}
              {(ex.priceVirtualIOF ?? 0) > 0 && (
                <DetalheItem label="IOF Virtual no PU" value={fmt(ex.priceVirtualIOF)} />
              )}
              {ativo.quantidade != null && (
                <DetalheItem label="Quantidade / Títulos" value={fmtNum(ativo.quantidade, 0)} />
              )}
              {(ativo.precoMercado ?? 0) > 0 && (
                <DetalheItem label="Preço Unitário (PU)" value={fmt(ativo.precoMercado)} />
              )}
            </Secao>

            <DrawerSeparator />

            {/* Rentabilidade */}
            <Secao titulo="Rentabilidade">
              <DetalheItem label="Taxa" value={ativo.rentabilidade || '-'} />
              <DetalheItem label="Benchmark" value={ativo.benchmark || '-'} />
              {ex.yieldAvg != null && (
                <DetalheItem label="Yield Médio" value={`${fmtNum(ex.yieldAvg)}%`} />
              )}
            </Secao>

            <DrawerSeparator />

            {/* Datas */}
            {(ex.issueDate || ativo.vencimento) && (
              <>
                <Secao titulo="Datas">
                  {ex.issueDate && (
                    <DetalheItem label="Data de Emissão" value={fmtDate(ex.issueDate)} />
                  )}
                  {ativo.vencimento && (
                    <DetalheItem label="Vencimento" value={fmtDate(ativo.vencimento)} />
                  )}
                </Secao>
                <DrawerSeparator />
              </>
            )}

            {/* Emissor */}
            <Secao titulo="Emissor">
              <DetalheItem
                label="Nome"
                value={ex.issuer || ativo.emissor || '-'}
                fullWidth
              />
              {ex.issuerType && (
                <DetalheItem label="Tipo do Emissor" value={ex.issuerType} />
              )}
              {ex.issuerCgeCode && (
                <DetalheItem label="CGE do Emissor" value={ex.issuerCgeCode} mono />
              )}
            </Secao>

            {/* Identificação */}
            {(ativo.codigo || ex.cetipCode || ex.isin || ex.selicCode) && (
              <>
                <DrawerSeparator />
                <Secao titulo="Identificação">
                  {ativo.codigo && <DetalheItem label="Código" value={ativo.codigo} mono />}
                  {ex.cetipCode && <DetalheItem label="Código CETIP" value={ex.cetipCode} mono />}
                  {ex.selicCode && <DetalheItem label="Código SELIC" value={ex.selicCode} mono />}
                  {ex.isin && <DetalheItem label="ISIN" value={ex.isin} mono />}
                  {ativo.ticker && <DetalheItem label="Ticker" value={ativo.ticker} mono />}
                </Secao>
              </>
            )}

            {/* Informações do Fundo */}
            {(ex.manager || ex.cnpj || ex.fundLiquidity) && (
              <>
                <DrawerSeparator />
                <Secao titulo="Informações do Fundo">
                  {ex.manager && <DetalheItem label="Gestor" value={ex.manager} fullWidth />}
                  {ex.cnpj && <DetalheItem label="CNPJ do Fundo" value={ex.cnpj} mono />}
                  {ex.fundLiquidity && <DetalheItem label="Liquidez (dias)" value={ex.fundLiquidity} />}
                </Secao>
              </>
            )}

            {/* Janelas de Liquidez Antecipada */}
            {schedules.length > 0 && (
              <>
                <DrawerSeparator />
                <section>
                  <Typography variant="p" style={{
                    fontSize: '11px', fontWeight: 700,
                    textTransform: 'uppercase', opacity: 0.4,
                    marginBottom: '12px', letterSpacing: '0.05em'
                  }}>
                    Janelas de Liquidez Antecipada
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {schedules.map((s, i) => (
                      <div key={i} style={{
                        background: 'rgba(0,131,203,0.05)',
                        borderRadius: '8px', padding: '12px',
                        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'
                      }}>
                        <div>
                          <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Tipo</div>
                          <div style={{ fontSize: '13px', fontWeight: 500 }}>{s.type || '-'}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>De</div>
                          <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmtDate(s.fromDate)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Até</div>
                          <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmtDate(s.toDate)}</div>
                        </div>
                        {s.indexRateMultiplier != null && (
                          <div>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Multiplicador</div>
                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmtNum(s.indexRateMultiplier)}%</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Histórico de Aquisições */}
            {acquisitions.length > 0 && (
              <>
                <DrawerSeparator />
                <section>
                  <Typography variant="p" style={{
                    fontSize: '11px', fontWeight: 700,
                    textTransform: 'uppercase', opacity: 0.4,
                    marginBottom: '12px', letterSpacing: '0.05em'
                  }}>
                    Histórico de Aquisições &nbsp;
                    <span style={{ opacity: 0.6, fontWeight: 400, textTransform: 'none' }}>
                      ({acquisitions.length} {acquisitions.length === 1 ? 'lote' : 'lotes'})
                    </span>
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {acquisitions.map((acq, i) => (
                      <div key={i} style={{
                        background: 'rgba(0,131,203,0.05)',
                        border: '1px solid rgba(0,131,203,0.1)',
                        borderRadius: '10px', padding: '14px',
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'
                      }}>
                        {acq.acquisitionDate && (
                          <div style={{ gridColumn: '1 / -1' }}>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Data de Compra</div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primaria, #0083CB)' }}>{fmtDate(acq.acquisitionDate)}</div>
                          </div>
                        )}
                        {acq.quantity != null && (
                          <div>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Quantidade</div>
                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmtNum(acq.quantity, 0)}</div>
                          </div>
                        )}
                        {acq.costPrice != null && (
                          <div>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Preço de Custo</div>
                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmt(acq.costPrice)}</div>
                          </div>
                        )}
                        {acq.initialInvestmentValue != null && (
                          <div>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Valor Investido</div>
                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmt(acq.initialInvestmentValue)}</div>
                          </div>
                        )}
                        {acq.grossValue != null && (
                          <div>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Valor Bruto Atual</div>
                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmt(acq.grossValue)}</div>
                          </div>
                        )}
                        {acq.netValue != null && (
                          <div>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Valor Líquido Atual</div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primaria, #0083CB)' }}>{fmt(acq.netValue)}</div>
                          </div>
                        )}
                        {(acq.incomeTax ?? 0) > 0 && (
                          <div>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>IR do Lote</div>
                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmt(acq.incomeTax)}</div>
                          </div>
                        )}
                        {acq.yieldToMaturity != null && (
                          <div>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Yield to Maturity</div>
                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmtNum(acq.yieldToMaturity)}%</div>
                          </div>
                        )}
                        {acq.indexYieldRate && (
                          <div>
                            <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Taxa do Índice</div>
                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{acq.indexYieldRate}</div>
                          </div>
                        )}
                      </div>
                    ))}
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
// Página principal
// ─────────────────────────────────────────────────────────────────────────────

export default function BtgApi() {
  const { selectedClient } = useClient();
  const [portfolioData, setPortfolioData] = useState<AverePortfolio | null>(null);
  const [loading, setLoading] = useState(false);
  const [ativoSelecionado, setAtivoSelecionado] = useState<AvereAtivo | null>(null);
  const [drawerAberto, setDrawerAberto] = useState(false);

  // ── 1. Busca snapshot existente do Supabase ───────────────────────────────
  async function checkExistingSnapshot() {
    if (!selectedClient?.id) return;
    setLoading(true);
    const hoje = new Date().toISOString().split('T')[0];

    try {
      const { data: snapshot, error } = await supabase
        .from('posicao_btg_snapshots')
        .select(`
          id, patrimonio_total, data_referencia, saldo_cc, saldo_rf, saldo_fundos,
          posicao_btg_ativos (
            id, sub_tipo, emissor, ticker, codigo,
            valor_bruto, valor_liquido, ir, quantidade, preco_mercado,
            rentabilidade, benchmark, maturity_date,
            tax_free, is_liquidity, isin, cetip_code, selic_code,
            issuer_type, issuer_cge_code, issue_date, yield_avg,
            iof_tax, price_income_tax, price_virtual_iof,
            tipo, asset_class,
            fund_manager, fund_cnpj, fund_liquidity_days,
            posicao_btg_aquisicoes (
              acquisition_date, quantity, initial_investment_value, initial_investment_qty,
              cost_price, gross_value, net_value, income_tax, iof_tax,
              yield_to_maturity, index_yield_rate, fts_id, transfer_id,
              interface_date, is_virtual
            ),
            posicao_btg_janelas_liquidez (
              type, index_rate_multiplier, rate, from_date, to_date
            )
          )
        `)
        .eq('cliente_id', selectedClient.id)
        .eq('data_referencia', hoje)
        .maybeSingle();

      if (error || !snapshot) {
        setPortfolioData(null);
        return;
      }

      setPortfolioData({
        patrimonioTotal: snapshot.patrimonio_total,
        dataReferencia: snapshot.data_referencia,
        alocacao: [
          { classe: 'Conta Corrente', valor: snapshot.saldo_cc },
          { classe: 'Renda Fixa', valor: snapshot.saldo_rf },
          { classe: 'Fundos de Investimento', valor: snapshot.saldo_fundos },
        ],
        ativos: (snapshot.posicao_btg_ativos || []).map((a: any, idx: number) => ({
          tipo: a.tipo,
          subTipo: a.sub_tipo,
          emissor: a.emissor,
          codigo: a.codigo,
          ticker: a.ticker,
          valorBruto: a.valor_bruto,
          valorLiquido: a.valor_liquido,
          ir: a.ir,
          quantidade: a.quantidade,
          precoMercado: a.preco_mercado,
          rentabilidade: a.rentabilidade,
          benchmark: a.benchmark,
          vencimento: a.maturity_date,
          extra: {
            isin: a.isin,
            cetipCode: a.cetip_code,
            selicCode: a.selic_code,
            issuer: a.emissor,
            issuerCgeCode: a.issuer_cge_code,
            issueDate: a.issue_date,
            issuerType: a.issuer_type,
            taxFree: a.tax_free,
            isLiquidity: a.is_liquidity,
            yieldAvg: a.yield_avg,
            iofTax: a.iof_tax,
            priceIncomeTax: a.price_income_tax,
            priceVirtualIOF: a.price_virtual_iof,
            manager: a.fund_manager,
            cnpj: a.fund_cnpj,
            fundLiquidity: a.fund_liquidity_days,
            acquisitions: (a.posicao_btg_aquisicoes || []).map((acq: any) => ({
              acquisitionDate: acq.acquisition_date,
              quantity: acq.quantity,
              initialInvestmentValue: acq.initial_investment_value,
              initialInvestmentQuantity: acq.initial_investment_qty,
              costPrice: acq.cost_price,
              grossValue: acq.gross_value,
              netValue: acq.net_value,
              incomeTax: acq.income_tax,
              iofTax: acq.iof_tax,
              yieldToMaturity: acq.yield_to_maturity,
              indexYieldRate: acq.index_yield_rate,
              ftsId: acq.fts_id,
              transferId: acq.transfer_id,
              interfaceDate: acq.interface_date,
              isVirtual: acq.is_virtual,
            })),
            earlyTerminationSchedules: (a.posicao_btg_janelas_liquidez || []).map((s: any) => ({
              type: s.type,
              indexRateMultiplier: s.index_rate_multiplier,
              rate: s.rate,
              fromDate: s.from_date,
              toDate: s.to_date,
            })),
          },
          _uniqueId: `db-${idx}`,
        })),
      });
    } catch {
      setPortfolioData(null);
    } finally {
      setLoading(false);
    }
  }

  // ── 2. Consulta API via Edge Function ─────────────────────────────────────
  async function handleFetch() {
    if (!selectedClient?.codigoBtg) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-btg-position', {
        body: { account: selectedClient.codigoBtg },
      });

      if (error) throw new Error(error.message);

      // 1. Atualiza a tela com os dados novos
      setPortfolioData({
        ...data,
        ativos: (data.ativos || []).map((a: any, idx: number) => ({
          ...a,
          _uniqueId: `api-${idx}`,
        })),
      });

      // 2. A MÁGICA ACONTECE AQUI: 
      // Manda o banco de dados processar os ativos novos e jogar no Dicionário!
      const { error: rpcError } = await supabase.rpc('alimentar_dicionario');
      if (rpcError) console.error('Erro ao alimentar dicionário:', rpcError);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { checkExistingSnapshot(); }, [selectedClient]);

  const getAlocVal = (classe: string) =>
    portfolioData?.alocacao.find(a => a.classe === classe)?.valor || 0;

  const ativosAgrupados = portfolioData?.ativos?.reduce((acc, ativo) => {
    const tipo = ativo.tipo || 'Outros';
    if (!acc[tipo]) acc[tipo] = [];
    acc[tipo].push(ativo);
    return acc;
  }, {} as Record<string, AvereAtivo[]>) || {};

  function abrirDrawer(ativo: AvereAtivo) {
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
                Ref: {fmtDate(portfolioData.dataReferencia + 'T12:00:00Z')}
              </Badge>
            )}
          </div>
          <Typography variant="p" style={{ opacity: 0.6 }}>Posição Consolidada BTG Pactual</Typography>
        </div>
        {selectedClient?.codigoBtg && (
          <Button onClick={handleFetch} disabled={loading}>
            {loading ? <Spinner size="sm" /> : <RefreshCw size={18} />} Atualizar Posição
          </Button>
        )}
      </header>

      {portfolioData ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* CARD PATRIMÔNIO */}
          <Card style={{ borderLeft: '4px solid var(--color-primaria)' }}>
            <CardContent style={{ padding: '24px' }}>
              <Typography variant="p" style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700 }}>
                Patrimônio Consolidado
              </Typography>
              <Typography variant="h2" style={{ color: 'var(--color-primaria)', fontWeight: 800, fontSize: '36px' }}>
                {fmt(portfolioData.patrimonioTotal)}
              </Typography>
            </CardContent>
          </Card>

          {/* CARDS ALOCAÇÃO */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { classe: 'Conta Corrente', label: 'Conta Corrente', icon: <Landmark size={16} /> },
              { classe: 'Renda Fixa', label: 'Renda Fixa', icon: <BarChart3 size={16} /> },
              { classe: 'Fundos de Investimento', label: 'Fundos', icon: <PieChart size={16} /> },
            ].map(({ classe, label, icon }) => (
              <Card key={classe}>
                <CardContent style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6, marginBottom: '8px' }}>
                    {icon}
                    <Typography variant="p" style={{ fontSize: '12px', fontWeight: 600 }}>{label}</Typography>
                  </div>
                  <Typography variant="h2" style={{ fontSize: '20px', fontWeight: 700 }}>
                    {fmt(getAlocVal(classe))}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* TABELAS POR TIPO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '16px' }}>
            {Object.entries(ativosAgrupados).map(([tipo, ativosDoTipo]) => (
              <section key={tipo}>
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LayoutGrid size={16} style={{ opacity: 0.4 }} />
                  <Typography variant="h2" style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '12px', opacity: 0.7 }}>
                    {tipo.replace(/_/g, ' ')}
                  </Typography>
                  <Badge variant="ghost" style={{ fontSize: '11px' }}>{ativosDoTipo.length}</Badge>
                </div>
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                  <DataTable
                    data={ativosDoTipo}
                    columns={[
                      {
                        header: 'Tipo',
                        accessorKey: 'subTipo',
                        cell: (item: AvereAtivo) => item.subTipo
                          ? <Badge intent="primaria" variant="ghost" style={{ fontSize: '11px', fontWeight: 700 }}>{item.subTipo}</Badge>
                          : <span style={{ opacity: 0.3 }}>—</span>,
                      },
                      {
                        header: 'Emissor',
                        accessorKey: 'emissor',
                        cell: (item: AvereAtivo) => (
                          <Typography variant="p" style={{ fontWeight: 600, fontSize: '13px' }}>
                            {item.emissor || item.ticker || '—'}
                          </Typography>
                        ),
                      },
                      {
                        header: 'Taxa',
                        accessorKey: 'rentabilidade',
                        cell: (item: AvereAtivo) => item.rentabilidade
                          ? <Badge variant="ghost">{item.rentabilidade}</Badge>
                          : <span style={{ opacity: 0.3 }}>—</span>,
                      },
                      {
                        header: 'Valor Líquido',
                        accessorKey: 'valorLiquido',
                        cell: (item: AvereAtivo) => <strong>{fmt(item.valorLiquido)}</strong>,
                      },
                      {
                        header: '',
                        accessorKey: '_uniqueId',
                        cell: (item: AvereAtivo) => (
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
                    keyExtractor={(item: AvereAtivo) => item._uniqueId || ''}
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
            <Typography variant="h2" style={{ marginTop: '16px' }}>Nenhum dado salvo</Typography>
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