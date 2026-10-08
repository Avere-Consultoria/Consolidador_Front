import { useQuery } from '@tanstack/react-query';
import { Info, ExternalLink } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { HUB_URL } from '../../config/hub';

// Faixa das telas de cadastro: o dado vem do HUB (espelho-core) e não se edita aqui.
// Mostra quando foi a última cópia bem-sucedida — se parar de andar, o master vê.
export function AvisoCadastroHub({ caminhoHub }: { caminhoHub: string }) {
    const { perfil } = useAuth();
    const isMaster = perfil?.role === 'MASTER';
    const { data: ultima } = useQuery({
        queryKey: ['espelho', 'ultima'],
        queryFn: async () => {
            const { data } = await supabase.from('espelho_rodadas').select('fim')
                .eq('status', 'ok').eq('aplicada', true).order('inicio', { ascending: false }).limit(1).maybeSingle();
            return data?.fim as string | undefined;
        },
        staleTime: 60_000,
    });
    const quando = ultima ? new Date(ultima).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : null;
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px',
            background: 'var(--color-info-bg)', border: '1px solid var(--color-info-border)', color: 'var(--color-info-text)', fontSize: '13px',
        }}>
            <Info size={16} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1 }}>
                Cadastro gerido no <b>HUB Avere</b> — aqui é somente leitura.
                {isMaster ? ' Para incluir ou alterar, use o HUB.' : ' Para incluir ou alterar, fale com o master.'}
                {quando && <span style={{ opacity: 0.75 }}> Última atualização vinda do HUB: {quando}.</span>}
            </span>
            {isMaster && (
                <a href={`${HUB_URL}${caminhoHub}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-info-text)', whiteSpace: 'nowrap' }}>
                    Abrir no HUB <ExternalLink size={14} />
                </a>
            )}
        </div>
    );
}
