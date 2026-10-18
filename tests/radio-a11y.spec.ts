import { describe, it, expect, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Radio from 'components/radio/Radio.vue'
import RadioGroup from 'components/radio/radio-group/RadioGroup.vue'

/**
 * 单选组件「原生 input 承载」与「change 事件对象」的契约回归
 *
 * 每一项都渲染视觉隐藏的 `input[type=radio]`：键盘操作、表单字段名与屏幕阅读器语义均落在它上面，
 * 组级配置（`name` / `size`）由 `RadioGroup` 下发给组内各项；`change` 在原有的「新值」首参之后追加事件对象，
 * 使按原生事件写法编写的代码可直接迁移。这些均为不可见契约，故用测试固化。
 */

const OPTIONS = ['Apple', 'Pear', 'Orange']
const radioOptions = OPTIONS.map((label) => ({ label, value: label }))

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

describe('Radio 原生 input 承载', () => {
  it('单项渲染原生 input，受控选中态与字段名落到 input 上', () => {
    wrapper = mount(Radio, {
      props: { checked: true, name: 'city', id: 'city-beijing' },
      slots: { default: 'Beijing' }
    })
    const input = wrapper.find('input[type="radio"]')
    expect(input.exists()).toBe(true)
    expect((input.element as HTMLInputElement).checked).toBe(true)
    expect(input.attributes('name')).toBe('city')
    expect(input.attributes('id')).toBe('city-beijing')
  })

  it('禁用态同步到 input，使其不可聚焦', () => {
    wrapper = mount(Radio, { props: { disabled: true } })
    expect(wrapper.find('input[type="radio"]').attributes('disabled')).toBeDefined()
  })

  it('options 模式每项各有独立 input，id 以传入值为前缀追加下标', () => {
    wrapper = mount(Radio, { props: { options: radioOptions, value: 'Apple', id: 'fruit' } })
    const inputs = wrapper.findAll('input[type="radio"]')
    expect(inputs).toHaveLength(OPTIONS.length)
    expect(inputs.map((input) => input.attributes('id'))).toEqual(['fruit-0', 'fruit-1', 'fruit-2'])
    expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
  })

  it('未提供 id 时不产出 id，避免同页多个实例互相串值', () => {
    wrapper = mount(Radio, { props: { options: radioOptions } })
    expect(wrapper.findAll('input[type="radio"]').every((input) => input.attributes('id') === undefined)).toBe(true)
  })

  it('options 模式 autofocus 只落在第一项，避免多个 autofocus 元素竞争', () => {
    wrapper = mount(Radio, { props: { options: radioOptions, autofocus: true } })
    const autofocused = wrapper
      .findAll('input[type="radio"]')
      .map((input) => input.attributes('autofocus') !== undefined)
    expect(autofocused).toEqual([true, false, false])
  })
})

describe('Radio change 事件对象', () => {
  it('单项点击后，首参为选中态、第二参为事件对象', async () => {
    wrapper = mount(Radio, { props: { checked: false }, slots: { default: 'Radio' } })
    await wrapper.find('label').trigger('click')
    const emitted = wrapper.emitted('change')?.[0] as [boolean, Record<string, never>] | undefined
    const [value, event] = emitted ?? []
    expect(value).toBe(true)
    expect(event.target.checked).toBe(true)
    expect(event.nativeEvent).toBeInstanceOf(Event)
    expect(typeof event.stopPropagation).toBe('function')
    expect(typeof event.preventDefault).toBe('function')
  })

  it('options 模式点击未选中项时，事件对象带出新值与字段名', async () => {
    wrapper = mount(Radio, { props: { options: radioOptions, value: 'Apple', name: 'fruit' } })
    await wrapper.findAll('label')[1].trigger('click')
    const [value, event] = (wrapper.emitted('change')?.[0] ?? []) as [string, Record<string, never>]
    expect(value).toBe('Pear')
    expect(event.target.value).toBe('Pear')
    expect(event.target.name).toBe('fruit')
  })

  it('键盘触发的原生 input change 与鼠标点击共用同一选中路径', async () => {
    wrapper = mount(Radio, { props: { options: radioOptions, value: 'Apple' } })
    const secondInput = wrapper.findAll('input[type="radio"]')[1]
    await secondInput.trigger('change')
    const [value] = (wrapper.emitted('change')?.[0] ?? []) as [string, unknown]
    expect(value).toBe('Pear')
    // 受控回写：组件状态与原生选中态保持一致
    expect((secondInput.element as HTMLInputElement).checked).toBe(true)
  })
})

describe('RadioGroup 下发组级配置', () => {
  it('name 下发到组内每个原生 input', () => {
    wrapper = mount(RadioGroup, { props: { options: OPTIONS, value: 'Apple', name: 'fruit' } })
    const names = wrapper.findAll('input[type="radio"]').map((input) => input.attributes('name'))
    expect(names).toEqual(OPTIONS.map(() => 'fruit'))
  })

  it('按钮形态下 size 下发到组内各项', () => {
    wrapper = mount(RadioGroup, { props: { options: OPTIONS, value: 'Apple', optionType: 'button', size: 'small' } })
    expect(wrapper.findAll('.radio-button-small')).toHaveLength(OPTIONS.length)
  })

  it('组未指定 size 时，组内各项回落自身尺寸', async () => {
    wrapper = mount(RadioGroup, {
      props: { optionType: 'button' },
      slots: { default: () => h(Radio, { value: 'a', size: 'large' }, () => 'A') }
    })
    await nextTick()
    expect(wrapper.find('.radio-button-large').exists()).toBe(true)
  })

  it('组内选中项由组承载，单项不重复上报 change', async () => {
    wrapper = mount(RadioGroup, {
      props: { value: 'Apple' },
      slots: {
        default: () =>
          radioOptions.map((option) => h(Radio, { key: option.value, value: option.value }, () => option.label))
      }
    })
    await wrapper.findAll('label')[1].trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect((wrapper.emitted('change')?.[0] as string[])[0]).toBe('Pear')
  })
})

describe('Radio 选项名与实例方法', () => {
  it('选项名可传 VNode 并原样渲染', () => {
    wrapper = mount(Radio, {
      props: { options: [{ label: h('span', { class: 'vnode-label' }, 'Pear'), value: 'Pear' }] }
    })
    expect(wrapper.find('.vnode-label').text()).toBe('Pear')
  })

  it('暴露 focus / blur 并作用在原生 input 上', async () => {
    // 需挂载进真实文档：脱离文档的节点调用 focus() 不会成为 activeElement
    wrapper = mount(Radio, { props: { options: radioOptions, value: 'Apple' }, attachTo: document.body })
    const instance = wrapper.vm as unknown as { focus: () => void; blur: () => void }
    expect(typeof instance.focus).toBe('function')
    expect(typeof instance.blur).toBe('function')
    const input = wrapper.find('input[type="radio"]').element
    instance.focus()
    await nextTick()
    expect(document.activeElement).toBe(input)
    instance.blur()
    await nextTick()
    expect(document.activeElement).not.toBe(input)
  })

  it('调用 focus() 时补出焦点环标志（脚本聚焦不匹配 :focus-visible，需标志兜底）', async () => {
    wrapper = mount(Radio, { slots: { default: 'Radio' } })
    const instance = wrapper.vm as unknown as { focus: () => void; blur: () => void }
    instance.focus()
    await nextTick()
    expect(wrapper.find('.radio-container').classes()).toContain('radio-focused')
    instance.blur()
    await nextTick()
    expect(wrapper.find('.radio-container').classes()).not.toContain('radio-focused')
  })
})
