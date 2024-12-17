/// <reference types="vite/client" />
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const vueComponent: DefineComponent<{}, {}, any>
//   export default vueComponent
// }

declare module '*.js'
declare module '*.gz'
declare module '*.json'
declare module 'vue-amazing-ui'

interface Window {
  rafTimeout: Function
}
