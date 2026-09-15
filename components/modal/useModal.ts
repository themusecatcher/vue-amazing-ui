import { inject } from 'vue'
import type { InjectionKey } from 'vue'
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

export const modalApiKey: InjectionKey<ModalApi> = Symbol('modalApi')

/**
 * 在 `setup` 内获取 Modal api，需在 `<ModalProvider>` 内部使用。
 * 脱离组件树的场景请改用 `createDiscreteApi`。
 */
export function useModal(): ModalApi {
  const api = inject(modalApiKey, null)
  if (!api) {
    throw new Error('[useModal] 未获取到 Modal api，请在 <ModalProvider> 内部使用，或改用 createDiscreteApi')
  }
  return api
}
