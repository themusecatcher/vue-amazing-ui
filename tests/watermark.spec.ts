import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import Watermark from 'components/watermark/Watermark.vue'
import ConfigProvider from 'components/config-provider/ConfigProvider.vue'
import { resetLogDedup } from 'components/utils/log'

/**
 * 回归守护：Watermark 的防篡改 MutationObserver 观察目标必须跟随 fullscreen 变化。
 *
 * 背景：appendWatermark 用 append() 移动同一个水印节点，fullscreen 由 false 切为 true 时
 * 水印节点会从容器搬到 <html> 下。若观察目标在 setup 阶段被固化（三元表达式只求值一次），
 * 节点搬家后观察者仍盯旧节点，此后删除水印不会被发现 —— 防篡改失效。
 *
 * 用例设计：第 1 例为控制组（不切 fullscreen），用于证明「本测试确实能观测到水印被删除后的重建」，
 * 避免第 2 例因环境不支持 MutationObserver 而假通过；第 2 例才是回归守护本身。
 *
 * 环境补丁：happy-dom 未挂载 canvas adapter，HTMLCanvasElement.getContext 返回 null，
 * 组件会跳过整个绘制分支从而不生成水印节点，故注入最小 2D 上下文桩。
 */
const WATERMARK_STYLE_FLAG = 'background-image'
const realGetContextDescriptor = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, 'getContext')

interface CanvasContextStub {
  font: string
  fillStyle: string
  globalAlpha: number
  textAlign: string
  textBaseline: string
  measureText: ReturnType<typeof vi.fn>
  save: ReturnType<typeof vi.fn>
  restore: ReturnType<typeof vi.fn>
  translate: ReturnType<typeof vi.fn>
  rotate: ReturnType<typeof vi.fn>
  fillText: ReturnType<typeof vi.fn>
  drawImage: ReturnType<typeof vi.fn>
  setTransform: ReturnType<typeof vi.fn>
  clearRect: ReturnType<typeof vi.fn>
}
// 用例可读取最近一次绘制用的填充色，用于断言「默认色跟随主题」
let canvasContext: CanvasContextStub

function installCanvasStub(): void {
  canvasContext = {
    font: '',
    fillStyle: '',
    globalAlpha: 1,
    textAlign: 'center',
    textBaseline: 'top',
    // 按文本长度给出宽度：多行对齐用例需要区分行长，全等宽会让三档对齐退化成同一结果
    measureText: vi.fn((text: string) => ({ width: String(text ?? '').length * 10 })),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    fillText: vi.fn(),
    drawImage: vi.fn(),
    setTransform: vi.fn(),
    clearRect: vi.fn()
  }
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: () => canvasContext
  })
}

function restoreCanvasEnv(): void {
  if (realGetContextDescriptor) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', realGetContextDescriptor)
  }
}

// 水印节点无 class/id，仅以内联 style 承载背景图，故按 style 内容识别
function findWatermarks(root: ParentNode): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>('div')).filter((el) =>
    (el.getAttribute('style') ?? '').includes(WATERMARK_STYLE_FLAG)
  )
}

// 依次推进 Vue 更新队列（nextTick）与 MutationObserver 的微任务投递；
// 宏任务一轮用于释放 appendWatermark 里 setTimeout 控制的 stopObservation 抑制窗口
async function flushAll(): Promise<void> {
  for (let n = 0; n < 3; n++) {
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
  }
}

beforeEach(() => {
  installCanvasStub()
})

afterEach(() => {
  restoreCanvasEnv()
  document.documentElement.style.removeProperty('--watermark-probe')
  document.documentElement.style.removeProperty('position')
  // 失败用例可能未走到 unmount，兜底清掉遗留水印节点，避免污染后续用例
  findWatermarks(document.documentElement).forEach((el) => el.remove())
})

