import type { App } from 'vue'
import Tag from './Tag.vue'
import { withInstall } from '../utils'

// 使用install方法，在app.use挂载
// Tag.install = (app: App) => {
//   app.component(Tag.__name as string, Tag)
// }

// export default Tag
export default withInstall(Tag)
