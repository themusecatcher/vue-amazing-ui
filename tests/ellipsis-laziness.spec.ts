import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Tooltip from 'components/tooltip'
import Ellipsis from 'components/ellipsis'

/**
 * Ellipsis 浮层实例惰性挂载回归守护
 *
 * 背景：Ellipsis 无条件挂载 `Tooltip`，即使文本未溢出、或使用者传入 `tooltip: false`，
 * 也会常驻浮层实例（Popup 宿主、ResizeObserver 与两层包裹 DOM）。Table 的每个省略单元格
 * 都会创建一个 Ellipsis，实例数随「行数 × 省略列数」放大，故改为「确有提示需求时才挂载」。
 *
 * 断言口径：只校验实例是否创建与关键状态，不涉及真实布局；溢出需在用例内显式 mock 尺寸
 * （happy-dom 无排版能力，scrollWidth / clientWidth 恒为 0）。
 */
let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

/** 构造「已溢出」：scrollWidth 大于 clientWidth */
function stubOverflow(w: ReturnType<typeof mount>): void {
  const el = w.find('.ellipsis-container').element as HTMLElement
  Object.defineProperty(el, 'scrollWidth', { value: 200, configurable: true })
  Object.defineProperty(el, 'clientWidth', { value: 100, configurable: true })
  Object.defineProperty(el, 'offsetWidth', { value: 100, configurable: true })
}

/** 触发一次溢出判定（测量由 props / 尺寸变化驱动） */
async function remeasure(w: ReturnType<typeof mount>): Promise<void> {
  stubOverflow(w)
  await w.setProps({ maxWidth: 60 })
  await nextTick()
  await nextTick()
}

describe('Ellipsis：按需挂载 Tooltip', () => {
  it('未溢出时不创建实例，文本容器照常渲染', async () => {
    wrapper = mount(Ellipsis, { slots: { default: () => '短文本' } })
    await nextTick()
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(0)
    expect(wrapper.find('.ellipsis-container').exists()).toBe(true)
    expect(wrapper.find('.tooltip-wrap').exists()).toBe(false)
  })

  it('溢出时创建实例', async () => {
    wrapper = mount(Ellipsis, { slots: { default: () => '很长的文本' } })
    await nextTick()
    await remeasure(wrapper)
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(1)
  })

  it('tooltip: false 时即使溢出也不创建实例', async () => {
    wrapper = mount(Ellipsis, { props: { tooltip: false }, slots: { default: () => '很长的文本' } })
    await nextTick()
    await remeasure(wrapper)
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(0)
  })

  it('溢出后取消溢出会卸载实例', async () => {
    wrapper = mount(Ellipsis, { slots: { default: () => '很长的文本' } })
    await nextTick()
    await remeasure(wrapper)
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(1)

    // 挂载 Tooltip 后文本容器为新元素，需在当前元素上重建「不溢出」尺寸
    const el = wrapper.find('.ellipsis-container').element as HTMLElement
    Object.defineProperty(el, 'scrollWidth', { value: 100, configurable: true })
    Object.defineProperty(el, 'clientWidth', { value: 100, configurable: true })
    await wrapper.setProps({ maxWidth: 120 })
    await nextTick()
    await nextTick()
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(0)
  })

  it('两个渲染分支都继承外部属性（class / data-*）', async () => {
    // 未溢出：直接落到文本容器
    const plain = mount(Ellipsis, {
      attrs: { class: 'ext-cls', 'data-mark': 'a' },
      slots: { default: () => '短文本' }
    })
    await nextTick()
    expect(plain.find('.ellipsis-container').classes()).toContain('ext-cls')
    expect(plain.find('.ellipsis-container').attributes('data-mark')).toBe('a')
    plain.unmount()

    // 溢出：落到 Tooltip 的触发器包裹层
    wrapper = mount(Ellipsis, {
      attrs: { class: 'ext-cls', 'data-mark': 'a' },
      slots: { default: () => '很长的文本' }
    })
    await nextTick()
    await remeasure(wrapper)
    const wrap = wrapper.find('.tooltip-wrap')
    expect(wrap.classes()).toContain('ext-cls')
    expect(wrap.attributes('data-mark')).toBe('a')
  })

  it('外部透传的同名属性优先于组件内部默认值（$attrs 置于末尾）', async () => {
    wrapper = mount(Ellipsis, {
      attrs: { contentStyle: { maxWidth: '10px' } },
      slots: { default: () => '很长的文本' }
    })
    await nextTick()
    await remeasure(wrapper)
    // Ellipsis 内部会给 Tooltip 传 contentStyle，外部透传的值应覆盖它（与自动继承语义一致）
    expect(wrapper.findComponent(Tooltip).props('contentStyle')).toEqual({ maxWidth: '10px' })
  })

  it('点击展开期间保留实例（hide 与动画链依赖它）', async () => {
    wrapper = mount(Ellipsis, { props: { expand: true }, slots: { default: () => '很长的文本' } })
    await nextTick()
    await remeasure(wrapper)
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(1)

    await wrapper.find('.ellipsis-container').trigger('click')
    await nextTick()
    // 展开后 showTooltip 为假，但 expanded 为真，实例必须仍在
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(1)
  })
})
