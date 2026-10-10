import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker/DatePicker.vue'
import { getClosingViewTimestamp, getPanelModeOf, getRangeCellClassNames } from 'components/picker/date-utils'
import { flushTransition } from './helpers'

/**
 * 回归守护：月 / 季 / 年形态（`month` / `quarter` / `year` 与 `monthrange` / `yearrange` / `quarterrange`）。
 *
 * 锁定四组语义：
 * 1. 形态 → 面板层级：月 / 季 / 年形态展开即落在对应面板，周形态仍落在日期面板；
 * 2. 点格提交：面板层级等于形态层级时点格即提交；钻取态（点头部「年」进年面板）只平移视图、
 *    回原层级、不提交；
 * 3. 范围形态：两面板相差一格（月 / 季差 1 年、年差十年），钻取收起单面板；
 * 4. 粒度假对齐：范围高亮与禁用判定随层级切换（月格按月、季格按季、年格按年）。
 */
const JAN_2026 = new Date(2026, 0, 1).getTime()
const FEB_2026 = new Date(2026, 1, 10).getTime()
const MAR_2026 = new Date(2026, 2, 1).getTime()
const MAY_2026 = new Date(2026, 4, 20).getTime()
const MAY_START_2026 = new Date(2026, 4, 1).getTime()
const NOV_2026 = new Date(2026, 10, 1).getTime()
const Q3_2026 = new Date(2026, 6, 1).getTime()
const YEAR_2027 = new Date(2027, 0, 1).getTime()

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await flushTransition()
}

/** 面板头部的视图文本（范围形态为两颗面板，单选形态为一颗） */
function viewHeaders(): string[] {
  return Array.from(document.querySelectorAll('.picker-panel-view')).map((el) => el.textContent?.trim() ?? '')
}

/** 范围形态的面板容器（钻取收起单面板时长度会变成 1） */
function rangePanels(): Element[] {
  return Array.from(document.querySelectorAll('.picker-range-panel-layout .picker-range-panel'))
}

/** 按 title 在指定面板内定位格（月格 `yyyy-MM`、季格 `yyyy-QQQ`、年格 `yyyy`） */
function findCellIn(scope: ParentNode, title: string): HTMLElement | undefined {
  return Array.from(scope.querySelectorAll<HTMLElement>('.picker-panel-cell')).find(
    (cell) => cell.getAttribute('title') === title
  )
}

/** 在整页范围内定位格（单选形态只有一个面板） */
function findCell(title: string): HTMLElement | undefined {
  return findCellIn(document, title)
}

/** 触发器输入区容器：预览文本取提示色时装在它身上 */
function triggerInput(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.picker-trigger-input')
}

/** 单选形态的触发器输入框（范围形态的输入框嵌在分段容器内，故只认输入区的直接子元素） */
function singleInput(): HTMLInputElement | null {
  return document.querySelector<HTMLInputElement>('.picker-trigger-input > input.picker-trigger-input-inner')
}

async function mountPicker(props: Record<string, unknown> = {}) {
  wrapper = mount(DatePicker, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    props: { open: true, defaultPickerValue: JAN_2026, ...props }
  })
  await flush()
  return wrapper
}

