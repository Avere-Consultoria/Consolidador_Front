import { useState } from 'react';
import {
    Drawer, DrawerContent, DrawerHeader, DrawerBody,
    DrawerTitle, DrawerDescription, DrawerSeparator, Badge,
} from 'avere-ui';
import type { ConsolidatedAtivo } from '../../../hooks/useHomeMetrics';
import { fmt, fmtUsd, fmtDate, fmtNum } from '../../../utils/formatters';
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

function TabGeral({ ativo, raw, pesoPct, isBTG, isAvenue, isAgora }: {
    ativo: ConsolidatedAtivo; raw: any; pesoPct: number;
    isBTG: boolean; isXP: boolean; isAvenue: boolean; isAgora: boolean;
}) {
    // ── Valores unificados ────────────────────────────────────────────────────
    const valorBruto = isAvenue ? raw.valor_bruto_brl : raw.valor_bruto;
    const valorLiquido = ativo.valorLiquido;
    const quantidade = raw.quantidade ?? raw.quantidade_cotas;
    const precoUnitario = raw.preco_mercado ?? raw.preco_unitario ?? raw.valor_cota;

    // ── Vencimento original da API + liquidez D+N ────────────────────────────
    const vencimentoOriginal = raw.maturity_date ?? raw.data_vencimento;
    const liquidezDmais = ativo.liquidez ? `D+${ativo.liquidez}` : null;
    const vencimentoLiquidezValue = vencimentoOriginal
        ? `${fmtDate(vencimentoOriginal)}${liquidezDmais ? ` · ${liquidezDmais}` : ''}`
        : (liquidezDmais ?? '—');

    // ── Data de emissão (só BTG entrega de fato) ──────────────────────────────
    const dataEmissao = raw.issue_date ?? null;

    // ── Tributação (isento/tributado) ────────────────────────────────────────
    const isento = !!(
        raw.tax_free === true ||
        raw.is_isento_ir === true ||
        (raw.ir_descricao && /isento|isent/i.test(String(raw.ir_descricao)))
    );

    // ── Identificadores (genéricos, mostra só os preenchidos) ─────────────────
    const identificadores: { label: string; value: string }[] = [];
    const pushId = (label: string, value: any) => {
        if (value != null && String(value).trim() !== '') {
            identificadores.push({ label, value: String(value) });
        }
    };
    pushId('Ticker',          raw.ticker);
    pushId('ISIN',            raw.isin);
    pushId('CETIP',           raw.cetip_code);
    pushId('SELIC',           raw.selic_code);
    pushId('CNPJ',            raw.cnpj ?? raw.fund_cnpj);
    pushId('CUSIP',           raw.cusip);
    pushId('Security Code',   raw.security_code);
    pushId('Código',          raw.codigo ?? raw.codigo_ativo);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* ── Posição Financeira ── */}
            <Secao titulo="Posição Financeira">
                {valorBruto != null && <DetalheItem label="Valor Bruto"        value={fmt(Number(valorBruto))} />}
                <DetalheItem label="Valor Líquido"                              value={fmt(valorLiquido)} highlight />
                {quantidade != null && <DetalheItem label="Quantidade"         value={fmtNum(Number(quantidade), 0)} />}
                {precoUnitario != null && <DetalheItem label="Preço Unitário (PU)" value={fmt(Number(precoUnitario))} />}
                <DetalheItem label="Peso na Carteira"                           value={`${fmtNum(pesoPct)}%`} highlight fullWidth />
            </Secao>

            {/* ── Rentabilidade ── */}
            <DrawerSeparator />
            <Secao titulo="Rentabilidade">
                <DetalheItem label="Taxa"        value={ativo.taxa ?? '—'} />
                <DetalheItem label="Tributação"  value={isento ? 'Isento' : 'Tributado'} accentColor={isento ? '#16a34a' : undefined} />
            </Secao>

            {/* ── Datas e Liquidez ── */}
            <DrawerSeparator />
            <Secao titulo="Datas e Liquidez">
                <DetalheItem label="Vencimento / Liquidez" value={vencimentoLiquidezValue} />
                <DetalheItem label="Data de Emissão"        value={dataEmissao ? fmtDate(dataEmissao) : '—'} />
            </Secao>

            {/* ── Info ── */}
            <DrawerSeparator />
            <Secao titulo="Info">
                <DetalheItem label="Classe Avere"  value={ativo.tipo || '—'} />
                <DetalheItem label="Subtipo"       value={ativo.subTipo || '—'} />
                {identificadores.map(id => (
                    <DetalheItem key={id.label} label={id.label} value={id.value} mono />
                ))}
            </Secao>
        </div>
    );
}

