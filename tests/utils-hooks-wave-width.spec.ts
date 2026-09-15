import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import type { Ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useWave, useWindowWidth } from 'components/utils'

/**
 * 本轮抽取出的两个组合式函数回归守护
 *
 * - `useWave`：Button / Checkbox / Radio / Switch 共用的涟漪状态机，
 *   抽取前四个组件各写一份同样的逻辑，抽取后任一组件的行为都依赖它；
 * - `useWindowWidth`：Avatar / Row / Col 共用的视口宽度响应式来源，
 *   抽取前的实现由各组件自带（含 SSR 判断与 resize 监听），抽取后同样成为单点依赖。
 */

/** 设置 window.innerWidth（happy-dom 下默认可写，但显式定义更稳） */
function setWindowWidth(width: number): void {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true })
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('useWave - 水波纹状态机', () => {
  it('初始状态为未播放', () => {
    expect(useWave().wave.value).toBe(false)
  })

  it('首次 startWave 应立即置为播放中', () => {
    const { wave, startWave } = useWave()
    startWave()
    expect(wave.value).toBe(true)
  })

  it('播放中再次 startWave 应先复位、下一帧再置位，以强制重放动画', async () => {
    const { wave, startWave } = useWave()
    startWave()
    expect(wave.value).toBe(true)

    // 连点：必须先把 wave-active 摘掉，否则同名 class 不会重新触发 CSS 动画
    startWave()
    expect(wave.value).toBe(false)
    await nextTick()
    expect(wave.value).toBe(true)
  })

  it('endWave（animationend 回调）应复位为未播放', () => {
    const { wave, startWave, endWave } = useWave()
    startWave()
    endWave()
    expect(wave.value).toBe(false)
  })

  it('未播放时 endWave 不应抛错，且保持未播放', () => {
    const { wave, endWave } = useWave()
    expect(() => endWave()).not.toThrow()
    expect(wave.value).toBe(false)
  })

  it('多个实例状态相互独立，不共享 wave 标志', async () => {
    const a = useWave()
    const b = useWave()
    a.startWave()
    expect(a.wave.value).toBe(true)
    expect(b.wave.value).toBe(false)

    b.startWave()
    await nextTick()
    expect(a.wave.value).toBe(true)
    expect(b.wave.value).toBe(true)
  })
})

describe('useWindowWidth - 视口宽度响应式', () => {
  function mountProbe(): { width: Ref<number>; wrapper: ReturnType<typeof mount> } {
    let width!: Ref<number>
    const Probe = defineComponent({
      setup() {
        width = useWindowWidth()
        return () => h('div')
      }
    })
    const wrapper = mount(Probe)
    return { width, wrapper }
  }

  it('初始值应为当前 window.innerWidth', () => {
    setWindowWidth(1280)
    const { width, wrapper } = mountProbe()
    expect(width.value).toBe(1280)
    wrapper.unmount()
  })

  it('窗口 resize 后应更新为新的视口宽度', async () => {
    setWindowWidth(1280)
    const { width, wrapper } = mountProbe()
    expect(width.value).toBe(1280)

    setWindowWidth(768)
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(width.value).toBe(768)
    wrapper.unmount()
  })

  it('卸载后应移除 resize 监听，避免残留监听与卸载后写状态', async () => {
    setWindowWidth(1280)
    const { width, wrapper } = mountProbe()
    setWindowWidth(768)
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(width.value).toBe(768)

    wrapper.unmount()
    setWindowWidth(375)
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    // 监听已移除：宽度停留在卸载前的值
    expect(width.value).toBe(768)
  })

  it('多个实例应各自独立跟随同一 resize 事件', async () => {
    setWindowWidth(1000)
    const first = mountProbe()
    const second = mountProbe()
    expect(first.width.value).toBe(1000)
    expect(second.width.value).toBe(1000)

    setWindowWidth(500)
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(first.width.value).toBe(500)
    expect(second.width.value).toBe(500)

    first.wrapper.unmount()
    second.wrapper.unmount()
  })

  it('返回值参与响应式（computed 可随 resize 重新求值）', async () => {
    setWindowWidth(1200)
    let isWide!: Ref<boolean>
    const Probe = defineComponent({
      setup() {
        const width = useWindowWidth()
        isWide = ref(false)
        return () => {
          isWide.value = width.value >= 992
          return h('div')
        }
      }
    })
    const wrapper = mount(Probe)
    expect(isWide.value).toBe(true)

    setWindowWidth(480)
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(isWide.value).toBe(false)
    wrapper.unmount()
  })
})
