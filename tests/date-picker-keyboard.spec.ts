import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker/DatePicker.vue'
import { flushTransition } from './helpers'

/**
 * 回归守护：面板键盘导航与逐段禁用。
 *
 * 锁定四组语义：
 * 1. 键盘归属——Tab 把键盘交给面板（焦点不动、输入框转只读），输入字符 / 点击输入区 / 重新聚焦即收回；
 *    未展开时按键唤起面板；回车提交并收起面板，失焦则取消草稿（展示值退回已提交值）；
 * 2. 键盘光标——方向键 / 翻页键 / Ctrl 加左右键按当前面板层级的粒度移动光标，**只落草稿不落值**
 *    （落值交给回车或「确定」），故连续按方向键不会被「选完即收起」打断；
 * 3. 活动区——带时间形态下 Tab 在「日期 / 时间」两区之间循环，非活动列淡化；时间面板左右切列、
 *    上下改当前列的值；
 * 4. 逐段禁用——`disabled` 传两段元组时逐段作用，对端禁用会把该段的日期锁在对端的值之内；
 *    对端段被禁用时选完可用段即收起面板（禁用段没有可继续选的落点）。
 */
const VALUE = new Date(2026, 9, 15).getTime() // 2026-10-15 零点
const START = new Date(2026, 0, 10).getTime()
const END = new Date(2026, 0, 20).getTime()
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

/** 第 index 段输入框 */
function input(index = 0): HTMLInputElement {
  return document.querySelectorAll<HTMLInputElement>('.picker-trigger-input-inner')[index]
}

/** 派发一次按键：面板键盘入口挂在触发器包裹层上（真实场景里事件自输入框冒泡上来） */
function dispatchKey(key: string, init: KeyboardEventInit = {}): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init })
  document.querySelector<HTMLElement>('.datepicker-wrap')?.dispatchEvent(event)
  return event
}

async function press(key: string, init: KeyboardEventInit = {}): Promise<void> {
  dispatchKey(key, init)
  await flush()
}

/** 当前选中格（面板各层级共用同一套选中类名）的内层文本 */
function selectedCellText(): string {
  return document.querySelector('.picker-panel-cell-selected .picker-panel-cell-inner')?.textContent?.trim() ?? ''
}

/** 按 title 定位日期格 */
function findCell(dateText: string): HTMLElement | undefined {
  return Array.from(document.querySelectorAll<HTMLElement>('.picker-panel-cell')).find(
    (cell) => cell.getAttribute('title') === dateText
  )
}

async function mountPicker(props: Record<string, unknown> = {}) {
  wrapper = mount(DatePicker, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    props: { open: true, value: VALUE, ...props }
  })
  await flush()
  return wrapper
}

describe('键盘导航：日期面板', () => {
  it('Tab 把键盘交给面板，方向键只移动光标（不落值），回车才提交', async () => {
    const picker = await mountPicker()

    // 文本输入态：方向键不操作面板（留给输入框移动光标）
    await press('ArrowRight')
    expect(input().value).toBe('2026-10-15')

    // Tab 消费按键并切换归属，焦点不动
    const tab = dispatchKey('Tab')
    await flush()
    expect(tab.defaultPrevented).toBe(true)

    // 右移一天：光标落到草稿（输入框文本随之更新），不派发 change
    await press('ArrowRight')
    expect(input().value).toBe('2026-10-16')
    expect(picker.emitted('change')).toBeUndefined()

    // 回车提交草稿
    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await flush()
    expect(picker.emitted('change')?.at(-1)).toEqual([new Date(2026, 9, 16).getTime(), '2026-10-16'])
  })

  it('上下键按周、翻页键按月、Ctrl 加左右键按年移动', async () => {
    await mountPicker()
    await press('Tab')

    await press('ArrowDown')
    expect(input().value).toBe('2026-10-22')
    await press('PageUp')
    expect(input().value).toBe('2026-09-22')
    await press('ArrowLeft', { ctrlKey: true })
    expect(input().value).toBe('2025-09-22')
    await press('ArrowDown')
    expect(input().value).toBe('2025-09-29')
  })

  it('输入字符即把键盘收回文本输入态', async () => {
    await mountPicker()
    await press('Tab')
    await press('ArrowRight')
    expect(input().value).toBe('2026-10-16')

    // 改动输入内容（模拟键入）后，方向键不再操作面板
    input().dispatchEvent(new Event('input', { bubbles: true }))
    await flush()
    await press('ArrowRight')
    expect(input().value).toBe('2026-10-16')
  })

  it('面板操作态下输入框转只读，点击输入区即恢复手输', async () => {
    await mountPicker()
    expect(input().readOnly).toBe(false)

    await press('Tab')
    expect(input().readOnly).toBe(true)

    // 点击输入区把键盘收回文本输入态，插入光标随之恢复
    document.querySelector<HTMLElement>('.picker-trigger')?.click()
    await flush()
    expect(input().readOnly).toBe(false)
  })

  it('回车提交草稿并收起面板', async () => {
    const picker = await mountPicker()
    await press('Tab')
    await press('ArrowRight')
    expect(input().value).toBe('2026-10-16')

    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await flush()
    expect(picker.emitted('change')?.at(-1)).toEqual([new Date(2026, 9, 16).getTime(), '2026-10-16'])
    expect(picker.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('键盘导航后失焦即取消草稿，输入框退回已提交值', async () => {
    const picker = await mountPicker()
    await press('Tab')
    await press('ArrowRight')
    expect(input().value).toBe('2026-10-16')

    // 失焦（点击外部）视同取消：不派发 change，展示值退回已提交值
    input().dispatchEvent(new FocusEvent('blur'))
    await flush()
    expect(picker.emitted('change')).toBeUndefined()
    expect(input().value).toBe('2026-10-15')
  })

  it('面板未展开时按键唤起面板，Esc 不唤起', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: VALUE }
    })
    await flush()
    expect(wrapper.emitted('update:open')).toBeUndefined()

    await press('a')
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([true])

    await press('Escape')
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])

    // Esc 之后仍不再唤起
    await press('Escape')
    expect(wrapper.emitted('update:open')?.length).toBe(2)
  })
})

