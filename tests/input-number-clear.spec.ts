import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import InputNumber from 'components/input-number/InputNumber.vue'

/**
 * 数字输入框的「空值」语义
 *
 * 口径：
 * - `value` 不传（undefined）→ 非受控，组件自持；
 * - `value` 传 null → 受控的空值，清空 / 失焦后保持空，不再回填旧值；
 * - 用户清空输入 → 上报 null（而非 undefined），受控时由父决定是否接受；
 * - 空值步进按 0 起算，再受 min / max 钳制。
 *
 * 输入与失焦分开模拟：原生 `input` 事件对应逐字符输入，`change` 对应失焦提交，
 * 两者都会改变显示（`setValue` 会顺带触发 `change`，无法区分）。
 */
let wrapper: VueWrapper | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

const field = (w: VueWrapper) => w.find('input.input-number')
const domValue = (w: VueWrapper) => (field(w).element as HTMLInputElement).value

// 模拟浏览器里的清空输入：直接改 DOM 再派发 input，v-model 与组件监听都按原生顺序执行
async function clearInput(w: VueWrapper): Promise<void> {
  ;(field(w).element as HTMLInputElement).value = ''
  await field(w).trigger('input')
}

describe('InputNumber 清空语义', () => {
  it('受控时清空上报 null，父回写 null 后显示保持空', async () => {
    wrapper = mount(InputNumber, { props: { value: 5 } })
    await clearInput(wrapper)
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([null])

    await wrapper.setProps({ value: null })
    await nextTick()
    expect(domValue(wrapper)).toBe('')

    await field(wrapper).trigger('change')
    await nextTick()
    expect(domValue(wrapper)).toBe('')
    // 父已回写空值，不重复上报
    expect(wrapper.emitted('update:value')).toHaveLength(1)
  })

  it('受控时清空但父不接受 null：输入期显示为空，失焦回填父值', async () => {
    wrapper = mount(InputNumber, { props: { value: 5 } })
    await clearInput(wrapper)
    expect(domValue(wrapper)).toBe('')

    await field(wrapper).trigger('change')
    await nextTick()
    expect(domValue(wrapper)).toBe('5')
  })

  it('非受控时清空后保持空，不失焦回填 0', async () => {
    wrapper = mount(InputNumber, { props: { defaultValue: 5 } })
    await clearInput(wrapper)
    expect(domValue(wrapper)).toBe('')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([null])

    await field(wrapper).trigger('change')
    await nextTick()
    expect(domValue(wrapper)).toBe('')
  })

  it('defaultValue 传 null 时首屏为空', () => {
    wrapper = mount(InputNumber, { props: { defaultValue: null } })
    expect(domValue(wrapper)).toBe('')
  })
})

describe('InputNumber 空值步进', () => {
  it('受控空值从 0 起算，并按 min 钳制', async () => {
    wrapper = mount(InputNumber, { props: { value: null, min: 2 } })
    await wrapper.find('.up-arrow').trigger('click')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([2])
  })

  it('受控空值从 0 起算，并按 max 钳制', async () => {
    wrapper = mount(InputNumber, { props: { value: null, step: 5, max: 3 } })
    await wrapper.find('.up-arrow').trigger('click')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([3])
  })

  it('非受控空值步进同样从 0 起算', async () => {
    wrapper = mount(InputNumber, { props: { defaultValue: null } })
    await wrapper.find('.down-arrow').trigger('click')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([-1])
  })
})
