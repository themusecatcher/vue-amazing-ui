# 徽标 Badge

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*图标右上角的圆形徽标数字或文本前的状态小圆点*

## 何时使用

- 一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(5)
const show = ref(true)
const colors = [
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
function decline () {
  if (count.value >= 1) {
    count.value--
  }
}
function increase () {
  count.value++
}
</script>

## 基本使用

<Space :gap="20">
  <Badge :count="5">
    <Avatar shape="square" size="large" />
  </Badge>
  <Badge :count="0" show-zero>
    <Avatar shape="square" size="large" />
  </Badge>
  <Badge>
    <template #count>
      <svg focusable="false" class="u-svg" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
    </template>
    <Avatar shape="square" size="large" />
  </Badge>
</Space>

::: details Show Code

```vue
<template>
  <Space :gap="20">
    <Badge :count="5">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge :count="0" show-zero>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge>
      <template #count>
        <svg focusable="false" class="u-svg" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
      </template>
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
</template>
<style lang="less" scoped>
.u-svg {
  fill: #f5222d;
}
</style>
```

:::

## 独立使用

<Space :gap="20">
  <Badge :count="25" />
  <Badge
    :count="4"
    :count-style="{
      backgroundColor: '#fff',
      color: '#999',
      boxShadow: '0 0 0 1px #d9d9d9 inset',
    }"
  />
  <Badge :count="109" :count-style="{ backgroundColor: '#52c41a' }" />
</Space>

::: details Show Code

```vue
<template>
  <Space :gap="20">
    <Badge :count="25" />
    <Badge
      :count="4"
      :count-style="{
        backgroundColor: '#fff',
        color: '#999',
        boxShadow: '0 0 0 1px #d9d9d9 inset',
      }"
    />
    <Badge :count="109" :count-style="{ backgroundColor: '#52c41a' }" />
  </Space>
</template>
```

:::

## 封顶数字

<Space :gap="30">
  <Badge :count="99">
    <Avatar shape="square" size="large" />
  </Badge>
  <Badge :count="100">
    <Avatar shape="square" size="large" />
  </Badge>
  <Badge :count="99" :max="10">
    <Avatar shape="square" size="large" />
  </Badge>
  <Badge :count="1000" :max="999">
    <Avatar shape="square" size="large" />
  </Badge>
</Space>

::: details Show Code

```vue
<template>
  <Space :gap="30">
    <Badge :count="99">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge :count="100">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge :count="99" :max="10">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge :count="1000" :max="999">
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
</template>
```

:::

## 小红点

<Badge dot>
  <a href="#">Link something</a>
</Badge>

::: details Show Code

```vue
<template>
  <Badge dot>
    <a href="#">Link something</a>
  </Badge>
</template>
```

:::

## 状态点

<Space :gap="10">
  <Badge status="success" />
  <Badge status="error" />
  <Badge status="default" />
  <Badge status="processing" />
  <Badge status="warning" />
</Space>
<br/>
<Space style="margin-top: 10px;" vertical :gap="10">
  <Badge status="success" text="Success" />
  <Badge status="error" text="Error" />
  <Badge status="default" text="Default" />
  <Badge status="processing" text="Processing" />
  <Badge status="warning" text="warning" />
</Space>

::: details Show Code

```vue
<template>
  <Space :gap="10">
    <Badge status="success" />
    <Badge status="error" />
    <Badge status="default" />
    <Badge status="processing" />
    <Badge status="warning" />
  </Space>
  <br/>
  <Space style="margin-top: 10px;" vertical :gap="10">
    <Badge status="success" text="Success" />
    <Badge status="error" text="Error" />
    <Badge status="default" text="Default" />
    <Badge status="processing" text="Processing" />
    <Badge status="warning" text="warning" />
  </Space>
</template>
```

:::

## 动态

<Flex gap="middle" vertical>
  <Space :gap="20" align="center">
    <Badge :count="count">
      <Avatar shape="square" size="large" />
    </Badge>
    <Button @click="decline">
      <svg class="u-icon" focusable="false" data-icon="minus" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
    </Button>
    <Button @click="increase">
      <svg class="u-icon" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path></svg>
    </Button>
  </Space>
  <Space :gap="20" align="center">
    <Badge :dot="show">
      <Avatar shape="square" size="large" />
    </Badge>
    <Switch v-model:checked="show" />
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
const count = ref(5)
const show = ref(true)
function decline () {
  if (count.value >= 1) {
    count.value--
  }
}
function increase () {
  count.value++
}
</script>
<template>
  <Flex gap="middle" vertical>
    <Space :gap="20" align="center">
      <Badge :count="count">
        <Avatar shape="square" size="large" />
      </Badge>
      <Button @click="decline">
        <svg focusable="false" data-icon="minus" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
      </Button>
      <Button @click="increase">
        <svg focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path></svg>
      </Button>
    </Space>
    <Space :gap="20" align="center">
      <Badge :dot="show">
        <Avatar shape="square" size="large" />
      </Badge>
      <Switch v-model:checked="show" />
    </Space>
  </Flex>
</template>
<style lang="less" scoped>
.u-icon {
  fill: #000000E0;
}
</style>
```

:::

## 自定义悬浮状态点的显示文字

<Badge :count="5" title="Custom hover text">
  <Avatar shape="square" size="large" />
</Badge>

::: details Show Code

```vue
<template>
  <Badge :count="5" title="Custom hover text">
    <Avatar shape="square" size="large" />
  </Badge>
</template>
```

:::

## 多彩徽标

### Presets

<Space :gap="20">
  <Badge :color="color" :text="color" v-for="color in colors" :key="color" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
const colors = [
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
</script>
<template>
  <Space :gap="20">
    <Badge :color="color" :text="color" v-for="color in colors" :key="color" />
  </Space>
</template>
```

:::

### Custom

<Space :gap="20">
  <Badge color="#f50" text="#f50" />
  <Badge color="#2db7f5" text="#2db7f5" />
  <Badge color="#87d068" text="#87d068" />
  <Badge color="#108ee9" text="#108ee9" />
</Space>

::: details Show Code

```vue
<template>
  <Space :gap="20">
    <Badge color="#f50" text="#f50" />
    <Badge color="#2db7f5" text="#2db7f5" />
    <Badge color="#87d068" text="#87d068" />
    <Badge color="#108ee9" text="#108ee9" />
  </Space>
</template>
```

:::

<style lang="less" scoped>
.u-svg {
  fill: #f5222d;
}
.u-icon {
  fill: #000000E0;
}
</style>

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
color | 自定义小圆点的颜色 | string | '' | false
count | 展示的数字，大于 `max` 时显示为 `max+`，为 `0` 时隐藏 | number &#124; slot | 0 | false
max | 展示封顶的数字值 | number | 99 | false
showZero | 当数值为 `0` 时，是否展示 `Badge` | boolean | false | false
dot | 不展示数字，只有一个小红点 | boolean | false | false
status | 设置 `Badge` 为状态点 | 'success' &#124; 'processing &#124; 'default' &#124; 'error' &#124; 'warning' | undefined | false
text | 在设置了 `status` 的前提下有效，设置状态点的文本 | string &#124; slot | '' | false
countStyle | 设置状态点的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} | false
title | 设置鼠标放在状态点上时显示的文字 | string | '' | false
ripple | 是否开启涟漪动画效果 | boolean | true | false
