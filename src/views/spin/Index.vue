<script setup lang="ts">
import { h, ref } from 'vue'
import type { SpinProps } from 'vue-amazing-ui'
import { LoadingOutlined } from '@ant-design/icons-vue'
const spinning = ref(true)
// 自定义指示符的两条属性路径：已构造的 VNode 与返回 VNode 的渲染函数（第三条路径为 #indicator 插槽）
// 颜色取主题语义变量：三种路径仍是三种可区分的颜色，但两种明暗模式都跟随色板，
// 硬编码浅色蓝（#1677ff）在暗色页面上几乎不可见
function renderCustomIndicator(color: string) {
  return h(LoadingOutlined, { spin: true, style: `font-size: 24px; color: ${color}` })
}
const customIndicatorVNode = renderCustomIndicator('var(--va-primary-color)')
const customIndicatorFn = () => renderCustomIndicator('var(--va-success-color)')
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const tipSize = ref<SpinProps['size']>('middle') // 「自定义描述文案」用例的尺寸
const colorSize = ref<SpinProps['size']>('middle') // 「自定义样式」用例的尺寸
// delay 演示：手动切换状态，观察「切换过快时不出现加载效果」
const delaySpinning = ref(false)
const delay = ref(500)
// 「动画速度、环宽与配色」用例：参数与加载状态独立，便于逐个参数核对
const rotateSpinning = ref(true)
const speed = ref(800)
const circleWidth = ref(13)
const color = ref('#1677ff')
const ringColor = ref('#4096ff')
const rotate = ref(false)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Flex align="center"> Loading state:<Switch v-model:value="spinning" /> </Flex>
    <br />
    <Spin style="width: 100%" :spinning="spinning">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">八点轮</h2>
    <p class="mb10"><code>indicator</code> 取值 <code>dot-wheel</code></p>
    <Spin style="width: 100%" :spinning="spinning" indicator="dot-wheel">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">八线轮</h2>
    <p class="mb10"><code>indicator</code> 取值 <code>line-wheel</code></p>
    <Spin style="width: 100%" :spinning="spinning" indicator="line-wheel">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">圆环</h2>
    <p class="mb10"><code>indicator</code> 取值 <code>ring-circle</code></p>
    <Spin style="width: 100%" :spinning="spinning" indicator="ring-circle">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">圆环轨道</h2>
    <p class="mb10"><code>indicator</code> 取值 <code>ring-rail</code></p>
    <Spin style="width: 100%" :spinning="spinning" indicator="ring-rail">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">动态圆环</h2>
    <p class="mb10"><code>indicator</code> 取值 <code>dynamic-circle</code></p>
    <Spin style="width: 100%" :spinning="spinning" indicator="dynamic-circle">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">翻转双环</h2>
    <p class="mb10"><code>indicator</code> 取值 <code>magic-ring</code></p>
    <Spin style="width: 100%" :spinning="spinning" indicator="magic-ring">
      <p class="spin-content">
        当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
        描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
        描述文案一起水平垂直居中。
      </p>
    </Spin>
    <h2 class="mt30 mb10">各种大小</h2>
    <Space vertical>
      <Space>
        <Spin class="spin-size" :spinning="spinning" size="small" />
        <Spin class="spin-size" :spinning="spinning" />
        <Spin class="spin-size" :spinning="spinning" size="large" />
        <Spin class="spin-size" :spinning="spinning" size="small" indicator="dot-wheel" />
        <Spin class="spin-size" :spinning="spinning" indicator="dot-wheel" />
        <Spin class="spin-size" :spinning="spinning" size="large" indicator="dot-wheel" />
        <Spin class="spin-size" :spinning="spinning" size="small" indicator="line-wheel" />
        <Spin class="spin-size" :spinning="spinning" indicator="line-wheel" />
        <Spin class="spin-size" :spinning="spinning" size="large" indicator="line-wheel" />
      </Space>
      <Space>
        <Spin class="spin-size" :spinning="spinning" size="small" indicator="ring-circle" />
        <Spin class="spin-size" :spinning="spinning" indicator="ring-circle" />
        <Spin class="spin-size" :spinning="spinning" size="large" indicator="ring-circle" />
        <Spin class="spin-size" :spinning="spinning" size="small" indicator="ring-rail" />
        <Spin class="spin-size" :spinning="spinning" indicator="ring-rail" />
        <Spin class="spin-size" :spinning="spinning" size="large" indicator="ring-rail" />
        <Spin class="spin-size" :spinning="spinning" size="small" indicator="dynamic-circle" />
        <Spin class="spin-size" :spinning="spinning" indicator="dynamic-circle" />
        <Spin class="spin-size" :spinning="spinning" size="large" indicator="dynamic-circle" />
      </Space>
      <Space>
        <Spin class="spin-size" :spinning="spinning" size="small" indicator="magic-ring" />
        <Spin class="spin-size" :spinning="spinning" indicator="magic-ring" />
        <Spin class="spin-size" :spinning="spinning" size="large" indicator="magic-ring" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义描述文案</h2>
    <Space vertical>
      <RadioGroup :options="sizeOptions" v-model:value="tipSize" button button-style="solid" />
      <Space>
        <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" />
        <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="dot-wheel" />
        <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="line-wheel" />
        <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="ring-circle" />
        <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="ring-rail" />
        <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="dynamic-circle" />
        <Spin class="spin-item" :size="tipSize" :spinning="spinning" indicator="magic-ring">
          <template #tip>加载中...</template>
        </Spin>
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space vertical>
      <RadioGroup :options="sizeOptions" v-model:value="colorSize" button button-style="solid" />
      <Space>
        <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" />
        <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" indicator="dot-wheel" />
        <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" indicator="line-wheel" />
        <Spin
          class="spin-item"
          :size="colorSize"
          color="#fadb14"
          :spinning="spinning"
          :spin-circle-percent="50"
          indicator="ring-circle"
        />
        <Spin
          class="spin-item"
          :size="colorSize"
          color="#fadb14"
          :spin-circle-percent="50"
          ring-rail-color="rgba(212, 136, 6, 0.6)"
          :spinning="spinning"
          indicator="ring-rail"
        />
        <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
        <Spin
          class="spin-item"
          :size="colorSize"
          color="#fadb14"
          magic-ring-color="#ffe58f"
          :spinning="spinning"
          indicator="magic-ring"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">延迟显示</h2>
    <p class="mb10">打开开关后，加载效果需等 <code>delay</code> 时长才出现，从而避免请求过快时闪烁</p>
    <Flex align="center"> loading state:<Switch v-model:value="delaySpinning" /> </Flex>
    <br />
    <Flex align="center"> delay:<InputNumber v-model:value="delay" :min="0" /> ms </Flex>
    <br />
    <Spin style="width: 100%" :spinning="delaySpinning" :delay="delay" tip="加载中...">
      <p class="spin-content spin-content-fixed">
        请求进行中时，此区域会变淡且不可交互；若在这段时间内请求已经结束（再次关闭开关），加载效果不会出现。
      </p>
    </Spin>
    <h2 class="mt30 mb10">自定义指示符</h2>
    <p class="mb10">
      通过 <code>indicator</code> 传入 <code>VNode</code> 或渲染函数，或用 <code>#indicator</code> 插槽，替换内置指示符
    </p>
    <Space>
      <Spin class="spin-item" :spinning="spinning" :indicator="customIndicatorVNode" />
      <Spin class="spin-item" :spinning="spinning" :indicator="customIndicatorFn" />
      <Spin class="spin-item" :spinning="spinning">
        <template #indicator>
          <LoadingOutlined spin style="font-size: 24px; color: var(--va-warning-color)" />
        </template>
      </Spin>
    </Space>
    <h2 class="mt30 mb10">宽度贴合内容</h2>
    <p class="mb10">
      内容比父容器窄时，<code>fitContent</code> 让遮罩与加载效果一起按内容宽度居中；不开启时二者以父容器为基准
    </p>
    <Space vertical width="100%" align="stretch">
      <Flex vertical gap="small">
        <span class="spin-parent-label">不开启：遮罩与加载效果以父容器为基准</span>
        <div class="spin-parent">
          <Spin :spinning="spinning">
            <p class="spin-content spin-content-narrow">内容盒宽度固定为 600px</p>
          </Spin>
        </div>
      </Flex>
      <Flex vertical gap="small">
        <span class="spin-parent-label">开启 <code>fitContent</code>：遮罩与加载效果随 600px 内容盒居中</span>
        <div class="spin-parent">
          <Spin fit-content :spinning="spinning">
            <p class="spin-content spin-content-narrow">内容盒宽度固定为 600px</p>
          </Spin>
        </div>
      </Flex>
    </Space>
    <h2 class="mt30 mb10">动画速度、环宽与配色</h2>
    <p class="mb10">
      通过 <code>speed</code> 调节动画周期（值越小越快），<code>spinCircleWidth</code> 调节
      <code>magic-ring</code> 的环宽（内外环同步），<code>color</code> /
      <code>magicRingColor</code> 分别设置外环与内环颜色（未传 <code>magicRingColor</code> 时内环取
      <code>color</code> 的浅一档）；开启 <code>rotate</code> 后，<code>dot-wheel</code> /
      <code>line-wheel</code> 出现时会整体旋转一圈
    </p>
    <Space vertical>
      <Flex align="center"> loading state:<Switch v-model:value="rotateSpinning" /> </Flex>
      <Flex align="center"> speed:<InputNumber v-model:value="speed" :min="1" :step="100" /> ms </Flex>
      <Flex align="center"> spinCircleWidth:<InputNumber v-model:value="circleWidth" :min="6" :max="26" /> % </Flex>
      <Flex align="center"> color:<ColorPicker :width="200" v-model:value="color" /> </Flex>
      <Flex align="center"> magicRingColor:<ColorPicker :width="200" v-model:value="ringColor" /> </Flex>
      <Flex align="center"> rotate:<Switch v-model:value="rotate" /> </Flex>
      <Space>
        <Spin
          class="spin-item"
          :spinning="rotateSpinning"
          :speed="speed"
          :color="color"
          :rotate="rotate"
          indicator="dot-wheel"
        />
        <Spin
          class="spin-item"
          :spinning="rotateSpinning"
          :speed="speed"
          :color="color"
          :rotate="rotate"
          indicator="line-wheel"
        />
        <Spin
          class="spin-item"
          :spinning="rotateSpinning"
          :speed="speed"
          :color="color"
          :magic-ring-color="ringColor"
          :spin-circle-width="circleWidth"
          indicator="magic-ring"
        />
      </Space>
    </Space>
  </div>
