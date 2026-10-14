import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { lockScroll } from 'components/utils/dom'

/**
 * lockScroll 通过模块级引用计数控制锁定，与 Modal / Dialog / Drawer 等多个入口共享。
 * 用例均成对调用 lockScroll 与其释放函数，确保计数在每条用例后归零，避免相互干扰。
 *
 * 注意：本文件用 mock 模拟「几何读数」，只能覆盖判据分支与样式写入逻辑；
 * 「哪些真实浏览器 / 宿主配置会保住槽位」属引擎行为，需按工具函数文档中的真机矩阵验证。
 */
const html = document.documentElement
const body = document.body
const VIEWPORT_WIDTH = 1200
const VIEWPORT_HEIGHT = 800
const SCROLLBAR_WIDTH = 15
const SCROLLBAR_WIDTH_VAR = '--va-scrollbar-width'
const SCROLLBAR_SLOT_WIDTH_VAR = '--va-scrollbar-slot-width'

// 窗口尺寸由用例模拟（占位滚动条 / 横向滚动条只在存在时才影响几何读数）
const innerWidthDescriptor = Object.getOwnPropertyDescriptor(window, 'innerWidth')
const innerHeightDescriptor = Object.getOwnPropertyDescriptor(window, 'innerHeight')

function resetStyles(): void {
  html.style.overflowX = ''
  html.style.overflowY = ''
  html.style.scrollbarGutter = ''
  html.style.removeProperty(SCROLLBAR_WIDTH_VAR)
  html.style.removeProperty(SCROLLBAR_SLOT_WIDTH_VAR)
  body.style.overflowX = ''
  body.style.overflowY = ''
  body.style.paddingRight = ''
}

/**
 * 模拟视口尺寸：隐藏滚动条前布局视口比视口窄 SCROLLBAR_WIDTH（占位滚动条在布局中占宽），
 * 隐藏后是否恢复取决于 gutterKept（浏览器是否真的保留了滚动条槽位）；
 * horizontalScrollbar 为「页面本来就有横向滚动条」时它占用的布局高度。
 *
 * 这里必须 mock `getBoundingClientRect` 而不是 `clientWidth`：真实浏览器在槽位保留生效时，
 * `documentElement.clientWidth` 会把预留的槽位算进 padding edge（实测占位 15px 时读数由 1185
 * 变为 1200，与槽位未保留时完全相同），据 `window.innerWidth - clientWidth` 判断会把
 * 「槽位已保留」误判为「槽位未保留」，导致槽位分支成为永不生效的死代码。
 * `clientHeight` 用于判断横向滚动条是否占位：scrollbar-gutter 只保留 inline 轴槽位，不影响该读数。
 */
function mockLayoutViewport(
  options: { scrollbarWidth?: number; gutterKept?: boolean; horizontalScrollbar?: number } = {}
): void {
  const { scrollbarWidth = SCROLLBAR_WIDTH, gutterKept = true, horizontalScrollbar = 0 } = options
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: VIEWPORT_WIDTH })
  Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: VIEWPORT_HEIGHT })
  Object.defineProperty(html, 'clientHeight', {
    configurable: true,
    get: () => VIEWPORT_HEIGHT - horizontalScrollbar
  })
  Object.defineProperty(html, 'getBoundingClientRect', {
    configurable: true,
    value: () => {
      const scrollbarHidden = html.style.overflowY === 'hidden'
      const gutterReserved = gutterKept && html.style.scrollbarGutter !== ''
      const width = scrollbarHidden && !gutterReserved ? VIEWPORT_WIDTH : VIEWPORT_WIDTH - scrollbarWidth
      return { width } as unknown as DOMRect
    }
  })
}

function restoreViewport(): void {
  Reflect.deleteProperty(html, 'getBoundingClientRect')
  Reflect.deleteProperty(html, 'clientHeight')
  if (innerWidthDescriptor) {
    Object.defineProperty(window, 'innerWidth', innerWidthDescriptor)
  } else {
    Reflect.deleteProperty(window, 'innerWidth')
  }
  if (innerHeightDescriptor) {
    Object.defineProperty(window, 'innerHeight', innerHeightDescriptor)
  } else {
    Reflect.deleteProperty(window, 'innerHeight')
  }
}

