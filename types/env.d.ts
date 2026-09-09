/// <reference types="vite/client" />
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const vueComponent: DefineComponent<{}, {}, any>
//   export default vueComponent
// }

declare module '*.js'
declare module '*.gz'
declare module '*.json'
// swiper 的样式子路径（swiper/css、swiper/css/navigation ...）说明符不以 .css 结尾，
// 无法命中 vite/client 提供的 declare module '*.css'，需显式声明以消除副作用导入的 TS 报错
declare module 'swiper/css*'

interface Window {
  rafTimeout: Function
}
