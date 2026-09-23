import { describe, it, expect } from 'vitest'
import { defineComponent, h, createCommentVNode, createTextVNode } from 'vue'
import { mount } from '@vue/test-utils'
import { useSlotsExist } from 'components/utils'

/**
 * 回归守护：`useSlotsExist` 的判定方式
 *
 * 该组合式函数以「实际调用一次插槽 → 检查返回的 vnode」判定插槽是否真的渲染了内容。
 * 关键在于调用时**必须传入作用域参数对象**：模板作用域插槽会被编译为
 * `_withCtx(({ xxx }) => [...])`，作用域参数在**形参位置解构**，
 * 一旦以无参形式调用（`slot()`），形参即为 `undefined`，解构立刻抛
 * `TypeError: Cannot destructure property ... of 'undefined'` → 渲染中断（表现为整页白屏）。
 *
 * 因此本文件守护三种输入形态：
 * 1. 未提供插槽 → 不存在；
 * 2. 形参位置解构的插槽（含访问作用域嵌套属性）→ 判定为存在且**不抛错**；
 * 3. 已提供但渲染为空（空数组 / 仅注释 / 纯空白文本）→ 不存在。
 */

// 探针组件：把 useSlotsExist 的判定结果渲染成可断言的文本
const Probe = defineComponent({
  name: 'SlotsExistProbe',
  setup() {
    const iconExist = useSlotsExist('icon')
    const contentExist = useSlotsExist('content')
    return () =>
      h(
        'div',
        { class: 'probe' },
        `${iconExist.value ? 'icon:yes' : 'icon:no'}/${contentExist.value ? 'content:yes' : 'content:no'}`
      )
  }
})

// 数组形式（返回 reactive 记录，属性为 computed，读取时自动解包）
const ArrayProbe = defineComponent({
  name: 'SlotsExistArrayProbe',
  setup() {
    const exist = useSlotsExist(['icon', 'content'])
    return () => h('div', { class: 'probe-array' }, `${String(exist.icon)}/${String(exist.content)}`)
  }
})

describe('useSlotsExist 插槽判定', () => {
  it('未提供插槽时判定为不存在', () => {
    const wrapper = mount(Probe)
    expect(wrapper.find('.probe').text()).toBe('icon:no/content:no')
    wrapper.unmount()
  })

  it('形参位置解构的插槽判定为存在，且不抛错（含访问作用域嵌套属性）', () => {
    const wrapper = mount(Probe, {
      slots: {
        // 与模板 `#icon="{ item }"` 的编译产物同形：形参位置解构
        icon: ({ item }: { item: { title: string } }) => h('span', item.title)
      }
    })
    // 修复前：无参调用 → 解构 undefined → 抛 TypeError，mount 直接失败
    expect(wrapper.find('.probe').text()).toBe('icon:yes/content:no')
    wrapper.unmount()
  })

  it('普通内容插槽判定为存在', () => {
    const wrapper = mount(Probe, {
      slots: {
        icon: () => h('span', 'icon'),
        content: () => [h('p', 'content')]
      }
    })
    expect(wrapper.find('.probe').text()).toBe('icon:yes/content:yes')
    wrapper.unmount()
  })

  it('已提供但渲染为空的插槽判定为不存在', () => {
    const empty = mount(Probe, {
      slots: {
        icon: () => [],
        content: () => [createCommentVNode('v-if')]
      }
    })
    expect(empty.find('.probe').text()).toBe('icon:no/content:no')
    empty.unmount()

    const blankText = mount(Probe, {
      slots: {
        icon: () => [createTextVNode('   ')],
        content: () => []
      }
    })
    expect(blankText.find('.probe').text()).toBe('icon:no/content:no')
    blankText.unmount()
  })

  it('数组形式与单个形式的判定结果一致', () => {
    const none = mount(ArrayProbe)
    expect(none.find('.probe-array').text()).toBe('false/false')
    none.unmount()

    const scoped = mount(ArrayProbe, {
      slots: {
        icon: ({ item }: { item: { title: string } }) => h('span', item.title)
      }
    })
    expect(scoped.find('.probe-array').text()).toBe('true/false')
    scoped.unmount()

    const empty = mount(ArrayProbe, {
      slots: {
        icon: () => []
      }
    })
    expect(empty.find('.probe-array').text()).toBe('false/false')
    empty.unmount()
  })
})
