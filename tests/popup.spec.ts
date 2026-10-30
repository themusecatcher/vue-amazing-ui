import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { defineComponent, h, nextTick, onMounted, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { mount } from '@vue/test-utils'
import Popup from 'components/popup'
import ConfigProvider from 'components/config-provider'
import { injectFromChain, zIndexContainerOpenKey } from 'components/utils'
import { flushTransition } from './helpers'

/**
 * `<Popup>` 浮层宿主回归守护
 *
 * 锁定的是**宿主契约**，而非求解结果（求解层已由
 * `floating-position.spec.ts` 逐项自证）：
 * - **首帧优化**：未展示前不渲染任何 DOM，首次展示后转入 `v-show`（动画期间不卸载，元素复用）；
 *   `forceRender` 为真时改为挂载即渲染（面板保持不可见），只改变首次渲染时机；
 * - **两层 DOM + 方向类契约**：定位参照容器 + 面板；面板上落 `va-popup-placement-{方向}`，值取
 *   `actualPlacement` 的**对外命名**（kebab 命名仅内核内部使用），箭头只由该方向类选择器驱动；
 * - **层级**：未注入管理器时用 `defaultZIndex`，注入后按「后出现者在上」分配，显式 `zIndex` 优先；
 * - **关闭语义**：仅响应面板自身的动画结束（忽略插槽内容里冒泡的嵌套动画），离开结束发 `afterLeave`；
 * - **卸载语义**：默认为「不卸载」；`destroyOnHide` 为真时在**离开过渡结束之后**卸载整棵子树，
 *   重新展示按「首次展示」路径重建（重新领层级 + 重新测量）。
 */

const VIEW_WIDTH = 1000
const VIEW_HEIGHT = 600

/** 构造桩 DOMRect */
function domRect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    x: left,
    y: top,
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
    toJSON: () => ({})
  } as DOMRect
}

/** 视口桩矩形：未登记元素（含内核惰性创建的视口测量元素、定位容器）统一返回它 */
const viewportRect = domRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
/** 锚点桩矩形：按用例改动后再挂载，以影响首次求解 */
let anchorRect = domRect(400, 300, 100, 40)
/** 面板桩**布局**尺寸（内核按 offsetWidth / offsetHeight 测量浮层） */
const panelSize = { width: 200, height: 80 }

/** 一个 tick 的等待：让内核的 post flush 与 Transition 归位（公共等待见 tests/helpers.ts） */
async function flush(): Promise<void> {
  await flushTransition()
}

const queryContainer = (): HTMLElement | null => document.querySelector('.va-popup-container')
const queryPanel = (): HTMLElement | null => document.querySelector('.va-popup-panel')

let wrapper: ReturnType<typeof mount> | null = null
let originalGetBoundingClientRect: typeof HTMLElement.prototype.getBoundingClientRect
let originalOffsetWidth: PropertyDescriptor | undefined
let originalOffsetHeight: PropertyDescriptor | undefined

beforeEach(() => {
  anchorRect = domRect(400, 300, 100, 40)
  originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect
  HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    if (this.classList?.contains('host-anchor')) return anchorRect
    if (this.classList?.contains('va-popup-panel')) return domRect(0, 0, panelSize.width, panelSize.height)
    return viewportRect
  }
  originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
  originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement): number {
      return this.classList?.contains('va-popup-panel') ? panelSize.width : 0
    }
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement): number {
      return this.classList?.contains('va-popup-panel') ? panelSize.height : 0
    }
  })
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  // 面板默认 Teleport 到 body，卸载后清理残留（`to: false` 的随组件一并卸载）
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
  HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect
  if (originalOffsetWidth) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
  }
  if (originalOffsetHeight) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
  }
})

interface PopupHostOptions {
  /** 初始 show：用于验证首帧优化 */
  show?: boolean
  /** 透传给 Popup 的 props（show / anchor 由宿主接管） */
  props?: Record<string, unknown>
  /** 透传给 Popup 的监听（emit 事件，如 onAnimationend / onAfterLeave） */
  listeners?: Record<string, unknown>
  /** 插槽内容类名 */
  slotClass?: string
}

interface PopupHost {
  wrapper: ReturnType<typeof mount>
  show: Ref<boolean>
  anchor: Ref<HTMLElement | null>
}

