# 颜色选择器 ColorPicker

<GlobalElement />

_用于选择和展示颜色_

## 何时使用

- 当需要选择颜色或展示颜色时

<script setup lang="ts">
import { ref, watchEffect, h } from 'vue'
import { BgColorsOutlined } from '@ant-design/icons-vue'
import type { CheckboxOption } from 'vue-amazing-ui'
const colorValue = ref('rgba(0, 0, 0, 1)')
const showAlpha = ref(false)
const modes = ref(['rgb', 'hex'])
const actions = ref(['confirm', 'clear'])
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

## 基本使用

<ColorPicker :width="240" v-model:value="colorValue" />

:::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const colorValue = ref('rgba(0, 0, 0, 1)')
watchEffect(() => {
  console.log('colorValue', colorValue.value)
})
</script>
<template>
  <ColorPicker :width="240" v-model:value="colorValue" />
</template>
```

::::

## 不透明度

_`show-alpha` 控制是否可调节 `alpha` 通道_

<br/>

<Space vertical>
  <Space align="center"> showAlpha: <Switch v-model:value="showAlpha"></Switch> </Space>
  <ColorPicker :width="240" default-value="#ff6900" :show-alpha="showAlpha" />
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const showAlpha = ref(false)
</script>
<template>
  <Space vertical>
    <Space align="center"> showAlpha: <Switch v-model:value="showAlpha"></Switch> </Space>
    <ColorPicker :width="240" default-value="#ff6900" :show-alpha="showAlpha" />
  </Space>
</template>
```

::::

## 尺寸

<Space vertical>
  <ColorPicker :width="240" size="small" />
  <ColorPicker :width="240" />
  <ColorPicker :width="240" size="large" />
</Space>

:::: details Show Code

```vue
<template>
  <Space vertical>
    <ColorPicker :width="240" size="small" />
    <ColorPicker :width="240" />
    <ColorPicker :width="240" size="large" />
  </Space>
</template>
```

::::

## 禁用

<ColorPicker :width="240" default-value="#ff6900" disabled />

:::: details Show Code

```vue
<template>
  <ColorPicker :width="240" default-value="#ff6900" disabled />
</template>
```

::::

## 设定模式

_使用 `modes` 设定可选模式_

<br/>

<Space vertical>
  <Space align="center"> modes: <Checkbox :options="modeOptions" v-model:value="modes" /> </Space>
  <ColorPicker :width="240" default-value="#ff6900" :modes="modes" />
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
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
</script>
<template>
  <Space vertical>
    <Space align="center"> modes: <Checkbox :options="modeOptions" v-model:value="modes" /> </Space>
    <ColorPicker :width="240" default-value="#ff6900" :modes="modes" />
  </Space>
</template>
```

::::

## 显示按钮

_通过在 `actions` 属性中添加 `confirm` `clear`，来显示确认/清除按钮_

<br/>

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

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
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
</template>
```

::::

## 预设色板

_`swatches` 设置预设色板，色板支持鼠标点击与键盘 `Enter` 选色_

<br/>

<ColorPicker :width="240" default-value="#ff6900" :swatches="swatches" @complete="handleComplele" />

:::: details Show Code

```vue
<script setup lang="ts">
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
function handleComplele(color: string) {
  console.log('complete', color)
}
</script>
<template>
  <ColorPicker :width="240" default-value="#ff6900" :swatches="swatches" @complete="handleComplele" />
</template>
```

::::

## 自定义触发器

_使用 `trigger` 插槽自定义触发器_

<br/>

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

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { BgColorsOutlined } from '@ant-design/icons-vue'
const triggerColor1 = ref('#ff6900')
const triggerColor2 = ref('#1677ff')
const triggerColor3 = ref('#722ed1')
function handleComplele(color: string) {
  console.log('complete', color)
}
</script>
<template>
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
        <span
          class="trigger-dot"
          :style="`background-color: ${value || '#000000'}`"
          @click="onClick"
        ></span>
      </template>
    </ColorPicker>
    <ColorPicker v-model:value="triggerColor3" @complete="handleComplele">
      <template #trigger="{ value, onClick }">
        <span class="trigger-text" :style="`color: ${value}`" @click="onClick">{{ value }}</span>
      </template>
    </ColorPicker>
  </Space>
</template>
```

::::

## 颜色预览块

_使用 `showPreview` 控制是否展示颜色预览块；点击颜色预览块可以触发浏览器原生的颜色选择器_

<br/>

<Space vertical>
  <Space align="center"> showPreview: <Switch v-model:value="showPreview"></Switch> </Space>
  <ColorPicker :width="240" default-value="#ff6900" :show-preview="showPreview" @complete="handleComplele" />
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const showPreview = ref(true)
function handleComplele(color: string) {
  console.log('complete', color)
}
</script>
<template>
  <Space vertical>
    <Space align="center"> showPreview: <Switch v-model:value="showPreview"></Switch> </Space>
    <ColorPicker :width="240" default-value="#ff6900" :show-preview="showPreview" @complete="handleComplele" />
  </Space>
</template>
```

::::

## 默认值

_未受控时使用 `default-value` 设置初始颜色_

<br/>

<ColorPicker :width="240" default-value="#ff6900" />

:::: details Show Code

```vue
<template>
  <ColorPicker :width="240" default-value="#ff6900" />
</template>
```

::::

## 自定义展示内容

