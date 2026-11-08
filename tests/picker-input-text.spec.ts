import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker/DatePicker.vue'
import TimePicker from 'components/time-picker/TimePicker.vue'
import type { DatePickerProps } from 'components/date-picker'
import { flushTransition } from './helpers'

/**
 * 回归守护：触发器的文本轨道与「同值不重复派发」
 *
 * 1. 手输解析失败 / 命中 `disabledDate` 时不落值，且输入框回滚为已提交文本
 *    （文本是与值解耦的独立状态：不能因为持有父级数组而改不动自己）；
 * 2. 与已提交值相同的选择不再重复派发 `change`（`onChange` 前的等值判断）；
 * 3. 逐格禁用判定按「层级 + 视图」缓存：悬浮预览这类局部重渲染不再整片回调 `disabledDate`。
 */
const START = new Date(2026, 0, 10).getTime()
const END = new Date(2026, 0, 20).getTime()
const START_WITH_TIME = new Date(2026, 0, 10, 8, 30, 0).getTime()
const END_WITH_TIME = new Date(2026, 0, 20, 18, 0, 0).getTime()

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await flushTransition()
}

/** 范围形态的两段输入框 */
function sideInputs(): HTMLInputElement[] {
  return Array.from(
    document.querySelectorAll<HTMLInputElement>('.picker-trigger-range-item .picker-trigger-input-inner')
  )
}

/** 单段输入框 */
function singleInput(): HTMLInputElement {
  return document.querySelector('.picker-trigger-input-inner') as HTMLInputElement
}

/** 触发器的输入区容器：悬浮预览的提示色类名装在它身上 */
function triggerBox(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.picker-trigger-input')
}

/** 往输入框里键入并回车 */
async function typeInto(input: HTMLInputElement, text: string): Promise<void> {
  input.value = text
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await flush()
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
  await flush()
}

/** 面板底部的「确定」（日期时间面板与时间选择器各有一套页脚类名） */
function clickOk(): void {
  ;(document.querySelector('.picker-panel-ok .btn-wrap, .timepicker-panel-ok .btn-wrap') as HTMLElement)?.click()
}

describe('手输文本的回滚与禁用日期', () => {
  it('范围段输入非法文本：回填已提交文本且不派发 change', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { type: 'daterange', value: [START, END] }
    })
    await flush()

    await typeInto(sideInputs()[1], 'zz')

    expect(wrapper.emitted('change')).toBeUndefined()
    // 关键：DOM 必须回到已提交文本，不能停在用户键入的非法内容上
    expect(sideInputs()[1].value).toBe('2026-01-20')
  })

  it('范围段清空后回车：同样回填已提交文本（allowEmpty 也不代表清空输入框即可置空）', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { type: 'daterange', value: [START, END], allowEmpty: [false, true] }
    })
    await flush()

    await typeInto(sideInputs()[1], '')

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(sideInputs()[1].value).toBe('2026-01-20')
  })

  it('时间范围形态同样回填（两个组件共用触发器）', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        type: 'timerange',
        value: [new Date(2026, 0, 10, 8, 0, 0).getTime(), new Date(2026, 0, 10, 18, 0, 0).getTime()]
      }
    })
    await flush()

    await typeInto(sideInputs()[0], '99:99')

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(sideInputs()[0].value).toBe('08:00:00')
  })

  it('手输命中 disabledDate 的日期不落值（面板点不到的日期，打字也进不来）', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      // 「当日零点」口径：禁用 12 号
      props: { value: START, disabledDate: (timestamp: number) => new Date(timestamp).getDate() === 12 }
    })
    await flush()

    await typeInto(singleInput(), '2026-01-12')

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(singleInput().value).toBe('2026-01-10')
  })

  it('范围段手输命中 disabledDate 时同样不写入该段', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        type: 'daterange',
        value: [START, END],
        disabledDate: (timestamp: number) => new Date(timestamp).getDate() === 25
      }
    })
    await flush()

    await typeInto(sideInputs()[1], '2026-01-25')

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(sideInputs()[1].value).toBe('2026-01-20')
  })

  it('手输合法日期仍照常提交（禁用判定不越权）', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { type: 'daterange', value: [START, END], disabledDate: () => false }
    })
    await flush()

    await typeInto(sideInputs()[1], '2026-01-22')

    expect(wrapper.emitted('change')?.[0][0]).toEqual([START, new Date(2026, 0, 22).getTime()])
  })
})

