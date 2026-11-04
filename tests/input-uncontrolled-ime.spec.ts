import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount, type DOMWrapper, type VueWrapper } from '@vue/test-utils'
import Input from 'components/input/Input.vue'
import InputSearch from 'components/input-search/InputSearch.vue'
import Textarea from 'components/textarea/Textarea.vue'
import InputNumber from 'components/input-number/InputNumber.vue'

/**
 * 输入框「渲染镜像必须追随 DOM」的契约回归
 *
 * 写入真相源在 DOM：模板把 `innerValue`（渲染镜像）绑到原生 `input` 的 `value` 上，而 Vue 在补丁阶段
 * 对 `value` **不与前值比较、每次重渲染都写回 DOM**。因此凡是「DOM 已有文本、镜像却还落后」的时刻 ——
 * 未绑定 v-model 的非受控用法、输入法合成中的文本 —— 都会在下一次重渲染（悬浮 / 聚焦态变化即会触发）
 * 被写回旧值，表现为「输入中文后鼠标一移开内容就没了」。故用测试固化「各条输入路径都必须回写镜像」。
 */

// `ReturnType<typeof mount>` 会退化：mount 是重载泛型函数，ReturnType 取不到实际返回类型
let wrapper: VueWrapper | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

type Wrapper = VueWrapper

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

/**
 * 字数冻结（合成期）与「镜像不落后于 DOM」是两条独立契约，分别由 `countValue` 与
 * `innerValue` 承担。三个组件的承载方式不同（Input / InputSearch 是节点文本，
 * Textarea 是 `data-count` 属性 + CSS 伪元素），故用统一的访问器参数化。
 */
interface ImeTarget {
  name: string
  create: (extra?: Record<string, unknown>) => VueWrapper
  field: (w: Wrapper) => DOMWrapper<Element>
  count: (w: Wrapper) => string
  clear: (w: Wrapper) => Promise<void>
}

const IME_TARGETS: ImeTarget[] = [
  {
    name: 'Input',
    create: (extra = {}) => mount(Input, { props: { showCount: true, allowClear: true, ...extra } }),
    field: (w) => w.find('input.input-item'),
    count: (w) => w.find('.input-count').text(),
    clear: (w) => w.find('.input-actions').trigger('click')
  },
  {
    name: 'InputSearch',
    create: (extra = {}) => mount(InputSearch, { props: { showCount: true, allowClear: true, ...extra } }),
    field: (w) => w.find('input.input-search'),
    count: (w) => w.find('.input-search-count').text(),
    clear: (w) => w.find('.input-search-clear').trigger('click')
  },
  {
    name: 'Textarea',
    create: (extra = {}) => mount(Textarea, { props: { showCount: true, allowClear: true, ...extra } }),
    field: (w) => w.find('textarea.textarea-item'),
    count: (w) => w.find('.textarea-wrap').attributes('data-count') ?? '',
    clear: (w) => w.find('.clear-svg').trigger('click')
  }
]

const targetDomValue = (target: ImeTarget, w: Wrapper): string => (target.field(w).element as HTMLInputElement).value

/** 模拟任意一次与输入无关的重渲染（悬浮 / 加载态 / 父组件更新都会走到这里） */
async function forceRerender(w: Wrapper): Promise<void> {
  w.vm.$forceUpdate()
  await nextTick()
}

/** 合成期只写 DOM，不提交：字数必须停在旧值 */
async function composeTo(target: ImeTarget, w: Wrapper, text: string): Promise<void> {
  await target.field(w).trigger('compositionstart')
  ;(target.field(w).element as HTMLInputElement).value = text
  await target.field(w).trigger('input')
  await target.field(w).trigger('compositionend')
  await nextTick()
}

describe.each(IME_TARGETS)('$name 的字数与镜像双状态', (target) => {
  it('合成期字数冻结，确认选词后才更新', async () => {
    wrapper = target.create()
    expect(target.count(wrapper)).toBe('0')

    await target.field(wrapper).trigger('compositionstart')
    ;(target.field(wrapper).element as HTMLInputElement).value = 'zhong'
    await target.field(wrapper).trigger('input')
    expect(target.count(wrapper)).toBe('0')

    await target.field(wrapper).trigger('compositionend')
    await nextTick()
    expect(target.count(wrapper)).toBe('5')
  })

  it('合成期间发生重渲染也不抹掉尚未提交的拼音', async () => {
    wrapper = target.create()
    await target.field(wrapper).trigger('compositionstart')
    ;(target.field(wrapper).element as HTMLInputElement).value = 'zhong'
    await target.field(wrapper).trigger('input')

    await forceRerender(wrapper)
    expect(targetDomValue(target, wrapper)).toBe('zhong')
  })

  it('清除时镜像与字数同时归零', async () => {
    wrapper = target.create()
    await composeTo(target, wrapper, '中文')
    expect(target.count(wrapper)).toBe('2')

    await target.clear(wrapper)
    await nextTick()
    expect(targetDomValue(target, wrapper)).toBe('')
    expect(target.count(wrapper)).toBe('0')
  })

  it('受控时父改值 → DOM 与字数同时更新', async () => {
    wrapper = target.create({ value: 'abc' })
    expect(targetDomValue(target, wrapper)).toBe('abc')
    expect(target.count(wrapper)).toBe('3')

    await wrapper.setProps({ value: 'xyzw' })
    await nextTick()
    expect(targetDomValue(target, wrapper)).toBe('xyzw')
    expect(target.count(wrapper)).toBe('4')
  })
})

describe('InputNumber 的合成期防护', () => {
  const numberField = (w: Wrapper) => w.find('input.input-number')
  const numberDom = (w: Wrapper) => (numberField(w).element as HTMLInputElement).value

  it('合成期不解析半成品，合成结束把 `。` 纠正为小数点并落到显示上', async () => {
    wrapper = mount(InputNumber, { props: { precision: 1 } })
    await numberField(wrapper).trigger('compositionstart')
    ;(numberField(wrapper).element as HTMLInputElement).value = '1。5'
    await numberField(wrapper).trigger('input')
    expect(wrapper.emitted('update:value')).toBeUndefined()

    await numberField(wrapper).trigger('compositionend')
    await nextTick()
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([1.5])
    expect(numberDom(wrapper)).toBe('1.5')
  })

  it('合成期上下键用于选词，不触发步进', async () => {
    wrapper = mount(InputNumber)
    await numberField(wrapper).trigger('compositionstart')
    await numberField(wrapper).trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:value')).toBeUndefined()

    await numberField(wrapper).trigger('compositionend')
    await numberField(wrapper).trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual([1])
  })

  it('合成期父改 props 触发重渲染也不抹掉半成品', async () => {
    // `v-model="numValue"` 是这条结论的支撑（§7.7.4）：换成 :value 绑镜像就会失效
    wrapper = mount(InputNumber, { props: { width: 90 } })
    await numberField(wrapper).trigger('compositionstart')
    ;(numberField(wrapper).element as HTMLInputElement).value = '1。5'
    await numberField(wrapper).trigger('input')

    await wrapper.setProps({ width: 200 })
    expect(numberDom(wrapper)).toBe('1。5')
  })
})
