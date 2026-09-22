import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { h, nextTick, createTextVNode } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'
import type { Option } from 'components/select/Select.vue'
import SelectOption from 'components/select/select-option'

/**
 * labelInValue 契约：
 * - v-model:value 入参可为 `{ label, value, key }` 对象：内部按 `value ?? key` 归一为原始值参与匹配
 * - 回填文本优先取入参 label（远程回显场景：label 可能已不在 options 中）
 * - change / select / deselect 的 value 位在开启时包装为 `{ label, value, key, originLabel }`
 * - 子组件式写法下 originLabel 保留默认插槽函数（文档口径）
 * - 关闭时行为与既有实现完全一致（回归保障）
 */
const OPTIONS: Option[] = [
  { label: 'Jack', value: 'jack' },
  { label: 'Lucy', value: 'lucy' }
]

let wrapper: ReturnType<typeof mount> | null = null

/**
 * 已知开发态告警：以普通函数形式提供插槽（非模板编译产物）时，Vue 会提示
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
  document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
})

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

async function clickOption(index: number): Promise<void> {
  const optionEl = document.querySelectorAll('.select-option')[index] as HTMLElement
  optionEl.click()
  await flush()
}

describe('Select labelInValue', () => {
  it('对象形式的 value 归一为原始值参与选中与回填', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { labelInValue: true, value: { value: 'lucy', label: 'Lucy (101)' }, options: OPTIONS }
    })
    await flush()

    expect(wrapper.find('.select-item').text()).toBe('Lucy (101)')
  })

  it('回填文本优先取入参 label（即使该值不在 options 中）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { labelInValue: true, value: { value: 'removed', label: '历史快照' }, options: OPTIONS }
    })
    await flush()

    expect(wrapper.find('.select-item').text()).toBe('历史快照')
  })

  it('change / select 载荷包装为 { label, value, key, originLabel }', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { labelInValue: true, options: OPTIONS, defaultOpen: true }
    })
    await flush()

    await clickOption(1)
    const changeValue = wrapper.emitted('change')?.at(-1)?.[0]
    expect(changeValue).toMatchObject({ value: 'lucy', label: 'Lucy', key: 'lucy', originLabel: 'Lucy' })
    expect(wrapper.emitted('update:value')?.at(-1)?.[0]).toMatchObject({ value: 'lucy', label: 'Lucy' })
    expect(wrapper.emitted('select')?.at(-1)?.[0]).toMatchObject({ value: 'lucy', label: 'Lucy' })
  })

  it('受控值已是该项时点击不派发 change，但仍派发 select', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { labelInValue: true, value: { value: 'jack', label: 'Jack' }, options: OPTIONS, defaultOpen: true }
    })
    await flush()

    await clickOption(0)
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('select')?.at(-1)?.[0]).toMatchObject({ value: 'jack' })
  })

  it('多选下 update:value 与 change 均为对象数组，清除回落空数组', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { labelInValue: true, mode: 'multiple', value: [], options: OPTIONS, defaultOpen: true }
    })
    await flush()

    await clickOption(0)
    const nextValue = wrapper.emitted('update:value')?.at(-1)?.[0] as unknown[]
    expect(nextValue).toHaveLength(1)
    expect(nextValue[0]).toMatchObject({ value: 'jack', label: 'Jack' })

    const changePayload = wrapper.emitted('change')?.at(-1)?.[0] as unknown[]
    expect(changePayload[0]).toMatchObject({ value: 'jack', label: 'Jack' })
  })

  it('多选下移除 tag 时 deselect 载荷为对象', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { labelInValue: true, mode: 'multiple', value: ['jack'], options: OPTIONS }
    })
    await flush()

    const removeEl = document.querySelector('.select-selection-item-remove') as HTMLElement
    removeEl.click()
    await flush()

    expect(wrapper.emitted('deselect')?.at(-1)?.[0]).toMatchObject({ value: 'jack', label: 'Jack' })
    expect(wrapper.emitted('update:value')?.at(-1)?.[0]).toEqual([])
  })

  it('子组件式写法下 originLabel 保留默认插槽函数', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { labelInValue: true, defaultOpen: true },
      slots: {
        default: () => [h(SelectOption, { value: 'jack' }, { default: () => [createTextVNode('Jack')] })]
      }
    })
    await flush()

    await clickOption(0)
    const changeValue = wrapper.emitted('change')?.at(-1)?.[0] as { label: unknown; originLabel: unknown }
    expect(changeValue.label).toBe('Jack')
    expect(typeof changeValue.originLabel).toBe('function')
  })

  it('关闭 labelInValue 时载荷仍为原始值（回归）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: OPTIONS, defaultOpen: true }
    })
    await flush()

    await clickOption(1)
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['lucy'])
    expect(wrapper.emitted('change')?.at(-1)?.[0]).toBe('lucy')
  })
})
