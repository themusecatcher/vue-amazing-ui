<script setup lang="ts">
function expandChange(open: boolean) {
  console.log('open', open)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Ellipsis :max-width="240">住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪</Ellipsis>
    <h2 class="mt30 mb10">多行省略</h2>
    <Ellipsis :line="2">
      电灯熄灭 物换星移 泥牛入海
      <br />
      黑暗好像 一颗巨石 按在胸口
      <br />
      独脚大盗 百万富翁 摸爬滚打
      <br />
      黑暗好像 一颗巨石 按在胸口
    </Ellipsis>
    <h2 class="mt30 mb10">点击展开</h2>
    <Ellipsis expand :line="2" @expandChange="expandChange">
      电灯熄灭 物换星移 泥牛入海
      <br />
      黑暗好像 一颗巨石 按在胸口
      <br />
      独脚大盗 百万富翁 摸爬滚打
      <br />
      黑暗好像 一颗巨石 按在胸口
    </Ellipsis>
    <h2 class="mt30 mb10">定制 Tooltip 内容</h2>
    <Ellipsis :max-width="240">
      住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
      <template #tooltip>
        <div style="text-align: center">
          《秦皇岛》
          <br />
          住在我心里孤独的
          <br />
          孤独的海怪 痛苦之王
          <br />
          开始厌倦 深海的光 停滞的海浪
        </div>
      </template>
    </Ellipsis>
    <h2 class="mt30 mb10">自定义 Tooltip 样式</h2>
    <Ellipsis
      :max-width="240"
      bg-color="#4096ff"
      :tooltip-style="{
        padding: '12px 16px',
        borderRadius: '12px',
        fontSize: '16px',
        backgroundColor: '#4096ff'
      }"
    >
      住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
    <h2 class="mt30 mb10">自定义过渡动画时间</h2>
    <Ellipsis :max-width="240" :transition-duration="300">
      住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
    <h2 class="mt30 mb10">不同的触发方式</h2>
    <Space>
      <Ellipsis :max-width="240"> Hover Me 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪 </Ellipsis>
      <Ellipsis :max-width="240" trigger="click">
        Click Me 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
      </Ellipsis>
    </Space>
    <h2 class="mt30 mb10">延迟显示隐藏</h2>
    <Space>
      <Ellipsis :max-width="240" :show-delay="300" :hide-delay="300">
        Delay 300ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
      </Ellipsis>
      <Ellipsis :max-width="240" :show-delay="500" :hide-delay="500">
        Delay 500ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
      </Ellipsis>
    </Space>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Ellipsis :max-width="240" :arrow="false">
      Hide Arrow 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
  </div>
</template>
