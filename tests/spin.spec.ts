import { afterEach, describe, expect, it, vi } from 'vitest'
import { Transition, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { TinyColor } from '@ctrl/tinycolor'
import Spin from 'components/spin'

/**
 * `<Spin>` 回归守护
 *
 * - **点阵族几何**：离散元素的位置（角度）与相位（时间）同源于索引 k，一层 DOM 即生成均匀点阵 ——
 *   不存在「两层拼凑」与「对齐补偿类」，`--spin-point-index` 缺失即整套点阵失效；
 * - **文案两条路径同构**：`tip` 属性与 `tip` 插槽只影响文案来源，渲染结果完全一致；
 * - **圆环参数钳制**：`spinCircleWidth` 收敛到 (0, 100)、`spinCirclePercent` 收敛到 [0, 100]，
 *   越界值不得产出非法 path（负半径）或非法 dasharray；
 * - **自定义指示符**：`indicator` 传 VNode / 渲染函数或 `#indicator` 插槽时替代内置指示符（插槽优先），
 *   传 `null` 表示不渲染指示符；
 * - **delay**：显示延迟（含首次挂载）、隐藏立即；内容变淡与遮罩同步延迟；卸载后不再持有延迟定时器；
 * - **可访问性**：根节点 `aria-busy` 跟随 `spinning`，无文案时指示符为 `img` 并带名称、
 *   有文案时遮罩为 `status` 区域。
 */

/** 读遮罩的内联 `display` 判断显隐：`v-show` 的实现细节，且不依赖 test-utils 的 `isVisible` 在各 DOM 实现下的差异 */
function containerShown(wrapper: ReturnType<typeof mount>): boolean {
  const style = wrapper.find('.spin-container').attributes('style') ?? ''
  return !style.includes('display: none')
}

/** 取各离散元素上的索引变量值：位置与相位均由它推导 */
function pointIndexes(wrapper: ReturnType<typeof mount>): (number | undefined)[] {
  return wrapper.findAll('.point').map((point) => {
    const style = point.attributes('style') ?? ''
    const matched = /--spin-point-index:\s*(\d+)/.exec(style)
    return matched ? Number(matched[1]) : undefined
  })
}

/** 读根节点注入的内联 CSS 变量值（动画周期 / 配色默认值断言用） */
function spinStyleVar(wrapper: ReturnType<typeof mount>, name: string): string {
  const style = wrapper.find('.spin-wrap').attributes('style') ?? ''
  const matched = new RegExp(`${name}:\\s*([^;]+)`).exec(style)
  return matched ? matched[1].trim() : ''
}

describe('Spin - 点阵族：位置与相位同源于索引', () => {
  it('元素数量与索引：dot 为 4，点轮 / 线轮为 8，索引连续从 1 起', () => {
    const dot = mount(Spin, { props: { indicator: 'dot' } })
    const dotWheel = mount(Spin, { props: { indicator: 'dot-wheel' } })
    const lineWheel = mount(Spin, { props: { indicator: 'line-wheel' } })

    expect(pointIndexes(dot)).toEqual([1, 2, 3, 4])
    expect(pointIndexes(dotWheel)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    expect(pointIndexes(lineWheel)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    expect(dot.find('.spin-points-box').classes()).toEqual(['spin-points-box', 'spin-points-dot'])
    expect(dotWheel.find('.spin-points-box').classes()).toEqual(['spin-points-box', 'spin-points-dot-wheel'])
    expect(lineWheel.find('.spin-points-box').classes()).toEqual(['spin-points-box', 'spin-points-line-wheel'])
  })
})

describe('Spin - 文案两条路径渲染同构', () => {
  it('tip 属性与 tip 插槽：渲染结果完全同构', () => {
    const byProp = mount(Spin, { props: { indicator: 'dot-wheel', tip: '加载中' } })
    const bySlot = mount(Spin, { props: { indicator: 'dot-wheel' }, slots: { tip: '加载中' } })

    expect(bySlot.find('.spin-points-box').classes()).toEqual(byProp.find('.spin-points-box').classes())
    // 文案只影响文案来源，指示符结构不受影响
    expect(bySlot.find('.spin-tip').text()).toBe(byProp.find('.spin-tip').text())
    expect(bySlot.find('.spin-box').html()).toBe(byProp.find('.spin-box').html())
  })

  it('仅 tip 插槽时同样渲染文案', () => {
    const wrapper = mount(Spin, { props: { indicator: 'line-wheel' }, slots: { tip: '加载中' } })
    expect(wrapper.find('.spin-tip').exists()).toBe(true)
  })
})

describe('Spin - 圆环参数钳制', () => {
  it('spinCircleWidth 上界收敛：120 与 99 渲染一致', () => {
    const overflow = mount(Spin, { props: { indicator: 'ring-circle', spinCircleWidth: 120 } })
    const clamped = mount(Spin, { props: { indicator: 'ring-circle', spinCircleWidth: 99 } })
    expect(overflow.find('path').attributes('d')).toBe(clamped.find('path').attributes('d'))
    expect(overflow.find('path').attributes('style')).toBe(clamped.find('path').attributes('style'))
  })

  it('spinCircleWidth 下界收敛：0 与 1 渲染一致', () => {
    const zero = mount(Spin, { props: { indicator: 'ring-circle', spinCircleWidth: 0 } })
    const clamped = mount(Spin, { props: { indicator: 'ring-circle', spinCircleWidth: 1 } })
    expect(zero.find('path').attributes('d')).toBe(clamped.find('path').attributes('d'))
  })

  it('spinCirclePercent 越界收敛：-20 取 0、150 取 100', () => {
    const negative = mount(Spin, { props: { indicator: 'ring-circle', spinCirclePercent: -20 } })
    const zero = mount(Spin, { props: { indicator: 'ring-circle', spinCirclePercent: 0 } })
    expect(negative.find('path').attributes('style')).toBe(zero.find('path').attributes('style'))
    expect(negative.find('path').attributes('style')).toContain('stroke-dasharray: 0px')

    const overflow = mount(Spin, { props: { indicator: 'ring-rail', spinCirclePercent: 150 } })
    const full = mount(Spin, { props: { indicator: 'ring-rail', spinCirclePercent: 100 } })
    const overflowStyles = overflow.findAll('path').map((path) => path.attributes('style'))
    expect(overflowStyles).toEqual(full.findAll('path').map((path) => path.attributes('style')))
  })
})

describe('Spin - 动画周期与配色默认值', () => {
  it('speed 不传时按指示符派生：翻转双环 1500ms、点轮 / 线轮 800ms', () => {
    expect(spinStyleVar(mount(Spin, { props: { indicator: 'magic-ring' } }), '--spin-speed')).toBe('1500ms')
    expect(spinStyleVar(mount(Spin, { props: { indicator: 'dot-wheel' } }), '--spin-speed')).toBe('800ms')
    expect(spinStyleVar(mount(Spin, { props: { indicator: 'line-wheel' } }), '--spin-speed')).toBe('800ms')
  })

  it('speed 显式传入时三种指示符取值一致，非正值收敛到 1ms（避免无效 animation-duration）', () => {
    expect(spinStyleVar(mount(Spin, { props: { indicator: 'magic-ring', speed: 600 } }), '--spin-speed')).toBe('600ms')
    expect(spinStyleVar(mount(Spin, { props: { indicator: 'dot-wheel', speed: 600 } }), '--spin-speed')).toBe('600ms')
    expect(spinStyleVar(mount(Spin, { props: { indicator: 'magic-ring', speed: 0 } }), '--spin-speed')).toBe('1ms')
    expect(spinStyleVar(mount(Spin, { props: { indicator: 'magic-ring', speed: -100 } }), '--spin-speed')).toBe('1ms')
  })

  it('翻转双环内环默认取更深一档色阶，显式传入 magicRingColor 时以其为准', () => {
    const wrapper = mount(Spin, { props: { indicator: 'magic-ring' } })
    const outer = spinStyleVar(wrapper, '--spin-primary-color')
    const inner = spinStyleVar(wrapper, '--spin-magic-ring-color')

    // 内环默认色与外环同源但更深（色阶深一档），保证两环在同色系下仍有层次
    expect(inner).not.toBe(outer)
    expect(new TinyColor(inner).getLuminance()).toBeLessThan(new TinyColor(outer).getLuminance())

    const custom = mount(Spin, { props: { indicator: 'magic-ring', magicRingColor: '#123456' } })
    expect(spinStyleVar(custom, '--spin-magic-ring-color')).toBe('#123456')
  })

  it('spinCircleWidth 不传时按指示符派生：翻转双环 13、单环 12；翻转双环上限收敛到 26（保证内环仍呈环形）', () => {
    expect(spinStyleVar(mount(Spin, { props: { indicator: 'magic-ring' } }), '--spin-circle-width')).toBe('13')
    expect(spinStyleVar(mount(Spin, { props: { indicator: 'ring-circle' } }), '--spin-circle-width')).toBe('12')
    expect(
      spinStyleVar(mount(Spin, { props: { indicator: 'magic-ring', spinCircleWidth: 40 } }), '--spin-circle-width')
    ).toBe('26')
  })
})

describe('Spin - 宽度贴合内容（fitContent）', () => {
  it('仅开启而无内容时不收缩：无内容时 fit-content 会让根节点塌陷为 0', () => {
    expect(mount(Spin, { props: { fitContent: true } }).classes()).not.toContain('spin-fit-content')
  })

  it('仅提供内容而未开启时不收缩：默认行为保持「根节点铺满父容器」', () => {
    expect(mount(Spin, { slots: { default: '内容' } }).classes()).not.toContain('spin-fit-content')
  })

  it('开启且有内容时根节点收缩，遮罩与指示符随内容居中', () => {
    const wrapper = mount(Spin, { props: { fitContent: true }, slots: { default: '内容' } })
    expect(wrapper.classes()).toContain('spin-fit-content')
    expect(wrapper.find('.spin-container').exists()).toBe(true)
  })
})

describe('Spin - 可访问性', () => {
  it('根节点 aria-busy 跟随 spinning', async () => {
    const wrapper = mount(Spin, { props: { spinning: true } })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    await wrapper.setProps({ spinning: false })
    expect(wrapper.attributes('aria-busy')).toBe('false')
  })

  it('有文案时遮罩为 status 区域，无文案时无 role', () => {
    const withTip = mount(Spin, { props: { tip: '加载中' } })
    const withoutTip = mount(Spin)
    expect(withTip.find('.spin-container').attributes('role')).toBe('status')
    expect(withoutTip.find('.spin-container').attributes('role')).toBeUndefined()
  })

  it('无文案时指示符自身为 img 并带名称，有文案时交回状态区域播报', () => {
    // 无文案时指示符是唯一的加载信号，需自带可访问名称
    const withoutTip = mount(Spin)
    expect(withoutTip.find('.spin-box').attributes('role')).toBe('img')
    expect(withoutTip.find('.spin-box').attributes('aria-label')).toBe('加载中')

    // 有文案时若仍标 img，会在状态区域内重复播报一遍名称，故不再标记
    const withTip = mount(Spin, { props: { tip: '加载中' } })
    expect(withTip.find('.spin-box').attributes('role')).toBeUndefined()
    expect(withTip.find('.spin-box').attributes('aria-label')).toBeUndefined()
  })
})

describe('Spin - delay 延迟显示', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('显示延迟、隐藏立即生效', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Spin, { props: { spinning: false, delay: 500 } })
    expect(containerShown(wrapper)).toBe(false)

    await wrapper.setProps({ spinning: true })
    // 未到 delay 时长前不展示
    expect(containerShown(wrapper)).toBe(false)

    vi.advanceTimersByTime(500)
    await nextTick()
    expect(containerShown(wrapper)).toBe(true)

    // 隐藏不等待 delay
    await wrapper.setProps({ spinning: false })
    expect(containerShown(wrapper)).toBe(false)
  })

  it('内容变淡与遮罩同步：延迟窗口内不变淡，出现与撤销同时', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Spin, { props: { spinning: false, delay: 500 } })
    await wrapper.setProps({ spinning: true })
    // 延迟窗口内：遮罩与指示符都未出现，内容也不应变淡（否则会出现「灰底先于指示符」的不一致）
    expect(containerShown(wrapper)).toBe(false)
    expect(wrapper.find('.spin-content').classes()).not.toContain('spin-blur')

    vi.advanceTimersByTime(500)
    await nextTick()
    expect(containerShown(wrapper)).toBe(true)
    expect(wrapper.find('.spin-content').classes()).toContain('spin-blur')

    // 隐藏立即：两者一并撤销
    await wrapper.setProps({ spinning: false })
    expect(containerShown(wrapper)).toBe(false)
    expect(wrapper.find('.spin-content').classes()).not.toContain('spin-blur')
  })

  it('delay 为 0 时立即展示', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Spin, { props: { spinning: false, delay: 0 } })
    await wrapper.setProps({ spinning: true })
    await nextTick()
    expect(containerShown(wrapper)).toBe(true)
  })

  it('卸载后不再持有延迟定时器', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Spin, { props: { spinning: false, delay: 500 } })
    await wrapper.setProps({ spinning: true })
    expect(vi.getTimerCount()).toBe(1)
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('首次挂载即处于 spinning 且设有 delay：同样要等满延迟才展示', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Spin, { props: { spinning: true, delay: 500 } })
    expect(containerShown(wrapper)).toBe(false)

    vi.advanceTimersByTime(500)
    await nextTick()
    expect(containerShown(wrapper)).toBe(true)
  })

  it('首次挂载即处于 spinning 且 delay 为 0：立即展示', () => {
    const wrapper = mount(Spin, { props: { spinning: true, delay: 0 } })
    expect(containerShown(wrapper)).toBe(true)
  })
})

