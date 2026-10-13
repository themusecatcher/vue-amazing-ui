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
 */
const OFFSET_WIDTH = 100

function mountEllipsis(props: Record<string, unknown>): VueWrapper {
  return mount(Ellipsis, {
    props,
    slots: { default: () => 'Some long text used for ellipsis measurement' },
    attachTo: document.body
  })
}
/** 桩定文本容器宽度，并借 `maxWidth` 变更命中测量用的 `watch` */
async function remeasure(wrapper: VueWrapper): Promise<void> {
  const container = wrapper.find('.ellipsis-container').element
  Object.defineProperty(container, 'offsetWidth', { value: OFFSET_WIDTH, configurable: true })
  await wrapper.setProps({ maxWidth: OFFSET_WIDTH })
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

    await wrapper.setProps({ tooltipMaxWidth: 320 })
    await nextTick()
    expect(tooltipMaxWidth(wrapper)).toBe('320px')
    wrapper.unmount()
  })
})
