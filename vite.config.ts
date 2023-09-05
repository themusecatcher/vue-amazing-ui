import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ant-desing按需引入
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// 打包体积可视化插件
// import { visualizer } from 'rollup-plugin-visualizer'

import minimist from 'minimist'

// 获取构建选项 build:browser 时，传入的变量: -f iife
const { f } = minimist(process.argv.slice(2))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // visualizer({ // 生成的分析图文件名，默认stats.html
    //   // file: 'stats.html',
    //   open: true // 打包后自动打开分析图
    // }),
    Components({
      resolvers: [ // ant design 自动按需引入
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'images': fileURLToPath(new URL('./src/assets/images', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { // 或者globalVars
          // `themeColor` is global variables fields name
          themeColor: '#1677FF' // #1890FF
        },
        javascriptEnabled: true
      }
    }
  },
  // 构建为库
  build: {
    emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。若 outDir 在根目录之外则会抛出一个警告避免意外删除掉重要的文件。
    lib: { // 构建为库。如果指定了 build.lib，build.cssCodeSplit 会默认为 false。
      formats: f === 'iife' ? ['iife'] : ['es', 'umd'],
      // __dirname 的值是 vite.config.ts 文件所在目录
      entry: resolve(__dirname, 'packages', 'index.ts'),  // entry 是必需的，因为库不能使用HTML作为入口。
      name: 'VueAmazingUI', // 暴露的全局变量
      fileName: 'vue-amazing-ui' // 输出的包文件名，默认是 package.json 的 name 选项
    },
    rollupOptions: { // 自定义底层的Rollup打包配置
      // https://rollupjs.org/configuration-options/
      // 确保外部化处理那些你不想打包进库的依赖（作为外部依赖）
      
      external: f === 'iife' ? ['vue'] : ['vue', 'swiper/modules', 'swiper/vue', '@vuepic/vue-datepicker', '@vueuse/integrations/useQRCode', '@vueuse/core', 'qrcode'],
      // 当创建 iife 或 umd 格式的 bundle 时，你需要通过 output.globals 选项提供全局变量名，以替换掉外部引入。
      output: {
        name: 'VueAmazingUI', // 对于输出格式为 iife | umd 的 bundle 来说，若想要使用全局变量名来表示你的 bundle 时，该选项是必要的。同一页面上的其他脚本可以使用这个变量名来访问你的 bundle 输出
        /*
          output.format: 
          • amd – 异步模块加载，适用于 RequireJS 等模块加载器
          • cjs – CommonJS，适用于 Node 环境和其他打包工具（别名：commonjs）
          • es – 将 bundle 保留为 ES 模块文件，适用于其他打包工具，以及支持 <script type=module> 标签的浏览器。（别名：esm，module）
          • iife – 自执行函数，适用于 <script> 标签（如果你想为你的应用程序创建 bundle，那么你可能会使用它）。iife 表示“自执行 函数表达式”
          • umd – 通用模块定义规范，同时支持 amd，cjs 和 iife
          • system – SystemJS 模块加载器的原生格式（别名：systemjs）
        */
        // format: 'es', // 用于指定生成的 bundle 的格式，默认 'es'，可选 'amd' 'cjs' 'es' 'iife' 'umd' 'system'
        exports: 'named', // 用于指定导出模式，默认是 auto，指根据 input 模块导出推测你的意图
        // 在大多数情况下，该选项值为 false 将避免 Rollup 生成多余代码的 getters，因此在很多情况下，可以使代码兼容 IE8。
        externalLiveBindings: false, // 当该选项的值为 false 时，Rollup 不会为外部依赖生成支持动态绑定的代码，而是假定外部依赖永远不会改变。这使得 Rollup 会生成更多优化代码。请注意，当外部依赖存在循环引用时，该选项值为 false 可能会引起问题。
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          // 'vue-router': 'VueRouter', // 引入vue-router全局变量，否则router.push将无法使用
          'swiper/modules': 'SwiperModules',
          'swiper/vue': 'SwiperVue',
          '@vuepic/vue-datepicker': 'VueDatePicker',
          '@vueuse/integrations/useQRCode': 'UseQRCode',
          '@vueuse/core': 'Core',
          qrcode: 'qrcode'
        }
      }
    },
    /*
      minify:
      设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。
      默认为 'esbuild'，它比 terser 快 20-40 倍，压缩率只差 1%-2%。
      注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。
      当设置为 'terser' 时必须先安装 Terser。（pnpm i terser -D）
    */
    // minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    // terserOptions: { // 在打包代码时移除 console、debugger 和 注释
    //   compress: {
    //     /* (default: false) -- Pass true to discard calls to console.* functions.
    //       If you wish to drop a specific function call such as console.info and/or
    //       retain side effects from function arguments after dropping the function
    //       call then use pure_funcs instead
    //     */
    //     drop_console: true, // 生产环境时移除console
    //     drop_debugger: true
    //   },
    //   format: {
    //     comments: false // 删除注释comments
    //   }
    // },
    // cssCodeSplit: true, // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
    // cssMinify: 'esbuild', // 默认与 build.minify 一致，允许用户覆盖 CSS 最小化压缩的配置，而不是使用默认的 build.minify
    reportCompressedSize: false, // 默认 true，启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    // chunkSizeWarningLimit: 500 // 默认500，规定触发警告的 chunk 大小，单位kbs
  },
  server: {
    host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
    port: 9000, // 指定开发服务器端口
    open: true // 开发服务器启动时，自动在浏览器中打开应用程序。当该值为字符串时，它将被用作 URL 的路径名。
  }
})
