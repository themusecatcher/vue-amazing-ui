# 文字提示 Tooltip

<GlobalElement />

*悬浮提示，展现需要关注的信息*

## 何时使用

- 当某个页面需要向用户显示警告的信息时

<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from 'vue-amazing-ui'
const containerRef = ref<HTMLDivElement>()
const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null)
const buttonWidth = 70
const presetColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
]
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9']
function openChange(open: boolean) {
  console.log('open', open)
}
function onShow() {
  tooltipRef.value?.show()
}
function onHide() {
  tooltipRef.value?.hide()
}
// 受控显示：由 show 驱动
const controlledShow = ref<boolean>(false)
const destroyShow = ref(false)
</script>

## 基本使用

<Space>
  <Tooltip tooltip="特斯拉" @open-change="openChange">
    <Button type="primary">Tesla</Button>
  </Tooltip>
  <Tooltip tooltip="哥斯拉" @open-change="openChange">
    <Button type="primary">Godzilla</Button>
  </Tooltip>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
function openChange(open: boolean) {
  console.log('open', open)
}
</script>
<template>
  <Space>
    <Tooltip tooltip="特斯拉" @open-change="openChange">
      <Button type="primary">Tesla</Button>
    </Tooltip>
    <Tooltip tooltip="哥斯拉" @open-change="openChange">
      <Button type="primary">Godzilla</Button>
    </Tooltip>
  </Space>
</template>
```

:::

## 自定义样式

*气泡卡片用 `tooltipClass` / `tooltipStyle`，其外层定位面板用 `popupClassName` / `popupStyle`，层级用 `zIndex`*

<Space gap="large">
  <Tooltip :max-width="360" bg-color="#fff" tooltip-class="custom-class">
    <template #tooltip>
      <p style="text-align: center">卡片类名</p>
      通过 tooltipClass 定制气泡卡片的字号、颜色与内边距
    </template>
    <Button type="primary">Card Class</Button>
  </Tooltip>
  <Tooltip
    :max-width="360"
    bg-color="#fff"
    :tooltip-style="{
      padding: '12px 18px',
      borderRadius: '12px',
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.88)'
    }"
  >
    <template #tooltip>
      <p style="text-align: center">卡片样式</p>
      通过 tooltipStyle 定制气泡卡片的样式
    </template>
    <Button type="primary">Card Style</Button>
  </Tooltip>
  <Tooltip
    :arrow="false"
    :max-width="360"
    bg-color="#fff"
    :tooltip-style="{ color: 'rgba(0, 0, 0, 0.88)' }"
    popup-class-name="custom-panel-class"
    :popup-style="{ filter: 'drop-shadow(0 6px 14px rgba(255, 105, 0, 0.45))' }"
    :z-index="1200"
  >
    <template #tooltip>
      <p style="text-align: center">定位面板</p>
      橙色虚线是定位面板（popupClassName），投影来自 popupStyle，层级由 zIndex 指定
    </template>
    <Button type="primary">Panel Class / zIndex</Button>
  </Tooltip>
</Space>

<style lang="less">
.custom-class {
  font-size: 16px !important;
  color: #0958d9 !important;
  padding: 12px 18px !important;
  border-radius: 12px !important;
  p {
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 600;
  }
}
/* 定位面板的类名入口：经公开的 popupClassName 下发（关闭箭头后面板与卡片等大，虚线即面板边界） */
.custom-panel-class {
  border-radius: 8px;
  outline: 1px dashed #ff6900;
}
</style>

::: details Show Code

```vue
<template>
  <Space gap="large">
    <Tooltip :max-width="360" bg-color="#fff" tooltip-class="custom-class">
      <template #tooltip>
        <p style="text-align: center">卡片类名</p>
        通过 tooltipClass 定制气泡卡片的字号、颜色与内边距
      </template>
      <Button type="primary">Card Class</Button>
    </Tooltip>
    <Tooltip
      :max-width="360"
      bg-color="#fff"
      :tooltip-style="{
        padding: '12px 18px',
        borderRadius: '12px',
        fontSize: '16px',
        color: 'rgba(0, 0, 0, 0.88)'
      }"
    >
      <template #tooltip>
        <p style="text-align: center">卡片样式</p>
        通过 tooltipStyle 定制气泡卡片的样式
      </template>
      <Button type="primary">Card Style</Button>
    </Tooltip>
    <Tooltip
      :arrow="false"
      :max-width="360"
      bg-color="#fff"
      :tooltip-style="{ color: 'rgba(0, 0, 0, 0.88)' }"
      popup-class-name="custom-panel-class"
      :popup-style="{ filter: 'drop-shadow(0 6px 14px rgba(255, 105, 0, 0.45))' }"
      :z-index="1200"
    >
      <template #tooltip>
        <p style="text-align: center">定位面板</p>
        橙色虚线是定位面板（popupClassName），投影来自 popupStyle，层级由 zIndex 指定
      </template>
      <Button type="primary">Panel Class / zIndex</Button>
    </Tooltip>
  </Space>
