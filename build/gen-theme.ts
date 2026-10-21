/**
 * 主题变量表生成器（构建期）
 *
 * 从 `components/theme` 的同构派生函数生成静态默认表，写入 `components/style/generated/theme.css`：
 *
 *   :root, [data-va-mode='light'] { ...light }   ← 默认表（首帧即可用，不依赖 JS）
 *   [data-va-mode='dark'] { ...dark }            ← 暗色默认表（由 mode 属性驱动）
 *
 * 浅色表同时挂在 `:root` 与 `[data-va-mode='light']` 上：前者保证首帧，后者让**暗色页面里的
 * 嵌套浅色作用域**能把变量翻回浅色（`data-va-mode` 是就近继承语义，只挂 `:root` 时嵌套浅色
 * 只能靠 Provider 写内联变量兜底）。`color-scheme` 仍只挂在属性选择器上，默认表沿用宿主的
 * color-scheme，不劫持原生控件。
 *
 * 该文件是**构建中间产物**（已 gitignore），由 vite 的 `buildStart` 生成，供 `global.less`
 * 以 `@import (inline)` 合并进每份样式产物 —— 因此 `import 'vue-amazing-ui/es/button/style'`
 * 时变量表已随全局样式就位。
 */

import { mkdirSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { assertVarContract, derive, MODE_ATTRIBUTE, THEME_VAR_NAMES } from '../components/theme'
import type { ThemeSeed, ThemeVars } from '../components/theme'

/** 生成产物相对项目根目录的路径 */
export const THEME_CSS_RELATIVE_PATH = 'components/style/generated/theme.css'

export interface GeneratedTheme {
  light: ThemeVars
  dark: ThemeVars
  css: string
}

/** 变量块：按契约顺序输出，保证生成结果可复现（快照可比对） */
function formatVars(vars: ThemeVars): string {
  return THEME_VAR_NAMES.map((name) => `  ${name}: ${vars[name]};`).join('\n')
}

/** 生成默认表（light + dark）与对应 CSS 文本 */
export function buildTheme(seed: ThemeSeed = {}): GeneratedTheme {
  const light = derive(seed, 'light')
  const dark = derive(seed, 'dark')
  assertVarContract(light)
  assertVarContract(dark)
  const css = [
    '/* 由 build/gen-theme.ts 生成，请勿手动修改 */',
    '',
    // 浅色表挂两处：`:root` 管首帧，`[data-va-mode='light']` 管暗色页面里的嵌套浅色作用域
    ':root,',
    `[${MODE_ATTRIBUTE}='light'] {`,
    formatVars(light),
    '}',
    '',
    // color-scheme 只声明在模式属性上（不动 :root）：默认表沿用宿主的 color-scheme，切模式时原生控件同步
    `[${MODE_ATTRIBUTE}='light'] {`,
    '  color-scheme: light;',
    '}',
    '',
    `[${MODE_ATTRIBUTE}='dark'] {`,
    formatVars(dark),
    '  color-scheme: dark;',
    '}',
    ''
  ].join('\n')
  return { light, dark, css }
}

/** 生成 CSS 文本 */
export function buildThemeCss(seed: ThemeSeed = {}): string {
  return buildTheme(seed).css
}

/**
 * 写入默认表并返回绝对路径
 *
 * 用「临时文件 + rename」原子写入：`pnpm build` 会并行跑多个 vite 进程，避免读到半截文件。
 */
export function writeThemeCss(rootDir: string, seed: ThemeSeed = {}): string {
  const target = resolve(rootDir, THEME_CSS_RELATIVE_PATH)
  mkdirSync(dirname(target), { recursive: true })
  const temp = `${target}.tmp`
  writeFileSync(temp, buildThemeCss(seed), 'utf-8')
  renameSync(temp, target)
  return target
}
