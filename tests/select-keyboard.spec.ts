import { describe, it, expect, afterEach, vi } from 'vitest'
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

/** 等待「状态变更 → 面板渲染」：Vue 的一次 render + post flush（两次 nextTick），不含任何固定时长等待 */
async function flush(): Promise<void> {
  await nextTick()
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

/**
 * 轮询至面板达到期望显隐状态。
 *
 * 为什么显隐断言必须轮询而不能用固定等待：面板外层是真实 `<Transition>`（`v-show` + slide 过渡），
 * **关闭**时 Vue 要等过渡结束才把内联 display 置回 `none`，而 Vue 的 `nextFrame` 内部是「双层
 * requestAnimationFrame」——happy-dom 下 rAF 实为 `setImmediate`（宏任务）。
 * 因此「关闭后不可见」这一断言跨越两个宏任务：原先 `flush()` 里的固定 `setTimeout(10)` 与它们处于
 * 不同事件循环阶段，先后取决于该轮循环耗时，负载下定时器可能先于第二个宏任务触发 → 偶发失败。
 * 改为条件轮询后不再依赖任何固定时长（与 tests/carousel-*.spec.ts 的既有做法一致）。
 */
async function waitForPanel(visible: boolean): Promise<void> {
  await vi.waitFor(() => {
    expect(isPanelVisible()).toBe(visible)
  })
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
    await waitForPanel(false)

    await pressKey('ArrowDown')
    await waitForPanel(true)
    expect(hoverTexts()).toEqual(['北京市'])

    await pressKey('Escape')
    await waitForPanel(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
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

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['shanghai'])
    expect(wrapper.emitted('change')?.at(-1)).toEqual(['shanghai', '上海市', 1])
    await waitForPanel(false)
  })

  it('搜索模式下按过滤结果导航', async () => {
    wrapper = mount(Select, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: {
        search: true,
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
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['juice'])
  })
})
