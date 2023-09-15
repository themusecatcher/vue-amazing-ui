# 卡片 Card<BackTop />

<br/>

*通用卡片容器*

## 何时使用

- 最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面

## 基本使用

<Card title="Default size card" :width="300">
  <template #extra><a href="#">more</a></template>
  <p>card content</p>
  <p>card content</p>
  <p>card content</p>
</Card>

::: details Show Code

```vue
<template>
  <Card title="Default size card" :width="300">
    <template #extra><a href="#">more</a></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </Card>
</template>
```

:::

## 小尺寸卡片

<Card size="small" title="Small size card" :width="300">
  <template #extra><a href="#">more</a></template>
  <p>card content</p>
  <p>card content</p>
  <p>card content</p>
</Card>

::: details Show Code

```vue
<template>
  <Card size="small" title="Small size card" :width="300">
    <template #extra><a href="#">more</a></template>
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

## 自定义标题和内容区域样式

<Card
  title="Default size card"
  :width="300"
  :headStyle="{ fontSize: '18px', color: '#fff', backgroundColor: '#52c41a'}"
  :bodyStyle="{ fontSize: '16px', color: '#fff', backgroundColor: '#faad14'}">
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
    :headStyle="{ fontSize: '18px', color: '#fff', backgroundColor: '#52c41a'}"
    :bodyStyle="{ fontSize: '16px', color: '#fff', backgroundColor: '#faad14'}">
    <template #extra><a href="#">more</a></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </Card>
</template>
```

:::

## 内部卡片

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

<ClientOnly>
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
</ClientOnly>

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

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 卡片宽度 | number &#124; string | 'auto' | false
bordered | 是否有边框 | boolean | true | false
extra | 卡片右上角的操作区域 | string &#124; slot | '' | false
size | 卡片的尺寸 | 'default' &#124; 'small' | 'default' | false
title | 卡片标题 | string &#124; slot | '' | false
headStyle | 标题区域自定义样式 | CSSProperties | {} | false
bodyStyle | 内容区域自定义样式 | CSSProperties | {} | false
