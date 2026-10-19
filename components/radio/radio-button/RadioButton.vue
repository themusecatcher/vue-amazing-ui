<script setup lang="ts">
import { ref } from 'vue'
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
// 内部 Radio 的实例引用：focus / blur 需转发到它承载的原生 input 上
const radioRef = ref<InstanceType<typeof Radio>>()
function onCheckedChange(checked: boolean): void {
  emits('update:checked', checked)
}
function onChange(value: boolean | RadioValue, event: RadioChangeEvent): void {
  emits('change', value, event)
}
// 聚焦 / 失焦原生 input，与 Radio 同口径（调用 focus 时同样显示焦点环）
function focus(): void {
  radioRef.value?.focus()
}
function blur(): void {
  radioRef.value?.blur()
}
defineExpose({ focus, blur })
</script>
<template>
  <Radio
    ref="radioRef"
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
