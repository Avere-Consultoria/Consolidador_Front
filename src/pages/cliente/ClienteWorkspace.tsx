import { useEffect, useRef, useState } from 'react';
import { Outlet, NavLink, Navigate, useParams, useNavigate } from 'react-router-dom';
import { Typography, Spinner } from 'avere-ui';
import { User } from 'lucide-react';
import { useClient } from '../../contexts/ClientContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../services/supabase';

// Abas do workspace do cliente (todas operam sobre o cliente da URL).
const TABS = [
    { to: 'posicao', label: 'Posição' },
    { to: 'rentabilidade', label: 'Rentabilidade' },
    { to: 'historico', label: 'Histórico' },
    { to: 'fechamento', label: 'Fechamento' },
];

// ── Casca: cabeçalho do cliente + abas + conteúdo (Outlet) ───────────────────
export default function ClienteWorkspace() {
    const { clienteId } = useParams();
    const navigate = useNavigate();
    const { selectedClient, setSelectedClient } = useClient();
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';
    const [carregando, setCarregando] = useState(false);

    // Lê o cliente atual sem virar dependência do efeito (senão o efeito, que SETA
    // o cliente, se re-dispara em loop). O efeito depende só do clienteId da URL.
    const selRef = useRef(selectedClient);
    selRef.current = selectedClient;

    // Sincroniza o cliente da URL com o contexto (deep-link / refresh / troca).
    // As páginas-filhas leem selectedClient do contexto — não precisam mudar.
    useEffect(() => {
        if (!clienteId) return;
        // Já é o cliente certo no contexto (ex.: veio de um drill-down)? não refaz.
        if (selRef.current?.id === clienteId) { setCarregando(false); return; }
        let ativo = true;
        setCarregando(true);
        (async () => {
            try {
                const { data: cli } = await supabase
                    .from('clientes')
                    .select('id, nome, codigo_avere, consultor_id')
                    .eq('id', clienteId)
                    .maybeSingle();
                if (!ativo) return;
                if (!cli) { navigate('/dashboard', { replace: true }); return; }  // RLS negou / inexistente
                // consultorId = perfil_id (auth) do dono — chave usada em excecoes.consultor_id.
                let ownerPerfil: string | null = perfil?.id ?? null;
                if (isMaster && cli.consultor_id) {
                    const { data: cons } = await supabase
                        .from('consultores').select('perfil_id').eq('id', cli.consultor_id).maybeSingle();
                    if (!ativo) return;
                    ownerPerfil = cons?.perfil_id ?? null;
                }
                setSelectedClient({ id: cli.id, codigoAvere: cli.codigo_avere, nome: cli.nome, consultorId: ownerPerfil });
            } finally {
                if (ativo) setCarregando(false);   // sempre libera o loading (sem preso)
            }
        })();
        return () => { ativo = false; };
    }, [clienteId, isMaster, perfil?.id]);

    const cliente = selectedClient?.id === clienteId ? selectedClient : null;

    if (carregando || !cliente) {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}><Spinner size="lg" /></div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Cabeçalho do cliente */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--color-borda)', paddingBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-primaria)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <User size={20} />
                </div>
                <div>
                    <Typography variant="h1" style={{ margin: 0 }}>{cliente.nome}</Typography>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>Código Avere: {cliente.codigoAvere}</span>
                </div>
            </div>

            {/* Abas */}
            <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--color-borda)', flexWrap: 'wrap' }}>
                {TABS.map(t => (
                    <NavLink key={t.to} to={t.to} style={({ isActive }) => ({
                        padding: '10px 16px', fontSize: 14, fontWeight: 600, textDecoration: 'none',
                        color: isActive ? 'var(--color-primaria)' : '#6B7280',
                        borderBottom: isActive ? '2px solid var(--color-primaria)' : '2px solid transparent',
                        marginBottom: -1,
                    })}>{t.label}</NavLink>
                ))}
            </div>

            <Outlet />
        </div>
    );
}

// ── /cliente sem id: vai pro cliente do contexto ou pede pra selecionar ──────
export function ClienteIndex() {
    const { selectedClient } = useClient();
    if (selectedClient?.id) return <Navigate to={`/cliente/${selectedClient.id}/posicao`} replace />;
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5 }}>
                <User size={32} />
                <Typography variant="p">Selecione um cliente no seletor acima para abrir o workspace.</Typography>
            </div>
        </div>
    );
}

// ── Rotas legadas (/rentabilidade, /historico, /fechamento) → workspace ──────
export function LegacyClienteRedirect({ tab }: { tab: string }) {
    const { selectedClient } = useClient();
    if (selectedClient?.id) return <Navigate to={`/cliente/${selectedClient.id}/${tab}`} replace />;
    return <Navigate to="/dashboard" replace />;
}
