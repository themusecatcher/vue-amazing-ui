import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
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

/**
 * 回归守护：`search` 模式的输入法（IME）合成期保护。
 *
 * 组件未显式处理 `compositionstart/end`，保护来自 `v-model="inputValue"` ——
 * Vue 的 v-model 指令在合成期会让 input 事件早退（`if (e.target.composing) return`），
 * 并在 `compositionend` 后补发一次 input，故「合成期间不筛选、合成结束才筛选」成立。
 * 该契约是隐式的：一旦把 `v-model` 改写成 `:value` + `@input` 就会静默失效，故以本用例锁定。
 */
describe('Select search 模式的输入法（IME）合成', () => {
  it('合成期间不筛选，合成结束后按最终输入筛选', async () => {
    const fetchOptionTexts = () =>
      [...document.querySelectorAll('.select-option')].map((el) => el.textContent?.trim() ?? '')
    const wrapper = mount(Select, {
      attachTo: document.body,
      props: {
        search: true,
        options: [
          { label: '北京市', value: 'beijing' },
          { label: '上海市', value: 'shanghai' }
        ]
      }
    })
    try {
      await sleep(10)
      await wrapper.find('.select-wrap').trigger('click')
      await sleep(10)
      expect(fetchOptionTexts()).toEqual(['北京市', '上海市'])

      // 合成中：input.value 已带上候选文字，但不触发筛选
      const input = wrapper.find('.search-input').element as HTMLInputElement
      input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }))
      input.value = '北'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      await nextTick()
      expect(fetchOptionTexts()).toEqual(['北京市', '上海市'])

      // 合成结束：按最终输入筛选
      input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data: '北' }))
      await nextTick()
      expect(fetchOptionTexts()).toEqual(['北京市'])
    } finally {
      wrapper.unmount()
      document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
    }
  })
})
