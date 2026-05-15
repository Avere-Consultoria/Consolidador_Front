import { useState } from 'react';
import {
    Drawer, DrawerContent, DrawerHeader, DrawerBody,
    DrawerTitle, DrawerDescription, DrawerSeparator, Badge,
} from 'avere-ui';
import type { ConsolidatedAtivo } from '../../../hooks/useHomeMetrics';
import { fmt, fmtDate, fmtNum } from '../../../utils/formatters';
import { DetalheItem, Secao } from '../../shared/DrawerDetalhe';

// ── Props ─────────────────────────────────────────────────────────────────────

interface DrawerDetalheConsolidadoProps {
    ativo: ConsolidatedAtivo;
    aberto: boolean;
    onClose: (aberto: boolean) => void;
    patrimonioTotal: number;
}

// ── Tabs inline (avere-ui não tem Tabs) ───────────────────────────────────────

type TabId = 'geral' | 'btg' | 'xp' | 'avenue' | 'agora';

interface Tab { id: TabId; label: string }

function TabBar({ tabs, active, onChange }: {
    tabs: Tab[];
    active: TabId;
    onChange: (id: TabId) => void;
}) {
    return (
        <div style={{
            display: 'flex', gap: '4px',
            background: 'rgba(0,0,0,0.04)',
            padding: '4px', borderRadius: '10px',
            marginBottom: '20px',
        }}>
            {tabs.map(t => (
                <button
                    key={t.id}
                    onClick={() => onChange(t.id)}
                    style={{
                        flex: 1, padding: '7px 10px', borderRadius: '7px',
                        border: 'none', cursor: 'pointer', fontSize: '12px',
                        fontWeight: 600, fontFamily: 'var(--font-family)',
                        transition: 'all 0.15s',
                        background: active === t.id ? '#fff' : 'transparent',
                        color: active === t.id ? 'var(--color-secundaria)' : '#9CA3AF',
                        boxShadow: active === t.id ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                    }}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}

// ── Primitivo: card de aquisição BTG ─────────────────────────────────────────

function AquisicaoCard({ acq }: { acq: any }) {
    return (
        <div style={{
            background: 'rgba(0,131,203,0.04)', border: '1px solid rgba(0,131,203,0.10)',
            borderRadius: '10px', padding: '14px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
        }}>
            <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '10px', opacity: 0.4, textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Data de Compra</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primaria)' }}>{fmtDate(acq.acquisition_date)}</div>
            </div>
            {acq.initial_investment_value != null && <DetalheItem label="Investido" value={fmt(acq.initial_investment_value)} />}
            {acq.gross_value != null && <DetalheItem label="Bruto Actual" value={fmt(acq.gross_value)} />}
            {acq.net_value != null && <DetalheItem label="Líquido Actual" value={fmt(acq.net_value)} highlight />}
            {acq.income_tax != null && acq.income_tax > 0 && <DetalheItem label="IR" value={fmt(acq.income_tax)} accentColor="#EF4444" />}
            {acq.quantity != null && <DetalheItem label="Quantidade" value={fmtNum(acq.quantity, 0)} />}
            {acq.yield_to_maturity != null && <DetalheItem label="Yield to Maturity" value={`${fmtNum(acq.yield_to_maturity)}%`} />}
            {acq.index_yield_rate != null && <DetalheItem label="Taxa do Índice" value={`${fmtNum(acq.index_yield_rate)}%`} />}
        </div>
    );
}

// ── Conteúdo das tabs ─────────────────────────────────────────────────────────

function TabGeral({ ativo, raw, pesoPct, isBTG, isXP, isAvenue, isAgora }: {
    ativo: ConsolidatedAtivo; raw: any; pesoPct: number;
    isBTG: boolean; isXP: boolean; isAvenue: boolean; isAgora: boolean;
}) {
    const valorBruto = isBTG ? raw.valor_bruto
        : isAvenue ? raw.valor_bruto_brl
        : raw.valor_bruto ?? raw.valor_liquido;

    const ir = isBTG ? (raw.ir || 0) : isAgora ? (raw.ir_percentual ? parseFloat(raw.ir_percentual) : 0) : 0;
    const taxa = isBTG ? raw.rentabilidade : isAgora ? raw.taxa : null;
    const benchmark = isBTG ? raw.benchmark : null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <Secao titulo="Posição Financeira">
                <DetalheItem label="Valor Líquido" value={fmt(ativo.valorLiquido)} highlight />
                <DetalheItem label="Peso na Carteira" value={`${fmtNum(pesoPct)}%`} highlight />
                {valorBruto != null && <DetalheItem label="Valor Bruto" value={fmt(valorBruto)} />}
                {isBTG && ir > 0 && <DetalheItem label="IR Estimado" value={fmt(ir)} accentColor="#EF4444" />}
                {isBTG && raw.iof_tax > 0 && <DetalheItem label="IOF" value={fmt(raw.iof_tax)} accentColor="#EF4444" />}
                {raw.quantidade != null && <DetalheItem label="Quantidade" value={fmtNum(raw.quantidade, 0)} />}
                {isBTG && raw.preco_mercado > 0 && <DetalheItem label="Preço Unitário (PU)" value={fmt(raw.preco_mercado)} />}
                {isAgora && raw.preco_unitario != null && <DetalheItem label="Preço Unitário" value={fmt(raw.preco_unitario)} />}
                {isAgora && raw.custo_total != null && <DetalheItem label="Custo Total" value={fmt(raw.custo_total)} />}
                {isAgora && raw.valorizacao != null && (
                    <DetalheItem
                        label="Valorização"
                        value={`${raw.valorizacao >= 0 ? '+' : ''}${fmt(raw.valorizacao)}${raw.percent_valorizacao != null ? ` (${fmtNum(raw.percent_valorizacao)}%)` : ''}`}
                        accentColor={raw.valorizacao >= 0 ? '#16a34a' : '#EF4444'}
                        highlight
                    />
                )}
            </Secao>

            {(taxa || benchmark || (isBTG && raw.yield_avg != null) || (isAgora && raw.taxa_percentual != null)) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Rentabilidade">
                        {taxa && <DetalheItem label="Taxa" value={String(taxa)} fullWidth={!benchmark} />}
                        {benchmark && <DetalheItem label="Benchmark" value={String(benchmark)} />}
                        {isBTG && raw.yield_avg != null && <DetalheItem label="Cupom (Yield Médio)" value={`${fmtNum(raw.yield_avg)}%`} />}
                        {isAgora && raw.taxa_percentual != null && <DetalheItem label="Taxa %" value={`${fmtNum(raw.taxa_percentual)}%`} />}
                    </Secao>
                </>
            )}

            {(ativo.liquidez || raw.issue_date || raw.data_aplicacao || ativo.vencimento || raw.data_vencimento || raw.maturity_date || (isAgora && raw.liquidez_diaria != null)) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Datas e Liquidez">
                        {ativo.liquidez && <DetalheItem label="Liquidez" value={`D+${ativo.liquidez}`} />}
                        {isAgora && raw.liquidez_diaria != null && <DetalheItem label="Liquidez Diária" value={raw.liquidez_diaria ? 'Sim' : 'Não'} />}
                        {isBTG && raw.issue_date && <DetalheItem label="Data de Emissão" value={fmtDate(raw.issue_date)} />}
                        {isAgora && raw.data_aplicacao && <DetalheItem label="Data de Aplicação" value={fmtDate(raw.data_aplicacao)} />}
                        {ativo.vencimento && <DetalheItem label="Vencimento" value={fmtDate(ativo.vencimento)} />}
                        {isAgora && raw.data_vencimento && !ativo.vencimento && <DetalheItem label="Vencimento" value={fmtDate(raw.data_vencimento)} />}
                    </Secao>
                </>
            )}

            {(ativo.tipo || ativo.subTipo) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Classificação Avere">
                        {ativo.tipo && <DetalheItem label="Classe" value={ativo.tipo} />}
                        {ativo.subTipo && <DetalheItem label="Subtipo" value={ativo.subTipo} />}
                    </Secao>
                </>
            )}
        </div>
    );
}

