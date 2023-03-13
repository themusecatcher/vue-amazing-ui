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
  <Breadcrumb :routes="routes" :height="60" />
</template>

<style lang="less" scoped>
</style>
