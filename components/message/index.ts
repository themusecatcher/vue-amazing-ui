import Message from './Message.vue'
import MessageProviderComp from './MessageProvider.vue'
import { useMessage as useMessageImpl } from './useMessage'
import { withInstall } from '../utils/type'

export type { Props as MessageProps, MessageOptions, MessageReactive, MessageUpdate } from './Message.vue'
export type { MessageApi } from './useMessage'

// 经本地常量再导出（同 select/grid 的具名导出）：纯 `export { useMessage } from './useMessage'` 会被
// Rollup 转发优化剔除该具名导出，致产物 index.js 缺它、而 index.d.ts 仍有声明（类型与运行时不一致）
export const useMessage = useMessageImpl

// 与普通组件一致，挂 install 以支持 app.use(MessageProvider) 单组件安装
export const MessageProvider = withInstall(MessageProviderComp)

export default withInstall(Message)
