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
  body.style.overflowY = ''
  body.style.paddingRight = ''
}

beforeEach(resetStyles)
afterEach(resetStyles)

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
