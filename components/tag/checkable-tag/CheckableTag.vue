<script setup lang="ts">
import type { VNode } from 'vue'
import Tag from '../Tag.vue'
import { useControlledModel } from 'components/utils'
export interface Props {
  checked?: boolean // 是否选中
  disabled?: boolean // 是否禁用
}
export interface CheckableTagSlots {
  default?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  checked: undefined,
  disabled: false
})
defineSlots<CheckableTagSlots>()
const emits = defineEmits<{
  (e: 'update:checked', checked: boolean): void
  (e: 'change', checked: boolean): void
  (e: 'click', event: MouseEvent): void
}>()
// 传值即受控：受控时以父值为准，未传时组件自持（点击照常生效）
const checkedModel = useControlledModel('checked', false)
function onClick(event: MouseEvent) {
  if (props.disabled) return
  const nextChecked = !checkedModel.value
  checkedModel.value = nextChecked
  emits('change', nextChecked)
  emits('click', event)
}
</script>
<template>
  <Tag
    class="checkable-tag-wrap"
    :class="{ 'checkable-tag-checked': checkedModel }"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </Tag>
</template>
<style lang="less" scoped>
// 复用 Tag 的基础尺寸与排版，只覆盖选中/悬停态；带上 .tag-wrap 是为了压过 Tag 自身的同权重样式
.tag-wrap.checkable-tag-wrap {
  cursor: pointer;
  background-color: transparent;
  border-color: transparent;
  &.tag-disabled {
    cursor: not-allowed;
  }
  &.checkable-tag-checked {
    color: var(--va-text-color-solid);
    background-color: var(--va-cp-tag-primary-color, var(--va-primary-color));
    border-color: transparent;
  }
  // 禁用态保留选中/未选中的底色，只去掉交互反馈
  &:not(.tag-disabled) {
    &:not(.checkable-tag-checked):hover {
      color: var(--va-cp-tag-primary-color, var(--va-primary-color));
      background-color: var(--va-fill-color-2);
    }
    &:active {
      color: var(--va-text-color-solid);
      background-color: var(--va-cp-tag-primary-color-active, var(--va-primary-color-active));
    }
    &.checkable-tag-checked:hover {
      background-color: var(--va-cp-tag-primary-color-hover, var(--va-primary-color-hover));
    }
    // 选中态按下：与上方 hover 规则同权重，靠源码顺序覆盖，避免按下时仍停留在 hover 的浅一档
    &.checkable-tag-checked:active {
      background-color: var(--va-cp-tag-primary-color-active, var(--va-primary-color-active));
    }
  }
}
</style>
