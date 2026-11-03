#!/usr/bin/env node
/**
 * 主题架构守护
 *
 * 只保留「单测不适合做」的部分：跨文件统计、演示站与文档目录扫描、全库闭合性、注册表清单自检。
 * 与数据自洽有关的契约已单一化到测试侧，此处不再重复实现：
 * - 注册表自洽（键 / 名称 / `file` / `fallback` / `themeRole` / `ThemeComponentKey`）→ `tests/component-vars.spec.ts`
 * - 公开令牌每处使用都带与注册表一致的 fallback → `tests/component-vars.spec.ts`
 *   （本脚本只做全库口径那一条：任何组件都不得在 `<style>` 里声明公开令牌，见强制项 4）
 * - 悬空引用（无 fallback 且从未声明）→ `tests/component-vars.spec.ts`
 * - `theme.css` 两套表各含全部别名 → `tests/theme-build.spec.ts`
 *
 * 强制项（失败即退出非 0）：
 * 1. 组件不再参与主题：`components/**` 下不得出现 `useInject(` / `getColorPalettes(` / `getAlphaColor(`；
 * 2. 组件级主色清单自检：键不重复、`dir` 存在（这两项单测覆盖不到，缺失只会以 ENOENT 崩测试）；
 * 3. `var(--va-*)` 引用一致性：所有引用必须命中 `components/theme/vars.ts` 的别名清单、
 *    `components/theme/component-vars.ts` 的组件令牌清单、登记过的全局变量，或内部桥
 *    `--va-cp-*`（内部桥由 Provider 写入，组件只能带 fallback 消费）；
 * 4. 组件不得写入别名变量：行内样式里的 `--va-*` 声明只允许 `--va-local-*`；
 *    **公开组件令牌只能消费、不能声明**：`<style>` 段里出现 `--va-<component>-*:` 即失败
 *    （元素自身声明会压住祖先继承值，用户覆盖就失效）；模板 / 脚本段只允许所属组件做实例覆盖；
 * 5. `var(--va-*)` 的值语法合法：变量引用后不得跟裸字符（如 `var(--x)fff`，整条声明会被浏览器丢弃）；
 * 6. SVG 的 colors 属性不写 `var()`：presentation attribute 不解析 CSS 变量（会静默失效），必须写进 `style`；
 * 7. 公开变量必须闭合：每个别名至少被一个组件消费（CSS `var()` 引用或 JS 快照字符串读取；
 *    零消费的「预留位」覆盖后没有任何效果）；
 * 8. 演示站 / 文档中的 `--va-cp-*` 必须带 fallback（单测只扫 `components/`）。
 *
 * 告警项（默认不失败，`--strict` 时失败）：
 * 组件 `<style>` 与 `<script>` / `<template>` 中的颜色字面量（`#hex` / `rgb(` / `hsl(`），
 * 预设色板与例外清单见 `COLOR_LITERAL_WHITELIST` / `SCRIPT_LITERAL_WHITELIST`。
 * 全量归零需要逐组件视觉验收，故先以告警形式暴露存量。
 *
 * 扫描前统一剥离注释：注释里的示例色值不是实现，不应制造噪声。
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { COMPONENT_VAR_NAMES, COMPONENT_VARS, THEME_COMPONENTS } from '../components/theme/component-vars'
import { THEME_VAR_NAMES } from '../components/theme/vars'
import { collectVarRefs, splitSfc, stripComments } from './component-vars-parse'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const strict = process.argv.includes('--strict')
const failures: string[] = []
const warnings: string[] = []

// 全局令牌清单直接引用源码常量（脚本经 tsx 执行，不需要再正则解析 TS）
const varNames: string[] = [...THEME_VAR_NAMES]
const varNameSet = new Set(varNames)

// 组件级公开令牌注册表：静态 import 同一份数据源（脚本经 tsx 执行，可直接读 .ts）
const componentVarNames = [...COMPONENT_VAR_NAMES]
const componentVarSet = new Set(componentVarNames)
/** 内部组件级主色桥前缀：只允许消费（必须带 fallback），不允许组件声明 */
const INTERNAL_BRIDGE_PREFIX = '--va-cp-'

/** 不属于颜色域、但允许被组件引用的全局变量 */
const GLOBAL_VAR_WHITELIST = new Set(['--va-scrollbar-width'])

/**
 * 颜色字面量的例外（预设色板 / 语义色板 / 组件自有色彩面板），按文件登记
 * 这些是「组件自己的色彩资产」，不参与主题派生，靠人工验收维护
 */
const COLOR_LITERAL_WHITELIST = [
  'tag/Tag.vue',
  'badge/Badge.vue',
  'tooltip/Tooltip.vue',
  'gradient-text/GradientText.vue',
  'result/Result.vue',
  'color-picker/ColorPicker.vue',
  'menu/Menu.vue'
]

