import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AutoComplete from 'components/auto-complete/AutoComplete.vue'
import Select from 'components/select/Select.vue'

/**
 * 浮层选项「真实鼠标点击选中」与「悬浮高亮重置」的契约回归
 *
 * 背景（真实浏览器 + CDP 实测的事件序列：`mousedown@选项 → blur@input → mouseup@面板后方元素 → click@body`）：
 * 面板在 input 失焦时会立即关闭，而关闭态的离开动画期间面板整体 `pointer-events: none`
 * （见 `.auto-complete-panel.slide-leave-active` / `.select-panel-container.slide-leave-active`），
 * 于是 mouseup / click 落不到选项上 —— `select` / `update:value`（AutoComplete 与 Select 的同名事件）全部不触发，
 * 表现为「点击选项无任何反应」。修法是选项按下鼠标时阻止默认行为，使 input 不失焦。
 *
 * 另：打开面板时，仅当「当前输入值能查到对应选项」才把悬浮态复位到该项；输入框无值或值查不到对应项时
 * 保持关闭前的悬浮项不动（不做「回落首项」）。
 * `Select` 同源：打开面板时「有选中项 → 悬浮选中项；原悬浮项不可用（含从未悬浮）→ 悬浮首个可用项；否则保持」。
 */
const OPTIONS = [{ value: '123' }, { value: '123123' }, { value: '123123123' }]
const SELECT_OPTIONS = [
  { label: '北京市', value: 'beijing' },
  { label: '上海市', value: 'shanghai' },
  { label: '纽约市', value: 'newyork' }
]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.auto-complete-panel-wrapper, .select-panel-wrapper').forEach((el) => el.remove())
})

/**
 * 等待「状态变更 → 面板渲染 → 内核 post flush」
 *
 * 改为「等到 DOM 稳定」而非固定时长：固定时长在并行执行（多 worker 抢 CPU）时可能被异步链路追平，
 * 断言就会读到未渲染完的 DOM。这里等连续两轮「微任务 + 宏任务」之间 DOM 不再变化即返回：
 * 既随实际耗时自适应，也不会比必要更久。
 */
async function flush(): Promise<void> {
  let prev = ''
  // 上限 20 轮兜底：正常情况第 2 轮即收敛，仅当状态仍在持续变化时才继续等待
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

/** 派发可取消的 mousedown，返回事件对象以断言默认行为是否被阻止 */
function dispatchMousedown(el: Element): MouseEvent {
  const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
  el.dispatchEvent(event)
  return event
}

function hoverTexts(): string[] {
  return [...document.querySelectorAll('.auto-complete-option.option-hover')].map((el) => el.textContent?.trim() ?? '')
}

/** Select 面板内当前高亮项文本 */
function selectHoverTexts(): string[] {
  return [...document.querySelectorAll('.select-option.option-hover')].map((el) => el.textContent?.trim() ?? '')
}

describe('AutoComplete 选项点击选中', () => {
  it('选项按下鼠标阻止默认行为，完整鼠标序列可正常选中', async () => {
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: '123', defaultOpen: true, options: OPTIONS }
    })
    await flush()
    const options = [...document.querySelectorAll('.auto-complete-option')] as HTMLElement[]
    expect(options.length).toBe(3)

    // 阻止默认 = 不让 input 失焦；否则 blur 会先关闭面板，mouseup / click 落不到选项上
    options[1].dispatchEvent(new MouseEvent('mouseenter'))
    expect(dispatchMousedown(options[1]).defaultPrevented).toBe(true)

    options[1].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    expect(wrapper.emitted('update:value')?.at(-1)?.[0]).toBe('123123')
    expect(wrapper.emitted('select')?.at(-1)?.[0]).toBe('123123')
    expect((document.querySelector('.auto-complete-panel') as HTMLElement).style.display).toBe('none')
  })

  it('重新打开面板时悬浮态重置为输入值对应选项，不保留关闭前的悬浮项', async () => {
    // 受控 open：初始关闭，输入值指向第 3 项
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: '123123123', open: false, options: OPTIONS }
    })
    await wrapper.setProps({ open: true })
    await flush()
    // 打开时悬浮态落到输入值对应项（而非兜底的首项）
    expect(hoverTexts()).toEqual(['123123123'])

    // 悬浮到第 2 项后关闭面板
    ;(document.querySelectorAll('.auto-complete-option')[1] as HTMLElement).dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(hoverTexts()).toEqual(['123123'])

    await wrapper.setProps({ open: false })
    await flush()
    // 重新打开：清除关闭前的悬浮项，回到输入值对应项
    await wrapper.setProps({ open: true })
    await flush()
    expect(hoverTexts()).toEqual(['123123123'])
  })

  it('输入框无值（或值查不到对应项）时，重开面板保留原悬浮项，不回落首项', async () => {
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: '', open: false, options: OPTIONS }
    })
    await wrapper.setProps({ open: true })
    await flush()
    // 首次打开：无输入值可匹配，默认高亮首项（defaultActiveFirstOption，由选项列表变化触发）
    expect(hoverTexts()).toEqual(['123'])

    // 悬浮到第 3 项后关闭再打开
    ;(document.querySelectorAll('.auto-complete-option')[2] as HTMLElement).dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(hoverTexts()).toEqual(['123123123'])
    await wrapper.setProps({ open: false })
    await flush()
    await wrapper.setProps({ open: true })
    await flush()
    // 无输入值可匹配时不做任何重置，保留关闭前的悬浮项
    expect(hoverTexts()).toEqual(['123123123'])
  })
})

describe('Select 选项点击选中', () => {
  it('选项按下鼠标阻止默认行为，完整鼠标序列可正常选中', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: undefined, options: SELECT_OPTIONS }
    })
    await flush()
    // 点击触发器展开面板
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    const options = [...document.querySelectorAll('.select-option')] as HTMLElement[]
    expect(options.map((el) => el.textContent?.trim())).toEqual(['北京市', '上海市', '纽约市'])

    options[2].dispatchEvent(new MouseEvent('mouseenter'))
    expect(dispatchMousedown(options[2]).defaultPrevented).toBe(true)

    options[2].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    expect(wrapper.emitted('update:value')?.at(-1)?.[0]).toBe('newyork')
    expect((document.querySelector('.select-panel-container') as HTMLElement).style.display).toBe('none')
  })
})

describe('Select 打开面板的默认悬浮态', () => {
  it('无选中项时悬浮到首个可用项；关闭再打开保持原悬浮项', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: undefined, options: SELECT_OPTIONS }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    // 无选中项 → 首个可用项
    expect(selectHoverTexts()).toEqual(['北京市'])

    // 悬浮到第 3 项后关闭再打开 → 保持关闭前的悬浮项
    ;(document.querySelectorAll('.select-option')[2] as HTMLElement).dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(selectHoverTexts()).toEqual(['纽约市'])
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    expect(selectHoverTexts()).toEqual(['纽约市'])
  })

  it('首个选项被禁用时，无选中项打开面板悬浮到首个可用项', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        value: undefined,
        options: [
          { label: '北京市', value: 'beijing', disabled: true },
          { label: '上海市', value: 'shanghai' }
        ]
      }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    expect(selectHoverTexts()).toEqual(['上海市'])
  })

  it('有选中项时打开面板悬浮到选中项（不回落首项）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: 'newyork', options: SELECT_OPTIONS }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    expect(selectHoverTexts()).toEqual(['纽约市'])
  })
})
