// 方便管理所有组件
import Pagination from './pagination'
import Breadcrumb from './breadcrumb'

// 提供全局 install 方法
const install = app => {
  app.use(Pagination)
  app.use(Breadcrumb)
}

const VueUi = {
  install,
}

export { // 方便按需导入
  Pagination,
  Breadcrumb
}

export default VueUi