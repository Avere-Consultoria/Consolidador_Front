// ─────────────────────────────────────────────────────────────────────────────
// Hub Avere — catálogo estático de links úteis da casa.
//
// Estático de propósito (v1). O formato abaixo é serializável (sem componentes),
// então promover isto para uma tabela no banco + tela do master depois é trivial:
// é o mesmo shape.
//
// Ícone de cada link, em ordem de precedência:
//   1. `logo`  → domínio; renderiza o favicon oficial da marca (com fallback).
//   2. `badge` → quadrado colorido com a sigla (fallback do logo).
//   3. `icon`  → chave mapeada para um ícone lucide em Hub.tsx (formulários).
//   4. padrão  → ícone de link.
// ─────────────────────────────────────────────────────────────────────────────

export type HubBadge = { texto: string; bg: string; fg?: string };

export type HubLink = {
    titulo: string;
    descricao?: string;
    url: string;
    logo?: string;     // domínio da marca (ex.: 'xpi.com.br') → favicon oficial
    badge?: HubBadge;  // fallback do logo
    icon?: string;     // ícone lucide (genéricos/formulários)
    atencao?: boolean; // destaca a descrição como aviso
};

export type HubCategoria = { nome: string; links: HubLink[] };

// Badges de marca (fallback caso o favicon não carregue)
const XP: HubBadge = { texto: 'XP', bg: '#000000', fg: '#ffffff' };
const BTG: HubBadge = { texto: 'BTG', bg: '#0A2C57', fg: '#ffffff' };
const AGORA: HubBadge = { texto: 'AG', bg: '#0A4B4F', fg: '#ffffff' };
const SANTANDER: HubBadge = { texto: 'S', bg: '#EC0000', fg: '#ffffff' };

