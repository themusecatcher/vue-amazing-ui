<script setup lang="ts">
import { ref, watchEffect, h } from 'vue'
import { BgColorsOutlined } from '@ant-design/icons-vue'
import type { CheckboxOption, ColorPickerMode, ColorPickerAction } from 'vue-amazing-ui'
const colorValue = ref('rgba(0, 0, 0, 1)')
const showAlpha = ref(false)
const modes = ref<ColorPickerMode[]>(['rgb', 'hex'])
const actions = ref<ColorPickerAction[]>(['confirm', 'clear'])
const swatches = [
  '#FFFFFF',
  '#F0A020',
  '#1677ff',
  '#ff6900',
  '#722ed1',
  '#13c2c2',
  'rgba(0, 0, 0, 0.88)',
  'rgba(208, 48, 80, 1)'
]
const triggerColor1 = ref('#ff6900')
const triggerColor2 = ref('#1677ff')
const triggerColor3 = ref('#722ed1')
const showPreview = ref(true)
const labelValue = ref('#ff6900')
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
watchEffect(() => {
  console.log('colorValue', colorValue.value)
})
watchEffect(() => {
  console.log('show', show.value)
})
function labelFormat(color: string) {
  return `hello ${color}`
}
function labelRender(color: string) {
  return h('span', { style: 'font-weight: 600' }, `HELLO ${color}`)
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
    <h2 class="mt30 mb10">不透明度</h2>
    <p class="mb10"><code>show-alpha</code> 控制是否可调节 <code>alpha</code> 通道</p>
    <Space vertical>
      <Space align="center"> showAlpha: <Switch v-model:value="showAlpha"></Switch> </Space>
      <ColorPicker :width="240" default-value="#ff6900" :show-alpha="showAlpha" />
    </Space>
    <h2 class="mt30 mb10">尺寸</h2>
    <Space vertical>
      <ColorPicker :width="240" size="small" />
      <ColorPicker :width="240" />
      <ColorPicker :width="240" size="large" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <ColorPicker :width="240" default-value="#ff6900" disabled />
    <h2 class="mt30 mb10">设定模式</h2>
    <p class="mb10">使用 <code>modes</code> 设定可选模式</p>
    <Space vertical>
      <Space align="center"> modes: <Checkbox :options="modeOptions" v-model:value="modes" /> </Space>
      <ColorPicker :width="240" default-value="#ff6900" :modes="modes" />
    </Space>
    <h2 class="mt30 mb10">显示按钮</h2>
    <p class="mb10"
      >通过在 <code>actions</code> 属性中添加 <code>confirm</code> <code>clear</code>，来显示确认/清除按钮</p
    >
    <Space vertical>
      <Space align="center"> actions: <Checkbox :options="actionOptions" v-model:value="actions" /> </Space>
      <ColorPicker
        :width="240"
        default-value="#ff6900"
        :actions="actions"
        @complete="handleComplele"
        @confirm="handleConfirm"
        @clear="handleClear"
      />
    </Space>
    <h2 class="mt30 mb10">预设色板</h2>
    <p class="mb10">使用 <code>swatches</code> 设置预设色板，色板支持鼠标点击与键盘 <code>Enter</code> 选色</p>
    <ColorPicker :width="240" default-value="#ff6900" :swatches="swatches" @complete="handleComplele" />
    <h2 class="mt30 mb10">自定义触发器</h2>
    <p class="mb10">使用 <code>trigger</code> 插槽自定义触发器</p>
    <Space align="center">
      <ColorPicker v-model:value="triggerColor1" @complete="handleComplele">
        <template #trigger="{ value, onClick }">
          <Button shape="circle" type="text" @click="onClick">
            <template #icon>
              <BgColorsOutlined :style="{ color: value }" />
            </template>
          </Button>
        </template>
      </ColorPicker>
      <ColorPicker v-model:value="triggerColor2" @complete="handleComplele">
        <template #trigger="{ value, onClick }">
          <span class="trigger-dot" :style="`background-color: ${value || '#000000'}`" @click="onClick"></span>
        </template>
      </ColorPicker>
      <ColorPicker v-model:value="triggerColor3" @complete="handleComplele">
        <template #trigger="{ value, onClick }">
          <span class="trigger-text" :style="`color: ${value}`" @click="onClick">{{ value }}</span>
        </template>
      </ColorPicker>
    </Space>
    <h2 class="mt30 mb10">颜色预览块</h2>
    <p class="mb10"
      >使用 <code>showPreview</code> 控制是否展示颜色预览块；点击颜色预览块可以触发浏览器原生的颜色选择器</p
    >
    <Space vertical>
      <Space align="center"> showPreview: <Switch v-model:value="showPreview"></Switch> </Space>
      <ColorPicker :width="240" default-value="#ff6900" :show-preview="showPreview" @complete="handleComplele" />
    </Space>
    <h2 class="mt30 mb10">默认值</h2>
    <p class="mb10">未受控时使用 <code>default-value</code> 设置初始颜色</p>
    <ColorPicker :width="240" default-value="#ff6900" />
    <h2 class="mt30 mb10">自定义展示内容</h2>
    <p class="mb10">通过 <code>label</code> 属性（可返回字符串或 VNode）或 <code>label</code> 插槽自定义展示内容</p>
    <Space vertical>
      <ColorPicker :width="240" v-model:value="labelValue" :label="labelFormat" />
      <ColorPicker :width="240" v-model:value="labelValue" :label="labelRender" />
      <ColorPicker :width="240" v-model:value="labelValue">
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
    <h2 class="mt30 mb10">额外页脚</h2>
    <ColorPicker :width="240">
      <template #footer> extra footer </template>
    </ColorPicker>
    <h2 class="mt30 mb10">使用按钮控制面板</h2>
    <p class="mb10">使用 <code>Tooltip</code> 组件的 <code>show</code> 属性控制面板显隐</p>
    <Space>
      <ColorPicker :width="240" default-value="#ff6900" v-model:show="show" />
      <Button type="primary" @click="show = true">显示</Button>
      <Button @click="show = false">隐藏</Button>
    </Space>
  </div>
</template>
<style lang="less" scoped>
.trigger-dot {
  display: block;
  width: 22px;
  height: 22px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.trigger-text {
  cursor: pointer;
}
</style>
