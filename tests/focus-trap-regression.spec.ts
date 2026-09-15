import { describe, it, expect, vi, afterEach } from 'vitest'
import { createTextVNode, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import Modal from 'components/modal'
import Dialog from 'components/dialog'

/**
 * Tab 焦点锁定回归守护（Modal / Dialog）
 *
 * 本轮把 Modal 与 Dialog 各自实现的 `FOCUSABLE_SELECTOR` / `getFocusableEls` / `trapTab`
 * 收敛为共享的 `trapTabFocus(e, container, fallbackEl)`，两处差异只剩兜底元素
 * （Modal → `.modal-wrap`，Dialog → `.dialog-wrap`）。
 *
 * 焦点锁定是纯键盘可访问性保障：一旦接线丢失，Tab 会直接跑到背景页面，
 * 但不会有任何类型错误或视觉提示，因此必须由测试兜住。
 */

/** 与实现保持一致的可聚焦元素选择器，用于在测试内独立复算期望序列 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

function focusablesIn(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.getClientRects().length > 0
  )
}

function tabFrom(host: HTMLElement, shiftKey = false): KeyboardEvent {
  const e = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, cancelable: true, bubbles: true })
  host.dispatchEvent(e)
  return e
}

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

const cases = [
  {
    name: 'Modal',
    mountOpen: (slots: Record<string, unknown>, props: Record<string, unknown> = {}) =>
      mount(Modal, { props: { open: true, title: '焦点', ...props }, slots, attachTo: document.body }),
    containerSelector: '.modal-container',
    bodySelector: '.modal-body-wrap',
    wrapSelector: '.modal-wrap'
  },
  {
    name: 'Dialog',
    mountOpen: (slots: Record<string, unknown>, props: Record<string, unknown> = {}) =>
      mount(Dialog, { props: { open: true, title: '焦点', ...props }, slots, attachTo: document.body }),
    containerSelector: '.dialog-container',
    bodySelector: '.dialog-body-wrap',
    wrapSelector: '.dialog-wrap'
  }
] as const

describe('Tab 焦点锁定 - 焦点在弹窗内循环', () => {
  cases.forEach(({ name, mountOpen, containerSelector, bodySelector, wrapSelector }) => {
    it(`${name}：Tab 应从当前元素前进到下一个，且阻止默认行为`, async () => {
      const wrapper = mountOpen({
        default: () => [h('button', { class: 'f-1' }, '1'), h('button', { class: 'f-2' }, '2')]
      })
      await flushPromises()

      const container = document.querySelector(containerSelector) as HTMLElement
      const body = container.querySelector(bodySelector) as HTMLElement
      const focusables = focusablesIn(container)
      expect(focusables.length).toBeGreaterThanOrEqual(2)

      focusables[0].focus()
      const e = tabFrom(body)
      expect(e.defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(focusables[1])

      wrapper.unmount()
    })

    it(`${name}：末位元素按 Tab 应回绕到首位，焦点不逃逸到背景页面`, async () => {
      const wrapper = mountOpen({
        default: () => [h('button', { class: 'f-1' }, '1'), h('button', { class: 'f-2' }, '2')]
      })
      await flushPromises()

      const container = document.querySelector(containerSelector) as HTMLElement
      const body = container.querySelector(bodySelector) as HTMLElement
      const focusables = focusablesIn(container)
      const last = focusables[focusables.length - 1]

      last.focus()
      tabFrom(body)
      expect(document.activeElement).toBe(focusables[0])

      wrapper.unmount()
    })

    it(`${name}：首位元素按 Shift + Tab 应回绕到末位`, async () => {
      const wrapper = mountOpen({
        default: () => [h('button', { class: 'f-1' }, '1'), h('button', { class: 'f-2' }, '2')]
      })
      await flushPromises()

      const container = document.querySelector(containerSelector) as HTMLElement
      const body = container.querySelector(bodySelector) as HTMLElement
      const focusables = focusablesIn(container)

      focusables[0].focus()
      tabFrom(body, true)
      expect(document.activeElement).toBe(focusables[focusables.length - 1])

      wrapper.unmount()
    })

    it(`${name}：焦点已在弹窗外时按 Tab，应把焦点收回弹窗内`, async () => {
      const wrapper = mountOpen({
        default: () => [h('button', { class: 'f-1' }, '1'), h('button', { class: 'f-2' }, '2')]
      })
      await flushPromises()

      const container = document.querySelector(containerSelector) as HTMLElement
      const body = container.querySelector(bodySelector) as HTMLElement
      const focusables = focusablesIn(container)

      const outside = document.createElement('button')
      document.body.appendChild(outside)
      outside.focus()
      expect(document.activeElement).toBe(outside)

      tabFrom(body)
      expect(document.activeElement).toBe(focusables[0])

      // 反向同理：Shift + Tab 收回末位
      outside.focus()
      tabFrom(body, true)
      expect(document.activeElement).toBe(focusables[focusables.length - 1])

      wrapper.unmount()
    })

    it(`${name}：容器内无可聚焦元素时，焦点应落到外层容器而非背景页面`, async () => {
      const wrapper = mountOpen(
        // 纯文本内容 + 关闭内置按钮区与关闭按钮：容器内不存在任何可聚焦元素
        { default: () => [createTextVNode('仅文本内容')] },
        { footer: false, closable: false }
      )
      await flushPromises()

      const container = document.querySelector(containerSelector) as HTMLElement
      const body = container.querySelector(bodySelector) as HTMLElement
      expect(focusablesIn(container)).toHaveLength(0)

      const wrap = document.querySelector(wrapSelector) as HTMLElement
      const focusSpy = vi.spyOn(wrap, 'focus')

      const e = tabFrom(body)
      expect(e.defaultPrevented).toBe(true)
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })

      wrapper.unmount()
    })

    it(`${name}：Escape 仍走原有分支，不受 Tab 锁定影响`, async () => {
      const wrapper = mountOpen({
        default: () => [h('button', { class: 'f-1' }, '1')]
      })
      await flushPromises()

      const container = document.querySelector(containerSelector) as HTMLElement
      const body = container.querySelector(bodySelector) as HTMLElement

      body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await flushPromises()
      // 声明式 open 为受控 prop：Esc 只派发事件，不擅自改变受控状态
      expect(wrapper.emitted('cancel')).toBeTruthy()

      wrapper.unmount()
    })
  })
})
