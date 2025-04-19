import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import GlobalLayout from '@/layouts/GlobalLayout.vue'

// export const routes = [
//   {
//     path: '/',
//     name: 'Index',
//     component: GlobalLayout,
//     redirect: '/home',
//     children: [
//       {
//         path: '/home',
//         name: 'Home',
//         meta: { title: '首页' },
//         // route level code-splitting
//         // this generates a separate chunk (Home.[hash].js) for this route
//         // which is lazy-loaded when the route is visited.
//         component: () => import('@/views/guide/Home.vue')
//       },
//       {
//         path: '/alert',
//         name: 'Alert',
//         meta: { title: '警告提示' },
//         component: () => import('@/views/AlertView.vue')
//       },
//       {
//         path: '/avatar',
//         name: 'Avatar',
//         meta: { title: '头像' },
//         component: () => import('@/views/AvatarView.vue')
//       },
//       {
//         path: '/backtop',
//         name: 'BackTop',
//         meta: { title: '回到顶部' },
//         component: () => import('@/views/BackTopView.vue')
//       },
//       {
//         path: '/badge',
//         name: 'Badge',
//         meta: { title: '徽标' },
//         component: () => import('@/views/BadgeView.vue')
//       },
//       {
//         path: '/breadcrumb',
//         name: 'Breadcrumb',
//         meta: { title: '面包屑' },
//         component: () => import('@/views/BreadcrumbView.vue')
//       },
//       {
//         path: '/button',
//         name: 'Button',
//         meta: { title: '按钮' },
//         component: () => import('@/views/ButtonView.vue')
//       },
//       {
//         path: '/calendar',
//         name: 'Calendar',
//         meta: { title: '日历' },
//         component: () => import('@/views/CalendarView.vue')
//       },
//       {
//         path: '/card',
//         name: 'Card',
//         meta: { title: '卡片' },
//         component: () => import('@/views/CardView.vue')
//       },
//       {
//         path: '/carousel',
//         name: 'Carousel',
//         meta: { title: '轮播图' },
//         component: () => import('@/views/CarouselView.vue')
//       },
//       {
//         path: '/cascader',
//         name: 'Cascader',
//         meta: { title: '级联选择' },
//         component: () => import('@/views/CascaderView.vue')
//       },
//       {
//         path: '/checkbox',
//         name: 'Checkbox',
//         meta: { title: '复选框' },
//         component: () => import('@/views/CheckboxView.vue')
//       },
//       {
//         path: '/collapse',
//         name: 'Collapse',
//         meta: { title: '折叠面板' },
//         component: () => import('@/views/CollapseView.vue')
//       },
//       {
//         path: '/colorpicker',
//         name: 'ColorPicker',
//         meta: { title: '颜色选择器' },
//         component: () => import('@/views/ColorPickerView.vue')
//       },
//       {
//         path: '/configprovider',
//         name: 'ConfigProvider',
//         meta: { title: '全局化配置' },
//         component: () => import('@/views/ConfigProviderView.vue')
//       },
//       {
//         path: '/countdown',
//         name: 'Countdown',
//         meta: { title: '倒计时' },
//         component: () => import('@/views/CountdownView.vue')
//       },
//       {
//         path: '/datepicker',
//         name: 'DatePicker',
//         meta: { title: '日期选择器' },
//         component: () => import('@/views/DatePickerView.vue')
//       },
//       {
//         path: '/descriptions',
//         name: 'Descriptions',
//         meta: { title: '描述列表' },
//         component: () => import('@/views/DescriptionsView.vue')
//       },
//       {
//         path: '/dialog',
//         name: 'Dialog',
//         meta: { title: '对话框' },
//         component: () => import('@/views/DialogView.vue')
//       },
//       {
//         path: '/divider',
//         name: 'Divider',
//         meta: { title: '分割线' },
//         component: () => import('@/views/DividerView.vue')
//       },
//       {
//         path: '/drawer',
//         name: 'Drawer',
//         meta: { title: '抽屉' },
//         component: () => import('@/views/DrawerView.vue')
//       },
//       {
//         path: '/ellipsis',
//         name: 'Ellipsis',
//         meta: { title: '文本省略' },
//         component: () => import('@/views/EllipsisView.vue')
//       },
//       {
//         path: '/empty',
//         name: 'Empty',
//         meta: { title: '空状态' },
//         component: () => import('@/views/EmptyView.vue')
//       },
//       {
//         path: '/flex',
//         name: 'Flex',
//         meta: { title: '弹性布局' },
//         component: () => import('@/views/FlexView.vue')
//       },
//       {
//         path: '/floatbutton',
//         name: 'FloatButton',
//         meta: { title: '浮动按钮' },
//         component: () => import('@/views/FloatButtonView.vue')
//       },
//       {
//         path: '/gradienttext',
//         name: 'GradientText',
//         meta: { title: '渐变文字' },
//         component: () => import('@/views/GradientTextView.vue')
//       },
//       {
//         path: '/grid',
//         name: 'Grid',
//         meta: { title: '栅格' },
//         component: () => import('@/views/GridView.vue')
//       },
//       {
//         path: '/highlight',
//         name: 'Highlight',
//         meta: { title: '高亮文本' },
//         component: () => import('@/views/HighlightView.vue')
//       },
//       {
//         path: '/image',
//         name: 'Image',
//         meta: { title: '图片' },
//         component: () => import('@/views/ImageView.vue')
//       },
//       {
//         path: '/input',
//         name: 'Input',
//         meta: { title: '输入框' },
//         component: () => import('@/views/InputView.vue')
//       },
//       {
//         path: '/inputnumber',
//         name: 'InputNumber',
//         meta: { title: '数字输入框' },
//         component: () => import('@/views/InputNumberView.vue')
//       },
//       {
//         path: '/inputsearch',
//         name: 'InputSearch',
//         meta: { title: '搜索框' },
//         component: () => import('@/views/InputSearchView.vue')
//       },
//       {
//         path: '/layout',
//         name: 'Layout',
//         meta: { title: '布局' },
//         component: () => import('@/views/LayoutView.vue')
//       },
//       {
//         path: '/list',
//         name: 'List',
//         meta: { title: '列表' },
//         component: () => import('@/views/ListView.vue')
//       },
//       {
//         path: '/loadingbar',
//         name: 'LoadingBar',
//         meta: { title: ' 加载条' },
//         component: () => import('@/views/LoadingBarView.vue')
//       },
//       {
//         path: '/message',
//         name: 'Message',
//         meta: { title: '全局提示' },
//         component: () => import('@/views/MessageView.vue')
//       },
//       {
//         path: '/modal',
//         name: 'Modal',
//         meta: { title: '模态框' },
//         component: () => import('@/views/ModalView.vue')
//       },
//       {
//         path: '/notification',
//         name: 'Notification',
//         meta: { title: '通知提醒' },
//         component: () => import('@/views/NotificationView.vue')
//       },
//       {
//         path: '/numberanimation',
//         name: 'NumberAnimation',
//         meta: { title: '数值动画' },
//         component: () => import('@/views/NumberAnimationView.vue')
//       },
//       {
//         path: '/pagination',
//         name: 'Pagination',
//         meta: { title: '分页' },
//         component: () => import('@/views/PaginationView.vue')
//       },
//       {
//         path: '/popconfirm',
//         name: 'Popconfirm',
//         meta: { title: '弹出确认' },
//         component: () => import('@/views/PopconfirmView.vue')
//       },
//       {
//         path: '/popover',
//         name: 'Popover',
//         meta: { title: '气泡卡片' },
//         component: () => import('@/views/PopoverView.vue')
//       },
//       {
//         path: '/progress',
//         name: 'Progress',
//         meta: { title: '进度条' },
//         component: () => import('@/views/ProgressView.vue')
//       },
//       {
//         path: '/qrcode',
//         name: 'QRCode',
//         meta: { title: '二维码' },
//         component: () => import('@/views/QRCodeView.vue')
//       },
//       {
//         path: '/radio',
//         name: 'Radio',
//         meta: { title: '单选框' },
//         component: () => import('@/views/RadioView.vue')
//       },
//       {
//         path: '/rate',
//         name: 'Rate',
//         meta: { title: '评分' },
//         component: () => import('@/views/RateView.vue')
//       },
//       {
//         path: '/result',
//         name: 'Result',
//         meta: { title: '结果' },
//         component: () => import('@/views/ResultView.vue')
//       },
//       {
//         path: '/scrollbar',
//         name: 'Scrollbar',
//         meta: { title: '滚动条' },
//         component: () => import('@/views/ScrollbarView.vue')
//       },
//       {
//         path: '/segmented',
//         name: 'Segmented',
//         meta: { title: '分段控制器' },
//         component: () => import('@/views/SegmentedView.vue')
//       },
//       {
//         path: '/select',
//         name: 'Select',
//         meta: { title: '选择器' },
//         component: () => import('@/views/SelectView.vue')
//       },
//       {
//         path: '/skeleton',
//         name: 'Skeleton',
//         meta: { title: '骨架屏' },
//         component: () => import('@/views/SkeletonView.vue')
//       },
//       {
//         path: '/slider',
//         name: 'Slider',
//         meta: { title: '滑动输入条' },
//         component: () => import('@/views/SliderView.vue')
//       },
//       {
//         path: '/space',
//         name: 'Space',
//         meta: { title: '间距' },
//         component: () => import('@/views/SpaceView.vue')
//       },
//       {
//         path: '/spin',
//         name: 'Spin',
//         meta: { title: '加载中' },
//         component: () => import('@/views/SpinView.vue')
//       },
//       {
//         path: '/statistic',
//         name: 'Statistic',
//         meta: { title: '统计数值' },
//         component: () => import('@/views/StatisticView.vue')
//       },
//       {
//         path: '/steps',
//         name: 'Steps',
//         meta: { title: '步骤条' },
//         component: () => import('@/views/StepsView.vue')
//       },
//       {
//         path: '/swiper',
//         name: 'Swiper',
//         meta: { title: '触摸滑动' },
//         component: () => import('@/views/SwiperView.vue')
//       },
//       {
//         path: '/switch',
//         name: 'Switch',
//         meta: { title: '开关' },
//         component: () => import('@/views/SwitchView.vue')
//       },
//       {
//         path: '/table',
//         name: 'Table',
//         meta: { title: '表格' },
//         component: () => import('@/views/TableView.vue')
//       },
//       {
//         path: '/tabs',
//         name: 'Tabs',
//         meta: { title: '标签页' },
//         component: () => import('@/views/TabsView.vue')
//       },
//       {
//         path: '/tag',
//         name: 'Tag',
//         meta: { title: '标签' },
//         component: () => import('@/views/TagView.vue')
//       },
//       {
//         path: '/textarea',
//         name: 'Textarea',
//         meta: { title: '文本域' },
//         component: () => import('@/views/TextareaView.vue')
//       },
//       {
//         path: '/textscroll',
//         name: 'TextScroll',
//         meta: { title: '文字滚动' },
//         component: () => import('@/views/TextScrollView.vue')
//       },
//       {
//         path: '/timeline',
//         name: 'Timeline',
//         meta: { title: '时间轴' },
//         component: () => import('@/views/TimelineView.vue')
//       },
//       {
//         path: '/timepicker',
//         name: 'TimePicker',
//         meta: { title: '时间选择框' },
//         component: () => import('@/views/TimePickerView.vue')
//       },
//       {
//         path: '/tooltip',
//         name: 'Tooltip',
//         meta: { title: '文字提示' },
//         component: () => import('@/views/TooltipView.vue')
//       },
//       {
//         path: '/upload',
//         name: 'Upload',
//         meta: { title: '上传' },
//         component: () => import('@/views/UploadView.vue')
//       },
//       {
//         path: '/video',
//         name: 'Video',
//         meta: { title: '播放器' },
//         component: () => import('@/views/VideoView.vue')
//       },
//       {
//         path: '/waterfall',
//         name: 'Waterfall',
//         meta: { title: '瀑布流' },
//         component: () => import('@/views/WaterfallView.vue')
//       },
//       {
//         path: '/watermark',
//         name: 'Watermark',
//         meta: { title: '水印' },
//         component: () => import('@/views/WatermarkView.vue')
//       }
//     ]
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     // 如果你省略了最后的 `*`，在解析或跳转时，参数中的 `/` 字符将被编码
//     // path: '/:pathMatch(.*)',
//     name: 'not-found',
//     meta: { title: 'NotFound' },
//     component: () => import('@/views/guide/NotFound.vue')
//   }
// ]
/*
  读取目录结构（编译时态），自动生成路由
  运行时态和编译时态的区别：
  编译时态：在打包过程中读取到的目录机构
  运行时态：在浏览器运行过程中读取到的目录机构
*/
// import.meta.glob 都支持以字符串形式导入文件，类似于 以字符串形式导入资源
// https://cn.vitejs.dev/guide/features#glob-import
// 动态导入所有页面的组件
const components = import.meta.glob('../views/**/Index.vue')
// console.log('components', components)
// 引入所有页面的配置
const modules = import.meta.glob('../views/**/index.ts', {
  eager: true, // 直接引入模块
  import: 'default' // 设置 import 为 default 可以加载默认导出
})
// console.log('modules', modules)
export const routes: RouteRecordRaw[] = [
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
        component: components['../views/home/Index.vue']
      },
      ...Object.entries(modules).filter(([path, _]) => !path.includes('home') && !path.includes('exception')).map(([path, meta]) => {
        const componentPath = path.replace('index.ts', 'Index.vue') // 打包过后，目录结构是不存在的，不能直接用该变量作为组件导入的路径
        path = path.replace('../views', '').replace('/index.ts', '') || '/'
        // 将路径转换为所有首字母大写的 name；filter(Boolean) 去掉空字符串，即去掉多余的斜杠导致的空字符串
        const name = path.split('/').filter(Boolean).map((word: string) => word[0].toUpperCase() + word.slice(1)).join('') || 'Index'
        return {
          path,
          name,
          meta,
          component: components[componentPath]
        }
      }) as RouteRecordRaw[]
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    // 如果你省略了最后的 `*`，在解析或跳转时，参数中的 `/` 字符将被编码
    // path: '/:pathMatch(.*)',
    name: 'not-found',
    meta: { title: 'NotFound' },
    component: components['../views/exception/Index.vue']
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 history 模式，hash 模式：createWebHashHistory
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 滚动行为
    return { left: 0, top: 0, behavior: 'smooth' }
  }
})
export const loadingBarRef: any = {}
// 注册全局前置守卫
router.beforeEach((to, from) => {
  const domTitle = to.meta.title
  const appTitle = import.meta.env.VITE_GLOB_APP_TITLE
  document.title = `${domTitle} - ${appTitle}`
  if (!from || to.path !== from.path) {
    if (loadingBarRef.value) {
      loadingBarRef.value.start()
    }
  }
})
router.afterEach((to, from) => {
  if (!from || to.path !== from.path) {
    if (loadingBarRef.value) {
      setTimeout(() => {
        loadingBarRef.value.finish()
      }, 100)
    }
  }
})

export default router
