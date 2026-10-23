# 时间轴 Timeline

<GlobalElement />

_垂直或水平展示的时间流信息_

## 何时使用

- 当有一系列信息需按时间排列时
- 需要有一条时间轴进行视觉上的串联时

<script setup lang="ts">
import { ref } from 'vue'
import { ClockCircleOutlined, SmileOutlined } from '@ant-design/icons-vue'
import type { TimelineItemProps, TimelineProps } from 'vue-amazing-ui'
type TimelineMode = NonNullable<TimelineProps['mode']>
type TimelineStart = NonNullable<TimelineProps['start']>
type TimelineLineType = NonNullable<TimelineProps['lineType']>
const timelineItems: TimelineItemProps[] = [
  { content: 'Create a services site 2025-06-24 10:10', color: 'green' },
  { content: 'Solve initial network problems 2025-06-24 10:10', color: 'red' },
  { content: 'Technical testing 2025-06-24 10:10', color: 'blue' },
  { content: 'Network problems being solved 2025-06-24 10:10' },
  { content: 'Network problems being solved 2 2025-06-24 10:10', color: 'gray' }
]
const reverse = ref(false)
// 水平节演示用独立状态：与「进行中与倒序」节的 reverse 解耦，避免一节的操作串扰另一节
const horizontal = ref(true)
const horizontalReverse = ref(false)
const mode = ref<TimelineMode>('left')
const modeOptions: { label: string; value: TimelineMode }[] = [
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' },
  { label: 'alternate', value: 'alternate' }
]
const start = ref<TimelineStart>('right')
const startOptions: { label: string; value: TimelineStart }[] = [
  { label: 'right', value: 'right' },
  { label: 'left', value: 'left' }
]
const lineType = ref<TimelineLineType>('solid')
const lineTypeOptions: { label: string; value: TimelineLineType }[] = [
  { label: 'solid', value: 'solid' },
  { label: 'dashed', value: 'dashed' },
  { label: 'dotted', value: 'dotted' }
]
</script>

## 基本使用

<Timeline>
  <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item" />
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import type { TimelineItemProps } from 'vue-amazing-ui'
const timelineItems: TimelineItemProps[] = [
  { content: 'Create a services site 2025-06-24 10:10', color: 'green' },
  { content: 'Solve initial network problems 2025-06-24 10:10', color: 'red' },
  { content: 'Technical testing 2025-06-24 10:10', color: 'blue' },
  { content: 'Network problems being solved 2025-06-24 10:10' },
  { content: 'Network problems being solved 2 2025-06-24 10:10', color: 'gray' }
]
</script>
<template>
  <Timeline>
    <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item" />
  </Timeline>
</template>
```

:::::

## 圆圈颜色

<Timeline>
  <TimelineItem color="green" content="Create a services site 2025-06-24 10:10" />
  <TimelineItem color="green" content="Create a services site 2025-06-24 10:10" />
  <TimelineItem color="red">
    <p>Solve initial network problems 1</p>
    <p>Solve initial network problems 2</p>
    <p>Solve initial network problems 3 2025-06-24 10:10</p>
  </TimelineItem>
  <TimelineItem>
    <p>Technical testing 1</p>
    <p>Technical testing 2</p>
    <p>Technical testing 3 2025-06-24 10:10</p>
  </TimelineItem>
  <TimelineItem color="gray">
    <p>Technical testing 1</p>
    <p>Technical testing 2</p>
    <p>Technical testing 3 2025-06-24 10:10</p>
  </TimelineItem>
  <TimelineItem color="gray">
    <p>Technical testing 1</p>
    <p>Technical testing 2</p>
    <p>Technical testing 3 2025-06-24 10:10</p>
  </TimelineItem>
  <TimelineItem color="#00ccff">
    <template #dot>
      <SmileOutlined />
    </template>
    <p>Custom color testing</p>
  </TimelineItem>
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Timeline>
    <TimelineItem color="green" content="Create a services site 2025-06-24 10:10" />
    <TimelineItem color="green" content="Create a services site 2025-06-24 10:10" />
    <TimelineItem color="red">
      <p>Solve initial network problems 1</p>
      <p>Solve initial network problems 2</p>
      <p>Solve initial network problems 3 2025-06-24 10:10</p>
    </TimelineItem>
    <TimelineItem>
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3 2025-06-24 10:10</p>
    </TimelineItem>
    <TimelineItem color="gray">
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3 2025-06-24 10:10</p>
    </TimelineItem>
    <TimelineItem color="gray">
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3 2025-06-24 10:10</p>
    </TimelineItem>
    <TimelineItem color="#00ccff">
      <template #dot>
        <SmileOutlined />
      </template>
      <p>Custom color testing</p>
    </TimelineItem>
  </Timeline>
</template>
```

