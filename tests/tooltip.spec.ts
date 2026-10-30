import { describe, it, expect, vi, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Tooltip from 'components/tooltip'

/**
 * Tooltip 显隐语义 / 无障碍 / 事件源过滤 回归守护
 *
 * 三处断言都对应「容易被后续重构无声改坏、且已有消费方依赖」的行为：
 * - `animationend` 由 `Ellipsis` 消费（用于收起后复位），不能被子节点嵌套动画误触发；
 * - `role` / `aria-describedby` 是无障碍读屏链路；
 * - 受控 `open` 必须立即生效，不能套用 hover 的 `showDelay`；
 * - `destroyOnHide` 须原样透传给浮层宿主：关闭后在**离开过渡结束**时卸载，再次显示重新创建。
 *
 * 注意：@vue/test-utils 默认会把 `Transition` 替换为 `<transition-stub>`，
 * 导致挂在 `<Transition>` 上的监听落到 stub 而非真实子元素（真实环境 Vue 会透传到子元素）。
 * 因此必须显式关闭该 stub，否则 `animationend` 相关断言会假性失败。
 */
const mountOptions = {
  attachTo: document.body,
  global: {
    stubs: {
      transition: false
    }
  }
}

const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

/** 等待「定时器（delay 0）→ 渲染」两拍 */
async function flush(): Promise<void> {
  await nextTick()
  await tick()
  await nextTick()
}

/** 当前实例的面板：用例统一用 `to: false` 就地渲染，按组件根节点收敛查询，避免跨用例残留节点干扰 */
function panelOf(target: ReturnType<typeof mount>): HTMLElement | null {
  return target.element.querySelector('.tooltip-card-container')
}

/**
 * 轮询等待浮层转入隐藏（`display: none`）
 *
 * 无 CSS 时离开过渡由「双 rAF + 事件等待」收尾，固定等待在负载下可能不够，故补发 `animationend`
 * 覆盖事件等待分支再轮询落定（与 tests/popconfirm.spec.ts 的 `waitClosed` 同一口径）。
 */
async function waitHidden(query: () => HTMLElement | null): Promise<void> {
  for (let i = 0; i < 20; i += 1) {
    const panel = query()
    if (!panel || panel.style.display === 'none') return
    panel.dispatchEvent(new Event('animationend'))
    await new Promise((resolve) => setTimeout(resolve, 10))
    await nextTick()
  }
}

/** 轮询等待浮层元素被卸载（`destroyOnHide`）：卸载发生在离开过渡结束之后 */
async function waitUnmounted(panel: HTMLElement | null): Promise<void> {
  if (!panel) return
  for (let i = 0; i < 20 && panel.isConnected; i += 1) {
    panel.dispatchEvent(new Event('animationend'))
    await new Promise((resolve) => setTimeout(resolve, 10))
    await nextTick()
  }
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
})

