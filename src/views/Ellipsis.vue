<template>
  <div>
    <h1>Ellipsis 文本省略</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Ellipsis :maxWidth="240">
      住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
    <h2 class="mt30 mb10">多行省略</h2>
    <Ellipsis :line="2">
      电灯熄灭 物换星移 泥牛入海<br>黑暗好像 一颗巨石 按在胸口<br>独脚大盗
      百万富翁 摸爬滚打<br>黑暗好像 一颗巨石 按在胸口
    </Ellipsis>
    <h2 class="mt30 mb10">点击展开</h2>
    <Ellipsis expand :line="2">
      电灯熄灭 物换星移 泥牛入海<br>黑暗好像 一颗巨石 按在胸口<br>独脚大盗
      百万富翁 摸爬滚打<br>黑暗好像 一颗巨石 按在胸口
    </Ellipsis>
    <h2 class="mt30 mb10">定制 Tooltip 内容</h2>
    <Ellipsis :max-width="240">
      住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
      <template #tooltip>
        <div style="text-align: center">
          《秦皇岛》<br>住在我心里孤独的<br>孤独的海怪 痛苦之王<br>开始厌倦
          深海的光 停滞的海浪
        </div>
      </template>
    </Ellipsis>
  </div>
</template>