describe('Spin - 自定义指示符', () => {
  it('indicator 传 VNode：渲染该 VNode 并替代内置指示符', () => {
    const wrapper = mount(Spin, { props: { indicator: h('i', { class: 'by-prop' }) } })
    expect(wrapper.find('.spin-indicator .by-prop').exists()).toBe(true)
    // 内置指示符（默认 dot 为点阵族）不应同时渲染
    expect(wrapper.find('.spin-points-box').exists()).toBe(false)
  })

  it('indicator 传渲染函数：同样渲染为自定义指示符', () => {
    const wrapper = mount(Spin, { props: { indicator: () => h('i', { class: 'by-fn' }) } })
    expect(wrapper.find('.spin-indicator .by-fn').exists()).toBe(true)
  })

  it('#indicator 插槽优先于 indicator 传入的 VNode', () => {
    const wrapper = mount(Spin, {
      props: { indicator: h('i', { class: 'by-prop' }) },
      slots: { indicator: () => h('i', { class: 'by-slot' }) }
    })
    expect(wrapper.find('.spin-indicator .by-slot').exists()).toBe(true)
    expect(wrapper.find('.spin-indicator .by-prop').exists()).toBe(false)
  })

  it('#indicator 插槽整替代内置指示符：不与 indicator 的默认值同时渲染', () => {
    const wrapper = mount(Spin, { slots: { indicator: () => h('i', { class: 'by-slot' }) } })
    expect(wrapper.find('.spin-indicator .by-slot').exists()).toBe(true)
    // 未传 indicator 时其默认值为 'dot'，若不整体替代，点阵会与插槽内容叠在一起
    expect(wrapper.find('.spin-points-box').exists()).toBe(false)
  })

  it('indicator 传 null：不渲染任何指示符', () => {
    const wrapper = mount(Spin, { props: { indicator: null } })
    expect(wrapper.find('.spin-indicator').exists()).toBe(false)
    expect(wrapper.find('.spin-points-box').exists()).toBe(false)
  })

  it('不传 indicator 时仍走内置默认指示符，不产生自定义指示符容器', () => {
    const wrapper = mount(Spin)
    expect(wrapper.find('.spin-indicator').exists()).toBe(false)
    expect(wrapper.find('.spin-points-box').exists()).toBe(true)
  })
})

describe('Spin - 指示符进出场过渡', () => {
  it('遮罩由 <Transition> 包裹，淡入淡出交由过渡类驱动', () => {
    const wrapper = mount(Spin)
    expect(wrapper.findComponent(Transition).exists()).toBe(true)
  })
})
