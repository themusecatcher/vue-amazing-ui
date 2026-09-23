import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Cascader from 'components/cascader/Cascader.vue'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const OPTIONS = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      { label: '杭州', value: 'hangzhou', children: [{ label: '西湖', value: 'xihu' }] },
      { label: '宁波', value: 'ningbo', children: [] }
    ]
  },
  { label: '江苏', value: 'jiangsu', children: [{ label: '南京', value: 'nanjing', children: [] }] }
]

/** 面板经 Teleport 挂到 body，卸载时需一并清理，避免污染后续用例 */
function cleanup(): void {
  document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
}

/** 当前可见的下拉面板（Cascader 内部有三级 Select，各自持有面板） */
function visiblePanel(): HTMLElement | undefined {
  return [...document.querySelectorAll<HTMLElement>('.select-panel-container')].find(
    (el) => el.style.display !== 'none' && el.offsetHeight >= 0
  )
}

function optionTexts(): string[] {
  return [...document.querySelectorAll('.select-option')].map((el) => el.textContent?.trim() ?? '')
}

async function openFirstPanel(wrapper: ReturnType<typeof mount>): Promise<void> {
  await wrapper.findAll('.select-wrap')[0].trigger('click')
  await sleep(20)
}

/**
 * 回归守护：Cascader 向内部 Select 透传的搜索相关 props 必须与 Select 现行 API 对齐。
 *
 * 历史事故：Select 把 `search` / `filter` 改名为 `showSearch` / `filterOption`（移除旧名）后，
 * Cascader 未同步 —— 旧名会作为 attr 落到根元素上（DOM 出现 `search="false"`）而功能静默失效：
 * 既不能搜索，过滤也不再生效。故以本组用例锁定三条契约。
 */
describe('Cascader 搜索与过滤', () => {
  it('search 生效：输入选项文本可筛选', async () => {
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, value: [], search: true }
    })
    try {
      await sleep(10)
      await openFirstPanel(wrapper)
      const panel = visiblePanel()
      expect(panel).toBeTruthy()
      expect(optionTexts()).toEqual(['浙江', '江苏'])

      // 关键词取「苏」而非「江」——「浙江」自身也含「江」，用「江」会同时命中两项
      const input = wrapper.find('.search-input').element as HTMLInputElement
      input.value = '苏'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      await sleep(20)
      expect(optionTexts()).toEqual(['江苏'])
    } finally {
      wrapper.unmount()
      cleanup()
    }
  })

  it('默认按 label 过滤：选项文本可命中（value 不参与匹配）', async () => {
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, value: [], search: true }
    })
    try {
      await sleep(10)
      await openFirstPanel(wrapper)
      const panel = visiblePanel()
      expect(panel).toBeTruthy()

      // 'zhejiang' 是 value，若按 value 过滤会命中；此处输入 value 不应命中任何项，证明过滤字段是 label
      const input = wrapper.find('.search-input').element as HTMLInputElement
      input.value = 'zhejiang'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      await nextTick()
      expect(optionTexts()).toEqual([])
    } finally {
      wrapper.unmount()
      cleanup()
    }
  })

  it('filter 传函数时生效', async () => {
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        options: OPTIONS,
        value: [],
        search: true,
        filter: (_inputValue: string, option: { value?: string | number }) => option.value === 'jiangsu'
      }
    })
    try {
      await sleep(10)
      await openFirstPanel(wrapper)
      await sleep(20)
      // 传入函数后不过滤或过滤均由函数决定：准备阶段无关键词时展示全量
      expect(optionTexts()).toEqual(['浙江', '江苏'])

      const input = wrapper.find('.search-input').element as HTMLInputElement
      input.value = '任意'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      await nextTick()
      expect(optionTexts()).toEqual(['江苏'])
    } finally {
      wrapper.unmount()
      cleanup()
    }
  })
})

/**
 * 契约守护：Cascader 对外 `change` 事件的第二个参数是各级**选项文本**数组。
 *
 * Select 的 `change` 已改为 `(value, option, index)`，第二参是完整 option 对象；
 * Cascader 若直接把该参数当作 label 使用，事件里会塞进对象而非文本（消费方拿到 [object Object]）。
 */
describe('Cascader change 事件的 labels 参数', () => {
  it('选中后 labels 为选项文本数组', async () => {
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: { options: OPTIONS, value: [], changeOnSelect: true }
    })
    try {
      await sleep(10)
      await openFirstPanel(wrapper)
      const target = [...document.querySelectorAll<HTMLElement>('.select-option')].find(
        (el) => el.textContent?.trim() === '浙江'
      )
      expect(target).toBeTruthy()
      target?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await sleep(20)

      const events = wrapper.emitted('change')
      expect(events).toBeTruthy()
      const [values, labels] = events?.[events.length - 1] as [unknown[], unknown[]]
      expect(values).toEqual(['zhejiang'])
      expect(labels).toEqual(['浙江'])
    } finally {
      wrapper.unmount()
      cleanup()
    }
  })
})
