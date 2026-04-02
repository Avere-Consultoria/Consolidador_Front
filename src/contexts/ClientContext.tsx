import { createContext, useContext, useState, type ReactNode } from 'react';

// Tipagem baseada no que você definiu no banco
interface Cliente {
    id: string;
    codigoAvere: string;
    nome: string;
    codigoXp: string | null;
    codigoBtg: string | null;
}

interface ClientContextType {
    selectedClient: Cliente | null;
    setSelectedClient: (cliente: Cliente | null) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);

    return (
        <ClientContext.Provider value={{ selectedClient, setSelectedClient }}>
            {children}
        </ClientContext.Provider>
    );
}

export const useClient = () => {
    const context = useContext(ClientContext);
    if (!context) throw new Error('useClient deve ser usado dentro de um ClientProvider');
    return context;
};