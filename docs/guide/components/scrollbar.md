# 滚动条 Scrollbar

<GlobalElement />

_看起来好看点，但是我能保证这个没有原生滚动条可靠_

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ScrollbarExpose, ScrollbarScrollData, ScrollDirection } from 'vue-amazing-ui'
// 滚动事件用例：方向与派发次数直接打在页面上，不依赖控制台
const scrollEventRef = ref<ScrollbarExpose | null>(null)
// scroll 与 scrollend 各用一个变量：共用一个会被后到的事件覆盖，看不出两者方向是否一致
const lastScrollDirection = ref<ScrollDirection | ''>('')
const lastScrollEndDirection = ref<ScrollDirection | ''>('')
const scrollCount = ref(0)
const scrollEndCount = ref(0)
function onDirectionScroll(_e: Event, direction: ScrollDirection) {
  lastScrollDirection.value = direction
  scrollCount.value++
}
function onDirectionScrollEnd(_e: Event, direction: ScrollDirection) {
  lastScrollEndDirection.value = direction
  scrollEndCount.value++
}
// 实例方法用例：getScrollData 读取的是调用瞬间的实时值，每次滚动同步刷新
const scrollMethodRef = ref<ScrollbarExpose | null>(null)
const scrollData = ref<ScrollbarScrollData | null>(null)
function readScrollData() {
  scrollData.value = scrollMethodRef.value?.getScrollData() ?? null
  console.log('scrollData', scrollData.value)
}
// KeepAlive 用例：在两个组件实例之间切换，演示切回后滚动位置恢复
const keepAliveVisible = ref(true)
const keepAliveRef = ref<ScrollbarExpose | null>(null)
onMounted(() => {
  // 首屏读一次滚动数据，之后由 scroll 事件实时刷新
  readScrollData()
  // 预置滚动位置：切走再切回即可看出恢复效果，无需用户先手动滚动
  keepAliveRef.value?.scrollTo({ top: 40 })
})
</script>

## 基本使用

<Scrollbar style="max-height: 120px"> 我们在田野上面找猪<br/> 想象中已找到了三只<br/> 小鸟在白云上面追逐<br/> 它们在树底下跳舞<br/> 啦啦啦啦啦啦啦啦咧<br/> 啦啦啦啦咧<br/> 我们在想象中度过了许多年<br/> 想象中我们是如此的疯狂<br/> 我们在城市里面找猪<br/> 想象中已找到了几百万只<br/> 小鸟在公园里面唱歌<br/> 它们独自在想象里跳舞<br/> 啦啦啦啦啦啦啦啦咧<br/> 啦啦啦啦咧<br/> 我们在想象中度过了许多年<br/> 许多年之后我们又开始想象<br/> 啦啦啦啦啦啦啦啦咧 </Scrollbar>

::: details Show Code

```vue
<template>
  <Scrollbar style="max-height: 120px">
    我们在田野上面找猪<br/>
    想象中已找到了三只<br/>
    小鸟在白云上面追逐<br/>
    它们在树底下跳舞<br/>
    啦啦啦啦啦啦啦啦咧<br/>
    啦啦啦啦咧<br/>
    我们在想象中度过了许多年<br/>
    想象中我们是如此的疯狂<br/>
    我们在城市里面找猪<br/>
    想象中已找到了几百万只<br/>
    小鸟在公园里面唱歌<br/>
    它们独自在想象里跳舞<br/>
    啦啦啦啦啦啦啦啦咧<br/>
    啦啦啦啦咧<br/>
    我们在想象中度过了许多年<br/>
    许多年之后我们又开始想象<br/>
    啦啦啦啦啦啦啦啦咧
  </Scrollbar>
</template>
```

:::

## 滚动事件与方向

_`scroll` 在滚动中派发、`scrollend` 在某一方向停止滚动后（约 `100ms` 无滚动）派发，两者都带方向参数；方向按本次位移判定，因此拖动 `thumb`、`scrollTo` / `scrollBy`、直接写入滚动位置同样会派发，横向与纵向同帧变化时各派发一次；`scrollend` 的派发与 `autoHide` / `trigger` 无关_

<br/>

