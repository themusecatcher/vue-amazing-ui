import { describe, it, expect, vi, afterEach } from 'vitest'
import { h, isVNode } from 'vue'
import {
  createKeyGenerator,
  getImageName,
  getFloatingBoundaryRect,
  renderContentToVNode,
  trapTabFocus
} from 'components/utils'

/**
 * 重构抽取单元测试
 *
 * 本轮改动把散落在各组件中的重复实现抽取为共享工具函数，各组件改为复用：
 * - `renderContentToVNode`（utils/render.ts）：Message / Notification / Modal / Dialog
 * - `createKeyGenerator`（utils/function.ts）：Message / Notification / Modal / Dialog
 * - `getImageName`（utils/dom.ts）：Image / Swiper / Waterfall
 * - `getFloatingBoundaryRect`（utils/position.ts）：Tooltip / Select / AutoComplete
 * - `trapTabFocus`（utils/dom.ts）：Modal / Dialog
 *
 * 这些函数的实现直接决定上层组件行为，且抽取前近乎零测试覆盖，
 * 故此处逐个锁定其契约（含边界与兜底分支），避免后续被无声改坏。
 */

/** 构造带指定视口矩形的元素，用于几何类断言 */
function makeEl(rect: Partial<DOMRect>): HTMLElement {
  const el = document.createElement('div')
  const full: DOMRect = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...rect
  } as DOMRect
  el.getBoundingClientRect = () => full
  return el
}

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('renderContentToVNode - 内容三形态统一归一为 VNode', () => {
  it('字符串应转为文本节点，内容原样保留', () => {
    const vnode = renderContentToVNode('hello')
    expect(isVNode(vnode)).toBe(true)
    expect(vnode.children).toBe('hello')
  })

  it('undefined 应转为空文本节点，保证渲染位置始终有节点可挂载', () => {
    const vnode = renderContentToVNode(undefined)
    expect(isVNode(vnode)).toBe(true)
    expect(vnode.children).toBe('')
  })

  it('已构造的 VNode 应原样透传（同一引用）', () => {
    const vnode = h('span', { class: 'x' })
    expect(renderContentToVNode(vnode)).toBe(vnode)
  })

  it('渲染函数应被调用并返回其结果 VNode', () => {
    const result = h('span', { class: 'fn-result' })
    const factory = vi.fn(() => result)
    expect(renderContentToVNode(factory)).toBe(result)
    expect(factory).toHaveBeenCalledTimes(1)
  })

  it('函数形态每次渲染都应重新调用（不复用首次结果）', () => {
    const factory = vi.fn(() => h('span'))
    renderContentToVNode(factory)
    renderContentToVNode(factory)
    expect(factory).toHaveBeenCalledTimes(2)
  })
})

describe('createKeyGenerator - 实例唯一标识生成器', () => {
  it('key 应为「前缀_时间戳_自增序号」三段结构', () => {
    const key = createKeyGenerator('dialog')()
    // 精确锁定单下划线：前缀若自带尾下划线会产出 dialog__<ts>_1，
    // 与抽取前的 dialog_<ts>_1 不一致，属需防范的格式回归
    expect(key).toMatch(/^dialog_\d+_1$/)
  })

  it('四个消费组件的实际前缀均应产出与抽取前一致的 key 格式', () => {
    // 前缀与 Message / Notification / Modal / Dialog 中的调用保持同步
    expect(createKeyGenerator('message')()).toMatch(/^message_\d+_1$/)
    expect(createKeyGenerator('notification')()).toMatch(/^notification_\d+_1$/)
    expect(createKeyGenerator('modal')()).toMatch(/^modal_\d+_1$/)
    expect(createKeyGenerator('dialog')()).toMatch(/^dialog_\d+_1$/)
  })

  it('同一毫秒内连续生成不应重复（自增序号兜底）', () => {
    const gen = createKeyGenerator('modal')
    const keys = Array.from({ length: 200 }, () => gen())
    expect(new Set(keys).size).toBe(200)
  })

  it('不同生成器的自增序号相互独立，不共享状态', () => {
    const a = createKeyGenerator('a')
    const b = createKeyGenerator('b')
    expect(a()).toMatch(/^a_\d+_1$/)
    expect(a()).toMatch(/^a_\d+_2$/)
    // b 的自增序号从 1 重新开始，不受 a 影响
    expect(b()).toMatch(/^b_\d+_1$/)
  })
})

