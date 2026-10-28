import type { InjectionKey } from 'vue'
import { injectFromChain } from 'components/utils'

export interface LoadingBarApi {
  start: (from?: number, to?: number, status?: 'starting' | 'error') => Promise<void>
  finish: () => Promise<void>
  error: () => void
}

/**
 * 加载条命令式 api 的注入键
 *
 * - 提供方：`LoadingBarProvider`
 * - 消费方：`useLoadingBar`
 * - 响应式：否（api 对象为稳定引用）
 * - 未命中：`undefined`，`useLoadingBar` 抛错提示改用 `createDiscreteApi`
 */
export const loadingBarApiKey: InjectionKey<LoadingBarApi> = Symbol('vaLoadingBarApi')

/**
 * 在 `setup` 内获取 LoadingBar api，需在 `<LoadingBarProvider>` 内部使用。
 * 脱离组件树的场景请改用 `createDiscreteApi`。
 */
export function useLoadingBar(): LoadingBarApi {
  const api = injectFromChain(loadingBarApiKey)
  if (!api) {
    throw new Error(
      '[useLoadingBar] 未获取到 LoadingBar api，请在 <LoadingBarProvider> 内部使用，或改用 createDiscreteApi'
    )
  }
  return api
}
