// @vitest-environment node
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { buildTheme, buildThemeCss, THEME_CSS_RELATIVE_PATH, writeThemeCss } from '../build/gen-theme'
import { derive, THEME_VAR_NAMES } from 'components/theme'

/**
 * 构建期默认表：内容、可复现性与变量表快照
 *
 * 快照的存在意义：依赖或算法变更不得悄悄改变默认外观。更新方式：
 * `UPDATE_THEME_SNAPSHOT=1 pnpm test tests/theme-build.spec.ts`
 */
const snapshotPath = resolve(process.cwd(), 'tests/__snapshots__/theme-vars.snap')

describe('主题默认表构建', () => {
  it("输出浅色表与 [data-va-mode='dark'] 暗色表，各含全部变量", () => {
    const css = buildThemeCss()
    expect(css).toContain(':root,')
    expect(css).toContain("[data-va-mode='light'] {")
    expect(css).toContain("[data-va-mode='dark'] {")
    THEME_VAR_NAMES.forEach((name) => {
      expect(css.split(`${name}:`).length - 1).toBe(2)
    })
  })

  it("浅色表同时挂 :root 与 [data-va-mode='light']：暗色页面里的嵌套浅色作用域可回环", () => {
    const css = buildThemeCss()
    // 浅色表与 color-scheme 分开声明：`:root` 不劫持宿主的 color-scheme
    expect(css).toContain(":root,\n[data-va-mode='light'] {")
    const lightBlock = css.slice(css.indexOf(':root,'), css.indexOf("[data-va-mode='dark'] {"))
    THEME_VAR_NAMES.forEach((name) => {
      expect(lightBlock).toContain(`${name}:`)
    })
  })

  it('默认表与运行时派生逐值一致（避免两条实现路径漂移）', () => {
    const { light, dark } = buildTheme()
    expect(light).toEqual(derive({}, 'light'))
    expect(dark).toEqual(derive({}, 'dark'))
  })

  it('生成结果可复现：同一种子两次生成文本完全相同', () => {
    expect(buildThemeCss({ primary: '#722ed1' })).toBe(buildThemeCss({ primary: '#722ed1' }))
  })

  it('writeThemeCss 写出到约定的中间产物路径', () => {
    const root = mkdtempSync(join(tmpdir(), 'va-theme-'))
    const target = writeThemeCss(root)
    expect(target).toBe(resolve(root, THEME_CSS_RELATIVE_PATH))
    expect(readFileSync(target, 'utf-8')).toBe(buildThemeCss())
  })

  it('默认变量表与仓库快照一致（算法/依赖变更必须显式更新快照）', () => {
    const { light, dark } = buildTheme()
    const content = `${JSON.stringify({ light, dark }, null, 2)}\n`
    if (process.env.UPDATE_THEME_SNAPSHOT === '1') {
      mkdirSync(dirname(snapshotPath), { recursive: true })
      writeFileSync(snapshotPath, content, 'utf-8')
    }
    expect(readFileSync(snapshotPath, 'utf-8')).toBe(content)
  })
})