beforeEach(resetStyles)
afterEach(() => {
  restoreViewport()
  resetStyles()
})

describe('lockScroll 页面滚动锁', () => {
  it('首次调用应锁定滚动，释放后还原', () => {
    mockLayoutViewport()

    const release = lockScroll()
    expect(html.style.overflowY).toBe('hidden')
    expect(body.style.overflowY).toBe('hidden')

    release()
    expect(html.style.overflowY).toBe('')
    expect(body.style.overflowY).toBe('')
  })

  it('多入口并存时，部分释放不应还原，全部释放后才还原', () => {
    mockLayoutViewport()

    const releaseA = lockScroll()
    const releaseB = lockScroll()

    releaseA()
    expect(body.style.overflowY).toBe('hidden')

    releaseB()
    expect(body.style.overflowY).toBe('')
  })

  it('释放函数应幂等，重复调用不影响其它入口持有的锁', () => {
    mockLayoutViewport()

    const releaseA = lockScroll()
    const releaseB = lockScroll()

    releaseA()
    releaseA()
    expect(body.style.overflowY).toBe('hidden')

    releaseB()
    expect(body.style.overflowY).toBe('')
  })

  it('释放后应精确还原调用方预设的内联样式', () => {
    mockLayoutViewport({ gutterKept: false })
    html.style.overflowX = 'auto'
    body.style.overflowX = 'auto'
    body.style.overflowY = 'auto'
    body.style.paddingRight = '12px'
    html.style.scrollbarGutter = 'auto'

    const release = lockScroll()
    expect(body.style.overflowY).toBe('hidden')

    release()
    expect(body.style.overflowY).toBe('auto')
    expect(body.style.paddingRight).toBe('12px')
    expect(html.style.scrollbarGutter).toBe('auto')
    expect(html.style.overflowX).toBe('auto')
    expect(body.style.overflowX).toBe('auto')
  })
})

describe('lockScroll 滚动条槽位与补偿', () => {
  it('槽位保留生效时：保留槽位，且不写任何 padding 补偿', () => {
    mockLayoutViewport({ gutterKept: true })

    const release = lockScroll()
    expect(html.style.scrollbarGutter).toBe('stable')
    expect(body.style.paddingRight).toBe('')

    release()
    expect(html.style.scrollbarGutter).toBe('')
  })

  it('槽位未保留时：清掉临时槽位并等量补偿到 body', () => {
    mockLayoutViewport({ gutterKept: false })

    const release = lockScroll()
    // 槽位未保住：不再保留临时的 scrollbar-gutter，避免给宿主留下无用声明
    expect(html.style.scrollbarGutter).toBe('')
    expect(body.style.paddingRight).toBe(`${SCROLLBAR_WIDTH}px`)

    release()
    expect(body.style.paddingRight).toBe('')
  })

  it('宿主已声明 both-edges 时不覆盖其槽位声明，也不做补偿', () => {
    mockLayoutViewport({ gutterKept: true })
    html.style.scrollbarGutter = 'stable both-edges'

    const release = lockScroll()
    expect(html.style.scrollbarGutter).toBe('stable both-edges')
    expect(body.style.paddingRight).toBe('')

    release()
    expect(html.style.scrollbarGutter).toBe('stable both-edges')
  })

  it('补偿应叠加在宿主已有的 padding-right 之上，而不是覆盖它', () => {
    mockLayoutViewport({ gutterKept: false })
    body.style.paddingRight = '20px'

    const release = lockScroll()
    expect(body.style.paddingRight).toBe(`${20 + SCROLLBAR_WIDTH}px`)

    release()
    expect(body.style.paddingRight).toBe('20px')
  })

  it('无占位滚动条（overlay 滚动条）时不做任何补偿', () => {
    mockLayoutViewport({ scrollbarWidth: 0 })

    const release = lockScroll()
    expect(html.style.scrollbarGutter).toBe('')
    expect(body.style.paddingRight).toBe('')

    release()
  })

  it('锁定前后布局宽度只差亚像素（取整后 1px）时不应触发补偿', () => {
    mockLayoutViewport({ scrollbarWidth: 0.6, gutterKept: false })

    const release = lockScroll()
    expect(html.style.scrollbarGutter).toBe('')
    expect(body.style.paddingRight).toBe('')

    release()
  })
})

