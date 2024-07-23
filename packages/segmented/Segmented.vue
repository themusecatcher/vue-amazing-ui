<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Slot } from 'vue'
interface SegmentedOption {}
interface Props {
  block?: boolean // 是否将宽度调整为父元素宽度
  disabled?: boolean // 是否禁用
  options?: SegmentedOption[] // 数据化配置选项内容
  size?: 'large' | 'middle' | 'small' // 滚动条的大小，单位 px
  value?: string | number // 当前选中的值
  label?: Slot // 	使用插槽自定义 label
}
const props = withDefaults(defineProps<Props>(), {
  block: false,
  disabled: false,
  size: 'middle',
  value: undefined,
  label: undefined
})
</script>
<template>
  <div
    ref="scrollbarRef"
    class="m-scrollbar"
    :style="`--scrollbar-size: ${size}px;`"
    @mouseenter="isScroll && trigger === 'hover' ? onMouseEnter() : () => false"
    @mouseleave="isScroll && trigger === 'hover' ? onMouseLeave() : () => false"
  >
  </div>
</template>
<style lang="less" scoped>
.m-scrollbar {
}
</style>
