import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import Input from 'components/input/Input.vue'
import InputSearch from 'components/input-search/InputSearch.vue'
import InputNumber from 'components/input-number/InputNumber.vue'
import Textarea from 'components/textarea/Textarea.vue'
import Select from 'components/select/Select.vue'
import Cascader from 'components/cascader/Cascader.vue'
import AutoComplete from 'components/auto-complete/AutoComplete.vue'

/**
 * 焦点 API 的口径统一
 *
 * 1. `focus` / `blur` 事件一律回传原生 `FocusEvent`（含 `relatedTarget`）——宿主可据它判断焦点
 *    「从哪来 / 到哪去」，输入类组件与带面板组件共用同一份契约，也才能解释「焦点进了面板不关闭」；
 * 2. 四个基础输入组件暴露 `focus()` / `blur()` 方法，可程序化控制焦点，与 Select / DatePicker 等一致；
 * 3. 容器不占用 `Tab` 顺序（不设正 `tabindex`），输入类组件的「聚焦」只指内部原生控件。
 */

/** 组件对外暴露的方法集合（`defineExpose` 后经 `$` 内部实例读取，避免依赖 VTU 的 vm 代理实现） */
function exposedMethods(wrapper: ReturnType<typeof mount>): { focus: () => void; blur: () => void } {
  return wrapper.vm.$.exposed as { focus: () => void; blur: () => void }
}

const methodCases: [string, Component, string][] = [
  ['Input', Input, 'input.input-item'],
  ['InputSearch', InputSearch, 'input.input-search'],
  ['InputNumber', InputNumber, 'input.input-number'],
  ['Textarea', Textarea, 'textarea.textarea-item']
]

const payloadCases: [string, Component, string][] = [
  ['Input', Input, 'input.input-item'],
  ['InputSearch', InputSearch, 'input.input-search'],
  ['InputNumber', InputNumber, 'input.input-number'],
  ['Textarea', Textarea, 'textarea.textarea-item'],
  ['Select', Select, 'input.search-input'],
  ['Cascader', Cascader, 'input.search-input'],
  ['AutoComplete', AutoComplete, 'input.auto-complete-input']
]

/** 容器曾误设 `tabindex="1"`：多一个焦点停靠点，且正 tabindex 会打乱整页 Tab 顺序 */
const noExtraTabStopCases: [string, Component, string][] = [
  ['Input', Input, '.input-container'],
  ['InputSearch', InputSearch, '.input-search-container'],
  ['InputNumber', InputNumber, '.input-number-wrap']
]

/** 在内部原生控件上派发一次真实焦点事件，断言父级收到的是同一个事件对象（零加工） */
function expectNativeEventForwarded(component: Component, selector: string, eventName: 'focus' | 'blur'): void {
  const wrapper = mount(component)
  const related = document.createElement('button')
  document.body.appendChild(related)
  const field = wrapper.find(selector).element as HTMLElement
  const nativeEvent = new FocusEvent(eventName, { relatedTarget: related })

  field.dispatchEvent(nativeEvent)

  const [[payload]] = wrapper.emitted(eventName) as [[FocusEvent]]
  expect(payload).toBe(nativeEvent)
  expect(payload.relatedTarget).toBe(related)
  related.remove()
  wrapper.unmount()
}

describe('焦点事件回传原生 FocusEvent', () => {
  it.each(payloadCases)('%s 的 focus / blur 均原样透传事件与 relatedTarget', (_name, component, selector) => {
    expectNativeEventForwarded(component, selector, 'focus')
    expectNativeEventForwarded(component, selector, 'blur')
  })
})

describe('容器不占用 Tab 顺序', () => {
  it.each(noExtraTabStopCases)('%s 的容器没有 tabindex，组件内无正 tabindex', (_name, component, selector) => {
    const wrapper = mount(component)

    expect(wrapper.find(selector).attributes('tabindex')).toBeUndefined()
    // 正 tabindex 会让元素排在整页自动顺序之前；`tabindex="0"`（如搜索按钮）属正常可交互控件，不在此列
    const positiveTabindex = wrapper.findAll('[tabindex]').filter((node) => Number(node.attributes('tabindex')) > 0)
    expect(positiveTabindex).toHaveLength(0)
    wrapper.unmount()
  })
})

describe('程序化控制焦点', () => {
  it.each(methodCases)('%s 的 focus() / blur() 驱动内部原生控件', (_name, component, selector) => {
    const wrapper = mount(component, { attachTo: document.body })
    const field = wrapper.find(selector).element as HTMLElement
    const { focus, blur } = exposedMethods(wrapper)

    focus()
    expect(document.activeElement).toBe(field)

    blur()
    expect(document.activeElement).not.toBe(field)
    wrapper.unmount()
  })
})

describe('InputNumber 上下箭头不抢走输入框焦点', () => {
  it('箭头的 mousedown 被阻止默认行为，焦点仍留在内部 input', () => {
    const wrapper = mount(InputNumber, { attachTo: document.body })
    const field = wrapper.find('input.input-number').element as HTMLElement
    field.focus()

    const arrows = wrapper.findAll('.input-number-arrow')
    expect(arrows.length).toBeGreaterThan(0)
    arrows.forEach((arrow) => {
      // 箭头是不可聚焦的 span，浏览器默认会在 mousedown 时让 input 失焦；组件按事件逐个阻止
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
      arrow.element.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(true)
    })
    expect(document.activeElement).toBe(field)
    wrapper.unmount()
  })
})
