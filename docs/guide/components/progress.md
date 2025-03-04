# 进度条 Progress

<GlobalElement />

*展示操作的当前进度*

## 何时使用

- 当需要显示操作的进度和状态时
- 当需要显示一个操作完成的百分比时

<script setup lang="ts">
import { h, ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { ProgressProps } from 'vue-amazing-ui'
const percent = ref(80)
const lineCapOptions = [
  {
    label: 'round',
    value: 'round'
  },
  {
    label: 'butt',
    value: 'butt'
  }
]
const lineCap = ref<ProgressProps['lineCap']>('butt')
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

<Space align="center">
  <Progress type="circle" :percent="percent" />
  <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
  <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
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
  <Space align="center">
    <Progress type="circle" :percent="percent" />
    <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
    <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
  </Space>
</template>
```

:::

## 完成进度条

<Flex vertical>
  <Progress :percent="100" />
  <Progress type="circle" :percent="100" />
</Flex>

::: details Show Code

```vue
<template>
  <Flex vertical>
    <Progress :percent="100" />
    <Progress type="circle" :percent="100" />
  </Flex>
</template>
```

:::

## 渐变进度条

*`strokeColor`: `{ '0%': '#108ee9', '100%': '#87d068', direction: 'right' }` 或 `{ from: '#108ee9', to: '#87d068', direction: 'right' }`*

<br/>

<Flex vertical>
  <Progress
    :line-color="{
      '0%': '#108ee9',
      '100%': '#87d068'
    }"
    :percent="percent"
  />
  <Space align="center">
    <Progress
      type="circle"
      :line-color="{
        '0%': '#108ee9',
        '100%': '#87d068'
      }"
      :percent="percent"
    />
    <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
    <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
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
  <Flex vertical>
    <Progress
      :line-color="{
        '0%': '#108ee9',
        '100%': '#87d068'
      }"
      :percent="percent"
    />
    <Space align="center">
      <Progress
        type="circle"
        :line-color="{
          '0%': '#108ee9',
          '100%': '#87d068'
        }"
        :percent="percent"
      />
      <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
      <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
    </Space>
  </Flex>
</template>
```

:::

## 自定义样式

<Flex vertical>
  <Progress
    style="--progress-success-color: #ff6900"
    :line-size="24"
    :line-color="{
      '0%': '#108ee9',
      '100%': '#87d068',
      direction: 'left'
    }"
    :info-size="24"
    :percent="percent"
  />
  <Space align="center">
    <Progress
      style="--progress-success-color: #ff6900"
      type="circle"
      :width="180"
      :line-size="14"
      :line-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
        direction: 'left'
      }"
      :info-size="28"
      :percent="percent"
    />
    <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
    <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
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
  <Flex vertical>
    <Progress
      style="--progress-success-color: #ff6900"
      :line-size="24"
      :line-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
        direction: 'left'
      }"
      :info-size="24"
      :percent="percent"
    />
    <Space align="center">
      <Progress
        style="--progress-success-color: #ff6900"
        type="circle"
        :width="180"
        :line-size="14"
        :line-color="{
          '0%': '#108ee9',
          '100%': '#87d068',
          direction: 'left'
        }"
        :info-size="28"
        :percent="percent"
      />
      <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
      <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
    </Space>
  </Flex>
</template>
```

:::

## 自定义边缘形状

<Flex vertical>
  <Radio :options="lineCapOptions" v-model:value="lineCap" button button-style="solid" />
  <Progress
    :line-size="20"
    :line-color="{
      '0%': 'white',
      '100%': 'pink'
    }"
    :line-cap="lineCap"
    :info-size="20"
    :percent="percent"
  />
  <Space align="center">
    <Progress
      type="circle"
      :width="160"
      :line-size="12"
      :line-color="{
        '0%': '#e3f2fd',
        '100%': '#2080f0'
      }"
      :line-cap="lineCap"
      :info-size="24"
      :percent="percent"
    />
    <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
    <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { ProgressProps } from 'vue-amazing-ui'
const percent = ref(80)
const lineCapOptions = [
  {
    label: 'round',
    value: 'round'
  },
  {
    label: 'butt',
    value: 'butt'
  }
]
const lineCap = ref<ProgressProps['lineCap']>('butt')
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
  <Flex vertical>
    <Radio :options="lineCapOptions" v-model:value="lineCap" button button-style="solid" />
    <Progress
      :line-size="20"
      :line-color="{
        '0%': 'white',
        '100%': 'pink'
      }"
      :line-cap="lineCap"
      :info-size="20"
      :percent="percent"
    />
    <Space align="center">
      <Progress
        type="circle"
        :width="160"
        :line-size="12"
        :line-color="{
          '0%': '#e3f2fd',
          '100%': '#2080f0'
        }"
        :line-cap="lineCap"
        :info-size="24"
        :percent="percent"
      />
      <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
      <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
    </Space>
  </Flex>
</template>
```

