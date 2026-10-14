# 二维码 QRCode

<GlobalElement />

_二维码_

## 何时使用

- 当需要将链接或文字转换成为二维码时

## 参考文档

- [QR Code generator library](https://www.nayuki.io/page/qr-code-generator-library)

<script lang="ts" setup>
import { ref, h } from 'vue'
import { QRCode } from 'vue-amazing-ui'
import { MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons-vue'
const qrcodeRef = ref<InstanceType<typeof QRCode> | null>(null)
const size = ref(160)
const value = ref('hello world')
const color = ref('#FF6900')
const bgColor = ref('#00000030')
const segmentedOptions = ['L', 'M', 'Q', 'H']
const level = ref('L')
const status = ref('expired')
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
const refreshStatus = () => {
  status.value = 'loading'
  setTimeout(() => {
    status.value = 'active'
  }, 1500)
}
const downloadQRCode = () => {
  const url = qrcodeRef.value?.toDataURL()
  if (!url) return
  const a = document.createElement('a')
  a.download = 'QRCode.png'
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>

## 基本使用

<Space vertical align="center">
  <QRCode :value="value" title="扫码查看当前内容" />
  <Input v-model:value="value" placeholder="-" :maxlength="60" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('hello world')
</script>
<template>
  <Space vertical align="center">
    <QRCode :value="value" title="扫码查看当前内容" />
    <Input v-model:value="value" placeholder="-" :maxlength="60" />
  </Space>
</template>
```

:::

## 带 Icon 的例子

<QRCode
  error-level="H"
  value="https://themusecatcher.blog.csdn.net"
  icon="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
/>

::: details Show Code

```vue
<template>
  <QRCode
    error-level="H"
    value="https://themusecatcher.blog.csdn.net"
    icon="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
  />
</template>
```

:::

## 不同的状态

_通过 `status` 控制二维码状态，可选 `active` `expired` `loading` `scanned` 四个取值；`expired` 状态点击「点击刷新」时触发 `refresh` 事件_

<br/>

<Space vertical align="center">
  <Space>
    <QRCode value="https://themusecatcher.blog.csdn.net" status="loading" />
    <QRCode value="https://themusecatcher.blog.csdn.net" :status="status" @refresh="refreshStatus" />
    <QRCode value="https://themusecatcher.blog.csdn.net" status="scanned" />
  </Space>
  <Segmented v-model:value="status" :options="['active', 'expired', 'loading', 'scanned']" />
  <Button :icon="h(ReloadOutlined)" @click="refreshStatus">重新获取二维码</Button>
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const status = ref('expired')
const refreshStatus = () => {
  status.value = 'loading'
  setTimeout(() => {
    status.value = 'active'
  }, 1500)
}
</script>
<template>
  <Space vertical align="center">
    <Space>
      <QRCode value="https://themusecatcher.blog.csdn.net" status="loading" />
      <QRCode value="https://themusecatcher.blog.csdn.net" :status="status" @refresh="refreshStatus" />
      <QRCode value="https://themusecatcher.blog.csdn.net" status="scanned" />
    </Space>
    <Segmented v-model:value="status" :options="['active', 'expired', 'loading', 'scanned']" />
    <Button @click="refreshStatus">重新获取二维码</Button>
  </Space>
</template>
```

:::

## 自定义渲染类型

_通过设置 `type` 自定义渲染结果，可选 `svg` `canvas` `image` 三种类型_

<br/>

<Space>
  <QRCode value="https://themusecatcher.blog.csdn.net" type="svg" />
  <QRCode value="https://themusecatcher.blog.csdn.net" type="canvas" />
  <QRCode value="https://themusecatcher.blog.csdn.net" type="image" />
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <QRCode value="https://themusecatcher.blog.csdn.net" type="svg" />
    <QRCode value="https://themusecatcher.blog.csdn.net" type="canvas" />
    <QRCode value="https://themusecatcher.blog.csdn.net" type="image" />
  </Space>
</template>
```

:::

## 自定义尺寸

<Space vertical>
  <Space>
    <Button @click="decline" :icon="h(MinusOutlined)"> small </Button>
    <Button @click="increase" :icon="h(PlusOutlined)"> large </Button>
  </Space>
  <QRCode :size="size" value="https://themusecatcher.blog.csdn.net" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, h } from 'vue'
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
      <Button @click="decline" :icon="h(MinusOutlined)"> small </Button>
      <Button @click="increase" :icon="h(PlusOutlined)"> large </Button>
    </Space>
    <QRCode :size="size" value="https://themusecatcher.blog.csdn.net" />
  </Space>
</template>
```

:::

## 自定义颜色

_通过设置 `color` 自定义二维码颜色，通过设置 `bgColor` 自定义背景颜色_

<br/>

<Space>
  <QRCode value="https://themusecatcher.blog.csdn.net" color="#52c41a" />
  <QRCode value="https://themusecatcher.blog.csdn.net" color="#1677FF" bg-color="#f5f5f5" />
  <QRCode value="https://themusecatcher.blog.csdn.net" :color="color" :bg-color="bgColor" />
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
    <QRCode value="https://themusecatcher.blog.csdn.net" color="#52c41a" />
    <QRCode value="https://themusecatcher.blog.csdn.net" color="#1677FF" bg-color="#f5f5f5" />
    <QRCode value="https://themusecatcher.blog.csdn.net" :color="color" :bg-color="bgColor" />
    <Space vertical :width="164">
      <ColorPicker v-model:value="color" :modes="['hex']" />
      <ColorPicker v-model:value="bgColor" :modes="['hex']" />
    </Space>
  </Space>
</template>
```

:::

## 下载二维码

<Space vertical>
  <QRCode ref="qrcodeRef" value="https://themusecatcher.blog.csdn.net" />
  <Button type="primary" @click="downloadQRCode">Download</Button>
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { QRCode } from 'vue-amazing-ui'
const qrcodeRef = ref<InstanceType<typeof QRCode> | null>(null)
const downloadQRCode = () => {
  const url = qrcodeRef.value?.toDataURL()
  if (!url) return
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
    <QRCode ref="qrcodeRef" value="https://themusecatcher.blog.csdn.net" />
    <Button type="primary" @click="downloadQRCode">Download</Button>
  </Space>
</template>
```

:::

## 纠错比例

<Space>
  <QRCode value="https://themusecatcher.blog.csdn.net" :error-level="level" />
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
  <Space>
    <QRCode value="https://themusecatcher.blog.csdn.net" :error-level="level" />
    <Segmented v-model:value="level" :options="segmentedOptions" />
  </Space>
</template>
```

:::

## 高级用法

<Popover :tooltip-style="{ padding: 0 }">
  <template #content>
    <QRCode value="https://themusecatcher.blog.csdn.net" :bordered="false" />
  </template>
  <img width="100" height="100" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" />
</Popover>

::: details Show Code

```vue
<template>
  <Popover :tooltip-style="{ padding: 0 }">
    <template #content>
      <QRCode value="https://themusecatcher.blog.csdn.net" :bordered="false" />
    </template>
    <img width="100" height="100" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" />
  </Popover>
</template>
```

:::

## 无边框

_通过设置 `bordered` 为 `false` 去掉外边框_

<br/>

<QRCode value="https://themusecatcher.blog.csdn.net" :bordered="false" />

::: details Show Code

```vue
<template>
  <QRCode value="https://themusecatcher.blog.csdn.net" :bordered="false" />
</template>
```

:::

## 自定义内边距

_通过设置 `padding` 调整容器内边距，二维码绘制区随内边距变化_

<br/>

<Space vertical>
  <Space align="center">
    <Slider v-model:value="padding" :min="0" :max="48" :step="4" :width="260" />
    <span>padding = {{ padding }} px</span>
  </Space>
  <Space>
    <QRCode value="https://themusecatcher.blog.csdn.net" :padding="0" />
    <QRCode value="https://themusecatcher.blog.csdn.net" :padding="padding" />
    <QRCode value="https://themusecatcher.blog.csdn.net" :padding="48" />
  </Space>
</Space>

:::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const padding = ref(12)
</script>
<template>
  <Space vertical>
    <Space align="center">
      <Slider v-model:value="padding" :min="0" :max="48" :step="4" :width="260" />
      <span>padding = {{ padding }} px</span>
    </Space>
    <Space>
      <QRCode value="https://themusecatcher.blog.csdn.net" :padding="0" />
      <QRCode value="https://themusecatcher.blog.csdn.net" :padding="padding" />
      <QRCode value="https://themusecatcher.blog.csdn.net" :padding="48" />
    </Space>
  </Space>
</template>
```

::::

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

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value | 需要编码为二维码的文本或地址 | string | undefined |
| title | 无障碍文本：`svg` 类型输出为 `title` 元素，`canvas` / `image` 类型输出为 `aria-label` / `alt` | string | undefined |
| type | 渲染类型：矢量 / 位图 / 图片 | 'svg' &#124; 'canvas' &#124; 'image' | 'svg' |
| size | 二维码整体大小（含内边距与外边框），单位为 `px` | number | 160 |
| padding | 容器内边距，二维码绘制区为 `size` 减去两侧内边距与外边框 | number | 12 |
| color | 二维码前景色，CSS 颜色值 | string | '#000' |
| bgColor | 二维码背景色，CSS 颜色值 | string | '#FFF' |
| icon | 二维码中央图标的地址 | string | undefined |
| iconSize | 中央图标的大小，单位为 `px` | number | 40 |
| iconBackgroundColor | 中央图标的底色，用于压盖点阵、凸显图标 | string | '#FFF' |
| iconBorderRadius | 中央图标底色的圆角，单位为 `px` | number | 4 |
| bordered | 是否展示外边框 | boolean | true |
| borderColor | 外边框颜色 | string | 'rgba(5, 5, 5, 0.06)' |
| status | 二维码状态 | 'active' &#124; 'expired' &#124; 'loading' &#124; 'scanned' | 'active' |
| expiredText | `status` 为 `expired` 时的提示文案 | string | '二维码已过期' |
| refreshText | `status` 为 `expired` 时刷新按钮的文案 | string | '点击刷新' |
| scannedText | `status` 为 `scanned` 时的提示文案 | string | '已扫描' |
| errorLevel | 二维码纠错等级（最低等级，容量允许时会自动提升到更高等级） | 'L' &#124; 'M' &#124; 'Q' &#124; 'H' | 'M' |
| scale | 每个二维码点占用的最小像素数（屏幕像素密度更高时自动提升），同时决定导出图片的分辨率 | number | 8 |

## Events

| 名称    | 说明                   | 类型                        |
| :------ | :--------------------- | :-------------------------- |
| refresh | 点击「点击刷新」时触发 | (event: MouseEvent) => void |

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| toDataURL | 获取二维码图片（`dataURL`），可传入 `type` 与 `quality` 参数（如 `toDataURL('image/jpeg', 0.8)`） | (type?: string, quality?: number) => string |

## FAQ

### 关于纠错等级

纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。

通常情况下二维码分为 `4` 个纠错级别：`L级` 可纠正约 `7%` 错误、`M级` 可纠正约 `15%` 错误、`Q级` 可纠正约 `25%` 错误、`H级` 可纠正约 `30%` 错误。并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。

传入的 `errorLevel` 是**最低等级**：当内容较少、提升等级不会增大二维码尺寸时，编码器会自动使用更高的纠错等级，因此内容越短实际纠错能力通常越强。

设置 `icon` 时建议使用 `M` 及以上等级（开发环境会对 `L` 等级给出提示），避免图标遮挡点阵后影响识别。

> 有关更多信息，可参阅相关资料：[https://www.qrcode.com/zh/about/error_correction](https://www.qrcode.com/zh/about/error_correction.html)

### 自定义遮罩配色

状态遮罩的配色由 CSS 变量控制，在祖先元素（如 `:root`）重新声明同名变量即可覆盖：

```css
:root {
  --qr-code-mask-bg: rgba(0, 0, 0, 0.06);
  --qr-code-mask-color: #1677ff;
}
```
