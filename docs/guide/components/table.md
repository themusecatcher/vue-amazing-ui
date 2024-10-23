# 表格 Table

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="成为赞助者✨"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

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
      total: total,
      page: 1,
      pageSize: 10,
      showQuickJumper: true,
      showTotal: true
    }"
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
      total: total,
      page: 1,
      pageSize: 10,
      showQuickJumper: true,
      showTotal: true
    }"
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
  <Table :columns="columns" />
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
  <Table :columns="columns" />
</template>
```

:::

## APIs

### Table

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
columns | 表格列的配置项 | [Column](#column-type)[] | []
dataSource | 表格数据数组 | any[] | []
loading | 是否加载中 | boolean | false
spinProps | `Spin` 组件属性配置，参考 [Spin Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html#spin)，用于配置数据加载中样式 | object | {}
emptyProps | `Empty` 组件属性配置，参考 [Empty Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/empty.html#empty)，用于配置暂无数据样式 | object | {}
showPagination | 是否显示分页 | boolean | true
pagination | `Pagination` 组件属性配置，参考 [Pagination Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/pagination.html#pagination)，用于配置分页功能 | object | {}

### Column Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
title? | 列头显示文字 | string | undefined
width? | 列宽度，单位 `px` | number &#124; string | undefined
dataIndex | 列数据字符索引 | string | undefined
slot? | 列插槽名称索引 | string | undefined

## Events

名称 | 说明 | 类型
-- | -- | --
change | 分页变化时的回调 | (pager: {page: number, pageSize: number}) => void
