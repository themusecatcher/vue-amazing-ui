import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { mergeComponentStyles } from '../scripts/merge-component-styles'

/**
 * 按需产物的样式合并守护
 *
 * 背景：同一 SFC 的每个 `<style>` 块各产出一个 CSS 资源，Vite 对同名资源追加序号
 * （`Tooltip.css` + `Tooltip2.css`）。而 es/lib 的产物 JS 不 import 任何 CSS，样式完全由消费方
 * resolver 的 sideEffects 路径决定，resolver 只引用主文件 → 编号块无人引入，按需引入后缺失样式。
 * 合并后「一个组件一个 CSS 文件」即成为产物契约，故这里锁死合并顺序、递归与误判边界。
 */

let rootDir = ''

/** 静默 logger：仅收集告警，避免测试输出噪音 */
const silentLogger = { log: () => {}, warn: () => {} }

function write(relativePath: string, content: string): void {
  const fullPath = join(rootDir, relativePath)
  mkdirSync(dirname(fullPath), { recursive: true })
  writeFileSync(fullPath, content, 'utf-8')
}

function read(relativePath: string): string {
  return readFileSync(join(rootDir, relativePath), 'utf-8')
}

beforeEach(() => {
  rootDir = mkdtempSync(join(tmpdir(), 'va-merge-css-'))
})

afterEach(() => {
  rmSync(rootDir, { recursive: true, force: true })
})

describe('mergeComponentStyles', () => {
  it('编号块按序号升序追加进主文件（与源码 <style> 块顺序一致）后删除', () => {
    write('es/tooltip/Tooltip.css', '.scoped{}')
    write('es/tooltip/Tooltip2.css', '.global{}')
    write('es/tooltip/Tooltip3.css', '.animation{}')

    const merged = mergeComponentStyles({ rootDir, logger: silentLogger })

    expect(merged.map((filePath) => relative(rootDir, filePath))).toEqual(['es/tooltip/Tooltip.css'])
    expect(read('es/tooltip/Tooltip.css')).toBe('.scoped{}\n.global{}\n.animation{}')
    expect(existsSync(join(rootDir, 'es/tooltip/Tooltip2.css'))).toBe(false)
    expect(existsSync(join(rootDir, 'es/tooltip/Tooltip3.css'))).toBe(false)
  })

  it('es 与 lib 各自处理；无编号的组件样式与第三方 vendor 样式不受影响', () => {
    write('es/tooltip/Tooltip.css', '.scoped{}')
    write('es/tooltip/Tooltip2.css', '.global{}')
    write('lib/tooltip/Tooltip.css', '.scoped{}')
    write('lib/tooltip/Tooltip2.css', '.global{}')
    // 非 Tooltip 的组件目录同样按编号规则处理（此处用中性名，避免暗示某组件确实有两个 <style> 块）
    write('es/sample/Sample.css', '.box{}')
    write('es/sample/Sample2.css', '.box-global{}')
    write('es/grid/row/Row.css', '.row{}')
    // vendor 样式命名不含纯数字序号后缀，必须原样保留（见 vendor-styles.ts）
    write('es/vendor-styles/swiper/modules/effect-cards.css', '.swiper-effect-cards{}')

    const merged = mergeComponentStyles({ rootDir, logger: silentLogger })

    expect(merged.map((filePath) => relative(rootDir, filePath)).sort()).toEqual([
      'es/sample/Sample.css',
      'es/tooltip/Tooltip.css',
      'lib/tooltip/Tooltip.css'
    ])
    expect(read('es/grid/row/Row.css')).toBe('.row{}')
    expect(read('es/vendor-styles/swiper/modules/effect-cards.css')).toBe('.swiper-effect-cards{}')
    expect(read('lib/tooltip/Tooltip.css')).toBe('.scoped{}\n.global{}')
  })

  it('缺少主文件时保留编号文件并告警，样式内容不丢失', () => {
    write('es/broken/Broken2.css', '.orphan{}')
    const warnings: string[] = []

    const merged = mergeComponentStyles({
      rootDir,
      logger: { log: () => {}, warn: (message: string) => warnings.push(message) }
    })

    expect(merged).toEqual([])
    expect(warnings).toHaveLength(1)
    expect(warnings[0]).toContain('es/broken/Broken.css')
    expect(existsSync(join(rootDir, 'es/broken/Broken2.css'))).toBe(true)
  })

  it('幂等：重复调用不再命中（编号文件已删除）', () => {
    write('es/tooltip/Tooltip.css', '.scoped{}')
    write('es/tooltip/Tooltip2.css', '.global{}')

    expect(mergeComponentStyles({ rootDir, logger: silentLogger })).toHaveLength(1)
    expect(mergeComponentStyles({ rootDir, logger: silentLogger })).toHaveLength(0)
    expect(read('es/tooltip/Tooltip.css')).toBe('.scoped{}\n.global{}')
  })
})
