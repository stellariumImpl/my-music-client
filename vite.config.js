import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',    // 后端地址
        changeOrigin: true,                 // 开启代理
        secure: false,                      // 忽略证书验证
        rewrite: path => path               // 不重写路径
      }
    }
  }
})