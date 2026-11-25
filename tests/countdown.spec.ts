import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import type { ComponentMountingOptions } from '@vue/test-utils'
import Countdown from 'components/countdown/Countdown.vue'

/*
 * Countdown 行为守护：
 * - format 的 token 化解析（`[...]` 可原样输出，不再逐段查找字符串）
 * - 毫秒粒度 S / SS / SSS 的取值与补零
 * - 到期事件单次派发（幂等）与挂载即过期的处理
 * - 相对时间模式的暂停 / 重置
 * - 分段渲染的插槽与属性
 * - 回到前台时对后台期间已到期实例的校正
 *
 * 时间口径：同时伪造 setTimeout 与 Date，让「系统时间推进」与「定时器触发」保持一致，
 * 否则定时器触发时求差仍为初始值，倒计时不会真正推进。
 * 断言口径：挂载后才启动计时，首次渲染的剩余值为 0，故每次断言前需等待一次渲染刷新。
 */
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] })
  vi.setSystemTime(new Date(2026, 0, 1, 0, 0, 0))
})
afterEach(() => {
  vi.useRealTimers()
})

const DAY = 24 * 60 * 60 * 1000
type CountdownMountOptions = ComponentMountingOptions<typeof Countdown>

async function mountCountdown(props: CountdownMountOptions['props'], slots?: CountdownMountOptions['slots']) {
  const wrapper = mount(Countdown, { props, slots })
  await nextTick()
  return wrapper
}

describe('format 解析', () => {
  it('`[...]` 内的文本原样输出，不参与单位解析', async () => {
    const wrapper = await mountCountdown({ future: false, value: 61_000, format: '[Day] mm:ss' })
    expect(wrapper.text()).toBe('Day 01:01')
    wrapper.unmount()
  })

  it('转义内的单位字母不会被替换', async () => {
    const wrapper = await mountCountdown({ future: false, value: 61_000, format: 'D[D]' })
    expect(wrapper.text()).toBe('0D')
    wrapper.unmount()
  })

  it('同一单位重复出现时全部替换', async () => {
    const wrapper = await mountCountdown({ future: false, value: 90_000, format: 'mm / mm' })
    expect(wrapper.text()).toBe('01 / 01')
    wrapper.unmount()
  })

  it('毫秒按 token 长度取高位', async () => {
    const texts: string[] = []
    for (const format of ['S', 'SS', 'SSS']) {
      const wrapper = await mountCountdown({ future: false, value: 1500, format })
      texts.push(wrapper.text())
      wrapper.unmount()
    }
    expect(texts).toEqual(['5', '50', '500'])
  })

  it('年与月按 360 天 / 30 天切分', async () => {
    const wrapper = await mountCountdown({ future: false, value: 360 * DAY, format: 'Y 年 M 月 D 天' })
    expect(wrapper.text()).toBe('1 年 0 月 0 天')
    wrapper.unmount()
  })

  it('年按 token 长度补零（Y / YY / YYYY）', async () => {
    const texts: string[] = []
    for (const format of ['Y', 'YY', 'YYYY']) {
      const wrapper = await mountCountdown({ future: false, value: 12 * 360 * DAY, format })
      texts.push(wrapper.text())
      wrapper.unmount()
    }
    expect(texts).toEqual(['12', '12', '0012'])
  })

  it('支持长度之外的写法按原样输出，不拆分也不补零', async () => {
    const texts: string[] = []
    for (const format of ['YYY', 'MMMM', 'SSSS']) {
      const wrapper = await mountCountdown({ future: false, value: 12 * 360 * DAY, format })
      texts.push(wrapper.text())
      wrapper.unmount()
    }
    expect(texts).toEqual(['YYY', 'MMMM', 'SSSS'])
  })

  it('format 未出现的更大单位向下折算为总小时数', async () => {
    const wrapper = await mountCountdown({ future: false, value: DAY, format: 'HH:mm:ss' })
    expect(wrapper.text()).toBe('24:00:00')
    wrapper.unmount()
  })

  it('format 出现日单位时小时回到日内值', async () => {
    const wrapper = await mountCountdown({ future: false, value: DAY, format: 'D 天 HH:mm:ss' })
    expect(wrapper.text()).toBe('1 天 00:00:00')
    wrapper.unmount()
  })

  it('只显示分钟时分钟为总分钟数', async () => {
    const wrapper = await mountCountdown({ future: false, value: 90 * 60_000, format: 'mm:ss' })
    expect(wrapper.text()).toBe('90:00')
    wrapper.unmount()
  })

  it('毫秒格式不做向上取整，整日剩余量从整秒开始展示', async () => {
    const wrapper = await mountCountdown({ future: false, value: DAY, format: 'HH:mm:ss:SSS' })
    expect(wrapper.text()).toBe('24:00:00:000')
    wrapper.unmount()
  })
})

