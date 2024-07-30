<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  icon?: string // 自定义图标 string | slot
  description?: string // 文字及其它内容 string | slot
  tooltip?: string // 气泡卡片的内容 string | slot
  type?: 'default' | 'primary' // 按钮类型
  shape?: 'circle' | 'square' // 按钮形状
  href?: string //	点击跳转的地址，指定此属性 button 的行为和 a 链接一致
  target?: '_self' | '_blank' // 相当于 a 标签的 target 属性，href 存在时生效
  badge?: object // 带徽标数字的悬浮按钮（不支持 status 以及相关属性）
}
const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  description: undefined,
  tooltip: undefined,
  type: 'default',
  shape: 'circle',
  href: undefined,
  target: '_self',
  badge: undefined
})
const emit = defineEmits(['click'])
</script>
<template>
  <span class="m-float-button"> </span>
</template>
<style lang="less" scoped>
.m-float-button {
}
</style>
