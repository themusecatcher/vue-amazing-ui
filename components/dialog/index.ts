import Dialog from './Dialog.vue'
import DialogProviderComp from './DialogProvider.vue'
import { withInstall } from '../utils/type'

export type { Props as DialogProps, DialogOptions, DialogUpdate, DialogReactive } from './Dialog.vue'
export type { DialogApi } from './useDialog'
export { useDialog } from './useDialog'

// 与普通组件一致，挂 install 以支持 app.use(DialogProvider) 单组件安装
export const DialogProvider = withInstall(DialogProviderComp)

export default withInstall(Dialog)
