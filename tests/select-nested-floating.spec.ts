import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import Popover from 'components/popover'
import Select, { type DropdownRenderParams } from 'components/select'
import Tooltip from 'components/tooltip'
import { flushTransition } from './helpers'

/**
 * Select 面板内嵌浮层（Tooltip / Popover）的挂载位置护栏
 *
 * 背景（重构文档 §3.4）：`Popup` 面板自带 `data-va-floating-mount`，Select 迁移为 `Popup` 基座后
 * 面板同样带上该标记，于是 `dropdownRender` 里的浮层按「就近吸附」规则**挂进 Select 面板内部**
 * （迁移前无该标记，回落 `body`）；而面板根原有的 `overflow: hidden` 会把它们裁掉，故同批移除（§9.1）。
 *
 * 「挂进面板内」由 DOM 位置断言；「不被裁剪」的源码断言与 AutoComplete 的同名用例统一收在
 * `floating-panel-overflow.spec.ts`（测试环境不注入组件 CSS，计算样式无法反映裁剪）。
 * 视觉侧另有 4 项目视验收（§9.1）：首 / 末项圆角、滚动条滑轨右下角、dropdownRender 演示、虚拟滚动。
 */
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

/** Select 面板根（内嵌浮层的归属判定对象） */
function selectPanel(): HTMLElement {
  return document.querySelector<HTMLElement>('.select-panel-container')!
}

/** 内嵌浮层的 Teleport 容器：不含 Select 面板的那个 `.va-popup-container` */
function nestedContainer(): HTMLElement | undefined {
  return [...document.querySelectorAll<HTMLElement>('.va-popup-container')].find(
    (el) => !el.querySelector('.select-panel-container')
  )
}

/** 挂载一个「默认展开 + 自定义下拉内容」的 Select */
function mountSelect(dropdownRender: (params: DropdownRenderParams) => ReturnType<typeof h>): void {
  wrapper = mount(Select, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    props: {
      options: OPTIONS,
      defaultOpen: true,
      dropdownRender
    }
  })
}

describe('Select 面板内嵌浮层的挂载位置', () => {
  it('dropdownRender 内的 Tooltip 挂进 Select 面板内（就近吸附）', async () => {
    mountSelect(({ menuNode }) =>
      h('div', { class: 'nested-dropdown' }, [
        h(
          Tooltip,
          { tooltip: '内嵌提示', open: true },
          { default: () => h('button', { class: 'nested-tooltip-trigger' }, 'hover') }
        ),
        h(menuNode)
      ])
    )
    await settle()

    expect(selectPanel()).not.toBeNull()
    const container = nestedContainer()
    expect(container).toBeDefined()
    // 迁移后：Select 面板带 data-va-floating-mount → 内嵌浮层就近挂进面板内部
    expect(container?.parentElement).toBe(selectPanel())
    expect(selectPanel().contains(container ?? null)).toBe(true)
  })

  it('dropdownRender 内的 Popover 挂进 Select 面板内（就近吸附）', async () => {
    mountSelect(({ menuNode }) =>
      h('div', { class: 'nested-dropdown' }, [
        h(
          Popover,
          // trigger 经组件透传落到底层 Tooltip：Popover 自身不声明触发方式
          { title: '内嵌气泡卡片', trigger: 'click' },
          {
            content: () => h('span', 'popover content'),
            default: () => h('button', { class: 'nested-popover-trigger' }, 'click')
          }
        ),
        h(menuNode)
      ])
    )
    await settle()

    const trigger = selectPanel().querySelector<HTMLElement>('.nested-popover-trigger')
    expect(trigger).not.toBeNull()
    trigger?.click()
    await settle()

    const container = nestedContainer()
    expect(container).toBeDefined()
    expect(container?.parentElement).toBe(selectPanel())
    expect(selectPanel().contains(container ?? null)).toBe(true)
  })
})

describe('Select 面板关闭时内嵌浮层收起', () => {
  /**
   * 面板关闭只是 `v-show` 隐藏，既不给内嵌浮层的触发元素派发 `mouseleave` 也不派发 `blur`；
   * 宿主（`Popup`）经 `zIndexContainerOpenKey` 下发开合状态，内嵌浮层据此收起 —— 否则会停在
   * 打开态，面板重开时以「仍打开」的状态冒出来（宿主级同源守护见 `tests/popup.spec.ts`）。
   */
  it('关闭面板后内嵌 Tooltip 收起，重开面板不再闪现', async () => {
    mountSelect(({ menuNode }) =>
      h('div', { class: 'nested-dropdown' }, [
        h(
          // 用内部触发（hover）打开：受控 open 不再由组件改写，无法用它构造「已打开」态
          Tooltip,
          { tooltip: '内嵌提示', showDelay: 0 },
          { default: () => h('button', { class: 'nested-tooltip-trigger' }, 'hover') }
        ),
        h(menuNode)
      ])
    )
    await settle()

    const tooltipPanel = (): HTMLElement | null =>
      nestedContainer()?.querySelector<HTMLElement>('.va-popup-panel') ?? null
    // 打开态：内嵌 Tooltip 正常显示（触发包裹层在 Select 面板内，不由 nestedContainer 覆盖）
    ;(document.querySelector('.nested-dropdown .tooltip-wrap') as HTMLElement).dispatchEvent(
      new MouseEvent('mouseenter')
    )
    await settle()
    expect(tooltipPanel()?.style.display).not.toBe('none')

    const trigger = wrapper!.find('.select-wrap')
    await trigger.trigger('click')
    await settle()
    expect(tooltipPanel()?.style.display).toBe('none')

    // 重开面板：残留的打开态不应冒出来
    await trigger.trigger('click')
    await settle()
    expect(tooltipPanel()?.style.display).toBe('none')
  })
})
