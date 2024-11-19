# 滚动监测 useScroll

<GlobalElement />

*实时监测指定元素滚动位置及状态的组合式函数*

::: details Show Source Code

```ts
/**
 * 组合式函数
 * 实时监测滚动位置和状态
 *
 * @param throttleDelay 节流延迟时间，单位 ms，默认为 100ms，用于控制滚动事件触发的频率
 * @returns 返回一个对象，其中包含一个名为 scrollDown 的 ref 对象，表示滚动方向是否向下
 */
import { ref } from 'vue'
import { throttle, useEventListener } from 'vue-amazing-ui'
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from '../../../dist/vue-amazing-ui.js'
const scrollRef = ref()
const { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom } = useScroll(scrollRef)
</script>

## 基本使用

<Flex justify="space-between">
  <div class="scroll-container" ref="scrollRef" >
    <div class="scroll-content">
      <div class="inside-content">Scroll Me</div>
    </div>
  </div>
  <Card title="滚动位置及状态" :body-style="{ fontSize: '16px' }">
    <p>水平滚动距离：{{ x }}</p>
    <p>垂直滚动距离：{{ y }}</p>
    <p>水平最大可滚动距离：{{ xScrollMax }}</p>
    <p>垂直最大可滚动距离：{{ yScrollMax }}</p>
    <p>是否正在滚动：{{ isScrolling }}</p>
    <p>是否向左滚动：{{ left }}</p>
    <p>是否向右滚动：{{ right }}</p>
    <p>是否向上滚动：{{ top }}</p>
    <p>是否向下滚动：{{ bottom }}</p>
  </Card>
</Flex>

<style lang="less" scoped>
.scroll-container {
  width: 360px;
  height: 360px;
  border-radius: 12px;
  border: 2px solid #1677ff;
  overflow: scroll;
  .scroll-content {
    position: relative;
    width: 600px;
    height: 600px;
    .inside-content {
      position: absolute;
      top: 33.3%;
      left: 33.3%;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.88);
      font-weight: 500;
      background: #fafafa;
      padding: 6px 8px;
      border-radius: 8px;
    }
  }
}
</style>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from 'vue-amazing-ui'
const { x, xScrollMax, y, yScrollMax, isScrolling, left, right, top, bottom, onScroll, onStop } = useScroll()
function onScroll(e: Event) {
  console.log('scroll', e)
}
function onStop(e: Event) {
  console.log('scrollend', e)
}
</script>
<template>
  <Flex vertical>
    <h3>水平滚动距离：{{ x }}</h3>
    <h3>垂直滚动距离：{{ y }}</h3>
    <h3>水平最大可滚动距离：{{ xScrollMax }}</h3>
    <h3>垂直最大可滚动距离：{{ yScrollMax }}</h3>
    <h3>是否正在滚动：{{ isScrolling }}</h3>
    <h3>是否向左滚动：{{ left }}</h3>
    <h3>是否向右滚动：{{ right }}</h3>
    <h3>是否向上滚动：{{ top }}</h3>
    <h3>是否向下滚动：{{ bottom }}</h3>
  </Flex>
</template>
```

## Params

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
throttleDelay | 节流延迟时间，单位 `ms` | number | 100
