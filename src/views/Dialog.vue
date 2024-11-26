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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="(open1 = true)">Open Dialog</Button>
    <Dialog v-model:open="open1" title="Title" @cancel="onCancel" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义宽高</h2>
    <Button type="primary" @click="(open2 = true)">Open Dialog</Button>
    <Dialog v-model:open="open2" :width="480" :height="180" @cancel="onCancel" @ok="onOk">
      <template #title>Title</template>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space>
      <Button type="primary" @click="(open3 = true)">Custom Body Class Dialog</Button>
      <Button type="primary" @click="(open4 = true)">Custom Body & Mask Style Dialog</Button>
      <Button type="primary" @click="(open5 = true)">Custom Title & Content Style Dialog</Button>
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
    <h2 class="mt30 mb10">自定义按钮</h2>
    <Button type="primary" @click="(open6 = true)">Custom Btns Dialog</Button>
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
    <h2 class="mt30 mb10">隐藏底部按钮</h2>
    <Button type="primary" @click="(open7 = true)">Open Dialog</Button>
    <Dialog v-model:open="open7" title="Title" :footer="false" @cancel="onCancel" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">切换全屏</h2>
    <Button type="primary" @click="(open8 = true)">Open Dialog</Button>
    <Dialog v-model:open="open8" title="Title" switch-fullscreen @cancel="onCancel" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义位置</h2>
    <Space>
      <Button type="primary" @click="(open9 = true)">Fixed Top Number Dialog</Button>
      <Button type="primary" @click="(open10 = true)">Fixed Top Percent Dialog</Button>
      <Button type="primary" @click="(open11 = true)">Vertically Centered Dialog</Button>
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
    <h2 class="mt30 mb10">动画出现位置</h2>
    <Button type="primary" @click="(open12 = true)">Transform Origin Center Dialog</Button>
    <Dialog v-model:open="open12" title="Title" transform-origin="center" @cancel="onCancel" @ok="onOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">异步延迟关闭</h2>
    <Button type="primary" @click="(open13 = true)">Delayed Close Dialog</Button>
    <Dialog v-model:open="open13" title="Title" :confirm-loading="confirmLoading" @cancel="handleCancel" @ok="handleOk">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
  </div>
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
