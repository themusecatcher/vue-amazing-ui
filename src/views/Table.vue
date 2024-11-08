<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
const loading = ref(false)
const total = ref(80)
const queryParams = reactive({
  pageSize: 10,
  page: 1
})
const columns = ref([
  {
    title: '名字',
    width: 100,
    dataIndex: 'name',
    key: 'name'
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
    key: 'job'
  },
  {
    title: '性别',
    width: 100,
    dataIndex: 'sex'
  },
  {
    title: '地址',
    width: 100,
    dataIndex: 'address'
  },
  {
    title: '操作',
    width: 120,
    key: 'action'
  }
])
const dataSource = ref([
  {
    name: 'Stephen',
    age: 30,
    job: 'player',
    sex: '男',
    address: 'California, San Francisco, Chase Center'
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
onMounted(() => {
  getData()
})
function getData() {
  loading.value = true
  // 模拟调用接口获取列表数据
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
function onChange(page: number, pageSize: number) {
  queryParams.page = page
  queryParams.pageSize = pageSize
  getData()
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="{
        total: total,
        page: 1,
        pageSize: 10,
        showQuickJumper: true,
        showTotal: (total: number) => `Total ${total} items`
      }"
      :loading="loading"
    >
      <template #headerCell="{ column, title }">
        <template v-if="column.key === 'name'"> <SmileOutlined /> {{ title }} </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a> hello {{ record.name }} </a>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
          </span>
        </template>
      </template>
    </a-table>
    <h2 class="mt30 mb10">基本使用</h2>
    <Table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="{
        total: total,
        page: 1,
        pageSize: 10,
        showQuickJumper: true,
        showTotal: (total: number) => `Total ${total} items`
      }"
      :loading="loading"
      @change="onChange"
    >
      <template #headerCell="{ column, title }">
        <template v-if="column.key === 'name'"> <SmileOutlined /> {{ title }} </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a> hello {{ record.name }} </a>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite {{ record.name }}</a>
            <Divider vertical />
            <a>Delete</a>
          </span>
        </template>
      </template>
    </Table>
    <h2 class="mt30 mb10">加载中</h2>
    <Table :columns="columns" loading />
    <h2 class="mt30 mb10">暂无数据</h2>
    <Table :columns="columns" />
  </div>
</template>
