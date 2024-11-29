import type { App } from 'vue'
import Layout from './Layout.vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutSider from './LayoutSider.vue'
import LayoutContent from './LayoutContent.vue'
import LayoutFooter from './LayoutFooter.vue'
;[Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter].forEach((component: any) => {
  export type { Props } from './.vue'

  // 使用 install 方法，在 app.use 挂载
  component.install = (app: App) => {
    app.component(component.__name as string, component)
  }
})

export { Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter }
