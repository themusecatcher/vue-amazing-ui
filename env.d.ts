/// <reference types="vite/client" />
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const vueComponent: DefineComponent<{}, {}, any>
//   export default vueComponent
// }

declare module '*.js'
declare module '*.gz'
declare module 'vue-amazing-ui'
declare module 'naive-ui'
declare module '*.json'

interface Window {
  rafTimeout: Function
}