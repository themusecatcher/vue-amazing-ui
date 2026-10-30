import { describe, it, expect, vi, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Popover from 'components/popover'
import Tooltip from 'components/tooltip'

/**
 * 回归守护：Popover 未声明 `trigger` / `keyboard`（以及 `open`），
 * 这些能力**依赖 Vue 的属性透传**落到内层 Tooltip 上。
 *
 * 因此一旦有人给 Popover 加 `inheritAttrs: false`、或把 `trigger` 声明为
 * 非透传的自有语义，下列行为会无声失效 —— 用行为断言把该契约锁住。
 *
 * 注：@vue/test-utils 默认 stub `Transition`，会使挂在 `<Transition>` 上的监听
 * 落到 stub 而非真实元素，故显式关闭（与本仓库 test/tooltip.spec.ts 一致）。
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

async function flush(): Promise<void> {
  await nextTick()
  await tick()
  await nextTick()
}

const isShown = (): boolean => document.querySelector('.tooltip-card-container') !== null

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
})

function mountPopover(props: Record<string, unknown>): void {
  wrapper = mount(Popover, {
    ...mountOptions,
    props,
    slots: { default: () => h('button', { class: 'btn' }, 'b') }
  })
}

describe('Popover 依赖属性透传到内层 Tooltip', () => {
  it('trigger="click" 透传生效：hover 不打开、click 打开', async () => {
    mountPopover({ title: 't', content: 'c', trigger: 'click' })
    await flush()

    const wrapEl = document.querySelector('.tooltip-wrap') as HTMLElement
    // 不应作为普通 DOM 属性残留
    expect(wrapEl.getAttribute('trigger')).toBeNull()

    wrapEl.dispatchEvent(new Event('mouseenter'))
    await flush()
    expect(isShown()).toBe(false)
    ;(document.querySelector('.tooltip-content') as HTMLElement).dispatchEvent(new Event('click'))
    await flush()
    expect(isShown()).toBe(true)
  })

  it('keyboard 透传生效：trigger="click" 时 Enter 可切换显示', async () => {
    mountPopover({ title: 't', content: 'c', trigger: 'click', keyboard: true })
    await flush()

    const content = document.querySelector('.tooltip-content') as HTMLElement
    content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await flush()
    expect(isShown()).toBe(true)
  })

  it('destroyOnHide 透传生效：关闭后卸载面板，再次显示重新创建', async () => {
    mountPopover({ title: 't', content: 'c', open: true, destroyOnHide: true })
    await flush()
    const first = document.querySelector('.tooltip-card-container') as HTMLElement
    expect(first).not.toBeNull()

    await wrapper?.setProps({ open: false })
    // 卸载发生在离开过渡结束之后，故轮询「元素脱离文档」而非「查不到」
    for (let i = 0; i < 20 && first.isConnected; i += 1) {
      first.dispatchEvent(new Event('animationend'))
      await flush()
    }
    expect(first.isConnected).toBe(false)
    expect(isShown()).toBe(false)

    await wrapper?.setProps({ open: true })
    await flush()
    const recreated = document.querySelector('.tooltip-card-container') as HTMLElement
    expect(recreated).not.toBeNull()
    expect(recreated).not.toBe(first)
    // 重建后皮肤层内容与宿主契约齐全
    expect(recreated.querySelector('.popover-content')?.textContent).toBe('c')
    expect(recreated.classList.contains('va-popup-placement-top')).toBe(true)
  })
})

/**
 * 回归守护：`Popover` 只提供「皮肤 + 内容」，浮层宿主（Teleport / 首帧优化 / 显隐 /
 * 层级 / 箭头 DOM）经 `Tooltip` 落到 `<Popup>`。
 *
 * 下列断言锁住这条链路 —— 若宿主被绕过（如自行渲染面板）或透传被切断，属性 / 箭头 /
 * 层级会同时失效，用例即失败。
 */
describe('Popover 落在 Popup 浮层链上', () => {
  const queryPanel = (): HTMLElement => document.querySelector('.tooltip-card-container') as HTMLElement

  it('面板由 <Popup> 宿主渲染：落方向类、渲染箭头、层级取浮层默认值', async () => {
    mountPopover({ title: 't', content: 'c', open: true })
    await flush()

    const panel = queryPanel()
    expect(panel).not.toBeNull()
    // 类名取 actualPlacement 的对外命名，箭头几何全部由该类选择器驱动
    expect(panel.classList.contains('va-popup-placement-top')).toBe(true)
    expect(panel.classList.contains('tooltip-has-arrow')).toBe(true)
    expect(panel.querySelector('.tooltip-arrow')).not.toBeNull()
    // 层级取浮层统一默认层级表（Tooltip 族 1070），不再各组件硬编码
    expect(Number(panel.style.zIndex)).toBe(1070)
  })

  it('内容仍由 Popover 提供：标题 / 内容渲染在宿主面板内', async () => {
    mountPopover({ title: 't', content: 'c', open: true })
    await flush()

    const panel = queryPanel()
    expect(panel.querySelector('.popover-title')?.textContent).toBe('t')
    expect(panel.querySelector('.popover-content')?.textContent).toBe('c')
  })

  it('arrow=false 时不渲染箭头 DOM，面板也不保留箭头槽', async () => {
    mountPopover({ title: 't', content: 'c', open: true, arrow: false })
    await flush()

    const panel = queryPanel()
    expect(panel.querySelector('.tooltip-arrow')).toBeNull()
    expect(panel.classList.contains('tooltip-has-arrow')).toBe(false)
  })
})

/**
 * `Popover` 的 prop 契约改为 `extends Omit<TooltipProps, …>` 之后的两条硬约束：
 *
 * 1. 类型继承**不继承默认值**。缺省且无默认值的布尔 prop 会被 Vue 强转成 `false` 并经 rest
 *    下发给 Tooltip，覆盖其 `arrow: true` / `flip: true`（表现为箭头消失、flip 失效）；
 * 2. 声明 `open` 后 Vue 会丢弃 `onUpdate:open` 的 attrs 透传（runtime-core filterModelListeners），
 *    必须由组件自行声明 emits 并转发，否则 `v-model:open` 静默失效。
 *
 * 用例 2 / 3 锁第 1 条，用例 4 锁第 2 条，用例 5 是防未来新增字段静默回归的不变量。
 */
describe('Popover 继承 Tooltip 契约', () => {
  const innerTooltip = () => wrapper?.findComponent(Tooltip)

  it('1. maxWidth 显式传参经 rest 下发，覆盖默认 auto', async () => {
    mountPopover({ title: 't', content: 'c', maxWidth: 320 })
    await flush()

    expect(innerTooltip()?.props('maxWidth')).toBe(320)
  })

  it('2. 缺省时内层 Tooltip 收到 arrow: true / flip: true', async () => {
    mountPopover({ title: 't', content: 'c' })
    await flush()

    const tooltip = innerTooltip()
    expect(tooltip?.props('arrow')).toBe(true)
    expect(tooltip?.props('flip')).toBe(true)
    // 数字 / 字符串 prop 本就由 Tooltip 自身默认值兜底，一并确认未被 rest 污染
    expect(tooltip?.props('showDelay')).toBe(100)
    expect(tooltip?.props('trigger')).toBe('hover')
    // `to` 的联合类型含 `false` → 运行时类型带 Boolean，缺省会被 Vue 转成 `false`（等价「就地渲染」，
    // 浮层不再挂进承载层）。必须保持 undefined，宿主才会就近解析挂载点
    expect(tooltip?.props('to')).toBeUndefined()
  })

  it('3. 显式 :arrow="false" 仍可关闭箭头（默认值不吞显式传参）', async () => {
    mountPopover({ title: 't', content: 'c', arrow: false })
    await flush()

    expect(innerTooltip()?.props('arrow')).toBe(false)
  })

  it('5. v-model:open：点击触发后父组件收到 update:open', async () => {
    mountPopover({ title: 't', content: 'c', trigger: 'click', open: false })
    await flush()
    ;(document.querySelector('.tooltip-content') as HTMLElement).dispatchEvent(new Event('click'))
    await flush()

    expect(wrapper?.emitted('update:open')).toEqual([[true]])
  })

  it('6. 不变量：Tooltip 中「默认 true 的布尔 prop」必须全部被继承', async () => {
    type PropOptions = Record<string, { default?: unknown }>
    const tooltipProps = (Tooltip as unknown as { props: PropOptions }).props
    const popoverProps = (Popover as unknown as { props: PropOptions }).props
    const omitted = ['content', 'contentClass', 'contentStyle', 'tooltip', 'tooltipStyle']
    const checked: string[] = []

    for (const key of Object.keys(tooltipProps)) {
      if (omitted.includes(key)) continue
      if (tooltipProps[key]?.default !== true) continue // 只守「默认 true 的布尔项」
      expect(popoverProps[key]?.default, key).toBe(true)
      checked.push(key)
    }
    // 守住用例本身：当前至少覆盖 arrow / flip，避免列表为空时「空跑通过」
    expect(checked).toEqual(expect.arrayContaining(['arrow', 'flip']))
    // 契约形状的运行时声明：继承到 Tooltip 字段、剔除名单项不出现、anchor 保留
    expect('open' in popoverProps).toBe(true)
    expect('anchor' in popoverProps).toBe(true)
    expect('tooltip' in popoverProps).toBe(false)
  })
})
