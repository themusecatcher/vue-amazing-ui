<script setup lang="ts">
import { ref } from 'vue'
const routes = ref([
    {
      path: '/first', // 路由地址
      query: { id: 1, tab: 2 }, // 路由参数
      name: '一级路由' // 路由名称
    },
    {
      path: '/second',
      name: '二级路由'
    },
    {
      path: '/third',
      name: '三级路由三级路由三级路由三级路由三级路由三级路由三级路由'
    }
  ])
</script>
<template>
  <div>
    <h2 class="mb10">Breadcrumb 面包屑基本使用</h2>
    <Breadcrumb :routes="routes" :height="36" />
    <h2 class="mt30 mb10">使用自定义分隔符: / (separator: /)</h2>
    <Breadcrumb :routes="routes" separator="/" :height="36" />
  </div>
</template>
