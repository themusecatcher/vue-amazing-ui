// 全局主题：唯一数据源
// App.vue 的 ConfigProvider、右下角两个浮钮（主题色取色器 / 暗黑模式切换）与
// router/index.ts 中 createDiscreteApi 创建的独立加载条实例共用此 store：
// - primaryColor 作为主题种子 seed.primary，修改后全站组件配色实时联动
// - mode 决定浅色 / 暗色变量表（theme.mode），切换只重算 CSS 变量、不重建组件
//
// 持久化口径与 vue-amazing-demo 一致：初始化时同步读一次本地存储（不出现「先浅色再变暗」的闪烁），
// 之后每次变更写回；未存过时回落浅色（不跟随系统偏好，与站点既有默认一致）。
import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_PRIMARY } from 'vue-amazing-ui'
import type { ConfigProviderTheme, ThemeMode } from 'vue-amazing-ui'

const THEME_STORAGE_KEY = 'va-theme'
// 默认主色即组件库默认主色，演示页才能呈现组件的默认外观
const DEFAULT_PRIMARY_COLOR = DEFAULT_PRIMARY
/** 主色只认不透明 hex（与库内种子归一化同口径），其余视为损坏数据 */
const PRIMARY_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i

/** 本地存储里只认这两个字段，其余一律回落默认值（旧版本 / 手改残留不影响启动） */
interface StoredTheme {
  primaryColor: string
  mode: ThemeMode
}

/** 读上次的主题；读不到或格式不对返回 null，由调用方回落默认值 */
function readStoredTheme(): StoredTheme | null {
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
    const stored = JSON.parse(raw) as { mode?: unknown; primary?: unknown }
    const mode: ThemeMode = stored?.mode === 'dark' ? 'dark' : 'light'
    // 非法主色直接丢弃：交给 ConfigProvider 时会被判为非法并回退默认值，界面上的取色器却仍显示该值
    const primaryColor =
      typeof stored?.primary === 'string' && PRIMARY_PATTERN.test(stored.primary)
        ? stored.primary
        : DEFAULT_PRIMARY_COLOR
    return { mode, primaryColor }
  } catch (error) {
    console.warn('[theme] 本地主题配置解析失败，已回落默认主题', error)
    return null
  }
}

function writeStoredTheme(primaryColor: string, mode: ThemeMode): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode, primary: primaryColor }))
  } catch (error) {
    console.warn('[theme] 保存主题配置失败', error)
  }
}

export const useThemeStore = defineStore('theme', () => {
  const stored = readStoredTheme()
  const primaryColor = ref<string>(stored?.primaryColor ?? DEFAULT_PRIMARY_COLOR)
  const mode = ref<ThemeMode>(stored?.mode ?? 'light')
  // 主题种子只接受不透明色：ColorPicker 关闭 alpha 通道，避免拖拽后输出 #rrggbbaa 让种子失效
  const theme = computed<ConfigProviderTheme>(() => ({
    seed: {
      primary: primaryColor.value
    },
    mode: mode.value
  }))
  // 两个浮钮写入后立即持久化，刷新后保持当前主题
  watch([primaryColor, mode], ([color, currentMode]) => {
    writeStoredTheme(color, currentMode)
  })
  return { primaryColor, mode, theme }
})
