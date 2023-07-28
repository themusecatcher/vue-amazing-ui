<script lang="ts" setup>
import { ref } from 'vue'

const open1 = ref<boolean>(false)
const open2 = ref<boolean>(false)
const open3 = ref<boolean>(false)
const open4 = ref<boolean>(false)
const options = ref([
    {
      label: 'top',
      value: 'top'
    },
    {
      label: 'right',
      value: 'right'
    },
    {
      label: 'bottom',
      value: 'bottom'
    },
    {
      label: 'left',
      value: 'left'
    }
  ])
const placement = ref('right')
const afterOpenChange = (bool: boolean) => {
  console.log('open', bool)
}

const showDrawer1 = () => {
  open1.value = true
}
const showDrawer2 = () => {
  open2.value = true
}
const showDrawer3 = () => {
  open3.value = true
}
const showDrawer4 = () => {
  open4.value = true
}
const onClose = () => {
  open3.value = false
  console.log('close')
}
</script>
<template>
  <div>
    <h1>Drawer 抽屉</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="showDrawer1">Open</Button>
    <Drawer v-model:open="open1" title="Basic Drawer">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    <h2 class="mt30 mb10">额外操作</h2>
    <Button type="primary" @click="showDrawer2">Open</Button>
    <Drawer
      :width="480"
      title="Basic Drawer"
      v-model:open="open2"
      @close="onClose">
      <template #extra>
        <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
        <Button type="primary" @click="onClose">Submit</Button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    <h2 class="mt30 mb10">自定义位置</h2>
    <Radio v-model:value="placement" :options="options">
    </Radio>
    <Button type="primary" @click="showDrawer3">Open</Button>
    <Drawer
      title="Basic Drawer"
      :placement="placement"
      :open="open3"
      @close="onClose">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    <h2 class="mt30 mb10">关闭时销毁子元素</h2>
    <Button type="primary" @click="showDrawer4">Open</Button>
    <Drawer
      destroyOnClose
      title="Basic Drawer"
      v-model:open="open4">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  </div>
</template>


