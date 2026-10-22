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
async function triggerFileChange(wrapper: ReturnType<typeof mount>, file: File): Promise<void> {
  const input = wrapper.find('input[type="file"]')
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