<Flex vertical>
  <Space>
    <Button @click="scrollEventRef?.scrollTo({ top: 9999, behavior: 'smooth' })">滚到底部</Button>
    <Button @click="scrollEventRef?.scrollBy(0, -120)">上移 120</Button>
  </Space>
  <Space>
    <Tag>scroll 方向：{{ lastScrollDirection || '-' }}</Tag>
    <Tag>scrollend 方向：{{ lastScrollEndDirection || '-' }}</Tag>
    <Tag>scroll：{{ scrollCount }}</Tag>
    <Tag>scrollend：{{ scrollEndCount }}</Tag>
  </Space>
  <Scrollbar ref="scrollEventRef" style="height: 120px; border: 1px solid var(--va-border-color); border-radius: 8px" :content-style="{ padding: '8px 12px' }" @scroll="onDirectionScroll" @scrollend="onDirectionScrollEnd">
    <template v-for="n in 2" :key="n">
      我们在田野上面找猪，想象中已找到了三只；小鸟在白云上面追逐，它们在树底下跳舞。<br/>
      啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。我们在想象中度过了许多年，想象中我们是如此的疯狂。<br/>
      我们在城市里面找猪，想象中已找到了几百万只；小鸟在公园里面唱歌，它们独自在想象里跳舞。<br/>
      啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。许多年之后我们又开始想象，啦啦啦啦啦啦啦啦咧。
    </template>
  </Scrollbar>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { ScrollbarExpose, ScrollDirection } from 'vue-amazing-ui'
const scrollEventRef = ref<ScrollbarExpose | null>(null)
// scroll 与 scrollend 各用一个变量，避免后到的事件覆盖前一个方向
const lastScrollDirection = ref<ScrollDirection | ''>('')
const lastScrollEndDirection = ref<ScrollDirection | ''>('')
const scrollCount = ref(0)
const scrollEndCount = ref(0)
function onDirectionScroll(_e: Event, direction: ScrollDirection) {
  lastScrollDirection.value = direction
  scrollCount.value++
}
function onDirectionScrollEnd(_e: Event, direction: ScrollDirection) {
  lastScrollEndDirection.value = direction
  scrollEndCount.value++
}
</script>
<template>
  <Flex vertical>
    <Space>
      <Button @click="scrollEventRef?.scrollTo({ top: 9999, behavior: 'smooth' })">滚到底部</Button>
      <Button @click="scrollEventRef?.scrollBy(0, -120)">上移 120</Button>
    </Space>
    <Space>
      <Tag>scroll 方向：{{ lastScrollDirection || '-' }}</Tag>
      <Tag>scrollend 方向：{{ lastScrollEndDirection || '-' }}</Tag>
      <Tag>scroll：{{ scrollCount }}</Tag>
      <Tag>scrollend：{{ scrollEndCount }}</Tag>
    </Space>
    <Scrollbar ref="scrollEventRef" style="height: 120px; border: 1px solid var(--va-border-color); border-radius: 8px" :content-style="{ padding: '8px 12px' }" @scroll="onDirectionScroll" @scrollend="onDirectionScrollEnd">
      <template v-for="n in 2" :key="n">
        我们在田野上面找猪，想象中已找到了三只；小鸟在白云上面追逐，它们在树底下跳舞。<br/>
        啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。我们在想象中度过了许多年，想象中我们是如此的疯狂。<br/>
        我们在城市里面找猪，想象中已找到了几百万只；小鸟在公园里面唱歌，它们独自在想象里跳舞。<br/>
        啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。许多年之后我们又开始想象，啦啦啦啦啦啦啦啦咧。
      </template>
    </Scrollbar>
  </Flex>
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
  我们在田野上面找猪<br/>
  想象中已找到了三只<br/>
  小鸟在白云上面追逐<br/>
  它们在树底下跳舞<br/>
  啦啦啦啦啦啦啦啦咧<br/>
  啦啦啦啦咧<br/>
  我们在想象中度过了许多年<br/>
  想象中我们是如此的疯狂<br/>
  我们在城市里面找猪<br/>
  想象中已找到了几百万只<br/>
  小鸟在公园里面唱歌<br/>
  它们独自在想象里跳舞<br/>
  啦啦啦啦啦啦啦啦咧<br/>
  啦啦啦啦咧<br/>
  我们在想象中度过了许多年<br/>
  许多年之后我们又开始想象<br/>
  啦啦啦啦啦啦啦啦咧
