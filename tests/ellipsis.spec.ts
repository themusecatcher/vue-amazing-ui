import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import Ellipsis from 'components/ellipsis'
import Tooltip from 'components/tooltip'

/**
 * Ellipsis 能力 parity 守护（重构后）
 *
 * 设计口径（决定断言方式）：
 * - 截断由 CSS 完成，测量只在交互时发生 → 本文件统一用「stub 尺寸 + 触发交互」验证行为，
 *   不需要 ResizeObserver 或属性变更来驱动；单根结构使尺寸 stub 一次即对后续全流程有效；
 * - 浮层走锚点模式（不包裹文本容器）→ 任何状态下 `.ellipsis-container` 都是根、都承载 attrs；
 * - 提示属性统一经 `tooltip` 对象下发，浮层实例按首次交互挂载（受控开合除外）。
 *
 * 注：`@vue/test-utils` 默认把 `Transition` 换成 stub，挂在其上的监听会落到 stub 上，
 * 故关闭该 stub；用例统一用 `to: false` 就地渲染浮层，便于按根节点收敛查询。
 */
const mountOptions = {
  attachTo: document.body,
  global: { stubs: { transition: false } }
}
const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))
/** 等待「定时器（delay 0）→ 渲染」两拍 */
async function flush(): Promise<void> {
  await nextTick()
  await tick()
  await nextTick()
}
let wrapper: VueWrapper | null = null
afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})
/** 构造「已溢出」：scrollWidth 大于 clientWidth，同时给出 offsetWidth 供提示宽度计算 */
function stubOverflow(el: HTMLElement): void {
  Object.defineProperty(el, 'scrollWidth', { value: 200, configurable: true })
  Object.defineProperty(el, 'clientWidth', { value: 100, configurable: true })
  Object.defineProperty(el, 'offsetWidth', { value: 100, configurable: true })
}
/** 构造「未溢出」 */
function stubFit(el: HTMLElement): void {
  Object.defineProperty(el, 'scrollWidth', { value: 100, configurable: true })
  Object.defineProperty(el, 'clientWidth', { value: 100, configurable: true })
  Object.defineProperty(el, 'offsetWidth', { value: 100, configurable: true })
}
/** 提示面板（`to: false` 就地渲染，按文档收敛查询） */
function panel(): HTMLElement | null {
  return document.body.querySelector('.tooltip-card-container')
}
/**
 * 轮询等待浮层转入隐藏
 *
 * 无 CSS 时离开过渡由「双 rAF + 事件等待」收尾，固定等待在负载下可能不够，故补发 `animationend`
 * 覆盖事件等待分支再轮询落定（与 tests/tooltip.spec.ts 的 `waitHidden` 同一口径）。
 */
async function waitHidden(query: () => HTMLElement | null): Promise<void> {
  for (let i = 0; i < 20; i += 1) {
    const target = query()
    if (!target || target.style.display === 'none') return
    target.dispatchEvent(new Event('animationend'))
    await new Promise((resolve) => setTimeout(resolve, 10))
    await nextTick()
  }
}
function mountEllipsis(options: Parameters<typeof mount>[1] = {}): VueWrapper {
  wrapper = mount(Ellipsis, {
    ...mountOptions,
    slots: { default: () => '住在我心里孤独的 孤独的海怪' },
    ...options
  }) as VueWrapper
  return wrapper
}
/** 文本容器（恒为根节点，不随状态变化） */
function boxOf(target: VueWrapper): VueWrapper {
  const found = target.findAll('.ellipsis-container')[0]
  expect(found).toBeTruthy()
  return found
}

