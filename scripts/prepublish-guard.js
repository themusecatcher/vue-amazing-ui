#!/usr/bin/env node
/**
 * 发布前守卫（由 package.json 的 `prepublishOnly` 触发，仅在 `npm publish` 时执行）
 *
 * 背景：`npm publish` 自身不会触发构建，而 `files` 是 glob 语义——产物目录缺失时 npm
 * 不会报错，只会打出一个 `main` / `module` / `types` 全部悬空的包。若绕开 `pnpm pub`
 * （scripts/publish.sh）直接发布，还可能把上一版遗留产物按新版本号发出去。
 *
 * 因此这里只做「package.json 声明的产物入口是否真实存在」的存在性校验（毫秒级）：
 * 不重复 publish.sh 已完成的 check / build，也不做内容与新鲜度校验。
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** 从 package.json 收集所有指向产物的具体路径（exports 中的通配项如 "./*" 不是具体文件，跳过） */
function collectEntryPaths(pkg) {
  const paths = new Set()
  const addPath = (value) => {
    if (typeof value !== 'string') return
    const normalized = value.replace(/^\.\//, '')
    if (normalized.includes('*')) return
    paths.add(normalized)
  }
  const walkExports = (node) => {
    if (typeof node === 'string') {
      addPath(node)
      return
    }
    if (node && typeof node === 'object') {
      Object.values(node).forEach(walkExports)
    }
  }
  const entryFields = [pkg.main, pkg.module, pkg.types, pkg.unpkg, pkg.jsdelivr]
  entryFields.forEach(addPath)
  walkExports(pkg.exports)
  return [...paths]
}

const pkg = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'))
const entryPaths = collectEntryPaths(pkg)
const missing = entryPaths.filter((entryPath) => !existsSync(resolve(rootDir, entryPath)))

if (missing.length > 0) {
  console.error('❌ 发布守卫未通过：package.json 声明的产物入口不存在')
  missing.forEach((entryPath) => console.error(`   ✗ ${entryPath}`))
  console.error('   请先执行 `pnpm build`，或改用 `pnpm pub` 走完整发布流程')
  process.exit(1)
}

console.log(`✅ 发布守卫通过：${entryPaths.length} 个产物入口均存在`)