export const HUB_CATEGORIAS: HubCategoria[] = [
    {
        nome: 'Ploomes',
        links: [
            { titulo: 'Novo prospect - Consultoria', descricao: 'Formulário de novo prospect (Consultoria)', url: 'https://www.cognitoforms.com/AverePartners1/NovoProspectAvereConsultoria', icon: 'prospect' },
            { titulo: 'Novos prospects - Consultoria (em lote)', descricao: 'Planilha para cadastro em lote', url: 'https://averepartners-my.sharepoint.com/personal/consultoria_averepartners_com_br/Documents/AVERE/Consultoria/Ploomes/Novos%20Prospects_v1.xlsx?web=1', icon: 'planilha' },
            { titulo: 'Novo prospect - AvereXpanse', descricao: 'Formulário de novo prospect (AvereXpanse)', url: 'https://www.cognitoforms.com/AverePartners1/NovoProspectAvereXpanse', icon: 'prospect' },
            { titulo: 'Novo prospect - Avere Law', descricao: 'Formulário de novo prospect (Avere Law)', url: 'https://www.cognitoforms.com/AverePartners1/NovoProspectAvereLaw', icon: 'prospect' },
        ],
    },
    {
        nome: 'Portais',
        links: [
            { titulo: 'HUB XP', descricao: 'Portal HUB XP', url: 'https://hub.xpi.com.br/new/dashboard/#/advisor', logo: 'xpi.com.br', badge: XP },
            { titulo: 'Expert XP', descricao: 'Portal Expert XP', url: 'https://advisor.xpi.com.br/', logo: 'xpi.com.br', badge: XP },
            { titulo: 'Avenue', descricao: 'Portal Avenue B2B', url: 'https://b2b.avenue.us/login?iss=https%3A%2F%2Favenue.us.auth0.com%2F', logo: 'avenue.us', badge: { texto: 'AV', bg: '#0E7C6B', fg: '#ffffff' } },
            { titulo: 'ADMIN BTG', descricao: 'Portal administrativo BTG', url: 'https://access.btgpactualdigital.com/login/externo', logo: 'btgpactual.com', badge: BTG },
            { titulo: 'BTG Content', descricao: 'Conteúdos BTG', url: 'https://content.btgpactual.com/', logo: 'btgpactual.com', badge: BTG },
            { titulo: 'Ágora', descricao: 'Portal Ágora Investimentos', url: 'https://aai.agorainvestimentos.com.br/login', logo: 'agorainvestimentos.com.br', badge: AGORA },
            { titulo: 'Santander', descricao: 'Portal Empresas Santander', url: 'https://www.santander.com.br/empresas', logo: 'santander.com.br', badge: SANTANDER },
            { titulo: 'BrasilPrev', descricao: 'Portal Parceiros BrasilPrev', url: 'https://parceiros.brasilprev.com.br/login', logo: 'brasilprev.com.br', badge: { texto: 'BP', bg: '#F5C400', fg: '#1A1A1A' } },
            { titulo: 'Daycoval', descricao: 'Portal Investimentos Daycoval', url: 'https://portalinvestimentos.daycoval.com.br/login', logo: 'daycoval.com.br', badge: { texto: 'D', bg: '#1C1C3A', fg: '#ffffff' } },
            { titulo: 'Safra Invest', descricao: 'Portal Safra Invest', url: 'https://aai.b0422.com.br/logon/LogonPoint/tmindex.html', logo: 'safra.com.br', badge: { texto: 'Sa', bg: '#12233F', fg: '#ffffff' } },
            { titulo: 'C6', descricao: 'Family Office C6', url: 'https://c6bank.my.site.com/familyoffice/s/login/?ec=302&startURL=%2Ffamilyoffice%2Fs%2F', logo: 'c6bank.com.br', badge: { texto: 'C6', bg: '#000000', fg: '#ffffff' } },
        ],
    },
    {
        nome: 'Links Externos',
        links: [
            { titulo: 'Abertura de conta', descricao: 'Formulário de abertura de conta de novos clientes Avere', url: 'https://www.cognitoforms.com/AverePartners1/DadosCadastraisESuitability', icon: 'prospect' },
            { titulo: 'Abertura de conta - Casos especiais', descricao: 'ATENÇÃO: Usar esse formulário somente após aprovação prévia', url: 'https://www.cognitoforms.com/AverePartners1/DadosCadastraisESuitability_SCTT', icon: 'prospect', atencao: true },
            { titulo: 'Suitability', descricao: 'Formulário de Suitability', url: 'https://www.cognitoforms.com/AverePartners1/Suitability', icon: 'suitability' },
            { titulo: 'NDA PF', descricao: 'NDA - Avere - PF', url: 'https://app.clicksign.com/fluxia/c0bf9e39-016e-422c-8cd9-90f0adaf946a', icon: 'nda' },
            { titulo: 'NDA - PJ', descricao: 'NDA - Avere - PJ', url: 'https://app.clicksign.com/fluxia/379cd0e1-4b70-4c96-bdb3-61b61873efe9', icon: 'nda' },
            { titulo: 'Abertura de conta Santander', descricao: 'Formulário com documentos necessários (3MM+)', url: 'https://www.cognitoforms.com/AverePartners1/AberturaDeContaSantander', logo: 'santander.com.br', badge: SANTANDER },
            { titulo: 'Abertura de conta Ágora', descricao: 'Link para abertura de nova conta Ágora', url: 'https://cadastro.agorainvest.com.br/dados-acesso?agentcode=1973', logo: 'agorainvestimentos.com.br', badge: AGORA },
            { titulo: 'ChatGPT', descricao: 'IA', url: 'https://chatgpt.com/', logo: 'chatgpt.com', badge: { texto: 'AI', bg: '#10A37F', fg: '#ffffff' } },
            { titulo: 'Lemit', descricao: 'Informações e detalhes sobre os dados pessoais do prospect/cliente', url: 'https://lemitti.com/auth/login', logo: 'lemitti.com', icon: 'pessoas' },
            { titulo: 'Nord', descricao: 'Nord Research - Relatórios de mercado', url: 'https://members.nordinvestimentos.com.br/Login?ReturnUrl=%2f', logo: 'nordinvestimentos.com.br', icon: 'research' },
            { titulo: 'Mycapital', descricao: 'Calculadora de IR sobre renda variável', url: 'https://www.mycapital.com.br/front/#/login', logo: 'mycapital.com.br', icon: 'ir' },
        ],
    },
    {
        nome: 'Links Internos',
        links: [
            { titulo: 'Profiles', descricao: 'Profiles online - Plataforma para planejamento patrimonial', url: 'https://www.cognitoforms.com/AverePartners1/ProfilesAvereInterno', icon: 'profiles' },
            { titulo: 'Pedido de reembolso', descricao: 'Formulário para pedido de reembolso', url: 'https://www.cognitoforms.com/AverePartners1/PedidoDeReembolso', icon: 'reembolso' },
            { titulo: 'Posições externas (Comdinheiro)', descricao: 'Envio de posições externas para upload no Comdinheiro', url: 'https://www.cognitoforms.com/AverePartners1/UploadDePosi%c3%a7%c3%b5esExternas', icon: 'comdinheiro' },
            { titulo: 'Ouvidoria', descricao: 'Canal para denúncias internas', url: 'https://www.cognitoforms.com/AverePartners1/Ouvidoria', icon: 'ouvidoria' },
        ],
    },
    {
        nome: 'Avere Law',
        links: [
            { titulo: 'Reunião: Will, Banker & Cliente', descricao: 'Formulário para agendamento de reunião', url: 'https://www.cognitoforms.com/AverePartners1/NovaReuni%c3%a3oLaw', icon: 'reuniao' },
            { titulo: 'Informações Pessoais', descricao: 'Informações pessoais obrigatórias', url: 'https://www.cognitoforms.com/AverePartners1/Informa%c3%a7%c3%b5esPessoaisObrigat%c3%b3rias', icon: 'infopessoal' },
            { titulo: 'Offshore', descricao: 'Documentação da sociedade offshore', url: 'https://www.cognitoforms.com/AverePartners1/Documenta%c3%a7%c3%a3oDaSociedadeOffshore', icon: 'offshore' },
            { titulo: 'Incorporação', descricao: 'Incorporação ou transferência de sociedade', url: 'https://www.cognitoforms.com/AverePartners1/Incorpora%c3%a7%c3%a3oOuTransfer%c3%aanciaDeSociedade', icon: 'incorporacao' },
        ],
    },
];
