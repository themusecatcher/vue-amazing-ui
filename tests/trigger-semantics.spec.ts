import { describe, it, expect, afterEach, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import Tooltip from 'components/tooltip'
import Dropdown from 'components/dropdown/Dropdown.vue'
import { flushTransition } from './helpers'

/**
 * T12 · 触发语义一致性（Tooltip ↔ Dropdown）
 *
 * 同一组用例**同时**跑 Tooltip 与 Dropdown：Dropdown 的触发语义是本次对齐的基准
 * （显式 toggle / 外点判「触发器 + 面板」/ Esc 覆盖触发器 / 显隐定时器分离），
 * Tooltip 改成与之一致后，同一组断言必须同时成立 —— 否则只能证明「把测试改到通过」。
 *
 * 覆盖的六点（对应方案 §5 执行要求 2）：
 * 1. click 再次点击关闭；
 * 2. 点面板内部不关闭；
 * 3. 触发器聚焦时 Esc 关闭（Tooltip 旧实现仅在 `keyboard` 开启时才响应，对齐前红）；
 * 4. hover 快速划过不补弹（移出要取消待执行的显示）；
 * 5. contextmenu 右键展开 + 点击外部关闭；
 * 6. 受控 `open` 与内部触发互不打架（一次点击只发一次 `update:open`，状态随属性同步）。
 *
 * 注：用例统一 `to: false` 就地渲染，按组件根节点收敛查询，避免 Teleport 到 body 的
 * 节点跨用例残留；离开过渡在无 CSS 环境由「双 rAF + 事件等待」收尾，故用轮询落定。
 */

interface TriggerSubject {
  name: string
  /** 挂载被测组件：props 只承载「与组件无关的触发语义参数」 */
  mount: (props: Record<string, unknown>) => VueWrapper
  /** 触发器元素 */
  triggerSelector: string
  /** 面板（Popup 渲染的定位盒） */
  panelSelector: string
  /** 面板内部的可点击内容（点击它不应关闭浮层） */
  panelInnerSelector: string
  /** hover 延迟参数的组件内命名：Tooltip 用 showDelay / hideDelay，Dropdown 用 mouseEnterDelay / mouseLeaveDelay */
  hoverDelayProps: (delay: number) => Record<string, number>
}

const mountOptions = {
  attachTo: document.body,
  global: { stubs: { transition: false } }
}

const subjects: TriggerSubject[] = [
  {
    name: 'Tooltip',
    mount: (props) =>
      mount(Tooltip, {
        ...mountOptions,
        props: { tooltip: '提示内容', to: false, showDelay: 0, hideDelay: 0, ...props },
        slots: { default: () => h('button', { class: 'subject-trigger' }, '触发') }
      }) as VueWrapper,
    triggerSelector: '.tooltip-content',
    panelSelector: '.tooltip-card-container',
    panelInnerSelector: '.tooltip-card',
    hoverDelayProps: (delay) => ({ showDelay: delay, hideDelay: delay })
  },
  {
    name: 'Dropdown',
    mount: (props) =>
      mount(Dropdown, {
        ...mountOptions,
        props: { menus: [{ key: '1', label: '1st' }], to: false, mouseEnterDelay: 0, mouseLeaveDelay: 0, ...props },
        slots: { default: () => h('button', { class: 'subject-trigger' }, '触发') }
      }) as VueWrapper,
    triggerSelector: '.dropdown-trigger',
    panelSelector: '.dropdown-overlay',
    panelInnerSelector: '.dropdown-content',
    hoverDelayProps: (delay) => ({ mouseEnterDelay: delay, mouseLeaveDelay: delay })
  }
]

let wrapper: VueWrapper | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})

const flush = flushTransition

function triggerOf(target: VueWrapper, subject: TriggerSubject): HTMLElement {
  return target.element.querySelector(subject.triggerSelector) as HTMLElement
}

/** 面板是否处于可见态（`v-show` 关闭后为 `display: none`） */
function panelShown(target: VueWrapper, subject: TriggerSubject): boolean {
  const panel = target.element.querySelector(subject.panelSelector) as HTMLElement | null
  return Boolean(panel && panel.style.display !== 'none')
}

