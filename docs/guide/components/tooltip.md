# 文字提示 Tooltip

<GlobalElement />

*悬浮提示，展现需要关注的信息*

## 何时使用

- 当某个页面需要向用户显示警告的信息时

<script setup lang="ts">
import { ref } from 'vue'
const tooltip = ref()
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
function openChange (open: boolean) {
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
      <h3 style="text-align: center; margin: 0 0 8px;">Godzilla VS Kong</h3>
      电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事
    </template>
    <Button type="primary">哥斯拉大战金刚</Button>
  </Tooltip>
</Space>

<style lang="less" scoped>
:deep(.custom-class) {
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
        <h3 style="text-align: center; margin: 0 0 8px;">Godzilla VS Kong</h3>
        电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事
      </template>
      <Button type="primary">哥斯拉大战金刚</Button>
    </Tooltip>
  </Space>
</template>
<style lang="less" scoped>
:deep(.custom-class) {
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

<Flex vertical :width="360" align="center" :gap="32">
  <Tooltip tooltip="Vue Amazing UI" placement="bottom">
    <Button type="primary">Bottom</Button>
  </Tooltip>
  <Flex width="100%" justify="space-between">
    <Tooltip tooltip="Vue Amazing UI" placement="right">
      <Button type="primary">Right</Button>
    </Tooltip>
    <Tooltip tooltip="Vue Amazing UI" placement="left">
      <Button type="primary">Left</Button>
    </Tooltip>
  </Flex>
  <Tooltip tooltip="Vue Amazing UI" placement="top">
    <Button type="primary">Top</Button>
  </Tooltip>
</Flex>

::: details Show Code

```vue
<template>
  <Flex vertical :width="360" align="center" :gap="32">
    <Tooltip tooltip="Vue Amazing UI" placement="bottom">
      <Button type="primary">Bottom</Button>
    </Tooltip>
    <Flex width="100%" justify="space-between">
      <Tooltip tooltip="Vue Amazing UI" placement="right">
        <Button type="primary">Right</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="left">
        <Button type="primary">Left</Button>
      </Tooltip>
    </Flex>
    <Tooltip tooltip="Vue Amazing UI" placement="top">
      <Button type="primary">Top</Button>
    </Tooltip>
  </Flex>
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
  </Space>
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
  <Tooltip ref="tooltip" tooltip="Vue Amazing UI">
    <Button type="primary">Methods Tooltip</Button>
  </Tooltip>
  <Button type="primary" @click="tooltip.show()">显示</Button>
  <Button @click="tooltip.hide()">隐藏</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const tooltip = ref()
</script>
<template>
  <Space>
    <Tooltip ref="tooltip" tooltip="Vue Amazing UI">
      <Button type="primary">Methods Tooltip</Button>
    </Tooltip>
    <Button type="primary" @click="tooltip.show()">显示</Button>
    <Button @click="tooltip.hide()">隐藏</Button>
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

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
maxWidth | 文字提示最大宽度，单位 `px` | string &#124; number | 240
content | 展示的内容 | string &#124; slot | undefined
contentClass | 设置展示内容的类名 | string | undefined
contentStyle | 设置展示内容的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
tooltip | 文字提示内容 | string &#124; slot | undefined
tooltipClass | 设置文字提示的类名 | string | undefined
tooltipStyle | 设置文字提示的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
bgColor | 文字提示框背景颜色 | string | 'rgba(0, 0, 0, 0.85)'
arrow | 是否显示箭头 | boolean | true
placement | 文字提示位置 | 'top' &#124; 'bottom' &#124; 'left' &#124; 'right' | 'top'
flip | 文字提示被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true
trigger | 文字提示触发方式 | 'hover' &#124; 'click' | 'hover'
keyboard | 是否支持按键操作 (`enter` 显示；`esc` 关闭)，仅当 `trigger: 'click'` 时生效 | boolean | false
transitionDuration | 文字提示动画的过渡持续时间，单位 `ms` | number | 100
showDelay | 文字提示显示的延迟时间，单位 `ms` | number | 100
hideDelay |文字提示隐藏的延迟时间，单位 `ms` | number | 100
show <Tag color="cyan">v-model</Tag> | 文字提示是否显示 | boolean | false
showControl | 只使用 `show` 属性控制显示隐藏，仅当 `trigger: hover` 时生效，此时移入移出将不会触发显示隐藏，全部由 `show` 属性控制 | boolean | false

## Methods

名称 | 说明 | 类型
:-- | :-- | :--
show | 显示文字提示 | () => void
hide | 隐藏文字提示 | () => void

## Events

名称 | 说明 | 类型
:-- | :-- | :--
openChange | 显示隐藏的回调 | (open: boolean) => void
