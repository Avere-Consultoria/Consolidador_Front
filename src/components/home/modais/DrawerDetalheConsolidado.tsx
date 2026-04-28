import React from 'react';
import {
    Drawer, DrawerContent, DrawerHeader, DrawerBody,
    DrawerTitle, DrawerDescription, DrawerSeparator,
    Badge, Typography
} from 'avere-ui';
import type { ConsolidatedAtivo } from '../../../hooks/useHomeMetrics';

// Helpers de formatação
const fmt = (v?: number | null) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
const fmtDate = (d?: string | null) => d ? new Date(d).toLocaleDateString('pt-BR') : '-';
const fmtNum = (v?: number | null, decimais = 2) => v != null ? v.toLocaleString('pt-BR', { minimumFractionDigits: decimais, maximumFractionDigits: decimais }) : '-';

function DetalheItem({ label, value, highlight = false, mono = false, fullWidth = false }: { label: string; value: string; highlight?: boolean; mono?: boolean; fullWidth?: boolean; }) {
    return (
        <div style={{ background: 'rgba(0,131,203,0.05)', borderRadius: '8px', padding: '10px 12px', gridColumn: fullWidth ? '1 / -1' : undefined }}>
            <div style={{ fontSize: '11px', opacity: 0.45, marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '14px', fontWeight: highlight ? 700 : 500, wordBreak: 'break-all', color: highlight ? 'var(--color-primaria, #0083CB)' : 'inherit', fontFamily: mono ? 'monospace' : 'inherit' }}>
                {value}
            </div>
        </div>
    );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
    return (
        <section style={{ marginBottom: '4px' }}>
            <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '10px', letterSpacing: '0.05em' }}>{titulo}</Typography>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>{children}</div>
        </section>
    );
}

interface DrawerDetalheConsolidadoProps {
    ativo: ConsolidatedAtivo;
    aberto: boolean;
    onClose: (aberto: boolean) => void;
    patrimonioTotal: number;
}

