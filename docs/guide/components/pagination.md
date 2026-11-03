# 分页 Pagination

<GlobalElement />

_采用分页的形式分隔长列表，每次只加载一个页面_

## 何时使用

- 当需要进行分页展示时

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
// 各分节独立绑定，操作任一用例不会联动其余用例
const basicPage = ref(1)
const placementPage = ref(1)
const sizePage = ref(1)
const pageAmountPage = ref(1)
const borderedPage = ref(1)
const changerPage = ref(1)
const hideChangerPage = ref(1)
const quickJumperPage = ref(1)
const goButtonPage = ref(1)
const totalTextPage = ref(1)
const disabledPage = ref(1)
const customOptionsPage = ref(1)
const configPage = ref(1)
const changerPageSize = ref(10)
const customOptionsPageSize = ref(10)
const configPageSize = ref(10)
const total = ref(500)
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
const pageAmountOptions = [
  {
    label: '3',
    value: 3
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '7',
    value: 7
  }
]
const pageAmount = ref(5)
const bordered = ref(false)
const goButton = ref(false)
const totalOptions = [
  {
    label: '0',
    value: 0
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '500',
    value: 500
  }
]
// 配置器：一次覆盖全部展示型属性，初值一律取组件属性默认值；
// total 保留 500（组件默认为 0，但 total 为 0 时整块分页隐藏，配置器将无内容可看）
const config = reactive({
  bordered: true,
  size: 'large' as PaginationProps['size'],
  placement: 'center' as PaginationProps['placement'],
  pageAmount: 5,
  disabled: false,
  hideOnSinglePage: false,
  showTotal: false,
  showQuickJumper: false,
  // 组件默认 undefined，total 大于 50 时生效为 true；开关只能表达布尔值，故取当前实际默认
  showSizeChanger: true,
  total: 500
})
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

<Pagination v-model:page="basicPage" :total="50" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Pagination v-model:page="page" :total="50" @change="onChange" />
</template>
```

:::

## 非受控模式

_不传 `v-model:page` / `v-model:page-size` 时由组件自持，用 `defaultPage` / `defaultPageSize` 指定初始值；翻页照常生效_

<Pagination :total="100" :default-page="3" :default-page-size="20" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
function onChange(page: number, pageSize: number) {
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Pagination :total="100" :default-page="3" :default-page-size="20" @change="onChange" />
</template>
```

:::

## 自定义位置

<Space align="center" style="margin-bottom: 16px">
  placement:
  <RadioGroup :options="placementOptions" v-model:value="placement" button button-style="solid" />
</Space>
<Pagination v-model:page="placementPage" :total="total" :placement="placement" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
const page = ref(1)
const total = ref(500)
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
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Space align="center" style="margin-bottom: 16px">
    placement:
    <RadioGroup :options="placementOptions" v-model:value="placement" button button-style="solid" />
  </Space>
  <Pagination v-model:page="page" :total="total" :placement="placement" @change="onChange" />
</template>
```

:::

## 三种尺寸

<Space align="center" style="margin-bottom: 16px">
  size:
  <RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
</Space>
<Pagination v-model:page="sizePage" :size="size" :total="total" show-quick-jumper @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
const page = ref(1)
const total = ref(500)
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
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Space align="center" style="margin-bottom: 16px">
    size:
    <RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
  </Space>
  <Pagination v-model:page="page" :size="size" :total="total" show-quick-jumper @change="onChange" />
</template>
```

:::

## 自定义页码数量

<Space align="center" style="margin-bottom: 16px">
  pageAmount:
  <RadioGroup :options="pageAmountOptions" v-model:value="pageAmount" button button-style="solid" />
</Space>
<Pagination v-model:page="pageAmountPage" :total="total" :page-amount="pageAmount" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
const page = ref(1)
const total = ref(500)
const pageAmountOptions = [
  {
    label: '3',
    value: 3
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '7',
    value: 7
  }
]
const pageAmount = ref(5)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Space align="center" style="margin-bottom: 16px">
    pageAmount:
    <RadioGroup :options="pageAmountOptions" v-model:value="pageAmount" button button-style="solid" />
  </Space>
  <Pagination v-model:page="page" :total="total" :page-amount="pageAmount" @change="onChange" />
</template>
```

:::

## 无边框风格

<Space align="center" style="margin-bottom: 16px">
  bordered:
  <Switch v-model:value="bordered" />
</Space>
<Flex vertical>
  <Pagination v-model:page="borderedPage" :total="total" :bordered="bordered" @change="onChange" />
  <Pagination v-model:page="borderedPage" :total="total" :bordered="bordered" disabled @change="onChange" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const total = ref(500)
const bordered = ref(false)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Space align="center" style="margin-bottom: 16px">
    bordered:
    <Switch v-model:value="bordered" />
  </Space>
  <Flex vertical>
    <Pagination v-model:page="page" :total="total" :bordered="bordered" @change="onChange" />
    <Pagination v-model:page="page" :total="total" :bordered="bordered" disabled @change="onChange" />
  </Flex>
</template>
```

