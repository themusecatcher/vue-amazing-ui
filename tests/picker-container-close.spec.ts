import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import type { Component } from 'vue'
import { mount } from '@vue/test-utils'
import Modal from 'components/modal'
import TimePicker from 'components/time-picker'
import DatePicker from 'components/date-picker'
import ColorPicker from 'components/color-picker'
import { flushTransition } from './helpers'

/**
 * 承载层关闭时 **Picker 系列面板** 随之收起
 *
 * 三个 Picker 都跑在 `Popup` 上，经 `useContainerClose` 订阅承载层的开合状态。容器关闭只是
 * `v-show` 隐藏、不派发任何指针 / 焦点事件，若不订阅，面板会停在打开态（占着层级槽位、
 * `openChange` 也不派发），容器重开时以「仍打开」的样子出现。
 *
 * 覆盖三条关闭路径里没有指针事件的两条：Esc 关闭与程序化关闭（点 X / 遮罩会顺带触发外点关闭）。
 */
async function settle(): Promise<void> {
  for (let index = 0; index < 4; index += 1) {
    await flushTransition()
  }
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.va-popup-container').forEach((el) => el.remove())
})

/** Modal 内容容器内的浮层面板（本用例里 Modal 内只有一个浮层） */
function panel(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.modal-container .va-popup-panel')
}

/** 面板自身的内联 display：`''` 表示仍处于显示态，`none` 表示已收起 */
function panelDisplay(): string | undefined {
  return panel()?.style.display
}

interface PickerCase {
  name: string
  component: Component
}

const CASES: PickerCase[] = [
  { name: 'TimePicker', component: TimePicker },
  { name: 'DatePicker', component: DatePicker },
  { name: 'ColorPicker', component: ColorPicker }
]

describe('承载层关闭时 Picker 面板随之收起', () => {
  for (const { name, component } of CASES) {
    it(`${name}：容器程序化关闭后面板收起，重开容器不会以打开态出现`, async () => {
      const modalOpen = ref<boolean>(true)
      const Host = defineComponent({
        render: () =>
          h(
            Modal,
            {
              open: modalOpen.value,
              title: '承载层关闭',
              'onUpdate:open': (value: boolean) => {
                modalOpen.value = value
              }
            },
            { default: () => h(component, { open: true }) }
          )
      })
      wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
      await settle()

      // 前置：面板确实渲染在 Modal 内容容器内，且处于显示态
      expect(panel()).not.toBeNull()
      expect(panelDisplay()).not.toBe('none')

      // 程序化关闭容器：不产生任何指针事件（Esc 关闭同理）
      modalOpen.value = false
      await settle()
      expect(panelDisplay()).toBe('none')

      // 重开容器：面板不应仍处于打开态
      modalOpen.value = true
      await settle()
      expect(panelDisplay()).toBe('none')
    })
  }
})
