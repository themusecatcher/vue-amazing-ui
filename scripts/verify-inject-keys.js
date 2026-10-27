#!/usr/bin/env node
/**
 * provide / inject 注入契约守护
 *
 * 注入键是组件库的内部契约（不对外导出），但仍需机器校验，否则命名与类型会随人漂移。
 * 强制项（失败即退出非 0），条文见 `development/component-design.md` 的 provide / inject 章节：
 * 1. 键必须是 Symbol 且带 `: InjectionKey<T>` 注解：值写成字符串 / 省略泛型都会在
 *    `provide` 与 `inject` 两侧失去类型关联，改错键或改错结构只会静默退化为「未命中」；
 * 2. 变量名为 camelCase + `Key` 后缀：`*_KEY` 形态在 import 列表里与配置常量无法区分；
 * 3. 描述串 = `'va' + PascalCase(变量名去 Key)`：描述串是 DevTools 里唯一的归属标识，
 *    一一对应才能静态校验（参考库 ant-design-vue 有一半以上做不到）；
 * 4. 键不得定义在 `.vue` 内（含不带 `export` 的写法）：provide / inject 两侧必须共享同一份定义，
 *    写在组件里无法被复用与校验；
 * 5. `provide` / `inject` / `injectFromChain` 不得使用字符串字面量：字符串键是宿主应用也能命中的
 *    公共命名空间，宿主同名 `app.provide()` 会让库读到错误的值（实测会抛
 *    `manager.allocate is not a function`）；
 * 6. 上述三个调用的首参必须是全库已识别出的 Symbol 键变量：`export const menuKey = 'menu'` 这类
 *    字符串常量能绕过第 1 条（它压根不是 Symbol 定义）与第 5 条（传的是标识符不是字面量）；
 * 7. 组件内一律用 `injectFromChain`：裸 `inject()` 在 `app.runWithContext`（vue-router 导航守卫）
 *    上下文里会改道去翻宿主 app 的 provides，读不到组件级 provide（离散实例层级 / 主题失效）；
 * 8. 键不进入公共入口：`components/index.ts` / `components/components.ts` 不得导出 `*Key`。
 *
 * 扫描前统一剥离注释：注释里的示例键不是实现，不应制造噪声。
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripComments } from './component-vars-check.js'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = resolve(rootDir, 'components')
const failures = []

/** 键变量名：camelCase + Key 后缀 */
const KEY_NAME_PATTERN = /^[a-z][A-Za-z0-9]*Key$/
/** 允许出现裸 `inject()` 的实现文件（`injectFromChain` 自身所在文件） */
const RAW_INJECT_WHITELIST = new Set(['utils/hooks.ts'])
/** 公共入口文件（不得导出注入键） */
const PUBLIC_ENTRIES = ['index.ts', 'components.ts']

/** 递归收集组件目录下的源码文件（返回相对 components 的 posix 路径） */
function walk(dir, result = []) {
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, result)
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.vue')) {
      result.push(relative(componentsDir, fullPath).split('\\').join('/'))
    }
  })
  return result
}

const sourceFiles = walk(componentsDir)

// ① + ② + ③ + ④ 键定义形态
const keyDefs = []
const KEY_DEF_PATTERN = /export\s+const\s+([A-Za-z0-9_$]+)\s*(?::\s*([^=\n]+?))?\s*=\s*Symbol\(([^)]*)\)/g
sourceFiles.forEach((file) => {
  const source = stripComments(readFileSync(resolve(componentsDir, file), 'utf-8'))
  for (const matched of source.matchAll(KEY_DEF_PATTERN)) {
    const [, name, annotation, description] = matched
    keyDefs.push({ name, file, annotation: annotation?.trim(), description })
    if (file.endsWith('.vue')) {
      failures.push(`注入键不得定义在 .vue 内：${name}（${file}）`)
    }
    if (!KEY_NAME_PATTERN.test(name)) {
      failures.push(`注入键变量名必须是 camelCase + Key 后缀：${name}（${file}）`)
    }
    if (annotation !== undefined && !annotation.startsWith('InjectionKey<')) {
      failures.push(`注入键必须用 : InjectionKey<T> 注解：${name} → ${annotation}（${file}）`)
    }
    if (annotation === undefined) {
      failures.push(`注入键缺少 : InjectionKey<T> 注解（provide / inject 两侧将失去类型关联）：${name}（${file}）`)
    }
    const expected = `'va${name.replace(/Key$/, '').replace(/^[a-z]/, (char) => char.toUpperCase())}'`
    if (description.trim() !== expected) {
      failures.push(`注入键描述串必须是 ${expected}（当前 ${description.trim() || '空'}）：${name}（${file}）`)
    }
  }
})

