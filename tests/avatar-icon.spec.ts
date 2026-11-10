import { describe, it, expect } from 'vitest'
import { h, defineComponent, markRaw } from 'vue'
import { mount } from '@vue/test-utils'
import Avatar from 'components/avatar/Avatar.vue'

/**
 * Avatar 的 icon 形态契约
 *
 * 模板用 `<component :is="icon">` 渲染，故 VNode / 组件定义对象 / 渲染函数三种形态都必须成立。
 * 这里锁定「组件定义对象」，避免后续为统一内容渲染改用 `renderContentToVNode`（它不认组件对象）。
 */

// 组件对象需 markRaw：经 props 传入后会被响应式包裹，否则 Vue 会告警
const ProbeIcon = markRaw(
  defineComponent({
    name: 'ProbeIcon',
    render: () => h('b', { class: 'probe-icon' }, 'X')
  })
)

describe('Avatar 的 icon 支持多种形态', () => {
  it('组件定义对象按组件渲染', () => {
    const wrapper = mount(Avatar, { props: { icon: ProbeIcon } })
    expect(wrapper.find('.probe-icon').exists()).toBe(true)
    wrapper.unmount()
  })

  it('渲染函数按函数返回结果渲染', () => {
    const wrapper = mount(Avatar, { props: { icon: () => h('b', { class: 'fn-icon' }, 'F') } })
    expect(wrapper.find('.fn-icon').exists()).toBe(true)
    wrapper.unmount()
  })

  it('VNode 按原样渲染', () => {
    const wrapper = mount(Avatar, { props: { icon: h('b', { class: 'vnode-icon' }, 'V') } })
    expect(wrapper.find('.vnode-icon').exists()).toBe(true)
    wrapper.unmount()
  })
})
