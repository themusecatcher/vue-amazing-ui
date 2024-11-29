import type { App } from 'vue'
import Card from './Card.vue'
export type { Props } from './Card.vue'

// 使用 install 方法，在 app.use 挂载
Card.install = (app: App) => {
  app.component(Card.__name as string, Card)
  return app
}

export default Card
