#!/usr/bin/env node
/**
 * 主题架构守护
 *
 * 强制项（失败即退出非 0）：
 * 1. 组件不再参与主题：`components/**` 下不得出现 `useInject(` / `getColorPalettes(` / `getAlphaColor(`；
 * 2. `var(--va-*)` 引用一致性：所有引用必须命中 `components/theme/vars.ts` 的别名清单、
 *    `components/theme/component-vars.js` 的组件令牌清单、登记过的全局变量，或内部桥
 *    `--va-cp-*`（内部桥由 Provider 写入，组件只能带 fallback 消费）；
 * 3. 组件不得写入别名变量：行内样式里的 `--va-*` 声明只允许 `--va-local-*`；
 * 4. **公开组件令牌只能消费、不能声明**：`<style>` 段里出现 `--va-<component>-*:` 即失败
 *    （元素自身声明会压住祖先继承值，用户覆盖就失效）；模板 / 脚本段只允许所属组件做实例覆盖；
 *    派生组件（如 DropdownButton）可以消费他人令牌，但同样必须带 fallback（见第 5 条，扫描全库）；
 * 5. **公开组件令牌的每一处使用都必须带 fallback**，且 fallback 与注册表逐字一致
 *    （漏写 fallback 时该声明在 computed-value 阶段变 unset，视觉静默坏而守护全绿）；
 * 6. 注册表自检：键集合与名称数组一致、`file` 存在、`fallback` 非空、
 *    fallback 指向私有名时必须提供 `resolved.light / resolved.dark`；
 *    `themeRole` / `themeState` 必须成对且档位合法，`COMPONENT_THEME_NAMES` 与注册表一致；
 *    `.d.ts` 的 `ThemeComponentKey` 联合类型与 `THEME_COMPONENTS` 的键逐项一致
 *    （注册表是运行期数据源，联合类型是编译期入口，两份手写数据必须同步）；
 * 7. 默认变量表可复现：`components/style/generated/theme.css` 存在时，两套表各含全部别名；
 * 8. `var(--va-*)` 的值语法合法：变量引用后不得跟裸字符（如 `var(--x)fff`，整条声明会被浏览器丢弃）；
 * 9. SVG 的 colors 属性不写 `var()`：presentation attribute 不解析 CSS 变量（会静默失效），必须写进 `style`；
 * 10. 公开变量必须闭合：每个别名至少被一个组件消费（CSS `var()` 引用或 JS 快照字符串读取；
 *     零消费的「预留位」覆盖后没有任何效果）；
 * 11. 颜色字面量分三档：设计固定 / 组件自有色彩资产 / 未登记，未登记者告警（见文件末尾）。
 * 12. 悬空引用：`var(--x)` 既无 fallback、库内也从未声明过即失败（整条声明会被浏览器丢弃，
 *     典型成因是重命名变量时漏改引用）。
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
import { fileURLToPath, pathToFileURL } from 'node:url'
import { collectVarRefs, collectVarUsages, normalizeValue, splitSfc, stripComments } from './component-vars-check.js'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const strict = process.argv.includes('--strict')
const failures = []
const warnings = []

/** 从 vars.ts 解析别名清单，避免脚本内复制一份而漂移 */
function readVarNames() {
  const source = readFileSync(resolve(rootDir, 'components/theme/vars.ts'), 'utf-8')
  const block = source.match(/THEME_VAR_NAMES = \[([\s\S]*?)\] as const/)
  if (!block) {
    throw new Error('[verify-theme] 未能从 components/theme/vars.ts 解析 THEME_VAR_NAMES')
  }
  return [...block[1].matchAll(/'(--va-[a-z0-9-]+)'/g)].map((matched) => matched[1])
}

/** 契约规模：增删变量必须同步更新脚本、文档与测试三处口径 */
const EXPECTED_VAR_COUNT = 40
/** 组件公开令牌规模（`components/theme/component-vars.js` 与生成文档同口径） */
const EXPECTED_COMPONENT_VAR_COUNT = 48

const varNames = readVarNames()
const varNameSet = new Set(varNames)
if (varNames.length !== EXPECTED_VAR_COUNT) {
  failures.push(`别名清单应为 ${EXPECTED_VAR_COUNT} 个，实际 ${varNames.length} 个`)
}

