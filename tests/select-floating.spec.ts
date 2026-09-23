import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'

/**
 * Select 走 L1 旁路接入定位内核后的契约回归
 *
 * 迁移前定位由组件自己算（旧测量骨架 + 自研 `findPlace` + 手拼 top / bottom / left / width），
 * 迁移后全部由 `useFloating` 输出。此处锁定的是**不可无声回归**的四件事：
 * - **两层 DOM**：面板被定位参照容器包住（容器实时矩形即面板坐标原点），Teleport 与 `to: false`
 *   就地渲染共用同一套求解（旧实现靠「向上找最近非 static 祖先」实现同一目的）；
 * - **主轴几何**：面板紧贴锚点外侧 4px；空间不足时同轴翻转 bottomLeft ↔ topLeft，且主轴为 top 时
 *   由内核输出 `translate: 0 -100%`（位移走独立属性 translate，旧实现用 `bottom` 表达）；
 * - **尺寸关系**：面板等宽触发器（`width` 与 `minWidth` 同值，旧实现亦如此）；
 * - **层级**：仍取 `useZIndex` 的回退值 1050。
 *
 * 注：@vue/test-utils 默认 stub `Transition`，会使面板不渲染真实元素，故显式关闭（与 tests/popup.spec.ts 一致）。
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

/** 视口桩矩形：未登记元素（含内核惰性创建的视口测量元素、定位参照容器）统一返回它 */
const viewportRect = domRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
/** 触发器桩矩形：按用例改动后再挂载，以影响求解 */
let anchorRect = domRect(400, 300, 100, 40)
/** 面板桩**布局**尺寸（内核按 offsetWidth / offsetHeight 测量浮层；等宽由内核写入 style 后再测量） */
const panelSize = { width: 100, height: 80 }

/** 等待「打开 → 渲染 → 内核 post flush 落位」 */
async function flush(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  await nextTick()
}

const queryWrapperEl = (): HTMLElement | null => document.querySelector('.select-panel-wrapper')
const queryPanel = (): HTMLElement | null => document.querySelector('.select-panel-container')

let wrapper: ReturnType<typeof mount> | null = null
let originalGetBoundingClientRect: typeof HTMLElement.prototype.getBoundingClientRect
let originalOffsetWidth: PropertyDescriptor | undefined
let originalOffsetHeight: PropertyDescriptor | undefined

beforeEach(() => {
  anchorRect = domRect(400, 300, 100, 40)
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
  document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
  HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect
  if (originalOffsetWidth) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
  }
  if (originalOffsetHeight) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
  }
})

/** 挂载并打开面板 */
async function mountAndOpen(props: Record<string, unknown> = {}): Promise<void> {
  wrapper = mount(Select, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    props: {
      options: [
        { label: 'apple', value: 1 },
        { label: 'banana', value: 2 }
      ],
      ...props
    }
  })
  await flush()
  // 首帧优化：未打开前不渲染任何浮层 DOM
  expect(queryWrapperEl()).toBeNull()
  await wrapper.find('.select-wrap').trigger('click')
  await flush()
}

describe('Select 定位内核接入（L1 旁路）', () => {
  it('面板被定位参照容器包住，容器实时矩形即坐标原点', async () => {
    await mountAndOpen()
    const container = queryWrapperEl() as HTMLElement
    const panel = queryPanel() as HTMLElement
    expect(container).not.toBeNull()
    expect(container.contains(panel)).toBe(true)
    // Teleport 到 body（默认 to）
    expect(wrapper?.element.contains(container)).toBe(false)
  })

  it('to 为 false 时就地渲染，仍在定位参照容器内', async () => {
    await mountAndOpen({ to: false })
    const container = queryWrapperEl() as HTMLElement
    expect(wrapper?.element.contains(container)).toBe(true)
    expect(container.contains(queryPanel() as Node)).toBe(true)
  })

  it('默认 bottom：面板顶边贴锚点下边缘外 4px，左对齐，且等宽触发器', async () => {
    await mountAndOpen()
    const panel = queryPanel() as HTMLElement
    // 锚点 top 300 + height 40 + 主轴间距 4
    expect(panel.style.top).toBe('344px')
    // bottomLeft（start 对齐）→ 面板左边贴锚点左边，无需水平位移
    expect(panel.style.left).toBe('400px')
    expect(panel.style.translate).toBe('')
    // 等宽触发器：width 与 minWidth 同值（内核 matchTriggerWidth: 'width'）
    expect(panel.style.width).toBe('100px')
    expect(panel.style.minWidth).toBe('100px')
    // 层级取 useZIndex 回退值
    expect(Number(panel.style.zIndex)).toBe(1050)
  })

  it('下方空间不足时同轴翻转为 top：主轴位移由内核的 translate 承担', async () => {
    // 锚点贴近视口底部：下方仅剩 20px，放不下 80px 高的面板 → 翻转到上方
    anchorRect = domRect(400, 540, 100, 40)
    await mountAndOpen()
    const panel = queryPanel() as HTMLElement
    // 翻转后仍是 start 对齐（同轴翻转保留次轴后缀）
    expect(panel.style.left).toBe('400px')
    // 顶边 = 锚点 top 540 - 主轴间距 4，再由 translate 的 -100% 上移到锚点上方
    expect(panel.style.top).toBe('536px')
    expect(panel.style.translate).toBe('0 -100%')
  })

  it('placement 为 topLeft 时向上展开', async () => {
    await mountAndOpen({ placement: 'topLeft' })
    const panel = queryPanel() as HTMLElement
    expect(panel.style.top).toBe('296px')
    expect(panel.style.translate).toBe('0 -100%')
  })

  it('flip 关闭时不翻转，仍按期望方向渲染', async () => {
    anchorRect = domRect(400, 540, 100, 40)
    await mountAndOpen({ flip: false })
    const panel = queryPanel() as HTMLElement
    // 期望方向仍是 bottom：不翻转 → 面板顶边在锚点下方（会溢出视口，由使用方决定）
    expect(panel.style.top).toBe('584px')
    expect(panel.style.translate).toBe('')
  })
})

describe('Select 面板的公开覆盖入口（popupClassName / dropdownMenuStyle / zIndex）', () => {
  /**
   * 面板多了一层定位参照容器（`.select-panel-wrapper`）后，`body > .xxx` / 直接子代选择器等
   * DOM 结构依赖会失效，故面板样式必须提供公开入口。
   */
  it('popupClassName 落在面板根元素上，且不覆盖组件自有类名', async () => {
    await mountAndOpen({ popupClassName: 'my-panel' })
    const panel = queryPanel() as HTMLElement
    expect(panel.classList.contains('my-panel')).toBe(true)
    expect(panel.classList.contains('select-panel-container')).toBe(true)
  })

  it('dropdownMenuStyle 在内核定位之后合并，可覆盖定位', async () => {
    await mountAndOpen({ dropdownMenuStyle: { top: '999px', borderRadius: '2px' } })
    const panel = queryPanel() as HTMLElement
    expect(panel.style.top).toBe('999px')
    expect(panel.style.borderRadius).toBe('2px')
    // 层级仍由组件接管（不因自定义样式而丢失）
    expect(Number(panel.style.zIndex)).toBe(1050)
  })

  it('zIndex 优先于默认层级', async () => {
    await mountAndOpen({ zIndex: 3000 })
    expect(Number((queryPanel() as HTMLElement).style.zIndex)).toBe(3000)
  })
})
