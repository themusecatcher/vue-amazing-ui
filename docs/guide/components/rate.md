# 评分 Rate

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## 何时使用

- 对评价进行展示
- 对事物进行快速的评级操作

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value', value.value)
})
function onChange(value: number) {
  console.log('change value', value)
}
function onHoverChange(value: number) {
  console.log('hover value', value)
}
const characterOptions = [
  {
    label: 'star-outlined',
    value: 'star-outlined'
  },
  {
    label: 'star-filled',
    value: 'star-filled'
  },
  {
    label: 'heart-outlined',
    value: 'heart-outlined'
  },
  {
    label: 'heart-filled',
    value: 'heart-filled'
  },
  {
    label: 'custom-character',
    value: 'custom-character'
  }
]
const state = reactive({
  allowClear: true,
  allowHalf: true,
  count: 5,
  character: 'star-filled',
  customCharacter: 'S',
  size: 36,
  color: '#fadb14',
  gap: 8,
  disabled: false,
  value: 3
})
const score = ref(2.5)
watchEffect(() => {
  console.log('score', score.value)
})
</script>

## 基本使用

<Rate v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate v-model:value="value" />
</template>
```

:::

## 禁用

<Rate v-model:value="value" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate v-model:value="value" disabled />
</template>
```

:::

## 空心星型

<Rate character="star-outlined" :size="30" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate character="star-outlined" :size="30" v-model:value="value" />
</template>
```

:::

## 实心心型

<Rate character="heart-filled" :size="30" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate character="heart-filled" :size="30" v-model:value="value" />
</template>
```

:::

## 空心心型

<Rate character="heart-outlined" :size="30" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate character="heart-outlined" :size="30" v-model:value="value" />
</template>
```

:::

## 支持选中半星

<Rate v-model:value="value" :size="30" allow-half />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate v-model:value="value" allow-half />
</template>
```

:::

## 使用中文文字: 好

<Rate
  character="好"
  :size="36"
  v-model:value="value"
  @change="onChange"
  @hover-change="onHoverChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: number) {
  console.log('change value:', value)
}
function onHoverChange (value: number) {
  console.log('hover value:', value)
}
</script>
<template>
  <Rate
    character="好"
    :size="36"
    v-model:value="value"
    @change="onChange"
    @hover-change="onHoverChange" />
</template>
```

:::

## 使用英文字母: A

<Rate
  character="A"
  :size="48"
  v-model:value="value"
  @change="onChange"
  @hover-change="onHoverChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: number) {
  console.log('change value:', value)
}
function onHoverChange (value: number) {
  console.log('hover value:', value)
}
</script>
<template>
  <Rate
    character="A"
    :size="48"
    v-model:value="value"
    @change="onChange"
    @hover-change="onHoverChange" />
</template>
```

:::

## 自定义选中颜色

<Rate color="#1677FF" :size="30" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate color="#1677FF" :size="30" v-model:value="value" />
</template>
```

:::

## 自定义间距

<Rate :size="30" :gap="16" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate :size="30" :gap="16" v-model:value="value" />
</template>
```

:::

## 自定义 star 总数

