import { useState } from 'react';
import { Bug, RefreshCw, Code, Database } from 'lucide-react';
import {
    Button, Card, CardContent, Typography, Spinner, Badge
} from 'avere-ui'; // Utilizando seu Design System
import { useClient } from '../contexts/ClientContext';
import { supabase } from '../services/supabase';

export default function AvenueApi() {
    const { selectedClient } = useClient();
    const [rawData, setRawData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function testAvenueConnection() {
        if (!selectedClient?.id) {
            setError("Selecione um cliente primeiro.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Chamando sua Edge Function dedicada à Avenue
            const { data, error: funcError } = await supabase.functions.invoke('get-avenue-position', {
                body: {
                    clientId: selectedClient.id,
                    debug: true // Flag para sinalizar que queremos o log completo
                },
            });

            if (funcError) throw new Error(funcError.message);

            setRawData(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Erro desconhecido na Edge Function");
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
                            <Bug size={32} className="text-orange-500" />
                            Avenue API Debugger
                        </Typography>
                        <Typography variant="p" style={{ opacity: 0.6 }}>
                            Validação de resposta bruta para o cliente: <strong>{selectedClient?.nome || 'Nenhum selecionado'}</strong>
                        </Typography>
                    </div>

                    <Button onClick={testAvenueConnection} disabled={loading || !selectedClient}>
                        {loading ? <Spinner size="sm" /> : <RefreshCw size={18} style={{ marginRight: '8px' }} />}
                        Testar Endpoint
                    </Button>
                </header>

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
                                <Typography variant="h2" style={{ fontSize: '14px', marginBottom: '16px' }}>Status do Contexto</Typography>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div className="flex justify-between">
                                        <span style={{ opacity: 0.5 }}>ID Cliente:</span>
                                        <Badge variant="ghost">{selectedClient?.id || 'null'}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span style={{ opacity: 0.5 }}>Código Avenue:</span>
                                        <Badge variant="ghost">{selectedClient?.codigoAvenue || 'Não definido'}</Badge>
                                    </div>
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
                                lineHeight: '1.5'
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