import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useControlledModel, useIsControlled } from 'components/utils'

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

/** 探针组件经 `expose` 暴露的方法：`defineComponent` 无法推导 expose 的类型，按实际暴露面声明 */
interface ProbeApi {
  read: () => boolean
  write: (value: boolean) => void
}
const vmOf = (target: { vm: unknown }): ProbeApi => target.vm as ProbeApi

describe('useControlledModel', () => {
  it('不传值：非受控，初值取 defaultValue，写入本地生效并上报', async () => {
    const wrapper = mount(createProbe(false))
    expect(wrapper.text()).toBe('false')

    vmOf(wrapper).write(true)
    await nextTick()
    expect(wrapper.text()).toBe('true')
    expect(wrapper.emitted('update:open')).toEqual([[true]])
  })

  it('只传值不监听：受控，写入不改显示但仍上报（等价于旧 props 判据）', async () => {
    const wrapper = mount(createProbe(false), { props: { open: true } })
    expect(wrapper.text()).toBe('true')

    vmOf(wrapper).write(false)
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

    vmOf(wrapper.findComponent(Probe)).write(false)
    await nextTick()
    expect(open.value).toBe(false)
    expect(wrapper.text()).toBe('false')
  })

  it('显式传 undefined：按非受控处理（保持既有链路，如 Popover 透传 open: undefined）', async () => {
    const wrapper = mount(createProbe(false), { props: { open: undefined } })
    expect(wrapper.text()).toBe('false')

    vmOf(wrapper).write(true)
    await nextTick()
    expect(wrapper.text()).toBe('true')
    expect(wrapper.emitted('update:open')).toEqual([[true]])
  })

  it('同一轮内重复写同一个值：只上报一次（输入框 v-model 与事件处理器各写一次的兜底）', async () => {
    const wrapper = mount(createProbe(false))
    vmOf(wrapper).write(true)
    vmOf(wrapper).write(true)
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[true]])
  })

  it('受控父拒绝回写后，下一轮再请求同一个值仍上报', async () => {
    const Probe = createProbe(false)
    const wrapper = mount(
      defineComponent({
        // 父传值但不接受回写（如校验不通过 / 值被钳制），组件不得因此「记住」已上报的目标值
        setup: () => () => h(Probe, { open: false })
      })
    )
    const probe = wrapper.findComponent(Probe)

    vmOf(probe).write(true)
    await nextTick()
    vmOf(probe).write(true)
    await nextTick()

    expect(probe.emitted('update:open')).toEqual([[true], [true]])
  })
})

describe('useIsControlled', () => {
  /** 探针：把判据结果渲染出来，父值变化后应随之翻转 */
  const createFlagProbe = () =>
    defineComponent({
      props: {
        open: {
          type: Boolean,
          default: undefined
        }
      },
      setup() {
        const controlled = useIsControlled('open')
        return () => h('div', String(controlled.value))
      }
    })

  it('不传值时为 false，传值（含 false）后为 true', async () => {
    const wrapper = mount(createFlagProbe())
    expect(wrapper.text()).toBe('false')

    await wrapper.setProps({ open: false })
    // 判据是「传了非 undefined 的值」，不是「值真为真」—— 显式传 false 同样是受控
    expect(wrapper.text()).toBe('true')
  })

  it('父值在受控 / 非受控之间切换时实时跟随', async () => {
    const wrapper = mount(createFlagProbe(), { props: { open: true } })
    expect(wrapper.text()).toBe('true')

    await wrapper.setProps({ open: undefined })
    expect(wrapper.text()).toBe('false')
  })
})
