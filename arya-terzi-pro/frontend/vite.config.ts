import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Arya Terzi Pro',
        short_name: 'AryaTerzi',
        theme_color: '#111827',
        background_color: '#111827',
        display: 'standalone'
      }
    })
  ],
  server: {
    port: 5173
  }
})
