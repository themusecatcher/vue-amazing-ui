import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AutoComplete from 'components/auto-complete/AutoComplete.vue'

/**
 * 回归守护：AutoComplete 的 `open` 受控语义。
 *
 * `open` 为**纯受控属性**：显隐由外部值驱动（`watch(() => props.open)` → 内部 `showOptions`），
 * 组件只通过 `openChange` / `dropdownVisibleChange` 通知可见性变更，**不做 `v-model:open` 双向绑定**。
 *
 * 由此锁定三件事：
 * 1. 受控模式下用户交互（聚焦 / 点击 / 输入 / 失焦）会派发开合请求，但不自行改写内部状态 ——
 *    原实现在受控时直接 return，用户交互既打不开面板也不派发任何事件，事件方向与文档用法相反；
 * 2. 外部改 `open` 能同步到内部显隐，且不再被回传成多余事件；
 * 3. 非受控模式的事件时机保持原样。
 */
const OPTIONS = ['123', '123123', '123123123']

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.auto-complete-panel-wrapper').forEach((el) => el.remove())
})

async function flush(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  await nextTick()
}

function panelVisible(): boolean {
  const el = document.querySelector<HTMLElement>('.auto-complete-panel')
  if (!el) return false
  return el.style.display !== 'none'
}

describe('AutoComplete 受控 open 的开合事件', () => {
  it('受控关闭态下用户交互上报打开请求，且不自行改变显隐', async () => {
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: false, options: OPTIONS }
    })
    await flush()
    await wrapper.find('.auto-complete-input').trigger('focus')
    await flush()

    expect(wrapper.emitted('openChange')?.at(-1)).toEqual([true])
    expect(wrapper.emitted('dropdownVisibleChange')?.at(-1)).toEqual([true])
    // 受控：实际显隐由外部 open 决定，组件不自行展开（面板尚未首启渲染）
    expect(panelVisible()).toBe(false)
  })

  it('受控打开态下用户失焦上报关闭请求，面板仍由外部驱动', async () => {
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: true, options: OPTIONS }
    })
    await flush()
    expect(panelVisible()).toBe(true)

    // 已处于打开态：聚焦不再重复上报（避免噪声）
    await wrapper.find('.auto-complete-input').trigger('focus')
    await flush()
    expect(wrapper.emitted('openChange')).toBeUndefined()

    await wrapper.find('.auto-complete-input').trigger('blur')
    await flush()
    expect(wrapper.emitted('openChange')?.at(-1)).toEqual([false])
    expect(wrapper.emitted('dropdownVisibleChange')?.at(-1)).toEqual([false])
    // 受控：内部状态未被改写，面板仍可见，由外部把 open 置 false 后才关闭
    expect(panelVisible()).toBe(true)
  })

  it('外部修改 open 同步内部显隐，且不回传事件', async () => {
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { open: false, options: OPTIONS }
    })
    await flush()
    expect(panelVisible()).toBe(false)

    // 外部「展开」：内部同步为可见
    await wrapper.setProps({ open: true })
    await flush()
    expect(panelVisible()).toBe(true)
    // 外部「收起」：内部同步为不可见
    await wrapper.setProps({ open: false })
    await flush()
    expect(panelVisible()).toBe(false)

    // 外部驱动的变更不产生回传事件（事件只反映用户交互）
    expect(wrapper.emitted('openChange')).toBeUndefined()
    expect(wrapper.emitted('dropdownVisibleChange')).toBeUndefined()
  })

  it('非受控模式的开合事件仍照常派发（回归）', async () => {
    wrapper = mount(AutoComplete, {
      attachTo: document.body,
      global: { stubs: { transition: false } },
      props: { options: OPTIONS }
    })
    await flush()
    await wrapper.find('.auto-complete-input').trigger('focus')
    await flush()
    expect(wrapper.emitted('openChange')?.at(-1)).toEqual([true])

    await wrapper.find('.auto-complete-input').trigger('blur')
    await flush()
    expect(wrapper.emitted('openChange')?.at(-1)).toEqual([false])
  })
})
