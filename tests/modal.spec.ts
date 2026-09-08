import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Modal, { ModalProvider } from 'components/modal'
import type { ModalApi } from 'components/modal'

/**
 * Modal 回归测试：Esc 绑定在弹窗主体上，由「焦点是否在弹窗内」仲裁，
 * 无跨实例全局栈；遮罩点击仍作用于所属实例，而非入栈顺序的最后一个。
 */
describe('Modal 键盘与遮罩', () => {
  it('同实例多弹窗时，Esc 只关闭事件来源的那个弹窗', async () => {
    let api: ModalApi | null = null
    const wrapper = mount(ModalProvider, {
      attrs: {
        onReady: (value: ModalApi) => {
          api = value
        }
      },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    const alive = api!.create({ title: '保持打开', destroyOnClose: true })
    const kept = api!.create({ title: '关闭后保留', destroyOnClose: false })
    await flushPromises()
    kept.destroy()
    await flushPromises()
    const aliveEl = document.body.querySelector(`.modal-container[data-key="${alive.key}"]`) as HTMLElement
    expect(aliveEl.style.display).not.toBe('none')

    // 从 alive 的弹窗主体派发（等价于焦点在其中）：保留实例的关闭不影响其响应
    const aliveBody = aliveEl.querySelector('.modal-body-wrap') as HTMLElement
    aliveBody.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flushPromises()
    expect(aliveEl.style.display).toBe('none')
    wrapper.unmount()
  })

  it('焦点不在弹窗内时 Esc 不响应（元素级监听的既有边界）', async () => {
    const wrapper = mount(Modal, { props: { open: true, title: '标题' } })
    await wrapper.vm.$nextTick()
    const el = document.body.querySelector('.modal-container') as HTMLElement
    expect(el.style.display).not.toBe('none')

    // 焦点在弹窗外时 keydown 不经过弹窗主体，Esc 不响应
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flushPromises()
    expect(el.style.display).not.toBe('none')
    wrapper.unmount()
  })

  it('点击遮罩应关闭该遮罩所属的实例，而非入栈顺序的最后一个', async () => {
    let api: ModalApi | null = null
    const wrapper = mount(ModalProvider, {
      attrs: {
        onReady: (value: ModalApi) => {
          api = value
        }
      },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    // 先开的实例 zIndex 更高，其遮罩位于最上层（命令式默认 maskClosable: false，需显式开启）
    const higher = api!.create({ title: '高层', zIndex: 2000, maskClosable: true })
    const lower = api!.create({ title: '低层', zIndex: 1000, maskClosable: true })
    await flushPromises()
    const masks = document.querySelectorAll('.modal-mask')
    // DOM 顺序与入栈顺序一致：高层遮罩在前
    masks[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()
    const higherEl = document.body.querySelector(`.modal-container[data-key="${higher.key}"]`) as HTMLElement
    const lowerEl = document.body.querySelector(`.modal-container[data-key="${lower.key}"]`) as HTMLElement
    // 关闭的是被点击遮罩所属的「高层」实例，而非入栈顺序最后的「低层」
    expect(higherEl.style.display).toBe('none')
    expect(lowerEl.style.display).not.toBe('none')
    wrapper.unmount()
  })
})
