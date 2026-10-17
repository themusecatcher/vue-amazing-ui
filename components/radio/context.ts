import type { ComputedRef, InjectionKey, Ref } from 'vue'

/** 单选框的值类型 */
export type RadioValue = string | number | boolean
/** 单选组的呈现形态：圆点 / 按钮 */
export type RadioGroupOptionType = 'default' | 'button'
/** 按钮形态的风格 */
export type RadioButtonStyle = 'outline' | 'solid'
/** 单选框的尺寸，仅作用于按钮形态 */
export type RadioSize = 'small' | 'middle' | 'large'

/** change 事件对象中承载状态快照的 target；取自本组件 props，非 DOM 元素 */
export interface RadioChangeTarget {
  /** 变化后的选中态 */
  checked: boolean
  /** 该单选组件当前生效的值 */
  value?: RadioValue
  /** 生效的表单字段名，组内由组下发 */
  name?: string
  /** 是否处于禁用态 */
  disabled?: boolean
}

/**
 * change 事件对象
 *
 * 形态对齐原生 `input` 的 change：状态快照放在 `target` 上，另附原生事件与阻止方法，
 * 使按原生事件写法编写的代码可直接迁移。
 */
export interface RadioChangeEvent {
  /** 变化后的状态快照 */
  target: RadioChangeTarget
  /** 阻止原生事件冒泡 */
  stopPropagation: () => void
  /** 阻止原生事件默认行为 */
  preventDefault: () => void
  /** 原生事件对象 */
  nativeEvent: Event
}

/**
 * 单选组与组内单项之间共享的状态
 *
 * 组内单项不各自持有选中值，只把自身 `value` 与组内当前值比较；选中态、禁用态与事件出口统一收在组上，
 * 故经注入下发。单项脱离组使用时不读取本上下文，走自身 `checked` 受控逻辑。
 */
export interface RadioGroupContext {
  /** 组内当前选中的值 */
  value: Ref<RadioValue | undefined>
  /** 组是否整体禁用，组内单项自身的 disabled 在此基础上叠加 */
  disabled: ComputedRef<boolean>
  /** 组的呈现形态 */
  optionType: ComputedRef<RadioGroupOptionType>
  /** 按钮形态的风格 */
  buttonStyle: ComputedRef<RadioButtonStyle>
  /** 组的尺寸，未指定时组内单项回落自身尺寸 */
  size: ComputedRef<RadioSize | undefined>
  /** 表单字段名，下发到组内每个原生 input */
  name: ComputedRef<string | undefined>
  /** 组内某项被选中时上报新值与事件对象 */
  onChange: (value: RadioValue, event: RadioChangeEvent) => void
}

/** 单选组上下文的注入键 */
export const radioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupContext')
