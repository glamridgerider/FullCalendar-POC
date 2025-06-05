import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  base: '/FullCalendar-POC/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@fullcalendar': path.resolve(__dirname, 'node_modules/@fullcalendar'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``
      }
    }
  },
  server: {
    port: 8080,
    hot: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html')
      }
    },
    sourcemap: true
  }
})
