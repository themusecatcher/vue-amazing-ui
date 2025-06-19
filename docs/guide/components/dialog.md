# 对话框 Dialog

<GlobalElement />

_弹出的对话框_

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
const open10 = ref(false)
const open11 = ref(false)
const open12 = ref(false)
const open13 = ref(false)
const confirmLoading = ref(false)
function onCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定的回调
  open1.value = false
  open2.value = false
  open3.value = false
  open4.value = false
  open5.value = false
  open6.value = false
  open7.value = false
  open8.value = false
  open9.value = false
  open10.value = false
  open11.value = false
  open12.value = false
  console.log('ok')
}
function handleCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function handleOk() {
  // 点击确定回调
  confirmLoading.value = true // 开启加载状态
  setTimeout(() => {
    confirmLoading.value = false
    open13.value = false
    console.log('ok')
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
function openDialog() {
  open = true
}
function onCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定的回调
  console.log('ok')
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="openDialog">Open Dialog</Button>
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

<Dialog v-model:open="open2" :width="480" :height="200" @cancel="onCancel" @ok="onOk">
  <template #title>Title</template>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function openDialog() {
  open = true
}
function onCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定的回调
  console.log('ok')
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="openDialog">Open Dialog</Button>
  <Dialog v-model:open="open" :width="480" :height="200" @cancel="onCancel" @ok="onOk">
    <template #title>Title</template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Dialog>
</template>
```

:::

## 自定义样式

<Space>
  <Button type="primary" @click="open3 = true">Custom Body Class Dialog</Button>
  <Button type="primary" @click="open4 = true">Custom Body & Mask Style Dialog</Button>
  <Button type="primary" @click="open5 = true">Custom Title & Content Style Dialog</Button>
</Space>
<Dialog v-model:open="open3" title="Title" body-class="custom-class" @cancel="onCancel" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>
<Dialog
  v-model:open="open4"
  title="Title"
  :body-style="{
    padding: '24px',
    borderRadius: '16px'
  }"
  :mask-style="{
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }"
  @cancel="onCancel"
  @ok="onOk"
>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>
<Dialog
  v-model:open="open5"
  title="Title"
  :title-style="{
    fontSize: '18px',
    color: '#d4380d'
  }"
  :content-style="{
    fontSize: '16px',
    color: '#d4380d'
  }"
  @cancel="onCancel"
  @ok="onOk"
>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

<style lang="less" scoped>
:deep(.custom-class) {
  .dialog-header {
    color: #ff6900 !important;
  }
  .dialog-content {
    color: #ff6900 !important;
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open1 = ref(false)
const open2 = ref(false)
const open3 = ref(false)
function onCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定的回调
  console.log('ok')
  open1.value = false
  open2.value = false
  open3.value = false
}
</script>
<template>
  <Space>
    <Button type="primary" @click="open1 = true">Custom Body Class Dialog</Button>
    <Button type="primary" @click="open2 = true">Custom Body & Mask Style Dialog</Button>
    <Button type="primary" @click="open3 = true">Custom Title & Content Style Dialog</Button>
  </Space>
  <Dialog v-model:open="open1" title="Title" body-class="custom-class" @cancel="onCancel" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
  <Dialog
    v-model:open="open2"
    title="Title"
    :body-style="{
      padding: '24px',
      borderRadius: '16px'
    }"
    :mask-style="{
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }"
    @cancel="onCancel"
    @ok="onOk"
  >
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
  <Dialog
    v-model:open="open3"
    title="Title"
    :title-style="{
      fontSize: '18px',
      color: '#d4380d'
    }"
    :content-style="{
      fontSize: '16px',
      color: '#d4380d'
    }"
    @cancel="onCancel"
    @ok="onOk"
  >
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
<style lang="less" scoped>
:deep(.custom-class) {
  .dialog-header {
    color: #ff6900 !important;
  }
  .dialog-content {
    color: #ff6900 !important;
  }
}
</style>
```

:::

## 自定义按钮

<Button type="primary" @click="open6 = true">Custom Btns Dialog</Button>

<Dialog
  v-model:open="open6"
  title="Title"
  cancel-text="Return"
  :cancel-props="{ type: 'danger', ghost: true }"
  ok-text="Submit"
  :ok-props="{ type: 'primary', ghost: true }"
  @cancel="onCancel"
  @ok="onOk"
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
function openDialog() {
  open = true
}
function onCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定的回调
  console.log('ok')
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="openDialog">Custom Btns Dialog</Button>
  <Dialog
    v-model:open="open"
    title="Title"
    cancel-text="Return"
    :cancel-props="{ type: 'danger', ghost: true }"
    ok-text="Submit"
    :ok-props="{ type: 'primary', ghost: true }"
    @cancel="onCancel"
    @ok="onOk"
  >
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 隐藏底部按钮

<Button type="primary" @click="open7 = true">Open Dialog</Button>

<Dialog v-model:open="open7" title="Title" :footer="false" @cancel="onCancel" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function openDialog() {
  open = true
}
function onCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定的回调
  console.log('ok')
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="openDialog">Open Dialog</Button>
  <Dialog v-model:open="open" title="Title" :footer="false" @cancel="onCancel" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 切换全屏

<Button type="primary" @click="open8 = true">Open Dialog</Button>

<Dialog v-model:open="open8" title="Title" switch-fullscreen @cancel="onCancel" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function openDialog() {
  open = true
}
function onCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定的回调
  console.log('ok')
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="openDialog">Open Dialog</Button>
  <Dialog v-model:open="open" title="Title" switch-fullscreen @cancel="onCancel" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 自定义位置

<Space>
  <Button type="primary" @click="open9 = true">Fixed Top Number Dialog</Button>
  <Button type="primary" @click="open10 = true">Fixed Top Percent Dialog</Button>
  <Button type="primary" @click="open11 = true">Vertically Centered Dialog</Button>
</Space>
<Dialog v-model:open="open9" title="60px Top Title" :top="60" @cancel="onCancel" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>
<Dialog v-model:open="open10" title="20% Top Title" top="20%" @cancel="onCancel" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>
<Dialog v-model:open="open11" title="Centered Title" centered @cancel="onCancel" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open1 = ref(false)
const open2 = ref(false)
const open3 = ref(false)
function onCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定的回调
  console.log('ok')
  open1.value = false
  open2.value = false
  open3.value = false
}
</script>
<template>
  <Space>
    <Button type="primary" @click="open1 = true">Fixed Top Number Dialog</Button>
    <Button type="primary" @click="open2 = true">Fixed Top Percent Dialog</Button>
    <Button type="primary" @click="open3 = true">Vertically Centered Dialog</Button>
  </Space>
  <Dialog v-model:open="open1" title="60px Top Title" :top="60" @cancel="onCancel" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
  <Dialog v-model:open="open2" title="20% Top Title" top="20%" @cancel="onCancel" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
  <Dialog v-model:open="open3" title="Centered Title" centered @cancel="onCancel" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 动画出现位置

<Button type="primary" @click="open12 = true">Transform Origin Center Dialog</Button>

<Dialog v-model:open="open12" title="Title" transform-origin="center" @cancel="onCancel" @ok="onOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function openDialog() {
  open = true
}
function onCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // 点击确定的回调
  console.log('ok')
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="openDialog">Transform Origin Center Dialog</Button>
  <Dialog v-model:open="open" title="Title" transform-origin="center" @cancel="onCancel" @ok="onOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 异步延迟关闭

