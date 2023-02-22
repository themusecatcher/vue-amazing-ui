<script setup lang="ts">
import { ref } from 'vue'
const hideOnSinglePage = ref(false);
const total = ref(100);
const pagination = ref({
  pageSize: 10,
  p: 1
})
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
function changePage (pager: object) { // 分页器回调
  console.log('pager:', pager)
}
// Vite 在一个特殊的 import.meta.env 对象上暴露环境变量
console.log('import.meta.env.MODE:', import.meta.env.MODE)
console.log('import.meta.env.BASE_URL:', import.meta.env.BASE_URL)
console.log('import.meta.env.PROD:', import.meta.env.PROD)
console.log('import.meta.env.DEV:', import.meta.env.DEV)
</script>

<template>
  <div class="app">
    <Breadcrumb :routes="routes" :height="60" />
    <Pagination
      @change="changePage"
      :current="pagination.p"
      :pageSize="pagination.pageSize"
      :total="total"
      :hideOnSinglePage="hideOnSinglePage"
      :showQuickJumper="true"
      :showTotal="true"
      placement="center"
    />
  </div>
</template>

<style lang="less" scoped>
.app {
  width: 1200px;
  margin: 0 auto;
}
</style>
