import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import TimePicker from 'components/time-picker/TimePicker.vue'
import { flushTransition } from './helpers'

/**
 * 独立时间选择器的交互守护
 *
 * 面板为**确认制**：点时间列只改草稿，点「确定」才提交并收起；「此刻」是取整后直接落值的快捷入口；
 * 面板收起即丢弃草稿。此外列显隐与 12 小时制由 `format` 推导，头部在独立形态下隐藏。
 */
const BASE = new Date(2026, 9, 15, 8, 30, 45).getTime()
/** 当日 08:30:45 的展示文本（与默认 `format` 一致） */
const BASE_TEXT = '08:30:45'

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await flushTransition()
}

/** 各时间列的候选文本（按列顺序） */
function columnTexts(index: number): string[] {
  const columns = document.querySelectorAll('.picker-time-column')
  return Array.from(columns[index]?.querySelectorAll('.picker-time-cell-inner') ?? []).map(
    (el) => el.textContent?.trim() ?? ''
  )
}

/** 面板中的候选格（按列顺序铺平） */
function cells(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.picker-time-cell'))
}

describe('时间面板结构', () => {
  it('默认渲染时 / 分 / 秒三列，且不渲染头部文本行', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()

    expect(document.querySelectorAll('.picker-time-column').length).toBe(3)
    // 面板由内核面板容器承载：底色 / 圆角 / 阴影 / 页脚分隔线都由它提供（面板透明即此处丢失）
    expect(document.querySelector('.picker-panel.timepicker-panel')).not.toBeNull()
    // 头部文本行只在日期时间形态下出现，独立形态由 hideHeader 隐藏
    expect(document.querySelector('.picker-time-panel-header')).toBeNull()
    expect(columnTexts(0)[0]).toBe('00')
    expect(columnTexts(1)[0]).toBe('00')
    expect(columnTexts(2)[0]).toBe('00')
  })

  it('列显隐随 format 推导：HH:mm 只保留时与分两列', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE, format: 'HH:mm' }
    })
    await flush()

    expect(document.querySelectorAll('.picker-time-column').length).toBe(2)
  })

  it('use12Hours 追加 AM / PM 列，小时列取 0-11 且 0 展示为 12', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: new Date(2026, 9, 15, 0, 5, 0).getTime(), use12Hours: true }
    })
    await flush()

    const columns = document.querySelectorAll('.picker-time-column')
    expect(columns.length).toBe(4)
    expect(columnTexts(3)).toEqual(['AM', 'PM'])
    expect(columnTexts(0).length).toBe(12)
    expect(columnTexts(0)[0]).toBe('12')
  })

  it('use12Hours 且无值时上下午列默认选中上午', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, use12Hours: true }
    })
    await flush()

    // 小时列列的是上午半天的刻度，上下午列随之落在上午（两列不能自相矛盾）
    expect(columnTexts(0)[0]).toBe('12')
    const selected = document.querySelector('.picker-time-column:nth-child(4) .picker-time-cell-selected')
    expect(selected?.textContent?.trim()).toBe('AM')
    // 空值只承诺上下午，时 / 分 / 秒三列仍不预选
    expect(document.querySelectorAll('.picker-time-cell-selected').length).toBe(1)
  })
})

