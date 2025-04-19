<script setup lang="ts">
function onScroll(e: Event, direction: 'left' | 'right' | 'top' | 'bottom') {
  console.log('scroll', e, direction)
}
function onScrollEnd(e: Event, direction: 'left' | 'right' | 'top' | 'bottom') {
  console.log('scrollend', e, direction)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
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
    <h2 class="mt30 mb10">横向滚动</h2>
    <Scrollbar x-scrollable @scroll="onScroll" @scrollend="onScrollEnd">
      <div style="white-space: nowrap; padding: 12px">
        我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
        我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
        它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
        啦啦啦啦啦啦啦啦咧
      </div>
    </Scrollbar>
    <h2 class="mt30 mb10">垂直及横向滚动</h2>
    <Scrollbar style="max-height: 120px" x-scrollable @scroll="onScroll" @scrollend="onScrollEnd">
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
    <h2 class="mt30 mb10">触发方式</h2>
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
    <h2 class="mt30 mb10">鼠标在滚动区域时不自动隐藏</h2>
    <Scrollbar style="max-height: 120px" :auto-hide="false" :delay="1000">
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
    <h2 class="mt30 mb10">自定义样式</h2>
    <h3 class="mb10">可通过设置 size 属性，自定义相关 --scrollbar 变量进行各种样式自定义</h3>
    <Scrollbar
      style="
        max-height: 120px;
        border-radius: 12px;
        --scrollbar-color: rgba(0, 0, 0, 0.45);
        --scrollbar-color-hover: rgba(0, 0, 0, 0.65);
        --scrollbar-rail-vertical-right: 2px 6px 2px auto;
      "
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
    <h2 class="mt30 mb10">滚动条位置</h2>
    <Flex vertical>
      <Scrollbar style="max-height: 120px; padding-left: 12px" y-placement="left">
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
      <Scrollbar x-scrollable x-placement="top">
        <div style="white-space: nowrap; padding: 12px">
          我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
          我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
          它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
          啦啦啦啦啦啦啦啦咧
        </div>
      </Scrollbar>
    </Flex>
  </div>
</template>
