import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount, type DOMWrapper, type VueWrapper } from '@vue/test-utils'
import Input from 'components/input/Input.vue'
import InputSearch from 'components/input-search/InputSearch.vue'
import Textarea from 'components/textarea/Textarea.vue'
import InputNumber from 'components/input-number/InputNumber.vue'
import Select from 'components/select/Select.vue'
import DatePicker from 'components/date-picker/DatePicker.vue'
import TimePicker from 'components/time-picker/TimePicker.vue'
import Rate from 'components/rate/Rate.vue'
import Segmented from 'components/segmented/Segmented.vue'
import RadioGroup from 'components/radio/radio-group/RadioGroup.vue'
import CheckboxGroup from 'components/checkbox/checkbox-group/CheckboxGroup.vue'
import Upload from 'components/upload/Upload.vue'

/**
 * 取值类字段的非受控入口（`defaultValue` / `defaultFileList`）
 *
 * 契约（见 development/component-design.md 的「v-model 声明约定」）：
 * - 父不传值 → 组件自持，`defaultValue` 决定初值，交互照常生效；
 * - 父传了值 → 受控，`defaultValue` 被忽略；
 * - 父从「传值」改为「不传值」→ 保留最后值，不回退到 `defaultValue`。
 *
 * 原生表单四件套是手写实现（不走 `useControlledModel`），故单列参数化用例覆盖
 * 「初值可编辑」「越界回显」「步进基准」这类只有手写分支才会出错的路径。
 */
let wrapper: VueWrapper | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

type Wrapper = VueWrapper

function setDom(el: DOMWrapper<Element>, value: string): void {
  ;(el.element as HTMLInputElement).value = value
}

interface InputCase {
  name: string
  create: (props: Record<string, unknown>) => Wrapper
  field: (w: Wrapper) => DOMWrapper<Element>
  /** 传入的 defaultValue */
  sample: string | number
  /** 首屏应显示的文本 */
  sampleText: string
  /** 键入的文本 */
  typed: string
  /** 键入后应上报的载荷 */
  typedPayload: unknown
}

const INPUT_CASES: InputCase[] = [
  {
    name: 'Input',
    create: (props) => mount(Input, { props }),
    field: (w) => w.find('input.input-item'),
    sample: '初值',
    sampleText: '初值',
    typed: '用户输入',
    typedPayload: '用户输入'
  },
  {
    name: 'InputSearch',
    create: (props) => mount(InputSearch, { props }),
    field: (w) => w.find('input.input-search'),
    sample: '初值',
    sampleText: '初值',
    typed: '用户输入',
    typedPayload: '用户输入'
  },
  {
    name: 'Textarea',
    create: (props) => mount(Textarea, { props }),
    field: (w) => w.find('textarea.textarea-item'),
    sample: '初值',
    sampleText: '初值',
    typed: '用户输入',
    typedPayload: '用户输入'
  },
  {
    name: 'InputNumber',
    create: (props) => mount(InputNumber, { props }),
    field: (w) => w.find('input.input-number'),
    sample: 5,
    sampleText: '5',
    typed: '8',
    typedPayload: 8
  }
]

const domValue = (c: InputCase, w: Wrapper): string => (c.field(w).element as HTMLInputElement).value

describe.each(INPUT_CASES)('$name 的 defaultValue', (c) => {
  it('不传 value 时首屏显示初值，且照常可编辑、可上报', async () => {
    wrapper = c.create({ defaultValue: c.sample })
    expect(domValue(c, wrapper)).toBe(c.sampleText)

    setDom(c.field(wrapper), c.typed)
    await c.field(wrapper).trigger('input')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([c.typedPayload])
    expect(domValue(c, wrapper)).toBe(c.typed)
  })

  it('同时传 value 与 defaultValue 时以 value 为准', async () => {
    wrapper = c.create({ value: c.sample, defaultValue: c.name === 'InputNumber' ? 99 : '另一个初值' })
    expect(domValue(c, wrapper)).toBe(c.sampleText)
  })

  it('父从传值改为不传值后保留最后值，不回退到 defaultValue', async () => {
    wrapper = c.create({ value: c.sample, defaultValue: c.name === 'InputNumber' ? 99 : '另一个初值' })
    setDom(c.field(wrapper), c.typed)
    await c.field(wrapper).trigger('input')

    await wrapper.setProps({ value: undefined })
    await nextTick()
    expect(domValue(c, wrapper)).toBe(c.typed)
  })
})

