import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import Ellipsis from 'components/ellipsis/Ellipsis.vue'
import Tooltip from 'components/tooltip/Tooltip.vue'

/**
 * Ellipsis `tooltipMaxWidth` 回归守护
 *
 * 背景：`tooltipMaxWidth` 此前传入后不生效 —— 测量逻辑固定以「文本宽度 + 24」覆盖该值，
 * 且该属性未纳入触发测量的 `watch` 依赖，运行期修改也无效。
 *
 * 尺寸依赖说明：测量读取 `offsetWidth`，happy-dom 下恒为 0，故桩定该值后触发测量，
 * 断言最终透传给 `Tooltip` 的 `maxWidth`（`computedTooltipMaxWidth` 的唯一消费方）。
 *
 * 前提变更：Ellipsis 已改为「未溢出不挂载 Tooltip」，故桩定尺寸时需同时构造溢出，
 * 否则实例不存在、无从读取透传值（断言目标本身不变）。
 */
const OFFSET_WIDTH = 100

function mountEllipsis(props: Record<string, unknown>): VueWrapper {
  return mount(Ellipsis, {
    props,
    slots: { default: () => 'Some long text used for ellipsis measurement' },
    attachTo: document.body
  })
}
/** 桩定文本容器尺寸并构造溢出（未溢出时不会挂载 Tooltip，断言无从读取透传值） */
function stubSizes(wrapper: VueWrapper): void {
  const container = wrapper.find('.ellipsis-container').element as HTMLElement
  Object.defineProperty(container, 'offsetWidth', { value: OFFSET_WIDTH, configurable: true })
  Object.defineProperty(container, 'scrollWidth', { value: OFFSET_WIDTH * 2, configurable: true })
  Object.defineProperty(container, 'clientWidth', { value: OFFSET_WIDTH, configurable: true })
}
/** 桩定尺寸后借 `maxWidth` 变更命中测量用的 `watch` */
async function remeasure(wrapper: VueWrapper): Promise<void> {
  stubSizes(wrapper)
  await wrapper.setProps({ maxWidth: OFFSET_WIDTH })
  await nextTick()
  // 溢出判定 → 挂载 Tooltip 发生在本轮更新，再等一 tick 才能取到实例
  await nextTick()
}
/** 读取 Ellipsis 传给 Tooltip 的 `maxWidth` */
function tooltipMaxWidth(wrapper: VueWrapper): string | number {
  return wrapper.findComponent(Tooltip).props('maxWidth') as string | number
}

describe('Ellipsis 的 tooltipMaxWidth', () => {
  it('未传入时跟随文本宽度（+ 24 预留内边距）', async () => {
    const wrapper = mountEllipsis({})
    await remeasure(wrapper)
    expect(tooltipMaxWidth(wrapper)).toBe(`${OFFSET_WIDTH + 24}px`)
    wrapper.unmount()
  })

  it('传入数字时以其为准', async () => {
    const wrapper = mountEllipsis({ tooltipMaxWidth: 240 })
    await remeasure(wrapper)
    expect(tooltipMaxWidth(wrapper)).toBe('240px')
    wrapper.unmount()
  })

  it('传入字符串时原样生效', async () => {
    const wrapper = mountEllipsis({ tooltipMaxWidth: '300px' })
    await remeasure(wrapper)
    expect(tooltipMaxWidth(wrapper)).toBe('300px')
    wrapper.unmount()
  })

  it('运行期修改立即生效，无需等待尺寸变化', async () => {
    const wrapper = mountEllipsis({ tooltipMaxWidth: 240 })
    await remeasure(wrapper)
    expect(tooltipMaxWidth(wrapper)).toBe('240px')

    // 首次挂载 Tooltip 时包裹层切换，`.ellipsis-container` 为新元素，需重新桩定（真实浏览器无此问题）
    stubSizes(wrapper)
    await wrapper.setProps({ tooltipMaxWidth: 320 })
    await nextTick()
    expect(tooltipMaxWidth(wrapper)).toBe('320px')
    wrapper.unmount()
  })
})