describe('getImageName - 从图像对象提取名称', () => {
  it('image 为空时应返回空字符串，不抛错', () => {
    expect(getImageName(undefined)).toBe('')
  })

  it('显式 name 优先级最高，不应再从 src 推导', () => {
    expect(getImageName({ src: 'https://cdn.com/dir/real.png', name: '自定义名称' })).toBe('自定义名称')
  })

  it('未设置 name 时应取 src 路径末段', () => {
    expect(getImageName({ src: 'https://cdn.com/dir/photo.png' })).toBe('photo.png')
  })

  it('应剥离查询参数与哈希，仅取路径末段', () => {
    expect(getImageName({ src: 'https://cdn.com/a/b.png?v=1.2.3' })).toBe('b.png')
    expect(getImageName({ src: 'https://cdn.com/a/b.png#preview' })).toBe('b.png')
    // 查询串 / 哈希中含斜杠时不得被误当作路径分隔符
    expect(getImageName({ src: 'https://cdn.com/a/b.png?path=/x/y' })).toBe('b.png')
    expect(getImageName({ src: 'https://cdn.com/a/b.png#/x/y' })).toBe('b.png')
  })

  it('应对路径段做 URL 解码（保持与抽取前 Image 行为一致）', () => {
    expect(getImageName({ src: 'https://cdn.com/dir/a%20b.png' })).toBe('a b.png')
    expect(getImageName({ src: 'https://cdn.com/dir/%E4%B8%AD%E6%96%87.png' })).toBe('中文.png')
  })

  it('非法百分号编码应原样返回，不抛异常', () => {
    expect(() => getImageName({ src: 'https://cdn.com/dir/a%2.png' })).not.toThrow()
    expect(getImageName({ src: 'https://cdn.com/dir/a%2.png' })).toBe('a%2.png')
  })

  it('应兼容相对路径（以当前页面地址为 base 解析）', () => {
    expect(getImageName({ src: 'images/a.png' })).toBe('a.png')
    expect(getImageName({ src: './images/a%20b.png?x=1' })).toBe('a b.png')
  })

  it('src 无文件名段时应返回空字符串', () => {
    expect(getImageName({ src: '' })).toBe('')
    expect(getImageName({ src: 'https://cdn.com/' })).toBe('')
  })

  it('跨域绝对地址应取末段，不受 base 影响', () => {
    expect(getImageName({ src: 'https://other.com:8080/x/y/z.webp' })).toBe('z.webp')
  })
})

describe('getFloatingBoundaryRect - 遮挡边界测量', () => {
  it('无可滚动父元素时应以视口为界', () => {
    expect(getFloatingBoundaryRect(null, null, 800, 600)).toEqual({ top: 0, left: 0, bottom: 600, right: 800 })
  })

  it('可滚动父元素即视口根元素时应以视口为界', () => {
    const panel = makeEl({})
    document.documentElement.appendChild(panel)
    expect(getFloatingBoundaryRect(document.documentElement, panel, 800, 600)).toEqual({
      top: 0,
      left: 0,
      bottom: 600,
      right: 800
    })
  })

  it('面板未被可滚动父元素真正包含（Teleport 到 body）时应以视口为界', () => {
    const scrollTarget = makeEl({ top: 100, left: 100, bottom: 300, right: 400 })
    // panel 挂在 body 下，不在 scrollTarget 内：不得受中间滚动容器 overflow 裁剪
    const panel = makeEl({})
    document.body.appendChild(scrollTarget)
    document.body.appendChild(panel)
    expect(getFloatingBoundaryRect(scrollTarget, panel, 800, 600)).toEqual({
      top: 0,
      left: 0,
      bottom: 600,
      right: 800
    })
  })

  it('面板确实被可滚动父元素裁剪时应以其矩形为界', () => {
    const scrollTarget = makeEl({ top: 50, left: 60, bottom: 500, right: 700 })
    const panel = makeEl({})
    scrollTarget.appendChild(panel)
    document.body.appendChild(scrollTarget)
    expect(getFloatingBoundaryRect(scrollTarget, panel, 800, 600)).toEqual({
      top: 50,
      left: 60,
      bottom: 500,
      right: 700
    })
  })

  it('边界超出视口时应收敛到视口范围内（负值取 0，超出取视口尺寸）', () => {
    const scrollTarget = makeEl({ top: -20, left: -10, bottom: 700, right: 900 })
    const panel = makeEl({})
    scrollTarget.appendChild(panel)
    document.body.appendChild(scrollTarget)
    expect(getFloatingBoundaryRect(scrollTarget, panel, 800, 600)).toEqual({
      top: 0,
      left: 0,
      bottom: 600,
      right: 800
    })
  })

  it('panel 为 null 且 scrollTarget 存在时应以视口为界（contains 判定失败不抛错）', () => {
    const scrollTarget = makeEl({ top: 10, left: 10, bottom: 100, right: 100 })
    document.body.appendChild(scrollTarget)
    expect(getFloatingBoundaryRect(scrollTarget, null, 800, 600)).toEqual({ top: 0, left: 0, bottom: 600, right: 800 })
  })
})

