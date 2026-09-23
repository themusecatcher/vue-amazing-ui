import { describe, it, expect, vi, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Popconfirm from 'components/popconfirm'
import Button from 'components/button'

/**
 * Popconfirm 落在 `<Popup>` 浮层链上的回归守护
 *
 * `Popconfirm` 只提供「皮肤 + 按钮内容」，浮层宿主（Teleport / 首帧优化 / 显隐 / 层级 /
 * 箭头 DOM）经 `Tooltip` 落到 `<Popup>`。本用例锁住这条链路：
 * - 面板由宿主渲染并落方向类 / 箭头 / 浮层统一默认层级；
 * - 皮肤层内容（图标 / 标题 / 描述 / 按钮）仍由本组件提供，与宿主面板共存；
 * - 「确定 / 取消」经组件暴露的 `hide` 关闭浮层（宿主只按 `show` 渲染，不接管触发语义）。
 *
 * 注：@vue/test-utils 默认 stub `Transition`，会使挂在 `<Transition>` 上的监听落到 stub
 * 而非真实元素，故显式关闭（与本仓库 tests/tooltip.spec.ts 一致）。
 */
const mountOptions = {
  attachTo: document.body,
  global: {
    stubs: {
      transition: false
    }
  }
}

/** 等待「定时器（delay 0）→ 渲染 → 离开过渡归位」：测试环境无 CSS，过渡由双 rAF 驱动，故等足 10ms */
async function flush(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  await nextTick()
}

const queryPanel = (): HTMLElement | null => document.querySelector('.tooltip-card-container')

/** 点击触发器（Popconfirm 默认 trigger 为 click）并等待面板渲染 */
async function clickTrigger(): Promise<void> {
  ;(document.querySelector('.tooltip-content') as HTMLElement).dispatchEvent(new Event('click'))
  await flush()
}

/**
 * 等待浮层转入隐藏
 *
 * `v-show` 的 `display: none` 由**离开过渡结束时**写入（宿主刻意不在动画期间卸载元素）。
 * 测试环境无 CSS，Vue 以「双 rAF + 事件等待」收尾；固定等待在负载下可能不够，故补一次
 * `animationend` 覆盖事件等待分支，再轮询到 display 落定，避免用例抖动。
 */
async function waitClosed(panel: HTMLElement): Promise<void> {
  for (let i = 0; i < 20 && panel.style.display !== 'none'; i += 1) {
    panel.dispatchEvent(new Event('animationend'))
    await flush()
  }
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
})

function mountPopconfirm(props: Record<string, unknown> = {}): void {
  wrapper = mount(Popconfirm, {
    ...mountOptions,
    props,
    slots: { default: () => h('button', { class: 'btn' }, 'b') }
  })
}

describe('Popconfirm 落在 Popup 浮层链上', () => {
  it('默认 click 触发：面板由 <Popup> 宿主渲染（方向类 / 箭头 / 浮层默认层级）', async () => {
    mountPopconfirm({ title: '删除确认', description: '确定删除吗？' })
    await flush()
    // 首帧优化：未触发前不渲染任何浮层 DOM
    expect(queryPanel()).toBeNull()

    await clickTrigger()
    const panel = queryPanel() as HTMLElement
    expect(panel).not.toBeNull()
    // 宿主契约：类名取 actualPlacement 的对外命名
    expect(panel.classList.contains('va-popup-placement-top')).toBe(true)
    expect(panel.classList.contains('tooltip-has-arrow')).toBe(true)
    expect(panel.querySelector('.tooltip-arrow')).not.toBeNull()
    // 层级取浮层统一默认层级表（Tooltip 族 1070）
    expect(Number(panel.style.zIndex)).toBe(1070)
  })

  it('皮肤层内容仍由 Popconfirm 提供，与宿主渲染的面板共存', async () => {
    mountPopconfirm({ title: '删除确认', description: '确定删除吗？' })
    await flush()
    await clickTrigger()

    const panel = queryPanel() as HTMLElement
    expect(panel.querySelector('.popconfirm-title')?.textContent).toBe('删除确认')
    expect(panel.querySelector('.popconfirm-description')?.textContent).toBe('确定删除吗？')
    expect(panel.querySelector('.popconfirm-btns')).not.toBeNull()
  })

  it('点击确定：发出 ok 并关闭浮层', async () => {
    mountPopconfirm({ title: '删除确认' })
    await flush()
    await clickTrigger()
    const panel = queryPanel() as HTMLElement

    // 取消按钮在前、确定按钮在后（showCancel 默认 true）
    const buttons = wrapper?.findAllComponents(Button) ?? []
    expect(buttons).toHaveLength(2)
    await buttons[1].trigger('click')
    await waitClosed(panel)

    expect(wrapper?.emitted('ok')).toHaveLength(1)
    // 关闭不卸载元素（宿主用 v-show 保证动画期间不卸载），仅转入隐藏
    expect(queryPanel()).toBe(panel)
    expect(panel.style.display).toBe('none')
  })

  it('点击取消：发出 cancel 并关闭浮层', async () => {
    mountPopconfirm({ title: '删除确认' })
    await flush()
    await clickTrigger()
    const panel = queryPanel() as HTMLElement

    const buttons = wrapper?.findAllComponents(Button) ?? []
    await buttons[0].trigger('click')
    await waitClosed(panel)

    expect(wrapper?.emitted('cancel')).toHaveLength(1)
    expect(queryPanel()).toBe(panel)
    expect(panel.style.display).toBe('none')
  })
})

/**
 * `Popconfirm` 未声明 `destroyOnHide`，该属性依赖**两跳**属性透传
 * （`Popconfirm` → `Popover` → `Tooltip`）才能落到浮层宿主 —— 链路任一环被切断即失效，故用行为断言锁住。
 */
describe('Popconfirm · destroyOnHide 经两跳透传到浮层宿主', () => {
  it('关闭后卸载整棵浮层子树，再次打开重新创建', async () => {
    mountPopconfirm({ title: '删除确认', destroyOnHide: true })
    await flush()
    await clickTrigger()
    const first = queryPanel() as HTMLElement
    expect(first).not.toBeNull()

    // 取消关闭：卸载由 destroyOnHide 在离开过渡结束后触发（宿主自身不卸载）
    const buttons = wrapper?.findAllComponents(Button) ?? []
    await buttons[0].trigger('click')
    for (let i = 0; i < 20 && first.isConnected; i += 1) {
      first.dispatchEvent(new Event('animationend'))
      await flush()
    }
    expect(first.isConnected).toBe(false)
    expect(queryPanel()).toBeNull()

    // 再次打开：重新创建，且宿主与皮肤层契约齐全
    await clickTrigger()
    const recreated = queryPanel() as HTMLElement
    expect(recreated).not.toBeNull()
    expect(recreated).not.toBe(first)
    expect(recreated.querySelector('.popconfirm-title')?.textContent).toBe('删除确认')
    expect(recreated.querySelector('.popconfirm-btns')).not.toBeNull()
    expect(recreated.classList.contains('va-popup-placement-top')).toBe(true)
  })
})
