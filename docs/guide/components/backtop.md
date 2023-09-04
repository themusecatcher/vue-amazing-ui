# 回到顶部 backtop

<br/>

*返回页面顶部的操作按钮*

## 何时使用

- 当页面内容区域比较长时
- 当用户需要频繁返回顶部查看相关内容时。

<script setup lang="ts">
import { ref } from 'vue'
function onShow (show: boolean) {
  console.log('show', show)
}
const scrollContainer = ref()
</script>

## 基本使用

*BackTop 会找到首个可滚动的祖先元素并且监听它的滚动事件*

<BackTop :right="100" @show="onShow" />

::: details Show Code

```vue
<script setup lang="ts">
function onShow (show: boolean) {
  console.log('show', show)
}
</script>
<template>
  <BackTop :right="100" @show="onShow" />
</template>
```

:::

## 自定义可视高度

*自定义滚动时触发显示回到顶部的高度*

<BackTop :bottom="100" :visibility-height="300">
  <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px;">
    可视高度：300px
  </div>
</BackTop>

::: details Show Code

```vue
<template>
  <BackTop :bottom="100" :visibility-height="300">
    <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px;">
      可视高度：300px
    </div>
  </BackTop>
</template>
```

:::

## 自定义位置

<BackTop :right="40" :bottom="160">
  <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px;">
    改变位置
  </div>
</BackTop>

::: details Show Code

```vue
<template>
  <BackTop :right="40" :bottom="160">
    <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px;">
      改变位置
    </div>
  </BackTop>
</template>
```

:::

## 自定义监听目标

*自定义设定监听哪个元素来触发 BackTop*

<BackTop :listen-to="scrollContainer" :bottom="220" :visibility-height="10">
  <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px;">
    指定目标
  </div>
</BackTop>
<div ref="scrollContainer" style="overflow: auto; height: 72px; line-height: 1.5">
  这块应该写一个有意思的笑话。<br>
  这块应该写一个有意思的笑话。<br>
  这块应该写一个有意思的笑话。<br>
  这块应该写一个有意思的笑话。<br>
  这块应该写一个有意思的笑话。<br>
  这块应该写一个有意思的笑话。<br>
  这块应该写一个有意思的笑话。<br>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const scrollContainer = ref()
</script>
<template>
  <BackTop :listen-to="scrollContainer" :bottom="220" :visibility-height="10">
    <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px;">
      指定目标
    </div>
  </BackTop>
  <div ref="scrollContainer" style="overflow: auto; height: 72px; line-height: 1.5">
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
    这块应该写一个有意思的笑话。<br>
  </div>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
bottom | `BackTop` 距离页面底部的高度 | number &#124; string | 40 | false
right | `BackTop` 距离页面右侧的宽度 | number &#124; string | 40 | false
visibilityHeight | 滚动时触发显示回到顶部的高度 | number | 180 | false
to | `BackTop` 渲染的容器节点 可选 元素标签名 例如 `body` 或者 元素本身，下同 | string &#124; HTMLElement | 'body' | false
listenTo | 监听滚动的元素，如果为 `undefined` 会监听距离最近的一个可滚动的祖先节点 | string &#124; HTMLElement | undefined | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
click | 点击按钮的回调函数 | () => void
show | 是否展现的回调函数 | (show: boolean) => void
