import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import Modal, { ModalProvider, useModal } from 'components/modal'
import type { ModalApi } from 'components/modal'

/**
 * Modal 图标渲染回归
 *
 * `icon` 与 `closeIcon` / `title` / `content` 统一走 `renderContent` 后，四种形态应均能渲染：
 * 命令式 VNode、命令式渲染函数、声明式 VNode、声明式渲染函数，另有 `#icon` 插槽优先级最高。
 *
 * 关键回归点：`icon` 不再被直接交给 `<component :is>` 当函数式组件渲染，
 * 因此声明式内联渲染函数在父组件重渲染时不会因函数引用变化而销毁重建。
 */

// 在 Provider 内的宿主组件中取 api，用于覆盖命令式路径
function mountWithApi(): { api: ModalApi; unmount: () => void } {
  let api!: ModalApi
  const Host = defineComponent({
    setup() {
      api = useModal()
      return () => null
    }
  })
  const wrapper = mount(ModalProvider, {
    slots: { default: () => h(Host) }
  })
  return { api, unmount: () => wrapper.unmount() }
}

describe('Modal 图标渲染', () => {
  it('命令式：icon 的 VNode 与渲染函数两种形态均能渲染', async () => {
    const { api, unmount } = mountWithApi()
    api.info({ title: 'VNode 图标', icon: h('span', { class: 'imperative-vnode-icon' }) })
    api.info({ title: '渲染函数图标', icon: () => h('span', { class: 'imperative-fn-icon' }) })
    api.confirm({
      title: '渲染函数关闭图标',
      closable: true,
      closeIcon: () => h('span', { class: 'imperative-fn-close' })
    })
    await nextTick()
    expect(document.body.querySelector('.imperative-vnode-icon')).toBeTruthy()
    expect(document.body.querySelector('.imperative-fn-icon')).toBeTruthy()
    expect(document.body.querySelector('.imperative-fn-close')).toBeTruthy()
    unmount()
  })

  it('声明式：icon 的 VNode 与渲染函数两种形态均能渲染', async () => {
    const vnodeWrapper = mount(Modal, {
      props: { open: true, title: '声明式 VNode 图标', icon: h('span', { class: 'declarative-vnode-icon' }) }
    })
    await nextTick()
    expect(document.body.querySelector('.declarative-vnode-icon')).toBeTruthy()
    vnodeWrapper.unmount()

    const fnWrapper = mount(Modal, {
      props: { open: true, title: '声明式渲染函数图标', icon: () => h('span', { class: 'declarative-fn-icon' }) }
    })
    await nextTick()
    expect(document.body.querySelector('.declarative-fn-icon')).toBeTruthy()
    fnWrapper.unmount()
  })

  it('声明式内联渲染函数图标不随父组件重渲染而销毁重建', async () => {
    const title = ref('重渲染前')
    // 必须在宿主组件的 render 内新建箭头函数，才能复现模板内联 :icon="() => h(...)" 的写法；
    // 若把同一个函数引用作为 props 传入，引用恒定，就测不出函数式组件按引用比对 type 导致的重建
    const Host = defineComponent({
      setup() {
        return () => h(Modal, { open: true, title: title.value, icon: () => h('span', { class: 'stable-icon' }) })
      }
    })
    const wrapper = mount(Host)
    await nextTick()
    const before = document.body.querySelector('.stable-icon')
    expect(before).toBeTruthy()
    title.value = '重渲染后'
    await nextTick()
    const after = document.body.querySelector('.stable-icon')
    // 同一 DOM 节点：icon 走 renderContent 后 :is 收到的是稳定 type，不会被当成函数式组件重建
    expect(after).toBe(before)
    wrapper.unmount()
  })

  it('#icon 插槽优先级高于 icon 属性', async () => {
    const wrapper = mount(Modal, {
      props: { open: true, title: '插槽优先', icon: h('span', { class: 'prop-icon' }) },
      slots: { icon: () => h('span', { class: 'slot-icon' }) }
    })
    await nextTick()
    expect(document.body.querySelector('.slot-icon')).toBeTruthy()
    expect(document.body.querySelector('.prop-icon')).toBeNull()
    wrapper.unmount()
  })

  it('未配置 icon 时按弹窗类型渲染内置图标', async () => {
    // 声明式固定 confirm 形态，内置图标为感叹号
    const wrapper = mount(Modal, { props: { open: true, title: '内置图标' } })
    await nextTick()
    expect(document.body.querySelector('[data-icon="exclamation-circle"]')).toBeTruthy()
    wrapper.unmount()
  })
})
