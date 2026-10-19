<script setup lang="ts">
import { ref, computed, watchEffect, h } from 'vue'
import { BgColorsOutlined } from '@ant-design/icons-vue'
import type { CheckboxGroupOption, ColorPickerMode, ColorPickerAction, ColorPickerProps } from 'vue-amazing-ui'
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
// 弹出位置：分段切换方位 + 数字输入框调间距，单个实例即可覆盖各组合
type Placement = NonNullable<ColorPickerProps['placement']>
const placement = ref<Placement>('bottomLeft')
const offset = ref(6)
// 8 档顺时针（四角 + 四边）：覆盖主要方位；标签用真实枚举值，便于直接照抄
const placementOptions: { label: string; value: Placement }[] = [
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottom', value: 'bottom' },
  { label: 'bottomRight', value: 'bottomRight' },
  { label: 'right', value: 'right' },
  { label: 'topRight', value: 'topRight' },
  { label: 'top', value: 'top' },
  { label: 'topLeft', value: 'topLeft' },
  { label: 'left', value: 'left' }
]
const labelValue = ref('#ff6900')
const open = ref(false)
// 浮层挂载与卸载：to 三态 + destroyOnHide 开关驱动同一实例
type ToMode = 'auto' | 'false' | 'container'
const toMode = ref<ToMode>('auto')
const toOptions: { label: string; value: ToMode }[] = [
  { label: '默认', value: 'auto' },
  { label: '留在原地', value: 'false' },
  { label: '挂到示例容器', value: 'container' }
]
const destroyMode = ref(false)
const containerRef = ref<HTMLDivElement>()
// to 的三态映射：不传（默认承载层 / body）/ false（留在原地）/ 示例容器元素
const panelTo = computed(() => {
  const mode = toMode.value
  if (mode === 'false') return false
  if (mode === 'container') return containerRef.value
  return undefined
})
const modeOptions: CheckboxGroupOption[] = [
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
const actionOptions: CheckboxGroupOption[] = [
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
  console.log('open', open.value)
})
function labelFormat(color: string) {
  return `hello ${color}`
}
function labelRender(color: string) {
  return h('span', { style: 'font-weight: 600' }, `HELLO ${color}`)
}
function handleComplete(color: string) {
  console.log('complete', color)
}
function handleUpdateValue(color: string) {
  console.log('update:value', color)
}
function handleConfirm(color: string) {
  console.log('confirm', color)
}
function handleClear() {
  console.log('clear')
}
function handleOpenChange(value: boolean) {
  console.log('openChange', value)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <ColorPicker :width="240" v-model:value="colorValue" />
    <h2 class="mt30 mb10">不透明度</h2>
    <p class="mb10"><code>showAlpha</code> 控制是否可调节 <code>alpha</code> 通道</p>
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
    <p class="mb10">使用 <code>modes</code> 设定可选的颜色格式</p>
    <Space vertical>
      <Space align="center"> modes: <CheckboxGroup :options="modeOptions" v-model:value="modes" /> </Space>
      <ColorPicker :width="240" default-value="#ff6900" :modes="modes" />
    </Space>
    <h2 class="mt30 mb10">显示按钮</h2>
    <p class="mb10"
      >在 <code>actions</code> 属性中添加 <code>confirm</code> / <code>clear</code>，即可显示对应的确认 / 清除按钮</p
    >
    <Space vertical>
      <Space align="center"> actions: <CheckboxGroup :options="actionOptions" v-model:value="actions" /> </Space>
      <ColorPicker
        :width="240"
        default-value="#ff6900"
        :actions="actions"
        @complete="handleComplete"
        @confirm="handleConfirm"
        @clear="handleClear"
      />
    </Space>
    <h2 class="mt30 mb10">预设色板</h2>
    <p class="mb10">使用 <code>swatches</code> 设置预设色板，色板支持鼠标点击与键盘 <code>Enter</code> 选色</p>
    <ColorPicker :width="240" default-value="#ff6900" :swatches="swatches" @update:value="handleUpdateValue" />
    <h2 class="mt30 mb10">自定义触发器</h2>
    <p class="mb10"
      >使用 <code>trigger</code> 插槽自定义触发器（点击开合、面板定位与外点判定均由组件接管，程序化开合请用
      <code>v-model:open</code>）</p
    >
    <Space align="center">
      <ColorPicker v-model:value="triggerColor1" @complete="handleComplete">
        <template #trigger="{ value }">
          <Button shape="circle" type="text">
            <template #icon>
              <BgColorsOutlined :style="{ color: value }" />
            </template>
          </Button>
        </template>
      </ColorPicker>
      <ColorPicker v-model:value="triggerColor2" @complete="handleComplete">
        <template #trigger="{ value }">
          <span class="trigger-dot" :style="`background-color: ${value || '#000000'}`"></span>
        </template>
      </ColorPicker>
      <ColorPicker v-model:value="triggerColor3" @complete="handleComplete">
        <template #trigger="{ value }">
          <span class="trigger-text" :style="`color: ${value}`">{{ value }}</span>
        </template>
      </ColorPicker>
    </Space>
    <h2 class="mt30 mb10">颜色预览块</h2>
    <p class="mb10">使用 <code>showPreview</code> 控制预览块显隐；点击预览块可唤起浏览器原生取色器</p>
    <Space vertical>
      <Space align="center"> showPreview: <Switch v-model:value="showPreview"></Switch> </Space>
      <ColorPicker :width="240" default-value="#ff6900" :show-preview="showPreview" @update:value="handleUpdateValue" />
    </Space>
    <h2 class="mt30 mb10">弹出位置</h2>
    <p class="mb10"
      >使用 <code>placement</code> 设置面板的弹出位置（默认 <code>bottomLeft</code>）；<code>offset</code>
      控制面板与触发器的主轴间距，默认 <code>6</code></p
    >
    <Space vertical>
      <Space align="center"> placement: <Segmented v-model:value="placement" :options="placementOptions" /> </Space>
      <Space align="center"> offset: <InputNumber v-model:value="offset" :min="0" :max="40" /> </Space>
      <ColorPicker :width="240" default-value="#ff6900" :placement="placement" :offset="offset" />
    </Space>
    <h2 class="mt30 mb10">默认值</h2>
    <p class="mb10">未受控时使用 <code>defaultValue</code> 设置初始颜色</p>
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
    <p class="mb10"
      >通过 <code>panelStyle</code> 设置面板样式、<code>panelClass</code> 自定义面板类名，两者均落在
      <code>Teleport</code> 后的面板上；<code>panelClass</code> 的样式需写在全局样式中（<code>scoped</code>
      样式无法命中），<code>zIndex</code> 用于覆盖面板层级（默认 <code>1050</code>）</p
    >
    <Space align="center">
      <ColorPicker
        :width="240"
        :panel-style="{
          width: '280px',
          padding: '4px',
          borderRadius: '8px'
        }"
      />
      <ColorPicker :width="240" default-value="#ff6900" panel-class="custom-color-picker-panel" />
      <ColorPicker :width="240" default-value="#ff6900" :z-index="1100" />
    </Space>
    <h2 class="mt30 mb10">额外页脚</h2>
    <ColorPicker :width="240">
      <template #footer> extra footer </template>
    </ColorPicker>
    <h2 class="mt30 mb10">受控展开</h2>
    <p class="mb10"
      >使用 <code>v-model:open</code> 控制面板显隐；点击触发器、点击外部与 <code>Esc</code> 收起都会写回
      <code>open</code>，<code>openChange</code> 同步派发展开状态的变化</p
    >
    <Space align="center">
      <ColorPicker :width="240" default-value="#ff6900" v-model:open="open" @open-change="handleOpenChange" />
      <Button type="primary" :disabled="open" @click="open = true">显示</Button>
      <Button :disabled="!open" @click="open = false">隐藏</Button>
    </Space>
    <h2 class="mt30 mb10">浮层挂载与卸载</h2>
    <p class="mb10"
      >通过 <code>to</code> 指定面板挂载的容器（不传时优先挂到最近的承载层内容容器，无承载层时为 <code>body</code>；设为
      <code>false</code> 时留在原地）</p
    >
    <p class="mb10"
      >设置 <code>destroyOnHide</code> 后，面板在离开动画结束时卸载 <code>DOM</code>，再次展开时重新创建并定位，默认
      <code>false</code> 时元素常驻、仅切换显隐。两者只改变挂载点与节点存亡，外观与交互一致，差异需在开发者工具中查看</p
    >
    <Space vertical>
      <Space align="center"> to: <Segmented v-model:value="toMode" :options="toOptions" /> </Space>
      <Space align="center"> destroyOnHide: <Switch v-model:value="destroyMode" /> </Space>
      <div
        ref="containerRef"
        style="display: inline-block; padding: 48px 24px; border-radius: 8px; border: 1px dashed #d9d9d9"
      >
        <ColorPicker :width="240" default-value="#ff6900" :to="panelTo" :destroy-on-hide="destroyMode" />
      </div>
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
<style lang="less">
/* 面板经 Teleport 挂载，scoped 样式无法命中，故用 panelClass 下发类名 + 全局样式 */
@demo-primary: #ff6900;

.custom-color-picker-panel {
  border: 1px solid @demo-primary;
  box-shadow: 0 8px 20px fade(@demo-primary, 25%);
}
</style>