describe('Tooltip 行为回归', () => {
  it('受控 open 应立即显示，不套用 hover 的 showDelay，且不额外回传事件', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true, showDelay: 5000 }
    })
    await flush()

    // 若误走 showDelay，5s 内不会有任何显示
    expect(document.querySelector('.tooltip-card-container')).not.toBeNull()
    // 受控：显隐由属性驱动，属性变化不再回传 update:open / openChange（只有内部触发才上报）
    expect(wrapper.emitted('openChange')).toBeUndefined()
    expect(wrapper.emitted('update:open')).toBeUndefined()
  })

  it('显式传入 open（含 false）即为受控：内部触发只上报，面板跟随属性', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', trigger: 'click', open: true, to: false }
    })
    await flush()
    const trigger = wrapper.find('.tooltip-content').element
    const panel = (): HTMLElement | null => panelOf(wrapper)

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    // 父侧不响应 update:open ⇒ 属性未变，面板必须保持打开（不能由组件自行收起）
    expect(wrapper.emitted('openChange')).toEqual([[false]])
    expect(panel()?.style.display).not.toBe('none')

    // 属性一变即生效，无需内部触发
    await wrapper.setProps({ open: false })
    await waitHidden(() => panelOf(wrapper))
    expect(panel()?.style.display).toBe('none')
  })

  it('卡片带 role="tooltip"，且与触发器经 aria-describedby 关联', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true }
    })
    await flush()

    const card = document.querySelector('.tooltip-card') as HTMLElement | null
    const trigger = wrapper.find('.tooltip-content').element
    expect(card).not.toBeNull()
    expect(card?.getAttribute('role')).toBe('tooltip')

    const cardId = card?.getAttribute('id')
    expect(cardId).toBeTruthy()
    expect(trigger.getAttribute('aria-describedby')).toBe(cardId)
  })

  it('tooltipRole / tooltipLabelledby 可改写面板语义（默认仍是 tooltip）', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true, tooltipRole: 'dialog', tooltipLabelledby: 'va-panel-title' }
    })
    await flush()

    const card = document.querySelector('.tooltip-card') as HTMLElement | null
    expect(card?.getAttribute('role')).toBe('dialog')
    expect(card?.getAttribute('aria-labelledby')).toBe('va-panel-title')
  })

  it('describedBy 为 false 时断开触发器的描述关联（对话框类面板不把内容当描述）', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true, describedBy: false }
    })
    await flush()

    const card = document.querySelector('.tooltip-card') as HTMLElement | null
    const trigger = wrapper.find('.tooltip-content').element
    // 面板仍然可见、仍有 id，只是不再回指为触发器的描述
    expect(card?.getAttribute('id')).toBeTruthy()
    expect(trigger.hasAttribute('aria-describedby')).toBe(false)
  })

  it('仅响应卡片容器自身的 animationend，忽略子节点嵌套动画冒泡', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true }
    })
    await flush()

    const container = document.querySelector('.tooltip-card-container') as HTMLElement
    const card = document.querySelector('.tooltip-card') as HTMLElement
    expect(container).not.toBeNull()

    // 子节点（嵌套动画）冒泡上来的 animationend 不应触发组件事件
    card.dispatchEvent(new Event('animationend', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('animationend')).toBeUndefined()

    // 容器自身的 animationend（缩放动画）应正常触发
    container.dispatchEvent(new Event('animationend'))
    await nextTick()
    expect(wrapper.emitted('animationend')).toEqual([[true]])
  })
})

describe('Tooltip · 面板的公开覆盖入口（tooltipClass / popupClassName / zIndex）', () => {
  it('tooltipClass 落在气泡卡片上，popupClassName 落在面板（定位盒）上', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true, tooltipClass: 'my-card', popupClassName: 'my-panel' }
    })
    await flush()

    const panel = document.querySelector('.tooltip-card-container') as HTMLElement
    // 面板层（此前无公开 prop 可及）经 popupClassName 可定制，且组件自有类名不被覆盖
    expect(panel.classList.contains('my-panel')).toBe(true)
    expect(panel.classList.contains('tooltip-card-container')).toBe(true)
    // 气泡卡片层仍走既有 tooltipClass
    expect(panel.querySelector('.tooltip-card')?.classList.contains('my-card')).toBe(true)
  })

  it('popupStyle 在皮肤变量与动画原点之后合并，可覆盖面板样式但不接管层级', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true, popupStyle: { filter: 'blur(1px)', zIndex: 9999 } }
    })
    await flush()
    const panel = document.querySelector('.tooltip-card-container') as HTMLElement
    expect(panel.style.filter).toBe('blur(1px)')
    // 皮肤变量仍在（popupStyle 是追加合并，不是替换）
    expect(panel.style.getPropertyValue('--tooltip-max-width')).toBe('240px')
    // 层级恒由宿主接管：popupStyle 里的 zIndex 不生效（需用 zIndex prop）
    expect(Number(panel.style.zIndex)).toBe(1070)
  })

  it('zIndex 优先于默认层级 1070', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true, zIndex: 1200 }
    })
    await flush()
    const panel = document.querySelector('.tooltip-card-container') as HTMLElement
    expect(Number(panel.style.zIndex)).toBe(1200)
  })
})

