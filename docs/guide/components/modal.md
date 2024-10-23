# 信息提示 Modal

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="成为赞助者✨"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*模态对话框*

## 何时使用

- 在当前页面正中打开一个浮层，承载相应的操作或者提示内容

::: tip 使用

- modal.value.info(data: [Modal](#modal-type)) // info 调用
- modal.value.success(data: [Modal](#modal-type)) // success 调用
- modal.value.error(data: [Modal](#modal-type)) // error 调用
- modal.value.warning(data: [Modal](#modal-type)) // warning 调用
- modal.value.confirm(data: [Modal](#modal-type)) // confirm 调用
- modal.value.erase(data: [Modal](#modal-type)) // erase 调用

:::

<script setup lang="ts">
import { ref, h } from 'vue'
import { CloudFilled, FireFilled, NotificationFilled, ExclamationCircleFilled } from '@ant-design/icons-vue'
const modal = ref()
function openInfoModal() {
  modal.value.info({
    title: 'This is a notification message',
    content: 'Some descriptions ...'
  })
}
function openSuccessModal() {
  modal.value.success({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function openErrorModal() {
  modal.value.error({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function openWarningModal() {
  modal.value.warning({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function openConfirmModal() {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk: () => {
      console.log('custom ok')
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('Oops errors!'))
    }
  })
}
function openEraseModal() {
  modal.value.erase({
    title: 'Do you Want to delete these items ?',
    content: 'Some descriptions ...',
    okType: 'danger'
  })
}
function openCustomNumberWidth() {
  modal.value.info({
    title: 'This is a custom number width modal',
    content: 'Some descriptions ...',
    width: 365
  })
}
function openCustomPercentWidth() {
  modal.value.confirm({
    title: 'This is a custom percent width modal',
    content: 'Some descriptions ...',
    width: '28%',
  })
}
function openCustomInfoIcon() {
  modal.value.info({
    title: 'This is a custom info icon modal',
    content: 'Some descriptions ...',
    icon: h(CloudFilled),
  })
}
function openCustomConfirmIcon() {
  modal.value.confirm({
    title: 'This is a custom confirm icon modal',
    content: 'Some descriptions ...',
    icon: h(NotificationFilled, { style: 'color: #ff6900' }),
  })
}
function openCustomClass() {
  modal.value.info({
    title: 'This is a custom class modal',
    content: 'Some descriptions ...',
    icon: h(FireFilled),
    class: 'custom-class'
  })
}
function openCustomStyle() {
  modal.value.confirm({
    title: 'This is a custom style modal',
    content: 'Some descriptions ...',
    icon: h(NotificationFilled),
    style: {
      width: '400px',
      color: '#ff6900'
    }
  })
}
function openCustomInfoBtn() {
  modal.value.info({
    title: 'This is a custom info btn modal',
    content: 'Some descriptions ...',
    noticeText: 'Noted',
    noticeProps: {
      shape: 'round'
    },
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openCustomConfirmBtn() {
  modal.value.confirm({
    title: 'This is a custom confirm btn modal',
    content: 'Some descriptions ...',
    cancelText: 'No',
    okText: 'Yes',
    okType: 'danger',
    okProps: {
      ghost: true
    },
    onCancel: () => {
      console.log('No Click')
    },
    onOk: () => {
      console.log('Yes Click')
    }
  })
}
function openNumberFixed() {
  modal.value.info({
    title: 'This is a number fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: 100
  })
}
function openPercentFixed() {
  modal.value.info({
    title: 'This is a percent fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: '20%'
  })
}
function openDelayedModal () {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    icon: h(ExclamationCircleFilled),
    onCancel: () => {
      console.log('custom cancel')
    },
    onOk: () => {
      console.log('custom ok')
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('Oops errors!'))
    }
  })
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  console.log('ok')
}
function onKnow() {
  // “知道了”按钮回调
  console.log('know')
}
</script>

<Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>

## 基本使用

<Button type="primary" @click="openInfoModal">Info Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const modal = ref()
function openInfoModal() {
  modal.value.info({
    title: 'This is a notification message',
    content: 'Some descriptions ...'
  })
}
function onKnow() {
  // “知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Button type="primary" @click="openInfoModal">Info Modal</Button>
  <Modal ref="modal" @know="onKnow" />
</template>
```

:::

## 不同类型的信息提示

<Space>
  <Button type="primary" @click="openSuccessModal">Success Modal</Button>
  <Button type="primary" @click="openErrorModal">Error Modal</Button>
  <Button type="primary" @click="openWarningModal">Warning Modal</Button>
  <Button type="primary" @click="openConfirmModal">Confirm Modal</Button>
  <Button type="primary" @click="openEraseModal">Erase Modal</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const modal = ref()
function openSuccessModal() {
  modal.value.success({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function openErrorModal() {
  modal.value.error({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function openWarningModal() {
  modal.value.warning({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function openConfirmModal() {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk: () => {
      console.log('custom ok')
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('Oops errors!'))
    }
  })
}
function openEraseModal() {
  modal.value.erase({
    title: 'Do you Want to delete these items ?',
    content: 'Some descriptions ...',
    okType: 'danger'
  })
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  console.log('ok')
}
function onKnow() {
  // “知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="openSuccessModal">Success Modal</Button>
    <Button type="primary" @click="openErrorModal">Error Modal</Button>
    <Button type="primary" @click="openWarningModal">Warning Modal</Button>
    <Button type="primary" @click="openConfirmModal">Confirm Modal</Button>
    <Button type="primary" @click="openEraseModal">Erase Modal</Button>
  </Space>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>
</template>
```

:::

## 自定义宽度

<Space>
  <Button type="primary" @click="openCustomNumberWidth">Custom Number Width Modal</Button>
  <Button type="primary" @click="openCustomPercentWidth">Custom Percent Width Modal</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const modal = ref()
function openCustomNumberWidth() {
  modal.value.info({
    title: 'This is a custom number width modal',
    content: 'Some descriptions ...',
    width: 365
  })
}
function openCustomPercentWidth() {
  modal.value.confirm({
    title: 'This is a custom percent width modal',
    content: 'Some descriptions ...',
    width: '28%',
  })
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  console.log('ok')
}
function onKnow() {
  // “知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="openCustomNumberWidth">Custom Number Width Modal</Button>
    <Button type="primary" @click="openCustomPercentWidth">Custom Percent Width Modal</Button>
  </Space>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>
</template>
```

:::

## 自定义图标

<Space>
  <Button type="primary" @click="openCustomInfoIcon">Custom Info Icon Modal</Button>
  <Button type="primary" @click="openCustomConfirmIcon">Custom Confirm Icon Modal</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CloudFilled, NotificationFilled } from '@ant-design/icons-vue'
const modal = ref()
function openCustomInfoIcon() {
  modal.value.info({
    title: 'This is a custom info icon modal',
    content: 'Some descriptions ...',
    icon: h(CloudFilled),
  })
}
function openCustomConfirmIcon() {
  modal.value.confirm({
    title: 'This is a custom confirm icon modal',
    content: 'Some descriptions ...',
    icon: h(NotificationFilled, { style: 'color: #ff6900' }),
  })
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  console.log('ok')
}
function onKnow() {
  // “知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="openCustomInfoIcon">Custom Info Icon Modal</Button>
    <Button type="primary" @click="openCustomConfirmIcon">Custom Confirm Icon Modal</Button>
  </Space>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>
</template>
```

:::

## 自定义样式

<Space>
  <Button type="primary" @click="openCustomClass">Custom Class Modal</Button>
  <Button type="primary" @click="openCustomStyle">Custom Style Modal</Button>
</Space>

<style lang="less" scoped>
:deep(.custom-class) {
  .modal-header {
    color: #ff6900 !important;
    .modal-title {
      color: #ff6900 !important;
    }
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FireFilled, NotificationFilled } from '@ant-design/icons-vue'
const modal = ref()
function openCustomClass() {
  modal.value.info({
    title: 'This is a custom class modal',
    content: 'Some descriptions ...',
    icon: h(FireFilled),
    class: 'custom-class'
  })
}
function openCustomStyle() {
  modal.value.confirm({
    title: 'This is a custom style modal',
    content: 'Some descriptions ...',
    icon: h(NotificationFilled),
    style: {
      width: '400px',
      color: '#ff6900'
    }
  })
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  console.log('ok')
}
function onKnow() {
  // “知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="openCustomClass">Custom Class Modal</Button>
    <Button type="primary" @click="openCustomStyle">Custom Style Modal</Button>
  </Space>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>
</template>
<style lang="less" scoped>
:deep(.custom-class) {
  .modal-header {
    color: #ff6900 !important;
    .modal-title {
      color: #ff6900 !important;
    }
  }
}
</style>
```

:::

## 自定义按钮

<Space>
  <Button type="primary" @click="openCustomInfoBtn">Custom Info Btn Modal</Button>
  <Button type="primary" @click="openCustomConfirmBtn">Custom Confirm Btn Modal</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const modal = ref()
function openCustomInfoBtn() {
  modal.value.info({
    title: 'This is a custom info btn modal',
    content: 'Some descriptions ...',
    noticeText: 'Noted',
    noticeProps: {
      shape: 'round'
    },
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openCustomConfirmBtn() {
  modal.value.confirm({
    title: 'This is a custom confirm btn modal',
    content: 'Some descriptions ...',
    cancelText: 'No',
    okText: 'Yes',
    okType: 'danger',
    okProps: {
      ghost: true
    },
    onCancel: () => {
      console.log('No Click')
    },
    onOk: () => {
      console.log('Yes Click')
    }
  })
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  console.log('ok')
}
function onKnow() {
  // “知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="openCustomInfoBtn">Custom Info Btn Modal</Button>
    <Button type="primary" @click="openCustomConfirmBtn">Custom Confirm Btn Modal</Button>
  </Space>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>
</template>
```

:::

## 固定高度

<Space>
  <Button type="primary" @click="openNumberFixed">Number Top Fixed Modal</Button>
  <Button type="primary" @click="openPercentFixed">Percent Top Fixed Modal</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const modal = ref()
function openNumberFixed() {
  modal.value.info({
    title: 'This is a number fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: 100
  })
}
function openPercentFixed() {
  modal.value.info({
    title: 'This is a percent fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: '20%'
  })
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  console.log('ok')
}
function onKnow() {
  // “知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="openNumberFixed">Number Top Fixed Modal</Button>
    <Button type="primary" @click="openPercentFixed">Percent Top Fixed Modal</Button>
  </Space>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>
</template>
```

:::

## 延迟关闭

<Button type="primary" @click="openDelayedModal">Delayed Close Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
const modal = ref()
function openDelayedModal () {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    icon: h(ExclamationCircleFilled),
    onCancel: () => {
      console.log('custom cancel')
    },
    onOk: () => {
      console.log('custom ok')
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('Oops errors!'))
    }
  })
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  console.log('ok')
}
</script>
<template>
  <Button type="primary" @click="openDelayedModal">Delayed Close Modal</Button>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" />
</template>
```

:::

## APIs

### Modal

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
width | 提示框宽度，单位 `px` | string &#124; number | 420
title | 提示框标题 | string | undefined
content | 提示框内容 | string | undefined
icon | 自定义图标 | VNode | undefined
cancelText | 取消按钮文字 | string | '取消'
cancelProps | 取消按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
okText | 确认按钮文字 | string | '确定'
okType | 确认按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'primary'
okProps | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
noticeText | 通知按钮文字 | string | '知道了'
noticeProps | 通知按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
centered | 是否水平垂直居中，否则固定高度水平居中 | boolean | true
top | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | number | 100
loading | 确定按钮 `loading` | boolean | false
open <Tag color="cyan">v-model</Tag> | 提示框是否可见 | boolean | false

### Modal Type

<br/>

*调用时传入的 `Modal` 类型，以下属性均具有更高优先级*

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
width? | 提示框宽度，单位 `px` | string &#124; number | undefined
title? | 提示框标题 | string | undefined
content? | 提示框内容 | string | undefined
icon? | 自定义图标 | VNode | undefined
class? | 自定义类名 | string | undefined
style? | 自定义样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
cancelText? | 取消按钮文字 | string | undefined
cancelProps? | 取消按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | undefined
okText? | 确认按钮文字 | string | undefined
okType? | 确认按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | undefined
okProps? | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | undefined
noticeText? | 通知按钮文字 | string | undefined
noticeProps? | 通知按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | undefined
centered? | 是否水平垂直居中，否则固定高度水平居中 | boolean | undefined
top? | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | number | undefined
onKnow? | 点击知道了按钮的回调 | Function | undefined
onOk? | 点击确认按钮的回调 | Function | undefined
onCancel? | 点击遮罩层或取消按钮的回调 | Function | undefined

## Methods

名称 | 说明 | 类型
-- | -- | --
info | 信息通知提示 | (data: [Modal](#modal-type)) => void
success | 成功通知提示 | (data: [Modal](#modal-type)) => void
error | 错误通知提示 | (data: [Modal](#modal-type)) => void
warning | 警告通知提示 | (data: [Modal](#modal-type)) => void
 erase | 删除通知提示 | (data: [Modal](#modal-type)) => void

## Events

名称 | 说明 | 类型
-- | -- | --
cancel | 点击遮罩层或取消按钮的回调 | () => void
ok | 点击确定回调 | () => void
know | 点击知道了的回调 | () => void
