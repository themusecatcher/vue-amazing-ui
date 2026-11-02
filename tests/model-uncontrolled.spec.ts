import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'
import Cascader from 'components/cascader/Cascader.vue'
import AutoComplete from 'components/auto-complete/AutoComplete.vue'
import Tooltip from 'components/tooltip/Tooltip.vue'
import Dropdown from 'components/dropdown/Dropdown.vue'
import Tabs from 'components/tabs/Tabs.vue'
import Collapse from 'components/collapse/Collapse.vue'
import Pagination from 'components/pagination/Pagination.vue'

/**
 * v-model 字段的**非受控**用例（父不传 prop 也不监听）
 *
 * 契约（见 development/component-design.md 的「v-model 声明约定」）：
 * - 父不传值 → 组件自持，交互照常生效；
 * - 父传了值 → 受控，组件只上报（反向断言见 `trigger-semantics.spec.ts` 的「静态受控」用例）；
 * - 两种模式都必须派发 `update:x`，父侧随时可接管。
 *
 * 逐组件一条，防止「改造后不绑 v-model 就变只读」这类回归。
 */
let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

/** 等到「状态变更 → 面板渲染」落定 */
async function flush(): Promise<void> {
  await nextTick()
  await new Promise<void>((resolve) => setTimeout(resolve, 0))
  await nextTick()
}

const queryOne = <T extends Element>(selector: string): T | null => document.querySelector(selector) as T | null

describe('v-model 非受控：不传值时可交互', () => {
  it('Select：不传 value 时选中项就地生效，并派发 update:value', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      props: {
        options: [
          { label: '北京市', value: 'beijing' },
          { label: '上海市', value: 'shanghai' }
        ]
      }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()

    const option = queryOne<HTMLElement>('.select-option')
    option?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(wrapper.emitted('update:value')?.[0]).toEqual(['beijing'])
    // 非受控：选中文本回填到触发器（受控且父不回写时这里会保持空）
    expect(wrapper.text()).toContain('北京市')
  })

  it('Cascader：不传 open 时点击触发器可展开面板', async () => {
    wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        options: [
          {
            label: '浙江',
            value: 'zhejiang',
            children: [{ label: '杭州', value: 'hangzhou' }]
          }
        ]
      }
    })
    await flush()
    await wrapper.find('.cascader-wrap').trigger('click')
    await flush()

    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    expect(queryOne('.cascader-panel-container')).not.toBeNull()
  })

  it('AutoComplete：不传 open 时聚焦即展开面板', async () => {
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      props: { options: [{ value: '123' }, { value: '456' }] }
    })
    await flush()
    await wrapper.find('input').trigger('focus')
    await flush()

    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
  })

  it('Tooltip：不传 open 时点击触发器可打开，并派发 update:open / openChange', async () => {
    wrapper = mount(Tooltip, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { trigger: 'click', tooltip: '提示内容', to: false, showDelay: 0, hideDelay: 0 },
      slots: { default: () => h('button', { class: 'tooltip-trigger' }, '触发') }
    })
    await flush()
    await wrapper.find('.tooltip-trigger').trigger('click')
    await flush()

    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    expect(wrapper.emitted('openChange')?.[0]).toEqual([true])
  })

  it('Dropdown：不传 open 时点击触发器可展开菜单', async () => {
    wrapper = mount(Dropdown, {
      attachTo: document.body,
      props: { trigger: 'click', menus: [{ key: '1', label: '菜单一' }] },
      slots: { default: '<a class="dropdown-trigger">触发</a>' }
    })
    await flush()
    await wrapper.find('.dropdown-trigger').trigger('click')
    await flush()

    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    expect(wrapper.emitted('openChange')?.[0]).toEqual([true])
  })
})

describe('v-model 非受控：defaultXxx 提供初值后可交互', () => {
  it('Tabs：defaultActiveKey 指定初始项，切换在本地生效并上报', async () => {
    wrapper = mount(Tabs, {
      attachTo: document.body,
      props: {
        defaultActiveKey: 'a',
        items: [
          { key: 'a', title: 'A', content: '内容 A' },
          { key: 'b', title: 'B', content: '内容 B' }
        ]
      }
    })
    await flush()
    expect(wrapper.text()).toContain('内容 A')

    const items = wrapper.findAll('.tab-item')
    await items[1].trigger('click')
    await flush()

    expect(wrapper.emitted('update:activeKey')?.[0]).toEqual(['b'])
    // 非受控：本地切换生效（受控且父不回写时会一直是「内容 A」）
    expect(wrapper.text()).toContain('内容 B')
  })

  it('Collapse：defaultActiveKey 指定初始展开项，点击可本地切换', async () => {
    wrapper = mount(Collapse, {
      props: {
        defaultActiveKey: 'a',
        items: [
          { key: 'a', title: 'A', content: '面板 A' },
          { key: 'b', title: 'B', content: '面板 B' }
        ]
      }
    })
    await flush()
    const headers = wrapper.findAll('.collapse-header')
    expect(headers).toHaveLength(2)

    await headers[1].trigger('click')
    await flush()

    expect(wrapper.emitted('update:activeKey')?.[0]).toEqual(['b'])
  })

  it('Pagination：defaultPage 生效，翻页在本地生效并上报', async () => {
    wrapper = mount(Pagination, { attachTo: document.body, props: { total: 100, defaultPage: 3 } })
    await flush()
    const active = wrapper.find('.pagination-item-active')
    expect(active.text()).toBe('3')

    await wrapper.find('.pagination-next').trigger('click')
    await flush()

    expect(wrapper.emitted('update:page')?.[0]).toEqual([4])
    expect(wrapper.find('.pagination-item-active').text()).toBe('4')
  })
})