</template>
<style lang="less">
.custom-class {
  font-size: 16px !important;
  color: #0958d9 !important;
  padding: 12px 18px !important;
  border-radius: 12px !important;
  p {
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 600;
  }
}
.custom-panel-class {
  border-radius: 8px;
  outline: 1px dashed #ff6900;
}
</style>
```

:::

## 位置

位置有 12 个方向

<br/>

<div class="placement-demo">
  <div :style="{ marginLeft: `${buttonWidth}px`, whiteSpace: 'nowrap' }">
    <Tooltip tooltip="Vue Amazing UI" placement="topLeft">
      <Button class="place-btn">TL</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="top">
      <Button class="place-btn">Top</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="topRight">
      <Button class="place-btn">TR</Button>
    </Tooltip>
  </div>
  <div :style="{ width: `${buttonWidth}px`, float: 'left' }">
    <Tooltip tooltip="Vue Amazing UI" placement="leftTop">
      <Button class="place-btn">LT</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="left">
      <Button class="place-btn">Left</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="leftBottom">
      <Button class="place-btn">LB</Button>
    </Tooltip>
  </div>
  <div :style="{ width: `${buttonWidth}px`, marginLeft: `${buttonWidth * 4 + 24}px` }">
    <Tooltip tooltip="Vue Amazing UI" placement="rightTop">
      <Button class="place-btn">RT</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="right">
      <Button class="place-btn">Right</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="rightBottom">
      <Button class="place-btn">RB</Button>
    </Tooltip>
  </div>
  <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
    <Tooltip tooltip="Vue Amazing UI" placement="bottomLeft">
      <Button class="place-btn">BL</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="bottom">
      <Button class="place-btn">Bottom</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="bottomRight">
      <Button class="place-btn">BR</Button>
    </Tooltip>
  </div>
</div>

<style lang="less">
.placement-demo {
  .place-btn {
    width: 70px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
const buttonWidth = 70
</script>
<template>
  <div class="placement-demo">
    <div :style="{ marginLeft: `${buttonWidth}px`, whiteSpace: 'nowrap' }">
      <Tooltip tooltip="Vue Amazing UI" placement="topLeft">
        <Button class="place-btn">TL</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="top">
        <Button class="place-btn">Top</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="topRight">
        <Button class="place-btn">TR</Button>
      </Tooltip>
    </div>
    <div :style="{ width: `${buttonWidth}px`, float: 'left' }">
      <Tooltip tooltip="Vue Amazing UI" placement="leftTop">
        <Button class="place-btn">LT</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="left">
        <Button class="place-btn">Left</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="leftBottom">
        <Button class="place-btn">LB</Button>
      </Tooltip>
    </div>
    <div :style="{ width: `${buttonWidth}px`, marginLeft: `${buttonWidth * 4 + 24}px` }">
      <Tooltip tooltip="Vue Amazing UI" placement="rightTop">
        <Button class="place-btn">RT</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="right">
        <Button class="place-btn">Right</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="rightBottom">
        <Button class="place-btn">RB</Button>
      </Tooltip>
    </div>
    <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
      <Tooltip tooltip="Vue Amazing UI" placement="bottomLeft">
        <Button class="place-btn">BL</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="bottom">
        <Button class="place-btn">Bottom</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="bottomRight">
        <Button class="place-btn">BR</Button>
      </Tooltip>
    </div>
  </div>
</template>
<style lang="less" scoped>
.placement-demo {
  .place-btn {
    width: 70px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
  }
}
</style>
```

:::

## 箭头指向

设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心

<br/>

<Space>
  <Tooltip tooltip="Vue Amazing UI" placement="topLeft">
    <Button type="primary">Align edge / 边缘对齐</Button>
  </Tooltip>
  <Tooltip tooltip="Vue Amazing UI" placement="topLeft" arrow-point-at-center>
    <Button type="primary">Arrow points to center / 箭头指向中心</Button>
  </Tooltip>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Tooltip tooltip="Vue Amazing UI" placement="topLeft">
      <Button type="primary">Align edge / 边缘对齐</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="topLeft" arrow-point-at-center>
      <Button type="primary">Arrow points to center / 箭头指向中心</Button>
    </Tooltip>
  </Space>