:::

## 自定义文字

<Flex vertical>
  <Progress
    :line-size="20"
    :info-size="20"
    :percent="percent"
    :format="(percent: number) => `$${percent}`"
    success="Done"
  />
  <Progress style="--success-color: #d48806" :line-size="20" :info-size="20" :percent="percent">
    <template #format="{ percent }">
      <span style="color: #d4380d">{{ percent }}%</span>
    </template>
    <template #success>
      <span style="color: #d48806">Bingo</span>
    </template>
  </Progress>
  <Space align="center">
    <Progress
      type="circle"
      :width="160"
      :line-size="12"
      :info-size="24"
      :percent="percent"
      :format="(percent: number) => `${percent} Days`"
      success="Done"
    />
    <Progress style="--success-color: #d48806" type="circle" :width="160" :line-size="12" :info-size="24" :percent="percent">
      <template #format="{ percent }">
        <span style="color: #d4380d">{{ percent }}%</span>
      </template>
      <template #success>
        <span style="color: #d48806">Bingo</span>
      </template>
    </Progress>
    <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
    <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
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
  <Flex vertical>
    <Progress
      :line-size="20"
      :info-size="20"
      :percent="percent"
      :format="(percent: number) => `$${percent}`"
      success="Done"
    />
    <Progress style="--success-color: #d48806" :line-size="20" :info-size="20" :percent="percent">
      <template #format="{ percent }">
        <span style="color: #d4380d">{{ percent }}%</span>
      </template>
      <template #success>
        <span style="color: #d48806">Bingo</span>
      </template>
    </Progress>
    <Space align="center">
      <Progress
        type="circle"
        :width="160"
        :line-size="12"
        :info-size="24"
        :percent="percent"
        :format="(percent: number) => `${percent} Days`"
        success="Done"
      />
      <Progress style="--success-color: #d48806" type="circle" :width="160" :line-size="12" :info-size="24" :percent="percent">
        <template #format="{ percent }">
          <span style="color: #d4380d">{{ percent }}%</span>
        </template>
        <template #success>
          <span style="color: #d48806">Bingo</span>
        </template>
      </Progress>
      <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
      <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
    </Space>
  </Flex>
</template>
```

:::

## APIs

### Progress

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
width | 进度条宽度，单位 `px`；`type: 'line'` 时，为进度条宽度，默认值 `'100%'`；`type: 'circle'` 时，为进度圈宽高，默认值 `120` | string &#124; number | undefined
percent | 当前进度百分比 | number | 0
lineSize | 进度条的尺寸，单位 `px`；`type: 'line'` 时，为进度条线高，默认值 `8`；`type: 'circle'` 时，单位是进度圈画布宽度的百分比，默认值 `6` | number | undefined
lineColor | 进度条的色彩，传入 `string` 时为纯色，传入 `Gradient` 时为渐变；进度圈时 `direction: 'left'` 为逆时针，`direction: 'right'` 为顺时针 | string &#124; [Gradient](#gradient-type) | '#1677FF'
lineCap | 进度条边缘的形状 | 'round' &#124; 'butt' | 'round'
showInfo | 是否显示进度数值或状态图标 | boolean | true
infoSize | 进度数值或状态图标的尺寸，单位 `px`；`type: 'line'` 时，默认值 `14`；`type: 'circle'` 时，默认值 `24` | number | undefined
success | 进度完成时的信息 | string &#124; slot | undefined
format | 内容的模板函数 | (percent: number) => (string &#124; number) &#124; slot | (percent: number) => percent + '%'
type | 进度条类型 | 'line' &#124; 'circle' | 'line'

### Gradient Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
'0%'? | 起始值 | string | undefined
'100%'? | 终点值 | string | undefined
from? | 起始值 | string | undefined
to? | 终点值 | string | undefined
direction? | 渐变方向 | 'right' &#124; 'left' | 'right'

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
success | 自定义进度完成时的信息 | v-slot:success
format | 自定义格式化内容 | v-slot:format="{ percent }"
