import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { nextTick, createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { mount } from '@vue/test-utils'
import Waterfall from 'components/waterfall'

/*
 * 瀑布流布局回归
 *
 * 覆盖既有实现的三类真实缺陷与新增边界处理：
 * - 图片增删 / 加载失败 / 布局期间改列数时的渲染与高度；
 * - 尺寸预取的并行、增量与缓存复用；
 * - 空数据、非法列数与间隙、占位框与失败态的边界。
 *
 * 环境说明：`happy-dom` 中 `offsetWidth` 恒为 0，且 `<img>` 不会真正加载，
 * 因此这里固定容器宽度，并用桩替换全局 `Image` 以控制尺寸回填时机与失败。
 */

let containerWidth = 300
let viewportWidth = 1024
let loadDelay = 0
const created: number[] = []
const failUrls = new Set<string>()

class StubImage {
  naturalWidth = 400
  naturalHeight = 300
  onload: (() => void) | null = null
  onerror: ((error: unknown) => void) | null = null
  constructor() {
    created.push(performance.now())
  }
  set src(value: string) {
    const failed = failUrls.has(value)
    setTimeout(() => {
      if (failed) {
        this.onerror?.(new Error(`Failed to load image at ${value}`))
      } else {
        this.onload?.()
      }
    }, loadDelay)
  }
  get src() {
    return ''
  }
}

class StubResizeObserver {
  static instances: StubResizeObserver[] = []
  callback: ResizeObserverCallback
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
    StubResizeObserver.instances.push(this)
  }
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  // 手动触发一次尺寸回调
  trigger(): void {
    this.callback([], this as unknown as ResizeObserver)
  }
}

class StubIntersectionObserver {
  static instances: StubIntersectionObserver[] = []
  callback: IntersectionObserverCallback
  options?: IntersectionObserverInit
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback
    this.options = options
    StubIntersectionObserver.instances.push(this)
  }
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  // 手动触发一次相交回调
  trigger(isIntersecting: boolean): void {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
  }
}

let wrapper: ReturnType<typeof mount> | null = null
let offsetWidthDescriptor: PropertyDescriptor | undefined
let innerWidthDescriptor: PropertyDescriptor | undefined
let innerHeightDescriptor: PropertyDescriptor | undefined
let rectDescriptor: PropertyDescriptor | undefined
let forcedBottom: number | null = null // 非空时覆盖瀑布流容器底边，用于模拟视口剩余空间
const viewportHeight = 800
const rejections: unknown[] = []
const onUnhandled = (reason: unknown) => rejections.push(reason)

function list(count: number, prefix = 'img'): { src: string }[] {
  return Array.from({ length: count }, (_, index) => ({ src: `https://cdn.com/${prefix}${index}.png` }))
}
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
async function waitImages(count: number): Promise<void> {
  await nextTick()
  await vi.waitFor(() => {
    expect(wrapper!.findAll('img.image-item')).toHaveLength(count)
  })
  // 尺寸未就绪时先按占位比例落位，格子与 img 会提前存在：
  // 这里再等容器高度连续两轮不变，确保尺寸回填后的精化已经结束
  let previous: number | null = null
  await vi.waitFor(() => {
    const current = totalHeightOf(wrapper!)
    if (previous !== current) {
      previous = current
      throw new Error('高度仍在变化，等待精化结束')
    }
  })
}
function totalHeightOf(target: ReturnType<typeof mount>): number {
  const style = target.attributes('style') ?? ''
  return Number((style.match(/--waterfall-height:\s*(-?[\d.]+)px/) ?? [])[1])
}
function cellsOf(target: ReturnType<typeof mount>): { top: number; left: number; width: number; height: number }[] {
  return target.findAll('.waterfall-image').map((element) => {
    const style = element.attributes('style') ?? ''
    const read = (key: string) => Number((style.match(new RegExp(`${key}:\\s*(-?[\\d.]+)px`)) ?? [])[1])
    return { top: read('top'), left: read('left'), width: read('width'), height: read('height') }
  })
}

