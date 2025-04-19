<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
const colorValue = ref('rgba(0, 0, 0, 1)')
const showAlpha = ref(false)
const showPreview = ref(true)
const show = ref(false)
const modeOptions: CheckboxOption[] = [
  {
    label: 'rgb',
    value: 'rgb'
  },
  {
    label: 'hex',
    value: 'hex'
  },
  {
    label: 'hsl',
    value: 'hsl'
  },
  {
    label: 'hsv',
    value: 'hsv'
  }
]
const modes = ref(['rgb', 'hex'])
const actionOptions: CheckboxOption[] = [
  {
    label: 'confirm',
    value: 'confirm'
  },
  {
    label: 'clear',
    value: 'clear'
  }
]
const actions = ref(['confirm', 'clear'])
watchEffect(() => {
  console.log('colorValue', colorValue.value)
})
watchEffect(() => {
  console.log('show', show.value)
})
function labelFormat(color: string) {
  return `hello ${color}`
}
function handleComplele(color: string) {
  console.log('complete', color)
}
function handleConfirm(color: string) {
  console.log('confirm', color)
}
function handleClear() {
  console.log('clear')
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <ColorPicker :width="240" v-model:value="colorValue" />
    <h2 class="mt30 mb10">自定义展示内容</h2>
    <Space :width="240">
      <ColorPicker :label="labelFormat" />
      <ColorPicker>
        <template #label="{ color }"> I'm {{ color }} </template>
      </ColorPicker>
    </Space>
    <h2 class="mt30 mb10">自定义面板样式</h2>
    <ColorPicker
      :width="240"
      :tooltip-style="{
        width: '280px',
        padding: '4px',
        borderRadius: '8px'
      }"
    />
    <h2 class="mt30 mb10">不透明度</h2>
    <h3 class="mb10">show-alpha 控制是否可调节 alpha 通道</h3>
    <Space vertical>
      <Space align="center"> showAlpha: <Switch v-model="showAlpha"></Switch> </Space>
      <ColorPicker :width="240" :show-alpha="showAlpha" />
    </Space>
    <h2 class="mt30 mb10">颜色预览块</h2>
    <h3 class="mb10">使用 showPreview 控制是否展示颜色预览块；点击颜色预览块可以触发浏览器原生的颜色选择器</h3>
    <Space vertical>
      <Space align="center"> showPreview: <Switch v-model="showPreview"></Switch> </Space>
      <ColorPicker :width="240" :show-preview="showPreview" />
    </Space>
    <h2 class="mt30 mb10">尺寸</h2>
    <Space :width="240">
      <ColorPicker size="small" />
      <ColorPicker />
      <ColorPicker size="large" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <ColorPicker :width="240" disabled />
    <h2 class="mt30 mb10">设定模式</h2>
    <h3 class="mb10">使用 modes 设定可选模式</h3>
    <Space vertical>
      <Space align="center"> modes: <Checkbox :options="modeOptions" v-model:value="modes" /> </Space>
      <ColorPicker :width="240" :modes="modes" />
    </Space>
    <h2 class="mt30 mb10">预设色板</h2>
    <ColorPicker
      :width="240"
      :swatches="[
        '#FFFFFF',
        '#18A058',
        '#2080F0',
        '#F0A020',
        '#1677ff',
        '#ff6900',
        'rgba(0, 0, 0, 0.88)',
        'rgba(208, 48, 80, 1)'
      ]"
    />
    <h2 class="mt30 mb10">显示按钮</h2>
    <h3 class="mb10">通过在 actions 属性中添加 confirm clear，来显示确认/清除按钮</h3>
    <Space vertical>
      <Space align="center"> actions: <Checkbox :options="actionOptions" v-model:value="actions" /> </Space>
      <ColorPicker
        :width="240"
        :actions="actions"
        @complete="handleComplele"
        @confirm="handleConfirm"
        @clear="handleClear"
      />
    </Space>
    <h2 class="mt30 mb10">额外页脚</h2>
    <ColorPicker :width="240">
      <template #footer>extra footer</template>
    </ColorPicker>
    <h2 class="mt30 mb10">使用按钮控制面板</h2>
    <Space>
      <ColorPicker :width="240" v-model:show="show" />
      <Button type="primary" @click="show = true">显示</Button>
      <Button @click="show = false">隐藏</Button>
    </Space>
  </div>
</template>
