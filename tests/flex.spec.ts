import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Flex from 'components/flex/Flex.vue'
import Space from 'components/space/Space.vue'

/**
 * Flex / Space 的间距归属与容器属性
 *
 * 覆盖 3.7.2 调整的两处口径：
 * - 间距只由 `gap` 承担，自身不再写入内联 `margin`（外部 `mb10` 等间距类才能生效）；
 * - Flex 新增 `flex`（自身作为 flex 子项的伸缩简写）与 `component`（渲染的标签名或组件）属性。
 */

describe('Flex / Space 只负责排列与间隙，不写入自身 margin', () => {
  it('Flex 任何间距形态都不输出内联 margin，外部间距类可生效', () => {
    const scalar = mount(Flex, { attrs: { class: 'mb10' }, slots: { default: () => 'content' } })
    const scalarEl = scalar.find('.flex-wrap')
    expect(scalarEl.classes()).toContain('mb10')
    expect(scalarEl.attributes('style')).not.toContain('margin')
    scalar.unmount()

    const wrapped = mount(Flex, { props: { gap: [8, 16], wrap: 'wrap' }, slots: { default: () => 'content' } })
    const wrappedEl = wrapped.find('.flex-wrap')
    expect(wrappedEl.attributes('style')).not.toContain('margin')
    expect(wrappedEl.attributes('style')).toContain('gap: 16px 8px')
    wrapped.unmount()
  })

  it('Space 任何间距形态都不输出内联 margin，外部间距类可生效', () => {
    const scalar = mount(Space, { attrs: { class: 'mb10' }, slots: { default: () => 'content' } })
    const scalarEl = scalar.find('.space-wrap')
    expect(scalarEl.classes()).toContain('mb10')
    expect(scalarEl.attributes('style')).not.toContain('margin')
    scalar.unmount()

    const wrapped = mount(Space, { props: { gap: [8, 16] }, slots: { default: () => 'content' } })
    const wrappedEl = wrapped.find('.space-wrap')
    expect(wrappedEl.attributes('style')).not.toContain('margin')
    expect(wrappedEl.attributes('style')).toContain('gap: 16px 8px')
    wrapped.unmount()
  })
})

describe('Flex 的 flex 与 component 属性', () => {
  it('flex 属性输出容器自身的伸缩简写，未传时不输出', () => {
    // jsdom 会把 flex 简写展开为 flex-grow / flex-shrink / flex-basis
    const grow = mount(Flex, { props: { flex: 1 }, slots: { default: () => 'content' } })
    expect(grow.find('.flex-wrap').attributes('style')).toContain('flex-grow: 1')
    grow.unmount()

    const shorthand = mount(Flex, { props: { flex: '0 0 auto' }, slots: { default: () => 'content' } })
    const shorthandStyle = shorthand.find('.flex-wrap').attributes('style') ?? ''
    expect(shorthandStyle).toContain('flex-shrink: 0')
    expect(shorthandStyle).toContain('flex-basis: auto')
    shorthand.unmount()

    const none = mount(Flex, { slots: { default: () => 'content' } })
    expect(none.find('.flex-wrap').attributes('style')).not.toContain('flex-grow')
    none.unmount()
  })

  it('component 属性决定渲染的标签，默认 div', () => {
    const list = mount(Flex, { props: { component: 'ul' }, slots: { default: () => h('li', 'item') } })
    expect(list.element.tagName).toBe('UL')
    expect(list.element.classList.contains('flex-wrap')).toBe(true)
    list.unmount()

    const defaultTag = mount(Flex, { slots: { default: () => 'content' } })
    expect(defaultTag.element.tagName).toBe('DIV')
    defaultTag.unmount()
  })
})
