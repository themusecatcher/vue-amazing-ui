import { describe, it, expect, vi, afterEach } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker/DatePicker.vue'
import Popup from 'components/popup'
import { getRangeCellClassNames, isInRangeTimestamp, isOutOfRangeBoundary } from 'components/picker/date-utils'
import { flushTransition } from './helpers'

/**
 * 回归守护：范围形态（`type="daterange"` / `type="datetimerange"`）与预设选项。
 *
 * 锁定五组语义：
 * 1. 范围格类名——区间底色只覆盖**严格内部**（两端由起止类名表达），悬浮预览要求两端齐全且有序；
 * 2. 面板结构——左右两个日期面板并排，右面板恒为左面板的下一月，两侧翻页同步；
 * 3. 选择提交——选完一段保持展开并切到另一段，两段齐全才提交并收起，
 *    起点晚于终点时丢弃另一端，`allowEmpty` 允许单段对外提交；
 * 4. 日期时间范围——单个日期时间面板，选择只落草稿、点「确定」提交并按需切段，禁用时间按段注入；
 * 5. 预设选项——点击即提交并收起（函数值惰性求值），悬浮时在面板上预览区间。
 */
const START = new Date(2026, 0, 10).getTime()
const END = new Date(2026, 0, 20).getTime()
const MIDDLE = new Date(2026, 0, 15).getTime()
const LATE_START = new Date(2026, 0, 25).getTime()
const VIEW_DATE = new Date(2026, 0, 1).getTime()
/** 日期时间形态的确定性时分秒（不传时取当前时刻，用例结果会随时间变化） */
const DEFAULT_TIME = new Date(2026, 0, 1, 8, 30, 0).getTime()
/** 空草稿选中的日期会带上 `defaultTime` 的时分秒 */
const START_WITH_TIME = new Date(2026, 0, 10, 8, 30, 0).getTime()
const END_WITH_TIME = new Date(2026, 0, 20, 8, 30, 0).getTime()

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await flushTransition()
}

/** 按 title（`yyyy-MM-dd`）定位日期格：范围形态同一日期只会出现在一个面板中 */
function findCell(dateText: string): HTMLElement | undefined {
  return Array.from(document.querySelectorAll<HTMLElement>('.picker-panel-cell')).find(
    (cell) => cell.getAttribute('title') === dateText
  )
}

async function mountRange(props: Record<string, unknown> = {}) {
  wrapper = mount(DatePicker, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    // 视图固定到 2026-01，保证目标日期格落在面板内（范围默认视图取起点值）
    props: { type: 'daterange', open: true, defaultPickerValue: VIEW_DATE, ...props }
  })
  await flush()
  return wrapper
}

