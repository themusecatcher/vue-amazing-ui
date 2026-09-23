/** `rafTimeout` 返回的句柄：`id` 为当前挂起帧的 requestAnimationFrame ID，供 `cancelRaf` 取消 */
export type AnimationFrameID = { id: number }

/**
 * 基于 requestAnimationFrame 的延时 / 间歇调用
 *
 * ⚠️ 与 setTimeout / setInterval 不等价：回调与渲染帧绑定，页面不可见时会暂停，
 * 实际延迟比 `delay` 多出至多一帧；仅适用于需与动画帧同步的场景。
 *
 * @param fn - 到点后执行的函数
 * @param delay - 延时时长（ms），默认 0（下一帧立即执行）
 * @param interval - 是否持续执行；为 true 时在首次执行后以 `delay` 为间隔重复触发，默认 false
 * @returns 可用 `cancelRaf` 取消的句柄
 */
export function rafTimeout(fn: Function, delay: number = 0, interval: boolean = false): AnimationFrameID {
  let start: number | null = null // 本轮计时的起点时间戳
  // 帧回调：timestamp 与 performance.now() 同源，即本帧开始执行的时刻
  function timeElapse(timestamp: number) {
    if (!start) {
      // 首帧尚未记录起点，以本帧时间为起点
      start = timestamp
    }
    const elapsed = timestamp - start
    if (elapsed >= delay) {
      try {
        fn() // 执行目标函数
      } catch (error) {
        console.error('Error executing rafTimeout function:', error)
      }
      if (interval) {
        // 间隔模式：以本帧为下一轮起点，继续排帧
        start = timestamp
        raf.id = requestAnimationFrame(timeElapse)
      }
    } else {
      raf.id = requestAnimationFrame(timeElapse)
    }
  }
  // 句柄需在回调前建立，便于回调内更新同一对象的 id
  const raf: AnimationFrameID = {
    id: requestAnimationFrame(timeElapse)
  }
  return raf
}
/**
 * 取消 `rafTimeout` 排下的帧回调
 *
 * @param raf - `rafTimeout` 返回的句柄；句柄或其 id 无效时仅打印警告，不抛错
 */
export function cancelRaf(raf: AnimationFrameID): void {
  if (raf && typeof raf?.id === 'number') {
    cancelAnimationFrame(raf.id)
  } else {
    console.warn('cancelRaf received an invalid id:', raf)
  }
}
/**
 * 节流：限制函数在 `delay` 内最多执行一次
 *
 * 首次调用立即执行，`delay` 内的后续调用被忽略（非「拖尾执行」）；常用于滚动 / 拖拽等高频事件。
 *
 * @param fn - 需要节流的函数
 * @param delay - 节流间隔（ms），默认 300
 * @returns 节流后的包装函数；处于节流窗口内被忽略的调用直接返回 false
 */
export function throttle(fn: Function, delay: number = 300): Function {
  let valid = true // 当前是否处于可执行窗口
  return function (...args: any[]) {
    if (!valid) return false // 处于节流窗口内，直接忽略本次调用
    fn(...args) // 执行原函数
    valid = false // 关闭窗口，delay 后重新开启
    setTimeout(() => {
      valid = true
    }, delay)
  }
}
/**
 * 防抖：在最后一次触发后延迟 `delay` 再执行一次
 *
 * 触发期间不断重置计时器，故连续高频触发只会执行最后一次；常用于输入、窗口 resize 等场景。
 *
 * @param fn - 需要防抖的函数
 * @param delay - 防抖等待时长（ms），默认 300
 * @returns 防抖后的包装函数
 */
export function debounce(fn: Function, delay: number = 300): Function {
  let timer: any = null // 闭包持有定时器引用，便于重置
  return function (...args: any[]) {
    if (timer) {
      // 已有待执行任务则重置计时
      clearTimeout(timer)
    }
    // 重新计时，只有最后一次触发会真正执行
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
/**
 * 唯一标识生成器工厂
 *
 * 生成 `${prefix}_${时间戳}_${自增序号}` 形式的 key，供以 key 标识实例的组件（Message / Notification /
 * Modal / Dialog 等）复用；自增序号由各自闭包独立维护，故同一毫秒内连续生成也不会重复。
 *
 * @param prefix - 前缀，用于区分来源组件（如 `'message'`、`'dialog'`），不含分隔符
 * @returns 每次调用都产出新 key 的函数
 */
export function createKeyGenerator(prefix: string): () => string {
  let seed = 0
  return () => {
    seed += 1
    return `${prefix}_${Date.now()}_${seed}`
  }
}
