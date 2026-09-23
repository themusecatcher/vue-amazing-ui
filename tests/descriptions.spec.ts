import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import Descriptions from 'components/descriptions/Descriptions.vue'
import DescriptionsItem from 'components/descriptions/descriptions-item'

const makeItems = (configs: { label?: string; span?: number; content: string }[]) =>
  configs.map((config) =>
    h(DescriptionsItem, { label: config.label, span: config.span }, { default: () => config.content })
  )

describe('Descriptions 切行与标签渲染', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('按 column 切行，行末未设置 span 的项补满本行剩余列数', async () => {
    const wrapper = mount(Descriptions, {
      props: { column: 2 },
      slots: {
        default: () =>
          makeItems([
            { label: 'A', content: 'a' },
            { label: 'B', content: 'b' },
            { label: 'C', content: 'c' }
          ])
      }
    })
    await nextTick()
    const rows = wrapper.findAll('.descriptions-row')
    expect(rows.length).toBe(2)
    expect(rows[0].findAll('td.descriptions-item').length).toBe(2)
    const lastRowCells = rows[1].findAll('td.descriptions-item')
    expect(lastRowCells.length).toBe(1)
    // 最后一行的最后一项包含该行剩余的所有列数
    expect(lastRowCells[0].attributes('colspan')).toBe('2')
    wrapper.unmount()
  })

  it('显式 span 超出本行剩余列数时收缩为剩余列数，并给出开发态告警', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(Descriptions, {
      props: { column: 3 },
      slots: {
        default: () =>
          makeItems([
            { label: 'A', span: 2, content: 'a' },
            { label: 'B', span: 2, content: 'b' }
          ])
      }
    })
    await nextTick()
    const cells = wrapper.findAll('td.descriptions-item')
    expect(cells.length).toBe(2)
    expect(cells[0].attributes('colspan')).toBe('2')
    expect(cells[1].attributes('colspan')).toBe('1')
    expect(warnSpy).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('垂直布局：空标签不渲染冒号，有标签时保留冒号', async () => {
    const empty = mount(Descriptions, {
      props: { layout: 'vertical' },
      slots: { default: () => h(DescriptionsItem, null, { default: () => 'content' }) }
    })
    await nextTick()
    const emptyLabel = empty.find('th.descriptions-item-label')
    expect(emptyLabel.exists()).toBe(true)
    expect(emptyLabel.classes()).toContain('descriptions-item-no-colon')
    empty.unmount()

    const labeled = mount(Descriptions, {
      props: { layout: 'vertical' },
      slots: { default: () => h(DescriptionsItem, { label: 'L' }, { default: () => 'content' }) }
    })
    await nextTick()
    const label = labeled.find('th.descriptions-item-label')
    expect(label.classes()).not.toContain('descriptions-item-no-colon')
    expect(label.text()).toBe('L')
    labeled.unmount()
  })

  it('水平非边框：空标签不渲染标签节点，仅渲染内容', async () => {
    const wrapper = mount(Descriptions, {
      slots: { default: () => h(DescriptionsItem, null, { default: () => 'content' }) }
    })
    await nextTick()
    expect(wrapper.find('.descriptions-item-label').exists()).toBe(false)
    expect(wrapper.find('.descriptions-item-content').text()).toBe('content')
    wrapper.unmount()
  })

  it('标签来源优先级：label 插槽 > label 属性；无 default 插槽时回退到直接子节点', async () => {
    const bySlot = mount(Descriptions, {
      slots: {
        default: () => h(DescriptionsItem, { label: '被覆盖' }, { label: () => '插槽标签', default: () => 'content' })
      }
    })
    await nextTick()
    expect(bySlot.find('.descriptions-item-label').text()).toBe('插槽标签')
    bySlot.unmount()

    // 手写渲染函数场景：内容直接挂在组件上
    const byChildren = mount(Descriptions, {
      slots: { default: () => h(DescriptionsItem, { label: 'L' }, '裸文本') }
    })
    await nextTick()
    expect(byChildren.find('.descriptions-item-label').text()).toBe('L')
    expect(byChildren.find('.descriptions-item-content').text()).toBe('裸文本')
    byChildren.unmount()
  })

  it('边框模式：标签与内容成对，内容 colspan 为 span * 2 - 1', async () => {
    const wrapper = mount(Descriptions, {
      props: { bordered: true, column: 3 },
      slots: {
        default: () =>
          makeItems([
            { label: 'A', span: 1, content: 'a' },
            { label: 'B', span: 2, content: 'b' }
          ])
      }
    })
    await nextTick()
    expect(wrapper.findAll('.descriptions-item-label').length).toBe(2)
    const contents = wrapper.findAll('.descriptions-item-content')
    expect(contents.length).toBe(2)
    expect(contents[0].attributes('colspan')).toBe('1')
    expect(contents[1].attributes('colspan')).toBe('3')
    wrapper.unmount()
  })

  it('labelClass / contentClass 与组件级类名叠加，labelAlign 作用于标签', async () => {
    const wrapper = mount(Descriptions, {
      props: { labelAlign: 'right', labelClass: 'c-label', contentClass: 'c-content', colon: false },
      slots: {
        default: () =>
          h(
            DescriptionsItem,
            { label: 'L', labelClass: 'i-label', contentClass: 'i-content' },
            { default: () => 'content' }
          )
      }
    })
    await nextTick()
    const label = wrapper.find('.descriptions-item-label')
    expect(label.classes()).toContain('c-label')
    expect(label.classes()).toContain('i-label')
    expect(label.classes()).toContain('descriptions-label-align-right')
    // colon 关闭时保留标签后的间距
    expect(label.classes()).toContain('descriptions-item-no-colon')
    const content = wrapper.find('.descriptions-item-content')
    expect(content.classes()).toContain('c-content')
    expect(content.classes()).toContain('i-content')
    wrapper.unmount()
  })
})
