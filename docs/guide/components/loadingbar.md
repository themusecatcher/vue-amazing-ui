# 加载条 LoadingBar

<GlobalElement />

*加载进度条*

## 何时使用

- 加载数据时，显示加载条，提示用户正在加载
- 显示整个页面加载的进度
- 显示上传图片或文件的上传进度

::: tip 使用

- loadingBar.value.start(from = 0, to = 80)  // 开始加载调用
- loadingBar.value.finish() // 结束加载调用
- loadingBar.value.error() // 出现错误调用

:::

<script setup lang="ts">
import { ref } from 'vue'
const loadingBar = ref()
const disabled = ref(true)
const localCardRef = ref()
const localLoadingBar = ref()
const customLoadingBar = ref()
function handleStart () {
  loadingBar.value.start()
  disabled.value = false
}
function handleFinish () {
  loadingBar.value.finish()
  disabled.value = true
}
function handleError () {
  disabled.value = true
  loadingBar.value.error()
}
</script>

## 基本使用

<Space>
  <Button type="primary" @click="handleStart">开始</Button>
  <Button :disabled="disabled" @click="handleFinish">结束</Button>
  <Button type="danger" @click="handleError">报个错</Button>
</Space>
<LoadingBar ref="loadingBar" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const loadingBar = ref()
const disabled = ref(true)
function handleStart() {
  loadingBar.value.start()
  disabled.value = false
}
function handleFinish() {
  loadingBar.value.finish()
  disabled.value = true
}
function handleError() {
  disabled.value = true
  loadingBar.value.error()
}
</script>
<template>
  <Space>
    <Button type="primary" @click="handleStart">开始</Button>
    <Button :disabled="disabled" @click="handleFinish">结束</Button>
    <Button type="danger" @click="handleError">报个错</Button>
  </Space>
  <LoadingBar ref="loadingBar" />
</template>
```

:::

## 局部加载条

<div class="m-container" ref="localCardRef">
  <Space>
    <Button type="primary" @click="localLoadingBar.start()">Start</Button>
    <Button @click="localLoadingBar.finish()">Finish</Button>
    <Button type="danger" @click="localLoadingBar.error()">Error</Button>
  </Space>
</div>
<LoadingBar ref="localLoadingBar" :container-style="{ position: 'absolute' }" :to="localCardRef" />

<style lang="less" scoped>
.m-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 200px;
  padding: 16px 24px;
  border: 1px solid #d9d9d9;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const localCardRef = ref()
const localLoadingBar = ref()
</script>
<template>
  <div class="m-container" ref="localCardRef">
    <Space>
      <Button type="primary" @click="localLoadingBar.start()">Start</Button>
      <Button @click="localLoadingBar.finish()">Finish</Button>
      <Button type="danger" @click="localLoadingBar.error()">Error</Button>
    </Space>
  </div>
  <LoadingBar ref="localLoadingBar" :container-style="{ position: 'absolute' }" :to="localCardRef" />
</template>
<style lang="less" scoped>
.m-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 200px;
  padding: 16px 24px;
  border: 1px solid #d9d9d9;
}
</style>
```

:::

## 自定义加载条样式

<Space>
  <Button type="primary" @click="customLoadingBar.start()">Start</Button>
  <Button @click="customLoadingBar.finish()">Finish</Button>
  <Button type="danger" @click="customLoadingBar.error()">Error</Button>
</Space>
<LoadingBar
  ref="customLoadingBar"
  :loading-bar-size="5"
  color-loading="#2db7f5"
  color-finish="#52c41a"
  color-error="magenta"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const customLoadingBar = ref()
</script>
<template>
  <Space>
    <Button type="primary" @click="customLoadingBar.start()">Start</Button>
    <Button @click="customLoadingBar.finish()">Finish</Button>
    <Button type="danger" @click="customLoadingBar.error()">Error</Button>
  </Space>
  <LoadingBar
    ref="customLoadingBar"
    :loading-bar-size="5"
    color-loading="#2db7f5"
    color-finish="#52c41a"
    color-error="magenta"
  />
</template>
```

:::

## APIs

### LoadingBar

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
containerClass | 加载条容器的类名 | string | undefined
containerStyle | 加载条容器的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
loadingBarSize | 加载条大小，单位 `px` | number | 2
colorLoading | 加载中颜色 | string | '#1677ff'
colorFinish | 加载完成颜色 | string | '#1677ff'
colorError | 加载错误颜色 | string | '#ff4d4f'
to | 加载条的挂载位置，可选：元素标签名（例如 `body`）或者元素本身 | string &#124; HTMLElement | 'body'

## Methods

名称 | 说明 | 类型
:-- | :-- | :--
start | 开始加载的回调函数 | (from = 0, to = 80) => void
finish | 结束加载的回调函数 | () => void
error | 出现错误的回调函数 | () => void
