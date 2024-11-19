# 滚动条 Scrollbar

<GlobalElement />

*看起来好看点，但是我能保证这个没有原生滚动条可靠*

<script setup lang="ts">
function onScroll(e: Event) {
  console.log('scroll', e)
}
function onScrollEnd(e: Event) {
  console.log('scrollend', e)
}
</script>

## 基本使用

<Scrollbar style="max-height: 120px" @scroll="onScroll" @scrollend="onScrollEnd">
  我们在田野上面找猪<br />
  想象中已找到了三只<br />
  小鸟在白云上面追逐<br />
  它们在树底下跳舞<br />
  啦啦啦啦啦啦啦啦咧<br />
  啦啦啦啦咧<br />
  我们在想象中度过了许多年<br />
  想象中我们是如此的疯狂<br />
  我们在城市里面找猪<br />
  想象中已找到了几百万只<br />
  小鸟在公园里面唱歌<br />
  它们独自在想象里跳舞<br />
  啦啦啦啦啦啦啦啦咧<br />
  啦啦啦啦咧<br />
  我们在想象中度过了许多年<br />
  许多年之后我们又开始想象<br />
  啦啦啦啦啦啦啦啦咧
</Scrollbar>

::: details Show Code

```vue
<script setup lang="ts">
function onScroll(e: Event) {
  console.log('scroll', e)
}
function onScrollEnd(e: Event) {
  console.log('scrollend', e)
}
</script>
<template>
  <Scrollbar style="max-height: 120px" @scroll="onScroll" @scrollend="onScrollEnd">
    我们在田野上面找猪<br />
    想象中已找到了三只<br />
    小鸟在白云上面追逐<br />
    它们在树底下跳舞<br />
    啦啦啦啦啦啦啦啦咧<br />
    啦啦啦啦咧<br />
    我们在想象中度过了许多年<br />
    想象中我们是如此的疯狂<br />
    我们在城市里面找猪<br />
    想象中已找到了几百万只<br />
    小鸟在公园里面唱歌<br />
    它们独自在想象里跳舞<br />
    啦啦啦啦啦啦啦啦咧<br />
    啦啦啦啦咧<br />
    我们在想象中度过了许多年<br />
    许多年之后我们又开始想象<br />
    啦啦啦啦啦啦啦啦咧
  </Scrollbar>
</template>
```

:::

## 横向滚动

<Scrollbar x-scrollable>
  <div style="white-space: nowrap; padding: 12px">
    我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
    我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
    它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
    啦啦啦啦啦啦啦啦咧
  </div>
</Scrollbar>

::: details Show Code

```vue
<template>
  <Scrollbar x-scrollable>
    <div style="white-space: nowrap; padding: 12px">
      我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
      我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
      它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
      啦啦啦啦啦啦啦啦咧
    </div>
  </Scrollbar>
</template>
```

:::

## 垂直及横向滚动

<Scrollbar style="max-height: 120px" x-scrollable>
  <div style="white-space: nowrap; padding-right: 12px" v-for="n in 9" :key="n">
    我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
    我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
    它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
    啦啦啦啦啦啦啦啦咧
  </div>
  <div style="white-space: nowrap; padding-bottom: 12px">
    我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
    我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
    它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
    啦啦啦啦啦啦啦啦咧
  </div>
</Scrollbar>

::: details Show Code

```vue
<template>
  <Scrollbar style="max-height: 120px" x-scrollable>
    <div style="white-space: nowrap; padding-right: 12px" v-for="n in 9" :key="n">
      我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
      我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
      它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
      啦啦啦啦啦啦啦啦咧
    </div>
    <div style="white-space: nowrap; padding-bottom: 12px">
      我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
      我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
      它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
      啦啦啦啦啦啦啦啦咧
    </div>
  </Scrollbar>
</template>
```

:::

## 触发方式

<Scrollbar style="max-height: 120px" trigger="none">
  我们在田野上面找猪<br />
  想象中已找到了三只<br />
  小鸟在白云上面追逐<br />
  它们在树底下跳舞<br />
  啦啦啦啦啦啦啦啦咧<br />
  啦啦啦啦咧<br />
  我们在想象中度过了许多年<br />
  想象中我们是如此的疯狂<br />
  我们在城市里面找猪<br />
  想象中已找到了几百万只<br />
  小鸟在公园里面唱歌<br />
  它们独自在想象里跳舞<br />
  啦啦啦啦啦啦啦啦咧<br />
  啦啦啦啦咧<br />
  我们在想象中度过了许多年<br />
  许多年之后我们又开始想象<br />
  啦啦啦啦啦啦啦啦咧
