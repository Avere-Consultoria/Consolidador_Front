import { useEffect } from 'react';
import AbasWorkspace from '../admin/AbasWorkspace';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';

// Página Clientes (/clientes/…) — o escopo inteiro do usuário, em abas (20/10/2026).
// Regra: dentro de aba não há cabeçalho de página — a aba já diz o que a tela é.
// Um cliente só = /cliente/<id>/… (Posição, Histórico, Fechamento).
// Regra do seletor do topo: escolher um cliente sempre ABRE o cliente; estar em Clientes
// é estar em "Todos os clientes" — por isso entrar aqui limpa o cliente escolhido.
export default function ClientesAbas() {
    const { perfil } = useAuth();
    const { setSelectedClient } = useClient();

    // Só na ENTRADA em Clientes (setSelectedClient é o setter do useState do contexto: estável).
    // Não reagir a "tem cliente": escolher um cliente aqui dentro abre o cliente, e limpar no meio
    // dessa troca apagaria a escolha antes de a página dele abrir.
    useEffect(() => { setSelectedClient(null); }, [setSelectedClient]);

    const abas = [
        { to: 'base', label: 'Base de clientes' },
        { to: 'vencimentos', label: 'Vencimentos' },
        // FGC e Crédito privado: lugar marcado; o conteúdo vem depois da ingestão dos vínculos.
        { to: 'fgc', label: 'Limite FGC' },
        { to: 'credito-privado', label: 'Crédito privado' },
        // O master tem a versão de auditoria em Operação › Documentos Manuais.
        // "Posição Externa" (era Meus Envios): o nome que os consultores conhecem.
        ...(perfil?.role === 'CONSULTOR_INTERNO' ? [{ to: 'posicao-externa', label: 'Posição Externa' }] : []),
    ];
    return <AbasWorkspace tabs={abas} />;
}
