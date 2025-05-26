const CHUNK_SIZE = 1024 * 1024 * 5 // 5MB 分片大小
// navigator.hardwareConcurrency 返回用户计算机上可用于运行线程的逻辑处理器数量
const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 并发执行的线程数
export function sliceFile(file: File) {
  return new Promise((resolve, reject) => {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE) // 分片数量
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT) // 每个线程分配的分片数量
    const result: any[] = []
    let finishCount = 0
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 依次创建 web worker 线程
      const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }) // // module 为了线程内部可以导入其他模块
      const start = i * threadChunkCount
      const end = Math.min(start + threadChunkCount, chunkCount)
      worker.postMessage({
        file,
        start,
        end,
        CHUNK_SIZE
      })
      worker.onmessage = (e: MessageEvent) => {
        worker.terminate()
        result[i] = e.data
        finishCount++
        if (finishCount === THREAD_COUNT) {
          // 所有线程均完成时返回结果
          resolve(result.flat())
        }
      }
      worker.onerror = (err) => {
        worker.terminate()
        reject(err)
      }
    }
  })
}
