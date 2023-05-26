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
  :height="375"
  :play-width="80" />

<details>
<summary>查看代码</summary>

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
    :height="375"
    :play-width="80" />
</template>
```

</details>

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
  :height="375"
  :play-width="80" />

<details>
<summary>查看代码</summary>

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
    :height="375"
    :play-width="80" />
</template>
```

</details>

## 自动截取视频指定帧作为封面图

*在未设置封面时，自动截取视频第second秒指定帧作为封面图*

<br/>

<Video
  :src="src"
  :width="666.67"
  :height="375"
  :play-width="80"
  :second="3" />

<details>
<summary>查看代码</summary>

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
    :play-width="80"
    :second="3" />
</template>
```

</details>

## APIs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
name |  |  |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change |  |
