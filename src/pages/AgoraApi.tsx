import { useState, useEffect } from 'react';
import {
    Wallet, RefreshCw, LayoutGrid, Calendar,
    TrendingUp, BarChart3, ChevronRight, AlertCircle, Database
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

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces (Mapeadas para o banco da Ágora)
// ─────────────────────────────────────────────────────────────────────────────

interface AvereAtivo {
    id?: string;
    tipo?: string;
    subTipo?: string;
    emissor?: string;
    ticker?: string;
    valorLiquido: number;
    valorBruto: number;
    quantidade?: number | null;
    _uniqueId?: string;
}

interface AverePortfolio {
    patrimonioTotal: number;
    dataReferencia: string;
    ativos: AvereAtivo[];
    alocacao: { classe: string; valor: number }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers de Formatação e Mapeamento
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (v?: number | null) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

const fmtDate = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString('pt-BR') : '-';

const fmtNum = (v?: number | null, decimais = 2) =>
    v != null ? v.toLocaleString('pt-BR', { minimumFractionDigits: decimais, maximumFractionDigits: decimais }) : '-';

const categoryMap: Record<string, string> = {
    'FIXED_INCOME': 'Renda Fixa',
    'INVESTMENT_FUND': 'Fundos de Investimento',
    'CASH': 'Caixa e Saldo',
    'PENSION': 'Previdência Privada',
    'EQUITIES': 'Renda Variável',
    'OTHER': 'Outros Ativos'
};

// ─────────────────────────────────────────────────────────────────────────────
// Drawer de Detalhes
// ─────────────────────────────────────────────────────────────────────────────

const AGORA_COLOR = '#16a34a';

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
                        <Badge intent="primaria" variant="solid" style={{ fontSize: '12px', background: '#16a34a' }}>
                            {ativo.subTipo || 'Ativo Ágora'}
                        </Badge>
                    </div>
                    <DrawerTitle>{ativo.emissor}</DrawerTitle>
                    <DrawerDescription>{ativo.ticker || 'Símbolo não disponível'}</DrawerDescription>
                </DrawerHeader>

                <DrawerBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Secao titulo="Valores Atuais">
                            <DetalheItem accentColor={AGORA_COLOR} label="Valor Bruto (BRL)" value={fmt(ativo.valorBruto)} highlight />
                            <DetalheItem accentColor={AGORA_COLOR} label="Valor Líquido (BRL)" value={fmt(ativo.valorLiquido)} />
                        </Secao>

                        <DrawerSeparator />

                        <Secao titulo="Informações do Produto">
                            <DetalheItem accentColor={AGORA_COLOR} label="Classe de Ativo" value={categoryMap[ativo.tipo || ''] || ativo.tipo || '-'} />
                            <DetalheItem accentColor={AGORA_COLOR} label="Quantidade" value={fmtNum(ativo.quantidade)} />
                        </Secao>

                        <DrawerSeparator />

                        <Secao titulo="Identificação">
                            <DetalheItem accentColor={AGORA_COLOR} label="Ticker / Tipo" value={ativo.ticker || '-'} mono fullWidth />
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

export default function AgoraApi() {
    const { selectedClient } = useClient();
    const [portfolioData, setPortfolioData] = useState<AverePortfolio | null>(null);
    const [loading, setLoading] = useState(false);
    const [ativoSelecionado, setAtivoSelecionado] = useState<AvereAtivo | null>(null);
    const [drawerAberto, setDrawerAberto] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function checkExistingSnapshot() {
        if (!selectedClient?.id) return;
        setLoading(true);
        console.log("Buscando último snapshot Ágora para o cliente:", selectedClient.nome);

        try {
            const { data: snapshot, error } = await supabase
                .from('posicao_agora_snapshots')
                .select(`
                    id, patrimonio_total, data_referencia, 
                    saldo_caixa, saldo_rf, saldo_rv, saldo_fundos, saldo_outros,
                    posicao_agora_ativos (
                        id, tipo, sub_tipo, emissor, ticker, 
                        valor_bruto, valor_liquido, quantidade
                    )
                `)
                .eq('cliente_id', selectedClient.id)
                .order('data_referencia', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) throw error;

            if (!snapshot) {
                console.warn("Nenhum snapshot Ágora encontrado.");
                setPortfolioData(null);
                return;
            }

            setPortfolioData({
                patrimonioTotal: Number(snapshot.patrimonio_total || 0),
                dataReferencia: snapshot.data_referencia,
                alocacao: [
                    { classe: 'Renda Fixa', valor: Number(snapshot.saldo_rf || 0) },
                    { classe: 'Fundos', valor: Number(snapshot.saldo_fundos || 0) },
                    { classe: 'Outros / Previdência', valor: Number(snapshot.saldo_outros || 0) },
                    { classe: 'Caixa', valor: Number(snapshot.saldo_caixa || 0) },
                    { classe: 'Renda Variável', valor: Number(snapshot.saldo_rv || 0) },
                ].filter(a => a.valor > 0),
                ativos: (snapshot.posicao_agora_ativos || []).map((a: any, idx: number) => ({
                    tipo: a.tipo,
                    subTipo: a.sub_tipo,
                    emissor: a.emissor,
                    ticker: a.ticker,
                    valorBruto: Number(a.valor_bruto || 0),
                    valorLiquido: Number(a.valor_liquido || 0),
                    quantidade: Number(a.quantidade || 0),
                    _uniqueId: `db-ago-${idx}`,
                })),
            });
        } catch (err) {
            console.error("Erro ao processar dados do snapshot Ágora:", err);
            setPortfolioData(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleFetch() {
        if (!selectedClient?.id || !selectedClient?.cpf || !selectedClient?.codigo_agora) {
            setErrorMsg("Dados cadastrais incompletos (CPF ou Código Ágora).");
            return;
        }

        setLoading(true);
        setErrorMsg(null);
        try {
            console.log("Disparando Edge Function da Ágora...");
            const { error: funcError } = await supabase.functions.invoke('get-agora-position', {
                body: {
                    clientId: selectedClient.id,
                    cpfCnpj: selectedClient.cpf,
                    accountCode: selectedClient.codigo_agora
                },
            });

            if (funcError) throw new Error(funcError.message);

            await checkExistingSnapshot();
        } catch (err: any) {
            console.error("Erro no handleFetch:", err);
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkExistingSnapshot();
    }, [selectedClient]);

    const ativosAgrupados = portfolioData?.ativos?.reduce((acc, ativo) => {
        const cat = categoryMap[ativo.tipo || ''] || ativo.tipo || 'Outros';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(ativo);
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
                            <Badge intent="primaria" variant="ghost" style={{ color: '#16a34a', borderColor: '#16a34a' }}>
                                <Calendar size={14} style={{ marginRight: 6 }} />
                                Ref: {fmtDate(portfolioData.dataReferencia)}
                            </Badge>
                        )}
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6 }}>Custódia Ágora Investimentos</Typography>
                </div>
                {selectedClient?.id && (
                    <Button onClick={handleFetch} disabled={loading} style={{ background: '#16a34a' }}>
                        {loading ? <Spinner size="sm" /> : <RefreshCw size={18} />} Atualizar Posição
                    </Button>
                )}
            </header>

            {errorMsg && (
                <Card style={{ borderLeft: '4px solid #ef4444', background: '#fef2f2' }}>
                    <CardContent style={{ color: '#b91c1c' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertCircle size={18} />
                            <Typography variant="p">{errorMsg}</Typography>
                        </div>
                    </CardContent>
                </Card>
            )}

            {loading && !portfolioData ? (
                <div style={{ padding: '100px 0', textAlign: 'center' }}>
                    <Spinner />
                    <Typography variant="p" style={{ marginTop: '16px', opacity: 0.5 }}>Carregando dados Bradesco/Ágora...</Typography>
                </div>
            ) : portfolioData ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <Card style={{ borderLeft: '4px solid #16a34a' }}>
                        <CardContent style={{ padding: '24px' }}>
                            <Typography variant="p" style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700 }}>
                                Patrimônio Global Ágora (BRL)
                            </Typography>
                            <Typography variant="h2" style={{ color: '#16a34a', fontWeight: 800, fontSize: '36px' }}>
                                {fmt(portfolioData.patrimonioTotal)}
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Cards de Alocação por Classe */}
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
                                                header: 'Símbolo / Tipo',
                                                accessorKey: 'ticker',
                                                cell: (item: AvereAtivo) => <strong>{item.ticker || '—'}</strong>,
                                            },
                                            {
                                                header: 'Descrição',
                                                accessorKey: 'subTipo',
                                                cell: (item: AvereAtivo) => (
                                                    <div style={{ maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px' }}>
                                                        {item.subTipo}
                                                    </div>
                                                ),
                                            },
                                            {
                                                header: 'Qtd',
                                                accessorKey: 'quantidade',
                                                cell: (item: AvereAtivo) => fmtNum(item.quantidade) || '1',
                                            },
                                            {
                                                header: 'Valor Bruto',
                                                accessorKey: 'valorBruto',
                                                cell: (item: AvereAtivo) => <strong>{fmt(item.valorBruto)}</strong>,
                                            },
                                            {
                                                header: '',
                                                accessorKey: '_uniqueId',
                                                cell: (item: AvereAtivo) => (
                                                    <button
                                                        onClick={() => { setAtivoSelecionado(item); setDrawerAberto(true); }}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#16a34a' }}
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
                        <Database size={48} />
                        <Typography variant="h2" style={{ marginTop: '16px' }}>Nenhum dado encontrado</Typography>
                        <Typography variant="p" style={{ marginTop: '8px' }}>Clique em "Atualizar Posição" para buscar os dados da Ágora.</Typography>
                    </div>
                )
            )}

            {ativoSelecionado && (
                <DrawerDetalhes ativo={ativoSelecionado} aberto={drawerAberto} onClose={setDrawerAberto} />
            )}
        </div>
    );
}