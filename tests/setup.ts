/**
 * 测试环境 setup
 *
 * 背景：组件（Countdown / Table / Dialog / picker 的 TimeUnitColumn / useFps 等）直接持有
 * requestAnimationFrame 返回的 ID，并在卸载或切换时调用 cancelAnimationFrame 取消。
 * happy-dom 的 requestAnimationFrame 返回值并非 number（为 Node Immediate 对象），且帧间隔不确定，
 * 导致取消行为与时序不可控，无法稳定测试 hover 暂停、滚动节流等依赖取消能力的场景。
 * 此处提供返回值稳定为 number、帧间隔固定的最小 rAF 实现。
 */
import { beforeEach } from 'vitest'
import { resetLogDedup } from 'components/utils/log'

// 告警去重集合是模块级状态：逐例清空，避免用例 A 的提醒把用例 B 的断言吞掉
beforeEach(() => {
  resetLogDedup()
})

const callbacks = new Map<number, FrameRequestCallback>()
// 模拟帧间隔，取最小值以缩短测试中等待自动关闭的时间
const FRAME_INTERVAL = 1
let nextId = 0

globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
  const id = ++nextId
  callbacks.set(id, cb)
  setTimeout(() => {
    if (!callbacks.has(id)) {
      return
    }
    callbacks.delete(id)
    cb(performance.now())
  }, FRAME_INTERVAL)
  return id
}) as typeof requestAnimationFrame

globalThis.cancelAnimationFrame = ((id: number) => {
  callbacks.delete(id)
}) as typeof cancelAnimationFrame
