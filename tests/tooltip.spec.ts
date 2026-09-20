import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Tooltip from 'components/tooltip'

/**
 * Tooltip 显隐语义 / 无障碍 / 事件源过滤 回归守护
 *
 * 三处断言都对应「容易被后续重构无声改坏、且已有消费方依赖」的行为：
 * - `animationend` 由 `Ellipsis` 消费（用于收起后复位），不能被子节点嵌套动画误触发；
 * - `role` / `aria-describedby` 是无障碍读屏链路；
 * - 受控 `show` 必须立即生效，不能套用 hover 的 `showDelay`；
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
  it('受控 show 应立即显示，不套用 hover 的 showDelay', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', show: true, showDelay: 5000 }
    })
    await flush()

    // 若误走 showDelay，5s 内不会有任何显示与事件
    expect(wrapper.emitted('openChange')).toEqual([[true]])
    expect(document.querySelector('.tooltip-card-container')).not.toBeNull()
  })

  it('卡片带 role="tooltip"，且与触发器经 aria-describedby 关联', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', show: true }
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

  it('仅响应卡片容器自身的 animationend，忽略子节点嵌套动画冒泡', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', show: true }
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
      props: { tooltip: 'hi', show: true, tooltipClass: 'my-card', popupClassName: 'my-panel' }
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
      props: { tooltip: 'hi', show: true, popupStyle: { filter: 'blur(1px)', zIndex: 9999 } }
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
      props: { tooltip: 'hi', show: true, zIndex: 1200 }
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
      props: { tooltip: 'hi', show: true, to: false }
    })
    await flush()
    const panel = panelOf(wrapper)
    expect(panel).not.toBeNull()

    await wrapper.setProps({ show: false })
    await waitHidden(() => panelOf(wrapper))
    expect(panelOf(wrapper)).toBe(panel)
    expect(panel?.style.display).toBe('none')
  })

  it('为 true 时关闭后卸载整棵浮层子树，再次显示重新创建且契约齐全', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', show: true, to: false, destroyOnHide: true }
    })
    await flush()
    const first = panelOf(wrapper)
    expect(first).not.toBeNull()

    await wrapper.setProps({ show: false })
    await waitUnmounted(first)
    // 卸载发生在离开过渡结束之后，故断言的是「元素已脱离文档」而非「查不到」
    expect(first?.isConnected).toBe(false)
    expect(wrapper.element.querySelector('.va-popup-container')).toBeNull()

    await wrapper.setProps({ show: true })
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
