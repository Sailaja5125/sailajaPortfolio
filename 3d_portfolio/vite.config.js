import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.glb'],
  plugins: [react() , tailwindcss()],
})