describe('lockScroll 宽度变量（供浮层补偿与遮罩扩展消费）', () => {
  it('槽位保住时：补偿量为 0，槽位带宽度等于滚动条宽度', () => {
    mockLayoutViewport({ gutterKept: true })

    const release = lockScroll()
    expect(html.style.getPropertyValue(SCROLLBAR_WIDTH_VAR)).toBe('0px')
    expect(html.style.getPropertyValue(SCROLLBAR_SLOT_WIDTH_VAR)).toBe(`${SCROLLBAR_WIDTH}px`)

    release()
  })

  it('槽位未保住时：补偿量等于被腾出的宽度，槽位带宽度为 0', () => {
    mockLayoutViewport({ gutterKept: false })

    const release = lockScroll()
    expect(html.style.getPropertyValue(SCROLLBAR_WIDTH_VAR)).toBe(`${SCROLLBAR_WIDTH}px`)
    expect(html.style.getPropertyValue(SCROLLBAR_SLOT_WIDTH_VAR)).toBe('0px')

    release()
  })

  it('无占位滚动条时：两个变量仍写入 0px，锁定期间恒有值', () => {
    mockLayoutViewport({ scrollbarWidth: 0 })

    const release = lockScroll()
    expect(html.style.getPropertyValue(SCROLLBAR_WIDTH_VAR)).toBe('0px')
    expect(html.style.getPropertyValue(SCROLLBAR_SLOT_WIDTH_VAR)).toBe('0px')

    release()
  })

  it('释放后应还原宿主预设的变量值', () => {
    mockLayoutViewport({ gutterKept: false })
    html.style.setProperty(SCROLLBAR_WIDTH_VAR, '8px')
    html.style.setProperty(SCROLLBAR_SLOT_WIDTH_VAR, '4px')

    const release = lockScroll()
    expect(html.style.getPropertyValue(SCROLLBAR_WIDTH_VAR)).toBe(`${SCROLLBAR_WIDTH}px`)
    expect(html.style.getPropertyValue(SCROLLBAR_SLOT_WIDTH_VAR)).toBe('0px')

    release()
    expect(html.style.getPropertyValue(SCROLLBAR_WIDTH_VAR)).toBe('8px')
    expect(html.style.getPropertyValue(SCROLLBAR_SLOT_WIDTH_VAR)).toBe('4px')
  })

  it('宿主原本未声明变量时，释放后应把两个变量移除', () => {
    mockLayoutViewport({ gutterKept: false })

    const release = lockScroll()
    expect(html.style.getPropertyValue(SCROLLBAR_WIDTH_VAR)).toBe(`${SCROLLBAR_WIDTH}px`)
    expect(html.style.getPropertyValue(SCROLLBAR_SLOT_WIDTH_VAR)).toBe('0px')

    release()
    expect(html.style.getPropertyValue(SCROLLBAR_WIDTH_VAR)).toBe('')
    expect(html.style.getPropertyValue(SCROLLBAR_SLOT_WIDTH_VAR)).toBe('')
  })
})

describe('lockScroll 横向轴锁定', () => {
  it('无横向滚动条时一并锁定横向轴，释放后还原', () => {
    mockLayoutViewport()

    const release = lockScroll()
    // 只隐藏垂直滚动条会让 overflow-x 的 visible 计算为 auto，页面仍可横向推移
    expect(html.style.overflowX).toBe('hidden')
    expect(body.style.overflowX).toBe('hidden')

    release()
    expect(html.style.overflowX).toBe('')
    expect(body.style.overflowX).toBe('')
  })

  it('页面本来就有横向滚动条时不锁定横向轴，避免移除占位抬高布局视口', () => {
    mockLayoutViewport({ horizontalScrollbar: SCROLLBAR_WIDTH })

    const release = lockScroll()
    expect(html.style.overflowX).toBe('')
    expect(body.style.overflowX).toBe('')

    release()
  })

  it('宿主预设的 overflow-x 应在释放后原样还原', () => {
    mockLayoutViewport()
    html.style.overflowX = 'scroll'

    const release = lockScroll()
    expect(html.style.overflowX).toBe('hidden')

    release()
    expect(html.style.overflowX).toBe('scroll')
  })
})
