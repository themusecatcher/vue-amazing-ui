import { describe, it, expect, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'
import type { Option } from 'components/select/Select.vue'

/**
 * 多选 / 标签模式（P2）的契约回归。
 *
 * 关键行为约定：
 * - 点击选项在 multiple / tags 下为**切换选中**（不关面板），change 返回数组且第 3 参 index 不适用（undefined）
 * - 移除标签（移除按钮 / 退格键 / 清除）逐个派发 `deselect`
 * - tags 模式把输入内容提交为新标签（回车 / 失焦），并把不在 options 中的已选值补成伪选项
 * - `tokenSeparators` 命中分隔符时直接拆分选中，不触发 search
 * - `maxTagCount` 折叠超出部分，`maxTagPlaceholder` / `maxTagTextLength` 控制折叠提示与截断
 * - options 动态变化（远程搜索清空 / 隐藏已选）后，已选项的标签仍需保留原 label（选项缓存）
 */
const OPTIONS: Option[] = [
  { label: '北京市', value: 'beijing' },
  { label: '上海市', value: 'shanghai' },
  { label: '纽约市', value: 'newyork' }
]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
})

/** 等待「状态变更 → DOM 渲染」稳定（与 option-click-selection.spec.ts 同款收敛判定） */
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

/** 当前可见的 tag 文本（排除折叠提示与被折叠项） */
function visibleTagTexts(): string[] {
  const nodes = document.querySelectorAll(
    '.select-selection-item:not(.select-selection-item-rest):not(.select-tag-hidden)'
  )
  return [...nodes].map((el) => el.textContent?.trim() ?? '')
}

/** 面板内选项文本 */
function optionTexts(): string[] {
  return [...document.querySelectorAll('.select-option')].map((el) => el.textContent?.trim() ?? '')
}

/** 折叠提示文本 */
function restText(): string {
  return document.querySelector('.select-selection-item-rest')?.textContent?.trim() ?? ''
}

/** 面板是否处于展开态（面板用 v-show 控制显隐） */
function panelOpened(): boolean {
  const panel = document.querySelector('.select-panel-container') as HTMLElement | null
  return Boolean(panel && panel.style.display !== 'none')
}

/** 点击面板中第 index 个选项（含 mousemove 高亮，模拟真实鼠标序列） */
async function clickOption(index: number): Promise<void> {
  const option = [...document.querySelectorAll('.select-option')][index] as HTMLElement
  option.dispatchEvent(new MouseEvent('mouseenter'))
  option.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await flush()
}

/** 读取最近一次事件参数 */
function lastEmit(name: string): unknown[] | undefined {
  return wrapper?.emitted(name)?.at(-1)
}

function inputValue(): string {
  return (wrapper?.find('.search-input').element as HTMLInputElement).value
}

describe('Select 多选模式的选中与取消', () => {
  it('点击选项切换选中且面板保持展开，change 返回数组并省略第 3 参', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: [], options: OPTIONS }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    expect(optionTexts()).toEqual(['北京市', '上海市', '纽约市'])

    await clickOption(0)
    expect(lastEmit('update:value')?.[0]).toEqual(['beijing'])
    expect(lastEmit('change')?.[0]).toEqual(['beijing'])
    expect(lastEmit('change')?.[1]).toEqual([{ label: '北京市', value: 'beijing' }])
    expect(lastEmit('change')?.[2]).toBeUndefined()
    expect(lastEmit('select')?.[0]).toBe('beijing')
    // 多选下选中不收起面板
    expect(panelOpened()).toBe(true)
  })

  it('再次点击已选项取消选中，并派发 deselect', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: ['beijing', 'shanghai'], options: OPTIONS }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    expect(visibleTagTexts()).toEqual(['北京市', '上海市'])

    await clickOption(0)
    expect(lastEmit('update:value')?.[0]).toEqual(['shanghai'])
    expect(lastEmit('deselect')?.[0]).toBe('beijing')
    // 取消选中不应派发 select
    expect(lastEmit('select')).toBeUndefined()
  })

  it('清除按钮清空全部并逐个派发 deselect', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: ['beijing', 'shanghai'], options: OPTIONS, allowClear: true }
    })
    await flush()
    await wrapper.find('.clear-svg').trigger('click')
    await flush()
    expect(lastEmit('update:value')?.[0]).toEqual([])
    expect(lastEmit('change')?.[0]).toEqual([])
    expect(lastEmit('change')?.[2]).toBeUndefined()
    expect(wrapper.emitted('deselect')?.map((args) => args[0])).toEqual(['beijing', 'shanghai'])
    // 组件为纯受控：清空后由父级把新值回写（此处模拟 v-model 的行为）
    await wrapper.setProps({ value: [] })
    await flush()
    expect(visibleTagTexts()).toEqual([])
  })
})

