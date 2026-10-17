<script setup lang="ts">
import type { VNode } from 'vue'
import Radio from '../Radio.vue'
import type { RadioChangeEvent, RadioValue } from '../context'

/**
 * 按钮形态的单选单项
 *
 * 与 Radio 的唯一差别是固定按钮形态，其余选中逻辑、组内受控与禁用规则全部复用 Radio。
 */
export interface Props {
  checked?: boolean // (v-model) 脱离组单独使用时的选中态

  value?: RadioValue // 该项的值，置于组内时据此判断选中

  disabled?: boolean // 是否禁用

  autofocus?: boolean // 是否自动聚焦原生 input

  name?: string // 原生 input 的表单字段名；置于 RadioGroup 内时以组的配置为准
  id?: string // 原生 input 的 id
}
// 声明组件插槽类型
export interface RadioButtonSlots {
  default?: () => VNode[] // 按钮文本
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  value: undefined,
  disabled: false,
  autofocus: false,
  name: undefined,
  id: undefined
})
defineSlots<RadioButtonSlots>()
const emits = defineEmits(['update:checked', 'change'])
function onCheckedChange(checked: boolean): void {
  emits('update:checked', checked)
}
function onChange(value: boolean | RadioValue, event: RadioChangeEvent): void {
  emits('change', value, event)
}
</script>
<template>
  <Radio
    button
    :value="props.value"
    :disabled="props.disabled"
    :checked="props.checked"
    :autofocus="props.autofocus"
    :name="props.name"
    :id="props.id"
    @update:checked="onCheckedChange"
    @change="onChange"
  >
    <slot></slot>
  </Radio>
</template>
