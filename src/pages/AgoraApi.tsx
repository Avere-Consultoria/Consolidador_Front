import { useState } from 'react';
import { RefreshCw, Code, Database, TrendingUp, AlertCircle } from 'lucide-react';
import {
    Button, Card, CardContent, Typography, Spinner, Badge
} from 'avere-ui';
import { useClient } from '../contexts/ClientContext';
import { supabase } from '../services/supabase';

export default function AgoraApi() {
    const { selectedClient } = useClient();
    const [rawData, setRawData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [endpoint, setEndpoint] = useState<'listsummary' | 'summary' | 'listsummaryLessPrev'>('listsummary');

    const cpfCnpj = selectedClient?.cpf || '';
    const accountCode = selectedClient?.codigo_agora || '';
    const isReady = !!(cpfCnpj && accountCode);

    async function testAgoraConnection() {
        if (!isReady) return;

        setLoading(true);
        setError(null);
        setRawData(null);

        try {
            const { data, error: funcError } = await supabase.functions.invoke('get-agora-position', {
                body: {
                    cpfCnpj,
                    accountCode,
                    endpoint,
                    debug: true,
                },
            });

            if (funcError) throw new Error(funcError.message);

            setRawData(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Erro desconhecido na Edge Function');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>

                {/* Header de Debug */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Typography variant="h1" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <TrendingUp size={32} className="text-green-500" />
                            Ágora API Debugger
                        </Typography>
                        <Typography variant="p" style={{ opacity: 0.6 }}>
                            Validação de resposta bruta — Cliente: <strong>{selectedClient?.nome || 'Nenhum selecionado'}</strong>
                        </Typography>
                    </div>

                    <Button onClick={testAgoraConnection} disabled={loading || !isReady}>
                        {loading ? <Spinner size="sm" /> : <RefreshCw size={18} style={{ marginRight: '8px' }} />}
                        Testar Endpoint
                    </Button>
                </header>

                {!isReady && (
                    <Card style={{ borderLeft: '4px solid #eab308', background: '#fefce8' }}>
                        <CardContent style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#854d0e' }}>
                            <AlertCircle size={20} />
                            <Typography variant="p">
                                Selecione um cliente que possua <strong>CPF</strong> e <strong>Código Ágora</strong> preenchidos para testar a API.
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                {error && (
                    <Card style={{ borderLeft: '4px solid #ef4444', background: '#fef2f2' }}>
                        <CardContent>
                            <Typography variant="p" style={{ color: '#b91c1c', fontWeight: 600 }}>Erro na Requisição:</Typography>
                            <pre style={{ fontSize: '12px', marginTop: '8px', overflowX: 'auto' }}>{error}</pre>
                        </CardContent>
                    </Card>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>

                    {/* Status da Conexão */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h2" style={{ fontSize: '14px', marginBottom: '16px' }}>Parâmetros da Requisição</Typography>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div className="flex justify-between">
                                        <span style={{ opacity: 0.5 }}>CPF/CNPJ:</span>
                                        <Badge variant="ghost">{selectedClient?.cpf || 'null'}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span style={{ opacity: 0.5 }}>CBLC (Ágora):</span>
                                        <Badge variant="ghost">{selectedClient?.codigo_agora || 'null'}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span style={{ opacity: 0.5 }}>Ambiente:</span>
                                        <Badge intent="primaria">Produção</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Seletor de Endpoint */}
                        <Card>
                            <CardContent>
                                <Typography variant="h2" style={{ fontSize: '14px', marginBottom: '16px' }}>Endpoint</Typography>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {(['listsummary', 'summary', 'listsummaryLessPrev'] as const).map((ep) => (
                                        <div
                                            key={ep}
                                            onClick={() => setEndpoint(ep)}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                                fontFamily: 'monospace',
                                                background: endpoint === ep ? '#f0fdf4' : 'transparent',
                                                border: endpoint === ep ? '1px solid #22c55e' : '1px solid transparent',
                                                color: endpoint === ep ? '#15803d' : 'inherit',
                                            }}
                                        >
                                            /{ep}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Resposta Bruta (JSON) */}
                    <Card style={{ background: '#1e1e1e', color: '#d4d4d4' }}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                                <Typography variant="h2" style={{ fontSize: '14px', color: '#9cdcfe', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Code size={16} /> JSON Response
                                </Typography>
                                {rawData && <Badge intent="primaria">Payload Recebido</Badge>}
                            </div>

                            <div style={{
                                maxHeight: '600px',
                                overflowY: 'auto',
                                fontFamily: 'monospace',
                                fontSize: '13px',
                                lineHeight: '1.5',
                            }}>
                                {rawData ? (
                                    <pre>{JSON.stringify(rawData, null, 2)}</pre>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '40px', opacity: 0.3 }}>
                                        <Database size={48} style={{ margin: '0 auto 16px' }} />
                                        Aguardando disparo da API...
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}