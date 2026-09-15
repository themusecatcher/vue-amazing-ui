import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingBar from 'components/loading-bar/LoadingBar.vue'

interface LoadingBarInst {
  start: (from?: number, to?: number, status?: 'starting' | 'error') => Promise<void>
}

const inst = (wrapper: ReturnType<typeof mount>) => wrapper.vm as unknown as LoadingBarInst

// 回归守护：根节点是 Teleport 时 Vue 无法自动继承 attrs，会丢弃 class / style 并告警
describe('LoadingBar 属性透传', () => {
  it('class / style 透传到加载条容器 .loading-bar-wrap', async () => {
    const wrapper = mount(LoadingBar, {
      attachTo: document.body,
      attrs: { class: 'custom-class', style: 'color: red;' }
    })
    // 容器用 v-if 延迟到首次展示才渲染，需先触发一次 start
    await inst(wrapper).start()
    const wrap = document.body.querySelector<HTMLElement>('.loading-bar-wrap')
    expect(wrap?.classList.contains('custom-class')).toBe(true)
    expect(wrap?.getAttribute('style')).toContain('color: red')
    wrapper.unmount()
  })
})
