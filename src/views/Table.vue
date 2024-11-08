<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
const loading = ref(false)
const total = ref(5)
const bordered = ref(true)
const queryParams = reactive({
  pageSize: 10,
  page: 1
})
const columns = reactive([
  {
    title: '名字',
    width: 100,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    width: 60,
    dataIndex: 'age'
  },
  {
    title: '职业',
    width: 80,
    dataIndex: 'job',
    key: 'job'
  },
  {
    title: '性别',
    width: 60,
    dataIndex: 'sex',
    key: 'sex'
  },
  {
    title: '地址',
    width: 120,
    dataIndex: 'address'
  },
  {
    title: '操作',
    width: 150,
    key: 'action'
  }
])
const dataSource = reactive([
  {
    name: 'Stephen',
    age: 30,
    job: 'Player',
    sex: 'boy',
    address: 'Chase Center, San Francisco, California'
  },
  {
    name: 'the Muse Catcher',
    age: 24,
    job: 'None',
    sex: 'boy',
    address: 'Beijing'
  },
  {
    name: 'Wonder Woman',
    age: 32,
    job: 'Hero',
    sex: 'girl',
    address: 'Tel Aviv, Israel'
  },
  {
    name: 'Superman',
    age: 32,
    job: 'Hero',
    sex: 'boy',
    address: 'United States'
  },
  {
    name: 'Leo',
    age: 36,
    job: 'Actor',
    sex: 'boy',
    address: 'Los Angeles'
  }
])
onBeforeMount(() => {
  getData()
})
function getData() {
  loading.value = true
  // 模拟异步请求获取数据
  setTimeout(() => {
    loading.value = false
  }, 1500)
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
    <h2 class="mt30 mb10">基本使用</h2>
    <Table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="{
        total: total,
        showTotal: true
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
        <template v-else-if="column.key === 'sex'">
          <Tag v-if="record.sex === 'boy'" color="volcano">{{ record.sex }}</Tag>
          <Tag v-else-if="record.sex === 'girl'" color="magenta">{{ record.sex }}</Tag>
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
    <h2 class="mt30 mb10">带边框</h2>
    <Table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="{
        total: total,
        showTotal: true
      }"
      bordered
    >
      <template #headerCell="{ column, title }">
        <template v-if="column.key === 'name'"> <SmileOutlined /> {{ title }} </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a> hello {{ record.name }} </a>
        </template>
        <template v-else-if="column.key === 'sex'">
          <Tag v-if="record.sex === 'boy'" color="volcano">{{ record.sex }}</Tag>
          <Tag v-else-if="record.sex === 'girl'" color="magenta">{{ record.sex }}</Tag>
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
    <h2 class="mt30 mb10">页头和页脚</h2>
    <Space align="center"> bordered: <Switch v-model="bordered" /> </Space>
    <br />
    <br />
    <Table :columns="columns" :dataSource="dataSource" :bordered="bordered">
      <template #header> Header firstData name: {{ dataSource[0].name }} </template>
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'name'">
          <a> hello {{ text }} </a>
        </template>
        <template v-else-if="column.key === 'sex'">
          <Tag v-if="text === 'boy'" color="volcano">{{ text }}</Tag>
          <Tag v-else-if="text === 'girl'" color="magenta">{{ text }}</Tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite</a>
            <Divider vertical />
            <a>Delete</a>
          </span>
        </template>
      </template>
      <template #footer> Footer lastData name: {{ dataSource[dataSource.length - 1].name }} </template>
    </Table>
    <h2 class="mt30 mb10">加载中</h2>
    <Table :columns="columns" loading />
    <h2 class="mt30 mb10">暂无数据</h2>
    <Table :columns="columns" />
  </div>
</template>
