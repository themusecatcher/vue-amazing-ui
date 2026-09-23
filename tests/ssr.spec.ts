// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { useFps, useMediaQuery } from 'components/utils'

import Avatar from 'components/avatar/Avatar.vue'
import Row from 'components/grid/row/Row.vue'
import Col from 'components/grid/col/Col.vue'
import Descriptions from 'components/descriptions/descriptions/Descriptions.vue'
import QRCode from 'components/qr-code/QRCode.vue'
import Tag from 'components/tag/Tag.vue'
import Tooltip from 'components/tooltip/Tooltip.vue'
import Dropdown from 'components/dropdown/dropdown/Dropdown.vue'
import Select from 'components/select/Select.vue'
import AutoComplete from 'components/auto-complete/AutoComplete.vue'
import Popover from 'components/popover/Popover.vue'
import Watermark from 'components/watermark/Watermark.vue'
import Carousel from 'components/carousel/Carousel.vue'
import TextScroll from 'components/text-scroll/TextScroll.vue'
import Scrollbar from 'components/scrollbar/Scrollbar.vue'
import Slider from 'components/slider/Slider.vue'
import BackTop from 'components/back-top/BackTop.vue'
import Ellipsis from 'components/ellipsis/Ellipsis.vue'
import Rate from 'components/rate/Rate.vue'
import Tabs from 'components/tabs/Tabs.vue'
import Drawer from 'components/drawer/Drawer.vue'

/**
 * 回归守护：`SSR` / `Node` 环境下组件不得在 `setup` 阶段裸访问 `window` / `document` /
 * `requestAnimationFrame`。
 *
 * 该文件在 node 环境下运行（无 DOM 全局），逐个 `renderToString` 上述组件：
 * 一旦某组件（或其依赖的共享组合式函数 `useMutationObserver` / `useResizeObserver` /
 * `useScrollParent`）在 `setup` 中裸访问浏览器全局对象，渲染即抛 `ReferenceError`，用例失败。
 *
 * 注意：tests/setup.ts 为 happy-dom 用例注入了 rAF polyfill，而真实 `SSR` 环境并无该 API，
 * 故此处先移除再渲染，避免 polyfill 掩盖「`setup` 阶段依赖 `requestAnimationFrame`」的缺陷。
 */
const realRaf = globalThis.requestAnimationFrame
const realCancelRaf = globalThis.cancelAnimationFrame

beforeAll(() => {
  Reflect.deleteProperty(globalThis, 'requestAnimationFrame')
  Reflect.deleteProperty(globalThis, 'cancelAnimationFrame')
})

afterAll(() => {
  globalThis.requestAnimationFrame = realRaf
  globalThis.cancelAnimationFrame = realCancelRaf
})

const HookProbe = defineComponent({
  setup() {
    useMediaQuery('(min-width: 600px)')
    useFps()
    return () => h('div')
  }
})

const renderComponent = (component: unknown, props: Record<string, unknown> = {}) =>
  renderToString(createSSRApp({ render: () => h(component as never, props) }))

describe('SSR 渲染安全性', () => {
  it('changelog 声明的组件与工具函数可在 Node 环境渲染', async () => {
    await expect(renderComponent(Avatar, { src: 'avatar.png' })).resolves.toBeTruthy()
    await expect(renderComponent(Row)).resolves.toBeTruthy()
    await expect(renderComponent(Col)).resolves.toBeTruthy()
    await expect(renderComponent(Descriptions)).resolves.toBeTruthy()
    await expect(renderComponent(QRCode, { value: 'https://example.com' })).resolves.toBeTruthy()
    await expect(renderComponent(Tag, { value: ['tag'] })).resolves.toBeTruthy()
    await expect(renderComponent(HookProbe)).resolves.toBeTruthy()
  })

  it('依赖共享组合式函数的组件可在 Node 环境渲染', async () => {
    await expect(renderComponent(Tooltip, { content: 'tooltip' })).resolves.toBeTruthy()
    await expect(renderComponent(Dropdown, { menus: [{ key: '1', label: 'menu' }] })).resolves.toBeTruthy()
    await expect(renderComponent(Select, { options: [{ label: 'a', value: 1 }] })).resolves.toBeTruthy()
    await expect(renderComponent(AutoComplete, { value: '', options: ['a'] })).resolves.toBeTruthy()
    await expect(renderComponent(Popover)).resolves.toBeTruthy()
    await expect(renderComponent(Watermark, { content: 'watermark' })).resolves.toBeTruthy()
    await expect(renderComponent(Carousel, { images: [{ src: 'a.png' }] })).resolves.toBeTruthy()
    await expect(renderComponent(TextScroll, { items: [{ title: 'a' }] })).resolves.toBeTruthy()
    await expect(renderComponent(Scrollbar)).resolves.toBeTruthy()
    await expect(renderComponent(Slider)).resolves.toBeTruthy()
    await expect(renderComponent(BackTop)).resolves.toBeTruthy()
    await expect(renderComponent(Ellipsis, { content: 'text' })).resolves.toBeTruthy()
    await expect(renderComponent(Rate)).resolves.toBeTruthy()
    await expect(renderComponent(Tabs)).resolves.toBeTruthy()
  })
})

/**
 * 浮层组件默认挂载 `body`（`Teleport`），服务端渲染时内容进入 `ssrContext.teleports`，
 * 需应用侧注入到 HTML；此处锁定该契约，避免后续把 Teleport 去掉或改错目标节点而无人察觉。
 */
describe('SSR 浮层与 Teleport', () => {
  const renderWithContext = (props: Record<string, unknown>) => {
    const ssrContext: { teleports?: Record<string, string> } = {}
    return renderToString(createSSRApp({ render: () => h(Drawer, props) }), ssrContext).then((html) => ({
      html,
      ssrContext
    }))
  }

  it('默认挂载 body：原位只留锚点，内容进入 teleports.body', async () => {
    const { html, ssrContext } = await renderWithContext({ open: true, title: 't' })
    expect(html).toContain('teleport')
    expect(ssrContext.teleports?.body).toContain('drawer-wrap')
  })

  it('to 传 false 时渲染在当前 DOM：内容留在原位，不进入 teleports', async () => {
    const { html, ssrContext } = await renderWithContext({ open: true, title: 't', to: false })
    expect(html).toContain('drawer-wrap')
    // Teleport 处于 disabled：内容随组件原位输出，不会收集到 teleports
    expect(String(ssrContext.teleports?.body ?? '')).not.toContain('drawer-wrap')
  })
})