:::::

## 自定义时间轴点

<Timeline>
  <TimelineItem content="Create a services site 2025-06-24 10:10" />
  <TimelineItem content="Custom dot">
    <template #dot>
      <span class="big-dot"></span>
    </template>
  </TimelineItem>
  <TimelineItem content="Custom icon">
    <template #dot>
      <ClockCircleOutlined class="dot-icon" />
    </template>
  </TimelineItem>
  <TimelineItem>
    <template #dot>
      <span class="big-dot"></span>
    </template>
    <p class="desc">Custom content</p>
    <p>Create a services site 2025-06-24 10:10</p>
  </TimelineItem>
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import { ClockCircleOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Timeline>
    <TimelineItem content="Create a services site 2025-06-24 10:10" />
    <TimelineItem content="Custom dot">
      <template #dot>
        <span class="big-dot"></span>
      </template>
    </TimelineItem>
    <TimelineItem content="Custom icon">
      <template #dot>
        <ClockCircleOutlined class="dot-icon" />
      </template>
    </TimelineItem>
    <TimelineItem>
      <template #dot>
        <span class="big-dot"></span>
      </template>
      <p class="desc">Custom content</p>
      <p>Create a services site 2025-06-24 10:10</p>
    </TimelineItem>
  </Timeline>
</template>
<style lang="less" scoped>
.big-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid var(--va-primary-color);
  border-radius: 50%;
  background: var(--va-bg-container-color);
}
.dot-icon {
  font-size: 16px;
  color: var(--va-primary-color);
  background: var(--va-bg-container-color);
  border-radius: 50%;
}
.desc {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
}
</style>
```

:::::

## 标题与时间

_节点按 `title` / `content` / `time` 渲染为三段结构，分别可用 `title` / `default` / `footer` 插槽覆盖_

<br/>

<Timeline>
  <TimelineItem content="Create a services site" color="success" />
  <TimelineItem title="Success" content="Build completed" time="2025-06-24 10:10" color="success" />
  <TimelineItem content="Integration test failed" time="2025-06-24 10:10" color="error" />
  <TimelineItem title="Warning" content="Bundle size exceeds limit" time="2025-06-24 10:10" color="warning" />
  <TimelineItem
    title="Info"
    content="Release notes published"
    time="2025-06-24 10:10"
    color="info"
    line-type="dashed"
  />
  <TimelineItem content="Release archived" color="gray" />
</Timeline>

::::: details Show Code

```vue
<template>
  <Timeline>
    <TimelineItem content="Create a services site" color="success" />
    <TimelineItem title="Success" content="Build completed" time="2025-06-24 10:10" color="success" />
    <TimelineItem content="Integration test failed" time="2025-06-24 10:10" color="error" />
    <TimelineItem title="Warning" content="Bundle size exceeds limit" time="2025-06-24 10:10" color="warning" />
    <TimelineItem
      title="Info"
      content="Release notes published"
      time="2025-06-24 10:10"
      color="info"
      line-type="dashed"
    />
    <TimelineItem content="Release archived" color="gray" />
  </Timeline>
