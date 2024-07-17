<script setup lang="ts">
function onScroll(e: Event) {
  console.log('scroll:', e)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Scrollbar style="max-height: 120px" @scroll="onScroll">
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
    <Scrollbar horizontal>
      <div style="white-space: nowrap; padding: 12px">
        我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐 它们在树底下跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧
        我们在想象中度过了许多年 想象中我们是如此的疯狂 我们在城市里面找猪 想象中已找到了几百万只 小鸟在公园里面唱歌
        它们独自在想象里跳舞 啦啦啦啦啦啦啦啦咧 啦啦啦啦咧 我们在想象中度过了许多年 许多年之后我们又开始想象
        啦啦啦啦啦啦啦啦咧
      </div>
    </Scrollbar>
    <h2 class="mt30 mb10">触发方式</h2>
    <Scrollbar horizontal style="max-height: 120px" trigger="none">
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
    <h2 class="mt30 mb10">自定义内容样式</h2>
    <Scrollbar
      style="max-height: 120px; border-radius: 12px"
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
  </div>
</template>
