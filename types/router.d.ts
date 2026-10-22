// 演示站路由 meta 的补充字段声明：各 src/views/<name>/index.ts 的默认导出对象即该路由的 meta
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 页面标题：用于浏览器标题与左侧菜单文案
    title?: string
    // 是否渲染外壳自带的 BackTop：显式传 false 时关闭（页面内自带回到顶部时使用）
    backTop?: boolean
    // 是否为窗口级滚动页面：水印演示页等需要整屏覆盖时置 true，由 GlobalLayout 读取
    windowScroll?: boolean
  }
}
