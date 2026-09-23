import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from 'components/button'
import Checkbox from 'components/checkbox'
import Radio from 'components/radio'
import Switch from 'components/switch'

/**
 * 水波纹动画回归守护（Button / Checkbox / Radio / Switch）
 *
 * 本轮把四个组件各自实现的 `wave / startWave / endWave` 统一收敛到 `useWave()`，
 * 组件模板上的 `@animationend` 回调同步由 `onWaveEnd` 改名为 `endWave`。
 * 这些类名（`.xxx-wave` / `.wave-active`）与事件绑定是动画可见性的唯一开关，
 * 一旦抽取过程中改名或漏接，动画会静默失效而没有任何类型错误，故逐一锁定。
 *
 * 说明：动画「连点时先复位、下一帧再置位」的重放细节由 useWave 单元测试覆盖，
 * 此处只验证组件接线（点击置位 / animationend 复位 / disabled 不渲染）。
 */

const waveCases = [
  {
    name: 'Button',
    waveSelector: '.button-wave',
    clickSelector: '.btn-wrap',
    mount: () => mount(Button, { slots: { default: '按钮' } })
  },
  {
    name: 'Checkbox',
    waveSelector: '.checkbox-wave',
    clickSelector: '.checkbox-container',
    mount: () => mount(Checkbox, { slots: { default: '复选' } })
  },
  {
    name: 'Radio',
    waveSelector: '.radio-wave',
    clickSelector: '.radio-container',
    mount: () => mount(Radio, { slots: { default: '单选' } })
  },
  {
    name: 'Switch',
    waveSelector: '.switch-wave',
    clickSelector: '.switch-wrap',
    mount: () => mount(Switch, { props: { value: false } })
  }
] as const

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

describe('水波纹 - 四种组件的点击置位与 animationend 复位', () => {
  waveCases.forEach(({ name, waveSelector, clickSelector, mount: mountFn }) => {
    it(`${name}：点击后波纹节点应带上 wave-active`, async () => {
      wrapper = mountFn()
      const wave = wrapper.find(waveSelector)
      expect(wave.exists()).toBe(true)
      expect(wave.classes()).not.toContain('wave-active')

      await wrapper.find(clickSelector).trigger('click')

      const after = wrapper.find(waveSelector)
      expect(after.classes()).toContain('wave-active')
    })

    it(`${name}：animationend 后应移除 wave-active`, async () => {
      wrapper = mountFn()
      await wrapper.find(clickSelector).trigger('click')
      expect(wrapper.find(waveSelector).classes()).toContain('wave-active')

      await wrapper.find(waveSelector).trigger('animationend')

      expect(wrapper.find(waveSelector).classes()).not.toContain('wave-active')
    })
  })
})

describe('水波纹 - 禁用态不渲染波纹节点', () => {
  it('Button disabled 时不渲染 .button-wave', () => {
    wrapper = mount(Button, { props: { disabled: true }, slots: { default: '按钮' } })
    expect(wrapper.find('.button-wave').exists()).toBe(false)
  })

  it('Switch disabled 时不渲染 .switch-wave', () => {
    wrapper = mount(Switch, { props: { disabled: true } })
    expect(wrapper.find('.switch-wave').exists()).toBe(false)
  })

  it('Checkbox disabled 时不渲染 .checkbox-wave', () => {
    wrapper = mount(Checkbox, { props: { disabled: true } })
    expect(wrapper.find('.checkbox-wave').exists()).toBe(false)
  })

  it('Radio disabled 时不渲染 .radio-wave', () => {
    wrapper = mount(Radio, { props: { disabled: true } })
    expect(wrapper.find('.radio-wave').exists()).toBe(false)
  })
})

describe('水波纹 - 多选项模式下波纹绑定到被点击的那一项', () => {
  it('Checkbox options 模式：点到哪一项，哪一项的波纹置位', async () => {
    wrapper = mount(Checkbox, {
      props: {
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' }
        ]
      }
    })
    const containers = wrapper.findAll('.checkbox-container')
    await containers[1].trigger('click')

    const waves = wrapper.findAll('.checkbox-wave')
    expect(waves[0].classes()).not.toContain('wave-active')
    expect(waves[1].classes()).toContain('wave-active')
  })

  it('Radio options 模式：点到哪一项，哪一项的波纹置位', async () => {
    wrapper = mount(Radio, {
      props: {
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' }
        ]
      }
    })
    const containers = wrapper.findAll('.radio-container')
    await containers[1].trigger('click')

    const waves = wrapper.findAll('.radio-wave')
    expect(waves[0].classes()).not.toContain('wave-active')
    expect(waves[1].classes()).toContain('wave-active')
  })

  it('Radio options 模式：重复点击已选中项不应重新播放波纹', async () => {
    wrapper = mount(Radio, {
      props: {
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' }
        ]
      }
    })
    const containers = wrapper.findAll('.radio-container')
    await containers[1].trigger('click')
    await wrapper.findAll('.radio-wave')[1].trigger('animationend')
    expect(wrapper.findAll('.radio-wave')[1].classes()).not.toContain('wave-active')

    // 值未变化：onClick 不应再次 startWave
    await containers[1].trigger('click')
    expect(wrapper.findAll('.radio-wave')[1].classes()).not.toContain('wave-active')
  })
})

describe('水波纹 - 兄弟组件互不干扰', () => {
  it('同时挂载 Button 与 Switch，点击其一不影响另一方的波纹状态', async () => {
    const button = mount(Button, { slots: { default: '按钮' } })
    const sw = mount(Switch, { props: { value: false } })

    await button.find('.btn-wrap').trigger('click')
    expect(button.find('.button-wave').classes()).toContain('wave-active')
    expect(sw.find('.switch-wave').classes()).not.toContain('wave-active')

    button.unmount()
    sw.unmount()
  })
})
