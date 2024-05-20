<script setup lang="ts">
import { ref } from 'vue'

const total = ref(100)
const pagination = ref({
  pageSize: 10,
  p: 1
})
function changePage (page: number, pageSize: number) { // 分页回调
  console.log('page:', page)
  console.log('pageSize:', pageSize)
}
function pageSizeChange (page: number, pageSize: number) { // pageSize 变化的回调
  console.log('change page:', page)
  console.log('change pageSize:', pageSize)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Pagination
      :current="pagination.p"
      :page-size="pagination.pageSize"
      :total="total"
      @change="changePage" />
    <h2 class="mt30 mb10">靠左展示</h2>
    <Pagination
      :current="pagination.p"
      :page-size="pagination.pageSize"
      :total="total"
      placement="left"
      @change="changePage" />
    <h2 class="mt30 mb10">靠右展示</h2>
    <Pagination
      :current="pagination.p"
      :page-size="pagination.pageSize"
      :total="total"
      placement="right"
      @change="changePage" />
    <h2 class="mt30 mb10">快速跳转 & 数据总量</h2>
    <Pagination
      :current="pagination.p"
      :page-size="pagination.pageSize"
      :total="total"
      show-quick-jumper
      show-total
      @change="changePage"
      @pageSizeChange="pageSizeChange" />
    <h2 class="mt30 mb10">Ant Design 分页</h2>
    <a-pagination
      :current="pagination.p"
      :page-size="pagination.pageSize"
      :total="total"
      show-quick-jumper
      @change="changePage"
      @showSizeChange="pageSizeChange" />
  </div>
</template>