describe('Watermark 防篡改观察目标应跟随 fullscreen 变化', () => {
  it('控制组：fullscreen 为 false 时，删除水印节点应被重建', async () => {
    const wrapper = mount(Watermark, { attachTo: document.body, props: { content: 'test' } })
    await flushAll()

    const container = wrapper.element as HTMLElement
    const [watermarkNode] = findWatermarks(container)
    // 前置校验：节点确实挂在容器下，否则本用例未覆盖目标场景
    expect(watermarkNode?.parentElement).toBe(container)

    watermarkNode.remove()
    await flushAll()

    expect(findWatermarks(container)).toHaveLength(1)
    wrapper.unmount()
  })

  it('fullscreen 由 false 切为 true 后，删除水印节点应被重建', async () => {
    const wrapper = mount(Watermark, { attachTo: document.body, props: { content: 'test' } })
    await flushAll()

    await wrapper.setProps({ fullscreen: true })
    await flushAll()

    // 前置校验：运行期切换 fullscreen 后节点确实被搬到了 <html> 下（证明组件支持运行期切换，用例未假通过）
    const [movedNode] = findWatermarks(document.documentElement)
    expect(movedNode?.parentElement).toBe(document.documentElement)

    movedNode.remove()
    await flushAll()

    // 观察目标若未跟随 fullscreen 重建，这里会为 0 —— 水印被删后不再恢复
    expect(findWatermarks(document.documentElement)).toHaveLength(1)
    wrapper.unmount()
  })

  it('全屏水印不修改宿主 <html> 的内联样式（不覆盖其已有样式）', async () => {
    document.documentElement.style.setProperty('--watermark-probe', '1')

    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { content: 'test', fullscreen: true }
    })
    await flushAll()
    // 全屏水印使用 fixed 定位 / 固定视口层，无需给 <html> 写 position
    expect(document.documentElement.style.position).toBe('')
    expect(document.documentElement.style.getPropertyValue('--watermark-probe')).toBe('1')

    await wrapper.setProps({ fullscreen: false })
    await flushAll()
    expect(document.documentElement.style.position).toBe('')

    await wrapper.setProps({ fullscreen: true })
    await flushAll()
    expect(document.documentElement.style.position).toBe('')

    wrapper.unmount()
    await flushAll()
    expect(document.documentElement.style.getPropertyValue('--watermark-probe')).toBe('1')
  })

  it('全屏水印恒为 fixed 定位，高度不随文档总高铺开', async () => {
    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { fullscreen: true, content: 'test' }
    })
    await flushAll()

    const [fixedNode] = findWatermarks(document.documentElement)
    expect(fixedNode?.parentElement).toBe(document.documentElement)
    expect(fixedNode?.style.position).toBe('fixed')
    // 视口层高度恒为 100%：不再读取文档 scrollHeight，也就没有「高度只读一次」的陈旧值问题
    expect(fixedNode?.style.height).toBe('100%')

    await wrapper.setProps({ fullscreen: false })
    await flushAll()
    expect(fixedNode?.style.position).toBe('absolute')

    wrapper.unmount()
    await flushAll()
    expect(findWatermarks(document.documentElement)).toHaveLength(0)
  })

  it('非全屏时不应改动 <html> 上已有的 position（只撤销自己写入的值）', async () => {
    document.documentElement.style.position = 'absolute'

    const wrapper = mount(Watermark, { attachTo: document.body, props: { content: 'test' } })
    await flushAll()
    expect(document.documentElement.style.position).toBe('absolute')

    wrapper.unmount()
    await flushAll()
    expect(document.documentElement.style.position).toBe('absolute')
  })
})

/**
 * 绘制层约束：
 * - 水印层被篡改（改写 style）后必须重建，且重建后的节点仍是装饰层（`aria-hidden`）；
 * - canvas 必须复用，否则每次重绘都在分配后备缓冲区；
 * - 根容器是局部水印的定位基准，水印层必须挂在它下面。
 */
