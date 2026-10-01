import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { lockScroll } from 'components/utils/dom'

/**
 * lockScroll 通过模块级引用计数控制锁定，与 Modal / Dialog / Drawer 等多个入口共享。
 * 用例均成对调用 lockScroll 与其释放函数，确保计数在每条用例后归零，避免相互干扰。
 */
const html = document.documentElement
const body = document.body

function resetStyles(): void {
  html.style.overflowY = ''
  html.style.scrollbarGutter = ''
  body.style.overflowY = ''
  body.style.paddingRight = ''
}

// 窗口自身可能未定义 innerWidth（由原型提供），还原时需据此选择恢复描述符或删除自身属性
const innerWidthDescriptor = Object.getOwnPropertyDescriptor(window, 'innerWidth')
const VIEWPORT_WIDTH = 1200
const SCROLLBAR_WIDTH = 17

/**
 * 模拟「视口存在经典滚动条」：window.innerWidth 恒为 1200，documentElement.clientWidth
 * 在滚动条隐藏前为 1200 - 17；隐藏后由 gutterKept 决定滚动条槽位是否仍占位。
 */
function mockScrollbarViewport(gutterKept: boolean): void {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: VIEWPORT_WIDTH })
  Object.defineProperty(html, 'clientWidth', {
    configurable: true,
    get: () => {
      // 未隐藏滚动条时槽位必然占位；隐藏后取决于浏览器是否保留槽位
      if (html.style.overflowY !== 'hidden' || gutterKept) {
        return VIEWPORT_WIDTH - SCROLLBAR_WIDTH
      }
      return VIEWPORT_WIDTH
    }
  })
}

function restoreViewport(): void {
  if (innerWidthDescriptor) {
    Object.defineProperty(window, 'innerWidth', innerWidthDescriptor)
  } else {
    Reflect.deleteProperty(window, 'innerWidth')
  }
  Reflect.deleteProperty(html, 'clientWidth')
}

beforeEach(resetStyles)
afterEach(() => {
  restoreViewport()
  resetStyles()
})

describe('lockScroll 页面滚动锁', () => {
  it('首次调用应锁定滚动，释放后还原', () => {
    const release = lockScroll()
    expect(html.style.overflowY).toBe('hidden')
    expect(body.style.overflowY).toBe('hidden')

    release()
    expect(html.style.overflowY).toBe('')
    expect(body.style.overflowY).toBe('')
  })

  it('多入口并存时，部分释放不应还原，全部释放后才还原', () => {
    const releaseA = lockScroll()
    const releaseB = lockScroll()

    releaseA()
    expect(body.style.overflowY).toBe('hidden')

    releaseB()
    expect(body.style.overflowY).toBe('')
  })

  it('释放函数应幂等，重复调用不影响其它入口持有的锁', () => {
    const releaseA = lockScroll()
    const releaseB = lockScroll()

    releaseA()
    releaseA()
    expect(body.style.overflowY).toBe('hidden')

    releaseB()
    expect(body.style.overflowY).toBe('')
  })

  it('释放后应精确还原调用方预设的内联样式', () => {
    body.style.overflowY = 'auto'
    body.style.paddingRight = '12px'

    const release = lockScroll()
    expect(body.style.overflowY).toBe('hidden')

    release()
    expect(body.style.overflowY).toBe('auto')
    expect(body.style.paddingRight).toBe('12px')
  })
})

describe('lockScroll 滚动条槽位保留', () => {
  it('应保留槽位且不再补偿 padding，避免视口变宽导致 fixed 浮层位移', () => {
    mockScrollbarViewport(true)

    const release = lockScroll()
    expect(html.style.scrollbarGutter).toBe('stable')
    expect(body.style.paddingRight).toBe('')

    release()
    expect(html.style.scrollbarGutter).toBe('')
  })

  it('槽位未被保留时，应回退为 body 的 padding-right 补偿', () => {
    mockScrollbarViewport(false)

    const release = lockScroll()
    expect(html.style.scrollbarGutter).toBe('')
    expect(body.style.paddingRight).toBe(`${SCROLLBAR_WIDTH}px`)

    release()
    expect(body.style.paddingRight).toBe('')
  })

  it('释放后应精确还原调用方预设的 scrollbar-gutter 与 padding-right', () => {
    html.style.scrollbarGutter = 'auto'
    body.style.paddingRight = '8px'
    mockScrollbarViewport(false)

    const release = lockScroll()
    expect(html.style.scrollbarGutter).toBe('')
    expect(body.style.paddingRight).toBe(`${SCROLLBAR_WIDTH}px`)

    release()
    expect(html.style.scrollbarGutter).toBe('auto')
    expect(body.style.paddingRight).toBe('8px')
  })

  it('无经典滚动条时，既不设置槽位也不补偿 padding', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: VIEWPORT_WIDTH })
    Object.defineProperty(html, 'clientWidth', { configurable: true, get: () => VIEWPORT_WIDTH })

    const release = lockScroll()
    expect(html.style.scrollbarGutter).toBe('')
    expect(body.style.paddingRight).toBe('')

    release()
  })
})
