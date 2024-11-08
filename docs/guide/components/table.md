# 表格 Table

<GlobalElement />

*展示行列数据*

## 何时使用

- 当有大量结构化的数据需要展现时
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时

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
  },
  
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

## 基本使用

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
const loading = ref(false)
const total = ref(5)
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
  },
  
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
</template>
```

:::

## 带边框

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
const total = ref(5)
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
  },
  
])
</script>
<template>
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
</template>
```

:::

## 页头和页脚

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const bordered = ref(true)
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
  },
  
])
</script>
<template>
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
</template>
```

:::

## 加载中

<Table :columns="columns" loading />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
</script>
<template>
  <Table :columns="columns" loading />
</template>
```

:::

## 暂无数据

<Table :columns="columns" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
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
bordered | 是否展示外边框和列边框 | boolean | false
tableLayout | 表格布局方式，设为 `fixed` 表示内容不会影响列的布局，参考 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性 | 'auto' &#124; 'fixed' | 'fixed'
header | 表格标题 | string &#124; slot | undefined
footer | 表格尾部 | string &#124; slot | undefined
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

## Slots

名称 | 说明 | 类型
-- | -- | --
headerCell | 个性化头部单元格 | v-slot:headerCell="{ column, title }"
bodyCell | 个性化单元格 | v-slot:bodyCell="{ column, record, text, index }"

## Events

名称 | 说明 | 类型
-- | -- | --
change | 分页变化时的回调 | (pager: { page: number, pageSize: number }) => void
