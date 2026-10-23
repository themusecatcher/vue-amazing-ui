import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { h, Suspense } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import QRCode from 'components/qr-code/QRCode.vue'
import ConfigProvider from 'components/config-provider'

/**
 * 回归用例：QRCode 的渲染内核、状态遮罩与导出契约
 *
 * 渲染内核：三种类型共用同一份模块矩阵（含图标区域挖空），
 * 屏幕绘制与导出走同一个 paint，保证「所见即所得」。
 */

/**
 * happy-dom 无 canvas 2d 实现，补齐绘制所需的最小上下文；
 * 返回值由用例读取，用于断言绘制行为（如是否绘制了中央图标）
 */
const createContextMock = () => ({
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  beginPath: vi.fn(),
  roundRect: vi.fn(),
  fill: vi.fn(),
  drawImage: vi.fn(),
  set fillStyle(_value: string) {},
  get fillStyle() {
    return ''
  }
})
/** Image 在 happy-dom 中不会真正加载图片，用可控替身触发 load 回调 */
class MockImage {
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  width = 100
  height = 100
  private source = ''
  set src(value: string) {
    this.source = value
    queueMicrotask(() => this.onload?.())
  }
  get src() {
    return this.source
  }
}
let contextMock = createContextMock()

describe('QRCode canvas 渲染', () => {
  beforeEach(() => {
    contextMock = createContextMock()
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      contextMock as unknown as CanvasRenderingContext2D
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('挂载后应渲染 canvas 元素', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://themusecatcher.blog.csdn.net', type: 'canvas' }
    })
    await flushPromises()

    const canvas = wrapper.find('.qr-code-canvas')
    expect(canvas.exists()).toBe(true)
    expect(canvas.element.tagName).toBe('CANVAS')

    wrapper.unmount()
  })

  it('value 变化后重绘且容器内始终只有一个 canvas', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://a.example.com', type: 'canvas' }
    })
    await flushPromises()
    expect(wrapper.findAll('.qr-code-canvas')).toHaveLength(1)

    await wrapper.setProps({ value: 'https://b.example.com' })
    await flushPromises()

    expect(wrapper.findAll('.qr-code-canvas')).toHaveLength(1)

    wrapper.unmount()
  })

  it('处于 Suspense 中挂载后仍应绘制 canvas', async () => {
    const wrapper = mount({
      render: () =>
        h(Suspense, null, {
          default: () => h(QRCode, { value: 'https://a.example.com', type: 'canvas' })
        })
    })
    await flushPromises()

    expect(wrapper.findAll('.qr-code-canvas')).toHaveLength(1)

    wrapper.unmount()
  })

  it('存在 icon 时应将图标绘制进位图（所见即所得）', async () => {
    vi.stubGlobal('Image', MockImage)
    const wrapper = mount(QRCode, {
      props: {
        value: 'https://a.example.com',
        type: 'canvas',
        icon: 'https://a.example.com/logo.svg'
      }
    })
    await flushPromises()
    await flushPromises()

    expect(contextMock.drawImage).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('位图边长应随屏幕像素密度提升，且不小于 scale 下限', async () => {
    const getWidth = async () => {
      const wrapper = mount(QRCode, {
        props: { value: 'hello', type: 'canvas' }
      })
      await flushPromises()
      const width = (wrapper.find('.qr-code-canvas').element as HTMLCanvasElement).width
      wrapper.unmount()
      return width
    }

    const base = await getWidth()
    vi.stubGlobal('devicePixelRatio', 3)
    const high = await getWidth()

    // 绘制区 = size 160 - 内边距 24 - 边框 2 = 134，高密度屏下位图像素需覆盖「绘制区 × DPR」
    expect(high).toBeGreaterThan(base)
    expect(high).toBeGreaterThanOrEqual(134 * 3)
  })

  it('padding 生效：内边距增大时绘制区与位图像素同步下降', async () => {
    const getWidth = async (padding: number) => {
      const wrapper = mount(QRCode, {
        props: { value: 'hello', type: 'canvas', size: 300, padding }
      })
      await flushPromises()
      const width = (wrapper.find('.qr-code-canvas').element as HTMLCanvasElement).width
      wrapper.unmount()
      return width
    }

    const base = await getWidth(12)
    const padded = await getWidth(60)
    expect(padded).toBeLessThan(base)
  })

  it('value 清空后应清空画布，避免残留上一次的二维码', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://a.example.com', type: 'canvas' }
    })
    await flushPromises()
    const canvas = wrapper.find('.qr-code-canvas').element as HTMLCanvasElement
    expect(canvas.width).toBeGreaterThan(0)

    await wrapper.setProps({ value: '' })
    await flushPromises()
    expect(canvas.width).toBe(0)

    wrapper.unmount()
  })
})

