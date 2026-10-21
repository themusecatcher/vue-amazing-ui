// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'
import { buildComponentVars } from 'components/config-provider/use-theme-seed'
import { resolveTeleportTheme } from 'components/config-provider/use-theme-teleport'
import { derive, deriveColorStates } from 'components/theme'

/**
 * 编排层拆分后的纯函数单测
 *
 * `buildComponentVars` 与 `resolveTeleportTheme` 都不依赖 Vue / DOM，原先只能通过挂载
 * `ConfigProvider` 间接覆盖；拆出来后可以直接断言输入输出。
 */
const GREEN = '#18a058'

describe('buildComponentVars', () => {
  it('生成桥与公开令牌，两者取值同源', () => {
    const vars = buildComponentVars({ Button: { primaryColor: GREEN } }, 'light')
    const states = deriveColorStates(GREEN, 'light')

    expect(vars['--va-cp-button-primary-color']).toBe(states.base)
    expect(vars['--va-button-primary-color']).toBe(states.base)
    expect(vars['--va-button-primary-color-hover']).toBe(states.hover)
    expect(vars['--va-cp-button-focus-shadow']).toBe(derive({ primary: GREEN }, 'light')['--va-focus-shadow'])
  })

  it('无配置返回空对象', () => {
    expect(buildComponentVars(undefined, 'light')).toEqual({})
  })

  it('非法主色只告警并跳过该组件', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(buildComponentVars({ Button: { primaryColor: 'red' } }, 'light')).toEqual({})
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })

  it('8 位不透明 hex 与 6 位等价（含大写与前后空格）', () => {
    expect(buildComponentVars({ Button: { primaryColor: '#18a058ff' } }, 'light')).toEqual(
      buildComponentVars({ Button: { primaryColor: GREEN } }, 'light')
    )
    expect(buildComponentVars({ Button: { primaryColor: ' #18A058FF ' } }, 'light')).toEqual(
      buildComponentVars({ Button: { primaryColor: GREEN } }, 'light')
    )
  })

  it('半透明 8 位 hex 仍被拒绝（只接受 alpha 为 ff）', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(buildComponentVars({ Button: { primaryColor: '#18a05880' } }, 'light')).toEqual({})
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})

describe('resolveTeleportTheme', () => {
  const snapshot = derive({ primary: GREEN }, 'light')

  it('有种子时携带全局令牌与模式', () => {
    const theme = resolveTeleportTheme({
      seeded: true,
      explicitMode: false,
      getSnapshot: () => snapshot,
      componentVars: {},
      mode: 'light'
    })
    expect(theme.vars['--va-primary-color']).toBe(snapshot['--va-primary-color'])
    expect(theme.mode).toBe('light')
  })

  it('无种子时不带全局令牌，未显式 mode 时不下发模式', () => {
    const theme = resolveTeleportTheme({
      seeded: false,
      explicitMode: false,
      getSnapshot: () => snapshot,
      componentVars: { '--va-cp-table-primary-color': '#ff0000' },
      mode: 'light'
    })
    expect(theme.vars['--va-primary-color']).toBeUndefined()
    expect(theme.vars['--va-cp-table-primary-color']).toBe('#ff0000')
    expect(theme.mode).toBeUndefined()
  })

  it('无种子时不读取派生结果（惰性 getSnapshot，不触发 derive）', () => {
    let called = false
    const theme = resolveTeleportTheme({
      seeded: false,
      explicitMode: false,
      getSnapshot: () => {
        called = true
        return snapshot
      },
      componentVars: { '--va-cp-table-primary-color': '#ff0000' },
      mode: 'light'
    })
    expect(called).toBe(false)
    expect(theme.vars['--va-cp-table-primary-color']).toBe('#ff0000')
  })

  it('无种子但显式 mode 时仍下发模式', () => {
    const theme = resolveTeleportTheme({
      seeded: false,
      explicitMode: true,
      getSnapshot: () => snapshot,
      componentVars: {},
      mode: 'dark'
    })
    expect(theme.mode).toBe('dark')
  })
})
