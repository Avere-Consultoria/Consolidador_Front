import { useState, useEffect } from 'react';
import {
    Wallet, RefreshCw, LayoutGrid, Calendar,
    Globe, BarChart3, ChevronRight
} from 'lucide-react';
import {
    Card, CardContent, Typography, Badge,
    Button, Spinner, DataTable,
    Drawer, DrawerContent, DrawerHeader, DrawerBody,
    DrawerTitle, DrawerDescription, DrawerSeparator,
} from 'avere-ui';

import { useClient } from '../contexts/ClientContext';
import { supabase } from '../services/supabase';
import { DetalheItem, Secao } from '../components/shared/DrawerDetalhe';
import { fmt, fmtDate, fmtNum } from '../utils/formatters';

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────

interface AtivoExtraAvenue {
    assetType?: string | null;
    currency?: string | null;
    officeName?: string | null;
}

interface AvereAtivo {
    tipo?: string;
    subTipo?: string;
    emissor?: string;
    codigo?: string;
    ticker?: string;
    valorLiquido: number;
    valorBruto: number;
    quantidade?: number | null;
    precoMercado?: number | null;
    vencimento?: string | null;
    isLiquidity?: boolean;
    extra?: AtivoExtraAvenue;
    _uniqueId?: string;
}

interface AverePortfolio {
    patrimonioTotal: number;
    dataReferencia: string;
    ativos: AvereAtivo[];
    alocacao: { classe: string; valor: number }[];
}


// ─────────────────────────────────────────────────────────────────────────────
// Drawer de Detalhes
// ─────────────────────────────────────────────────────────────────────────────

const AVENUE_COLOR = '#f97316';