describe('范围格类名', () => {
  const context = { value: [START, END] as [number, number], viewDate: VIEW_DATE }

  it('区间底色只覆盖严格内部，两端由起止类名表达', () => {
    expect(getRangeCellClassNames(START, context)['picker-panel-cell-in-range']).toBe(false)
    expect(getRangeCellClassNames(MIDDLE, context)['picker-panel-cell-in-range']).toBe(true)
    expect(getRangeCellClassNames(END, context)['picker-panel-cell-in-range']).toBe(false)

    expect(getRangeCellClassNames(START, context)['picker-panel-cell-range-start']).toBe(true)
    expect(getRangeCellClassNames(END, context)['picker-panel-cell-range-end']).toBe(true)
    expect(getRangeCellClassNames(MIDDLE, context)['picker-panel-cell-range-start']).toBe(false)
  })

  it('只选到一段时命中单段端点类名', () => {
    const singleStart = getRangeCellClassNames(START, { value: [START, null], viewDate: VIEW_DATE })
    expect(singleStart['picker-panel-cell-range-start']).toBe(true)
    expect(singleStart['picker-panel-cell-range-start-single']).toBe(true)

    const singleEnd = getRangeCellClassNames(END, { value: [null, END], viewDate: VIEW_DATE })
    expect(singleEnd['picker-panel-cell-range-end']).toBe(true)
    expect(singleEnd['picker-panel-cell-range-end-single']).toBe(true)
  })

  it('悬浮预览只在两端齐全且有序时生效', () => {
    const hovered = getRangeCellClassNames(MIDDLE, {
      value: null,
      hoverValue: [START, END],
      viewDate: VIEW_DATE
    })
    expect(hovered['picker-panel-cell-range-hover']).toBe(true)

    // 两端顺序颠倒（起点晚于终点）时不产生预览
    const reversed = getRangeCellClassNames(MIDDLE, {
      value: null,
      hoverValue: [END, START],
      viewDate: VIEW_DATE
    })
    expect(reversed['picker-panel-cell-range-hover']).toBe(false)
  })

  it('区间判定不计入两端', () => {
    expect(isInRangeTimestamp(START, END, START)).toBe(false)
    expect(isInRangeTimestamp(START, END, END)).toBe(false)
    expect(isInRangeTimestamp(START, END, MIDDLE)).toBe(true)
    expect(isInRangeTimestamp(START, null, MIDDLE)).toBe(false)
  })

  it('跨月补齐日的区间与悬浮类名与本月格同口径', () => {
    // 视图停在 2026-01，该格属于下一月补齐日（不在视图月内）
    const outOfView = new Date(2026, 1, 1).getTime()
    const hovered = getRangeCellClassNames(outOfView, {
      value: [START, null],
      hoverValue: [START, outOfView],
      viewDate: VIEW_DATE
    })
    // 悬浮端点类名照常落在跨月格上：面板的悬浮底色规则据此判定该格是否吃底色
    expect(hovered['picker-panel-cell-range-hover-end']).toBe(true)

    const inRange = getRangeCellClassNames(outOfView, {
      value: [START, new Date(2026, 1, 10).getTime()],
      viewDate: VIEW_DATE
    })
    expect(inRange['picker-panel-cell-in-range']).toBe(true)
  })

  it('越界判定以边界当日为零点比较，同日不算越界', () => {
    const dayBefore = new Date(2026, 0, 9).getTime()
    const dayAfter = new Date(2026, 0, 11).getTime()
    const sameDayLater = new Date(2026, 0, 10, 23, 59, 59).getTime()

    // 边界为起点：早于起点越界，同日（含更晚时刻）不越界
    expect(isOutOfRangeBoundary(dayBefore, START, true)).toBe(true)
    expect(isOutOfRangeBoundary(START, START, true)).toBe(false)
    expect(isOutOfRangeBoundary(sameDayLater, START, true)).toBe(false)
    expect(isOutOfRangeBoundary(dayAfter, START, true)).toBe(false)

    // 边界为终点：晚于终点越界
    expect(isOutOfRangeBoundary(LATE_START, END, false)).toBe(true)
    expect(isOutOfRangeBoundary(dayAfter, END, false)).toBe(false)
    expect(isOutOfRangeBoundary(START, END, false)).toBe(false)
  })
})

