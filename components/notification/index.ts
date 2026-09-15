import Notification from './Notification.vue'
import NotificationProviderComp from './NotificationProvider.vue'
import { withInstall } from '../utils/type'

export type {
  Props as NotificationProps,
  NotificationOptions,
  NotificationReactive,
  NotificationUpdate
} from './Notification.vue'
export type { NotificationApi } from './useNotification'
export { useNotification } from './useNotification'

// 与普通组件一致，挂 install 以支持 app.use(NotificationProvider) 单组件安装
export const NotificationProvider = withInstall(NotificationProviderComp)

export default withInstall(Notification)
