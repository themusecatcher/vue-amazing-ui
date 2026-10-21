import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Input from 'components/input/Input.vue'

/**
 * 输入框「内部值是 DOM 值唯一支撑」的契约回归
 *
 * `inputValue` 是组件内部唯一真源，模板把它绑到原生 `input` 的 `value` 上；Vue 在补丁阶段对 `value`
 * **不与前值比较、每次重渲染都写回 DOM**。因此凡是「DOM 已有文本、内部值却还落后」的时刻 —— 未绑定
 * v-model 的非受控用法、输入法合成中的文本 —— 都会在下一次重渲染（悬浮 / 聚焦态变化即会触发）被写回
 * 旧值，表现为「输入中文后鼠标一移开内容就没了」。故用测试固化「各条输入路径都必须回写内部值」。
 */

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

type Wrapper = NonNullable<typeof wrapper>

const field = (w: Wrapper) => w.find('input.input-item')
const domValue = (w: Wrapper) => (field(w).element as HTMLInputElement).value

/** 与输入无关的一次重渲染：悬浮态变化会改写 class，从而触发补丁 */
async function rerender(w: Wrapper): Promise<void> {
  await w.find('.input-container').trigger('mouseenter')
  await w.find('.input-container').trigger('mouseleave')
  await nextTick()
}

/** 输入法合成全流程：compositionstart → input → compositionend（结束时组件会补发一次 change） */
async function compose(w: Wrapper, text: string): Promise<void> {
  await field(w).trigger('compositionstart')
  ;(field(w).element as HTMLInputElement).value = text
  await field(w).trigger('input')
  await field(w).trigger('compositionend')
  await nextTick()
}

describe('Input 未绑定 v-model 时的输入承载', () => {
  it('输入法提交的文本在重渲染后不被清空', async () => {
    wrapper = mount(Input, { props: { placeholder: '请输入' } })
    await compose(wrapper, '中文')
    expect(domValue(wrapper)).toBe('中文')
    await rerender(wrapper)
    expect(domValue(wrapper)).toBe('中文')
  })

  it('合成过程中重渲染也不抹掉尚未提交的文本', async () => {
    wrapper = mount(Input)
    await field(wrapper).trigger('compositionstart')
    ;(field(wrapper).element as HTMLInputElement).value = 'zhong'
    await field(wrapper).trigger('input')
    await rerender(wrapper)
    expect(domValue(wrapper)).toBe('zhong')
  })

  it('合成期间不对外上报，合成结束统一派发一次', async () => {
    wrapper = mount(Input)
    await compose(wrapper, '中文')
    expect(wrapper.emitted('update:value')).toHaveLength(1)
    expect(wrapper.emitted('change')).toHaveLength(1)
  })

  it('普通键入同样回写内部值，重渲染后保留', async () => {
    wrapper = mount(Input)
    ;(field(wrapper).element as HTMLInputElement).value = 'hello'
    await field(wrapper).trigger('input')
    await rerender(wrapper)
    expect(domValue(wrapper)).toBe('hello')
  })
})

describe('Input 受控用法不受影响', () => {
  it('绑定值渲染到 DOM，键入后上报新值', async () => {
    wrapper = mount(Input, { props: { value: 'abc' } })
    expect(domValue(wrapper)).toBe('abc')
    ;(field(wrapper).element as HTMLInputElement).value = 'abcd'
    await field(wrapper).trigger('input')
    const [first] = (wrapper.emitted('update:value') ?? []) as [string][]
    expect(first[0]).toBe('abcd')
  })

  it('绑定值变化时同步到 DOM', async () => {
    wrapper = mount(Input, { props: { value: 'abc' } })
    await wrapper.setProps({ value: 'xyz' })
    expect(domValue(wrapper)).toBe('xyz')
  })
})
