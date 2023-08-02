<script setup lang="ts">
import { computed } from 'vue'
interface Query {
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
interface Route {
  path: string // 路由地址
  query?: Query // 路由查询参数
  name: string // 路由名称
}
interface Props {
  routes: Array<Route> // 或者Route[] router的路由数组，没有 ? 时，即表示 required: true
  fontSize?: number // 字体大小
  height?: number // 面包屑高度
  maxWidth?: number // 文本最大显示宽度，超出后显示省略号
  separator?: string // 自定义分隔符
  target?: '_self'|'_blank' // 如何打开目标URL，当前窗口或新窗口
}
const props = withDefaults(defineProps<Props>(), {
  routes: () => [],
  fontSize: 14,
  height: 21,
  maxWidth: 180,
  separator: '',
  target: '_self'
})
</script>
<template>
  <div class="m-badge">
  </div>
</template>
<style lang="less" scoped>
.m-badge {
}
</style>