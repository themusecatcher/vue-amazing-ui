import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import Select from 'components/select/Select.vue'
import Cascader from 'components/cascader/Cascader.vue'
import AutoComplete from 'components/auto-complete/AutoComplete.vue'
import Tooltip from 'components/tooltip/Tooltip.vue'
import Dropdown from 'components/dropdown/Dropdown.vue'
import Tabs from 'components/tabs/Tabs.vue'
import Collapse from 'components/collapse/Collapse.vue'
import Pagination from 'components/pagination/Pagination.vue'
import Rate from 'components/rate/Rate.vue'
import Segmented from 'components/segmented/Segmented.vue'
import RadioGroup from 'components/radio/radio-group/RadioGroup.vue'
import CheckboxGroup from 'components/checkbox/checkbox-group/CheckboxGroup.vue'
import Upload from 'components/upload/Upload.vue'
import Menu from 'components/menu/Menu.vue'
import ColorPicker from 'components/color-picker/ColorPicker.vue'
import Slider from 'components/slider/Slider.vue'

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

describe('v-model 非受控：其余双模组件', () => {
  it('Rate：点击星标就地生效，再点同一星按 allowClear 清零', async () => {
    wrapper = mount(Rate, { attachTo: document.body, props: { count: 5 } })
    await flush()
    const stars = wrapper.findAll('.rate-star')
    expect(stars).toHaveLength(5)

    await stars[2].trigger('click')
    await flush()
    expect(wrapper.emitted('update:value')?.[0]).toEqual([3])

    // 模型若没就地生效，第二次点同一颗星仍会再报一次 3，而不是走 allowClear 的 0
    await stars[2].trigger('click')
    await flush()
    expect(wrapper.emitted('update:value')?.[1]).toEqual([0])
  })

  it('Segmented：点击选项就地选中并上报', async () => {
    wrapper = mount(Segmented, { props: { options: ['A', 'B', 'C'] } })
    await flush()
    expect(wrapper.findAll('.segmented-item-selected')).toHaveLength(0)

    await wrapper.findAll('.segmented-item')[1].trigger('click')
    await flush()

    expect(wrapper.emitted('update:value')?.[0]).toEqual(['B'])
    expect(wrapper.findAll('.segmented-item')[1].classes()).toContain('segmented-item-selected')
  })

  it('RadioGroup：不传 value 时选中项就地生效并上报', async () => {
    wrapper = mount(RadioGroup, {
      props: {
        options: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' }
        ]
      }
    })
    await flush()

    await wrapper.findAll('.radio-label')[1].trigger('click')
    await flush()

    expect(wrapper.emitted('update:value')?.[0]).toEqual(['banana'])
    const inputs = wrapper.findAll('input[type="radio"]')
    expect((inputs[1].element as HTMLInputElement).checked).toBe(true)
  })

  it('CheckboxGroup：不传 value 时勾选就地生效并上报', async () => {
    wrapper = mount(CheckboxGroup, {
      props: {
        options: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' }
        ]
      }
    })
    await flush()

    await wrapper.findAll('input[type="checkbox"]')[1].trigger('click')
    await flush()

    expect(wrapper.emitted('update:value')?.[0]).toEqual([['banana']])
    expect((wrapper.findAll('input[type="checkbox"]')[1].element as HTMLInputElement).checked).toBe(true)
  })

  it('Upload：不传 fileList 时选中文件即写入列表并上报', async () => {
    // 走 custom 模式：默认的 base64 链路依赖 FileReader，测试环境需额外打桩，与「非受控」这一断言目标无关
    wrapper = mount(Upload, {
      attachTo: document.body,
      props: {
        uploadMode: 'custom',
        customRequest: (file: File) => Promise.resolve({ url: 'blob:a.txt', name: file.name })
      }
    })
    await flush()

    const input = wrapper.find('input[type="file"]')
    const file = new File(['x'], 'a.txt', { type: 'text/plain' })
    Object.defineProperty(input.element, 'files', { value: [file], configurable: true })
    await input.trigger('change')
    await flushPromises()
    await flush()

    const emittedList = wrapper.emitted('update:fileList')?.[0]?.[0] as { name?: string }[] | undefined
    expect(emittedList).toHaveLength(1)
    expect(emittedList?.[0]?.name).toBe('a.txt')
  })

  it('Menu：不传 selectedKeys 时点击菜单项就地高亮并上报', async () => {
    wrapper = mount(Menu, {
      props: {
        mode: 'inline',
        items: [{ key: 'mail', label: '邮件' }]
      }
    })
    await flush()

    await wrapper.find('[data-menu-id="mail"]').trigger('click')
    await flush()

    expect(wrapper.emitted('update:selectedKeys')?.[0]).toEqual([['mail']])
    expect(wrapper.find('[data-menu-id="mail"]').classes()).toContain('menu-item-selected')
  })

  it('ColorPicker：不传 open / value 时点开面板并选色就地生效', async () => {
    wrapper = mount(ColorPicker, {
      attachTo: document.body,
      props: { swatches: ['#FF0000', '#00FF00'] }
    })
    await flush()

    wrapper.find('.color-picker-display').trigger('click')
    await flush()
    // 非受控时开合由组件自持：面板必须真的渲染出来
    expect(document.querySelector('.color-picker-panel')).not.toBeNull()

    const swatches = Array.from(document.querySelectorAll<HTMLElement>('.color-picker-swatch'))
    swatches[1]?.click()
    await flush()

    // 输出格式取 `modes` 的首项（默认 rgb），与「是否受控」无关
    expect(wrapper.emitted('update:value')?.[0]).toEqual(['rgba(0, 255, 0, 1)'])
    expect(document.querySelector('.color-picker-value')?.textContent?.trim()).toBe('rgba(0, 255, 0, 1)')
  })

  it('Slider：不传 value 时键盘调节手柄就地生效并上报', async () => {
    // 滑动条按 offsetWidth 换算像素与数值，jsdom 无布局，需给出尺寸并让 ResizeObserver 立即回调
    const widthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
    const heightDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
    const realResizeObserver = globalThis.ResizeObserver
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get(this: HTMLElement): number {
        return this.classList?.contains('slider-wrap') ? 200 : 0
      }
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get(this: HTMLElement): number {
        return this.classList?.contains('slider-wrap') ? 10 : 0
      }
    })
    globalThis.ResizeObserver = class {
      private callback: ResizeObserverCallback
      constructor(callback: ResizeObserverCallback) {
        this.callback = callback
      }
      observe(target: Element): void {
        this.callback([{ target } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver)
      }
      unobserve(): void {}
      disconnect(): void {}
    } as unknown as typeof globalThis.ResizeObserver

    try {
      wrapper = mount(Slider, { attachTo: document.body, props: { min: 0, max: 100, step: 1 } })
      await flush()

      await wrapper.find('.slider-handle').trigger('focus')
      await wrapper.find('.slider-handle').trigger('keydown', { key: 'ArrowRight' })
      await flush()

      expect(wrapper.emitted('update:value')?.[0]).toEqual([1])
    } finally {
      if (widthDescriptor) Object.defineProperty(HTMLElement.prototype, 'offsetWidth', widthDescriptor)
      if (heightDescriptor) Object.defineProperty(HTMLElement.prototype, 'offsetHeight', heightDescriptor)
      globalThis.ResizeObserver = realResizeObserver
    }
  })
})
