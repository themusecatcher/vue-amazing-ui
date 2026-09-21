import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Avatar from 'components/avatar'
import Row from 'components/grid/row'
import Col from 'components/grid/col'

/**
 * 视口宽度响应式回归守护（Avatar / Row / Col）
 *
 * 本轮把三个组件各自的 `viewportWidth` 实现（初始值 SSR 判断 + resize 监听）
 * 收敛为 `useWindowWidth()`。这三个组件的响应式能力全靠它驱动：
 * 接线若断，断点切换会静默失效（样式停留在初始断点），故按「初始断点 + resize 后切换」逐一锁定。
 */

function setWindowWidth(width: number): void {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true })
}

async function resizeTo(width: number): Promise<void> {
  setWindowWidth(width)
  window.dispatchEvent(new Event('resize'))
  await nextTick()
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

describe('Col - 栅格断点随视口宽度切换', () => {
  it('视口处于 md 断点时应采用 md 配置', () => {
    setWindowWidth(1000)
    wrapper = mount(Col, { props: { xs: 24, md: 12 } })
    expect(wrapper.classes()).toContain('col-12')
  })

  it('resize 跌破 md 断点后应回落到 xs 配置', async () => {
    setWindowWidth(1000)
    wrapper = mount(Col, { props: { xs: 24, md: 12 } })
    expect(wrapper.classes()).toContain('col-12')

    await resizeTo(500)
    expect(wrapper.classes()).toContain('col-24')
  })

  it('断点优先级：宽视口优先命中更大的断点', async () => {
    setWindowWidth(1000)
    wrapper = mount(Col, { props: { xs: 24, md: 12, xl: 6 } })
    expect(wrapper.classes()).toContain('col-12')

    await resizeTo(1300)
    expect(wrapper.classes()).toContain('col-6')
  })

  it('对象形态断点可同时切换 span 与 offset', async () => {
    setWindowWidth(1000)
    wrapper = mount(Col, { props: { xs: 24, md: { span: 12, offset: 4 } } })
    expect(wrapper.classes()).toContain('col-12')
    expect(wrapper.classes()).toContain('offset-4')

    await resizeTo(500)
    expect(wrapper.classes()).toContain('col-24')
  })
})

describe('Row - gutter 响应式配置随视口宽度切换', () => {
  it('resize 后 --xGap 应切换为对应断点的间距', async () => {
    setWindowWidth(1000)
    wrapper = mount(Row, { props: { gutter: { xs: 8, md: 24 } } })
    // 模板写入的是 xGap / 2
    expect(wrapper.attributes('style')).toContain('--xGap: 12px')

    await resizeTo(500)
    expect(wrapper.attributes('style')).toContain('--xGap: 4px')
  })
})

describe('Avatar - 响应式 size 随视口宽度切换', () => {
  it('resize 后头像尺寸应切换为对应断点的值', async () => {
    setWindowWidth(1000)
    wrapper = mount(Avatar, { props: { size: { xs: 24, md: 48 }, color: '#1677ff' } })
    expect((wrapper.element as HTMLElement).style.width).toBe('48px')

    await resizeTo(500)
    expect((wrapper.element as HTMLElement).style.width).toBe('24px')
  })
})

describe('视口宽度监听随组件卸载释放', () => {
  it('卸载后 resize 不应再改动已卸载组件的断点结果', async () => {
    setWindowWidth(1000)
    wrapper = mount(Col, { props: { xs: 24, md: 12 } })
    expect(wrapper.classes()).toContain('col-12')

    wrapper.unmount()
    const detached = wrapper
    await resizeTo(500)
    // 组件已卸载，DOM 未再被驱动：仍停留在卸载时的断点
    expect(detached.classes()).toContain('col-12')
  })
})
