# 进度条 Progress

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*展示操作的当前进度*

## 何时使用

- 当需要显示操作的进度和状态时
- 当需要显示一个操作完成的百分比时

<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(80)

function onIncrease(scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline(scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
</script>

## 基本使用

<Progress :percent="percent" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(80)
</script>
<template>
  <Progress :percent="percent" />
</template>
```

:::

## 进度圈

<Space align="center" gap="middle">
  <Progress type="circle" :width="120" :stroke-width="12" :percent="percent" />
  <Button @click="onDecline(5)" size="large">Decline -</Button>
  <Button @click="onIncrease(5)" size="large">Increase +</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(80)
function onIncrease (scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline (scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
</script>
<template>
  <Space align="center" gap="middle">
    <Progress type="circle" :width="120" :stroke-width="12" :percent="percent" />
    <Button @click="onDecline(5)" size="large">Decline -</Button>
    <Button @click="onIncrease(5)" size="large">Increase +</Button>
  </Space>
</template>
```

:::

## 完成进度条

<Flex vertical>
  <Progress :stroke-width="10" :percent="100" />
  <Progress type="circle" :width="120" :stroke-width="10" :percent="100" />
</Flex>

::: details Show Code

```vue
<template>
  <Flex vertical>
    <Progress :stroke-width="10" :percent="100" />
    <Progress type="circle" :width="120" :stroke-width="10" :percent="100" />
  </Flex>
</template>
```

:::

## 渐变进度条

*strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或 { from: '#108ee9', to: '#87d068', direction: 'right' }*

<br/>

<Flex vertical gap="middle">
  <Progress
    :stroke-width="10"
    :stroke-color="{
      '0%': '#108ee9',
      '100%': '#87d068',
      direction: 'right'
    }"
    :percent="percent"
  />
  <Space align="center" gap="middle">
    <Progress
      type="circle"
      :width="120"
      :stroke-width="12"
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
        direction: 'right'
      }"
      :percent="percent"
    />
    <Button @click="onDecline(5)" size="large">Decline -</Button>
    <Button @click="onIncrease(5)" size="large">Increase +</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(80)
function onIncrease (scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline (scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
</script>
<template>
  <Flex vertical gap="middle">
    <Progress
      :stroke-width="10"
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
        direction: 'right'
      }"
      :percent="percent"
    />
    <Space align="center" gap="middle">
      <Progress
        type="circle"
        :width="120"
        :stroke-width="12"
        :stroke-color="{
          '0%': '#108ee9',
          '100%': '#87d068',
          direction: 'right'
        }"
        :percent="percent"
      />
      <Button @click="onDecline(5)" size="large">Decline -</Button>
      <Button @click="onIncrease(5)" size="large">Increase +</Button>
    </Space>
  </Flex>
</template>
```

:::

## 自定义样式

<Flex vertical gap="middle">
  <Progress
    :stroke-width="28"
    :stroke-color="{
      '0%': '#108ee9',
      '100%': '#87d068',
      direction: 'left'
    }"
    stroke-linecap="butt"
    :percent="percent"
  />
  <Space align="center" gap="middle">
    <Progress
      type="circle"
      :width="180"
      :stroke-width="18"
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
        direction: 'left'
      }"
      stroke-linecap="butt"
      :percent="percent"
    />
    <Button @click="onDecline(5)" size="large">Decline -</Button>
    <Button @click="onIncrease(5)" size="large">Increase +</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(80)
function onIncrease (scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline (scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
</script>
<template>
  <Flex vertical gap="middle">
    <Progress
      :stroke-width="28"
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
        direction: 'left'
      }"
      stroke-linecap="butt"
      :percent="percent"
    />
    <Space align="center" gap="middle">
      <Progress
        type="circle"
        :width="180"
        :stroke-width="18"
        :stroke-color="{
          '0%': '#108ee9',
          '100%': '#87d068',
          direction: 'left'
        }"
        stroke-linecap="butt"
        :percent="percent"
      />
      <Button @click="onDecline(5)" size="large">Decline -</Button>
      <Button @click="onIncrease(5)" size="large">Increase +</Button>
    </Space>
  </Flex>
</template>
```

:::

## 自定义文字

<Space align="center" gap="middle">
  <Progress
    type="circle"
    :width="160"
    :stroke-width="12"
    :percent="percent"
    :format="(percent: number) => `${percent} Days`"
    success="Done"
  />
  <Progress type="circle" :width="160" :stroke-width="12" :percent="percent">
    <template #format="{ percent }">
      <span style="color: magenta">{{ percent }}%</span>
    </template>
    <template #success>
      <span style="color: magenta">Bingo</span>
    </template>
  </Progress>
  <Button @click="onDecline(5)" size="large">Decline -</Button>
  <Button @click="onIncrease(5)" size="large">Increase +</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(80)
function onIncrease (scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline (scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
</script>
<template>
  <Space align="center" gap="middle">
    <Progress
      type="circle"
      :width="160"
      :stroke-width="12"
      :percent="percent"
      :format="(percent: number) => `${percent} Days`"
      success="Done"
    />
    <Progress type="circle" :width="160" :stroke-width="12" :percent="percent">
      <template #format="{ percent }">
        <span style="color: magenta">{{ percent }}%</span>
      </template>
      <template #success>
        <span style="color: magenta">Bingo</span>
      </template>
    </Progress>
    <Button @click="onDecline(5)" size="large">Decline -</Button>
    <Button @click="onIncrease(5)" size="large">Increase +</Button>
  </Space>
</template>
```

:::

## APIs

### Progress

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 进度条总宽度 | number &#124; string | '100%' | false
percent | 当前进度百分比 | number | 0 | false
strokeWidth | 进度条线的宽度，单位`px`，当 `type: 'circle'` 时，单位是进度圈画布宽度的百分比 | number | 8 | false
strokeColor | 进度条的色彩，传入 `string` 时为纯色，传入 `Gradient` 时为渐变，进度圈时 `direction: 'left'` 为逆时针，`direction: 'right'` 为顺时针 | string &#124; [Gradient](#gradient-type) | '#1677FF' | false
strokeLinecap | 进度条的样式 | 'round' &#124; 'butt' &#124; 'square' | 'round' | false
showInfo | 是否显示进度数值或状态图标 | boolean | true | false
format | 内容的模板函数 | (percent: number) => (string &#124; number) &#124; Slot | (percent: number) => percent + '%' | false
type | 进度条类型 | 'line' &#124; 'circle' | 'line' | false

### Gradient Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
'0%' | 起始值 | string | false
'100%' | 终点值 | string | false
from | 起始值 | string | false
to | 终点值 | string | false
direction | 渐变方向 | 'right' &#124; 'left' | false
