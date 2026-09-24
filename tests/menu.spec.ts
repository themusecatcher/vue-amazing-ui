import { describe, it, expect, afterEach, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import Menu from 'components/menu'
import type { ItemType, MenuKey } from 'components/menu'
import { MENU_OVERFLOW_KEY, flattenOverflowItems, splitOverflowItems } from 'components/menu/overflow'

/**
 * Menu 回归守护
 *
 * 覆盖三类易回归点：① 模式归一（inline 收起后降级为 vertical）与收起态的首字兜底；
 * ② 选中 / 展开的受控与非受控分支（含多选取消选中）；③ 配置树的三类特殊节点
 * （分组、分割线、禁用项）与展开集合在模式切换间的缓存还原。
 */

const items: ItemType[] = [
  { key: 'mail', label: 'Navigation One', title: 'Navigation One' },
  {
    key: 'sub1',
    label: 'Navigation Two',
    children: [
      { key: 'opt1', label: 'Option 1' },
      { key: 'opt2', label: 'Option 2' }
    ]
  },
  { type: 'divider', dashed: true },
  {
    type: 'group',
    label: 'Group',
    children: [
      { key: 'g1', label: 'Option 3' },
      { key: 'g2', label: 'Option 4' }
    ]
  },
  { key: 'disabled', label: 'Disabled', disabled: true }
]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

describe('Menu - 渲染与结构', () => {
  it('根节点为 {组件名}-wrap 体系，并带模式与主题类名', () => {
    wrapper = mount(Menu, { props: { items } })
    expect(wrapper.classes()).toContain('menu-wrap')
    expect(wrapper.classes()).toContain('menu-root')
    expect(wrapper.classes()).toContain('menu-vertical')
    expect(wrapper.classes()).toContain('menu-light')
  })

  it('按配置渲染菜单项、子菜单、分组与分割线', () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline' } })
    expect(wrapper.findAll('.menu-item')).toHaveLength(6)
    expect(wrapper.findAll('.menu-submenu')).toHaveLength(1)
    expect(wrapper.findAll('.menu-submenu-list')).toHaveLength(1)
    expect(wrapper.findAll('.menu-item-group')).toHaveLength(1)
    expect(wrapper.find('.menu-item-divider').classes()).toContain('menu-item-divider-dashed')
  })

  it('禁用项渲染禁用类名且点击不生效', async () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline' } })
    const disabled = wrapper.find('[data-menu-id="disabled"]')
    expect(disabled.classes()).toContain('menu-item-disabled')
    await disabled.trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('整体禁用时点击任意菜单项都不触发选中', async () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline', disabled: true } })
    await wrapper.find('[data-menu-id="mail"]').trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    expect(wrapper.emitted('select')).toBeUndefined()
  })
})

describe('Menu - 选中与展开', () => {
  it('点击菜单项回传 click / select 与 update:selectedKeys', async () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline' } })
    await wrapper.find('[data-menu-id="mail"]').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    const selectPayload = wrapper.emitted('select')?.[0]?.[0] as { key: MenuKey; selectedKeys: MenuKey[] }
    expect(selectPayload.key).toBe('mail')
    expect(selectPayload.selectedKeys).toEqual(['mail'])
    expect(wrapper.emitted('update:selectedKeys')?.[0]?.[0]).toEqual(['mail'])
    expect(wrapper.find('[data-menu-id="mail"]').classes()).toContain('menu-item-selected')
  })

  it('多选模式下重复点击同一项触发 deselect', async () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline', multiple: true } })
    const first = wrapper.find('[data-menu-id="mail"]')
    await first.trigger('click')
    await first.trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('deselect')).toHaveLength(1)
  })

  it('selectable 为 false 时不产生选中相关事件', async () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline', selectable: false } })
    await wrapper.find('[data-menu-id="mail"]').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('update:selectedKeys')).toBeUndefined()
  })

  it('受控 selectedKeys 在外部回填前不落到内部副本', async () => {
    const selected = ref<MenuKey[]>([])
    wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(Menu, {
              items,
              mode: 'inline',
              selectedKeys: selected.value,
              'onUpdate:selectedKeys': (keys: MenuKey[]) => (selected.value = keys)
            })
        }
      })
    )
    await wrapper.find('[data-menu-id="mail"]').trigger('click')
    expect(wrapper.find('[data-menu-id="mail"]').classes()).toContain('menu-item-selected')
  })

  it('inline 模式点击子菜单标题切换展开，并回传 openChange', async () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline' } })
    await wrapper.find('[data-menu-id="sub1"]').trigger('click')
    expect(wrapper.emitted('openChange')?.[0]?.[0]).toEqual(['sub1'])
    // 受控为假，需外部回填后才会呈现展开态
    await wrapper.setProps({ openKeys: ['sub1'] })
    expect(wrapper.find('.menu-submenu').classes()).toContain('menu-submenu-open')
  })

  it('选中项使所在子菜单整链高亮', () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline', openKeys: ['sub1'], selectedKeys: ['opt2'] } })
    expect(wrapper.find('.menu-item-selected').text()).toContain('Option 2')
    expect(wrapper.find('.menu-submenu').classes()).toContain('menu-submenu-selected')
  })

  it('点击菜单项后收起浮层型子菜单（多选除外）', async () => {
    wrapper = mount(Menu, { props: { items, openKeys: ['sub1'] }, attachTo: document.body })
    // 浮层以标题元素为定位锚点，锚点在首次渲染的 ref 回调里才登记，故渲染晚一轮
    await nextTick()
    // 浮层型子菜单的列表挂在 Teleport 目标（body）下，需直接查文档
    const option = document.querySelector('[data-menu-id="opt1"]') as HTMLElement | null
    expect(option).not.toBeNull()
    option?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('openChange')?.[0]?.[0]).toEqual([])
  })
})