describe('范围形态的面板结构', () => {
  it('渲染左右两个日期面板，右面板为左面板的下一月', async () => {
    await mountRange({ value: [START, END] })
    const panels = document.querySelectorAll('.picker-range-panel-layout .picker-range-panel')
    expect(panels).toHaveLength(2)

    const headers = Array.from(document.querySelectorAll('.picker-panel-view')).map((el) => el.textContent?.trim())
    expect(headers).toHaveLength(2)
    expect(headers[0]).toContain('2026')
    expect(headers[1]).not.toBe(headers[0])
  })

  it('两侧头部结构一致：左面板隐去「下一」组、右面板隐去「上一」组并保留占位', async () => {
    await mountRange({ value: [START, END] })
    const panels = document.querySelectorAll('.picker-range-panel-layout .picker-range-panel')
    const isHidden = (panel: Element, selector: string): boolean | undefined =>
      panel.querySelector(selector)?.classList.contains('picker-panel-nav-hidden')

    // 两侧头部结构相同（各 4 个导航按钮）：视图区才会落在同一水平位置
    expect(panels[0].querySelectorAll('.picker-panel-header > button')).toHaveLength(4)
    expect(panels[1].querySelectorAll('.picker-panel-header > button')).toHaveLength(4)

    // 隐去的是整组导航（含「跨单位」按钮），本体隐去、占位保留
    expect(isHidden(panels[0], '.picker-panel-next')).toBe(true)
    expect(isHidden(panels[0], '.picker-panel-super-next')).toBe(true)
    expect(isHidden(panels[0], '.picker-panel-prev')).toBe(false)
    expect(isHidden(panels[0], '.picker-panel-super-prev')).toBe(false)
    expect(isHidden(panels[1], '.picker-panel-prev')).toBe(true)
    expect(isHidden(panels[1], '.picker-panel-super-prev')).toBe(true)
    expect(isHidden(panels[1], '.picker-panel-next')).toBe(false)
    expect(isHidden(panels[1], '.picker-panel-super-next')).toBe(false)
  })

  it('触发器渲染两段文本与分隔符', async () => {
    await mountRange({ value: [START, END] })
    const trigger = document.querySelector('.picker-trigger')
    expect(trigger?.querySelectorAll('.picker-trigger-range-item')).toHaveLength(2)
    expect(trigger?.querySelector('.picker-trigger-range-separator')).not.toBeNull()

    const inputs = trigger?.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner')
    expect(inputs?.[0]?.value).toBe('2026-01-10')
    expect(inputs?.[1]?.value).toBe('2026-01-20')
  })

  it('面板上渲染随激活段移动的指示箭头', async () => {
    await mountRange({ value: [START, END] })
    const arrow = document.querySelector('.datepicker-range-arrow')
    expect(arrow).not.toBeNull()
    expect(arrow?.getAttribute('style')).toContain('left:')
  })

  it('指示箭头只在左侧对齐的方位渲染', async () => {
    await mountRange({ value: [START, END], placement: 'bottomRight' })
    expect(document.querySelector('.datepicker-range-arrow')).toBeNull()
  })

  it('左上方位仍保留指示箭头（翻转后按实际方位判定）', async () => {
    await mountRange({ value: [START, END], placement: 'topLeft' })
    expect(document.querySelector('.datepicker-range-arrow')).not.toBeNull()
  })

  it('showArrow 传 false 时强制隐藏指示箭头', async () => {
    await mountRange({ value: [START, END], showArrow: false })
    expect(document.querySelector('.datepicker-range-arrow')).toBeNull()
  })

  it('showArrow 传 true 时右侧对齐方位也展示指示箭头', async () => {
    await mountRange({ value: [START, END], placement: 'bottomRight', showArrow: true })
    expect(document.querySelector('.datepicker-range-arrow')).not.toBeNull()
  })

  it('面板过渡名与实际方位无关（首帧方位未回填也不会取到反向动效）', async () => {
    const range = await mountRange({ value: [START, END] })
    expect(range.findComponent(Popup).props('transitionProps')).toEqual({ name: 'datepicker-zoom' })
  })

  it('日期格标记月首与月末（范围预览据此在跨月边界收边）', async () => {
    await mountRange({ value: [START, END] })

    const first = findCell('2026-01-01')
    expect(first?.classList.contains('picker-panel-cell-start')).toBe(true)
    expect(first?.classList.contains('picker-panel-cell-end')).toBe(false)

    const last = findCell('2026-01-31')
    expect(last?.classList.contains('picker-panel-cell-end')).toBe(true)
    expect(last?.classList.contains('picker-panel-cell-start')).toBe(false)
  })
})

