import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'
import type { Option } from 'components/select/Select.vue'

/**
 * 虚拟滚动（P4）与 ARIA 语义的契约回归。
 *
 * 关键行为约定：
 * - 开启虚拟滚动（默认）且内容高于面板时**只渲染可视区行**，未渲染区间用等高空占位撑出真实滚动高度
 * - `virtual: false` 全量渲染；`dropdownMatchSelectWidth: false`（面板宽度自适应）时自动关闭虚拟滚动
 *   （`virtual !== false && dropdownMatchSelectWidth !== false`）
 * - `listItemHeight` 决定行高换算；分组标题同样占一行
 * - 高亮行不强制纳入渲染窗口；不在窗口内时不设置 `aria-activedescendant`（避免指向不存在的节点）
 * - `scrollTo` / 键盘导航按下标定位，虚拟滚动下目标行未渲染同样有效
 * - ARIA：输入框为 `combobox`，`aria-controls` / `aria-owns` 指向 listbox，选项为 `role="option"` +
 *   `${id}_list_${扁平下标}`，面板关闭时以隐藏的 `aria-live` 节点播报已选内容
 *
 * ⚠️ 测试环境（happy-dom）无布局：可视区高度由 `listHeight` / `maxDisplay` 推导（不读 DOM），
 * 故窗口切片是确定值；滚动位置以「设置 scrollTop + 派发 scroll 事件」模拟。
 */
const OPTIONS: Option[] = [
  { label: '北京市', value: 'beijing' },
  { label: '上海市', value: 'shanghai' },
  { label: '纽约市', value: 'newyork' }
]

/** 生成 count 项选项（label 可读，value 为序号） */
function buildOptions(count: number): Option[] {
  return [...Array(count)].map((_, index) => ({ label: `选项 ${index + 1}`, value: index + 1 }))
}

/** 生成一组分组数据（组内子选项 value 连续且跨组不重复） */
function buildGroup(label: string, offset: number, count: number): Option {
  return {
    label,
    value: `g-${label}`,
    options: [...Array(count)].map((_, index) => ({ label: `${label} ${index + 1}`, value: offset + index + 1 }))
  }
}

const BIG_OPTIONS = buildOptions(1000)

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
})

/** 等待「状态变更 → DOM 渲染」稳定（与 select-multiple.spec.ts 同款收敛判定） */
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

/** 当前渲染出的选项文本（虚拟滚动下只含窗口内选项） */
function optionTexts(): string[] {
  return [...document.querySelectorAll('.select-option')].map((el) => el.textContent?.trim() ?? '')
}

/** 上下占位区高度（未渲染区间的撑高） */
function placeholderHeights(): number[] {
  return [...document.querySelectorAll('.select-options-placeholder')].map((el) =>
    Number.parseFloat((el as HTMLElement).style.height || '0')
  )
}

/** 模拟面板滚动：设置滚动位置并派发原生 scroll（组件监听的是容器原生事件） */
function scrollPanel(scrollTop: number): void {
  const container = document.querySelector('.scrollbar-container') as HTMLElement
  container.scrollTop = scrollTop
  container.dispatchEvent(new Event('scroll'))
}

/** 按 Escape 收起面板（组件在 input 上监听 keydown） */
async function pressEscape(): Promise<void> {
  const input = wrapper!.find('.search-input').element as HTMLInputElement
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  await flush()
}

/** 挂载并展开面板 */
async function mountAndOpen(props: Record<string, unknown>): Promise<void> {
  wrapper = mount(Select, {
    attachTo: document.body,
    global: { stubs: { transition: false } },
    props
  })
  await flush()
  await wrapper.find('.select-wrap').trigger('click')
  await flush()
}