describe('形态 → 面板层级', () => {
  it('形态到面板层级的映射：月 / 季 / 年各归其位，日期与周归日期', () => {
    expect(getPanelModeOf('date')).toBe('date')
    expect(getPanelModeOf('month')).toBe('month')
    expect(getPanelModeOf('quarter')).toBe('quarter')
    expect(getPanelModeOf('year')).toBe('year')
    expect(getPanelModeOf('monthrange')).toBe('month')
    expect(getPanelModeOf('quarterrange')).toBe('quarter')
    expect(getPanelModeOf('yearrange')).toBe('year')
  })

  it('月形态展开即月面板：头部只留「年」、格为 12 个月且无「今天」页脚', async () => {
    await mountPicker({ type: 'month' })

    expect(viewHeaders()).toEqual(['2026年'])
    expect(document.querySelector('.picker-panel-today-btn')).toBeNull()

    const cells = document.querySelectorAll('.picker-panel-month-content .picker-panel-cell')
    expect(cells).toHaveLength(12)
    expect(findCell('2026-03')?.textContent?.trim()).toBe('3月')
  })

  it('季形态展开即季面板：4 格且文案为 Q1-Q4', async () => {
    await mountPicker({ type: 'quarter' })

    expect(viewHeaders()).toEqual(['2026年'])
    const cells = document.querySelectorAll('.picker-panel-quarter-content .picker-panel-cell')
    expect(cells).toHaveLength(4)
    expect(Array.from(cells).map((cell) => cell.textContent?.trim())).toEqual(['Q1', 'Q2', 'Q3', 'Q4'])
    expect(findCell('2026-Q3')).not.toBeUndefined()
  })

  it('年形态展开即年面板：十年区间文本 + 12 格（含相邻十年）', async () => {
    await mountPicker({ type: 'year' })

    expect(viewHeaders()).toEqual(['2020-2029'])
    const cells = document.querySelectorAll('.picker-panel-year-content .picker-panel-cell')
    expect(cells).toHaveLength(12)
    expect(findCell('2019')).not.toBeUndefined()
    expect(findCell('2030')).not.toBeUndefined()
  })

  it('周形态仍落在日期面板（面板层级取日期）', async () => {
    await mountPicker({ type: 'week' })

    expect(viewHeaders()).toEqual(['2026年1月'])
    expect(document.querySelectorAll('.picker-panel-date-content .picker-panel-cell')).toHaveLength(42)
  })
})

