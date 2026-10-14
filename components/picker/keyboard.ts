/**
 * 日期时间选择内核的面板键盘导航
 *
 * 把按键归一为「左右 / 上下 / 翻页 / 加速左右」四种位移意图，各面板再按自己的视图粒度决定一步
 * 代表多少（日期面板左右为一天、年面板左右为一年）。归一化与「一步的含义」拆开，是为了让各面板
 * 的键位表读起来就是一张粒度表，而不必重复解析按键。
 */

/** 位移意图的方向：-1 向前（左 / 上 / 上一页），1 向后 */
export type PickerKeyStep = -1 | 1

/**
 * 面板的键位响应器
 *
 * 未声明的意图表示该面板在当前层级不支持该按键：按键不被消费，交还浏览器（如日期面板在月层级
 * 不支持翻页键）。
 */
export interface PickerKeydownHandlers {
  onLeftRight?: (step: PickerKeyStep) => void
  onCtrlLeftRight?: (step: PickerKeyStep) => void
  onUpDown?: (step: PickerKeyStep) => void
  onPageUpDown?: (step: PickerKeyStep) => void
}

/** 参与面板导航的按键（宿主据此判定是否需要转发给面板） */
export const PANEL_NAV_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown']

/**
 * 处理一次面板导航按键
 *
 * Ctrl（macOS 为 Cmd）加左右键走独立的「加速」意图，未声明时该按键不被消费——与「左右」分列两条
 * 意图是刻意的：同一面板上「左右」与「Ctrl + 左右」是两个不同粒度（日 → 年），合并会让某一粒度
 * 无法单独关闭。
 *
 * @returns 是否已消费该按键；消费时已阻止默认行为，避免输入框光标随之移动或页面滚动
 */
export function handlePanelKeydown(event: KeyboardEvent, handlers: PickerKeydownHandlers): boolean {
  const isBackward = event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'PageUp'
  const step: PickerKeyStep = isBackward ? -1 : 1
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    const handler = event.ctrlKey || event.metaKey ? handlers.onCtrlLeftRight : handlers.onLeftRight
    if (!handler) return false
    handler(step)
    event.preventDefault()
    return true
  }
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    if (!handlers.onUpDown) return false
    handlers.onUpDown(step)
    event.preventDefault()
    return true
  }
  if (event.key === 'PageUp' || event.key === 'PageDown') {
    if (!handlers.onPageUpDown) return false
    handlers.onPageUpDown(step)
    event.preventDefault()
    return true
  }
  return false
}