/** 挂载宿主：锚点与面板同级，锚点经 ref 回填后传给 Popup（模拟真实使用） */
function mountPopup(options: PopupHostOptions = {}): PopupHost {
  const { show: initialShow = true, props = {}, listeners = {}, slotClass = 'popup-body' } = options
  const show = ref(initialShow)
  const anchor = ref<HTMLElement | null>(null)
  const Host = defineComponent({
    setup() {
      return () =>
        h('div', { class: 'host' }, [
          h('span', { ref: anchor, class: 'host-anchor' }, 'anchor'),
          h(
            Popup,
            { defaultZIndex: 1070, ...props, ...listeners, show: show.value, anchor: anchor.value },
            { default: () => h('div', { class: slotClass }, 'content') }
          )
        ])
    }
  })
  return {
    wrapper: mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } }),
    show,
    anchor
  }
}

/** 隐藏浮层并等待离开动画归位（无 CSS 时 Vue 立即结束；补一次 animationend 以覆盖等待分支） */
async function hide(host: PopupHost, panel: HTMLElement): Promise<void> {
  host.show.value = false
  await flush()
  panel.dispatchEvent(new Event('animationend'))
  await flush()
}

describe('Popup · 首帧优化与显隐（内化 5 份复制实现）', () => {
  it('未展示前不渲染任何 DOM，首次展示后转入 v-show 且元素不卸载', async () => {
    const host = mountPopup({ show: false })
    wrapper = host.wrapper
    await flush()
    expect(queryContainer()).toBeNull()

    host.show.value = true
    await flush()
    const panel = queryPanel() as HTMLElement
    expect(queryContainer()).not.toBeNull()
    expect(panel).not.toBeNull()

    // 隐藏后元素仍在（仅 display: none），满足「动画期间不卸载」
    await hide(host, panel)
    expect(queryPanel()).toBe(panel)
    expect(panel.style.display).toBe('none')

    // 再次展示复用同一元素：首帧优化只在首次渲染生效
    host.show.value = true
    await flush()
    expect(queryPanel()).toBe(panel)
    expect(panel.style.display).not.toBe('none')
  })

  it('to 为 false 时就地渲染，不 Teleport 到 body', async () => {
    const host = mountPopup({ props: { to: false } })
    wrapper = host.wrapper
    await flush()
    const container = queryContainer() as HTMLElement
    expect(container).not.toBeNull()
    // 留在组件树内部（picker 面板的内层浮层需要）
    expect(host.wrapper.element.contains(container)).toBe(true)
  })

  it('to 默认挂载 body', async () => {
    const host = mountPopup()
    wrapper = host.wrapper
    await flush()
    const container = queryContainer() as HTMLElement
    expect(host.wrapper.element.contains(container)).toBe(false)
    expect(document.body.contains(container)).toBe(true)
  })
})

describe('Popup · 两层 DOM 与属性契约', () => {
  it('面板是定位参照容器的子元素，定位样式与方向类均由内核输出', async () => {
    const host = mountPopup({ props: { placement: 'bottomLeft' } })
    wrapper = host.wrapper
    await flush()
    const container = queryContainer() as HTMLElement
    const panel = queryPanel() as HTMLElement

    expect(container.contains(panel)).toBe(true)
    // 类名取 actualPlacement 的对外命名（bottomLeft 而非内核的 bottom-start）
    expect(panel.classList.contains('va-popup-placement-bottomLeft')).toBe(true)
    // 锚点位于 (400, 300) 且尺寸 100×40、容器原点在文档左上 → 面板 left = 400、top = 340
    expect(panel.style.left).toBe('400px')
    expect(panel.style.top).toBe('340px')
  })

  it('主轴空间不足发生翻转时，方向类同步更新为翻转后的对外命名', async () => {
    // 锚点贴近视口底部：下方仅剩 20px，放不下 80px 高的面板 → 同轴翻转到顶部并保留次轴后缀
    anchorRect = domRect(400, 540, 100, 40)
    const host = mountPopup({ props: { placement: 'bottomLeft' } })
    wrapper = host.wrapper
    await flush()
    const panel = queryPanel() as HTMLElement

    expect(panel.classList.contains('va-popup-placement-topLeft')).toBe(true)
    expect(panel.style.translate).toBe('0 -100%')
  })

  it('arrow 为真时渲染箭头 DOM（宿主基础类 + 自定义类）', async () => {
    const host = mountPopup({ props: { arrow: true, arrowClass: 'my-arrow' } })
    wrapper = host.wrapper
    await flush()
    const arrow = queryPanel()?.querySelector('.my-arrow')
    expect(arrow).not.toBeNull()
    expect(arrow?.classList.contains('va-popup-arrow')).toBe(true)
    // 箭头在面板内部：几何由皮肤层用方向类选择器驱动，宿主不参与运算
    expect(queryPanel()?.contains(arrow as Node)).toBe(true)
  })

  it('arrow 为假时不渲染箭头 DOM', async () => {
    const host = mountPopup()
    wrapper = host.wrapper
    await flush()
    expect(queryPanel()?.querySelector('.va-popup-arrow')).toBeNull()
  })
})

