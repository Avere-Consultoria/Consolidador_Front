import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    // Versão que o Marcador de problemas carimba no relato: o commit do deploy
    // (o Cloudflare Pages expõe CF_PAGES_COMMIT_SHA no build); no local, "dev".
    __APP_VERSAO__: JSON.stringify(process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7) ?? 'dev'),
  },
  build: {
    rollupOptions: {
      output: {
        // Separa bibliotecas do código do app: elas mudam raramente e ficam
        // no cache do navegador entre deploys — sem isto, cada deploy
        // invalidava o chunk único de ~750kB para todo mundo.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          recharts: ['recharts'],
          supabase: ['@supabase/supabase-js'],
          ui: ['avere-ui', 'lucide-react', 'cmdk'],
        },
      },
    },
  },
})
