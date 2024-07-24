<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { rafTimeout, cancelRaf } from '../utils'
interface Props {
  duration?: number // 自动关闭的延时，单位ms
  top?: number | string // 消息距离顶部的位置，单位px
}
const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  top: 30
})
enum ColorStyle { // 颜色主题对象
  info = '#1677FF',
  success = '#52c41a',
  error = '#ff4d4f',
  warning = '#faad14',
  loading = '#1677FF'
}
</script>
<template>
  <div class="m-list"> </div>
</template>
<style lang="less" scoped>
.m-list {
}
</style>
