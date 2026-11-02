import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Upload from 'components/upload/Upload.vue'

/**
 * Upload 的 beforeUpload 告警语义回归
 *
 * 覆盖 2026-10-16 告警审计中修掉的两个问题：
 * - 使用方返回 false（**主动拒绝**该文件）此前会被误报为「执行出错」；
 * - 真正的回调异常（抛错 / reject）应与 Dialog / Modal 的回调出错同级，走 error 级告警。
 */

/** 为隐藏的 file input 构造 FileList 并触发 change（走 onUpload → uploadFile） */
async function triggerFileChange(wrapper: ReturnType<typeof mount>, file: File, index = 0): Promise<void> {
  const input = wrapper.findAll('input[type="file"]')[index]
  Object.defineProperty(input.element, 'files', {
    value: [file],
    configurable: true
  })
  await input.trigger('change')
}

const testFile = () => new File(['x'], 'a.txt', { type: 'text/plain' })

describe('Upload beforeUpload 告警语义', () => {
  it('返回 false（使用方主动拒绝）时静默，不输出任何告警', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(Upload, { props: { beforeUpload: () => false }, attachTo: document.body })
    await flushPromises()

    await triggerFileChange(wrapper, testFile())
    await flushPromises()

    expect(errorSpy).not.toHaveBeenCalled()
    expect(warnSpy).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('回调同步抛错时输出 error 级告警', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const wrapper = mount(Upload, {
      props: {
        beforeUpload: () => {
          throw new Error('boom')
        }
      },
      attachTo: document.body
    })
    await flushPromises()

    await triggerFileChange(wrapper, testFile())
    await flushPromises()

    expect(errorSpy).toHaveBeenCalledWith(
      '[vue-amazing-ui] Upload: beforeUpload 执行出错，已跳过该文件',
      expect.any(Error)
    )
    wrapper.unmount()
  })

  it('回调返回 reject 的 Promise 时同样输出 error 级告警', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const wrapper = mount(Upload, {
      props: { beforeUpload: () => Promise.reject(new Error('nope')) },
      attachTo: document.body
    })
    await flushPromises()

    await triggerFileChange(wrapper, testFile())
    await flushPromises()

    expect(errorSpy).toHaveBeenCalledWith(
      '[vue-amazing-ui] Upload: beforeUpload 执行出错，已跳过该文件',
      expect.any(Error)
    )
    wrapper.unmount()
  })
})

/** 可手动驱动事件的 FileReader 桩：用于验证 base64 读取三态（成功 / 失败 / 中断）的 loading 复位 */
const pendingReaders: FakeBase64Reader[] = []
class FakeBase64Reader {
  onloadstart: ((e: Event) => void) | null = null
  onabort: ((e: Event) => void) | null = null
  onerror: ((e: Event) => void) | null = null
  onprogress: ((e: ProgressEvent) => void) | null = null
  onload: ((e: ProgressEvent<FileReader>) => void) | null = null
  onloadend: ((e: Event) => void) | null = null
  result: string | null = null
  error: Error | null = null
  readAsDataURL(): void {
    pendingReaders.push(this)
  }
}

