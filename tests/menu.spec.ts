import { describe, it, expect, afterEach, vi } from 'vitest'
import { Fragment, createTextVNode, defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import Menu, { MenuDivider, MenuItem, MenuItemGroup, MenuSubMenu } from 'components/menu'
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

describe('Menu - 组件式写法（default 插槽）', () => {
  /**
   * 组件式用例：四类子组件各一，覆盖图标插槽、分组标题插槽与虚线分割线
   *
   * ⚠️ 插槽一律按**模板编译产物**构造（插槽返回节点数组、纯文本用 `createTextVNode`）：
   * 用 `h()` 的宽松形态（单节点 / 裸字符串）会绕过真实路径 —— 真实浏览器首次实测即因此漏掉「图标插槽不渲染」。
   */
  const componentSlots = () => ({
    default: () => [
      h(
        MenuItem,
        { key: 'mail' },
        { default: () => [createTextVNode('Navigation One')], icon: () => [h('span', { class: 'custom-icon' })] }
      ),
      h(
        MenuSubMenu,
        { key: 'sub1', title: 'Navigation Two' },
        { default: () => [h(MenuItem, { key: 'opt1' }, { default: () => [createTextVNode('Option 1')] })] }
      ),
      h(MenuDivider, { dashed: true }),
      h(
        MenuItemGroup,
        { key: 'group' },
        {
          title: () => [h('strong', { class: 'group-title' }, 'Group')],
          default: () => [h(MenuItem, { key: 'g1' }, { default: () => [createTextVNode('Option 3')] })]
        }
      )
    ]
  })

  it('四类子组件转换为配置树，渲染出与配置式等价的结构', () => {
    wrapper = mount(Menu, { props: { mode: 'inline' }, slots: componentSlots() })
    expect(wrapper.classes()).toContain('menu-wrap')
    expect(wrapper.findAll('.menu-item')).toHaveLength(3)
    expect(wrapper.findAll('.menu-submenu')).toHaveLength(1)
    expect(wrapper.findAll('.menu-item-group')).toHaveLength(1)
    expect(wrapper.find('.menu-item-divider').classes()).toContain('menu-item-divider-dashed')
    expect(wrapper.find('[data-menu-id="mail"]').text()).toContain('Navigation One')
    // 图标与分组标题插槽渲染出的节点带上组件约定的类名
    expect(wrapper.find('.custom-icon').classes()).toContain('menu-item-icon')
    expect(wrapper.find('.group-title').text()).toBe('Group')
  })

  it('default 插槽优先于 items', () => {
    wrapper = mount(Menu, { props: { mode: 'inline', items }, slots: componentSlots() })
    expect(wrapper.find('[data-menu-id="mail"]').exists()).toBe(true)
    expect(wrapper.find('[data-menu-id="disabled"]').exists()).toBe(false)
  })

  it('未设置 key 的子组件按下标兜底 key', () => {
    wrapper = mount(Menu, {
      props: { mode: 'inline' },
      slots: { default: () => [h(MenuItem, null, { default: () => 'A' }), h(MenuItem, null, { default: () => 'B' })] }
    })
    const ids = wrapper.findAll('.menu-item').map((item) => item.attributes('data-menu-id'))
    expect(ids).toEqual(['menu-item-0', 'menu-item-1'])
  })

  it('v-for / Fragment 展开后继续解析', () => {
    wrapper = mount(Menu, {
      props: { mode: 'inline' },
      slots: {
        default: () => [
          h(Fragment, null, [
            h(MenuItem, { key: 'a' }, { default: () => 'A' }),
            h(MenuItem, { key: 'b' }, { default: () => 'B' })
          ])
        ]
      }
    })
    expect(wrapper.findAll('.menu-item')).toHaveLength(2)
  })

  it('点击组件式菜单项触发选中与 select 事件', async () => {
    wrapper = mount(Menu, { props: { mode: 'inline' }, slots: componentSlots() })
    await wrapper.find('[data-menu-id="mail"]').trigger('click')
    const payload = wrapper.emitted('select')?.[0]?.[0] as { key: MenuKey; keyPath: MenuKey[] }
    expect(payload.key).toBe('mail')
    expect(payload.keyPath).toEqual(['mail'])
  })

  it('子菜单级 expandIcon 优先于 Menu 级，且带上展开图标类名', () => {
    wrapper = mount(Menu, {
      props: { mode: 'inline' },
      slots: {
        expandIcon: () => [h('span', { class: 'menu-level-arrow' })],
        default: () => [
          h(
            MenuSubMenu,
            { key: 'sub1', title: 'Sub' },
            {
              expandIcon: () => [h('span', { class: 'item-level-arrow' })],
              default: () => [h(MenuItem, { key: 'opt1' }, { default: () => 'Option 1' })]
            }
          )
        ]
      }
    })
    expect(wrapper.find('.item-level-arrow').classes()).toContain('menu-submenu-expand-icon')
    expect(wrapper.find('.menu-level-arrow').exists()).toBe(false)
  })

  it('子菜单 titleClick 事件带子菜单 key 与原生事件', async () => {
    const onTitleClick = vi.fn()
    wrapper = mount(Menu, {
      props: { mode: 'inline' },
      slots: {
        default: () => [
          h(
            MenuSubMenu,
            { key: 'sub1', title: 'Sub', onTitleClick },
            {
              default: () => [h(MenuItem, { key: 'opt1' }, { default: () => 'Option 1' })]
            }
          )
        ]
      }
    })
    await wrapper.find('.menu-submenu-title').trigger('click')
    expect(onTitleClick).toHaveBeenCalledTimes(1)
    const info = onTitleClick.mock.calls[0][0] as { key: MenuKey; domEvent: MouseEvent }
    expect(info.key).toBe('sub1')
    expect(info.domEvent).toBeInstanceOf(Event)
  })

  it('纯文本标签归一为字符串（收起态首字兜底），富内容标签保留节点', () => {
    wrapper = mount(Menu, {
      props: { mode: 'inline', inlineCollapsed: true },
      slots: {
        default: () => [
          // 模板里直接书写的文本会被编译成 Text vnode，此处按编译形态构造
          h(MenuItem, { key: 'plain' }, { default: () => [createTextVNode('Plain')] }),
          h(MenuItem, { key: 'rich' }, { default: () => h('span', { class: 'rich-label' }, 'Rich') })
        ]
      }
    })
    expect(wrapper.find('[data-menu-id="plain"] .menu-inline-collapsed-noicon').text()).toBe('P')
    expect(wrapper.find('.rich-label').exists()).toBe(true)
  })

  it('字符串悬浮标题落原生 title 属性，富内容悬浮标题不落该属性', () => {
    wrapper = mount(Menu, {
      props: { mode: 'inline' },
      slots: {
        default: () => [
          h(MenuItem, { key: 'a', title: 'Tip A' }, { default: () => 'A' }),
          h(MenuItem, { key: 'b' }, { title: () => h('span', { class: 'tip' }, 'Tip B'), default: () => 'B' })
        ]
      }
    })
    expect(wrapper.find('[data-menu-id="a"]').attributes('title')).toBe('Tip A')
    expect(wrapper.find('[data-menu-id="b"]').attributes('title')).toBeUndefined()
  })
})
