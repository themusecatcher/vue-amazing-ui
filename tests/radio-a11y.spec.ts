import { describe, it, expect, vi, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Radio from 'components/radio/Radio.vue'
import RadioButton from 'components/radio/radio-button/RadioButton.vue'
import RadioGroup from 'components/radio/radio-group/RadioGroup.vue'

/**
 * 单选组件「原生 input 承载」「change 事件对象」与「组级配置下发」的契约回归
 *
 * 每一项都渲染视觉隐藏的 `input[type=radio]`：键盘操作、表单字段名与屏幕阅读器语义均落在它上面，
 * 组级配置（`name` / `id` / `size` 等）由 `RadioGroup` 下发给组内各项；`change` 在原有的「新值」首参之后
 * 追加事件对象，使按原生事件写法编写的代码可直接迁移。这些均为不可见契约，故用测试固化。
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

  it('点击选项名：根节点上的 click 只触发一次，且选中态照常切换', async () => {
    let clickCount = 0
    wrapper = mount(Radio, {
      attrs: { onClick: () => (clickCount += 1) },
      slots: { default: 'Radio' }
    })
    await wrapper.find('.radio-label').trigger('click')
    // label 会把点击转发给原生 input，转发事件若不拦截会在根节点上再冒泡一次
    expect(clickCount).toBe(1)
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe(true)
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

  it('键盘触发的原生 input change 与鼠标点击共用同一选中路径', async () => {
    wrapper = mount(Radio, { props: { checked: false } })
    const input = wrapper.find('input[type="radio"]')
    await input.trigger('change')
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe(true)
    // 受控回写：组件状态与原生选中态保持一致
    expect((input.element as HTMLInputElement).checked).toBe(true)
  })
})

describe('RadioGroup 下发组级配置', () => {
  it('name 下发到组内每个原生 input', () => {
    wrapper = mount(RadioGroup, { props: { options: OPTIONS, value: 'Apple', name: 'fruit' } })
    const names = wrapper.findAll('input[type="radio"]').map((input) => input.attributes('name'))
    expect(names).toEqual(OPTIONS.map(() => 'fruit'))
  })

  it('id 前缀下发到组内每个原生 input', () => {
    wrapper = mount(RadioGroup, { props: { options: OPTIONS, id: 'fruit' } })
    const ids = wrapper.findAll('input[type="radio"]').map((input) => input.attributes('id'))
    expect(ids).toEqual(OPTIONS.map((_, index) => `fruit-${index}`))
  })

  it('autofocus 只落在 options 模式首项，避免多个元素竞争', () => {
    wrapper = mount(RadioGroup, { props: { options: OPTIONS, autofocus: true } })
    const autofocused = wrapper
      .findAll('input[type="radio"]')
      .map((input) => input.attributes('autofocus') !== undefined)
    expect(autofocused).toEqual([true, false, false])
  })

  it('options 模式默认插槽提供 option / label / index，可自定义选项名', () => {
    wrapper = mount(RadioGroup, {
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
    wrapper = mount(RadioGroup, {
      props: { options: [{ label: h('span', { class: 'vnode-label' }, 'Pear'), value: 'Pear' }] }
    })
    expect(wrapper.find('.vnode-label').text()).toBe('Pear')
  })

  it('选项缺省 label 时回落到选项值，不渲染 undefined', () => {
    const optionsWithoutLabel = [{ value: 'Pear' }] as unknown as { label: string; value: string }[]
    wrapper = mount(RadioGroup, { props: { options: optionsWithoutLabel } })
    expect(wrapper.find('.radio-label').text()).toBe('Pear')
  })

  it('按钮形态下 size 下发到组内各项', () => {
    wrapper = mount(RadioGroup, { props: { options: OPTIONS, value: 'Apple', button: true, size: 'small' } })
    expect(wrapper.findAll('.radio-button-small')).toHaveLength(OPTIONS.length)
  })

  it('组未指定 size 时，组内各项回落自身尺寸', async () => {
    wrapper = mount(RadioGroup, {
      props: { button: true },
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

  it('组内单项缺少 value 时无法选中，原生切换出的选中态按组件状态回写', async () => {
    wrapper = mount(RadioGroup, { slots: { default: () => h(Radio, () => 'A') } })
    const input = wrapper.find('input[type="radio"]')
    // 模拟浏览器在点击后先行切换原生选中态（change 事件随之触发）
    ;(input.element as HTMLInputElement).checked = true
    await input.trigger('change')
    expect((input.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('垂直排列时数组间距取垂直间距，不产出非法 CSS', () => {
    wrapper = mount(RadioGroup, { props: { options: OPTIONS, vertical: true, gap: [8, 16] } })
    expect(wrapper.find('.radio-group-wrap').attributes('style')).toContain('--radio-group-gap: 16px')
  })
})

describe('Radio 实例方法', () => {
  it('暴露 focus / blur 并作用在原生 input 上', async () => {
    // 需挂载进真实文档：脱离文档的节点调用 focus() 不会成为 activeElement
    wrapper = mount(Radio, { attachTo: document.body })
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

describe('RadioButton 实例方法', () => {
  it('暴露的 focus / blur 转发到内部原生 input 上', async () => {
    // 需挂载进真实文档：脱离文档的节点调用 focus() 不会成为 activeElement
    wrapper = mount(RadioButton, { attachTo: document.body, slots: { default: 'Radio Button' } })
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

  it('按钮形态的脚本聚焦与键盘聚焦均显示焦点环，鼠标按下撤销', async () => {
    wrapper = mount(RadioButton, { slots: { default: 'Radio Button' } })
    const instance = wrapper.vm as unknown as { focus: () => void; blur: () => void }
    const label = wrapper.find('label.radio-button-wrap')
    const input = wrapper.find('input[type="radio"]')
    const focusRing = async () => label.classes().includes('radio-focused')

    // 脚本 focus()：不匹配 :focus-visible，由 .radio-focused 兜底显示焦点环
    instance.focus()
    await nextTick()
    expect(await focusRing()).toBe(true)

    // 键盘聚焦（:focus-visible 命中）：focus 事件当下置位
    instance.blur()
    await nextTick()
    expect(await focusRing()).toBe(false)
    vi.spyOn(input.element as HTMLInputElement, 'matches').mockReturnValue(true)
    await input.trigger('focus')
    expect(await focusRing()).toBe(true)

    // 鼠标按下：浏览器不再给 :focus-visible，焦点环随之撤销（Tab 聚焦后点鼠标的场景）
    await label.trigger('mousedown')
    expect(await focusRing()).toBe(false)
    vi.restoreAllMocks()
  })

  it('圆点形态的焦点环规则与按钮形态一致', async () => {
    wrapper = mount(Radio, { slots: { default: 'Radio' } })
    const instance = wrapper.vm as unknown as { focus: () => void; blur: () => void }
    const label = wrapper.find('label.radio-container')
    instance.focus()
    await nextTick()
    expect(label.classes()).toContain('radio-focused')
    await label.trigger('mousedown')
    expect(label.classes()).not.toContain('radio-focused')
  })
})