beforeEach(() => {
  containerWidth = 300
  viewportWidth = 1024
  loadDelay = 0
  created.length = 0
  rejections.length = 0
  failUrls.clear()
  StubResizeObserver.instances = []
  StubIntersectionObserver.instances = []
  forcedBottom = null
  vi.stubGlobal('Image', StubImage)
  vi.stubGlobal('ResizeObserver', StubResizeObserver)
  vi.stubGlobal('IntersectionObserver', StubIntersectionObserver)
  offsetWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get: () => containerWidth
  })
  innerWidthDescriptor = Object.getOwnPropertyDescriptor(window, 'innerWidth')
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    get: () => viewportWidth
  })
  innerHeightDescriptor = Object.getOwnPropertyDescriptor(window, 'innerHeight')
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    get: () => viewportHeight
  })
  rectDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'getBoundingClientRect')
  const originalRect = rectDescriptor?.value as ((this: HTMLElement) => DOMRect) | undefined
  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value(this: HTMLElement) {
      if (!this.classList.contains('waterfall-wrap')) {
        return originalRect ? originalRect.call(this) : ({ bottom: 0 } as DOMRect)
      }
      // 容器底边随已渲染张数下移（每格约 300px），据此验证「填满即停止」的判定
      const rendered = this.querySelectorAll('.waterfall-image').length
      return {
        bottom: forcedBottom ?? rendered * 300,
        top: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => ({})
      } as DOMRect
    }
  })
  process.on('unhandledRejection', onUnhandled)
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  process.off('unhandledRejection', onUnhandled)
  vi.unstubAllGlobals()
  if (offsetWidthDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', offsetWidthDescriptor)
  }
  if (innerWidthDescriptor) {
    Object.defineProperty(window, 'innerWidth', innerWidthDescriptor)
  }
  if (innerHeightDescriptor) {
    Object.defineProperty(window, 'innerHeight', innerHeightDescriptor)
  }
  if (rectDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', rectDescriptor)
  }
})

describe('Waterfall - 布局算法', () => {
  it('按行优先追加到最矮列，首行依次铺满各列', async () => {
    wrapper = mount(Waterfall, { props: { images: list(4) } })
    await waitImages(4)
    const cells = cellsOf(wrapper)
    // 容器 300、间隙 20、3 列：列宽 (300 - 4*20)/3 ≈ 73.33，图片等比高度 = 300 / (400 / 73.33) ≈ 55
    expect(cells.map((cell) => Math.round(cell.left))).toEqual([20, 113, 207, 20])
    expect(cells.map((cell) => Math.round(cell.top))).toEqual([20, 20, 20, 95])
    // 总高度 = 最高列 (20 + 55 + 20 + 55) + 底部间隙
    expect(Math.round(totalHeightOf(wrapper))).toBe(170)
  })

  it('全部尺寸命中缓存时一次提交，不重复预取', async () => {
    wrapper = mount(Waterfall, { props: { images: list(4) } })
    await waitImages(4)
    const before = created.length
    await wrapper.setProps({ columnCount: 2 })
    await waitImages(4)
    expect(created.length).toBe(before)
  })

  it('只改链接等非布局字段时不重排，且内容保持响应式', async () => {
    wrapper = mount(Waterfall, { props: { images: list(2) } })
    await waitImages(2)
    const before = created.length
    const linked = list(2).map((image) => ({ ...image, link: 'https://example.com/detail' }))
    await wrapper.setProps({ images: linked })
    await nextTick()
    expect(created.length).toBe(before)
    expect(wrapper.find('a.waterfall-image').attributes('href')).toBe('https://example.com/detail')
  })

  it('gap 传数组时分别控制行间距与列间距', async () => {
    wrapper = mount(Waterfall, { props: { columnCount: 1, gap: [20, 40], images: list(2) } })
    await waitImages(2)
    // 单列：列宽 260、图高 195，首图 top 取垂直间距，次图再叠加垂直间距
    expect(cellsOf(wrapper).map((cell) => Math.round(cell.top))).toEqual([40, 275])
    expect(Math.round(totalHeightOf(wrapper))).toBe(510)
  })

  it('gap 传数字时行列同值', async () => {
    wrapper = mount(Waterfall, { props: { columnCount: 1, gap: 12, images: list(2) } })
    await waitImages(2)
    expect(Math.round(cellsOf(wrapper)[0].top)).toBe(12)
    expect(Math.round(cellsOf(wrapper)[0].left)).toBe(12)
  })

  it('columnCount 传响应式对象时按视口断点取列数', async () => {
    viewportWidth = 500
    wrapper = mount(Waterfall, { props: { columnCount: { xs: 2, md: 4 }, images: list(4) } })
    await waitImages(4)
    // 2 列：列宽 (300 - 3*20)/2 = 120
    expect(Math.round(cellsOf(wrapper)[0].width)).toBe(120)
    viewportWidth = 900
    window.dispatchEvent(new Event('resize'))
    await vi.waitFor(() => {
      expect(Math.round(cellsOf(wrapper!)[0].width)).toBe(50)
    })
    // 4 列：列宽 (300 - 5*20)/4 = 50
    expect(cellsOf(wrapper).map((cell) => Math.round(cell.left))).toEqual([20, 90, 160, 230])
  })

  it('响应式列数未命中已配置断点时回落默认列数', async () => {
    viewportWidth = 500
    wrapper = mount(Waterfall, { props: { columnCount: { md: 4 }, images: list(3) } })
    await waitImages(3)
    // 视口 <768 无 xs 配置 → 回落默认 3 列：列宽 (300 - 4*20)/3 ≈ 73
    expect(Math.round(cellsOf(wrapper)[0].width)).toBe(73)
  })

  it('同长度下顺序置换会重排且复用已取尺寸', async () => {
    wrapper = mount(Waterfall, { props: { images: list(3) } })
    await waitImages(3)
    const before = created.length
    const [a, b, c] = list(3)
    await wrapper.setProps({ images: [c, b, a] })
    await waitImages(3)
    expect(created.length).toBe(before)
    expect(wrapper.findAll('img.image-item').map((img) => img.attributes('src'))).toEqual([
      'https://cdn.com/img2.png',
      'https://cdn.com/img1.png',
      'https://cdn.com/img0.png'
    ])
  })

  it('点击图片派发原始数据与事件', async () => {
    wrapper = mount(Waterfall, { props: { images: list(2) } })
    await waitImages(2)
    await wrapper.findAll('a.waterfall-image')[1].trigger('click')
    const payload = wrapper.emitted('click')?.[0] as unknown[]
    expect(payload?.[0]).toMatchObject({ src: 'https://cdn.com/img1.png' })
    expect(payload?.[1]).toBe(1)
    expect(payload?.[2]).toBeInstanceOf(Event)
  })
})

