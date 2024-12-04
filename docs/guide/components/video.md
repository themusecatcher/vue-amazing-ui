# 播放器 Video

<GlobalElement />

*简易封装的播放器*

## 何时使用

- 当需要在网页内播放视频时

<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
const video = ref()
function onPlay() {
  console.log('play')
}
function onPause() {
  console.log('pause')
}
const play = () => {
  video.value.play()
}
const pause = () => {
  video.value.pause()
}
</script>

## 基本使用

<Video
  :src="src"
  :poster="poster"
  width="100%"
  height="56.25%"
  @play="onPlay"
  @pause="onPause"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
function onPlay() {
  console.log('play')
}
function onPause() {
  console.log('pause')
}
</script>
<template>
  <Video
    :src="src"
    :poster="poster"
    width="100%"
    height="56.25%"
    @play="onPlay"
    @pause="onPause"
  />
</template>
```

:::

## 自定义视频和图标尺寸

<Video
  :src="src"
  :poster="poster"
  :width="400"
  :height="225"
  :icon-size="60"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
</script>
<template>
  <Video
    :src="src"
    :poster="poster"
    :width="400"
    :height="225"
    :icon-size="60"
  />
</template>
```

:::

## 自动截取视频指定帧作为封面图

*在未设置封面时，自动截取视频第 `second` 秒指定帧作为封面图*

<br/>

<Video
  :src="src"
  :second="3"
  width="100%"
  height="56.25%"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
</script>
<template>
  <Video
    :src="src"
    :second="3"
    width="100%"
    height="56.25%"
  />
</template>
```

:::

## 自定义视频封面和内容的缩放规则

<Video :src="src" :poster="poster" fit="cover" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
</script>
<template>
  <Video :src="src" :poster="poster" fit="cover" />
</template>
```

:::

## 自动循环播放

*据一般规则，媒体内容将在满足以下至少一个的条件下[自动播放](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide)：*

1. 音频被静音或其音量设置为 `0`
2. 用户和网页已有交互行为（包括点击、触摸、按下某个键等等）
3. 网站已被列入白名单；如果浏览器确定用户经常与媒体互动，这可能会自动发生，也可能通过首选项或其他用户界面功能手动发生
4. 自动播放策略应用到 `<iframe>` 或者其文档上，从而获得了自动播放的权限

否则，播放可能会被阻止。导致播放被阻塞的确切情况以及将网站列入白名单的具体方法因浏览器而异，但最好是遵循以上的原则。

**`autoplay`：由于目前在最新版的 `Chrome` 浏览器（以及所有以 `Chromium` 为内核的浏览器）中，已不再允许自动播放音频和视频。就算你为 `video` 或 `audio` 标签设置了 `autoplay` 属性也一样不能自动播放！**

**解决方法：设置视频 `autoplay` 时，视频必须设置为静音 `muted: true` 即可实现自动播放，然后用户可以使用控制栏开启声音，类似某宝商品自动播放的宣传视频逻辑**

<br/>

<Video
  :src="src"
  :poster="poster"
  autoplay
  loop
  width="100%"
  height="56.25%"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
</script>
<template>
  <Video
    :src="src"
    :poster="poster"
    autoplay
    loop
    width="100%"
    height="56.25%"
  />
</template>
```

:::

## 隐藏播放控件

<Video
  :src="src"
  :poster="poster"
  :controls="false"
  width="100%"
  height="56.25%"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
</script>
<template>
  <Video
    :src="src"
    :poster="poster"
    :controls="false"
    width="100%"
    height="56.25%"
  />
</template>
```

:::

## 隐藏暂停图标

<Video
  :src="src"
  :poster="poster"
  :show-play="false"
  width="100%"
  height="56.25%"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
</script>
<template>
  <Video
    :src="src"
    :poster="poster"
    :show-play="false"
    width="100%"
    height="56.25%"
  />
</template>
```

:::

## 使用 Methods

<Flex vertical>
  <Space>
    <Button type="primary" @click="play">播放</Button>
    <Button @click="pause">暂停</Button>
  </Space>
  <Video ref="video" :src="src" :poster="poster" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
const video = ref()
const play = () => {
  video.value.play()
}
const pause = () => {
  video.value.pause()
}
</script>
<template>
  <Flex vertical>
    <Space>
      <Button type="primary" @click="play">播放</Button>
      <Button @click="pause">暂停</Button>
    </Space>
    <Video ref="video" :src="src" :poster="poster" />
  </Flex>
</template>
```

:::

## APIs

### Video

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
width | 视频播放器宽度，单位 `px` | number | 800
height | 视频播放器高度，单位 `px` | number | 450
src | 视频文件地址，支持网络地址 `https` 和相对地址 | string | undefined
poster | 视频封面地址，支持网络地址 `https` 和相对地址 | string | undefined
second | 在未设置封面时，自动截取视频第 `second` 秒对应帧作为视频封面，单位 `s` | number | 0.5
fit | 视频封面和内容的缩放规则，参考 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) | 'none' &#124; 'fill' &#124; 'contain' &#124; 'cover' | 'contain'
autoplay | 视频就绪后是否马上播放，优先级高于 `preload`，参考 [MDN 自动播放指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide) | boolean | false
controls | 是否向用户显示控件，比如进度条，全屏等 | boolean | true
loop | 视频播放完成后，是否循环播放 | boolean | false
muted |  是否静音 | boolean | false
preload | 是否在页面加载后载入视频，如果设置了 `autoplay` 属性，则 `preload` 将被忽略 | 'auto' &#124; 'metadata' &#124; 'none' | 'metadata'
showPlay | 播放暂停时是否显示播放器中间的暂停图标 | boolean | true
iconSize | 暂停图标尺寸，单位 `px` | number | 80

*`preload` 可选属性：*

- `auto`: 一旦页面加载，则开始加载视频;
- `metadata`: 当页面加载后仅加载视频的元数据（例如长度），建议使用 `metadata`，以便视频自动获取第一帧作为封面 `poster`
- `none`: 页面加载后不应加载视频

*`fit` 可选属性：*

- `none`: 保存原有内容，不进行缩放;
- `fill`: 不保持原有比例，内容拉伸填充整个内容容器;
- `contain`: 保存原有比例，内容以包含方式缩放;
- `cover`: 保存原有比例，内容以覆盖方式缩放

## Events

名称 | 说明 | 类型
-- | -- | --
play | 开始播放的回调 | () => void
pause | 暂停播放的回调 | () => void
