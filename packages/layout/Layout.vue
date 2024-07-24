<script setup lang="ts">
import { ref, computed, watch, useSlots } from 'vue'
import { add } from '../utils'
interface Props {
  width?: string | number // 输入框宽度
  min?: number // 最小值
  max?: number // 最大值
  step?: number // 每次改变步数，可以为小数
  precision?: number // 数值精度
  prefix?: string // 前缀图标 string | slot
  formatter?: Function // 指定展示值的格式
  keyboard?: boolean // 是否启用键盘快捷键行为（上方向键增，下方向键减）
  disabled?: boolean // 是否禁用
  value?: number | null // 当前值(v-model)
}
const props = withDefaults(defineProps<Props>(), {
  width: 90,
  min: -Infinity,
  max: Infinity,
  step: 1,
  precision: 0,
  prefix: '',
  formatter: (value: string) => value,
  keyboard: true,
  disabled: false,
  value: null
})
</script>
<template>
  <div class="m-layout"> </div>
</template>
<style lang="less" scoped>
.m-layout {
}
</style>
