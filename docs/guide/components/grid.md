# 栅格 Grid

<br/>

*24 栅格系统*

## 基本使用

<Row class="row">
  <Col :span="24">col</Col>
</Row>
<Row class="row">
  <Col :span="12">col-12</Col>
  <Col :span="12">col-12</Col>
</Row>
<Row class="row">
  <Col :span="8">col-8</Col>
  <Col :span="8">col-8</Col>
  <Col :span="8">col-8</Col>
</Row>
<Row class="row">
  <Col :span="6">col-6</Col>
  <Col :span="6">col-6</Col>
  <Col :span="6">col-6</Col>
  <Col :span="6">col-6</Col>
</Row>

::: details Show Code

```vue
<template>
  <Row class="row">
    <Col :span="24">col</Col>
  </Row>
  <Row class="row">
    <Col :span="12">col-12</Col>
    <Col :span="12">col-12</Col>
  </Row>
  <Row class="row">
    <Col :span="8">col-8</Col>
    <Col :span="8">col-8</Col>
    <Col :span="8">col-8</Col>
  </Row>
  <Row class="row">
    <Col :span="6">col-6</Col>
    <Col :span="6">col-6</Col>
    <Col :span="6">col-6</Col>
    <Col :span="6">col-6</Col>
  </Row>
</template>
```

:::

## 水平区块间隔

<Row :gutter="16">
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
</Row>

::: details Show Code

```vue
<template>
  <Row :gutter="16">
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
  </Row>
</template>
```

:::

## 响应式区块间隔

<Row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
</Row>

::: details Show Code

```vue
<template>
  <Row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
  </Row>
</template>
```

:::

## 垂直区块间隔

<Row :gutter="[16, 24]">
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
</Row>

::: details Show Code

```vue
<template>
  <Row :gutter="[16, 24]">
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
  </Row>
</template>
```

:::

## 响应式垂直区块间隔

<Row :gutter="[16, { xs: 8, sm: 16, md: 24, lg: 32 }]">
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col class="gutter-row" :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
</Row>

::: details Show Code

```vue
<template>
  <Row :gutter="[16, { xs: 8, sm: 16, md: 24, lg: 32 }]">
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
    <Col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </Col>
  </Row>
</template>
```

:::

## 左右偏移

<Row class="row">
  <Col :span="8">col-8</Col>
  <Col :span="8" :offset="8">col-8</Col>
</Row>
<Row class="row">
  <Col :span="6" :offset="6">col-6 col-offset-6</Col>
  <Col :span="6" :offset="6">col-6 col-offset-6</Col>
</Row>
<Row class="row">
  <Col :span="12" :offset="6">col-12 col-offset-6</Col>
</Row>

::: details Show Code

```vue
<template>
  <Row class="row">
    <Col :span="8">col-8</Col>
    <Col :span="8" :offset="8">col-8</Col>
  </Row>
  <Row class="row">
    <Col :span="6" :offset="6">col-6 col-offset-6</Col>
    <Col :span="6" :offset="6">col-6 col-offset-6</Col>
  </Row>
  <Row class="row">
    <Col :span="12" :offset="6">col-12 col-offset-6</Col>
  </Row>
</template>
```

:::

## 排版方式

<Divider orientation="left">sub-element align left</Divider>
<Row class="row" justify="start">
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
</Row>
<Divider orientation="left">sub-element align center</Divider>
<Row class="row" justify="center">
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
</Row>
<Divider orientation="left">sub-element align right</Divider>
<Row class="row" justify="end">
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
</Row>
<Divider orientation="left">sub-element align space-between</Divider>
<Row class="row" justify="space-between">
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
</Row>
<Divider orientation="left">sub-element align space-around</Divider>
<Row class="row" justify="space-around">
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
</Row>
<Divider orientation="left">sub-element align space-evenly</Divider>
<Row class="row" justify="space-evenly">
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
  <Col :span="4">col-4</Col>
</Row>

::: details Show Code

```vue
<template>
  <Divider orientation="left">sub-element align left</Divider>
  <Row class="row" justify="start">
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
  </Row>
  <Divider orientation="left">sub-element align center</Divider>
  <Row class="row" justify="center">
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
  </Row>
  <Divider orientation="left">sub-element align right</Divider>
  <Row class="row" justify="end">
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
  </Row>
  <Divider orientation="left">sub-element align space-between</Divider>
  <Row class="row" justify="space-between">
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
  </Row>
  <Divider orientation="left">sub-element align space-around</Divider>
  <Row class="row" justify="space-around">
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
  </Row>
  <Divider orientation="left">sub-element align space-evenly</Divider>
  <Row class="row" justify="space-evenly">
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
    <Col :span="4">col-4</Col>
  </Row>
</template>
```