_通过 `label` 属性（可返回字符串或 VNode）或 `label` 插槽自定义展示内容_

<br/>

<Space vertical>
  <ColorPicker :width="240" v-model:value="labelValue" :label="labelFormat" />
  <ColorPicker :width="240" v-model:value="labelValue" :label="labelRender" />
  <ColorPicker :width="240" v-model:value="labelValue">
    <template #label="{ color }">
      I'm {{ color }}
    </template>
  </ColorPicker>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
const labelValue = ref('#ff6900')
function labelFormat(color: string) {
  return `hello ${color}`
}
function labelRender(color: string) {
  return h('span', { style: 'font-weight: 600' }, `HELLO ${color}`)
}
</script>
<template>
  <Space vertical>
    <ColorPicker :width="240" v-model:value="labelValue" :label="labelFormat" />
    <ColorPicker :width="240" v-model:value="labelValue" :label="labelRender" />
    <ColorPicker :width="240" v-model:value="labelValue">
      <template #label="{ color }">
        I'm {{ color }}
      </template>
    </ColorPicker>
  </Space>
</template>
```

::::

## 自定义面板样式

<ColorPicker
  :width="240"
  :tooltip-style="{
    width: '280px',
    padding: '4px',
    borderRadius: '8px'
  }"
/>

:::: details Show Code

```vue
<template>
  <ColorPicker
    :width="240"
    :tooltip-style="{
      width: '280px',
      padding: '4px',
      borderRadius: '8px'
    }"
  />
</template>
```

::::

## 额外页脚

<ColorPicker :width="240">
  <template #footer> extra footer </template>
</ColorPicker>

:::: details Show Code

```vue
<template>
  <ColorPicker :width="240">
    <template #footer> extra footer </template>
  </ColorPicker>
</template>
```

::::

## 使用按钮控制面板

_使用 `Tooltip` 组件的 `show` 属性控制面板显隐_

<br/>

<Space>
  <ColorPicker :width="240" default-value="#ff6900" v-model:show="show" />
  <Button type="primary" @click="show = true">显示</Button>
  <Button @click="show = false">隐藏</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const show = ref(false)
watchEffect(() => {
  console.log('show', show.value)
})
</script>
<template>
  <Space>
    <ColorPicker :width="240" default-value="#ff6900" v-model:show="show" />
    <Button type="primary" @click="show = true">显示</Button>
    <Button @click="show = false">隐藏</Button>
  </Space>
</template>
```

::::

<br/>

> *更多使用方式请参考 [文字提示 Tooltip](./tooltip.md)*

## APIs

### ColorPicker

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
value <Tag color="cyan">v-model</Tag> | 颜色选择器的值 | string | undefined
defaultValue | 未受控时的初始颜色值 | string | undefined
label | 展示的内容，返回值同时支持字符串与 VNode | (color: string) => VNodeChild | undefined
swatches | 色板的值 | string[] | []
footer | 底部额外的页脚内容 | string | undefined
modes | 颜色选择器支持颜色的格式 | [ColorPickerMode](#colorpickermode-type)[] | ['rgb', 'hex', 'hsl']
width | 颜色选择器的宽度，单位 `px`；仅内置触发器生效，使用 `trigger` 插槽自定义触发器时容器随触发器内容自适应 | string &#124; number | '100%'
size | 颜色选择器的尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
showAlpha | 是否可调节 `alpha` 通道 | boolean | true
showPreview | 是否展示颜色预览块 | boolean | false
placement | 弹出面板的位置 | 'top' &#124; 'topLeft' &#124; 'topRight' &#124; 'bottom' &#124; 'bottomLeft' &#124; 'bottomRight' &#124; 'left' &#124; 'leftTop' &#124; 'leftBottom' &#124; 'right' &#124; 'rightTop' &#124; 'rightBottom' | 'bottomLeft'
disabled | 是否禁用 | boolean | false
actions | 显示按钮 | [ColorPickerAction](#colorpickeraction-type)[] | []
tooltipStyle | 设置弹出面板的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
inputProps | 输入框组件 `props`，参考 [Input Props](./input.md#input) | [InputProps](./input.md#input) | {}
to | 弹出面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地 | string &#124; HTMLElement &#124; false | undefined

更多属性请参考 [Tooltip Props](./tooltip.md#tooltip)

### ColorPickerMode Type

名称 | 值
:-- | :--
ColorPickerMode | 'rgb' &#124; 'hsl' &#124; 'hsv' &#124; 'hex'

### ColorPickerAction Type

名称 | 值
:-- | :--
ColorPickerAction | 'confirm' &#124; 'clear'

## Slots

名称 | 说明 | 用法
:-- | :-- | :--
label | 自定义展示的内容 | v-slot:label="{ color }"
footer | 自定义底部额外的页脚内容 | v-slot:footer
trigger | 自定义触发器 | v-slot:trigger="{ value, onClick, ref }"

## Events

名称 | 说明 | 类型
:-- | :-- | :--
complete | 颜色完成改变后的回调（输入框提交和鼠标拖动结束时触发；点击色板、点击清除、原生取色器选色不触发） | (color: string) => void
confirm | 点击确认按钮的回调 | (color: string) => void
clear | 点击清除按钮的回调 | () => void

<style lang="less" scoped>
.trigger-dot {
  /* 保持块级：行内元素会生成行盒，圆点被行盒支柱按基线对齐顶偏；块级则让宿主高度恰为圆点高度 */
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