describe('范围形态的选择语义', () => {
  it('选起点后保持展开并切到终点段，两段齐全才提交并收起', async () => {
    const range = await mountRange({ value: null })
    findCell('2026-01-10')?.click()
    await flush()

    expect(range.emitted('calendarChange')?.at(-1)).toEqual([[START, null], ['2026-01-10', ''], { range: 'start' }])
    expect(range.emitted('change')).toBeUndefined()
    expect(range.emitted('update:open')).toBeUndefined()

    findCell('2026-01-20')?.click()
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([
      [START, END],
      ['2026-01-10', '2026-01-20']
    ])
    expect(range.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('起点晚于终点时丢弃另一端，只保留本次选择', async () => {
    // 已有终点而起点为空，此时选一个更晚的日期作为起点 → 终点被丢弃
    const range = await mountRange({ value: [null, END] })
    findCell('2026-01-25')?.click()
    await flush()

    expect(range.emitted('calendarChange')?.at(-1)).toEqual([
      [LATE_START, null],
      ['2026-01-25', ''],
      { range: 'start' }
    ])
    expect(range.emitted('change')).toBeUndefined()
  })

  it('allowEmpty 允许为空时单段值也会对外提交', async () => {
    const range = await mountRange({ value: null, allowEmpty: [false, true] })
    findCell('2026-01-10')?.click()
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([
      [START, null],
      ['2026-01-10', '']
    ])
  })

  it('清空按钮把两条轨道同时置空', async () => {
    const range = await mountRange({ value: [START, END] })
    document.querySelector<HTMLElement>('.picker-trigger-clear')?.click()
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([null, null])
    expect(range.emitted('update:value')?.at(-1)).toEqual([null])
  })

  it('选中跨月补齐日时面板视图切到该月（两侧面板一起翻页）', async () => {
    await mountRange({ value: [START, END] })
    const headers = () =>
      Array.from(document.querySelectorAll('.picker-panel-view')).map((el) => el.textContent?.trim() ?? '')
    expect(headers()[0]).toContain('2026年1月')
    expect(headers()[1]).toContain('2026年2月')

    // 左面板（1 月）首行中的 2 月补齐日
    findCell('2026-02-01')?.click()
    await flush()

    expect(headers()[0]).toContain('2026年2月')
    expect(headers()[1]).toContain('2026年3月')
  })

  it('选中起点后禁用早于起点的日期', async () => {
    await mountRange({ value: null })
    findCell('2026-01-10')?.click()
    await flush()

    expect(findCell('2026-01-05')?.classList.contains('picker-panel-cell-disabled')).toBe(true)
    expect(findCell('2026-01-15')?.classList.contains('picker-panel-cell-disabled')).toBe(false)
  })

  it('聚焦终点段后早于起点的日期被禁用', async () => {
    await mountRange({ value: [START, END] })
    expect(findCell('2026-01-05')?.classList.contains('picker-panel-cell-disabled')).toBe(false)

    document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner')[1]?.focus()
    await flush()

    expect(findCell('2026-01-05')?.classList.contains('picker-panel-cell-disabled')).toBe(true)
  })

  it('已有完整区间时改起点保持展开并切到终点段', async () => {
    const range = await mountRange({ value: [START, END] })
    const newStart = new Date(2026, 0, 5).getTime()

    findCell('2026-01-05')?.click()
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([
      [newStart, END],
      ['2026-01-05', '2026-01-20']
    ])
    expect(range.emitted('update:open')).toBeUndefined() // 另一端本次展开尚未激活 → 保持展开

    // 激活段已切到终点：下一个选择写入终点段，两段选完才收起
    findCell('2026-01-25')?.click()
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([
      [newStart, LATE_START],
      ['2026-01-05', '2026-01-25']
    ])
    expect(range.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('切到另一端时焦点一并挪到该端输入框（下划线与光标同步）', async () => {
    await mountRange({ value: [START, END] })

    findCell('2026-01-05')?.click() // 改起点 → 保持展开并切到终点段
    await flush()

    const inputs = document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner')
    expect(document.activeElement).toBe(inputs[1])
  })

  it('选完终点收起后激活段保留在终点段（下划线不随面板消失）', async () => {
    await mountRange({ value: [START, END] })

    findCell('2026-01-25')?.click() // 改起点 → 保持展开并切到终点段
    await flush()
    findCell('2026-01-30')?.click() // 选终点 → 提交并收起
    await flush()

    const items = document.querySelectorAll('.picker-trigger-range-item')
    expect(items[1]?.classList.contains('picker-trigger-range-item-active')).toBe(true)
  })
})

describe('范围形态的双段输入', () => {
  function rangeInputs(): HTMLInputElement[] {
    return Array.from(document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner'))
  }

  it('聚焦第二段后，面板选择写入终点段', async () => {
    const range = await mountRange({ value: [START, null] })
    rangeInputs()[1]?.focus()
    await flush()

    findCell('2026-01-20')?.click()
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([
      [START, END],
      ['2026-01-10', '2026-01-20']
    ])
  })

  it('两段输入框之间切换焦点不算失焦：不提交手输文本、不收起面板', async () => {
    const range = await mountRange({ value: [START, END] })
    const [startInput, endInput] = rangeInputs()

    endInput?.focus()
    await flush()

    // 浏览器在两段之间切焦点时会先给上一段抛 blur，落点由 `relatedTarget` 给出
    startInput?.dispatchEvent(new FocusEvent('blur', { relatedTarget: endInput }))
    await flush()

    expect(range.emitted('update:open')).toBeUndefined()
    expect(range.emitted('change')).toBeUndefined()
  })

  it('焦点移到组件外时仍按失焦提交手输文本', async () => {
    const range = await mountRange({ value: [START, null] })
    const input = rangeInputs()[1]
    if (!input) throw new Error('未渲染终点段输入框')

    input.value = '2026-01-20'
    input.dispatchEvent(new Event('input'))
    await flush()

    input.dispatchEvent(new FocusEvent('blur'))
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([
      [START, END],
      ['2026-01-10', '2026-01-20']
    ])
  })

  it('手输第二段并回车即提交区间', async () => {
    const range = await mountRange({ value: [START, null] })
    const input = rangeInputs()[1]
    input.value = '2026-01-20'
    input.dispatchEvent(new Event('input'))
    await flush()

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([
      [START, END],
      ['2026-01-10', '2026-01-20']
    ])
  })

  it('悬浮面板日期时激活段输入框显示预览文本并取提示色，移出后恢复', async () => {
    await mountRange({ value: [START, null] })
    findCell('2026-01-18')?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(rangeInputs()[0]?.value).toBe('2026-01-18')

    // 预览文本取提示色，且只作用于该段
    const items = document.querySelectorAll('.picker-trigger-range-item')
    expect(items[0]?.classList.contains('picker-trigger-input-placeholder')).toBe(true)
    expect(items[1]?.classList.contains('picker-trigger-input-placeholder')).toBe(false)

    // 移出被悬浮的那一格即取消预览：鼠标因此停在本面板的
    // 内边距、两面板之间的空隙、时间列或预设侧栏时都不会滞留预览
    findCell('2026-01-18')?.dispatchEvent(new MouseEvent('mouseleave'))
    await flush()
    expect(rangeInputs()[0]?.value).toBe('2026-01-10')
    expect(items[0]?.classList.contains('picker-trigger-input-placeholder')).toBe(false)

    // 逐格清除不会吃掉「移入另一格」的预览：同一 tick 内 leave → enter 以最后一格为准
    findCell('2026-01-18')?.dispatchEvent(new MouseEvent('mouseleave'))
    findCell('2026-01-20')?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(rangeInputs()[0]?.value).toBe('2026-01-20')
  })

  it('悬浮下一月补齐日时该格带悬浮端类名', async () => {
    await mountRange({ value: [START, null] })
    // 激活终点段：悬浮的日期成为预览终点，跨月补齐日据此拿到悬浮端类名
    document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner')[1]?.focus()
    await flush()

    const leftPanel = document.querySelectorAll('.picker-range-panel')[0]
    const cell = Array.from(leftPanel.querySelectorAll<HTMLElement>('.picker-panel-cell')).find(
      (item) => item.getAttribute('title') === '2026-02-01'
    )
    // 左面板视图为 2026-01：该格是下一月补齐日，不属于视图月
    expect(cell?.classList.contains('picker-panel-cell-in-view')).toBe(false)

    cell?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(cell?.classList.contains('picker-panel-cell-range-hover-end')).toBe(true)
  })

  it('下划线挂在触发器根下，定位基准为触发器而非输入区', async () => {
    await mountRange({ value: [START, END] })
    const bar = document.querySelector('.picker-trigger-range-active-bar')
    expect(bar).not.toBeNull()
    // 下划线相对触发器根定位，才能贴住触发器底部边框
    expect(bar?.parentElement?.classList.contains('picker-trigger')).toBe(true)
  })
})

/** 点击面板底部的「确定」（日期时间形态的提交入口） */
function clickOk(): void {
  document.querySelector<HTMLElement>('.picker-panel-ok .btn-wrap')?.click()
}

/** 激活段在触发器上的下标（0 起点 / 1 终点） */
function activeTriggerSide(): number {
  const items = Array.from(document.querySelectorAll('.picker-trigger-range-item'))
  return items.findIndex((item) => item.classList.contains('picker-trigger-range-item-active'))
}

describe('日期时间范围形态', () => {
  it('渲染单个日期时间面板与「确定」，不渲染「此刻」', async () => {
    await mountRange({ type: 'datetimerange', value: null, defaultTime: DEFAULT_TIME })

    expect(document.querySelectorAll('.picker-range-panel-layout .picker-datetime-panel')).toHaveLength(1)
    // 日期列与时间列同现：单个面板内并排，而非左右两个日期面板
    expect(document.querySelectorAll('.picker-time-panel')).toHaveLength(1)
    expect(document.querySelector('.picker-panel-ok')).not.toBeNull()
    expect(document.querySelector('.picker-panel-now')).toBeNull()
  })

  it('面板选择只落草稿，点「确定」才提交并切到终点段', async () => {
    const range = await mountRange({ type: 'datetimerange', value: null, defaultTime: DEFAULT_TIME })

    findCell('2026-01-10')?.click()
    await flush()

    // 草稿阶段两条轨道都不回写，只上报 `ok` 之外的草稿事件（此处不派发 ok）
    expect(range.emitted('change')).toBeUndefined()
    expect(range.emitted('update:value')).toBeUndefined()
    expect(activeTriggerSide()).toBe(0)

    clickOk()
    await flush()

    // 提交口径与面板选择同径：另一端本次展开尚未激活 → 保持展开并切到终点段
    expect(range.emitted('ok')?.at(-1)).toEqual([
      [START_WITH_TIME, null],
      ['2026-01-10 08:30:00', '']
    ])
    expect(range.emitted('update:open')).toBeUndefined()
    expect(activeTriggerSide()).toBe(1)
  })

  it('两段都有值时「确定」提交整个区间并收起', async () => {
    const range = await mountRange({
      type: 'datetimerange',
      value: [START, null],
      defaultTime: DEFAULT_TIME
    })

    clickOk()
    await flush()

    // 起点段已有值 → 提交后切到终点段
    expect(activeTriggerSide()).toBe(1)

    findCell('2026-01-20')?.click()
    await flush()
    clickOk()
    await flush()

    // 起点段沿用已提交值的时分秒（0 点），终点段为本次选中日期 + defaultTime 的时分秒
    expect(range.emitted('change')?.at(-1)).toEqual([
      [START, END_WITH_TIME],
      ['2026-01-10 00:00:00', '2026-01-20 08:30:00']
    ])
    expect(range.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('禁用时间按当前激活段注入（disabledTime 接收段标识）', async () => {
    const disabledTime = vi.fn(() => ({ disabledHours: () => [0] }))
    await mountRange({ type: 'datetimerange', value: null, defaultTime: DEFAULT_TIME, disabledTime })

    expect(disabledTime).toHaveBeenCalled()
    expect(disabledTime.mock.calls.every(([, side]) => side === 'start')).toBe(true)

    // 选起点后「确定」：激活段切到终点，判定随之按终点段注入
    findCell('2026-01-10')?.click()
    await flush()
    clickOk()
    await flush()

    expect(activeTriggerSide()).toBe(1)
    expect(disabledTime.mock.calls.some(([, side]) => side === 'end')).toBe(true)
  })

  it('面板选择后直接失焦（点外部收起）丢弃草稿，不提交选中的日期', async () => {
    const range = await mountRange({ type: 'datetimerange', value: [START, END], defaultTime: DEFAULT_TIME })

    findCell('2026-01-12')?.click()
    await flush()

    // 失焦由「点击面板外部」触发：此刻输入框展示的是草稿，不能当成手输提交
    document.querySelector<HTMLInputElement>('.picker-trigger-input-inner')?.dispatchEvent(new FocusEvent('blur'))
    await flush()

    expect(range.emitted('change')).toBeUndefined()
  })

  it('激活段为空时禁用时间的判定基准取另一端（同日约束不失效）', async () => {
    const disabledTime = vi.fn(() => ({}))
    await mountRange({ type: 'datetimerange', value: [START, null], disabledTime })

    // 切到终点段（该段为空）：判定基准应落在起点那一日，而不是「默认时分秒 / 当前时刻」
    document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner')[1]?.focus()
    await flush()

    const endSideCalls = disabledTime.mock.calls.filter(([, side]) => side === 'end')
    expect(endSideCalls.length).toBeGreaterThan(0)
    expect(endSideCalls.every(([timestamp]) => new Date(timestamp as number).getDate() === 10)).toBe(true)
  })

  it('选日期后保留越界时刻、「确定」不禁用（不做顺位校正）', async () => {
    // 终点侧禁用 0-9 时：选日期时保留的 08:30 属越界草稿
    const disabledTime = vi.fn((_timestamp: number, side: PickerRangeSide) =>
      side === 'end' ? { disabledHours: () => Array.from({ length: 10 }, (_, index) => index) } : {}
    )
    const range = await mountRange({
      type: 'datetimerange',
      value: [START, null],
      defaultTime: DEFAULT_TIME,
      disabledTime
    })

    document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner')[1]?.focus()
    await flush()
    findCell('2026-01-20')?.click()
    await flush()

    // 草稿原样保留（不把 08:30 校正到该日首个可选值 10:00）
    expect(document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner')[1]?.value).toBe(
      '2026-01-20 08:30:00'
    )
    expect(range.emitted('change')).toBeUndefined()

    // 「确定」只判「无草稿 / 草稿日被禁用」→ 越界草稿仍可提交
    clickOk()
    await flush()
    const okPayload = range.emitted('ok')?.at(-1) as [Array<number | null>, string[]]
    expect(okPayload[0][1]).toBe(new Date(2026, 0, 20, 8, 30, 0).getTime())
  })

  it('日期时间范围落值后清掉悬浮预览：输入框回真实值、不吃提示色', async () => {
    await mountRange({ type: 'datetimerange', value: null, defaultTime: DEFAULT_TIME })

    const inputs = (): HTMLInputElement[] =>
      Array.from(document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner'))
    const startItem = (): Element | undefined => document.querySelectorAll('.picker-trigger-range-item')[0]

    // 悬浮日期格：输入框显示悬浮日期（该段转提示色 + 展示悬浮日期本身）
    findCell('2026-01-15')?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(inputs()[0]?.value).toBe('2026-01-15 00:00:00')
    expect(startItem()?.classList.contains('picker-trigger-input-placeholder')).toBe(true)

    // 点选该日期：悬浮预览立即清掉，输入框回真实草稿值
    findCell('2026-01-15')?.click()
    await flush()
    expect(inputs()[0]?.value).toBe('2026-01-15 08:30:00')
    expect(startItem()?.classList.contains('picker-trigger-input-placeholder')).toBe(false)
  })

  it('区间内的日期格叠加范围类名（日期时间形态与日期形态同口径）', async () => {
    await mountRange({ type: 'datetimerange', value: [START, END], defaultTime: DEFAULT_TIME })

    expect(findCell('2026-01-15')?.classList.contains('picker-panel-cell-in-range')).toBe(true)
    expect(findCell('2026-01-10')?.classList.contains('picker-panel-cell-range-start')).toBe(true)
    expect(findCell('2026-01-20')?.classList.contains('picker-panel-cell-range-end')).toBe(true)
  })
})

describe('预设选项', () => {
  function presetItems(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>('.picker-presets-item'))
  }

  it('点击范围预设立即提交整个区间并收起', async () => {
    const range = await mountRange({ presets: [{ label: '近 7 天', value: [START, END] }] })

    expect(presetItems().map((item) => item.textContent?.trim())).toEqual(['近 7 天'])

    presetItems()[0]?.click()
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([
      [START, END],
      ['2026-01-10', '2026-01-20']
    ])
    expect(range.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('函数值预设惰性求值（点击时才取值）', async () => {
    const resolveValue = vi.fn(() => [START, END] as [number, number])
    const range = await mountRange({ presets: [{ label: '近 7 天', value: resolveValue }] })

    expect(resolveValue).not.toHaveBeenCalled()

    presetItems()[0]?.click()
    await flush()

    expect(resolveValue).toHaveBeenCalledTimes(1)
    expect(range.emitted('change')?.at(-1)).toEqual([
      [START, END],
      ['2026-01-10', '2026-01-20']
    ])
  })

  it('预设标签支持 VNode', async () => {
    await mountRange({ presets: [{ label: h('span', { class: 'preset-label' }, '自定义'), value: [START, END] }] })

    expect(document.querySelector('.picker-presets-item .preset-label')?.textContent).toBe('自定义')
  })

  it('悬浮预设时在面板上按已选区间预览，移出后恢复且不改变已选值', async () => {
    const range = await mountRange({ presets: [{ label: '近 7 天', value: [START, END] }] })

    presetItems()[0]?.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()

    // 预设悬浮按「已选区间」渲染（真区间底色与端点），而非格子悬浮的虚线预览
    expect(findCell('2026-01-15')?.classList.contains('picker-panel-cell-in-range')).toBe(true)
    expect(findCell('2026-01-10')?.classList.contains('picker-panel-cell-range-start')).toBe(true)
    expect(findCell('2026-01-20')?.classList.contains('picker-panel-cell-range-end')).toBe(true)
    expect(findCell('2026-01-15')?.classList.contains('picker-panel-cell-range-hover')).toBe(false)

    presetItems()[0]?.dispatchEvent(new MouseEvent('mouseleave'))
    await flush()
    expect(findCell('2026-01-15')?.classList.contains('picker-panel-cell-in-range')).toBe(false)

    expect(range.emitted('change')).toBeUndefined()
  })

  it('单选形态的预设点击即提交单个时间戳', async () => {
    const picker = await mountRange({ type: 'date', presets: [{ label: '锚点', value: START }] })

    presetItems()[0]?.click()
    await flush()

    expect(picker.emitted('change')?.at(-1)).toEqual([START, '2026-01-10'])
    expect(picker.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('未传预设时不渲染侧栏，面板宽度类也不生效', async () => {
    await mountRange({ value: null })

    expect(document.querySelector('.picker-presets')).toBeNull()
    expect(document.querySelector('.picker-panel-has-presets')).toBeNull()
  })

  it('侧栏与面板主体并列，页脚只覆盖主体宽度', async () => {
    await mountRange({ type: 'date', presets: [{ label: '锚点', value: START }] })

    const panel = document.querySelector('.picker-panel.picker-panel-has-presets')
    expect(panel).not.toBeNull()
    // 侧栏是面板 body 的直接子元素（与主体列并排），而不是塞进主体内部
    expect(panel?.querySelector(':scope > .picker-panel-body > .picker-presets')).not.toBeNull()
    expect(panel?.querySelector(':scope > .picker-panel-body > .picker-panel-main')).not.toBeNull()
    // 页脚挂在主体列内 → 不横跨到侧栏下方
    const footer = panel?.querySelector('.picker-panel-footer')
    expect(footer?.parentElement?.classList.contains('picker-panel-main')).toBe(true)
  })

  it('日期时间形态的侧栏同样与主体并列，页脚只覆盖日期时间列', async () => {
    await mountRange({ type: 'datetime', presets: [{ label: '锚点', value: START }] })

    const panel = document.querySelector('.picker-panel.picker-datetime-panel.picker-panel-has-presets')
    expect(panel).not.toBeNull()
    expect(panel?.querySelector(':scope > .picker-panel-body > .picker-presets')).not.toBeNull()
    // 主体列内含日期列与时间列，页脚落在主体列内
    expect(panel?.querySelector('.picker-panel-main .picker-date-panel-main')).not.toBeNull()
    expect(panel?.querySelector('.picker-panel-main .picker-time-panel')).not.toBeNull()
    const footer = panel?.querySelector('.picker-panel-footer')
    expect(footer?.parentElement?.classList.contains('picker-panel-main')).toBe(true)
  })

  it('与形态不匹配的预设值被忽略（范围形态收到单个时间戳时不提交）', async () => {
    const range = await mountRange({ presets: [{ label: '单值', value: START }] })

    presetItems()[0]?.click()
    await flush()

    expect(range.emitted('change')).toBeUndefined()
    expect(range.emitted('update:value')).toBeUndefined()
  })

  it('预设区间按原样提交，不做起止顺序纠正（与面板选择的纠正口径分工）', async () => {
    const range = await mountRange({ presets: [{ label: '倒序', value: [END, START] }] })

    presetItems()[0]?.click()
    await flush()

    expect(range.emitted('change')?.at(-1)).toEqual([
      [END, START],
      ['2026-01-20', '2026-01-10']
    ])
  })
})
