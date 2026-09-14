import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref, h } from 'vue'
import Drawer from 'components/drawer/Drawer.vue'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 滚动锁是模块级共享计数：每个用例都必须卸载组件，否则残留锁会污染后续用例
afterEach(() => {
  document.documentElement.style.overflowY = ''
  document.body.style.overflowY = ''
  document.body.style.paddingRight = ''
})

// to: false 关闭 Teleport，使 DOM 留在 wrapper 内便于断言
const mountInline = (props: Record<string, unknown> = {}) =>
  mount(Drawer, { attachTo: document.body, props: { to: false, ...props } })

describe('Drawer 滚动锁', () => {
  it('打开时锁定 body 滚动，关闭后释放', async () => {
    const wrapper = mountInline({ open: true })
    expect(document.body.style.overflowY).toBe('hidden')
    expect(document.documentElement.style.overflowY).toBe('hidden')

    await wrapper.setProps({ open: false })
    await nextTick()
    expect(document.body.style.overflowY).toBe('')
    expect(document.documentElement.style.overflowY).toBe('')
    wrapper.unmount()
  })

  it('初始关闭或 blockScroll 为 false 时不加锁', async () => {
    const closed = mountInline({ open: false })
    expect(document.body.style.overflowY).toBe('')
    closed.unmount()

    const noBlock = mountInline({ open: true, blockScroll: false })
    expect(document.body.style.overflowY).toBe('')
    noBlock.unmount()
  })

  it('加锁与释放落在同一同步路径：挂载即打开后立刻卸载不残留锁', async () => {
    const wrapper = mountInline({ open: true })
    expect(document.body.style.overflowY).toBe('hidden')
    wrapper.unmount()
    // 卸载兜底必须释放本次持有的锁，否则页面滚动被永久锁死
    expect(document.body.style.overflowY).toBe('')
    expect(document.documentElement.style.overflowY).toBe('')
    await sleep(20)
    expect(document.body.style.overflowY).toBe('')
  })
})

describe('Drawer 内容渲染与尺寸', () => {
  it('destroyOnClose 仅在打开期间渲染内容，forceRender 可强制预渲染', async () => {
    const wrapper = mountInline({ open: false, destroyOnClose: true })
    expect(wrapper.find('.drawer-body').exists()).toBe(false)
    await wrapper.setProps({ open: true })
    await nextTick()
    expect(wrapper.find('.drawer-body').exists()).toBe(true)
    wrapper.unmount()

    const forced = mountInline({ open: false, destroyOnClose: true, forceRender: true })
    expect(forced.find('.drawer-body').exists()).toBe(true)
    forced.unmount()
  })

  it('size 预设尺寸：default 378px、large 736px，显式 width 优先', async () => {
    const normal = mountInline({ open: true })
    expect(normal.find('.drawer-container').attributes('style')).toContain('width: 378px')
    normal.unmount()

    const large = mountInline({ open: true, size: 'large' })
    expect(large.find('.drawer-container').attributes('style')).toContain('width: 736px')
    large.unmount()

    const explicit = mountInline({ open: true, size: 'large', width: '50%' })
    expect(explicit.find('.drawer-container').attributes('style')).toContain('width: 50%')
    explicit.unmount()
  })
})

describe('Drawer 多层推动与关闭交互', () => {
  it('子抽屉打开时推动父抽屉位移，关闭时复位', async () => {
    const childOpen = ref(false)
    const wrapper = mount(Drawer, {
      attachTo: document.body,
      props: { open: true, to: false, push: { distance: 100 } },
      slots: { default: () => h(Drawer, { open: childOpen.value, to: false }) }
    })
    await nextTick()
    const outerStyle = () => wrapper.findAll('.drawer-container')[0].attributes('style') ?? ''
    expect(outerStyle()).not.toContain('translateX')

    childOpen.value = true
    await nextTick()
    await sleep(20)
    expect(outerStyle()).toContain('translateX(-100px)')

    childOpen.value = false
    await nextTick()
    await sleep(20)
    expect(outerStyle()).not.toContain('translateX')
    wrapper.unmount()
  })

  it('关闭按钮抛出 update:open 与 close', async () => {
    const wrapper = mountInline({ open: true, title: 'T' })
    await wrapper.find('.drawer-close').trigger('click')
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    expect(wrapper.emitted('close')).toHaveLength(1)
    wrapper.unmount()
  })

  it('maskClosable 控制遮罩点击是否关闭', async () => {
    const closable = mountInline({ open: true })
    await closable.find('.drawer-mask').trigger('click')
    expect(closable.emitted('close')).toHaveLength(1)
    closable.unmount()

    const notClosable = mountInline({ open: true, maskClosable: false })
    await notClosable.find('.drawer-mask').trigger('click')
    expect(notClosable.emitted('close')).toBeUndefined()
    notClosable.unmount()
  })

  it('keyboard 控制 Esc 是否关闭', async () => {
    const closable = mountInline({ open: true })
    await closable.find('.drawer-wrap').trigger('keydown', { key: 'Escape' })
    expect(closable.emitted('close')).toHaveLength(1)
    closable.unmount()

    const notClosable = mountInline({ open: true, keyboard: false })
    await notClosable.find('.drawer-wrap').trigger('keydown', { key: 'Escape' })
    expect(notClosable.emitted('close')).toBeUndefined()
    notClosable.unmount()
  })
})

describe('Drawer 挂载节点与属性透传', () => {
  it('默认挂载到 body，to 为 false 时渲染在当前 DOM', async () => {
    const teleported = mount(Drawer, { attachTo: document.body, props: { open: true, title: 'T' } })
    await nextTick()
    const wrap = document.body.querySelector<HTMLElement>('.drawer-wrap')
    expect(wrap).not.toBeNull()
    expect(wrap?.parentElement).toBe(document.body)
    teleported.unmount()

    const inline = mountInline({ open: true, title: 'T' })
    await nextTick()
    expect(inline.find('.drawer-wrap').exists()).toBe(true)
    inline.unmount()
  })

  it('to 传选择器时挂载到指定节点', async () => {
    const holder = document.createElement('div')
    holder.id = 'drawer-holder'
    document.body.appendChild(holder)
    const wrapper = mount(Drawer, {
      attachTo: document.body,
      props: { open: true, title: 'T', to: '#drawer-holder' }
    })
    await nextTick()
    expect(holder.querySelector('.drawer-wrap')).not.toBeNull()
    wrapper.unmount()
    holder.remove()
  })

  // 回归守护：根节点是 Teleport 时 Vue 无法自动继承 attrs，会丢弃 class / style 并告警
  it('class / style 透传到最外层容器', async () => {
    const wrapper = mount(Drawer, {
      attachTo: document.body,
      props: { open: true, title: 'T' },
      attrs: { class: 'custom-class', style: 'color: red;' }
    })
    await nextTick()
    const wrap = document.querySelector<HTMLElement>('.drawer-wrap')
    expect(wrap?.classList.contains('custom-class')).toBe(true)
    expect(wrap?.getAttribute('style')).toContain('color: red')
    wrapper.unmount()
  })
})