describe('Watermark 绘制层约束', () => {
  it('水印层被改写 style 后应被重建', async () => {
    const wrapper = mount(Watermark, { attachTo: document.body, props: { content: 'test' } })
    await flushAll()

    const container = wrapper.element as HTMLElement
    const [node] = findWatermarks(container)
    node.setAttribute('style', 'display: none')
    await flushAll()

    const [rebuilt] = findWatermarks(container)
    expect(rebuilt).toBeTruthy()
    expect(rebuilt.style.display).toBe('')
    expect(rebuilt.getAttribute('aria-hidden')).toBe('true')
    wrapper.unmount()
  })

  it('连续重绘复用同一个 canvas', async () => {
    const createSpy = vi.spyOn(document, 'createElement')
    const wrapper = mount(Watermark, { attachTo: document.body, props: { content: 'test' } })
    await flushAll()

    await wrapper.setProps({ rotate: -10 })
    await flushAll()
    await wrapper.setProps({ rotate: 10 })
    await flushAll()

    const canvasCount = createSpy.mock.calls.filter(([tag]) => tag === 'canvas').length
    expect(canvasCount).toBe(1)
    createSpy.mockRestore()
    wrapper.unmount()
  })

  // 断言真实契约而不仅是类名字符串：容器是绝对定位水印层的定位基准，水印层必须挂在容器下且不拦截交互；
  // 类名只作内部标记（BEM 前缀约定见 development/component-design.md），故仅附带校验
  it('根节点为定位容器，水印层挂在其下且对辅助技术隐藏', async () => {
    const wrapper = mount(Watermark, { attachTo: document.body, props: { content: 'test' } })
    await flushAll()

    const container = wrapper.element as HTMLElement
    expect(container.classList.contains('watermark-wrap')).toBe(true)
    expect(container.style.position).toBe('relative')

    const [node] = findWatermarks(container)
    expect(node).toBeTruthy()
    expect(node.parentElement).toBe(container)
    expect(node.getAttribute('aria-hidden')).toBe('true')
    expect(node.style.pointerEvents).toBe('none')
    wrapper.unmount()
  })
})

/**
 * 单元格几何与默认值：
 * - `offset` 缺省时按文档约定取 `gap / 2`（不再被写死的 [50, 50] 兜住）；
 * - 图片水印的单元格宽高按原图比例推算，避免任意比例图片被拉伸。
 */
describe('Watermark 单元格几何与默认值', () => {
  it('未传 offset 时按 gap / 2 计算，无需内缩补偿', async () => {
    const wrapper = mount(Watermark, { attachTo: document.body, props: { content: 'test', gap: [200, 200] } })
    await flushAll()

    const [node] = findWatermarks(wrapper.element as HTMLElement)
    // offset = gap / 2 → 偏移补偿量为 0；若仍按写死的 [50, 50] 计算，这里会是 -50px -50px
    expect(node.getAttribute('style')).toContain('background-position: 0px 0px')
    wrapper.unmount()
  })

  it('显式传 offset: [0, 0] 时不被默认值兜底', async () => {
    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { content: 'test', gap: [200, 200], offset: [0, 0] }
    })
    await flushAll()

    const [node] = findWatermarks(wrapper.element as HTMLElement)
    // 0 是合法取值，不可被 ?? 之外的兜底逻辑改写
    expect(node.getAttribute('style')).toContain('background-position: -100px -100px')
    wrapper.unmount()
  })
})

/**
 * 多行文字排版：`textStyle.lineHeight` 必须同时驱动行高与单元格高度（否则多行被裁切）；
 * `textStyle.textAlign` 只影响多行，三档对齐共用一套坐标。
 */
