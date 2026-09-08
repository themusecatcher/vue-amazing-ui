<script setup lang="ts">
import { ref } from 'vue'
const containerRef = ref()
const tooltipRef = ref()
const buttonWidth = 70
const presetColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
]
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9']
function openChange(open: boolean) {
  console.log('open', open)
}
function onShow() {
  tooltipRef.value?.show()
}
function onHide() {
  tooltipRef.value?.hide()
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space>
      <Tooltip tooltip="Tesla" @open-change="openChange">
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
          <h3 style="font-weight: bold; text-align: center; margin: 0 0 8px">Godzilla VS Kong</h3>
          电影讲述帝王组织在地心世界找到巨兽起源的线索，与此同时传说中的王者哥斯拉和金刚的对决也将展开的故事
        </template>
        <Button type="primary">哥斯拉大战金刚</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">位置</h2>
    <p class="mb10">位置有 12 个方向</p>
    <div class="placement-demo">
      <div :style="{ marginLeft: `${buttonWidth}px`, whiteSpace: 'nowrap' }">
        <Tooltip tooltip="Vue Amazing UI" placement="topLeft">
          <Button class="place-btn">TL</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" placement="top">
          <Button class="place-btn">Top</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" placement="topRight">
          <Button class="place-btn">TR</Button>
        </Tooltip>
      </div>
      <div :style="{ width: `${buttonWidth}px`, float: 'left' }">
        <Tooltip tooltip="Vue Amazing UI" placement="leftTop">
          <Button class="place-btn">LT</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" placement="left">
          <Button class="place-btn">Left</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" placement="leftBottom">
          <Button class="place-btn">LB</Button>
        </Tooltip>
      </div>
      <div :style="{ width: `${buttonWidth}px`, marginLeft: `${buttonWidth * 4 + 24}px` }">
        <Tooltip tooltip="Vue Amazing UI" placement="rightTop">
          <Button class="place-btn">RT</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" placement="right">
          <Button class="place-btn">Right</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" placement="rightBottom">
          <Button class="place-btn">RB</Button>
        </Tooltip>
      </div>
      <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
        <Tooltip tooltip="Vue Amazing UI" placement="bottomLeft">
          <Button class="place-btn">BL</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" placement="bottom">
          <Button class="place-btn">Bottom</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" placement="bottomRight">
          <Button class="place-btn">BR</Button>
        </Tooltip>
      </div>
    </div>
    <h2 class="mt30 mb10">箭头指向</h2>
    <p class="mb10">设置了 <code>arrowPointAtCenter</code> 后，箭头将指向目标元素的中心</p>
    <Space>
      <Tooltip tooltip="Vue Amazing UI" placement="topLeft">
        <Button type="primary">Align edge / 边缘对齐</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI" placement="topLeft" arrow-point-at-center>
        <Button type="primary">Arrow points to center / 箭头指向中心</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">自动调整位置</h2>
    <p class="mb10">请滚动或缩放浏览器窗口来查看自适应调整弹出位置的效果</p>
    <Tooltip tooltip="Vue Amazing UI">
      <Button type="primary">Flip Automatically</Button>
    </Tooltip>
    <h2 class="mt30 mb10">多彩文字提示</h2>
    <p class="mb10">我们添加了多种预设色彩的文字提示样式，用作不同场景使用</p>
    <Divider orientation="left">Presets</Divider>
    <Space>
      <Tooltip v-for="color in presetColors" :key="color" tooltip="prompt text" :bg-color="color">
        <Button>{{ color }}</Button>
      </Tooltip>
    </Space>
    <Divider orientation="left">Custom</Divider>
    <Space>
      <Tooltip v-for="color in customColors" :key="color" tooltip="prompt text" :bg-color="color">
        <Button>{{ color }}</Button>
      </Tooltip>
    </Space>
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
      <Tooltip trigger="focus">
        <template #tooltip>Vue Amazing UI</template>
        <Button type="primary">Focus Me</Button>
      </Tooltip>
      <Tooltip trigger="contextmenu">
        <template #tooltip>Vue Amazing UI</template>
        <Button type="primary">Right Click Me</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">设置 <code>disabled</code> 后不再响应任何触发</p>
    <Tooltip tooltip="Vue Amazing UI" disabled>
      <Button type="primary">Disabled Tooltip</Button>
    </Tooltip>
    <h2 class="mt30 mb10">按键控制</h2>
    <p class="mb10"><code>enter</code> 显示；<code>esc</code> 关闭，仅当 <code>trigger: 'click'</code> 时生效</p>
    <Tooltip trigger="click" keyboard>
      <template #tooltip>Vue Amazing UI</template>
      <Button type="primary">Click Me</Button>
    </Tooltip>
    <h2 class="mt30 mb10">自定义弹出框挂载容器</h2>
    <div
      ref="containerRef"
      style="display: inline-block; padding: 64px 32px; border-radius: 8px; border: 1px solid #f0f0f0"
    >
      <Space>
        <Tooltip tooltip="Vue Amazing UI" :to="false">
          <Button type="primary">Stay in place</Button>
        </Tooltip>
        <Tooltip tooltip="Vue Amazing UI" :to="containerRef">
          <Button type="primary">Mounted to Container</Button>
        </Tooltip>
      </Space>
    </div>
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
      <Tooltip ref="tooltipRef" tooltip="Vue Amazing UI">
        <Button type="primary">Methods Tooltip</Button>
      </Tooltip>
      <Button type="primary" @click="onShow">显示</Button>
      <Button @click="onHide">隐藏</Button>
    </Space>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Tooltip :arrow="false" tooltip="Vue Amazing UI">
      <Button type="primary">Hide Arrow</Button>
    </Tooltip>
  </div>
</template>
<style lang="less">
.custom-class {
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
.placement-demo {
  .place-btn {
    width: 70px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
  }
}
</style>
