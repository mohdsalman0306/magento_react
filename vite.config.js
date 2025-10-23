import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,ico,json,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // Enable SW in dev mode for testing
        type: 'module',
      },
      manifest: {
        name: 'My Storefront',
        short_name: 'Storefront',
        description: 'Progressive Web App Storefront',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#111827',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
    })
  ],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://mage.local',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
      },
    },
  },
  build: { 
    outDir: 'dist',
    sourcemap: true, // Helpful for debugging
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})