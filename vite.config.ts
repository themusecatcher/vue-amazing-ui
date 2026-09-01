import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'path'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import type { Plugin, BuildEnvironmentOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
// 用于在 库模式 中从 .ts(x) 或 .vue 源文件生成类型文件（*.d.ts）的 Vite 插件 https://github.com/qmhc/vite-plugin-dts/tree/main
import dts from 'vite-plugin-dts'
// import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// ant-desing naive-ui 按需引入
import { AntDesignVueResolver, NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// vue-amazing-ui 按需引入
// import { VueAmazingUIResolver } from 'vue-amazing-ui'
// 打包体积可视化插件
// import { visualizer } from 'rollup-plugin-visualizer'
// 功能全面且轻量级的命令行参数解析工具
import minimist from 'minimist'
// 第三方样式依赖清单（单一数据源，与 resolver.ts 共享）
import { vendorStyles } from './components/utils/vendor-styles'

// 获取 vite build 构建时，传入的参数：dir f（形如 `vite build -- dir=dist f=iife`）
// minimist 的 `_` 字段收集所有「非 -x/--x 开头的裸位置参数」，即 `--` 之后的 `dir=dist f=iife` 会被归入 _ 数组
const { _: args } = minimist(process.argv.slice(2))
// 从位置参数中按 key=value 形式查找，避免依赖固定索引
const findArg = (key: string) => {
  const matched = args.find((arg: string) => arg.startsWith(`${key}=`))
  return matched ? matched.split('=')[1] : undefined
}
const dir = findArg('dir')
const f = findArg('f')
// 项目根目录（vite.config.ts 所在目录），ESM 标准 API 获取，与下方 resolve.alias 写法保持一致
const rootDir = fileURLToPath(new URL('.', import.meta.url))
// 库模式需外部化处理、不打包进产物的第三方依赖（es/lib 按需引入时由消费方解析）
// 注意：swiper 只列出子路径 swiper/modules、swiper/vue 而未列主包 swiper——因为源码中仅从这两个子路径 import，
// 主包 swiper 是它们的公共依赖，保持打包进产物（Rollup 会自动处理），外部化子路径即可让消费方解析到对应实现
const externalDependencies = [
  'vue',
  'date-fns',
  'swiper/modules',
  'swiper/vue',
  '@vuepic/vue-datepicker',
  '@vueuse/core',
  'seemly',
  'qrcode',
  '@ant-design/colors',
  '@ctrl/tinycolor'
]
// UMD/IIFE 构建时为外部依赖提供的全局变量名
const externalGlobals: Record<string, string> = {
  vue: 'Vue',
  'date-fns': 'dateFns',
  'swiper/modules': 'SwiperModules',
  'swiper/vue': 'SwiperVue',
  '@vuepic/vue-datepicker': 'VueDatePicker',
  '@vueuse/core': 'Core',
  seemly: 'seemly',
  qrcode: 'QRCode',
  '@ant-design/colors': 'Colors',
  '@ctrl/tinycolor': 'TinyColor'
}
// dist（IIFE/UMD 全量构建）下生成 dist/css.d.ts，供 package.json exports["./css"].types 指向，解决 `import 'vue-amazing-ui/css'` 的 TS 报错
function generateCssDtsPlugin(): Plugin {
  return {
    name: 'generate-css-dts',
    apply: 'build',
    closeBundle() {
      if (dir !== 'dist') return
      try {
        const cssDts = '// CSS 副作用导入的类型声明（side-effect import）\nexport {}\n'
        writeFileSync(resolve(rootDir, 'dist', 'css.d.ts'), cssDts, 'utf-8')
      } catch (error) {
        console.warn('[generate-css-dts] 生成 css.d.ts 失败', error)
      }
    }
  }
}
// 注意：dist（IIFE/UMD 全量构建）的第三方 CSS 已打进 style.css，无需 vendor 目录
// 将第三方 CSS 复制到产物（es/lib）的 vendor-styles 固定目录，供 resolver 按需引入引用
function copyVendorStylesPlugin(): Plugin {
  return {
    name: 'copy-vendor-styles',
    apply: 'build',
    closeBundle() {
      if (dir === 'dist') return
      const outDirs = ['es', 'lib']
      outDirs.forEach((outDir) => {
        vendorStyles.forEach(({ source, target }) => {
          const sourcePath = resolve(rootDir, 'node_modules', source)
          const targetPath = resolve(rootDir, outDir, target)
          try {
            // mkdirSync 需要创建的是文件所在目录（父目录）而非文件本身，故用 dirname 取 targetPath 的父目录
            mkdirSync(dirname(targetPath), { recursive: true })
            // 读取并剥离 sourceMappingURL 注释，避免消费方因缺失 .map 文件报错
            const content = readFileSync(sourcePath, 'utf-8').replace(/\/\*#\s*sourceMappingURL=[^*]+\*\//g, '')
            writeFileSync(targetPath, content, 'utf-8')
          } catch (error) {
            console.warn(`[copy-vendor-styles] 复制第三方样式失败: ${source} -> ${target}`, error)
          }
        })
        // 清理 Vite 隐式 emit 到 node_modules/.pnpm 的孤儿 CSS asset（已被 vendor 固定路径取代）
        try {
          rmSync(resolve(rootDir, outDir, 'node_modules'), { recursive: true, force: true })
        } catch (error) {
          console.warn('[copy-vendor-styles] 清理 node_modules 孤儿 asset 失败', error)
        }
      })
    }
  }
}
const buildDistOptions = {
  // 注意：必须为 false，不能改成 true！
  // 因为 build:components 脚本用 run-p 并行执行 build:dist / build:browser（两者都写 dist 目录），
  // 若设 true，两个并行任务会在开始时各自清空 dist，产生竞态导致产物互相覆盖丢失。
  // 清空动作由 pnpm build 的前置 clean 脚本（rimraf dist es lib）串行完成，故此处无需（也不能）让 Vite 清空。
  emptyOutDir: false,
  copyPublicDir: false, // 默认情况下，Vite 会在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中。可以通过设置该选项为 false 来禁用该行为。
  // minify: 设置为 false 可禁用混淆，或指定混淆器（默认 'esbuild'）。若需用 terser 去除 console/debugger，需先 `pnpm i -D terser` 并在此配置 minify:'terser' + terserOptions。注意：es/lib 按需构建走 buildESAndLibOptions，该配置仅在 dist 全量构建生效。
  lib: {
    // 构建为库。如果指定了 build.lib，build.cssCodeSplit 会默认为 false。
    /*
      es: 将 bundle 保留为 ES 模块文件，适用于其他打包工具，以及支持 <script type="module"> 标签的浏览器
      umd: 通用模块定义规范，同时支持 amd，cjs 和 iife
      iife: 自执行函数，适用于 <script> 标签（如果你想为你的应用程序创建 bundle，那么你可能会使用它）。iife 表示“自执行 函数表达式”
    */
    formats: f === 'iife' ? ['iife'] : ['es', 'umd'], // f=iife（build:browser）只出 iife；默认（build:dist）出 es+umd，iife 由 build:browser 单独产出，避免重复
    entry: resolve(rootDir, 'components', 'index.ts'), // 或 'components/index.ts' entry 是必需的，因为库不能使用HTML作为入口。
    name: 'VueAmazingUI', // 暴露的全局变量
    fileName: 'index', // 输出的包文件名，默认是 package.json 的 name 选项；也可以定义为以 format 和 entryName 为参数的函数，并返回文件名
    cssFileName: 'style' // 指定 CSS 输出文件的名称，默认为 package.json 中的 name
  },
  rollupOptions: {
    // 自定义底层的 Rollup 打包配置
    plugins: [],
    // https://cn.rollupjs.org/configuration-options
    // 确保外部化处理那些你不想打包进库的依赖（作为外部依赖）
    external: f === 'iife' ? ['vue'] : externalDependencies,
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
      externalLiveBindings: false, // 默认 true，当该选项的值为 false 时，Rollup 不会为外部依赖生成支持动态绑定的代码，而是假定外部依赖永远不会改变。这使得 Rollup 会生成更多优化代码。请注意，当外部依赖存在循环引用时，该选项值为 false 可能会引起问题。
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      globals: externalGlobals
    }
  },
  // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
  cssCodeSplit: false, // 默认 true，如果指定了 build.lib，build.cssCodeSplit 会默认为 false
  // cssMinify: 'esbuild', // boolean | 'esbuild' | 'lightningcss'，默认: 与 build.minify 一致，允许用户覆盖 CSS 最小化压缩的配置，而不是使用默认的 build.minify
  // reportCompressedSize: true, // 默认 true，启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
  chunkSizeWarningLimit: 1000 // 默认 500，规定触发警告的 chunk 大小，单位 kbs
  // sourcemap: false // boolean | 'inline' | 'hidden'，构建后是否生成 source map 文件。默认 false
}
const buildESAndLibOptions = {
  // emptyOutDir: true, // 若 outDir 在 root 目录下，则为 true。默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。若 outDir 在根目录之外则会抛出一个警告避免意外删除掉重要的文件。
  copyPublicDir: false, // 默认情况下，Vite 会在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中。
  lib: {
    // 构建为库。如果指定了 build.lib，build.cssCodeSplit 会默认为 false。
    entry: resolve(rootDir, 'components', 'index.ts') // 或 'components/index.ts'
  },
  rollupOptions: {
    // 自定义底层的 Rollup 打包配置
    plugins: [],
    // https://cn.rollupjs.org/configuration-options
    // 确保外部化处理那些你不想打包进库的依赖（作为外部依赖）
    external: externalDependencies,
    input: resolve(rootDir, 'components', 'index.ts'), // 'components/index.ts'
    output: [
      // https://cn.rollupjs.org/javascript-api/#outputoptions-object
      {
        dir: 'es', // 指定所有生成的 chunk 被放置在哪个目录中
        format: 'es', // 指定生成的 bundle 的格式
        entryFileNames: '[name].js', // 默认：'[name].js'，类型：string | ((chunkInfo: PreRenderedChunk) => string)
        // 指定 chunks 的入口文件模式，其值也可以是一个函数，对每个入口 chunk 调用以返回匹配模式
        // entryFileNames: (chunkInfo: any) => {
        //   console.log('chunkInfo', chunkInfo.name)
        //   if (chunkInfo.name.endsWith('.vue')) {
        //     return chunkInfo.name.replace('.vue', '.js')
        //   }
        //   return `${chunkInfo.name}.js`
        // },
        exports: 'named', // 指定导出模式 named – 适用于使用命名导出的情况
        preserveModules: true, // 将使用原始模块名作为文件名，为所有模块创建单独的 chunk，而不是创建尽可能少的 chunk
        preserveModulesRoot: 'components' // 确保输入的模块会输出到 es 目录下，而不是在 es/components 下
      },
      {
        dir: 'lib',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        // entryFileNames: (chunkInfo: any) => {
        //   console.log('chunkInfo', chunkInfo.name)
        //   if (chunkInfo.name.endsWith('.vue')) {
        //     return chunkInfo.name.replace('.vue', '.cjs')
        //   }
        //   return `${chunkInfo.name}.cjs`
        // },
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'components'
      }
    ]
  },
  // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
  cssCodeSplit: true // 默认 true，如果指定了 build.lib，build.cssCodeSplit 会默认为 false
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools({
      // https://devtools.vuejs.org
      // https://github.com/yyx990803/launch-editor?tab=readme-ov-file#supported-editors
      launchEditor: 'cursor' // code【VSCode】 | cursor【Cursor】 ...
    }),
    generateCssDtsPlugin(),
    copyVendorStylesPlugin(),
    dts({
      // 自动生成类型文件
      outDir: ['es', 'lib'], // 指定输出目录，默认为 Vite 配置的 'build.outDir'，使用 Rollup 时为 tsconfig.json 的 `outDir`
      tsconfigPath: './tsconfig.dts.json',
      cleanVueFileName: true, // 是否将 '.vue.d.ts' 文件名转换为 '.d.ts'，默认 false
      // insertTypesEntry: true, // 是否生成类型入口文件，默认 false；当为 `true` 时会基于 package.json 的 `types` 字段生成，或者 `${outDir}/index.d.ts`
      // rollupTypes: true // 是否将发出的类型文件打包进单个文件，默认 false
      // copyDtsFiles: true // 是否将源码里的 .d.ts 文件复制到 `outDir`，默认 false
      // 使用自定义函数来控制每个文件的输出路径
      beforeWriteFile: (filePath: string, content: string) => {
        // console.log('filePath', filePath)
        // 默认生成的文件路径 filePath: es/components/button/index.d.ts
        // 各个组件需要的文件路径 componentPath: es/button/index.d.ts
        // [^/]+: 匹配一个或多个除了 / 之外的任何单个字符
        let targetPath: string
        // es/components/button/index.d.ts 转换为 es/button/index.d.ts
        targetPath = filePath.replace(/es\/components\/([^/]+)\/index\.d\.ts$/, 'es/$1/index.d.ts')
        if (filePath === targetPath) {
          // 说明文件路径未被匹配，没有任何变动
          // 将 es/components/button/Button.d.ts 转换为 es/button/Button.d.ts
          targetPath = filePath.replace(/es\/components\/([^/]+)\/([^/]+)\.d\.ts$/, 'es/$1/$2.d.ts')
        }
        if (filePath === targetPath) {
          // 将 es/components/components.d.ts 转换为 es/components.d.ts
          // 将 es/components/index.d.ts 转换为 es/index.d.ts
          targetPath = filePath.replace(/es\/components\/([^/]+)\.d\.ts$/, 'es/$1.d.ts')
        }
        if (filePath === targetPath) {
          // 将 es/components/grid/row/index.d.ts 转换为es/grid/row/index.d.ts
          targetPath = filePath.replace(/es\/components\/([^/]+)\/([^/]+)\/index\.d\.ts$/, 'es/$1/$2/index.d.ts')
          if (filePath === targetPath) {
            // 将 es/components/grid/row/Row.d.ts 转换为 es/grid/row/Row.d.ts
            targetPath = filePath.replace(/es\/components\/([^/]+)\/([^/]+)\/([^/]+)\.d\.ts$/, 'es/$1/$2/$3.d.ts')
          }
        }
        // console.log('targetPath', targetPath)
        return {
          filePath: targetPath,
          content
        }
      }
    }),
    Components({
      resolvers: [
        // ant design, naive ui 自动按需引入
        AntDesignVueResolver({
          importStyle: false // css in js
        }),
        NaiveUiResolver()
        // auto import components from VueAmazingUI
        // VueAmazingUIResolver({
        //   cjs: false // whether use commonjs build, default false
        // })
      ]
    })
    // AutoImport({ // 自动引入所需 apis
    //   dts: 'src/auto-imports.d.ts',
    //   imports: ['vue', 'vue-router'],
    //   eslintrc: {
    //     enabled: true,
    //     filepath: './.eslintrc-auto-import.json',
    //     globalsPropValue: true
    //   }
    // }),
    // visualizer({ // 生成的分析图文件名，默认stats.html
    //   // file: 'stats.html',
    //   open: true // 打包后自动打开分析图
    // })
  ],
  // 构建为库：dir=dist（build:dist / build:browser 全量构建）走 buildDistOptions；
  // 其余情况（含 build-only 无 dir 参数）走 buildESAndLibOptions，产出 es + lib 按需产物
  build: (dir === 'dist' ? buildDistOptions : buildESAndLibOptions) as BuildEnvironmentOptions,
  resolve: {
    alias: {
      // demo 演示页按真实用户用法从包总出口引入，重定向到源码总出口
      'vue-amazing-ui': fileURLToPath(new URL('./components/index.ts', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./types', import.meta.url)),
      components: fileURLToPath(new URL('./components', import.meta.url)),
      less: fileURLToPath(new URL('./src/assets/less', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 或者globalVars
          // `themeColor` is global variables fields name
          themeColor: '#1677ff',
          themeHoverColor: '#4096ff'
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
    port: 9000, // 指定开发服务器端口
    open: true // 开发服务器启动时，自动在浏览器中打开应用程序。当该值为字符串时，它将被用作 URL 的路径名。
  }
})