describe('Watermark 多行文字排版', () => {
  it('textAlign=left 时两行起点相同，center 时按行宽居中', async () => {
    const leftWrapper = mount(Watermark, {
      attachTo: document.body,
      props: { content: ['Vue Amazing UI', 'Hello World'], textStyle: { textAlign: 'left' } }
    })
    await flushAll()
    const [firstLine, secondLine] = canvasContext.fillText.mock.calls
    expect(firstLine[1]).toBe(secondLine[1])
    leftWrapper.unmount()

    canvasContext.fillText.mockClear()
    const centerWrapper = mount(Watermark, {
      attachTo: document.body,
      props: { content: ['Vue Amazing UI', 'Hello World'], textStyle: { textAlign: 'center' } }
    })
    await flushAll()
    const centerCalls = canvasContext.fillText.mock.calls
    // 第一行更长 → 起点更靠左；短行居中后 x 变大
    expect(centerCalls[1][1]).toBeGreaterThan(centerCalls[0][1])
    centerWrapper.unmount()
  })

  it('fontVariant 进入 font 简写，缺省为 normal', async () => {
    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { content: 'Vue Amazing UI', textStyle: { fontVariant: 'small-caps' } }
    })
    await flushAll()
    expect(canvasContext.font).toContain('small-caps')
    wrapper.unmount()

    const plainWrapper = mount(Watermark, { attachTo: document.body, props: { content: 'Vue Amazing UI' } })
    await flushAll()
    expect(canvasContext.font).not.toContain('small-caps')
    plainWrapper.unmount()
  })

  it('行高缺省时按字号等比（fontSize × 1.2）', async () => {
    const ratio = window.devicePixelRatio || 1
    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { content: ['A', 'B'], textStyle: { fontSize: 40 } }
    })
    await flushAll()

    const [firstLine, secondLine] = canvasContext.fillText.mock.calls
    // 40 × 1.2 = 48；若沿用固定的 fontSize + 3，这里会是 43
    expect(secondLine[2] - firstLine[2]).toBe(48 * ratio)
    wrapper.unmount()
  })

  it('lineHeight 同时驱动行高与单元格高度', async () => {
    const ratio = window.devicePixelRatio || 1
    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { content: ['A', 'B'], textStyle: { fontSize: 16, lineHeight: 40 } }
    })
    await flushAll()

    const [firstLine, secondLine] = canvasContext.fillText.mock.calls
    expect(secondLine[2] - firstLine[2]).toBe(40 * ratio)

    // 第二次重绘尺寸不变 → acquireCanvas 走 clearRect 分支，可读到实际位图尺寸
    await wrapper.setProps({ rotate: -21 })
    await flushAll()
    const clearCalls = canvasContext.clearRect.mock.calls
    // 单元格高 = 首行字高 16 + 1 行 × 行距 40 = 56；位图高 = (gapY 100 + 56) × ratio × 2 格
    expect(clearCalls[clearCalls.length - 1][3]).toBe(Math.round((100 + 56) * ratio * 2))
    wrapper.unmount()
  })
})

/**
 * 图片水印走异步加载，需保证「加载失败有提示」与「后到的旧回调不覆盖新水印」。
 * happy-dom 无图片解码能力，故用最小 Image 桩手动控制 onload / onerror 时序。
 */
