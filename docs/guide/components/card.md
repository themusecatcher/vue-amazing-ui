# 卡片 Card

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="✨ 成为赞助者 !"
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

*通用卡片容器*

## 何时使用

- 最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面

<script setup lang="ts">
import { ref } from 'vue'
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const cardWidth = {
  small: 240,
  middle: 300,
  large: 360
}
const size = ref('middle')
const loading = ref(true)
</script>

## 基本使用

<Card title="Default size card" :width="300">
  <template #extra>
    <a href="#">more</a>
  </template>
  <p>card content</p>
  <p>card content</p>
  <p>card content</p>
</Card>

::: details Show Code

```vue
<template>
  <Card title="Default size card" :width="300">
    <template #extra>
      <a href="#">more</a>
    </template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </Card>
</template>
```

:::

## 在灰色背景上使用无边框的卡片

<div style="display: inline-block; background: #ececec; padding: 30px; border-radius: 8px;">
  <Card title="Card title" :bordered="false" :width="300">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
</div>

::: details Show Code

```vue
<template>
  <div style="display: inline-block; background: #ececec; padding: 30px; border-radius: 8px;">
    <Card title="Card title" :bordered="false" :width="300">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </div>
</template>
```

:::

## 简洁卡片

<Card :width="300">
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
</Card>

::: details Show Code

```vue
<template>
  <Card :width="300">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
</template>
```

:::

## 三种尺寸

<Space vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Card :size="size" :title="`${size.toUpperCase()} size card`" :width="cardWidth[size as keyof typeof cardWidth]">
    <template #extra>
      <a href="#">more</a>
    </template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </Card>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const cardWidth = {
  small: 240,
  middle: 300,
  large: 360
}
const size = ref('middle')
</script>
<template>
  <Space vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Card :size="size" :title="`${size.toUpperCase()} size card`" :width="cardWidth[size as keyof typeof cardWidth]">
      <template #extra>
        <a href="#">more</a>
      </template>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </Card>
  </Space>
</template>
```

:::

## 鼠标移过时可浮起

<Card hoverable title="Card title" :width="300">
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
</Card>

::: details Show Code

```vue
<template>
  <Card hoverable title="Card title" :width="300">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
</template>
```

:::

## 预加载卡片

<Space vertical>
  <Space align="center">Loading State:<Switch v-model="loading" /></Space>
  <Card :loading="loading" title="Card title" :width="300">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</script>
<template>
  <Space vertical>
    <Space align="center">Loading State:<Switch v-model="loading" /></Space>
    <Card :loading="loading" title="Card title" :width="300">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
</template>
```

:::

## 自定义样式

<Card
  title="Default size card"
  :width="300"
  :headStyle="{ fontSize: '18px', color: '#fff', backgroundColor: '#1677ff'}"
  :bodyStyle="{ fontSize: '16px', color: '#fff', backgroundColor: '#52c41a'}">
  <template #extra><a href="#">more</a></template>
  <p>card content</p>
  <p>card content</p>
  <p>card content</p>
</Card>

::: details Show Code

```vue
<template>
  <Card
    title="Default size card"
    :width="300"
    :headStyle="{ fontSize: '18px', color: '#fff', backgroundColor: '#1677ff'}"
    :bodyStyle="{ fontSize: '16px', color: '#fff', backgroundColor: '#52c41a'}">
    <template #extra><a href="#">more</a></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </Card>
</template>
```

:::

## 内部嵌套卡片

<Card title="Card title" :width="360">
  <p style="font-size: 14px; color: rgba(0, 0, 0, 0.85); margin-bottom: 16px; font-weight: 500;">
    Group title
  </p>
  <Card title="Inner card title">
    <template #extra>
      <a href="#">More</a>
    </template>
    Inner Card content
  </Card>
  <Card title="Inner card title" :style="{ marginTop: '16px' }">
    <template #extra>
      <a href="#">More</a>
    </template>
    Inner Card content
  </Card>
</Card>

::: details Show Code

```vue
<template>
  <Card title="Card title" :width="360">
    <p style="font-size: 14px; color: rgba(0, 0, 0, 0.85); margin-bottom: 16px; font-weight: 500;">
      Group title
    </p>
    <Card title="Inner card title">
      <template #extra>
        <a href="#">More</a>
      </template>
      Inner Card content
    </Card>
    <Card title="Inner card title" :style="{ marginTop: '16px' }">
      <template #extra>
        <a href="#">More</a>
      </template>
      Inner Card content
    </Card>
  </Card>
</template>
```

:::

## 栅格卡片

<div style="background-color: #ececec; padding: 20px; border-radius: 8px;">
  <Row :gutter="16">
    <Col :span="8">
      <Card title="Card title" :bordered="false">
        <p>card content</p>
      </Card>
    </Col>
    <Col :span="8">
      <Card title="Card title" :bordered="false">
        <p>card content</p>
      </Card>
    </Col>
    <Col :span="8">
      <Card title="Card title" :bordered="false">
        <p>card content</p>
      </Card>
    </Col>
  </Row>
</div>

::: details Show Code

```vue
<template>
  <div style="background-color: #ececec; padding: 20px; border-radius: 8px;">
    <Row :gutter="16">
      <Col :span="8">
        <Card title="Card title" :bordered="false">
          <p>card content</p>
        </Card>
      </Col>
      <Col :span="8">
        <Card title="Card title" :bordered="false">
          <p>card content</p>
        </Card>
      </Col>
      <Col :span="8">
        <Card title="Card title" :bordered="false">
          <p>card content</p>
        </Card>
      </Col>
    </Row>
  </div>
</template>
```

:::

## APIs

### Card

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
width | 卡片宽度，单位 `px` | number &#124; string | 'auto'
bordered | 是否有边框 | boolean | true
size | 卡片的尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
hoverable | 鼠标移过时可浮起 | boolean | false
loading | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位 | boolean | false
skeletonProps | 加载中时，骨架屏的属性配置，参考 [Skeleton Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/skeleton.html#skeleton) | object | {}
title | 卡片标题 | string &#124; slot | undefined
extra | 卡片右上角的操作区域 | string &#124; slot | undefined
headStyle | 自定义标题区域样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
bodyStyle | 自定义内容区域样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
