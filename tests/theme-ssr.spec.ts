// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import ConfigProvider from 'components/config-provider/ConfigProvider.vue'
import { derive, deriveColorStates } from 'components/theme'

/**
 * SSR：服务端不访问 `document`，自定义主题经包裹元素的内联变量随 HTML 输出
 *
 * 首帧外观 = 服务端渲染时的 mode 与种子；客户端挂载后仅在值不同时重写。
 */
const render = (props: Record<string, unknown>, slotText = 'content'): Promise<string> =>
  renderToString(
    createSSRApp({
      render: () => h(ConfigProvider, props, { default: () => h('span', slotText) })
    })
  )

describe('ConfigProvider 主题的 SSR', () => {
  it('默认形态（包裹元素）在 Node 环境渲染不访问 document', async () => {
    const html = await render({ theme: { seed: { primary: '#f5222d' }, mode: 'dark' } })
    expect(html).toContain('content')
    // 默认 abstract: false：变量与模式随包裹元素一起序列化，SSR 首帧即正确
    expect(html).toContain('config-provider-wrap')
    expect(html).toContain('data-va-mode="dark"')
    expect(html).toContain('--va-primary-color')
  })

  it('abstract: true 不产出包裹元素，首帧沿用静态默认表（变量在客户端写 <html>）', async () => {
    const html = await render({ abstract: true, theme: { seed: { primary: '#f5222d' }, mode: 'dark' } })
    expect(html).toContain('content')
    expect(html).not.toContain('config-provider-wrap')
    expect(html).not.toContain('--va-primary-color')
  })

  it('abstract: false 时变量直接序列化进包裹元素，首帧即为自定义主题', async () => {
    const html = await render({ abstract: false, theme: { seed: { primary: '#f5222d' }, mode: 'dark' } })
    expect(html).toContain('config-provider-wrap')
    // 暗色下常态色取暗色色阶的第 6 档，不等于种子本身
    expect(html).toContain(`--va-primary-color:${derive({ primary: '#f5222d' }, 'dark')['--va-primary-color']}`)
    expect(html).toContain('data-va-mode="dark"')
    // 与运行期派生逐值一致：抽一个派生值比对
    expect(html).toContain(
      `--va-bg-container-color:${derive({ primary: '#f5222d' }, 'dark')['--va-bg-container-color']}`
    )
  })

  it('组件级主色随包裹元素序列化，首帧即为组件主题', async () => {
    const html = await render({
      theme: { seed: { primary: '#f5222d' }, components: { Button: { primaryColor: '#18a058' } } }
    })
    expect(html).toContain('config-provider-wrap')
    expect(html).toContain(`--va-button-primary-color:${deriveColorStates('#18a058').base}`)
  })

  it('未传 theme 时不输出任何变量（完全交给静态默认表）', async () => {
    const html = await render({ abstract: false })
    expect(html).toContain('config-provider-wrap')
    expect(html).not.toContain('--va-primary-color')
    expect(html).not.toContain('data-va-mode')
  })

  it('mode="auto" 时首帧不下发变量与模式属性（服务端无从得知系统偏好，避免 hydration mismatch）', async () => {
    const html = await render({ abstract: false, theme: { seed: { primary: '#f5222d' }, mode: 'auto' } })
    expect(html).toContain('config-provider-wrap')
    expect(html).toContain('content')
    expect(html).not.toContain('--va-primary-color')
    expect(html).not.toContain('data-va-mode')
  })
})
