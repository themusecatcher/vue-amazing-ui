# 分页 Pagination

<br/>

*采用分页的形式分隔长列表，每次只加载一个页面*

## 何时使用

- 当需要进行分页展示时

<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)
const total = ref(100)
const pagination = ref({
  pageSize: 10,
  p: 1
})
function changePage (pager: object) { // 分页回调
  console.log('pager:', pager)
}
</script>

## 基本使用

<Pagination
  :current="pagination.p"
  :pageSize="pagination.pageSize"
  :total="total"
  @change="changePage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

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
  <Pagination
    :current="pagination.p"
    :pageSize="pagination.pageSize"
    :total="total"
    @change="changePage" />
</template>
```

:::

## 靠左展示

<Pagination
  :current="pagination.p"
  :pageSize="pagination.pageSize"
  :total="total"
  placement="left"
  @change="changePage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

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
  <Pagination
    :current="pagination.p"
    :pageSize="pagination.pageSize"
    :total="total"
    placement="left"
    @change="changePage" />
</template>
```

:::

## 靠右展示

<Pagination
  :current="pagination.p"
  :pageSize="pagination.pageSize"
  :total="total"
  placement="right"
  @change="changePage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

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
  <Pagination
    :current="pagination.p"
    :pageSize="pagination.pageSize"
    :total="total"
    placement="right"
    @change="changePage" />
</template>
```

:::

## 快速跳转和数据总量

<Pagination
  :current="pagination.p"
  :pageSize="pagination.pageSize"
  :total="total"
  showQuickJumper
  showTotal
  @change="changePage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

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
  <Pagination
    :current="pagination.p"
    :pageSize="pagination.pageSize"
    :total="total"
    showQuickJumper
    showTotal
    @change="changePage" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
current | 当前页数 | number | 1  | false
pageSize | 每页条数 | number | 10 | false
total | 数据总数 | number | 0 | false
pageListNum | 显示的页码数组长度 | number | 5 | false
hideOnSinglePage | 只有一页时是否隐藏分页 | boolean | false | false
showQuickJumper | 是否可以快速跳转至某页 | boolean | false | false
showTotal | 是否显示当前页数和数据总量 | boolean | false | false
placement | 分页展示位置：靠左、居中、靠右 | 'left' &#124; 'center' &#124; 'right' | 'center' | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 页码改变后的回调 | (pager: { page: number, pageSize: pageSize }) => void
