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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h3 class="mb10">共有六种不同类型的模态框</h3>
    <Space>
      <Button type="primary" @click="openInfoModal">Info Modal</Button>
      <Button type="primary" @click="openSuccessModal">Success Modal</Button>
      <Button type="primary" @click="openErrorModal">Error Modal</Button>
      <Button type="primary" @click="openWarningModal">Warning Modal</Button>
      <Button type="primary" @click="openConfirmModal">Confirm Modal</Button>
      <Button type="primary" @click="openEraseModal">Erase Modal</Button>
    </Space>
    <h2 class="mt30 mb10">自定义宽度</h2>
    <Space>
      <Button type="primary" @click="openCustomNumberWidth">Custom Number Width Modal</Button>
      <Button type="primary" @click="openCustomPercentWidth">Custom Percent Width Modal</Button>
    </Space>
    <h2 class="mt30 mb10">自定义图标</h2>
    <Space>
      <Button type="primary" @click="openCustomInfoIcon">Custom Info Icon Modal</Button>
      <Button type="primary" @click="openCustomConfirmIcon">Custom Confirm Icon Modal</Button>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space>
      <Button type="primary" @click="openCustomClass">Custom Body Class Modal</Button>
      <Button type="primary" @click="openCustomStyle">Custom Body & Mask Style Modal</Button>
      <Button type="primary" @click="openCustomTitleContentStyle">Custom Title & Content Style Modal</Button>
    </Space>
    <h2 class="mt30 mb10">自定义按钮</h2>
    <Space>
      <Button type="primary" @click="openCustomInfoBtn">Custom Info Btn Modal</Button>
      <Button type="primary" @click="openCustomConfirmBtns">Custom Confirm Btns Modal</Button>
    </Space>
    <h2 class="mt30 mb10">自定义位置</h2>
    <Space>
      <Button type="primary" @click="openNumberFixed">Fixed Top Number Modal</Button>
      <Button type="primary" @click="openPercentFixed">Fixed Top Percent Modal</Button>
      <Button type="primary" @click="openVerticalCentered">Vertically Centered Modal</Button>
    </Space>
    <h2 class="mt30 mb10">动画出现位置</h2>
    <Button type="primary" @click="openTransformCenterModal">Transform Origin Center Modal</Button>
    <h2 class="mt30 mb10">异步延迟关闭</h2>
    <Button type="primary" @click="openDelayedModal">Delayed Close Modal</Button>
    <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow"></Modal>
  </div>
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
