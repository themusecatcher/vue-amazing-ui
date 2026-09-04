# 文字提示 Tooltip

<GlobalElement />

*悬浮提示，展现需要关注的信息*

## 何时使用

- 当某个页面需要向用户显示警告的信息时

<script setup lang="ts">
import { ref } from 'vue'
const containerRef = ref()
const tooltipRef = ref()
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
</script>

## 基本使用

<Space>
  <Tooltip tooltip="Tesla" @open-change="openChange">
    <Button type="primary">特斯拉</Button>
  </Tooltip>
  <Tooltip tooltip="Godzilla" @open-change="openChange">
    <Button type="primary">哥斯拉</Button>
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
    <Tooltip tooltip="Tesla" @open-change="openChange">
      <Button type="primary">特斯拉</Button>
    </Tooltip>
    <Tooltip tooltip="Godzilla" @open-change="openChange">
      <Button type="primary">哥斯拉</Button>
    </Tooltip>
  </Space>
</template>
```

:::

## 自定义样式

<Space gap="large">
  <Tooltip :max-width="360" bg-color="#fff" tooltip-class="custom-class">
    <template #tooltip>
      <p style="text-align: center">Batman VS Superman</p>
      电影讲述了超人帮助人类解决了很多问题，成为了人类的神，却引起了莱克斯·卢瑟的嫉妒，从而挑拨蝙蝠侠与超人之间战斗的故事
    </template>
    <Button type="primary">蝙蝠侠大战超人</Button>
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
      <h3 style="font-weight: bold; text-align: center; margin: 0 0 8px;">Godzilla VS Kong</h3>
      电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事
    </template>
    <Button type="primary">哥斯拉大战金刚</Button>
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
</style>

::: details Show Code

```vue
<template>
  <Space gap="large">
    <Tooltip :max-width="360" bg-color="#fff" tooltip-class="custom-class">
      <template #tooltip>
        <p style="text-align: center">Batman VS Superman</p>
        电影讲述了超人帮助人类解决了很多问题，成为了人类的神，却引起了莱克斯·卢瑟的嫉妒，从而挑拨蝙蝠侠与超人之间战斗的故事
      </template>
      <Button type="primary">蝙蝠侠大战超人</Button>
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
        <h3 style="font-weight: bold; text-align: center; margin: 0 0 8px;">Godzilla VS Kong</h3>
        电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事
      </template>
      <Button type="primary">哥斯拉大战金刚</Button>
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
  <Tooltip v-for="color in presetColors" :key="color" tooltip="prompt text" :bg-color="color">
    <Button>{{ color }}</Button>
  </Tooltip>
</Space>
<Divider orientation="left">Custom</Divider>
<Space>
  <Tooltip v-for="color in customColors" :key="color" tooltip="prompt text" :bg-color="color">
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
    <Tooltip v-for="color in presetColors" :key="color" tooltip="prompt text" :bg-color="color">
      <Button>{{ color }}</Button>
    </Tooltip>
  </Space>
  <Divider orientation="left">Custom</Divider>
  <Space>
    <Tooltip v-for="color in customColors" :key="color" tooltip="prompt text" :bg-color="color">
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

*`enter` 显示；`esc` 关闭，仅当 `trigger: 'click'` 时生效*

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
const containerRef = ref()
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
  <Button type="primary" @click="tooltipRef.show()">显示</Button>
  <Button @click="tooltipRef.hide()">隐藏</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const tooltipRef = ref()
</script>
<template>
  <Space>
    <Tooltip ref="tooltipRef" tooltip="Vue Amazing UI">
      <Button type="primary">Methods Tooltip</Button>
    </Tooltip>
    <Button type="primary" @click="tooltipRef.show()">显示</Button>
    <Button @click="tooltipRef.hide()">隐藏</Button>
  </Space>
</template>
```

:::

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
| content | 展示的内容 | string &#124; slot | undefined |
| contentClass | 设置展示内容的类名 | string | undefined |
| contentStyle | 设置展示内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| tooltip | 文字提示内容 | string &#124; slot | undefined |
| tooltipClass | 设置文字提示的类名 | string | undefined |
| tooltipStyle | 设置文字提示的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| bgColor | 文字提示框背景颜色，支持预设色 (`pink` &#124; `red` &#124; `yellow` &#124; `orange` &#124; `cyan` &#124; `green` &#124; `blue` &#124; `purple` &#124; `geekblue` &#124; `magenta` &#124; `volcano` &#124; `gold` &#124; `lime`) 或自定义色值 (如 `#f50` / `rgba`) | string | 'rgba(0, 0, 0, 0.85)' |
| arrow | 是否显示箭头 | boolean | true |
| arrowPointAtCenter | 箭头是否指向目标元素中心，仅当 `placement` 为复合方向 (如 `topLeft`) 时生效 | boolean | false |
| placement | 文字提示位置 | 'top' &#124; 'topLeft' &#124; 'topRight' &#124; 'bottom' &#124; 'bottomLeft' &#124; 'bottomRight' &#124; 'left' &#124; 'leftTop' &#124; 'leftBottom' &#124; 'right' &#124; 'rightTop' &#124; 'rightBottom' | 'top' |
| flip | 文字提示被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true |
| trigger | 文字提示触发方式 | 'hover' &#124; 'click' &#124; 'focus' &#124; 'contextmenu' | 'hover' |
| keyboard | 是否支持按键操作 (`enter` 显示；`esc` 关闭)，仅当 `trigger: 'click'` 时生效 | boolean | false |
| disabled | 是否禁用文字提示，禁用后不响应任何触发 | boolean | false |
| to | 弹出框挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，`false` 会待在原地 | string &#124; HTMLElement &#124; false | 'body' |
| transitionDuration | 文字提示动画的过渡持续时间，单位 `ms` | number | 100 |
| showDelay | 文字提示显示的延迟时间，单位 `ms`，仅当 `trigger: hover` 时生效 | number | 100 |
| hideDelay | 文字提示隐藏的延迟时间，单位 `ms`，仅当 `trigger: hover` 时生效 | number | 100 |
| show <Tag color="cyan">v-model</Tag> | 文字提示是否显示 | boolean | false |
| showControl | 只使用 `show` 属性控制显示隐藏，仅当 `trigger: hover` 时生效，此时移入移出将不会触发显示隐藏，全部由 `show` 属性控制 | boolean | false |

## Slots

| 名称    | 说明               | 类型           |
| :------ | :----------------- | :------------- |
| tooltip | 自定义文字提示内容 | v-slot:tooltip |
| default | 自定义展示的内容   | v-slot:default |

## Methods

| 名称 | 说明         | 类型       |
| :--- | :----------- | :--------- |
| show | 显示文字提示 | () => void |
| hide | 隐藏文字提示 | () => void |

## Events

| 名称         | 说明                     | 类型                    |
| :----------- | :----------------------- | :---------------------- |
| openChange   | 显示隐藏的回调           | (open: boolean) => void |
| animationend | 显示隐藏动画结束时的回调 | (open: boolean) => void |
