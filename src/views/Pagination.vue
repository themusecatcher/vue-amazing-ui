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
      @change="changePage"
      :current="pagination.p"
      :pageSize="pagination.pageSize"
      :total="total"
      :hideOnSinglePage="hideOnSinglePage"
      :showQuickJumper="true"
      :showTotal="true"
      placement="center"/>
    <h2 class="mt30 mb10">分页靠左(右)展示 (placement: left(right))</h2>
    <Pagination
      @change="changePage"
      :current="pagination.p"
      :pageSize="pagination.pageSize"
      :total="total"
      :hideOnSinglePage="hideOnSinglePage"
      :showQuickJumper="true"
      :showTotal="true"
      placement="left"/>
    <Pagination
      @change="changePage"
      :current="pagination.p"
      :pageSize="pagination.pageSize"
      :total="total"
      :hideOnSinglePage="hideOnSinglePage"
      :showQuickJumper="true"
      :showTotal="true"
      placement="right"/>
    <h2 class="mt30 mb10">不展示快速跳转至某页，不显示当前页数和数据总量 (showQuickJumper: false & showTotal: false)</h2>
    <Pagination
      @change="changePage"
      :current="pagination.p"
      :pageSize="pagination.pageSize"
      :total="total"
      :hideOnSinglePage="hideOnSinglePage"
      placement="left"/>
  </div>
</template>
