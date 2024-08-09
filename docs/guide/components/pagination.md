# 分页 Pagination

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*采用分页的形式分隔长列表，每次只加载一个页面*

## 何时使用

- 当需要进行分页展示时

<script setup lang="ts">
import { ref } from 'vue'

const total = ref(100)
function changePage (page: number, pageSize: number) { // 分页回调
  console.log('page:', page)
  console.log('pageSize:', pageSize)
}
function pageSizeChange (page: number, pageSize: number) { // pageSize 变化的回调
  console.log('change page:', page)
  console.log('change pageSize:', pageSize)
}
</script>

## 基本使用

<Pagination :total="total" @change="changePage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const total = ref(100)
function changePage (page: number, pageSize: number) { // 分页回调
  console.log('page:', page)
  console.log('pageSize:', pageSize)
}
</script>
<template>
  <Pagination :total="total" @change="changePage" />
</template>
```

:::

## 靠左展示

<Pagination :total="total" placement="left" @change="changePage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const total = ref(100)
function changePage (page: number, pageSize: number) { // 分页回调
  console.log('page:', page)
  console.log('pageSize:', pageSize)
}
</script>
<template>
  <Pagination :total="total" placement="left" @change="changePage" />
</template>
```

:::

## 靠右展示

<Pagination :total="total" placement="right" @change="changePage" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const total = ref(100)
function changePage (page: number, pageSize: number) { // 分页回调
  console.log('page:', page)
  console.log('pageSize:', pageSize)
}
</script>
<template>
  <Pagination :total="total" placement="right" @change="changePage" />
</template>
```

:::

## 快速跳转 & 数据总量

<Pagination
  :total="total"
  show-quick-jumper
  show-total
  @change="changePage"
  @pageSizeChange="pageSizeChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const total = ref(100)
function changePage (page: number, pageSize: number) { // 分页回调
  console.log('page:', page)
  console.log('pageSize:', pageSize)
}
function pageSizeChange (page: number, pageSize: number) { // pageSize 变化的回调
  console.log('change page:', page)
  console.log('change pageSize:', pageSize)
}
</script>
<template>
  <Pagination
    :total="total"
    show-quick-jumper
    show-total
    @change="changePage"
    @pageSizeChange="pageSizeChange" />
</template>
```

:::

## APIs

### Pagination

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
page | 当前页数 | number | 1
pageSize | 每页条数 | number | 10
pageSizeOptions | 每页可以显示多少条 | string[] &#124; number[] | [10, 20, 50 ,100]
total | 数据总数 | number | 0
pageListNum | 显示的页码数组长度 | number | 5
hideOnSinglePage | 只有一页时是否隐藏分页 | boolean | false
showQuickJumper | 是否可以快速跳转至某页 | boolean | false
showSizeChanger | 是否展示 `pageSize` 切换器，当 `total` 大于 `50` 时默认为 `true` | boolean | undefined
showTotal | 是否显示当前页数和数据总量 | boolean | false
placement | 分页展示位置：靠左、居中、靠右 | 'left' &#124; 'center' &#124; 'right' | 'center'

## Events

名称 | 说明 | 类型
-- | -- | --
change | 页码改变后的回调 | (page: number, pageSize: number) => void
pageSizeChange | `pageSize` 变化的回调 | (page: number, pageSize: number) => void
