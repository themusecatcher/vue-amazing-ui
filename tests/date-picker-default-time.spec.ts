import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker/DatePicker.vue'
import { flushTransition } from './helpers'

/**
 * 回归守护：空草稿时的默认时分秒（`defaultTime`）。
 *
 * 锁定三组语义：
 * 1. 按段取值——范围形态可传两元组，各段取各自的默认时刻，某段为 `undefined` 时退回当前时刻；
 * 2. 时间列不预选——空草稿时不选中任何项、头部留空（面板不显示即不承诺，故选中日期时时间列不跳变）；
 * 3. 落值分属两条链——点日期的时分秒取 `defaultTime`（未声明则当前时刻），点时间的落值日期取
 *    另一端那一日；未选中的单位按 `0` 补。
 */
const VIEW_DATE = new Date(2026, 0, 1).getTime()
/** 起点端的确定性值：09:00，用作「另一端时刻」以验证它不参与空段的展示与落值 */
const START_AT_NINE = new Date(2026, 0, 10, 9, 0, 0).getTime()
/** 起点端默认时刻：当日 0 点 */
const START_DEFAULT_TIME = new Date(2026, 0, 1).getTime()
/** 终点端默认时刻：当日 16:20:30 */
const END_DEFAULT_TIME = new Date(2026, 0, 1, 16, 20, 30).getTime()

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await flushTransition()
}

function mountPicker(props: Record<string, unknown> = {}) {
  wrapper = mount(DatePicker, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    props: { open: true, defaultPickerValue: VIEW_DATE, ...props }
  })
  return flush().then(() => wrapper)
}

/** 按 title（`yyyy-MM-dd`）定位日期格 */
function findCell(dateText: string): HTMLElement | undefined {
  return Array.from(document.querySelectorAll<HTMLElement>('.picker-panel-cell')).find(
    (cell) => cell.getAttribute('title') === dateText
  )
}

/** 时间列当前预选的刻度文本（年 / 月 / 日三列，24 小时制按列序取） */
function selectedTimeLabels(): string[] {
  return Array.from(document.querySelectorAll('.picker-time-column')).map(
    (column) => column.querySelector('.picker-time-cell-selected .picker-time-cell-inner')?.textContent ?? ''
  )
}

