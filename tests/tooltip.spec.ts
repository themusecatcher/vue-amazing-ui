import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Tooltip from 'components/tooltip'

/**
 * Tooltip 显隐语义 / 无障碍 / 事件源过滤 回归守护
 *
 * 三处断言都对应「容易被后续重构无声改坏、且已有消费方依赖」的行为：
 * - `animationend` 由 `Ellipsis` 消费（用于收起后复位），不能被子节点嵌套动画误触发；
 * - `role` / `aria-describedby` 是无障碍读屏链路；
 * - 受控 `show` 必须立即生效，不能套用 hover 的 `showDelay`。
 *
 * 注意：@vue/test-utils 默认会把 `Transition` 替换为 `<transition-stub>`，
 * 导致挂在 `<Transition>` 上的监听落到 stub 而非真实子元素（真实环境 Vue 会透传到子元素）。
 * 因此必须显式关闭该 stub，否则 `animationend` 相关断言会假性失败。
 */
const mountOptions = {
  attachTo: document.body,
  global: {
    stubs: {
      transition: false
    }
  }
}

const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

/** 等待「定时器（delay 0）→ 渲染」两拍 */
async function flush(): Promise<void> {
  await nextTick()
  await tick()
  await nextTick()
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
})

describe('Tooltip 行为回归', () => {
  it('受控 show 应立即显示，不套用 hover 的 showDelay', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', show: true, showDelay: 5000 }
    })
    await flush()

    // 若误走 showDelay，5s 内不会有任何显示与事件
    expect(wrapper.emitted('openChange')).toEqual([[true]])
    expect(document.querySelector('.tooltip-card-container')).not.toBeNull()
  })

  it('卡片带 role="tooltip"，且与触发器经 aria-describedby 关联', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', show: true }
    })
    await flush()

    const card = document.querySelector('.tooltip-card') as HTMLElement | null
    const trigger = wrapper.find('.tooltip-content').element
    expect(card).not.toBeNull()
    expect(card?.getAttribute('role')).toBe('tooltip')

    const cardId = card?.getAttribute('id')
    expect(cardId).toBeTruthy()
    expect(trigger.getAttribute('aria-describedby')).toBe(cardId)
  })

  it('仅响应卡片容器自身的 animationend，忽略子节点嵌套动画冒泡', async () => {
    wrapper = mount(Tooltip, {
      ...mountOptions,
      props: { tooltip: 'hi', show: true }
    })
    await flush()

    const container = document.querySelector('.tooltip-card-container') as HTMLElement
    const card = document.querySelector('.tooltip-card') as HTMLElement
    expect(container).not.toBeNull()

    // 子节点（嵌套动画）冒泡上来的 animationend 不应触发组件事件
    card.dispatchEvent(new Event('animationend', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('animationend')).toBeUndefined()

    // 容器自身的 animationend（缩放动画）应正常触发
    container.dispatchEvent(new Event('animationend'))
    await nextTick()
    expect(wrapper.emitted('animationend')).toEqual([[true]])
  })
})
