import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false, // Prevent exposing source code in production
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router'],
        }
      }
    }
  },
  esbuild: {
    // Drop console and debugger in production builds to prevent information disclosure
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
})
