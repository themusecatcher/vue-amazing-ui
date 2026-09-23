import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NumberAnimation from 'components/number-animation/NumberAnimation.vue'

interface NumberAnimationInst {
  play: () => void
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitFor(cond: () => boolean, timeout = 2000): Promise<void> {
  const start = Date.now()
  while (!cond() && Date.now() - start < timeout) {
    await sleep(10)
  }
}

const inst = (wrapper: ReturnType<typeof mount>) => wrapper.vm as unknown as NumberAnimationInst

describe('NumberAnimation 播放控制与事件', () => {
  it('autoplay 由 false 变为 true 时重新播放', async () => {
    const wrapper = mount(NumberAnimation, { props: { from: 0, to: 100, duration: 40, autoplay: false } })
    await nextTick()
    expect(wrapper.emitted('started')).toBeUndefined()

    await wrapper.setProps({ autoplay: true })
    expect(wrapper.emitted('started')).toHaveLength(1)
    await waitFor(() => wrapper.emitted('finished') !== undefined)
    expect(wrapper.emitted('finished')).toHaveLength(1)
    wrapper.unmount()
  })

  it('from 与 to 相同时直接落位，不抛出动画事件', async () => {
    const wrapper = mount(NumberAnimation, { props: { from: 5, to: 5 } })
    await nextTick()
    expect(wrapper.text()).toBe('5')
    expect(wrapper.emitted('started')).toBeUndefined()
    expect(wrapper.emitted('finished')).toBeUndefined()
    wrapper.unmount()
  })

  it('to 变更后按新目标重新播放', async () => {
    const wrapper = mount(NumberAnimation, { props: { from: 0, to: 100, duration: 30 } })
    await waitFor(() => wrapper.emitted('finished') !== undefined)
    expect(wrapper.emitted('started')).toHaveLength(1)

    await wrapper.setProps({ to: 200 })
    await waitFor(() => (wrapper.emitted('started')?.length ?? 0) === 2)
    expect(wrapper.emitted('started')).toHaveLength(2)
    wrapper.unmount()
  })

  it('动画进行中调用 play 被忽略，播放结束后可重新播放', async () => {
    const wrapper = mount(NumberAnimation, { props: { from: 0, to: 100, duration: 120, autoplay: false } })
    inst(wrapper).play()
    expect(wrapper.emitted('started')).toHaveLength(1)
    // 动画进行中再次调用应被忽略
    inst(wrapper).play()
    expect(wrapper.emitted('started')).toHaveLength(1)

    await waitFor(() => wrapper.emitted('finished') !== undefined)
    inst(wrapper).play()
    expect(wrapper.emitted('started')).toHaveLength(2)
    wrapper.unmount()
  })

  it('卸载后中止在飞动画，不再抛出 finished', async () => {
    const wrapper = mount(NumberAnimation, { props: { from: 0, to: 100, duration: 100 } })
    expect(wrapper.emitted('started')).toHaveLength(1)
    wrapper.unmount()
    await sleep(300)
    expect(wrapper.emitted('finished')).toBeUndefined()
  })

  it('展示值按 precision / prefix / suffix 格式化，数值为 0 时也不丢前后缀', async () => {
    const wrapper = mount(NumberAnimation, {
      props: { from: 0, to: 0, precision: 2, prefix: '$', suffix: '元', autoplay: false }
    })
    await nextTick()
    expect(wrapper.text()).toBe('$0.00元')
    wrapper.unmount()
  })

  // 回归守护：未播放时展示值必须跟随 from，否则静态展示（autoplay 为 false）场景会停在旧值
  it('autoplay 为 false 时，from 变更立即同步展示值且不抛动画事件', async () => {
    const wrapper = mount(NumberAnimation, { props: { from: 0, to: 100, autoplay: false } })
    await nextTick()
    expect(wrapper.text()).toBe('0')

    await wrapper.setProps({ from: 50 })
    expect(wrapper.text()).toBe('50')
    expect(wrapper.emitted('started')).toBeUndefined()
    expect(wrapper.emitted('finished')).toBeUndefined()
    wrapper.unmount()
  })

  it('播放中变更 from 不打断动画，动画仍落在 to', async () => {
    const wrapper = mount(NumberAnimation, { props: { from: 0, to: 100, duration: 60, autoplay: false } })
    inst(wrapper).play()
    await wrapper.setProps({ from: 500 })
    await waitFor(() => wrapper.emitted('finished') !== undefined)
    expect(wrapper.text()).toBe('100')
    wrapper.unmount()
  })
})
