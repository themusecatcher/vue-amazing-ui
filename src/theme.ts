import { ref } from 'vue'
import { DEFAULT_PRIMARY } from 'vue-amazing-ui'
import type { ConfigProviderTheme } from 'vue-amazing-ui'

/**
 * 演示应用共享主题
 *
 * `App.vue` 的 `<ConfigProvider :theme="theme">` 与 `router/index.ts` 中
 * `createDiscreteApi` 的 `configProviderProps` 共用同一份响应式主题，
 * 使路由守卫创建的独立加载条实例也能跟随主题变化。
 *
 * 默认带上 `mode`：布局层的主题开关直接改写它（见 `layouts/GlobalLayout.vue`），
 * 这样切换的是组件库真实的浅色 / 暗色变量表，而不是用 CSS 滤镜反色页面。
 */
export const theme = ref<ConfigProviderTheme>({ mode: 'light' })

export { DEFAULT_PRIMARY }

/** 写入主色种子：只替换 primary，保留 mode 与其余种子 */
export function setThemePrimary(color: string): void {
  theme.value = { ...theme.value, seed: { ...theme.value.seed, primary: color } }
}
