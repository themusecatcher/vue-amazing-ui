import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import Tooltip from 'components/tooltip'

/**
 * Tooltip 锚点模式与展示前动态判定守护
 *
 * 契约（供 Ellipsis 等「已经有元素」的消费者复用）：
 * - 传入 `anchor` 后不渲染 `.tooltip-wrap` / `.tooltip-content` 两层包裹，触发监听、`tabindex` 与
 *   `aria-describedby` 全部写到锚点元素上，故使用方 DOM 结构不随提示显隐变化；
 * - `getDisabled` 在每次展示前求值（`onShow` 唯一入口），返回 true 时不展示、不产生可见面板；
 * - 包裹层模式（不传 `anchor`）行为保持不变，`$attrs` 仍落 `.tooltip-wrap`。
 *
 * 注：用例统一用 `to: false` 就地渲染浮层，按 `.tooltip-card-container` 收敛查询；
 * 离开过渡在无 CSS 环境由「双 rAF + 事件等待」收尾，故用 `waitHidden` 轮询落定。
 */
const mountOptions = {
  attachTo: document.body,
  global: { stubs: { transition: false } }
}
const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))
async function flush(): Promise<void> {
  await nextTick()
  await tick()
  await nextTick()
}
async function waitHidden(): Promise<void> {
  for (let i = 0; i < 20; i += 1) {
    const panel = panelEl()
    if (!panel || panel.style.display === 'none') return
    panel.dispatchEvent(new Event('animationend'))
    await new Promise((resolve) => setTimeout(resolve, 10))
    await nextTick()
  }
}
function panelEl(): HTMLElement | null {
  return document.body.querySelector('.tooltip-card-container')
}
/** 已显示（存在且未 display:none） */
function panelVisible(): boolean {
  const panel = panelEl()
  return Boolean(panel && panel.style.display !== 'none')
}

let wrapper: VueWrapper | null = null
afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

/** 宿主：提供一个外部锚点，供 Tooltip 以锚点模式使用 */
function mountWithAnchor(options: {
  tooltipProps?: Record<string, unknown>
  getDisabled?: () => boolean
  anchorAttrs?: Record<string, string>
}): { wrapper: VueWrapper; anchor: () => HTMLElement } {
  const Host = defineComponent({
    components: { Tooltip },
    setup() {
      const anchorRef = ref<HTMLElement | null>(null)
      // 模板始终引用这三项：缺省时同样要落到实例上，否则渲染期会报「属性未定义」告警
      return {
        anchorRef,
        tooltipProps: options.tooltipProps ?? {},
        getDisabled: options.getDisabled,
        anchorAttrs: options.anchorAttrs ?? {}
      }
    },
    template: `
      <div>
        <div ref="anchorRef" class="anchor-node" v-bind="anchorAttrs">触发文本</div>
        <Tooltip
          :anchor="anchorRef"
          :get-disabled="getDisabled"
          :to="false"
          :show-delay="0"
          :hide-delay="0"
          v-bind="tooltipProps"
        >
          <template #tooltip>提示内容</template>
        </Tooltip>
      </div>
    `
  })
  wrapper = mount(Host, mountOptions) as VueWrapper
  return {
    wrapper,
    anchor: () => wrapper!.find('.anchor-node').element as HTMLElement
  }
}

describe('Tooltip 锚点模式', () => {
  it('不渲染触发包裹层，锚点元素保持原样', async () => {
    const host = mountWithAnchor({})
    await flush()
    expect(host.wrapper.find('.tooltip-wrap').exists()).toBe(false)
    expect(host.wrapper.find('.tooltip-content').exists()).toBe(false)
    expect(host.anchor().className).toBe('anchor-node')
    expect(host.anchor().textContent).toBe('触发文本')
  })

  it('hover 锚点显示、离开隐藏', async () => {
    const host = mountWithAnchor({})
    await flush()
    host.anchor().dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(panelVisible()).toBe(true)

    host.anchor().dispatchEvent(new MouseEvent('mouseleave'))
    await flush()
    await waitHidden()
    expect(panelVisible()).toBe(false)
  })

  it('getDisabled 返回 true 时不展示（展示前求值，不产生可见面板）', async () => {
    let disabled = true
    const host = mountWithAnchor({ getDisabled: () => disabled })
    await flush()
    host.anchor().dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    await waitHidden()
    expect(panelVisible()).toBe(false)

    disabled = false
    host.anchor().dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(panelVisible()).toBe(true)
  })

  it("trigger: 'focus' 时给锚点补 tabindex，卸载后还原", async () => {
    const host = mountWithAnchor({ tooltipProps: { trigger: 'focus' } })
    await flush()
    const anchorEl = host.anchor()
    expect(anchorEl.getAttribute('tabindex')).toBe('0')

    host.wrapper.unmount()
    wrapper = null
    // 卸载时须把本组件补上的属性还原（锚点元素由使用方持有，不随组件销毁）
    expect(anchorEl.hasAttribute('tabindex')).toBe(false)
  })

  it('锚点已有 tabindex 时不覆盖', async () => {
    const host = mountWithAnchor({
      tooltipProps: { trigger: 'focus' },
      anchorAttrs: { tabindex: '-1' }
    })
    await flush()
    expect(host.anchor().getAttribute('tabindex')).toBe('-1')
  })

  it('提示可见时锚点关联 aria-describedby，隐藏后移除', async () => {
    const host = mountWithAnchor({})
    await flush()
    expect(host.anchor().hasAttribute('aria-describedby')).toBe(false)

    host.anchor().dispatchEvent(new MouseEvent('mouseenter'))
    await flush()
    expect(host.anchor().getAttribute('aria-describedby')).toMatch(/^va-tooltip-\d+$/)

    host.anchor().dispatchEvent(new MouseEvent('mouseleave'))
    await flush()
    await waitHidden()
    expect(host.anchor().hasAttribute('aria-describedby')).toBe(false)
  })
})

describe('Tooltip 包裹层模式（回归）', () => {
  it('$attrs 仍落 .tooltip-wrap，结构与既有口径一致', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      attrs: { class: 'ext-cls', 'data-mark': 'a' },
      slots: { default: () => '触发文本', tooltip: () => '提示内容' }
    }) as VueWrapper
    await flush()
    const wrap = wrapper.find('.tooltip-wrap')
    expect(wrap.exists()).toBe(true)
    expect(wrap.classes()).toContain('ext-cls')
    expect(wrap.attributes('data-mark')).toBe('a')
    expect(wrapper.find('.tooltip-content').exists()).toBe(true)
  })
})
