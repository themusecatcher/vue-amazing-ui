# 时间轴 Timeline

<GlobalElement />

*垂直展示的时间流信息*

## 何时使用

- 当有一系列信息需按时间排列时
- 需要有一条时间轴进行视觉上的串联时

<script setup lang="ts">
import { ref } from 'vue'
import { ClockCircleOutlined } from '@ant-design/icons-vue'
const timelineData = ref([
  {
    desc: 'Create a services site 2023-05-24',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 2023-05-24',
    color: 'red'
  },
  {
    desc: 'Technical testing 2023-05-24',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2023-05-24'
  },
  {
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
])
</script>

## 基本使用

<Timeline :timeline-data="timelineData" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timelineData = ref([
  {
    desc: 'Create a services site 2023-05-24',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 2023-05-24',
    color: 'red'
  },
  {
    desc: 'Technical testing 2023-05-24',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2023-05-24'
  },
  {
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
])
</script>
<template>
  <Timeline :timeline-data="timelineData" />
</template>
```

:::

## 自定义样式

<Timeline :timeline-data="timelineData">
  <template #dot="{ index }">
    <span class="big-dot" v-if="index === 2"></span>
    <ClockCircleOutlined v-if="index === 3" style="font-size: 16px; color: #1668dc; background: #fff; border-radius: 50%;" />
  </template>
  <template #desc="{ index }">
    <p class="desc" v-if="index === 2">Create a services site</p>
  </template>
</Timeline>

<style lang="less" scoped>
.big-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid #1677ff;
  border-radius: 50%;
  background: #FFF;
}
.desc {
  font-size: 16px;
  font-weight: 500;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ClockCircleOutlined } from '@ant-design/icons-vue'
const timelineData = ref([
  {
    desc: 'Create a services site 2023-05-24',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 2023-05-24',
    color: 'red'
  },
  {
    desc: 'Technical testing 2023-05-24',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2023-05-24'
  },
  {
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
])
</script>
<template>
  <Timeline :timeline-data="timelineData">
    <template #dot="{ index }">
      <span class="big-dot" v-if="index === 2"></span>
      <ClockCircleOutlined v-if="index === 3" style="font-size: 16px; color: #1668dc; background: #fff; border-radius: 50%;" />
    </template>
    <template #desc="{ index }">
      <p class="desc" v-if="index === 2">Create a services site</p>
    </template>
  </Timeline>
</template>
<style lang="less" scoped>
.big-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid #1677ff;
  border-radius: 50%;
  background: #FFF;
}
.desc {
  font-size: 16px;
  font-weight: 500;
}
</style>
```

:::

## 使用虚线

<Timeline :timeline-data="timelineData" line-style="dashed" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timelineData = ref([
  {
    desc: 'Create a services site 2023-05-24',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 2023-05-24',
    color: 'red'
  },
  {
    desc: 'Technical testing 2023-05-24',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2023-05-24'
  },
  {
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
])
</script>
<template>
  <Timeline :timeline-data="timelineData" line-style="dashed" />
</template>
```

:::

## 右侧时间轴点

<Timeline :timeline-data="timelineData" mode="right" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timelineData = ref([
  {
    desc: 'Create a services site 2023-05-24',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 2023-05-24',
    color: 'red'
  },
  {
    desc: 'Technical testing 2023-05-24',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2023-05-24'
  },
  {
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
])
</script>
<template>
  <Timeline :timeline-data="timelineData" mode="right" />
</template>
```

:::

## 中间时间轴点

*内容从左边开始交替展现*

<br/>

<Timeline :timeline-data="timelineData" mode="center">
  <template #dot="{ index }">
    <span class="big-dot" v-if="index===2"></span>
  </template>
</Timeline>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timelineData = ref([
  {
    desc: 'Create a services site 2023-05-24',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 2023-05-24',
    color: 'red'
  },
  {
    desc: 'Technical testing 2023-05-24',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2023-05-24'
  },
  {
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
])
</script>
<template>
  <Timeline :timeline-data="timelineData" mode="center">
    <template #dot="{ index }">
      <span class="big-dot" v-if="index===2"></span>
    </template>
  </Timeline>
</template>
```

:::

*内容从右边开始交替展现*

<br/>

<Timeline :timeline-data="timelineData" mode="center" position="right">
  <template #dot="{ index }">
    <span class="big-dot" v-if="index===2"></span>
  </template>
</Timeline>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timelineData = ref([
  {
    desc: 'Create a services site 2023-05-24',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 2023-05-24',
    color: 'red'
  },
  {
    desc: 'Technical testing 2023-05-24',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2023-05-24'
  },
  {
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
])
</script>
<template>
  <Timeline :timeline-data="timelineData" mode="center" position="right">
    <template #dot="{ index }">
      <span class="big-dot" v-if="index===2"></span>
    </template>
  </Timeline>
</template>
```

:::

## APIs

### Timeline

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
timelineData | 时间轴内容数组 | [Data](#data-type)[] | []
width | 时间轴区域总宽度，单位 `px` | number &#124; string | '100%'
lineStyle | 时间线样式 | 'solid' &#124; 'dashed' &#124; 'dotted' | 'solid'
mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置 | 'left' &#124; 'center' &#124; 'right' | 'left'
position | 当 `mode` 为 `center` 时，内容交替展现，内容从左边（`left`）开始或者右边（`right`）开始展现 | 'left' &#124; 'right' | 'left'

### Data Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
desc | 文字描述 | string &#124; slot | undefined
color? | 圆圈颜色 | 'blue' &#124; 'green' &#124; 'red' &#124; 'gray' &#124; string | 'blue'
