# 步骤条 Steps

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*引导用户按照流程完成任务的导航条*

## 何时使用

- 当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'
const steps = ref([
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
const minSteps = ref([
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
const current = ref(2)
watchEffect(() => {
  console.log('current:', current.value)
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
function onChange(index: number) {
  // 父组件获取切换后的选中步骤
  console.log('change:', index)
}
function onPrev() {
  if (current.value > 1) {
    current.value--
  }
}
function onNext() {
  if (steps.value.length >= current.value) {
    current.value++
  }
}
const state = reactive({
  size: 'default',
  vertical: false,
  labelPlacement: 'right',
  dotted: false,
  current: 3
})
</script>

## 基本使用

<Steps :steps="steps" :current="current" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const steps = ref([
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
  console.log('current:', current.value)
})
function onChange(index: number) {
  // 父组件获取切换后的选中步骤
  console.log('change:', index)
}
</script>
<template>
  <Steps :steps="steps" :current="current" @change="onChange" />
</template>
```

:::

## 标签放置位置

<Flex vertical>
  <Radio :options="placeOptions" v-model:value="place" button button-style="solid" />
  <Steps :steps="steps" :label-placement="place" :current="current" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const steps = ref([
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
  console.log('current:', current.value)
})
</script>
<template>
  <Flex vertical>
    <Radio :options="placeOptions" v-model:value="place" button button-style="solid" />
    <Steps :steps="steps" :label-placement="place" :current="current" />
  </Flex>
</template>
```

:::

## 迷你版

<Flex vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Steps :steps="minSteps" :size="size" :current="current" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const minSteps = ref([
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
  console.log('current:', current.value)
})
</script>
<template>
  <Flex vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Steps :steps="minSteps" :size="size" :current="current" />
  </Flex>
</template>
```

:::

## 垂直步骤条

<Space :gap="120">
  <Steps :steps="steps" vertical :current="current" />
  <Steps :steps="steps" vertical size="small" :current="current" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const steps = ref([
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
  console.log('current:', current.value)
})
</script>
<template>
  <Space :gap="120">
    <Steps :steps="steps" vertical :current="current" />
    <Steps :steps="steps" vertical size="small" :current="current" />
  </Space>
</template>
```

:::

## 点状步骤条

<Space vertical>
  <Steps :steps="steps" dotted v-model:current="current" />
  <Steps :steps="steps" vertical dotted v-model:current="current" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const steps = ref([
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
  console.log('current:', current.value)
})
</script>
<template>
  <Space vertical>
    <Steps :steps="steps" dotted v-model:current="current" />
    <Steps :steps="steps" vertical dotted v-model:current="current" />
  </Space>
</template>
```

:::

## 可点击

*设置 v-model:current 后即可点击*

<br/>

<Space>
  <Button @click="onPrev">Prev</Button>
  <Button @click="onNext">Next</Button>
</Space>
<br/>
<br/>
<Steps :steps="steps" v-model:current="current" />
<br/>
<Steps :steps="steps" vertical v-model:current="current" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const steps = ref([
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
  console.log('current:', current.value)
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
  <Space>
    <Button @click="onPrev">Prev</Button>
    <Button @click="onNext">Next</Button>
  </Space>
  <br/>
  <br/>
  <Steps :steps="steps" v-model:current="current" />
  <br/>
  <Steps :steps="steps" vertical v-model:current="current" />
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
  :steps="steps"
  :size="state.size"
  :vertical="state.vertical"
  :label-placement="state.labelPlacement"
  :dotted="state.dotted"
  :current="current"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const steps = ref([
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
  console.log('current:', current.value)
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
const state = reactive({
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
    :steps="steps"
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
-- | -- | -- | --
steps | 步骤数组 | [Step](#step-type)[] | []
width | 步骤条总宽度，单位 `px` | number &#124; string | 'auto'
size | 步骤条大小 | 'default' &#124; 'small' | 'default'
vertical | 是否使用垂直步骤条，当 `vertical: true` `时，labelPlacement` 自动设为 `right` | boolean | false
labelPlacement | 标签放置位置，默认放图标右侧，可选 `bottom` 放图标下方 | 'right' &#124; 'bottom' | 'right'
dotted | 是否使用点状步骤条，当 `dotted: true` 且 `vertical: false` 时，`labelPlacement` 将自动设为 `bottom` | boolean | false
current <Tag color="cyan">v-model</Tag> | 当前选中的步骤，设置 `v-model` 后，`Steps` 变为可点击状态。从 `1` 开始计数 | number | 1

### Step Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
title? | 标题 | string | undefined
description? | 描述 | string | undefined

## Events

名称 | 说明 | 类型
-- | -- | --
change | 点击切换步骤时触发 | (index: number) => void
