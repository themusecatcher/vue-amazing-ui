import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { h, nextTick, createTextVNode } from 'vue'
import type { VNode } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'
import type { LabeledValue, Option } from 'components/select/Select.vue'
import SelectOption from 'components/select/select-option'
import type { SelectOptionProps } from 'components/select/select-option'
import SelectOptGroup from 'components/select/select-optgroup'

/*
 * 子组件式选项契约（`SelectOption` / `SelectOptGroup` 标记组件）：
 * - 选项数据由 default 插槽解析而来：值为 value 属性（缺省回落 vnode key）
 * - 文本通道与渲染通道正交，互不覆盖：
 *   文本（label 字段）= label 属性（显式非空）> 插槽文本（折叠空白、裁剪首尾）；
 *   渲染 = 默认插槽函数原样输出，未提供插槽时才回落到文本
 * - 回填（触发器 / tag）按「optionLabelProp > 渲染源（插槽）> 文本」选源
 * - 分组以 `<SelectOptGroup>` 承载：标题文本取 label 属性 > #label 插槽文本 > key，渲染取 #label 插槽
 * - default 插槽存在时以插槽为准（本项目「插槽优先于 prop」约定）
 */
const BASE_OPTIONS: Option[] = [{ label: 'FromOptions', value: 'from-options' }]

let wrapper: ReturnType<typeof mount> | null = null

/*
 * 已知开发态告警：本文件以普通函数形式提供插槽（非模板编译产物），Vue 会提示
 * 「Slot "default" invoked outside of the render function」——以插槽作为数据源的固有代价（Descriptions 同款）。
 * 此处收敛告警并断言「除该已知告警外无其他告警」，避免掩盖真实问题
 */
const KNOWN_SLOT_WARN = 'invoked outside of the render function'
let warnings: string[] = []

beforeEach(() => {
  warnings = []
  vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
    warnings.push(args.map((arg) => String(arg)).join(' '))
  })
})