describe('到期事件', () => {
  it('运行中的倒计时到期后只派发一次 finish', async () => {
    const onFinish = vi.fn()
    const wrapper = await mountCountdown({ future: false, value: 2000, onFinish })
    expect(onFinish).not.toHaveBeenCalled()

    vi.advanceTimersByTime(2500)
    expect(onFinish).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(5000)
    expect(onFinish).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('挂载时已过期立即派发 finish，且只派发一次', async () => {
    const onFinish = vi.fn()
    const wrapper = await mountCountdown({ future: false, value: -1, onFinish })
    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(wrapper.text()).toBe('00:00:00')

    vi.advanceTimersByTime(5000)
    expect(onFinish).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('回到前台时校正后台期间已到期的倒计时', async () => {
    const onFinish = vi.fn()
    const wrapper = await mountCountdown({ future: false, value: 3000, onFinish })
    // 模拟后台：定时器未触发，但系统时间已越过截止时刻
    vi.setSystemTime(Date.now() + 5000)
    expect(onFinish).not.toHaveBeenCalled()

    document.dispatchEvent(new Event('visibilitychange'))
    expect(onFinish).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})

describe('暂停与重置', () => {
  it('active 为 false 时剩余时间不推进', async () => {
    const wrapper = await mountCountdown({ future: false, value: 5000, active: false })
    expect(wrapper.text()).toBe('00:00:05')

    vi.advanceTimersByTime(3000)
    await nextTick()
    expect(wrapper.text()).toBe('00:00:05')
    wrapper.unmount()
  })

  it('恢复计时后从暂停处继续', async () => {
    const wrapper = await mountCountdown({ future: false, value: 5000, active: false })
    vi.advanceTimersByTime(3000)

    await wrapper.setProps({ active: true })
    vi.advanceTimersByTime(2500)
    await nextTick()
    expect(wrapper.text()).toBe('00:00:03')
    wrapper.unmount()
  })

  it('reset 回到初始剩余时间', async () => {
    const wrapper = await mountCountdown({ future: false, value: 5000 })
    vi.advanceTimersByTime(2500)
    await nextTick()
    expect(wrapper.text()).toBe('00:00:03')

    ;(wrapper.vm as unknown as { reset: () => void }).reset()
    await nextTick()
    expect(wrapper.text()).toBe('00:00:05')
    wrapper.unmount()
  })
})

describe('分段渲染', () => {
  it('render 属性接管显示内容', async () => {
    const wrapper = await mountCountdown({
      future: false,
      value: 3661_000,
      render: ({ days, hours, minutes, seconds }: { days: number; hours: number; minutes: number; seconds: number }) =>
        `${days} 天 ${hours}:${minutes}:${seconds}`
    })
    expect(wrapper.text()).toBe('0 天 1:1:1')
    wrapper.unmount()
  })

  it('render 插槽优先于 render 属性', async () => {
    const wrapper = await mountCountdown(
      { future: false, value: 3661_000, render: () => 'prop' },
      { render: ({ hours }: { hours: number }) => h('em', `slot-${hours}`) }
    )
    expect(wrapper.find('em').text()).toBe('slot-1')
    wrapper.unmount()
  })
})
