# 播放器 Video

<br/>

*简易封装的播放器*

## 何时使用

- 当需要在网页内播放视频时

<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Bao.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/bao.jpg')
</script>

## 基本使用

<Video
  :src="src"
  :poster="poster"
  :width="666.67"
  :height="375" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Bao.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/bao.jpg')
</script>
<template>
  <Video
    :src="src"
    :poster="poster"
    :width="666.67"
    :height="375" />
</template>
```

:::

## 自动播放

*据新政策，媒体内容将在满足以下至少一个的条件下自动播放：*
1. 音频被静音或其音量设置为 0
2. 用户和网页已有交互行为（包括点击、触摸、按下某个键等等）
3. 网站已被列入白名单；如果浏览器确定用户经常与媒体互动，这可能会自动发生，也可能通过首选项或其他用户界面功能手动发生
4. 自动播放策略应用到\<iframe>或者其文档上

*autoplay：由于目前在最新版的Chrome浏览器（以及所有以Chromium为内核的浏览器）中，已不再允许自动播放音频和视频。就算你为video或audio标签设置了autoplay属性也一样不能自动播放！*

*解决方法：设置视频 autoplay 时，视频必须设置为静音 muted: true 即可实现自动播放，然后用户可以使用控制栏开启声音，类似某宝商品自动播放的宣传视频逻辑*

<br/>

<Video
  autoplay
  :src="src"
  :poster="poster"
  :width="666.67"
  :height="375" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Bao.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/bao.jpg')
</script>
<template>
  <Video
    autoplay
    :src="src"
    :poster="poster"
    :width="666.67"
    :height="375" />
</template>
```

:::

## 自动截取视频指定帧作为封面图

*在未设置封面时，自动截取视频第 second 秒指定帧作为封面图*

<br/>

<Video
  :src="src"
  :width="666.67"
  :height="375"
  :second="3" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/Bao.mp4')
</script>
<template>
  <Video
    :src="src"
    :width="666.67"
    :height="375"
    :second="3" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
src | 视频文件地址，支持网络地址 `https` 和相对地址 | string | '' | true
poster | 视频封面地址，支持网络地址 `https` 和相对地址 | string | '' | false
second | 在未设置封面时，自动截取视频第 `second` 秒对应帧作为视频封面 | number | 0.5 | false
width | 视频播放器宽度，单位px | number | 800 | false
height | 视频播放器高度，单位px | number | 450 | false
autoplay | 视频就绪后是否马上播放，优先级高于 `preload`，参考 [MDN 自动播放指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide) | boolean | false | false
controls | 是否向用户显示控件，比如进度条，全屏等 | boolean | true | false
loop | 视频播放完成后，是否循环播放 | boolean | false | false
muted |  是否静音 | boolean | false | false
preload | 是否在页面加载后载入视频，如果设置了 `autoplay` 属性，则 `preload` 将被忽略 | 'auto' &#124; 'metadata' &#124; 'none' | 'auto' | false
showPlay | 播放暂停时是否显示播放器中间的暂停图标 | boolean | true | false
fit | `video` 的 `poster` 默认图片和视频内容缩放规则 | 'none' &#124; 'fill' &#124; 'contain' &#124; 'cover' | 'contain' | false

*preload可选属性：*

- `auto`: 一旦页面加载，则开始加载视频;
- `metadata`: 当页面加载后仅加载视频的元数据（例如长度），建议使用- - `metadata`，以便视频自动获取第一帧作为封面 `poster`
- `none`: 页面加载后不应加载视频

*fit可选属性：*

- `none`: 保存原有内容，不进行缩放;
- `fill`: 不保持原有比例，内容拉伸填充整个内容容器;
- `contain`: 保存原有比例，内容以包含方式缩放;
- `cover`: 保存原有比例，内容以覆盖方式缩放