function TabBTG({ raw }: { raw: any }) {
    const acquisitions: any[] = raw.posicao_btg_aquisicoes || [];
    const schedules: any[]    = raw.posicao_btg_janelas_liquidez || [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <Secao titulo="Identificação">
                {raw.ticker     && <DetalheItem label="Ticker"        value={raw.ticker}     mono />}
                {raw.isin       && <DetalheItem label="ISIN"          value={raw.isin}       mono />}
                {raw.cetip_code && <DetalheItem label="Código CETIP"  value={raw.cetip_code} mono />}
                {raw.selic_code && <DetalheItem label="Código SELIC"  value={raw.selic_code} mono />}
                {raw.fund_cnpj  && <DetalheItem label="CNPJ do Fundo" value={raw.fund_cnpj}  mono fullWidth />}
            </Secao>

            {(raw.tax_free || raw.is_liquidity) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Características">
                        {raw.tax_free     && <DetalheItem label="Tributação"        value="Isento de IR" accentColor="#16a34a" />}
                        {raw.is_liquidity && <DetalheItem label="Liquidez Imediata" value="Sim"          accentColor="#0083CB" />}
                    </Secao>
                </>
            )}

            {schedules.length > 0 && (
                <>
                    <DrawerSeparator />
                    <section>
                        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '12px' }}>
                            Janelas de Liquidez Antecipada ({schedules.length})
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {schedules.map((s: any, i: number) => (
                                <div key={i} style={{
                                    background: 'rgba(0,131,203,0.05)', borderRadius: '8px',
                                    padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'
                                }}>
                                    {[['Tipo', s.type], ['De', fmtDate(s.from_date)], ['Até', fmtDate(s.to_date)]].map(([lbl, val]) => (
                                        <div key={lbl as string}>
                                            <div style={{ fontSize: '10px', opacity: 0.4, textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>{lbl}</div>
                                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{val || '—'}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}

            {acquisitions.length > 0 && (
                <>
                    <DrawerSeparator />
                    <section>
                        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '12px' }}>
                            Histórico de Aquisições ({acquisitions.length})
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {acquisitions.map((acq: any, i: number) => (
                                <AquisicaoCard key={i} acq={acq} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

function TabXP({ raw }: { raw: any }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Secao titulo="Identificação">
                {raw.ticker && <DetalheItem label="Ticker" value={raw.ticker} mono />}
                {raw.isin   && <DetalheItem label="ISIN"   value={raw.isin}   mono />}
                {raw.cnpj   && <DetalheItem label="CNPJ"   value={raw.cnpj}   mono fullWidth />}
            </Secao>
            {!raw.ticker && !raw.isin && !raw.cnpj && (
                <p style={{ opacity: 0.4, fontSize: '13px', textAlign: 'center', padding: '24px' }}>
                    Sem dados adicionais disponíveis para este ativo XP.
                </p>
            )}
        </div>
    );
}

function TabAvenue({ raw }: { raw: any }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Secao titulo="Identificação">
                {raw.ticker && <DetalheItem label="Ticker / Símbolo" value={raw.ticker} mono />}
            </Secao>

            {raw.is_liquidity != null && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Características">
                        <DetalheItem label="Liquidez Imediata" value={raw.is_liquidity ? 'Sim' : 'Não'} accentColor="#0083CB" />
                    </Secao>
                </>
            )}
        </div>
    );
}

function TabAgora({ raw }: { raw: any }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Secao titulo="Identificação">
                {raw.security_code && <DetalheItem label="Security Code" value={raw.security_code} mono />}
                {raw.ticker        && <DetalheItem label="Ticker"         value={raw.ticker}        mono />}
            </Secao>

            {(raw.ir_descricao || raw.ir_percentual) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Tributação">
                        {raw.ir_descricao  && <DetalheItem label="Tipo IR"  value={String(raw.ir_descricao)}  />}
                        {raw.ir_percentual && <DetalheItem label="Alíquota" value={`${String(raw.ir_percentual)}%`} accentColor="#EF4444" />}
                    </Secao>
                </>
            )}
        </div>
    );
}

// ── Componente Principal ──────────────────────────────────────────────────────

export function DrawerDetalheConsolidado({
    ativo, aberto, onClose, patrimonioTotal
}: DrawerDetalheConsolidadoProps) {
    const [activeTab, setActiveTab] = useState<TabId>('geral');

    if (!ativo || !ativo.rawData) return null;

    const raw         = ativo.rawData;
    const instituicao = ativo.instituicao;
    const isBTG    = instituicao === 'BTG Pactual';
    const isXP     = instituicao === 'XP Investimentos';
    const isAvenue = instituicao === 'Avenue';
    const isAgora  = instituicao === 'Ágora';

    const pesoPct = patrimonioTotal > 0 ? (ativo.valorLiquido / patrimonioTotal) * 100 : 0;

    const tabs: Tab[] = [
        { id: 'geral',  label: 'Visão Geral' },
        ...(isBTG    ? [{ id: 'btg'    as TabId, label: 'BTG Pactual' }]      : []),
        ...(isXP     ? [{ id: 'xp'     as TabId, label: 'XP Investimentos' }] : []),
        ...(isAvenue ? [{ id: 'avenue' as TabId, label: 'Avenue' }]           : []),
        ...(isAgora  ? [{ id: 'agora'  as TabId, label: 'Ágora' }]            : []),
    ];

    // Reset tab ao fechar/trocar ativo
    const handleOpenChange = (open: boolean) => {
        if (!open) setActiveTab('geral');
        onClose(open);
    };

    const ticker = raw.ticker;

    return (
        <Drawer open={aberto} onOpenChange={handleOpenChange}>
            <DrawerContent side="right">

                <DrawerHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <Badge variant="solid" style={{ fontSize: '12px' }}>{ativo.instituicao}</Badge>
                        {ativo.subTipo && <Badge variant="outline" style={{ fontSize: '12px' }}>{ativo.subTipo}</Badge>}
                        {raw.tax_free      && <Badge intent="primaria" variant="ghost" style={{ fontSize: '11px' }}>Isento IR</Badge>}
                        {raw.is_liquidity  && <Badge intent="primaria" variant="ghost" style={{ fontSize: '11px' }}>Liquidez</Badge>}
                        {raw.liquidez_diaria && <Badge intent="primaria" variant="ghost" style={{ fontSize: '11px' }}>Liquidez Diária</Badge>}
                    </div>
                    <DrawerTitle>{ativo.nome}</DrawerTitle>
                    <DrawerDescription>
                        {ativo.tipo}{ticker ? ` · ${ticker}` : ''}
                    </DrawerDescription>
                </DrawerHeader>

                <DrawerBody>
                    <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />

                    {activeTab === 'geral' && (
                        <TabGeral
                            ativo={ativo} raw={raw} pesoPct={pesoPct}
                            isBTG={isBTG} isXP={isXP} isAvenue={isAvenue} isAgora={isAgora}
                        />
                    )}
                    {activeTab === 'btg'    && <TabBTG    raw={raw} />}
                    {activeTab === 'xp'     && <TabXP     raw={raw} />}
                    {activeTab === 'avenue' && <TabAvenue raw={raw} />}
                    {activeTab === 'agora'  && <TabAgora  raw={raw} />}
                </DrawerBody>

            </DrawerContent>
        </Drawer>
    );
}
