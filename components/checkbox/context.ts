import type { ComputedRef, InjectionKey, Ref } from 'vue'

/** 复选框的值类型 */
export type CheckboxValue = string | number

/** change 事件对象中承载状态快照的 target；取自本组件 props，非 DOM 元素 */
export interface CheckboxChangeTarget {
  /** 变化后的选中态 */
  checked: boolean
  /** 该复选框当前生效的值：options 模式为已选值数组，组内单项为自身标识值 */
  value?: CheckboxValue | CheckboxValue[]
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
export interface CheckboxChangeEvent {
  /** 变化后的状态快照 */
  target: CheckboxChangeTarget
  /** 阻止原生事件冒泡 */
  stopPropagation: () => void
  /** 阻止原生事件默认行为 */
  preventDefault: () => void
  /** 原生事件对象 */
  nativeEvent: Event
}

/**
 * 复选框组与组内单项之间共享的状态
 *
 * 组内单项不各自持有选中集合，只判断自身 `value` 是否在组内已选值中；禁用态与事件出口统一收在组上，
 * 故经注入下发。单项脱离组使用时不读取本上下文，走自身 `checked` 受控逻辑。
 */
export interface CheckboxGroupContext {
  /** 组内已选中的值 */
  value: Ref<CheckboxValue[]>
  /** 组是否整体禁用，组内单项自身的 disabled 在此基础上叠加 */
  disabled: ComputedRef<boolean>
  /** 表单字段名，下发到组内每个原生 input */
  name: ComputedRef<string | undefined>
  /** 组内某项切换选中时上报该项的新选中态 */
  onChange: (checked: boolean, value: CheckboxValue, nativeEvent: Event) => void
}

/** 复选框组上下文的注入键 */
export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupContext')