<Button type="primary" @click="open13 = true">Delayed Close Dialog</Button>

<Dialog v-model:open="open13" title="Title" :confirm-loading="confirmLoading" @cancel="handleCancel" @ok="handleOk">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
const confirmLoading = ref(false)
function openDialog() {
  open = true
}
function handleCancel() {
  // 点击蒙层或 Esc 键或右上角叉或取消按钮的回调
  console.log('cancel')
}
function handleOk() {
  // 点击确定回调
  confirmLoading.value = true // 开启加载状态
  setTimeout(() => {
    confirmLoading.value = false
    open.value = false
    console.log('ok')
  }, 2000)
}
</script>
<template>
  <Button type="primary" @click="openDialog">Delayed Close Dialog</Button>
  <Dialog v-model:open="open" title="Title" :confirm-loading="confirmLoading" @cancel="handleCancel" @ok="handleOk">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## APIs

### Dialog

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| width | 对话框宽度，单位 `px` | string &#124; number | 520 |
| height | 对话框高度，单位 `px`，默认自适应内容高度 | string &#124; number | 'auto' |
| title | 标题 | string &#124; slot | undefined |
| titleStyle | 自定义标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| content | 内容 | string &#124; slot | undefined |
| contentStyle | 自定义内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| bodyClass | 自定义 `body` 类名 | string | undefined |
| bodyStyle | 自定义 `body` 样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| scrollbarProps | `Scrollbar` 组件属性配置，参考 [Scrollbar Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html#scrollbar)，用于设置内容滚动条的样式 | object | {} |
| cancelText | 取消按钮文字 | string | '取消' |
| cancelProps | 取消按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {} |
| okText | 确定按钮文字 | string | '确定' |
| okType | 确定按钮类型 | 'primary' &#124; 'danger' | 'primary' |
| okProps | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {} |
| footer | 是否显示底部按钮 | boolean &#124; slot | true |
| destroyOnClose | 关闭时是否销毁 `Dialog` 里的子元素 | boolean | false |
| switchFullscreen | 是否允许切换全屏，允许后右上角会出现一个切换按钮 | boolean | false |
| centered | 是否水平垂直居中，否则固定高度水平居中 | boolean | false |
| top | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | string &#124; number | 100 |
| transformOrigin | 对话框动画出现的位置 | 'mouse' &#124; 'center' | 'mouse' |
| confirmLoading | 确定按钮 `loading` | boolean | false |
| blockScroll | 是否在打开对话框时禁用背景滚动 | boolean | true |
| keyboard | 是否支持键盘 `esc` 关闭 | boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| maskStyle | 自定义蒙层样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| open <Tag color="cyan">v-model</Tag> | 对话框是否可见 | boolean | false |

## Slots

| 名称    | 说明           | 类型           |
| :------ | :------------- | :------------- |
| title   | 自定义标题     | v-slot:title   |
| default | 自定义内容     | v-slot:default |
| footer  | 自定义底部内容 | v-slot:footer  |

## Events

| 名称   | 说明                                          | 类型       |
| :----- | :-------------------------------------------- | :--------- |
| cancel | 点击蒙层或 `Esc` 键或右上角叉或取消按钮的回调 | () => void |
| ok     | 点击确定的回调                                | () => void |
