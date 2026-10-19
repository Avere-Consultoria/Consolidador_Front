import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Cabeçalho de página — PROTÓTIPO no Consolidador (19/10/2026), antes de virar
// componente da avere-ui. Uma linha só: ícone · título · selo · frase de apoio,
// e as ações da página à direita. Sem linha divisória e sem a margem de fábrica
// do Typography (o bloco antigo gastava ~190 px até o primeiro conteúdo).
//
// Frase de apoio: só quando acrescenta (explica a tela ou dá o foco atual).
// Curta, fica ao lado do título; longa, quebra para baixo, em letra pequena.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
    titulo: string;
    icone?: LucideIcon;
    /** Algo colado ao título (ex.: contador de pendências). */
    selo?: ReactNode;
    /** Frase de apoio — omita quando só repete o título. */
    descricao?: ReactNode;
    /** Botões e controles da página, à direita. */
    acoes?: ReactNode;
}

export function CabecalhoPagina({ titulo, icone: Icone, selo, descricao, acoes }: Props) {
    return (
        <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', minHeight: 36 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', columnGap: 'var(--space-3)', rowGap: 2, flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', alignSelf: 'center' }}>
                    {Icone && <Icone size={20} color="var(--color-secundaria)" style={{ flexShrink: 0 }} />}
                    <h1 style={{
                        margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--weight-bold)' as never, lineHeight: 1.2, color: 'var(--color-text-primary)', whiteSpace: 'nowrap',
                    }}>{titulo}</h1>
                    {selo}
                </div>
                {descricao && (
                    <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: 760 }}>
                        {descricao}
                    </p>
                )}
            </div>
            {acoes && <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>{acoes}</div>}
        </header>
    );
}
