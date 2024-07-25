# 对话框 Dialog

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## 何时使用

- 在当前页面正中打开一个浮层，承载相应的操作或者展示内容

<script setup lang="ts">
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show8 = ref(false)
const show9 = ref(false)
const loading = ref(false)
function onCancel() { // 点击遮罩层或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() { // 点击确定回调
  show1.value = false
  show2.value = false
  show3.value = false
  show4.value = false
  show5.value = false
  show6.value = false
  show7.value = false
  show8.value = false
  show9.value = false
}
function handleCancel () {
  show4.value = false
}
function handleOk () {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    show4.value = false
  }, 2000)
}
function onLoadingOk() { // 点击确定回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    show8.value = false
    loading.value = false
  }, 2000)
}
</script>

## 基本使用

<Button type="primary" @click="show1 = true">Open Dialog</Button>
<Dialog v-model:show="show1" title="Title" @cancel="onCancel" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function onCancel() {
  console.log('cancel')
}
function onOk () {
  show.value = false
}
</script>
<template>
  <Button type="primary" @click="show = true">Open Dialog</Button>
  <Dialog v-model:show="show" title="Title" @cancel="onCancel" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 自定义宽高

<Button type="primary" @click="show2 = true">Open Dialog</Button>
<Dialog v-model:show="show2" :width="480" :height="180" @ok="onOk">
  <template #title>Title</template>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function onOk () {
  show.value = false
}
</script>
<template>
  <Button type="primary" @click="show = true">Open Dialog</Button>
  <Dialog v-model:show="show" :width="480" :height="180" @ok="onOk">
    <template #title>Title</template>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 自定义按钮文字 & 类型

<Button type="primary" @click="show3 = true">Open Dialog</Button>
<Dialog v-model:show="show3" title="Title" cancelText="cancel" okText="ok" okType="danger" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function onOk () {
  show.value = false
}
</script>
<template>
  <Button type="primary" @click="show = true">Open Dialog</Button>
  <Dialog v-model:show="show" title="Title" cancelText="cancel" okText="ok" okType="danger" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 自定义底部按钮

<Button type="primary" @click="show4 = true">Open Dialog</Button>
<Dialog v-model:show="show4" title="Title">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <template #footer>
    <Button @click="handleCancel">Return</Button>
    <Button type="primary" style="margin-left: 8px;" :loading="loading" @click="handleOk">Submit</Button>
  </template>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function handleCancel () {
  show.value = false
}
function handleOk () {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    show.value = false
  }, 2000)
}
</script>
<template>
  <Button type="primary" @click="show = true">Open Dialog</Button>
  <Dialog v-model:show="show" title="Title">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <template #footer>
      <Button @click="handleCancel">Return</Button>
      <Button type="primary" style="margin-left: 8px;" :loading="loading" @click="handleOk">Submit</Button>
    </template>
  </Dialog>
</template>
```

:::

## 隐藏底部按钮

<Button type="primary" @click="show5 = true">Open Dialog</Button>
<Dialog v-model:show="show5" title="Title" :footer="false" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function onOk () {
  show.value = false
}
</script>
<template>
  <Button type="primary" @click="show = true">Open Dialog</Button>
  <Dialog v-model:show="show" title="Title" :footer="false" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 固定高度

<Button type="primary" @click="show6 = true">Open Dialog</Button>
<Dialog v-model:show="show6" title="Title" :center="false" :top="120" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function onOk () {
  show.value = false
}
</script>
<template>
  <Button type="primary" @click="show = true">Open Dialog</Button>
  <Dialog v-model:show="show" title="Title" :center="false" :top="120" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 切换全屏

<Button type="primary" @click="show7 = true">Open Dialog</Button>
<Dialog v-model:show="show7" title="Title" switch-fullscreen @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function onOk () {
  show.value = false
}
</script>
<template>
  <Button type="primary" @click="show = true">Open Dialog</Button>
  <Dialog v-model:show="show" title="Title" switch-fullscreen @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 提交 loading

<Button type="primary" @click="show8 = true">Open Dialog</Button>
<Dialog v-model:show="show8" title="Title" :loading="loading" @ok="onLoadingOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const loading = ref(false)
function onLoadingOk() { // 点击确定回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    show.value = false
    loading.value = false
  }, 2000)
}
</script>
<template>
  <Button type="primary" @click="show = true">Open Dialog</Button>
  <Dialog v-model:show="show" title="Title" :loading="loading" @ok="onLoadingOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## body 样式自定义

<Button type="primary" @click="show9 = true">Open Dialog</Button>
<Dialog
  v-model:show="show9"
  title="Title"
  :body-style="{ fontSize: '20px', color: '#eb2f96' }"
  @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function onOk () {
  show.value = false
}
</script>
<template>
  <Button type="primary" @click="show = true">Open Dialog</Button>
  <Dialog
    v-model:show="show"
    title="Title"
    :body-style="{ fontSize: '20px', color: '#eb2f96' }"
    @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

<style lang="less" scoped>
p {
  line-height: 1.5714285714285714;
}
</style>

## APIs

### Dialog

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
title | 标题 | string &#124; slot | '提示' | false
content | 内容 | string &#124; slot | '' | false
width | 宽度，单位 `px` | number | 540 | false
height | 高度，默认 `auto`，自适应内容高度 | number &#124; string | 'auto' | false
cancelText | 取消按钮文字 | string | '取消' | false
okText | 确定按钮文字 | string | '确定' | false
okType | 确定按钮类型 | 'primary' &#124; 'danger' | 'primary' | false | false
footer | 是否显示底部按钮 | boolean &#124; slot | true | false
center | `true`: 水平垂直居中；`false`: 固定高度水平居中 | boolean | true | false
top | 固定高度水平居中时，距顶部高度，仅当 `center: false` 时生效，单位 `px` | number | 100 | false
switchFullscreen | 是否允许切换全屏，允许后右上角会出现一个按钮 | boolean | false | false
loading | 确定按钮 `loading` | boolean | false | false
bodyStyle | 对话框 `body` 样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} | false
show | 对话框是否可见 | boolean | false | false

## Events

名称 | 说明 | 类型
-- | -- | --
cancel | 点击遮罩层或右上角叉或取消按钮的回调 | () => void
ok | 点击确定回调 | () => void
