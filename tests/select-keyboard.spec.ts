import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Select from 'components/select/Select.vue'

/**
 * 键盘导航回归：Select 原实现无任何键盘处理（`grep keydown` 全库 0 命中、HEAD 同样，文档亦未承诺），
 * 本组用例锁定新增的 ↑↓（跳过禁用项、环形、随面板滚入可视区）/ Enter 选中 / Esc 关闭行为；
 * 其中「事件参数口径」与鼠标点击保持一致（下拉下标均为过滤后列表的下标），
 * 「面板未打开时 ↑↓ 先打开面板」与 AutoComplete 的既有键盘实现一致。
 */
const OPTIONS = [
  { label: '北京市', value: 'beijing' },
  { label: '上海市', value: 'shanghai' },
  { label: '纽约市', value: 'newyork' }
]
const OPTIONS_WITH_DISABLED = [
  { label: '北京市', value: 'beijing' },
  { label: '上海市', value: 'shanghai', disabled: true },
  { label: '纽约市', value: 'newyork' }
]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.select-panel-wrapper').forEach((el) => el.remove())
})

/** 等待「状态变更 → 面板渲染 → 内核 post flush」 */
async function flush(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  await nextTick()
}

function optionTexts(): string[] {
  return [...document.querySelectorAll('.select-option')].map((el) => el.textContent?.trim() ?? '')
}

function hoverTexts(): string[] {
  return [...document.querySelectorAll('.select-option.option-hover')].map((el) => el.textContent?.trim() ?? '')
}

/** 面板显隐由 v-show 控制（隐藏时内联 display: none，未首启时元素不存在） */
function isPanelVisible(): boolean {
  const el = document.querySelector<HTMLElement>('.select-panel-container')
  if (!el) return false
  return el.style.display !== 'none'
}

async function pressKey(key: string): Promise<void> {
  const input = wrapper!.find('.search-input').element as HTMLInputElement
  input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
  await flush()
}

describe('Select 键盘导航', () => {
  it('↑↓ 环形移动高亮，并跳过禁用项', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: OPTIONS_WITH_DISABLED }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    // 无选中项 → 打开即高亮首个可用项（与鼠标路径一致）
    expect(hoverTexts()).toEqual(['北京市'])

    // 向下跳过被禁用的「上海市」
    await pressKey('ArrowDown')
    expect(hoverTexts()).toEqual(['纽约市'])
    // 环回到首项
    await pressKey('ArrowDown')
    expect(hoverTexts()).toEqual(['北京市'])
    // 反向环形同样跳过禁用项
    await pressKey('ArrowUp')
    expect(hoverTexts()).toEqual(['纽约市'])
  })

  it('面板未打开时 ↑↓ 先打开面板；Esc 关闭面板且不产生选中', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: OPTIONS }
    })
    await flush()
    expect(isPanelVisible()).toBe(false)

    await pressKey('ArrowDown')
    expect(isPanelVisible()).toBe(true)
    expect(hoverTexts()).toEqual(['北京市'])

    await pressKey('Escape')
    expect(isPanelVisible()).toBe(false)
    expect(wrapper.emitted('update:value')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('Enter 选中高亮项，事件参数与鼠标点击一致', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: OPTIONS }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()

    await pressKey('ArrowDown')
    expect(hoverTexts()).toEqual(['上海市'])
    await pressKey('Enter')

    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['shanghai'])
    // change 第 2 参为完整 option 对象，第 3 参为展示列表下标
    expect(wrapper.emitted('change')?.at(-1)).toEqual(['shanghai', { label: '上海市', value: 'shanghai' }, 1])
    expect(wrapper.emitted('select')?.at(-1)).toEqual(['shanghai', { label: '上海市', value: 'shanghai' }])
    expect(isPanelVisible()).toBe(false)
  })

  it('搜索模式下按过滤结果导航', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        showSearch: true,
        // 默认按 value 字段过滤（默认口径），按文本搜索需显式指定 optionFilterProp
        optionFilterProp: 'label',
        options: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' },
          { label: '苹果汁', value: 'juice' }
        ]
      }
    })
    await flush()
    await wrapper.find('.select-wrap').trigger('click')
    await flush()
    await wrapper.find('.search-input').setValue('苹果')
    await flush()
    // 键盘列表 = 过滤后的选项，且悬浮态落在过滤结果首项
    expect(optionTexts()).toEqual(['苹果', '苹果汁'])
    expect(hoverTexts()).toEqual(['苹果'])

    await pressKey('ArrowDown')
    expect(hoverTexts()).toEqual(['苹果汁'])
    await pressKey('Enter')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['juice'])
  })
})
