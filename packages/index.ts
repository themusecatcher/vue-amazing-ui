import type { App } from 'vue'
import Pagination from './pagination'
import Breadcrumb from './breadcrumb'

// 所有组件列表
const components = [
  Pagination,
  Breadcrumb
]

// 定义 install 方法
const install = (app: App): void => {
  // 遍历注册所有组件
  components.forEach(component => app.component(component.name, component))
}

const VueAmazingUi = {
  install
}

export { // 方便按需导入
  Pagination,
  Breadcrumb
}

export default VueAmazingUi