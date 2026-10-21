import { describe, it, expect, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { format, getMonth, getYear } from 'date-fns'
import Calendar from 'components/calendar/Calendar.vue'
import type { DayOfWeek, HeaderFullSlotProps } from 'components/calendar/Calendar.vue'
import Select from 'components/select'
import { startOfDayTimestamp } from 'components/picker/date-utils'
import { flushTransition } from './helpers'

/**
 * 日历交互与取值口径的回归守护
 *
 * 覆盖曾缺失保护的行为：
 * 1. 重复点击同一日期时的 select / change 触发条件（select 每次触发、change 仅值变化时触发）
 * 2. 字符串 value 未配合 valueFormat 时不抛错（旧实现以 `as string` 断言掩盖，挂载即失败）
 * 3. startDayOfWeek 越界时收敛到合法值（旧实现会在周标题与日期网格生成处双处死循环）
 * 4. 对外取值统一为当日零点，且月面板跨月不溢出到次月
 * 5. 增强能力：defaultValue / validRange / 整月禁用 / 年选择器写回 / 键盘导航 / 头部整体替换 / 整格替换
 */

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await flushTransition()
}

/** 当月且非今天的日期单元格（避免点击上月日期导致面板跳月、元素重建） */
function currentMonthCells() {
  return wrapper!.findAll('.calendar-date-cell.date-cell-in-view:not(.date-cell-today)')
}

/** 最近一次 update:value 事件的首个参数 */
function lastEmittedValue(): number {
  const events = wrapper!.emitted('update:value')
  return events?.[events.length - 1]?.[0] as number
}

describe('日期选择的事件触发条件', () => {
  it('重复点击同一日期：select 每次都触发，change 只在值变化时触发', async () => {
    wrapper = mount(Calendar, { attachTo: document.body })
    await flush()

    const cells = currentMonthCells()
    expect(cells.length).toBeGreaterThan(0)
    const cell = cells[0]

    await cell.trigger('click')
    await flush()
    await cell.trigger('click')
    await flush()

    expect(wrapper.emitted('select')?.length).toBe(2)
    expect(wrapper.emitted('change')?.length).toBe(1)
  })

  it('点击日期后，select 携带的来源为 date', async () => {
    wrapper = mount(Calendar, { attachTo: document.body })
    await flush()

    await currentMonthCells()[0].trigger('click')
    await flush()

    const selectEvents = wrapper.emitted('select')
    expect(selectEvents?.[0]?.[1]).toEqual({ source: 'date' })
  })
})

describe('对外取值口径', () => {
  it('点击日期后对外值为该日零点，且与单元格日期一致', async () => {
    wrapper = mount(Calendar, { attachTo: document.body })
    await flush()

    const cell = currentMonthCells()[0]
    const title = cell.attributes('title')
    await cell.trigger('click')
    await flush()

    const value = lastEmittedValue()
    expect(value).toBe(startOfDayTimestamp(value))
    expect(format(value, 'yyyy-MM-dd')).toBe(title)
  })

  it('原值带时分秒时，点击日期后不继承其时间部分', async () => {
    const withTime = new Date(2026, 9, 15, 13, 45, 30).getTime()
    wrapper = mount(Calendar, { attachTo: document.body, props: { value: withTime } })
    await flush()

    await currentMonthCells()[0].trigger('click')
    await flush()

    const day = new Date(lastEmittedValue())
    expect([day.getHours(), day.getMinutes(), day.getSeconds()]).toEqual([0, 0, 0])
  })

  it('月面板跨月时按目标月天数收敛，不溢出到次月', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { mode: 'year', value: new Date(2026, 9, 31).getTime() }
    })
    await flush()

    const monthCells = wrapper.findAll('.calendar-month-panel .calendar-date-cell')
    expect(monthCells.length).toBe(12)

    // 索引 10 即 11 月；原值为 10-31，目标月仅 30 天
    await monthCells[10].trigger('click')
    await flush()

    expect(lastEmittedValue()).toBe(new Date(2026, 10, 30).getTime())
  })
})

