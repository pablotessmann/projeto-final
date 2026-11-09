import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // permite escrever '@/services/api' em vez de '../services/api'
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
