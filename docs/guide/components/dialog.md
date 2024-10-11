# 对话框 Dialog

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*弹出的对话框*

## 何时使用

- 在当前页面正中打开一个浮层，承载相应的操作或者展示内容

<script setup lang="ts">
import { ref } from 'vue'

const open1 = ref(false)
const open2 = ref(false)
const open3 = ref(false)
const open4 = ref(false)
const open5 = ref(false)
const open6 = ref(false)
const open7 = ref(false)
const open8 = ref(false)
const open9 = ref(false)
const loading = ref(false)
function onCancel() { // 点击遮罩层或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() { // 点击确定回调
  open1.value = false
  open2.value = false
  open3.value = false
  open4.value = false
  open5.value = false
  open6.value = false
  open7.value = false
  open8.value = false
  open9.value = false
}
function handleCancel () {
  open4.value = false
}
function handleOk () {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    open4.value = false
  }, 2000)
}
function onLoadingOk() { // 点击确定回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    open8.value = false
    loading.value = false
  }, 2000)
}
</script>

## 基本使用

<Button type="primary" @click="open1 = true">Open Dialog</Button>
<Dialog v-model:open="open1" title="Title" @cancel="onCancel" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function onCancel() {
  console.log('cancel')
}
function onOk () {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">Open Dialog</Button>
  <Dialog v-model:open="open" title="Title" @cancel="onCancel" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 自定义宽高

<Button type="primary" @click="open2 = true">Open Dialog</Button>
<Dialog v-model:open="open2" :width="480" :height="180" @ok="onOk">
  <template #title>Title</template>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function onOk () {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">Open Dialog</Button>
  <Dialog v-model:open="open" :width="480" :height="180" @ok="onOk">
    <template #title>Title</template>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 自定义按钮文字 & 类型

<Button type="primary" @click="open3 = true">Open Dialog</Button>
<Dialog v-model:open="open3" title="Title" cancelText="cancel" okText="ok" okType="danger" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function onOk () {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">Open Dialog</Button>
  <Dialog v-model:open="open" title="Title" cancelText="cancel" okText="ok" okType="danger" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 自定义底部按钮

<Button type="primary" @click="open4 = true">Open Dialog</Button>
<Dialog
  v-model:open="open4"
  title="Title"
  cancel-text="Return"
  :cancel-props="{ type: 'danger', ghost: true }"
  ok-text="Submit"
  :ok-props="{ type: 'primary', ghost: true,loading: loading }"
  @ok="handleOk"
>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function handleCancel () {
  open.value = false
}
function handleOk () {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    open.value = false
  }, 2000)
}
</script>
<template>
  <Button type="primary" @click="open = true">Open Dialog</Button>
  <Dialog
    v-model:open="open4"
    title="Title"
    cancel-text="Return"
    :cancel-props="{ type: 'danger', ghost: true }"
    ok-text="Submit"
    :ok-props="{ type: 'primary', ghost: true,loading: loading }"
    @ok="handleOk"
  >
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 隐藏底部按钮

<Button type="primary" @click="open5 = true">Open Dialog</Button>
<Dialog v-model:open="open5" title="Title" :footer="false" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function onOk () {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">Open Dialog</Button>
  <Dialog v-model:open="open" title="Title" :footer="false" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 固定高度

<Button type="primary" @click="open6 = true">Open Dialog</Button>
<Dialog v-model:open="open6" title="Title" :centered="false" :top="120" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function onOk () {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">Open Dialog</Button>
  <Dialog v-model:open="open" title="Title" :centered="false" :top="120" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 切换全屏

<Button type="primary" @click="open7 = true">Open Dialog</Button>
<Dialog v-model:open="open7" title="Title" switch-fullscreen @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function onOk () {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">Open Dialog</Button>
  <Dialog v-model:open="open" title="Title" switch-fullscreen @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 提交 loading

<Button type="primary" @click="open8 = true">Open Dialog</Button>
<Dialog v-model:open="open8" title="Title" :loading="loading" @ok="onLoadingOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
const loading = ref(false)
function onLoadingOk() { // 点击确定回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    open.value = false
    loading.value = false
  }, 2000)
}
</script>
<template>
  <Button type="primary" @click="open = true">Open Dialog</Button>
  <Dialog v-model:open="open" title="Title" :loading="loading" @ok="onLoadingOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## body 样式自定义

<Button type="primary" @click="open9 = true">Open Dialog</Button>
<Dialog
  v-model:open="open9"
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
const open = ref(false)
function onOk () {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">Open Dialog</Button>
  <Dialog
    v-model:open="open"
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

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
title | 标题 | string &#124; slot | undefined
content | 内容 | string &#124; slot | undefined
width | 对话框宽度，单位 `px` | number | 540
height | 对话框高度，默认 `auto`，自适应内容高度 | number &#124; string | 'auto'
cancelText | 取消按钮文字 | string | '取消'
cancelProps | 取消按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
okText | 确定按钮文字 | string | '确定'
okType | 确定按钮类型 | 'primary' &#124; 'danger' | 'primary'
okProps | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
bodyStyle | 设置对话框 `body` 样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
footer | 是否显示底部按钮 | boolean &#124; slot | true
centered | 是否水平垂直居中，否则固定高度水平居中 | boolean | true
top | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | string &#124; number | 100
switchFullscreen | 是否允许切换全屏，允许后右上角会出现一个按钮 | boolean | false
loading | 确定按钮 `loading` | boolean | false
open | 对话框是否可见 | boolean | false

## Events

名称 | 说明 | 类型
-- | -- | --
cancel | 点击遮罩层或右上角叉或取消按钮的回调 | () => void
ok | 点击确定回调 | () => void
