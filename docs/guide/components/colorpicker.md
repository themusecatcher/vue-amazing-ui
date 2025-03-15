# 颜色选择器 ColorPicker

<GlobalElement />

*用于选择和展示颜色*

## 何时使用

- 当需要选择颜色或展示颜色时

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

## 基本使用

<ColorPicker :width="240" v-model:value="colorValue" />

::: details Show Code

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

:::

## 自定义展示内容

<Space :width="240">
  <ColorPicker :label="labelFormat"/>
  <ColorPicker>
    <template #label="{ color }">
      I'm {{ color }}
    </template>
  </ColorPicker>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
function labelFormat(color: string) {
  return `hello ${color}`
}
</script>
<template>
  <Space :width="240">
    <ColorPicker :label="labelFormat"/>
    <ColorPicker>
      <template #label="{ color }">
        I'm {{ color }}
      </template>
    </ColorPicker>
  </Space>
</template>
```

:::

## 自定义面板样式

<ColorPicker
  :width="240"
  :tooltip-style="{
    width: '280px',
    padding: '4px',
    borderRadius: '8px'
  }"
/>

::: details Show Code

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

:::

## 不透明度

*`show-alpha` 控制是否可调节 `alpha` 通道*

<br/>

<Space vertical>
  <Space align="center"> showAlpha: <Switch v-model="showAlpha"></Switch> </Space>
  <ColorPicker :width="240" :show-alpha="showAlpha" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const showAlpha = ref(false)
</script>
<template>
  <Space vertical>
    <Space align="center"> showAlpha: <Switch v-model="showAlpha"></Switch> </Space>
    <ColorPicker :width="240" :show-alpha="showAlpha" />
  </Space>
</template>
```

:::

## 颜色预览块

*使用 `showPreview` 控制是否展示颜色预览块；点击颜色预览块可以触发浏览器原生的颜色选择器*
<br/>

<Space vertical>
  <Space align="center"> showPreview: <Switch v-model="showPreview"></Switch> </Space>
  <ColorPicker :width="240" :show-preview="showPreview" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const showPreview = ref(true)
</script>
<template>
  <Space vertical>
    <Space align="center"> showPreview: <Switch v-model="showPreview"></Switch> </Space>
    <ColorPicker :width="240" :show-preview="showPreview" />
  </Space>
</template>
```

:::

## 尺寸

<Space :width="240">
  <ColorPicker size="small" />
  <ColorPicker />
  <ColorPicker size="large" />
</Space>

::: details Show Code

```vue
<template>
  <Space :width="240">
    <ColorPicker size="small" />
    <ColorPicker />
    <ColorPicker size="large" />
  </Space>
</template>
```

:::

## 禁用

<ColorPicker :width="240" disabled />

::: details Show Code

```vue
<template>
  <Space :width="240">
    <ColorPicker disabled />
  </Space>
</template>
```

:::

## 设定模式

*使用 `modes` 设定可选模式*

<br/>

<Space vertical>
  <Space align="center"> modes: <Checkbox :options="modeOptions" v-model:value="modes" /> </Space>
  <ColorPicker :width="240" :modes="modes" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
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
const modes = ref(['rgb'])
</script>
<template>
  <Space vertical>
    <Space align="center"> modes: <Checkbox :options="modeOptions" v-model:value="modes" /> </Space>
    <ColorPicker :width="240" :modes="modes" />
  </Space>
</template>
```

:::

## 预设色板

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

::: details Show Code

```vue
<template>
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
</template>
```

:::

## 显示按钮

*通过在 `actions` 属性中添加 `confirm` `clear`，来显示确认/清除按钮*

<br/>

<Space vertical>
  <Space align="center"> actions: <Checkbox :options="actionOptions" v-model:value="actions" /> </Space>
  <ColorPicker :width="240" :actions="actions" @confirm="handleConfirm" @clear="handleClear" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
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
    <ColorPicker :width="240" :actions="actions" @complete="handleComplele" @confirm="handleConfirm" @clear="handleClear" />
  </Space>
</template>
```

:::

## 额外页脚

<ColorPicker :width="240">
  <template #footer> extra footer </template>
</ColorPicker>

::: details Show Code

```vue
<template>
  <ColorPicker :width="240">
    <template #footer> extra footer </template>
  </ColorPicker>
</template>
```

:::

## 使用按钮控制面板

*使用 `Tooltip` 组件的 `show` 属性控制面板显隐*

<br/>

<Space>
  <ColorPicker :width="240" v-model:show="show" />
  <Button type="primary" @click="show = true">显示</Button>
  <Button @click="show = false">隐藏</Button>
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const show = ref(false)
watchEffect(() => {
  console.log('show', show.value)
})
</script>
<template>
  <Space>
    <ColorPicker :width="240" v-model:show="show" />
    <Button type="primary" @click="show = true">显示</Button>
    <Button @click="show = false">隐藏</Button>
  </Space>
</template>
```

:::

<br/>

> *更多使用方式请参考 [文字提示 Tooltip](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html)*

## APIs

### ColorPicker

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
width | 颜色选择器的宽度，单位 `px` | string &#124; number | '100%'
label | 展示的内容 | (color: string) => string &#124; slot | undefined
tooltipStyle | 设置弹出面板的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
inputProps | 输入框组件 `props`，参考 [Input Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/input.html#input) | object | {}
showAlpha | 是否可调节 `alpha` 通道 | boolean | true
showPreview | 是否展示颜色预览块 | boolean | false
size | 颜色选择器的尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
disabled | 是否禁用 | boolean | false
value <Tag color="cyan">v-model</Tag> | 颜色选择器的值 | string | undefined
modes | 颜色选择器支持颜色的格式 | [ColorPickerMode](#colorpickermode-type)[] | ['rgb', 'hex', 'hsl']
swatches | 色板的值 | string[] | []
actions | 显示按钮 | [ColorPickerAction](#colorpickeraction-type)[] | []
footer | 底部额外的页脚内容 | string &#124; slot | undefined

更多属性请参考 [Tooltip](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip)

### ColorPickerMode Type

名称 | 值
:-- | :--
ColorPickerMode | 'rgb' &#124; 'hsl' &#124; 'hsv' &#124; 'hex'

### ColorPickerAction Type

名称 | 值
:-- | :--
ColorPickerAction | 'confirm' &#124; 'clear'

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
label | 自定义展示的内容 | v-slot:label="{ color }"
footer | 自定义底部额外的页脚内容 | v-slot:footer

## Events

名称 | 说明 | 类型
:-- | :-- | :--
complete | 颜色完成改变后的回调（在鼠标拖动时候不会调用） | (color: string) => void
confirm | 点击确认按钮的回调 | (color: string) => void
clear | 点击清除按钮的回调 | () => void
