import tseslint from 'typescript-eslint'

// ─────────────────────────────────────────────────────────────────────────────
// Guarda da fundação de cor (ficha cor.md §7.3: "stylelint proibindo hex solto
// fora do arquivo de primitivos"). Roda no prebuild: hex solto = build quebrado.
// A dívida que pagamos (879 cores improvisadas) renasce um commit por vez —
// esta regra transforma disciplina em estrutura.
//
// Onde hex É permitido (dataviz e dados, por design):
// - tokens.css (primitivos), utils/colors.ts, utils/chartPalette.ts
// - componentes de gráfico (fill/stroke SVG não resolve var())
// - seeds de cor da Gestão Master (valores que vão pro banco)
// ─────────────────────────────────────────────────────────────────────────────

export default tseslint.config(
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
        },
        ignores: [
            'src/utils/colors.ts',
            'src/utils/chartPalette.ts',
            'src/pages/Relatorio.tsx',
            'src/pages/Rentabilidade.tsx',
            'src/pages/HistoricoMensal.tsx',
            'src/components/home/graficos/**',
            'src/components/fechamento/**',
            'src/components/gestaoMaster/**',
            'src/components/home/modais/ModalCriarCarteira.tsx',
            // Dados/dataviz: cores que vão pro banco ou pra gráfico (não são UI)
            'src/utils/faixas.ts',
            'src/hooks/useFaixas.ts',
            'src/hooks/useHomeMetrics.ts',
            'src/pages/hub/hubData.ts',
        ],
        rules: {
            'no-restricted-syntax': ['error', {
                selector: 'Literal[value=/#[0-9A-Fa-f]{3,8}\\b/]',
                message: 'Cor hex solta fora da fundação. Use token semântico (var(--color-…)) ou, se for dataviz, utils/chartPalette.ts — ver src/styles/tokens.css.',
            }],
        },
    },
)
