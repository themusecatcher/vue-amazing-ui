# 评分 Rate

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*评分*

## 何时使用

- 对评价进行展示
- 对事物进行快速的评级操作

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'
import { ThunderboltFilled, LikeFilled, FireFilled } from '@ant-design/icons-vue'
const value = ref(2.99)
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
  console.log('value', value.value)
})
watchEffect(() => {
  console.log('score', score.value)
})
function onChange(value: number) {
  console.log('change', value)
}
function onHoverChange(value: number) {
  console.log('hover change', value)
}
</script>

## 基本使用

<Rate v-model:value="value" @change="onChange" @hoverChange="onHoverChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(2.99)
watchEffect(() => {
  console.log('value', value.value)
})
function onChange(value: number) {
  console.log('change', value)
}
function onHoverChange(value: number) {
  console.log('hover change', value)
}
</script>
<template>
  <Rate v-model:value="value" @change="onChange" @hoverChange="onHoverChange" />
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

## 预置图标

<Space vertical>
  <Rate v-model:value="value" character="star-outlined" :size="24" />
  <Rate v-model:value="value" character="heart-filled" :size="24" />
  <Rate v-model:value="value" character="heart-outlined" :size="24" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(2.99)
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Space vertical>
    <Rate v-model:value="value" character="star-outlined" :size="24" />
    <Rate v-model:value="value" character="heart-filled" :size="24" />
    <Rate v-model:value="value" character="heart-outlined" :size="24" />
  </Space>
</template>
```

:::

## 半星

<Rate v-model:value="value" :size="30" allow-half />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(2.99)
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Rate v-model:value="value" :size="30" allow-half />
</template>
```

:::

## 自定义字符

<Space vertical>
  <Rate v-model:value="value" character="好" :size="32" allow-half />
  <Rate v-model:value="value" character="A" :size="48" allow-half />
  <Rate v-model:value="value" :size="32" allow-half>
    <template #character>
      <ThunderboltFilled />
    </template>
  </Rate>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { ThunderboltFilled } from '@ant-design/icons-vue'
const value = ref(2.99)
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Space vertical>
    <Rate v-model:value="value" character="好" :size="32" allow-half />
    <Rate v-model:value="value" character="A" :size="48" allow-half />
    <Rate v-model:value="value" :size="32" allow-half>
      <template #character>
        <ThunderboltFilled />
      </template>
    </Rate>
  </Space>
</template>
```

:::

## 自定义颜色

<Space vertical>
  <Rate v-model:value="value" color="#1677FF" :size="32" allow-half />
  <Rate v-model:value="value" color="#ff6900" :size="32" allow-half>
    <template #character>
      <LikeFilled />
    </template>
  </Rate>
  <Rate v-model:value="value" color="#d4380d" :size="32" allow-half>
    <template #character>
      <FireFilled />
    </template>
  </Rate>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { LikeFilled, FireFilled } from '@ant-design/icons-vue'
const value = ref(2.99)
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Space vertical>
    <Rate v-model:value="value" color="#1677FF" :size="32" allow-half />
    <Rate v-model:value="value" color="#ff6900" :size="32" allow-half>
      <template #character>
        <LikeFilled />
      </template>
    </Rate>
    <Rate v-model:value="value" color="#d4380d" :size="32" allow-half>
      <template #character>
        <FireFilled />
      </template>
    </Rate>
  </Space>
</template>
```

:::

## 自定义间距

<Rate v-model:value="value" :size="32" :gap="16" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(2.99)
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Rate v-model:value="value" :size="32" :gap="16" />
</template>
```

:::

## 自定义 star 总数

<Rate v-model:value="value" :size="32" :count="10" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(2.99)
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <Rate v-model:value="value" :size="32" :count="10" />
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
    <Flex gap="small" vertical>
      character:<Input v-model:value="state.customCharacter" placeholder="customCharacter" />
    </Flex>
  </Col>
</Row>
<Badge :value="score" style="margin-top: 30px">
  <Rate
    v-model:value="score"
    :allow-clear="state.allowClear"
    :allow-half="state.allowHalf"
    :count="state.count"
    :character="state.character === 'custom-character' ? state.customCharacter : state.character"
    :size="state.size"
    :color="state.color"
    :gap="state.gap"
    :disabled="state.disabled"
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
      <Flex gap="small" vertical>
        character:<Input v-model:value="state.customCharacter" placeholder="customCharacter" />
      </Flex>
    </Col>
  </Row>
  <Badge :value="score" style="margin-top: 30px">
    <Rate
      v-model:value="score"
      :allow-clear="state.allowClear"
      :allow-half="state.allowHalf"
      :count="state.count"
      :character="state.character === 'custom-character' ? state.customCharacter : state.character"
      :size="state.size"
      :color="state.color"
      :gap="state.gap"
      :disabled="state.disabled"
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
character | 自定义字符，预置四种图标 | 'star-outlined' &#124; 'star-filled' &#124; 'heart-outlined' &#124; 'heart-filled' &#124; string &#124; slot | 'star-filled'
size | 字符大小，单位 `px` | number | 20
color | 字符选中颜色 | string | '#fadb14'
gap | 字符间距，单位 `px` | number | 8
disabled | 只读，无法进行交互 | boolean | false
value <Tag color="cyan">v-model</Tag> | 当前数，受控值 `0,1,2,3...` | number | 0

## Events

名称 | 说明 | 类型
-- | -- | --
change | 选择时的回调 | (value: number) => void
hoverChange | 鼠标经过时数值变化的回调 | (value: number) => void
