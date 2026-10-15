import { describe, it, expect, vi } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import ColorPicker from 'components/color-picker/ColorPicker.vue'

/**
 * ColorPicker 回归
 *
 * 覆盖本轮修复的缺陷与新增能力：
 * - 非法色值（颜色名 / 无法识别的串）不再抛错，降级为空值态；
 * - `defaultValue` 作为未受控初始值；
 * - 空值态下色相条兜底可用；
 * - alpha 百分比输入越界时收敛到 `0 - 1`；
 * - 禁用态不展开面板；
 * - 自定义触发器插槽；
 * - 触发器元素的属性透传（浮层专属属性与事件不重复绑定）；
 * - 色板支持键盘 Enter 选色；
 * - 动态 `modes` 下的模式切换与收敛（当前模式被移除时回落到首个可用模式）。
 *
 * 环境说明：happy-dom 无布局引擎，滑动条拖拽依赖的矩形测量与指针捕获需要桩。
 */
const wait = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms))

/** 为滑动条补齐布局矩形与指针捕获桩 */
function stubRail(el: HTMLElement, rect: { left: number; width: number; height: number }): void {
  el.getBoundingClientRect = () =>
    ({
      ...rect,
      top: 0,
      bottom: rect.height,
      right: rect.left + rect.width,
      x: rect.left,
      y: 0,
      toJSON: () => ({})
    }) as DOMRect
  el.setPointerCapture = () => {}
}

async function openPanel(): Promise<void> {
  document.querySelector<HTMLElement>('.color-picker-display')?.click()
  await wait(80)
}

/** 读取面板中的当前模式标签文字（如 RGB / HEXA） */
function readModeLabel(): string {
  return document.querySelector<HTMLElement>('.color-picker-input-mode')?.textContent?.trim() ?? ''
}

/** 点击模式标签，切换到下一个模式 */
function clickModeLabel(): void {
  document.querySelector<HTMLElement>('.color-picker-input-mode')?.click()
}

