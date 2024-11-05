<script setup lang="ts">
import { ref } from 'vue'
const tooltip = ref()
function openChange(open: boolean) {
  console.log('open', open)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space>
      <Tooltip :tooltip="Tesla" @open-change="openChange">
        <Button type="primary">特斯拉</Button>
      </Tooltip>
      <Tooltip tooltip="Godzilla" @open-change="openChange">
        <Button type="primary">哥斯拉</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space gap="large">
      <Tooltip :max-width="360" bg-color="#fff" tooltip-class="custom-class">
        <template #tooltip>
          <p style="text-align: center">Batman VS Superman</p>
          电影讲述了超人帮助人类解决了很多问题，成为了人类的神，却引起了莱克斯·卢瑟的嫉妒，从而挑拨蝙蝠侠与超人之间战斗的故事
        </template>
        <Button type="primary">蝙蝠侠大战超人</Button>
      </Tooltip>
      <Tooltip
        :max-width="360"
        bg-color="#fff"
        :tooltip-style="{
          padding: '12px 18px',
          borderRadius: '12px',
          fontSize: '16px',
          color: 'rgba(0, 0, 0, 0.88)'
        }"
      >
        <template #tooltip>
          <h3 style="text-align: center; margin: 0 0 8px">Godzilla VS Kong</h3>
          电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事
        </template>
        <Button type="primary">哥斯拉大战金刚</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">位置</h2>
    <Flex vertical :width="360" align="center" :gap="32">
      <Tooltip tooltip="Vue Amazing UI" placement="bottom">
        <Button type="primary">Bottom</Button>
      </Tooltip>
      <Flex width="100%" justify="space-between">
        <Tooltip tooltip="Vue Amazing UI" placement="right">
          <Button type="primary">Right</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" placement="left">
          <Button type="primary">Left</Button>
        </Tooltip>
      </Flex>
      <Tooltip tooltip="Vue Amazing UI" placement="top">
        <Button type="primary">Top</Button>
      </Tooltip>
    </Flex>
    <h2 class="mt30 mb10">自动调整位置</h2>
    <h3 class="mb10">请滚动或缩放浏览器窗口来查看自适应调整弹出位置的效果</h3>
    <Tooltip tooltip="Vue Amazing UI">
      <Button type="primary">Flip Automatically</Button>
    </Tooltip>
    <h2 class="mt30 mb10">不同的触发方式</h2>
    <Space>
      <Tooltip>
        <template #tooltip>Vue Amazing UI</template>
        <Button type="primary">Hover Me</Button>
      </Tooltip>
      <Tooltip trigger="click">
        <template #tooltip>Vue Amazing UI</template>
        <Button type="primary">Click Me</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">按键控制</h2>
    <h3 class="mb10">enter 显示；esc 关闭，仅当 trigger: 'click' 时生效</h3>
    <Tooltip trigger="click" keyboard>
      <template #tooltip>Vue Amazing UI</template>
      <Button type="primary">Click Me</Button>
    </Tooltip>
    <h2 class="mt30 mb10">自定义过渡动画时间</h2>
    <Tooltip :transition-duration="300">
      <template #tooltip>Vue Amazing UI</template>
      <Button type="primary">Transition Duration 300ms</Button>
    </Tooltip>
    <h2 class="mt30 mb10">延迟显示隐藏</h2>
    <Space>
      <Tooltip
        :show-delay="300"
        :hide-delay="300"
        tooltip="Vue Amazing UI (delay 300ms)"
        :tooltip-style="{ textAlign: 'center' }"
      >
        <Button type="primary">Delay 300ms Tooltip</Button>
      </Tooltip>
      <Tooltip
        :show-delay="500"
        :hide-delay="500"
        tooltip="Vue Amazing UI (delay 500ms)"
        :tooltip-style="{ textAlign: 'center' }"
      >
        <Button type="primary">Delay 500ms Tooltip</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">使用 Methods</h2>
    <Space>
      <Tooltip ref="tooltip" tooltip="Vue Amazing UI">
        <Button type="primary">Methods Tooltip</Button>
      </Tooltip>
      <Button type="primary" @click="tooltip.show()">显示</Button>
      <Button @click="tooltip.hide()">隐藏</Button>
    </Space>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Tooltip :arrow="false" tooltip="Vue Amazing UI">
      <Button type="primary">Hide Arrow</Button>
    </Tooltip>
  </div>
</template>
<style lang="less" scoped>
:deep(.custom-class) {
  font-size: 16px !important;
  color: #0958d9 !important;
  padding: 12px 18px !important;
  border-radius: 12px !important;
  p {
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
