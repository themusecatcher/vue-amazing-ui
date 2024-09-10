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
function openDelayedModal() {
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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="openInfoModal">Info Modal</Button>
    <h2 class="mt30 mb10">不同类型的信息提示</h2>
    <Space>
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
      <Button type="primary" @click="openCustomClass">Custom Class Modal</Button>
      <Button type="primary" @click="openCustomStyle">Custom Style Modal</Button>
    </Space>
    <h2 class="mt30 mb10">自定义按钮</h2>
    <Space>
      <Button type="primary" @click="openCustomInfoBtn">Custom Info Btn Modal</Button>
      <Button type="primary" @click="openCustomConfirmBtn">Custom Confirm Btn Modal</Button>
    </Space>
    <h2 class="mt30 mb10">固定高度</h2>
    <Space>
      <Button type="primary" @click="openNumberFixed">Number Top Fixed Modal</Button>
      <Button type="primary" @click="openPercentFixed">Percent Top Fixed Modal</Button>
    </Space>
    <h2 class="mt30 mb10">延迟关闭</h2>
    <Button type="primary" @click="openDelayedModal">Delayed Close Modal</Button>
    <Modal ref="modal" @cancel="onCancel" @ok="onOk" @know="onKnow" />
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
}
</style>