describe('键盘导航：各面板层级的粒度', () => {
  it('月面板左右为一月、上下为三月、Ctrl 为一年', async () => {
    await mountPicker({ type: 'month' })
    await press('Tab')

    await press('ArrowRight')
    expect(selectedCellText()).toBe('11月')
    expect(input().value).toBe('2026-11')
    await press('ArrowDown')
    expect(input().value).toBe('2027-02')
    await press('ArrowLeft', { ctrlKey: true })
    expect(input().value).toBe('2026-02')
  })

  it('季面板左右为一个季度、上下为一年', async () => {
    await mountPicker({ type: 'quarter' })
    await press('Tab')

    expect(selectedCellText()).toBe('Q4')
    await press('ArrowRight')
    expect(input().value).toBe('2027-Q1')
    await press('ArrowDown')
    expect(input().value).toBe('2028-Q1')
  })

  it('年面板左右为一年、上下为三年、Ctrl 为十年', async () => {
    await mountPicker({ type: 'year' })
    await press('Tab')

    expect(selectedCellText()).toBe('2026')
    await press('ArrowLeft')
    expect(selectedCellText()).toBe('2025')
    await press('ArrowDown')
    expect(selectedCellText()).toBe('2028')
    await press('ArrowRight', { ctrlKey: true })
    expect(selectedCellText()).toBe('2038')
  })

  it('十年面板左右为十年、上下为三十年', async () => {
    await mountPicker({ type: 'year' })
    // 从年面板头部下钻到十年面板
    document.querySelector<HTMLElement>('.picker-panel-decade-btn')?.click()
    await flush()
    expect(document.querySelector('.picker-panel-decade-content')).not.toBeNull()

    await press('Tab')
    await press('ArrowLeft')
    expect(selectedCellText()).toBe('2010-2019')
    await press('ArrowDown')
    expect(selectedCellText()).toBe('2040-2049')
  })
})

describe('键盘导航：带时间形态的活动区与时间列', () => {
  it('Tab 在日期 / 时间两区之间循环，非活动列淡化', async () => {
    await mountPicker({ type: 'datetime' })

    // 未进入面板操作态：两区都不淡化
    expect(document.querySelectorAll('.picker-datetime-panel-active').length).toBe(0)

    await press('Tab')
    expect(document.querySelectorAll('.picker-datetime-panel-active').length).toBe(0)

    // 第一次 Tab（面板操作态内）落到日期区
    await press('Tab')
    expect(document.querySelectorAll('.picker-datetime-panel-active').length).toBe(1)
    expect(document.querySelectorAll('.picker-date-panel-main-active').length).toBe(1)
    expect(document.querySelectorAll('.picker-time-panel-active').length).toBe(0)

    // 第二次切到时间区
    await press('Tab')
    expect(document.querySelectorAll('.picker-date-panel-main-active').length).toBe(0)
    expect(document.querySelectorAll('.picker-time-panel-active').length).toBe(1)

    // 第三次回到「无活动区」，不阻止默认行为（焦点可移出）
    const tab = dispatchKey('Tab')
    await flush()
    expect(tab.defaultPrevented).toBe(false)
    expect(document.querySelectorAll('.picker-date-panel-main-active').length).toBe(0)
    expect(document.querySelectorAll('.picker-time-panel-active').length).toBe(0)
  })

  it('时间面板左右切换活动列、上下改当前列的值', async () => {
    const picker = await mountPicker({ type: 'datetime' })
    await press('Tab')
    await press('Tab')
    await press('Tab')
    expect(document.querySelectorAll('.picker-time-panel-active').length).toBe(1)

    // 首键只把键盘落到第一列（小时），不在该键上改值
    await press('ArrowDown')
    expect(input().value).toBe('2026-10-15 00:00:00')
    await press('ArrowDown')
    expect(input().value).toBe('2026-10-15 01:00:00')
    await press('ArrowDown')
    expect(input().value).toBe('2026-10-15 02:00:00')

    // 左右键切列：切到分钟列后上下键改分钟（分钟列随之标出活动态）
    await press('ArrowRight')
    expect(document.querySelectorAll('.picker-time-column-active').length).toBe(1)
    await press('ArrowDown')
    expect(input().value).toBe('2026-10-15 02:01:00')

    // 时间列改动只落草稿，未点「确定」不派发 change
    expect(picker.emitted('change')).toBeUndefined()
  })
})

