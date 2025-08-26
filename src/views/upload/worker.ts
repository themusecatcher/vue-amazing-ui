import SparkMD5 from 'spark-md5'
// 创建分片
function createFileChunk(file: File, index: number, chunkSize: number) {
  return new Promise((resolve, reject) => {
    const start = index * chunkSize
    const end = Math.min(file.size, start + chunkSize)
    const spark = new SparkMD5.ArrayBuffer() // https://github.com/satazor/js-spark-md5
    const fileReader = new FileReader()
    const blob = file.slice(start, end)
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      spark.append(e.target?.result as ArrayBuffer)
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob
      })
    }
    fileReader.onerror = (e) => {
      reject(new Error(`文件读取过程中发生错误: ${e}`))
    }
    fileReader.readAsArrayBuffer(blob)
  })
}
// web worker 通信
onmessage = async (e: MessageEvent) => {
  const { file, start, end, CHUNK_SIZE } = e.data
  const result = []
  for (let i = start; i < end; i++) {
    const chunkPromise = createFileChunk(file, i, CHUNK_SIZE)
    result.push(chunkPromise)
  }
  const chunks = await Promise.all(result)
  postMessage(chunks)
}
