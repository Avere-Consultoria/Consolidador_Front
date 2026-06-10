import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Spinner, toast } from 'avere-ui';
import { ArrowLeft, GitCompareArrows, AlertCircle, Lock, RefreshCw } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useClient } from '../contexts/ClientContext';
import { useAuth } from '../contexts/AuthContext';
import { MatrizMovimentacoes } from '../components/fechamento/MatrizMovimentacoes';

const MESES_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
function formatarMesReferencia(mes: string): string {
    const [ano, m] = mes.split('-');
    return `${MESES_PT[parseInt(m, 10) - 1]} ${ano}`;
}

export default function MovimentacoesMes() {
    const { mes } = useParams<{ mes: string }>();
    const navigate = useNavigate();
    const { selectedClient } = useClient();
    const { perfil } = useAuth();
    const [apelidoMap, setApelidoMap] = useState<Map<string, string>>(new Map());
    const [fechado, setFechado] = useState(false);
    const [fechando, setFechando] = useState(false);

    useEffect(() => {
        if (!selectedClient?.id) return;
        supabase.from('cliente_contas').select('id, apelido').eq('cliente_id', selectedClient.id).then(({ data }) => {
            const m = new Map<string, string>();
            (data ?? []).forEach((c: any) => { if (c.apelido && c.apelido.trim()) m.set(c.id, c.apelido.trim()); });
            setApelidoMap(m);
        });
    }, [selectedClient?.id]);

    const fetchStatus = async () => {
        if (!selectedClient?.id || !mes) return;
        const { data } = await supabase.from('snapshots_fechados').select('id').eq('cliente_id', selectedClient.id).eq('mes_referencia', mes).limit(1);
        setFechado((data?.length ?? 0) > 0);
    };
    useEffect(() => { fetchStatus(); }, [selectedClient?.id, mes]);

    const handleFechar = async () => {
        if (!selectedClient?.id || !mes) return;
        const consultorId = selectedClient.consultorId ?? perfil?.id ?? null;
        const msg = fechado
            ? `Já existe fechamento de ${formatarMesReferencia(mes)}. Refazer apaga o anterior e recria com os dados e classificações atuais. Confirma?`
            : `Fechar ${formatarMesReferencia(mes)} de ${selectedClient.nome}? Os dados atuais serão materializados de forma imutável.`;
        if (!window.confirm(msg)) return;
        setFechando(true);
        try {
            const { data, error } = await supabase.rpc('fechar_mes', { p_cliente_id: selectedClient.id, p_mes_referencia: mes, p_consultor_id: consultorId });
            if (error) throw error;
            const n = (data as any)?.contas_fechadas ?? 0;
            toast.success(`${formatarMesReferencia(mes)} fechado — ${n} conta(s) materializada(s).`);
            await fetchStatus();
        } catch (err: any) {
            console.error(err);
            toast.error(`Falha ao fechar mês: ${err.message ?? 'erro desconhecido'}`);
        } finally {
            setFechando(false);
        }
    };

    if (!selectedClient?.id || !mes) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
                    <AlertCircle size={32} />
                    <Typography variant="p">Selecione um cliente para ver as movimentações.</Typography>
                    <Button variant="outline" onClick={() => navigate('/fechamento')}><ArrowLeft size={16} style={{ marginRight: 6 }} /> Voltar ao fechamento</Button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--color-borda)', paddingBottom: '16px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ background: 'rgba(0, 131, 203, 0.1)', padding: '8px', borderRadius: '8px' }}>
                            <GitCompareArrows size={24} color="var(--color-primaria)" />
                        </div>
                        <Typography variant="h1" style={{ fontWeight: 700, fontSize: '24px' }}>
                            Movimentações — {formatarMesReferencia(mes)}
                        </Typography>
                    </div>
                    <Typography variant="p" style={{ opacity: 0.6, fontSize: '14px' }}>
                        O que mudou na carteira ao longo do mês. Cliente: <strong>{selectedClient.nome}</strong>
                    </Typography>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Button variant="outline" onClick={() => navigate('/fechamento')}>
                        <ArrowLeft size={16} style={{ marginRight: 6 }} /> Voltar
                    </Button>
                    <Button variant={fechado ? 'outline' : 'solid'} onClick={handleFechar} disabled={fechando}>
                        {fechando ? <Spinner size="sm" /> : fechado ? <RefreshCw size={16} style={{ marginRight: 6 }} /> : <Lock size={16} style={{ marginRight: 6 }} />}
                        {fechado ? 'Refazer fechamento' : 'Fechar mês'}
                    </Button>
                </div>
            </header>

            <MatrizMovimentacoes
                clienteId={selectedClient.id}
                mes={mes}
                mesLabel={formatarMesReferencia(mes)}
                apelidoMap={apelidoMap}
            />
        </div>
    );
}
