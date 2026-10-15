import { describe, it, expect, afterEach } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { format } from 'date-fns'
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
