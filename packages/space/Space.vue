<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { rafTimeout, cancelRaf } from '../index'
interface Props {
  align?: 'start'|'end'|'center'|'baseline' // 对齐方式
  direction?: 'vertical'|'horizontal' // 间距方向
  size?: 'small'|'middle'|'large'|number // 间距大小
  wrap?: boolean // 是否自动换行，仅在 horizontal 时有效
}
const props = withDefaults(defineProps<Props>(), {
  align: undefined,
  direction: 'horizontal',
  size: 'small',
  wrap: false
})
</script>
<template>
  <div class="m-space">
  </div>
</template>
<style lang="less" scoped>
.m-space {
  
}
</style>
