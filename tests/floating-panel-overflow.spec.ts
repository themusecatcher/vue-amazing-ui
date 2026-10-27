import { afterEach, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import AutoComplete from 'components/auto-complete'
import Tooltip from 'components/tooltip'
import { flushTransition } from './helpers'

/**
 * 下拉面板根的裁剪口径（Select / AutoComplete）
 *
 * 两个面板迁至 `Popup` 基座后都带 `data-va-floating-mount`，于是 `dropdownRender`（Select）与
 * `option` 插槽（AutoComplete）里的浮层会**就近挂进面板内部**；面板根若仍声明 `overflow`，
 * 内嵌浮层会被裁掉，且这种裁剪只在内嵌浮层时才暴露，肉眼回归容易漏。
 *
 * 测试环境不注入组件 CSS（vitest 默认 `css: false`），计算样式无法反映裁剪，故「不裁剪」用
 * 源码断言面板根规则不含 `overflow`；「确实挂进面板」由本文件的行为用例（AutoComplete）与
 * `select-nested-floating.spec.ts`（Select）守护。
 * 视觉侧仍需目视：首 / 末项圆角、滚动条滑轨右下角、内嵌浮层不被裁、虚拟滚动无残影。
 */
const PANEL_CASES = [
  { file: 'select/Select.vue', panelSelector: '.select-panel-container {' },
  { file: 'auto-complete/AutoComplete.vue', panelSelector: '.auto-complete-panel {' }
]

const OPTIONS = [
  { label: '北京', value: 1 },
  { label: '上海', value: 2 }
]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

/** 等待「打开 → 面板渲染 → 内核 post flush 落位」 */
async function settle(): Promise<void> {
  for (let index = 0; index < 4; index += 1) {
    await flushTransition()
  }
}

/**
 * 取选择器块内「直接声明段」：遇到嵌套规则（`  .xxx {`）或顶层闭合即停，
 * 否则会把子规则里的 overflow（选项文本截断）误算到面板根上
 */
function topLevelDeclarations(source: string, selector: string): string {
  const block = source.split(selector)[1] ?? ''
  const declarations: string[] = []
  for (const line of block.split('\n')) {
    if (/^\s{2}\.[\w-]+\s*\{/.test(line) || line.trim() === '}') {
      break
    }
    declarations.push(line)
  }
  return declarations.join('\n')
}

describe('下拉面板根不声明裁剪', () => {
  PANEL_CASES.forEach(({ file, panelSelector }) => {
    it(`${file} 的面板根规则不含 overflow`, () => {
      const source = readFileSync(join(process.cwd(), 'components', file), 'utf8')
      const panelRule = topLevelDeclarations(source, panelSelector)
      expect(panelRule).toContain('padding')
      expect(panelRule).not.toContain('overflow')
    })
  })
})

describe('AutoComplete 面板内嵌浮层的挂载位置', () => {
  it('option 插槽内的 Tooltip 挂进 AutoComplete 面板内（就近吸附）', async () => {
    wrapper = mount(AutoComplete, {
      props: { options: OPTIONS, defaultOpen: true },
      slots: {
        option: (params: { label?: string }) =>
          h(Tooltip, { tooltip: '内嵌提示', open: true }, { default: () => h('span', String(params?.label ?? '')) })
      }
    })
    await settle()

    const panel = document.querySelector<HTMLElement>('.auto-complete-panel')
    expect(panel).not.toBeNull()
    // 面板内的浮层容器：不含 AutoComplete 面板自身的那个 .va-popup-container
    const container = [...document.querySelectorAll<HTMLElement>('.va-popup-container')].find(
      (el) => !el.querySelector('.auto-complete-panel')
    )
    expect(container).toBeDefined()
    expect(container?.parentElement).toBe(panel)
    expect(panel?.contains(container ?? null)).toBe(true)
  })
})