/** 轮询等待面板转入隐藏，必要时补发 animationend 促使离开过渡收尾 */
async function waitHidden(target: VueWrapper, subject: TriggerSubject): Promise<void> {
  for (let i = 0; i < 20; i += 1) {
    const panel = target.element.querySelector(subject.panelSelector) as HTMLElement | null
    if (!panel || panel.style.display === 'none') return
    panel.dispatchEvent(new Event('animationend'))
    await flush()
  }
}

/** 最后一次 openChange 的取值 */
function lastOpen(target: VueWrapper): unknown {
  const events = target.emitted('openChange') ?? []
  return events.length ? events[events.length - 1][0] : undefined
}

function clickOn(el: Element): void {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
}

/** 外部按下：在 mousedown / touchstart 上判定「面板之外 且 锚点之外」 */
function downOn(el: Element): void {
  el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
}

/** 聚焦触发器内的元素并派发 esc（键盘事件自内部元素冒泡到组件在触发器上的监听） */
function pressEscapeOnTrigger(target: VueWrapper, subject: TriggerSubject): void {
  const trigger = triggerOf(target, subject)
  const focusTarget = (trigger.querySelector('.subject-trigger') as HTMLElement | null) ?? trigger
  focusTarget.focus()
  focusTarget.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
}

for (const subject of subjects) {
  describe(`触发语义一致性 · ${subject.name}`, () => {
    it('1. click 触发：再次点击触发器关闭', async () => {
      wrapper = subject.mount({ trigger: 'click' })
      await flush()

      clickOn(triggerOf(wrapper, subject))
      await flush()
      expect(lastOpen(wrapper)).toBe(true)
      expect(panelShown(wrapper, subject)).toBe(true)

      clickOn(triggerOf(wrapper, subject))
      // 显式 toggle：关闭在同一拍内完成，不依赖「document 捕获先关、冒泡再开」的时序
      expect(lastOpen(wrapper)).toBe(false)
      await flush()
      await waitHidden(wrapper, subject)
      expect(lastOpen(wrapper)).toBe(false)
      expect(panelShown(wrapper, subject)).toBe(false)
    })

    it('2. click 触发：点击面板内部不关闭', async () => {
      wrapper = subject.mount({ trigger: 'click' })
      await flush()

      clickOn(triggerOf(wrapper, subject))
      await flush()
      expect(panelShown(wrapper, subject)).toBe(true)

      const inner = wrapper.element.querySelector(subject.panelInnerSelector)
      expect(inner).not.toBeNull()
      clickOn(inner as Element)
      await flush()

      expect(panelShown(wrapper, subject)).toBe(true)
      expect(lastOpen(wrapper)).toBe(true)
    })

    it('3. 触发器聚焦时按 Esc 关闭', async () => {
      wrapper = subject.mount({ trigger: 'click' })
      await flush()

      clickOn(triggerOf(wrapper, subject))
      await flush()
      expect(panelShown(wrapper, subject)).toBe(true)

      pressEscapeOnTrigger(wrapper, subject)
      await flush()
      await waitHidden(wrapper, subject)

      expect(lastOpen(wrapper)).toBe(false)
      expect(panelShown(wrapper, subject)).toBe(false)
    })

    it('4. hover 快速划过不补弹（移出即取消待执行的显示）', async () => {
      wrapper = subject.mount({ trigger: 'hover', ...subject.hoverDelayProps(40) })
      await flush()

      const trigger = triggerOf(wrapper, subject)
      trigger.dispatchEvent(new MouseEvent('mouseenter'))
      trigger.dispatchEvent(new MouseEvent('mouseleave'))

      await new Promise((resolve) => setTimeout(resolve, 80))
      await flush()

      expect(panelShown(wrapper, subject)).toBe(false)
      expect(lastOpen(wrapper)).not.toBe(true)
    })

    it('5. contextmenu 右键展开，点击外部关闭', async () => {
      wrapper = subject.mount({ trigger: 'contextmenu' })
      await flush()

      const event = new MouseEvent('contextmenu', { clientX: 100, clientY: 100, bubbles: true, cancelable: true })
      triggerOf(wrapper, subject).dispatchEvent(event)
      await flush()

      expect(event.defaultPrevented).toBe(true)
      expect(panelShown(wrapper, subject)).toBe(true)

      downOn(document.body)
      await flush()
      await waitHidden(wrapper, subject)

      expect(panelShown(wrapper, subject)).toBe(false)
      expect(lastOpen(wrapper)).toBe(false)
    })

    it('6. 受控 open 与内部触发互不打架：一次点击只发一次 update:open，状态随属性同步', async () => {
      let target: VueWrapper | null = null
      const onUpdateOpen = (value: boolean): void => {
        void target?.setProps({ open: value })
      }
      // open 由父侧持有（v-model:open 的等价形态）：组件只能上报，不能与属性抢状态
      target = subject.mount({ trigger: 'click', open: false, 'onUpdate:open': onUpdateOpen })
      wrapper = target
      await flush()

      clickOn(triggerOf(target, subject))
      await flush()
      expect(target.emitted('update:open')).toHaveLength(1)
      expect(target.emitted('update:open')?.[0]).toEqual([true])
      expect(panelShown(target, subject)).toBe(true)

      clickOn(triggerOf(target, subject))
      await flush()
      await waitHidden(target, subject)
      expect(target.emitted('update:open')).toHaveLength(2)
      expect(target.emitted('update:open')?.[1]).toEqual([false])
      expect(panelShown(target, subject)).toBe(false)

      // 受控态下外部点击同样只上报
      clickOn(triggerOf(target, subject))
      await flush()
      expect(panelShown(target, subject)).toBe(true)
      downOn(document.body)
      await flush()
      await waitHidden(target, subject)
      expect(target.emitted('update:open')).toHaveLength(4)
      expect(target.emitted('update:open')?.[3]).toEqual([false])
      expect(panelShown(target, subject)).toBe(false)
    })

    it('7. 静态受控 open：父侧不响应时显隐以属性为准，内部触发只上报', async () => {
      // open 传入即受控（父侧不监听 update:open）：组件不得自行改写显隐
      wrapper = subject.mount({ trigger: 'click', open: true })
      await flush()
      expect(panelShown(wrapper, subject)).toBe(true)
      // 受控初始态由属性驱动，不产生「无变化」的开事件
      expect(wrapper.emitted('openChange')).toBeUndefined()

      clickOn(triggerOf(wrapper, subject))
      await flush()
      expect(panelShown(wrapper, subject)).toBe(true)
      expect(wrapper.emitted('openChange')).toEqual([[false]])

      downOn(document.body)
      await flush()
      expect(panelShown(wrapper, subject)).toBe(true)
      expect(wrapper.emitted('openChange')).toEqual([[false], [false]])
    })

    it('8. 面板内按下、面板外松开保持打开（拖拽不误关）', async () => {
      wrapper = subject.mount({ trigger: 'click' })
      await flush()

      clickOn(triggerOf(wrapper, subject))
      await flush()
      expect(panelShown(wrapper, subject)).toBe(true)

      // 面板内按下 → 拖到面板外松手：mousedown 的 target 在面板内，不应被判为外部按下；
      // 浏览器随后派发的 click 其 target 会退化为共同祖先（body），旧实现在 click 上判定会误关
      const inner = wrapper.element.querySelector(subject.panelInnerSelector) as Element
      downOn(inner)
      document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await flush()

      expect(panelShown(wrapper, subject)).toBe(true)
      expect(lastOpen(wrapper)).toBe(true)
    })

    it('9. contextmenu：再次右键仍阻止原生菜单，点击触发器收起', async () => {
      wrapper = subject.mount({ trigger: 'contextmenu' })
      await flush()
      const trigger = triggerOf(wrapper, subject)

      const first = new MouseEvent('contextmenu', { clientX: 100, clientY: 100, bubbles: true, cancelable: true })
      trigger.dispatchEvent(first)
      await flush()
      expect(first.defaultPrevented).toBe(true)
      expect(panelShown(wrapper, subject)).toBe(true)

      // 已展开时再次右键：同一个手势不能第一次拦、第二次放行（否则原生菜单叠在浮层上）
      const second = new MouseEvent('contextmenu', { clientX: 300, clientY: 300, bubbles: true, cancelable: true })
      trigger.dispatchEvent(second)
      await flush()
      expect(second.defaultPrevented).toBe(true)
      expect(panelShown(wrapper, subject)).toBe(true)

      // 左键点击触发器收起：右键唤起的浮层没有左键 toggle 语义，但这是最直觉的关闭动作
      clickOn(trigger)
      await flush()
      await waitHidden(wrapper, subject)
      expect(panelShown(wrapper, subject)).toBe(false)
      expect(lastOpen(wrapper)).toBe(false)
    })
  })
}

