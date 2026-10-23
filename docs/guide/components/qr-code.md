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
import type { SpinProps } from 'vue-amazing-ui'
import { MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons-vue'
const qrcodeRef = ref<InstanceType<typeof QRCode> | null>(null)
const size = ref(160)
const padding = ref(12)
const formatPadding = (value: number) => `${value}px`
const value = ref('hello world')
const color = ref('#FF6900')
const bgColor = ref('#00000030')
const segmentedOptions = ['L', 'M', 'Q', 'H']
const level = ref('L')
const status = ref('expired')
const maskStyle = {
  '--qr-code-mask-bg-color': 'var(--va-warning-bg-color)',
  '--qr-code-mask-text-color': 'var(--va-text-color-1)'
}
type BuiltinIndicator = Extract<SpinProps['indicator'], string>
const indicatorOptions: BuiltinIndicator[] = [
  'dot',
  'dot-wheel',
  'line-wheel',
  'ring-circle',
  'ring-rail',
  'dynamic-circle',
  'magic-ring'
]
const indicator = ref<BuiltinIndicator>('dot')
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

_通过 `status` 控制二维码状态，可选 `active`、`expired`、`loading`、`scanned` 四个取值；`expired` 状态点击「点击刷新」时触发 `refresh` 事件_

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

## 自定义遮罩配色

_状态遮罩的底色、不透明度与文案色由 `--qr-code-mask-bg-color`、`--qr-code-mask-opacity`、`--qr-code-mask-text-color` 控制，在组件上重新声明即可覆盖；蒙层默认 `0.96` 不透明，二维码会隐约透出，需要完全遮住时设为 `1`_

右侧示例用语义变量 `--va-warning-bg-color` 作为底色，遮罩会随浅色 / 暗色主题自动切换；直接写固定色值（如 `rgba(255, 255, 255, 0.88)`）同样可行，但需自行保证两种主题下的对比度，且与默认的 `0.96` 蒙层叠加时建议把 `--qr-code-mask-opacity` 设为 `1`。

<br/>

<Space>
  <QRCode value="https://themusecatcher.blog.csdn.net" status="expired" />
  <QRCode :style="maskStyle" value="https://themusecatcher.blog.csdn.net" status="expired" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
const maskStyle = {
  '--qr-code-mask-bg-color': 'var(--va-warning-bg-color)',
  '--qr-code-mask-text-color': 'var(--va-text-color-1)'
}
</script>
<template>
  <Space>
    <QRCode value="https://themusecatcher.blog.csdn.net" status="expired" />
    <QRCode :style="maskStyle" value="https://themusecatcher.blog.csdn.net" status="expired" />
  </Space>
</template>
```

:::

## 自定义渲染类型

_通过设置 `type` 自定义渲染结果，可选 `svg`、`canvas`、`image` 三种类型_

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

`color` / `bgColor` 不传时分别取主题变量 `--va-text-color-1`（正文色）与 `--va-bg-container-color`（容器底色），因此深色主题下二维码会自动反色融入页面，不会出现刺眼的白块；需要固定「白底黑码」时显式传入 `color="#000"` `bg-color="#FFF"` 即可。

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

_纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。_

_通常情况下二维码分为 `4` 个纠错级别：_

- **L级** 可纠正约 `7%` 错误
- **M级** 可纠正约 `15%` 错误
- **Q级** 可纠正约 `25%` 错误
- **H级** 可纠正约 `30%` 错误

并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。当内容很少、最低版本即可容纳最高等级时，四个等级会生成完全相同的图案；内容增多后，选用不同等级生成的图案会有所不同。

传入的 `errorLevel` 是**最低等级**：当内容较少、提升等级不会增大二维码尺寸时，编码器会自动使用更高的纠错等级，因此内容越短实际纠错能力通常越强。

设置 `icon` 时建议使用 `M` 及以上等级（开发环境会对 `L` 等级给出提示），避免图标遮挡点阵后影响识别。

> 有关更多信息，可参阅相关资料：[https://www.qrcode.com/zh/about/error_correction](https://www.qrcode.com/zh/about/error_correction.html)

<br/>

<Space vertical>
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
  <Space vertical>
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

## 自定义加载中

_通过 `spinProps` 配置 `loading` 状态的指示符，参考 [Spin Props](./spin.md#spin)；不传时按遮罩尺寸取 `small` 档_

<br/>

**内置形态**（`indicator`）

<br/>

<Space vertical :gap="12">
  <Segmented v-model:value="indicator" :options="indicatorOptions" />
  <QRCode value="https://themusecatcher.blog.csdn.net" status="loading" :spin-props="{ indicator }" />
</Space>

<br/>
<br/>

**自定义颜色与文案**（`color` / `tip`）

<br/>

<Space>
  <QRCode
    value="https://themusecatcher.blog.csdn.net"
    status="loading"
    :spin-props="{ indicator: 'ring-circle', color: '#52c41a' }"
  />
  <QRCode
    value="https://themusecatcher.blog.csdn.net"
    status="loading"
    :spin-props="{ indicator: 'dot-wheel', tip: '加载中' }"
  />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import type { SpinProps } from 'vue-amazing-ui'
type BuiltinIndicator = Extract<SpinProps['indicator'], string>
const indicatorOptions: BuiltinIndicator[] = [
  'dot',
  'dot-wheel',
  'line-wheel',
  'ring-circle',
  'ring-rail',
  'dynamic-circle',
  'magic-ring'
]
const indicator = ref<BuiltinIndicator>('dot')
</script>
<template>
  <Space vertical :gap="12">
    <Segmented v-model:value="indicator" :options="indicatorOptions" />
    <QRCode value="https://themusecatcher.blog.csdn.net" status="loading" :spin-props="{ indicator }" />
  </Space>
  <br />
  <Space>
    <QRCode
      value="https://themusecatcher.blog.csdn.net"
      status="loading"
      :spin-props="{ indicator: 'ring-circle', color: '#52c41a' }"
    />
    <QRCode
      value="https://themusecatcher.blog.csdn.net"
      status="loading"
      :spin-props="{ indicator: 'dot-wheel', tip: '加载中' }"
    />
  </Space>
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
    <span>padding</span>
    <Slider v-model:value="padding" :min="0" :max="48" :step="4" :width="260" :format-tooltip="formatPadding" />
  </Space>
  <QRCode value="https://themusecatcher.blog.csdn.net" :padding="padding" />
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const padding = ref(12)
const formatPadding = (value: number) => `${value}px`
</script>
<template>
  <Space vertical>
    <Space align="center">
      <span>padding</span>
      <Slider v-model:value="padding" :min="0" :max="48" :step="4" :width="260" :format-tooltip="formatPadding" />
    </Space>
    <QRCode value="https://themusecatcher.blog.csdn.net" :padding="padding" />
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

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value | 需要编码为二维码的文本或地址；未传入（或传入空字符串）时渲染空容器，不生成二维码 | string | undefined |
| title | 无障碍文本：`svg` 类型输出为 `title` 元素，`canvas` / `image` 类型输出为 `aria-label` / `alt` | string | undefined |
| type | 渲染类型：矢量 / 位图 / 图片 | 'svg' &#124; 'canvas' &#124; 'image' | 'svg' |
| size | 二维码整体大小（含内边距与外边框），单位为 `px` | number | 160 |
| padding | 容器内边距，二维码绘制区为 `size` 减去两侧内边距与外边框 | number | 12 |
| color | 二维码前景色，`CSS` 颜色值；不传时取主题变量 `--va-text-color-1`（浅色 `rgba(0, 0, 0, 0.88)` / 暗色 `rgba(255, 255, 255, 0.85)`） | string | 取 `--va-text-color-1` |
| bgColor | 二维码背景色，`CSS` 颜色值；不传时取主题变量 `--va-bg-container-color`（浅色 `#ffffff` / 暗色 `#141414`） | string | 取 `--va-bg-container-color` |
| icon | 二维码中央图标的地址 | string | undefined |
| iconSize | 中央图标的大小，单位为 `px` | number | 40 |
| iconBgColor | 中央图标的底色，用于压盖点阵、凸显图标；不传时与背景色一致 | string | 取 `bgColor` |
| iconBorderRadius | 中央图标底色的圆角，单位为 `px` | number | 4 |
| bordered | 是否展示外边框 | boolean | true |
| borderColor | 外边框颜色 | string | 取 `--va-border-split-color`（浅色 `#f0f0f0` / 暗色 `#303030`） |
| status | 二维码状态 | 'active' &#124; 'expired' &#124; 'loading' &#124; 'scanned' | 'active' |
| spinProps | `Spin` 组件属性配置，参考 [Spin Props](./spin.md#spin)，用于配置加载中样式（`Spin` 默认按遮罩尺寸取 `small` 档） | [SpinProps](./spin.md#spin) | {} |
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
