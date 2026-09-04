import Modal from './Modal.vue'
import ModalProviderComp from './ModalProvider.vue'
import { withInstall } from '../utils/type'

export type {
  Props as ModalProps,
  ModalOptions,
  ModalUpdate,
  ModalReactive,
  FooterType,
  ModalCallback
} from './Modal.vue'
export type { ModalApi } from './useModal'
export { useModal } from './useModal'

// 与普通组件一致，挂 install 以支持 app.use(ModalProvider) 单组件安装
export const ModalProvider = withInstall(ModalProviderComp)

export default withInstall(Modal)
