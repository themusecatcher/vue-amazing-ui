import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { // 或者globalVars
          // `themeColor` is global variables fields name
          themeColor: '#1890FF'
        },
        javascriptEnabled: true
      },
    },
  },
  // 配置打包入口出口
  build: {
    // 构建为库。
    lib: { // 如果指定了 build.lib，build.cssCodeSplit 会默认为 false。
      entry: resolve(__dirname, 'packages/index.js'),  // entry是必需的，因为库不能使用HTML作为入口。
      // 需要提供一个name 这个名字尽量不和 npm 上发布的包名一致，否则也会推送不到npm
      name: 'vue3' // 暴露的全局变量
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    /** 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。
        默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。
        注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。
        当设置为 'terser' 时必须先安装 Terser。（yarn add terser -D）
    */
    minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    terserOptions: { // 在打包代码时移除 console.log、debugger 和 注释
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      format: {
        comments: false // 删除注释
      }
    }
  }
})
