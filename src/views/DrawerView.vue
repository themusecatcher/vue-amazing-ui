<script lang="ts" setup>
import { ref } from 'vue'
import type { RadioOption } from 'vue-amazing-ui'
import { generate } from '@ant-design/colors'
const open1 = ref<boolean>(false)
const open2 = ref<boolean>(false)
const open3 = ref<boolean>(false)
const open4 = ref<boolean>(false)
const open5 = ref<boolean>(false)
const open6 = ref<boolean>(false)
const options = ref<RadioOption[]>([
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
const extraPlacement = ref('right')
const footerPlacement = ref('right')
const primaryColor = ref('#ff6900')
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--button-primary-color': color,
    '--button-primary-color-hover': colorPalettes[4],
    '--button-primary-color-active': colorPalettes[6],
    '--button-ripple-color': color
  }
  return style
}
function onClose() {
  open3.value = false
  open4.value = false
  open6.value = false
  console.log('close')
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="open1 = true">Open</Button>
    <Drawer v-model:open="open1" title="Basic Drawer" @close="onClose">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    <h2 class="mt30 mb10">自定义位置</h2>
    <Radio v-model:value="placement" :options="options" style="margin-right: 8px" />
    <Button type="primary" @click="open2 = true">Open</Button>
    <Drawer
      v-model:open="open2"
      title="Basic Drawer"
      :closable="false"
      extra="extra"
      footer="footer"
      :placement="placement"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    <h2 class="mt30 mb10">额外操作</h2>
    <Radio v-model:value="extraPlacement" :options="options" style="margin-right: 8px" />
    <Button type="primary" @click="open3 = true">Open</Button>
    <Drawer v-model:open="open3" title="Basic Drawer" :placement="extraPlacement">
      <template #extra>
        <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
        <Button type="primary" @click="onClose">Submit</Button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    <h2 class="mt30 mb10">抽屉页脚</h2>
    <Radio v-model:value="footerPlacement" :options="options" style="margin-right: 8px" />
    <Button type="primary" @click="open4 = true">Open</Button>
    <Drawer
      v-model:open="open4"
      title="Basic Drawer"
      :placement="footerPlacement"
      :footer-style="{ textAlign: 'right' }"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template #footer>
        <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
        <Button type="primary" @click="onClose">Submit</Button>
      </template>
    </Drawer>
    <h2 class="mt30 mb10">自定义 header & body 样式</h2>
    <Button type="primary" @click="open5 = true">Open</Button>
    <Drawer
      v-model:open="open5"
      :closable="false"
      title="Basic Drawer"
      :header-style="{ textAlign: 'center' }"
      :body-style="{ textAlign: 'center' }"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    <h2 class="mt30 mb10">自定义主题色</h2>
    <Space align="center">
      primaryColor:
      <ColorPicker style="width: 200px" v-model:value="primaryColor" />
      <Button :style="getThemeStyle(primaryColor)" type="primary" @click="open6 = true">Open</Button>
    </Space>
    <Drawer v-model:open="open6" :closable="false" title="Basic Drawer" :footer-style="{ textAlign: 'right' }">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template #footer>
        <Button style="margin-right: 8px" :style="getThemeStyle(primaryColor)" @click="onClose">Cancel</Button>
        <Button :style="getThemeStyle(primaryColor)" type="primary" @click="onClose">Submit</Button>
      </template>
    </Drawer>
  </div>
</template>
