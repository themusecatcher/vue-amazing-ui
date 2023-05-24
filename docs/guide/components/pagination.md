# 分页器 Pagination

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
function changePage (pager: object) { // 分页器回调
  console.log('pager:', pager)
}
</script>

## 基本使用

<Pagination
  :current="pagination.p"
  :pageSize="pagination.pageSize"
  :total="total"
  @change="changePage" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

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
    :current="pagination.p"
    :pageSize="pagination.pageSize"
    :total="total"
    @change="changePage" />
</template>
```

</details>

## 靠左展示

<Pagination
  :current="pagination.p"
  :pageSize="pagination.pageSize"
  :total="total"
  placement="left"
  @change="changePage" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

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
    :current="pagination.p"
    :pageSize="pagination.pageSize"
    :total="total"
    placement="left"
    @change="changePage" />
</template>
```

</details>

## 靠右展示

<Pagination
  :current="pagination.p"
  :pageSize="pagination.pageSize"
  :total="total"
  placement="right"
  @change="changePage" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

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
    :current="pagination.p"
    :pageSize="pagination.pageSize"
    :total="total"
    placement="right"
    @change="changePage" />
</template>
```

</details>

## 快速跳转，当前页数和数据总量

<Pagination
  :current="pagination.p"
  :pageSize="pagination.pageSize"
  :total="total"
  showQuickJumper
  showTotal
  @change="changePage" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

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
    :current="pagination.p"
    :pageSize="pagination.pageSize"
    :total="total"
    showQuickJumper
    showTotal
    @change="changePage" />
</template>
```

</details>
