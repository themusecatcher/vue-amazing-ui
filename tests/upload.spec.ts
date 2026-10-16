import { describe, it, expect, vi } from 'vitest'
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

    expect(errorSpy).toHaveBeenCalledWith('[vue-amazing-ui] Upload: beforeUpload 执行出错', expect.any(Error))
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

    expect(errorSpy).toHaveBeenCalledWith('[vue-amazing-ui] Upload: beforeUpload 执行出错', expect.any(Error))
    wrapper.unmount()
  })
})