describe('QRCode svg 渲染', () => {
  it('挂载后应渲染矢量结构（背景 + 前景 path）', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://themusecatcher.blog.csdn.net', type: 'svg' }
    })
    await flushPromises()

    const svg = wrapper.find('svg.qr-code-svg')
    expect(svg.exists()).toBe(true)
    expect(svg.findAll('path')).toHaveLength(2)

    wrapper.unmount()
  })

  it('title 应输出为 svg 的 title 节点与 aria-label', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://a.example.com', type: 'svg', title: '扫码访问示例站点' }
    })
    await flushPromises()

    const svg = wrapper.find('svg.qr-code-svg')
    expect(svg.find('title').text()).toBe('扫码访问示例站点')
    expect(svg.attributes('aria-label')).toBe('扫码访问示例站点')

    wrapper.unmount()
  })

  it('title 应作为 image 类型的 alt 兜底', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://a.example.com', type: 'image', title: '扫码访问示例站点' }
    })
    await flushPromises()

    expect(wrapper.find('.qr-code-image').attributes('alt')).toBe('扫码访问示例站点')

    wrapper.unmount()
  })

  it('存在 icon 时应嵌入 image 节点', async () => {
    vi.stubGlobal('Image', MockImage)
    const wrapper = mount(QRCode, {
      props: {
        value: 'https://themusecatcher.blog.csdn.net',
        type: 'svg',
        icon: 'https://a.example.com/logo.svg'
      }
    })
    await flushPromises()
    await flushPromises()

    expect(wrapper.find('.qr-code-svg image').exists()).toBe(true)

    wrapper.unmount()
  })

  it('存在 icon 时应渲染圆角底色块（与 canvas 渲染保持一致）', async () => {
    vi.stubGlobal('Image', MockImage)
    const wrapper = mount(QRCode, {
      props: {
        value: 'https://themusecatcher.blog.csdn.net',
        type: 'svg',
        icon: 'https://a.example.com/logo.svg',
        iconBgColor: '#333333',
        iconBorderRadius: 4
      }
    })
    await flushPromises()
    await flushPromises()

    const background = wrapper.find('.qr-code-svg rect')
    expect(background.exists()).toBe(true)
    expect(background.attributes('fill')).toBe('#333333')
    expect(Number(background.attributes('rx'))).toBeGreaterThan(0)

    wrapper.unmount()
  })

  it('存在 icon 时图片节点应按原始宽高比绘制', async () => {
    class WideImage extends MockImage {
      width = 200
      height = 100
    }
    vi.stubGlobal('Image', WideImage)
    const wrapper = mount(QRCode, {
      props: {
        value: 'https://themusecatcher.blog.csdn.net',
        type: 'svg',
        icon: 'https://a.example.com/wide.svg'
      }
    })
    await flushPromises()
    await flushPromises()

    const image = wrapper.find('.qr-code-svg image')
    const width = Number(image.attributes('width'))
    const height = Number(image.attributes('height'))
    expect(width / height).toBeCloseTo(2)

    wrapper.unmount()
  })
})