</template>
```

:::::

## 标签

_任一节点提供 `label` 时整条时间轴切换为左右分栏，可用 `mode` 镜像或交替_

::: tip 提示
左右分栏由 `:has()` 选择器实现（`Chrome` `105+` / `Safari` `15.4+` / `Firefox` `121+`）：更低的浏览器版本会退化为「标签在内容上方」的普通布局，其余特性不受影响。
:::

<br/>

<Space align="center" style="margin-bottom: 20px">
  mode:
  <Segmented v-model:value="mode" :options="modeOptions" />
</Space>

<Timeline :mode="mode">
  <TimelineItem label="2025-06-24 10:10" content="Create a services" />
  <TimelineItem label="2025-06-24 10:10" content="Solve initial network problems" />
  <TimelineItem content="Technical testing" />
  <TimelineItem label="2025-06-24 10:10" content="Network problems being solved">
    <template #label>
      <strong class="label-strong">2025-06-24 10:10</strong>
    </template>
  </TimelineItem>
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TimelineProps } from 'vue-amazing-ui'
type TimelineMode = NonNullable<TimelineProps['mode']>
const mode = ref<TimelineMode>('left')
const modeOptions: { label: string; value: TimelineMode }[] = [
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' },
  { label: 'alternate', value: 'alternate' }
]
</script>
<template>
  <Space align="center" style="margin-bottom: 20px">
    mode:
    <Segmented v-model:value="mode" :options="modeOptions" />
  </Space>
  <Timeline :mode="mode">
    <TimelineItem label="2025-06-24 10:10" content="Create a services" />
    <TimelineItem label="2025-06-24 10:10" content="Solve initial network problems" />
    <TimelineItem content="Technical testing" />
    <TimelineItem label="2025-06-24 10:10" content="Network problems being solved">
      <template #label>
        <strong class="label-strong">2025-06-24 10:10</strong>
      </template>
    </TimelineItem>
  </Timeline>
</template>
<style lang="less" scoped>
.label-strong {
  color: var(--va-error-color);
}
</style>
```

:::::

## 尺寸

<Flex gap="large" align="flex-start" wrap="wrap">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">small</span>
    <Timeline size="small">
      <TimelineItem content="Create a services site" color="success" />
      <TimelineItem content="Network problems being solved" />
    </Timeline>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">middle</span>
    <Timeline size="middle">
      <TimelineItem content="Create a services site" color="success" />
      <TimelineItem content="Network problems being solved" />
    </Timeline>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">large</span>
    <Timeline size="large">
      <TimelineItem content="Create a services site" color="success" />
      <TimelineItem content="Network problems being solved" />
    </Timeline>
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">icon-size=20</span>
    <Timeline :icon-size="20">
      <TimelineItem content="Create a services site" color="success">
        <template #dot>
          <ClockCircleOutlined />
        </template>
      </TimelineItem>
      <TimelineItem content="Network problems being solved">
        <template #dot>
          <ClockCircleOutlined />
        </template>
      </TimelineItem>
    </Timeline>
  </Flex>
</Flex>

::::: details Show Code

```vue
<script setup lang="ts">
import { ClockCircleOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Flex gap="large" align="flex-start" wrap="wrap">
    <Flex vertical gap="small" align="start">
      <span class="demo-label">small</span>
      <Timeline size="small">
        <TimelineItem content="Create a services site" color="success" />
        <TimelineItem content="Network problems being solved" />
      </Timeline>
    </Flex>
    <Flex vertical gap="small" align="start">
      <span class="demo-label">middle</span>
      <Timeline size="middle">
        <TimelineItem content="Create a services site" color="success" />
        <TimelineItem content="Network problems being solved" />
      </Timeline>
    </Flex>
    <Flex vertical gap="small" align="start">
      <span class="demo-label">large</span>
      <Timeline size="large">
        <TimelineItem content="Create a services site" color="success" />
        <TimelineItem content="Network problems being solved" />
      </Timeline>
    </Flex>
    <Flex vertical gap="small" align="start">
      <span class="demo-label">icon-size=20</span>
      <Timeline :icon-size="20">
        <TimelineItem content="Create a services site" color="success">
          <template #dot>
            <ClockCircleOutlined />
          </template>
        </TimelineItem>
        <TimelineItem content="Network problems being solved">
          <template #dot>
            <ClockCircleOutlined />
          </template>
        </TimelineItem>
      </Timeline>
    </Flex>
  </Flex>
</template>
<style lang="less" scoped>
.demo-label {
  color: var(--va-text-color-3);
  font-size: 13px;
  line-height: 22px;
}
</style>
```

:::::

## 线型

_容器级 `line-type` 统一设置线型，节点级 `line-type` 可单独覆盖_

<br/>

<Space align="center" style="margin-bottom: 20px">
  line-type:
  <Segmented v-model:value="lineType" :options="lineTypeOptions" />
