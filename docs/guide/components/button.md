# 按钮

## 何时使用

- 当需要添加一个操作按钮时

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
function onClick () {
  console.log('click')
}
</script>

## 基本使用

<div class="m-flex">
  <Button @click="onClick">Default</Button>
  <Button effect="reverse" @click="onClick">Reverse</Button>
  <Button type="primary" @click="onClick">Primary</Button>
  <Button type="danger" @click="onClick">Danger</Button>
  <Button disabled @click="onClick">Disabled</Button>
</div>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onClick () {
  console.log('click')
}
</script>
<template>
  <Button @click="onClick">Default</Button>
  <Button effect="reverse" @click="onClick">Reverse</Button>
  <Button type="primary" @click="onClick">Primary</Button>
  <Button type="danger" @click="onClick">Danger</Button>
  <Button disabled @click="onClick">Disabled</Button>
</template>

```

</details>

## 大、中、小三种尺寸

<div class="m-flex">
  <Button size="small" @click="onClick">Small</Button>
  <Button @click="onClick">Default</Button>
  <Button size="large" @click="onClick">Large</Button>
</div>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onClick () {
  console.log('click')
}
</script>
<template>
  <Button size="small" @click="onClick">Small</Button>
  <Button @click="onClick">Default</Button>
  <Button size="large" @click="onClick">Large</Button>
</template>

```

</details>

## 自定义按钮宽高

<Button :width="120" :height="40" @click="onClick">Default</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onClick () {
  console.log('click')
}
</script>
<template>
  <Button :width="120" :height="40" @click="onClick">Default</Button>
</template>

```

</details>

## 加载中状态

<Button @click="onClick" :loading="loading">Default</Button>
<h3>Loading state: <Switch v-model:checked="loading" /></h3>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
function onClick () {
  console.log('click')
}
</script>
<template>
  <Button @click="onClick" :loading="loading">Default</Button>
</template>

```

</details>

<style>
.m-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