describe('Ellipsis：结构与属性落点', () => {
  it('未交互时不创建浮层实例，文本由 CSS 截断', async () => {
    const w = mountEllipsis()
    await flush()
    expect(w.findAllComponents(Tooltip)).toHaveLength(0)
    expect(boxOf(w).classes()).toContain('not-ellipsis-line')
  })

  it('class / style / data-* 恒落文本容器', async () => {
    const w = mountEllipsis({ attrs: { class: 'ext-cls', 'data-mark': 'a', style: { color: 'red' } } })
    await flush()
    const box = boxOf(w)
    expect(box.classes()).toEqual(expect.arrayContaining(['ellipsis-container', 'ext-cls']))
    expect(box.attributes('data-mark')).toBe('a')
    expect(box.attributes('style')).toContain('color: red')
    expect(box.attributes('style')).toContain('--ellipsis-max-width')
  })

  it('溢出并挂载浮层后，结构不变、属性仍落文本容器', async () => {
    const w = mountEllipsis({
      attrs: { class: 'ext-cls', 'data-mark': 'a' },
      props: { tooltip: { to: false, showDelay: 0 } }
    })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    expect(w.findAllComponents(Tooltip)).toHaveLength(1)
    // 锚点模式：不出现 Tooltip 的触发包裹层
    expect(w.find('.tooltip-wrap').exists()).toBe(false)
    expect(w.find('.tooltip-content').exists()).toBe(false)
    const box = boxOf(w)
    expect(box.classes()).toContain('ext-cls')
    expect(box.attributes('data-mark')).toBe('a')
  })

  it('line 决定截断形态与 CSS 变量', async () => {
    const w = mountEllipsis({ props: { line: 2 } })
    await flush()
    const box = boxOf(w)
    expect(box.classes()).toContain('ellipsis-line')
    expect(box.attributes('style')).toContain('--ellipsis-line: 2')
  })

  it('maxWidth 数字补 px、字符串原样', async () => {
    const w = mountEllipsis({ props: { maxWidth: 240 } })
    await flush()
    expect(boxOf(w).attributes('style')).toContain('--ellipsis-max-width: 240px')
    w.unmount()

    const w2 = mountEllipsis({ props: { maxWidth: '50%' } })
    await flush()
    expect(boxOf(w2).attributes('style')).toContain('--ellipsis-max-width: 50%')
  })
})

