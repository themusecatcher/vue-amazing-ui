import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import AutoComplete from 'components/auto-complete'
import ConfigProvider from 'components/config-provider'
import { createDiscreteApi } from 'components/discrete'
import Drawer from 'components/drawer'
import Image from 'components/image'
import Modal from 'components/modal'
import Select from 'components/select'
import Tooltip from 'components/tooltip'
import { createZIndexManager, useZIndex } from 'components/utils'

/**
 * 浮层层级（z-index）管理层回归守护
 *
 * 三条不变量容易被后续改动无声破坏：
 * - **可关闭**：未传 `baseZIndex` 时不注入管理器，各组件必须沿用既有硬编码层级（改造前行为）；
 * - **后出现者在上**：分配点恒在当前已占层之上，且同一层重新出现时先归还旧槽位再领取，
 *   从而位于其它已打开层之上（这正是 `Modal` 里放 `Tooltip` 不再被遮罩盖住的前提）；
 * - **prop 优先**：组件自身 `zIndex` prop 的优先级高于自动分配（公开 API 兼容）。
 */

/** 从内联样式中取出 z-index */
function readZIndex(style: string | undefined): number {
  const matched = style?.match(/z-index:\s*(\d+)/)
  return matched ? Number(matched[1]) : Number.NaN
}

/** 从内联样式中取出 CSS 变量形式的层级（Message / Notification 经 `--xxx-z-index` 变量下发） */
function readVarZIndex(style: string | null | undefined, name: string): number {
  const matched = style?.match(new RegExp(`--${name}:\\s*(\\d+)`))
  return matched ? Number(matched[1]) : Number.NaN
}

/** 等待「定时器（delay 0）→ 渲染」两拍，与 tooltip.spec 口径一致 */
async function flush(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 0))
  await nextTick()
}

/** 等待承载层开合落定（Modal 的离场过渡 + 浮层收起用的延迟 0 定时器） */
async function settle(): Promise<void> {
  for (let index = 0; index < 4; index += 1) {
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 10))
  }
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.querySelectorAll('.tooltip-card-container, .select-panel-container').forEach((el) => el.remove())
})

describe('createZIndexManager', () => {
  it('分配点恒在当前已占层之上，span 预留连续段', () => {
    const manager = createZIndexManager(1000)
    const bottom = manager.allocate()
    const middle = manager.allocate(2) // 占 1010 / 1020 两段，供层内再分层（遮罩 + 弹窗）使用
    const top = manager.allocate()
    expect([bottom, middle, top]).toEqual([1000, 1010, 1030])
  })

  it('最上层释放后回落、中间层释放不产生空洞复用、全部释放后回到起点', () => {
    const manager = createZIndexManager(1000)
    const bottom = manager.allocate()
    const middle = manager.allocate(2)
    const top = manager.allocate()
    // 最上层释放 → 下一次分配回落，说明数值随「同时可见层数」而非打开次数增长
    manager.release(top)
    const again = manager.allocate()
    expect(again).toBe(1030)
    // 中间层释放后，新层仍位于当前最上层之上（保证后出现者在上）
    manager.release(middle)
    const last = manager.allocate()
    expect(last).toBe(1040)
    // 全部释放后回到起点
    manager.release(bottom)
    manager.release(again)
    manager.release(last)
    expect(manager.allocate()).toBe(1000)
  })
})

/** 探针：把 useZIndex 的返回值取出到外部，便于断言分配语义 */
function mountProbes(baseZIndex?: number): {
  wrapper: ReturnType<typeof mount>
  first: ReturnType<typeof useZIndex>
  second: ReturnType<typeof useZIndex>
} {
  let first!: ReturnType<typeof useZIndex>
  let second!: ReturnType<typeof useZIndex>
  const probe = (assign: (api: ReturnType<typeof useZIndex>) => void) =>
    defineComponent({
      setup() {
        assign(useZIndex(1000))
        return () => h('div')
      }
    })
  const First = probe((api) => {
    first = api
  })
  const Second = probe((api) => {
    second = api
  })
  const Host = defineComponent({
    render: () =>
      h(ConfigProvider, baseZIndex === undefined ? {} : { baseZIndex }, { default: () => [h(First), h(Second)] })
  })
  const mounted = mount(Host)
  return { wrapper: mounted, first, second }
}

