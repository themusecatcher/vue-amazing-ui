# 文字提示 Tooltip

<FloatButton
  :bottom="96"
  type="primary"
  tooltip="成为赞助者✨"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*悬浮提示，展现需要关注的信息*

## 何时使用

- 当某个页面需要向用户显示警告的信息时

<script setup lang="ts">
function openChange (open: boolean) {
  console.log('open:', open)
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
  console.log('open:', open)
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

<Tooltip
  :max-width="300"
  bg-color="#fff"
  :tooltip-style="{
    padding: '12px 18px',
    borderRadius: '12px',
    fontSize: '18px',
    color: '#1677ff'
  }"
>
  <template #tooltip>Godzilla VS Kong：电影讲述传说中的王者哥斯拉和金刚对决的故事</template>
  <Button type="primary">哥斯拉大战金刚</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip
    :max-width="300"
    bg-color="#fff"
    :tooltip-style="{
      padding: '12px 18px',
      borderRadius: '12px',
      fontSize: '18px',
      color: '#1677ff'
    }"
  >
    <template #tooltip>Godzilla VS Kong：电影讲述传说中的王者哥斯拉和金刚对决的故事</template>
    <Button type="primary">哥斯拉大战金刚</Button>
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
-- | -- | -- | --
maxWidth | 弹出提示最大宽度，单位 `px` | string &#124; number | 240
content | 展示的文本 | string &#124; slot | undefined
contentStyle | 设置展示文本的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
tooltip | 弹出提示文本 | string &#124; slot | undefined
tooltipStyle | 设置弹出提示的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
bgColor | 弹出提示框背景颜色 | string | 'rgba(0, 0, 0, 0.85)'
arrow | 是否显示箭头 | boolean | true
trigger | 弹出提示触发方式 | 'hover' &#124; 'click' | 'hover'
showDelay | 弹出提示显示的延迟时间，单位 `ms` | number | 100
hideDelay |弹出提示隐藏的延迟时间，单位 `ms` | number | 100
show <Tag color="cyan">v-model</Tag> | 弹出提示是否显示 | boolean | false

## Events

名称 | 说明 | 类型
-- | -- | --
openChange | 显示隐藏的回调 | (open: boolean) => void