afterEach(() => {
  expect(warnings.filter((text) => !text.includes(KNOWN_SLOT_WARN))).toEqual([])
  vi.restoreAllMocks()
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

/** 等待「状态变更 → 面板渲染」稳定 */
async function flush(): Promise<void> {
  let prev = ''
  for (let turn = 0; turn < 20; turn++) {
    await nextTick()
    await new Promise<void>((resolve) => setTimeout(resolve, 0))
    const current = document.body.innerHTML
    if (current === prev) {
      return
    }
    prev = current
  }
}

/** 面板内「分组标题 + 选项」的文本顺序 */
function panelTexts(): string[] {
  return [...document.querySelectorAll('.select-option-group, .select-option')].map(
    (el) => el.textContent?.trim() ?? ''
  )
}

/** 构造 `<SelectOption>`：文本内容用文本节点（与模板编译产物一致） */
function optionNode(value: string | number, text?: string, props: Partial<SelectOptionProps> = {}): VNode {
  return h(
    SelectOption,
    { value, ...props },
    text === undefined ? undefined : { default: () => [createTextVNode(text)] }
  )
}

/** 构造 `<SelectOptGroup>`：label 属性 / #label 插槽 / 默认插槽（组内选项） */
function groupNode(label: string | undefined, children: VNode[], labelSlot?: () => VNode[]): VNode {
  const slots: Record<string, () => VNode[]> = { default: () => children }
  if (labelSlot) {
    slots.label = labelSlot
  }
  return h(SelectOptGroup, label === undefined ? {} : { label }, slots)
}

/** 点击面板中的第 index 个选项 */
async function clickOption(index: number): Promise<void> {
  const optionEl = document.querySelectorAll('.select-option')[index] as HTMLElement
  optionEl.click()
  await flush()
}

describe('Select 子组件式选项（default 插槽）', () => {
  it('解析并渲染文本 label，点击后派发选中值', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true },
      slots: { default: () => [optionNode('jack', 'Jack'), optionNode('lucy', 'Lucy')] }
    })
    await flush()

    expect(panelTexts()).toEqual(['Jack', 'Lucy'])
    await clickOption(1)
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['lucy'])
    // change 第 2 参为完整选项对象（label 由默认插槽求值而来）
    expect(wrapper.emitted('change')?.at(-1)?.[1]).toMatchObject({ value: 'lucy', label: 'Lucy' })
  })

  it('default 插槽存在时以插槽为准（不取 options）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: BASE_OPTIONS, defaultOpen: true },
      slots: { default: () => [optionNode('jack', 'Jack')] }
    })
    await flush()

    expect(panelTexts()).toEqual(['Jack'])
  })

  it('label 属性只覆盖文本通道，渲染仍取默认插槽（富内容不被清除）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true, defaultValue: 'jack' },
      slots: {
        default: () => [
          h(
            SelectOption,
            { value: 'jack', label: 'LabelProp' },
            { default: () => [h('i', { class: 'fake-icon' }), createTextVNode('Jack')] }
          ),
          optionNode('lucy', 'Lucy')
        ]
      }
    })
    await flush()

    // 渲染通道：面板保留富内容
    const optionEl = document.querySelector('.select-option') as HTMLElement
    expect(optionEl.querySelector('.fake-icon')).not.toBeNull()
    // 文本通道：title 取 label 属性
    expect(optionEl.getAttribute('title')).toBe('LabelProp')
    // 回填：渲染源仍是插槽（富内容），title 取文本
    const trigger = document.querySelector('.select-item') as HTMLElement
    expect(trigger.querySelector('.fake-icon')).not.toBeNull()
    expect(trigger.getAttribute('title')).toBe('LabelProp')

    // 事件载荷的 label 同样取文本通道（先切到另一项再切回，避免单选重复选中不派发）
    await clickOption(1)
    await clickOption(0)
    expect(wrapper.emitted('change')?.at(-1)?.[1]).toMatchObject({ value: 'jack', label: 'LabelProp' })
  })

  it('插槽文本折叠空白并裁剪首尾（模板折行不污染文本通道）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true, value: 'jack' },
      slots: {
        default: () => [
          h(
            SelectOption,
            { value: 'jack' },
            {
              default: () => [createTextVNode('\n  '), h('i', { class: 'fake-icon' }), createTextVNode(' Jack \n  ')]
            }
          )
        ]
      }
    })
    await flush()

    expect(document.querySelector('.select-option')?.getAttribute('title')).toBe('Jack')
    expect(document.querySelector('.select-item')?.getAttribute('title')).toBe('Jack')
  })

  it('label 属性首尾空白不影响文本通道：全空白视为未提供，其余裁剪后使用', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true, value: 'jack' },
      slots: {
        default: () => [
          h(SelectOption, { value: 'jack', label: '   ' }, { default: () => [createTextVNode('Jack')] }),
          h(SelectOption, { value: 'lucy', label: '  Lucy  ' }, { default: () => [createTextVNode('lucy-rich')] })
        ]
      }
    })
    await flush()

    const optionEls = [...document.querySelectorAll('.select-option')]
    expect(optionEls[0].getAttribute('title')).toBe('Jack')
    expect(optionEls[1].getAttribute('title')).toBe('Lucy')
  })

  it('纯图标插槽 + label 属性：图标可渲染，文本通道仍有可用文本（过滤 / title）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        defaultOpen: true,
        value: 'jack',
        showSearch: true,
        optionFilterProp: 'label',
        searchValue: 'jac'
      },
      slots: {
        default: () => [
          h(SelectOption, { value: 'jack', label: 'Jack' }, { default: () => [h('i', { class: 'fake-icon' })] }),
          h(SelectOption, { value: 'lucy', label: 'Lucy' }, { default: () => [h('i', { class: 'fake-icon' })] })
        ]
      }
    })
    await flush()

    // 过滤命中（文本通道取 label 属性）；图标仍在
    const optionEls = [...document.querySelectorAll('.select-option')]
    expect(optionEls).toHaveLength(1)
    expect(optionEls[0].querySelector('.fake-icon')).not.toBeNull()
    expect(optionEls[0].getAttribute('title')).toBe('Jack')
  })

  it('显式 optionLabelProp 接管回填：触发器取字段文本，面板仍渲染插槽', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true, value: 'jack', optionLabelProp: 'label' },
      slots: {
        default: () => [
          h(
            SelectOption,
            { value: 'jack', label: 'JackText' },
            { default: () => [h('i', { class: 'fake-icon' }), createTextVNode(' JackRich ')] }
          )
        ]
      }
    })
    await flush()

    const trigger = document.querySelector('.select-item') as HTMLElement
    expect(trigger.querySelector('.fake-icon')).toBeNull()
    expect(trigger.textContent?.trim()).toBe('JackText')
    // 面板不受 optionLabelProp 影响
    expect(document.querySelector('.select-option .fake-icon')).not.toBeNull()
  })

  it('labelInValue：label 取文本通道，originLabel 保留渲染源', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true, labelInValue: true },
      slots: {
        default: () => [
          h(
            SelectOption,
            { value: 'jack', label: 'LabelProp' },
            {
              default: () => [h('i', { class: 'fake-icon' }), createTextVNode(' Jack ')]
            }
          )
        ]
      }
    })
    await flush()

    await clickOption(0)
    const payload = wrapper.emitted('change')?.at(-1)?.[0] as LabeledValue
    expect(payload.label).toBe('LabelProp')
    expect(typeof payload.originLabel).toBe('function')
  })

  it('未提供 value 时回落 vnode key', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true },
      slots: { default: () => [h(SelectOption, { key: 'jack-key' }, { default: () => [createTextVNode('Jack')] })] }
    })
    await flush()

    await clickOption(0)
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['jack-key'])
  })

  it('disabled 静态属性（编译为空串）视为禁用，点击不派发变更', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true },
      // 模板里的静态属性 `disabled` 编译产物是空串（而非 true），此处按编译产物构造入参
      slots: {
        default: () => [optionNode('jack', 'Jack', { disabled: '' as unknown as boolean }), optionNode('lucy', 'Lucy')]
      }
    })
    await flush()

    expect(document.querySelectorAll('.select-option.option-disabled')).toHaveLength(1)
    await clickOption(0)
    expect(wrapper.emitted('update:value')).toBeUndefined()
  })

  it('默认插槽为富内容（图标 + 文本）时原样渲染，label 字段取纯文本', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true },
      slots: {
        default: () => [
          h(
            SelectOption,
            { value: 'jack' },
            { default: () => [h('i', { class: 'fake-icon' }), createTextVNode('Jack')] }
          )
        ]
      }
    })
    await flush()

    expect(document.querySelector('.select-option .fake-icon')).not.toBeNull()
    expect(panelTexts()).toEqual(['Jack'])
  })

  it('子组件式选项参与搜索过滤（optionFilterProp=label 时按插槽文本匹配）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true, showSearch: true, optionFilterProp: 'label', searchValue: 'lu' },
      slots: { default: () => [optionNode('jack', 'Jack'), optionNode('lucy', 'Lucy')] }
    })
    await flush()

    expect(panelTexts()).toEqual(['Lucy'])
  })

  it('多选下子组件式选项以 tag 呈现，标签内容取插槽渲染结果', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: ['jack'] },
      slots: {
        default: () => [
          h(
            SelectOption,
            { value: 'jack' },
            { default: () => [h('i', { class: 'fake-icon' }), createTextVNode('Jack')] }
          )
        ]
      }
    })
    await flush()

    const tag = document.querySelector('.select-selection-item-content')
    expect(tag?.querySelector('.fake-icon')).not.toBeNull()
    expect(tag?.textContent?.trim()).toBe('Jack')
  })

  it('多选下点击子组件式选项切换选中并派发数组值', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: [], defaultOpen: true },
      slots: { default: () => [optionNode('jack', 'Jack'), optionNode('lucy', 'Lucy')] }
    })
    await flush()

    await clickOption(0)
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([['jack']])
    // 多选选中后面板保持展开（约定）
    expect(document.querySelectorAll('.select-option').length).toBe(2)
  })
})

