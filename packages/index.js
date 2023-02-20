// 方便管理所有组件
import Pagination from './pagination'
import Breadcrumb from './breadcrumb'

const components = [
  Pagination,
  Breadcrumb
]

// 提供全局 install 方法
const install = app => {
  components.forEach(comp => app.use(comp))
}

const VueAmazingUi = {
  install
}

export { // 方便按需导入
  Pagination,
  Breadcrumb
}

export default VueAmazingUi