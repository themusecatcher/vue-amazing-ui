import { describe, it, expect, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Checkbox from 'components/checkbox/Checkbox.vue'
import CheckboxGroup from 'components/checkbox/checkbox-group/CheckboxGroup.vue'
import type { CheckboxChangeEvent } from 'components/checkbox/context'

/**
 * 多选组件「原生 input 承载」「change 事件对象」与「组内受控」的契约回归
 *
 * 每项渲染视觉隐藏的 `input[type=checkbox]` 承载键盘操作、表单字段名与屏幕阅读器语义
 * （组级 `name` / `id` 由 `CheckboxGroup` 下发）；交互统一由原生 `click` 收口（鼠标经外层
 * `label` 转发后事件目标仍是本 input），故不会出现鼠标与键盘两条路径重复触发。
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
})

describe('CheckboxGroup 下发组级配置与组内受控', () => {
  it('name 下发到组内每个原生 input', () => {
    wrapper = mount(CheckboxGroup, { props: { options: OPTIONS, value: ['Apple'], name: 'fruit' } })
    const names = wrapper.findAll('input[type="checkbox"]').map((input) => input.attributes('name'))
    expect(names).toEqual(OPTIONS.map(() => 'fruit'))
  })

  it('id 前缀下发到组内每个原生 input', () => {
    wrapper = mount(CheckboxGroup, { props: { options: OPTIONS, id: 'fruit' } })
    const ids = wrapper.findAll('input[type="checkbox"]').map((input) => input.attributes('id'))
    expect(ids).toEqual(OPTIONS.map((_, index) => `fruit-${index}`))
  })

  it('autofocus 只落在 options 模式首项，避免多个元素竞争', () => {
    wrapper = mount(CheckboxGroup, { props: { options: OPTIONS, autofocus: true } })
    const autofocused = wrapper
      .findAll('input[type="checkbox"]')
      .map((input) => input.attributes('autofocus') !== undefined)
    expect(autofocused).toEqual([true, false, false])
  })

  it('options 模式默认插槽提供 option / label / index，可自定义选项名', () => {
    wrapper = mount(CheckboxGroup, {
      props: { options: OPTIONS },
      slots: {
        default: ({ label, index }: { label?: string | number; index?: number }) =>
          h('span', { class: 'custom-option-label' }, `${index}-${label}`)
      }
    })
    const labels = wrapper.findAll('.custom-option-label').map((node) => node.text())
    expect(labels).toEqual(['0-Apple', '1-Pear', '2-Orange'])
  })

  it('选项名可传 VNode 并原样渲染', () => {
    wrapper = mount(CheckboxGroup, {
      props: { options: [{ label: h('span', { class: 'vnode-label' }, 'Pear'), value: 'Pear' }] }
    })
    expect(wrapper.find('.vnode-label').text()).toBe('Pear')
  })

  it('选项缺省 label 时回落到选项值，不渲染 undefined', () => {
    const optionsWithoutLabel = [{ value: 'Pear' }] as unknown as { label: string; value: string }[]
    wrapper = mount(CheckboxGroup, { props: { options: optionsWithoutLabel } })
    expect(wrapper.find('.checkbox-label').text()).toBe('Pear')
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

  it('垂直排列时数组间距取垂直间距，不产出非法 CSS', () => {
    wrapper = mount(CheckboxGroup, { props: { options: OPTIONS, vertical: true, gap: [8, 16] } })
    expect(wrapper.find('.checkbox-group-wrap').attributes('style')).toContain('--checkbox-group-gap: 16px')
  })
})

describe('Checkbox 实例方法', () => {
  it('暴露 focus / blur 并作用在原生 input 上', async () => {
    // 需挂载进真实文档：脱离文档的节点调用 focus() 不会成为 activeElement
    wrapper = mount(Checkbox, { attachTo: document.body })
    const instance = wrapper.vm as unknown as { focus: () => void; blur: () => void }
    expect(typeof instance.focus).toBe('function')
    expect(typeof instance.blur).toBe('function')
    const input = wrapper.find('input[type="checkbox"]').element
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
