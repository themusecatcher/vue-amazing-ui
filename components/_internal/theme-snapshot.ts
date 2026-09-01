import { shallowRef } from 'vue'
import type { Theme } from 'components/config-provider'

/**
 * 模块级主题快照
 *
 * `ConfigProvider` 挂载时把当前主题写入此处；`createDiscreteApi` 建立独立应用实例后
 * 在其渲染函数中读取该快照，从而在脱离组件树上下文的场景（axios 拦截器、路由守卫、
 * Pinia action 等）还原与主应用一致的主题。
 */
export const themeSnapshot = shallowRef<Theme>({})

export function setThemeSnapshot(theme: Theme): void {
  // 离散应用实例把快照作为 theme 传入其 ConfigProvider，若再写回会形成「写入→重渲染→写入」死循环，
  // 故传入对象与当前快照为同一引用时直接跳过
  if (theme === themeSnapshot.value) {
    return
  }
  themeSnapshot.value = { ...theme }
}