describe('Ellipsis：揭示时机', () => {
  it('溢出时 hover 才挂载实例并显示提示', async () => {
    const w = mountEllipsis({ props: { tooltip: { to: false, showDelay: 0 } } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    expect(w.findAllComponents(Tooltip)).toHaveLength(1)
    expect(panel()).toBeTruthy()
    expect(panel()?.style.display).not.toBe('none')
  })

  it('未溢出时 hover 不挂载实例（零预挂载开销）', async () => {
    const w = mountEllipsis()
    await flush()
    stubFit(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    expect(w.findAllComponents(Tooltip)).toHaveLength(0)
    expect(panel()).toBeNull()
  })

  it('tooltip: false 时不挂载实例', async () => {
    const w = mountEllipsis({ props: { tooltip: false } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    expect(w.findAllComponents(Tooltip)).toHaveLength(0)
  })

  it('tooltip 对象透传给浮层（placement / arrow）', async () => {
    const w = mountEllipsis({ props: { tooltip: { to: false, showDelay: 0, placement: 'bottomLeft', arrow: false } } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    const tooltip = w.findComponent(Tooltip)
    expect(tooltip.props('placement')).toBe('bottomLeft')
    expect(tooltip.props('arrow')).toBe(false)
  })

  it('tooltipMaxWidth 默认跟随文本宽度 + 24', async () => {
    const w = mountEllipsis({ props: { tooltip: { to: false, showDelay: 0 } } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    expect(w.findComponent(Tooltip).props('maxWidth')).toBe('124px')
  })

  it('tooltipMaxWidth 传入数字 / 字符串时以其为准', async () => {
    const w = mountEllipsis({ props: { tooltipMaxWidth: 240, tooltip: { to: false, showDelay: 0 } } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    expect(w.findComponent(Tooltip).props('maxWidth')).toBe('240px')
    w.unmount()

    const w2 = mountEllipsis({ props: { tooltipMaxWidth: '300px', tooltip: { to: false, showDelay: 0 } } })
    await flush()
    stubOverflow(boxOf(w2).element as HTMLElement)
    await boxOf(w2).trigger('pointerenter')
    await flush()
    expect(w2.findComponent(Tooltip).props('maxWidth')).toBe('300px')
  })

  it('tooltipMaxWidth 运行期修改对已挂载实例实时生效', async () => {
    const w = mountEllipsis({ props: { tooltipMaxWidth: 240, tooltip: { to: false, showDelay: 0 } } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    expect(w.findComponent(Tooltip).props('maxWidth')).toBe('240px')

    await w.setProps({ tooltipMaxWidth: 320 })
    await flush()
    expect(w.findComponent(Tooltip).props('maxWidth')).toBe('320px')
  })
})

describe('Ellipsis：触发方式与受控', () => {
  it("trigger: 'click' 时 hover 不挂载、click 挂载", async () => {
    const w = mountEllipsis({ props: { tooltip: { to: false, showDelay: 0, trigger: 'click' } } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    expect(w.findAllComponents(Tooltip)).toHaveLength(0)

    await boxOf(w).trigger('click')
    await flush()
    expect(w.findAllComponents(Tooltip)).toHaveLength(1)
  })

  it("trigger: 'focus' 时容器可聚焦，focusin 挂载", async () => {
    const w = mountEllipsis({ props: { tooltip: { to: false, showDelay: 0, trigger: 'focus' } } })
    await flush()
    const box = boxOf(w)
    expect(box.attributes('tabindex')).toBe('0')
    stubOverflow(box.element as HTMLElement)
    await box.trigger('focusin')
    await flush()
    expect(w.findAllComponents(Tooltip)).toHaveLength(1)
  })

  it('受控 open 在未溢出时也能显示（挂载即生效）', async () => {
    const w = mountEllipsis({ props: { tooltip: { to: false, showDelay: 0, open: true } } })
    await flush()
    stubFit(boxOf(w).element as HTMLElement)
    expect(w.findAllComponents(Tooltip)).toHaveLength(1)
    expect(w.findComponent(Tooltip).props('open')).toBe(true)
    expect(panel()).toBeTruthy()
  })
})

describe('Ellipsis：展开', () => {
  it('未溢出时点击不展开、不发事件', async () => {
    const w = mountEllipsis({ props: { expand: true, line: 2 } })
    await flush()
    stubFit(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('click')
    await flush()
    expect(boxOf(w).classes()).not.toContain('ellipsis-expanded')
    expect(w.emitted('expandChange')).toBeUndefined()
  })

  it('多行：点击展开 → 再次点击收起，事件带布尔值', async () => {
    const w = mountEllipsis({ props: { expand: true, line: 2 } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter') // 让指针形状与溢出判定就位
    await boxOf(w).trigger('click')
    await flush()
    expect(boxOf(w).classes()).toContain('ellipsis-expanded')
    expect(w.emitted('expandChange')?.[0]).toEqual([true])

    // 收起：判定以「当前是否展开」为准，不要求仍溢出
    await boxOf(w).trigger('click')
    await flush()
    expect(boxOf(w).classes()).not.toContain('ellipsis-expanded')
    expect(w.emitted('expandChange')?.[1]).toEqual([false])
  })

  it('单行同样支持展开（解除不换行），展开态仍可点击收起', async () => {
    const w = mountEllipsis({ props: { expand: true } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await boxOf(w).trigger('click')
    await flush()
    expect(boxOf(w).classes()).toContain('ellipsis-expanded')
    expect(w.emitted('expandChange')?.[0]).toEqual([true])

    // 展开后内容已完整显示（不再溢出），但点击仍能收起，故指针形态需保持可点击
    stubFit(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    expect(boxOf(w).classes()).toContain('ellipsis-cursor-pointer')
    await boxOf(w).trigger('click')
    await flush()
    expect(boxOf(w).classes()).not.toContain('ellipsis-expanded')
    expect(w.emitted('expandChange')?.[1]).toEqual([false])
  })

  it('展开时提示让位：展开后不再展示', async () => {
    const w = mountEllipsis({ props: { expand: true, line: 2, tooltip: { to: false, showDelay: 0, hideDelay: 0 } } })
    await flush()
    stubOverflow(boxOf(w).element as HTMLElement)
    await boxOf(w).trigger('pointerenter')
    await flush()
    expect(panel()).toBeTruthy()

    await boxOf(w).trigger('click')
    await flush()
    await waitHidden(panel)
    expect(panel() === null || panel()?.style.display === 'none').toBe(true)

    // 展开态下再次 hover 也不展示（展示前判定会拦截）
    await boxOf(w).trigger('pointerenter')
    await flush()
    await waitHidden(panel)
    expect(panel() === null || panel()?.style.display === 'none').toBe(true)
  })
})

describe('Ellipsis：无障碍', () => {
  it('提示可见时锚点关联 aria-describedby，隐藏后移除', async () => {
    const w = mountEllipsis({ props: { tooltip: { to: false, showDelay: 0, hideDelay: 0 } } })
    await flush()
    const box = boxOf(w)
    stubOverflow(box.element as HTMLElement)
    await box.trigger('pointerenter')
    await flush()
    expect(box.attributes('aria-describedby')).toMatch(/^va-tooltip-\d+$/)

    await box.trigger('mouseleave')
    await flush()
    expect(box.attributes('aria-describedby')).toBeUndefined()
  })
})