describe('Select 虚拟滚动（大数据量窗口化渲染）', () => {
  it('默认只渲染可视区行，远少于选项总数', async () => {
    await mountAndOpen({ options: BIG_OPTIONS })
    const rendered = optionTexts()
    // 面板高 256px（maxDisplay 8 × 32）、行高 32px → 8 行 + 末端 1 行缓冲 = 9 行
    expect(rendered.length).toBe(9)
    expect(rendered[0]).toBe('选项 1')
  })

  it('未渲染区间用等高空占位撑出滚动高度', async () => {
    await mountAndOpen({ options: BIG_OPTIONS })
    // 首屏从第 0 行开始 → 无上占位；下占位 = (1000 - 9) × 32
    expect(placeholderHeights()).toEqual([(BIG_OPTIONS.length - 9) * 32])
  })

  it('滚动后窗口跟随滚动位置，上下占位同时补齐', async () => {
    await mountAndOpen({ options: BIG_OPTIONS })
    scrollPanel(3200)
    await flush()
    const rendered = optionTexts()
    // 3200 / 32 = 100 行 → 起点 99（含 1 行上缓冲），末端 108 → 10 行
    expect(rendered[0]).toBe('选项 100')
    expect(rendered.length).toBe(10)
    expect(placeholderHeights()).toEqual([99 * 32, (BIG_OPTIONS.length - 109) * 32])
  })

  it('面板关闭重开后恢复滚动位置与渲染窗口（display:none 期间容器 scrollTop 被浏览器归零）', async () => {
    await mountAndOpen({ options: BIG_OPTIONS })
    scrollPanel(3200)
    await flush()
    expect(optionTexts()[0]).toBe('选项 100')

    await pressEscape()
    // 模拟浏览器行为：面板 display:none 期间容器 scrollTop 归零，且重开时不会自行恢复（Chrome 实测）
    const container = document.querySelector('.scrollbar-container') as HTMLElement
    container.scrollTop = 0

    await wrapper!.find('.select-wrap').trigger('click')
    await flush()

    // 恢复关闭前的偏移（跨开合保留），渲染窗口与容器位置一致 —— 否则可视区里只有上方占位（面板一片空白）
    expect(container.scrollTop).toBe(3200)
    expect(optionTexts()[0]).toBe('选项 100')
    expect(placeholderHeights()).toEqual([99 * 32, (BIG_OPTIONS.length - 109) * 32])
  })

  it('窗口滑动时按行 key 复用既有节点（避免已选项蓝底闪动）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: BIG_OPTIONS, mode: 'multiple', value: [100], virtual: true }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    scrollPanel(3200) // 窗口 [99, 109) → 渲染「选项 100」~「选项 109」
    await flush()

    const rowsBefore = new Map(
      [...document.querySelectorAll<HTMLElement>('.select-option')].map((el) => [el.textContent?.trim() ?? '', el])
    )
    const classesBefore = new Map([...rowsBefore].map(([text, el]) => [text, el.className]))

    scrollPanel(3232) // 下移一行 → 窗口 [100, 110) → 渲染「选项 101」~「选项 110」
    await flush()

    const rowsAfter = [...document.querySelectorAll<HTMLElement>('.select-option')]
    const afterTexts = rowsAfter.map((el) => el.textContent?.trim() ?? '')
    expect(afterTexts).toContain('选项 110')
    expect(afterTexts).not.toContain('选项 100')

    // 既有行仍是「同一个 DOM 节点、同一套类名」：缺 key 时 Vue 按下标复用节点，
    // 同一节点会被换上别的选项的类名，配合 .select-option 的 background 过渡即表现为蓝色标记闪动
    rowsAfter.forEach((el) => {
      const text = el.textContent?.trim() ?? ''
      const before = rowsBefore.get(text)
      if (!before) return
      expect(el).toBe(before)
      expect(el.className).toBe(classesBefore.get(text))
    })
  })

  it('虚拟滚动下 wheel 由组件代理：阻止原生滚动并自行驱动', async () => {
    await mountAndOpen({ options: BIG_OPTIONS })
    const container = document.querySelector('.scrollbar-container') as HTMLElement
    // happy-dom 无布局：显式给出滚动几何，供 wheel 代理换算可滚动区间
    Object.defineProperty(container, 'scrollHeight', { value: BIG_OPTIONS.length * 32, configurable: true })
    Object.defineProperty(container, 'clientHeight', { value: 256, configurable: true })

    // 面板内部向下滚：阻止原生滚动（合成线程不再先行），滚动位置与渲染窗口同帧生效
    const down = new WheelEvent('wheel', { deltaY: 320, cancelable: true, bubbles: true })
    expect(container.dispatchEvent(down)).toBe(false)
    expect(container.scrollTop).toBe(320)
    await flush()
    expect(optionTexts()[0]).toBe('选项 10')

    // 已在顶部继续向上滚：不拦截，保留原生滚动链（边界放行）
    container.scrollTop = 0
    await flush()
    const up = new WheelEvent('wheel', { deltaY: -320, cancelable: true, bubbles: true })
    expect(container.dispatchEvent(up)).toBe(true)
    expect(container.scrollTop).toBe(0)

    // 已在底部继续向下滚：同样不拦截
    const maxTop = BIG_OPTIONS.length * 32 - 256
    container.scrollTop = maxTop
    await flush()
    const bottom = new WheelEvent('wheel', { deltaY: 320, cancelable: true, bubbles: true })
    expect(container.dispatchEvent(bottom)).toBe(true)
    expect(container.scrollTop).toBe(maxTop)
  })

  it('virtual 为 false 时不代理 wheel（保留原生滚动）', async () => {
    await mountAndOpen({ options: BIG_OPTIONS, virtual: false })
    const container = document.querySelector('.scrollbar-container') as HTMLElement
    Object.defineProperty(container, 'scrollHeight', { value: BIG_OPTIONS.length * 32, configurable: true })
    Object.defineProperty(container, 'clientHeight', { value: 256, configurable: true })

    const event = new WheelEvent('wheel', { deltaY: 320, cancelable: true, bubbles: true })
    expect(container.dispatchEvent(event)).toBe(true)
    expect(container.scrollTop).toBe(0)
  })

  it('virtual 为 false 时全量渲染且无占位', async () => {
    const options = buildOptions(200)
    await mountAndOpen({ options, virtual: false })
    expect(optionTexts().length).toBe(options.length)
    expect(placeholderHeights()).toEqual([])
  })

  it('dropdownMatchSelectWidth 为 false 时自动关闭虚拟滚动', async () => {
    const options = buildOptions(60)
    await mountAndOpen({ options, dropdownMatchSelectWidth: false })
    expect(optionTexts().length).toBe(options.length)
  })

  it('listItemHeight 决定行高换算', async () => {
    await mountAndOpen({ options: BIG_OPTIONS, listItemHeight: 64 })
    // 256 / 64 = 4 行 + 末端 1 行缓冲 = 5 行
    expect(optionTexts().length).toBe(5)
    expect(placeholderHeights()).toEqual([(BIG_OPTIONS.length - 5) * 64])
  })

  it('分组标题同样占一行并参与窗口换算', async () => {
    await mountAndOpen({ options: [buildGroup('A', 0, 20), buildGroup('B', 20, 20)] })
    // 42 行（20 + 20 项 + 2 个标题），首屏 9 行 = 1 个标题 + 8 个选项
    expect(document.querySelectorAll('.select-option-group').length).toBe(1)
    expect(optionTexts().length).toBe(8)
  })
})

