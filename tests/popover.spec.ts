import { describe, it, expect, vi, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Popover from 'components/popover'

/**
 * 回归守护：Popover 未声明 `trigger` / `keyboard`（以及 `show`），
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
    mountPopover({ title: 't', content: 'c', show: true, destroyOnHide: true })
    await flush()
    const first = document.querySelector('.tooltip-card-container') as HTMLElement
    expect(first).not.toBeNull()

    await wrapper?.setProps({ show: false })
    // 卸载发生在离开过渡结束之后，故轮询「元素脱离文档」而非「查不到」
    for (let i = 0; i < 20 && first.isConnected; i += 1) {
      first.dispatchEvent(new Event('animationend'))
      await flush()
    }
    expect(first.isConnected).toBe(false)
    expect(isShown()).toBe(false)

    await wrapper?.setProps({ show: true })
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
    mountPopover({ title: 't', content: 'c', show: true })
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
    mountPopover({ title: 't', content: 'c', show: true })
    await flush()

    const panel = queryPanel()
    expect(panel.querySelector('.popover-title')?.textContent).toBe('t')
    expect(panel.querySelector('.popover-content')?.textContent).toBe('c')
  })

  it('arrow=false 时不渲染箭头 DOM，面板也不保留箭头槽', async () => {
    mountPopover({ title: 't', content: 'c', show: true, arrow: false })
    await flush()

    const panel = queryPanel()
    expect(panel.querySelector('.tooltip-arrow')).toBeNull()
    expect(panel.classList.contains('tooltip-has-arrow')).toBe(false)
  })
})
