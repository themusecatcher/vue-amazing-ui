<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
const total = ref(35)
const queryParams = ref({
        pageSize: 5,
        page: 1
      })
const columns = ref([
        {
          title: '名字',
          width: 100,
          dataIndex: 'name',
          slot: 'name'
        },
        {
          title: '年龄',
          width: 100,
          dataIndex: 'age'
        },
        {
          title: '职业',
          width: 100,
          dataIndex: 'job',
          slot: 'job'
        },
        {
          title: '性别',
          width: 100,
          dataIndex: 'sex'
        },
        {
          title: '地址',
          width: 120,
          dataIndex: 'address'
        }
      ])
const tableData = ref([
        {
          name: 'Stephen',
          age: 30,
          job: 'player',
          sex: '男',
          address: 'CaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCalifornia'
        },
        {
          name: 'Leo',
          age: 36,
          job: 'actor',
          sex: '男',
          address: 'LA'
        },
        {
          name: 'Mr.Dear',
          age: 23,
          job: 'boy',
          sex: '男',
          address: 'Beijing'
        },
        {
          name: 'superman',
          age: 32,
          job: 'boy',
          sex: '男',
          address: 'US'
        }
      ])
function getData () {
  loading.value = true
  // 模拟调用接口获取列表数据
  setTimeout(() => {
    loading.value = false
  }, 500)
}
function onChange (pagination: {page: number, pageSize: number}) {
  console.log('pagination:', pagination)
  queryParams.value.page = pagination.page
  queryParams.value.pageSize = pagination.pageSize
  getData()
}
</script>
<template>
  <div>
    <h1>Table 表格</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Table
      :columns="columns"
      :dataSource="tableData"
      :pagination="{
        page: queryParams.page,
        pageSize: queryParams.pageSize
      }"
      :total="total"
      :loading="loading"
      @change="onChange">
    <!-- 配置指定列数据 -->
    <template #name="record">
      hello {{ record.name }}
    </template>
    <template #job="{ job, index }">
      hi {{ job }}
    </template>
    </Table>
    <h2 class="mt30 mb10">加载中表格 (loading: true)</h2>
    <Table
      :columns="columns"
      :dataSource="[]"
      :pagination="{
        page: queryParams.page,
        pageSize: queryParams.pageSize
      }"
      :showPagination="true"
      :hideOnSinglePage="false"
      :total="0"
      :loading="true"
      @change="onChange"
    ></Table>
    <h2 class="mt30 mb10">无数据表格 (total: 0)</h2>
    <Table
      :columns="columns"
      :dataSource="[]"
      :pagination="{
        page: queryParams.page,
        pageSize: queryParams.pageSize
      }"
      :showPagination="true"
      :hideOnSinglePage="false"
      :total="0"
      :loading="false"
      @change="onChange"
    ></Table>
  </div>
</template>