</Scrollbar>

::: details Show Code

```vue
<template>
  <Scrollbar style="max-height: 120px" trigger="none">
    我们在田野上面找猪<br/>
    想象中已找到了三只<br/>
    小鸟在白云上面追逐<br/>
    它们在树底下跳舞<br/>
    啦啦啦啦啦啦啦啦咧<br/>
    啦啦啦啦咧<br/>
    我们在想象中度过了许多年<br/>
    想象中我们是如此的疯狂<br/>
    我们在城市里面找猪<br/>
    想象中已找到了几百万只<br/>
    小鸟在公园里面唱歌<br/>
    它们独自在想象里跳舞<br/>
    啦啦啦啦啦啦啦啦咧<br/>
    啦啦啦啦咧<br/>
    我们在想象中度过了许多年<br/>
    许多年之后我们又开始想象<br/>
    啦啦啦啦啦啦啦啦咧
  </Scrollbar>
</template>
```

:::

## 鼠标在滚动区域时不自动隐藏

<Scrollbar style="max-height: 120px" :auto-hide="false">
  我们在田野上面找猪<br/>
  想象中已找到了三只<br/>
  小鸟在白云上面追逐<br/>
  它们在树底下跳舞<br/>
  啦啦啦啦啦啦啦啦咧<br/>
  啦啦啦啦咧<br/>
  我们在想象中度过了许多年<br/>
  想象中我们是如此的疯狂<br/>
  我们在城市里面找猪<br/>
  想象中已找到了几百万只<br/>
  小鸟在公园里面唱歌<br/>
  它们独自在想象里跳舞<br/>
  啦啦啦啦啦啦啦啦咧<br/>
  啦啦啦啦咧<br/>
  我们在想象中度过了许多年<br/>
  许多年之后我们又开始想象<br/>
  啦啦啦啦啦啦啦啦咧
</Scrollbar>

::: details Show Code

```vue
<template>
  <Scrollbar style="max-height: 120px" :auto-hide="false">
    我们在田野上面找猪<br/>
    想象中已找到了三只<br/>
    小鸟在白云上面追逐<br/>
    它们在树底下跳舞<br/>
    啦啦啦啦啦啦啦啦咧<br/>
    啦啦啦啦咧<br/>
    我们在想象中度过了许多年<br/>
    想象中我们是如此的疯狂<br/>
    我们在城市里面找猪<br/>
    想象中已找到了几百万只<br/>
    小鸟在公园里面唱歌<br/>
    它们独自在想象里跳舞<br/>
    啦啦啦啦啦啦啦啦咧<br/>
    啦啦啦啦咧<br/>
    我们在想象中度过了许多年<br/>
    许多年之后我们又开始想象<br/>
    啦啦啦啦啦啦啦啦咧
  </Scrollbar>
</template>
```

:::

## 自定义样式

_可通过设置 `size` 属性，并用 `--va-scrollbar-*` 令牌（滑块颜色）与 `--scrollbar-*` 变量（轨道偏移）自定义样式_

<br/>

<Scrollbar
  style="
    max-height: 120px;
    border-radius: 12px;
    --va-scrollbar-color: var(--va-text-color-3);
    --va-scrollbar-color-hover: var(--va-text-color-2);
    --scrollbar-rail-vertical-right: 2px 6px 2px auto;
  "
  :size="8"
  :content-style="{ backgroundColor: 'var(--va-primary-bg-color)', padding: '16px 24px', fontSize: '16px', borderRadius: '12px' }"
>
  我们在田野上面找猪<br/>
  想象中已找到了三只<br/>
  小鸟在白云上面追逐<br/>
  它们在树底下跳舞<br/>
  啦啦啦啦啦啦啦啦咧<br/>
  啦啦啦啦咧<br/>
  我们在想象中度过了许多年<br/>
  想象中我们是如此的疯狂<br/>
  我们在城市里面找猪<br/>
  想象中已找到了几百万只<br/>
  小鸟在公园里面唱歌<br/>
  它们独自在想象里跳舞<br/>
  啦啦啦啦啦啦啦啦咧<br/>
  啦啦啦啦咧<br/>
  我们在想象中度过了许多年<br/>
  许多年之后我们又开始想象<br/>
  啦啦啦啦啦啦啦啦咧
