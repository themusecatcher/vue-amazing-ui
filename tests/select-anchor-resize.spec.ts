import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'

/**
 * 触发器自身尺寸变化后的面板重算（重构文档 §6.3 第 4 条）
 *
 * 定位内核的 `'resize'` 监听只覆盖视口（`window`），**锚点自身长高不会触发重算**。`Select` 因此
 * 额外用 `useResizeObserver(selectContentRef, ...)` 主动重算 —— 典型场景是多选标签逐条增多换行，
 * 触发器由一行变两行，面板若停在旧位置会与触发器互相遮挡。
 *
 * 迁移为 `Popup` 基座后，这一调用从「自持内核实例的 `syncFloating()`」换成「宿主的 `popupRef.sync()`」，
 * 触发时机与「面板关闭时位置不被改动」的行为都应保持不变，故在此单独锁定：
 * - 锚点变高 → 面板顶边按新高度重算（变异验证：抽掉 `sync()` 调用后本条立即红）；
 * - 面板已关闭 → 位置保持关闭前的值。
 *
 * 注：第二条的行为由**宿主** `Popup` 的 `enabled`（`show`）短路保证 —— 抽掉组件侧的
 * `if (panelVisible.value)` 守卫后本条仍然通过，故该守卫属迁移前既有逻辑（迁移不改），
 * 用例守的是「关闭态位置不被改动」这一结果，而非某一处实现。
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

const viewportRect = domRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
/** 触发器桩矩形：用例中改高度以模拟「标签换行使触发器长高」 */
let anchorRect = domRect(400, 300, 100, 40)
/** 面板桩布局尺寸（内核按 offsetWidth / offsetHeight 测量浮层） */
const panelSize = { width: 100, height: 80 }

/** 等待「打开 → 渲染 → 内核 post flush 落位」 */
async function flush(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  await nextTick()
}

const queryPanel = (): HTMLElement | null => document.querySelector('.select-panel-container')

/** 已注册的 ResizeObserver 回调（`useResizeObserver` 会为观察目标各建一个实例） */
let resizeCallbacks: ResizeObserverCallback[] = []
let originalGetBoundingClientRect: typeof HTMLElement.prototype.getBoundingClientRect
let originalOffsetWidth: PropertyDescriptor | undefined
let originalOffsetHeight: PropertyDescriptor | undefined
let wrapper: ReturnType<typeof mount> | null = null

/** 模拟浏览器派发一次尺寸变化（回调内容与用例无关，`useResizeObserver` 不读 entries） */
function emitResize(): void {
  resizeCallbacks.forEach((callback) => callback([], {} as ResizeObserver))
}

beforeEach(() => {
  anchorRect = domRect(400, 300, 100, 40)
  resizeCallbacks = []
  // 测试环境无 ResizeObserver（happy-dom），先补上桩，否则 useResizeObserver 不会建立观察
  vi.stubGlobal(
    'ResizeObserver',
    class ResizeObserverStub {
      constructor(callback: ResizeObserverCallback) {
        resizeCallbacks.push(callback)
      }

      observe(): void {}

      unobserve(): void {}

      disconnect(): void {}
    }
  )
  originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect
  HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    if (this.classList?.contains('select-content-container')) return anchorRect
    if (this.classList?.contains('select-panel-container')) return domRect(0, 0, panelSize.width, panelSize.height)
    return viewportRect
  }
  originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
  originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement): number {
      return this.classList?.contains('select-panel-container') ? panelSize.width : 0
    }
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement): number {
      return this.classList?.contains('select-panel-container') ? panelSize.height : 0
    }
  })
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
  vi.unstubAllGlobals()
  HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect
  if (originalOffsetWidth) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
  }
  if (originalOffsetHeight) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
  }
})

/** 挂载多选 Select 并打开面板（多选是「标签换行导致触发器长高」的真实场景） */
async function mountAndOpen(): Promise<void> {
  wrapper = mount(Select, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    props: {
      multiple: true,
      value: [1, 2],
      options: [
        { label: 'apple', value: 1 },
        { label: 'banana', value: 2 },
        { label: 'cherry', value: 3 }
      ]
    }
  })
  await flush()
  await wrapper.find('.select-wrap').trigger('click')
  await flush()
}

describe('Select 触发器尺寸变化后的面板重算', () => {
  it('锚点观察者已建立（迁移后仍保留 useResizeObserver）', async () => {
    await mountAndOpen()
    expect(resizeCallbacks.length).toBeGreaterThan(0)
  })

  it('触发器长高后按新高度重算面板位置', async () => {
    await mountAndOpen()
    const panel = queryPanel() as HTMLElement
    // 初始：锚点 top 300 + height 40 + 主轴间距 4
    expect(panel.style.top).toBe('344px')

    // 模拟标签换行：触发器高 40 → 80
    anchorRect = domRect(400, 300, 100, 80)
    emitResize()
    await flush()

    // 面板顶边随新高度下移，而不是停在旧位置
    expect(panel.style.top).toBe('384px')
    expect(panel.style.left).toBe('400px')
  })

  it('面板关闭时尺寸变化不触发重算', async () => {
    await mountAndOpen()
    const panel = queryPanel() as HTMLElement
    expect(panel.style.top).toBe('344px')

    // 关闭面板（元素保留，仅 v-show 隐藏）
    await wrapper?.find('.select-wrap').trigger('click')
    await flush()
    expect(panel.style.display).toBe('none')

    anchorRect = domRect(400, 300, 100, 80)
    emitResize()
    await flush()

    // 隐藏态不重算：位置保持关闭前的值
    expect(panel.style.top).toBe('344px')
  })
})
