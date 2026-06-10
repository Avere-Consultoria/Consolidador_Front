import { createContext, useContext, useState, type ReactNode } from 'react';

// Tipagem baseada no que você definiu no banco
interface Cliente {
    id: string;
    codigoAvere: string;
    nome: string;
    consultorId?: string | null;   // dono do cliente — define quais exceções se aplicam
    // Os códigos por instituição vivem em cliente_contas (não mais em colunas legadas).
}

interface ClientContextType {
    selectedClient: Cliente | null;
    setSelectedClient: (cliente: Cliente | null) => void;
    // Consultor selecionado na combobox hierárquica do header.
    // Valores possíveis: id do consultor (consultores.id), 'todos', 'meus'.
    consultorSelecionado: string;
    setConsultorSelecionado: (v: string) => void;
    // perfil_id (auth) do consultor selecionado — é a chave usada em excecoes.consultor_id.
    // null quando nenhum consultor específico está selecionado.
    consultorPerfilId: string | null;
    setConsultorPerfilId: (v: string | null) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
    const [consultorSelecionado, setConsultorSelecionado] = useState<string>('todos');
    const [consultorPerfilId, setConsultorPerfilId] = useState<string | null>(null);

    return (
        <ClientContext.Provider value={{ selectedClient, setSelectedClient, consultorSelecionado, setConsultorSelecionado, consultorPerfilId, setConsultorPerfilId }}>
            {children}
        </ClientContext.Provider>
    );
}

export const useClient = () => {
    const context = useContext(ClientContext);
    if (!context) throw new Error('useClient deve ser usado dentro de um ClientProvider');
    return context;
};