describe('useZIndex', () => {
  it('未传 baseZIndex 时恒为回退值，allocate 为空操作', () => {
    const probes = mountProbes()
    wrapper = probes.wrapper
    expect(probes.first.zIndex.value).toBe(1000)
    probes.first.allocate()
    expect(probes.first.zIndex.value).toBe(1000)
    expect(probes.second.zIndex.value).toBe(1000)
  })

  it('传入 baseZIndex 时以它为起点，按出现顺序自增', () => {
    const probes = mountProbes(5000)
    wrapper = probes.wrapper
    expect([probes.first.zIndex.value, probes.second.zIndex.value]).toEqual([5000, 5010])
  })

  it('同一层重新出现（如抽屉重开）会置顶：先归还旧槽位再领取', () => {
    const probes = mountProbes(5000)
    wrapper = probes.wrapper
    expect(probes.first.zIndex.value).toBe(5000)
    expect(probes.second.zIndex.value).toBe(5010)

    // 第一个层重新出现：应位于第二个层之上
    probes.first.allocate()
    expect(probes.first.zIndex.value).toBe(5020)
    // 第二个层随后重新出现：再次位于最上层之上，形成交替置顶
    probes.second.allocate()
    expect(probes.second.zIndex.value).toBe(5030)
  })

  it('组件卸载时自动归还槽位，重新挂载可复用', async () => {
    const showSecond = ref(true)
    let second!: ReturnType<typeof useZIndex>
    const Second = defineComponent({
      setup() {
        second = useZIndex(1000)
        return () => h('div')
      }
    })
    const First = defineComponent({
      setup() {
        useZIndex(1000)
        return () => h('div')
      }
    })
    const Host = defineComponent({
      render: () =>
        h(
          ConfigProvider,
          { baseZIndex: 5000 },
          {
            default: () => [h(First), showSecond.value ? h(Second) : null]
          }
        )
    })
    wrapper = mount(Host)
    expect(second.zIndex.value).toBe(5010)

    // 卸载第二个层 → 槽位归还；重新挂载后仍拿到 5010（若未归还则会继续累加）
    showSecond.value = false
    await nextTick()
    showSecond.value = true
    await nextTick()
    expect(second.zIndex.value).toBe(5010)
  })
})

/** 宿组件：ConfigProvider > Drawer（可选传 baseZIndex / Drawer 的 zIndex） */
const DrawerHost = defineComponent({
  props: {
    baseZIndex: { type: Number, default: undefined },
    drawerZIndex: { type: Number, default: undefined }
  },
  setup(props) {
    return () =>
      h(ConfigProvider, props.baseZIndex === undefined ? {} : { baseZIndex: props.baseZIndex }, {
        default: () => h(Drawer, { open: true, to: false, zIndex: props.drawerZIndex })
      })
  }
})

describe('乙类组件接入（以 Drawer 为例）', () => {
  it('未传 baseZIndex 时沿用既有默认层级 1000（向后兼容）', async () => {
    wrapper = mount(DrawerHost)
    await nextTick()
    expect(readZIndex(wrapper.find('.drawer-wrap').attributes('style'))).toBe(1000)
  })

  it('传入 baseZIndex 后由管理层分配', async () => {
    wrapper = mount(DrawerHost, { props: { baseZIndex: 5000 } })
    await nextTick()
    expect(readZIndex(wrapper.find('.drawer-wrap').attributes('style'))).toBe(5000)
  })

  it('组件自身的 zIndex prop 优先于自动分配', async () => {
    wrapper = mount(DrawerHost, { props: { baseZIndex: 5000, drawerZIndex: 7000 } })
    await nextTick()
    expect(readZIndex(wrapper.find('.drawer-wrap').attributes('style'))).toBe(7000)
  })

  it('两个抽屉同时打开时，后出现的在上', async () => {
    const Host = defineComponent({
      render: () =>
        h(
          ConfigProvider,
          { baseZIndex: 1000 },
          {
            default: () => [h(Drawer, { open: true, to: false }), h(Drawer, { open: true, to: false })]
          }
        )
    })
    wrapper = mount(Host)
    await nextTick()
    const wraps = wrapper.findAll('.drawer-wrap')
    const [first, second] = wraps.map((wrap) => readZIndex(wrap.attributes('style')))
    expect(second).toBeGreaterThan(first)
  })
})