describe('Select 虚拟滚动下的定位能力', () => {
  it('打开面板时高亮行随面板滚入窗口（aria-activedescendant 可解析）', async () => {
    await mountAndOpen({ options: BIG_OPTIONS, value: 500 })
    const activeId = wrapper!.find('.search-input').attributes('aria-activedescendant')
    expect(activeId).toBeTruthy()
    expect(document.getElementById(activeId!)?.textContent?.trim()).toBe('选项 500')
  })

  it('scrollTo 传扁平下标时，目标行未渲染也能滚动到位', async () => {
    await mountAndOpen({ options: BIG_OPTIONS })
    ;(wrapper!.vm as unknown as { scrollTo: (arg: number) => void }).scrollTo(499)
    await flush()
    expect(optionTexts()[0]).toBe('选项 500')
  })

  it('scrollTo 传 top 时按滚动偏移定位', async () => {
    await mountAndOpen({ options: BIG_OPTIONS })
    ;(wrapper!.vm as unknown as { scrollTo: (arg: { top: number }) => void }).scrollTo({ top: 1600 })
    await flush()
    // 1600 / 32 = 50 行 → 起点 49（含 1 行上缓冲）
    expect(optionTexts()[0]).toBe('选项 50')
  })

  it('键盘导航把高亮行滚入窗口（↑↓ 后目标行可见）', async () => {
    await mountAndOpen({ options: BIG_OPTIONS, value: 1 })
    const input = wrapper!.find('.search-input')
    // 连续下移 5 次，高亮依次走到选项 6，且窗口随滚动位置移动
    for (let index = 0; index < 5; index++) {
      await input.trigger('keydown', { key: 'ArrowDown' })
      await flush()
    }
    const activeId = wrapper!.find('.search-input').attributes('aria-activedescendant')
    expect(document.getElementById(activeId!)?.textContent?.trim()).toBe('选项 6')
  })
})

