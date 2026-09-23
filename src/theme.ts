import { ref } from 'vue'
import type { ConfigProviderTheme } from 'vue-amazing-ui'

/**
 * 演示应用共享主题
 *
 * `App.vue` 的 `<ConfigProvider :theme="theme">` 与 `router/index.ts` 中
 * `createDiscreteApi` 的 `configProviderProps` 共用同一份响应式主题，
 * 使路由守卫创建的独立加载条实例也能跟随主题变化。
 */
export const theme = ref<ConfigProviderTheme>({})