describe('Select 多选的搜索能力', () => {
  it('未显式指定 showSearch 时多选默认可搜索，显式 false 时不可搜索', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: [], options: OPTIONS }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    // 多选下输入框的可编辑性随「展开 / 聚焦」变化，故开面板后判定
    expect(wrapper.find('.search-input').attributes('readonly')).toBeUndefined()

    await wrapper.setProps({ showSearch: false })
    await flush()
    expect(wrapper.find('.search-input').attributes('readonly')).toBeDefined()
  })

  it('tags 模式下 showSearch 为 false 时输入框仍可编辑', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'tags', value: [], options: OPTIONS, showSearch: false }
    })
    await flush()
    expect(wrapper.find('.search-input').attributes('readonly')).toBeUndefined()
  })
})

describe('Select 多选模式的标签移除', () => {
  it('搜索文本为空时退格删除最后一个可移除标签（跳过禁用项）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        mode: 'multiple',
        value: ['beijing', 'shanghai', 'newyork'],
        options: [OPTIONS[0], OPTIONS[1], { ...OPTIONS[2], disabled: true }]
      }
    })
    await flush()
    expect(visibleTagTexts()).toEqual(['北京市', '上海市', '纽约市'])

    await wrapper.find('.search-input').trigger('keydown', { key: 'Backspace' })
    await flush()
    // 末位「纽约市」为禁用项 → 跳过，删除「上海市」
    expect(lastEmit('update:value')?.[0]).toEqual(['beijing', 'newyork'])
    expect(lastEmit('deselect')?.[0]).toBe('shanghai')
  })

  it('标签上的移除按钮可移除对应标签', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: ['beijing', 'shanghai'], options: OPTIONS }
    })
    await flush()
    const removeBtns = document.querySelectorAll('.select-selection-item-remove')
    expect(removeBtns.length).toBe(2)
    ;(removeBtns[0] as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()
    expect(lastEmit('update:value')?.[0]).toEqual(['shanghai'])
    expect(lastEmit('deselect')?.[0]).toBe('beijing')
  })

  it('options 被清空后标签仍保留原 label（选项缓存）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: ['beijing'], options: OPTIONS }
    })
    await flush()
    expect(visibleTagTexts()).toEqual(['北京市'])

    await wrapper.setProps({ options: [] })
    await flush()
    expect(visibleTagTexts()).toEqual(['北京市'])
  })
})

describe('Select 标签模式的输入提交', () => {
  it('输入内容作为「新建标签」伪选项置于列表首位，回车即可创建', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'tags', value: [], options: [] }
    })
    await flush()
    await wrapper.find('.search-input').setValue('新标签')
    await flush()
    expect(optionTexts()).toEqual(['新标签'])

    await wrapper.find('.search-input').trigger('keydown', { key: 'Enter' })
    await flush()
    expect(lastEmit('update:value')?.[0]).toEqual(['新标签'])
    expect(lastEmit('select')?.[0]).toBe('新标签')
    expect(inputValue()).toBe('')
  })

  it('失焦时把输入内容提交为标签', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'tags', value: [], options: [] }
    })
    await flush()
    await wrapper.find('.search-input').setValue('失焦标签')
    await flush()
    await wrapper.find('.search-input').trigger('blur')
    await flush()
    expect(lastEmit('update:value')?.[0]).toEqual(['失焦标签'])
    expect(inputValue()).toBe('')
  })

  it('tags 模式下已选但不在 options 中的值会补进下拉列表', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'tags', value: ['created'], options: OPTIONS }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    expect(optionTexts()).toEqual(['北京市', '上海市', '纽约市', 'created'])
  })

  it('tokenSeparators 命中分隔符时直接拆分选中且不触发 search', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'tags', value: [], options: [], tokenSeparators: [','] }
    })
    await flush()
    await wrapper.find('.search-input').setValue('a,b')
    await flush()
    expect(lastEmit('update:value')?.[0]).toEqual(['a', 'b'])
    expect(wrapper.emitted('select')?.map((args) => args[0])).toEqual(['a', 'b'])
    expect(wrapper.emitted('search')).toBeUndefined()
    expect(inputValue()).toBe('')
  })
})