</Scrollbar>

::: details Show Code

```vue
<template>
  <Scrollbar style="max-height: 120px" trigger="none">
    我们在田野上面找猪<br />
    想象中已找到了三只<br />
    小鸟在白云上面追逐<br />
    它们在树底下跳舞<br />
    啦啦啦啦啦啦啦啦咧<br />
    啦啦啦啦咧<br />
    我们在想象中度过了许多年<br />
    想象中我们是如此的疯狂<br />
    我们在城市里面找猪<br />
    想象中已找到了几百万只<br />
    小鸟在公园里面唱歌<br />
    它们独自在想象里跳舞<br />
    啦啦啦啦啦啦啦啦咧<br />
    啦啦啦啦咧<br />
    我们在想象中度过了许多年<br />
    许多年之后我们又开始想象<br />
    啦啦啦啦啦啦啦啦咧
  </Scrollbar>
</template>
```

:::

## 鼠标在滚动区域时不自动隐藏

<Scrollbar style="max-height: 120px" :auto-hide="false">
  我们在田野上面找猪<br />
  想象中已找到了三只<br />
  小鸟在白云上面追逐<br />
  它们在树底下跳舞<br />
  啦啦啦啦啦啦啦啦咧<br />
  啦啦啦啦咧<br />
  我们在想象中度过了许多年<br />
  想象中我们是如此的疯狂<br />
  我们在城市里面找猪<br />
  想象中已找到了几百万只<br />
  小鸟在公园里面唱歌<br />
  它们独自在想象里跳舞<br />
  啦啦啦啦啦啦啦啦咧<br />
  啦啦啦啦咧<br />
  我们在想象中度过了许多年<br />
  许多年之后我们又开始想象<br />
  啦啦啦啦啦啦啦啦咧
</Scrollbar>

::: details Show Code

```vue
<template>
  <Scrollbar style="max-height: 120px" :auto-hide="false">
    我们在田野上面找猪<br />
    想象中已找到了三只<br />
    小鸟在白云上面追逐<br />
    它们在树底下跳舞<br />
    啦啦啦啦啦啦啦啦咧<br />
    啦啦啦啦咧<br />
    我们在想象中度过了许多年<br />
    想象中我们是如此的疯狂<br />
    我们在城市里面找猪<br />
    想象中已找到了几百万只<br />
    小鸟在公园里面唱歌<br />
    它们独自在想象里跳舞<br />
    啦啦啦啦啦啦啦啦咧<br />
    啦啦啦啦咧<br />
    我们在想象中度过了许多年<br />
    许多年之后我们又开始想象<br />
    啦啦啦啦啦啦啦啦咧
  </Scrollbar>
</template>
```

:::

## 自定义样式

<Scrollbar
  style="max-height: 120px; border-radius: 12px"
  :size="8"
  :content-style="{ backgroundColor: '#e6f4ff', padding: '16px 24px', fontSize: '16px' }"
>
  我们在田野上面找猪<br />
  想象中已找到了三只<br />
  小鸟在白云上面追逐<br />
  它们在树底下跳舞<br />
  啦啦啦啦啦啦啦啦咧<br />
  啦啦啦啦咧<br />
  我们在想象中度过了许多年<br />
  想象中我们是如此的疯狂<br />
  我们在城市里面找猪<br />
  想象中已找到了几百万只<br />
  小鸟在公园里面唱歌<br />
  它们独自在想象里跳舞<br />
  啦啦啦啦啦啦啦啦咧<br />
  啦啦啦啦咧<br />
  我们在想象中度过了许多年<br />
  许多年之后我们又开始想象<br />
  啦啦啦啦啦啦啦啦咧
</Scrollbar>

::: details Show Code

```vue
<template>
  <Scrollbar
    style="max-height: 120px; border-radius: 12px"
    :size="8"
    :content-style="{ backgroundColor: '#e6f4ff', padding: '16px 24px', fontSize: '16px' }"
  >
    我们在田野上面找猪<br />
    想象中已找到了三只<br />
    小鸟在白云上面追逐<br />
    它们在树底下跳舞<br />
    啦啦啦啦啦啦啦啦咧<br />
    啦啦啦啦咧<br />
    我们在想象中度过了许多年<br />
    想象中我们是如此的疯狂<br />
    我们在城市里面找猪<br />
    想象中已找到了几百万只<br />
    小鸟在公园里面唱歌<br />
    它们独自在想象里跳舞<br />
    啦啦啦啦啦啦啦啦咧<br />
    啦啦啦啦咧<br />
    我们在想象中度过了许多年<br />
    许多年之后我们又开始想象<br />
    啦啦啦啦啦啦啦啦咧
  </Scrollbar>
</template>
```

