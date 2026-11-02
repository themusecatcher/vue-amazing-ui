import { describe, it, expect } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import Rate from 'components/rate/Rate.vue'

/**
 * Rate 的事件时序回归
 *
 * 全库约定是「先写模型（`update:value` 随之派发）、再派发 `change`」：父侧的 `v-model`
 * 赋值发生在 `update:value` 的监听器里，同步生效。因此 `@change` 回调里读 `v-model`
 * 绑定的变量时，读到的必须已经是新值。
 *
 * Rate 此前是「先 `change`、后写模型」，导致 `@change` 里读到旧值 —— 与其他组件不一致。
 */

/** 以「持有 ref 的宿主」模拟父组件：value + onUpdate:value 等价于 v-model:value */
function mountHost(initial: number, props: Record<string, unknown> = {}) {
  const seen: number[] = []
  const Host = defineComponent({
    setup() {
      const score = ref(initial)
      const onChange = (): void => {
        // 关键断言点：回调执行瞬间父侧的 v-model 变量处于什么值
        seen.push(score.value)
      }
      return () =>
        h(Rate, {
          value: score.value,
          'onUpdate:value': (value: number) => {
            score.value = value
          },
          onChange,
          ...props
        })
    }
  })
  const wrapper = mount(Host, { attachTo: document.body })
  return { wrapper, seen }
}

describe('Rate 的 change 在 update:value 之后派发', () => {
  it('点击新评分：@change 里读到的 v-model 值已是新值', async () => {
    const { wrapper, seen } = mountHost(0)
    const stars = wrapper.findAll('.star-second')
    await stars[2].trigger('click')

    expect(seen).toEqual([3])
    wrapper.unmount()
  })

  it('点击当前评分清除（allowClear）：@change 里读到的是 0', async () => {
    const { wrapper, seen } = mountHost(3)
    const stars = wrapper.findAll('.star-second')
    await stars[2].trigger('click')

    expect(seen).toEqual([0])
    wrapper.unmount()
  })

  it('键盘右移：@change 里读到的是递增后的值', async () => {
    const { wrapper, seen } = mountHost(0)
    await wrapper.find('.rate-star').trigger('keydown', { key: 'ArrowRight' })

    expect(seen).toEqual([1])
    wrapper.unmount()
  })

  it('受控父侧拒绝回写时 change 仍照常派发', async () => {
    const seen: number[] = []
    const wrapper = mount(Rate, {
      props: {
        value: 0,
        onChange: (value: number) => seen.push(value)
      },
      attachTo: document.body
    })
    await wrapper.findAll('.star-second')[4].trigger('click')

    expect(seen).toEqual([5])
    wrapper.unmount()
  })
})