</Space>

<Timeline :line-type="lineType">
  <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item" />
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TimelineItemProps, TimelineProps } from 'vue-amazing-ui'
type TimelineLineType = NonNullable<TimelineProps['lineType']>
const timelineItems: TimelineItemProps[] = [
  { content: 'Create a services site 2025-06-24 10:10', color: 'green' },
  { content: 'Solve initial network problems 2025-06-24 10:10', color: 'red' },
  { content: 'Technical testing 2025-06-24 10:10', color: 'blue' },
  { content: 'Network problems being solved 2025-06-24 10:10' },
  { content: 'Network problems being solved 2 2025-06-24 10:10', color: 'gray' }
]
const lineType = ref<TimelineLineType>('solid')
const lineTypeOptions: { label: string; value: TimelineLineType }[] = [
  { label: 'solid', value: 'solid' },
  { label: 'dashed', value: 'dashed' },
  { label: 'dotted', value: 'dotted' }
]
</script>
<template>
  <Space align="center" style="margin-bottom: 20px">
    line-type:
    <Segmented v-model:value="lineType" :options="lineTypeOptions" />
  </Space>
  <Timeline :line-type="lineType">
    <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item" />
  </Timeline>
</template>
```

:::::

## 右侧时间轴点

<Timeline mode="right">
  <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item" />
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import type { TimelineItemProps } from 'vue-amazing-ui'
const timelineItems: TimelineItemProps[] = [
  { content: 'Create a services site 2025-06-24 10:10', color: 'green' },
  { content: 'Solve initial network problems 2025-06-24 10:10', color: 'red' },
  { content: 'Technical testing 2025-06-24 10:10', color: 'blue' },
  { content: 'Network problems being solved 2025-06-24 10:10' },
  { content: 'Network problems being solved 2 2025-06-24 10:10', color: 'gray' }
]
</script>
<template>
  <Timeline mode="right">
    <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item" />
  </Timeline>
</template>
```

:::::

## 交替展现

_`alternate` 模式轴线居中、内容左右交替，`start` 决定首个内容出现的一侧_

<br/>

<Space align="center" style="margin-bottom: 20px">
  start:
  <Segmented v-model:value="start" :options="startOptions" />
</Space>

<Timeline mode="alternate" :start="start">
  <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item">
    <template #dot>
      <span class="big-dot" v-if="index === 2"></span>
    </template>
  </TimelineItem>
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TimelineItemProps, TimelineProps } from 'vue-amazing-ui'
type TimelineStart = NonNullable<TimelineProps['start']>
const timelineItems: TimelineItemProps[] = [
  { content: 'Create a services site 2025-06-24 10:10', color: 'green' },
  { content: 'Solve initial network problems 2025-06-24 10:10', color: 'red' },
  { content: 'Technical testing 2025-06-24 10:10', color: 'blue' },
  { content: 'Network problems being solved 2025-06-24 10:10' },
  { content: 'Network problems being solved 2 2025-06-24 10:10', color: 'gray' }
]
const start = ref<TimelineStart>('right')
const startOptions: { label: string; value: TimelineStart }[] = [
  { label: 'right', value: 'right' },
  { label: 'left', value: 'left' }
]
</script>
<template>
  <Space align="center" style="margin-bottom: 20px">
    start:
    <Segmented v-model:value="start" :options="startOptions" />
  </Space>
  <Timeline mode="alternate" :start="start">
    <TimelineItem v-for="(item, index) in timelineItems" :key="index" v-bind="item">
      <template #dot>
        <span class="big-dot" v-if="index === 2"></span>
      </template>
    </TimelineItem>
  </Timeline>
</template>
<style lang="less" scoped>
.big-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid var(--va-primary-color);
  border-radius: 50%;
  background: var(--va-bg-container-color);
}
</style>
```

:::::

## 节点位置

_`alternate` 模式下节点的 `position` 可单独指定内容所在侧，覆盖奇偶默认位置_

<br/>

<Timeline mode="alternate">
  <TimelineItem content="Create a services site 2025-06-24 10:10" time="2025-06-24 10:10" color="success" />
  <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" color="error" position="right" />
  <TimelineItem content="Technical testing" time="2025-06-24 10:10" color="warning" position="left" />
  <TimelineItem content="Network problems being solved" time="2025-06-24 10:10" color="info" />
</Timeline>

::::: details Show Code

```vue
<template>
  <Timeline mode="alternate">
    <TimelineItem content="Create a services site 2025-06-24 10:10" time="2025-06-24 10:10" color="success" />
    <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" color="error" position="right" />
    <TimelineItem content="Technical testing" time="2025-06-24 10:10" color="warning" position="left" />
    <TimelineItem content="Network problems being solved" time="2025-06-24 10:10" color="info" />
  </Timeline>
