# 表格 Table

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" :z-index="30" />

<br/>

*展示行列数据*

## 何时使用

- 当有大量结构化的数据需要展现时
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const loading = ref(false)
const total = ref(80)
const queryParams = reactive({
        pageSize: 10,
        page: 1
      })
const columns = ref([
        {
          title: '名字',
          width: 60,
          dataIndex: 'name',
          slot: 'name'
        },
        {
          title: '年龄',
          width: 30,
          dataIndex: 'age'
        },
        {
          title: '职业',
          width: 50,
          dataIndex: 'job',
          slot: 'job'
        },
        {
          title: '性别',
          width: 30,
          dataIndex: 'sex'
        },
        {
          title: '地址',
          width: 100,
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
onMounted(() => {
  getData()
})
function getData () {
  loading.value = true
  // 模拟调用接口获取列表数据
  setTimeout(() => {
    loading.value = false
  }, 500)
}
function onChange (page: number, pageSize: number) {
  queryParams.page = page
  queryParams.pageSize = pageSize
  getData()
}
</script>

## 基本使用

<ClientOnly>
  <Table
    :columns="columns"
    :data-source="tableData"
    :pagination="{
      page: 1,
      pageSize: 10,
      showQuickJumper: true,
      showTotal: true
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
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const loading = ref(false)
const total = ref(80)
const queryParams = reactive({
        pageSize: 10,
        page: 1
      })
const columns = ref([
        {
          title: '名字',
          width: 60,
          dataIndex: 'name',
          slot: 'name'
        },
        {
          title: '年龄',
          width: 30,
          dataIndex: 'age'
        },
        {
          title: '职业',
          width: 50,
          dataIndex: 'job',
          slot: 'job'
        },
        {
          title: '性别',
          width: 30,
          dataIndex: 'sex'
        },
        {
          title: '地址',
          width: 100,
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
onMounted(() => {
  getData()
})
function getData () {
  loading.value = true
  // 模拟调用接口获取列表数据
  setTimeout(() => {
    loading.value = false
  }, 500)
}
function onChange (page: number, pageSize: number) {
  queryParams.page = page
  queryParams.pageSize = pageSize
  getData()
}
</script>
<template>
  <Table
    :columns="columns"
    :data-source="tableData"
    :pagination="{
      page: 1,
      pageSize: 10,
      showQuickJumper: true,
      showTotal: true
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
</template>
```

:::

## 加载中

<ClientOnly>
  <Table :columns="columns" loading />
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const columns = ref([
        {
          title: '名字',
          width: 60,
          dataIndex: 'name',
          slot: 'name'
        },
        {
          title: '年龄',
          width: 30,
          dataIndex: 'age'
        },
        {
          title: '职业',
          width: 50,
          dataIndex: 'job',
          slot: 'job'
        },
        {
          title: '性别',
          width: 30,
          dataIndex: 'sex'
        },
        {
          title: '地址',
          width: 100,
          dataIndex: 'address'
        }
      ])
</script>
<template>
  <Table :columns="columns" loading />
</template>
```

:::

## 暂无数据

<ClientOnly>
  <Table :columns="columns" :total="0" />
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const columns = ref([
        {
          title: '名字',
          width: 60,
          dataIndex: 'name',
          slot: 'name'
        },
        {
          title: '年龄',
          width: 30,
          dataIndex: 'age'
        },
        {
          title: '职业',
          width: 50,
          dataIndex: 'job',
          slot: 'job'
        },
        {
          title: '性别',
          width: 30,
          dataIndex: 'sex'
        },
        {
          title: '地址',
          width: 100,
          dataIndex: 'address'
        }
      ])
</script>
<template>
  <Table :columns="columns" :total="0" />
</template>
```

:::

## APIs

### Table

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
columns | 表格列的配置项 | [Column](#column-type)[] | [] | false
dataSource | 表格数据数组 | any[] | [] | false
pagination | 分页配置 | [Pagination](#pagination-type) | {} | false
showPagination | 是否显示分页 | boolean | true | false
total | 数据总数 | number | 0 | false
loading | 是否加载中 | boolean | false | false

### Column Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
title | 列头显示文字 | string | false
width | 列宽度 | number &#124; string | true
dataIndex | 列数据字符索引 | string | true
slot | 列插槽名称索引 | string | false

### Pagination Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
page | 当前页数 | number | false
pageSize | 每页条数 | number | false
pageSizeOptions | 每页可以显示多少条 | string[] &#124; number[] | false
total | 数据总数 | number | false
pageListNum | 显示的页码数组长度 | number | false
hideOnSinglePage | 只有一页时是否隐藏分页 | boolean | false
showQuickJumper | 是否可以快速跳转至某页 | boolean | false
showSizeChanger | 是否展示 `pageSize` 切换器，当 `total` 大于 `50` 时默认为 `true` | boolean | false
showTotal | 是否显示当前页数和数据总量 | boolean | false | false
placement | 分页展示位置：靠左、居中、靠右 | 'left' &#124; 'center' &#124; 'right' | false

## Events

名称 | 说明 | 类型
-- | -- | --
change | 分页变化时的回调 | (pager: {page: number, pageSize: number}) => void
