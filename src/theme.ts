import { ref, watch } from 'vue'
import { DEFAULT_PRIMARY } from 'vue-amazing-ui'
import type { ConfigProviderTheme } from 'vue-amazing-ui'

/**
 * 演示应用共享主题
 *
 * `App.vue` 的 `<ConfigProvider :theme="theme">` 与 `router/index.ts` 中
 * `createDiscreteApi` 的 `configProviderProps` 共用同一份响应式主题，
 * 使路由守卫创建的独立加载条实例也能跟随主题变化。
 *
 * 默认带上 `mode`：右下角的暗黑模式浮钮直接改写它（见 `layouts/components/ThemeModeButton.vue`），
 * 这样切换的是组件库真实的浅色 / 暗色变量表，而不是用 CSS 滤镜反色页面。
 *
 * 持久化：初始化时同步读一次本地存储（不出现「先浅色再变暗」的闪烁），
 * 之后每次变更写回；未存过时回落浅色（不跟随系统偏好，与站点既有默认一致）。
 */
const THEME_STORAGE_KEY = 'va-theme'

/** 本地存储里只认这两个字段，其余一律回落默认值（旧版本 / 手改残留不影响启动） */
interface StoredTheme {
  mode?: unknown
  primary?: unknown
}

/** 读上次的主题；读不到或格式不对返回 null，由调用方回落默认值 */
function readStoredTheme(): ConfigProviderTheme | null {
  if (typeof window === 'undefined') return null
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch (error) {
    // 隐私模式禁用存储：只影响记忆能力，本次会话仍可正常切换
    console.warn('[theme] 读取本地主题配置失败', error)
    return null
  }
  if (!raw) return null
  try {
    const stored = JSON.parse(raw) as StoredTheme
    const mode = stored?.mode === 'dark' ? 'dark' : 'light'
    const primary = typeof stored?.primary === 'string' && stored.primary ? stored.primary : undefined
    return primary ? { mode, seed: { primary } } : { mode }
  } catch (error) {
    console.warn('[theme] 本地主题配置解析失败，已回落默认主题', error)
    return null
  }
}

function writeTheme(value: ConfigProviderTheme): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({ mode: value.mode ?? 'light', primary: value.seed?.primary })
    )
  } catch (error) {
    console.warn('[theme] 保存主题配置失败', error)
  }
}

export const theme = ref<ConfigProviderTheme>(readStoredTheme() ?? { mode: 'light' })

// 所有写入方（模式浮钮 / 主色取色器）都是整体替换 theme，这里用 deep 兜住嵌套种子的原地改动
watch(theme, writeTheme, { deep: true })

export { DEFAULT_PRIMARY }

/** 写入主色种子：只替换 primary，保留 mode 与其余种子 */
export function setThemePrimary(color: string): void {
  theme.value = { ...theme.value, seed: { ...theme.value.seed, primary: color } }
}
