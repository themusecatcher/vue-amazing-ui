import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import Timeline from 'components/timeline/Timeline.vue'
import TimelineItem from 'components/timeline/timeline-item/TimelineItem.vue'

/**
 * 回归守护：Timeline 的结构与布局类
 *
 * 布局完全由 CSS 承担（模式类 + nth-child + 节点级 position），组件内部不做 DOM 测量、
 * 不命令式操作 class，因此断言集中在「根/节点类名」与「节点结构」上。
 */

const item = (props: Record<string, unknown>, slot?: () => unknown) => {
  return h(TimelineItem, props, slot ? { default: slot } : undefined)
}

describe('Timeline 时间轴组件', () => {
  it('根类名按模式、尺寸、线型与开关组合', () => {
    const wrapper = mount(Timeline, {
      props: { mode: 'alternate', size: 'large', lineType: 'dashed', reverse: true, horizontal: true },
      slots: { default: () => [item({ content: 'a' })] }
    })
    const classes = wrapper.classes()
    expect(classes).toContain('timeline-wrap')
    expect(classes).toContain('timeline-alternate')
    expect(classes).toContain('timeline-large')
    expect(classes).toContain('timeline-line-dashed')
    expect(classes).toContain('timeline-reverse')
    expect(classes).toContain('timeline-horizontal')
  })

  it('根元素为 ul，节点为 li，保留列表语义', () => {
    const wrapper = mount(Timeline, {
      slots: { default: () => [item({ content: 'a' }), item({ content: 'b' })] }
    })
    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.findAll('li')[0].classes()).toContain('timeline-item-wrap')
  })

  it('iconSize 覆写轴点区域尺寸变量', () => {
    const wrapper = mount(Timeline, {
      props: { iconSize: 18 },
      slots: { default: () => [item({ content: 'a' })] }
    })
    expect(wrapper.attributes('style')).toContain('--timeline-head-size: 18px')
  })

  it('pending 追加幽灵节点，并标记根类与幽灵节点类', () => {
    const wrapper = mount(Timeline, {
      props: { pending: 'Recording...' },
      slots: { default: () => [item({ content: 'a' })] }
    })
    expect(wrapper.classes()).toContain('timeline-pending')
    const items = wrapper.findAll('li')
    expect(items).toHaveLength(2)
    expect(items[1].classes()).toContain('timeline-item-pending')
    expect(items[1].text()).toContain('Recording...')
    expect(items[1].find('.timeline-pending-dot').exists()).toBe(true)
  })

  it('可访问性：根节点保留列表语义，幽灵节点标记 aria-busy', () => {
    const wrapper = mount(Timeline, {
      props: { pending: true },
      slots: { default: () => [item({ content: 'a' })] }
    })
    expect(wrapper.attributes('role')).toBe('list')
    const items = wrapper.findAll('li')
    expect(items[1].attributes('aria-busy')).toBe('true')
    expect(items[0].attributes('aria-busy')).toBeUndefined()
  })

  it('pending 为 true 时不渲染文字内容，pendingDot 可替换轴点', () => {
    const wrapper = mount(Timeline, {
      props: { pending: true, pendingDot: 'dot-text' },
      slots: { default: () => [item({ content: 'a' })] }
    })
    const pendingItem = wrapper.findAll('li')[1]
    expect(pendingItem.find('.timeline-item-content-body').text()).toBe('')
    expect(pendingItem.find('.timeline-pending-dot-text').text()).toBe('dot-text')
    expect(pendingItem.find('.timeline-pending-dot').exists()).toBe(false)
  })

  it('pending / pendingDot 传 VNode 时按节点渲染，而非被序列化为文本', () => {
    const wrapper = mount(Timeline, {
      props: { pending: h('span', { class: 'vnode-pending' }, '幽灵内容'), pendingDot: h('i', { class: 'vnode-dot' }) },
      slots: { default: () => [item({ content: 'a' })] }
    })
    const pendingItem = wrapper.findAll('li')[1]
    expect(pendingItem.find('.vnode-pending').exists()).toBe(true)
    expect(pendingItem.find('.timeline-item-content-body').text()).toBe('幽灵内容')
    expect(pendingItem.find('.vnode-dot').exists()).toBe(true)
  })

  it('pending 为 false 或空内容时不渲染幽灵节点', () => {
    const none = mount(Timeline, {
      slots: { default: () => [item({ content: 'a' })] }
    })
    expect(none.classes()).not.toContain('timeline-pending')
    expect(none.findAll('li')).toHaveLength(1)
  })

  it('content / title / time 按序渲染，未提供时不占位', () => {
    const wrapper = mount(TimelineItem, {
      props: { title: '成功', content: '哪里成功', time: '2018-04-03' }
    })
    expect(wrapper.find('.timeline-item-content-title').text()).toBe('成功')
    expect(wrapper.find('.timeline-item-content-body').text()).toBe('哪里成功')
    expect(wrapper.find('.timeline-item-content-footer').text()).toBe('2018-04-03')
    const bare = mount(TimelineItem, { props: { content: 'only' } })
    expect(bare.find('.timeline-item-content-title').exists()).toBe(false)
    expect(bare.find('.timeline-item-content-footer').exists()).toBe(false)
  })

  it('time 为 0 时仍然渲染底部信息', () => {
    const wrapper = mount(TimelineItem, { props: { time: 0 } })
    expect(wrapper.find('.timeline-item-content-footer').exists()).toBe(true)
  })

  it('预设色走主题变量并兼容大小写，自定义色原样输出', () => {
    const headStyle = (color?: string) => {
      return (
        mount(TimelineItem, { props: { content: 'a', color } })
          .find('.timeline-item-head')
          .attributes('style') ?? ''
      )
    }
    expect(headStyle('green')).toContain('--timeline-dot-color: var(--va-success-color)')
    expect(headStyle('Blue')).toContain('--timeline-dot-color: var(--va-cp-timeline-primary-color')
    expect(headStyle('#00ccff')).toContain('--timeline-dot-color: #00ccff')
    // 未传 color 时不写实例变量，默认圆点走主题主色、自定义轴点沿用正文色
    expect(headStyle()).toBe('')
  })

  it('节点级 position 与 lineType 输出对应类名，供 CSS 覆盖', () => {
    const wrapper = mount(TimelineItem, { props: { content: 'a', position: 'right', lineType: 'dotted' } })
    expect(wrapper.classes()).toContain('timeline-item-right')
    expect(wrapper.classes()).toContain('timeline-item-line-dotted')
  })

  it('dot 插槽渲染自定义轴点，插槽为空时回落到默认圆点', () => {
    const custom = mount(TimelineItem, { props: { content: 'a' }, slots: { dot: () => h('i', { class: 'my-dot' }) } })
    expect(custom.find('.my-dot').exists()).toBe(true)
    expect(custom.find('.timeline-item-head-dot').exists()).toBe(false)
    const empty = mount(TimelineItem, {
      props: { content: 'a' },
      slots: { dot: () => [] }
    })
    expect(empty.find('.timeline-item-head-dot').exists()).toBe(true)
  })

  it('label 存在时标记分栏布局类，插槽优先于属性', () => {
    const byProp = mount(TimelineItem, { props: { content: 'a', label: '2015-09-01' } })
    expect(byProp.classes()).toContain('timeline-item-has-label')
    expect(byProp.find('.timeline-item-label').text()).toBe('2015-09-01')
    const bySlot = mount(TimelineItem, {
      props: { content: 'a', label: '属性值' },
      slots: { label: () => h('strong', '插槽值') }
    })
    expect(bySlot.find('.timeline-item-label').text()).toBe('插槽值')
  })

  it('默认插槽优先于 content 属性', () => {
    const wrapper = mount(TimelineItem, {
      props: { content: '属性内容' },
      slots: { default: () => h('p', '插槽内容') }
    })
    expect(wrapper.find('.timeline-item-content-body').text()).toBe('插槽内容')
  })
})
