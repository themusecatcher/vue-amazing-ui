import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import InputSearch from 'components/input-search/InputSearch.vue'

/**
 * 搜索框失焦事件的契约回归
 *
 * `blur` 必须由内部原生 `input` 转发：该事件不冒泡，挂在组件根节点（`.input-search-wrap`）上的监听收不到，
 * 所以组件不声明 emits 时，使用者写的 `@blur` 会静默失效。这里固化两点：
 * 1. 内部 input 失焦必须原样上报一次；
 * 2. 原生事件对象要原样透传（含 `relatedTarget`），宿主才能判断「失焦到哪」。
 */

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

describe('InputSearch 失焦事件', () => {
  it('内部 input 失焦时向父级上报一次', async () => {
    wrapper = mount(InputSearch)

    await wrapper.find('input').trigger('blur')

    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('原样透传原生 FocusEvent 及其 relatedTarget', () => {
    wrapper = mount(InputSearch)
    const next = document.createElement('button')
    document.body.appendChild(next)
    const field = wrapper.find('input').element as HTMLInputElement
    const nativeEvent = new FocusEvent('blur', { relatedTarget: next })

    field.dispatchEvent(nativeEvent)

    const [[payload]] = wrapper.emitted('blur') as [[FocusEvent]]
    expect(payload).toBe(nativeEvent)
    expect(payload.relatedTarget).toBe(next)
    next.remove()
  })
})
