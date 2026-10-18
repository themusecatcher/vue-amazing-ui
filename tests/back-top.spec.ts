import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BackTop from 'components/back-top'

/**
 * BackTop 监听目标解析回归守护
 *
 * 背景：`listenTo` 的字符串参数此前按**标签名**解析（`document.getElementsByTagName`），
 * 与 `to`（走 CSS 选择器）语义不一致 —— 传类选择器（如 `.scroll-container`）会静默失效，
 * 既不显示按钮也不报错。现统一为按 CSS 选择器解析；标签名（如 `'body'`）本身也是合法选择器，
 * 历史写法不受影响。
 *
 * 断言口径：只校验「scroll 监听最终注册在哪个元素上」，不依赖事件派发机制，
 * 因此在 happy-dom 下稳定，可直接锁住解析结果这一根因。
 */

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('BackTop 的 listenTo 解析', () => {
  it('字符串按 CSS 选择器解析，可命中类选择器容器', () => {
    const container = document.createElement('div')
    container.className = 'scroll-container'
    document.body.appendChild(container)
    const addSpy = vi.spyOn(container, 'addEventListener')

    wrapper = mount(BackTop, { props: { listenTo: '.scroll-container' } })

    expect(addSpy.mock.calls.some((call) => call[0] === 'scroll')).toBe(true)
  })

  it("字符串 'body' 仍可命中（标签名同时是合法选择器）", () => {
    const addSpy = vi.spyOn(document.body, 'addEventListener')

    wrapper = mount(BackTop, { props: { listenTo: 'body' } })

    expect(addSpy.mock.calls.some((call) => call[0] === 'scroll')).toBe(true)
  })

  it('选择器匹配不到时只告警、不抛错', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(() => {
      wrapper = mount(BackTop, { props: { listenTo: '.not-exist' } })
    }).not.toThrow()

    expect(warn).toHaveBeenCalledWith('[vue-amazing-ui] BackTop: 未找到容器元素，滚动监听未启用')
  })

  it('非法选择器按「找不到目标」处理，不抛错', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(() => {
      wrapper = mount(BackTop, { props: { listenTo: '.[' } })
    }).not.toThrow()

    expect(warn).toHaveBeenCalledWith('[vue-amazing-ui] BackTop: 未找到容器元素，滚动监听未启用')
  })

  it('未传 listenTo 时命中最近的可滚动祖先（内联 overflow: auto）', () => {
    const outer = document.createElement('div')
    outer.style.overflow = 'auto'
    const host = document.createElement('div')
    outer.appendChild(host)
    document.body.appendChild(outer)
    const addSpy = vi.spyOn(outer, 'addEventListener')

    wrapper = mount(BackTop, { attachTo: host })

    expect(addSpy.mock.calls.some((call) => call[0] === 'scroll')).toBe(true)
  })

  it('未传 listenTo 且无滚动祖先时回退到 window', () => {
    const winAdd = vi.spyOn(window, 'addEventListener')

    // 必须挂到真实文档中：祖先链走不到 documentElement 时 getScrollParent 会返回 null
    wrapper = mount(BackTop, { attachTo: document.body })

    expect(winAdd.mock.calls.some((call) => call[0] === 'scroll')).toBe(true)
  })
})
