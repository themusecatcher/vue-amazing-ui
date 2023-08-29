<script setup lang="ts">
import { ref } from 'vue'

const hideOnSinglePage = ref(false)
const total = ref(100)
const pagination = ref({
  pageSize: 10,
  p: 1
})
function changePage (pager: object) { // 分页回调
  console.log('pager:', pager)
}
</script>
<template>
  <div>
    <h1>Pagination 分页</h1>
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
    <h2 class="mt30 mb10">快速跳转和数据总量</h2>
    <Pagination
      :current="pagination.p"
      :page-size="pagination.pageSize"
      :total="total"
      show-quick-jumper
      show-total
      @change="changePage" />
  </div>
</template>
