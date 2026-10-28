import type { InjectionKey } from 'vue'
import { injectFromChain } from 'components/utils'
import type { ModalOptions, ModalReactive } from './Modal.vue'

export interface ModalApi {
  info(data: ModalOptions): ModalReactive
  success(data: ModalOptions): ModalReactive
  error(data: ModalOptions): ModalReactive
  warning(data: ModalOptions): ModalReactive
  confirm(data: ModalOptions): ModalReactive
  erase(data: ModalOptions): ModalReactive
  create(data: ModalOptions): ModalReactive
  destroyAll(): void
}

/**
 * 模态框命令式 api 的注入键
 *
 * - 提供方：`ModalProvider`
 * - 消费方：`useModal`
 * - 响应式：否（api 对象为稳定引用）
 * - 未命中：`undefined`，`useModal` 抛错提示改用 `createDiscreteApi`
 */
export const modalApiKey: InjectionKey<ModalApi> = Symbol('vaModalApi')

/**
 * 在 `setup` 内获取 Modal api，需在 `<ModalProvider>` 内部使用。
 * 脱离组件树的场景请改用 `createDiscreteApi`。
 */
export function useModal(): ModalApi {
  const api = injectFromChain(modalApiKey)
  if (!api) {
    throw new Error('[useModal] 未获取到 Modal api，请在 <ModalProvider> 内部使用，或改用 createDiscreteApi')
  }
  return api
}
