import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker/DatePicker.vue'
import Popup from 'components/popup'
import { getRangeCellClassNames, isInRangeTimestamp, isOutOfRangeBoundary } from 'components/picker/date-utils'
import { flushTransition } from './helpers'

/**
 * 回归守护：范围形态（`type="daterange"`）。
 *
 * 锁定三组语义：
 * 1. 范围格类名——区间底色只覆盖**严格内部**（两端由起止类名表达），悬浮预览要求两端齐全且有序；
 * 2. 面板结构——左右两个日期面板并排，右面板恒为左面板的下一月，两侧翻页同步；
 * 3. 选择提交——选完一段保持展开并切到另一段，两段齐全才提交并收起，
 *    起点晚于终点时丢弃另一端，`allowEmpty` 允许单段对外提交。
 */
const START = new Date(2026, 0, 10).getTime()
const END = new Date(2026, 0, 20).getTime()
const MIDDLE = new Date(2026, 0, 15).getTime()
const LATE_START = new Date(2026, 0, 25).getTime()
const VIEW_DATE = new Date(2026, 0, 1).getTime()

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

  it('左侧面板省略「下一」、右侧面板省略「上一」单步按钮', async () => {
    await mountRange({ value: [START, END] })
    const panels = document.querySelectorAll('.picker-range-panel-layout .picker-range-panel')
    expect(panels[0].querySelector('.picker-panel-next')).toBeNull()
    expect(panels[0].querySelector('.picker-panel-prev')).not.toBeNull()
    expect(panels[1].querySelector('.picker-panel-prev')).toBeNull()
    expect(panels[1].querySelector('.picker-panel-next')).not.toBeNull()
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

  it('指示箭头只在左侧对齐的方位渲染（与参考实现同口径）', async () => {
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

  it('选中起点后禁用早于起点的日期（对齐参考实现的越界禁用）', async () => {
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

  it('已有完整区间时改起点保持展开并切到终点段（与参考实现的 openRecords 口径一致）', async () => {
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

    // 预览文本取提示色（与参考实现的 `-input-placeholder` 同口径），且只作用于该段
    const items = document.querySelectorAll('.picker-trigger-range-item')
    expect(items[0]?.classList.contains('picker-trigger-input-placeholder')).toBe(true)
    expect(items[1]?.classList.contains('picker-trigger-input-placeholder')).toBe(false)

    document.querySelector('.picker-range-panel')?.dispatchEvent(new MouseEvent('mouseleave'))
    await flush()
    expect(rangeInputs()[0]?.value).toBe('2026-01-10')
    expect(items[0]?.classList.contains('picker-trigger-input-placeholder')).toBe(false)
  })

  it('下划线挂在触发器根下，定位基准为触发器而非输入区', async () => {
    await mountRange({ value: [START, END] })
    const bar = document.querySelector('.picker-trigger-range-active-bar')
    expect(bar).not.toBeNull()
    // 与参考实现同构：下划线相对触发器根定位，才能贴住触发器底部边框
    expect(bar?.parentElement?.classList.contains('picker-trigger')).toBe(true)
  })
})
