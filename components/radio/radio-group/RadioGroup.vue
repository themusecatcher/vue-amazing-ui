<script setup lang="ts">
import { computed, provide, ref, watchEffect } from 'vue'
import type { VNode } from 'vue'
import Radio from '../Radio.vue'
import { radioGroupContextKey } from '../context'
import type { RadioButtonStyle, RadioSize, RadioValue } from '../context'
import { renderOptionLabel } from '../render'

export interface Option {
  label?: string | number | VNode // 选项名，未提供时以选项值展示
  value: RadioValue // 选项值
  disabled?: boolean // 是否禁用选项
}
// 组内选项：label 经归一化后必有值
interface NormalizedOption extends Option {
  label: string | number | VNode
}

export interface Props {
  value?: RadioValue // (v-model) 组内当前选中的值
  options?: (string | number | Option)[] // 单选框选项数据；提供后组内默认插槽不生效
  button?: boolean // 是否启用按钮样式；组内选项随之以按钮形态呈现
  buttonStyle?: RadioButtonStyle // 按钮形态的风格，仅按钮形态生效
  size?: RadioSize // 尺寸，仅作用于按钮形态；未指定时组内各项回落自身尺寸
  vertical?: boolean // 是否垂直排列，仅非按钮形态生效
  gap?: number | number[] // 选项间距，单位 px；垂直排列时即垂直间距；数组用于水平排列折行时：[水平间距, 垂直间距]
  disabled?: boolean // 是否禁用整组，组内单项自身的 disabled 在此基础上叠加
  name?: string // 表单字段名，下发到组内每个原生 input
  id?: string // 原生 input 的 id 前缀，options 模式下实际 id 追加选项下标
  autofocus?: boolean // 是否自动聚焦首项，仅 options 模式生效
}
// 声明组件插槽类型
export interface RadioGroupSlots {
  // options 模式下为每个选项提供作用域参数；组合式用法无参数
  default?: (props: { option?: Option; label?: string | number | VNode; index?: number }) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  options: () => [],
  button: false,
  buttonStyle: 'outline',
  size: undefined,
  vertical: false,
  gap: 8,
  disabled: false,
  name: undefined,
  id: undefined,
  autofocus: false
})
defineSlots<RadioGroupSlots>()
const emits = defineEmits(['update:value', 'change'])
// 组内当前值：外部传入时以外层为准，未受控时由本地副本即时切换
const groupValue = ref<RadioValue | undefined>(props.value)
// 选项归一：字符串 / 数字简写取自身为值，对象形态取 label / value / disabled
const normalizedOptions = computed<NormalizedOption[]>(() => {
  return props.options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return { label: option, value: option }
    }
    return { label: option.label ?? String(option.value), value: option.value, disabled: option.disabled }
  })
})
// 选项间距：按钮形态下相邻项需贴合成一整条，故不留间距
const gapValue = computed(() => {
  if (props.button) {
    return 0
  }
  const { gap } = props
  if (!Array.isArray(gap)) {
    return `${gap}px`
  }
  // 数组为「水平间距, 垂直间距」：垂直排列时只有垂直间距有意义，直接展开数组会产出非法 CSS
  return props.vertical ? `${gap[1]}px` : `${gap[1]}px ${gap[0]}px`
})
// 供组内按钮抵消的水平间距：按钮形态的组已无间距，纵向排列亦无水平间距可言
const buttonOverlap = computed(() => {
  if (props.vertical || props.button) {
    return 0
  }
  return Array.isArray(props.gap) ? props.gap[0] : props.gap
})
watchEffect(() => {
  groupValue.value = props.value
})
provide(radioGroupContextKey, {
  value: groupValue,
  disabled: computed(() => props.disabled),
  button: computed(() => props.button),
  buttonStyle: computed(() => props.buttonStyle),
  size: computed(() => props.size),
  name: computed(() => props.name),
  onChange: (value, event) => {
    if (value === groupValue.value) {
      return
    }
    groupValue.value = value
    emits('update:value', value)
    emits('change', value, event)
  }
})
</script>
<template>
  <div
    class="radio-group-wrap"
    :class="{ 'radio-group-vertical': vertical && !button }"
    :style="`--radio-group-gap: ${gapValue};
      --radio-group-button-overlap: ${buttonOverlap}px;`"
    v-bind="$attrs"
  >
    <template v-if="normalizedOptions.length">
      <Radio
        v-for="(option, index) in normalizedOptions"
        :key="index"
        :id="id ? `${id}-${index}` : undefined"
        :autofocus="index === 0 && autofocus"
        :value="option.value"
        :disabled="option.disabled || disabled"
      >
        <slot :option="option" :label="option.label" :index="index">
          <component :is="renderOptionLabel(option.label)" />
        </slot>
      </Radio>
    </template>
    <slot v-else></slot>
  </div>
</template>
<style lang="less" scoped>
.radio-group-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--radio-group-gap);
}
.radio-group-vertical {
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
