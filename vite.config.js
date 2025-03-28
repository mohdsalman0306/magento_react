import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://mage.local',
        changeOrigin: true,
        secure: false, // Use true if your Magento is running on HTTPS
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
      },
    },
  },
})