describe('Waterfall - 数据变化', () => {
  it('删除图片后渲染数量与数据同步，不报错', async () => {
    wrapper = mount(Waterfall, { props: { images: list(3) } })
    await waitImages(3)
    await wrapper.setProps({ images: list(1) })
    await waitImages(1)
    await wrapper.setProps({ images: [] })
    await waitImages(0)
    expect(totalHeightOf(wrapper)).toBe(0)
  })

  it('追加图片只预取新增项', async () => {
    wrapper = mount(Waterfall, { props: { images: list(5) } })
    await waitImages(5)
    const before = created.length
    await wrapper.setProps({ images: list(6) })
    await waitImages(6)
    expect(created.length - before).toBe(1)
  })

  it('布局进行中修改列数，结果与直接按新列数渲染一致', async () => {
    loadDelay = 30
    wrapper = mount(Waterfall, { props: { columnCount: 3, images: list(6) } })
    // 等前几张布局完成、仍有图片在预取时切换列数
    await delay(130)
    await wrapper.setProps({ columnCount: 2 })
    await waitImages(6)
    const raced = totalHeightOf(wrapper)
    wrapper.unmount()
    wrapper = null
    loadDelay = 0
    wrapper = mount(Waterfall, { props: { columnCount: 2, images: list(6) } })
    await waitImages(6)
    expect(raced).toBe(totalHeightOf(wrapper))
  })
})

describe('Waterfall - 图片加载失败', () => {
  it('首张图片失败时跳过该图，其余图片继续布局且无未处理拒绝', async () => {
    failUrls.add('https://cdn.com/bad.png')
    wrapper = mount(Waterfall, { props: { images: [{ src: 'https://cdn.com/bad.png' }, ...list(2, 'ok')] } })
    await waitImages(2)
    await delay(20)
    const cells = cellsOf(wrapper)
    // 失败图不占位：后两张分别落在第一、第二列的首行
    expect(Math.round(cells[0].left)).toBe(20)
    expect(Math.round(cells[1].left)).toBe(113)
    expect(rejections).toHaveLength(0)
  })

  it('末张图片失败时不影响前面图片的位置', async () => {
    failUrls.add('https://cdn.com/bad.png')
    wrapper = mount(Waterfall, { props: { images: [...list(3, 'ok'), { src: 'https://cdn.com/bad.png' }] } })
    await waitImages(3)
    await delay(20)
    expect(cellsOf(wrapper).map((cell) => Math.round(cell.left))).toEqual([20, 113, 207])
    expect(rejections).toHaveLength(0)
  })

  it('数据整体变化后允许重新加载此前失败的图片', async () => {
    failUrls.add('https://cdn.com/img0.png')
    wrapper = mount(Waterfall, { props: { images: list(2) } })
    await waitImages(1)
    failUrls.delete('https://cdn.com/img0.png')
    await wrapper.setProps({ images: list(2, 'next') })
    await waitImages(2)
    expect(wrapper.findAll('img.image-item')).toHaveLength(2)
  })
})

