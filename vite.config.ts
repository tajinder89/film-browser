import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@types': path.resolve(__dirname, 'src/lib/types'),
      '@hooks': path.resolve(__dirname, 'src/lib/hooks'),
      '@utils': path.resolve(__dirname, 'src/lib/utils'),
      '@api': path.resolve(__dirname, 'src/lib/api'),
      '@constants': path.resolve(__dirname, 'src/lib/constants'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },

  build: {
    outDir: 'dist/client',
    rollupOptions: {
      input: 'index.html',
    },
  },

  ssr: {
    noExternal: [],
  },

})