/**
 * 设计固定：色值本身就是设计的一部分，跟随主题反而会坏
 * - 压在图片 / 视频上的 chrome（黑遮罩 + 白图标）：跟随主题会让暗色失效
 * - 浮层方向阴影：单个 CSS 变量无法表达「x 分量取负」的方向变体，只能逐向写常量
 * - `Layout` 深色 Sider / Header：独立皮肤，改主题不应重定义
 * - `Empty` 预置插画色：插画属于品牌插图，不随主色派生
 *
 * 与 COLOR_LITERAL_WHITELIST 的分工：后者是「组件自有色彩资产」（预设色板、独立皮肤），
 * 靠逐组件验收维护；本清单是「跟随主题反而会坏」的固定 chrome 与无法用变量表达的方向阴影。
 */
const FIXED_BY_DESIGN = [
  'image/Image.vue',
  'video/Video.vue',
  'upload/Upload.vue',
  'progress/Progress.vue',
  'drawer/Drawer.vue',
  'date-picker/DatePicker.vue',
  'time-picker/TimePicker.vue',
  'slider/Slider.vue',
  'dropdown/Dropdown.vue',
  'card/Card.vue',
  'empty/Empty.vue',
  'layout/layout-sider/LayoutSider.vue',
  'layout/layout-header/LayoutHeader.vue'
]

const LITERAL_PATTERN = /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/g

function walk(dir: string, result: string[] = []): string[] {
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, result)
    } else if (entry.name.endsWith('.vue')) {
      result.push(fullPath)
    }
  })
  return result
}

/** 读取目录下所有匹配后缀的源码（用于演示站 / 文档目录的整体扫描） */
function readDirSources(dir: string, extensions: string[] = ['.vue', '.ts', '.less']): string {
  let sources = ''
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      sources += readDirSources(fullPath, extensions)
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      sources += readFileSync(fullPath, 'utf-8')
    }
  })
  return sources
}

const componentFiles = walk(resolve(rootDir, 'components')).map((file) =>
  relative(resolve(rootDir, 'components'), file).split('\\').join('/')
)

