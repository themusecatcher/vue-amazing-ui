import Dialog from './Dialog.vue'
import DialogProviderComp from './DialogProvider.vue'
import { useDialog as useDialogImpl } from './useDialog'
import { withInstall } from '../utils/type'

export type { Props as DialogProps, DialogOptions, DialogUpdate, DialogReactive } from './Dialog.vue'
export type { DialogApi } from './useDialog'

// 经本地常量再导出（同 select/grid 的具名导出）：纯 `export { useDialog } from './useDialog'` 会被
// Rollup 转发优化剔除该具名导出，致产物 index.js 缺它、而 index.d.ts 仍有声明（类型与运行时不一致）
export const useDialog = useDialogImpl

// 与普通组件一致，挂 install 以支持 app.use(DialogProvider) 单组件安装
export const DialogProvider = withInstall(DialogProviderComp)

export default withInstall(Dialog)