describe('Popup · 层级（useZIndex）', () => {
  it('未传 zIndex 时用 defaultZIndex', async () => {
    const host = mountPopup()
    wrapper = host.wrapper
    await flush()
    expect(Number((queryPanel() as HTMLElement).style.zIndex)).toBe(1070)
  })

  it('显式 zIndex 优先于 defaultZIndex 与自动分配', async () => {
    const host = mountPopup({ props: { zIndex: 7000 } })
    wrapper = host.wrapper
    await flush()
    expect(Number((queryPanel() as HTMLElement).style.zIndex)).toBe(7000)
  })

  it('ConfigProvider 传入 baseZIndex 后按「后出现者在上」分配，且重新出现会置顶', async () => {
    const first = ref(true)
    const second = ref(true)
    const Host = defineComponent({
      setup() {
        return () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () => [
                h(Popup, { defaultZIndex: 1070, show: first.value }, { default: () => h('div', 'a') }),
                h(Popup, { defaultZIndex: 1070, show: second.value }, { default: () => h('div', 'b') })
              ]
            }
          )
      }
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()

    const panels = document.querySelectorAll('.va-popup-panel')
    expect(panels).toHaveLength(2)
    expect(Number((panels[0] as HTMLElement).style.zIndex)).toBe(5000)
    expect(Number((panels[1] as HTMLElement).style.zIndex)).toBe(5010)

    // 关闭后重新打开：先归还旧槽位再领取 → 位于当前所有已打开层之上
    first.value = false
    await flush()
    first.value = true
    await flush()
    expect(Number((panels[0] as HTMLElement).style.zIndex)).toBe(5020)
    expect(Number((panels[1] as HTMLElement).style.zIndex)).toBe(5010)
  })
})

describe('Popup · 关闭语义', () => {
  it('仅响应面板自身的 animationend，忽略插槽内容里冒泡的嵌套动画', async () => {
    const fired: string[] = []
    const host = mountPopup({ listeners: { onAnimationend: () => fired.push('animationend') } })
    wrapper = host.wrapper
    await flush()
    const panel = queryPanel() as HTMLElement
    const body = panel.querySelector('.popup-body') as HTMLElement

    // 子节点（嵌套动画）冒泡上来的 animationend 不应触发宿主事件
    body.dispatchEvent(new Event('animationend', { bubbles: true }))
    await nextTick()
    expect(fired).toEqual([])

    // 面板自身的 animationend（缩放动画）应正常触发
    panel.dispatchEvent(new Event('animationend'))
    await nextTick()
    expect(fired).toEqual(['animationend'])
  })

  it('离开动画结束后发 afterLeave，且面板转入隐藏', async () => {
    const fired: string[] = []
    const host = mountPopup({ listeners: { onAfterLeave: () => fired.push('afterLeave') } })
    wrapper = host.wrapper
    await flush()
    const panel = queryPanel() as HTMLElement

    await hide(host, panel)
    expect(fired).toEqual(['afterLeave'])
    expect(panel.style.display).toBe('none')
  })

  it('离开动画期间面板带 va-popup-leaving（宿主据此禁用指针事件），结束后移除', async () => {
    const host = mountPopup()
    wrapper = host.wrapper
    await flush()
    const panel = queryPanel() as HTMLElement
    // 常态：恢复指针事件，不带离开态类
    expect(panel.classList.contains('va-popup-leaving')).toBe(false)

    host.show.value = false
    // 只推进微任务（Transition 的 before-leave 钩子与随后的重渲染都在同一个 flush 内完成），
    // 不等待离开动画结束 —— 该结论断言的是「动画进行中」这一窗口
    await nextTick()
    await nextTick()
    expect(panel.classList.contains('va-popup-leaving')).toBe(true)

    // 动画结束后必须移除，否则下次显示会残留「面板不可交互」
    panel.dispatchEvent(new Event('animationend'))
    await flush()
    expect(panel.classList.contains('va-popup-leaving')).toBe(false)
  })
})

