/**
 * 页签导航的滚动目标计算
 *
 * 导航用 `transform: translate(-scrollLeft, 0)` 模拟滚动，因此「让激活项居中」等价于求一个
 * 使目标块中点与可视区中点重合的 `scrollLeft`；首尾项空间不足时由 `clamp` 自然贴边，
 * 不需要额外区分边界分支。
 */

/** 居中滚动目标：目标块中点对齐可视区中点，并限制在 [0, max] 内 */
export function getCenterScroll(start: number, size: number, viewSize: number, max: number): number {
  const target = start + size / 2 - viewSize / 2
  return Math.min(Math.max(target, 0), Math.max(max, 0))
}