describe('Select 的 ARIA 语义', () => {
  it('输入框为 combobox，aria 属性与 listbox 关联', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: OPTIONS, id: 'my-select' }
    })
    await flush()
    const input = wrapper.find('.search-input')
    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('id')).toBe('my-select')
    expect(input.attributes('aria-haspopup')).toBe('listbox')
    expect(input.attributes('aria-autocomplete')).toBe('list')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(input.attributes('aria-controls')).toBe('my-select_list')
    expect(input.attributes('aria-owns')).toBe('my-select_list')

    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    expect(wrapper.find('.search-input').attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('[role="listbox"]')?.id).toBe('my-select_list')
  })

  it('未传 id 时内部生成，且 input 与 listbox 的 id 自洽', async () => {
    await mountAndOpen({ options: OPTIONS })
    const input = wrapper!.find('.search-input')
    const id = input.attributes('id') ?? ''
    expect(id).toMatch(/^vui-select-\d+$/)
    expect(input.attributes('aria-controls')).toBe(`${id}_list`)
    expect(document.querySelector('[role="listbox"]')?.id).toBe(`${id}_list`)
  })

  it('选项为 role=option，带 `${id}_list_${下标}` 与 aria-selected', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: OPTIONS, value: 'shanghai', id: 's1' }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()

    const options = document.querySelectorAll('[role="option"]')
    expect(options.length).toBe(OPTIONS.length)
    expect(options[0].id).toBe('s1_list_0')
    expect(options[0].getAttribute('aria-selected')).toBe('false')
    // 高亮项 = 已选中的「上海市」（扁平下标 1）
    expect(options[1].getAttribute('aria-selected')).toBe('true')
    expect(wrapper.find('.search-input').attributes('aria-activedescendant')).toBe('s1_list_1')
  })

  it('面板关闭时不设置 aria-activedescendant，并以隐藏 aria-live 节点播报已选内容', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: ['beijing', 'shanghai'], options: OPTIONS }
    })
    await flush()
    expect(wrapper.find('.search-input').attributes('aria-activedescendant')).toBeUndefined()
    expect(document.querySelector('.select-sr-only')?.textContent).toBe('北京市, 上海市')

    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    // 展开时高亮项由 activedescendant 表达，播报节点移除（避免重复朗读）
    expect(document.querySelector('.select-sr-only')).toBeNull()
    expect(wrapper.find('.search-input').attributes('aria-activedescendant')).toBeTruthy()
  })
})