describe('QRCode 主题取色', () => {
  const mountWithTheme = (mode: 'light' | 'dark', props: Record<string, unknown> = {}) =>
    mount(ConfigProvider, {
      props: { theme: { mode } },
      slots: { default: () => h(QRCode, { value: 'https://a.example.com', ...props }) }
    })

  it('浅色主题下默认取正文色与容器色（白底近黑码）', async () => {
    const wrapper = mountWithTheme('light')
    await flushPromises()

    const paths = wrapper.findAll('.qr-code-svg path')
    expect(paths[0].attributes('fill')).toBe('#ffffff')
    expect(paths[1].attributes('fill')).toBe('rgba(0, 0, 0, 0.88)')

    wrapper.unmount()
  })

  it('暗色主题下自动反色：背景取容器色、点阵取正文色', async () => {
    const wrapper = mountWithTheme('dark')
    await flushPromises()

    const paths = wrapper.findAll('.qr-code-svg path')
    expect(paths[0].attributes('fill')).toBe('#141414')
    expect(paths[1].attributes('fill')).toBe('rgba(255, 255, 255, 0.85)')

    wrapper.unmount()
  })

  it('显式 color / bgColor 优先于主题默认值', async () => {
    const wrapper = mountWithTheme('dark', { color: '#52c41a', bgColor: '#f5f5f5' })
    await flushPromises()

    const paths = wrapper.findAll('.qr-code-svg path')
    expect(paths[0].attributes('fill')).toBe('#f5f5f5')
    expect(paths[1].attributes('fill')).toBe('#52c41a')

    wrapper.unmount()
  })

  it('暗色主题下图标底色跟随背景色，不留白色方块', async () => {
    vi.stubGlobal('Image', MockImage)
    const wrapper = mountWithTheme('dark', { icon: 'https://a.example.com/logo.svg' })
    await flushPromises()
    await flushPromises()

    expect(wrapper.find('.qr-code-svg rect').attributes('fill')).toBe('#141414')

    wrapper.unmount()
    vi.unstubAllGlobals()
  })

  it('canvas 类型随主题切换重绘（亮色与暗色使用同一份解析结果）', async () => {
    const fillStyles: string[] = []
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      ...contextMock,
      set fillStyle(value: string) {
        fillStyles.push(value)
      },
      get fillStyle() {
        return ''
      }
    } as unknown as CanvasRenderingContext2D)

    const wrapper = mountWithTheme('dark', { type: 'canvas' })
    await flushPromises()

    expect(fillStyles).toContain('#141414')
    expect(fillStyles).toContain('rgba(255, 255, 255, 0.85)')

    wrapper.unmount()
  })
})

describe('QRCode image 渲染', () => {
  it('挂载后 img 应绑定二维码 DataURL', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://themusecatcher.blog.csdn.net', type: 'image' }
    })
    await flushPromises()

    expect(wrapper.find('.qr-code-image').attributes('src')).toMatch(/^data:image\/png/)

    wrapper.unmount()
  })

  it('value 清空后应回落为空 DataURL，与 svg 的空渲染一致', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://a.example.com', type: 'image' }
    })
    await flushPromises()
    expect(wrapper.find('.qr-code-image').attributes('src')).toMatch(/^data:image\/png/)

    await wrapper.setProps({ value: '' })
    await flushPromises()
    expect(wrapper.find('.qr-code-image').attributes('src')).toBe('')

    wrapper.unmount()
  })
})