describe('Tooltip · destroyOnHide（透传给浮层宿主）', () => {
  it('未传时元素常驻：关闭后仅 display: none，元素复用', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true, to: false }
    })
    await flush()
    const panel = panelOf(wrapper)
    expect(panel).not.toBeNull()

    await wrapper.setProps({ open: false })
    await waitHidden(() => panelOf(wrapper))
    expect(panelOf(wrapper)).toBe(panel)
    expect(panel?.style.display).toBe('none')
  })

  it('为 true 时关闭后卸载整棵浮层子树，再次显示重新创建且契约齐全', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', open: true, to: false, destroyOnHide: true }
    })
    await flush()
    const first = panelOf(wrapper)
    expect(first).not.toBeNull()

    await wrapper.setProps({ open: false })
    await waitUnmounted(first)
    // 卸载发生在离开过渡结束之后，故断言的是「元素已脱离文档」而非「查不到」
    expect(first?.isConnected).toBe(false)
    expect(wrapper.element.querySelector('.va-popup-container')).toBeNull()

    await wrapper.setProps({ open: true })
    await flush()
    const recreated = panelOf(wrapper)
    expect(recreated).not.toBeNull()
    expect(recreated).not.toBe(first)
    // 重建后宿主与皮肤契约齐全：定位参照容器仍在、方向类 / 箭头 / role 均按首次展示路径重新落上
    expect(wrapper.element.querySelector('.va-popup-container')?.contains(recreated as Node)).toBe(true)
    expect(recreated?.classList.contains('va-popup-panel')).toBe(true)
    expect(recreated?.classList.toString()).toContain('va-popup-placement-')
    expect(recreated?.querySelector('.tooltip-arrow')).not.toBeNull()
    // `role="tooltip"` 落在皮肤层的卡片上（面板壳属宿主），重建后卡片与内容一并重渲染
    const card = recreated?.querySelector('.tooltip-card')
    expect(card?.getAttribute('role')).toBe('tooltip')
    expect(card?.textContent).toBe('hi')
    // 无障碍链路在重建后仍成立：触发器重新关联到新卡片的 id
    const trigger = wrapper.find('.tooltip-content').element
    expect(card?.getAttribute('id')).toBeTruthy()
    expect(trigger.getAttribute('aria-describedby')).toBe(card?.getAttribute('id'))
  })
})

describe('Tooltip · keyboard 的 enter 切换', () => {
  it('Enter 切换显示后，浏览器补发的 click 不再把显示态切回', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', trigger: 'click', keyboard: true, to: false }
    })
    await flush()
    const trigger = wrapper.find('.tooltip-content').element

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    // 键盘激活可聚焦子元素时，浏览器会在 keydown 之后补发一次 click（同一操作，不应再切换一次）
    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    expect(wrapper.emitted('openChange')).toEqual([[true]])

    // 标记只在同拍内有效：随后的真实点击照常关闭
    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    expect(wrapper.emitted('openChange')).toEqual([[true], [false]])
  })
})

/**
 * 多根默认插槽的触发范围
 *
 * 定位锚点取插槽内容的**首个元素**（同一元素兼作宿主的「外点排除」范围），而显式切换的落点是
 * 整个 `.tooltip-content` 包裹层 —— 两者不一致的区域（首个元素之外、包裹层之内）依赖一个隐性约束
 * 才不会「先判外点关掉、再由 toggle 打开」：外点关闭必须是**异步**的（走 `onHide` 的 delay 0 定时器），
 * 且 toggle 先 `clearTimers()` 再落定。若把外部点击改成同步收起，本用例会立刻变红。
 */
describe('Tooltip · 多根插槽的触发范围', () => {
  it('点击首个元素之外的触发器区域只切换一次，不出现「关了又开」', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', trigger: 'click', to: false },
      slots: { default: () => [h('span', { class: 'first' }, 'a'), h('span', { class: 'second' }, 'b')] }
    })
    await flush()

    const first = wrapper.element.querySelector('.first') as HTMLElement
    const second = wrapper.element.querySelector('.second') as HTMLElement
    expect(first).not.toBeNull()
    expect(second).not.toBeNull()

    first.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    expect(wrapper.emitted('openChange')).toEqual([[true]])
    expect(panelOf(wrapper)?.style.display).not.toBe('none')

    second.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    await waitHidden(() => panelOf(wrapper))
    // 只发一次 false：外点上报与显式切换在同一拍收敛，没有「关了又开」的中间态
    expect(wrapper.emitted('openChange')).toEqual([[true], [false]])
    expect(panelOf(wrapper)?.style.display).toBe('none')

    // 收起后再点同一处仍是一次切换（重新打开）
    second.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    expect(wrapper.emitted('openChange')).toEqual([[true], [false], [true]])
    expect(panelOf(wrapper)?.style.display).not.toBe('none')
  })
})