</template>
<style lang="less" scoped>
// 内容盒配色走主题语义变量：浅色为主色浅底 + 主色描边，暗色自动换成深色主色底，
// 硬编码浅色会在暗色下变成一块发白底、浅色文字几乎不可读
.spin-content {
  display: inline-block;
  border: 1px solid var(--va-primary-border-color);
  background-color: var(--va-primary-bg-color);
  padding: 30px;
}
// 演示内容盒宽度基准：演示页统一 800px（「延迟显示」用例）；max-width 兜底窄容器
.spin-content-fixed {
  width: 800px;
  max-width: 100%;
}
// 窄内容盒：用于「宽度贴合内容」用例，内容窄于父容器时才能对比出「居中基准」的差异
.spin-content-narrow {
  width: 600px;
  max-width: 100%;
}
// 「宽度贴合内容」用例的父容器：宽度即演示区宽度（由外层 Space 的 width + align 拉通），虚线框标示父容器边界；
// flex 消除 inline-block 的行盒空隙，outline 不参与布局（不挤动内容盒）
.spin-parent {
  display: flex;
  width: 100%;
  padding: 12px 8px;
  // 虚线框与标签同取主题中性色：硬编码浅灰 / 深灰在暗色下分别「过亮」与「不可见」
  outline: 1px dashed var(--va-border-color);
}
// 「宽度贴合内容」用例的行标签：说明该行的遮罩居中基准
.spin-parent-label {
  color: var(--va-text-color-2);
}
// 叠加组件根类名提高特异性：组件根节点为 width / height 100%，同特异性下会随样式注入顺序反转，
// 提高一级即可稳定覆盖，无需 !important
div.spin-wrap.spin-item {
  width: 100px;
  height: 100px;
}
.spin-size {
  width: 80px;
  height: 80px;
}
</style>
