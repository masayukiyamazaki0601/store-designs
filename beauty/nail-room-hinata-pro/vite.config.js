import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Nail Room ひなた',
        short_name: 'ひなた',
        description: '【地域名】の自宅ネイルサロン',
        theme_color: '#C67B5C',
        background_color: '#FAF5F0',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
});