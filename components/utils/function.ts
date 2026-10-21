/**
 * 节流：同一窗口内最多执行一次——每轮窗口的首个调用立即执行，其后 `delay` 毫秒内的调用被直接丢弃
 *
 * 非周期性调度：窗口结束（`delay` 后）需再次调用才会执行，被丢弃的调用不会补发；常用于滚动 / 拖拽等高频事件。
 *
 * @param fn - 需要节流的函数
 * @param delay - 节流间隔（ms），默认 300
 * @returns 节流后的包装函数；窗口内被丢弃的调用返回 false，正常执行时不返回值（原函数的返回值不向外传递）
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
 * 防抖：连续触发时只保留最后一次调用，待停止触发满 `delay` 毫秒后执行
 *
 * 触发期间不断重置计时器，故连续高频触发只会执行最后一次；常用于输入、窗口 resize 等场景。
 *
 * @param fn - 需要防抖的函数
 * @param delay - 防抖等待时长（ms），默认 300
 * @returns 防抖后的包装函数；任何情况下都不返回值（原函数的返回值不向外传递）
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