/** 触发器两段输入框（范围形态） */
function rangeInputs(): HTMLInputElement[] {
  return Array.from(document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner'))
}

/** 激活终点段（该段为空时面板以另一端为锚点，正是双链需要分离的场景） */
async function activateEndSide(): Promise<void> {
  rangeInputs()[1]?.focus()
  await flush()
}

/** 点击面板底部的「确定」 */
function clickOk(): void {
  document.querySelector<HTMLElement>('.picker-panel-ok .btn-wrap')?.click()
}

describe('按段指定默认时分秒', () => {
  it('范围形态的各段取各自的默认时刻', async () => {
    const range = await mountPicker({
      type: 'datetimerange',
      value: null,
      defaultTime: [START_DEFAULT_TIME, END_DEFAULT_TIME]
    })

    findCell('2026-01-10')?.click()
    await flush()
    clickOk()
    await flush()

    findCell('2026-01-20')?.click()
    await flush()
    clickOk()
    await flush()

    // 起点段取首项（00:00:00），终点段取次项（16:20:30）
    expect(range.emitted('change')?.at(-1)).toEqual([
      [new Date(2026, 0, 10).getTime(), new Date(2026, 0, 20, 16, 20, 30).getTime()],
      ['2026-01-10 00:00:00', '2026-01-20 16:20:30']
    ])
  })

  it('某段为 undefined 时该段退回当前时刻，不影响另一段', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 0, 5, 7, 45, 30))
    try {
      const range = await mountPicker({
        type: 'datetimerange',
        value: null,
        defaultTime: [undefined, END_DEFAULT_TIME]
      })

      findCell('2026-01-10')?.click()
      await flush()
      // 起点段未声明默认时刻 → 退回当前时刻的时分秒
      expect(rangeInputs()[0]?.value).toBe('2026-01-10 07:45:30')

      clickOk()
      await flush()
      findCell('2026-01-20')?.click()
      await flush()
      clickOk()
      await flush()

      // 终点段仍取自己的默认时刻
      expect(range.emitted('change')?.at(-1)).toEqual([
        [new Date(2026, 0, 10, 7, 45, 30).getTime(), new Date(2026, 0, 20, 16, 20, 30).getTime()],
        ['2026-01-10 07:45:30', '2026-01-20 16:20:30']
      ])
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('空草稿的时间列不预选', () => {
  it('范围形态空段不选中任何刻度，也不被另一端时刻顶替', async () => {
    await mountPicker({
      type: 'datetimerange',
      value: [START_AT_NINE, null],
      defaultTime: [START_DEFAULT_TIME, END_DEFAULT_TIME]
    })

    await activateEndSide()

    // 激活段为空的终点段：不预选（既不取自身默认时刻 16:20:30，也不取起点的 09:00:00）
    expect(selectedTimeLabels()).toEqual(['', '', ''])
    expect(document.querySelector('.picker-time-panel-view')?.textContent?.trim()).toBe('')
  })

  it('单选形态空值同样不预选', async () => {
    await mountPicker({ type: 'datetime', value: null, defaultTime: END_DEFAULT_TIME })

    expect(selectedTimeLabels()).toEqual(['', '', ''])
  })

  it('未设默认时分秒时空段依旧不预选（改为取当前时刻）', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 0, 5, 7, 45, 30))
    try {
      await mountPicker({ type: 'datetimerange', value: [START_AT_NINE, null] })

      await activateEndSide()

      expect(selectedTimeLabels()).toEqual(['', '', ''])
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('空草稿的落值', () => {
  it('点日期的时分秒取该段默认时刻（时间列不显示也不影响落值）', async () => {
    const range = await mountPicker({
      type: 'datetimerange',
      value: [START_AT_NINE, null],
      defaultTime: [START_DEFAULT_TIME, END_DEFAULT_TIME]
    })

    await activateEndSide()
    findCell('2026-01-20')?.click()
    await flush()

    expect(rangeInputs()[1]?.value).toBe('2026-01-20 16:20:30')

    clickOk()
    await flush()
    const payload = range.emitted('ok')?.at(-1) as [Array<number | null>, string[]]
    expect(payload[0][1]).toBe(new Date(2026, 0, 20, 16, 20, 30).getTime())
  })

  it('未设默认时分秒时点日期的时分秒取当前时刻（不取另一端时刻）', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 0, 5, 7, 45, 30))
    try {
      await mountPicker({ type: 'datetimerange', value: [START_AT_NINE, null] })

      await activateEndSide()
      findCell('2026-01-20')?.click()
      await flush()

      expect(rangeInputs()[1]?.value).toBe('2026-01-20 07:45:30')
    } finally {
      vi.useRealTimers()
    }
  })

  it('点时间的落值日期取另一端那一日，未选中的单位按 0 补', async () => {
    const range = await mountPicker({
      type: 'datetimerange',
      value: [START_AT_NINE, null],
      defaultTime: [START_DEFAULT_TIME, END_DEFAULT_TIME]
    })

    await activateEndSide()
    // 终点段为空：点时间格落值在另一端（起点）那一日，而不是默认时刻所在的那一日
    document
      .querySelectorAll<HTMLElement>('.picker-time-column')[0]
      ?.querySelectorAll<HTMLElement>('.picker-time-cell')[10]
      ?.click()
    await flush()

    // 时间列不预选 → 未点过的分 / 秒按 0 补，幂等的只有日期部分
    expect(rangeInputs()[1]?.value).toBe('2026-01-10 10:00:00')
    clickOk()
    await flush()
    const payload = range.emitted('ok')?.at(-1) as [Array<number | null>, string[]]
    expect(payload[0][1]).toBe(new Date(2026, 0, 10, 10, 0, 0).getTime())
  })
})