describe('Select 多选模式的标签折叠', () => {
  it('maxTagCount 截断显示并用 maxTagPlaceholder 插槽渲染折叠提示', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        mode: 'multiple',
        value: ['beijing', 'shanghai', 'newyork'],
        options: OPTIONS,
        maxTagCount: 2
      },
      slots: {
        maxTagPlaceholder: (params: { omittedValues: Option[] }) => h('span', `省略${params.omittedValues.length}项`)
      }
    })
    await flush()
    expect(visibleTagTexts()).toEqual(['北京市', '上海市'])
    expect(restText()).toBe('省略1项')
    // 被折叠的 tag 仍渲染在 DOM 中（供 responsive 量宽），但不参与可见文本
    expect(document.querySelectorAll('.select-tag-hidden').length).toBe(1)
  })

  it('未提供 maxTagPlaceholder 时使用默认折叠文案（+ N ...）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        mode: 'multiple',
        value: ['beijing', 'shanghai', 'newyork'],
        options: OPTIONS,
        maxTagCount: 1
      }
    })
    await flush()
    expect(visibleTagTexts()).toEqual(['北京市'])
    expect(restText()).toBe('+ 2 ...')
  })

  it('maxTagTextLength 截断过长的标签文本', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { mode: 'multiple', value: ['beijing'], options: OPTIONS, maxTagTextLength: 2 }
    })
    await flush()
    expect(visibleTagTexts()).toEqual(['北京...'])
  })

  it('maxTagCount 为 responsive 时按容器宽度折叠（jsdom 无布局，宽度为 0 时全部保留）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        mode: 'multiple',
        value: ['beijing', 'shanghai', 'newyork'],
        options: OPTIONS,
        maxTagCount: 'responsive'
      }
    })
    await flush()
    // jsdom 无布局：容器与 tag 宽度均为 0，全部「装得下」→ 不产生折叠
    // （真实浏览器中由挂载时同步量取 + ResizeObserver 按容器宽度折叠）
    expect(visibleTagTexts()).toEqual(['北京市', '上海市', '纽约市'])
    expect(restText()).toBe('')
  })
})

/**
 * 面板开合时的高亮 / 滚动保持 ——
 * 「打开即复位到选中项并滚入可视区」带 `!multiple && rawValues.size === 1` 前置条件
 * （components/vc-select/OptionList.tsx），故单选复位、多选保留用户上次移动的高亮与滚动位置。
 *
 * 本组用例显式关闭虚拟滚动（virtual: false）：30 项在默认配置下会触发窗口化渲染，
 * 面板 DOM 中不再存在全部选项，而本组用例要断言的是「高亮 / 滚动的保持与复位」这一条契约
 * （虚拟滚动自身的契约由 select-virtual.spec.ts 覆盖）。
 */
describe('Select 面板开合时的高亮与滚动保持', () => {
  const LONG_OPTIONS: Option[] = [...Array(30)].map((_, index) => ({ label: `选项 ${index + 1}`, value: index + 1 }))

  function hoverTexts(): string[] {
    return [...document.querySelectorAll('.select-option.option-hover')].map((el) => el.textContent?.trim() ?? '')
  }

  function hoverOption(index: number): void {
    const option = [...document.querySelectorAll('.select-option')][index] as HTMLElement
    option.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
  }

  async function pressEscape(): Promise<void> {
    const input = wrapper!.find('.search-input').element as HTMLInputElement
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flush()
  }

  it('多选：关闭再打开保留悬浮态与滚动位置', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      // 已选「选项 5」：若沿用旧实现（打开即复位），高亮会被拉回选项 5 且滚动位置归零
      props: { mode: 'multiple', value: [5], options: LONG_OPTIONS, virtual: false }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()

    const scrollContainer = document.querySelector('.scrollbar-container') as HTMLElement
    scrollContainer.scrollTop = 400
    hoverOption(19)
    await flush()
    expect(hoverTexts()).toEqual(['选项 20'])

    await pressEscape()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()

    // 复位会把高亮拉回选中项并把滚动位置归零，故两项都断言
    expect(hoverTexts()).toEqual(['选项 20'])
    expect(scrollContainer.scrollTop).toBe(400)
  })

  it('单选：打开时复位到选中项（!multiple 分支）', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { value: 25, options: LONG_OPTIONS, virtual: false }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    expect(hoverTexts()).toEqual(['选项 25'])

    hoverOption(2)
    await flush()
    expect(hoverTexts()).toEqual(['选项 3'])

    await pressEscape()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    expect(hoverTexts()).toEqual(['选项 25'])
  })
})
