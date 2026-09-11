import { afterEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Dialog, { DialogProvider } from 'components/dialog'
import type { DialogApi } from 'components/dialog'

// Transition 真实渲染（stubs: false）时，组件若在离场动画结束前被卸载，
// Teleport 到 body 的内容会残留并污染后续用例；断言失败时同样会中断清理，故统一兜底
afterEach(() => {
  document.body.innerHTML = ''
})

/**
 * 取底部内置按钮：Button 根元素为 div.btn-wrap，取消在前、确定在后
 */
function getCancelButton(): Element | null {
  return document.body.querySelector('.dialog-footer .btn-wrap')
}
function getOkButton(): Element | null {
  const buttons = document.body.querySelectorAll('.dialog-footer .btn-wrap')
  return buttons[buttons.length - 1] ?? null
}

/**
 * Dialog 冒烟测试：验证声明式渲染、ARIA 语义与命令式内容渲染。
 * 不依赖过渡动画完成时机的断言，保证在 happy-dom 环境下稳定。
 */
describe('Dialog', () => {
  it('open 时渲染带 ARIA 语义与可访问关闭按钮的弹窗', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true, title: '测试标题' }
    })
    await wrapper.vm.$nextTick()
    const dialogEl = document.body.querySelector('[role="dialog"]') as HTMLElement
    expect(dialogEl).toBeTruthy()
    expect(dialogEl.getAttribute('aria-modal')).toBe('true')
    const labelledby = dialogEl.getAttribute('aria-labelledby')
    expect(labelledby).toBeTruthy()
    expect(document.getElementById(labelledby as string)).toBeTruthy()
    const closeBtn = dialogEl.querySelector('button.close-action')
    expect(closeBtn).toBeTruthy()
    expect(closeBtn?.getAttribute('aria-label')).toBe('关闭')
    wrapper.unmount()
  })

  it('content prop 与 title prop 可渲染命令式内容', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true, title: '标题文字', content: '正文内容' }
    })
    await wrapper.vm.$nextTick()
    const dialogEl = document.body.querySelector('[role="dialog"]') as HTMLElement
    expect(dialogEl.textContent).toContain('标题文字')
    expect(dialogEl.textContent).toContain('正文内容')
    wrapper.unmount()
  })

  it('closable: false 时不渲染关闭按钮', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true, title: '标题', closable: false }
    })
    await wrapper.vm.$nextTick()
    const dialogEl = document.body.querySelector('[role="dialog"]') as HTMLElement
    expect(dialogEl.querySelector('button.close-action')).toBeNull()
    wrapper.unmount()
  })

  it('声明式点击取消按钮应关闭并派发 cancel', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true, title: '标题' }
    })
    await wrapper.vm.$nextTick()
    getCancelButton()?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()
    const updateOpen = wrapper.emitted('update:open')
    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(updateOpen?.[updateOpen.length - 1]).toEqual([false])
    wrapper.unmount()
  })

  it('声明式点击确定按钮只派发 ok，不自动关闭', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true, title: '标题' }
    })
    await wrapper.vm.$nextTick()
    getOkButton()?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()
    expect(wrapper.emitted('ok')).toBeTruthy()
    // 关闭交由父组件的 v-model:open 决定，组件自身不回写
    expect(wrapper.emitted('update:open')).toBeUndefined()
    wrapper.unmount()
  })

  it('命令式点击确定按钮应在回调结束后自动关闭', async () => {
    // ready 由内部 Dialog 派发，Provider 通过 @ready 透出 api
    let api: DialogApi | null = null
    const wrapper = mount(DialogProvider, {
      attrs: {
        onReady: (value: DialogApi) => {
          api = value
        }
      },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    expect(api).not.toBeNull()
    api?.open({ title: '命令式', content: '点击确定后自动关闭' })
    await flushPromises()

    const container = document.body.querySelector('.dialog-container') as HTMLElement
    expect(container).toBeTruthy()
    expect(container.style.display).not.toBe('none')

    getOkButton()?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()
    expect(container.style.display).toBe('none')
    wrapper.unmount()
  })

  it('组件挂载前的点击位置也能被捕获（setup 外首次调用场景）', async () => {
    // 回归用例：createDiscreteApi 首调时组件实例尚未 mount，
    // 若 click 监听挂在 onMounted 中，这次点击会丢失、展开原点退回 50% 50%
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 60, clientY: 80 }))
    let api: DialogApi | null = null
    const wrapper = mount(DialogProvider, {
      attrs: {
        onReady: (value: DialogApi) => {
          api = value
        }
      },
      global: { stubs: { transition: false } },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    api?.open({ title: '首次点击', transformOrigin: 'mouse' })
    await flushPromises()
    const container = document.body.querySelector('.dialog-container') as HTMLElement
    const enterOrigin = container.style.transformOrigin
    // 先卸载再断言：断言失败时也不会残留 DOM 污染后续用例
    wrapper.unmount()
    // happy-dom 下 rect 恒为 0，解析出的原点即点击坐标本身
    expect(enterOrigin).toContain('60px')
    expect(enterOrigin).toContain('80px')
  })

  it('点击位置超过时效窗口后打开，退化为默认中心展开', async () => {
    // 仅点击后短窗口内打开才从鼠标位置展开，
    // 异步 / 代码方式打开时窗口已过期，不应沿用旧的点击坐标
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 60, clientY: 80 }))
    // 等待超过 100ms 时效窗口
    await new Promise((resolve) => setTimeout(resolve, 150))
    let api: DialogApi | null = null
    const wrapper = mount(DialogProvider, {
      attrs: {
        onReady: (value: DialogApi) => {
          api = value
        }
      },
      global: { stubs: { transition: false } },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    api?.open({ title: '过期窗口', transformOrigin: 'mouse' })
    await flushPromises()
    const container = document.body.querySelector('.dialog-container') as HTMLElement
    const origin = container.style.transformOrigin
    wrapper.unmount()
    expect(origin).not.toContain('60px')
    expect(origin).not.toContain('80px')
  })

  it('离场动画沿用打开时的鼠标位置，不随关闭时的点击位置改变', async () => {
    let api: DialogApi | null = null
    const wrapper = mount(DialogProvider, {
      attrs: {
        onReady: (value: DialogApi) => {
          api = value
        }
      },
      global: { stubs: { transition: false } },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()

    // 在 (100, 120) 处点击打开
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 100, clientY: 120 }))
    api?.open({ title: '离场原点', transformOrigin: 'mouse' })
    await flushPromises()
    const container = document.body.querySelector('.dialog-container') as HTMLElement
    const enterOrigin = container.style.transformOrigin
    expect(enterOrigin).toContain('100px')
    expect(enterOrigin).toContain('120px')

    // 在另一位置 (900, 700) 点击确定关闭：离场原点应仍为打开时的位置
    getOkButton()?.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 900, clientY: 700 }))
    await flushPromises()
    const leaveOrigin = container.style.transformOrigin
    wrapper.unmount()
    expect(leaveOrigin).toBe(enterOrigin)
  })

  it('打开后焦点应进入弹窗内，使 Esc 无需先按 Tab 即可生效', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true, title: '标题' },
      // 默认会 stub 掉 transition，onAfterEnter 不触发，需真实渲染
      global: { stubs: { transition: false } }
    })
    await wrapper.vm.$nextTick()
    // 等待入场动画结束（onAfterEnter 内聚焦）
    await new Promise((resolve) => setTimeout(resolve, 50))
    const dialogEl = document.body.querySelector('[role="dialog"]') as HTMLElement
    expect(dialogEl.getAttribute('tabindex')).toBe('-1')
    expect(document.activeElement).toBe(dialogEl)
    wrapper.unmount()
  })

  it('使用 #title 插槽时仍应关联 aria-labelledby', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true },
      slots: { title: '<span>插槽标题</span>' }
    })
    await wrapper.vm.$nextTick()
    const dialogEl = document.body.querySelector('[role="dialog"]') as HTMLElement
    const labelledby = dialogEl.getAttribute('aria-labelledby')
    expect(labelledby).toBeTruthy()
    expect(document.getElementById(labelledby as string)?.textContent).toContain('插槽标题')
    wrapper.unmount()
  })

  it('无标题且不拖拽时不渲染空的 header', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true, content: '正文内容' }
    })
    await wrapper.vm.$nextTick()
    const dialogEl = document.body.querySelector('[role="dialog"]') as HTMLElement
    expect(dialogEl.querySelector('.dialog-header')).toBeNull()
    wrapper.unmount()
  })

  it('同实例多弹窗时，Esc 只关闭事件来源的那个弹窗', async () => {
    let api: DialogApi | null = null
    const wrapper = mount(DialogProvider, {
      attrs: {
        onReady: (value: DialogApi) => {
          api = value
        }
      },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    const alive = api!.open({ title: '保持打开' })
    const kept = api!.open({ title: '关闭后保留', destroyOnClose: false })
    await flushPromises()
    // 关闭保留实例：它仍滞留在栈中，但不影响其它弹窗各自响应 Esc
    kept.destroy()
    await flushPromises()
    const aliveEl = document.body.querySelector(`.dialog-container[data-key="${alive.key}"]`) as HTMLElement
    expect(aliveEl.style.display).not.toBe('none')

    // 从 alive 的弹窗主体派发（等价于焦点在其中）
    const aliveBody = aliveEl.querySelector('.dialog-body-wrap') as HTMLElement
    aliveBody.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flushPromises()
    expect(aliveEl.style.display).toBe('none')
    wrapper.unmount()
  })

  it('焦点不在弹窗内时 Esc 不响应（元素级监听的既有边界）', async () => {
    const wrapper = mount(Dialog, { props: { open: true, title: '标题' } })
    await wrapper.vm.$nextTick()
    const el = document.body.querySelector('.dialog-container') as HTMLElement
    expect(el.style.display).not.toBe('none')

    // 焦点在弹窗外时 keydown 不经过弹窗主体，Esc 不响应
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flushPromises()
    expect(el.style.display).not.toBe('none')
    wrapper.unmount()
  })

  it('弹窗内组件可通过 stopPropagation 优先消费 Esc', async () => {
    let api: DialogApi | null = null
    const wrapper = mount(DialogProvider, {
      attrs: {
        onReady: (value: DialogApi) => {
          api = value
        }
      },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    const handle = api!.open({ title: 'Esc 被内部消费' })
    await flushPromises()
    const el = document.body.querySelector(`.dialog-container[data-key="${handle.key}"]`) as HTMLElement
    // 模拟 Select 之类打开下拉的组件：Esc 应先关下拉而不是关弹窗
    const inner = el.querySelector('.dialog-content') as HTMLElement
    inner.addEventListener('keydown', (e: KeyboardEvent) => e.stopPropagation())
    inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flushPromises()
    expect(el.style.display).not.toBe('none')
    wrapper.unmount()
  })

  it('点击遮罩应关闭该遮罩所属的实例，而非入栈顺序的最后一个', async () => {
    let api: DialogApi | null = null
    const wrapper = mount(DialogProvider, {
      attrs: {
        onReady: (value: DialogApi) => {
          api = value
        }
      },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    // 先开的实例 zIndex 更高，其遮罩位于最上层
    const higher = api!.open({ title: '高层', zIndex: 2000 })
    api!.open({ title: '低层', zIndex: 1000 })
    await flushPromises()
    // DOM 顺序与入栈顺序一致：高层遮罩在前
    const higherMask = document.querySelectorAll('.dialog-mask')[0]
    higherMask.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()
    const higherEl = document.body.querySelector(`.dialog-container[data-key="${higher.key}"]`) as HTMLElement
    expect(higherEl.style.display).toBe('none')
    wrapper.unmount()
  })

  it('Esc 只关闭焦点所在的弹窗，其他实例的弹窗保持打开', async () => {
    let apiA: DialogApi | null = null
    let apiB: DialogApi | null = null
    const wrapperA = mount(DialogProvider, {
      attrs: {
        onReady: (value: DialogApi) => {
          apiA = value
        }
      },
      attachTo: document.body
    })
    const wrapperB = mount(DialogProvider, {
      attrs: {
        onReady: (value: DialogApi) => {
          apiB = value
        }
      },
      attachTo: document.body
    })
    await flushPromises()
    const handleA = apiA!.open({ title: 'A' })
    await flushPromises()
    const handleB = apiB!.open({ title: 'B' })
    await flushPromises()
    const elA = document.body.querySelector(`.dialog-container[data-key="${handleA.key}"]`) as HTMLElement
    const elB = document.body.querySelector(`.dialog-container[data-key="${handleB.key}"]`) as HTMLElement
    expect(elA.style.display).not.toBe('none')
    expect(elB.style.display).not.toBe('none')

    // keydown 从 B 的弹窗主体派发（等价于焦点在 B 内）：只有 B 的监听会收到
    const bodyB = elB.querySelector('.dialog-body-wrap') as HTMLElement
    bodyB.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flushPromises()
    expect(elB.style.display).toBe('none')
    expect(elA.style.display).not.toBe('none')
    wrapperA.unmount()
    wrapperB.unmount()
  })

  it('mask: false 时遮罩隐藏（不拦截背景交互）', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true, title: '标题', mask: false }
    })
    await wrapper.vm.$nextTick()
    const mask = document.body.querySelector('.dialog-mask') as HTMLElement
    expect(mask).toBeTruthy()
    // v-show 保留 DOM 但隐藏，遮罩不接收点击、背景可交互
    expect(mask.style.display).toBe('none')
    wrapper.unmount()
  })

  it('maskClass / containerClass / wrapClass 应用到对应节点', async () => {
    const wrapper = mount(Dialog, {
      props: {
        open: true,
        title: '标题',
        maskClass: 'my-mask',
        containerClass: 'my-container',
        wrapClass: 'my-wrap'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('.dialog-mask')?.classList.contains('my-mask')).toBe(true)
    expect(document.body.querySelector('.dialog-container')?.classList.contains('my-container')).toBe(true)
    expect(document.body.querySelector('.dialog-wrap')?.classList.contains('my-wrap')).toBe(true)
    wrapper.unmount()
  })

  it('autoFocusButton: ok 时打开后焦点落在确定按钮', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true, title: '标题', autoFocusButton: 'ok' },
      global: { stubs: { transition: false } }
    })
    await wrapper.vm.$nextTick()
    // 等待入场动画结束（onAfterEnter 内聚焦）
    await new Promise((resolve) => setTimeout(resolve, 50))
    const okBtn = getOkButton()
    expect(okBtn).toBeTruthy()
    expect(document.activeElement).toBe(okBtn)
    wrapper.unmount()
  })

  it('默认懒渲染：open 为 false 时不渲染弹窗内容', async () => {
    const wrapper = mount(Dialog, {
      props: { open: false, title: '标题', content: '正文内容' }
    })
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    wrapper.unmount()
  })

  it('renderBeforeOpen: true 时内容随组件挂载即完成渲染（不可见但 DOM 存在）', async () => {
    const wrapper = mount(Dialog, {
      props: { open: false, renderBeforeOpen: true, title: '标题', content: '预渲染内容' }
    })
    await wrapper.vm.$nextTick()
    const dialogEl = document.body.querySelector('[role="dialog"]') as HTMLElement
    expect(dialogEl).toBeTruthy()
    expect(dialogEl.textContent).toContain('预渲染内容')
    // 关闭态经 v-show 隐藏：不可见、不接收交互，但不影响已渲染的内容
    const container = document.body.querySelector('.dialog-container') as HTMLElement
    expect(container.style.display).toBe('none')
    wrapper.unmount()
  })

  it('renderBeforeOpen: true 且 destroyOnClose: true 时首次打开前仍完成渲染', async () => {
    const wrapper = mount(Dialog, {
      props: { open: false, renderBeforeOpen: true, destroyOnClose: true, title: '标题', content: '预渲染内容' }
    })
    await wrapper.vm.$nextTick()
    const dialogEl = document.body.querySelector('[role="dialog"]') as HTMLElement
    expect(dialogEl).toBeTruthy()
    expect(dialogEl.textContent).toContain('预渲染内容')
    wrapper.unmount()
  })

  it('预渲染实例在 open 置为 true 后应正常显示', async () => {
    const wrapper = mount(Dialog, {
      props: { open: false, renderBeforeOpen: true, title: '标题', content: '预渲染内容' }
    })
    await wrapper.vm.$nextTick()
    await wrapper.setProps({ open: true })
    await wrapper.vm.$nextTick()
    const container = document.body.querySelector('.dialog-container') as HTMLElement
    expect(container).toBeTruthy()
    expect(container.style.display).not.toBe('none')
    wrapper.unmount()
  })
})
