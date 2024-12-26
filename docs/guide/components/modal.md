# 模态框 Modal

<GlobalElement />

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
import {
  CloudFilled,
  FireFilled,
  NotificationFilled,
  CrownFilled,
  ExclamationCircleFilled
} from '@ant-design/icons-vue'
const modal = ref()
function openInfoModal() {
  modal.value.info({
    title: 'This is an info modal',
    content: 'Some descriptions ...',
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openSuccessModal() {
  modal.value.success({
    title: 'This is a success modal',
    content: 'Some descriptions ...',
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openErrorModal() {
  modal.value.error({
    title: 'This is an error modal',
    content: 'Some descriptions ...',
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openWarningModal() {
  modal.value.warning({
    title: 'This is a warning modal',
    content: 'Some descriptions ...',
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openConfirmModal() {
  modal.value.confirm({
    title: 'This is a confirm modal',
    content: 'Some descriptions ...',
    onOk: () => {
      console.log('Yes Click')
    },
    onCancel: () => {
      console.log('No Click')
    }
  })
}
function openEraseModal() {
  modal.value.erase({
    title: 'This is an erase modal',
    content: 'Some descriptions ...',
    okType: 'danger',
    onOk: () => {
      console.log('Yes Click')
    },
    onCancel: () => {
      console.log('No Click')
    }
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
    width: '28%'
  })
}
function openCustomInfoIcon() {
  modal.value.info({
    title: 'This is a custom info icon modal',
    content: 'Some descriptions ...',
    icon: h(CloudFilled)
  })
}
function openCustomConfirmIcon() {
  modal.value.confirm({
    title: 'This is a custom confirm icon modal',
    content: 'Some descriptions ...',
    icon: h(NotificationFilled, { style: 'color: #ff6900' })
  })
}
function openCustomClass() {
  modal.value.info({
    title: 'This is a custom class modal',
    content: 'Some descriptions ...',
    icon: h(FireFilled),
    bodyClass: 'custom-class'
  })
}
function openCustomStyle() {
  modal.value.confirm({
    title: 'This is a custom style modal',
    content: 'Some descriptions ...',
    icon: h(NotificationFilled),
    bodyStyle: {
      padding: '24px',
      borderRadius: '12px'
    },
    maskStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }
  })
}
function openCustomTitleContentStyle() {
  modal.value.success({
    title: 'This is a custom style modal',
    content: 'Some descriptions ...',
    icon: h(CrownFilled),
    titleStyle: {
      color: '#52c41a'
    },
    contentStyle: {
      color: '#52c41a'
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
function openCustomConfirmBtns() {
  modal.value.confirm({
    title: 'This is a custom confirm btn modal',
    content: 'Some descriptions ...',
    cancelText: 'No',
    okText: 'Yes',
    okType: 'danger',
    okProps: {
      ghost: true
    },
    onOk: () => {
      console.log('Yes Click')
    },
    onCancel: () => {
      console.log('No Click')
    }
  })
}
function openTransformCenterModal() {
  modal.value.info({
    title: 'This is a transform-origin center modal',
    content: 'Some descriptions ...',
    transformOrigin: 'center'
  })
}
function openNumberFixed() {
  modal.value.info({
    title: '60px This is a number fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: 60
  })
}
function openPercentFixed() {
  modal.value.info({
    title: '20% This is a percent fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: '20%'
  })
}
function openVerticalCentered() {
  modal.value.info({
    title: 'This is a vertically centered modal',
    content: 'Some descriptions ...',
    centered: true
  })
}
function openDelayedModal() {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    icon: h(ExclamationCircleFilled),
    onOk: () => {
      console.log('custom ok')
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('Oops errors!'))
    },
    onCancel: () => {
      console.log('custom cancel')
    }
  })
}
function onCancel() {
  // 点击蒙层或 Esc 键或取消按钮的回调
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

*共有六种不同类型的模态框*

<br/>

<Space>
  <Button type="primary" @click="openInfoModal">Info Modal</Button>
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
function openInfoModal() {
  modal.value.info({
    title: 'This is an info modal',
    content: 'Some descriptions ...',
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openSuccessModal() {
  modal.value.success({
    title: 'This is a success modal',
    content: 'Some descriptions ...',
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openErrorModal() {
  modal.value.error({
    title: 'This is an error modal',
    content: 'Some descriptions ...',
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openWarningModal() {
  modal.value.warning({
    title: 'This is a warning modal',
    content: 'Some descriptions ...',
    onKnow: () => {
      console.log('Know Click')
    }
  })
}
function openConfirmModal() {
  modal.value.confirm({
    title: 'This is a confirm modal',
    content: 'Some descriptions ...',
    onOk: () => {
      console.log('Yes Click')
    },
    onCancel: () => {
      console.log('No Click')
    }
  })
}
function openEraseModal() {
  modal.value.erase({
    title: 'This is an erase modal',
    content: 'Some descriptions ...',
    okType: 'danger',
    onOk: () => {
      console.log('Yes Click')
    },
    onCancel: () => {
      console.log('No Click')
    }
  })
}
function onCancel() {
  // 点击蒙层或 Esc 键或取消按钮的回调
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
    <Button type="primary" @click="openInfoModal">Info Modal</Button>
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
  // 点击蒙层或 Esc 键或取消按钮的回调
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
  // 点击蒙层或 Esc 键或取消按钮的回调
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
  <Button type="primary" @click="openCustomClass">Custom Body Class Modal</Button>
  <Button type="primary" @click="openCustomStyle">Custom Body & Mask Style Modal</Button>
  <Button type="primary" @click="openCustomTitleContentStyle">Custom Title & Content Style Modal</Button>
</Space>

<style lang="less" scoped>
:deep(.custom-class) {
  .modal-header {
    color: #ff6900 !important;
    .modal-title {
      color: #ff6900 !important;
    }
  }
  .modal-content {
    color: #ff6900 !important;
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FireFilled, NotificationFilled, CrownFilled } from '@ant-design/icons-vue'
const modal = ref()
function openCustomClass() {
  modal.value.info({
    title: 'This is a custom class modal',
    content: 'Some descriptions ...',
    icon: h(FireFilled),
    bodyClass: 'custom-class'
  })
}
function openCustomStyle() {
  modal.value.confirm({
    title: 'This is a custom style modal',
    content: 'Some descriptions ...',
    icon: h(NotificationFilled),
    bodyStyle: {
      padding: '24px',
      borderRadius: '12px'
    },
    maskStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }
  })
}
function openCustomTitleContentStyle() {
  modal.value.success({
    title: 'This is a custom style modal',
    content: 'Some descriptions ...',
    icon: h(CrownFilled),
    titleStyle: {
      color: '#52c41a'
    },
    contentStyle: {
      color: '#52c41a'
    }
  })
}
function onCancel() {
  // 点击蒙层或 Esc 键或取消按钮的回调
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
    <Button type="primary" @click="openCustomClass">Custom Body Class Modal</Button>
    <Button type="primary" @click="openCustomStyle">Custom Body & Mask Style Modal</Button>
    <Button type="primary" @click="openCustomTitleContentStyle">Custom Title & Content Style Modal</Button>
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
  .modal-content {
    color: #ff6900 !important;
  }
}
</style>
```

:::

## 自定义按钮

<Space>
  <Button type="primary" @click="openCustomInfoBtn">Custom Info Btn Modal</Button>
  <Button type="primary" @click="openCustomConfirmBtns">Custom Confirm Btns Modal</Button>
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
function openCustomConfirmBtns() {
  modal.value.confirm({
    title: 'This is a custom confirm btn modal',
    content: 'Some descriptions ...',
    cancelText: 'No',
    okText: 'Yes',
    okType: 'danger',
    okProps: {
      ghost: true
    },
    onOk: () => {
      console.log('Yes Click')
    },
    onCancel: () => {
      console.log('No Click')
    }
  })
}
function onCancel() {
  // 点击蒙层或 Esc 键或取消按钮的回调
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
    <Button type="primary" @click="openCustomConfirmBtns">Custom Confirm Btns Modal</Button>
  </Space>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>
</template>
```

:::

## 自定义位置

<Space>
  <Button type="primary" @click="openNumberFixed">Fixed Top Number Modal</Button>
  <Button type="primary" @click="openPercentFixed">Fixed Top Percent Modal</Button>
  <Button type="primary" @click="openVerticalCentered">Vertically Centered Modal</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const modal = ref()
function openNumberFixed() {
  modal.value.info({
    title: '60px This is a number fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: 60
  })
}
function openPercentFixed() {
  modal.value.info({
    title: '20% This is a percent fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: '20%'
  })
}
function openVerticalCentered() {
  modal.value.info({
    title: 'This is a vertically centered modal',
    content: 'Some descriptions ...',
    centered: true
  })
}
function onCancel() {
  // 点击蒙层或 Esc 键或取消按钮的回调
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
    <Button type="primary" @click="openNumberFixed">Fixed Top Number Modal</Button>
    <Button type="primary" @click="openPercentFixed">Fixed Top Percent Modal</Button>
    <Button type="primary" @click="openVerticalCentered">Vertically Centered Modal</Button>
  </Space>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>
</template>
```

:::

## 动画出现位置

<Button type="primary" @click="openTransformCenterModal">Transform Origin Center Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const modal = ref()
function openTransformCenterModal() {
  modal.value.info({
    title: 'This is a transform-origin center modal',
    content: 'Some descriptions ...',
    transformOrigin: 'center'
  })
}
function onCancel() {
  // 点击蒙层或 Esc 键或取消按钮的回调
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
  <Button type="primary" @click="openTransformCenterModal">Transform Origin Center Modal</Button>
  <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"/>
</template>
```

:::

## 异步延迟关闭

<Button type="primary" @click="openDelayedModal">Delayed Close Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
const modal = ref()
function openDelayedModal() {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    icon: h(ExclamationCircleFilled),
    onOk: () => {
      console.log('custom ok')
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('Oops errors!'))
    },
    onCancel: () => {
      console.log('custom cancel')
    }
  })
}
function onCancel() {
  // 点击蒙层或 Esc 键或取消按钮的回调
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
:-- | :-- | :-- | :--
width | 模态框宽度，单位 `px` | string &#124; number | 420
icon | 自定义图标 | VNode &#124; Slot | undefined
title | 模态框标题 | string &#124; slot | undefined
titleStyle | 自定义标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
content | 模态框内容 | string &#124; slot | undefined
contentStyle | 自定义内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
bodyClass | 自定义 `body` 类名 | string | undefined
bodyStyle | 自定义 `body` 样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
cancelText | 取消按钮文字 | string | '取消'
cancelProps | 取消按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
okText | 确认按钮文字 | string | '确定'
okType | 确认按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'primary'
okProps | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
noticeText | 通知按钮文字 | string | '知道了'
noticeProps | 通知按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
centered | 是否水平垂直居中，否则固定高度水平居中 | boolean | false
top | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | string &#124; number | 100
transformOrigin | 模态框动画出现的位置 | 'mouse' &#124; 'center' | 'mouse'
confirmLoading | 确定按钮 `loading` | boolean | false
blockScroll | 是否在打开模态框时禁用背景滚动 | boolean | true
keyboard | 是否支持键盘 `esc` 关闭 | boolean | true
maskClosable | 点击蒙层是否允许关闭 | boolean | true
maskStyle | 自定义蒙层样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}

### Modal Type

<br/>

*调用时传入的 `Modal` 类型，以下属性均具有更高优先级*

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
width? | 模态框宽度，单位 `px` | string &#124; number | undefined
icon? | 自定义图标 | VNode | undefined
title? | 模态框标题 | string | undefined
titleStyle? | 自定义标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
content? | 模态框内容 | string | undefined
contentStyle? | 自定义内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
bodyClass? | 自定义 `body` 类名 | string | undefined
bodyStyle? | 自定义 `body` 样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
cancelText? | 取消按钮文字 | string | undefined
cancelProps? | 取消按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | undefined
okText? | 确认按钮文字 | string | undefined
okType? | 确认按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | undefined
okProps? | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | undefined
noticeText? | 通知按钮文字 | string | undefined
noticeProps? | 通知按钮 `props` 配置，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | undefined
centered? | 是否水平垂直居中，否则固定高度水平居中 | boolean | undefined
top? | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | string &#124; number | undefined
transformOrigin? | 模态框动画出现的位置 | 'mouse' &#124; 'center' | undefined
blockScroll? | 是否在打开模态框时禁用背景滚动 | boolean | undefined
keyboard? | 是否支持键盘 `esc` 关闭 | boolean | undefined
maskClosable? | 点击蒙层是否允许关闭 | boolean | undefined
maskStyle? | 自定义蒙层样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined
onKnow? | 点击知道了按钮的回调 | Function | undefined
onOk? | 点击确认按钮的回调 | Function | undefined
onCancel? | 点击遮罩层或取消按钮的回调 | Function | undefined

## Methods

名称 | 说明 | 类型
:-- | :-- | :--
info | 信息提示模态框 | (data: [Modal](#modal-type)) => void
success | 成功提示模态框 | (data: [Modal](#modal-type)) => void
error | 错误提示模态框 | (data: [Modal](#modal-type)) => void
warning | 警告提示模态框 | (data: [Modal](#modal-type)) => void
erase | 删除提示模态框 | (data: [Modal](#modal-type)) => void

## Events

名称 | 说明 | 类型
:-- | :-- | :--
cancel | 点击蒙层或 `Esc` 键或取消按钮的回调 | () => void
ok | 点击确定按钮的回调 | () => void
know | 点击知道了按钮的回调 | () => void

## 全局挂载使用

- 全局挂载

::: tip App.vue

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const modal = ref()
onMounted(() => {
  window['$modal'] = modal.value
})
onBeforeUnmount(() => {
  delete window['$modal']
})
</script>
<template>
  <RouterView />
  <Modal ref="modal" />
</template>
```

:::

- 使用

::: tip XXX.vue

```vue
<script setup lang="ts">
const $modal = window['$modal']
function onClick() {
  $modal.confirm({
    title: 'Confirm Title',
    content: 'Some descriptions ...',
    onOk: () => {
      console.log('点击了确定按钮')
    },
    onCancel: () => {
      console.log('点击了取消按钮')
    }
  })
}
</script>
<template>
  <Button @click="onClick">按钮</Button>
</template>
```

:::
