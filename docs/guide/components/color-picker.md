# 颜色选择器 ColorPicker

<GlobalElement />

_用于选择和展示颜色_

## 何时使用

- 当需要选择颜色或展示颜色时

<script setup lang="ts">
import { ref, computed, watchEffect, h } from 'vue'
import { BgColorsOutlined } from '@ant-design/icons-vue'
import type { CheckboxOption, ColorPickerProps } from 'vue-amazing-ui'
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

## 不透明度

_`showAlpha` 控制是否可调节 `alpha` 通道_

<br/>

<Space vertical>
  <Space align="center"> showAlpha: <Switch v-model:value="showAlpha"></Switch> </Space>
  <ColorPicker :width="240" default-value="#ff6900" :show-alpha="showAlpha" />
</Space>

::: details Show Code

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

:::

## 尺寸

<Space vertical>
  <ColorPicker :width="240" size="small" />
  <ColorPicker :width="240" />
  <ColorPicker :width="240" size="large" />
</Space>

::: details Show Code

```vue
<template>
  <Space vertical>
    <ColorPicker :width="240" size="small" />
    <ColorPicker :width="240" />
    <ColorPicker :width="240" size="large" />
  </Space>
</template>
```

:::

## 禁用

<ColorPicker :width="240" default-value="#ff6900" disabled />

::: details Show Code

```vue
<template>
  <ColorPicker :width="240" default-value="#ff6900" disabled />
</template>
```

:::

## 设定模式

_使用 `modes` 设定可选的颜色格式_

<br/>

<Space vertical>
  <Space align="center"> modes: <Checkbox :options="modeOptions" v-model:value="modes" /> </Space>
  <ColorPicker :width="240" default-value="#ff6900" :modes="modes" />
</Space>

::: details Show Code

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

:::

## 显示按钮

_在 `actions` 属性中添加 `confirm` / `clear`，即可显示对应的确认 / 清除按钮_

<br/>

<Space vertical>
  <Space align="center"> actions: <Checkbox :options="actionOptions" v-model:value="actions" /> </Space>
  <ColorPicker
    :width="240"
    default-value="#ff6900"
    :actions="actions"
    @complete="handleComplete"
    @confirm="handleConfirm"
    @clear="handleClear"
  />
</Space>

::: details Show Code

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
function handleComplete(color: string) {
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
      @complete="handleComplete"
      @confirm="handleConfirm"
      @clear="handleClear"
    />
  </Space>
</template>
```

:::

## 预设色板

_使用 `swatches` 设置预设色板，色板支持鼠标点击与键盘 `Enter` 选色_

<br/>

<ColorPicker :width="240" default-value="#ff6900" :swatches="swatches" @update:value="handleUpdateValue" />

::: details Show Code

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
function handleUpdateValue(color: string) {
  console.log('update:value', color)
}
</script>
<template>
  <ColorPicker :width="240" default-value="#ff6900" :swatches="swatches" @update:value="handleUpdateValue" />
</template>
```

:::

## 自定义触发器

_使用 `trigger` 插槽自定义触发器（点击开合、面板定位与外点判定均由组件接管，程序化开合请用 `v-model:open`）_

<br/>

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { BgColorsOutlined } from '@ant-design/icons-vue'
const triggerColor1 = ref('#ff6900')
const triggerColor2 = ref('#1677ff')
const triggerColor3 = ref('#722ed1')
function handleComplete(color: string) {
  console.log('complete', color)
}
</script>
<template>
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
        <span
          class="trigger-dot"
          :style="`background-color: ${value || '#000000'}`"
        ></span>
      </template>
    </ColorPicker>
    <ColorPicker v-model:value="triggerColor3" @complete="handleComplete">
      <template #trigger="{ value }">
        <span class="trigger-text" :style="`color: ${value}`">{{ value }}</span>
      </template>
    </ColorPicker>
  </Space>
</template>
```

:::

## 颜色预览块

_使用 `showPreview` 控制预览块显隐；点击预览块可唤起浏览器原生取色器_

<br/>

<Space vertical>
  <Space align="center"> showPreview: <Switch v-model:value="showPreview"></Switch> </Space>
  <ColorPicker :width="240" default-value="#ff6900" :show-preview="showPreview" @update:value="handleUpdateValue" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const showPreview = ref(true)
function handleUpdateValue(color: string) {
  console.log('update:value', color)
}
</script>
<template>
  <Space vertical>
    <Space align="center"> showPreview: <Switch v-model:value="showPreview"></Switch> </Space>
    <ColorPicker :width="240" default-value="#ff6900" :show-preview="showPreview" @update:value="handleUpdateValue" />
  </Space>
</template>
```

:::

## 弹出位置

_使用 `placement` 设置面板的弹出位置（默认 `bottomLeft`）；`offset` 控制面板与触发器的主轴间距，默认 `6`_

<br/>

<Space vertical>
  <Space align="center"> placement: <Segmented v-model:value="placement" :options="placementOptions" /> </Space>
  <Space align="center"> offset: <InputNumber v-model:value="offset" :min="0" :max="40" /> </Space>
  <ColorPicker :width="240" default-value="#ff6900" :placement="placement" :offset="offset" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ColorPickerProps } from 'vue-amazing-ui'
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
</script>
<template>
  <Space vertical>
    <Space align="center"> placement: <Segmented v-model:value="placement" :options="placementOptions" /> </Space>
    <Space align="center"> offset: <InputNumber v-model:value="offset" :min="0" :max="40" /> </Space>
    <ColorPicker :width="240" default-value="#ff6900" :placement="placement" :offset="offset" />
  </Space>
