# 浮动按钮 FloatButton

<GlobalElement />

*浮动按钮*

## 何时使用

- 用于网站上的全局功能
- 无论浏览到何处都可以看见的按钮

<script setup lang="ts">
import { h } from 'vue'
import {
  GlobalOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  StarFilled,
  SettingOutlined,
  SketchOutlined,
  MessageOutlined,
  CommentOutlined
} from '@ant-design/icons-vue'
function onClick(e: Event) {
  console.log('click', e)
}
function onOpenChange(open: boolean) {
  console.log('openChange', open)
}
</script>

## 基本使用

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton @click="onClick">
    <template #icon>
      <GlobalOutlined />
    </template>
  </FloatButton>
</Card>

::: details Show Code

```vue
<script setup lang="ts">
<script setup lang="ts">
import { GlobalOutlined } from '@ant-design/icons-vue'
function onClick(e: Event) {
  console.log('click', e)
}
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton @click="onClick">
      <template #icon>
        <GlobalOutlined />
      </template>
    </FloatButton>
  </Card>
</template>
```

:::

## 位置

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton>
    <template #icon>
      <MessageOutlined />
    </template>
  </FloatButton>
  <FloatButton shape="square" :top="40">
    <template #icon>
      <CommentOutlined />
    </template>
  </FloatButton>
  <FloatButton type="primary" :left="40">
    <template #icon>
      <MessageOutlined />
    </template>
  </FloatButton>
  <FloatButton type="primary" shape="square" :top="40" :left="40">
    <template #icon>
      <CommentOutlined />
    </template>
  </FloatButton>
</Card>

::: details Show Code

```vue
<script setup lang="ts">
import { MessageOutlined, CommentOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton>
      <template #icon>
        <MessageOutlined />
      </template>
    </FloatButton>
    <FloatButton shape="square" :top="40">
      <template #icon>
        <CommentOutlined />
      </template>
    </FloatButton>
    <FloatButton type="primary" :left="40">
      <template #icon>
        <MessageOutlined />
      </template>
    </FloatButton>
    <FloatButton type="primary" shape="square" :top="40" :left="40">
      <template #icon>
        <CommentOutlined />
      </template>
    </FloatButton>
  </Card>
</template>
```

:::

## 尺寸

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton :width="56" :height="56" :right="120">
    <template #icon>
      <MessageOutlined style="font-size: 24px" />
    </template>
  </FloatButton>
  <FloatButton type="primary" shape="square" :width="56" :height="56">
    <template #icon>
      <CommentOutlined style="font-size: 24px" />
    </template>
  </FloatButton>
</Card>

::: details Show Code

```vue
<script setup lang="ts">
import { MessageOutlined, CommentOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton :width="56" :height="56" :right="120">
      <template #icon>
        <MessageOutlined style="font-size: 24px" />
      </template>
    </FloatButton>
    <FloatButton type="primary" shape="square" :width="56" :height="56">
      <template #icon>
        <CommentOutlined style="font-size: 24px" />
      </template>
    </FloatButton>
  </Card>
</template>
```

:::

## 类型

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton :right="96">
    <template #icon>
      <QuestionCircleOutlined />
    </template>
  </FloatButton>
  <FloatButton type="primary">
    <template #icon>
      <QuestionCircleOutlined />
    </template>
  </FloatButton>
</Card>

::: details Show Code

```vue
<script setup lang="ts">
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton :right="96">
      <template #icon>
        <QuestionCircleOutlined />
      </template>
    </FloatButton>
    <FloatButton type="primary">
      <template #icon>
        <QuestionCircleOutlined />
      </template>
    </FloatButton>
  </Card>
</template>
```

:::

## 形状

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton type="primary" :right="96">
    <template #icon>
      <CustomerServiceOutlined />
    </template>
  </FloatButton>
  <FloatButton type="primary" shape="square">
    <template #icon>
      <CustomerServiceOutlined />
    </template>
  </FloatButton>
</Card>

::: details Show Code

```vue
<script setup lang="ts">
import { CustomerServiceOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton type="primary" :right="96">
      <template #icon>
        <CustomerServiceOutlined />
      </template>
    </FloatButton>
    <FloatButton type="primary" shape="square">
      <template #icon>
        <CustomerServiceOutlined />
      </template>
    </FloatButton>
  </Card>
</template>
```

:::

