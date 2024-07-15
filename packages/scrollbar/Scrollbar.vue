<script setup lang="ts">
import { ref, watch } from 'vue'
interface Props {
  size?: number // 滚动条的大小，单位 px
  trigger?: 'hover' | 'none' // 显示滚动条的时机，'none' 表示一直显示
  horizontal?: boolean // 是否使用横向滚动
}
const props = withDefaults(defineProps<Props>(), {
  size: 5,
  trigger: 'hover',
  horizontal: false
})
const emits = defineEmits(['scroll'])
</script>
<template>
  <div class="m-scrollbar"> </div>
</template>
<style lang="less" scoped>
.m-scrollbar {
}
</style>