</template>
```

:::

## 默认值

_未受控时使用 `defaultValue` 设置初始颜色_

<br/>

<ColorPicker :width="240" default-value="#ff6900" />

::: details Show Code

```vue
<template>
  <ColorPicker :width="240" default-value="#ff6900" />
</template>
```

:::

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

::: details Show Code

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

:::

## 自定义面板样式

_通过 `panelStyle` 设置面板样式、`panelClass` 自定义面板类名，两者均落在 `Teleport` 后的面板上；`panelClass` 的样式需写在全局样式中（`scoped` 样式无法命中），`zIndex` 用于覆盖面板层级（默认 `1050`）_

<br/>

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

::: details Show Code

```vue
<template>
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
</template>

<style lang="less">
/* 面板经 Teleport 挂载，scoped 样式无法命中，故用 panelClass 下发类名 + 全局样式 */
@demo-primary: #ff6900;

.custom-color-picker-panel {
  border: 1px solid @demo-primary;
  box-shadow: 0 8px 20px fade(@demo-primary, 25%);
}
</style>
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

## 受控展开

_使用 `v-model:open` 控制面板显隐；点击触发器、点击外部与 `Esc` 收起都会写回 `open`，`openChange` 同步派发展开状态的变化_

<br/>

<Space align="center">
  <ColorPicker :width="240" default-value="#ff6900" v-model:open="open" @open-change="handleOpenChange" />
  <Button type="primary" :disabled="open" @click="open = true">显示</Button>
  <Button :disabled="!open" @click="open = false">隐藏</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function handleOpenChange(value: boolean) {
  console.log('openChange', value)
}
</script>
<template>
  <Space align="center">
    <ColorPicker :width="240" default-value="#ff6900" v-model:open="open" @open-change="handleOpenChange" />
    <Button type="primary" :disabled="open" @click="open = true">显示</Button>
    <Button :disabled="!open" @click="open = false">隐藏</Button>
  </Space>
</template>
```

:::

## 浮层挂载与卸载

_通过 `to` 指定面板挂载的容器（不传时优先挂到最近的承载层内容容器，无承载层时为 `body`；设为 `false` 时留在原地）_

_设置 `destroyOnHide` 后，面板在离开动画结束时卸载 `DOM`，再次展开时重新创建并定位，默认 `false` 时元素常驻、仅切换显隐。两者只改变挂载点与节点存亡，外观与交互一致，差异需在开发者工具中查看_

<br/>

<Space vertical>
  <Space align="center"> to: <Segmented v-model:value="toMode" :options="toOptions" /> </Space>
  <Space align="center"> destroyOnHide: <Switch v-model:value="destroyMode" /> </Space>
  <div ref="containerRef" style="display: inline-block; padding: 48px 24px; border-radius: 8px; border: 1px dashed #d9d9d9">
    <ColorPicker :width="240" default-value="#ff6900" :to="panelTo" :destroy-on-hide="destroyMode" />
  </div>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
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
</script>
<template>
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
</template>
```

