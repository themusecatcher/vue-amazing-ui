import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createCommentVNode, h, nextTick, ref } from 'vue'
import type { VNode } from 'vue'
import Space from 'components/space/Space.vue'

const item = (label: string) => h('span', { class: 'item' }, label)
const splitNode = () => h('span', { class: 'split' }, '|')

const mountSpace = (children: () => VNode[], split?: () => VNode[], props: Record<string, unknown> = {}) =>
  mount(Space, { props, slots: { default: children, ...(split ? { split } : {}) } })

describe('Space 分隔符（split 插槽）', () => {
  it('无 split 时不插入任何间隔元素', () => {
    const wrapper = mountSpace(() => [item('A'), item('B'), item('C')])
    expect(wrapper.findAll('.item').length).toBe(3)
    expect(wrapper.findAll('.split').length).toBe(0)
    wrapper.unmount()
  })

  it('n 个内容之间插入 n-1 个分隔符，且顺序为 内容-分隔符-内容', () => {
    const wrapper = mountSpace(
      () => [item('A'), item('B'), item('C')],
      () => [splitNode()]
    )
    expect(wrapper.findAll('.item').length).toBe(3)
    expect(wrapper.findAll('.split').length).toBe(2)
    const sequence = Array.from(wrapper.element.children).map((el) =>
      el.classList.contains('split') ? 'split' : el.textContent
    )
    expect(sequence).toEqual(['A', 'split', 'B', 'split', 'C'])
    wrapper.unmount()
  })

  it('内容不足两个时不渲染分隔符', () => {
    const single = mountSpace(
      () => [item('A')],
      () => [splitNode()]
    )
    expect(single.findAll('.split').length).toBe(0)
    single.unmount()

    const empty = mountSpace(
      () => [],
      () => [splitNode()]
    )
    expect(empty.findAll('.split').length).toBe(0)
    empty.unmount()
  })

  it('注释节点与纯空白文本不参与排列，也不额外插入分隔符', () => {
    const wrapper = mountSpace(
      () => [item('A'), createCommentVNode('v-if'), h('span', '   '), item('B')],
      () => [splitNode()]
    )
    expect(wrapper.findAll('.item').length).toBe(2)
    expect(wrapper.findAll('.split').length).toBe(1)
    wrapper.unmount()
  })

  it('垂直布局同样按内容间插入分隔符', () => {
    const wrapper = mountSpace(
      () => [item('A'), item('B')],
      () => [splitNode()],
      { vertical: true }
    )
    expect(wrapper.find('.space-wrap').classes()).toContain('space-vertical')
    expect(wrapper.findAll('.split').length).toBe(1)
    wrapper.unmount()
  })

  it('分隔符内容随插槽响应式更新（每次间隔重新求值）', async () => {
    const label = ref('|')
    const wrapper = mount(Space, {
      slots: {
        default: () => [item('A'), item('B')],
        split: () => [h('span', { class: 'split' }, label.value)]
      }
    })
    expect(wrapper.find('.split').text()).toBe('|')
    label.value = '/'
    await nextTick()
    expect(wrapper.find('.split').text()).toBe('/')
    wrapper.unmount()
  })
})