</template>
```

:::::

## 水平时间轴

_水平排列，可与 `reverse` 倒序组合；内容超出时容器可横向滚动_

<br/>

<Space align="center" style="margin-bottom: 20px">
  horizontal:
  <Switch v-model:value="horizontal" />
  reverse:
  <Switch v-model:value="horizontalReverse" />
</Space>

<Timeline :horizontal="horizontal" :reverse="horizontalReverse">
  <TimelineItem title="Create" content="Create a services site" time="2025-06-24 10:10" color="success" />
  <TimelineItem title="Error" content="Solve initial network problems" time="2025-06-24 10:10" color="error" />
  <TimelineItem title="Warning" content="Technical testing" time="2025-06-24 10:10" color="warning" />
  <TimelineItem title="Info" content="Network problems being solved" time="2025-06-24 10:10" color="info" />
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const horizontal = ref(true)
const horizontalReverse = ref(false)
</script>
<template>
  <Space align="center" style="margin-bottom: 20px">
    horizontal:
    <Switch v-model:value="horizontal" />
    reverse:
    <Switch v-model:value="horizontalReverse" />
  </Space>
  <Timeline :horizontal="horizontal" :reverse="horizontalReverse">
    <TimelineItem title="Create" content="Create a services site" time="2025-06-24 10:10" color="success" />
    <TimelineItem title="Error" content="Solve initial network problems" time="2025-06-24 10:10" color="error" />
    <TimelineItem title="Warning" content="Technical testing" time="2025-06-24 10:10" color="warning" />
    <TimelineItem title="Info" content="Network problems being solved" time="2025-06-24 10:10" color="info" />
  </Timeline>
</template>
```

:::::

## 嵌套时间轴

<Timeline>
  <TimelineItem title="Release" content="Create a services site" time="2025-06-24 10:10" color="success">
    <Timeline>
      <TimelineItem content="Technical testing 1" time="2025-06-24 10:10" />
      <TimelineItem content="Technical testing 2" time="2025-06-24 10:10" color="error" />
    </Timeline>
  </TimelineItem>
  <TimelineItem content="Network problems being solved" time="2025-06-24 10:10" color="warning" />
</Timeline>

::::: details Show Code

```vue
<template>
  <Timeline>
    <TimelineItem title="Release" content="Create a services site" time="2025-06-24 10:10" color="success">
      <Timeline>
        <TimelineItem content="Technical testing 1" time="2025-06-24 10:10" />
        <TimelineItem content="Technical testing 2" time="2025-06-24 10:10" color="error" />
      </Timeline>
    </TimelineItem>
    <TimelineItem content="Network problems being solved" time="2025-06-24 10:10" color="warning" />
  </Timeline>
</template>
```

:::::

## 进行中与倒序

<Button type="primary" style="margin-bottom: 20px" @click="reverse = !reverse">Toggle Reverse</Button>

<Timeline pending="Recording..." :reverse="reverse">
  <TimelineItem content="Create a services site" time="2025-06-24 10:10" />
  <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" />
  <TimelineItem content="Technical testing" time="2025-06-24 10:10" />
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const reverse = ref(false)
</script>
<template>
  <Button type="primary" style="margin-bottom: 20px" @click="reverse = !reverse">Toggle Reverse</Button>
  <Timeline pending="Recording..." :reverse="reverse">
    <TimelineItem content="Create a services site" time="2025-06-24 10:10" />
    <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" />
    <TimelineItem content="Technical testing" time="2025-06-24 10:10" />
  </Timeline>
</template>
```

:::::

## 自定义幽灵节点

_`pending` 传 `true` 时只表示进行中、不渲染内容；`pendingDot` 属性或 `#pendingDot` 插槽可替换内置加载环，`#pending` 插槽可替换内容_

