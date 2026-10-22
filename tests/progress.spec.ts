import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Progress from 'components/progress/Progress.vue'

/**
 * 进度值的取值口径回归守护
 *
 * 覆盖曾缺失保护的行为：
 * 1. 负数 / 非数进度钳制到 0（旧实现直接拼进 `width: -20%` / `width: NaN%`，
 *    浏览器会整条丢弃该声明，进度条退化成满格）
 * 2. 超过 100 收口到 100，且文案与完成态一致
 * 3. 渐变进度条到 100% 不套成功色（渐变保留，仅文案与图标转成功色）
 */

describe('Progress 进度值口径', () => {
  it('负数进度钳制为 0：宽度 0%，文案 0%', () => {
    const wrapper = mount(Progress, { props: { percent: -20 } })
    expect((wrapper.find('.progress-bg').element as HTMLElement).style.width).toBe('0%')
    expect(wrapper.find('.progress-text').text()).toBe('0%')
  })

  it('非数进度按 0 处理，不产生非法宽度声明', () => {
    const wrapper = mount(Progress, { props: { percent: Number.NaN } })
    expect((wrapper.find('.progress-bg').element as HTMLElement).style.width).toBe('0%')
    expect(wrapper.find('.progress-text').text()).toBe('0%')
  })

  it('超过 100 收口到 100 并进入完成态', () => {
    const wrapper = mount(Progress, { props: { percent: 180 } })
    expect((wrapper.find('.progress-bg').element as HTMLElement).style.width).toBe('100%')
    expect(wrapper.find('.progress-bg').classes()).toContain('line-success')
    expect(wrapper.find('.progress-success').exists()).toBe(true)
  })

  it('100% 时纯色进度条套成功色，渐变进度条保留渐变', () => {
    const solid = mount(Progress, { props: { percent: 100, lineColor: '#1677ff' } })
    expect(solid.find('.progress-bg').classes()).toContain('line-success')

    const gradient = mount(Progress, {
      props: { percent: 100, lineColor: { '0%': '#108ee9', '100%': '#87d068' } }
    })
    expect(gradient.find('.progress-bg').classes()).not.toContain('line-success')
    // 完成态的文案 / 图标仍按成功态呈现
    expect(gradient.find('.progress-success').exists()).toBe(true)
  })

  it('进度圈同样按钳制值绘制，负值不出现满圈', () => {
    const wrapper = mount(Progress, { props: { type: 'circle', percent: -30 } })
    const path = wrapper.find('.circle-path').element as SVGPathElement
    expect(path.getAttribute('opacity')).toBe('0')
    expect(path.style.strokeDasharray.startsWith('0px')).toBe(true)
  })

  it('format 插槽收到钳制后的值，与文案 / 宽度口径一致', () => {
    const wrapper = mount(Progress, {
      props: { percent: -20 },
      slots: { format: ({ percent }: { percent: number }) => `slot:${percent}` }
    })
    expect(wrapper.find('.progress-text').text()).toBe('slot:0')
  })
})
