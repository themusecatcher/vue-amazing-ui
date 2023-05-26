# 时间轴 Timeline

<br/>

*垂直展示的时间流信息*

## 何时使用

- 当有一系列信息需按时间排列时
- 需要有一条时间轴进行视觉上的串联时

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

## 基本使用

<Timeline :timeline-data="timelineData" />

<details>
<summary>查看代码</summary>

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

</details>

## 自定义样式

<Timeline :timeline-data="timelineData">
  <template #dot="{ index }">
    <span class="dot" v-if="index===2"></span>
  </template>
  <template #desc="{ index }">
    <p class="desc" v-if="index===2">Create a services site</p>
  </template>
</Timeline>

<style>
.dot {
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

<details>
<summary>查看代码</summary>

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
  <Timeline :timeline-data="timelineData">
    <template #dot="{ index }">
      <span class="dot" v-if="index===2"></span>
    </template>
    <template #desc="{ index }">
      <p class="desc" v-if="index===2">Create a services site</p>
    </template>
  </Timeline>
</template>
<style>
.dot {
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

</details>

## 使用虚线

<Timeline :timeline-data="timelineData" line-style="dashed" />

<details>
<summary>查看代码</summary>

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

</details>

## APIs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
name |  |  |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change |  |
