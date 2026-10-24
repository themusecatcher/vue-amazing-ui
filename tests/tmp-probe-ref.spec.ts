import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'

describe('探针：动态 ref 传入 undefined / null', () => {
  it('不抛错、不告警', () => {
    const warnings: string[] = []
    const Host = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)
        const setTarget = (el: unknown): void => {
          if (el) target.value = el as HTMLElement
        }
        return () =>
          h('div', null, [
            h('span', { ref: setTarget, class: 'a' }),
            h('span', { ref: undefined, class: 'b' }),
            h('span', { ref: null, class: 'c' })
          ])
      }
    })
    const err = (e: unknown) => warnings.push(String(e))
    const wrapper = mount(Host, { global: { config: { warnHandler: err, errorHandler: err } } })
    console.log('[probe] warnings:', JSON.stringify(warnings))
    expect(wrapper.findAll('span').length).toBe(3)
  })
})