describe('trapTabFocus - Tab 焦点锁定', () => {
  /** 构造含 n 个可聚焦按钮的容器并挂到 body */
  function makeContainer(count: number): { container: HTMLElement; buttons: HTMLButtonElement[] } {
    const container = document.createElement('div')
    const buttons = Array.from({ length: count }, (_, i) => {
      const btn = document.createElement('button')
      btn.textContent = `btn-${i}`
      container.appendChild(btn)
      return btn
    })
    document.body.appendChild(container)
    return { container, buttons }
  }

  function tabEvent(shiftKey = false): KeyboardEvent {
    return new KeyboardEvent('keydown', { key: 'Tab', shiftKey, cancelable: true, bubbles: true })
  }

  it('容器不存在时应直接返回，不阻止默认行为、不移动焦点', () => {
    const outside = document.createElement('button')
    document.body.appendChild(outside)
    outside.focus()
    const e = tabEvent()
    trapTabFocus(e, undefined, null)
    expect(e.defaultPrevented).toBe(false)
    expect(document.activeElement).toBe(outside)
  })

  it('Tab 应把焦点移到下一个可聚焦元素，并阻止默认行为接管', () => {
    const { container, buttons } = makeContainer(3)
    buttons[0].focus()
    const e = tabEvent()
    trapTabFocus(e, container)
    expect(e.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(buttons[1])
  })

  it('在最后一个元素上按 Tab 应回绕到第一个', () => {
    const { container, buttons } = makeContainer(3)
    buttons[2].focus()
    trapTabFocus(tabEvent(), container)
    expect(document.activeElement).toBe(buttons[0])
  })

  it('在第一个元素上按 Shift + Tab 应回绕到最后一个', () => {
    const { container, buttons } = makeContainer(3)
    buttons[0].focus()
    trapTabFocus(tabEvent(true), container)
    expect(document.activeElement).toBe(buttons[2])
  })

  it('焦点不在容器内时，正序进入首个、倒序进入末个', () => {
    const { container, buttons } = makeContainer(3)
    const outside = document.createElement('button')
    document.body.appendChild(outside)

    outside.focus()
    trapTabFocus(tabEvent(), container)
    expect(document.activeElement).toBe(buttons[0])

    outside.focus()
    trapTabFocus(tabEvent(true), container)
    expect(document.activeElement).toBe(buttons[2])
  })

  it('不可见元素（如未展开面板）不应参与循环', () => {
    const { container, buttons } = makeContainer(3)
    // 模拟中间按钮不可见：getClientRects 为空
    buttons[1].getClientRects = () => [] as unknown as DOMRectList
    buttons[0].focus()
    trapTabFocus(tabEvent(), container)
    expect(document.activeElement).toBe(buttons[2])
  })

  it('容器内无可聚焦元素时应收敛到兜底元素，焦点不逃逸到背景页面', () => {
    const container = document.createElement('div')
    container.appendChild(document.createElement('div'))
    document.body.appendChild(container)
    const fallback = makeEl({})
    fallback.tabIndex = -1
    document.body.appendChild(fallback)
    const focusSpy = vi.spyOn(fallback, 'focus')

    const e = tabEvent()
    trapTabFocus(e, container, fallback)
    expect(e.defaultPrevented).toBe(true)
    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
  })

  it('兜底元素缺失时不应抛错（容器内无可聚焦元素）', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    expect(() => trapTabFocus(tabEvent(), container, null)).not.toThrow()
  })
})