<br/>

<Timeline :pending="true">
  <TimelineItem content="Create a services site" time="2025-06-24 10:10" />
  <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" />
</Timeline>

<br/>

<Timeline pending="Recording...">
  <TimelineItem content="Create a services site" time="2025-06-24 10:10" />
  <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" />
  <template #pendingDot>
    <ClockCircleOutlined class="dot-icon" />
  </template>
</Timeline>

::::: details Show Code

```vue
<script setup lang="ts">
import { ClockCircleOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Timeline :pending="true">
    <TimelineItem content="Create a services site" time="2025-06-24 10:10" />
    <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" />
  </Timeline>
  <Timeline pending="Recording...">
    <TimelineItem content="Create a services site" time="2025-06-24 10:10" />
    <TimelineItem content="Solve initial network problems" time="2025-06-24 10:10" />
    <template #pendingDot>
      <ClockCircleOutlined class="dot-icon" />
    </template>
  </Timeline>
</template>
<style lang="less" scoped>
.dot-icon {
  font-size: 16px;
  color: var(--va-primary-color);
  background: var(--va-bg-container-color);
  border-radius: 50%;
}
</style>
```

:::::

<style lang="less" scoped>
.big-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid var(--va-primary-color);
  border-radius: 50%;
  background: var(--va-bg-container-color);
}
.dot-icon {
  font-size: 16px;
  color: var(--va-primary-color);
  background: var(--va-bg-container-color);
  border-radius: 50%;
}
.desc {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
}
.label-strong {
  color: var(--va-error-color);
}
.demo-label {
  color: var(--va-text-color-3);
  font-size: 13px;
  line-height: 22px;
}
</style>

## APIs

### Timeline Props

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
mode | 时间轴与内容的相对位置，`alternate` 为轴线居中、内容左右交替 | 'left' &#124; 'alternate' &#124; 'right' | 'left'
start | `alternate` 模式下内容先从哪一侧出现 | 'left' &#124; 'right' | 'right'
reverse | 节点是否倒序排列 | boolean | false
horizontal | 是否水平排列，内容超出时容器可横向滚动 | boolean | false
size | 尺寸档位，控制轴点大小、节点间距与标题字号 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
iconSize | 轴点区域的边长，同时决定连线起点与内容偏移，单位 `px` | number | undefined
lineType | 整轴线型，时间轴项可通过同名属性覆盖 | 'solid' &#124; 'dashed' &#124; 'dotted' | 'solid'
pending | 幽灵节点：为 `true` 时只表示进行中，字符串或 `VNode` 作为其内容 | boolean &#124; string &#124; VNode | false
pendingDot | 幽灵节点的轴点，未指定时使用内置加载环 | string &#124; VNode | undefined

### TimelineItem Props

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
title | 标题，位于内容上方 | string | undefined
content | 内容 | string | undefined
time | 时间，位于内容下方 | string &#124; number | undefined
label | 左侧标签，任一节点带 `label` 时整条时间轴切换为左右分栏布局 | string | undefined
color | 轴点颜色，支持预设语义色（`primary` / `success` / `warning` / `error` / `info` / `default`）、色名（`blue` / `green` / `red` / `gray`）与任意 CSS 颜色，预设名大小写不敏感；未指定时轴点走主题主色 | string | undefined
lineType | 单独覆盖该节点的线型 | 'solid' &#124; 'dashed' &#124; 'dotted' | 继承 `Timeline` 的 `lineType`
position | `alternate` 模式下单独指定该节点内容所在侧（`label` 左右分栏与水平排列下不生效） | 'left' &#124; 'right' | undefined

## Slots

### Timeline Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 时间轴节点 | v-slot:default
pending | 幽灵节点的内容 | v-slot:pending
pendingDot | 幽灵节点的轴点 | v-slot:pendingDot

### TimelineItem Slots

名称 | 说明 | 用法
:-- | :-- | :--
default | 内容区，优先于 `content` | v-slot:default
dot | 自定义轴点 | v-slot:dot
label | 左侧标签，优先于 `label` | v-slot:label
title | 标题，优先于 `title` | v-slot:title
footer | 底部信息，优先于 `time` | v-slot:footer
