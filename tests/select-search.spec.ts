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