## 图标

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton type="primary" :right="96">
    <template #icon>
      <StarFilled spin style="color: gold" />
    </template>
  </FloatButton>
  <FloatButton
    shape="square"
    :icon="() => h(SettingOutlined, { style: 'color: #1677ff' })"
  />
</Card>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { StarFilled, SettingOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton type="primary" :right="96">
      <template #icon>
        <StarFilled spin style="color: gold" />
      </template>
    </FloatButton>
    <FloatButton
      shape="square"
      :icon="() => h(SettingOutlined, { style: 'color: #1677ff' })"
    />
  </Card>
</template>
```

:::

## 文字描述信息

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton shape="square" description="HELP" :right="152">
    <template #icon>
      <GlobalOutlined />
    </template>
  </FloatButton>
  <FloatButton shape="square" description="HELP INFO" :right="96" />
  <FloatButton type="primary" shape="square" description="客服">
    <template #icon>
      <CustomerServiceOutlined />
    </template>
  </FloatButton>
</Card>

::: details Show Code

```vue
<script setup lang="ts">
import { GlobalOutlined, CustomerServiceOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton shape="square" description="HELP" :right="152">
      <template #icon>
        <GlobalOutlined />
      </template>
    </FloatButton>
    <FloatButton shape="square" description="HELP INFO" :right="96" />
    <FloatButton type="primary" shape="square" description="客服">
      <template #icon>
        <CustomerServiceOutlined />
      </template>
    </FloatButton>
  </Card>
</template>
```

:::

## 链接跳转

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton href="https://themusecatcher.github.io/vue-amazing-ui/" :right="96">
    <template #icon>
      <img style="width: 1em; height: 1em" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" />
    </template>
  </FloatButton>
  <FloatButton
    type="primary"
    shape="square"
    description="CSDN"
    href="https://blog.csdn.net/Dandrose"
    target="_blank"
  />
</Card>

::: details Show Code

```vue
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton href="https://themusecatcher.github.io/vue-amazing-ui/" :right="96">
      <template #icon>
        <img style="width: 1em; height: 1em" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" />
      </template>
    </FloatButton>
    <FloatButton
      type="primary"
      shape="square"
      description="CSDN"
      href="https://blog.csdn.net/Dandrose"
      target="_blank"
    />
  </Card>
</template>
```

:::

## 菜单模式

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton shape="square" description="HELP" :right="96" menu-trigger="click" @openChange="onOpenChange">
    <template #icon>
      <CustomerServiceOutlined />
    </template>
    <template #menu>
      <FloatButton shape="square">
        <template #icon>
          <MessageOutlined />
        </template>
      </FloatButton>
      <FloatButton>
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
    </template>
  </FloatButton>
  <FloatButton type="primary" menu-trigger="hover" @openChange="onOpenChange">
    <template #icon>
      <CustomerServiceOutlined />
    </template>
    <template #menu>
      <FloatButton>
        <template #icon>
          <MessageOutlined />
        </template>
      </FloatButton>
      <FloatButton>
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
    </template>
  </FloatButton>
</Card>

::: details Show Code

```vue
<script setup lang="ts">
import { CustomerServiceOutlined, MessageOutlined, CommentOutlined } from '@ant-design/icons-vue'
function onOpenChange(open: boolean) {
  console.log('openChange', open)
}
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton shape="square" description="HELP" :right="96" menu-trigger="click" @openChange="onOpenChange">
      <template #icon>
        <CustomerServiceOutlined />
      </template>
      <template #menu>
        <FloatButton shape="square">
          <template #icon>
            <MessageOutlined />
          </template>
        </FloatButton>
        <FloatButton>
          <template #icon>
            <CommentOutlined />
          </template>
        </FloatButton>
      </template>
    </FloatButton>
    <FloatButton type="primary" menu-trigger="hover" @openChange="onOpenChange">
      <template #icon>
        <CustomerServiceOutlined />
      </template>
      <template #menu>
        <FloatButton>
          <template #icon>
            <MessageOutlined />
          </template>
        </FloatButton>
        <FloatButton>
          <template #icon>
            <CommentOutlined />
          </template>
        </FloatButton>
      </template>
    </FloatButton>
  </Card>
</template>
```

:::

## 气泡卡片

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton tooltip="Diamond" :right="96">
    <template #icon>
      <SketchOutlined />
    </template>
  </FloatButton>
  <FloatButton
    type="primary"
    tooltip="Diamond"
    :tooltip-props="{
      bgColor: '#fff',
      tooltipStyle: {
        fontWeight: 500,
        color: 'rgba(0, 0, 0, 0.88)'
      },
      placement: 'top'
    }"
  >
    <template #icon>
      <SketchOutlined />
    </template>
  </FloatButton>
</Card>

::: details Show Code

```vue
<script setup lang="ts">
import { SketchOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton tooltip="Diamond" :right="96">
      <template #icon>
        <SketchOutlined />
      </template>
    </FloatButton>
    <FloatButton
      type="primary"
      tooltip="Diamond"
      :tooltip-props="{
        bgColor: '#fff',
        tooltipStyle: {
          fontWeight: 500,
          color: 'rgba(0, 0, 0, 0.88)'
        },
        placement: 'top'
      }"
    >
      <template #icon>
        <SketchOutlined />
      </template>
    </FloatButton>
  </Card>
</template>
```

:::

## 徽标数

<Card width="100%" style="height: 300px; transform: translate(0)">
  <FloatButton :badge-props="{ dot: true }" :right="152">
    <template #icon>
      <MessageOutlined />
    </template>
  </FloatButton>
  <FloatButton :badge-props="{ value: 5, color: 'blue' }" :bottom="100">
    <template #icon>
      <CommentOutlined />
    </template>
  </FloatButton>
  <FloatButton :badge-props="{ value: 5 }">
    <template #icon>
      <CommentOutlined />
    </template>
  </FloatButton>
  <FloatButton :badge-props="{ value: 123 }" :right="96">
    <template #icon>
      <CommentOutlined />
    </template>
  </FloatButton>
</Card>

::: details Show Code

```vue
<script setup lang="ts">
import { MessageOutlined, CommentOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Card width="100%" style="height: 300px; transform: translate(0)">
    <FloatButton shape="circle" :badge-props="{ dot: true }" :right="136">
      <template #icon>
        <MessageOutlined />
      </template>
    </FloatButton>
    <FloatButton :badge-props="{ value: 5, color: 'blue' }" :bottom="104">
      <template #icon>
        <CommentOutlined />
      </template>
    </FloatButton>
    <FloatButton :badge-props="{ value: 5 }">
      <template #icon>
        <CommentOutlined />
      </template>
    </FloatButton>
    <FloatButton :badge-props="{ value: 123 }" :right="80">
      <template #icon>
        <CommentOutlined />
      </template>
    </FloatButton>
  </Card>
</template>
```

:::

## APIs

### FloatButton

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
top | 按钮定位的上边距，单位 `px` | number &#124; string | undefined
bottom | 按钮定位的下边距，单位 `px` | number &#124; string | 40
left | 按钮定位的左边距，单位 `px` | number &#124; string | undefined
right | 按钮定位的右边距，单位 `px` | number &#124; string | 40
zIndex | 设置按钮的 `z-index` | number | 9
width | 浮动按钮宽度，单位 `px` | number &#124; string | 44
height | 浮动按钮高度，单位 `px` | number &#124; string | 44
type | 浮动按钮类型 | 'default' &#124; 'primary' | 'default'
shape | 浮动按钮形状 | 'circle' &#124; 'square' | 'circle'
icon | 浮动按钮图标 | VNode &#124; Slot | undefined
description | 文字描述信息 | string &#124; slot | undefined
href | 点击跳转的地址，指定此属性按钮的行为和 `a` 链接一致 | string | undefined
target | 相当于 `a` 标签的 `target` `属性，href` 存在时生效 | 'self' &#124; '_blank' | 'self'
menuTrigger | 浮动按钮菜单显示的触发方式 | 'click' &#124; 'hover' | undefined
tooltip | 气泡卡片的内容 | sring &#124; slot | undefined
tooltipProps | `Tooltip` 组件属性配置，参考 [Tooltip Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip) | object | {}
badgeProps | 带徽标的浮动按钮（不支持 `status` 以及相关属性），参考 [Badge Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/badge.html#badge) | object | {}

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
icon | 自定义浮动按钮图标 | v-slot:icon
description | 自定义文字描述信息 | v-slot:description
menu | 自定义菜单按钮 | v-slot:menu
tooltip | 自定义气泡卡片的内容 | v-slot:tooltip

## Events

名称 | 说明 | 类型
:-- | :-- | :--
click | 点击浮动按钮时的回调 | (e: Event) => void
openChange | 浮动按钮菜单展开收起时的回调 | (open: boolean) => void
