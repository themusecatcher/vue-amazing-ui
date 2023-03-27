import { createRouter, createWebHistory } from 'vue-router'
import { setDocumentTitle, domTitle, rafTimeout } from '@/utils/util'
import GlobalLayout from '@/layouts/GlobalLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: GlobalLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '首页' },
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/breadcrumb',
        name: 'Breadcrumb',
        meta: { title: '面包屑' },
        component: () => import('@/views/Breadcrumb.vue')
      },
      {
        path: '/button',
        name: 'Button',
        meta: { title: '按钮' },
        component: () => import('@/views/Button.vue')
      },
      {
        path: '/cascader',
        name: 'Cascader',
        meta: { title: '级联选择' },
        component: () => import('@/views/Cascader.vue')
      },
      {
        path: '/checkbox',
        name: 'Checkbox',
        meta: { title: '多选框' },
        component: () => import('@/views/Checkbox.vue')
      },
      {
        path: '/countdown',
        name: 'Countdown',
        meta: { title: '倒计时' },
        component: () => import('@/views/Countdown.vue')
      },
      {
        path: '/datepicker',
        name: 'DatePicker',
        meta: { title: '日期选择器' },
        component: () => import('@/views/DatePicker.vue')
      },
      {
        path: '/dialog',
        name: 'Dialog',
        meta: { title: '对话框' },
        component: () => import('@/views/Dialog.vue')
      },
      {
        path: '/message',
        name: 'Message',
        meta: { title: '全局提示' },
        component: () => import('@/views/Message.vue')
      },
      {
        path: '/modal',
        name: 'Modal',
        meta: { title: '信息提示' },
        component: () => import('@/views/Modal.vue')
      },
      {
        path: '/notification',
        name: 'Notification',
        meta: { title: '通知提醒框' },
        component: () => import('@/views/Notification.vue')
      },
      {
        path: '/pagination',
        name: 'Pagination',
        meta: { title: '分页器' },
        component: () => import('@/views/Pagination.vue')
      },
      {
        path: '/progress',
        name: 'Progress',
        meta: { title: '进度条' },
        component: () => import('@/views/Progress.vue')
      },
      {
        path: '/radio',
        name: 'Radio',
        meta: { title: '单选框' },
        component: () => import('@/views/Radio.vue')
      },
      {
        path: '/select',
        name: 'Select',
        meta: { title: '选择器' },
        component: () => import('@/views/Select.vue')
      },
      {
        path: '/slider',
        name: 'Slider',
        meta: { title: '滑动输入条' },
        component: () => import('@/views/Slider.vue')
      },
      {
        path: '/spin',
        name: 'Spin',
        meta: { title: '加载中' },
        component: () => import('@/views/Spin.vue')
      },
      {
        path: '/swiper',
        name: 'Swiper',
        meta: { title: '触摸滑动插件' },
        component: () => import('@/views/Swiper.vue')
      },
      {
        path: '/switch',
        name: 'Switch',
        meta: { title: '开关' },
        component: () => import('@/views/Switch.vue')
      },
      {
        path: '/table',
        name: 'Table',
        meta: { title: '表格' },
        component: () => import('@/views/Table.vue')
      },
      {
        path: '/textscroll',
        name: 'TextScroll',
        meta: { title: '文字滚动' },
        component: () => import('@/views/TextScroll.vue')
      },
      {
        path: '/tooltip',
        name: 'Tooltip',
        meta: { title: '文字提示' },
        component: () => import('@/views/Tooltip.vue')
      },
      {
        path: '/video',
        name: 'Video',
        meta: { title: '播放器' },
        component: () => import('@/views/Video.vue')
      },
      {
        path: '/waterfall',
        name: 'Waterfall',
        meta: { title: '瀑布流' },
        component: () => import('@/views/Waterfall.vue')
      },
      // {
      //   path: '/common',
      //   // path: '/common/:params',
      //   name: 'Common',
      //   meta: { title: '常用' },
      //   // props: true, // 当props为true时，路由参数route.params将被设置为组件的props
      //   // props: { name: 'curry', age: '30' }, // 当props为对象时，它将原样设置为组件props。当props是静态的时候很有用
      //   // props: (route: object) => ({ route: route, name: 'curry', age: '30' }), // 可以创建一个返回props的函数
      //   component: () => import('@/views/Common.vue')
      // },
      // {
      //   path: '/spin',
      //   name: 'Spin',
      //   meta: { title: '加载中' },
      //   component: () => import('../views/SpinPage.vue')
      // },
      // {
      //   path: '/table',
      //   name: 'Table',
      //   meta: { title: '分页列表' },
      //   component: () => import('../views/TablePage.vue')
      // },
      // {
      //   path: '/modal',
      //   name: 'Modal',
      //   meta: { title: '对话框' },
      //   component: () => import('../views/ModalPage.vue')
      // },
      // {
      //   path: '/tip',
      //   name: 'Tip',
      //   meta: { title: '提示框' },
      //   component: () => import('../views/InfoTip.vue')
      // },
      // {
      //   path: '/lines',
      //   name: 'Lines',
      //   meta: { title: 'Lines' },
      //   component: () => import('../views/Lines.vue')
      // },
      // {
      //   path: '/swiper',
      //   name: 'Swiper',
      //   meta: { title: '触摸滑动插件', depth: 2 },
      //   component: () => import('@/views/Swiper.vue')
      // },
      // {
      //   path: '/tree',
      //   name: 'Tree',
      //   meta: { title: '树图' },
      //   component: () => import('@/views/Tree.vue')
      // },
      // {
      //   path: '/drag',
      //   name: 'Drag',
      //   meta: { title: '拖拽组件' },
      //   component: () => import('@/views/Draggable.vue')
      // },
      // {
      //   path: '/selector',
      //   name: 'Selector',
      //   meta: { title: '下拉组件', keepAlive: false, depth: 1 },
      //   component: () => import('@/views/Selector.vue')
      // },
      // {
      //   path: '/image',
      //   name: 'Image',
      //   meta: { title: '图片组件' },
      //   component: () => import('@/views/Image.vue')
      // },
      // {
      //   path: '/viewer',
      //   name: 'Viewer',
      //   meta: { title: '预览插件' },
      //   component: () => import('@/views/Viewer.vue')
      // },
      // {
      //   path: '/steps',
      //   name: 'Steps',
      //   meta: { title: '步骤条组件' },
      //   component: () => import('@/views/Steps.vue')
      // },
      // {
      //   path: '/lazyload',
      //   name: 'Lazyload',
      //   meta: { title: '懒加载' },
      //   component: () => import('@/views/Lazyload.vue')
      // },
      // { // 视频播放组件；序列化图片播放组件
      //   path: '/video',
      //   name: 'Video',
      //   meta: { title: '播放组件' },
      //   component: () => import('@/views/Video.vue')
      // },
      // {
      //   path: '/banner',
      //   name: 'Banner',
      //   meta: { title: 'banner组件' },
      //   component: () => import('@/views/Banner.vue')
      // },
      // {
      //   path: '/pdf',
      //   name: 'Pdf',
      //   meta: { title: 'pdf预览' },
      //   component: () => import('@/views/PdfView.vue')
      // },
      // {
      //   path: '/slider',
      //   name: 'Slider',
      //   meta: { title: '文字滚动' },
      //   component: () => import('@/views/Slider.vue')
      // },
      // {
      //   path: '/ws',
      //   name: 'Ws',
      //   meta: { title: 'WebSocket' },
      //   component: () => import('@/views/WebSocket.vue')
      // }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    // 如果你省略了最后的 `*`，在解析或跳转时，参数中的 `/` 字符将被编码
    // path: '/:pathMatch(.*)',
    name: 'not-found',
    meta: { title: 'NotFound'},
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用history模式，hash模式：createWebHashHistory
  routes, // `routes: routes` 的缩写
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      rafTimeout(() => {
        resolve({ left: 0, top: 0, behavior: 'smooth' })
      }, 300)
    })
  }
})
// 注册全局前置守卫
router.beforeEach((to, from) => {
  to.meta && to.meta.title && setDocumentTitle(`${to.meta.title} - ${domTitle}`)
  return true
})

export default router
