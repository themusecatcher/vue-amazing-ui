import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import GlobalLayout from '@/layouts/GlobalLayout.vue'

export const routes = [
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
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/guide/Home.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    // 如果你省略了最后的 `*`，在解析或跳转时，参数中的 `/` 字符将被编码
    // path: '/:pathMatch(.*)',
    name: 'not-found',
    meta: { title: 'NotFound' },
    component: () => import('@/views/guide/NotFound.vue')
  }
]
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
      ...(Object.entries(modules)
        .filter(([path, _]) => !path.includes('home') && !path.includes('exception'))
        .map(([path, meta]) => {
          const componentPath = path.replace('index.ts', 'Index.vue') // 打包过后，目录结构是不存在的，不能直接用该变量作为组件导入的路径
          path = path.replace('../views', '').replace('/index.ts', '') || '/'
          // 将路径转换为所有首字母大写的 name；filter(Boolean) 去掉空字符串，即去掉多余的斜杠导致的空字符串
          const name =
            path
              .split('/')
              .filter(Boolean)
              .map((word: string) => word[0].toUpperCase() + word.slice(1))
              .join('') || 'Index'
          return {
            path,
            name,
            meta,
            component: components[componentPath]
          }
        }) as RouteRecordRaw[])
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    // 如果你省略了最后的 `*`，在解析或跳转时，参数中的 `/` 字符将被编码
    // path: '/:pathMatch(.*)',
    name: 'NotFound',
    meta: { title: '未找到' },
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