describe('Menu - 模式与收起', () => {
  it('inline 收起后降级为 vertical 并带收起类名', () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline', inlineCollapsed: true } })
    expect(wrapper.classes()).toContain('menu-vertical')
    expect(wrapper.classes()).toContain('menu-inline-collapsed')
  })

  it('收起态无图标的菜单项以标题首字兜底', () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline', inlineCollapsed: true } })
    expect(wrapper.find('.menu-inline-collapsed-noicon').text()).toBe('N')
  })

  it('horizontal 模式下 inlineCollapsed 不生效', () => {
    wrapper = mount(Menu, { props: { items, mode: 'horizontal', inlineCollapsed: true } })
    expect(wrapper.classes()).toContain('menu-horizontal')
    expect(wrapper.classes()).not.toContain('menu-inline-collapsed')
  })

  it('inline 收起时清空展开集合，恢复内嵌后还原缓存', async () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline', openKeys: ['sub1'] } })
    await wrapper.setProps({ inlineCollapsed: true })
    expect(wrapper.emitted('openChange')?.at(-1)?.[0]).toEqual([])
    await wrapper.setProps({ inlineCollapsed: false })
    // 还原走内部缓存，不再回传 openChange；以渲染结果断言
    expect(wrapper.find('.menu-submenu').classes()).toContain('menu-submenu-open')
  })
})

describe('Menu - 水平溢出切分', () => {
  it('溢出起点之后的项收进溢出子菜单，其余保持原序', () => {
    const items: ItemType[] = [
      { key: 'a', label: 'A' },
      { key: 'b', label: 'B' },
      { key: 'c', label: 'C' }
    ]
    const split = splitOverflowItems(items, 2)
    expect(split).toHaveLength(3)
    expect(split[0]).toBe(items[0])
    expect(split[1]).toBe(items[1])
    const overflow = split[2] as { key: MenuKey; children: ItemType[] }
    expect(overflow.key).toBe(MENU_OVERFLOW_KEY)
    expect(overflow.children).toEqual([items[2]])
  })

  it('未溢出时原样返回入参，不产生新数组引用', () => {
    const items: ItemType[] = [{ key: 'a', label: 'A' }]
    expect(splitOverflowItems(items, Number.POSITIVE_INFINITY)).toBe(items)
    expect(splitOverflowItems(items, 1)).toBe(items)
  })

  it('还原切分前的顺序，供探针按下标对齐', () => {
    const items: ItemType[] = [
      { key: 'a', label: 'A' },
      { key: 'b', label: 'B' },
      { key: 'c', label: 'C' }
    ]
    expect(flattenOverflowItems(splitOverflowItems(items, 1))).toEqual(items)
  })

  it('量不到容器宽度时不切分（jsdom / SSR 下按平铺渲染）', () => {
    wrapper = mount(Menu, { props: { items, mode: 'horizontal' } })
    expect(wrapper.find(`.menu-submenu[data-menu-id="${MENU_OVERFLOW_KEY}"]`).exists()).toBe(false)
    // 探针始终参与渲染，宽度量不到时按 0 处理，不影响平铺结果
    expect(wrapper.findAll('.menu-overflow-probe').length).toBeGreaterThan(0)
  })
})

describe('Menu - 自定义展开图标', () => {
  it('expandIcon 插槽渲染的节点带上展开图标类名', () => {
    wrapper = mount(Menu, {
      props: { items, mode: 'inline' },
      slots: { expandIcon: () => h('span', { class: 'custom-arrow' }) }
    })
    const custom = wrapper.find('.custom-arrow')
    expect(custom.exists()).toBe(true)
    expect(custom.classes()).toContain('menu-submenu-expand-icon')
    expect(wrapper.find('.menu-submenu-arrow').exists()).toBe(false)
  })

  it('未提供 expandIcon 时渲染内置箭头', () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline' } })
    expect(wrapper.find('.menu-submenu-arrow').exists()).toBe(true)
  })
})

describe('Menu - 事件参数', () => {
  it('click 事件的 item 携带原始配置与 keyPath', async () => {
    wrapper = mount(Menu, { props: { items, mode: 'inline', openKeys: ['sub1'] } })
    await wrapper.find('[data-menu-id="opt1"]').trigger('click')
    const payload = wrapper.emitted('click')?.[0]?.[0] as { item: { label?: unknown }; keyPath: MenuKey[] }
    expect(payload.keyPath).toEqual(['sub1', 'opt1'])
    expect(payload.item.label).toBe('Option 1')
  })

  it('触发子菜单标题的 onTitleClick 回调', async () => {
    const onTitleClick = vi.fn()
    wrapper = mount(Menu, {
      props: {
        items: [{ key: 'sub', label: 'Sub', children: [{ key: 'child', label: 'Child' }], onTitleClick }],
        mode: 'inline'
      }
    })
    await wrapper.find('.menu-submenu-title').trigger('click')
    expect(onTitleClick).toHaveBeenCalledTimes(1)
  })
})
