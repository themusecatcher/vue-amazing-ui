import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Image from 'components/image'
import Swiper from 'components/swiper'
import Waterfall from 'components/waterfall'

/**
 * 图片名称推导统一后的组件接线回归
 *
 * 本轮把 Image / Swiper / Waterfall 三处各自实现的「从 src 推导图片名称」收敛为
 * `getImageName()`（utils/dom.ts）。抽取前三者行为并不一致：
 * - Image：`new URL(src, location.href).pathname` 末段 + `decodeURIComponent`，解析失败降级手工切分
 * - Swiper / Waterfall：`src.split('?')[0].split('/')` 末段，**不做 URL 解码**，且不处理 `#`
 *
 * 统一后 Swiper / Waterfall 会额外获得 URL 解码能力（`a%20b.png` → `a b.png`），
 * 属预期增强；本文件锁定三个组件在 DOM 上的统一表现（`alt` / 预览文件名 / 下载文件名），
 * 并通过与抽取前行为的对照用例，确保没有引入「文件名变空」「name 被忽略」等回归。
 */

/** 让 Waterfall 的 `new Image()` 立即回填原始尺寸，使其进入可渲染状态 */
class ImmediateImage {
  naturalWidth = 400
  naturalHeight = 300
  onload: (() => void) | null = null
  onerror: ((err: unknown) => void) | null = null
  private srcValue = ''

  set src(value: string) {
    this.srcValue = value
    setTimeout(() => this.onload?.(), 0)
  }

  get src(): string {
    return this.srcValue
  }
}

/** 等待 Waterfall 内部「图片加载 → 布局计算 → 渲染」链路跑完 */
async function flushWaterfall(): Promise<void> {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 10))
  await nextTick()
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('Image - alt 与预览文件名取自统一后的 getImageName', () => {
  it('未设置 name 时，alt 应为 src 路径末段（剥离查询参数）', () => {
    wrapper = mount(Image, { props: { src: 'https://cdn.com/dir/photo.png?v=1.2.3' } })
    expect(wrapper.find('img.image-item').attributes('alt')).toBe('photo.png')
  })

  it('src 含 URL 编码时，alt 应解码为可读文件名', () => {
    wrapper = mount(Image, { props: { src: 'https://cdn.com/dir/a%20b.png' } })
    expect(wrapper.find('img.image-item').attributes('alt')).toBe('a b.png')
  })

  it('显式传入 name 时应优先于 src 推导', () => {
    wrapper = mount(Image, { props: { src: 'https://cdn.com/dir/photo.png', name: '我的照片' } })
    expect(wrapper.find('img.image-item').attributes('alt')).toBe('我的照片')
  })

  it('相对路径 src 也应正确推导（以当前页面地址为 base）', () => {
    wrapper = mount(Image, { props: { src: 'images/local.png' } })
    expect(wrapper.find('img.image-item').attributes('alt')).toBe('local.png')
  })

  it('数组 src 时每张图片各自推导名称', () => {
    wrapper = mount(Image, {
      props: {
        src: [
          { src: 'https://cdn.com/a/one.png' },
          { src: 'https://cdn.com/b/two%20x.png' },
          { src: 'https://cdn.com/c/three.png', name: '自定义' }
        ]
      }
    })
    const alts = wrapper.findAll('img.image-item').map((img) => img.attributes('alt'))
    expect(alts).toEqual(['one.png', 'two x.png', '自定义'])
  })

  it('预览面板中的文件名文本与 alt 保持一致', async () => {
    wrapper = mount(Image, { props: { src: 'https://cdn.com/dir/a%20b.png?x=1' } })
    await wrapper.find('.image-mask').trigger('click')
    await nextTick()
    expect(wrapper.find('.preview-name').text()).toBe('a b.png')
    expect(wrapper.find('.preview-name').attributes('title')).toBe('a b.png')
  })

  it('下载时传给 customDownload 的文件名应与 getImageName 一致（含解码）', async () => {
    const customDownload = vi.fn()
    wrapper = mount(Image, {
      props: { src: 'https://cdn.com/dir/a%20b.png?x=1', customDownload }
    })
    await wrapper.find('[title="下载"]').trigger('click')
    expect(customDownload).toHaveBeenCalledWith('https://cdn.com/dir/a%20b.png?x=1', 'a b.png')
  })

  it('src 无文件名段时 alt 为空字符串，不应渲染为 undefined', () => {
    wrapper = mount(Image, { props: { src: 'https://cdn.com/' } })
    expect(wrapper.find('img.image-item').attributes('alt')).toBe('')
  })
})

describe('Swiper - alt 取自统一后的 getImageName', () => {
  it('未设置 name 时 alt 取 src 末段，且支持查询参数剥离与 URL 解码', async () => {
    wrapper = mount(Swiper, {
      props: {
        images: [
          { src: 'https://cdn.com/a/one.png?v=2' },
          { src: 'https://cdn.com/b/two%20x.png' },
          { src: 'https://cdn.com/c/three.png', name: '自定义' }
        ]
      }
    })
    await nextTick()
    const alts = wrapper.findAll('img.swiper-image').map((img) => img.attributes('alt'))
    expect(alts).toEqual(['one.png', 'two x.png', '自定义'])
  })
})

describe('Waterfall - alt 取自统一后的 getImageName（行为增强点）', () => {
  it('查询参数应被剥离，且文件名会被 URL 解码', async () => {
    vi.stubGlobal('Image', ImmediateImage)
    wrapper = mount(Waterfall, {
      props: {
        images: [{ src: 'https://cdn.com/a/one.png?v=2' }, { src: 'https://cdn.com/b/two%20x.png' }]
      }
    })
    await flushWaterfall()

    const alts = wrapper.findAll('img.image-item').map((img) => img.attributes('alt'))
    // 抽取前 Waterfall 会得到 'two%20x.png'（不解码），统一后应为 'two x.png'
    expect(alts).toEqual(['one.png', 'two x.png'])
  })

  it('显式 name 优先于 src 推导', async () => {
    vi.stubGlobal('Image', ImmediateImage)
    wrapper = mount(Waterfall, {
      props: { images: [{ src: 'https://cdn.com/a/one.png', name: '自定义名称' }] }
    })
    await flushWaterfall()

    expect(wrapper.find('img.image-item').attributes('alt')).toBe('自定义名称')
  })
})