// ① 组件不再参与主题
const THEME_API_PATTERN = /\buseInject\(|\bgetColorPalettes\(|\bgetAlphaColor\(/
componentFiles.forEach((file) => {
  const source = readFileSync(resolve(rootDir, 'components', file), 'utf-8')
  if (THEME_API_PATTERN.test(source)) {
    failures.push(`组件仍在使用旧主题通道（useInject / getColorPalettes / getAlphaColor）：${file}`)
  }
})

// ② 组件级主色清单自检：重复键与目录缺失单测覆盖不到（缺失只会以 ENOENT 崩测试），在此守护。
//   「清单内每个组件都有桥变量消费点」已交给 tests/component-vars.spec.ts 的「组件级主色覆盖」。
const seenThemeComponents = new Set<string>()
THEME_COMPONENTS.forEach(({ key, dir }) => {
  if (seenThemeComponents.has(key)) {
    failures.push(`组件级主色清单存在重复键：${key}`)
    return
  }
  seenThemeComponents.add(key)
  if (!existsSync(resolve(rootDir, 'components', dir))) {
    failures.push(`组件级主色清单目录不存在：${dir}（${key}）`)
  }
})

// ③ 变量引用一致性、写入位置与公开令牌的所属权
const writtenAliasPattern = /(--va-(?!local-)[a-z0-9-]+)\s*:/g
/** `var(--va-x)` 后紧跟裸字符即非法值（整条声明会被浏览器丢弃）；
 *  排除空格 / 逗号 / 右括号 / 感叹号以及引号（JS 字符串与 HTML 属性的合法包裹） */
const brokenVarPattern = /var\(--va-[a-z0-9-]+\)[^\s;,)}!'"`]/g
componentFiles.forEach((file) => {
  const source = readFileSync(resolve(rootDir, 'components', file), 'utf-8')
  const { head, style } = splitSfc(source)

  for (const { name, hasFallback } of collectVarRefs(source)) {
    if (name.startsWith(INTERNAL_BRIDGE_PREFIX)) {
      // 内部桥由 Provider 写入；组件只消费，且必须带 fallback（否则无 Provider 时整条声明失效）
      if (!hasFallback) {
        failures.push(`内部桥变量必须带 fallback：${name}（${file}）`)
      }
      continue
    }
    // 只校验 `--va-*` 契约；组件私有变量由「悬空引用」单测处理。
    // 以 `-` 结尾的是动态拼接 / 注释里的占位名（如 `var(--va-*)`），跳过。
    if (!name.startsWith('--va-') || name.endsWith('-')) {
      continue
    }
    // `--va-local-*` 是组件自有本地变量：规则放行声明，引用同样放行（与 component-vars.spec.ts 口径一致）
    if (name.startsWith('--va-local-')) {
      continue
    }
    if (!varNameSet.has(name) && !componentVarSet.has(name) && !GLOBAL_VAR_WHITELIST.has(name)) {
      failures.push(`引用了未定义的变量：${name}（${file}）`)
    }
  }
  // `<style>` 段：别名变量与公开组件令牌都不允许在这里声明
  for (const matched of stripComments(style).matchAll(writtenAliasPattern)) {
    const name = matched[1]
    if (componentVarSet.has(name)) {
      failures.push(`公开组件令牌不得在 <style> 中声明（祖先覆盖会失效）：${name}（${file}）`)
    } else if (!varNameSet.has(name)) {
      failures.push(`组件写入了未知变量：${name}（${file}）`)
    }
  }
  // 模板 / 脚本段：允许所属组件对公开名做实例覆盖（inline 优先级最高，实例 > 祖先）
  for (const matched of stripComments(head).matchAll(writtenAliasPattern)) {
    const name = matched[1]
    if (componentVarSet.has(name)) {
      const owner = COMPONENT_VARS[name]?.file
      if (owner !== file) {
        failures.push(`公开组件令牌只能由所属组件做实例覆盖：${name}（${file}，应为 ${owner}）`)
      }
    } else if (!varNameSet.has(name)) {
      failures.push(`组件写入了未知变量：${name}（${file}）`)
    }
  }
  for (const matched of source.matchAll(brokenVarPattern)) {
    failures.push(`变量引用后跟裸字符，声明会被丢弃：${matched[0]}（${file}）`)
  }
  // SVG presentation attribute（fill / stroke / stop-color 等）不解析 var()，会静默退回默认色
  for (const matched of source.matchAll(/\b(fill|stroke|stop-color|flood-color|lighting-color)="var\(--va-/g)) {
    failures.push(`SVG 属性不能写 var()：${matched[0]}（${file}），请改用 style="…: var(…)"`)
  }
})

const styleCache = new Map<string, string>()
/** 读取组件 `<style>` 段（已剥离注释），按文件缓存 */
function styleOf(file: string): string {
  const cached = styleCache.get(file)
  if (cached !== undefined) {
    return cached
  }
  const style = stripComments(splitSfc(readFileSync(resolve(rootDir, 'components', file), 'utf-8')).style)
  styleCache.set(file, style)
  return style
}

/** 单个文件的字面量统计（`count` = 该文件内的出现次数） */
interface LiteralBucket {
  file: string
  count: number
}

// ④ 颜色字面量：三档分类 —— 设计固定 / 组件自有色彩资产 / 未登记（后者才是债）
const literalBuckets: { fixed: LiteralBucket[]; assets: LiteralBucket[]; unknown: LiteralBucket[] } = {
  fixed: [],
  assets: [],
  unknown: []
}
componentFiles.forEach((file) => {
  const count = (styleOf(file).match(LITERAL_PATTERN) ?? []).length
  if (count === 0) {
    return
  }
  if (COLOR_LITERAL_WHITELIST.includes(file)) {
    literalBuckets.assets.push({ file, count })
  } else if (FIXED_BY_DESIGN.includes(file)) {
    literalBuckets.fixed.push({ file, count })
  } else {
    literalBuckets.unknown.push({ file, count })
  }
})
const sumOf = (list: LiteralBucket[]): number => list.reduce((sum, item) => sum + item.count, 0)
const describe = (list: LiteralBucket[]): string =>
  list
    .sort((first, second) => second.count - first.count)
    .map((item) => `${item.file}(${item.count})`)
    .join('、')

// 未登记的字面量必须有人工结论：要么换成 --va-*，要么登记进上面的两份清单并写清理由
const unknownTotal = sumOf(literalBuckets.unknown)
if (unknownTotal > 0) {
  const message = `未登记的组件色值 ${unknownTotal} 处（${describe(literalBuckets.unknown)}）——请改用 --va-* 变量，或登记进 FIXED_BY_DESIGN / COLOR_LITERAL_WHITELIST 并注明理由`
  if (strict) {
    failures.push(message)
  } else {
    warnings.push(message)
  }
}

/**
 * 脚本 / 模板中的颜色字面量例外：组件自有色彩资产
 * （预设色板 / 本源色域 / canvas 默认值 / 压在媒体上的固定 chrome），不参与主题派生
 */
const SCRIPT_LITERAL_WHITELIST = [
  'carousel/Carousel.vue',
  'color-picker/ColorPicker.vue',
  'qr-code/QRCode.vue',
  'rate/Rate.vue',
  'result/Result.vue',
  'segmented/Segmented.vue',
  'tooltip/Tooltip.vue',
  'watermark/Watermark.vue'
]

// ⑤ 颜色字面量（`<style>` 之前的脚本 / 模板）：这类色值不进样式块，旧守护完全看不到 ——
//    Timeline 写死的圆点色就是这样漏掉的。同样按「登记制」暴露存量。
const scriptBuckets: { assets: LiteralBucket[]; unknown: LiteralBucket[] } = { assets: [], unknown: [] }
componentFiles.forEach((file) => {
  const source = readFileSync(resolve(rootDir, 'components', file), 'utf-8')
  const { head } = splitSfc(source)
  const count = (stripComments(head).match(LITERAL_PATTERN) ?? []).length
  if (count === 0) {
    return
  }
  if (SCRIPT_LITERAL_WHITELIST.includes(file)) {
    scriptBuckets.assets.push({ file, count })
  } else {
    scriptBuckets.unknown.push({ file, count })
  }
})
const scriptUnknownTotal = sumOf(scriptBuckets.unknown)
if (scriptUnknownTotal > 0) {
  const message = `脚本 / 模板中未登记的色值 ${scriptUnknownTotal} 处（${describe(scriptBuckets.unknown)}）——请改用 var(--va-*)，或登记进 SCRIPT_LITERAL_WHITELIST 并注明理由`
  if (strict) {
    failures.push(message)
  } else {
    warnings.push(message)
  }
}

// ⑥ 公开变量必须闭合：零消费的「预留位」覆盖后没有任何效果，比不提供更糟。
//   消费有两种形态：CSS 里的 `var(--va-*)`，以及无法用 CSS 表达的 JS 快照读取
//   （如 Watermark 的 canvas 通过 `themeSnapshot.value['--va-fill-color-3']` 取色）。
const consumerSource = componentFiles
  .map((file) => readFileSync(resolve(rootDir, 'components', file), 'utf-8'))
  .join('\n')
  .concat('\n', readFileSync(resolve(rootDir, 'components/style/global.less'), 'utf-8'))
const snapshotConsumerSource = componentFiles
  .map((file) => stripComments(readFileSync(resolve(rootDir, 'components', file), 'utf-8')))
  .join('\n')
const snapshotConsumedVars = new Set(
  [...snapshotConsumerSource.matchAll(/['"](--va-[a-z0-9-]+)['"]/g)].map((matched) => matched[1])
)
const unusedVars = varNames.filter((name) => !consumerSource.includes(`var(${name}`) && !snapshotConsumedVars.has(name))
if (unusedVars.length > 0) {
  failures.push(`以下公开变量没有任何组件消费（覆盖后无效果，应删除或补消费点）：${unusedVars.join('、')}`)
}

// ⑦ 演示 / 文档中的桥变量引用必须带 fallback：`--va-cp-*` 只在配置了组件级主色时由 Provider 写入，
//    缺回退时整条声明会被浏览器丢弃，表现为「示例颜色静默失效」（calendar / notification 示例各踩过一次）。
const bridgeRefWithoutFallback = /var\((--va-cp-[a-z0-9-]+)\)/g
const bridgeDemoSources = [
  readDirSources(resolve(rootDir, 'src', 'views'), ['.vue', '.ts', '.less']),
  readDirSources(resolve(rootDir, 'docs', 'guide', 'components'), ['.vue', '.ts', '.less', '.md'])
].join('\n')
const bridgeOffenders = [
  ...new Set([...stripComments(bridgeDemoSources).matchAll(bridgeRefWithoutFallback)].map((matched) => matched[1]))
]
if (bridgeOffenders.length > 0) {
  failures.push(`演示 / 文档中的桥变量缺少回退值（无组件级主色配置时整条声明会被丢弃）：${bridgeOffenders.join('、')}`)
}

warnings.forEach((warning) => console.warn(`⚠️  [verify-theme] ${warning}`))
if (failures.length > 0) {
  console.error('❌ 主题守护未通过：')
  failures.forEach((failure) => console.error(`   ✗ ${failure}`))
  process.exit(1)
}
console.log(
  `✅ 主题守护通过：${varNames.length} 个别名变量、${componentVarNames.length} 个组件令牌、${componentFiles.length} 个组件文件`
)
console.log(
  `   样式色值：设计固定 ${sumOf(literalBuckets.fixed)} 处（${describe(literalBuckets.fixed)}）、` +
    `组件自有色彩资产 ${sumOf(literalBuckets.assets)} 处、未登记 ${unknownTotal} 处`
)
console.log(
  `   脚本色值：组件自有色彩资产 ${sumOf(scriptBuckets.assets)} 处（${describe(scriptBuckets.assets)}）、` +
    `未登记 ${scriptUnknownTotal} 处`
)
