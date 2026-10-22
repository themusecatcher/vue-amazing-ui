import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import Watermark from 'components/watermark/Watermark.vue'
import ConfigProvider from 'components/config-provider/ConfigProvider.vue'

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
  textAlign: string
  textBaseline: string
  measureText: ReturnType<typeof vi.fn>
  save: ReturnType<typeof vi.fn>
  restore: ReturnType<typeof vi.fn>
  translate: ReturnType<typeof vi.fn>
  rotate: ReturnType<typeof vi.fn>
  fillText: ReturnType<typeof vi.fn>
  drawImage: ReturnType<typeof vi.fn>
}
// 用例可读取最近一次绘制用的填充色，用于断言「默认色跟随主题」
let canvasContext: CanvasContextStub

function installCanvasStub(): void {
  canvasContext = {
    font: '',
    fillStyle: '',
    textAlign: 'center',
    textBaseline: 'top',
    measureText: vi.fn(() => ({ width: 100 })),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    fillText: vi.fn(),
    drawImage: vi.fn()
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

  it('全屏水印 fixed 开关生效：开启钉住视口，关闭随文档原生滚动', async () => {
    // 文档总高（测试环境不计算布局），用于断言非 fixed 时水印覆盖整页
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2400 })

    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { fullscreen: true, fixed: true, content: 'test' }
    })
    await flushAll()

    const [fixedNode] = findWatermarks(document.documentElement)
    expect(fixedNode?.parentElement).toBe(document.documentElement)
    expect(fixedNode?.style.position).toBe('fixed')

    await wrapper.setProps({ fixed: false })
    await flushAll()

    // 非 fixed：仍挂在 <html>、绝对定位、高度覆盖整页；滚动交给文档原生滚动，
    // 不做 JS translate 补偿（否则会与合成线程的滚动不同步，产生抖动）
    const [absoluteNode] = findWatermarks(document.documentElement)
    expect(absoluteNode?.parentElement).toBe(document.documentElement)
    expect(absoluteNode?.style.position).toBe('absolute')
    expect(absoluteNode?.style.height).toBe('2400px')
    expect(absoluteNode?.style.transform).toBe('')

    wrapper.unmount()
    await flushAll()
    expect(findWatermarks(document.documentElement)).toHaveLength(0)
    delete (document.documentElement as unknown as { scrollHeight?: number }).scrollHeight
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