describe('QRCode 编码异常', () => {
  it('内容超出容量时应告警并降级为空渲染', async () => {
    // 编码失败属「功能不可用」，统一出口按 error 级输出（见 components/utils/log.ts 的级别即环境策略）
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const wrapper = mount(QRCode, { props: { value: 'a'.repeat(3000) } })
    await flushPromises()

    expect(errorSpy).toHaveBeenCalled()
    // 编码失败：svg 空渲染（前景路径为空），且不得向渲染层抛错
    const svg = wrapper.find('svg.qr-code-svg')
    expect(svg.exists()).toBe(true)
    expect(svg.find('path').attributes('d')).toBe('M0 0h0v0H0z')

    wrapper.unmount()
  })

  it('内容超出容量时 toDataURL 应返回空字符串', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(QRCode, { props: { value: 'a'.repeat(3000), type: 'canvas' } })
    await flushPromises()

    const url = (wrapper.vm as unknown as { toDataURL: () => string }).toDataURL()
    expect(url).toBe('')

    wrapper.unmount()
  })
})

describe('QRCode 状态遮罩', () => {
  it('active 状态不渲染遮罩', async () => {
    const wrapper = mount(QRCode, { props: { value: 'https://a.example.com' } })
    await flushPromises()

    expect(wrapper.find('.qr-code-mask').exists()).toBe(false)

    wrapper.unmount()
  })

  it('loading 状态渲染加载指示符（small 档，与 Ant Design 默认 Spin 尺寸一致）', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://a.example.com', status: 'loading' }
    })
    await flushPromises()

    expect(wrapper.find('.qr-code-mask').exists()).toBe(true)
    // 本库 Spin 的三档整体比 antd 大一档：small（20px 轮盘 / 8px 单点）才等于 antd 的默认尺寸
    expect(wrapper.find('.qr-code-mask .spin-small').exists()).toBe(true)

    wrapper.unmount()
  })

  it('spinProps 透传给内部 Spin：尺寸可覆盖默认档位、指示符可替换', async () => {
    const wrapper = mount(QRCode, {
      props: {
        value: 'https://a.example.com',
        status: 'loading',
        spinProps: { size: 'large', indicator: 'ring-circle' }
      }
    })
    await flushPromises()

    const spin = wrapper.find('.qr-code-mask .spin-wrap')
    expect(spin.classes()).toContain('spin-large')
    expect(spin.classes()).not.toContain('spin-small')
    expect(wrapper.find('.qr-code-mask .spin-ring-circle').exists()).toBe(true)

    wrapper.unmount()
  })

  it('expired 状态展示文案并可点击刷新（触发 refresh 事件）', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://a.example.com', status: 'expired' }
    })
    await flushPromises()

    expect(wrapper.find('.qr-code-expired').text()).toBe('二维码已过期')
    const button = wrapper.find('.qr-code-mask .btn-wrap')
    expect(button.exists()).toBe(true)
    await button.trigger('click')
    expect(wrapper.emitted('refresh')).toHaveLength(1)

    wrapper.unmount()
  })

  it('scanned 状态展示已扫描文案', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://a.example.com', status: 'scanned' }
    })
    await flushPromises()

    expect(wrapper.find('.qr-code-scanned').text()).toBe('已扫描')

    wrapper.unmount()
  })
})

describe('QRCode 实例方法', () => {
  it('toDataURL 应返回可下载的 DataURL', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://themusecatcher.blog.csdn.net', type: 'canvas' }
    })
    await flushPromises()

    const url = (wrapper.vm as unknown as { toDataURL: () => string }).toDataURL()
    expect(url).toMatch(/^data:image\/png/)

    wrapper.unmount()
  })

  it('toDataURL 可传入 MIME 类型与质量参数', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://themusecatcher.blog.csdn.net', type: 'canvas' }
    })
    await flushPromises()

    const url = (wrapper.vm as unknown as { toDataURL: (type?: string, quality?: number) => string }).toDataURL(
      'image/jpeg',
      0.8
    )
    expect(url).toMatch(/^data:image\//)

    wrapper.unmount()
  })

  it('toDataURL 在缺少 value 时应返回空字符串', async () => {
    const wrapper = mount(QRCode, {})
    await flushPromises()

    const url = (wrapper.vm as unknown as { toDataURL: () => string }).toDataURL()
    expect(url).toBe('')

    wrapper.unmount()
  })
})
