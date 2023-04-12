<script setup lang="ts">
interface Props {
  alt?: string // 图像描述
  fallback?: string // 加载失败容错地址
  height?: string|number // 图像高度
  width?: string|number // 图像宽度
  placeholder?: boolean // 加载占位，为 true 时使用默认占位
  preview?: boolean // 预览参数，为 false 时禁用
  src?: string // 图片地址
  previewMask?: false // 自定义 mask
}
</script>
<template>
  <div class="m-image">
    
  </div>
</template>
<style lang="less" scoped>
.m-image {
  position: relative;
  display: inline-block;
}
</style>
