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
  // 调用分页接口获取列表数据
}
function onChangeTable (pagination: {page: number, pageSize: number}) {
  console.log('pagination:', pagination)
  queryParams.value.page = pagination.page
  queryParams.value.pageSize = pagination.pageSize
  getData()
}
</script>
<template>
  <div>
    <Table
      :columns="columns"
      :dataSource="tableData"
      :pagination="{
        page: queryParams.page,
        pageSize: queryParams.pageSize
      }"
      :showPagination="true"
      :hideOnSinglePage="false"
      :total="total"
      :loading="loading"
      @change="onChangeTable"
    >
      <!-- 配置指定列数据 -->
      <template #name="record">
        hello {{ record.name }}
      </template>
      <template #job="{ job, index }">
        hi {{ job }}
      </template>
    </Table>
  </div>
</template>
<style lang="less" scoped>

</style>
