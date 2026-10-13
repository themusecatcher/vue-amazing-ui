import { describe, it, expect, afterEach } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker/DatePicker.vue'
import { flushTransition } from './helpers'

/**
 * 渲染定制的回归守护
 *
 * `dateRender` 替换日期格的日号、`renderExtraFooter` 在面板底部追加内容。两者都有「同名插槽优先于
 * prop」的两轨语义，且都要求 VNode 在组件的渲染上下文内创建（否则其上的 ref 会成为无主 VNode）。
 */
const CURRENT = new Date(2026, 9, 15).getTime()

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await flushTransition()
}

/** 日期格内层的内容文本集合 */
function cellTexts(): string[] {
  return Array.from(document.querySelectorAll('.picker-panel-cell-inner')).map((el) => el.textContent?.trim() ?? '')
}

describe('日期单元格内容定制（dateRender）', () => {
  it('prop 形态替换日号，且不影响选中态所在的单元格容器', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        open: true,
        value: CURRENT,
        dateRender: ({ current, today }: { current: number; today: number }) =>
          h('span', { class: 'custom-day' }, `${new Date(current).getDate()}#${typeof today}`)
      }
    })
    await flush()

    // 6 周 × 7 天全量替换，日号不再出现
    expect(document.querySelectorAll('.picker-panel-cell-inner .custom-day').length).toBe(42)
    expect(cellTexts().every((text) => text.endsWith('#number'))).toBe(true)
    // 内层容器本身仍是组件的（选中 / 悬浮 / 区间底色挂在它身上）
    expect(document.querySelector('.picker-panel-cell-selected .picker-panel-cell-inner')?.textContent?.trim()).toBe(
      '15#number'
    )
  })

  it('同名插槽优先于 prop', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        open: true,
        value: CURRENT,
        dateRender: () => h('span', { class: 'custom-day' }, 'prop')
      },
      slots: {
        dateRender: () => [h('span', { class: 'slot-day' }, 'slot')]
      }
    })
    await flush()

    expect(document.querySelectorAll('.slot-day').length).toBeGreaterThan(0)
    expect(document.querySelectorAll('.custom-day').length).toBe(0)
  })

  it('范围形态的两侧面板同样生效', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        type: 'daterange',
        open: true,
        value: [CURRENT, new Date(2026, 9, 20).getTime()],
        dateRender: ({ current }: { current: number }) => h('span', { class: 'custom-day' }, `${current}`)
      }
    })
    await flush()

    const panels = document.querySelectorAll('.picker-range-panel')
    expect(panels.length).toBe(2)
    expect(panels[0].querySelectorAll('.custom-day').length).toBeGreaterThan(0)
    expect(panels[1].querySelectorAll('.custom-day').length).toBeGreaterThan(0)
  })
})

describe('面板底部额外页脚（renderExtraFooter）', () => {
  it('prop 形态渲染在「今天」之上，且页脚容器一并出现', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        open: true,
        value: CURRENT,
        renderExtraFooter: () => h('span', { class: 'extra-footer' }, 'extra footer')
      }
    })
    await flush()

    const footer = document.querySelector('.picker-panel-footer')
    expect(footer).not.toBeNull()
    const extra = footer?.querySelector('.picker-panel-footer-extra')
    expect(extra?.textContent?.trim()).toBe('extra footer')
    // 额外页脚是页脚容器的第一个子元素 ⇒ 排在「今天」之上
    expect(footer?.firstElementChild).toBe(extra)
    expect(footer?.querySelector('.picker-panel-today-btn')).not.toBeNull()
  })

  it('无操作行的形态（月面板）只展示额外页脚', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        type: 'month',
        open: true,
        value: CURRENT,
        renderExtraFooter: () => h('span', { class: 'extra-footer' }, 'month extra')
      }
    })
    await flush()

    const footer = document.querySelector('.picker-panel-footer')
    expect(footer?.querySelector('.picker-panel-footer-extra')?.textContent?.trim()).toBe('month extra')
    expect(footer?.querySelector('.picker-panel-today-btn')).toBeNull()
  })

  it('日期时间范围：额外页脚与「确定」同处一个页脚，且排在它之上', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        type: 'datetimerange',
        open: true,
        value: [CURRENT, new Date(2026, 9, 20).getTime()],
        renderExtraFooter: () => h('span', { class: 'extra-footer' }, 'range extra')
      }
    })
    await flush()

    const footer = document.querySelector('.picker-panel-footer')
    expect(footer).not.toBeNull()
    expect(footer?.firstElementChild?.querySelector('.extra-footer')?.textContent?.trim()).toBe('range extra')
    expect(footer?.querySelector('.picker-panel-ok')).not.toBeNull()
  })

  it('同名插槽优先于 prop', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        open: true,
        value: CURRENT,
        renderExtraFooter: () => h('span', { class: 'extra-footer' }, 'prop')
      },
      slots: {
        renderExtraFooter: () => [h('span', { class: 'slot-extra' }, 'slot')]
      }
    })
    await flush()

    expect(document.querySelector('.picker-panel-footer-extra .slot-extra')?.textContent).toBe('slot')
    expect(document.querySelectorAll('.extra-footer').length).toBe(0)
  })
})