:::

## 对齐方式

<Divider orientation="left">Align Top</Divider>
<Row class="row" style="background: rgba(128,128,128,.08);" justify="center" align="top">
  <Col :span="4">
    <p class="height-100">col-4</p>
  </Col>
  <Col :span="4">
    <p class="height-50">col-4</p>
  </Col>
  <Col :span="4">
    <p class="height-120">col-4</p>
  </Col>
  <Col :span="4">
    <p class="height-80">col-4</p>
  </Col>
</Row>
<Divider orientation="left">Align Middle</Divider>
<Row class="row" style="background: rgba(128,128,128,.08);" justify="space-around" align="middle">
  <Col :span="4">
    <p class="height-100">col-4</p>
  </Col>
  <Col :span="4">
    <p class="height-50">col-4</p>
  </Col>
  <Col :span="4">
    <p class="height-120">col-4</p>
  </Col>
  <Col :span="4">
    <p class="height-80">col-4</p>
  </Col>
</Row>
<Divider orientation="left">Align Bottom</Divider>
<Row class="row" style="background: rgba(128,128,128,.08);" justify="space-between" align="bottom">
  <Col :span="4">
    <p class="height-100">col-4</p>
  </Col>
  <Col :span="4">
    <p class="height-50">col-4</p>
  </Col>
  <Col :span="4">
    <p class="height-120">col-4</p>
  </Col>
  <Col :span="4">
    <p class="height-80">col-4</p>
  </Col>
</Row>

::: details Show Code

```vue
<template>
  <Divider orientation="left">Align Top</Divider>
  <Row class="row" style="background: rgba(128,128,128,.08);" justify="center" align="top">
    <Col :span="4">
      <p class="height-100">col-4</p>
    </Col>
    <Col :span="4">
      <p class="height-50">col-4</p>
    </Col>
    <Col :span="4">
      <p class="height-120">col-4</p>
    </Col>
    <Col :span="4">
      <p class="height-80">col-4</p>
    </Col>
  </Row>
  <Divider orientation="left">Align Middle</Divider>
  <Row class="row" style="background: rgba(128,128,128,.08);" justify="space-around" align="middle">
    <Col :span="4">
      <p class="height-100">col-4</p>
    </Col>
    <Col :span="4">
      <p class="height-50">col-4</p>
    </Col>
    <Col :span="4">
      <p class="height-120">col-4</p>
    </Col>
    <Col :span="4">
      <p class="height-80">col-4</p>
    </Col>
  </Row>
  <Divider orientation="left">Align Bottom</Divider>
  <Row class="row" style="background: rgba(128,128,128,.08);" justify="space-between" align="bottom">
    <Col :span="4">
      <p class="height-100">col-4</p>
    </Col>
    <Col :span="4">
      <p class="height-50">col-4</p>
    </Col>
    <Col :span="4">
      <p class="height-120">col-4</p>
    </Col>
    <Col :span="4">
      <p class="height-80">col-4</p>
    </Col>
  </Row>
</template>
```

:::

## flex 填充

<Divider orientation="left">Percentage columns</Divider>
<Row class="row">
  <Col :flex="2">2 / 5</Col>
  <Col :flex="3">3 / 5</Col>
</Row>
<Divider orientation="left">Fill rest</Divider>
<Row class="row">
  <Col flex="0 0 100px">100px</Col>
  <Col flex="auto">auto</Col>
</Row>
<Divider orientation="left">Raw flex style</Divider>
<Row class="row">
  <Col flex="1 1 200px">1 1 200px</Col>
  <Col flex="0 1 300px">0 1 300px</Col>
</Row>
<Row class="row" :wrap="false">
  <Col flex="none">
    <div style="padding: 0 16px">none</div>
  </Col>
  <Col flex="auto">auto with no-wrap</Col>
</Row>

::: details Show Code

```vue
<template>
  <Divider orientation="left">Percentage columns</Divider>
  <Row class="row">
    <Col :flex="2">2 / 5</Col>
    <Col :flex="3">3 / 5</Col>
  </Row>
  <Divider orientation="left">Fill rest</Divider>
  <Row class="row">
    <Col flex="0 0 100px">100px</Col>
    <Col flex="auto">auto</Col>
  </Row>
  <Divider orientation="left">Raw flex style</Divider>
  <Row class="row">
    <Col flex="1 1 200px">1 1 200px</Col>
    <Col flex="0 1 300px">0 1 300px</Col>
  </Row>
  <Row class="row" :wrap="false">
    <Col flex="none">
      <div style="padding: 0 16px">none</div>
    </Col>
    <Col flex="auto">auto with no-wrap</Col>
  </Row>
</template>
```