function DrawerDetalhes({ ativo, aberto, onClose }: {
    ativo: AvereAtivo;
    aberto: boolean;
    onClose: (v: boolean) => void;
}) {
    return (
        <Drawer open={aberto} onOpenChange={onClose}>
            <DrawerContent side="right">
                <DrawerHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <Badge intent="primaria" variant="solid" style={{ fontSize: '12px', background: '#f97316' }}>
                            {ativo.subTipo || 'Ativo Internacional'}
                        </Badge>
                        {ativo.isLiquidity && <Badge variant="ghost" style={{ fontSize: '12px' }}>Liquidez Imediata</Badge>}
                    </div>
                    <DrawerTitle>{ativo.emissor}</DrawerTitle>
                    <DrawerDescription>{ativo.ticker || 'Símbolo não disponível'}</DrawerDescription>
                </DrawerHeader>

                <DrawerBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Secao titulo="Valores Atuais">
                            <DetalheItem accentColor={AVENUE_COLOR} label="Valor de Mercado (BRL)" value={fmt(ativo.valorBruto)} highlight />
                            <DetalheItem accentColor={AVENUE_COLOR} label="Quantidade" value={fmtNum(ativo.quantidade, 4)} />
                        </Secao>

                        <DrawerSeparator />

                        <Secao titulo="Informações Adicionais">
                            <DetalheItem accentColor={AVENUE_COLOR} label="Tipo de Produto" value={ativo.subTipo || '-'} />
                            <DetalheItem accentColor={AVENUE_COLOR} label="Moeda" value="USD" />
                            {ativo.vencimento && <DetalheItem accentColor={AVENUE_COLOR} label="Vencimento" value={fmtDate(ativo.vencimento)} />}
                        </Secao>

                        <DrawerSeparator />

                        <Secao titulo="Identificação">
                            <DetalheItem accentColor={AVENUE_COLOR} label="Ticker / Symbol" value={ativo.ticker || '-'} mono />
                            {ativo.extra?.officeName && <DetalheItem accentColor={AVENUE_COLOR} label="Escritório" value={ativo.extra.officeName} fullWidth />}
                        </Secao>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Página Principal
// ─────────────────────────────────────────────────────────────────────────────

export default function AvenueApi() {
    const { selectedClient } = useClient();
    const [portfolioData, setPortfolioData] = useState<AverePortfolio | null>(null);
    const [loading, setLoading] = useState(false);
    const [ativoSelecionado, setAtivoSelecionado] = useState<AvereAtivo | null>(null);
    const [drawerAberto, setDrawerAberto] = useState(false);

    async function checkExistingSnapshot() {
        if (!selectedClient?.id) return;
        setLoading(true);
        console.log("Buscando último snapshot para o cliente:", selectedClient.nome);

        try {
            const { data: snapshot, error } = await supabase
                .from('posicao_avenue_snapshots')
                .select(`
                    id, patrimonio_total, data_referencia, 
                    saldo_caixa, saldo_rf, saldo_rv, saldo_fundos, saldo_cripto, saldo_outros,
                    posicao_avenue_ativos (
                        id, tipo, sub_tipo, nome, ticker, 
                        valor_bruto_brl, valor_bruto_usd,
                        quantidade, maturity_date, is_liquidity, office_name
                    )
                `)
                .eq('cliente_id', selectedClient.id)
                .order('data_referencia', { ascending: false }) // Pega o mais recente independente da data
                .limit(1)
                .maybeSingle();

            if (error) {
                console.error("Erro na query:", error);
                throw error;
            }

            if (!snapshot) {
                console.warn("Nenhum snapshot encontrado no banco para este cliente.");
                setPortfolioData(null);
                return;
            }

            console.log("Snapshot encontrado:", snapshot);

            setPortfolioData({
                patrimonioTotal: snapshot.patrimonio_total,
                dataReferencia: snapshot.data_referencia,
                alocacao: [
                    { classe: 'Caixa (USD)', valor: snapshot.saldo_caixa || 0 },
                    { classe: 'Renda Fixa', valor: snapshot.saldo_rf || 0 },
                    { classe: 'Renda Variável', valor: snapshot.saldo_rv || 0 },
                    { classe: 'Fundos', valor: snapshot.saldo_fundos || 0 },
                    { classe: 'Criptomoedas', valor: snapshot.saldo_cripto || 0 },
                    { classe: 'Outros', valor: snapshot.saldo_outros || 0 },
                ].filter(a => a.valor > 0),
                ativos: (snapshot.posicao_avenue_ativos || []).map((a: any, idx: number) => ({
                    tipo: a.tipo,
                    subTipo: a.sub_tipo,
                    emissor: a.nome,
                    ticker: a.ticker,
                    valorBruto: a.valor_bruto_brl,
                    valorLiquido: a.valor_bruto_brl,
                    quantidade: a.quantidade,
                    vencimento: a.maturity_date,
                    isLiquidity: a.is_liquidity,
                    extra: {
                        assetType: a.sub_tipo,
                        currency: 'USD',
                        officeName: a.office_name
                    },
                    _uniqueId: `db-ave-${idx}`,
                })),
            });
        } catch (err) {
            console.error("Erro ao processar dados do snapshot:", err);
            setPortfolioData(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleFetch() {
        if (!selectedClient?.id) return;
        setLoading(true);
        try {
            console.log("Disparando Edge Function...");
            const { data, error } = await supabase.functions.invoke('get-avenue-position', {
                body: { clientId: selectedClient.id },
            });

            if (error) throw new Error(error.message);

            console.log("Resposta da API:", data);

            setPortfolioData({
                ...data,
                ativos: (data.ativos || []).map((a: any, idx: number) => ({
                    ...a,
                    _uniqueId: `api-ave-${idx}`,
                })),
            });

        } catch (err) {
            console.error("Erro no handleFetch:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkExistingSnapshot();
    }, [selectedClient]);

    const ativosAgrupados = portfolioData?.ativos?.reduce((acc, ativo) => {
        const tipo = ativo.tipo || 'Outros';
        if (!acc[tipo]) acc[tipo] = [];
        acc[tipo].push(ativo);
        return acc;
    }, {} as Record<string, AvereAtivo[]>) || {};

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <header style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                borderBottom: '1px solid var(--color-borda)', paddingBottom: '24px',
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Typography variant="h1">{selectedClient?.nome || 'Selecionar Cliente'}</Typography>
                        {portfolioData && (
                            <Badge intent="primaria" variant="ghost" style={{ color: '#f97316', borderColor: '#f97316' }}>
                                <Calendar size={14} style={{ marginRight: 6 }} />
                                Ref: {fmtDate(portfolioData.dataReferencia)}
                            </Badge>
                        )}
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Posição Internacional Avenue Securities</Typography>
                </div>
                {selectedClient?.id && (
                    <Button onClick={handleFetch} disabled={loading} style={{ background: '#f97316' }}>
                        {loading ? <Spinner size="sm" /> : <RefreshCw size={18} />} Atualizar Posição
                    </Button>
                )}
            </header>

            {loading && !portfolioData ? (
                <div style={{ padding: '100px 0', textAlign: 'center' }}>
                    <Spinner />
                    <Typography variant="p" style={{ marginTop: '16px', opacity: 0.5 }}>Carregando dados internacionais...</Typography>
                </div>
            ) : portfolioData ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <Card style={{ borderLeft: '4px solid #f97316' }}>
                        <CardContent style={{ padding: '24px' }}>
                            <Typography variant="p" style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700 }}>
                                Patrimônio Global (Convertido BRL)
                            </Typography>
                            <Typography variant="h2" style={{ color: '#f97316', fontWeight: 800, fontSize: '36px' }}>
                                {fmt(portfolioData.patrimonioTotal)}
                            </Typography>
                        </CardContent>
                    </Card>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                        {portfolioData.alocacao.map((aloc) => (
                            <Card key={aloc.classe}>
                                <CardContent style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6, marginBottom: '8px' }}>
                                        {aloc.classe.includes('Caixa') ? <Wallet size={16} /> : <BarChart3 size={16} />}
                                        <Typography variant="p" style={{ fontSize: '12px', fontWeight: 600 }}>{aloc.classe}</Typography>
                                    </div>
                                    <Typography variant="h2" style={{ fontSize: '20px', fontWeight: 700 }}>
                                        {fmt(aloc.valor)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '16px' }}>
                        {Object.entries(ativosAgrupados).map(([tipo, ativosDoTipo]) => (
                            <section key={tipo}>
                                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <LayoutGrid size={16} style={{ opacity: 0.4 }} />
                                    <Typography variant="h2" style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '12px', opacity: 0.7 }}>
                                        {tipo}
                                    </Typography>
                                    <Badge variant="ghost" style={{ fontSize: '11px' }}>{ativosDoTipo.length}</Badge>
                                </div>
                                <Card style={{ padding: 0, overflow: 'hidden' }}>
                                    <DataTable
                                        data={ativosDoTipo}
                                        columns={[
                                            {
                                                header: 'Símbolo',
                                                accessorKey: 'ticker',
                                                cell: (item: AvereAtivo) => <strong>{item.ticker || '—'}</strong>,
                                            },
                                            {
                                                header: 'Descrição',
                                                accessorKey: 'emissor',
                                                cell: (item: AvereAtivo) => (
                                                    <div style={{ maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px' }}>
                                                        {item.emissor}
                                                    </div>
                                                ),
                                            },
                                            {
                                                header: 'Qtd',
                                                accessorKey: 'quantidade',
                                                cell: (item: AvereAtivo) => fmtNum(item.quantidade),
                                            },
                                            {
                                                header: 'Valor Mercado',
                                                accessorKey: 'valorBruto',
                                                cell: (item: AvereAtivo) => <strong>{fmt(item.valorBruto)}</strong>,
                                            },
                                            {
                                                header: '',
                                                accessorKey: '_uniqueId',
                                                cell: (item: AvereAtivo) => (
                                                    <button
                                                        onClick={() => { setAtivoSelecionado(item); setDrawerAberto(true); }}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f97316' }}
                                                    >
                                                        <ChevronRight size={18} />
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 0', opacity: 0.3 }}>
                        <Globe size={48} />
                        <Typography variant="h2" style={{ marginTop: '16px' }}>Nenhum dado internacional encontrado</Typography>
                        <Typography variant="p" style={{ marginTop: '8px' }}>Clique em "Atualizar Posição" para buscar os dados da Avenue.</Typography>
                    </div>
                )
            )}

            {ativoSelecionado && (
                <DrawerDetalhes ativo={ativoSelecionado} aberto={drawerAberto} onClose={setDrawerAberto} />
            )}
        </div>
    );
}