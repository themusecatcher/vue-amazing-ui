<script setup lang="ts">
import { ref } from 'vue'
import type { Button, Tooltip } from 'vue-amazing-ui'
const containerRef = ref<HTMLDivElement>()
const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null)
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
// 受控显示：由 open 驱动
const controlledOpen = ref<boolean>(false)
const destroyOpen = ref(false)
// 锚点模式：锚点元素由使用方持有，传入 anchor 后以其为准（组件作锚点时取其根元素）
const anchorRef = ref<InstanceType<typeof Button> | null>(null)
const gatedAnchorRef = ref<InstanceType<typeof Button> | null>(null)
// 展示前判定：关闭开关时悬停不展示
const gatingAllowed = ref(false)
function gatingDisabled(): boolean {
  return !gatingAllowed.value
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space>
      <Tooltip tooltip="特斯拉" @open-change="openChange">
        <Button type="primary">Tesla</Button>
      </Tooltip>
      <Tooltip tooltip="哥斯拉" @open-change="openChange">
        <Button type="primary">Godzilla</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <p class="mb10">
      气泡卡片用 <code>tooltipClass</code> / <code>tooltipStyle</code>，其外层定位面板用 <code>popupClassName</code> /
      <code>popupStyle</code>，层级用 <code>zIndex</code>
    </p>
    <Space gap="large">
      <Tooltip :max-width="360" bg-color="#fff" tooltip-class="custom-class">
        <template #tooltip>
          <p style="text-align: center">卡片类名</p>
          通过 tooltipClass 定制气泡卡片的字号、颜色与内边距
        </template>
        <Button type="primary">Card Class</Button>
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
          <p style="text-align: center">卡片样式</p>
          通过 tooltipStyle 定制气泡卡片的样式
        </template>
        <Button type="primary">Card Style</Button>
      </Tooltip>
      <Tooltip
        :arrow="false"
        :max-width="360"
        bg-color="#fff"
        :tooltip-style="{ color: 'rgba(0, 0, 0, 0.88)' }"
        popup-class-name="custom-panel-class"
        :popup-style="{ filter: 'drop-shadow(0 6px 14px rgba(255, 105, 0, 0.45))' }"
        :z-index="1200"
      >
        <template #tooltip>
          <p style="text-align: center">定位面板</p>
          橙色虚线是定位面板（popupClassName），投影来自 popupStyle，层级由 zIndex 指定
        </template>
        <Button type="primary">Panel Class / zIndex</Button>
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
      <Tooltip v-for="color in presetColors" :key="color" tooltip="提示文字" :bg-color="color">
        <Button>{{ color }}</Button>
      </Tooltip>
    </Space>
    <Divider orientation="left">Custom</Divider>
    <Space>
      <Tooltip v-for="color in customColors" :key="color" tooltip="提示文字" :bg-color="color">
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
    <h2 class="mt30 mb10">锚点模式</h2>
    <p class="mb10">
      传入 <code>anchor</code> 后不再渲染触发包裹层，触发监听、<code>tabindex</code> /
      <code>aria-describedby</code> 与定位均以传入元素为准； <code>getDisabled</code> 在每次展示前求值，返回
      <code>true</code> 时不展示
    </p>
    <Space vertical align="start">
      <Space align="center">
        <span>基础锚点</span>
        <Button ref="anchorRef">锚点元素（悬停查看提示）</Button>
        <Tooltip :anchor="anchorRef?.$el ?? null" tooltip="Vue Amazing UI" />
      </Space>
      <Space align="center">
        <span>展示前判定</span>
        <Button ref="gatedAnchorRef">受判定拦截的锚点</Button>
        <Switch v-model:value="gatingAllowed" checked="放行" unchecked="拦截" />
        <Tooltip :anchor="gatedAnchorRef?.$el ?? null" :get-disabled="gatingDisabled" tooltip="Vue Amazing UI" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">按键控制</h2>
    <p class="mb10"><code>enter</code> 切换显示；<code>esc</code> 关闭，仅当 <code>trigger: 'click'</code> 时生效</p>
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
    <h2 class="mt30 mb10">受控显示</h2>
    <p class="mb10">使用 <code>open</code> 属性控制浮层的显示与隐藏</p>
    <Space>
      <Tooltip v-model:open="controlledOpen" tooltip="Vue Amazing UI">
        <Button>Controlled: {{ controlledOpen }}</Button>
      </Tooltip>
      <Button type="primary" @click="controlledOpen = !controlledOpen">Toggle Open</Button>
    </Space>
    <h2 class="mt30 mb10">隐藏后卸载</h2>
    <p class="mb10">
      设置 <code>destroyOnHide</code> 后，浮层在离开动画结束时卸载 <code>DOM</code>，再次显示时重新创建并定位；默认
      <code>false</code> 时元素常驻、仅切换显隐。基于 <code>Tooltip</code> 的 <code>Popover</code> /
      <code>Popconfirm</code> 同样支持
    </p>
    <Space>
      <Tooltip tooltip="Vue Amazing UI" destroy-on-hide>
        <Button type="primary">Hover (destroyOnHide)</Button>
      </Tooltip>
      <Tooltip tooltip="Vue Amazing UI">
        <Button>Hover (default)</Button>
      </Tooltip>
      <Tooltip v-model:open="destroyOpen" tooltip="Vue Amazing UI" trigger="click" destroy-on-hide>
        <Button type="primary">Click: {{ destroyOpen }}</Button>
      </Tooltip>
      <Button @click="destroyOpen = !destroyOpen">Toggle Open</Button>
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
/* 定位面板的类名入口：经公开的 popupClassName 下发（关闭箭头后面板与卡片等大，虚线即面板边界） */
.custom-panel-class {
  border-radius: 8px;
  outline: 1px dashed #ff6900;
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
