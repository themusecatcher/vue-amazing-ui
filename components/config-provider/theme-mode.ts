/**
 * 系统配色偏好的探测与监听
 *
 * 属于 Provider 的职责（依赖 `matchMedia`），因此放在 `config-provider/` 而不是 `theme/`：
 * `theme/` 只保留纯函数，构建期可在 Node 直接执行，不会被浏览器 API 污染。
 */

/** 取暗色媒体查询对象；SSR / 不支持 matchMedia 时返回 null */
function getDarkMediaQuery(): MediaQueryList | null {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null
  }
  return window.matchMedia('(prefers-color-scheme: dark)')
}

/** 系统是否偏好暗色；SSR / 非浏览器环境返回 false */
export function systemPrefersDark(): boolean {
  return getDarkMediaQuery()?.matches ?? false
}

/**
 * 监听系统配色偏好变化
 *
 * 仅在浏览器可用；返回解除监听的函数，调用方须在卸载时调用（`mode="auto"` 的 cleanup）。
 */
export function watchSystemMode(listener: (prefersDark: boolean) => void): () => void {
  const media = getDarkMediaQuery()
  if (!media) {
    return () => {}
  }
  const onChange = (event: MediaQueryListEvent): void => {
    listener(event.matches)
  }
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}
