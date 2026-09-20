import { describe, it, expect, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AutoComplete from 'components/auto-complete/AutoComplete.vue'
import Select from 'components/select/Select.vue'

/**
 * 浮层「保住焦点」的契约
 *
 * 面板关闭依赖输入框失焦，因此凡「点击浮层内、但不应关闭面板」的交互，都在 mousedown 上阻止默认行为：
 * - 触发器根节点：仅放行输入框自身（保留浏览器原生的聚焦与光标定位），其余（文本 / 箭头 / 清除图标 /
 *   自定义插槽空白区）一律阻止；
 * - 面板容器：一律阻止（覆盖选项、内边距、空面板；滚动条另有 `@pointerdown.prevent`）。
 *
 * 于是失焦只可能来自真实的焦点转移（Tab / 点击页面其他元素 / 程序化 blur），此时一律关闭面板 ——
 * 不再存在「指针停在哪里决定失焦是否被忽略」的顺序敏感行为（旧实现的 `onHover` 覆写会产生
 * 「悬浮可选项时失焦关闭、悬浮禁用项时反而不关」的不一致）。
 *
 * 说明：合成事件不会触发浏览器的默认行为，故此处断言的是 `defaultPrevented`（契约本身）；
 * 「阻止默认 ⇒ 输入框不失焦 ⇒ 面板不关闭」的端到端表现由实机回归覆盖。
 */
const SELECT_OPTIONS = [
  { label: '北京市', value: 'beijing' },
  { label: '上海市', value: 'shanghai', disabled: true },
  { label: '纽约市', value: 'newyork' }
]
const AC_OPTIONS = [{ value: '123' }, { value: '1234', disabled: true }, { value: '12345' }]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.select-panel-wrapper, .auto-complete-panel-wrapper').forEach((el) => el.remove())
})

/** 等到 DOM 稳定（连续两轮「微任务 + 宏任务」无变化即返回），避免固定时长等待输给异步链路 */
async function flush(): Promise<void> {
  let prev = ''
  for (let turn = 0; turn < 20; turn++) {
    await nextTick()
    await new Promise<void>((resolve) => setTimeout(resolve, 0))
    const current = document.body.innerHTML
    if (current === prev) {
      return
    }
    prev = current
  }
}

function query<T extends Element>(selector: string, index = 0): T {
  const el = document.querySelectorAll(selector)[index]
  if (!el) {
    throw new Error(`未找到元素：${selector}[${index}]`)
  }
  return el as T
}

/** 在指定元素上派发可取消的 mousedown，返回事件以断言默认行为是否被阻止 */
function mousedown(selector: string, index = 0): MouseEvent {
  const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
  query(selector, index).dispatchEvent(event)
  return event
}

/** 悬浮第 index 个选项 */
function hoverOption(className: string, index: number): void {
  query(className, index).dispatchEvent(new MouseEvent('mouseenter'))
}

/** 让输入框真实失焦（先聚焦再派发 blur，模拟焦点转移） */
async function blurInput(selector: string): Promise<void> {
  const input = query<HTMLInputElement>(selector)
  input.focus()
  await nextTick()
  input.dispatchEvent(new FocusEvent('blur'))
}

/** 面板是否已隐藏 */
function panelHidden(selector: string): boolean {
  return query<HTMLElement>(selector).style.display === 'none'
}

describe('Select 触发焦点保护', () => {
  async function openSelect(): Promise<void> {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: undefined, options: SELECT_OPTIONS, allowClear: true }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
  }

  it('输入框自身的 mousedown 不被阻止（保留原生聚焦与光标定位）', async () => {
    await openSelect()
    expect(mousedown('.search-input').defaultPrevented).toBe(false)
  })

  it('触发器上的非输入区域 mousedown 被阻止（文本 / 箭头 / 清除图标）', async () => {
    await openSelect()
    expect(mousedown('.select-item').defaultPrevented).toBe(true)
    expect(mousedown('.arrow-svg').defaultPrevented).toBe(true)
    expect(mousedown('.clear-svg').defaultPrevented).toBe(true)
  })

  it('面板容器（选项 / 内边距）的 mousedown 被阻止', async () => {
    await openSelect()
    expect(mousedown('.select-panel-container').defaultPrevented).toBe(true)
    expect(mousedown('.select-options-panel').defaultPrevented).toBe(true)
    expect(mousedown('.select-option').defaultPrevented).toBe(true)
  })

  it('输入框失焦即关闭面板，与指针悬浮在哪无关', async () => {
    await openSelect()
    await blurInput('.search-input')
    await flush()
    expect(panelHidden('.select-panel-container')).toBe(true)
  })

  it('悬浮可选项后失焦仍关闭面板', async () => {
    await openSelect()
    hoverOption('.select-option', 0)
    await blurInput('.search-input')
    await flush()
    expect(panelHidden('.select-panel-container')).toBe(true)
  })

  it('悬浮禁用项后失焦同样关闭面板（旧实现此处会悬空不关）', async () => {
    await openSelect()
    hoverOption('.select-option', 1)
    await blurInput('.search-input')
    await flush()
    expect(panelHidden('.select-panel-container')).toBe(true)
  })
})

describe('AutoComplete 触发焦点保护', () => {
  async function openAutoComplete(): Promise<void> {
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: '', defaultOpen: true, options: AC_OPTIONS }
    })
    await flush()
  }

  it('输入框自身的 mousedown 不被阻止（保留原生聚焦与光标定位）', async () => {
    await openAutoComplete()
    expect(mousedown('.auto-complete-input').defaultPrevented).toBe(false)
  })

  it('自定义输入插槽内的 input / textarea 同样放行，插槽空白区仍阻止', async () => {
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: '', defaultOpen: true, options: AC_OPTIONS },
      slots: { default: () => h('input', { class: 'custom-slot-input' }) }
    })
    await flush()
    expect(mousedown('.custom-slot-input').defaultPrevented).toBe(false)
    expect(mousedown('.auto-complete-custom-input').defaultPrevented).toBe(true)
  })

  it('触发器上的非输入区域 mousedown 被阻止（内容区 / 清除图标）', async () => {
    await openAutoComplete()
    expect(mousedown('.auto-complete-content').defaultPrevented).toBe(true)
    expect(mousedown('.clear-svg').defaultPrevented).toBe(true)
  })

  it('面板容器（选项 / 空白区）的 mousedown 被阻止', async () => {
    await openAutoComplete()
    expect(mousedown('.auto-complete-panel').defaultPrevented).toBe(true)
    expect(mousedown('.auto-complete-options').defaultPrevented).toBe(true)
    expect(mousedown('.auto-complete-option').defaultPrevented).toBe(true)
  })

  it('输入框失焦即关闭面板，与指针悬浮在哪无关', async () => {
    await openAutoComplete()
    await blurInput('.auto-complete-input')
    await flush()
    expect(panelHidden('.auto-complete-panel')).toBe(true)
  })

  it('悬浮可选项后失焦仍关闭面板', async () => {
    await openAutoComplete()
    hoverOption('.auto-complete-option', 0)
    await blurInput('.auto-complete-input')
    await flush()
    expect(panelHidden('.auto-complete-panel')).toBe(true)
  })

  it('悬浮禁用项后失焦同样关闭面板（旧实现此处会悬空不关）', async () => {
    await openAutoComplete()
    hoverOption('.auto-complete-option', 1)
    await blurInput('.auto-complete-input')
    await flush()
    expect(panelHidden('.auto-complete-panel')).toBe(true)
  })
})