describe('面板定位与 panelChange', () => {
  it('无选中值时切换年选择器：面板跳转同样补发 panelChange', async () => {
    wrapper = mount(Calendar, { attachTo: document.body })
    await flush()

    const targetYear = getYear(Date.now()) + 3
    wrapper.findAllComponents(Select)[0].vm.$emit('change', targetYear)
    await flush()

    const panelChangeEvents = wrapper.emitted('panelChange')
    expect(panelChangeEvents?.length).toBe(1)
    expect(panelChangeEvents?.[0]?.[1]).toEqual({ year: targetYear, month: getMonth(Date.now()) + 1 })
    expect(panelChangeEvents?.[0]?.[2]).toBe('month')
  })

  it('无选中值时切换月选择器：面板跳转同样补发 panelChange', async () => {
    wrapper = mount(Calendar, { attachTo: document.body })
    await flush()

    // 取一个与当前月不同的月份
    const targetMonth = ((getMonth(Date.now()) + 1) % 12) + 1
    wrapper.findAllComponents(Select)[1].vm.$emit('change', targetMonth)
    await flush()

    const panelChangeEvents = wrapper.emitted('panelChange')
    expect(panelChangeEvents?.length).toBe(1)
    expect(panelChangeEvents?.[0]?.[1]).toEqual({ year: getYear(Date.now()), month: targetMonth })
  })

  it('同月内换日不补发 panelChange', async () => {
    wrapper = mount(Calendar, { attachTo: document.body, props: { value: new Date(2026, 9, 15).getTime() } })
    await flush()

    const cell = currentMonthCells().find((item) => item.attributes('title') !== '2026-10-15')
    await cell!.trigger('click')
    await flush()

    expect(wrapper.emitted('change')?.length).toBe(1)
    expect(wrapper.emitted('panelChange')).toBeUndefined()
  })
})

describe('入参健壮性', () => {
  it('字符串 value 且未指定 valueFormat 时不抛错，也不产生选中态', async () => {
    expect(() => {
      wrapper = mount(Calendar, { props: { value: '2026-10-14' } })
    }).not.toThrow()
    await flush()

    expect(wrapper!.findAll('.calendar-date-cell.date-cell-selected').length).toBe(0)
  })

  it('startDayOfWeek 越界时收敛到合法值，不陷入死循环', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { startDayOfWeek: 7 as unknown as DayOfWeek }
    })
    await flush()

    // 归一后的周一与 0 等价
    const weekLabels = wrapper.findAll('.calendar-table th').map((th) => th.text())
    expect(weekLabels[0]).toBe('一')
    expect(wrapper.findAll('.calendar-date-cell').length).toBeGreaterThan(0)
  })

  it('startDayOfWeek 为非法值时同样不阻塞渲染', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { startDayOfWeek: Number.NaN as unknown as DayOfWeek }
    })
    await flush()

    expect(wrapper.findAll('.calendar-date-cell').length).toBeGreaterThan(0)
  })
})

describe('网格语义（a11y）', () => {
  it('表格与单元格具备 grid 语义，且选中态由 aria-selected 暴露', async () => {
    wrapper = mount(Calendar, { attachTo: document.body })
    await flush()

    expect(wrapper.find('.calendar-table').attributes('role')).toBe('grid')

    const cells = wrapper.findAll('.calendar-date-cell')
    expect(cells.length).toBeGreaterThan(0)
    expect(cells.every((cell) => cell.attributes('role') === 'gridcell')).toBe(true)
    // 初始无选中值
    expect(wrapper.findAll('.calendar-date-cell[aria-selected="true"]').length).toBe(0)

    await currentMonthCells()[0].trigger('click')
    await flush()

    const selected = wrapper.findAll('.calendar-date-cell[aria-selected="true"]')
    expect(selected.length).toBe(1)
    // 语义与展示态同源
    expect(selected[0].classes()).toContain('date-cell-selected')
  })

  it('年份面板的月份单元格同样带 grid 语义与选中态', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { mode: 'year', value: new Date(2026, 9, 15).getTime() }
    })
    await flush()

    const monthCells = wrapper.findAll('.calendar-month-panel .calendar-date-cell')
    expect(monthCells.length).toBe(12)
    expect(monthCells.every((cell) => cell.attributes('role') === 'gridcell')).toBe(true)
    expect(wrapper.findAll('.calendar-month-panel .calendar-date-cell[aria-selected="true"]').length).toBe(1)
  })

  it('被 disabledDate 命中的单元格由 aria-disabled 暴露', async () => {
    const target = new Date(2026, 9, 15).getTime()
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        value: new Date(2026, 9, 20).getTime(),
        disabledDate: (timestamp: number) => timestamp === target
      }
    })
    await flush()

    const disabledCell = wrapper.find('.calendar-date-cell[aria-disabled="true"]')
    expect(disabledCell.exists()).toBe(true)
    expect(disabledCell.classes()).toContain('date-cell-disabled')
  })
})

