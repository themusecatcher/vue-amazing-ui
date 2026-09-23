import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import Comment from 'components/comment/Comment.vue'

/**
 * 回归守护：Comment 组件的「prop / slot 双源合并」与「头像三种形态」
 *
 * 1. 双源合并：avatar / author / datetime / actions 均可由属性或同名插槽提供，
 *    插槽优先（与 Statistic / Divider 一致）；actions 还会把属性值归一化为
 *    「每项一个 <li>」，字符串项额外包一层 <span> 以命中 `> li > span` 的样式。
 * 2. 头像形态：avatar 属性支持「图片地址 / VNode / 渲染函数」三种形态，仅图片地址
 *    渲染为 <img>，其余原样渲染。
 */

describe('Comment 评论组件', () => {
  it('avatar 传图片地址时渲染为 <img>，根类名为 comment-wrap', () => {
    const wrapper = mount(Comment, { props: { avatar: 'https://a.png' } })
    expect(wrapper.classes()).toContain('comment-wrap')
    expect(wrapper.find('.comment-avatar img').attributes('src')).toBe('https://a.png')
    expect(wrapper.find('.comment-avatar img').attributes('alt')).toBe('comment-avatar')
  })

  it('avatar 传 VNode 时原样渲染，不再包一层 <img>', () => {
    const wrapper = mount(Comment, { props: { avatar: h('i', { class: 'avatar-node' }) } })
    expect(wrapper.find('.comment-avatar .avatar-node').exists()).toBe(true)
    expect(wrapper.find('.comment-avatar img').exists()).toBe(false)
  })

  it('avatar 传渲染函数时按其返回值渲染', () => {
    const wrapper = mount(Comment, { props: { avatar: () => h('i', { class: 'avatar-fn' }) } })
    expect(wrapper.find('.comment-avatar .avatar-fn').exists()).toBe(true)
  })

  it('avatar 插槽优先于 avatar 属性', () => {
    const wrapper = mount(Comment, {
      props: { avatar: 'https://a.png' },
      slots: { avatar: () => h('i', { class: 'avatar-slot' }) }
    })
    expect(wrapper.find('.comment-avatar .avatar-slot').exists()).toBe(true)
    expect(wrapper.find('.comment-avatar img').exists()).toBe(false)
  })

  it('属性与插槽均未提供头像时不渲染头像容器', () => {
    const wrapper = mount(Comment, { props: { content: 'hi' } })
    expect(wrapper.find('.comment-avatar').exists()).toBe(false)
  })

  it('actions 传数组时每项渲染为一个 <li>：字符串项包 <span>，VNode 项原样渲染', () => {
    const wrapper = mount(Comment, { props: { actions: ['Reply', h('i', { class: 'act-node' })] } })
    const items = wrapper.findAll('.comment-actions > li')
    expect(items.length).toBe(2)
    expect(items[0].find('span').text()).toBe('Reply')
    expect(items[1].find('.act-node').exists()).toBe(true)
  })

  it('actions 传空数组时不渲染操作区', () => {
    const wrapper = mount(Comment, { props: { actions: [] } })
    expect(wrapper.find('.comment-actions').exists()).toBe(false)
  })

  it('actions 插槽优先于 actions 属性，且按每项一个 <li> 渲染', () => {
    const wrapper = mount(Comment, {
      props: { actions: ['from-prop'] },
      slots: {
        actions: () => [h('span', { class: 'slot-action-1' }, 'Reply'), h('span', { class: 'slot-action-2' }, 'Quote')]
      }
    })
    expect(wrapper.findAll('.comment-actions > li').length).toBe(2)
    expect(wrapper.find('.slot-action-1').text()).toBe('Reply')
    expect(wrapper.find('.slot-action-2').text()).toBe('Quote')
    expect(wrapper.text()).not.toContain('from-prop')
  })

  it('author / datetime 有值时渲染，为空时不渲染对应节点', () => {
    const empty = mount(Comment, { props: { content: 'hi' } })
    expect(empty.find('.comment-content-author-name').exists()).toBe(false)
    expect(empty.find('.comment-content-author-time').exists()).toBe(false)

    const filled = mount(Comment, { props: { author: 'Han Solo', datetime: '2 days ago' } })
    expect(filled.find('.comment-content-author-name').text()).toBe('Han Solo')
    expect(filled.find('.comment-content-author-time').text()).toBe('2 days ago')
  })

  it('content 属性渲染在 comment-content-detail 中，该容器常驻', () => {
    const wrapper = mount(Comment, { props: { content: 'hello' } })
    expect(wrapper.find('.comment-content-detail').text()).toBe('hello')

    const empty = mount(Comment)
    expect(empty.find('.comment-content-detail').exists()).toBe(true)
  })

  it('默认插槽渲染为嵌套评论，未提供时不渲染 comment-nested', () => {
    const nested = mount(Comment, { slots: { default: () => h('div', { class: 'child' }) } })
    expect(nested.find('.comment-nested .child').exists()).toBe(true)

    const plain = mount(Comment, { props: { content: 'hi' } })
    expect(plain.find('.comment-nested').exists()).toBe(false)
  })
})
