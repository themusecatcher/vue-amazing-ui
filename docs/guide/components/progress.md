# 进度条 Progress

<br/>

*展示操作的当前进度*

## 何时使用

- 当需要显示当前进度和状态时
- 当需要显示一个操作完成的百分比时

<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)
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

## 基本使用

<Progress :percent="percent" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)
</script>
<template>
  <Progress :percent="percent" />
</template>
```

</details>

## 完成进度条

<Progress width="100%" :percent="100" />

<details>
<summary>查看代码</summary>

```vue
<template>
  <Progress width="100%" :percent="100" />
</template>
```

</details>

## 渐变进度条

**strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或 { from: '#108ee9', to: '#87d068', direction: 'right' }**

<br/>

<Progress
  :percent="percent"
  :strokeColor="{
    '0%': '#108ee9',
    '100%': '#87d068',
    direction: 'right'
  }" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)
</script>
<template>
  <Progress
  :percent="percent"
  :strokeColor="{
    '0%': '#108ee9',
    '100%': '#87d068',
    direction: 'right'
  }" />
</template>
```

</details>

## 进度圈

<Progress
  :width="120"
  :percent="percent"
  type="circle" />

<br/>

<Button @click="onDecline(5)" size="large" style="margin-right: 30px; margin-top: 30px;">Decline-</Button>
<Button @click="onIncrease(5)" size="large">Increase+</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)
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
  <Progress
    :width="120"
    :percent="percent"
    type="circle" />
  <br/>
  <Button @click="onDecline(5)" size="large" style="margin-right: 30px; margin-top: 30px;">Decline-</Button>
  <Button @click="onIncrease(5)" size="large">Increase+</Button>
</template>
```

</details>
