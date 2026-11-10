import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from 'components/avatar/Avatar.vue'

/**
 * Avatar 的链接语义
 *
 * `target` 的契约是「`href` 存在时生效」：没有 `href` 时根节点渲染为 `div`，
 * 此时不应再下发 `target`（`div` 上的 `target` 属无效属性）。历史实现无条件绑定，
 * 会让无链接的头像带上 `target="_self"`。
 */

describe('Avatar 的 target 只随 href 下发', () => {
  it('无 href 时根节点为 div 且不带 target', () => {
    const wrapper = mount(Avatar, { props: { src: 'a.png', target: '_blank' } })
    const root = wrapper.find('.avatar-wrap')
    expect(root.element.tagName).toBe('DIV')
    expect(root.attributes('target')).toBeUndefined()
    wrapper.unmount()
  })

  it('有 href 时根节点为 a，target 按传入值下发', () => {
    const wrapper = mount(Avatar, { props: { src: 'a.png', href: 'https://example.com', target: '_blank' } })
    const root = wrapper.find('.avatar-wrap')
    expect(root.element.tagName).toBe('A')
    expect(root.attributes('target')).toBe('_blank')
    wrapper.unmount()
  })

  it('有 href 且未传 target 时回落为 _self', () => {
    const wrapper = mount(Avatar, { props: { src: 'a.png', href: 'https://example.com' } })
    const root = wrapper.find('.avatar-wrap')
    expect(root.attributes('href')).toBe('https://example.com')
    expect(root.attributes('target')).toBe('_self')
    wrapper.unmount()
  })
})
