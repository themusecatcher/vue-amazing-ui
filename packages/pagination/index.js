import Pagination from './Pagination.vue'

// 使用install方法，在app.use挂载
Pagination.install = app => {
  app.component(Pagination.name, Pagination)
}

export default Pagination