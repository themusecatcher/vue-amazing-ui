import Modal from './Modal.vue'
import ModalProviderComp from './ModalProvider.vue'
import { useModal as useModalImpl } from './useModal'
import { withInstall } from '../utils/type'

export type { Props as ModalProps, ModalOptions, ModalUpdate, ModalReactive } from './Modal.vue'
export type { ModalApi } from './useModal'

// 经本地常量再导出（同 select/grid 的具名导出）：纯 `export { useModal } from './useModal'` 会被
// Rollup 转发优化剔除该具名导出，致产物 index.js 缺它、而 index.d.ts 仍有声明（类型与运行时不一致）
export const useModal = useModalImpl

// 与普通组件一致，挂 install 以支持 app.use(ModalProvider) 单组件安装
export const ModalProvider = withInstall(ModalProviderComp)

export default withInstall(Modal)