describe('增强能力', () => {
  it('defaultValue 作为非受控初值：决定初始选中态与面板定位', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { defaultValue: new Date(2026, 4, 20).getTime() }
    })
    await flush()

    const selected = wrapper.findAll('.calendar-date-cell.date-cell-selected')
    expect(selected.length).toBe(1)
    expect(selected[0].attributes('title')).toBe('2026-05-20')
  })

  it('受控 value 优先于 defaultValue', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        value: new Date(2026, 5, 10).getTime(),
        defaultValue: new Date(2026, 4, 20).getTime()
      }
    })
    await flush()

    const selected = wrapper.findAll('.calendar-date-cell.date-cell-selected')
    expect(selected.length).toBe(1)
    expect(selected[0].attributes('title')).toBe('2026-06-10')
  })

  it('validRange 之外的日期禁用，点击不写回值', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        value: new Date(2026, 9, 15).getTime(),
        validRange: [new Date(2026, 9, 10).getTime(), new Date(2026, 9, 20).getTime()]
      }
    })
    await flush()

    const disabledCells = wrapper.findAll('.calendar-date-cell[aria-disabled="true"]')
    expect(disabledCells.length).toBeGreaterThan(0)

    await disabledCells[0].trigger('click')
    await flush()

    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('整月都不可选时，月份格呈禁用态且点击不写回值', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        mode: 'year',
        value: new Date(2026, 5, 10).getTime(),
        disabledDate: (timestamp: number) => format(timestamp, 'yyyy-MM') === '2026-03'
      }
    })
    await flush()

    const disabledMonths = wrapper.findAll('.calendar-month-panel .calendar-date-cell[aria-disabled="true"]')
    expect(disabledMonths.length).toBe(1)
    expect(disabledMonths[0].attributes('title')).toBe('2026-03')

    await disabledMonths[0].trigger('click')
    await flush()

    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('validRange 下月份面板：区间外的月份整月禁用，点击不写回值', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        mode: 'year',
        value: new Date(2026, 9, 15).getTime(),
        validRange: [new Date(2026, 9, 10).getTime(), new Date(2026, 9, 20).getTime()]
      }
    })
    await flush()

    const monthCells = wrapper.findAll('.calendar-month-panel .calendar-date-cell')
    expect(monthCells.length).toBe(12)
    // 区间只落在 10 月，其余 11 个月整月不可选（disabledDate 缺省时同样成立）
    expect(wrapper.findAll('.calendar-month-panel .calendar-date-cell[aria-disabled="true"]').length).toBe(11)

    const may = monthCells.find((cell) => cell.attributes('title') === '2026-05')
    await may!.trigger('click')
    await flush()

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('年选择器变更：写回选中值并发 change 与 select（来源为 year）', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { value: new Date(2026, 9, 15).getTime() }
    })
    await flush()

    wrapper.findAllComponents(Select)[0].vm.$emit('change', 2027)
    await flush()

    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2027-10-15')
    const selectEvents = wrapper.emitted('select')
    expect(selectEvents?.[selectEvents.length - 1]?.[1]).toEqual({ source: 'year' })
  })

  it('年选择器：选中年份后列表区间不在关闭动画中平移，重新展开时才按当前年份重建', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { value: new Date(2026, 9, 15).getTime() }
    })
    await flush()

    const yearSelect = wrapper.findAllComponents(Select)[0]
    const optionValues = (): number[] => (yearSelect.props('options') as { value: number }[]).map((item) => item.value)
    expect(optionValues()).toEqual(Array.from({ length: 20 }, (_, index) => 2016 + index))

    await wrapper.find('.calendar-year-select').trigger('click')
    await flush()

    const target = Array.from(document.querySelectorAll('.select-option')).find((el) =>
      el.textContent?.includes('2027年')
    )
    expect(target).toBeTruthy()
    target!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    // 关闭动画期间：列表仍按展开时的区间渲染，选中的年份就地打上选中态
    expect(optionValues()).toEqual(Array.from({ length: 20 }, (_, index) => 2016 + index))
    const selectedLabels = Array.from(document.querySelectorAll('.select-option.option-selected')).map(
      (el) => el.textContent
    )
    expect(selectedLabels.some((label) => label?.includes('2027年'))).toBe(true)

    // 重新展开：区间才按当前年份重建，并把选中年份滚入可视区
    await flush()
    await wrapper.find('.calendar-year-select').trigger('click')
    await flush()
    expect(optionValues()).toEqual(Array.from({ length: 20 }, (_, index) => 2017 + index))
    const visibleLabels = Array.from(document.querySelectorAll('.select-option')).map((el) => el.textContent)
    expect(visibleLabels.some((label) => label?.includes('2027年'))).toBe(true)
  })

  it('键盘导航：左右一天、上下为一周、翻页为一月', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { value: new Date(2026, 9, 15).getTime() }
    })
    await flush()

    const panel = wrapper.find('.calendar-display-wrap')
    await panel.trigger('keydown', { key: 'ArrowRight' })
    await flush()
    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2026-10-16')

    await panel.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2026-10-23')

    await panel.trigger('keydown', { key: 'PageUp' })
    await flush()
    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2026-09-23')
  })

  it('年面板键盘导航：左右一月、上下一行（三个月），来源为 month', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { mode: 'year', value: new Date(2026, 9, 15).getTime() }
    })
    await flush()

    const panel = wrapper.find('.calendar-display-wrap')
    await panel.trigger('keydown', { key: 'ArrowRight' })
    await flush()
    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2026-11-15')
    const selectEvents = wrapper.emitted('select')
    expect(selectEvents?.[selectEvents.length - 1]?.[1]).toEqual({ source: 'month' })

    await panel.trigger('keydown', { key: 'ArrowDown' })
    await flush()
    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2027-02-15')

    await panel.trigger('keydown', { key: 'ArrowRight', ctrlKey: true })
    await flush()
    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2028-02-15')
  })

  it('年面板键盘导航：翻页键不响应', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { mode: 'year', value: new Date(2026, 9, 15).getTime() }
    })
    await flush()

    await wrapper.find('.calendar-display-wrap').trigger('keydown', { key: 'PageUp' })
    await flush()

    expect(wrapper.emitted('update:value')).toBeUndefined()
  })

  it('validRange 字符串入参按 valueFormat 解析', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        value: '2026-10-15',
        valueFormat: 'yyyy-MM-dd',
        validRange: ['2026-10-10', '2026-10-20']
      }
    })
    await flush()

    expect(wrapper.findAll('.calendar-date-cell[aria-disabled="true"]').length).toBeGreaterThan(0)
    const inRangeCell = wrapper.findAll('.calendar-date-cell').find((cell) => cell.attributes('title') === '2026-10-15')
    expect(inRangeCell?.classes()).not.toContain('date-cell-disabled')
  })

  it('validRange 字符串无法解析时忽略该区间，不阻断渲染', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        value: new Date(2026, 9, 15).getTime(),
        validRange: ['2026-10-10', '2026-10-20']
      }
    })
    await flush()

    expect(wrapper.findAll('.calendar-date-cell[aria-disabled="true"]').length).toBe(0)
  })

  it('validRange 下月份面板：保留的「日」落在区间外时收敛到区间端点', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        mode: 'year',
        value: new Date(2026, 9, 22).getTime(),
        validRange: [new Date(2026, 9, 20).getTime(), new Date(2026, 10, 5).getTime()]
      }
    })
    await flush()

    // 11 月仅 1-5 日可选：原「日」为 22，写回时收敛到区间终点
    const november = wrapper
      .findAll('.calendar-month-panel .calendar-date-cell')
      .find((cell) => cell.attributes('title') === '2026-11')
    await november!.trigger('click')
    await flush()

    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2026-11-05')
    // 来源为月：change 第二参保持月份对象口径
    expect(wrapper.emitted('change')?.[0]?.[1]).toEqual({ month: 10, year: 2026 })
  })

  it('validRange 下月选择器：保留的「日」落在区间外时收敛到区间端点', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        value: new Date(2026, 9, 22).getTime(),
        validRange: [new Date(2026, 9, 20).getTime(), new Date(2026, 10, 5).getTime()]
      }
    })
    await flush()

    wrapper.findAllComponents(Select)[1].vm.$emit('change', 11)
    await flush()

    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2026-11-05')
  })

  it('选中值为 0（1970-01-01）时同样定位面板，不视作无选中值', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { value: new Date(2026, 9, 15).getTime() }
    })
    await flush()

    await wrapper.setProps({ value: 0 })
    await flush()

    const selected = wrapper.findAll('.calendar-date-cell.date-cell-selected')
    expect(selected.length).toBe(1)
    expect(selected[0].attributes('title')).toBe(format(0, 'yyyy-MM-dd'))
  })

  it('键盘移动与年选择器的 change 均携带日期对象', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { value: new Date(2026, 9, 15).getTime() }
    })
    await flush()

    await wrapper.find('.calendar-display-wrap').trigger('keydown', { key: 'ArrowRight' })
    await flush()
    expect(wrapper.emitted('change')?.[0]?.[1]).toEqual({ date: 16, month: 9, year: 2026 })

    wrapper.findAllComponents(Select)[0].vm.$emit('change', 2027)
    await flush()
    expect(wrapper.emitted('change')?.[1]?.[1]).toEqual({ date: 16, month: 9, year: 2027 })
  })

  it('卡片形态固定渲染六周（末行补齐下月日期），不留空白', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { display: 'card', value: new Date(2026, 9, 17).getTime() }
    })
    await flush()

    const rows = wrapper.findAll('.calendar-date-panel tbody tr')
    expect(rows.length).toBe(6)
    expect(wrapper.findAll('.calendar-date-panel .calendar-date-cell').length).toBe(42)
    // 末行来自下个月：10 月 5 行的月份补齐 11-02 ~ 11-08
    expect(rows[5].findAll('.calendar-date-cell')[0].attributes('title')).toBe('2026-11-02')
  })

  it('面板形态同样恒定六周（与卡片一致）', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { value: new Date(2026, 9, 17).getTime() }
    })
    await flush()

    expect(wrapper.findAll('.calendar-date-panel tbody tr').length).toBe(6)
    expect(wrapper.findAll('.calendar-date-panel .calendar-date-cell').length).toBe(42)
  })

  it('1 号恰为周起始日时不多补上月日期（首格即当月 1 号）', async () => {
    // 2027-02-01 为周一，默认 startDayOfWeek 为 0（周一）
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { value: new Date(2027, 1, 10).getTime() }
    })
    await flush()

    const firstCell = wrapper.find('.calendar-date-panel .calendar-date-cell')
    expect(firstCell.attributes('title')).toBe('2027-02-01')
    expect(wrapper.findAll('.calendar-date-panel .calendar-date-cell').length).toBe(42)
  })

  it('月选择器切到禁用日时收敛到同月最近的可用日', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        value: new Date(2026, 10, 5).getTime(),
        disabledDate: (timestamp: number) => ['6', '7'].includes(format(timestamp, 'i'))
      }
    })
    await flush()

    // 12-05 为周六（禁用），同月最近可用日为 12-04（周五）
    wrapper.findAllComponents(Select)[1].vm.$emit('change', 12)
    await flush()

    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2026-12-04')
  })

  it('月格点击同样不写回禁用日期', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: {
        mode: 'year',
        value: new Date(2026, 10, 5).getTime(),
        disabledDate: (timestamp: number) => ['6', '7'].includes(format(timestamp, 'i'))
      }
    })
    await flush()

    const december = wrapper
      .findAll('.calendar-month-panel .calendar-date-cell')
      .find((cell) => cell.attributes('title') === '2026-12')
    await december!.trigger('click')
    await flush()

    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2026-12-04')
  })

  it('dateFull 插槽替换整格内容', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { value: new Date(2026, 9, 15).getTime() },
      slots: { dateFull: () => h('span', { class: 'full-cell' }) }
    })
    await flush()

    expect(wrapper.find('.full-cell').exists()).toBe(true)
    expect(wrapper.find('.date-cell-inner').exists()).toBe(false)
  })

  it('headerFull 插槽：onTypeChange 切换面板模式、onChange 写回选中值', async () => {
    wrapper = mount(Calendar, {
      attachTo: document.body,
      props: { value: new Date(2026, 9, 15).getTime(), display: 'card' },
      slots: {
        headerFull: (slotProps: HeaderFullSlotProps) => [
          h('button', { class: 'probe-type', onClick: () => slotProps.onTypeChange('year') }, '切换'),
          h(
            'button',
            { class: 'probe-value', onClick: () => slotProps.onChange(new Date(2026, 4, 20).getTime()) },
            '写回'
          )
        ]
      }
    })
    await flush()

    await wrapper.find('.probe-type').trigger('click')
    await flush()
    expect(wrapper.emitted('panelChange')?.[0]?.[2]).toBe('year')

    await wrapper.find('.probe-value').trigger('click')
    await flush()
    expect(format(lastEmittedValue(), 'yyyy-MM-dd')).toBe('2026-05-20')
  })
})
