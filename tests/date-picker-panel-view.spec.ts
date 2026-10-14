import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker/DatePicker.vue'
import { flushTransition } from './helpers'

/**
 * 回归守护：面板的展示月份跟随当前值。
 *
 * 浮层收起后面板并不销毁，展示月份必须在「展开」这一刻回到当前值；
 * 否则收起前的翻页会留在视图里，面板与触发器上显示的日期对不上——预设填入、外部改写值后重新展开
 * 都是这条路径。
 */
const SEPT_START = new Date(2026, 8, 10).getTime()
const SEPT_END = new Date(2026, 8, 20).getTime()
const OCT_START = new Date(2026, 9, 5).getTime()

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await flushTransition()
}

/** 面板头部的展示月份文本（范围形态为两个面板，单选形态为一个） */
function viewHeaders(): string[] {
  return Array.from(document.querySelectorAll('.picker-panel-view')).map((el) => el.textContent?.trim() ?? '')
}

/** 点击面板的「下一」（范围形态取右面板那颗：左面板的「下一」隐去不可点） */
function clickNextPanel(panelIndex: number): void {
  const panels = document.querySelectorAll('.picker-range-panel')
  const scope = panels[panelIndex] ?? document
  scope.querySelector<HTMLElement>('.picker-panel-next')?.click()
}

describe('面板展示月份的跟随', () => {
  it('范围形态展开时回到区间起点所在月，收起前的翻页不保留', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { type: 'daterange', open: true, value: [SEPT_START, SEPT_END] }
    })
    await flush()

    expect(viewHeaders()[0]).toContain('2026年9月')
    expect(viewHeaders()[1]).toContain('2026年10月')

    // 右面板单步翻页：两侧面板一起前进一个月
    clickNextPanel(1)
    await flush()
    expect(viewHeaders()[0]).toContain('2026年10月')

    await wrapper.setProps({ open: false })
    await flush()
    await wrapper.setProps({ open: true })
    await flush()

    // 重新展开：视图回到区间起点所在月
    expect(viewHeaders()[0]).toContain('2026年9月')
    expect(viewHeaders()[1]).toContain('2026年10月')
  })

  it('范围形态收起期间值被改写，展开后跟随新的起点', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { type: 'daterange', open: true, value: [SEPT_START, SEPT_END] }
    })
    await flush()

    await wrapper.setProps({ open: false })
    await flush()
    await wrapper.setProps({ value: [OCT_START, SEPT_END], open: true })
    await flush()

    expect(viewHeaders()[0]).toContain('2026年10月')
    expect(viewHeaders()[1]).toContain('2026年11月')
  })

  it('单选形态展开时回到当前值所在月', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: SEPT_START }
    })
    await flush()
    expect(viewHeaders()[0]).toContain('2026年9月')

    document.querySelector<HTMLElement>('.picker-panel-next')?.click()
    await flush()
    expect(viewHeaders()[0]).toContain('2026年10月')

    await wrapper.setProps({ open: false })
    await flush()
    await wrapper.setProps({ open: true })
    await flush()
    expect(viewHeaders()[0]).toContain('2026年9月')
  })
})