describe('点格提交与钻取', () => {
  it('月形态点月格即提交，并回写展示文本', async () => {
    const picker = await mountPicker({ type: 'month' })
    findCell('2026-03')?.click()
    await flush()

    expect(picker.emitted('update:value')?.at(-1)).toEqual([MAR_2026])
    expect(picker.emitted('change')?.at(-1)).toEqual([MAR_2026, '2026-03'])
    expect(picker.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('季形态点季格即提交，季度文本为 Q 编号', async () => {
    const picker = await mountPicker({ type: 'quarter' })
    findCell('2026-Q3')?.click()
    await flush()

    expect(picker.emitted('update:value')?.at(-1)).toEqual([Q3_2026])
    expect(picker.emitted('change')?.at(-1)).toEqual([Q3_2026, '2026-Q3'])
  })

  it('年形态点年格即提交，十年代外的相邻年格同样可提交', async () => {
    const picker = await mountPicker({ type: 'year' })

    findCell('2027')?.click()
    await flush()
    expect(picker.emitted('change')?.at(-1)).toEqual([YEAR_2027, '2027'])

    findCell('2019')?.click()
    await flush()
    expect(picker.emitted('change')?.at(-1)).toEqual([new Date(2019, 0, 1).getTime(), '2019'])
  })

  it('月形态点头部「年」进年面板，选年只回原层级、不提交', async () => {
    const picker = await mountPicker({ type: 'month' })
    document.querySelector<HTMLElement>('.picker-panel-year-btn')?.click()
    await flush()
    expect(viewHeaders()).toEqual(['2020-2029'])

    findCell('2027')?.click()
    await flush()

    expect(viewHeaders()).toEqual(['2027年'])
    expect(picker.emitted('change')).toBeUndefined()
    expect(picker.emitted('panelChange')?.at(-1)?.[1]).toBe('month')
  })

  it('日期形态点月格仍只切换视图、不提交', async () => {
    const picker = await mountPicker({ type: 'date' })
    document.querySelector<HTMLElement>('.picker-panel-month-btn')?.click()
    await flush()
    expect(viewHeaders()).toEqual(['2026年'])

    findCell('2026-03')?.click()
    await flush()

    expect(viewHeaders()).toEqual(['2026年3月'])
    expect(picker.emitted('change')).toBeUndefined()
  })

  it('禁用粒度随层级：季形态整季不可选才禁用', async () => {
    await mountPicker({
      type: 'quarter',
      disabledDate: (timestamp: number) => timestamp < new Date(2026, 3, 1).getTime()
    })

    expect(findCell('2026-Q1')?.classList.contains('picker-panel-cell-disabled')).toBe(true)
    expect(findCell('2026-Q2')?.classList.contains('picker-panel-cell-disabled')).toBe(false)
  })
})

describe('范围形态的粒度与钻取', () => {
  it('月范围的右面板为下一年（相差一格 = 1 年）', async () => {
    await mountPicker({ type: 'monthrange' })

    expect(viewHeaders()).toEqual(['2026年', '2027年'])
    expect(rangePanels()).toHaveLength(2)
    const [left, right] = rangePanels()
    expect(findCellIn(left, '2026-05')).not.toBeUndefined()
    expect(findCellIn(right, '2027-05')).not.toBeUndefined()
  })

  it('季范围的右面板为下一年，格仍为季格', async () => {
    await mountPicker({ type: 'quarterrange' })

    const [left, right] = rangePanels()
    expect(findCellIn(left, '2026-Q2')).not.toBeUndefined()
    expect(findCellIn(right, '2027-Q2')).not.toBeUndefined()
  })

  it('年范围的右面板相差十年', async () => {
    await mountPicker({ type: 'yearrange' })

    expect(viewHeaders()).toEqual(['2020-2029', '2030-2039'])
  })

  it('年范围右面板翻页时左面板同步平移十年', async () => {
    await mountPicker({ type: 'yearrange' })

    rangePanels()[1].querySelector<HTMLElement>('.picker-panel-super-next')?.click()
    await flush()

    expect(viewHeaders()).toEqual(['2030-2039', '2040-2049'])
  })

  it('月范围点左面板月格提交起点段并保持展开', async () => {
    const picker = await mountPicker({ type: 'monthrange' })
    findCellIn(rangePanels()[0], '2026-05')?.click()
    await flush()

    expect(picker.emitted('calendarChange')?.at(-1)).toEqual([
      [MAY_START_2026, null],
      ['2026-05', ''],
      { range: 'start' }
    ])
    expect(picker.emitted('change')).toBeUndefined()
    expect(rangePanels()).toHaveLength(2)
  })

  it('月范围点头部「年」收成单面板，选年后回到双面板', async () => {
    await mountPicker({ type: 'monthrange' })

    rangePanels()[0].querySelector<HTMLElement>('.picker-panel-year-btn')?.click()
    await flush()
    expect(rangePanels()).toHaveLength(1)
    expect(viewHeaders()).toEqual(['2020-2029'])

    findCell('2027')?.click()
    await flush()
    expect(rangePanels()).toHaveLength(2)
    expect(viewHeaders()).toEqual(['2027年', '2028年'])
  })

  it('月范围按粒度高亮：端点落在月格、区间底色覆盖整月', async () => {
    await mountPicker({ type: 'monthrange', value: [FEB_2026, MAY_2026] })

    const left = rangePanels()[0]
    expect(findCellIn(left, '2026-02')?.classList.contains('picker-panel-cell-range-start')).toBe(true)
    expect(findCellIn(left, '2026-03')?.classList.contains('picker-panel-cell-in-range')).toBe(true)
    expect(findCellIn(left, '2026-04')?.classList.contains('picker-panel-cell-in-range')).toBe(true)
    expect(findCellIn(left, '2026-05')?.classList.contains('picker-panel-cell-range-end')).toBe(true)
    expect(findCellIn(left, '2026-06')?.classList.contains('picker-panel-cell-in-range')).toBe(false)
  })

  it('年范围按粒度高亮，十年代外的年格不铺区间底色', async () => {
    await mountPicker({
      type: 'yearrange',
      value: [new Date(2026, 5, 1).getTime(), new Date(2031, 5, 1).getTime()]
    })

    const left = rangePanels()[0]
    expect(findCellIn(left, '2026')?.classList.contains('picker-panel-cell-range-start')).toBe(true)
    expect(findCellIn(left, '2028')?.classList.contains('picker-panel-cell-in-range')).toBe(true)
    // 2030 / 2031 属十年代外：不参与区间底色（其在视图内的文字色另由 out-view 控制）
    expect(findCellIn(left, '2030')?.classList.contains('picker-panel-cell-in-range')).toBe(false)
  })
})

describe('范围格类名的粒度', () => {
  it('月格按月比较：同月不同日视为同格', () => {
    const context = { value: [FEB_2026, MAY_2026] as [number, number], viewDate: JAN_2026, mode: 'month' as const }
    expect(getRangeCellClassNames(FEB_2026, context)['picker-panel-cell-range-start']).toBe(true)
    expect(getRangeCellClassNames(MAR_2026, context)['picker-panel-cell-in-range']).toBe(true)
    expect(getRangeCellClassNames(MAY_2026, context)['picker-panel-cell-range-end']).toBe(true)
  })

  it('季格按季比较：季内任一月都算同格', () => {
    const context = { value: [FEB_2026, NOV_2026] as [number, number], viewDate: JAN_2026, mode: 'quarter' as const }
    expect(getRangeCellClassNames(new Date(2026, 0, 1).getTime(), context)['picker-panel-cell-range-start']).toBe(true)
    expect(getRangeCellClassNames(Q3_2026, context)['picker-panel-cell-in-range']).toBe(true)
    expect(getRangeCellClassNames(new Date(2026, 9, 1).getTime(), context)['picker-panel-cell-range-end']).toBe(true)
    expect(getRangeCellClassNames(new Date(2027, 0, 1).getTime(), context)['picker-panel-cell-in-range']).toBe(false)
  })

  it('年格按年比较，且视图范围为当前十年', () => {
    const context = {
      value: [new Date(2026, 5, 1).getTime(), new Date(2028, 5, 1).getTime()] as [number, number],
      viewDate: JAN_2026,
      mode: 'year' as const
    }
    expect(getRangeCellClassNames(YEAR_2027, context)['picker-panel-cell-in-range']).toBe(true)
  })

  it('另一侧面板的视图偏移随层级：月 / 季差 1 年、年差十年、日期差 1 月', () => {
    expect(getClosingViewTimestamp(JAN_2026, 'month')).toBe(new Date(2027, 0, 1).getTime())
    expect(getClosingViewTimestamp(JAN_2026, 'quarter')).toBe(new Date(2027, 0, 1).getTime())
    expect(getClosingViewTimestamp(JAN_2026, 'year')).toBe(new Date(2036, 0, 1).getTime())
    expect(getClosingViewTimestamp(JAN_2026, 'date')).toBe(new Date(2026, 1, 1).getTime())
    // 年形态的一格是十年区间，故反推亦按十年平移（推移后回推可还原）
    const nextDecade = getClosingViewTimestamp(JAN_2026, 'year')
    expect(nextDecade).toBe(new Date(2036, 0, 1).getTime())
    expect(getClosingViewTimestamp(nextDecade, 'year', -1)).toBe(JAN_2026)
  })
})

describe('单选形态悬浮预览', () => {
  it('悬浮日期格时输入框展示该格预览文本并取提示色，移出后恢复真实值', async () => {
    const picker = await mountPicker({ type: 'date', value: JAN_2026 })
    expect(singleInput()?.value).toBe('2026-01-01')

    findCell('2026-01-15')?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(singleInput()?.value).toBe('2026-01-15')
    expect(triggerInput()?.classList.contains('picker-trigger-input-placeholder')).toBe(true)

    findCell('2026-01-15')?.dispatchEvent(new MouseEvent('mouseleave'))
    await flush()
    expect(singleInput()?.value).toBe('2026-01-01')
    expect(triggerInput()?.classList.contains('picker-trigger-input-placeholder')).toBe(false)

    // 预览只是展示，不落值也不派发变更
    expect(picker.emitted('change')).toBeUndefined()
    expect(picker.emitted('update:value')).toBeUndefined()
  })

  it('月形态悬浮月格同口径预览（预览文本取该形态的展示格式）', async () => {
    await mountPicker({ type: 'month', value: MAR_2026 })
    expect(singleInput()?.value).toBe('2026-03')

    findCell('2026-07')?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(singleInput()?.value).toBe('2026-07')
    expect(triggerInput()?.classList.contains('picker-trigger-input-placeholder')).toBe(true)
  })
})
