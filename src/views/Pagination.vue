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
  <Pagination
    @change="changePage"
    :current="pagination.p"
    :pageSize="pagination.pageSize"
    :total="total"
    :hideOnSinglePage="hideOnSinglePage"
    :showQuickJumper="true"
    :showTotal="true"
    placement="center"/>
</template>

<style lang="less" scoped>
</style>