describe('Popup · destroyOnHide（隐藏后卸载）', () => {
  it('显式传 false 时与默认一致：隐藏后整棵子树常驻，仅切换 display', async () => {
    const host = mountPopup({ props: { destroyOnHide: false } })
    wrapper = host.wrapper
    await flush()
    const panel = queryPanel() as HTMLElement

    await hide(host, panel)
    expect(queryContainer()).not.toBeNull()
    expect(queryPanel()).toBe(panel)
    expect(panel.style.display).toBe('none')
  })

  it('从未展示时不渲染任何 DOM（与默认模式的首帧优化一致）', async () => {
    const host = mountPopup({ show: false, props: { destroyOnHide: true } })
    wrapper = host.wrapper
    await flush()
    expect(queryContainer()).toBeNull()
  })

  it('离开动画进行中不卸载，离开结束后卸载整棵子树', async () => {
    const host = mountPopup({ props: { destroyOnHide: true } })
    wrapper = host.wrapper
    await flush()
    const panel = queryPanel() as HTMLElement

    host.show.value = false
    // 只推进微任务：断言的是「离开动画进行中」这一窗口（与下方 va-popup-leaving 用例同一口径）
    await nextTick()
    await nextTick()
    expect(queryContainer()).not.toBeNull()
    expect(queryPanel()).toBe(panel)
    expect(panel.classList.contains('va-popup-leaving')).toBe(true)

    panel.dispatchEvent(new Event('animationend'))
    await flush()
    // 离开过渡结束：容器连同面板（与箭头）整体移除，DOM 归零
    expect(queryContainer()).toBeNull()
    expect(queryPanel()).toBeNull()
  })

  it('afterLeave 触发时刻面板仍在（卸载落在其后的一次 patch），且事件只发一次', async () => {
    const states: boolean[] = []
    const host = mountPopup({
      props: { destroyOnHide: true },
      listeners: { onAfterLeave: () => states.push(queryContainer() !== null) }
    })
    wrapper = host.wrapper
    await flush()
    const panel = queryPanel() as HTMLElement

    await hide(host, panel)
    // 事件发出时子树尚未被 patch 掉（否则「动画结束」与「元素已消失」会在同一时刻发生，消费方无从区分）
    expect(states).toEqual([true])
    expect(queryContainer()).toBeNull()
  })

  it('离开被打断（动画未结束就重新展示）时不卸载', async () => {
    const host = mountPopup({ props: { destroyOnHide: true } })
    wrapper = host.wrapper
    await flush()
    const panel = queryPanel() as HTMLElement

    host.show.value = false
    await nextTick()
    await nextTick()
    expect(panel.classList.contains('va-popup-leaving')).toBe(true)

    // Vue 取消离开 → 不发 afterLeave → 不得卸载；离开态类由 onBeforeEnter 复位
    host.show.value = true
    await flush()
    expect(queryContainer()).not.toBeNull()
    expect(queryPanel()).toBe(panel)
    expect(panel.style.display).not.toBe('none')
    expect(panel.classList.contains('va-popup-leaving')).toBe(false)

    // 再等一轮也不得卸载（防「延迟到下一帧才误卸载」）
    await flush()
    expect(queryPanel()).toBe(panel)
  })

  it('重新展示按首次展示路径重建，并按最新锚点重新定位', async () => {
    const host = mountPopup({ props: { destroyOnHide: true, placement: 'bottomLeft' } })
    wrapper = host.wrapper
    await flush()
    const firstPanel = queryPanel() as HTMLElement
    expect(firstPanel.style.left).toBe('400px')
    expect(firstPanel.style.top).toBe('340px')

    await hide(host, firstPanel)
    expect(queryContainer()).toBeNull()

    // 隐藏期间锚点移动到新位置：重建后必须重新求解，而不是沿用旧的定位输出
    anchorRect = domRect(100, 200, 100, 40)
    host.show.value = true
    await flush()
    const secondPanel = queryPanel() as HTMLElement
    expect(secondPanel).not.toBe(firstPanel)
    expect(secondPanel.classList.contains('va-popup-placement-bottomLeft')).toBe(true)
    expect(secondPanel.style.left).toBe('100px')
    expect(secondPanel.style.top).toBe('240px')
  })

  it('可反复隐藏 / 展示（卸载与重建幂等）', async () => {
    const host = mountPopup({ props: { destroyOnHide: true } })
    wrapper = host.wrapper
    await flush()

    for (let round = 0; round < 2; round += 1) {
      const panel = queryPanel() as HTMLElement
      await hide(host, panel)
      expect(queryContainer()).toBeNull()

      host.show.value = true
      await flush()
      expect(queryPanel()).not.toBeNull()
    }
  })

  it('卸载后归还层级槽位，重新展示时重新领取（后出现者仍在上）', async () => {
    const first = ref(true)
    const second = ref(true)
    const Host = defineComponent({
      setup() {
        return () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () => [
                h(
                  Popup,
                  { defaultZIndex: 1070, destroyOnHide: true, show: first.value },
                  { default: () => h('div', 'a') }
                ),
                h(Popup, { defaultZIndex: 1070, show: second.value }, { default: () => h('div', 'b') })
              ]
            }
          )
      }
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()

    let panels = document.querySelectorAll('.va-popup-panel')
    expect(panels).toHaveLength(2)
    expect(Number((panels[0] as HTMLElement).style.zIndex)).toBe(5000)
    expect(Number((panels[1] as HTMLElement).style.zIndex)).toBe(5010)

    // 关闭第一个：离开结束后归还槽位并卸载子树，此刻只剩第二个面板
    const firstPanel = panels[0] as HTMLElement
    first.value = false
    await flush()
    firstPanel.dispatchEvent(new Event('animationend'))
    await flush()
    expect(document.querySelectorAll('.va-popup-panel')).toHaveLength(1)

    first.value = true
    await flush()
    panels = document.querySelectorAll('.va-popup-panel')
    expect(panels).toHaveLength(2)
    // 重新展示 = 重新挂载容器 → 追加到目标末尾（DOM 顺序即「后出现者在上」），故按内容取面板
    const panelOf = (text: string): HTMLElement =>
      [...panels].find((panel) => panel.textContent?.includes(text)) as HTMLElement
    // 重新领取：位于当前所有已打开层之上
    expect(Number(panelOf('a').style.zIndex)).toBe(5020)
    expect(Number(panelOf('b').style.zIndex)).toBe(5010)
    // 容器顺序同步刷新：重新出现的层排到 DOM 末尾，与层级取值方向一致
    expect(panels[1].textContent).toContain('a')
  })

  it('隐藏状态下开启 destroyOnHide 不追溯：仅影响其后发生的隐藏', async () => {
    const show = ref(true)
    const destroyOnHide = ref(false)
    const Host = defineComponent({
      setup() {
        return () =>
          h(
            Popup,
            { defaultZIndex: 1070, show: show.value, destroyOnHide: destroyOnHide.value },
            {
              default: () => h('div', 'x')
            }
          )
      }
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()
    const panel = queryPanel() as HTMLElement

    // 默认关闭：隐藏后元素常驻（仅 display: none）
    show.value = false
    await flush()
    expect(queryPanel()).toBe(panel)

    // 已隐藏状态下打开开关：不对已隐藏的浮层追溯，元素仍在
    destroyOnHide.value = true
    await flush()
    expect(queryPanel()).toBe(panel)

    // 其后发生的隐藏才卸载：重新展示后再关闭
    show.value = true
    await flush()
    const active = queryPanel() as HTMLElement
    expect(active).toBe(panel)
    show.value = false
    await flush()
    active.dispatchEvent(new Event('animationend'))
    await flush()
    expect(queryContainer()).toBeNull()
  })
})

describe('Popup · forceRender（首次展示前渲染）', () => {
  it('为真时未展示即渲染面板 DOM（保持不可见），首次展示复用同一元素', async () => {
    const host = mountPopup({ show: false, props: { forceRender: true } })
    wrapper = host.wrapper
    await flush()

    // 与首帧优化相反：面板随组件挂载即创建
    expect(queryContainer()).not.toBeNull()
    const panel = queryPanel() as HTMLElement
    expect(panel).not.toBeNull()
    // 未展示：元素存在但不可见（显隐仍由 show 决定）
    expect(panel.style.display).toBe('none')

    // 首次展示复用同一个元素 —— 这正是不预先渲染时无法避免的首次挂载开销
    host.show.value = true
    await flush()
    expect(queryPanel()).toBe(panel)
    expect(panel.style.display).not.toBe('none')
  })

  it('为假（默认）时保持首帧优化：未展示前不渲染任何 DOM', async () => {
    const host = mountPopup({ show: false, props: { forceRender: false } })
    wrapper = host.wrapper
    await flush()
    expect(queryContainer()).toBeNull()
  })

  it('与 destroyOnHide 组合：离开过渡结束后仍按 destroyOnHide 卸载', async () => {
    const host = mountPopup({ props: { forceRender: true, destroyOnHide: true } })
    wrapper = host.wrapper
    await flush()
    const panel = queryPanel() as HTMLElement

    await hide(host, panel)
    // forceRender 只决定首次渲染时机，不改变「隐藏后是否卸载」的生命周期策略
    expect(queryContainer()).toBeNull()
  })
})

describe('Popup · 浮层字体承接', () => {
  it('展开时把锚点的计算字体族复制到浮层容器', async () => {
    const host = mountPopup({ show: false })
    wrapper = host.wrapper
    await flush()

    const anchor = document.querySelector('.host-anchor') as HTMLElement
    anchor.style.fontFamily = 'Georgia'

    host.show.value = true
    await flush()

    expect((queryContainer() as HTMLElement).style.fontFamily).toBe('Georgia')
  })

  it('每次重新展开都刷新承接值（锚点字体可变）', async () => {
    const host = mountPopup()
    wrapper = host.wrapper
    await flush()
    await hide(host, queryPanel() as HTMLElement)

    const anchor = document.querySelector('.host-anchor') as HTMLElement
    anchor.style.fontFamily = 'monospace'
    host.show.value = true
    await flush()

    expect((queryContainer() as HTMLElement).style.fontFamily).toBe('monospace')
  })

  it('承接写在容器而非面板：面板自身的字体声明优先于该继承来源', async () => {
    const host = mountPopup({ show: false })
    wrapper = host.wrapper
    await flush()

    const anchor = document.querySelector('.host-anchor') as HTMLElement
    anchor.style.fontFamily = 'Georgia'
    host.show.value = true
    await flush()

    const panel = queryPanel() as HTMLElement
    panel.style.fontFamily = 'serif'
    // 容器只作继承来源，不覆盖面板自身声明
    expect((queryContainer() as HTMLElement).style.fontFamily).toBe('Georgia')
    expect(panel.style.fontFamily).toBe('serif')
  })

  it('未传锚点时不做任何声明（保持原继承行为）', async () => {
    const Host = defineComponent({
      setup() {
        return () =>
          h(Popup, { defaultZIndex: 1070, show: true }, { default: () => h('div', { class: 'popup-body' }, 'content') })
      }
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()

    expect((queryContainer() as HTMLElement).style.fontFamily).toBe('')
  })

  it('锚点晚于展示就绪时补承接（受控展开 + 锚点挂载后赋值）', async () => {
    const anchor = ref<HTMLElement | null>(null)
    const Host = defineComponent({
      setup() {
        // 模拟消费组件在 onMounted 里才拿到锚点元素（如 Tooltip 的 measureAnchor）
        onMounted(() => {
          anchor.value = document.querySelector('.late-anchor') as HTMLElement
        })
        return () =>
          h('div', { class: 'host' }, [
            h('span', { class: 'late-anchor', style: { fontFamily: 'Georgia' } }, 'anchor'),
            h(Popup, { defaultZIndex: 1070, show: true, anchor: anchor.value }, { default: () => h('div', 'content') })
          ])
      }
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()
    await flush()

    expect((queryContainer() as HTMLElement).style.fontFamily).toBe('Georgia')
  })
})

describe('Popup · 承载层开合契约', () => {
  /**
   * 面板携带 `data-va-floating-mount` 后，插槽里的浮层（Tooltip / Dropdown / 内层选择器等）会挂进面板。
   * 面板关闭只是 `v-show` 隐藏，既不给内部浮层的触发元素派发 `mouseleave` 也不派发 `blur`，
   * 故宿主必须下发开合状态（`zIndexContainerOpenKey`，与 Modal / Drawer / Dialog 同一契约）；
   * 不下发时内部浮层会停在打开态，并在面板重新打开时闪现。
   */
  it('面板关闭时向内层下发 false', async () => {
    const show = ref<boolean>(true)
    const seen: boolean[] = []
    const Probe = defineComponent({
      setup() {
        const open = injectFromChain(zIndexContainerOpenKey)
        watchEffect(() => {
          if (open) seen.push(open.value)
        })
        return () => h('span', { class: 'probe' }, String(open?.value))
      }
    })
    const Host = defineComponent({
      setup() {
        return () => h(Popup, { defaultZIndex: 1070, show: show.value }, { default: () => h(Probe) })
      }
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()

    // 插槽内容能取到宿主下发的开合状态（承载层契约的前提）
    expect(queryPanel()?.querySelector('.probe')?.textContent).toBe('true')
    expect(seen[seen.length - 1]).toBe(true)

    show.value = false
    await flush()

    expect(seen[seen.length - 1]).toBe(false)
  })
})

/**
 * 外点上报（`closeOnOutsideClick`）
 *
 * 判定口径固定为「面板之外 且 锚点之外」：只判「面板外」时消费方仍要各自排触发器，
 * 等于只省了 `addEventListener` 样板。宿主只监听与上报、**不决定是否关闭** —— `show` 仍由
 * 消费方控制（这也是不把 Popover 迁到 Popup 上的理由）。
 */
describe('Popup · 外点上报（closeOnOutsideClick）', () => {
  /** 触发一次 mousedown：宿主与 antdv 同口径，在 mousedown / touchstart 上判定外部按下 */
  const downOn = (target: Element): void => {
    target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
  }
  /** 挂载「锚点 + Popup」宿主并收集上报事件 */
  const mountOutsideHost = (options: { enabled?: boolean; show?: boolean } = {}) => {
    const { enabled = true, show: initialShow = true } = options
    const calls: MouseEvent[] = []
    const host = mountPopup({
      show: initialShow,
      props: enabled ? { closeOnOutsideClick: true } : {},
      listeners: { onOutsideClick: (e: MouseEvent) => calls.push(e) }
    })
    wrapper = host.wrapper
    return { host, calls }
  }

  it('opt-in：未传 closeOnOutsideClick 时点击面板外不上报', async () => {
    const { calls } = mountOutsideHost({ enabled: false })
    await flush()

    downOn(document.body)
    await flush()

    expect(calls).toHaveLength(0)
  })

  it('面板内点击（含面板内子节点）不上报', async () => {
    const { calls } = mountOutsideHost()
    await flush()

    downOn(queryPanel() as HTMLElement)
    downOn(queryPanel()?.querySelector('.popup-body') as HTMLElement)
    await flush()

    expect(calls).toHaveLength(0)
  })

  it('锚点（触发器）内点击不上报', async () => {
    const { host, calls } = mountOutsideHost()
    await flush()

    downOn(host.anchor.value as HTMLElement)
    await flush()

    expect(calls).toHaveLength(0)
  })

  it('面板外且锚点外点击上报一次，并携带原始事件', async () => {
    const { calls } = mountOutsideHost()
    await flush()

    downOn(document.body)
    await flush()

    expect(calls).toHaveLength(1)
    expect(calls[0].target).toBe(document.body)
  })

  it('show 变假后移除监听（收起态点击不再上报）', async () => {
    const { host, calls } = mountOutsideHost()
    await flush()

    host.show.value = false
    await flush()
    downOn(document.body)
    await flush()

    expect(calls).toHaveLength(0)
  })

  it('面板内按下、面板外松开不上报（回归守护：click 的 target 会退化为共同祖先）', async () => {
    const { calls } = mountOutsideHost()
    await flush()

    // 面板内按下 → 拖到面板外松手：mousedown 的 target 是面板内元素，判定不会「误关」；
    // 旧实现在 click 上判定，此时 click 的 target 退化为 body（共同祖先）而误报
    downOn(queryPanel() as HTMLElement)
    document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(calls).toHaveLength(0)
  })

  it('触屏 touchstart 同样上报（移动端不产生 mousedown，与 antdv 一致）', async () => {
    const { calls } = mountOutsideHost()
    await flush()

    document.body.dispatchEvent(new Event('touchstart', { bubbles: true }))
    await flush()

    expect(calls).toHaveLength(1)
  })
})