describe('Watermark 图片水印的异步行为', () => {
  class FakeImage {
    static instances: FakeImage[] = []
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    crossOrigin = ''
    referrerPolicy = ''
    src = ''
    naturalWidth = 0
    naturalHeight = 0
    constructor() {
      FakeImage.instances.push(this)
    }
  }

  // 模拟图片加载完成：先给原图尺寸再触发 onload（单元格宽高依赖它）
  function loadImage(index: number, naturalWidth: number, naturalHeight: number) {
    const img = FakeImage.instances[index]
    img.naturalWidth = naturalWidth
    img.naturalHeight = naturalHeight
    img.onload?.()
  }

  beforeEach(() => {
    FakeImage.instances = []
    resetLogDedup()
    vi.stubGlobal('Image', FakeImage)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('图片加载失败只告警，不生成水印节点也不抛错', async () => {
    const debugSpy = vi.spyOn(console, 'debug')
    const wrapper = mount(Watermark, { attachTo: document.body, props: { image: 'https://example.com/a.png' } })
    await flushAll()

    // 前置校验：确实走到了图片分支，否则本用例未覆盖目标场景
    expect(FakeImage.instances).toHaveLength(1)
    expect(() => FakeImage.instances[0].onerror?.()).not.toThrow()
    await flushAll()

    expect(findWatermarks(document.body)).toHaveLength(0)
    expect(debugSpy).toHaveBeenCalled()
    debugSpy.mockRestore()
    wrapper.unmount()
  })

  it('快速改 props 时，后到的旧图片回调不覆盖新水印', async () => {
    const toDataUrlSpy = vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL')
    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { image: 'https://example.com/a.png', rotate: -22 }
    })
    await flushAll()
    await wrapper.setProps({ rotate: 0 })
    await flushAll()

    // 两次 props 各发起一次加载，回调按「新 → 旧」顺序到达
    expect(FakeImage.instances).toHaveLength(2)
    loadImage(1, 100, 100)
    loadImage(0, 100, 100)

    // 旧回调被丢弃，只落地一次图案
    expect(toDataUrlSpy).toHaveBeenCalledTimes(1)
    expect(findWatermarks(document.body)).toHaveLength(1)
    toDataUrlSpy.mockRestore()
    wrapper.unmount()
  })

  it('未指定宽高时按原图比例等比缩放，不拉伸', async () => {
    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { image: 'https://example.com/a.png', gap: [100, 100] }
    })
    await flushAll()

    loadImage(0, 200, 100) // 2:1 → 缩到默认单元格内 → 120 × 60
    await flushAll()

    const [node] = findWatermarks(document.body)
    // background-size = (gap 100 + 单元格宽 120) × 2 格
    expect(node.style.backgroundSize).toBe('440px')
    wrapper.unmount()
  })

  it('只给 width 时按原图比例补 height', async () => {
    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { image: 'https://example.com/a.png', width: 48, gap: [100, 100] }
    })
    await flushAll()

    loadImage(0, 200, 100) // 2:1 → height = 24
    await flushAll()

    const [node] = findWatermarks(document.body)
    expect(node.style.backgroundSize).toBe('296px')
    wrapper.unmount()
  })

  it('imageOpacity 作用于图片绘制，且不泄漏到文字水印', async () => {
    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { image: 'https://example.com/a.png', imageOpacity: 0.5 }
    })
    await flushAll()

    loadImage(0, 100, 100)
    expect(canvasContext.globalAlpha).toBe(0.5)

    // canvas 是复用的：切回文字水印后透明度必须复位，否则整块水印被淡化
    await wrapper.setProps({ image: undefined, content: 'test' })
    await flushAll()
    expect(canvasContext.globalAlpha).toBe(1)
    wrapper.unmount()
  })
})

/**
 * 默认色跟随主题（取 `--va-fill-color-3`）：
 * 浅色 rgba(0,0,0,.15) / 暗色 rgba(255,255,255,.18)，取自 Provider 的只读快照。
 */
describe('Watermark 默认色跟随主题', () => {
  it('浅色使用 --va-fill-color-3（rgba(0, 0, 0, 0.15)）', async () => {
    const wrapper = mount(ConfigProvider, {
      attachTo: document.body,
      props: { theme: { mode: 'light' } },
      slots: { default: () => h(Watermark, { content: 'test' }) }
    })
    await flushAll()

    expect(canvasContext.fillStyle).toBe('rgba(0, 0, 0, 0.15)')
    wrapper.unmount()
    await flushAll()
  })

  it('暗色使用 rgba(255, 255, 255, 0.18)，且不靠 filter 反色', async () => {
    const wrapper = mount(ConfigProvider, {
      attachTo: document.body,
      props: { theme: { mode: 'dark' } },
      slots: { default: () => h(Watermark, { content: 'test' }) }
    })
    await flushAll()

    expect(canvasContext.fillStyle).toBe('rgba(255, 255, 255, 0.18)')
    const [node] = findWatermarks(document.body)
    expect(node?.getAttribute('style') ?? '').not.toContain('invert')
    wrapper.unmount()
    await flushAll()
  })

  it('显式 textStyle.color 优先于主题默认值', async () => {
    const wrapper = mount(ConfigProvider, {
      attachTo: document.body,
      props: { theme: { mode: 'dark' } },
      slots: { default: () => h(Watermark, { content: 'test', textStyle: { color: '#ff0000' } }) }
    })
    await flushAll()

    expect(canvasContext.fillStyle).toBe('#ff0000')
    wrapper.unmount()
    await flushAll()
  })
})
