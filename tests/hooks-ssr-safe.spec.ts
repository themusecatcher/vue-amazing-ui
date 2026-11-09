import { describe, it, expect, vi, afterEach } from 'vitest'
import { useOptionsSupported } from 'components/utils'

/**
 * 回归守护：`useOptionsSupported` 的 SSR 安全路径
 *
 * 该 hook 在 setup 期直接读取 `window`。无 `window` 的环境（SSR / Node）必须显式返回
 * `isSupported = false` 且**不抛错**，不能依赖 `try/catch` 吞掉 `ReferenceError`——
 * 否则一旦有人在 `catch` 里补日志，SSR 期就会刷警告。
 */
describe('useOptionsSupported SSR 安全', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('无 window 时返回 false 且不抛错', () => {
    vi.stubGlobal('window', undefined)
    for (const option of ['capture', 'once', 'passive', 'signal'] as const) {
      expect(() => useOptionsSupported(option)).not.toThrow()
      expect(useOptionsSupported(option).isSupported.value).toBe(false)
    }
  })

  it('有 window 时探测链路仍然生效', () => {
    // happy-dom 会读取 capture / signal 选项，可用于确认「守卫没有把探测短路掉」
    expect(useOptionsSupported('capture').isSupported.value).toBe(true)
  })
})
