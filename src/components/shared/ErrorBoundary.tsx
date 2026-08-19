import { Component, type ReactNode } from 'react';
import { EstadoErro } from './EstadoErro';

interface Props {
    children: ReactNode;
    /** Muda a cada rota (key externa) para o boundary resetar ao navegar. */
}
interface State {
    error: Error | null;
}

// Airbag do app: exceção de render ou chunk de rota que falhou ao baixar
// (rede caiu no meio da sessão) viravam TELA BRANCA — sem isto o React
// desmonta a árvore inteira. Aqui a queda vira EstadoErro com saída.
export class ErrorBoundary extends Component<Props, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error) {
        console.error('ErrorBoundary capturou:', error);
    }

    render() {
        if (this.state.error) {
            // Falha de import dinâmico (chunk não baixou) tem mensagem própria
            const chunkFalhou = /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i
                .test(this.state.error.message ?? '');
            return (
                <EstadoErro
                    titulo={chunkFalhou ? 'Não conseguimos baixar esta tela' : 'Algo quebrou nesta tela'}
                    dica={chunkFalhou
                        ? 'Parece problema de conexão — parte do aplicativo não pôde ser carregada. Verifique a rede e recarregue.'
                        : 'O erro foi registrado. Recarregar resolve na maioria dos casos.'}
                    onRetry={() => window.location.reload()}
                />
            );
        }
        return this.props.children;
    }
}