describe('ColorPicker', () => {
  it('非法色值不导致挂载崩溃', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { value: 'red' }, attachTo: document.body })
    await wait()
    expect(wrapper.find('.color-picker-display').exists()).toBe(true)
    // 无法识别的色值降级为空值态：触发器不展示数值
    expect(document.querySelector('.color-picker-value')).toBeNull()
    wrapper.unmount()
  })

  it('defaultValue 作为未受控初始值', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { defaultValue: '#18A058' }, attachTo: document.body })
    await wait()
    expect(document.querySelector('.color-picker-value')?.textContent?.trim()).toBe('#18A058')
    wrapper.unmount()
  })

  it('空值态下色相条可调（兜底纯色）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: {}, attachTo: document.body })
    await wait()
    await openPanel()
    const [hueRail] = Array.from(document.querySelectorAll<HTMLElement>('.color-picker-slider > div'))
    expect(hueRail).toBeTruthy()
    stubRail(hueRail, { left: 0, width: 100, height: 12 })
    hueRail.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 6, clientY: 6, pointerId: 1 }))
    await wait()
    // hue 0 / s 100 / v 100 兜底为纯红
    expect(wrapper.emitted('update:value')?.slice(-1)[0]?.[0]).toBe('rgba(255, 0, 0, 1)')
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1 }))
    wrapper.unmount()
  })

  it('空值态下 alpha 轨道不可拖动（色相条仍可调）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: {}, attachTo: document.body })
    await wait()
    await openPanel()
    const sliders = Array.from(document.querySelectorAll<HTMLElement>('.color-picker-slider'))
    // 滑块数量：色相轨道 + alpha 轨道
    expect(sliders).toHaveLength(2)
    const hueRail = sliders[0].firstElementChild as HTMLElement
    stubRail(hueRail, { left: 0, width: 100, height: 12 })
    const addSpy = vi.spyOn(document, 'addEventListener')
    // alpha 轨道：空值态无颜色可调，忽略指针事件且光标回落箭头（不注册全局监听）
    expect(sliders[1].classList.contains('slider-empty')).toBe(true)
    sliders[1].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 6, clientY: 6, pointerId: 3 }))
    expect(addSpy.mock.calls.filter(([type]) => type === 'pointermove')).toHaveLength(0)
    expect(wrapper.emitted('update:value')).toBeUndefined()
    // 色相条：空值态按纯色兜底，仍可拖出颜色（本项目增强）
    hueRail.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 6, clientY: 6, pointerId: 2 }))
    expect(addSpy.mock.calls.filter(([type]) => type === 'pointermove')).toHaveLength(1)
    expect(wrapper.emitted('update:value')?.slice(-1)[0]?.[0]).toBe('rgba(255, 0, 0, 1)')
    addSpy.mockRestore()
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 2 }))
    wrapper.unmount()
  })

  it('输入越界值后输入框回显收敛后的内部值', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { value: 'rgba(0, 0, 0, 1)' }, attachTo: document.body })
    await wait()
    await openPanel()
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('.color-picker-input-group .input-item'))
    expect(inputs[3].value).toBe('100%')
    inputs[3].value = '300%'
    inputs[3].dispatchEvent(new Event('input', { bubbles: true }))
    inputs[3].dispatchEvent(new Event('change', { bubbles: true }))
    await wait()
    // 收敛结果与内部值一致：输入框文本回滚为内部值，不再停留 300%
    const after = Array.from(document.querySelectorAll<HTMLInputElement>('.color-picker-input-group .input-item'))
    expect(after[3].value).toBe('100%')
    wrapper.unmount()
  })

  it('模式可识别但无法解析的色值降级为空值态', async () => {
    document.body.innerHTML = ''
    // CSS4 带 alpha 的 hsl()：模式识别为 hsl，但解析器不接受该写法
    const wrapper = mount(ColorPicker, { props: { value: 'hsl(148, 64%, 46%, 1)' }, attachTo: document.body })
    await wait()
    expect(wrapper.find('.color-picker-display').exists()).toBe(true)
    expect(document.querySelector('.color-picker-value')).toBeNull()
    wrapper.unmount()
  })

  it('非法色板渲染不崩、点击被忽略（合法色板仍可用）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: {
        value: 'rgba(0, 0, 0, 1)',
        swatches: ['hsl(148, 64%, 46%, 1)', 'hsv(148, 64%, 46%, 1)', '#18A058'],
        showAlpha: false
      },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    const swatches = Array.from(document.querySelectorAll<HTMLElement>('.color-picker-swatch'))
    expect(swatches).toHaveLength(3)
    swatches[0].click()
    swatches[1].click()
    await wait()
    expect(wrapper.emitted('update:value')).toBeUndefined()
    // 合法色板不受影响：按当前模式（rgb）转换后写入
    swatches[2].click()
    await wait()
    expect(wrapper.emitted('update:value')?.slice(-1)[0]?.[0]).toBe('rgba(24, 160, 88, 1)')
    wrapper.unmount()
  })

  it('色板支持键盘 Enter 选色（其他按键不选色）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: 'rgba(0, 0, 0, 1)', swatches: ['#18A058'], showAlpha: false },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    const swatch = document.querySelector<HTMLElement>('.color-picker-swatch')
    expect(swatch?.getAttribute('tabindex')).toBe('0')
    // 非 Enter 按键不触发选色
    swatch?.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
    await wait()
    expect(wrapper.emitted('update:value')).toBeUndefined()
    // Enter 选色：与鼠标点击走同一写入路径
    swatch?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await wait()
    expect(wrapper.emitted('update:value')?.slice(-1)[0]?.[0]).toBe('rgba(24, 160, 88, 1)')
    wrapper.unmount()
  })

  it('当前模式在 modes 中时按列表循环切换', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', modes: ['rgb', 'hex', 'hsl'], showAlpha: false },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    // 初始模式由值的格式决定
    expect(readModeLabel()).toBe('HEX')
    clickModeLabel()
    await wait()
    expect(readModeLabel()).toBe('HSL')
    clickModeLabel()
    await wait()
    expect(readModeLabel()).toBe('RGB')
    clickModeLabel()
    await wait()
    // 走完一轮回绕到首个模式
    expect(readModeLabel()).toBe('HEX')
    wrapper.unmount()
  })

  it('当前模式被移出 modes 后，切换器落到首个可用模式', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      // 值的格式为 rgb，而 modes 不含 rgb：初始按值的格式展示，点击切换器必须能脱离该模式
      props: { value: 'rgba(0, 0, 0, 1)', modes: ['hex', 'hsl'], showAlpha: false },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    expect(readModeLabel()).toBe('RGB')
    clickModeLabel()
    await wait()
    // 落到首个可用模式，而不是停在不存在的 rgb 上（否则切换器对该值完全失灵）
    expect(readModeLabel()).toBe('HEX')
    clickModeLabel()
    await wait()
    expect(readModeLabel()).toBe('HSL')
    wrapper.unmount()
  })

  it('modes 运行时移除当前模式时自动收敛到首个可用模式', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', modes: ['rgb', 'hex'], showAlpha: false },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    expect(readModeLabel()).toBe('HEX')
    // 移除当前模式：面板不应停留在已被移除的模式上
    await wrapper.setProps({ modes: ['rgb', 'hsl'] })
    await wait()
    expect(readModeLabel()).toBe('RGB')
    wrapper.unmount()
  })

  it('modes 变动但当前模式仍可用时保持当前模式', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', modes: ['rgb', 'hex'], showAlpha: false },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    expect(readModeLabel()).toBe('HEX')
    // 增删其他模式不应打断用户当前所处的模式
    await wrapper.setProps({ modes: ['hex', 'hsl'] })
    await wait()
    expect(readModeLabel()).toBe('HEX')
    wrapper.unmount()
  })

  it('modes 为空数组时切换器保持现状且不崩溃', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', modes: [], showAlpha: false },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    expect(readModeLabel()).toBe('HEX')
    clickModeLabel()
    await wait()
    // 无可切换目标：维持当前模式，不产生空模式
    expect(readModeLabel()).toBe('HEX')
    expect(document.querySelector<HTMLElement>('.color-picker-input-mode')?.style.cursor).toBe('')
    wrapper.unmount()
  })

  it('alpha 百分比输入越界时收敛到 0 - 1', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { value: 'rgba(0, 0, 0, 1)' }, attachTo: document.body })
    await wait()
    await openPanel()
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('.color-picker-input-group .input-item'))
    expect(inputs).toHaveLength(4)
    const alphaInput = inputs[3]
    alphaInput.value = '300%'
    alphaInput.dispatchEvent(new Event('input', { bubbles: true }))
    alphaInput.dispatchEvent(new Event('change', { bubbles: true }))
    await wait()
    expect(wrapper.emitted('update:value')?.slice(-1)[0]?.[0]).toBe('rgba(0, 0, 0, 1)')
    wrapper.unmount()
  })

  it('禁用态不展开面板', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', disabled: true },
      attachTo: document.body
    })
    await wait()
    document.querySelector<HTMLElement>('.color-picker-display')?.click()
    await wait(80)
    expect(document.querySelector('.color-picker-panel')).toBeNull()
    wrapper.unmount()
  })

  it('自定义触发器插槽渲染并可展开面板', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058' },
      slots: {
        trigger: (slotProps: { value?: string; onClick?: () => void }) =>
          h('button', { class: 'custom-trigger', onClick: slotProps.onClick }, slotProps.value ?? '')
      },
      attachTo: document.body
    })
    await wait()
    expect(wrapper.find('.color-picker-display').exists()).toBe(false)
    const trigger = wrapper.find('.custom-trigger')
    expect(trigger.exists()).toBe(true)
    expect(trigger.text()).toBe('#18A058')
    await trigger.trigger('click')
    await wait(80)
    expect(document.querySelector('.color-picker-panel')).not.toBeNull()
    wrapper.unmount()
  })

  it('自定义触发器时容器随内容自适应，内置触发器仍按 width / height 撑满', async () => {
    document.body.innerHTML = ''
    const custom = mount(ColorPicker, {
      props: { value: '#ff6900' },
      slots: {
        trigger: (slotProps: { value?: string; onClick?: () => void }) =>
          h('button', { class: 'custom-trigger', onClick: slotProps.onClick }, slotProps.value ?? '')
      },
      attachTo: document.body
    })
    await wait()
    const customHost = document.querySelector('.tooltip-wrap')
    const customHostStyle = customHost?.getAttribute('style') ?? ''
    expect(customHostStyle).toContain('display: inline-flex')
    expect(customHostStyle).not.toContain('width:')
    // 计算样式兜底：display 由组件内联样式跨层覆盖 Tooltip 根节点，
    // 该透传链路若被改动，触发器会静默退回 inline-block（行盒支柱把块级触发器顶偏）
    expect(customHost ? getComputedStyle(customHost).display : '').toBe('inline-flex')
    custom.unmount()

    document.body.innerHTML = ''
    const builtin = mount(ColorPicker, { props: { value: '#ff6900' }, attachTo: document.body })
    await wait()
    const builtinHostStyle = document.querySelector('.tooltip-wrap')?.getAttribute('style') ?? ''
    expect(builtinHostStyle).toContain('width:')
    expect(builtinHostStyle).toContain('height:')
    builtin.unmount()
  })

  it('触发器不透传浮层专属属性与事件（避免重复触发）', async () => {
    document.body.innerHTML = ''
    let clickCount = 0
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058' },
      attrs: {
        class: 'my-picker',
        show: false,
        onClick: () => {
          clickCount += 1
        }
      },
      attachTo: document.body
    })
    await wait()
    const display = document.querySelector<HTMLElement>('.color-picker-display')
    expect(display?.getAttribute('show')).toBeNull()
    expect(display?.classList.contains('my-picker')).toBe(true)
    display?.click()
    await wait(80)
    expect(clickCount).toBe(1)
    wrapper.unmount()
  })

  it('非法输入失焦后输入框回滚到组件内部值', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { value: 'rgba(0, 0, 0, 1)' }, attachTo: document.body })
    await wait()
    await openPanel()
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('.color-picker-input-group .input-item'))
    inputs[0].value = 'abc'
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
    inputs[0].dispatchEvent(new Event('change', { bubbles: true }))
    await wait()
    // 非法值触发输入框重建，回滚为内部值
    const after = Array.from(document.querySelectorAll<HTMLInputElement>('.color-picker-input-group .input-item'))
    expect(after[0].value).toBe('0')
    wrapper.unmount()
  })

  it('complete 仅在输入提交 / 拖拽结束时触发（色板与清除不触发）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: 'rgba(0, 0, 0, 1)', swatches: ['#18A058'], actions: ['confirm', 'clear'], showAlpha: false },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    // 色板点击：只更新值，不触发 complete
    document.querySelector<HTMLElement>('.color-picker-swatch')?.click()
    await wait()
    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('complete')).toBeUndefined()
    // 输入框提交：触发 complete
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('.color-picker-input-group .input-item'))
    inputs[0].value = '128'
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
    inputs[0].dispatchEvent(new Event('change', { bubbles: true }))
    await wait()
    expect(wrapper.emitted('complete')).toBeTruthy()
    // 清除：只触发 clear，不触发 complete
    const completeCount = wrapper.emitted('complete')?.length ?? 0
    const buttons = Array.from(document.querySelectorAll<HTMLElement>('.color-picker-actions .btn-wrap'))
    buttons[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wait()
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('complete')?.length ?? 0).toBe(completeCount)
    wrapper.unmount()
  })

  it('受控 show 重复置真幂等（不重复展开、不重复派发）', async () => {
    document.body.innerHTML = ''
    const onUpdateShow = vi.fn()
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058' },
      attrs: { show: false, 'onUpdate:show': onUpdateShow },
      attachTo: document.body
    })
    await wait()
    expect(document.querySelector('.color-picker-panel')).toBeNull()
    await wrapper.setProps({ show: true })
    await wait(120)
    expect(document.querySelectorAll('.color-picker-panel')).toHaveLength(1)
    const emitCount = onUpdateShow.mock.calls.length
    // 模拟「显示」按钮连点：已展开时再次置真不再重复展开 / 不再重复派发
    await wrapper.setProps({ show: true })
    await wrapper.setProps({ show: true })
    await wait(120)
    expect(document.querySelectorAll('.color-picker-panel')).toHaveLength(1)
    expect(onUpdateShow.mock.calls.length).toBe(emitCount)
    wrapper.unmount()
  })

  it('受控展开时点击面板内部不关闭面板', async () => {
    document.body.innerHTML = ''
    const shows: boolean[] = []
    const wrapper = mount(ColorPicker, {
      props: { value: 'hsla(148, 73%, 36%, 1)', modes: ['hsl'], showAlpha: true },
      attrs: { show: true, 'onUpdate:show': (value: boolean) => shows.push(value) },
      attachTo: document.body
    })
    await wait(120)
    expect(document.querySelectorAll('.color-picker-panel')).toHaveLength(1)
    // 面板内点击（输入框聚焦）：属于面板内部，不应触发隐藏
    const input = document.querySelector<HTMLInputElement>('.color-picker-input-group .input-item')
    input?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    input?.focus()
    await wait(120)
    expect(document.querySelectorAll('.color-picker-panel')).toHaveLength(1)
    expect(shows).not.toContain(false)
    wrapper.unmount()
  })

  it('label 可返回 VNode', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#18A058',
        label: (color: string) => h('span', { class: 'vnode-label' }, `HELLO ${color}`)
      },
      attachTo: document.body
    })
    await wait()
    expect(document.querySelector('.vnode-label')?.textContent).toBe('HELLO #18A058')
    wrapper.unmount()
  })

  it('触发器标签文字颜色按底色对比度取值', async () => {
    document.body.innerHTML = ''
    // 中间色 #18A058 与白色底板的 WCAG 对比度不足 4.5，取黑字
    const middleTone = mount(ColorPicker, { props: { value: '#18A058' }, attachTo: document.body })
    await wait()
    expect(document.querySelector<HTMLElement>('.color-picker-value')?.style.color).toBe('black')
    middleTone.unmount()
    // 深色取白字
    document.body.innerHTML = ''
    const darkTone = mount(ColorPicker, { props: { value: 'rgba(0, 0, 0, 1)' }, attachTo: document.body })
    await wait()
    expect(document.querySelector<HTMLElement>('.color-picker-value')?.style.color).toBe('white')
    darkTone.unmount()
  })

  it('卸载时移除全局指针监听', async () => {
    document.body.innerHTML = ''
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const wrapper = mount(ColorPicker, { props: { value: '#18A058' }, attachTo: document.body })
    await wait()
    wrapper.unmount()
    const pointerRemovals = removeSpy.mock.calls.filter(([type]) => String(type).startsWith('pointer'))
    expect(pointerRemovals.length).toBeGreaterThanOrEqual(9)
    removeSpy.mockRestore()
  })
})
