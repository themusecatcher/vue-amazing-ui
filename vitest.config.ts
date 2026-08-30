import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// 独立配置，不复用 vite.config.ts：后者为库模式构建，含 dts / copyVendorStyles 等
// 与测试无关的插件，且 build 配置会干扰 vitest 的模块解析。
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 与 vite.config.ts 保持一致，组件源码中使用 components/ @/ #/ 别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./types', import.meta.url)),
      components: fileURLToPath(new URL('./components', import.meta.url)),
      less: fileURLToPath(new URL('./src/assets/less', import.meta.url))
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.spec.ts'],
    setupFiles: ['./tests/setup.ts']
  }
})