:::

## 自定义 pageSize 切换选项

<Pagination
  v-model:page="changerPage"
  v-model:page-size="changerPageSize"
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
const total = ref(500)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
function pageSizeChange(page: number, pageSize: number) { // 每页条数 pageSize 变化的回调
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

<Pagination v-model:page="hideChangerPage" :total="total" :show-size-changer="false" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const total = ref(500)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
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

<Pagination v-model:page="quickJumperPage" :total="total" show-quick-jumper @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const total = ref(500)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Pagination v-model:page="page" :total="total" show-quick-jumper @change="onChange" />
</template>
```

:::

## 跳转确认按钮

_`goButton` 传 `true` 取默认文案「确定」，传字符串则作为自定义文案；有按钮时失焦不再自动跳转_

<br/>
<Flex vertical>
  <Pagination v-model:page="goButtonPage" :total="total" :show-quick-jumper="{ goButton: true }" @change="onChange" />
  <Pagination v-model:page="goButtonPage" :total="total" :show-quick-jumper="{ goButton: '前往' }" @change="onChange" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const total = ref(500)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Flex vertical>
    <Pagination v-model:page="page" :total="total" :show-quick-jumper="{ goButton: true }" @change="onChange" />
    <Pagination v-model:page="page" :total="total" :show-quick-jumper="{ goButton: '前往' }" @change="onChange" />
  </Flex>
</template>
```

:::

## 数据总数

<Flex vertical>
  <Pagination v-model:page="totalTextPage" :total="total" show-total @change="onChange" />
  <Pagination
    v-model:page="totalTextPage"
    :total="total"
    :show-total="(total: number) => `Total ${total} items`"
    @change="onChange"
  />
  <Pagination
    v-model:page="totalTextPage"
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
const total = ref(500)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
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

<Pagination v-model:page="disabledPage" disabled :total="total" show-quick-jumper @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const total = ref(500)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
</script>
<template>
  <Pagination disabled v-model:page="page" :total="total" show-quick-jumper @change="onChange" />
</template>
```

:::

## 自定义切换器与跳转框

_`changerProps` 透传给每页条数切换器（参考 Select Props），`jumperProps` 透传给跳转输入框（参考 Input Props）_

<br/>

<Pagination
  v-model:page="customOptionsPage"
  v-model:page-size="customOptionsPageSize"
  :total="total"
  show-quick-jumper
  :changer-props="{ width: 120 }"
  :jumper-props="{ placeholder: '页码', width: 56 }"
  @change="onChange"
  @pageSizeChange="pageSizeChange"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const pageSize = ref(10)
const total = ref(500)
function onChange(page: number, pageSize: number) { // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
function pageSizeChange(page: number, pageSize: number) { // 每页条数 pageSize 变化的回调
  console.log('pageSizeChange page', page)
  console.log('pageSizeChange pageSize', pageSize)
}
</script>
<template>
  <Pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :total="total"
    show-quick-jumper
    :changer-props="{ width: 120 }"
    :jumper-props="{ placeholder: '页码', width: 56 }"
    @change="onChange"
    @pageSizeChange="pageSizeChange"
  />
</template>
```

:::

## 分页配置器

<Row :gutter="[24, 12]">
  <Col :span="8">
    <Space gap="small" vertical>
      size:
      <RadioGroup :options="sizeOptions" v-model:value="config.size" button button-style="solid" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      placement:
      <RadioGroup :options="placementOptions" v-model:value="config.placement" button button-style="solid" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      bordered:
      <Switch v-model:value="config.bordered" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      pageAmount:
      <RadioGroup :options="pageAmountOptions" v-model:value="config.pageAmount" button button-style="solid" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      disabled:
      <Switch v-model:value="config.disabled" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      hideOnSinglePage:
      <Switch v-model:value="config.hideOnSinglePage" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      showTotal:
      <Switch v-model:value="config.showTotal" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      showQuickJumper:
      <Switch v-model:value="config.showQuickJumper" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      showSizeChanger:
      <Switch v-model:value="config.showSizeChanger" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      total:
      <RadioGroup :options="totalOptions" v-model:value="config.total" button button-style="solid" />
    </Space>
  </Col>
  <Col :span="8">
    <Space gap="small" vertical>
      showQuickJumper.goButton:
      <Switch v-model:value="goButton" :disabled="!config.showQuickJumper" />
    </Space>
  </Col>
</Row>
<br/>
<Pagination
  v-model:page="configPage"
  v-model:page-size="configPageSize"
  v-bind="config"
  :show-quick-jumper="config.showQuickJumper ? { goButton } : false"
  @change="onChange"
  @pageSizeChange="pageSizeChange"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
const page = ref(1)
const pageSize = ref(10)
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
const pageAmountOptions = [
  {
    label: '3',
    value: 3
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '7',
    value: 7
  }
]
const totalOptions = [
  {
    label: '0',
    value: 0
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '500',
    value: 500
  }
]
const goButton = ref(false)
// 配置器：一次覆盖全部展示型属性，初值一律取组件属性默认值；
// total 保留 500（组件默认为 0，但 total 为 0 时整块分页隐藏，配置器将无内容可看）
const config = reactive({
  bordered: true,
  size: 'large' as PaginationProps['size'],
  placement: 'center' as PaginationProps['placement'],
  pageAmount: 5,
  disabled: false,
  hideOnSinglePage: false,
  showTotal: false,
  showQuickJumper: false,
  // 组件默认 undefined，total 大于 50 时生效为 true；开关只能表达布尔值，故取当前实际默认
  showSizeChanger: true,
  total: 500
})
// 页码 page 或每页条数 pageSize 改变的回调
function onChange(page: number, pageSize: number) {
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
// 每页条数 pageSize 变化的回调
function pageSizeChange(page: number, pageSize: number) {
  console.log('pageSizeChange page', page)
  console.log('pageSizeChange pageSize', pageSize)
}
</script>
<template>
  <Row :gutter="[24, 12]">
    <Col :span="8">
      <Space gap="small" vertical>
        size:
        <RadioGroup :options="sizeOptions" v-model:value="config.size" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        placement:
        <RadioGroup :options="placementOptions" v-model:value="config.placement" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        bordered:
        <Switch v-model:value="config.bordered" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        pageAmount:
        <RadioGroup :options="pageAmountOptions" v-model:value="config.pageAmount" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        disabled:
        <Switch v-model:value="config.disabled" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        hideOnSinglePage:
        <Switch v-model:value="config.hideOnSinglePage" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        showTotal:
        <Switch v-model:value="config.showTotal" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        showQuickJumper:
        <Switch v-model:value="config.showQuickJumper" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        showSizeChanger:
        <Switch v-model:value="config.showSizeChanger" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        total:
        <RadioGroup :options="totalOptions" v-model:value="config.total" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="8">
      <Space gap="small" vertical>
        showQuickJumper.goButton:
        <Switch v-model:value="goButton" :disabled="!config.showQuickJumper" />
      </Space>
    </Col>
  </Row>
  <br/>
  <Pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    v-bind="config"
    :show-quick-jumper="config.showQuickJumper ? { goButton } : false"
    @change="onChange"
    @pageSizeChange="pageSizeChange"
  />
</template>
```

:::

## APIs

> **受控 / 非受控**：`page / pageSize` 传入即受控（值以父为准，组件只上报 `update:page / update:pageSize`）；不传则由组件自持，交互照常生效，可用 `defaultPage / defaultPageSize` 指定初值。

### Pagination Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| page <Tag color="cyan">v-model</Tag> | 当前页数（不传时组件自持，可用 `defaultPage` 指定初值） | number | undefined |
| defaultPage | 非受控时的初始页数，未绑 `v-model:page` 时生效；缺省为 `1` | number | undefined |
| pageSize <Tag color="cyan">v-model</Tag> | 每页条数（不传时组件自持，可用 `defaultPageSize` 指定初值） | number | undefined |
| defaultPageSize | 非受控时的初始每页条数，未绑 `v-model:page-size` 时生效；缺省为 `10` | number | undefined |
| total | 数据总数 | number | 0 |
| disabled | 是否禁用 | boolean | false |
| pageAmount | 显示的页码数 | number | 5 |
| hideOnSinglePage | 只有一页时是否隐藏分页 | boolean | false |
| showQuickJumper | 是否可以快速跳转至某页，对象形态可展示跳转确认按钮 | boolean &#124; [PaginationQuickJumper](#paginationquickjumper-type) | false |
| jumperProps | 快速跳转组件 `props`，参考 [Input Props](./input.md#input-props) | [InputProps](./input.md#input-props) | {} |
| showSizeChanger | 是否展示 `pageSize` 切换器，当 `total` 大于 `50` 时默认为 `true` | boolean | undefined |
| changerProps | `pageSize` 切换器组件 `props`，参考 [Select Props](./select.md#select-props) | [SelectProps](./select.md#select-props) | {} |
| pageSizeOptions | 设置每页可以显示多少条 | string[] &#124; number[] | [10, 20, 50, 100] |
| showTotal | 用于显示数据总量和当前数据顺序 | boolean &#124; ((total: number, range: number[]) => string) | false |
| bordered | 页码是否显示边框，`false` 时为无边框风格 | boolean | true |
| placement | 分页展示位置 | 'left' &#124; 'center' &#124; 'right' | 'center' |
| size | 分页按钮大小 | 'large' &#124; 'middle' &#124; 'small' | 'large' |

### PaginationQuickJumper Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| goButton? | 是否展示跳转确认按钮；传字符串时作为按钮文案，有按钮时失焦不再自动跳转 | boolean &#124; string |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| change | 页码 `page` 或每页条数 `pageSize` 改变的回调 | (page: number, pageSize: number) => void |
| pageSizeChange | 每页条数 `pageSize` 变化的回调 | (page: number, pageSize: number) => void |
