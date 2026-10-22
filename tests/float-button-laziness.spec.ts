import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Tooltip from 'components/tooltip'
import FloatButton from 'components/float-button'

/**
 * FloatButton 浮层实例惰性挂载回归守护
 *
 * 背景：FloatButton 无条件用 `Tooltip` 包裹按钮内容，未传 `tooltip` / 未提供 `#tooltip` 插槽时
 * 也会常驻一个浮层实例。现改为「有提示内容才挂载」，无内容时用同名 class 的普通 div 占位，
 * 使 `.float-btn-tooltip` 承载的尺寸与状态样式链在两种结构下保持一致。
 */
let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

describe('FloatButton：按需挂载 Tooltip', () => {
  it('无 tooltip 与插槽时不创建实例，占位层与内容仍完整渲染', async () => {
    wrapper = mount(FloatButton, { slots: { icon: () => 'I' } })
    await nextTick()
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(0)

    const holder = wrapper.find('.float-btn-tooltip')
    expect(holder.exists()).toBe(true)
    expect(holder.element.tagName).toBe('DIV')
    expect(wrapper.find('.float-btn-body').exists()).toBe(true)
    expect(wrapper.find('.float-btn-content').exists()).toBe(true)
  })

  it('传 tooltip 时创建实例且包裹类名保留', async () => {
    wrapper = mount(FloatButton, { props: { tooltip: '提示' } })
    await nextTick()
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(1)
    expect(wrapper.find('.float-btn-tooltip').exists()).toBe(true)
  })

  it('仅提供 #tooltip 插槽时同样创建实例', async () => {
    wrapper = mount(FloatButton, { slots: { tooltip: () => '插槽提示', icon: () => 'I' } })
    await nextTick()
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(1)
  })

  it('空内容的 #tooltip 插槽视为无内容，不创建实例', async () => {
    wrapper = mount(FloatButton, { slots: { tooltip: () => '', icon: () => 'I' } })
    await nextTick()
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(0)
  })

  it('badgeProps 在无实例分支同样生效', async () => {
    wrapper = mount(FloatButton, { props: { badgeProps: { value: 3 } }, slots: { icon: () => 'I' } })
    await nextTick()
    expect(wrapper.findAllComponents(Tooltip)).toHaveLength(0)
    expect(wrapper.find('.badge-value').exists()).toBe(true)
  })
})
