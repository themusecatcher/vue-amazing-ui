import Notification from './Notification.vue'
import NotificationProviderComp from './NotificationProvider.vue'
import { useNotification as useNotificationImpl } from './useNotification'
import { withInstall } from '../utils/type'

export type {
  Props as NotificationProps,
  NotificationOptions,
  NotificationReactive,
  NotificationUpdate
} from './Notification.vue'
export type { NotificationApi } from './useNotification'

// 经本地常量再导出（同 select/grid 的具名导出）：纯 `export { useNotification } from './useNotification'`
// 会被 Rollup 转发优化剔除该具名导出，致产物 index.js 缺它、而 index.d.ts 仍有声明（类型与运行时不一致）
export const useNotification = useNotificationImpl

// 与普通组件一致，挂 install 以支持 app.use(NotificationProvider) 单组件安装
export const NotificationProvider = withInstall(NotificationProviderComp)

export default withInstall(Notification)
