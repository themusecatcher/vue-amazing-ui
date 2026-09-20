import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AutoComplete from 'components/auto-complete/AutoComplete.vue'

/**
 * AutoComplete 走 L1 旁路接入定位内核后的契约回归
 *
 * 迁移前定位由组件自己算（旧测量骨架 + 自研 `findPlace` / `getAlign` + 手拼
 * top / bottom / left / right / width），迁移后全部由 `useFloating` 输出。此处锁定：
 * - **两层 DOM**：面板被定位参照容器包住（容器实时矩形即面板坐标原点）；
 * - **主轴几何**：面板紧贴锚点外侧 4px，空间不足时同轴翻转 bottomLeft ↔ topLeft；
 * - **尺寸关系**：`dropdownMatchSelectWidth` 三态到内核 `matchTriggerWidth` 的映射
 *   （true → width+minWidth、false → 仅 minWidth、number → 固定宽度 + minWidth 兜底）；
 * - **使用者样式优先级**：`dropdownMenuStyle` 仍可覆盖定位，`popupClassName` 仍落在面板上。
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
/** 面板桩**布局**尺寸（内核按 offsetWidth / offsetHeight 测量浮层） */
const panelSize = { width: 100, height: 80 }
const TRIGGER_WIDTH = 100

/** 等待「打开 → 渲染 → 内核 post flush 落位」 */
async function flush(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  await nextTick()
}

const queryWrapperEl = (): HTMLElement | null => document.querySelector('.auto-complete-panel-wrapper')
const queryPanel = (): HTMLElement | null => document.querySelector('.auto-complete-panel')

let wrapper: ReturnType<typeof mount> | null = null
let originalGetBoundingClientRect: typeof HTMLElement.prototype.getBoundingClientRect
let originalOffsetWidth: PropertyDescriptor | undefined
let originalOffsetHeight: PropertyDescriptor | undefined

beforeEach(() => {
  anchorRect = domRect(400, 300, TRIGGER_WIDTH, 40)
  originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect
  HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    if (this.classList?.contains('auto-complete-content')) return anchorRect
    if (this.classList?.contains('auto-complete-panel')) return domRect(0, 0, panelSize.width, panelSize.height)
    return viewportRect
  }
  originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
  originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement): number {
      return this.classList?.contains('auto-complete-panel') ? panelSize.width : 0
    }
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement): number {
      return this.classList?.contains('auto-complete-panel') ? panelSize.height : 0
    }
  })
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.auto-complete-panel-wrapper').forEach((el) => el.remove())
  HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect
  if (originalOffsetWidth) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
  }
  if (originalOffsetHeight) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
  }
})

/** 挂载并展开面板：`defaultOpen` 即非受控初始展开（面板可见性由「有选项」决定，故数据源不可为空） */
async function mountAndOpen(props: Record<string, unknown> = {}): Promise<void> {
  wrapper = mount(AutoComplete, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    props: {
      value: '',
      defaultOpen: true,
      options: [
        { label: 'apple', value: 1 },
        { label: 'banana', value: 2 }
      ],
      ...props
    }
  })
  await flush()
}

describe('AutoComplete 定位内核接入（L1 旁路）', () => {
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

  it('默认 bottom：面板顶边贴锚点下边缘外 4px，左对齐，等宽触发器', async () => {
    await mountAndOpen()
    const panel = queryPanel() as HTMLElement
    expect(panel.style.top).toBe('344px')
    expect(panel.style.left).toBe('400px')
    expect(panel.style.translate).toBe('')
    // dropdownMatchSelectWidth 默认 true → 等宽（width 与 minWidth 同值）
    expect(panel.style.width).toBe(`${TRIGGER_WIDTH}px`)
    expect(panel.style.minWidth).toBe(`${TRIGGER_WIDTH}px`)
    expect(Number(panel.style.zIndex)).toBe(1050)
  })

  it('dropdownMatchSelectWidth 为 false 时宽度自适应内容，仅保留最小等宽', async () => {
    await mountAndOpen({ dropdownMatchSelectWidth: false })
    const panel = queryPanel() as HTMLElement
    expect(panel.style.width).toBe('')
    expect(panel.style.minWidth).toBe(`${TRIGGER_WIDTH}px`)
  })

  it('dropdownMatchSelectWidth 为数字时按该值固定宽度，最小宽仍为触发器宽', async () => {
    await mountAndOpen({ dropdownMatchSelectWidth: 200 })
    const panel = queryPanel() as HTMLElement
    expect(panel.style.width).toBe('200px')
    expect(panel.style.minWidth).toBe(`${TRIGGER_WIDTH}px`)
  })

  it('下方空间不足时同轴翻转为 top：主轴位移由内核的 translate 承担', async () => {
    anchorRect = domRect(400, 540, TRIGGER_WIDTH, 40)
    await mountAndOpen()
    const panel = queryPanel() as HTMLElement
    expect(panel.style.top).toBe('536px')
    expect(panel.style.translate).toBe('0 -100%')
    // 翻转后仍是 start 对齐（同轴翻转保留次轴后缀）
    expect(panel.style.left).toBe('400px')
  })

  it('popupClassName 落在面板上，dropdownMenuStyle 仍可覆盖定位', async () => {
    await mountAndOpen({ popupClassName: 'my-popup', dropdownMenuStyle: { top: '999px' } })
    const panel = queryPanel() as HTMLElement
    expect(panel.classList.contains('my-popup')).toBe(true)
    // 自定义样式在内核输出之后合并（与迁移前一致），层级与主题变量仍由组件接管
    expect(panel.style.top).toBe('999px')
    expect(Number(panel.style.zIndex)).toBe(1050)
  })

  it('zIndex 优先于默认层级（与乙类组件的 zIndex prop 同一优先级契约）', async () => {
    await mountAndOpen({ zIndex: 3000 })
    expect(Number((queryPanel() as HTMLElement).style.zIndex)).toBe(3000)
  })
})
