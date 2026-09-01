import Message from './Message.vue'
import MessageProviderComp from './MessageProvider.vue'
import { withInstall } from '../utils/type'

export type { Props, Message, MessageReactive, MessageUpdate } from './Message.vue'
export type { MessageApi } from './useMessage'
export { useMessage } from './useMessage'

// 与普通组件一致，挂 install 以支持 app.use(MessageProvider) 单组件安装
export const MessageProvider = withInstall(MessageProviderComp)

export default withInstall(Message)
