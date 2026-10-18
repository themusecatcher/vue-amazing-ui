import { describe, it, expect, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Checkbox from 'components/checkbox/Checkbox.vue'
import CheckboxGroup from 'components/checkbox/checkbox-group/CheckboxGroup.vue'
import type { CheckboxChangeEvent } from 'components/checkbox/context'

/**
 * 多选组件「原生 input 承载」「change 事件对象」与「组内受控」的契约回归
 *
 * 复用单选组件本轮确立的范式：每项渲染视觉隐藏的 `input[type=checkbox]` 承载键盘操作、表单字段名与
 * 屏幕阅读器语义（组级 `name` 由 `CheckboxGroup` 下发）；交互统一由原生 `click` 收口（鼠标经外层
 * `label` 转发后事件目标仍是本 input），故不会出现鼠标与键盘两条路径重复触发。`value` 承载两种语义
 * （options 模式为已选值数组、组内单项为身份标识）无法用类型完全区分，故用测试固化分流结果。
 */

const OPTIONS = ['Apple', 'Pear', 'Orange']
const checkboxOptions = OPTIONS.map((label) => ({ label, value: label }))

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

describe('Checkbox 原生 input 承载', () => {
  it('单项渲染原生 input，受控选中态与字段名落到 input 上', () => {
    wrapper = mount(Checkbox, {
      props: { checked: true, name: 'city', id: 'city-beijing' },
      slots: { default: 'Beijing' }
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
    expect((input.element as HTMLInputElement).checked).toBe(true)
    expect(input.attributes('name')).toBe('city')
    expect(input.attributes('id')).toBe('city-beijing')
  })

  it('半选状态写到原生 input 的 indeterminate 属性上', async () => {
    wrapper = mount(Checkbox, { props: { indeterminate: true }, slots: { default: 'Checkbox' } })
    await nextTick()
    expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).indeterminate).toBe(true)
  })

  it('禁用态同步到 input，使其不可聚焦', () => {
    wrapper = mount(Checkbox, { props: { disabled: true } })
    expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined()
  })

  it('options 模式每项各有独立 input，id 以传入值为前缀追加下标', () => {
    wrapper = mount(Checkbox, { props: { options: checkboxOptions, value: ['Apple'], id: 'fruit' } })
    const inputs = wrapper.findAll('input[type="checkbox"]')
    expect(inputs).toHaveLength(OPTIONS.length)
    expect(inputs.map((input) => input.attributes('id'))).toEqual(['fruit-0', 'fruit-1', 'fruit-2'])
    expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
  })

  it('未提供 id 时不产出 id，避免同页多个实例互相串值', () => {
    wrapper = mount(Checkbox, { props: { options: checkboxOptions } })
    expect(wrapper.findAll('input[type="checkbox"]').every((input) => input.attributes('id') === undefined)).toBe(true)
  })

  it('options 模式 autofocus 只落在第一项，避免多个 autofocus 元素竞争', () => {
    wrapper = mount(Checkbox, { props: { options: checkboxOptions, autofocus: true } })
    const autofocused = wrapper
      .findAll('input[type="checkbox"]')
      .map((input) => input.attributes('autofocus') !== undefined)
    expect(autofocused).toEqual([true, false, false])
  })
})

describe('Checkbox change 事件对象', () => {
  it('单项点击后，首参为选中态、第二参为事件对象', async () => {
    wrapper = mount(Checkbox, { slots: { default: 'Checkbox' } })
    await wrapper.find('input[type="checkbox"]').trigger('click')
    const [checked, event] = (wrapper.emitted('change')?.[0] ?? []) as [boolean, CheckboxChangeEvent]
    expect(checked).toBe(true)
    expect(event.target.checked).toBe(true)
    expect(event.nativeEvent).toBeInstanceOf(Event)
    expect(typeof event.stopPropagation).toBe('function')
    expect(typeof event.preventDefault).toBe('function')
  })

  it('单项再次点击取消选中，首参转为 false', async () => {
    wrapper = mount(Checkbox, { props: { checked: true }, slots: { default: 'Checkbox' } })
    await wrapper.find('input[type="checkbox"]').trigger('click')
    const [checked] = (wrapper.emitted('change')?.[0] ?? []) as [boolean, CheckboxChangeEvent]
    expect(checked).toBe(false)
  })

  it('options 模式点击未选中项时，首参为新的已选值数组、事件对象带出被点击项快照', async () => {
    wrapper = mount(Checkbox, { props: { options: checkboxOptions, value: ['Apple'], name: 'fruit' } })
    await wrapper.findAll('input[type="checkbox"]')[1].trigger('click')
    const [value, event] = (wrapper.emitted('change')?.[0] ?? []) as [string[], CheckboxChangeEvent]
    expect(value).toEqual(['Apple', 'Pear'])
    expect(event.target.checked).toBe(true)
    expect(event.target.value).toBe('Pear')
    expect(event.target.name).toBe('fruit')
  })

  it('options 模式点击已选中项时，该项从数组中移除', async () => {
    wrapper = mount(Checkbox, { props: { options: checkboxOptions, value: ['Apple', 'Pear'] } })
    await wrapper.findAll('input[type="checkbox"]')[0].trigger('click')
    const [value] = (wrapper.emitted('change')?.[0] ?? []) as [string[], CheckboxChangeEvent]
    expect(value).toEqual(['Pear'])
  })
})

describe('CheckboxGroup 下发组级配置与组内受控', () => {
  it('name 下发到组内每个原生 input', () => {
    wrapper = mount(CheckboxGroup, { props: { options: OPTIONS, value: ['Apple'], name: 'fruit' } })
    const names = wrapper.findAll('input[type="checkbox"]').map((input) => input.attributes('name'))
    expect(names).toEqual(OPTIONS.map(() => 'fruit'))
  })

  it('组整组禁用时组内各项一并禁用', () => {
    wrapper = mount(CheckboxGroup, { props: { options: OPTIONS, disabled: true } })
    const disabled = wrapper.findAll('input[type="checkbox"]').map((input) => input.attributes('disabled'))
    expect(disabled.every((value) => value !== undefined)).toBe(true)
  })

  it('组内选中由组承载，单项不重复上报 change', async () => {
    wrapper = mount(CheckboxGroup, {
      props: { value: ['Apple'] },
      slots: {
        default: () =>
          checkboxOptions.map((option) => h(Checkbox, { key: option.value, value: option.value }, () => option.label))
      }
    })
    await wrapper.findAll('input[type="checkbox"]')[1].trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
    const [value] = (wrapper.emitted('change')?.[0] ?? []) as [string[], CheckboxChangeEvent]
    expect(value).toEqual(['Apple', 'Pear'])
  })

  it('组内勾选按操作顺序追加，取消勾选按值移除', async () => {
    wrapper = mount(CheckboxGroup, {
      props: { value: [] },
      slots: {
        default: () =>
          checkboxOptions.map((option) => h(Checkbox, { key: option.value, value: option.value }, () => option.label))
      }
    })
    const inputs = wrapper.findAll('input[type="checkbox"]')
    await inputs[2].trigger('click')
    await inputs[0].trigger('click')
    expect((wrapper.emitted('change')?.[1]?.[0] as string[]) ?? []).toEqual(['Orange', 'Apple'])
    await inputs[2].trigger('click')
    expect((wrapper.emitted('change')?.[2]?.[0] as string[]) ?? []).toEqual(['Apple'])
  })
})

describe('Checkbox 选项名与实例方法', () => {
  it('选项名可传 VNode 并原样渲染', () => {
    wrapper = mount(Checkbox, {
      props: { options: [{ label: h('span', { class: 'vnode-label' }, 'Pear'), value: 'Pear' }] }
    })
    expect(wrapper.find('.vnode-label').text()).toBe('Pear')
  })

  it('暴露 focus / blur 并作用在原生 input 上', async () => {
    // 需挂载进真实文档：脱离文档的节点调用 focus() 不会成为 activeElement
    wrapper = mount(Checkbox, { props: { options: checkboxOptions, value: ['Apple'] }, attachTo: document.body })
    const instance = wrapper.vm as unknown as { focus: () => void; blur: () => void }
    expect(typeof instance.focus).toBe('function')
    expect(typeof instance.blur).toBe('function')
    // options 模式下优先聚焦当前选中项
    const input = wrapper.findAll('input[type="checkbox"]')[0].element
    instance.focus()
    await nextTick()
    expect(document.activeElement).toBe(input)
    instance.blur()
    await nextTick()
    expect(document.activeElement).not.toBe(input)
  })

  it('调用 focus() 时补出焦点环标志（脚本聚焦不匹配 :focus-visible，需标志兜底）', async () => {
    wrapper = mount(Checkbox, { slots: { default: 'Checkbox' } })
    const instance = wrapper.vm as unknown as { focus: () => void; blur: () => void }
    instance.focus()
    await nextTick()
    expect(wrapper.find('.checkbox-container').classes()).toContain('checkbox-focused')
    instance.blur()
    await nextTick()
    expect(wrapper.find('.checkbox-container').classes()).not.toContain('checkbox-focused')
  })
})
