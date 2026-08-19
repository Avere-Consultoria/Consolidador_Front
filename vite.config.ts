import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
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