describe('键盘导航：范围形态', () => {
  it('键盘只把光标落到草稿上，回车提交当前激活段', async () => {
    const picker = await mountPicker({
      type: 'daterange',
      value: [null, null],
      allowEmpty: [true, true],
      defaultPickerValue: VIEW_DATE
    })
    await press('Tab')
    await press('ArrowRight')

    // 光标落在起点段的草稿上（另有一段仍为空），尚未落值
    expect(input(0).value).toBe('2026-01-02')
    expect(input(1).value).toBe('')
    expect(picker.emitted('change')).toBeUndefined()

    input(0).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await flush()
    expect(picker.emitted('change')?.at(-1)).toEqual([
      [new Date(2026, 0, 2).getTime(), null],
      ['2026-01-02', '']
    ])
  })

  it('范围形态键盘导航后失焦即取消草稿，两段都退回已提交值', async () => {
    const picker = await mountPicker({
      type: 'daterange',
      value: [START, END],
      defaultPickerValue: VIEW_DATE
    })
    await press('Tab')
    await press('ArrowRight')
    expect(input(0).value).toBe('2026-01-11')
    expect(input(1).value).toBe('2026-01-20')

    input(0).dispatchEvent(new FocusEvent('blur'))
    await flush()
    expect(picker.emitted('change')).toBeUndefined()
    expect(input(0).value).toBe('2026-01-10')
    expect(input(1).value).toBe('2026-01-20')
  })
})

describe('逐段禁用', () => {
  it('仅禁用指定段，两段都禁用才整体置灰', async () => {
    await mountPicker({
      type: 'daterange',
      value: [START, END],
      defaultPickerValue: VIEW_DATE,
      disabled: [true, false]
    })
    expect(input(0).disabled).toBe(true)
    expect(input(1).disabled).toBe(false)
    expect(document.querySelector('.picker-trigger')?.classList.contains('picker-trigger-disabled')).toBe(false)

    await wrapper?.setProps({ disabled: [true, true] })
    await flush()
    expect(input(0).disabled).toBe(true)
    expect(input(1).disabled).toBe(true)
    expect(document.querySelector('.picker-trigger')?.classList.contains('picker-trigger-disabled')).toBe(true)
  })

  it('对端禁用时该段日期被对端的值锁死', async () => {
    await mountPicker({
      type: 'daterange',
      value: [null, END],
      defaultPickerValue: VIEW_DATE,
      disabled: [false, true]
    })

    expect(findCell('2026-01-15')?.classList.contains('picker-panel-cell-disabled')).toBe(false)
    expect(findCell('2026-01-25')?.classList.contains('picker-panel-cell-disabled')).toBe(true)
  })

  it('对端段被禁用时，选完可用段即收起面板（不再切到禁用段）', async () => {
    const picker = await mountPicker({
      type: 'daterange',
      value: [START, END],
      defaultPickerValue: VIEW_DATE,
      disabled: [true, false]
    })

    // 聚焦终点段输入框即把激活段切到终点段（起点段禁用，不会把激活段切回去）
    input(1).dispatchEvent(new FocusEvent('focus'))
    await flush()

    findCell('2026-01-25')?.click()
    await flush()

    expect(picker.emitted('change')?.at(-1)).toEqual([
      [START, new Date(2026, 0, 25).getTime()],
      ['2026-01-10', '2026-01-25']
    ])
    expect(picker.emitted('update:open')?.at(-1)).toEqual([false])
  })
})
