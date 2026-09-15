import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'

/**
 * 回归守护：Select 在 `search` 模式下的延迟重置定时器不应自我触发。
 *
 * 缺陷形态：该定时器写入 `filterOptions`，而 `filterOptions` 又被同一个 `watchEffect` 读取，
 * 于是形成「写入 → effect 重跑 → 再排定时器」的自触发循环，约 5 次/秒；
 * 只要开启 `search`、面板关闭且输入为空，就会持续发生（重建选项数组 + 反复触发渲染）。
 *
 * 修复：把尾部条件由 `filterOptions.value.length && inputValue.value`
 * 调整为 `inputValue.value && filterOptions.value.length`，使「输入为空」这一路径短路，
 * 不再把 `filterOptions` 登记为该 effect 的依赖。
 *
 * 断言口径：挂载后一段时间内，200ms 延迟重置定时器最多只注册一次（即初始那一次）。
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

describe('Select search 模式的延迟重置定时器', () => {
  it('面板关闭且输入为空时，不应反复重排定时器', async () => {
    const realSetTimeout = globalThis.setTimeout
    const delays: number[] = []
    globalThis.setTimeout = ((fn: TimerHandler, delay?: number, ...rest: unknown[]) => {
      delays.push(delay ?? 0)
      return (realSetTimeout as (...a: unknown[]) => unknown)(fn, delay, ...rest)
    }) as unknown as typeof setTimeout

    const wrapper = mount(Select, {
      attachTo: document.body,
      props: {
        search: true,
        options: [
          { label: 'apple', value: 1 },
          { label: 'banana', value: 2 }
        ]
      }
    })
    try {
      await sleep(1000)
      const resetCount = delays.filter((delay) => delay === 200).length
      expect(resetCount).toBeLessThanOrEqual(1)
    } finally {
      globalThis.setTimeout = realSetTimeout
      wrapper.unmount()
    }
  })
})
