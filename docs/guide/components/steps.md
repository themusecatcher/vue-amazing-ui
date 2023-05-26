# 步骤条 Steps

<br/>

*引导用户按照流程完成任务的导航条*

## 何时使用

- 当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务

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

function onChange (index: number) { // 父组件获取切换后的选中步骤
  console.log('current:', index)
}
function onPrevious () {
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

## 基本使用

<Steps :steps="steps" :current="current" />

<details>
<summary>查看代码</summary>

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
</script>
<template>
  <Steps :steps="steps" :current="current" />
</template>
```

</details>

## 可点击

*设置 v-model: current 后即可点击*

<br/>

<Steps :steps="steps" v-model:current="current" @change="onChange" />

<br/>

<Button @click="onPrevious()" class="mt30 mr30">Previous</Button>
<Button @click="onNext()">Next</Button>

<details>
<summary>查看代码</summary>

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
function onChange (index: number) { // 父组件获取切换后的选中步骤
  console.log('current:', index)
}
function onPrevious () {
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
  <Steps :steps="steps" v-model:current="current" @change="onChange" />
  <Button @click="onPrevious()" class="mt30 mr30">Previous</Button>
  <Button @click="onNext()">Next</Button>
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
