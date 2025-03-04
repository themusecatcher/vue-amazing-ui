# 分页 Pagination

<GlobalElement />

*采用分页的形式分隔长列表，每次只加载一个页面*

## 何时使用

- 当需要进行分页展示时

<script setup lang="ts">
import { ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
import { generate } from '@ant-design/colors'
const page = ref(1)
const pageSize = ref(10)
const total = ref(98)
const primaryColor = ref('#ff6900')
const primaryShadowColor = ref('rgba(255, 116, 32, 0.1)')
const placementOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const placement = ref<PaginationProps['placement']>('left')
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref<PaginationProps['size']>('middle')
function onChange(page: number, pageSize: number) {
  // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
function pageSizeChange(page: number, pageSize: number) {
  // 每页条数 pageSize 变化的回调
  console.log('pageSizeChange page', page)
  console.log('pageSizeChange pageSize', pageSize)
}
</script>

## 基本使用

<Pagination v-model:page="page" :total="50" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
function onChange (page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Pagination v-model:page="page" :total="50" @change="onChange" />
</template>
```

:::

## 自定义位置

<Flex vertical>
  <Radio :options="placementOptions" v-model:value="placement" button button-style="solid" />
  <Pagination v-model:page="page" :total="total" :placement="placement" @change="onChange" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
const page = ref(1)
const total = ref(98)
const placementOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const placement = ref<PaginationProps['placement']>('left')
function onChange (page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Flex vertical>
    <Radio :options="placementOptions" v-model:value="placement" button button-style="solid" />
    <Pagination v-model:page="page" :total="total" :placement="placement" @change="onChange" />
  </Flex>
</template>
```

:::

## 三种尺寸

<Flex vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Pagination v-model:page="page" :size="size" :total="total" show-quick-jumper @change="onChange" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
const page = ref(1)
const total = ref(98)
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref<PaginationProps['size']>('middle')
function onChange (page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Flex vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Pagination v-model:page="page" :size="size" :total="total" show-quick-jumper @change="onChange" />
  </Flex>
</template>
```

:::

## 自定义 pageSize 切换选项

<Pagination
  v-model:page="page"
  v-model:page-size="pageSize"
  :total="total"
  :page-size-options="[10, 20, 30, 40, 50]"
  @change="onChange"
  @pageSizeChange="pageSizeChange"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const pageSize = ref(10)
const total = ref(98)
function onChange (page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
function pageSizeChange (page: number, pageSize: number) { // 每页条数 pageSize 变化的回调
  console.log('pageSizeChange page', page)
  console.log('pageSizeChange pageSize', pageSize)
}
</script>
<template>
  <Pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :total="total"
    :page-size-options="[10, 20, 30, 40, 50]"
    @change="onChange"
    @pageSizeChange="pageSizeChange"
  />
</template>
```

:::

## 隐藏 pageSize 切换器

<Pagination v-model:page="page" :total="total" :show-size-changer="false" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const total = ref(98)
function onChange (page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Pagination v-model:page="page" :total="total" :show-size-changer="false" @change="onChange" />
</template>
```

:::

## 快速跳转

<Pagination v-model:page="page" :total="total" show-quick-jumper @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const total = ref(98)
function onChange (page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Pagination v-model:page="page" :total="total" show-quick-jumper @change="onChange" />
</template>
```

:::

## 数据总数

<Flex vertical>
  <Pagination v-model:page="page" :total="total" show-total @change="onChange" />
  <Pagination
    v-model:page="page"
    :total="total"
    :show-total="(total: number) => `Total ${total} items`"
    @change="onChange"
  />
  <Pagination
    v-model:page="page"
    :total="total"
    :show-total="(total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`"
    @change="onChange"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const total = ref(98)
function onChange (page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Flex vertical>
    <Pagination v-model:page="page" :total="total" show-total @change="onChange" />
    <Pagination
      v-model:page="page"
      :total="total"
      :show-total="(total: number) => `Total ${total} items`"
      @change="onChange"
    />
    <Pagination
      v-model:page="page"
      :total="total"
      :show-total="(total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`"
      @change="onChange"
    />
  </Flex>
</template>
```

:::

## 禁用

<Pagination v-model:page="page" disabled :total="total" show-quick-jumper @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const total = ref(98)
function onChange (page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Pagination disabled v-model:page="page" :total="total" show-quick-jumper @change="onChange" />
</template>
```

:::

## 自定义主题色

<Flex vertical>
  <Space align="center">
    primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" />
    primaryShadowColor:<ColorPicker style="width: 200px" v-model:value="primaryShadowColor" />
  </Space>
  <Pagination
    :style="`--pagination-primary-color: ${primaryColor}`"
    v-model:page="page"
    :total="total"
    show-quick-jumper
    :changer-props="{
      style: {
        '--select-primary-color-hover': generate(primaryColor)[4],
        '--select-primary-color-focus': generate(primaryColor)[4],
        '--select-primary-shadow-color': primaryShadowColor,
        '--select-item-bg-color-active': generate(primaryColor)[0]
      }
    }"
    :jumper-props="{
      style: {
        '--input-primary-color-hover': generate(primaryColor)[4],
        '--input-primary-color-focus': generate(primaryColor)[4],
        '--input-primary-shadow-color': primaryShadowColor
      }
    }"
    @change="onChange"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { generate } from '@ant-design/colors'
const page = ref(1)
const total = ref(98)
const primaryColor = ref('#ff6900')
const primaryShadowColor = ref('rgba(255, 116, 32, 0.1)')
function onChange (page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Flex vertical>
    <Space align="center">
      primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" />
      primaryShadowColor:<ColorPicker style="width: 200px" v-model:value="primaryShadowColor" />
    </Space>
    <Pagination
      :style="`--pagination-primary-color: ${primaryColor}`"
      v-model:page="page"
      :total="total"
      show-quick-jumper
      :changer-props="{
        style: {
          '--select-primary-color-hover': generate(primaryColor)[4],
          '--select-primary-color-focus': generate(primaryColor)[4],
          '--select-primary-shadow-color': primaryShadowColor,
          '--select-item-bg-color-active': generate(primaryColor)[0]
        }
      }"
      :jumper-props="{
        style: {
          '--input-primary-color-hover': generate(primaryColor)[4],
          '--input-primary-color-focus': generate(primaryColor)[4],
          '--input-primary-shadow-color': primaryShadowColor
        }
      }"
      @change="onChange"
    />
  </Flex>
</template>
```

:::

## APIs

### Pagination

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
page <Tag color="cyan">v-model</Tag> | 当前页数 | number | 1
pageSize <Tag color="cyan">v-model</Tag> | 每页条数 | number | 10
total | 数据总数 | number | 0
disabled | 是否禁用 | boolean | false
pageAmount | 显示的页码数 | number | 5
hideOnSinglePage | 只有一页时是否隐藏分页 | boolean | false
showQuickJumper | 是否可以快速跳转至某页 | boolean | false
showSizeChanger | 是否展示 `pageSize` 切换器，当 `total` 大于 `50` 时默认为 `true` | boolean | undefined
pageSizeOptions | 设置每页可以显示多少条 | string[] &#124; number[] | [10, 20, 50 ,100]
showTotal | 用于显示数据总量和当前数据顺序 | boolean &#124; ((total: number, range: number[]) => string) | false
placement | 分页展示位置 | 'left' &#124; 'center' &#124; 'right' | 'center'
size | 分页按钮大小 | 'large' &#124; 'middle' &#124; 'small' | 'large'

## Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 页码 `page` 或每页条数 `pageSize` 改变的回调 | (page: number, pageSize: number) => void
pageSizeChange | 每页条数 `pageSize` 变化的回调 | (page: number, pageSize: number) => void
