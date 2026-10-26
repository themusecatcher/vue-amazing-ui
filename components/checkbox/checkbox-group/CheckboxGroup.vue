<script setup lang="ts">
import { computed, provide, ref, watchEffect } from 'vue'
import type { VNode } from 'vue'
import Checkbox from '../Checkbox.vue'
import { checkboxGroupContextKey } from '../context'
import type { CheckboxChangeEvent, CheckboxValue } from '../context'
import { renderOptionLabel } from '../render'

export interface Option {
  label?: string | number | VNode // 选项名，未提供时以选项值展示
  value: CheckboxValue // 选项值
  disabled?: boolean // 是否禁用选项
}
// 组内选项：label 经归一化后必有值
interface NormalizedOption extends Option {
  label: string | number | VNode
}

export interface Props {
  value?: CheckboxValue[] // (v-model) 组内已选中的值
  options?: (string | number | Option)[] // 复选框选项数据；提供后组内默认插槽不生效
  vertical?: boolean // 是否垂直排列
  gap?: number | number[] // 选项间距，单位 px；垂直排列时即垂直间距；数组用于水平排列折行时：[水平间距, 垂直间距]
  disabled?: boolean // 是否禁用整组，组内单项自身的 disabled 在此基础上叠加
  name?: string // 表单字段名，下发到组内每个原生 input
  id?: string // 原生 input 的 id 前缀，options 模式下实际 id 追加选项下标
  autofocus?: boolean // 是否自动聚焦首项，仅 options 模式生效
}
// 声明组件插槽类型
export interface CheckboxGroupSlots {
  // options 模式下为每个选项提供作用域参数；组合式用法无参数
  default?: (props: { option?: Option; label?: string | number | VNode; index?: number }) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  options: () => [],
  vertical: false,
  gap: 8,
  disabled: false,
  name: undefined,
  id: undefined,
  autofocus: false
})
defineSlots<CheckboxGroupSlots>()
const emits = defineEmits(['update:value', 'change'])
// 组内已选值：外部传入时以外层为准，未受控时由本地副本即时切换
const groupValue = ref<CheckboxValue[]>(props.value)
// 选项归一：字符串 / 数字简写取自身为值，对象形态取 label / value / disabled
const normalizedOptions = computed<NormalizedOption[]>(() => {
  return props.options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return { label: option, value: option }
    }
    return { label: option.label ?? String(option.value), value: option.value, disabled: option.disabled }
  })
})
// 选项间距：水平排列且传入数组时按「行间距 列间距」展开；垂直排列时只取垂直间距
const gapValue = computed(() => {
  const { gap } = props
  if (!Array.isArray(gap)) {
    return `${gap}px`
  }
  return props.vertical ? `${gap[1]}px` : `${gap[1]}px ${gap[0]}px`
})
watchEffect(() => {
  groupValue.value = props.value
})
// 状态快照取本组件 props，原生事件与方法附在其上，与原生 input 的 change 同形态
function buildChangeEvent(nativeEvent: Event, value: CheckboxValue[]): CheckboxChangeEvent {
  return {
    target: {
      // 组层面的选中态：本次变更后组内是否仍有选中项
      checked: value.length > 0,
      value,
      name: props.name,
      disabled: props.disabled
    },
    stopPropagation: () => nativeEvent.stopPropagation(),
    preventDefault: () => nativeEvent.preventDefault(),
    nativeEvent
  }
}
provide(checkboxGroupContextKey, {
  value: groupValue,
  disabled: computed(() => props.disabled),
  name: computed(() => props.name),
  onChange: (checked, value, nativeEvent) => {
    // 组内单项只上报自身状态，选中集合的增删由组统一维护，保证数组顺序与操作顺序一致
    const nextValue = checked ? [...groupValue.value, value] : groupValue.value.filter((item) => item !== value)
    groupValue.value = nextValue
    emits('update:value', nextValue)
    emits('change', nextValue, buildChangeEvent(nativeEvent, nextValue))
  }
})
</script>
<template>
  <div
    class="checkbox-group-wrap"
    :class="{ 'checkbox-group-vertical': vertical }"
    :style="`--checkbox-group-gap: ${gapValue};`"
    v-bind="$attrs"
  >
    <template v-if="normalizedOptions.length">
      <Checkbox
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
      </Checkbox>
    </template>
    <slot v-else></slot>
  </div>
</template>
<style lang="less" scoped>
.checkbox-group-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--checkbox-group-gap);
  :deep(> .grid-row-wrap) {
    flex: 1;
  }
}
.checkbox-group-vertical {
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