describe('与已提交值相同的选择不重复派发 change', () => {
  it('日期时间范围：连点两次「确定」且值未变时不派发 change，ok 照常派发', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { type: 'datetimerange', value: [START_WITH_TIME, END_WITH_TIME], open: true }
    })
    await flush()

    clickOk()
    await flush()
    clickOk()
    await flush()

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('ok')?.length).toBe(2)
  })

  it('时间范围：改过一段后再点「确定」只派发一次 change', async () => {
    // 非受控：本地值随提交更新，第二次「确定」与已提交值相同即不再派发（受控时以父侧回写为准）
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        type: 'timerange',
        defaultValue: [new Date(2026, 0, 10, 8, 0, 0).getTime(), new Date(2026, 0, 10, 18, 0, 0).getTime()],
        open: true
      }
    })
    await flush()

    // 起点段改到 10 点，再连点两次「确定」（第二次值未变）
    document.querySelectorAll<HTMLElement>('.picker-time-cell')[10].click()
    await flush()
    clickOk()
    await flush()
    clickOk()
    await flush()

    expect(wrapper.emitted('change')?.length).toBe(1)
    expect(wrapper.emitted('ok')?.length).toBe(2)
  })
})

describe('逐格禁用判定的缓存', () => {
  it('年范围悬浮一次有效预览：不再整片回调 disabledDate', async () => {
    const disabledDate = vi.fn((timestamp: number) => timestamp < new Date(2026, 10, 6).getTime())
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        type: 'yearrange',
        value: [new Date(2020, 0, 1).getTime(), new Date(2024, 0, 1).getTime()],
        open: true,
        disabledDate
      } satisfies Partial<DatePickerProps>
    })
    await flush()

    disabledDate.mockClear()
    // 首个面板第 3 格（2014，早于起点，预览区间有序 → 会真正触发重渲染）
    const cell = document.querySelectorAll<HTMLElement>('.picker-panel-year-content .picker-panel-cell')[2]
    cell.dispatchEvent(new MouseEvent('mouseenter'))
    await flush()

    // 悬浮确实生效（起点段输入框显示预览文本，年形态的展示格式为 `yyyy`）
    expect(sideInputs()[0].value).toBe('2021')
    // 整段禁用判定按「层级 + 视图」缓存：悬浮重渲染不再逐格回调
    expect(disabledDate).not.toHaveBeenCalled()
  })

  it('同一屏内每格只算一次（class 与 aria-disabled 共用）', async () => {
    const callDates: string[] = []
    const disabledDate = vi.fn((timestamp: number) => {
      callDates.push(new Date(timestamp).toDateString())
      return false
    })
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: START, open: true, disabledDate }
    })
    await flush()

    const cellDates = Array.from(document.querySelectorAll('.picker-panel-date-content .picker-panel-cell')).map(
      (cell) => cell.getAttribute('title') ?? ''
    )
    const countByDate = callDates.reduce<Record<string, number>>((acc, key) => {
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {})
    expect(cellDates.length).toBe(42)
    // 每格只回调一次：class 与 aria-disabled 不再各算一遍（「今天」按钮不在格内，单独计）
    cellDates.forEach((dateText) => {
      expect(countByDate[new Date(dateText).toDateString()]).toBe(1)
    })
  })
})

describe('空值态的提示色只作用于预览文本', () => {
  // 提示色类名改的是输入框自身的 color，光标会跟着一起变浅；
  // 空值态的提示文字由原生 ::placeholder 着色，该类名只服务「悬浮预览的临时文本」
  it('日期选择器无值：提示文字走原生 placeholder，不套提示色类名', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: false, placeholder: '请选择日期' } satisfies Partial<DatePickerProps>
    })
    await flush()

    expect(singleInput().value).toBe('')
    expect(singleInput().placeholder).toBe('请选择日期')
    expect(triggerBox()?.classList.contains('picker-trigger-input-placeholder')).toBe(false)
  })

  it('时间选择器无值：提示文字走原生 placeholder，不套提示色类名', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: false, placeholder: '请选择时间' }
    })
    await flush()

    expect(singleInput().value).toBe('')
    expect(singleInput().placeholder).toBe('请选择时间')
    expect(triggerBox()?.classList.contains('picker-trigger-input-placeholder')).toBe(false)
  })
})
