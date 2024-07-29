import type { App } from 'vue'
import Layout from './Layout.vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutSider from './LayoutSider.vue'
import LayoutContent from './LayoutContent.vue'
import LayoutFooter from './LayoutFooter.vue'

[Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter].forEach((component: any) => {
  // 使用install方法，在app.use挂载
  component.install = (app: App): void => {
    app.component(component.__name as string, component)
  }
})

export { Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter }
