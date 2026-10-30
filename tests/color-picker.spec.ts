import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ColorPicker from 'components/color-picker/ColorPicker.vue'
import type { ColorPickerMode } from 'components/color-picker/ColorPicker.vue'
import ConfigProvider from 'components/config-provider'
import Modal from 'components/modal'
import { FLOATING_LAYER_Z_INDEX } from 'components/utils'

/**
 * ColorPicker 回归
 *
 * 覆盖本轮修复的缺陷与新增能力：
 * - 非法色值（颜色名 / 无法识别的串）不再抛错，降级为空值态；
 * - `defaultValue` 作为未受控初始值；
 * - 空值态下色相条兜底可用；
 * - alpha 百分比输入越界时收敛到 `0 - 1`；
 * - 面板底座为 `Popup`：触发区（外壳）自持点击开合 / 外点关闭 / Esc / 禁用态 / 键盘可达；
 * - 自定义触发器插槽只回传 `{ value }`（点击开合、锚点与外点判定均由外壳接管）；
 * - 透传属性只落外壳一处（面板定制走 `panelClass` / `panelStyle`）；
 * - 面板层级：默认取下拉面板族，`zIndex` 显式覆盖，`ConfigProvider.baseZIndex` 由层级管理器分配；
 * - 面板挂载点跟随承载层（`Modal` 内不直挂 `body`）；
 * - 色板支持键盘 Enter 选色；
 * - 动态 `modes` 下的模式切换与收敛（当前模式被移除时回落到首个可用模式，含原地增删）。
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

  it('modes 原地增删（splice）时同样收敛到首个可用模式', async () => {
    document.body.innerHTML = ''
    // 使用方原地修改数组（不换引用）时，浅监听拿不到通知，当前模式会停在已被移除的模式上
    const modes = ref<ColorPickerMode[]>(['rgb', 'hex'])
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', modes: modes.value, showAlpha: false },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    expect(readModeLabel()).toBe('HEX')
    modes.value.splice(1, 1)
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

  it('禁用态下点击与键盘都不展开面板', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', disabled: true },
      attachTo: document.body
    })
    await wait()
    const host = wrapper.find('.color-picker').element as HTMLElement
    host.click()
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await wait(80)
    expect(document.querySelector('.color-picker-panel')).toBeNull()
    // 禁用拦截发生在显隐状态机入口：既不展开也不派发开合事件
    expect(wrapper.emitted('openChange')).toBeUndefined()
    wrapper.unmount()
  })

  it('自定义触发器插槽渲染并可展开面板（插槽参数可完全不消费）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058' },
      slots: {
        // 只消费 value：点击开合由外壳接管（不再回传 onClick / ref）
        trigger: (slotProps: { value?: string }) => h('button', { class: 'custom-trigger' }, slotProps.value ?? '')
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

  it('自定义触发器时外壳随内容自适应，内置触发器按 width / height 撑满', async () => {
    document.body.innerHTML = ''
    const custom = mount(ColorPicker, {
      props: { value: '#ff6900' },
      slots: {
        trigger: (slotProps: { value?: string }) => h('button', { class: 'custom-trigger' }, slotProps.value ?? '')
      },
      attachTo: document.body
    })
    await wait()
    const customHost = custom.find('.color-picker').element as HTMLElement
    // 自定义触发器：外壳不预设宽高（内联 width 会撑成整行），改用 inline-flex 随内容自适应
    expect(customHost.getAttribute('style') ?? '').not.toContain('width:')
    expect(customHost.classList.contains('color-picker-custom-trigger')).toBe(true)
    custom.unmount()

    document.body.innerHTML = ''
    const builtin = mount(ColorPicker, { props: { value: '#ff6900', width: 200 }, attachTo: document.body })
    await wait()
    const builtinHostStyle = document.querySelector('.color-picker')?.getAttribute('style') ?? ''
    // 内置触发器：尺寸由外壳承担（展示区按 100% 跟随），否则 style="width: 200px" 之类用法会失效
    expect(builtinHostStyle).toContain('width: 200px')
    expect(builtinHostStyle).toContain('height: 32px')
    builtin.unmount()
  })

  it('透传属性只落外壳一处（不在触发区重复绑定）', async () => {
    document.body.innerHTML = ''
    let clickCount = 0
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058' },
      attrs: {
        class: 'my-picker',
        id: 'my-picker-id',
        style: 'width: 200px',
        onClick: () => {
          clickCount += 1
        }
      },
      attachTo: document.body
    })
    await wait()
    const host = document.querySelector<HTMLElement>('.color-picker')
    const display = document.querySelector<HTMLElement>('.color-picker-display')
    // 属性只落外壳一处：重复绑定会让 id 重复、style 成倍生效
    expect(host?.classList.contains('my-picker')).toBe(true)
    expect(host?.id).toBe('my-picker-id')
    expect(document.querySelectorAll('#my-picker-id')).toHaveLength(1)
    expect(display?.classList.contains('my-picker')).toBe(false)
    expect(display?.id).toBe('')
    // style 也必须留在外壳上：外壳宽高即布局盒，展示区按 100% 跟随
    expect(host?.getAttribute('style')).toContain('width: 200px')
    display?.click()
    await wait(80)
    expect(clickCount).toBe(1)
    wrapper.unmount()
  })

  it('面板定制与开合事件走组件自有 API（panelClass / panelStyle / openChange）', async () => {
    document.body.innerHTML = ''
    const onOpenChange = vi.fn()
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', panelClass: 'my-panel', panelStyle: { width: '280px' }, onOpenChange },
      attachTo: document.body
    })
    await wait()
    document.querySelector<HTMLElement>('.color-picker-display')?.click()
    await wait(120)
    const panel = document.querySelector<HTMLElement>('.va-popup-panel')
    // 面板皮肤挂载点：宿主面板类 + 使用者自定义类，panelStyle 在定位 / 层级之后合并
    expect(panel?.classList.contains('color-picker-panel-container')).toBe(true)
    expect(panel?.classList.contains('my-panel')).toBe(true)
    expect(panel?.style.width).toBe('280px')
    expect(onOpenChange).toHaveBeenCalledWith(true)
    wrapper.unmount()
  })

  it('panelStyle 的宽度不被浮层内核擦除（未开启 matchTriggerWidth 时不得清理使用方宽度）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', panelStyle: { width: '280px', minWidth: '200px' } },
      attachTo: document.body
    })
    await wait()
    document.querySelector<HTMLElement>('.color-picker-display')?.click()
    await wait(120)
    const panel = document.querySelector<HTMLElement>('.va-popup-panel')
    // 回归守护：定位内核曾在 matchTriggerWidth 为 false 时也执行 style.width = ''，
    // 把皮肤层 / 使用方的内联宽度擦掉，表现为「首次展开宽、再次展开窄、关闭时又变宽」
    expect(panel?.style.width).toBe('280px')
    expect(panel?.style.minWidth).toBe('200px')
    // 收起后重新展开，宽度应保持（不因内核清理而回落到 CSS 默认值）
    document.querySelector<HTMLElement>('.color-picker-display')?.click()
    await wait(120)
    document.querySelector<HTMLElement>('.color-picker-display')?.click()
    await wait(120)
    expect(document.querySelector<HTMLElement>('.va-popup-panel')?.style.width).toBe('280px')
    wrapper.unmount()
  })

  it('自定义触发器时透传属性落外壳（不丢失）', async () => {
    document.body.innerHTML = ''
    let clickCount = 0
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058' },
      attrs: {
        class: 'my-picker',
        onClick: () => {
          clickCount += 1
        }
      },
      slots: {
        trigger: (slotProps: { value?: string }) => h('button', { class: 'custom-trigger' }, slotProps.value ?? '')
      },
      attachTo: document.body
    })
    await wait()
    // 组件没有自己的触发器元素，属性落外壳，不能丢
    expect(document.querySelector('.color-picker')?.classList.contains('my-picker')).toBe(true)
    await wrapper.find('.custom-trigger').trigger('click')
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

  it('空值态下原生取色器的 value 保持合法颜色（不触发浏览器格式告警）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { showPreview: true }, attachTo: document.body })
    await wait()
    document.querySelector<HTMLElement>('.color-picker-display')?.click()
    await wait(120)
    // type=color 的 value 不接受空串（浏览器会报 "does not conform to the required format"），故空值态兜底为 #000000
    expect(document.querySelector<HTMLInputElement>('.color-picker-circle-input')?.value).toBe('#000000')
    wrapper.unmount()
  })

  it('受控 open 重复置真幂等（不重复展开、不重复派发），且外部改值同样派发 openChange', async () => {
    document.body.innerHTML = ''
    const onUpdateOpen = vi.fn()
    const onOpenChange = vi.fn()
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', open: false, 'onUpdate:open': onUpdateOpen, onOpenChange },
      attachTo: document.body
    })
    await wait()
    expect(document.querySelector('.color-picker-panel')).toBeNull()
    expect(onOpenChange).not.toHaveBeenCalled()
    await wrapper.setProps({ open: true })
    await wait(120)
    expect(document.querySelectorAll('.color-picker-panel')).toHaveLength(1)
    // 受控值由外部置真也是「展开状态变化」，应派发一次 openChange(true)
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenCalledWith(true)
    const emitCount = onUpdateOpen.mock.calls.length
    // 模拟「显示」按钮连点：已展开时再次置真不再重复展开 / 不再重复派发
    await wrapper.setProps({ open: true })
    await wrapper.setProps({ open: true })
    await wait(120)
    expect(document.querySelectorAll('.color-picker-panel')).toHaveLength(1)
    expect(onUpdateOpen.mock.calls.length).toBe(emitCount)
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    // 外部置假同样派发一次 false（状态未变时不派发）
    await wrapper.setProps({ open: false })
    await wait(120)
    expect(onOpenChange).toHaveBeenCalledTimes(2)
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    wrapper.unmount()
  })

  it('非受控时 defaultOpen 决定初始显隐（受控 open 优先、disabled 拦截）', async () => {
    document.body.innerHTML = ''
    const onOpenChange = vi.fn()
    const wrapper = mount(ColorPicker, {
      props: { value: '#18A058', defaultOpen: true, onOpenChange },
      attachTo: document.body
    })
    await wait()
    const display = wrapper.find('.color-picker-display')
    // 挂载即展开（首次渲染前即生效，无「先关后开」的过渡）
    expect(display.attributes('aria-expanded')).toBe('true')
    expect(document.querySelectorAll('.color-picker-panel')).toHaveLength(1)
    // 初始展开上报一次 openChange(true)：与库内 Select / AutoComplete 的 defaultOpen 口径一致
    // （二者在 onMounted 里驱动内部展开态，同样由状态 watch 上报一次）
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenCalledWith(true)
    // 点击触发器收起（toggle）→ 再派发一次 false
    await display.trigger('click')
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('false')
    expect(onOpenChange).toHaveBeenCalledTimes(2)
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    wrapper.unmount()

    document.body.innerHTML = ''
    // 受控 open 优先于 defaultOpen：父组件显式传 false 时不套用默认显隐
    const controlled = mount(ColorPicker, {
      props: { value: '#18A058', open: false, defaultOpen: true },
      attachTo: document.body
    })
    await wait()
    expect(controlled.find('.color-picker-display').attributes('aria-expanded')).toBe('false')
    controlled.unmount()

    document.body.innerHTML = ''
    // 禁用态不套用 defaultOpen（不可交互的组件不应自带展开面板）
    const disabled = mount(ColorPicker, {
      props: { value: '#18A058', defaultOpen: true, disabled: true },
      attachTo: document.body
    })
    await wait()
    expect(disabled.find('.color-picker-display').attributes('aria-expanded')).toBe('false')
    disabled.unmount()
  })

  it('点击触发器 toggle 开合；点击面板内部不关闭；点击外部关闭', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { value: '#18A058' }, attachTo: document.body })
    await wait()
    const display = wrapper.find('.color-picker-display')
    await display.trigger('click')
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('true')
    // 再点一次收起（toggle：与库内 Select / Dropdown 的点击开合同手感）
    await display.trigger('click')
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('false')
    // 重新展开后点击面板内部：属面板内部，不应关闭
    await display.trigger('click')
    await wait(120)
    const input = document.querySelector<HTMLInputElement>('.color-picker-input-group .input-item')
    input?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('true')
    // 点击外部关闭（外点判定挂在 mousedown，与 antdv 一致）
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  it('Esc 关闭面板并把焦点交还触发区', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { value: '#18A058' }, attachTo: document.body })
    await wait()
    const display = wrapper.find('.color-picker-display')
    await display.trigger('click')
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('true')
    // 展开后焦点在面板容器上，Esc 自面板发出（面板级监听经宿主落到面板节点）
    document
      .querySelector<HTMLElement>('.color-picker-panel')
      ?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(wrapper.find('.color-picker').element)
    wrapper.unmount()
  })

  it('Enter / Space 与点击同语义（开合），Esc 收起（键盘可达）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { value: '#18A058' }, attachTo: document.body })
    await wait()
    const display = wrapper.find('.color-picker-display')
    await display.trigger('keydown', { key: 'Enter' })
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('true')
    // 再按一次收起：键盘与鼠标点击保持同一套开合语义
    await display.trigger('keydown', { key: 'Enter' })
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('false')
    await display.trigger('keydown', { key: ' ' })
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('true')
    await display.trigger('keydown', { key: ' ' })
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('false')
    // Esc 自面板发出同样收起
    await display.trigger('keydown', { key: 'Enter' })
    await wait(120)
    document
      .querySelector<HTMLElement>('.color-picker-panel')
      ?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await wait(120)
    expect(display.attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  it('无障碍语义：触发区为 button 语义、面板为 dialog 语义（不再借用 tooltip 语义）', async () => {
    document.body.innerHTML = ''
    const builtin = mount(ColorPicker, { props: { value: '#18A058' }, attachTo: document.body })
    await wait()
    const display = document.querySelector<HTMLElement>('.color-picker-display')
    expect(display?.getAttribute('role')).toBe('button')
    expect(display?.getAttribute('aria-haspopup')).toBe('dialog')
    expect(display?.getAttribute('aria-expanded')).toBe('false')
    display?.click()
    await wait(120)
    const panel = document.querySelector<HTMLElement>('.color-picker-panel')
    expect(panel?.getAttribute('role')).toBe('dialog')
    expect(panel?.getAttribute('aria-label')).toBe('颜色选择器')
    // 面板底座已不再借用 Tooltip 皮肤：不存在 tooltip 语义与描述关联
    expect(document.querySelector('[role="tooltip"]')).toBeNull()
    expect(display?.getAttribute('aria-describedby')).toBeNull()
    builtin.unmount()

    document.body.innerHTML = ''
    const custom = mount(ColorPicker, {
      props: { value: '#18A058' },
      slots: {
        trigger: (slotProps: { value?: string }) => h('button', { class: 'custom-trigger' }, slotProps.value ?? '')
      },
      attachTo: document.body
    })
    await wait()
    // 自定义触发器时由外壳承担触发区语义，两形态下 aria-expanded 都反映真实显隐
    const host = document.querySelector<HTMLElement>('.color-picker')
    expect(host?.getAttribute('role')).toBe('button')
    expect(host?.getAttribute('aria-expanded')).toBe('false')
    await custom.find('.custom-trigger').trigger('click')
    await wait(120)
    expect(host?.getAttribute('aria-expanded')).toBe('true')
    custom.unmount()
  })

  it('面板层级默认取下拉面板族（未传 zIndex），传入 zIndex 时以其为准', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { value: '#18A058' }, attachTo: document.body })
    await wait()
    document.querySelector<HTMLElement>('.color-picker-display')?.click()
    await wait(120)
    const panel = document.querySelector<HTMLElement>('.va-popup-panel')
    expect(panel?.style.zIndex).toBe(String(FLOATING_LAYER_Z_INDEX.select))
    await wrapper.setProps({ zIndex: 2000 })
    await wait(120)
    expect(document.querySelector<HTMLElement>('.va-popup-panel')?.style.zIndex).toBe('2000')
    wrapper.unmount()
  })

  it('ConfigProvider 传入 baseZIndex 时面板层级由分配器给出（不再取下拉面板族默认值）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(
      defineComponent({
        render: () => h(ConfigProvider, { baseZIndex: 5000 }, { default: () => h(ColorPicker, { value: '#18A058' }) })
      }),
      { attachTo: document.body }
    )
    await wait()
    await openPanel()
    // 首个出现的浮层从 baseZIndex 起分配
    const panel = document.querySelector<HTMLElement>('.va-popup-panel')
    expect(panel?.style.zIndex).toBe('5000')
    expect(panel?.style.zIndex).not.toBe(String(FLOATING_LAYER_Z_INDEX.select))
    wrapper.unmount()
  })

  it('面板挂载在 Modal 内时跟随承载层（不直挂 body）', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () =>
                h(Modal, { open: true, title: '承载层' }, { default: () => h(ColorPicker, { value: '#18A058' }) })
            }
          )
      }),
      { attachTo: document.body }
    )
    await wait(80)
    const card = document.querySelector<HTMLElement>('.modal-container')
    expect(card).not.toBeNull()
    card?.querySelector<HTMLElement>('.color-picker-display')?.click()
    await wait(160)
    // 未显式传 to 时面板就近挂进承载层内容容器，且不在 body 下另起挂载点
    expect(card?.querySelector('.va-popup-panel')).not.toBeNull()
    expect(Array.from(document.body.children).some((el) => el.classList.contains('va-popup-container'))).toBe(false)
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

  it('卸载时移除全局指针监听与外点监听', async () => {
    document.body.innerHTML = ''
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const wrapper = mount(ColorPicker, { props: { value: '#18A058' }, attachTo: document.body })
    await wait()
    wrapper.unmount()
    const pointerRemovals = removeSpy.mock.calls.filter(([type]) => String(type).startsWith('pointer'))
    expect(pointerRemovals.length).toBeGreaterThanOrEqual(9)
    removeSpy.mockRestore()
  })

  it('展开期间注册外点监听、收起后移除（注册与移除一一对应）', async () => {
    document.body.innerHTML = ''
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const wrapper = mount(ColorPicker, { props: { value: '#18A058' }, attachTo: document.body })
    await wait()
    const display = wrapper.find('.color-picker-display')
    await display.trigger('click')
    await wait(120)
    // 外点判定挂 mousedown / touchstart（与 antdv 一致），各注册一次
    expect(addSpy.mock.calls.filter(([type]) => type === 'mousedown')).toHaveLength(1)
    expect(addSpy.mock.calls.filter(([type]) => type === 'touchstart')).toHaveLength(1)
    // 收起即移除：隐藏态不得继续监听全局按下
    await display.trigger('click')
    await wait(120)
    expect(removeSpy.mock.calls.filter(([type]) => type === 'mousedown')).toHaveLength(1)
    expect(removeSpy.mock.calls.filter(([type]) => type === 'touchstart')).toHaveLength(1)
    addSpy.mockRestore()
    removeSpy.mockRestore()
    wrapper.unmount()
  })

  it('无法识别的色名色板被忽略（不再静默落为黑色）', async () => {
    document.body.innerHTML = ''
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(ColorPicker, {
      props: {
        value: 'rgba(0, 0, 0, 1)',
        // 拼错的色名：没有模式前缀，无法按「颜色名」换算
        swatches: ['notacolor', '#18A058'],
        showAlpha: false
      },
      attachTo: document.body
    })
    await wait()
    await openPanel()
    const swatches = Array.from(document.querySelectorAll<HTMLElement>('.color-picker-swatch'))
    swatches[0].click()
    await wait()
    // 非法色板不写入组件值，且提示使用方
    expect(wrapper.emitted('update:value')).toBeUndefined()
    expect(warnSpy).toHaveBeenCalledWith('[vue-amazing-ui] ColorPicker: 色板中的颜色 notacolor 无效，已忽略该色板')
    // 合法色板不受影响
    swatches[1].click()
    await wait()
    expect(wrapper.emitted('update:value')?.slice(-1)[0]?.[0]).toBe('rgba(24, 160, 88, 1)')
    warnSpy.mockRestore()
    wrapper.unmount()
  })

  it('alpha 拖拽途中值被清空时忽略本次变更、不抛错', async () => {
    document.body.innerHTML = ''
    const wrapper = mount(ColorPicker, { props: { value: 'rgba(0, 0, 0, 1)' }, attachTo: document.body })
    await wait()
    await openPanel()
    const alphaRail = Array.from(document.querySelectorAll<HTMLElement>('.color-picker-slider'))[1]
    stubRail(alphaRail, { left: 0, width: 100, height: 12 })
    alphaRail.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 6, clientY: 6, pointerId: 5 }))
    await wait()
    // 拖拽期间父组件清空色值：后续 pointermove 无颜色可写，应忽略而不是解构 null 抛错
    await wrapper.setProps({ value: '' })
    expect(() =>
      document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 60, clientY: 6, pointerId: 5 }))
    ).not.toThrow()
    await wait()
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 5 }))
    wrapper.unmount()
  })
})
