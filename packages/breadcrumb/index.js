import Breadcrumb from './Breadcrumb.vue'

// 使用install方法，在app.use挂载
Breadcrumb.install = app => {
  app.component(Breadcrumb.name, Breadcrumb)
}

export default Breadcrumb