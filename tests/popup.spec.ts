import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import type { Ref } from 'vue'
import { mount } from '@vue/test-utils'
import Popup from 'components/popup'
import type { PopupBodyBindings } from 'components/popup'
import ConfigProvider from 'components/config-provider'

/**
 * `<Popup>` 浮层宿主回归守护
 *
 * 锁定的是**宿主契约**，而非求解结果（求解层已由
 * `floating-position.spec.ts` 逐项自证）：
 * - **首帧优化**：未展示前不渲染任何 DOM，首次展示后转入 `v-show`（动画期间不卸载，元素复用）；
 * - **两层 DOM + 方向类契约**：定位参照容器 + 面板；面板上落 `va-popup-placement-{方向}`，值取
 *   `actualPlacement` 的**对外命名**（kebab 命名仅内核内部使用），箭头只由该方向类选择器驱动；
 * - **层级**：未注入管理器时用 `defaultZIndex`，注入后按「后出现者在上」分配，显式 `zIndex` 优先；
 * - **关闭语义**：仅响应面板自身的动画结束（忽略插槽内容里冒泡的嵌套动画），离开结束发 `afterLeave`；
 * - **逃生舱**：`renderBody` 接管面板元素后，显隐 / 定位 / 层级仍由宿主负责；
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

/** 一个 tick 的等待：让内核的 post flush 与 Transition 归位 */
async function flush(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  await nextTick()
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

describe('Popup · renderBody 逃生舱', () => {
  it('接管面板元素后，显隐 / 定位 / 层级仍由宿主负责', async () => {
    const renderBody = (bindings: PopupBodyBindings) =>
      h(
        'div',
        {
          class: [bindings.class, 'custom-panel'],
          ref: bindings.setPanelRef,
          style: bindings.style
        },
        [h('div', { class: 'custom-content' }, 'content'), bindings.arrow]
      )
    const host = mountPopup({ props: { placement: 'bottomLeft', renderBody, arrow: true, arrowClass: 'custom-arrow' } })
    wrapper = host.wrapper
    await flush()

    const panel = document.querySelector('.custom-panel') as HTMLElement
    expect(panel).not.toBeNull()
    // 默认面板与逃生舱互斥：只存在使用者渲染的那一个
    expect(document.querySelectorAll('.va-popup-panel')).toHaveLength(1)
    expect(panel.classList.contains('va-popup-panel')).toBe(true)
    // 使用者按契约落下的绑定：方向类 / 定位样式 / 层级
    expect(panel.classList.contains('va-popup-placement-bottomLeft')).toBe(true)
    expect(panel.style.left).toBe('400px')
    expect(Number(panel.style.zIndex)).toBe(1070)
    // 箭头节点由宿主按 arrow / arrowClass 生成，交由使用者放入面板内
    expect(panel.querySelector('.custom-arrow')).not.toBeNull()

    // 显隐仍由宿主控制（v-show），且元素不卸载
    await hide(host, panel)
    expect(document.querySelector('.custom-panel')).toBe(panel)
    expect(panel.style.display).toBe('none')
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

  it('renderBody 逃生舱的面板同样被卸载与重建，重建后绑定与挂载点标记齐全', async () => {
    const renderBody = (bindings: PopupBodyBindings) =>
      h('div', { class: [bindings.class, 'custom-panel'], ref: bindings.setPanelRef, style: bindings.style }, [
        h('div', { class: 'custom-content' }, 'content'),
        bindings.arrow
      ])
    const host = mountPopup({
      props: { destroyOnHide: true, placement: 'bottomLeft', renderBody, arrow: true, arrowClass: 'custom-arrow' }
    })
    wrapper = host.wrapper
    await flush()

    const firstPanel = document.querySelector('.custom-panel') as HTMLElement
    expect(firstPanel.getAttribute('data-va-floating-mount')).toBe('')

    await hide(host, firstPanel)
    expect(document.querySelector('.custom-panel')).toBeNull()
    expect(queryContainer()).toBeNull()

    host.show.value = true
    await flush()
    const secondPanel = document.querySelector('.custom-panel') as HTMLElement
    expect(secondPanel).not.toBe(firstPanel)
    // 使用者按契约落下的绑定 + 宿主补挂的挂载点标记，在重建后同样齐全
    expect(secondPanel.classList.contains('va-popup-placement-bottomLeft')).toBe(true)
    expect(secondPanel.style.left).toBe('400px')
    expect(Number(secondPanel.style.zIndex)).toBe(1070)
    expect(secondPanel.getAttribute('data-va-floating-mount')).toBe('')
    expect(secondPanel.querySelector('.custom-arrow')).not.toBeNull()
  })
})
