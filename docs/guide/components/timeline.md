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
    desc: 'Create a services site 2015-09-01',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 Solve initial network problems 3 2015-09-01',
    color: 'red'
  },
  {
    desc: 'Technical testing 2015-09-01',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2015-09-01'
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
    desc: 'Create a services site 2015-09-01',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 Solve initial network problems 3 2015-09-01',
    color: 'red'
  },
  {
    desc: 'Technical testing 2015-09-01',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2015-09-01'
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
    <span class="u-dot" v-if="index===2"></span>
  </template>
  <template #desc="{ index }">
    <p class="u-desc" v-if="index===2">Create a services site</p>
  </template>
</Timeline>

<style>
.u-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid #1677ff;
  border-radius: 50%;
  background: #FFF;
}
.u-desc {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
}
</style>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timelineData = ref([
  {
    desc: 'Create a services site 2015-09-01',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 Solve initial network problems 3 2015-09-01',
    color: 'red'
  },
  {
    desc: 'Technical testing 2015-09-01',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2015-09-01'
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
      <span class="u-dot" v-if="index===2"></span>
    </template>
    <template #desc="{ index }">
      <p class="u-desc" v-if="index===2">Create a services site</p>
    </template>
  </Timeline>
</template>
<style>
.u-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid #1677ff;
  border-radius: 50%;
  background: #FFF;
}
.u-desc {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
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
    desc: 'Create a services site 2015-09-01',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 Solve initial network problems 3 2015-09-01',
    color: 'red'
  },
  {
    desc: 'Technical testing 2015-09-01',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2015-09-01'
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