:::

## 响应式布局

<Row class="row">
  <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</Col>
  <Col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">Col</Col>
  <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</Col>
</Row>

::: details Show Code

```vue
<template>
  <Row class="row">
    <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</Col>
    <Col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">Col</Col>
    <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</Col>
  </Row>
</template>
```

:::

## span 和 offset 属性的响应式

<Row class="row">
  <Col :xs="{ span: 5, offset: 1 }" :sm="{ span: 6, offset: 2 }">Col</Col>
  <Col :xs="{ span: 11, offset: 1 }" :sm="{ span: 6, offset: 2 }">Col</Col>
  <Col :xs="{ span: 5, offset: 1 }" :sm="{ span: 6, offset: 2 }">Col</Col>
</Row>

::: details Show Code

```vue
<template>
  <Row class="row">
    <Col :xs="{ span: 5, offset: 1 }" :sm="{ span: 6, offset: 2 }">Col</Col>
    <Col :xs="{ span: 11, offset: 1 }" :sm="{ span: 6, offset: 2 }">Col</Col>
    <Col :xs="{ span: 5, offset: 1 }" :sm="{ span: 6, offset: 2 }">Col</Col>
  </Row>
</template>
```

:::

<style lang="less" scoped>
.row {
  .m-col {
    min-height: 30px;
    margin-top: 8px;
    margin-bottom: 8px;
    color: #fff;
    text-align: center;
    border-radius: 0;
    padding: 16px 0;
    background: #1677ff;
  }
  :deep(>:nth-child(2n+1)) {
    background: #1677ffbf;
  }
}
.gutter-row {
  .m-col {
    min-height: 30px;
    margin-top: 8px;
    margin-bottom: 8px;
    color: #fff;
    text-align: center;
    border-radius: 0;
  }
  .gutter-box {
    background: #0092ff;
    padding: 8px 0;
  }
  .m-col {
    margin-top: 0;
    margin-bottom: 0;
  }
}
.height-50 {
  height: 50px;
  line-height: 50px;
}
.height-80 {
  height: 80px;
  line-height: 80px;
}
.height-100 {
  height: 100px;
  line-height: 100px;
}
.height-120 {
  height: 120px;
  line-height: 120px;
}
</style>

## APIs

### Row

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 行宽度 | string &#124; number | 'auto' | false
gutter | 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距] | number &#124; [number &#124; Responsive, number &#124; Responsive] &#124; Responsive | 0 | false
wrap | 是否自动换行 | boolean | false | false
align | 垂直对齐方式 | 'top' &#124; 'middle' &#124; 'bottom' &#124; 'stretch' | 'top' | false
justify | 水平排列方式 | 'start' &#124; 'end' &#124; 'center' &#124; 'space-around' &#124; 'space-between' &#124; 'space-evenly' | 'start' | false

### Responsive Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
xs | `&lt;576px` 响应式栅格 | number | false
sm | `≥576px` 响应式栅格 | number | false
md | `≥768px` 响应式栅格 | number | false
lg | `≥992px` 响应式栅格 | number | false
xl | `≥1200px` 响应式栅格 | number | false
xxl | `≥1600px` 响应式栅格 | number | false

### Col

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
span | 栅格占位格数，取 `0,1,2...24`；为 `0` 时相当于 `display: none` | number | undefined | false
offset | 栅格左侧的间隔格数，取0,1,2...24 | number | 0 | false
flex | flex 布局填充 | string &#124; number | '' | false
xs | `&lt;576px` 响应式栅格 | number &#124; {span: number&#44; offset?: number} | undefined | false
sm | `≥576px` 响应式栅格 | number &#124; {span: number&#44; offset?: number} | undefined | false
md | `≥768px` 响应式栅格 | number &#124; {span: number&#44; offset?: number} | undefined | false
lg | `≥992px` 响应式栅格 | number &#124; {span: number&#44; offset?: number} | undefined | false
xl | `≥1200px` 响应式栅格 | number &#124; {span: number&#44; offset?: number} | undefined | false
xxl | `≥1600px` 响应式栅格 | number &#124; {span: number&#44; offset?: number} | undefined | false
