import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import TextScroll from 'components/text-scroll'
import Tooltip from 'components/tooltip'

/**
 * TextScroll ellipsis 模式回归守护
 *
 * 背景：ellipsis 模式下，链接类名（`href-item`）与文字样式此前经 `content-class` / `content-style`
 * 下发到 Tooltip 的触发包裹层，该通道在「Ellipsis 未挂载浮层」时失效（类名丢失、样式沦为无效 DOM 属性）；
 * 现统一走 `class` / `style`，而 Ellipsis 的浮层改为锚点模式（不包裹文本容器），
 * 故类名与样式在任何状态下都落在 `.ellipsis-container` 上，不随提示显隐 / 溢出状态迁移。
 */
const mountOptions = {
  attachTo: document.body,
  global: { stubs: { transition: false } }
}
let wrapper: VueWrapper | null = null
afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

const items = [{ title: '很短的一条文字', href: 'https://example.com' }]
const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))
async function flush(): Promise<void> {
  await nextTick()
  await tick()
  await nextTick()
}
/** 构造「已溢出」：水平模式下两份滚动分组各有一个 Ellipsis，逐一套桩 */
function stubOverflow(w: VueWrapper): void {
  w.findAll('.ellipsis-container').forEach((el) => {
    const element = el.element as HTMLElement
    Object.defineProperty(element, 'scrollWidth', { value: 200, configurable: true })
    Object.defineProperty(element, 'clientWidth', { value: 100, configurable: true })
    Object.defineProperty(element, 'offsetWidth', { value: 100, configurable: true })
  })
}

describe('TextScroll：ellipsis 模式的类名与样式继承', () => {
  it('未溢出时链接类名与文字样式照常生效', async () => {
    wrapper = mount(TextScroll, { ...mountOptions, props: { items, ellipsis: true, itemStyle: { color: 'red' } } })
    await flush()
    const container = wrapper.find('.ellipsis-container')
    expect(container.classes()).toContain('href-item')
    expect(container.attributes('style')).toContain('color: red')
  })

  it('溢出并挂载提示后，类名与样式仍留在文本容器（不迁移、不新增包裹层）', async () => {
    wrapper = mount(TextScroll, { ...mountOptions, props: { items, ellipsis: true, itemStyle: { color: 'red' } } })
    await flush()
    stubOverflow(wrapper)
    await wrapper.find('.ellipsis-container').trigger('pointerenter')
    await flush()

    expect(wrapper.findAllComponents(Tooltip).length).toBeGreaterThan(0)
    expect(wrapper.find('.tooltip-wrap').exists()).toBe(false)
    const container = wrapper.find('.ellipsis-container')
    expect(container.classes()).toContain('href-item')
    expect(container.attributes('style')).toContain('color: red')
  })
})