</template>
```

:::

## 自动调整位置

*请滚动或缩放浏览器窗口来查看自适应调整弹出位置的效果*

<br/>

<Tooltip tooltip="Vue Amazing UI">
  <Button type="primary">Flip Automatically</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip tooltip="Vue Amazing UI">
    <Button type="primary">Flip Automatically</Button>
  </Tooltip>
</template>
```

:::

## 多彩文字提示

我们添加了多种预设色彩的文字提示样式，用作不同场景使用

<Divider orientation="left">Presets</Divider>
<Space>
  <Tooltip v-for="color in presetColors" :key="color" tooltip="提示文字" :bg-color="color">
    <Button>{{ color }}</Button>
  </Tooltip>
</Space>
<Divider orientation="left">Custom</Divider>
<Space>
  <Tooltip v-for="color in customColors" :key="color" tooltip="提示文字" :bg-color="color">
    <Button>{{ color }}</Button>
  </Tooltip>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
const presetColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
]
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9']
</script>
<template>
  <Divider orientation="left">Presets</Divider>
  <Space>
    <Tooltip v-for="color in presetColors" :key="color" tooltip="提示文字" :bg-color="color">
      <Button>{{ color }}</Button>
    </Tooltip>
  </Space>
  <Divider orientation="left">Custom</Divider>
  <Space>
    <Tooltip v-for="color in customColors" :key="color" tooltip="提示文字" :bg-color="color">
      <Button>{{ color }}</Button>
    </Tooltip>
  </Space>
</template>
```

:::

## 不同的触发方式

<Space>
  <Tooltip>
    <template #tooltip>Vue Amazing UI</template>
    <Button type="primary">Hover Me</Button>
  </Tooltip>
  <Tooltip trigger="click">
    <template #tooltip>Vue Amazing UI</template>
    <Button type="primary">Click Me</Button>
  </Tooltip>
  <Tooltip trigger="focus">
    <template #tooltip>Vue Amazing UI</template>
    <Button type="primary">Focus Me</Button>
  </Tooltip>
  <Tooltip trigger="contextmenu">
    <template #tooltip>Vue Amazing UI</template>
    <Button type="primary">Right Click Me</Button>
  </Tooltip>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Tooltip>
      <template #tooltip>Vue Amazing UI</template>
      <Button type="primary">Hover Me</Button>
    </Tooltip>
    <Tooltip trigger="click">
      <template #tooltip>Vue Amazing UI</template>
      <Button type="primary">Click Me</Button>
    </Tooltip>
    <Tooltip trigger="focus">
      <template #tooltip>Vue Amazing UI</template>
      <Button type="primary">Focus Me</Button>
    </Tooltip>
    <Tooltip trigger="contextmenu">
      <template #tooltip>Vue Amazing UI</template>
      <Button type="primary">Right Click Me</Button>
    </Tooltip>
  </Space>
</template>
```

:::

## 禁用

设置 `disabled` 后不再响应任何触发

<br/>

<Tooltip tooltip="Vue Amazing UI" disabled>
  <Button type="primary">Disabled Tooltip</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip tooltip="Vue Amazing UI" disabled>
    <Button type="primary">Disabled Tooltip</Button>
  </Tooltip>
</template>
```

:::

## 按键控制

*`enter` 切换显示；`esc` 关闭，仅当 `trigger: 'click'` 时生效*

<br/>

<Tooltip trigger="click" keyboard>
  <template #tooltip>Vue Amazing UI</template>
  <Button type="primary">Click Me</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip trigger="click" keyboard>
    <template #tooltip>Vue Amazing UI</template>
    <Button type="primary">Click Me</Button>
  </Tooltip>
</template>
```

:::

## 自定义弹出框挂载容器

<div ref="containerRef" style="display: inline-block; padding: 64px 32px; border-radius: 8px; border: 1px solid #f0f0f0;">
  <Space>
    <Tooltip tooltip="Vue Amazing UI" :to="false">
      <Button type="primary">Stay in place</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" :to="containerRef">
      <Button type="primary">Mounted to Container</Button>
    </Tooltip>
  </Space>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from 'vue-amazing-ui'
const containerRef = ref<HTMLDivElement>()
</script>
<template>
  <div
    ref="containerRef"
    style="display: inline-block; padding: 64px 32px; border-radius: 8px; border: 1px solid #f0f0f0;"
  >
    <Space>
      <Tooltip tooltip="Vue Amazing UI" :to="false">
        <Button type="primary">Stay in place</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" :to="containerRef">
        <Button type="primary">Mounted to Container</Button>
      </Tooltip>
    </Space>
  </div>
