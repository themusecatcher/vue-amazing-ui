/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Vue 官方 SFC shim 写法，{} 在此表示不约束 props
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent
}