</Scrollbar>

::: details Show Code

```vue
<template>
  <Scrollbar
    style="
      max-height: 120px;
      border-radius: 12px;
      --va-scrollbar-color: var(--va-text-color-3);
      --va-scrollbar-color-hover: var(--va-text-color-2);
      --scrollbar-rail-vertical-right: 2px 6px 2px auto;
    "
    :size="8"
    :content-style="{ backgroundColor: 'var(--va-primary-bg-color)', padding: '16px 24px', fontSize: '16px', borderRadius: '12px' }"
  >
    我们在田野上面找猪<br/>
    想象中已找到了三只<br/>
    小鸟在白云上面追逐<br/>
    它们在树底下跳舞<br/>
    啦啦啦啦啦啦啦啦咧<br/>
    啦啦啦啦咧<br/>
    我们在想象中度过了许多年<br/>
    想象中我们是如此的疯狂<br/>
    我们在城市里面找猪<br/>
    想象中已找到了几百万只<br/>
    小鸟在公园里面唱歌<br/>
    它们独自在想象里跳舞<br/>
    啦啦啦啦啦啦啦啦咧<br/>
    啦啦啦啦咧<br/>
    我们在想象中度过了许多年<br/>
    许多年之后我们又开始想象<br/>
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
      我们在田野上面找猪<br/>
      想象中已找到了三只<br/>
      小鸟在白云上面追逐<br/>
      它们在树底下跳舞<br/>
      啦啦啦啦啦啦啦啦咧<br/>
      啦啦啦啦咧<br/>
      我们在想象中度过了许多年<br/>
      想象中我们是如此的疯狂<br/>
      我们在城市里面找猪<br/>
      想象中已找到了几百万只<br/>
      小鸟在公园里面唱歌<br/>
      它们独自在想象里跳舞<br/>
      啦啦啦啦啦啦啦啦咧<br/>
      啦啦啦啦咧<br/>
      我们在想象中度过了许多年<br/>
      许多年之后我们又开始想象<br/>
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

## 实例方法

_通过模板 `ref` 调用 `scrollTo` / `scrollBy` / `getScrollData`：`options` 形式可传 `behavior: 'smooth'` 产生过渡；`(left, top)` 双参形式与原生一致、不接受 `behavior`（立即到位）；`getScrollData()` 在调用瞬间读取容器的真实几何值，未挂载时各项为 `0`，下方数值随滚动实时刷新_

<br/>

<Flex vertical>
  <Space>
    <Button @click="scrollMethodRef?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })">平滑回到起点</Button>
    <Button @click="scrollMethodRef?.scrollTo({ left: 9999, behavior: 'smooth' })">平滑滚到最右</Button>
    <Button @click="scrollMethodRef?.scrollBy(120, 0)">瞬移右移 120</Button>
    <Button @click="readScrollData">读取滚动数据</Button>
  </Space>
  <Space v-if="scrollData">
    <Tag>top：{{ scrollData.scrollTop }}</Tag>
    <Tag>left：{{ scrollData.scrollLeft }}</Tag>
    <Tag>内容：{{ scrollData.scrollWidth }} × {{ scrollData.scrollHeight }}</Tag>
    <Tag>可视：{{ scrollData.clientWidth }} × {{ scrollData.clientHeight }}</Tag>
  </Space>
  <Scrollbar ref="scrollMethodRef" x-scrollable style="max-height: 120px; border: 1px solid var(--va-border-color); border-radius: 8px" :content-style="{ padding: '8px 12px' }" @scroll="readScrollData">
    <div v-for="n in 3" :key="n" style="white-space: nowrap">
      我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
      我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
      它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
      啦啦啦啦啦啦啦啦咧
    </div>
  </Scrollbar>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ScrollbarExpose, ScrollbarScrollData } from 'vue-amazing-ui'
const scrollMethodRef = ref<ScrollbarExpose | null>(null)
const scrollData = ref<ScrollbarScrollData | null>(null)
function readScrollData() {
  scrollData.value = scrollMethodRef.value?.getScrollData() ?? null
  console.log('scrollData', scrollData.value)
}
onMounted(() => {
  // 首屏读一次，之后由 scroll 事件实时刷新
  readScrollData()
})
</script>
<template>
  <Flex vertical>
    <Space>
      <Button @click="scrollMethodRef?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })">平滑回到起点</Button>
      <Button @click="scrollMethodRef?.scrollTo({ left: 9999, behavior: 'smooth' })">平滑滚到最右</Button>
      <Button @click="scrollMethodRef?.scrollBy(120, 0)">瞬移右移 120</Button>
      <Button @click="readScrollData">读取滚动数据</Button>
    </Space>
    <Space v-if="scrollData">
      <Tag>top：{{ scrollData.scrollTop }}</Tag>
      <Tag>left：{{ scrollData.scrollLeft }}</Tag>
      <Tag>内容：{{ scrollData.scrollWidth }} × {{ scrollData.scrollHeight }}</Tag>
      <Tag>可视：{{ scrollData.clientWidth }} × {{ scrollData.clientHeight }}</Tag>
    </Space>
    <Scrollbar ref="scrollMethodRef" x-scrollable style="max-height: 120px; border: 1px solid var(--va-border-color); border-radius: 8px" :content-style="{ padding: '8px 12px' }" @scroll="readScrollData">
      <div v-for="n in 3" :key="n" style="white-space: nowrap">
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

## KeepAlive 保持滚动位置

_被 `KeepAlive` 缓存后，切走再切回会恢复失活前的滚动位置：失活期间 `DOM` 被移出文档，浏览器会把 `scrollTop` 归零，组件按失活前记录的位置写回；下方已预置滚动位置，直接点 `切走` 再点 `显示滚动区` 即可看到恢复效果_

<br/>

<Flex vertical>
  <Space>
    <Button :type="keepAliveVisible ? 'primary' : 'default'" @click="keepAliveVisible = true">显示滚动区</Button>
    <Button :type="keepAliveVisible ? 'default' : 'primary'" @click="keepAliveVisible = false">切走</Button>
  </Space>
  <KeepAlive>
    <Scrollbar v-if="keepAliveVisible" ref="keepAliveRef" key="keep-alive-scrollbar" style="height: 120px; border: 1px solid var(--va-border-color); border-radius: 8px" :content-style="{ padding: '8px 12px' }">
      <template v-for="n in 2" :key="n">
        我们在田野上面找猪，想象中已找到了三只；小鸟在白云上面追逐，它们在树底下跳舞。<br/>
        啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。我们在想象中度过了许多年，想象中我们是如此的疯狂。<br/>
        我们在城市里面找猪，想象中已找到了几百万只；小鸟在公园里面唱歌，它们独自在想象里跳舞。<br/>
        啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。许多年之后我们又开始想象，啦啦啦啦啦啦啦啦咧。
      </template>
    </Scrollbar>
    <Empty v-else key="keep-alive-empty" style="height: 120px" description="点「显示滚动区」查看滚动位置恢复" />
  </KeepAlive>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ScrollbarExpose } from 'vue-amazing-ui'
const keepAliveVisible = ref(true)
const keepAliveRef = ref<ScrollbarExpose | null>(null)
onMounted(() => {
  // 预置滚动位置，切走再切回即可看出恢复效果
  keepAliveRef.value?.scrollTo({ top: 40 })
})
</script>
<template>
  <Flex vertical>
    <Space>
      <Button :type="keepAliveVisible ? 'primary' : 'default'" @click="keepAliveVisible = true">显示滚动区</Button>
      <Button :type="keepAliveVisible ? 'default' : 'primary'" @click="keepAliveVisible = false">切走</Button>
    </Space>
    <KeepAlive>
      <Scrollbar v-if="keepAliveVisible" ref="keepAliveRef" key="keep-alive-scrollbar" style="height: 120px; border: 1px solid var(--va-border-color); border-radius: 8px" :content-style="{ padding: '8px 12px' }">
        <template v-for="n in 2" :key="n">
          我们在田野上面找猪，想象中已找到了三只；小鸟在白云上面追逐，它们在树底下跳舞。<br/>
          啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。我们在想象中度过了许多年，想象中我们是如此的疯狂。<br/>
          我们在城市里面找猪，想象中已找到了几百万只；小鸟在公园里面唱歌，它们独自在想象里跳舞。<br/>
          啦啦啦啦啦啦啦啦咧，啦啦啦啦咧。许多年之后我们又开始想象，啦啦啦啦啦啦啦啦咧。
        </template>
      </Scrollbar>
      <Empty v-else key="keep-alive-empty" style="height: 120px" description="点「显示滚动区」查看滚动位置恢复" />
    </KeepAlive>
  </Flex>
</template>
```

