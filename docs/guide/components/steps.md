# 步骤条 Steps

<GlobalElement />

*引导用户按照流程完成任务的导航条*

## 何时使用

- 当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'
import type { StepsProps, StepsItem } from 'vue-amazing-ui'
import { generate } from '@ant-design/colors'
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  },
  {
    title: 'Step 4',
    description: 'description 4'
  },
  {
    title: 'Step 5',
    description: 'description 5'
  }
])
const minStepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1'
  },
  {
    title: 'Step 2'
  },
  {
    title: 'Step 3'
  },
  {
    title: 'Step 4'
  },
  {
    title: 'Step 5'
  }
])
const current = ref(3)
const primaryColor = ref('#ff6900')
watchEffect(() => {
  console.log('current', current.value)
})
const sizeOptions = [
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'small',
    value: 'small'
  }
]
const size = ref('small')
const placeOptions = [
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'bottom',
    value: 'bottom'
  }
]
const place = ref('bottom')
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--steps-primary-color': color,
    '--steps-primary-color-hover': color,
    '--steps-icon-color': colorPalettes[0],
    '--steps-icon-color-hover': color
  }
  return style
}
function onChange(index: number) {
  // 父组件获取切换后的选中步骤
  console.log('change', index)
}
function onPrev() {
  if (current.value > 1) {
    current.value--
  }
}
function onNext() {
  if (stepsItems.value.length >= current.value) {
    current.value++
  }
}
const state = reactive<StepsProps>({
  size: 'default',
  vertical: false,
  labelPlacement: 'right',
  dotted: false,
  current: 3
})
</script>

## 基本使用

<Steps :items="stepsItems" :current="current" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { StepsItem } from 'vue-amazing-ui'
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref(2)
watchEffect(() => {
  console.log('current', current.value)
})
function onChange(index: number) {
  // 父组件获取切换后的选中步骤
  console.log('change', index)
}
</script>
<template>
  <Steps :items="stepsItems" :current="current" @change="onChange" />
</template>
```

:::

## 标签放置位置

<Flex vertical>
  <Radio :options="placeOptions" v-model:value="place" button button-style="solid" />
  <Steps :items="stepsItems" :label-placement="place" :current="current" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { StepsItem } from 'vue-amazing-ui'
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const placeOptions = [
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'bottom',
    value: 'bottom'
  }
]
const place = ref('bottom')
const current = ref(2)
watchEffect(() => {
  console.log('current', current.value)
})
</script>
<template>
  <Flex vertical>
    <Radio :options="placeOptions" v-model:value="place" button button-style="solid" />
    <Steps :items="stepsItems" :label-placement="place" :current="current" />
  </Flex>
</template>
```

:::

## 迷你版

<Flex vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Steps :items="minStepsItems" :size="size" :current="current" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { StepsItem } from 'vue-amazing-ui'
const minStepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1'
  },
  {
    title: 'Step 2'
  },
  {
    title: 'Step 3'
  }
])
const sizeOptions = [
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'small',
    value: 'small'
  }
]
const size = ref('small')
const current = ref(2)
watchEffect(() => {
  console.log('current', current.value)
})
</script>
<template>
  <Flex vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Steps :items="minStepsItems" :size="size" :current="current" />
  </Flex>
</template>
```

:::

## 垂直步骤条

<Space :gap="120">
  <Steps :items="stepsItems" vertical :current="current" />
  <Steps :items="stepsItems" vertical size="small" :current="current" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { StepsItem } from 'vue-amazing-ui'
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref(2)
watchEffect(() => {
  console.log('current', current.value)
})
</script>
<template>
  <Space :gap="120">
    <Steps :items="stepsItems" vertical :current="current" />
    <Steps :items="stepsItems" vertical size="small" :current="current" />
  </Space>
</template>
```

:::

## 点状步骤条

<Space vertical>
  <Steps :items="stepsItems" dotted v-model:current="current" />
  <Steps :items="stepsItems" vertical dotted v-model:current="current" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { StepsItem } from 'vue-amazing-ui'
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref(2)
watchEffect(() => {
  console.log('current', current.value)
})
</script>
<template>
  <Space vertical>
    <Steps :items="stepsItems" dotted v-model:current="current" />
    <Steps :items="stepsItems" vertical dotted v-model:current="current" />
  </Space>
</template>
```

:::

## 可点击

*设置 `v-model:current` 后即可点击*

<br/>

<Flex vertical>
  <Space>
    <Button @click="onPrev">Prev</Button>
    <Button @click="onNext">Next</Button>
  </Space>
  <Steps :items="stepsItems" v-model:current="current" />
  <Steps :items="stepsItems" vertical v-model:current="current" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { StepsItem } from 'vue-amazing-ui'
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref(2)
watchEffect(() => {
  console.log('current', current.value)
})
function onPrev () {
  if (current.value > 1) {
    current.value--
  }
}
function onNext () {
  if (steps.value.length >= current.value) {
    current.value++
  }
}
</script>
<template>
  <Flex vertical>
    <Space>
      <Button @click="onPrev">Prev</Button>
      <Button @click="onNext">Next</Button>
    </Space>
    <Steps :items="stepsItems" v-model:current="current" />
    <Steps :items="stepsItems" vertical v-model:current="current" />
  </Flex>
</template>
```

