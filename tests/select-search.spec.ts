import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * 回归守护：搜索模式的输入法（IME）合成期保护。
 *
 * 组件内部以 `v-model` 绑定搜索文本，并在 input 处理中读取元素上的 `composing` 标记：
 * 合成期间既不触发 `search` 也不参与过滤；`v-model` 会在 `compositionend` 时先清标记、
 * 再补发一次 `input`，此时按最终上屏内容筛选一次。
 * 该契约一旦被改写为「`:value` + 自行同步」，合成期会被状态回写打断（DOM 候选文字被覆盖），
 * 或出现重复触发，故以本用例锁定。
 *
 * 另：默认过滤字段遵循 antd（`optionFilterProp` 优先，未指定时按 `value` 匹配），
 * 因此「按选项文本搜索」需显式传入 `optionFilterProp: 'label'`。
 */
describe('Select 搜索模式的输入法（IME）合成', () => {
  it('合成期间不筛选，合成结束后按最终输入筛选', async () => {
    const fetchOptionTexts = () =>
      [...document.querySelectorAll('.select-option')].map((el) => el.textContent?.trim() ?? '')
    const wrapper = mount(Select, {
      attachTo: document.body,
      props: {
        showSearch: true,
        optionFilterProp: 'label',
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

  /**
   * 回归守护：输入法组合期间的 Enter 是「确认候选 / 上屏」，不是「选中高亮项」。
   *
   * 浏览器对 IME 消费的按键会派发 `isComposing: true` 的 keydown，antd 因以 keyCode 判定
   * （组合态下 Chromium 给出 229）而天然忽略；本组件以 `event.key` 判定，若不显式拦截，
   * 回车确认输入法会误选中当前高亮项，且随后的 compositionend 又把搜索文本写回输入框，
   * 表现为「凭空选中一项 + 输入框残留搜索文本」。
   */
  it('合成期间的 Enter 不选中高亮项，合成结束后的 Enter 仍正常选中', async () => {
    const wrapper = mount(Select, {
      attachTo: document.body,
      props: {
        mode: 'multiple',
        filterOption: false,
        options: [
          { label: '张伟（zhangwei）', value: 'zhangwei' },
          { label: '王芳（wangfang）', value: 'wangfang' }
        ]
      }
    })
    try {
      await sleep(10)
      await wrapper.find('.select-wrap').trigger('click')
      await sleep(10)
      const input = wrapper.find('.search-input').element as HTMLInputElement

      // 合成中：回车确认输入法 → 不得选中默认高亮项
      input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }))
      input.value = 'z'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      await nextTick()
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true }))
      await nextTick()
      expect(wrapper.emitted('change')).toBeUndefined()

      // 合成结束（搜索文本上屏）→ 仍不产生选中
      input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data: 'z' }))
      await sleep(10)
      expect(wrapper.emitted('change')).toBeUndefined()

      // 对照组：非合成态的 Enter 仍按高亮项正常选中
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
      await sleep(10)
      expect(wrapper.emitted('change')?.at(-1)?.[0]).toEqual(['zhangwei'])
      expect(wrapper.emitted('select')?.at(-1)?.[0]).toBe('zhangwei')
    } finally {
      wrapper.unmount()
      document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
    }
  })
})

/**
 * 契约守护：关闭面板后搜索文本与过滤态一并复位（对齐 antd 的单选行为）。
 *
 * 旧实现用「200ms 延迟重置定时器」在面板关闭动画期间保留过滤结果，该机制会引入
 * 「写入 filteredOptions → watchEffect 重跑 → 再排定时器」的自触发风险；
 * 现改为直接由 `mergedSearchValue` 派生展示列表，关闭即复位，不再持有定时器。
 */
describe('Select 搜索模式的关闭复位', () => {
  it('关闭面板后搜索文本清空，选项恢复为全量', async () => {
    const wrapper = mount(Select, {
      attachTo: document.body,
      props: {
        showSearch: true,
        optionFilterProp: 'label',
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
      await wrapper.find('.search-input').setValue('北')
      await sleep(10)
      expect([...document.querySelectorAll('.select-option')].map((el) => el.textContent?.trim())).toEqual(['北京市'])

      // Esc 关闭面板 → 搜索文本复位，再打开时展示全量选项
      const input = wrapper.find('.search-input').element as HTMLInputElement
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await sleep(10)
      await wrapper.find('.select-wrap').trigger('click')
      await sleep(10)
      expect([...document.querySelectorAll('.select-option')].map((el) => el.textContent?.trim())).toEqual([
        '北京市',
        '上海市'
      ])
    } finally {
      wrapper.unmount()
      document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
    }
  })
})