:::

## APIs

### Scrollbar Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| contentClass | 内容 `div` 的类名 | string | undefined |
| contentStyle | 内容 `div` 的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| size | 滚动条的大小，单位 `px` | number | 5 |
| trigger | 显示滚动条的时机，`'none'` 表示一直显示 | 'hover' &#124; 'none' | 'hover' |
| autoHide | 是否自动隐藏滚动条，仅当 `trigger: 'hover'` 时生效；为 `true` 时表示鼠标在滚动区域且不滚动时自动隐藏，滚动时自动显示；为 `false` 时表示鼠标在滚动区域时始终显示，无论是否在滚动 | boolean | false |
| delay | 滚动条自动隐藏的延迟时间，单位 `ms` | number | 0 |
| xScrollable | 是否使用横向滚动 | boolean | false |
| yScrollable | 是否使用纵向滚动 | boolean | true |
| xPlacement | 横向滚动时滚动条的位置 | 'top' &#124; 'bottom' | 'bottom' |
| yPlacement | 纵向滚动时滚动条的位置 | 'left' &#124; 'right' | 'right' |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| default | 自定义内容 | v-slot:default |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| scroll | 滚动中派发；拖动 `thumb`、`scrollTo` / `scrollBy`、直接写入滚动位置等程序化滚动同样派发，横向与纵向同帧变化时各派发一次 | (e: Event, direction: 'left' \| 'right' \| 'top' \| 'bottom') => void |
| scrollend | 某一方向滚动结束后派发（约 `100ms` 无滚动），与 `autoHide` / `trigger` 无关 | (e: Event, direction: 'left' \| 'right' \| 'top' \| 'bottom') => void |

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| scrollTo | 滚动到指定坐标位置 | (options: { left?: number, top?: number, behavior?: [ScrollBehavior](#scrollbehavior-type) })=> void \| (x: number, y: number) => void |
| scrollBy | 滚动一段特定距离 | (options: { left?: number, top?: number, behavior?: [ScrollBehavior](#scrollbehavior-type) })=> void \| (x: number, y: number) => void |
| getScrollData | 实时读取滚动容器的滚动位置与尺寸（未挂载时均为 `0`） | () => [ScrollbarScrollData](#scrollbarscrolldata-type) |
| scrollElement | 内部滚动容器元素，可用于指定需要监听滚动的容器（如 `BackTop` 的 `listenTo`）等场景 | HTMLElement \| null |

### ScrollBehavior Type

<br/>

_`smooth` 平滑滚动并产生过渡效果；`instant` 滚动会直接跳转到目标位置，没有过渡效果；`auto` 或缺省值表示浏览器会自动选择滚动时的过渡效果_

| 名称 | 值 |
| :-- | :-- |
| ScrollBehavior | 'smooth' &#124; 'instant' &#124; 'auto' |

### ScrollbarScrollData Type

<br/>

_`getScrollData()` 的返回值，均为调用瞬间读取到的真实值_

| 名称 | 说明 |
| :-- | :-- |
| scrollTop | 垂直滚动距离 |
| scrollLeft | 水平滚动距离 |
| scrollWidth | 内容总宽度 |
| scrollHeight | 内容总高度 |
| clientWidth | 可视宽度（不含边框） |
| clientHeight | 可视高度（不含边框） |
