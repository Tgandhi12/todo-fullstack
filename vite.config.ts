import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  server: {
  proxy: {
    '/auth':  { target: 'http://127.0.0.1:5000', changeOrigin: true },
    '/todos': { target: 'http://127.0.0.1:5000', changeOrigin: true },
  },
}
})
