import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import type { Component } from 'vue'
import { mount } from '@vue/test-utils'
import DatePicker from 'components/date-picker'
import TimePicker from 'components/time-picker'
import { flushTransition } from './helpers'

/**
 * 禁用即收起（两个选择器共用 `usePickerShell` 的同一份实现）
 *
 * 面板可见性是 `open && !disabled`，但**状态**必须跟着收起：否则解除禁用时面板会自己弹开、
 * `openChange` 从未派发（父侧的「是否展开」与界面不符），触发器还会残留聚焦描边。
 */
async function settle(): Promise<void> {
  for (let index = 0; index < 3; index += 1) {
    await flushTransition()
  }
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

/** 面板自身的内联 display：`''` 表示仍处于显示态，`none` 表示已收起 */
function panelDisplay(): string | undefined {
  return document.querySelector<HTMLElement>('.va-popup-panel')?.style.display
}

const CASES: Array<{ name: string; component: Component; panelClass: string }> = [
  { name: 'DatePicker', component: DatePicker, panelClass: '.datepicker-panel-container' },
  { name: 'TimePicker', component: TimePicker, panelClass: '.timepicker-panel-container' }
]

describe('禁用即收起', () => {
  for (const { name, component, panelClass } of CASES) {
    it(`${name}：展开中切为禁用会收起并派发 openChange，解除禁用不再自行展开`, async () => {
      const disabled = ref(false)
      const pickerOpen = ref(true)
      const openChanges: boolean[] = []
      const Host = defineComponent({
        render: () =>
          h(component, {
            open: pickerOpen.value,
            disabled: disabled.value,
            'onUpdate:open': (value: boolean) => {
              pickerOpen.value = value
            },
            onOpenChange: (value: boolean) => {
              openChanges.push(value)
            }
          })
      })
      wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
      await settle()

      expect(document.querySelector(panelClass)).not.toBeNull()
      expect(panelDisplay()).not.toBe('none')

      // 切为禁用：面板收起、状态同步（受控 open 被回写为 false）、openChange 派发 false
      disabled.value = true
      await settle()
      expect(panelDisplay()).toBe('none')
      expect(openChanges).toEqual([false])
      expect(document.querySelector('.picker-trigger-focused')).toBeNull()

      // 解除禁用：面板不会自行展开（状态已收起，不是仅被 `!disabled` 遮蔽）
      disabled.value = false
      await settle()
      expect(panelDisplay()).toBe('none')
    })

    it(`${name}：非受控下同样收起，且不影响正常的开合`, async () => {
      wrapper = mount(component, {
        attachTo: document.body,
        global: { stubs: { transition: false } }
      })
      await settle()

      // 点触发器展开
      ;(document.querySelector('.picker-trigger') as HTMLElement).dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      )
      await settle()
      expect(panelDisplay()).not.toBe('none')

      // 禁用 → 收起；解除禁用后保持收起
      await wrapper.setProps({ disabled: true })
      await settle()
      expect(panelDisplay()).toBe('none')
      expect(wrapper.emitted('update:open')?.pop()).toEqual([false])

      await wrapper.setProps({ disabled: false })
      await settle()
      expect(panelDisplay()).toBe('none')

      // 解除禁用后仍可正常再次展开
      ;(document.querySelector('.picker-trigger') as HTMLElement).dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      )
      await settle()
      expect(panelDisplay()).not.toBe('none')
    })
  }
})
