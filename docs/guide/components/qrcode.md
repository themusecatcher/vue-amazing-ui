# 二维码 QRCode

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## 何时使用

- 当需要将链接转换成为二维码时使用

<script lang="ts" setup>
import { ref } from 'vue'
const size = ref(160)
const value = ref('hello world')
const decline = () => {
  size.value = size.value - 10
  if (size.value < 48) {
    size.value = 48
  }
}
const increase = () => {
  size.value = size.value + 10
  if (size.value > 300) {
    size.value = 300
  }
}
</script>

## 基本使用

<QRCode value="https://blog.csdn.net/Dandrose"/>

::: details Show Code

```vue
<template>
  <QRCode value="https://blog.csdn.net/Dandrose"/>
</template>
```

:::

## 无边框

<QRCode value="https://blog.csdn.net/Dandrose" :bordered="false" />

::: details Show Code

```vue
<template>
  <QRCode value="https://blog.csdn.net/Dandrose" :bordered="false" />
</template>
```

:::

## 纠错等级

*纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。*

*通常情况下二维码分为 4 个纠错级别：*

- **L级** 可纠正约 7% 错误
- **M级** 可纠正约 15% 错误
- **Q级** 可纠正约 25% 错误
- **H级** 可纠正约30% 错误。

并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。**中间零散的部分是内容编码，可以容忍缺损**。当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。

<br/>

<QRCode value="https://blog.csdn.net/Dandrose" error-level="M" />

::: details Show Code

```vue
<template>
  <QRCode value="https://blog.csdn.net/Dandrose" error-level="M" />
</template>
```

:::

## 自定义尺寸

<Space>
  <Button @click="decline">
    <svg focusable="false" data-icon="minus" width="1em" height="1em" style="fill: #000000E0" aria-hidden="true" viewBox="64 64 896 896"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
    <span style="margin-inline-start: 8px;">small</span>
  </Button>
  <Button @click="increase">
    <svg focusable="false" data-icon="plus" width="1em" height="1em" style="fill: #000000E0" aria-hidden="true" viewBox="64 64 896 896"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg>
    <span style="margin-inline-start: 8px;">large</span>
  </Button>
</Space>
<br/>
<br/>
<QRCode :size="size" value="https://blog.csdn.net/Dandrose" />

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const size = ref(160)
const decline = () => {
  size.value = size.value - 10
  if (size.value < 48) {
    size.value = 48
  }
}
const increase = () => {
  size.value = size.value + 10
  if (size.value > 300) {
    size.value = 300
  }
}
</script>
<template>
  <Space>
    <Button @click="decline">
      <svg focusable="false" data-icon="minus" width="1em" height="1em" style="fill: #000000E0" aria-hidden="true" viewBox="64 64 896 896"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
      <span style="margin-inline-start: 8px;">small</span>
    </Button>
    <Button @click="increase">
      <svg focusable="false" data-icon="plus" width="1em" height="1em" style="fill: #000000E0" aria-hidden="true" viewBox="64 64 896 896"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg>
      <span style="margin-inline-start: 8px;">large</span>
    </Button>
  </Space>
  <br/>
  <br/>
  <QRCode :size="size" value="https://blog.csdn.net/Dandrose" />
</template>
```

:::

## 自定义样式

*自定义二维码颜色和背景色*

<br/>

<Space>
  <QRCode
    value="https://blog.csdn.net/Dandrose"
    color="#52c41a" />
  <QRCode
    value="https://blog.csdn.net/Dandrose"
    color="#1677FF"
    bg-color="#f5f5f5" />
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <QRCode
      value="https://blog.csdn.net/Dandrose"
      color="#52c41a" />
    <QRCode
      value="https://blog.csdn.net/Dandrose"
      color="#1677FF"
      bg-color="#f5f5f5" />
  </Space>
</template>
```

:::

## 自定义生成二维码

<Space align="center" gap="large">
  <QRCode :value="value" />
  <Textarea v-model:value="value" :width="180" allowClear />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('hello world')
</script>
<template>
  <Space align="center" gap="large">
    <QRCode :value="value" />
    <Textarea v-model:value="value" :width="180" allowClear />
  </Space>
</template>
```

:::

## APIs

### QRCode

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
value | 扫描后的文本或地址 | string | undefined
size | 二维码大小，单位 `px` | number | 160
color | 二维码颜色，Value must be in `hex format` (十六进制颜色值) | string | '#000'
bgColor | 二维码背景色，Value must be in `hex format` (十六进制颜色值) | string | '#FFF'
bordered | 是否有边框 | boolean | true
borderColor | 边框颜色 | string | '#0505050f'
scale | 每个 `black dots` 多少像素 | number | 8
errorLevel | 二维码纠错等级 | 'L' &#124; 'M' &#124; 'Q' &#124; 'H' | 'H'