describe('Upload base64 读取的 loading 复位', () => {
  beforeEach(() => {
    pendingReaders.length = 0
    vi.stubGlobal('FileReader', FakeBase64Reader)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('progress 读到 loaded === total 时即复位 loading（保留原有提前收口行为）', async () => {
    const wrapper = mount(Upload, { attachTo: document.body })
    await flushPromises()

    await triggerFileChange(wrapper, testFile())
    await flushPromises()
    expect(wrapper.find('.file-uploading').exists()).toBe(true)

    const reader = pendingReaders[0]
    reader.onprogress?.({ loaded: 2, total: 2 } as ProgressEvent)
    await flushPromises()
    expect(wrapper.find('.file-uploading').exists()).toBe(false)
    wrapper.unmount()
  })

  it('progress 未报告 loaded === total 时不复位；由 onloadend 在成功后复位', async () => {
    const wrapper = mount(Upload, { attachTo: document.body })
    await flushPromises()

    await triggerFileChange(wrapper, testFile())
    await flushPromises()
    // 读取中：展示 loading
    expect(wrapper.find('.file-uploading').exists()).toBe(true)

    const reader = pendingReaders[0]
    // 只派发未读满的进度（模拟规范允许的「不派发 loaded === total」的实现差异）
    reader.onprogress?.({ loaded: 1, total: 2 } as ProgressEvent)
    await flushPromises()
    expect(wrapper.find('.file-uploading').exists()).toBe(true)

    reader.result = 'data:text/plain;base64,eA=='
    reader.onload?.({ target: reader } as unknown as ProgressEvent<FileReader>)
    await flushPromises()
    // onload 之后、onloadend 之前仍处于 loading，保证不会出现「空白帧」
    expect(wrapper.find('.file-uploading').exists()).toBe(true)

    reader.onloadend?.(new Event('loadend'))
    await flushPromises()
    expect(wrapper.find('.file-uploading').exists()).toBe(false)
    expect(wrapper.emitted('success')).toBeTruthy()
    wrapper.unmount()
  })

  it('读取失败时复位 loading 并派发 error', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const wrapper = mount(Upload, { attachTo: document.body })
    await flushPromises()

    await triggerFileChange(wrapper, testFile())
    await flushPromises()
    expect(wrapper.find('.file-uploading').exists()).toBe(true)

    const reader = pendingReaders[0]
    reader.error = new Error('read failed')
    reader.onerror?.(new Event('error'))
    reader.onloadend?.(new Event('loadend'))
    await flushPromises()

    expect(wrapper.find('.file-uploading').exists()).toBe(false)
    expect(wrapper.emitted('error')).toBeTruthy()
    // 统一出口只透传诊断价值更高的原始错误（Event 对象无堆栈，不再随日志输出）
    expect(errorSpy).toHaveBeenCalledWith(
      '[vue-amazing-ui] Upload: 文件读取失败，loading 已复位并派发 error 事件',
      reader.error
    )
    wrapper.unmount()
  })

  it('读取被中断（abort）时同样由 onloadend 复位 loading', async () => {
    const wrapper = mount(Upload, { attachTo: document.body })
    await flushPromises()

    await triggerFileChange(wrapper, testFile())
    await flushPromises()
    expect(wrapper.find('.file-uploading').exists()).toBe(true)

    const reader = pendingReaders[0]
    reader.onabort?.(new Event('abort'))
    reader.onloadend?.(new Event('loadend'))
    await flushPromises()

    expect(wrapper.find('.file-uploading').exists()).toBe(false)
    wrapper.unmount()
  })
})

/** happy-dom 没有可构造的 DataTransfer，直接把 files 挂到 drop 事件上 */
async function triggerDrop(wrapper: ReturnType<typeof mount>, files: File[]): Promise<void> {
  const target = wrapper.find('.upload-item')
  const event = new Event('drop', { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'dataTransfer', { value: { files } })
  target.element.dispatchEvent(event)
  await flushPromises()
}

const makeFiles = (count: number): File[] =>
  Array.from({ length: count }, (_, index) => new File(['x'], `f${index}.txt`, { type: 'text/plain' }))

/** 最后一次上报的文件列表即组件最终自持的结果 */
function lastFiles(wrapper: ReturnType<typeof mount>): { name?: string }[] {
  const updates = wrapper.emitted('update:fileList')
  return updates?.at(-1)?.[0] as { name?: string }[]
}

function lastFileCount(wrapper: ReturnType<typeof mount>): number {
  return lastFiles(wrapper).length
}

/**
 * 拖拽投放的文件数超过剩余槽位时的越界判定
 *
 * 槽位下标合法范围是 `[0, maxCount - 1]`：拖拽路径此前用 `index + n <= maxCount`，
 * 比点击路径宽一格，一次投放的文件数多于剩余槽位时会多写一个越界槽位 ——
 * 该文件进了 `fileList`，却因 `showUpload` 被压在 `maxCount` 而既不展示也无法删除。
 */
describe('Upload 拖拽投放的数量上限', () => {
  it('投放数量超过剩余槽位时只写满剩余槽位', async () => {
    const wrapper = mount(Upload, {
      props: { maxCount: 3, multiple: true, uploadMode: 'custom' },
      attachTo: document.body
    })
    await flushPromises()

    await triggerDrop(wrapper, makeFiles(5))

    expect(lastFileCount(wrapper)).toBe(3)
    wrapper.unmount()
  })

  it('maxCount 为 1 时投放多个文件也只保留一个', async () => {
    const wrapper = mount(Upload, {
      props: { maxCount: 1, multiple: true, uploadMode: 'custom' },
      attachTo: document.body
    })
    await flushPromises()

    await triggerDrop(wrapper, makeFiles(2))

    expect(lastFileCount(wrapper)).toBe(1)
    wrapper.unmount()
  })

  it('投放数量未超限时全部写入（避免反向漏写）', async () => {
    const wrapper = mount(Upload, {
      props: { maxCount: 3, multiple: true, uploadMode: 'custom' },
      attachTo: document.body
    })
    await flushPromises()

    await triggerDrop(wrapper, makeFiles(3))

    expect(lastFileCount(wrapper)).toBe(3)
    wrapper.unmount()
  })
})

/**
 * 拖拽路径的 `multiple` 约束
 *
 * 点选路径由 `<input multiple>` 约束，拖拽路径此前直接遍历 `dataTransfer.files`，
 * 于是 `multiple=false`（默认值）时一次拖入 N 个文件会全部入库。对齐 antdv 的
 * `AjaxUploader.onFileDrop`：`multiple === false` 时只保留第一个。
 */
describe('Upload 拖拽投放的多选约束', () => {
  it('multiple 为 false 时投放多个文件只取第一个', async () => {
    const wrapper = mount(Upload, {
      props: {
        uploadMode: 'custom',
        customRequest: (file: File) => Promise.resolve({ name: file.name, url: file.name })
      },
      attachTo: document.body
    })
    await flushPromises()

    await triggerDrop(wrapper, makeFiles(3))

    const files = lastFiles(wrapper)
    expect(files).toHaveLength(1)
    expect(files[0].name).toBe('f0.txt')
    wrapper.unmount()
  })
})

/** 回显文件名的自定义上传，便于断言「哪些文件真正入库」 */
const echoRequest = (file: File): Promise<{ name: string; url: string }> =>
  Promise.resolve({ name: file.name, url: file.name })

/**
 * 拖拽路径的 `accept` 约束
 *
 * 点选路径由 `<input accept>` 约束，拖拽路径此前直接遍历 `dataTransfer.files`，任何类型都能入库。
 * 对齐 antdv（`AjaxUploader.onFileDrop` + `vc-upload/attr-accept.ts`）：先按 accept 分区，
 * 被拒文件通过 `reject` 事件回传。
 */
describe('Upload 拖拽投放的类型约束', () => {
  it('不符合 accept 的文件不入库，并通过 reject 事件回传', async () => {
    const wrapper = mount(Upload, {
      props: { accept: 'image/*', multiple: true, uploadMode: 'custom', customRequest: echoRequest },
      attachTo: document.body
    })
    await flushPromises()

    await triggerDrop(wrapper, [
      new File(['x'], 'a.png', { type: 'image/png' }),
      new File(['x'], 'b.txt', { type: 'text/plain' })
    ])

    expect(lastFiles(wrapper).map((file) => file.name)).toEqual(['a.png'])
    const rejected = wrapper.emitted('reject')?.[0]?.[0] as File[]
    expect(rejected.map((file) => file.name)).toEqual(['b.txt'])
    wrapper.unmount()
  })

  it('accept 支持逗号分隔与后缀形式（.jpeg 命中 .jpg）', async () => {
    const wrapper = mount(Upload, {
      props: {
        accept: '.jpg, application/pdf',
        multiple: true,
        uploadMode: 'custom',
        customRequest: echoRequest
      },
      attachTo: document.body
    })
    await flushPromises()

    await triggerDrop(wrapper, [
      new File(['x'], 'a.jpeg', { type: 'image/jpeg' }),
      new File(['x'], 'b.pdf', { type: 'application/pdf' }),
      new File(['x'], 'c.txt', { type: 'text/plain' })
    ])

    expect(lastFiles(wrapper).map((file) => file.name)).toEqual(['a.jpeg', 'b.pdf'])
    wrapper.unmount()
  })

  it('全部符合 accept 时不派发 reject', async () => {
    const wrapper = mount(Upload, {
      props: { accept: 'image/*', multiple: true, uploadMode: 'custom', customRequest: echoRequest },
      attachTo: document.body
    })
    await flushPromises()

    await triggerDrop(wrapper, [new File(['x'], 'a.png', { type: 'image/png' })])

    expect(lastFileCount(wrapper)).toBe(1)
    expect(wrapper.emitted('reject')).toBeUndefined()
    wrapper.unmount()
  })
})

/**
 * 单文件模式（`maxCount: 1`）的替换语义
 *
 * 槽位模型下每格既是上传框又是预览位，占满后无空位可点 —— 此前 `maxCount: 1` 只剩预览、
 * 无法替换。对齐 antdv「maxCount 为 1 时取最后一条」：占满后仍常驻一格上传框，
 * 上传落点特例为槽位 0，新文件覆盖当前文件。
 */
describe('Upload 单文件模式的替换语义', () => {
  const existing = [{ name: 'old.jpg', url: 'old.jpg' }]

  it('已有 1 个文件时仍渲染上传入口（2 格 = 1 预览 + 1 上传框）', async () => {
    const wrapper = mount(Upload, {
      props: { maxCount: 1, fileList: existing },
      attachTo: document.body
    })
    await flushPromises()

    expect(wrapper.findAll('input[type="file"]')).toHaveLength(2)
    wrapper.unmount()
  })

  it('已有 1 个文件时再上传：仍只有 1 个，且是最新文件', async () => {
    const wrapper = mount(Upload, {
      props: { maxCount: 1, fileList: existing, uploadMode: 'custom', customRequest: echoRequest },
      attachTo: document.body
    })
    await flushPromises()

    // 下标 1 即常驻上传框，写入的是槽位 0
    await triggerFileChange(wrapper, new File(['x'], 'new.png', { type: 'image/png' }), 1)

    const files = lastFiles(wrapper)
    expect(files).toHaveLength(1)
    expect(files[0].name).toBe('new.png')
    wrapper.unmount()
  })

  it('禁用时不渲染上传入口（只保留预览）', async () => {
    const wrapper = mount(Upload, {
      props: { maxCount: 1, disabled: true, fileList: existing },
      attachTo: document.body
    })
    await flushPromises()

    expect(wrapper.findAll('input[type="file"]')).toHaveLength(1)
    wrapper.unmount()
  })
})
