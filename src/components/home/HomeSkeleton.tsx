import { Skeleton, Card } from 'avere-ui';

// Esqueleto da Posição (ficha estados: skeleton para conteúdo, spinner para ação).
// Espelha o layout real — header, cards de resumo e a moldura da tabela — para a
// primeira carga não "apagar a tela" nem causar layout shift quando os dados chegam.
export function HomeSkeleton() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} aria-busy="true" aria-label="Carregando posição">
            {/* Header: nome do cliente + ações */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Skeleton style={{ width: 280, height: 28 }} />
                    <Skeleton style={{ width: 200, height: 14 }} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Skeleton style={{ width: 120, height: 36, borderRadius: 'var(--radius-md)' }} />
                    <Skeleton style={{ width: 120, height: 36, borderRadius: 'var(--radius-md)' }} />
                </div>
            </div>

            {/* Composição da carteira: donut + tabela lado a lado */}
            <Card style={{ border: '1px solid var(--color-border-subtle)', padding: '24px' }}>
                <Skeleton style={{ width: 220, height: 18, marginBottom: 20 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Skeleton style={{ width: 200, height: 200, borderRadius: 'var(--radius-full)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <Skeleton style={{ width: 160, height: 26 }} />
                        {[0, 1, 2, 3].map(i => <Skeleton key={i} style={{ width: '100%', height: 16 }} />)}
                    </div>
                </div>
            </Card>

            {/* Moldura da tabela de ativos */}
            <Card style={{ border: '1px solid var(--color-border-subtle)', padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', background: 'var(--color-surface-sunken)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <Skeleton style={{ width: 240, height: 18 }} />
                </div>
                <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {[0, 1, 2, 3, 4].map(i => <Skeleton key={i} style={{ width: '100%', height: 20 }} />)}
                </div>
            </Card>
        </div>
    );
}