describe('Select 子组件式分组（SelectOptGroup）', () => {
  it('渲染分组标题与组内选项，标题不可选中且子项带缩进类', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true },
      slots: {
        default: () => [
          groupNode('Manager', [optionNode('jack', 'Jack'), optionNode('lucy', 'Lucy')]),
          groupNode('Engineer', [optionNode('yiminghe', 'yiminghe')])
        ]
      }
    })
    await flush()

    expect(panelTexts()).toEqual(['Manager', 'Jack', 'Lucy', 'Engineer', 'yiminghe'])
    expect(document.querySelectorAll('.select-option.option-grouped')).toHaveLength(3)
    expect(document.querySelector('.select-option-group.option-grouped')).toBeNull()
  })

  it('组内选项按扁平顺序参与选中（跨组不重复渲染标题）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true },
      slots: {
        default: () => [
          groupNode('Manager', [optionNode('jack', 'Jack'), optionNode('lucy', 'Lucy')]),
          groupNode('Engineer', [optionNode('yiminghe', 'yiminghe')])
        ]
      }
    })
    await flush()

    await clickOption(2)
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['yiminghe'])
  })

  it('#label 插槽渲染富内容（图标 + 文本），label 字段取纯文本', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true },
      slots: {
        default: () => [
          groupNode(undefined, [optionNode('jack', 'Jack')], () => [
            h('span', null, [h('i', { class: 'fake-group-icon' }), createTextVNode(' Manager')])
          ])
        ]
      }
    })
    await flush()

    const groupEl = document.querySelector('.select-option-group')
    expect(groupEl?.querySelector('.fake-group-icon')).not.toBeNull()
    expect(groupEl?.textContent?.trim()).toBe('Manager')
  })

  it('未见 #label 插槽时标题取 label 属性', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true },
      slots: { default: () => [groupNode('Manager', [optionNode('jack', 'Jack')])] }
    })
    await flush()

    expect(document.querySelector('.select-option-group')?.textContent?.trim()).toBe('Manager')
  })

  it('label 属性与 #label 插槽同时提供时：#label 插槽仍负责渲染，label 属性只覆盖文本', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { defaultOpen: true },
      slots: {
        default: () => [
          groupNode('Manager', [optionNode('jack', 'Jack')], () => [h('i', { class: 'fake-group-icon' })])
        ]
      }
    })
    await flush()

    const groupEl = document.querySelector('.select-option-group')
    // 渲染通道：图标仍在（label 属性不再清空 #label 插槽）
    expect(groupEl?.querySelector('.fake-group-icon')).not.toBeNull()
    expect(groupEl?.textContent?.trim()).toBe('')
  })
})
