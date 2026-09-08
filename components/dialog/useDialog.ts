import { inject } from 'vue'
import type { InjectionKey } from 'vue'
import type { DialogOptions, DialogReactive } from './Dialog.vue'

/**
 * Dialog 命令式 API
 *
 * 与 `useModal` 的分工：本库 Modal 承担「通知提醒」职责，按类型提供
 * info / success / error / warning / confirm / erase 等语义方法；
 * Dialog 承担「大批量内容展示与表单渲染」职责，本身不区分类型、不带语义图标，
 * 因此这里只提供 open 与 destroyAll 两个与类型无关的方法。
 */
export interface DialogApi {
  /** 打开一个对话框，返回该实例的句柄 */
  open(data: DialogOptions): DialogReactive
  /** 关闭所有由本 Provider 打开的对话框 */
  destroyAll(): void
}

export const dialogApiKey: InjectionKey<DialogApi> = Symbol('dialogApi')

/**
 * 在 `setup` 内获取 Dialog api，需在 `<DialogProvider>` 内部使用。
 */
export function useDialog(): DialogApi {
  const api = inject(dialogApiKey, null)
  if (!api) {
    throw new Error('[useDialog] 未获取到 Dialog api，请在 <DialogProvider> 内部使用')
  }
  return api
}