describe('Waterfall - 预取性能', () => {
  it('多张图片的尺寸预取并行启动', async () => {
    loadDelay = 40
    wrapper = mount(Waterfall, { props: { images: list(4) } })
    await waitImages(4)
    // 串行时相邻预取的构造间隔不小于单张耗时，并行时集中在同一时刻
    expect(created[3] - created[0]).toBeLessThan(20)
  })
})

describe('Waterfall - 边界处理', () => {
  it('空数据时高度为 0，SSR 输出不出现无效值', async () => {
    wrapper = mount(Waterfall, { props: { images: [] } })
    await nextTick()
    expect(totalHeightOf(wrapper)).toBe(0)
    const html = await renderToString(createSSRApp(Waterfall, { images: [] }))
    expect(html).toContain('--waterfall-height: 0px')
  })

  it('非法列数与超宽间隙下不产生负数或 NaN 定位', async () => {
    wrapper = mount(Waterfall, { props: { columnCount: 0, images: list(2) } })
    await waitImages(2)
    const invalid = cellsOf(wrapper).filter((cell) => {
      return !(cell.width > 0) || !(cell.height > 0) || Number.isNaN(cell.top) || Number.isNaN(cell.left)
    })
    expect(invalid).toHaveLength(0)
    wrapper.unmount()
    wrapper = null
    wrapper = mount(Waterfall, { props: { columnCount: 6, gap: 100, images: list(2) } })
    await waitImages(2)
    expect(cellsOf(wrapper).every((cell) => cell.width > 0)).toBe(true)
  })

  it('未提供宽高比时先按占位比例生成骨架，尺寸取回后精化', async () => {
    loadDelay = 30
    wrapper = mount(Waterfall, { props: { images: list(3) } })
    await nextTick()
    // 尺寸未就绪：按 1:1 占位，列宽 73 → 高 73，骨架立刻可见
    expect(wrapper.findAll('.placeholder-item')).toHaveLength(3)
    expect(Math.round(cellsOf(wrapper)[0].height)).toBe(73)
    expect(totalHeightOf(wrapper)).toBeGreaterThan(0)
    await waitImages(3)
    // 尺寸回填后按 4:3 精化；图片未加载完成前骨架保留
    expect(Math.round(cellsOf(wrapper)[0].height)).toBe(55)
    expect(wrapper.findAll('.placeholder-item')).toHaveLength(3)
  })

  it('无图片时不渲染占位框，高度为 0', async () => {
    wrapper = mount(Waterfall, { props: { images: [] } })
    await nextTick()
    expect(wrapper.findAll('.placeholder-item')).toHaveLength(0)
    expect(totalHeightOf(wrapper)).toBe(0)
  })

  it('首屏尺寸未就绪时容器已有接近真实的占位高度，不出现空白块', async () => {
    loadDelay = 30
    wrapper = mount(Waterfall, { props: { columnCount: 1, gap: 0, images: list(3) } })
    await nextTick()
    // 单列 300 宽：1:1 占位 → 容器高 900
    expect(Math.round(totalHeightOf(wrapper))).toBe(900)
    await waitImages(3)
    // 尺寸回填为 4:3 → 容器高 675，只收缩不被撑高
    expect(Math.round(totalHeightOf(wrapper))).toBe(675)
  })

  it('容器不可见时不布局，恢复可见后补一次布局', async () => {
    containerWidth = 0
    wrapper = mount(Waterfall, { props: { images: list(3) } })
    await nextTick()
    expect(wrapper.findAll('img.image-item')).toHaveLength(0)
    // 隐藏期间完成尺寸预取后，恢复可见应重新布局
    containerWidth = 300
    StubResizeObserver.instances.at(-1)?.trigger()
    await waitImages(3)
    expect(Math.round(cellsOf(wrapper)[0].width)).toBe(73)
  })
})