</template>
```

:::

## 自定义过渡动画时间

<Tooltip :transition-duration="300">
  <template #tooltip>Vue Amazing UI</template>
  <Button type="primary">Transition Duration 300ms</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip :transition-duration="300">
    <template #tooltip>Vue Amazing UI</template>
    <Button type="primary">Transition Duration 300ms</Button>
  </Tooltip>
</template>
```

:::

## 延迟显示隐藏

<Space>
  <Tooltip
    :show-delay="300"
    :hide-delay="300"
    tooltip="Vue Amazing UI (delay 300ms)"
    :tooltip-style="{ textAlign: 'center' }"
  >
    <Button type="primary">Delay 300ms Tooltip</Button>
  </Tooltip>
  <Tooltip
    :show-delay="500"
    :hide-delay="500"
    tooltip="Vue Amazing UI (delay 500ms)"
    :tooltip-style="{ textAlign: 'center' }"
  >
    <Button type="primary">Delay 500ms Tooltip</Button>
  </Tooltip>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Tooltip
      :show-delay="300"
      :hide-delay="300"
      tooltip="Vue Amazing UI (delay 300ms)"
      :tooltip-style="{ textAlign: 'center' }"
    >
      <Button type="primary">Delay 300ms Tooltip</Button>
    </Tooltip>
    <Tooltip
      :show-delay="500"
      :hide-delay="500"
      tooltip="Vue Amazing UI (delay 500ms)"
      :tooltip-style="{ textAlign: 'center' }"
    >
      <Button type="primary">Delay 500ms Tooltip</Button>
    </Tooltip>
  </Space>
</template>
```

:::

## 使用 Methods

<Space>
  <Tooltip ref="tooltipRef" tooltip="Vue Amazing UI">
    <Button type="primary">Methods Tooltip</Button>
  </Tooltip>
  <Button type="primary" @click="onShow">显示</Button>
  <Button @click="onHide">隐藏</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from 'vue-amazing-ui'
const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null)
function onShow() {
  tooltipRef.value?.show()
}
function onHide() {
  tooltipRef.value?.hide()
}
</script>
<template>
  <Space>
    <Tooltip ref="tooltipRef" tooltip="Vue Amazing UI">
      <Button type="primary">Methods Tooltip</Button>
    </Tooltip>
    <Button type="primary" @click="onShow">显示</Button>
    <Button @click="onHide">隐藏</Button>
  </Space>
</template>
```

:::

## 受控显示

*使用 `show` 属性控制浮层的显示与隐藏*

<br/>

<Space>
  <Tooltip v-model:show="controlledShow" tooltip="Vue Amazing UI">
    <Button>Controlled: {{ controlledShow }}</Button>
  </Tooltip>
  <Button type="primary" @click="controlledShow = !controlledShow">Toggle Show</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from 'vue-amazing-ui'
const controlledShow = ref<boolean>(false)
</script>
<template>
  <Space>
    <Tooltip v-model:show="controlledShow" tooltip="Vue Amazing UI">
      <Button>Controlled: {{ controlledShow }}</Button>
    </Tooltip>
    <Button type="primary" @click="controlledShow = !controlledShow">Toggle Show</Button>
  </Space>
</template>
```

::::

## 隐藏后卸载

*设置 `destroyOnHide` 后，浮层在离开动画结束时卸载 `DOM`，再次显示时重新创建并定位；默认 `false`（元素常驻，仅切换显示）。基于 `Tooltip` 的 `Popover` / `Popconfirm` 同样支持*

<br/>

<Space wrap>
  <Tooltip tooltip="Vue Amazing UI" destroy-on-hide>
    <Button type="primary">Hover (destroyOnHide)</Button>
  </Tooltip>
  <Tooltip tooltip="Vue Amazing UI">
    <Button>Hover (default)</Button>
  </Tooltip>
  <Tooltip v-model:show="destroyShow" tooltip="Vue Amazing UI" trigger="click" destroy-on-hide>
    <Button type="primary">Click: {{ destroyShow }}</Button>
  </Tooltip>
  <Button @click="destroyShow = !destroyShow">Toggle Show</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from 'vue-amazing-ui'
const destroyShow = ref(false)
</script>
<template>
  <Space wrap>
    <Tooltip tooltip="Vue Amazing UI" destroy-on-hide>
      <Button type="primary">Hover (destroyOnHide)</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI">
      <Button>Hover (default)</Button>
    </Tooltip>
    <Tooltip v-model:show="destroyShow" tooltip="Vue Amazing UI" trigger="click" destroy-on-hide>
      <Button type="primary">Click: {{ destroyShow }}</Button>
    </Tooltip>
    <Button @click="destroyShow = !destroyShow">Toggle Show</Button>
  </Space>
</template>
```

