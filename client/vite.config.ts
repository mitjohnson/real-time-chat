import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@lib': resolve(__dirname, 'src/lib'),
      '@store': resolve(__dirname, 'src/store'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@components': resolve(__dirname, 'src/components'),
    }
  }
})
