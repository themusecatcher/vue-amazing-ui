import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Watermark from 'components/watermark/Watermark.vue'

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

function installCanvasStub(): void {
  const context = {
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
    value: () => context
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

  it('全屏退出/卸载后应撤销 <html> 上的 position，且不覆盖其已有内联样式', async () => {
    document.documentElement.style.setProperty('--watermark-probe', '1')

    const wrapper = mount(Watermark, {
      attachTo: document.body,
      props: { content: 'test', fullscreen: true }
    })
    await flushAll()
    expect(document.documentElement.style.position).toBe('relative')
    // setAttribute('style', ...) 式写法会整体覆盖 style，此处守护「只改 position」
    expect(document.documentElement.style.getPropertyValue('--watermark-probe')).toBe('1')

    await wrapper.setProps({ fullscreen: false })
    await flushAll()
    expect(document.documentElement.style.position).toBe('')

    await wrapper.setProps({ fullscreen: true })
    await flushAll()
    expect(document.documentElement.style.position).toBe('relative')

    wrapper.unmount()
    await flushAll()
    expect(document.documentElement.style.position).toBe('')
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