describe('InputNumber 的非受控路径', () => {
  const field = (w: Wrapper) => w.find('input.input-number')
  const dom = (w: Wrapper): string => (field(w).element as HTMLInputElement).value

  it('初值与受控路径同口径：先按 precision / formatter 处理再显示', () => {
    wrapper = mount(InputNumber, { props: { defaultValue: 5, precision: 2 } })
    expect(dom(wrapper)).toBe('5.00')

    wrapper.unmount()
    wrapper = mount(InputNumber, {
      props: { defaultValue: 5, precision: 1, formatter: (value: string | number) => `$ ${value}` }
    })
    expect(dom(wrapper)).toBe('$ 5.0')
  })

  it('点击上下箭头以当前显示值为基准步进，并回写显示', async () => {
    wrapper = mount(InputNumber, { props: { defaultValue: 5 } })
    await wrapper.find('.up-arrow').trigger('click')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([6])
    expect(dom(wrapper)).toBe('6')

    await wrapper.find('.down-arrow').trigger('click')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([5])
    expect(dom(wrapper)).toBe('5')
  })

  it('越界输入钳制后回显，非法文本失焦不清空输入框', async () => {
    wrapper = mount(InputNumber, { props: { defaultValue: 5, max: 100 } })
    setDom(field(wrapper), '999')
    await field(wrapper).trigger('input')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([100])
    expect(dom(wrapper)).toBe('100')

    setDom(field(wrapper), 'abc')
    await field(wrapper).trigger('change')
    expect(dom(wrapper)).not.toBe('')
  })
})

describe('Textarea 的 autoSize 与非受控输入', () => {
  /** jsdom 无布局，`scrollHeight` 恒为 0：按行数造一个可预测的值 */
  function stubScrollHeight(): () => void {
    const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight')
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get(this: HTMLElement): number {
        const text = (this as HTMLTextAreaElement).value ?? ''
        return (text === '' ? 1 : text.split('\n').length) * 20
      }
    })
    return () => {
      if (descriptor) Object.defineProperty(HTMLElement.prototype, 'scrollHeight', descriptor)
    }
  }

  const textareaHeight = (w: Wrapper): string => (w.find('textarea.textarea-item').element as HTMLElement).style.height

  it('首屏高度按 defaultValue 计算', async () => {
    const restore = stubScrollHeight()
    try {
      wrapper = mount(Textarea, { props: { autoSize: true, defaultValue: 'a\nb\nc' } })
      await nextTick()
      await nextTick()
      expect(textareaHeight(wrapper)).toBe('62px')
    } finally {
      restore()
    }
  })

  it('非受控输入时高度随内容增长', async () => {
    const restore = stubScrollHeight()
    try {
      wrapper = mount(Textarea, { props: { autoSize: true } })
      await nextTick()
      await nextTick()
      expect(textareaHeight(wrapper)).toBe('22px')

      const field = wrapper.find('textarea.textarea-item')
      setDom(field, 'a\nb\nc')
      await field.trigger('input')
      await nextTick()
      expect(textareaHeight(wrapper)).toBe('62px')
    } finally {
      restore()
    }
  })
})

describe('其余双模组件的 defaultValue', () => {
  it('Select：defaultValue 选中对应选项并回填文本', () => {
    wrapper = mount(Select, {
      props: {
        defaultValue: 'shanghai',
        options: [
          { label: '北京市', value: 'beijing' },
          { label: '上海市', value: 'shanghai' }
        ]
      }
    })
    expect(wrapper.text()).toContain('上海市')
  })

  it('DatePicker：defaultValue 渲染为格式化文本', () => {
    const day = new Date(2026, 0, 15).getTime()
    wrapper = mount(DatePicker, { props: { defaultValue: day } })
    const input = wrapper.find('input.picker-trigger-input-inner')
    expect((input.element as HTMLInputElement).value).toContain('2026-01-15')
  })

  it('TimePicker：defaultValue 渲染为格式化文本', () => {
    const moment = new Date(2026, 0, 15, 9, 30, 5).getTime()
    wrapper = mount(TimePicker, { props: { defaultValue: moment } })
    const input = wrapper.find('input.picker-trigger-input-inner')
    expect((input.element as HTMLInputElement).value).toContain('09:30:05')
  })

  it('Rate：defaultValue 点亮对应数量的星标', () => {
    wrapper = mount(Rate, { props: { defaultValue: 3 } })
    expect(wrapper.findAll('.rate-star.star-full')).toHaveLength(3)
  })

  it('Segmented：defaultValue 选中对应选项', () => {
    wrapper = mount(Segmented, { props: { defaultValue: 'B', options: ['A', 'B', 'C'] } })
    expect(wrapper.find('.segmented-item-selected').text()).toBe('B')
  })

  it('RadioGroup / CheckboxGroup：defaultValue 生效', async () => {
    wrapper = mount(RadioGroup, {
      props: {
        defaultValue: 'banana',
        options: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' }
        ]
      }
    })
    const radios = wrapper.findAll('input[type="radio"]')
    expect((radios[1].element as HTMLInputElement).checked).toBe(true)

    wrapper.unmount()
    wrapper = mount(CheckboxGroup, {
      props: {
        defaultValue: ['banana'],
        options: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' }
        ]
      }
    })
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    expect((checkboxes[1].element as HTMLInputElement).checked).toBe(true)
  })

  it('Upload：defaultFileList 预填文件列表', async () => {
    wrapper = mount(Upload, {
      props: {
        defaultFileList: [
          { name: 'a.txt', url: 'https://example.com/a.txt' },
          { name: 'b.txt', url: 'https://example.com/b.txt' }
        ]
      }
    })
    await nextTick()
    expect(wrapper.findAll('.file-preview')).toHaveLength(2)
  })
})
