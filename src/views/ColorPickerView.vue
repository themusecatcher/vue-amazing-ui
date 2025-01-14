<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
const colorValue = ref('rgba(7, 12, 18, 0.2)')
// setTimeout(() => {
//   colorValue.value = ''
// }, 2000);
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
const modes = ref(['hex'])
watchEffect(() => {
  console.log('colorValue', colorValue.value)
})
function handleConfirm(value: string) {
  console.log('confirm', value)
}
function handleClear() {
  console.log('clear')
}
</script>
<template>
  <div>
    <!-- <h1>{{ $route.name }} {{ $route.meta.title }}</h1> -->
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :width="240">
      <ColorPicker :modes="['rgb', 'hex', 'hsl', 'hsv']" />
      <n-color-picker :modes="['rgb', 'hex', 'hsl', 'hsv']" :actions="['confirm', 'clear']" />
    </Space>
    <h2 class="mt30 mb10">不透明度</h2>
    <h3 class="mb10">show-alpha 控制是否可调节 alpha 通道</h3>
    <Space :width="240">
      <ColorPicker :show-alpha="false" :actions="['confirm', 'clear']" @confirm="handleConfirm" @clear="handleClear" />
      <n-color-picker
        :show-alpha="false"
        :actions="['confirm', 'clear']"
        @confirm="handleConfirm"
        @clear="handleClear"
      />
    </Space>
    <h2 class="mt30 mb10">尺寸</h2>
    <Space :width="240">
      <ColorPicker size="small" />
      <ColorPicker />
      <ColorPicker size="large" />
      <n-color-picker size="small" />
      <n-color-picker />
      <n-color-picker size="large" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Space :width="240">
      <ColorPicker disabled />
      <n-color-picker disabled />
    </Space>
    <h2 class="mt30 mb10">设定模式</h2>
    <h3 class="mb10">使用 modes 设定可选模式</h3>
    <Space :width="240">
      <Checkbox :options="modeOptions" v-model:value="modes" />
      <ColorPicker :modes="modes" />
      <n-color-picker :modes="modes" />
    </Space>
    <h2 class="mt30 mb10">可清除</h2>
    <h3 class="mb10">通过在 actions 属性中添加 clear，来显示清除按钮</h3>
    <Space :width="240">
      <ColorPicker
        v-model:value="colorValue"
        :actions="['confirm', 'clear']"
        @confirm="handleConfirm"
        @clear="handleClear"
      />
      <n-color-picker
        v-model:value="colorValue"
        :actions="['confirm', 'clear']"
        @confirm="handleConfirm"
        @clear="handleClear"
      />
    </Space>
    <h2 class="mt30 mb10">预设色板</h2>
    <Space :width="240">
      <ColorPicker :swatches="['#FFFFFF', '#18A058', '#2080F0', '#F0A020', 'rgba(208, 48, 80, 1)']" />
      <n-color-picker :swatches="['#FFFFFF', '#18A058', '#2080F0', '#F0A020', 'rgba(208, 48, 80, 1)']" />
    </Space>
  </div>
</template>
