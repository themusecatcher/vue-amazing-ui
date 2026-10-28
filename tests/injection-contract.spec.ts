import { describe, it, expect, afterEach, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Drawer from 'components/drawer'
import Tooltip from 'components/tooltip'
import { createDiscreteApi } from 'components/discrete'
import type { DiscreteApiInstance } from 'components/discrete'
import { derive } from 'components/theme'
import { injectFromChain } from 'components/utils'
// 注入键属内部契约（不对外导出），测试直接深引入实现文件
import {
  skipThemeWriteKey,
  themeScopeKey,
  themeModeKey,
  themeSeedKey,
  themeSnapshotKey,
  themeDomScopeKey,
  themeTeleportKey
} from 'components/config-provider/context'
import { zIndexManagerKey, zIndexContainerOpenKey } from 'components/utils/z-index'
import { siderCollapsedKey } from 'components/utils/sider-collapsed'
import { siderHookKey } from 'components/layout/siderHook'
import { menuContextKey } from 'components/menu/context'
import { radioGroupContextKey } from 'components/radio/context'
import { checkboxGroupContextKey } from 'components/checkbox/context'
import { dropdownMenuContextKey } from 'components/dropdown/DropdownMenu'
import { modalApiKey } from 'components/modal/useModal'
import { dialogApiKey } from 'components/dialog/useDialog'
import { messageApiKey } from 'components/message/useMessage'
import { notificationApiKey } from 'components/notification/useNotification'
import { loadingBarApiKey } from 'components/loading-bar/useLoadingBar'
import { parentDrawerOptsKey } from 'components/drawer/context'

/**
 * provide / inject 注入契约回归守护
 *
 * 四条容易无声失效的不变量：
 * - **读取通道**：`inject()` 在 `app.runWithContext`（vue-router 导航守卫）上下文里只翻宿主 app 的
 *   app 级 `provides`，读不到组件级 `provide`。`createDiscreteApi()` 正是在守卫里创建离散实例，
 *   故必须走 `injectFromChain`，否则层级管理器与主题转发全部丢失（且不报错，只是静默退回默认值）；
 * - **键形态**：注入键必须是 Symbol，否则宿主应用 `app.provide('zIndex', ...)` 之类的通用名会被库
 *   当成自己的契约读取（实测 `useZIndex` 抛 `manager.allocate is not a function`）；
 * - **对照一致性**：普通上下文与守卫上下文的结果必须一致（防修复引入回退）；
 * - **契约自描述**：键名 / 描述串可被 `scripts/verify-inject-keys.js` 静态校验。
 */

/** 等待「离散实例挂载 → 首帧渲染」两拍 */
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

/** 从内联样式中取 CSS 变量值 */
function readCssVar(style: string | null | undefined, name: string): string {
  const matched = style?.match(new RegExp(`--${name}:\\s*([^;]+)`))
  return matched ? matched[1].trim() : ''
}

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

/** 守卫场景：在宿主 app 的 `runWithContext` 内创建离散实例（等价 vue-router 导航守卫） */
function createInGuardContext<T extends 'message' | 'loadingBar'>(
  types: T[],
  options: Parameters<typeof createDiscreteApi>[1] = {}
): { api: DiscreteApiInstance<T>; host: ReturnType<typeof createApp> } {
  const host = createApp({ render: () => null })
  host.mount(document.createElement('div'))
  let api!: DiscreteApiInstance<T>
  host.runWithContext(() => {
    api = createDiscreteApi(types, options) as DiscreteApiInstance<T>
  })
  return { api, host }
}

describe('守卫上下文（app.runWithContext）内的离散实例', () => {
  it('层级：configProviderProps.baseZIndex 仍然生效（loadingBar 不再退回 9999）', async () => {
    const { api, host } = createInGuardContext(['loadingBar'], {
      configProviderProps: { baseZIndex: 5000 }
    })
    api.loadingBar.start()
    await sleep(50)

    const wrap = document.querySelector<HTMLElement>('.loading-bar-wrap')
    expect(wrap).not.toBeNull()
    // 精确值：唯一一层从 baseZIndex 起分配。未注入管理器时会回退 FLOATING_LAYER_Z_INDEX.loadingBar = 9999，
    // 故这里必须断言相等 —— 写成「≥ 5000」会让 9999 也算通过，失去守护意义
    expect(Number(readCssVar(wrap?.getAttribute('style'), 'loading-bar-z-index'))).toBe(5000)

    api.dispose()
    await sleep(0)
    host.unmount()
  })

  it('主题：configProviderProps.theme 仍然生效（浮层自带内联变量与 data-va-mode）', async () => {
    const { api, host } = createInGuardContext(['message'], {
      configProviderProps: { theme: { seed: { primary: '#ff0000' } } }
    })
    api.message.info({ content: '守卫上下文主题消息', duration: null })
    await sleep(50)

    const wrap = document.querySelector<HTMLElement>('.message-wrap')
    expect(wrap).not.toBeNull()
    expect(wrap?.style.getPropertyValue('--va-primary-color')).toBe(
      derive({ primary: '#ff0000' }, 'light')['--va-primary-color']
    )
    expect(wrap?.getAttribute('data-va-mode')).toBe('light')

    api.dispose()
    await sleep(0)
    host.unmount()
  })
})

describe('对照组：普通上下文的创建结果', () => {
  // 与守卫场景逐条对照：同一断言、同一期望值，修复只应改变「能否读到」，不应改变读到的内容
  it('层级：baseZIndex 从起点分配（与守卫上下文结果一致）', async () => {
    const api = createDiscreteApi(['loadingBar'], {
      configProviderProps: { baseZIndex: 5000 }
    })
    api.loadingBar.start()
    await sleep(50)

    const loadingWrap = document.querySelector<HTMLElement>('.loading-bar-wrap')
    expect(Number(readCssVar(loadingWrap?.getAttribute('style'), 'loading-bar-z-index'))).toBe(5000)

    api.dispose()
    await sleep(0)
  })

  it('主题：浮层根节点内联该作用域的令牌与模式', async () => {
    const api = createDiscreteApi(['message'], {
      configProviderProps: { theme: { seed: { primary: '#ff0000' } } }
    })
    api.message.info({ content: '普通上下文主题消息', duration: null })
    await sleep(50)

    const messageWrap = document.querySelector<HTMLElement>('.message-wrap')
    expect(messageWrap?.style.getPropertyValue('--va-primary-color')).toBe(
      derive({ primary: '#ff0000' }, 'light')['--va-primary-color']
    )
    expect(messageWrap?.getAttribute('data-va-mode')).toBe('light')

    api.dispose()
    await sleep(0)
  })
})

describe('命名空间隔离：宿主 provide 的通用字符串键不再被库读取', () => {
  const hostProvides = {
    zIndex: 'host-owned-value',
    zIndexContainerOpen: {},
    parentDrawerOpts: {},
    themeMode: 'dark',
    themeTeleport: {}
  }

  it('锚点浮层：层级退回默认值且不抛错（键是 Symbol，命不中宿主同名键）', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    wrapper = mount(Tooltip, {
      attachTo: document.body,
      props: { tooltip: 'hi', open: true },
      global: { stubs: { transition: false }, provide: hostProvides }
    })
    await nextTick()
    await sleep(0)

    const style = document.querySelector('.tooltip-card-container')?.getAttribute('style') ?? ''
    expect(style).toContain('z-index: 1070')
    // 宿主同名键若被当成库的键，层级会变成字符串触发 TypeError（Vue 在挂载钩子里捕获后打到 console.error）
    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it('多层抽屉：推动通道仍走库自己的 Symbol 键（宿主的 parentDrawerOpts 不参与）', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const Host = defineComponent({
      render: () =>
        h(
          Drawer,
          { open: true, to: false },
          { default: () => h(Drawer, { open: true, to: false }, { default: () => 'inner' }) }
        )
    })
    wrapper = mount(Host, {
      attachTo: document.body,
      global: { stubs: { transition: false }, provide: hostProvides }
    })
    await nextTick()

    expect(wrapper.findAll('.drawer-wrap').length).toBe(2)
    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it('读取通道：宿主 app 级 provide 与库组件级 provide 互不影响', () => {
    let injected: unknown = 'unset'
    const Probe = defineComponent({
      setup() {
        injected = injectFromChain(zIndexManagerKey)
        return () => h('div')
      }
    })
    wrapper = mount(Probe, { global: { provide: hostProvides } })
    expect(injected).toBeUndefined()
  })
})

describe('注入键形态', () => {
  /** 全库注入键（新增键必须同步登记：脚本只校验源码文本形态，运行期的 Symbol 与描述串由本用例守护） */
  const INJECTION_KEYS = {
    skipThemeWriteKey,
    themeScopeKey,
    themeModeKey,
    themeSeedKey,
    themeSnapshotKey,
    themeDomScopeKey,
    themeTeleportKey,
    zIndexManagerKey,
    zIndexContainerOpenKey,
    siderCollapsedKey,
    siderHookKey,
    menuContextKey,
    radioGroupContextKey,
    checkboxGroupContextKey,
    dropdownMenuContextKey,
    modalApiKey,
    dialogApiKey,
    messageApiKey,
    notificationApiKey,
    loadingBarApiKey,
    parentDrawerOptsKey
  }

  it('全部为 Symbol 且描述串带 va 前缀（DevTools 可辨识归属）', () => {
    Object.entries(INJECTION_KEYS).forEach(([name, key]) => {
      expect(typeof key, `${name} 必须是 Symbol`).toBe('symbol')
      expect(key.description, `${name} 的描述串`).toMatch(/^va[A-Z]/)
    })
    // 唯一性：同一运行时下不会有两个键命中同一个 provide
    expect(new Set(Object.values(INJECTION_KEYS)).size).toBe(Object.keys(INJECTION_KEYS).length)
  })
})