<Rate :size="30" :count="10" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate :size="30" :count="10" v-model:value="value" />
</template>
```

:::

## 评分配置器

<Row :gutter="[24, 12]">
  <Col :span="6">
    <Space gap="small" vertical> allowClear:<Switch v-model="state.allowClear" /> </Space>
  </Col>
  <Col :span="6">
    <Space gap="small" vertical> allowHalf:<Switch v-model="state.allowHalf" /> </Space>
  </Col>
  <Col :span="6">
    <Flex vertical> count:<Slider v-model:value="state.count" :min="3" :max="10" /> </Flex>
  </Col>
  <Col :span="6">
    <Flex vertical> size:<Slider v-model:value="state.size" :min="10" :max="100" /> </Flex>
  </Col>
  <Col :span="6">
    <Flex gap="small" vertical> color:<Input v-model:value="state.color" placeholder="color" /> </Flex>
  </Col>
  <Col :span="6">
    <Flex vertical> gap:<Slider v-model:value="state.gap" :min="0" :max="100" /> </Flex>
  </Col>
  <Col :span="6">
    <Space gap="small" vertical> disabled:<Switch v-model="state.disabled" /> </Space>
  </Col>
  <Col :span="6">
    <Flex gap="small" vertical> effect：<Select :options="characterOptions" v-model="state.character" /> </Flex>
  </Col>
  <Col :span="6" v-if="state.character === 'custom-character'">
    <Flex gap="small" vertical> character:<Input v-model:value="state.customCharacter" placeholder="customCharacter" /> </Flex>
  </Col>
</Row>
<Badge :value="score" style="margin-top: 30px">
  <Rate
    :allow-clear="state.allowClear"
    :allow-half="state.allowHalf"
    :count="state.count"
    :character="state.character === 'custom-character' ? state.customCharacter : state.character"
    :size="state.size"
    :color="state.color"
    :gap="state.gap"
    :disabled="state.disabled"
    v-model:value="score"
  />
</Badge>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'

const characterOptions = [
  {
    label: 'star-outlined',
    value: 'star-outlined'
  },
  {
    label: 'star-filled',
    value: 'star-filled'
  },
  {
    label: 'heart-outlined',
    value: 'heart-outlined'
  },
  {
    label: 'heart-filled',
    value: 'heart-filled'
  },
  {
    label: 'custom-character',
    value: 'custom-character'
  }
]
const state = reactive({
  allowClear: true,
  allowHalf: true,
  count: 5,
  character: 'star-filled',
  customCharacter: 'S',
  size: 36,
  color: '#fadb14',
  gap: 8,
  disabled: false,
  value: 3
})
const score = ref(2.5)
watchEffect(() => {
  console.log('score', score.value)
})
</script>
<template>
  <Row :gutter="[24, 12]">
    <Col :span="6">
      <Space gap="small" vertical> allowClear:<Switch v-model="state.allowClear" /> </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> allowHalf:<Switch v-model="state.allowHalf" /> </Space>
    </Col>
    <Col :span="6">
      <Flex vertical> count:<Slider v-model:value="state.count" :min="3" :max="10" /> </Flex>
    </Col>
    <Col :span="6">
      <Flex vertical> size:<Slider v-model:value="state.size" :min="10" :max="100" /> </Flex>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical> color:<Input v-model:value="state.color" placeholder="color" /> </Flex>
    </Col>
    <Col :span="6">
      <Flex vertical> gap:<Slider v-model:value="state.gap" :min="0" :max="100" /> </Flex>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical> disabled:<Switch v-model="state.disabled" /> </Space>
    </Col>
    <Col :span="6">
      <Flex gap="small" vertical> effect：<Select :options="characterOptions" v-model="state.character" /> </Flex>
    </Col>
    <Col :span="6" v-if="state.character === 'custom-character'">
      <Flex gap="small" vertical> character:<Input v-model:value="state.customCharacter" placeholder="customCharacter" /> </Flex>
    </Col>
  </Row>
  <Badge :value="score" style="margin-top: 30px">
    <Rate
      :allow-clear="state.allowClear"
      :allow-half="state.allowHalf"
      :count="state.count"
      :character="state.character === 'custom-character' ? state.customCharacter : state.character"
      :size="state.size"
      :color="state.color"
      :gap="state.gap"
      :disabled="state.disabled"
      v-model:value="score"
    />
  </Badge>
</template>
```

:::

## APIs

### Rate

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
allowClear | 是否允许再次点击后清除 | boolean | true
allowHalf | 是否允许半选 | boolean | false
count | `star` 总数 | number | 5
character | 自定义字符，预置四种 `svg` 图标 | 'star-outlined' &#124; 'star-filled' &#124; 'heart-outlined' &#124; 'heart-filled' &#124; string &#124; slot | 'star-filled'
size | 字符时是字体高度，图标时是图片大小，单位 `px` | number | 20
color | 字符选中颜色 | string | '#fadb14'
gap | 字符间距，单位 `px` | number | 8
disabled | 只读，无法进行交互 | boolean | false
value <Tag color="cyan">v-model</Tag> | 当前数，受控值 `1,2,3...` | number | 0

## Events

名称 | 说明 | 类型
-- | -- | --
change | 选择时的回调 | (value: number) => void
hoverChange | 鼠标经过时数值变化的回调 | (value: number) => void