function TabBTG({ raw }: { raw: any }) {
    const acquisitions: any[] = raw.posicao_btg_aquisicoes || [];
    const schedules: any[]    = raw.posicao_btg_janelas_liquidez || [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* ── Identificação ── */}
            <Secao titulo="Identificação">
                {raw.ticker          && <DetalheItem label="Ticker"            value={raw.ticker}          mono />}
                {raw.isin            && <DetalheItem label="ISIN"              value={raw.isin}            mono />}
                {raw.cetip_code      && <DetalheItem label="CETIP"             value={raw.cetip_code}      mono />}
                {raw.selic_code      && <DetalheItem label="SELIC"             value={raw.selic_code}      mono />}
                {raw.codigo          && <DetalheItem label="Código"            value={raw.codigo}          mono />}
                {raw.security_code   && <DetalheItem label="Security Code"     value={raw.security_code}   mono />}
                {raw.fund_cnpj       && <DetalheItem label="CNPJ do Fundo"     value={raw.fund_cnpj}       mono fullWidth />}
                {raw.issuer_cge_code && <DetalheItem label="CGE do Emissor"    value={raw.issuer_cge_code} mono />}
                {raw.issuer_type     && <DetalheItem label="Tipo do Emissor"   value={raw.issuer_type} />}
                {raw.emissor         && <DetalheItem label="Emissor (API)"     value={raw.emissor}         fullWidth />}
            </Secao>

            {/* ── Classificação BTG ── */}
            <DrawerSeparator />
            <Secao titulo="Classificação (BTG)">
                {raw.asset_class        && <DetalheItem label="Asset Class"        value={raw.asset_class} />}
                {raw.tipo               && <DetalheItem label="Tipo"               value={raw.tipo} />}
                {raw.sub_tipo           && <DetalheItem label="Sub-tipo"           value={raw.sub_tipo} />}
                {raw.sector_description && <DetalheItem label="Setor"              value={raw.sector_description} fullWidth />}
            </Secao>

            {/* ── Posição & Tributação detalhada ── */}
            <DrawerSeparator />
            <Secao titulo="Posição & Impostos">
                {raw.valor_bruto       != null && <DetalheItem label="Valor Bruto"       value={fmt(Number(raw.valor_bruto))} />}
                {raw.valor_liquido     != null && <DetalheItem label="Valor Líquido"     value={fmt(Number(raw.valor_liquido))} />}
                {raw.quantidade        != null && <DetalheItem label="Quantidade"        value={fmtNum(Number(raw.quantidade), 0)} />}
                {raw.preco_mercado     != null && raw.preco_mercado > 0 && <DetalheItem label="Preço Unitário (PU)" value={fmt(Number(raw.preco_mercado))} />}
                {raw.ir                != null && raw.ir > 0           && <DetalheItem label="IR Estimado"          value={fmt(Number(raw.ir))}                accentColor="#EF4444" />}
                {raw.iof_tax           != null && raw.iof_tax > 0      && <DetalheItem label="IOF"                  value={fmt(Number(raw.iof_tax))}           accentColor="#EF4444" />}
                {raw.price_income_tax  != null && raw.price_income_tax > 0 && <DetalheItem label="PU c/ IR descontado" value={fmt(Number(raw.price_income_tax))} />}
                {raw.price_virtual_iof != null && raw.price_virtual_iof > 0 && <DetalheItem label="PU c/ IOF virtual"  value={fmt(Number(raw.price_virtual_iof))} />}
            </Secao>

            {/* ── Rentabilidade ── */}
            {(raw.rentabilidade || raw.benchmark || raw.yield_avg != null) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Rentabilidade (BTG)">
                        {raw.rentabilidade && <DetalheItem label="Rentabilidade"     value={String(raw.rentabilidade)} />}
                        {raw.benchmark     && <DetalheItem label="Benchmark"         value={String(raw.benchmark)} />}
                        {raw.yield_avg != null && <DetalheItem label="Cupom (Yield Médio)" value={`${fmtNum(Number(raw.yield_avg))}%`} />}
                    </Secao>
                </>
            )}

            {/* ── Datas ── */}
            {(raw.issue_date || raw.maturity_date) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Datas">
                        {raw.issue_date    && <DetalheItem label="Data de Emissão"   value={fmtDate(raw.issue_date)} />}
                        {raw.maturity_date && <DetalheItem label="Vencimento"        value={fmtDate(raw.maturity_date)} />}
                    </Secao>
                </>
            )}

            {/* ── Características ── */}
            <DrawerSeparator />
            <Secao titulo="Características">
                <DetalheItem label="Isento de IR"     value={raw.tax_free     ? 'Sim' : 'Não'} accentColor={raw.tax_free     ? '#16a34a' : undefined} />
                <DetalheItem label="Liquidez Imediata" value={raw.is_liquidity ? 'Sim' : 'Não'} accentColor={raw.is_liquidity ? '#0083CB' : undefined} />
                <DetalheItem label="Operação Repo"    value={raw.is_repo      ? 'Sim' : 'Não'} />
                <DetalheItem label="FII"              value={raw.is_fii       ? 'Sim' : 'Não'} />
            </Secao>

            {/* ── Fundo (se aplicável) ── */}
            {(raw.fund_manager || raw.fund_liquidity_days != null) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Fundo">
                        {raw.fund_manager        && <DetalheItem label="Gestor"            value={raw.fund_manager} fullWidth />}
                        {raw.fund_liquidity_days != null && <DetalheItem label="Dias de Liquidez" value={String(raw.fund_liquidity_days)} />}
                    </Secao>
                </>
            )}

            {/* ── Janelas de Liquidez Antecipada ── */}
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

            {/* ── Histórico de Aquisições ── */}
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
    const isCoe = raw.tipo_certificado || raw.cenario_base || raw.cenario_pessimista;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* ── Identificação ── */}
            <Secao titulo="Identificação">
                {raw.ticker        && <DetalheItem label="Ticker"        value={raw.ticker}        mono />}
                {raw.isin          && <DetalheItem label="ISIN"          value={raw.isin}          mono />}
                {raw.cnpj          && <DetalheItem label="CNPJ"          value={raw.cnpj}          mono fullWidth />}
                {raw.codigo_ativo  && <DetalheItem label="Código Ativo"  value={raw.codigo_ativo}  mono />}
                {raw.emissor       && <DetalheItem label="Emissor (API)" value={raw.emissor}       fullWidth />}
            </Secao>

            {/* ── Classificação XP ── */}
            <DrawerSeparator />
            <Secao titulo="Classificação (XP)">
                {raw.asset_class && <DetalheItem label="Asset Class"  value={raw.asset_class} />}
                {raw.tipo        && <DetalheItem label="Tipo"         value={raw.tipo} />}
                {raw.sub_tipo    && <DetalheItem label="Sub-tipo"     value={raw.sub_tipo} />}
                {raw.nome        && <DetalheItem label="Nome (API)"   value={raw.nome} fullWidth />}
            </Secao>

            {/* ── Valores ── */}
            <DrawerSeparator />
            <Secao titulo="Valores">
                {raw.valor_aplicado     != null && <DetalheItem label="Valor Aplicado"       value={fmt(Number(raw.valor_aplicado))} />}
                {raw.valor_bruto        != null && <DetalheItem label="Valor Bruto"          value={fmt(Number(raw.valor_bruto))} />}
                {raw.valor_liquido      != null && <DetalheItem label="Valor Líquido"        value={fmt(Number(raw.valor_liquido))} />}
                {raw.valor_rendimento   != null && <DetalheItem label="Rendimento"           value={fmt(Number(raw.valor_rendimento))} accentColor="#16a34a" />}
                {raw.resultado          != null && <DetalheItem label="Resultado"            value={fmt(Number(raw.resultado))} accentColor={Number(raw.resultado) >= 0 ? '#16a34a' : '#EF4444'} />}
                {raw.resultado_percentual != null && <DetalheItem label="Resultado %"         value={`${fmtNum(Number(raw.resultado_percentual))}%`} />}
                {raw.valor_imposto_renda != null && raw.valor_imposto_renda > 0 && <DetalheItem label="IR"                value={fmt(Number(raw.valor_imposto_renda))} accentColor="#EF4444" />}
                {raw.valor_iof           != null && raw.valor_iof > 0           && <DetalheItem label="IOF"               value={fmt(Number(raw.valor_iof))}           accentColor="#EF4444" />}
            </Secao>

            {/* ── Quantidades e Preços ── */}
            {(raw.quantidade != null || raw.preco_unitario != null || raw.preco_medio != null || raw.valor_cota != null || raw.quantidade_cotas != null) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Quantidades e Preços">
                        {raw.quantidade       != null && <DetalheItem label="Quantidade"      value={fmtNum(Number(raw.quantidade), 0)} />}
                        {raw.preco_unitario   != null && <DetalheItem label="Preço Unitário"  value={fmt(Number(raw.preco_unitario))} />}
                        {raw.preco_medio      != null && <DetalheItem label="Preço Médio"     value={fmt(Number(raw.preco_medio))} />}
                        {raw.valor_cota       != null && <DetalheItem label="Valor da Cota"   value={fmt(Number(raw.valor_cota))} />}
                        {raw.quantidade_cotas != null && <DetalheItem label="Qtd. de Cotas"   value={fmtNum(Number(raw.quantidade_cotas), 4)} />}
                    </Secao>
                </>
            )}

            {/* ── Indexação ── */}
            {(raw.indexador || raw.benchmark || raw.percentual_indexador != null) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Indexação">
                        {raw.indexador            && <DetalheItem label="Indexador"          value={String(raw.indexador)} />}
                        {raw.benchmark            && <DetalheItem label="Benchmark"          value={String(raw.benchmark)} />}
                        {raw.percentual_indexador != null && <DetalheItem label="% Indexador" value={`${fmtNum(Number(raw.percentual_indexador))}%`} />}
                    </Secao>
                </>
            )}

            {/* ── Datas ── */}
            {(raw.data_vencimento || raw.data_aplicacao || raw.data_adesao || raw.data_posicao) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Datas">
                        {raw.data_aplicacao  && <DetalheItem label="Data de Aplicação" value={fmtDate(raw.data_aplicacao)} />}
                        {raw.data_adesao     && <DetalheItem label="Data de Adesão"    value={fmtDate(raw.data_adesao)} />}
                        {raw.data_vencimento && <DetalheItem label="Vencimento"        value={fmtDate(raw.data_vencimento)} />}
                        {raw.data_posicao    && <DetalheItem label="Data da Posição"   value={fmtDate(raw.data_posicao)} />}
                    </Secao>
                </>
            )}

            {/* ── Períodos (fundos) ── */}
            {(raw.periodo_cotizacao || raw.periodo_liquidacao) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Períodos do Fundo">
                        {raw.periodo_cotizacao  && <DetalheItem label="Cotização"   value={String(raw.periodo_cotizacao)} />}
                        {raw.periodo_liquidacao && <DetalheItem label="Liquidação"  value={String(raw.periodo_liquidacao)} />}
                    </Secao>
                </>
            )}

            {/* ── Características ── */}
            <DrawerSeparator />
            <Secao titulo="Características">
                <DetalheItem label="Isento de IR"      value={raw.is_isento_ir ? 'Sim' : 'Não'} accentColor={raw.is_isento_ir ? '#16a34a' : undefined} />
                <DetalheItem label="Liquidez Imediata" value={raw.is_liquidity ? 'Sim' : 'Não'} accentColor={raw.is_liquidity ? '#0083CB' : undefined} />
            </Secao>

            {/* ── COE específico ── */}
            {isCoe && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="COE">
                        {raw.tipo_certificado     && <DetalheItem label="Tipo de Certificado" value={String(raw.tipo_certificado)} fullWidth />}
                        {raw.cenario_base         && <DetalheItem label="Cenário Base"        value={String(raw.cenario_base)} fullWidth />}
                        {raw.cenario_pessimista   && <DetalheItem label="Cenário Pessimista"  value={String(raw.cenario_pessimista)} fullWidth />}
                        {raw.barreira_crescimento != null && <DetalheItem label="Barreira de Crescimento" value={`${fmtNum(Number(raw.barreira_crescimento))}%`} />}
                    </Secao>
                </>
            )}
        </div>
    );
}