describe('Waterfall - 占位与加载态', () => {
  it('提供宽高比时跳过尺寸预取，直接按比例生成占位框', async () => {
    wrapper = mount(Waterfall, {
      props: {
        columnCount: 1,
        gap: 0,
        images: [
          { src: 'https://cdn.com/tall.png', aspectRatio: 0.5 },
          { src: 'https://cdn.com/wide.png', aspectRatio: 2 }
        ]
      }
    })
    await nextTick()
    // 宽高比可用时不需要预取原始尺寸
    expect(created).toHaveLength(0)
    const cells = cellsOf(wrapper)
    expect(cells).toHaveLength(2)
    // 容器 300、单列无间隙：0.5 的图高 600，2 的图高 150
    expect(Math.round(cells[0].height)).toBe(600)
    expect(Math.round(cells[1].height)).toBe(150)
    expect(wrapper.findAll('.placeholder-item')).toHaveLength(2)
    expect(wrapper.findAll('.placeholder-error')).toHaveLength(0)
  })

  it('图片加载完成后移除占位框，加载失败时保留位置并切换失败态', async () => {
    wrapper = mount(Waterfall, {
      props: { columnCount: 1, images: [{ src: 'https://cdn.com/ok.png', aspectRatio: 1 }] }
    })
    await nextTick()
    await wrapper.find('img.image-item').trigger('load')
    expect(wrapper.findAll('.placeholder-item')).toHaveLength(0)

    await wrapper.setProps({ images: [{ src: 'https://cdn.com/broken.png', aspectRatio: 1 }] })
    await nextTick()
    await wrapper.find('img.image-item').trigger('error')
    expect(wrapper.findAll('.placeholder-item')).toHaveLength(1)
    expect(wrapper.find('.placeholder-item').classes()).toContain('placeholder-error')
    expect(wrapper.find('.placeholder-icon').exists()).toBe(true)
  })

  it('宽高比非法时回落尺寸预取，不产生非法定位', async () => {
    wrapper = mount(Waterfall, {
      props: { columnCount: 1, gap: 0, images: [{ src: 'https://cdn.com/zero.png', aspectRatio: 0 }] }
    })
    await waitImages(1)
    expect(created.length).toBeGreaterThan(0)
    const cell = cellsOf(wrapper)[0]
    expect(Number.isNaN(cell.height)).toBe(false)
    expect(cell.height).toBeGreaterThan(0)
  })
})

describe('Waterfall - 按需渲染', () => {
  it('开启 lazy 时只渲染首批，哨兵相交后追加下一批', async () => {
    wrapper = mount(Waterfall, { props: { images: list(30, 'lazy'), columnCount: 3, lazy: true } })
    await waitImages(6)
    const observer = StubIntersectionObserver.instances.at(-1)
    // 观察范围按可视区高度的 0.75 倍预留，避免滚动时出现空白
    expect(observer?.options?.rootMargin).toBe('0px 0px 75% 0px')
    // 模拟内容不足一屏：哨兵进入观察范围后追加一批，追加到填满即停
    forcedBottom = 500
    observer?.trigger(true)
    forcedBottom = null
    await waitImages(12)
  })

  it('数据不足一批时全部渲染，不会超出图片数组', async () => {
    wrapper = mount(Waterfall, { props: { images: list(2, 'few'), columnCount: 3, lazy: true } })
    await waitImages(2)
  })

  it('关闭 lazy 时一次渲染全部图片', async () => {
    wrapper = mount(Waterfall, { props: { images: list(30, 'all'), columnCount: 3 } })
    await waitImages(30)
  })

  it('运行环境不支持相交观察时降级为全部渲染', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    wrapper = mount(Waterfall, { props: { images: list(10, 'no-io'), columnCount: 3, lazy: true } })
    await waitImages(10)
  })

  it('按需渲染下增删图片后渲染范围收敛到新长度', async () => {
    wrapper = mount(Waterfall, { props: { images: list(10, 'shrink'), columnCount: 3, lazy: true } })
    await waitImages(6)
    await wrapper.setProps({ images: list(3, 'shrink') })
    await waitImages(3)
    expect(wrapper.findAll('img.image-item')).toHaveLength(3)
    expect(wrapper.find('.waterfall-sentinel').exists()).toBe(true)
  })
})
