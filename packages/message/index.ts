import type { App } from 'vue'
import Message from './Message.vue'

// 使用install方法，在app.use挂载
Message.install = (app: App): void => {
  app.component(Message.__name as string, Message)
}

export default Message