:::

## 滚动条位置

<Flex vertical>
  <Scrollbar style="max-height: 120px; padding-left: 12px" y-placement="left">
    我们在田野上面找猪<br>
    想象中已找到了三只<br>
    小鸟在白云上面追逐<br>
    它们在树底下跳舞<br>
    啦啦啦啦啦啦啦啦咧<br>
    啦啦啦啦咧<br>
    我们在想象中度过了许多年<br>
    想象中我们是如此的疯狂<br>
    我们在城市里面找猪<br>
    想象中已找到了几百万只<br>
    小鸟在公园里面唱歌<br>
    它们独自在想象里跳舞<br>
    啦啦啦啦啦啦啦啦咧<br>
    啦啦啦啦咧<br>
    我们在想象中度过了许多年<br>
    许多年之后我们又开始想象<br>
    啦啦啦啦啦啦啦啦咧
  </Scrollbar>
  <Scrollbar x-scrollable x-placement="top">
    <div style="white-space: nowrap; padding: 12px">
      我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
      我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
      它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
      啦啦啦啦啦啦啦啦咧
    </div>
  </Scrollbar>
</Flex>

::: details Show Code

```vue
<template>
  <Flex vertical>
    <Scrollbar style="max-height: 120px; padding-left: 12px;" y-placement="left">
      我们在田野上面找猪<br>
      想象中已找到了三只<br>
      小鸟在白云上面追逐<br>
      它们在树底下跳舞<br>
      啦啦啦啦啦啦啦啦咧<br>
      啦啦啦啦咧<br>
      我们在想象中度过了许多年<br>
      想象中我们是如此的疯狂<br>
      我们在城市里面找猪<br>
      想象中已找到了几百万只<br>
      小鸟在公园里面唱歌<br>
      它们独自在想象里跳舞<br>
      啦啦啦啦啦啦啦啦咧<br>
      啦啦啦啦咧<br>
      我们在想象中度过了许多年<br>
      许多年之后我们又开始想象<br>
      啦啦啦啦啦啦啦啦咧
    </Scrollbar>
    <Scrollbar x-scrollable x-placement="top">
      <div style="white-space: nowrap; padding: 12px;">
        我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
        我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
        它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
        啦啦啦啦啦啦啦啦咧
      </div>
    </Scrollbar>
  </Flex>
</template>
```

:::

## APIs

### Scrollbar

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
contentClass | 内容 `div` 的类名 | string | undefined
contentStyle | 内容 `div` 的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
size | 滚动条的大小，单位 `px` | number | 5
trigger | 显示滚动条的时机，`'none'` 表示一直显示 | 'hover' &#124; 'none' | 'hover'
autoHide | 是否自动隐藏滚动条，仅当 `trigger: 'hover'` 时生效；为 `true` 时表示鼠标在滚动区域且不滚动时自动隐藏，滚动时自动显示；为 `false` 时表示鼠标在滚动区域时始终显示，无论是否在滚动 | boolean | true
delay | 滚动条自动隐藏的延迟时间，单位 `ms` | number | 500
xScrollable | 是否使用横向滚动 | boolean | false
xPlacement | 横向滚动时滚动条的位置 | 'top' &#124; 'bottom' | 'bottom'
yPlacement | 纵向滚动时滚动条的位置 | 'left' &#124; 'right' | 'right'

## Methods

名称 | 说明 | 类型
-- | -- | --
scrollTo | 滚动到指定坐标位置 | (options: { left?: number, top?: number, behavior?: [ScrollBehavior](#scrollbehavior-type) })=> void \| (x: number, y: number) => void
scrollBy | 滚动一段特定距离 | (options: { left?: number, top?: number, behavior?: [ScrollBehavior](#scrollbehavior-type) })=> void \| (x: number, y: number) => void
getScrollData | 获取滚动元素数据 | () => { scrollWidth: number\, clientWidth: number }

### ScrollBehavior Type

值 | 说明
-- | --
smooth | 平滑滚动并产生过渡效果
instant | 滚动会直接跳转到目标位置，没有过渡效果
auto | 或缺省值表示浏览器会自动选择滚动时的过渡效果

## Events

名称 | 说明 | 类型
-- | -- | --
scroll | 滚动的回调 | (e: Event) => void
