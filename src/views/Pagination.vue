<script setup lang="ts">
import { ref } from 'vue'

const hideOnSinglePage = ref(false)
const total = ref(100)
const pagination = ref({
  pageSize: 10,
  p: 1
})
function changePage (pager: object) { // 分页器回调
  console.log('pager:', pager)
}
</script>

<template>
  <div>
    <h2 class="mb10">Pagination 分页器基本使用</h2>
    <Pagination
      @change="changePage"
      :current="pagination.p"
      :pageSize="pagination.pageSize"
      :total="total"
      :hideOnSinglePage="hideOnSinglePage"
      :showQuickJumper="true"
      :showTotal="true"
      placement="center"/>
  </div>
</template>

<style lang="less" scoped>
</style>
