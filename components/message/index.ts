import type { App } from 'vue'
import Message from './Message.vue'
export type { Props, Message } from './Message.vue'

// 使用 install 方法，在 app.use 挂载
Message.install = (app: App) => {
  app.component(Message.__name as string, Message)
  return app
}

export default Message
