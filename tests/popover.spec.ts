import { describe, it, expect, vi, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Popover from 'components/popover'

/**
 * 回归守护：Popover 未声明 `trigger` / `keyboard`（以及 `show`），
 * 这些能力**依赖 Vue 的属性透传**落到内层 Tooltip 上。
 *
 * 因此一旦有人给 Popover 加 `inheritAttrs: false`、或把 `trigger` 声明为
 * 非透传的自有语义，下列行为会无声失效 —— 用行为断言把该契约锁住。
 *
 * 注：@vue/test-utils 默认 stub `Transition`，会使挂在 `<Transition>` 上的监听
 * 落到 stub 而非真实元素，故显式关闭（与本仓库 test/tooltip.spec.ts 一致）。
 */
const mountOptions = {
  attachTo: document.body,
  global: {
    stubs: {
      transition: false
    }
  }
}

const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

async function flush(): Promise<void> {
  await nextTick()
  await tick()
  await nextTick()
}

const isShown = (): boolean => document.querySelector('.tooltip-card-container') !== null

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.restoreAllMocks()
})

function mountPopover(props: Record<string, unknown>): void {
  wrapper = mount(Popover, {
    ...mountOptions,
    props,
    slots: { default: () => h('button', { class: 'btn' }, 'b') }
  })
}

describe('Popover 依赖属性透传到内层 Tooltip', () => {
  it('trigger="click" 透传生效：hover 不打开、click 打开', async () => {
    mountPopover({ title: 't', content: 'c', trigger: 'click' })
    await flush()

    const wrapEl = document.querySelector('.tooltip-wrap') as HTMLElement
    // 不应作为普通 DOM 属性残留
    expect(wrapEl.getAttribute('trigger')).toBeNull()

    wrapEl.dispatchEvent(new Event('mouseenter'))
    await flush()
    expect(isShown()).toBe(false)
    ;(document.querySelector('.tooltip-content') as HTMLElement).dispatchEvent(new Event('click'))
    await flush()
    expect(isShown()).toBe(true)
  })

  it('keyboard 透传生效：trigger="click" 时 Enter 可切换显示', async () => {
    mountPopover({ title: 't', content: 'c', trigger: 'click', keyboard: true })
    await flush()

    const content = document.querySelector('.tooltip-content') as HTMLElement
    content.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await flush()
    expect(isShown()).toBe(true)
  })
})
