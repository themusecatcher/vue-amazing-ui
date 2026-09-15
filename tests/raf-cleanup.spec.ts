import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useFps } from 'components/utils'
import Countdown from 'components/countdown/Countdown.vue'

/**
 * 回归守护：rAF 驱动的循环必须随作用域释放。
 *
 * `useFps` 与 `Countdown` 都通过 `requestAnimationFrame` 自我续期：
 * - `useFps` 的循环没有终止条件，若不取消会永久存活；
 * - `Countdown` 的终止条件是「到达倒计时目标时刻」，目标较远时会长时间存活。
 * 两者一旦卸载后仍在运行，就会持续持有组件作用域（refs / props / 闭包），阻塞 GC。
 *
 * 断言口径：卸载并静置后，统计下一段时间内新注册的 rAF 数量，必须为 0。
 * 采用真实定时器而非假定时器：本用例直接统计 rAF 注册次数，
 * 假定时器会冻结 performance.now 并干扰计数。
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function countRafAfterUnmount(ms: number): Promise<number> {
  await sleep(50) // 先让卸载瞬间的收尾帧走完，再开始计数
  let count = 0
  const realRaf = globalThis.requestAnimationFrame
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
    count++
    return realRaf(cb)
  }) as typeof requestAnimationFrame
  await sleep(ms)
  globalThis.requestAnimationFrame = realRaf
  return count
}

const FpsProbe = defineComponent({
  setup() {
    const { fps } = useFps()
    return () => h('span', String(fps.value))
  }
})

describe('rAF 循环应在卸载时停止', () => {
  it('useFps：卸载后不应继续注册帧回调', async () => {
    const wrapper = mount(FpsProbe, { attachTo: document.body })
    await sleep(50)
    wrapper.unmount()

    expect(await countRafAfterUnmount(200)).toBe(0)
  })

  it('Countdown：卸载后不应继续注册帧回调', async () => {
    const wrapper = mount(Countdown, {
      attachTo: document.body,
      props: { future: true, value: Date.now() + 3600_000 }
    })
    await sleep(50)
    wrapper.unmount()

    expect(await countRafAfterUnmount(200)).toBe(0)
  })
})
