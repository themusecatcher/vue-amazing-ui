import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import LoadingBarProvider from 'components/loading-bar/LoadingBarProvider.vue'
import { useLoadingBar } from 'components/loading-bar/useLoadingBar'
import type { LoadingBarApi } from 'components/loading-bar/useLoadingBar'
import type { LoadingBarProps } from 'components/loading-bar/LoadingBar.vue'

describe('LoadingBarProvider', () => {
  it('useLoadingBar 可在 Provider 内部取到 api', async () => {
    let api: LoadingBarApi | null = null
    const Child = defineComponent({
      setup() {
        api = useLoadingBar()
        return () => null
      }
    })
    const wrapper = mount(LoadingBarProvider, {
      slots: { default: () => h(Child) },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()

    expect(api).not.toBeNull()
    expect(typeof api!.start).toBe('function')
    expect(typeof api!.finish).toBe('function')
    expect(typeof api!.error).toBe('function')
    wrapper.unmount()
  })

  // 回归守护：根节点是 Teleport 时 Vue 无法自动继承 attrs，会丢弃 class / style 并告警；
  // Provider 与内部 LoadingBar 均需把 attrs 透传到加载条容器 .loading-bar-wrap
  it('class / style 经 Provider 透传到加载条容器 .loading-bar-wrap', async () => {
    let api: LoadingBarApi | null = null
    const Child = defineComponent({
      setup() {
        api = useLoadingBar()
        return () => null
      }
    })
    const wrapper = mount(LoadingBarProvider, {
      slots: { default: () => h(Child) },
      attrs: { class: 'custom-class', style: 'color: red;' },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    // 容器用 v-if 延迟到首次展示才渲染，需先触发一次 start
    await api!.start()
    await wrapper.vm.$nextTick()

    const wrap = document.body.querySelector<HTMLElement>('.loading-bar-wrap')
    expect(wrap?.classList.contains('custom-class')).toBe(true)
    expect(wrap?.getAttribute('style')).toContain('color: red')
    wrapper.unmount()
  })

  // 每个状态用全新 Provider 驱动，避免 finishing / erroring 的早返回分支相互干扰；
  // 返回内层进度条的内联 background，用于断言当前生效的状态样式
  async function driveTo(
    loadingBarStyle: LoadingBarProps['loadingBarStyle'],
    run: (api: LoadingBarApi) => unknown
  ): Promise<string | undefined> {
    let api: LoadingBarApi | null = null
    const Child = defineComponent({
      setup() {
        api = useLoadingBar()
        return () => null
      }
    })
    const wrapper = mount(LoadingBarProvider, {
      slots: { default: () => h(Child) },
      attrs: { loadingBarStyle },
      attachTo: document.body
    })
    await wrapper.vm.$nextTick()
    await run(api!)
    await flushPromises()
    await wrapper.vm.$nextTick()
    const bar = document.body.querySelector<HTMLElement>('.loading-bar')
    const background = bar?.style.background
    wrapper.unmount()
    return background
  }

  // 回归守护：loadingBarStyle 按当前状态取样式，以内联样式作用于内层进度条
  it('loadingBarStyle 支持 loading / finish / error 三态并内联生效', async () => {
    const loadingBarStyle: LoadingBarProps['loadingBarStyle'] = {
      loading: { background: 'rgb(1, 1, 1)' },
      finish: { background: 'rgb(2, 2, 2)' },
      error: { background: 'rgb(3, 3, 3)' }
    }

    await expect(driveTo(loadingBarStyle, (api) => api.start())).resolves.toBe('rgb(1, 1, 1)')
    await expect(
      driveTo(loadingBarStyle, async (api) => {
        await api.start()
        await api.finish()
      })
    ).resolves.toBe('rgb(2, 2, 2)')
    await expect(driveTo(loadingBarStyle, (api) => api.error())).resolves.toBe('rgb(3, 3, 3)')
  })

  // 未提供 finish 时，完成态沿用 loading 的样式
  it('loadingBarStyle 未提供 finish 时，完成态回落到 loading', async () => {
    const loadingBarStyle: LoadingBarProps['loadingBarStyle'] = {
      loading: { background: 'rgb(1, 1, 1)' },
      error: { background: 'rgb(3, 3, 3)' }
    }

    await expect(
      driveTo(loadingBarStyle, async (api) => {
        await api.start()
        await api.finish()
      })
    ).resolves.toBe('rgb(1, 1, 1)')
  })

  it('脱离 Provider 调用 useLoadingBar 时抛出明确错误', () => {
    const Standalone = defineComponent({
      render: () => null,
      setup() {
        useLoadingBar()
      }
    })
    expect(() => mount(Standalone)).toThrow('[useLoadingBar]')
  })
})
