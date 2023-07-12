<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  // 推荐使用 (16+8n)px 作为栅格间隔(n 是自然数：0,1,2,3...)
  gutter?: number|object|number[] // 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距]
  wrap?: boolean // 是否自动换行
}
const props = withDefaults(defineProps<Props>(), {
  gutter: 0,
  wrap: false
})
</script>
<template>
  <div class="m-row">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-row {
  display: flex;
  flex-flow: row wrap;
  min-width: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
}
</style>