:::

## APIs

### ColorPicker

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
value <Tag color="cyan">v-model</Tag> | 颜色选择器的值 | string | undefined
defaultValue | 未受控时的初始颜色值 | string | undefined
open <Tag color="cyan">v-model</Tag> | 面板是否展开（受控，不传时由组件内部维护） | boolean | undefined
defaultOpen | 未受控时面板的初始显隐 | boolean | false
label | 展示的内容，返回值同时支持字符串与 VNode | (color: string) => VNodeChild | undefined
swatches | 色板的值 | string[] | []
footer | 底部额外的页脚内容 | string | undefined
modes | 颜色选择器支持颜色的格式 | [ColorPickerMode](#colorpickermode-type)[] | ['rgb', 'hex', 'hsl']
width | 颜色选择器的宽度，单位 `px`；仅内置触发器生效，使用 `trigger` 插槽自定义触发器时外壳随触发器内容自适应 | string &#124; number | '100%'
size | 颜色选择器的尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
showAlpha | 是否可调节 `alpha` 通道 | boolean | true
showPreview | 是否展示颜色预览块 | boolean | false
placement | 弹出面板的位置 | 'top' &#124; 'topLeft' &#124; 'topRight' &#124; 'bottom' &#124; 'bottomLeft' &#124; 'bottomRight' &#124; 'left' &#124; 'leftTop' &#124; 'leftBottom' &#124; 'right' &#124; 'rightTop' &#124; 'rightBottom' | 'bottomLeft'
disabled | 是否禁用 | boolean | false
actions | 显示按钮 | [ColorPickerAction](#colorpickeraction-type)[] | []
panelClass | 面板的类名（皮肤挂载点） | string | undefined
panelStyle | 面板样式，在定位与层级之后合并 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
zIndex | 面板层级，优先级最高（未传时使用默认层级或 `ConfigProvider` 的 `baseZIndex` 分配） | number | undefined
offset | 面板与触发器的主轴间距，单位 `px` | number | 6
destroyOnHide | 隐藏后是否卸载面板 `DOM`，再次展开时重新创建并重新定位 | boolean | false
to | 弹出面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地 | string &#124; HTMLElement &#124; false | undefined
inputProps | 输入框组件 `props`，参考 [Input Props](./input.md#input) | [InputProps](./input.md#input) | {}

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
trigger | 自定义触发器（点击开合、面板定位与外点判定均由组件接管，无需回传处理函数与 `ref`） | v-slot:trigger="{ value }"

## Events

名称 | 说明 | 类型
:-- | :-- | :--
openChange | 面板展开状态改变时的回调（内部开合与受控 `open` 被外部改变都算状态变化，状态未变时不派发） | (open: boolean) => void
complete | 颜色完成改变后的回调（输入框提交和鼠标拖动结束时触发；色板选色、点击清除、原生取色器选色不触发） | (color: string) => void
confirm | 点击确认按钮的回调 | (color: string) => void
clear | 点击清除按钮的回调 | () => void

> 触发语义由组件接管：点击触发区开合、点击外部关闭、`Esc` 收起并把焦点交还触发区、`Enter` / `Space` 开合（与点击同语义，键盘开合为内置常开）。自定义触发器内容请渲染在外壳内部；若内容自行 `@click.stop` 吞掉点击，面板不会展开（可用受控 `v-model:open` 自行控制）。

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

<style lang="less">
/* 面板经 Teleport 挂载，scoped 样式无法命中，故用 panelClass 下发类名 + 全局样式 */
@demo-primary: #ff6900;

.custom-color-picker-panel {
  border: 1px solid @demo-primary;
  box-shadow: 0 8px 20px fade(@demo-primary, 25%);
}
</style>