/** 全库注入键名（供「provide / inject 首参必须是其中之一」校验） */
const keyNames = new Set(keyDefs.map((def) => def.name))

// ④' `.vue` 内的键定义通常不带 export，上面的导出扫描抓不到，需单独扫一遍
/** 任意 `const xKey = Symbol(...)`（含非导出） */
const LOCAL_SYMBOL_PATTERN = /(?:^|[^A-Za-z0-9_$.])const\s+([A-Za-z0-9_$]+)\s*(?::[^=\n]+?)?\s*=\s*Symbol\(/g
sourceFiles
  .filter((file) => file.endsWith('.vue'))
  .forEach((file) => {
    const source = stripComments(readFileSync(resolve(componentsDir, file), 'utf-8'))
    for (const matched of source.matchAll(LOCAL_SYMBOL_PATTERN)) {
      const [, name] = matched
      // 只认「像注入键」的命名，避免误伤组件内与注入无关的哨兵 Symbol
      if (/key$/i.test(name)) {
        failures.push(`注入键不得定义在 .vue 内（provide / inject 两侧无法共享同一定义）：${name}（${file}）`)
      }
    }
  })

// ⑤ + ⑥ + ⑦ provide / inject 的调用形态
/** 字符串字面量作键：宿主应用也能 provide 同名键，库会读到错误的值 */
const STRING_KEY_PATTERN = /\b(?:provide|inject|injectFromChain)\s*\(\s*['"`]/
/** 裸 inject：`injectFromChain` 的 `inject` 前缀不带左括号，故不会误命中 */
const RAW_INJECT_PATTERN = /(?:^|[^A-Za-z0-9_$.])inject\s*[(<]/
/** provide / inject / injectFromChain 的首参（必须是已声明的 Symbol 键，字符串常量冒充也要拦） */
const CALL_KEY_PATTERN = /\b(?:provide|inject|injectFromChain)\s*\(\s*([A-Za-z0-9_$]+)/g
sourceFiles.forEach((file) => {
  const source = stripComments(readFileSync(resolve(componentsDir, file), 'utf-8'))
  if (STRING_KEY_PATTERN.test(source)) {
    failures.push(`provide / inject 不得使用字符串字面量作键：${file}`)
  }
  if (!RAW_INJECT_WHITELIST.has(file) && RAW_INJECT_PATTERN.test(source)) {
    failures.push(`请改用 injectFromChain（app.runWithContext 场景裸 inject 会改道到宿主 app）：${file}`)
  }
  for (const matched of source.matchAll(CALL_KEY_PATTERN)) {
    if (!keyNames.has(matched[1])) {
      failures.push(`注入键必须是已声明的 Symbol 键（当前 ${matched[1]} 未定义为本库注入键）：${file}`)
    }
  }
})

// ⑦ 公共入口不导出注入键
PUBLIC_ENTRIES.forEach((entry) => {
  const entryPath = resolve(componentsDir, entry)
  if (!existsSync(entryPath)) {
    return
  }
  const source = stripComments(readFileSync(entryPath, 'utf-8'))
  const exported = [...source.matchAll(/export[^\n]*/g)]
    .map((matched) => matched[0])
    .filter((line) => /\b[A-Za-z0-9_$]*(?:Key|_KEY)\b/.test(line))
  exported.forEach((line) => {
    failures.push(`注入键属内部契约，不得从 ${entry} 导出：${line.trim()}`)
  })
})

if (failures.length > 0) {
  console.error('❌ 注入契约守护未通过：')
  failures.forEach((failure) => console.error(`   ✗ ${failure}`))
  process.exit(1)
}
console.log(`✅ 注入契约守护通过：${keyDefs.length} 个注入键（均为 Symbol + InjectionKey + va 前缀描述串）`)
keyDefs
  .sort((first, second) => first.name.localeCompare(second.name))
  .forEach(({ name, description, file }) => {
    console.log(`   · ${name} = Symbol(${description.trim()})  ← ${file}`)
  })
