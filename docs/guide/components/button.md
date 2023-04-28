# 按钮 Button

## 何时使用

- 当需要添加一个操作按钮时

## 基本使用

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
function onClick () {
  console.log('click')
}
</script>

<Button class="mr30" @click="onClick">Default Button</Button>
<Button class="mr30" effect="reverse" @click="onClick">Reverse Button</Button>
<Button type="primary" @click="onClick">Primary Button</Button>
<br/>
<Button class="mt20 mr30" type="danger" @click="onClick">Danger Button</Button>
<Button class="mt20 mr30" disabled @click="onClick">Disabled Button</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onClick () {
  console.log('click')
}
</script>
<template>
  <Button @click="onClick">Default Button</Button>
  <Button effect="reverse" @click="onClick">Reverse Button</Button>
  <Button type="primary" @click="onClick">Primary Button</Button>
  <Button type="danger" @click="onClick">Danger Button</Button>
  <Button disabled @click="onClick">Disabled Button</Button>
</template>

```

</details>

## 大、中、小三种尺寸

<Button class="mr30" size="large" @click="onClick">Large Button</Button>
<Button class="mr30" @click="onClick">Default Button</Button>
<Button size="small" @click="onClick">Small Button</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onClick () {
  console.log('click')
}
</script>
<template>
  <Button size="large" @click="onClick">Large Button</Button>
  <Button @click="onClick">Default Button</Button>
  <Button size="small" @click="onClick">Small Button</Button>
</template>

```

</details>

## 自定义按钮宽高

<Button :width="150" :height="40" @click="onClick">Default Button</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onClick () {
  console.log('click')
}
</script>
<template>
  <Button :width="150" :height="40" @click="onClick">Default Button</Button>
</template>

```

</details>

## 加载中状态

<Button @click="onClick" :loading="loading">Default Button</Button>
<h3 class="mt30">Loading state: <Switch v-model:checked="loading" /></h3>

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
  <Button @click="onClick" :loading="loading">Default Button</Button>
</template>

```

</details>

<style>
.mt20 {
  margin-top: 20px;
}
.mr30 {
  margin-right: 30px;
}
</style>