describe('确认制提交', () => {
  it('点击时间列只落草稿：不派发 change、面板保持展开', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()

    // 小时列第 10 项（09:00 之后按 1 小时步长）
    cells()[10].click()
    await flush()

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('update:value')).toBeUndefined()
    // 草稿已写入：展示文本随草稿更新
    expect((document.querySelector('.picker-trigger-input-inner') as HTMLInputElement).value).toBe('10:30:45')
  })

  it('点「确定」提交双轨值、派发 change 与 ok 并请求收起', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()

    cells()[10].click()
    await flush()
    ;(document.querySelector('.timepicker-panel-ok .btn-wrap') as HTMLElement).click()
    await flush()

    const changed = wrapper.emitted('change')
    expect(changed?.length).toBe(1)
    expect(changed?.[0][0]).toBe(new Date(2026, 9, 15, 10, 30, 45).getTime())
    expect(changed?.[0][1]).toBe('10:30:45')
    expect(wrapper.emitted('ok')?.length).toBe(1)
    expect(wrapper.emitted('update:formattedValue')?.pop()).toEqual(['10:30:45'])
    expect(wrapper.emitted('update:open')?.pop()).toEqual([false])
  })

  it('「此刻」取整后提交并收起，但不派发 ok', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      // 取值 08:33:47：分与秒都不是步长的整数倍，取整后应落到 08:30:45
      props: { open: true, value: new Date(2026, 9, 15, 8, 33, 47).getTime(), minuteStep: 15, secondStep: 15 }
    })
    await flush()
    ;(document.querySelector('.timepicker-panel-now-btn') as HTMLElement).click()
    await flush()

    const changed = wrapper.emitted('change')
    expect(changed?.length).toBe(1)
    // 「此刻」取当前时刻，故断言取整结果（分 / 秒都落在步长的整数倍上），不依赖运行时刻
    const submitted = new Date(changed?.[0][0] as number)
    expect(submitted.getMinutes() % 15).toBe(0)
    expect(submitted.getSeconds() % 15).toBe(0)
    expect(wrapper.emitted('ok')).toBeUndefined()
    expect(wrapper.emitted('update:open')?.pop()).toEqual([false])
  })

  it('无草稿且无值时「确定」不提交；showNow 关闭时不渲染「此刻」', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, showNow: false }
    })
    await flush()

    expect(document.querySelector('.timepicker-panel-now')).toBeNull()
    ;(document.querySelector('.timepicker-panel-ok .btn-wrap') as HTMLElement).click()
    await flush()

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('ok')).toBeUndefined()
  })
})

describe('草稿与清空', () => {
  it('收起即丢弃草稿：重开后面板回到已提交值', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: BASE }
    })
    await flush()

    // 展开面板并写入草稿
    ;(document.querySelector('.picker-trigger') as HTMLElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await flush()
    cells()[11].click()
    await flush()
    expect((document.querySelector('.picker-trigger-input-inner') as HTMLInputElement).value).toBe('11:30:45')

    // Esc 收起后再展开：草稿未提交，展示回到已提交值
    document
      .querySelector('.picker-trigger')
      ?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flush()
    ;(document.querySelector('.picker-trigger') as HTMLElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await flush()

    expect((document.querySelector('.picker-trigger-input-inner') as HTMLInputElement).value).toBe(BASE_TEXT)
  })

  it('清除按钮落空值并收起', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()
    ;(document.querySelector('.picker-trigger-clear') as HTMLElement).click()
    await flush()

    const changed = wrapper.emitted('change')
    expect(changed?.length).toBe(1)
    expect(changed?.[0][0]).toBeNull()
    expect(changed?.[0][1]).toBeNull()
  })

  it('手输文本按 valueFormat 解析，回车提交并收起', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true }
    })
    await flush()

    const input = document.querySelector('.picker-trigger-input-inner') as HTMLInputElement
    input.value = '07:08:09'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await flush()

    const changed = wrapper.emitted('change')
    expect(changed?.length).toBe(1)
    expect(new Date(changed?.[0][0] as number).getHours()).toBe(7)
    expect(new Date(changed?.[0][0] as number).getMinutes()).toBe(8)
    expect(new Date(changed?.[0][0] as number).getSeconds()).toBe(9)
    expect(wrapper.emitted('update:open')?.pop()).toEqual([false])
  })
})

describe('触发器文本与估宽', () => {
  it('12 小时制的默认文本按 `hh:mm:ss a` 生成（小时补零）', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { use12Hours: true, value: new Date(2026, 9, 15, 9, 5, 3).getTime() }
    })
    await flush()

    // 面板的小时列标签与头部时间文本都是两位口径，展示文本须与之一致
    expect((document.querySelector('.picker-trigger-input-inner') as HTMLInputElement).value).toBe('09:05:03 AM')
  })

  it('输入框按时间形态下限估宽：8 字符格式取 10', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } }
    })
    await flush()

    // 下限沿用日期形态的 10 会让触发器凭空宽出约 14px（时间格式短于日期格式）
    expect((document.querySelector('.picker-trigger-input-inner') as HTMLInputElement).getAttribute('size')).toBe('10')
  })
})
