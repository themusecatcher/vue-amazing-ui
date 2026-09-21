#!/usr/bin/env node
/**
 * 按需引入端到端验证（D-9）
 *
 * 做法：在系统临时目录里自包含地搭一个「最小消费方工程」（`node_modules` 软链到本仓库复用依赖），
 * 用 `unplugin-vue-components` + `VueAmazingUIResolver` 按需引入若干组件后真实构建，然后断言：
 *   ① 产物 CSS 命中全部 canary 选择器（缺一即说明某个组件的样式没被引进来）；
 *   ② 构建日志无「模块/文件找不到」类告警；
 *   ③ 手动引入的**推荐写法（裸目录）** 在打包器侧成功引入样式：单段目录 `es/tag/style` 与嵌套目录
 *      `es/grid/row/style` 各一条（`Tag` / `Row` 均未在 demo 中使用，对应 canary 命中只可能来自这两条手动引入）；
 *   ④ 上述两种裸目录写法均可被 Node ESM 解析（`exports` 映射），且与显式文件写法解析结果一致
 *      —— 嵌套目录用于验证 `exports` 通配符 `*` 可跨 `/` 匹配。
 *
 * 边界：本脚本用 Vite 构建，Vite 不做 webpack 式的 `sideEffects` tree-shaking，因此测不到「样式入口被 webpack
 * 丢弃」这类问题；那部分由 scripts/prepublish-guard.js 的第 ④ 项断言（sideEffects 覆盖全部样式产物）兜底。
 *
 * 与 `pnpm guard` 的分工：守卫只查「产物文件在不在」（毫秒级、不跑构建），本脚本查「按需引入后样式是否真的齐全」。
 * 需要已构建的 `es` / `lib` 产物 → 已挂在 `pnpm verify` 链与 `scripts/publish.sh` 中。
 */
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync
} from 'node:fs'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

/** canary：按需引入后，消费方产物 CSS 中必须命中的选择器 */
const CANARIES = [
  {
    pattern: /\.tooltip-card-container\s+\.tooltip-arrow/,
    label: 'Tooltip 全局面板壳 / 箭头（同一 SFC 的第二个 <style> 块）'
  },
  { pattern: /\.va-popup-arrow/, label: 'Popup 作用域样式（Tooltip 的依赖组件）' },
  { pattern: /\.select-panel/, label: 'Select 自身样式' },
  { pattern: /\.swiper/, label: '第三方样式 swiper（vendor-styles）' },
  { pattern: /\.dp__/, label: '第三方样式 @vuepic/vue-datepicker（vendor-styles）' },
  { pattern: /\.tag-wrap/, label: "手动裸目录引入的 Tag 样式（单段目录：import 'vue-amazing-ui/es/tag/style'）" },
  {
    pattern: /\.grid-row-wrap/,
    label: "手动裸目录引入的 Row 样式（嵌套目录：import 'vue-amazing-ui/es/grid/row/style'）"
  }
]

/** 构建日志中不允许出现的「解析失败」类告警 */
const FORBIDDEN_LOG = /Cannot find module|Failed to resolve|does not exist|文件不存在|Could not resolve/i

const CONSUMER_PACKAGE = { name: 'va-consumer', private: true, type: 'module' }

const CONSUMER_VITE_CONFIG = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VueAmazingUIResolver } from '__ROOT__/components/utils/resolver'

const libraryRoot = '__ROOT__'

export default defineConfig({
  plugins: [vue(), Components({ dts: false, resolvers: [VueAmazingUIResolver({ cjs: false })] })],
  resolve: {
    // 让 \`vue-amazing-ui\` 与 \`vue-amazing-ui/es/**\` 都指向本仓库的本地构建产物
    alias: [{ find: /^vue-amazing-ui(\\/.*)?$/, replacement: libraryRoot + '$1' }]
  },
  build: {
    outDir: 'dist',
    lib: { entry: 'src/main.ts', formats: ['es'], fileName: 'app' }
  }
})
`

// 演示组件刻意保持「每组 canary 只有一个来源」：Tooltip 是 Popup 样式的唯一引入者，
// 故 `.va-popup-arrow` 命中即证明「入口替消费方注入了依赖组件样式」（D 方案的核心价值）
const CONSUMER_APP = `<template>
  <div class="page">
    <Tooltip tooltip="按需引入的箭头">
      <button>hover me</button>
    </Tooltip>
    <Select :options="[{ label: 'apple', value: 1 }]" :model-value="1" />
    <Swiper />
    <DatePicker />
  </div>
</template>
`

const CONSUMER_MAIN = `import { createApp } from 'vue'
import App from './App.vue'
// 手动按需引入（文档推荐的裸目录写法）：验证 exports 映射 / 目录索引在打包器侧同样生效
// Tag / Row 均未在 App.vue 中使用，因此产物中出现对应样式只可能来自以下手动引入
// 单段目录
import 'vue-amazing-ui/es/tag/style'
// 嵌套目录（exports 通配符可跨斜杠匹配）
import 'vue-amazing-ui/es/grid/row/style'