:::

## 自定义主题色

<Flex vertical>
  <Space align="center">
    stepsPrimaryColor:
    <ColorPicker style="width: 200px" v-model:value="primaryColor" />
  </Space>
  <Steps :style="getThemeStyle(primaryColor)" :items="stepsItems" v-model:current="current" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { StepsItem } from 'vue-amazing-ui'
import { generate } from '@ant-design/colors'
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref(2)
const primaryColor = ref('#ff6900')
watchEffect(() => {
  console.log('current', current.value)
})
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--steps-primary-color': color,
    '--steps-primary-color-hover': color,
    '--steps-icon-color': colorPalettes[0],
    '--steps-icon-color-hover': color
  }
  return style
}
</script>
<template>
  <Flex vertical>
    <Space align="center">
      stepsPrimaryColor:
      <ColorPicker style="width: 200px" v-model:value="primaryColor" />
    </Space>
    <Steps :style="getThemeStyle(primaryColor)" :items="stepsItems" v-model:current="current" />
  </Flex>
</template>
```

:::

## 步骤条配置器

<Row :gutter="24">
  <Col :span="6">
    <Space gap="small" vertical>
      size:
      <Radio :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
    </Space>
  </Col>
  <Col :span="6">
    <Space gap="small" vertical>
      vertical:
      <Switch v-model="state.vertical" />
    </Space>
  </Col>
  <Col :span="6">
    <Space gap="small" vertical>
      labelPlacement:
      <Radio :options="placeOptions" v-model:value="state.labelPlacement" button button-style="solid" />
    </Space>
  </Col>
  <Col :span="6">
    <Space gap="small" vertical>
      dotted:
      <Switch v-model="state.dotted" />
    </Space>
  </Col>
</Row>
<Steps
  class="mt30"
  :items="stepsItems"
  :size="state.size"
  :vertical="state.vertical"
  :label-placement="state.labelPlacement"
  :dotted="state.dotted"
  v-model:current="current"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { StepsProps, StepsItem } from 'vue-amazing-ui'
const stepsItems = ref<StepsItem[]>([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref(2)
watchEffect(() => {
  console.log('current', current.value)
})
const sizeOptions = [
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'small',
    value: 'small'
  }
]
const placeOptions = [
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'bottom',
    value: 'bottom'
  }
]
const state = reactive<StepsProps>({
  size: 'default',
  vertical: false,
  labelPlacement: 'right',
  dotted: false,
  current: 3
})
</script>
<template>
  <Row :gutter="24">
    <Col :span="6">
      <Space gap="small" vertical>
        size:
        <Radio :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        vertical:
        <Switch v-model="state.vertical" />
      </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        labelPlacement:
        <Radio :options="placeOptions" v-model:value="state.labelPlacement" button button-style="solid" />
      </Space>
    </Col>
    <Col :span="6">
      <Space gap="small" vertical>
        dotted:
        <Switch v-model="state.dotted" />
      </Space>
    </Col>
  </Row>
  <Steps
    class="mt30"
    :items="stepsItems"
    :size="state.size"
    :vertical="state.vertical"
    :label-placement="state.labelPlacement"
    :dotted="state.dotted"
    v-model:current="current"
  />
</template>
<style lang="less" scoped>
.mt30 {
  margin-top: 30px;
}
</style>
```

:::

<style lang="less" scoped>
.mt30 {
  margin-top: 30px;
}
</style>

## APIs

### Steps

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
items | 步骤数组 | [Item](#item-type)[] | []
width | 步骤条总宽度，单位 `px` | number &#124; string | 'auto'
size | 步骤条大小 | 'default' &#124; 'small' | 'default'
vertical | 是否使用垂直步骤条，当 `vertical: true` `时，labelPlacement` 自动设为 `right` | boolean | false
labelPlacement | 标签放置位置，默认放图标右侧，可选 `bottom` 放图标下方 | 'right' &#124; 'bottom' | 'right'
dotted | 是否使用点状步骤条，当 `dotted: true` 且 `vertical: false` 时，`labelPlacement` 将自动设为 `bottom` | boolean | false
current <Tag color="cyan">v-model</Tag> | 当前选中的步骤，设置 `v-model` 后，`Steps` 变为可点击状态。从 `1` 开始计数 | number | 1

### Item Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
title? | 标题 | string | undefined
description? | 描述 | string | undefined

## Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 点击切换步骤时触发 | (index: number) => void