::::

## 隐藏箭头

<Tooltip :arrow="false" tooltip="Vue Amazing UI">
  <Button type="primary">Hide Arrow</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip :arrow="false" tooltip="Vue Amazing UI">
    <Button type="primary">Hide Arrow</Button>
  </Tooltip>
</template>
```

:::

## APIs

### Tooltip

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| maxWidth | 文字提示最大宽度，单位 `px` | string &#124; number | 240 |
| content | 展示的内容 | string | undefined |
| contentClass | 设置展示内容的类名 | string | undefined |
| contentStyle | 设置展示内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| tooltip | 文字提示内容 | string | undefined |
| tooltipClass | 设置文字提示的类名 | string | undefined |
| tooltipStyle | 设置文字提示的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| popupClassName | 设置浮层面板（定位盒）的类名，用于自定义面板层样式 | string | undefined |
| popupStyle | 设置浮层面板（定位盒）的样式，在皮肤变量与动画原点之后合并，可覆盖定位 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| zIndex | 浮层层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |
| bgColor | 文字提示框背景颜色，支持预设色 (`pink` &#124; `red` &#124; `yellow` &#124; `orange` &#124; `cyan` &#124; `green` &#124; `blue` &#124; `purple` &#124; `geekblue` &#124; `magenta` &#124; `volcano` &#124; `gold` &#124; `lime`) 或自定义色值 (如 `#f50` / `rgba`) | string | 'rgba(0, 0, 0, 0.85)' |
| arrow | 是否显示箭头 | boolean | true |
| arrowPointAtCenter | 箭头是否指向目标元素中心，仅当 `placement` 为复合方向 (如 `topLeft`) 时生效 | boolean | false |
| placement | 文字提示位置 | 'top' &#124; 'topLeft' &#124; 'topRight' &#124; 'bottom' &#124; 'bottomLeft' &#124; 'bottomRight' &#124; 'left' &#124; 'leftTop' &#124; 'leftBottom' &#124; 'right' &#124; 'rightTop' &#124; 'rightBottom' | 'top' |
| flip | 文字提示被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true |
| trigger | 文字提示触发方式 | 'hover' &#124; 'click' &#124; 'focus' &#124; 'contextmenu' | 'hover' |
| keyboard | 是否支持按键操作 (`enter` 切换显示；`esc` 关闭)，仅当 `trigger: 'click'` 时生效 | boolean | false |
| disabled | 是否禁用文字提示，禁用后不响应任何触发 | boolean | false |
| to | 弹出框挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 'body') 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | undefined |
| destroyOnHide | 隐藏后是否卸载弹出框 `DOM`：离开动画结束后卸载整棵浮层子树，再次显示时重新创建并重新定位（适合浮层内容较重、实例较多的场景） | boolean | false |
| transitionDuration | 文字提示动画的过渡持续时间，单位 `ms` | number | 100 |
| showDelay | 文字提示显示的延迟时间，单位 `ms`，仅当 `trigger: hover` 时生效 | number | 100 |
| hideDelay | 文字提示隐藏的延迟时间，单位 `ms`，仅当 `trigger: hover` 时生效 | number | 100 |
| show <Tag color="cyan">v-model</Tag> | 文字提示是否显示 | boolean | false |
| showControl | 只使用 `show` 属性控制显示隐藏，仅当 `trigger: hover` 时生效，此时移入移出将不会触发显示隐藏，全部由 `show` 属性控制 | boolean | false |

## Slots

| 名称   | 说明              | 类型           |
| :------ | :----------------- | :------------- |
| tooltip | 自定义文字提示内容 | v-slot:tooltip |
| default | 自定义展示的内容  | v-slot:default |

## Methods

| 名称 | 说明        | 类型       |
| :--- | :----------- | :--------- |
| show | 显示文字提示 | () => void |
| hide | 隐藏文字提示 | () => void |

## Events

| 名称        | 说明                    | 类型                    |
| :----------- | :----------------------- | :---------------------- |
| openChange  | 显示隐藏的回调          | (open: boolean) => void |
| animationend | 显示隐藏动画结束时的回调 | (open: boolean) => void |