createApp(App).mount('#app')
`

function write(baseDir, relativePath, content) {
  const fullPath = join(baseDir, relativePath)
  mkdirSync(dirname(fullPath), { recursive: true })
  writeFileSync(fullPath, content, 'utf-8')
  return fullPath
}

/** 递归收集目录下所有文件 */
function collectFiles(dir, result = []) {
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      collectFiles(fullPath, result)
    } else {
      result.push(fullPath)
    }
  })
  return result
}

/** 裸目录写法的解析用例：单段目录 + 嵌套目录 + cjs 形态（后两者验证 exports 通配符 `*` 可跨 `/` 匹配） */
const BARE_DIR_CASES = [
  { bare: 'vue-amazing-ui/es/tooltip/style', expectedSuffix: '/es/tooltip/style/index.js' },
  { bare: 'vue-amazing-ui/es/grid/row/style', expectedSuffix: '/es/grid/row/style/index.js' },
  { bare: 'vue-amazing-ui/lib/grid/row/style', expectedSuffix: '/lib/grid/row/style/index.cjs' }
]

/**
 * 验证 `exports` 映射：裸目录写法 `vue-amazing-ui/<fmt>/<dir>/style` 能否被 Node ESM 解析
 *
 * 用 `import.meta.resolve`（只解析、不加载）—— 入口内部 import 的是 `.css`，Node 无法加载 CSS 文件，
 * 直接 import 会因扩展名报错而掩盖「解析是否成功」这一验证目标。
 */
function verifyBareDirSpecifier(workDir) {
  const checkDir = join(workDir, 'pkg-check')
  mkdirSync(join(checkDir, 'node_modules'), { recursive: true })
  // 该目录下的 node_modules 只放一个指向本仓库的软链，避免污染仓库自身的 node_modules
  symlinkSync(rootDir, join(checkDir, 'node_modules', 'vue-amazing-ui'), 'dir')
  const script = [
    `const cases = ${JSON.stringify(BARE_DIR_CASES)}`,
    'const resolved = cases.map((c) => ({',
    '  bare: c.bare,',
    '  expectedSuffix: c.expectedSuffix,',
    '  bareUrl: import.meta.resolve(c.bare),',
    "  fileUrl: import.meta.resolve('vue-amazing-ui' + c.expectedSuffix)",
    '}))',
    'console.log(JSON.stringify(resolved))'
  ].join('\n')
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
    cwd: checkDir,
    encoding: 'utf-8'
  })
  if (result.status !== 0) {
    failures.push(`裸目录写法无法被 Node 解析：${result.stderr?.trim()}`)
    return
  }
  JSON.parse(result.stdout.trim()).forEach(({ bare, expectedSuffix, bareUrl, fileUrl }) => {
    if (!bareUrl.endsWith(expectedSuffix)) {
      failures.push(`裸目录写法解析结果异常：${bare} → ${bareUrl}（期望以 ${expectedSuffix} 结尾）`)
    }
    if (bareUrl !== fileUrl) {
      failures.push(`裸目录写法与显式文件写法解析结果不一致：${bareUrl} !== ${fileUrl}`)
    }
  })
}

function main() {
  if (!existsSync(join(rootDir, 'es')) || !existsSync(join(rootDir, 'lib'))) {
    console.error('❌ 未找到 es/ 或 lib/ 产物，请先执行 `pnpm build` 后再运行 `pnpm verify:on-demand`')
    process.exit(1)
  }

  const workDir = mkdtempSync(join(tmpdir(), 'va-on-demand-'))
  try {
    write(workDir, 'package.json', `${JSON.stringify(CONSUMER_PACKAGE, null, 2)}\n`)
    write(workDir, 'vite.config.ts', CONSUMER_VITE_CONFIG.replaceAll('__ROOT__', rootDir))
    write(workDir, 'src/App.vue', CONSUMER_APP)
    write(workDir, 'src/main.ts', CONSUMER_MAIN)
    // 软链仓库依赖，避免在临时工程里重复安装
    symlinkSync(join(rootDir, 'node_modules'), join(workDir, 'node_modules'), 'dir')

    const viteBin = join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js')
    const build = spawnSync(process.execPath, [viteBin, 'build'], {
      cwd: workDir,
      encoding: 'utf-8'
    })
    const buildLog = `${build.stdout ?? ''}\n${build.stderr ?? ''}`
    if (build.status !== 0) {
      failures.push(`消费方工程构建失败：\n${buildLog.trim()}`)
      return
    }
    if (FORBIDDEN_LOG.test(buildLog)) {
      const hits = buildLog
        .split('\n')
        .filter((line) => FORBIDDEN_LOG.test(line))
        .join('\n')
      failures.push(`消费方构建日志出现「解析失败」类告警：\n${hits}`)
    }

    const cssFiles = collectFiles(join(workDir, 'dist')).filter((file) => file.endsWith('.css'))
    if (cssFiles.length === 0) {
      failures.push('消费方产物中没有 CSS 文件，按需引入未注入任何样式')
      return
    }
    const css = cssFiles.map((file) => readFileSync(file, 'utf-8')).join('\n')
    CANARIES.forEach(({ pattern, label }) => {
      if (!pattern.test(css)) {
        failures.push(`产物 CSS 未命中 canary：${label}（${pattern}）`)
      }
    })

    verifyBareDirSpecifier(workDir)

    if (failures.length === 0) {
      const size = (Buffer.byteLength(css) / 1024).toFixed(2)
      console.log(
        `✅ 按需引入验证通过：${cssFiles.length} 个 CSS 产物 / ${size} kB，${CANARIES.length} 条 canary 全部命中`
      )
    }
  } finally {
    rmSync(workDir, { recursive: true, force: true })
  }

  if (failures.length > 0) {
    console.error('❌ 按需引入验证未通过：')
    failures.forEach((failure) => console.error(`   ✗ ${failure}`))
    process.exit(1)
  }
}

main()
