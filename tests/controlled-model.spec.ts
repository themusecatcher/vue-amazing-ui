import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useControlledModel } from 'components/utils'

/**
 * `useControlledModel` 的判据用例
 *
 * 契约：**传值即受控**（`props.x !== undefined`）—— 受控时读父值、写只上报；未传时组件自持、写生效并上报。
 * 与 `defineModel` 的判据（prop + 监听器同时存在才算受控）刻意不同，用例第 2 条即是两者的分水岭：
 * 父只传值不监听时，组件**不得**本地改写。
 *
 * @param defaultValue - 非受控初值
 * @returns 探针组件：暴露模型值，并提供 set 方法
 */
function createProbe(defaultValue: boolean) {
  return defineComponent({
    props: {
      open: {
        type: Boolean,
        default: undefined
      }
    },
    emits: ['update:open'],
    setup(props, { expose }) {
      const model = useControlledModel<boolean>('open', defaultValue)
      expose({
        read: () => model.value,
        write: (value: boolean) => {
          model.value = value
        }
      })
      return () => h('div', String(model.value))
    }
  })
}

describe('useControlledModel', () => {
  it('不传值：非受控，初值取 defaultValue，写入本地生效并上报', async () => {
    const wrapper = mount(createProbe(false))
    expect(wrapper.text()).toBe('false')

    wrapper.vm.write(true)
    await nextTick()
    expect(wrapper.text()).toBe('true')
    expect(wrapper.emitted('update:open')).toEqual([[true]])
  })

  it('只传值不监听：受控，写入不改显示但仍上报（等价于旧 props 判据）', async () => {
    const wrapper = mount(createProbe(false), { props: { open: true } })
    expect(wrapper.text()).toBe('true')

    wrapper.vm.write(false)
    await nextTick()
    expect(wrapper.text()).toBe('true')
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  })

  it('传值并回写：显示跟随父值', async () => {
    const open = ref(true)
    const Probe = createProbe(false)
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => h(Probe, { open: open.value, 'onUpdate:open': (value: boolean) => (open.value = value) })
        }
      })
    )
    expect(wrapper.text()).toBe('true')

    wrapper.findComponent(Probe).vm.write(false)
    await nextTick()
    expect(open.value).toBe(false)
    expect(wrapper.text()).toBe('false')
  })

  it('显式传 undefined：按非受控处理（保持既有链路，如 Popover 透传 open: undefined）', async () => {
    const wrapper = mount(createProbe(false), { props: { open: undefined } })
    expect(wrapper.text()).toBe('false')

    wrapper.vm.write(true)
    await nextTick()
    expect(wrapper.text()).toBe('true')
    expect(wrapper.emitted('update:open')).toEqual([[true]])
  })
})
