import { describe, it, expect, vi, afterEach } from 'vitest'
import { warnUsage, isDevEnv } from 'components/utils'

/**
 * 开发期告警（`components/utils/warn.ts`）契约回归
 *
 * 该模块承载两条对外承诺（见 development/component-design.md 的「开发期告警 warnUsage」）：
 * 1. 文案结构固定为 `[vue-amazing-ui] {组件名或工具名}: {说明}`，便于使用方在控制台过滤；
 * 2. 仅开发环境输出 —— 环境判定读 `process.env.NODE_ENV`（由使用方打包工具替换），
 *    生产环境必须静默，否则会污染线上控制台。
 */
describe('warnUsage 开发期告警', () => {
  const originalNodeEnv = process.env.NODE_ENV

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv
    vi.restoreAllMocks()
  })

  it('文案结构固定为 [vue-amazing-ui] {名称}: {说明}', () => {
    process.env.NODE_ENV = 'development'
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    warnUsage('ColorPicker', '色板中的颜色 #12345 无效，已忽略该色板')

    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith('[vue-amazing-ui] ColorPicker: 色板中的颜色 #12345 无效，已忽略该色板')
  })

  it('生产环境判定为非开发环境且不输出告警', () => {
    process.env.NODE_ENV = 'production'
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(isDevEnv()).toBe(false)
    warnUsage('ColorPicker', '不该出现')
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('非生产环境（含 test）视为开发环境', () => {
    process.env.NODE_ENV = 'test'
    expect(isDevEnv()).toBe(true)
  })
})
