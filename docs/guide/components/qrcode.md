# 二维码 QRCode

<GlobalElement />

*二维码*

## 何时使用

- 当需要将链接或文字转换成为二维码时

## 参考文档

- [qrcode](https://www.npmjs.com/package/qrcode)

<script lang="ts" setup>
import { h, ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
const qrcodeRef = ref()
const size = ref(160)
const value = ref('hello world')
const color = ref('#FF6900')
const bgColor = ref('#00000030')
const segmentedOptions = ['L', 'M', 'Q', 'H']
const level = ref('L')
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
const dowloadQRCode = async () => {
  const url = await qrcodeRef.value.getQRCodeImage()
  const a = document.createElement('a')
  a.download = 'QRCode.png'
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
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

## 自定义尺寸

<Space vertical>
  <Space>
    <Button @click="decline" :icon="() => h(MinusOutlined)">
      small
    </Button>
    <Button @click="increase" :icon="() => h(PlusOutlined)">
      large
    </Button>
  </Space>
  <QRCode :size="size" value="https://blog.csdn.net/Dandrose" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
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
  <Space vertical>
    <Space>
      <Button @click="decline" :icon="() => h(MinusOutlined)">
        small
      </Button>
      <Button @click="increase" :icon="() => h(PlusOutlined)">
        large
      </Button>
    </Space>
    <QRCode :size="size" value="https://blog.csdn.net/Dandrose" />
  </Space>
</template>
```

:::

## 下载二维码

<Space vertical>
  <QRCode ref="qrcodeRef" value="https://blog.csdn.net/Dandrose" />
  <Button type="primary" @click="dowloadQRCode">Downlaod</Button>
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const qrcodeRef = ref()
const dowloadQRCode = async () => {
  const url = await qrcodeRef.value.getQRCodeImage()
  const a = document.createElement('a')
  a.download = 'QRCode.png'
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>
<template>
  <Space vertical>
    <QRCode ref="qrcodeRef" value="https://blog.csdn.net/Dandrose" />
    <Button type="primary" @click="dowloadQRCode">Downlaod</Button>
  </Space>
</template>
```

:::

## 气泡卡片二维码

<Popover :tooltip-style="{ padding: 0 }">
  <template #content>
    <QRCode value="https://blog.csdn.net/Dandrose" :bordered="false" />
  </template>
  <img width="100" height="100" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" />
</Popover>

::: details Show Code

```vue
<template>
  <Popover :tooltip-style="{ padding: 0 }">
    <template #content>
      <QRCode value="https://blog.csdn.net/Dandrose" :bordered="false" />
    </template>
    <img width="100" height="100" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" />
  </Popover>
</template>
```

:::

## 带 Icon 的二维码

<QRCode
  error-level="H"
  value="https://blog.csdn.net/Dandrose"
  icon="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
/>

::: details Show Code

```vue
<template>
  <QRCode
    error-level="H"
    value="https://blog.csdn.net/Dandrose"
    icon="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
  />
</template>
```

:::

## 自定义渲染类型

*通过设置 `type` 自定义渲染结果，可选 `svg` `canvas` `image` 三种类型*

<br/>

<Space>
  <QRCode value="https://blog.csdn.net/Dandrose" type="svg" />
  <QRCode value="https://blog.csdn.net/Dandrose" type="canvas" />
  <QRCode value="https://blog.csdn.net/Dandrose" type="image" />
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <QRCode value="https://blog.csdn.net/Dandrose" type="svg" />
    <QRCode value="https://blog.csdn.net/Dandrose" type="canvas" />
    <QRCode value="https://blog.csdn.net/Dandrose" type="image" />
  </Space>
</template>
```

:::

## 自定义样式

*自定义二维码颜色和背景色*

<br/>

<Space>
  <QRCode value="https://blog.csdn.net/Dandrose" color="#52c41a" />
  <QRCode value="https://blog.csdn.net/Dandrose" color="#1677FF" bg-color="#f5f5f5" />
  <QRCode value="https://blog.csdn.net/Dandrose" :color="color" :bg-color="bgColor" />
  <Space vertical :width="164">
    <ColorPicker v-model:value="color" :modes="['hex']" />
    <ColorPicker v-model:value="bgColor" :modes="['hex']" />
  </Space>
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const color = ref('#FF6900')
const bgColor = ref('#00000030')
</script>
<template>
  <Space>
    <QRCode value="https://blog.csdn.net/Dandrose" color="#52c41a" />
    <QRCode value="https://blog.csdn.net/Dandrose" color="#1677FF" bg-color="#f5f5f5" />
    <QRCode value="https://blog.csdn.net/Dandrose" :color="color" :bg-color="bgColor" />
    <Space vertical :width="164">
      <ColorPicker v-model:value="color" :modes="['hex']" />
      <ColorPicker v-model:value="bgColor" :modes="['hex']" />
    </Space>
  </Space>
</template>
```

:::

## 纠错等级

*纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。*

*通常情况下二维码分为 `4` 个纠错级别：*

- **L级** 可纠正约 `7%` 错误
- **M级** 可纠正约 `15%` 错误
- **Q级** 可纠正约 `25%` 错误
- **H级** 可纠正约 `30%` 错误。

并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。**中间零散的部分是内容编码，可以容忍缺损**。当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。

<br/>

<Space vertical>
  <QRCode value="https://blog.csdn.net/Dandrose" :error-level="level" />
  <Segmented v-model:value="level" :options="segmentedOptions" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const segmentedOptions = ['L', 'M', 'Q', 'H']
const level = ref('L')
</script>
<template>
  <Space vertical>
    <QRCode value="https://blog.csdn.net/Dandrose" :error-level="level" />
    <Segmented v-model:value="level" :options="segmentedOptions" />
  </Space>
</template>
```

:::

## 自定义生成二维码

<Space align="center" gap="large">
  <QRCode :value="value" />
  <Textarea v-model:value="value" :width="200" allowClear />
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
    <Textarea v-model:value="value" :width="200" allowClear />
  </Space>
</template>
```

:::

## APIs

### QRCode

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
value | 扫描后的文本或地址 | string | undefined
type | 二维码的渲染类型 | 'svg' &#124; 'canvas' &#124; 'image' | 'svg'
icon | 二维码中图片的地址 | string | undefined
size | 二维码大小，单位 `px` | number | 160
iconSize | 二维码中图片的大小，单位 `px` | number | 40
color | 二维码颜色，Value must be in `hex format` (十六进制颜色值) | string | '#000'
bgColor | 二维码背景色，Value must be in `hex format` (十六进制颜色值) | string | '#FFF'
bordered | 是否有边框 | boolean | true
borderColor | 边框颜色 | string | 'rgba(5, 5, 5, 0.06)'
scale | 缩放因子，每个 `black dots` 多少像素 | number | 8
errorLevel | 二维码纠错等级 | 'L' &#124; 'M' &#124; 'Q' &#124; 'H' | 'H'

## Methods

名称 | 说明 | 类型
:-- | :-- | :--
getQRCodeImage | 获取二维码图片 | () => string
