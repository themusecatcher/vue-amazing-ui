import type { App } from 'vue'
import Card from './Card.vue'

// 使用install方法，在app.use挂载
Card.install = (app: App): void => {
  app.component(Card.__name as string, Card)
}

export default Card