// 组件级公开令牌注册表：脚本是 ESM，直接 import 同一份数据源（注册表必须是 .js，node 不认 .ts）
const { COMPONENT_THEME_NAMES, COMPONENT_VAR_NAMES, COMPONENT_VARS, THEME_COMPONENTS } = await import(
  pathToFileURL(resolve(rootDir, 'components/theme/component-vars.js')).href
)
const componentVarNames = [...COMPONENT_VAR_NAMES]
const componentVarSet = new Set(componentVarNames)
/** 内部组件级主色桥前缀：只允许消费（必须带 fallback），不允许组件声明 */
const INTERNAL_BRIDGE_PREFIX = '--va-cp-'
/** 组件键 → 桥变量 kebab 段（与 theme-scope.ts 的口径一致） */
const toKebab = (key) => key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
/** 组件级主色允许的派生档位（与 `deriveColorStates` 的返回键一致） */
const COMPONENT_THEME_STATES = new Set(['base', 'hover', 'active', 'bg', 'border', 'solid'])

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

function walk(dir, result = []) {
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

const componentFiles = walk(resolve(rootDir, 'components')).map((file) =>
  relative(resolve(rootDir, 'components'), file).split('\\').join('/')
)

// ⓪ 组件公开令牌注册表自检
const PRIVATE_REF_PATTERN = /var\(--(?!va-)[a-z0-9-]+/
if (componentVarNames.length !== EXPECTED_COMPONENT_VAR_COUNT) {
  failures.push(`组件公开令牌应为 ${EXPECTED_COMPONENT_VAR_COUNT} 个，实际 ${componentVarNames.length} 个`)
}
const registryKeys = Object.keys(COMPONENT_VARS)
const missingMeta = componentVarNames.filter((name) => !COMPONENT_VARS[name])
const unknownMeta = registryKeys.filter((name) => !componentVarSet.has(name))
if (missingMeta.length > 0) {
  failures.push(`COMPONENT_VARS 缺少元数据：${missingMeta.join('、')}`)
}
if (unknownMeta.length > 0) {
  failures.push(`COMPONENT_VARS 存在未登记名称的键：${unknownMeta.join('、')}`)
}
if (registryKeys.length !== componentVarNames.length) {
  failures.push(
    `COMPONENT_VARS 键数（${registryKeys.length}）与 COMPONENT_VAR_NAMES（${componentVarNames.length}）不一致`
  )
}
componentVarNames.forEach((name) => {
  const meta = COMPONENT_VARS[name]
  if (!meta) {
    return
  }
  if (!name.startsWith('--va-')) {
    failures.push(`公开令牌必须以 --va- 开头：${name}`)
  }
  if (!meta.file) {
    failures.push(`公开令牌缺少 file：${name}`)
  } else if (!existsSync(resolve(rootDir, 'components', meta.file))) {
    failures.push(`公开令牌的 file 不存在：${name} → ${meta.file}`)
  }
  if (!meta.group) {
    failures.push(`公开令牌缺少 group：${name}`)
  }
  if (!meta.fallback) {
    failures.push(`公开令牌缺少 fallback：${name}`)
  }
  if (!meta.description) {
    failures.push(`公开令牌缺少 description：${name}`)
  }
  if (!meta.component) {
    failures.push(`公开令牌缺少 component：${name}`)
  }
  if (meta.themeRole) {
    if (meta.themeRole !== 'primary') {
      failures.push(`themeRole 只允许 primary：${name}`)
    }
    if (!meta.themeState) {
      failures.push(`登记 themeRole 时必须提供 themeState：${name}`)
    } else if (typeof meta.themeState === 'string') {
      if (!COMPONENT_THEME_STATES.has(meta.themeState)) {
        failures.push(`themeState 非法：${name} → ${meta.themeState}`)
      }
    } else {
      if (!COMPONENT_THEME_STATES.has(meta.themeState.light)) {
        failures.push(`themeState.light 非法：${name} → ${meta.themeState.light}`)
      }
      if (!COMPONENT_THEME_STATES.has(meta.themeState.dark)) {
        failures.push(`themeState.dark 非法：${name} → ${meta.themeState.dark}`)
      }
    }
  } else if (meta.themeState) {
    failures.push(`未登记 themeRole 的令牌不应提供 themeState：${name}`)
  }
  // fallback 指向组件私有名时，文档讲不出真实默认值，必须补 resolved
  if (PRIVATE_REF_PATTERN.test(meta.fallback ?? '')) {
    if (!meta.resolved || !meta.resolved.light || !meta.resolved.dark) {
      failures.push(`fallback 指向私有名时必须提供 resolved.light / resolved.dark：${name}`)
    }
  }
})

// 组件级主色支持名单必须与注册表实际出现 themeRole 的组件一致，避免文档/告警与实际能力漂移
const expectedThemeComponents = [
  ...new Set(
    componentVarNames
      .map((name) => COMPONENT_VARS[name])
      .filter((meta) => meta?.themeRole)
      .map((meta) => meta.component)
  )
]
if (
  expectedThemeComponents.length !== COMPONENT_THEME_NAMES.length ||
  expectedThemeComponents.some((component, index) => component !== COMPONENT_THEME_NAMES[index])
) {
  failures.push(
    `COMPONENT_THEME_NAMES 与注册表不一致：期望 ${expectedThemeComponents.join(' / ') || '空'}，实际 ${COMPONENT_THEME_NAMES.join(' / ') || '空'}`
  )
}

// 配置键的类型联合必须与注册表一致：类型收窄是「写错组件名编译期报错」的唯一保障，
// 一旦类型定义与注册表漂移，用户会看到「IDE 报错但运行期可用」或反之。
// 类型在 `component-vars.types.ts`（`.d.ts` 只声明 `.js` 的值导出，不承载类型）。
const componentVarsTypesPath = resolve(rootDir, 'components/theme/component-vars.types.ts')
const themeComponentKeyBlock = readFileSync(componentVarsTypesPath, 'utf-8').match(
  /export type ThemeComponentKey\s*=([\s\S]*?)(?=\nexport\b)/
)
const registryThemeComponentKeys = THEME_COMPONENTS.map((item) => item.key)
if (!themeComponentKeyBlock) {
  failures.push('components/theme/component-vars.types.ts 缺少 ThemeComponentKey 联合类型')
} else {
  const typedThemeComponentKeys = [...themeComponentKeyBlock[1].matchAll(/'([A-Za-z0-9]+)'/g)].map(
    (matched) => matched[1]
  )
  const sameKeys =
    typedThemeComponentKeys.length === registryThemeComponentKeys.length &&
    typedThemeComponentKeys.every((key, index) => key === registryThemeComponentKeys[index])
  if (!sameKeys) {
    failures.push(
      `ThemeComponentKey 与 THEME_COMPONENTS 不一致：类型 ${typedThemeComponentKeys.join(' / ') || '空'}，注册表 ${registryThemeComponentKeys.join(' / ') || '空'}`
    )
  }
}

// ① 组件不再参与主题
const THEME_API_PATTERN = /\buseInject\(|\bgetColorPalettes\(|\bgetAlphaColor\(/
componentFiles.forEach((file) => {
  const source = readFileSync(resolve(rootDir, 'components', file), 'utf-8')
  if (THEME_API_PATTERN.test(source)) {
    failures.push(`组件仍在使用旧主题通道（useInject / getColorPalettes / getAlphaColor）：${file}`)
  }
})

// ①.5 组件级主色覆盖检查：清单里每个组件必须至少有一处桥变量消费；
// 已有公开令牌映射的组件（Button / Slider / Menu）由注册表消费点覆盖，不再要求桥。
const PUBLIC_THEME_COMPONENTS = new Set(COMPONENT_THEME_NAMES)
const themeComponentDirs = new Set()
function readDirSources(dir) {
  let sources = ''
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      sources += readDirSources(fullPath)
    } else if (['.vue', '.ts', '.less'].some((ext) => entry.name.endsWith(ext))) {
      sources += readFileSync(fullPath, 'utf-8')
    }
  })
  return sources
}
THEME_COMPONENTS.forEach(({ key, dir }) => {
  if (themeComponentDirs.has(key)) {
    failures.push(`组件级主色清单存在重复键：${key}`)
    return
  }
  themeComponentDirs.add(key)
  if (!existsSync(resolve(rootDir, 'components', dir))) {
    failures.push(`组件级主色清单目录不存在：${dir}（${key}）`)
    return
  }
  if (PUBLIC_THEME_COMPONENTS.has(key)) {
    return
  }
  const sources = readDirSources(resolve(rootDir, 'components', dir))
  if (!sources.includes(`${INTERNAL_BRIDGE_PREFIX}${toKebab(key)}-`)) {
    failures.push(`组件 ${key} 已登记组件级主色，但源码里没有任何 ${INTERNAL_BRIDGE_PREFIX}${toKebab(key)}- 消费点`)
  }
})

// ② + ③ 变量引用一致性、写入位置与公开令牌的所属权
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
    // 只校验 `--va-*` 契约；组件私有变量由 ⑨ 悬空引用规则处理。
    // 以 `-` 结尾的是动态拼接 / 注释里的占位名（如 `var(--va-*)`），跳过。
    if (!name.startsWith('--va-') || name.endsWith('-')) {
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

// ④ 公开组件令牌：只能在所属组件内消费，且每一处使用都必须带与注册表一致的 fallback
const styleCache = new Map()
/** 读取组件 `<style>` 段（已剥离注释），按文件缓存 */
function styleOf(file) {
  if (!styleCache.has(file)) {
    styleCache.set(file, stripComments(splitSfc(readFileSync(resolve(rootDir, 'components', file), 'utf-8')).style))
  }
  return styleCache.get(file)
}
componentVarNames.forEach((name) => {
  const meta = COMPONENT_VARS[name]
  if (!meta?.file) {
    return
  }
  const ownerPath = resolve(rootDir, 'components', meta.file)
  if (!existsSync(ownerPath)) {
    return
  }
  let ownerUsages = 0
  componentFiles.forEach((file) => {
    const usages = collectVarUsages(styleOf(file), name)
    if (usages.length === 0) {
      return
    }
    if (file === meta.file) {
      ownerUsages += usages.length
    }
    // 允许派生组件消费（如 DropdownButton 的分割线跟随 Button 的 hover 色），
    // 但**每一处**都必须带 fallback：漏写时该声明会在 computed-value 阶段变成 unset，
    // 视觉静默坏掉，而只看所属组件是发现不了的
    usages.forEach(({ hasFallback, fallback }) => {
      if (!hasFallback) {
        failures.push(`公开组件令牌的每一处使用都必须带 fallback：${name}（${file}）`)
        return
      }
      if (normalizeValue(fallback) !== normalizeValue(meta.fallback)) {
        failures.push(`fallback 与注册表不一致：${name} → ${fallback}（${file}，注册表：${meta.fallback}）`)
      }
    })
  })
  if (ownerUsages === 0) {
    failures.push(`公开组件令牌在所属组件内没有任何消费点（覆盖后无效果）：${name}（${meta.file}）`)
  }
})

// ⑤ 默认变量表结构
const themeCssPath = resolve(rootDir, 'components/style/generated/theme.css')
if (existsSync(themeCssPath)) {
  const css = readFileSync(themeCssPath, 'utf-8')
  varNames.forEach((name) => {
    const count = css.split(`${name}:`).length - 1
    if (count !== 2) {
      failures.push(`默认变量表中 ${name} 应出现 2 次（light + dark），实际 ${count} 次`)
    }
  })
}

// ⑥ 颜色字面量：三档分类 —— 设计固定 / 组件自有色彩资产 / 未登记（后者才是债）
const literalBuckets = { fixed: [], assets: [], unknown: [] }
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
const sumOf = (list) => list.reduce((sum, item) => sum + item.count, 0)
const describe = (list) =>
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

// ⑦ 颜色字面量（`<style>` 之前的脚本 / 模板）：这类色值不进样式块，旧守护完全看不到 ——
//    Timeline 写死的圆点色就是这样漏掉的。同样按「登记制」暴露存量。
const scriptBuckets = { assets: [], unknown: [] }
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

// ⑧ 公开变量必须闭合：零消费的「预留位」覆盖后没有任何效果，比不提供更糟。
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

// ⑨ 悬空引用：`var(--x)` 既没有 fallback、库内也从未声明过 —— 浏览器会丢弃整条声明且不报错。
//   典型成因是重命名变量时漏改引用（如 `--border-radius` → `--waterfall-border-radius`）。
//   动态拼接的名字（`var(--back-top-${shape}-border-radius)`）截断后以 `-` 结尾，跳过。
const declaredComponentVars = new Set()
componentFiles.forEach((file) => {
  const source = stripComments(readFileSync(resolve(rootDir, 'components', file), 'utf-8'))
  for (const matched of source.matchAll(/(--[a-z0-9-]+)\s*:/g)) {
    declaredComponentVars.add(matched[1])
  }
  // 脚本里的对象键写成 `'--menu-primary-color': value`，名字后面是引号
  for (const matched of source.matchAll(/['"](--[a-z0-9-]+)['"]\s*:/g)) {
    declaredComponentVars.add(matched[1])
  }
})
componentFiles.forEach((file) => {
  const source = stripComments(readFileSync(resolve(rootDir, 'components', file), 'utf-8'))
  collectVarRefs(source).forEach(({ name, hasFallback }) => {
    if (hasFallback || name.startsWith('--va-') || name.endsWith('-')) {
      return
    }
    if (!declaredComponentVars.has(name)) {
      failures.push(`引用了从未声明、也没有 fallback 的变量（整条声明会被丢弃）：${name}（${file}）`)
    }
  })
})

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