export function DrawerDetalheConsolidado({ ativo, aberto, onClose, patrimonioTotal }: DrawerDetalheConsolidadoProps) {
    // Se o drawer tentar abrir sem ativo ou sem os dados raw, evitamos crash
    if (!ativo || !ativo.rawData) return null;

    const raw = ativo.rawData;
    const isBTG = ativo.instituicao === 'BTG Pactual';

    // Extração inteligente baseada na fonte (BTG vs XP)
    const valorBruto = isBTG ? raw.valor_bruto : raw.valor_liquido;
    const ir = raw.ir || 0;
    const quantidade = raw.quantidade;
    const precoMercado = raw.preco_mercado;
    const rentabilidade = raw.rentabilidade || '-';
    const benchmark = raw.benchmark || '-';
    const dataEmissao = raw.issue_date;
    const ticker = raw.ticker;
    const isin = raw.isin;
    const codigoCetip = raw.cetip_code;
    const cnpjFundo = isBTG ? raw.fund_cnpj : raw.cnpj;

    const pesoPct = patrimonioTotal > 0 ? (ativo.valorLiquido / patrimonioTotal) * 100 : 0;

    const acquisitions = isBTG ? (raw.posicao_btg_aquisicoes || []) : [];
    const schedules = isBTG ? (raw.posicao_btg_janelas_liquidez || []) : [];

    return (
        <Drawer open={aberto} onOpenChange={onClose}>
            <DrawerContent side="right">

                <DrawerHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <Badge intent={isBTG ? "primaria" : "secundaria"} variant="solid" style={{ fontSize: '12px' }}>
                            {ativo.instituicao}
                        </Badge>
                        {ativo.subTipo && (
                            <Badge variant="outline" style={{ fontSize: '12px' }}>{ativo.subTipo}</Badge>
                        )}
                        {raw.tax_free && (
                            <Badge intent="primaria" variant="ghost" style={{ fontSize: '12px' }}>Isento IR</Badge>
                        )}
                        {raw.is_liquidity && (
                            <Badge intent="primaria" variant="ghost" style={{ fontSize: '12px' }}>Liquidez</Badge>
                        )}
                    </div>
                    <DrawerTitle>{ativo.nome}</DrawerTitle>
                    <DrawerDescription>{ativo.tipo} {ticker && ` · ${ticker}`}</DrawerDescription>
                </DrawerHeader>

                <DrawerBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        <Secao titulo="Posição">
                            <DetalheItem label="Valor Líquido Atual" value={fmt(ativo.valorLiquido)} highlight />
                            <DetalheItem label="Peso na Carteira" value={`${fmtNum(pesoPct)}%`} highlight />
                            <DetalheItem label="Valor Bruto" value={fmt(valorBruto)} />
                            {ir > 0 && <DetalheItem label="IR Estimado" value={fmt(ir)} />}
                            {raw.iof_tax > 0 && <DetalheItem label="IOF" value={fmt(raw.iof_tax)} />}
                            {quantidade != null && <DetalheItem label="Quantidade / Títulos" value={fmtNum(quantidade, 0)} />}
                            {precoMercado > 0 && <DetalheItem label="Preço Unitário (PU)" value={fmt(precoMercado)} />}
                        </Secao>

                        <DrawerSeparator />

                        <Secao titulo="Rentabilidade">
                            <DetalheItem label="Taxa" value={rentabilidade} />
                            <DetalheItem label="Benchmark" value={benchmark} />
                            {raw.yield_avg != null && <DetalheItem label="Cupom (Yield Médio)" value={`${fmtNum(raw.yield_avg)}%`} />}
                        </Secao>

                        {(dataEmissao || ativo.vencimento || ativo.liquidez) && (
                            <>
                                <DrawerSeparator />
                                <Secao titulo="Datas e Liquidez">
                                    {ativo.liquidez && <DetalheItem label="Liquidez" value={`D+${ativo.liquidez}`} />}
                                    {dataEmissao && <DetalheItem label="Data de Emissão" value={fmtDate(dataEmissao)} />}
                                    {ativo.vencimento && <DetalheItem label="Vencimento" value={fmtDate(ativo.vencimento)} />}
                                </Secao>
                            </>
                        )}

                        {(ticker || isin || codigoCetip || cnpjFundo) && (
                            <>
                                <DrawerSeparator />
                                <Secao titulo="Identificação">
                                    {ticker && <DetalheItem label="Ticker" value={ticker} mono />}
                                    {codigoCetip && <DetalheItem label="Código CETIP" value={codigoCetip} mono />}
                                    {isin && <DetalheItem label="ISIN" value={isin} mono />}
                                    {cnpjFundo && <DetalheItem label="CNPJ do Fundo" value={cnpjFundo} mono fullWidth />}
                                </Secao>
                            </>
                        )}

                        {schedules.length > 0 && (
                            <>
                                <DrawerSeparator />
                                <section>
                                    <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '12px' }}>
                                        Janelas de Liquidez Antecipada
                                    </Typography>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {schedules.map((s: any, i: number) => (
                                            <div key={i} style={{ background: 'rgba(0,131,203,0.05)', borderRadius: '8px', padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                                                <div>
                                                    <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Tipo</div>
                                                    <div style={{ fontSize: '13px', fontWeight: 500 }}>{s.type || '-'}</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>De</div>
                                                    <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmtDate(s.from_date)}</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Até</div>
                                                    <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmtDate(s.to_date)}</div>
                                                </div>
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
                                    <Typography variant="p" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '12px' }}>
                                        Histórico de Aquisições ({acquisitions.length})
                                    </Typography>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {acquisitions.map((acq: any, i: number) => (
                                            <div key={i} style={{ background: 'rgba(0,131,203,0.05)', border: '1px solid rgba(0,131,203,0.1)', borderRadius: '10px', padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                                <div style={{ gridColumn: '1 / -1' }}>
                                                    <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Data de Compra</div>
                                                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primaria)' }}>{fmtDate(acq.acquisition_date)}</div>
                                                </div>
                                                {acq.initial_investment_value != null && (
                                                    <div>
                                                        <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Investido</div>
                                                        <div style={{ fontSize: '13px', fontWeight: 500 }}>{fmt(acq.initial_investment_value)}</div>
                                                    </div>
                                                )}
                                                {acq.net_value != null && (
                                                    <div>
                                                        <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Líquido Atual</div>
                                                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primaria)' }}>{fmt(acq.net_value)}</div>
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