/**
 * 锚点模式（Tooltip 独有，走模板的第二个 Popup 分支）
 *
 * 触发监听与无障碍属性都绑在外部锚点上，因此「触发器」= 锚点元素：click toggle、
 * 外点判定（锚点之外）与 Esc 都必须以它为准，不能只在包裹层模式下成立。
 */
describe('触发语义一致性 · Tooltip 锚点模式', () => {
  const tooltipSubject = subjects[0]

  function mountWithAnchor(props: Record<string, unknown>): {
    wrapper: VueWrapper
    anchor: () => HTMLElement
    tooltip: () => VueWrapper
  } {
    const Host = defineComponent({
      components: { Tooltip },
      setup() {
        const anchorRef = ref<HTMLElement | null>(null)
        return { anchorRef, tooltipProps: props }
      },
      template: `
        <div>
          <button ref="anchorRef" class="subject-trigger">锚点</button>
          <Tooltip :anchor="anchorRef" :to="false" :show-delay="0" :hide-delay="0" v-bind="tooltipProps">
            <template #tooltip>提示内容</template>
          </Tooltip>
        </div>
      `
    })
    wrapper = mount(Host, mountOptions) as VueWrapper
    return {
      wrapper,
      anchor: () => wrapper.find('.subject-trigger').element as HTMLElement,
      // openChange 由内层 Tooltip 发出，宿主不转发，故按组件实例读事件
      tooltip: () => wrapper.findComponent(Tooltip)
    }
  }

  it('click 再次点击锚点关闭，点击面板内不关闭', async () => {
    const host = mountWithAnchor({ trigger: 'click' })
    await flush()

    clickOn(host.anchor())
    await flush()
    expect(lastOpen(host.tooltip())).toBe(true)
    expect(panelShown(host.wrapper, tooltipSubject)).toBe(true)

    clickOn(host.wrapper.element.querySelector('.tooltip-card') as Element)
    await flush()
    expect(panelShown(host.wrapper, tooltipSubject)).toBe(true)

    clickOn(host.anchor())
    expect(lastOpen(host.tooltip())).toBe(false)
    await flush()
    await waitHidden(host.wrapper, tooltipSubject)
    expect(panelShown(host.wrapper, tooltipSubject)).toBe(false)
  })

  it('锚点聚焦时按 Esc 关闭', async () => {
    const host = mountWithAnchor({ trigger: 'click' })
    await flush()

    clickOn(host.anchor())
    await flush()
    expect(panelShown(host.wrapper, tooltipSubject)).toBe(true)

    const anchor = host.anchor()
    anchor.focus()
    anchor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await flush()
    await waitHidden(host.wrapper, tooltipSubject)

    expect(panelShown(host.wrapper, tooltipSubject)).toBe(false)
    expect(lastOpen(host.tooltip())).toBe(false)
  })

  it('点击锚点之外关闭（外点口径含锚点，不误关锚点自身）', async () => {
    const host = mountWithAnchor({ trigger: 'click' })
    await flush()

    clickOn(host.anchor())
    await flush()
    expect(panelShown(host.wrapper, tooltipSubject)).toBe(true)

    const outside = document.createElement('div')
    document.body.appendChild(outside)
    downOn(outside)
    await flush()
    await waitHidden(host.wrapper, tooltipSubject)

    expect(panelShown(host.wrapper, tooltipSubject)).toBe(false)
    expect(lastOpen(host.tooltip())).toBe(false)
  })
})
