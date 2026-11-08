import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker/DatePicker.vue'
import TimePicker from 'components/time-picker/TimePicker.vue'
import { flushTransition } from './helpers'

/**
 * 回归守护：日期 / 时间选择器的键盘操作
 *
 * 锁定一组键位口径：`Enter` 收起态展开、展开态提交并收起（无可提交值则保持展开）、`Esc` 收起、
 * `Tab` 把键盘交给面板且焦点不动、面板操作态再按 `Tab` 交还浏览器、`Shift+Tab` 反向、焦点移出组件
 * 即收起面板。
 *
 * 其中「展开态回车」是同一次按键的两个消费者：输入框先提交并收起面板，事件随后冒泡到包裹层 ——
 * 包裹层若按此刻的展开态判断，就会把同一次回车变成「关了又开」。
 */
const BASE = new Date(2026, 9, 15, 8, 30, 45).getTime()

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await flushTransition()
}

/** 输入框（范围形态取起点段） */
function input(): HTMLInputElement {
  return document.querySelector('.picker-trigger-input-inner') as HTMLInputElement
}

/** 在输入框上派发一次按键：真实场景里事件自输入框冒泡到包裹层，两个消费者按同一顺序执行 */
async function press(key: string, options: KeyboardEventInit = {}): Promise<KeyboardEvent> {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...options })
  input().dispatchEvent(event)
  await flush()
  return event
}

/** 派发一次失焦：`relatedTarget` 为焦点落点（`null` 表示取不到落点，如点击页面空白） */
async function focusout(relatedTarget: Node | null): Promise<void> {
  document.querySelector('.picker-trigger')?.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget }))
  await flush()
}

/** 组件外的一个可聚焦元素：模拟焦点移出组件 */
function outsideElement(): HTMLElement {
  const element = document.createElement('button')
  document.body.appendChild(element)
  return element
}

/** 面板开合的序列（`emitted` 返回的是活数组，不能就地 pop） */
function openEvents(): boolean[] {
  return (wrapper?.emitted('update:open') ?? []).map((event) => event[0] as boolean)
}

describe('TimePicker 键盘操作', () => {
  it('收起态回车展开面板，展开态回车提交并收起（同一次回车不会被重新展开）', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: BASE }
    })
    await flush()

    await press('Enter')
    expect(openEvents()).toEqual([true])

    await press('Enter')
    // 只收起、不再展开：重开会让「回车关闭」看起来毫无反应
    expect(openEvents()).toEqual([true, false])
  })

  it('展开态回车在无可提交值时保持展开', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } }
    })
    await flush()

    await press('Enter')
    await press('Enter')

    expect(openEvents()).toEqual([true])
  })

  it('Esc 收起面板并丢弃草稿', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()
    ;(document.querySelectorAll('.picker-time-cell')[10] as HTMLElement).click()
    await flush()

    await press('Escape')

    expect(openEvents()).toEqual([false])
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('面板操作态回车提交草稿并收起', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()
    ;(document.querySelectorAll('.picker-time-cell')[10] as HTMLElement).click()
    await flush()

    await press('Tab')
    await press('Enter')

    expect(wrapper.emitted('change')?.[0][0]).toBe(new Date(2026, 9, 15, 10, 30, 45).getTime())
    expect(openEvents()).toEqual([false])
  })

  it('Tab 把键盘交给面板（焦点不动、输入框只读），面板操作态再按 Tab 交还浏览器', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()

    const first = await press('Tab')
    expect(first.defaultPrevented).toBe(true)
    expect(input().readOnly).toBe(true)

    const second = await press('Tab')
    expect(second.defaultPrevented).toBe(false)
  })

  it('Shift+Tab：文本输入态不接管，面板操作态收回键盘且不收起面板', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()

    // 文本输入态：反向 Tab 用于离开组件，不切键盘归属
    const leaving = await press('Tab', { shiftKey: true })
    expect(leaving.defaultPrevented).toBe(false)
    expect(input().readOnly).toBe(false)

    await press('Tab')
    expect(input().readOnly).toBe(true)
    const back = await press('Tab', { shiftKey: true })
    expect(back.defaultPrevented).toBe(true)
    expect(input().readOnly).toBe(false)
    expect(openEvents()).toEqual([])
  })

  it('焦点移出组件即收起面板，移到面板内则不收起', async () => {
    wrapper = mount(TimePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()

    // 焦点落到面板内的按钮（面板经 Teleport 挂在 body 下，不在包裹层子树里）不算离开
    await focusout(document.querySelector('.timepicker-panel-ok'))
    expect(openEvents()).toEqual([])

    const outside = outsideElement()
    await focusout(outside)
    expect(openEvents()).toEqual([false])
    outside.remove()
  })
})

describe('DatePicker 键盘操作', () => {
  it('收起态回车展开面板，展开态回车提交并收起（同一次回车不会被重新展开）', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: BASE }
    })
    await flush()

    await press('Enter')
    expect(openEvents()).toEqual([true])

    await press('Enter')
    // 只收起、不再展开：重开会让「回车关闭」看起来毫无反应
    expect(openEvents()).toEqual([true, false])
  })

  it('展开态回车在无可提交值时保持展开', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } }
    })
    await flush()

    await press('Enter')
    await press('Enter')

    expect(openEvents()).toEqual([true])
  })

  it('Tab 把键盘交给面板，Shift+Tab 在文本输入态不接管', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()

    const leaving = await press('Tab', { shiftKey: true })
    expect(leaving.defaultPrevented).toBe(false)

    const first = await press('Tab')
    expect(first.defaultPrevented).toBe(true)
    expect(input().readOnly).toBe(true)
  })

  it('焦点移出组件即收起面板', async () => {
    wrapper = mount(DatePicker, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, value: BASE }
    })
    await flush()

    const outside = outsideElement()
    await focusout(outside)
    expect(openEvents()).toEqual([false])
    outside.remove()
  })
})