describe('甲类浮层接入（Tooltip / Select / AutoComplete）', () => {
  it('未传 baseZIndex 时使用统一默认层级：Tooltip 1070、Select 1050', async () => {
    // 甲类浮层必须高于承载它的 Modal / Drawer / Dialog（1010），否则会被遮罩盖住
    const tooltipWrapper = mount(Tooltip, {
      attachTo: document.body,
      props: { tooltip: 'hi', show: true },
      global: { stubs: { transition: false } }
    })
    await flush()
    expect(readZIndex(document.querySelector('.tooltip-card-container')?.getAttribute('style') ?? undefined)).toBe(1070)
    tooltipWrapper.unmount()

    wrapper = mount(Select, {
      attachTo: document.body,
      props: { options: [{ label: 'apple', value: 1 }] }
    })
    await wrapper.trigger('click')
    await flush()
    expect(readZIndex(document.querySelector('.select-panel-container')?.getAttribute('style') ?? undefined)).toBe(1050)
  })

  it('甲类的显式 zIndex prop 优先于默认层级与自动分配', async () => {
    // 未注入分配器：prop 覆盖默认层级（Tooltip 默认 1070）
    wrapper = mount(Tooltip, {
      attachTo: document.body,
      props: { tooltip: 'hi', show: true, zIndex: 3000 },
      global: { stubs: { transition: false } }
    })
    await flush()
    expect(readZIndex(document.querySelector('.tooltip-card-container')?.getAttribute('style') ?? undefined)).toBe(3000)
    wrapper.unmount()

    // 注入分配器：prop 仍然优先（与乙类组件的同一优先级契约）
    const Host = defineComponent({
      render: () =>
        h(
          ConfigProvider,
          { baseZIndex: 5000 },
          {
            default: () => h(Tooltip, { tooltip: 'hi', show: true, zIndex: 3000 })
          }
        )
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()
    expect(readZIndex(document.querySelector('.tooltip-card-container')?.getAttribute('style') ?? undefined)).toBe(3000)
  })

  it('传入 baseZIndex 后甲类同样由管理层分配', async () => {
    const Host = defineComponent({
      render: () =>
        h(
          ConfigProvider,
          { baseZIndex: 5000 },
          {
            default: () => h(Tooltip, { tooltip: 'hi', show: true })
          }
        )
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()
    expect(readZIndex(document.querySelector('.tooltip-card-container')?.getAttribute('style') ?? undefined)).toBe(5000)
  })
})

describe('嵌套浮层层级：承载层内嵌 Select', () => {
  /**
   * 承载层（Modal / Drawer 同源：关闭后内容不卸载）内嵌 Select 时的层级契约。
   *
   * 「承载层二次打开后会重新领取层级、把内嵌下拉压到下面」这一场景，用 `useZIndex` 探针模拟：
   * 探针在下拉展开期间 `allocate()`，等价于 Modal 二次打开重新领取层级，前置条件由此完全确定
   * 修复点：下拉**每次出现**都要重新领取层级。
   */
  it('下拉每次「出现」都重新领取层级，后出现的层压不住它', async () => {
    let laterLayer!: ReturnType<typeof useZIndex>
    const LaterLayer = defineComponent({
      setup() {
        laterLayer = useZIndex(1000)
        return () => h('div')
      }
    })
    const Host = defineComponent({
      render: () =>
        h(
          ConfigProvider,
          { baseZIndex: 1000 },
          {
            // 用 Drawer 充当承载层（与 Modal 同为「内容关闭后不卸载」的层）
            default: () => [
              h(
                Drawer,
                { open: true, to: false },
                {
                  default: () => h(Select, { options: [{ label: 'apple', value: 1 }], value: 1 })
                }
              ),
              h(LaterLayer)
            ]
          }
        )
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()

    /** 当前下拉面板的内联层级（无可见面板时为 NaN） */
    const panelZIndex = (): number => {
      const panel = [...document.querySelectorAll('.select-panel-container')].find(
        (el) => (el as HTMLElement).style.display !== 'none'
      )
      return readZIndex(panel?.getAttribute('style') ?? undefined)
    }
    const togglePanel = async (): Promise<void> => {
      ;(document.querySelector('.drawer-wrap .select-content-container') as HTMLElement).click()
      await flush()
    }

    // 展开下拉：面板出现即领取层级，且高于承载层
    await togglePanel()
    const firstPanelZ = panelZIndex()
    expect(firstPanelZ).toBeGreaterThan(
      readZIndex(document.querySelector('.drawer-wrap')?.getAttribute('style') ?? undefined)
    )

    // 模拟「承载层二次打开重新领取层级」：后出现的层落在下拉之上
    laterLayer.allocate()
    const laterZ = laterLayer.zIndex.value
    expect(laterZ).toBeGreaterThan(firstPanelZ)

    // 下拉关闭后再次展开：必须重新领取层级，从而仍位于后出现的层之上（修复前会保持旧层级被压住）
    await togglePanel()
    await togglePanel()
    expect(panelZIndex()).toBeGreaterThan(laterZ)
  })
})

describe('承载层关闭时内部浮层收起（Modal 内嵌 Select）', () => {
  /**
   * 承载层（Modal / Drawer / Dialog）关闭**不卸载内容**，内部 Select 的关闭只依赖 input 的 blur；
   * 而容器关闭只是把内容 `display: none`、不派发 blur，于是下拉会停留在打开态：
   * 容器已关闭、下拉仍悬浮且占着层级槽位。容器再次打开时会按「后出现者在上」重新领取层级，
   * 越过这个仍占位的内部浮层 → 下拉反而落到遮罩之下（真实浏览器实测：面板 1030 < 遮罩 1040 < 弹窗 1050）。
   */
  it('弹窗关闭后下拉随即收起，再次打开下拉仍高于弹窗且层级不随开合增长', async () => {
    const open = ref(false)
    const Host = defineComponent({
      render: () =>
        h(
          ConfigProvider,
          { baseZIndex: 5000 },
          {
            default: () =>
              h(
                Modal,
                {
                  open: open.value,
                  title: '浮层层级验证',
                  'onUpdate:open': (value: boolean) => {
                    open.value = value
                  }
                },
                {
                  default: () => h(Select, { options: [{ label: '北京', value: 1 }], value: 1 })
                }
              )
          }
        )
    })
    /** 等待离场动画结束：v-show + Transition 要等到 leave 完成才落下 display: none */
    const settle = async (): Promise<void> => {
      for (let index = 0; index < 4; index += 1) {
        await nextTick()
        await new Promise((resolve) => setTimeout(resolve, 10))
      }
    }
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await settle()

    /** 当前可见的下拉面板（v-show 隐藏时元素仍在 DOM 中） */
    const visiblePanel = (): HTMLElement | undefined =>
      [...document.querySelectorAll<HTMLElement>('.select-panel-container')].find((el) => el.style.display !== 'none')
    /** 当前可见弹窗外层容器（.modal-wrap）的层级 */
    const visibleWrapZIndex = (): number => {
      const wrap = [...document.querySelectorAll<HTMLElement>('.modal-wrap')].find((el) => el.style.display !== 'none')
      return readZIndex(wrap?.getAttribute('style') ?? undefined)
    }
    const panelZIndex = (): number => readZIndex(visiblePanel()?.getAttribute('style') ?? undefined)
    /** 展开下拉：先派发 mouseenter 模拟真实指针，使 Select 忽略 blur 来源的关闭 */
    const togglePanel = async (): Promise<void> => {
      const trigger = document.querySelector<HTMLElement>('.modal-wrap .select-content-container')!
      trigger.dispatchEvent(new MouseEvent('mouseenter'))
      trigger.click()
      await settle()
    }
    const cycle = async (): Promise<number> => {
      open.value = true
      await settle()
      await togglePanel()
      const z = panelZIndex()
      expect(z).toBeGreaterThan(visibleWrapZIndex())
      // 指针仍停在浮层上时关闭弹窗：下拉必须随之收起（修复前会停留在打开态）
      open.value = false
      await settle()
      expect(visiblePanel()).toBeUndefined()
      return z
    }

    // 反复开合：层级随「同时可见层数」增长，不应随打开次数增长
    const [first, second, third] = [await cycle(), await cycle(), await cycle()]
    expect([second, third]).toEqual([first, first])
  })
})

describe('反馈层默认层级（Message / Notification）', () => {
  /**
   * 反馈层刻意**不占据最高层级**：
   * 高于承载层（Modal 弹窗 1010）、低于甲类浮层（Select 面板 1050 / Tooltip 1070），
   * 这样消息 / 通知内容里放 Select / Tooltip 时，浮层不会被消息框压住。
   * 取值还必须与表中其它族**不打平** —— 同层级时上下关系会退化为 DOM 顺序（源码顺序），顺序不可控。
   */
  it('高于承载层、低于甲类浮层，且与既有族值均不打平', async () => {
    const api = createDiscreteApi(['message', 'notification'])
    api.message.info({ content: 'm', duration: null })
    api.notification.info({ title: 'n', content: 'n', duration: null })
    await new Promise((resolve) => setTimeout(resolve, 50))

    const messageZ = readVarZIndex(
      document.querySelector<HTMLElement>('.message-wrap')?.getAttribute('style'),
      'message-z-index'
    )
    const notificationZ = readVarZIndex(
      document.querySelector<HTMLElement>('.notification-wrap')?.getAttribute('style'),
      'notification-z-index'
    )
    expect(messageZ).toBe(1030)
    expect(notificationZ).toBe(1040)
    expect(messageZ).toBeGreaterThan(1010) // 高于 Modal 弹窗，弹窗打开时反馈仍可见
    expect(notificationZ).toBeGreaterThan(messageZ)
    expect(notificationZ).toBeLessThan(1050) // 低于 Select 面板

    const usedByOthers = [9, 90, 99, 1000, 1010, 1050, 1070, 1080, 1081, 9999]
    expect(usedByOthers).not.toContain(messageZ)
    expect(usedByOthers).not.toContain(notificationZ)
    api.dispose()
  })
})

describe('同层级浮层的上下关系（未注入分配器时）', () => {
  /**
   * 未传 `baseZIndex` 时没有分配器，各浮层保持同一回退值（Tooltip 1070 = 1070）→ 上下由 **DOM 顺序**决定；
   * 承载浮层的 `Teleport` 随「首次展示」才挂载（容器在可见时才 appendChild），
   * 因此 DOM 顺序 = **打开顺序**，即「后打开者在上」（首次打开时确定，此后该实例的来源顺序不再变化）。
   * 这是同族同层级浮层的默认行为；需要显式控制顺序请用 `zIndex` 属性或 baseZIndex 分配器。
   */
  it('由打开顺序决定：后打开者在上', async () => {
    const target = document.createElement('div')
    target.setAttribute('data-va-floating-mount', '')
    document.body.appendChild(target)
    const showA = ref(false)
    const showB = ref(false)
    const Host = defineComponent({
      render: () =>
        h('div', [
          // 源码顺序：A 在前，B 在后 —— 顺序不应由它决定
          h(Tooltip, { tooltip: 'A', show: showA.value, to: target }),
          h(Tooltip, { tooltip: 'B', show: showB.value, to: target })
        ])
    })
    /** 目标容器内各面板的文本，按 DOM 顺序（靠后者在上层） */
    const order = (): string[] =>
      [...target.querySelectorAll('.va-popup-container')].map(
        (el) => el.querySelector('.tooltip-card')?.textContent ?? ''
      )

    // 先 A 后 B：B 后打开 → B 在 DOM 末尾（在上）
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()
    showA.value = true
    await flush()
    showB.value = true
    await flush()
    expect(order()).toEqual(['A', 'B'])
    // 两者层级同值 → 上层完全由 DOM 顺序（= 打开顺序）决定
    const zList = [...target.querySelectorAll<HTMLElement>('.tooltip-card-container')].map((el) =>
      readZIndex(el.getAttribute('style') ?? undefined)
    )
    expect(zList).toEqual([1070, 1070])
    wrapper.unmount()
    await flush()

    // 反向打开顺序（先 B 后 A）：A 后打开 → A 跑到 DOM 末尾（在上），与源码顺序无关
    showA.value = false
    showB.value = false
    await flush()
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()
    showB.value = true
    await flush()
    showA.value = true
    await flush()
    expect(order()).toEqual(['B', 'A'])
    wrapper.unmount()
    await flush()

    // 最关键的一条：**不重挂载**（容器已存在）时反复开合，顺序仍随「最近一次打开」刷新 ——
    // 若只在首次展示时由 Teleport 定位，这里会永远停在旧顺序
    showA.value = false
    showB.value = false
    await flush()
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()
    showA.value = true
    await flush()
    showB.value = true
    await flush()
    expect(order()).toEqual(['A', 'B'])
    // 关闭全部后再次「先 B 后 A」：B 应回到末尾（在上）
    showA.value = false
    showB.value = false
    await flush()
    showB.value = true
    await flush()
    showA.value = true
    await flush()
    expect(order()).toEqual(['B', 'A'])
    wrapper.unmount()
    target.remove()
  })
})

describe('承载层关闭时内部浮层收起（Modal 内嵌 Tooltip）', () => {
  /**
   * 与 Select / AutoComplete 同一不变量：承载层内容常驻不卸载，内部浮层不会随容器消失。
   *
   * 关闭容器的三条路径里，只有「点击 X / 遮罩」会顺带触发 document click 把 click 触发型关掉；
   * **Esc 关闭**（Modal 的 Esc 处理绑定在弹窗主体上，不产生 document click）与 **程序化关闭**
   * （接口回调 / 父状态变更）没有任何指针事件 → 修复前浮层会残留打开态，容器重开时「自己冒出来」。
   */
  it('容器关闭后收起，重开容器不会以打开态出现', async () => {
    const open = ref(true)
    const Host = defineComponent({
      render: () =>
        h(
          Modal,
          {
            open: open.value,
            title: '容器关闭收起',
            'onUpdate:open': (value: boolean) => {
              open.value = value
            }
          },
          {
            default: () => h(Tooltip, { tooltip: 'hi', trigger: 'click' }, { default: () => h('button', 'a') })
          }
        )
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await flush()

    /** 面板自身的内联 display（容器隐藏时仍需自身收起，才能保证重开不残留） */
    const panelDisplay = (): string | undefined =>
      document.querySelector<HTMLElement>('.tooltip-card-container')?.style.display

    // 打开 Tooltip（点击触发器）
    ;(document.querySelector('.modal-container .tooltip-content') as HTMLElement).click()
    await settle()
    expect(panelDisplay()).not.toBe('none')

    // 程序化关闭容器：无指针事件（Esc 关闭同理）
    open.value = false
    await settle()
    expect(panelDisplay()).toBe('none')

    // 重开容器：不应仍处于打开态
    open.value = true
    await settle()
    expect(panelDisplay()).toBe('none')
  })
})

describe('承载层关闭时内部组件的聚焦态归位', () => {
  /**
   * 容器关闭只是把内容 display:none，input 收不到 blur 事件（`focusTriggerAfterClose` 归还焦点时
   * 也未必落到本 input 上）→ 聚焦态残留，容器重开时输入框仍显示聚焦描边。
   */
  it('Select：指针停在触发器上时关闭容器，聚焦描边不残留', async () => {
    const open = ref(true)
    const Host = defineComponent({
      render: () =>
        h(
          Modal,
          {
            open: open.value,
            title: '容器关闭归位',
            'onUpdate:open': (value: boolean) => {
              open.value = value
            }
          },
          { default: () => h(Select, { options: [{ label: '苹果', value: 1 }], value: 1 }) }
        )
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await settle()

    const content = document.querySelector<HTMLElement>('.modal-container .select-content-container')
    expect(content).not.toBeNull()
    ;(content!.querySelector('input') as HTMLInputElement).focus()
    await nextTick()
    // 弹窗内容 Teleport 到 body，须从 document 查询
    const selectWrap = document.querySelector<HTMLElement>('.modal-container .select-wrap')
    expect(selectWrap?.classList.contains('select-focused')).toBe(true)

    open.value = false
    await settle()
    expect(selectWrap?.classList.contains('select-focused')).toBe(false)

    open.value = true
    await settle()
    expect(selectWrap?.classList.contains('select-focused')).toBe(false)
  })

  it('AutoComplete：同上，auto-complete-focused 不残留', async () => {
    const open = ref(true)
    const Host = defineComponent({
      render: () =>
        h(
          Modal,
          {
            open: open.value,
            title: '容器关闭归位',
            'onUpdate:open': (value: boolean) => {
              open.value = value
            }
          },
          { default: () => h(AutoComplete, { value: 'app', options: [{ value: 'apple', label: 'apple' }] }) }
        )
    })
    wrapper = mount(Host, { attachTo: document.body, global: { stubs: { transition: false } } })
    await settle()

    const content = document.querySelector<HTMLElement>('.modal-container .auto-complete-content')
    expect(content).not.toBeNull()
    ;(content!.querySelector('input') as HTMLInputElement).focus()
    await nextTick()
    const autoCompleteWrap = document.querySelector<HTMLElement>('.modal-container .auto-complete-wrap')
    expect(autoCompleteWrap?.classList.contains('auto-complete-focused')).toBe(true)

    open.value = false
    await settle()
    expect(autoCompleteWrap?.classList.contains('auto-complete-focused')).toBe(false)

    open.value = true
    await settle()
    expect(autoCompleteWrap?.classList.contains('auto-complete-focused')).toBe(false)
  })
})

describe('Image 全屏预览的分层（遮罩 1070 / 预览 1080）', () => {
  it('遮罩与预览保持同族 +10 的相对层级，且高于 Modal / Drawer', () => {
    wrapper = mount(Image, { attachTo: document.body, props: { src: 'a.png' } })
    // v-show 隐藏时元素仍在，内联层级已就绪
    expect(readZIndex(wrapper.find('.preview-mask').attributes('style'))).toBe(1070)
    expect(readZIndex(wrapper.find('.preview-container').attributes('style'))).toBe(1080)
  })

  it('传入 baseZIndex 后由管理层分配，两者仍相差 10', async () => {
    const imageRef = ref<InstanceType<typeof Image> | null>(null)
    const Host = defineComponent({
      render: () =>
        h(
          ConfigProvider,
          { baseZIndex: 5000 },
          {
            default: () => h(Image, { ref: imageRef, src: 'a.png' })
          }
        )
    })
    wrapper = mount(Host, { attachTo: document.body })
    await nextTick()
    // 未打开预览：不持有槽位，沿用默认层级（挂载即领取会让未显示的预览无谓抬高后续分配点）
    expect(readZIndex(wrapper.find('.preview-mask').attributes('style'))).toBe(1070)

    // 打开预览：由管理层分配，遮罩与预览仍相差 10
    await imageRef.value?.preview(0)
    await nextTick()
    expect(readZIndex(wrapper.find('.preview-mask').attributes('style'))).toBe(5000)
    expect(readZIndex(wrapper.find('.preview-container').attributes('style'))).toBe(5010)
  })
})
