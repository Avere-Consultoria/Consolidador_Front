// Endereço do HUB Avere (avere-core), onde clientes, consultores e contas são
// editados. Em produção vem de VITE_HUB_URL (variável do build no Cloudflare);
// sem ela, o HUB local de desenvolvimento.
export const HUB_URL = (import.meta.env.VITE_HUB_URL as string | undefined)?.replace(/\/$/, '') ?? 'http://localhost:5174';