function TabAvenue({ raw }: { raw: any }) {
    const usd  = raw.valor_bruto_usd != null ? Number(raw.valor_bruto_usd) : null;
    const brl  = raw.valor_bruto_brl != null ? Number(raw.valor_bruto_brl) : null;
    const cot  = (usd != null && usd > 0 && brl != null) ? (brl / usd) : null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Secao titulo="Identificação">
                {raw.ticker       && <DetalheItem label="Ticker / Símbolo" value={raw.ticker}        mono />}
                {raw.cusip        && <DetalheItem label="CUSIP"             value={raw.cusip}        mono />}
                {raw.isin         && <DetalheItem label="ISIN"              value={raw.isin}         mono />}
                {raw.product_type && <DetalheItem label="Tipo (Avenue)"     value={raw.product_type} />}
                {raw.office_name  && <DetalheItem label="Escritório"        value={raw.office_name}  fullWidth />}
            </Secao>

            {(usd != null || brl != null) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Valores na Moeda Original (USD)">
                        {usd != null && <DetalheItem label="Posição (USD)"  value={fmtUsd(usd)} highlight accentColor="#0083CB" />}
                        {brl != null && <DetalheItem label="Equivalente em BRL" value={fmt(brl)} />}
                        {cot != null && <DetalheItem label="Cotação Implícita" value={`R$ ${cot.toFixed(4)}`} />}
                    </Secao>
                </>
            )}

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

