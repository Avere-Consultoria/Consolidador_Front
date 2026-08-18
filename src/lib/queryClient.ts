import { QueryClient } from '@tanstack/react-query';

// Política de dados do app (decisão 18/ago/2026):
// - Dados base (posição, rentabilidade, cadastros): mudam 1×/dia na sincronização
//   → staleTime 5 min. Voltar numa tela dentro da janela renderiza do cache, instantâneo.
// - Ações do próprio usuário NUNCA esperam o staleTime: toda mutation invalida
//   as chaves que tocou e a rebusca é imediata.
// - Dados colaborativos (ex.: pendências) usam staleTime curto por chamada (30s).
// - refetchOnWindowFocus: voltar à janela revalida o que estiver vencido — é o
//   teto prático do atraso para ações de OUTROS usuários.
export const STALE_BASE = 5 * 60 * 1000;
export const STALE_COLABORATIVO = 30 * 1000;

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: STALE_BASE,
            refetchOnWindowFocus: true,
            retry: 1,
        },
    },
});
