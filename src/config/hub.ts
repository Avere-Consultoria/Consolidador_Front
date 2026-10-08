// Endereço do HUB Avere (avere-core), onde clientes, consultores e contas são
// editados. Publicado no Cloudflare Pages (projeto hub-avere). VITE_HUB_URL só
// para apontar outro endereço (ex.: HUB local em http://localhost:5174).
export const HUB_URL = (import.meta.env.VITE_HUB_URL as string | undefined)?.replace(/\/$/, '') ?? 'https://hub-avere.pages.dev';