function AquisicaoCardAgora({ acq }: { acq: any }) {
    const isTd = acq.tipo_aquisicao === 'TESOURO_DIRETO';
    return (
        <div style={{
            background: 'rgba(21,128,61,0.05)', border: '1px solid rgba(21,128,61,0.12)',
            borderRadius: '10px', padding: '14px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
        }}>
            <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '10px', opacity: 0.4, textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>
                    {isTd ? 'Data de Compra' : 'Data do Certificado'}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#15803D' }}>
                    {fmtDate(acq.application_date)}
                    {isTd && acq.days != null && (
                        <span style={{ fontSize: '11px', marginLeft: '8px', opacity: 0.6, fontWeight: 500 }}>· {acq.days} dias atrás</span>
                    )}
                </div>
            </div>
            {acq.quantity != null && <DetalheItem label="Quantidade" value={fmtNum(acq.quantity, isTd ? 0 : 0)} />}
            {acq.purchase_price != null && <DetalheItem label="Preço de Compra" value={fmt(acq.purchase_price)} />}
            {acq.market_price != null && <DetalheItem label="Preço Atual (PU)" value={fmt(acq.market_price)} />}
            {acq.gross_value != null && <DetalheItem label={isTd ? "Posição (Bruto)" : "Bruto"} value={fmt(acq.gross_value)} />}
            {acq.net_value != null && <DetalheItem label="Líquido" value={fmt(acq.net_value)} highlight />}
            {acq.profit_value != null && <DetalheItem label="Lucro Acumulado" value={fmt(acq.profit_value)} accentColor="#16a34a" />}
            {acq.tax_rate != null && <DetalheItem label="Taxa Contratada" value={`${fmtNum(acq.tax_rate)}% a.a.`} accentColor="#0083CB" />}
            {acq.ir_value != null && acq.ir_value > 0 && <DetalheItem label="IR" value={fmt(acq.ir_value)} accentColor="#EF4444" />}
            {acq.iof_value != null && acq.iof_value > 0 && <DetalheItem label="IOF" value={fmt(acq.iof_value)} accentColor="#EF4444" />}
            {acq.operation_status && <DetalheItem label="Status" value={acq.operation_status} />}
        </div>
    );
}

