import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import Textarea from 'components/textarea/Textarea.vue'
import InputNumber from 'components/input-number/InputNumber.vue'

/**
 * 文本域 / 数字输入框的失焦事件契约
 *
 * 两者都把原生控件（`textarea` / `input`）包在容器 div 里，而 `blur` 不冒泡：未声明该事件时，
 * 使用者写的 `@blur` 会落到根节点上并静默失效。这里固化两点：
 * 1. 内部控件失焦必须原样上报一次；
 * 2. 原生事件对象要原样透传（含 `relatedTarget`），宿主才能判断「失焦到哪」。
 */
async function verifyBlurForwarding(component: Component, selector: string): Promise<void> {
  const wrapper = mount(component)

  await wrapper.find(selector).trigger('blur')
  expect(wrapper.emitted('blur')).toHaveLength(1)

  const next = document.createElement('button')
  document.body.appendChild(next)
  const field = wrapper.find(selector).element as HTMLElement
  const nativeEvent = new FocusEvent('blur', { relatedTarget: next })
  field.dispatchEvent(nativeEvent)

  const events = wrapper.emitted('blur') as [FocusEvent][]
  expect(events[1][0]).toBe(nativeEvent)
  expect(events[1][0].relatedTarget).toBe(next)
  next.remove()
  wrapper.unmount()
}

describe('Textarea 失焦事件', () => {
  it('内部 textarea 失焦时转发原生事件与 relatedTarget', async () => {
    await verifyBlurForwarding(Textarea, 'textarea')
  })
})

describe('InputNumber 失焦事件', () => {
  it('内部 input 失焦时转发原生事件与 relatedTarget', async () => {
    await verifyBlurForwarding(InputNumber, 'input')
  })
})
