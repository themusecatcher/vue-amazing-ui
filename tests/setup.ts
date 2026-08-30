/**
 * 测试环境 setup
 *
 * 背景：components/utils/function.ts 的 rafTimeout 依赖 requestAnimationFrame，
 * 且 cancelRaf 要求 raf.id 为 number（AnimationFrameID = { id: number }）。
 * happy-dom 的 requestAnimationFrame 返回值并非 number（为 Node Immediate 对象），
 * 导致 cancelRaf 的 typeof 检查失败、定时器无法取消，
 * 进而无法测试 hover 暂停等依赖取消能力的场景。
 * 此处提供符合 AnimationFrameID 契约的最小 rAF 实现。
 */
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