function TabAgora({ raw }: { raw: any }) {
    const acquisitions: any[] = raw.posicao_agora_aquisicoes || [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* ── Identificação ── */}
            <Secao titulo="Identificação">
                {raw.ticker        && <DetalheItem label="Ticker"        value={raw.ticker}        mono />}
                {raw.security_code && <DetalheItem label="Security Code" value={raw.security_code} mono />}
                {raw.emissor       && <DetalheItem label="Emissor (API)" value={raw.emissor}       fullWidth />}
            </Secao>

            {/* ── Classificação Ágora ── */}
            <DrawerSeparator />
            <Secao titulo="Classificação (Ágora)">
                {raw.asset_class     && <DetalheItem label="Asset Class"     value={raw.asset_class} />}
                {raw.tipo            && <DetalheItem label="Tipo"            value={raw.tipo} />}
                {raw.sub_tipo        && <DetalheItem label="Sub-tipo"        value={raw.sub_tipo} />}
                {raw.instrument_type && <DetalheItem label="Instrument Type" value={raw.instrument_type} />}
            </Secao>

            {/* ── Posição & Performance ── */}
            <DrawerSeparator />
            <Secao titulo="Posição & Performance">
                {raw.valor_bruto         != null && <DetalheItem label="Valor Bruto"           value={fmt(Number(raw.valor_bruto))} />}
                {raw.valor_liquido       != null && <DetalheItem label="Valor Líquido"         value={fmt(Number(raw.valor_liquido))} />}
                {raw.custo               != null && <DetalheItem label="Custo"                 value={fmt(Number(raw.custo))} />}
                {raw.custo_total         != null && <DetalheItem label="Custo Total"           value={fmt(Number(raw.custo_total))} />}
                {raw.quantidade          != null && <DetalheItem label="Quantidade"            value={fmtNum(Number(raw.quantidade), 0)} />}
                {raw.preco_unitario      != null && <DetalheItem label="Preço Unitário"        value={fmt(Number(raw.preco_unitario))} />}
                {raw.preco_mercado       != null && <DetalheItem label="Preço de Mercado"      value={fmt(Number(raw.preco_mercado))} />}
                {raw.percentual_patrimonio != null && <DetalheItem label="% do Patrimônio"     value={`${fmtNum(Number(raw.percentual_patrimonio))}%`} />}
                {raw.valorizacao_reais   != null && <DetalheItem label="Valorização (R$)"      value={fmt(Number(raw.valorizacao_reais))}     accentColor={Number(raw.valorizacao_reais) >= 0 ? '#16a34a' : '#EF4444'} />}
                {raw.valorizacao_pct     != null && <DetalheItem label="Valorização %"         value={`${fmtNum(Number(raw.valorizacao_pct))}%`}     accentColor={Number(raw.valorizacao_pct) >= 0 ? '#16a34a' : '#EF4444'} />}
                {raw.valorizacao         != null && <DetalheItem label="Valorização (detalhe)" value={fmt(Number(raw.valorizacao))} />}
                {raw.percent_valorizacao != null && <DetalheItem label="% Valorização"         value={`${fmtNum(Number(raw.percent_valorizacao))}%`} />}
            </Secao>

            {/* ── Rentabilidade / Taxa ── */}
            {(raw.taxa || raw.taxa_percentual != null || raw.indexer_percentual != null) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Rentabilidade (Ágora)">
                        {raw.taxa               && <DetalheItem label="Taxa"             value={String(raw.taxa)} />}
                        {raw.taxa_percentual    != null && <DetalheItem label="Taxa %"             value={`${fmtNum(Number(raw.taxa_percentual))}%`} />}
                        {raw.indexer_percentual != null && <DetalheItem label="% do Indexador"     value={`${fmtNum(Number(raw.indexer_percentual))}%`} />}
                    </Secao>
                </>
            )}

            {/* ── Tributação ── */}
            {(raw.ir_descricao || raw.ir_percentual || raw.ir_valor != null || raw.iof_valor != null) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Tributação">
                        {raw.ir_descricao  && <DetalheItem label="Tipo de IR"  value={String(raw.ir_descricao)} fullWidth />}
                        {raw.ir_percentual && <DetalheItem label="Alíquota IR" value={`${String(raw.ir_percentual)}%`} accentColor="#EF4444" />}
                        {raw.ir_valor      != null && raw.ir_valor > 0  && <DetalheItem label="IR"  value={fmt(Number(raw.ir_valor))}  accentColor="#EF4444" />}
                        {raw.iof_valor     != null && raw.iof_valor > 0 && <DetalheItem label="IOF" value={fmt(Number(raw.iof_valor))} accentColor="#EF4444" />}
                    </Secao>
                </>
            )}

            {/* ── Datas e Características ── */}
            {(raw.data_vencimento || raw.data_aplicacao || raw.liquidez_diaria != null) && (
                <>
                    <DrawerSeparator />
                    <Secao titulo="Datas e Liquidez">
                        {raw.data_aplicacao  && <DetalheItem label="Data de Aplicação"  value={fmtDate(raw.data_aplicacao)} />}
                        {raw.data_vencimento && <DetalheItem label="Vencimento"         value={fmtDate(raw.data_vencimento)} />}
                        {raw.liquidez_diaria != null && <DetalheItem label="Liquidez Diária" value={raw.liquidez_diaria ? 'Sim' : 'Não'} accentColor={raw.liquidez_diaria ? '#0083CB' : undefined} />}
                    </Secao>
                </>
            )}

            {acquisitions.length > 0 && (
                <>
                    <DrawerSeparator />
                    <section>
                        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '12px' }}>
                            Histórico de Aplicações ({acquisitions.length})
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {acquisitions
                                .slice()
                                .sort((a, b) => (b.application_date ?? '').localeCompare(a.application_date ?? ''))
                                .map((acq: any, i: number) => (
                                    <AquisicaoCardAgora key={i} acq={acq} />
                                ))}
                        </div>
                    </section>
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
    // Base da instituição (resiste a rótulos multi-conta tipo "BTG Pactual 2").
    // Fallback por nome para snapshots antigos sem instituicaoBase.
    const base = ativo.instituicaoBase
        ?? (instituicao.includes('BTG') ? 'BTG'
            : instituicao.includes('XP') ? 'XP'
            : instituicao.includes('Avenue') ? 'AVENUE'
            : /[ÁA]gora/.test(instituicao) ? 'AGORA' : 'MANUAL');
    const isBTG    = base === 'BTG';
    const isXP     = base === 'XP';
    const isAvenue = base === 'AVENUE';
    const isAgora  = base === 'AGORA';

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
