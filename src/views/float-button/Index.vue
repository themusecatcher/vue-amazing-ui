<script setup lang="ts">
import { h } from 'vue'
import {
  GlobalOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  StarFilled,
  SettingOutlined,
  SketchOutlined,
  MessageOutlined,
  CommentOutlined
} from '@ant-design/icons-vue'
function onClick(e: Event) {
  console.log('click', e)
}
function onOpenChange(open: boolean) {
  console.log('openChange', open)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10"
      >点击悬浮按钮触发 <code>click</code> 事件；不传定位属性时默认停在视口右下角（<code>right</code> /
      <code>bottom</code> 均为 <code>40</code>）</p
    >
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton @click="onClick">
        <template #icon>
          <GlobalOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">位置</h2>
    <p class="mb10"
      >通过 <code>top</code> / <code>bottom</code> / <code>left</code> / <code>right</code> 定位；<code>top</code> 与
      <code>left</code> 分别优先于 <code>bottom</code> 与 <code>right</code></p
    >
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton>
        <template #icon>
          <MessageOutlined />
        </template>
      </FloatButton>
      <FloatButton shape="square" :top="40">
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
      <FloatButton type="primary" :left="40">
        <template #icon>
          <MessageOutlined />
        </template>
      </FloatButton>
      <FloatButton type="primary" shape="square" :top="40" :left="40">
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">尺寸</h2>
    <p class="mb10"
      >通过 <code>width</code> / <code>height</code> 自定义按钮尺寸（默认
      <code>44</code>）；图标字号不随尺寸缩放，需要时单独设置</p
    >
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton :width="56" :height="56" :right="120">
        <template #icon>
          <MessageOutlined style="font-size: 24px" />
        </template>
      </FloatButton>
      <FloatButton type="primary" shape="square" :width="56" :height="56">
        <template #icon>
          <CommentOutlined style="font-size: 24px" />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">类型</h2>
    <p class="mb10">通过 <code>type</code> 切换默认与主色两种类型</p>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton :right="96">
        <template #icon>
          <QuestionCircleOutlined />
        </template>
      </FloatButton>
      <FloatButton type="primary">
        <template #icon>
          <QuestionCircleOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">形状</h2>
    <p class="mb10">通过 <code>shape</code> 切换圆形与方形</p>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton type="primary" :right="96">
        <template #icon>
          <CustomerServiceOutlined />
        </template>
      </FloatButton>
      <FloatButton type="primary" shape="square">
        <template #icon>
          <CustomerServiceOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">图标</h2>
    <p class="mb10"
      >图标可用 <code>icon</code> 属性（<code>VNode</code> 或渲染函数）传入，也可用 <code>#icon</code> 插槽自定义</p
    >
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton type="primary" :right="96">
        <template #icon>
          <StarFilled spin style="color: gold" />
        </template>
      </FloatButton>
      <FloatButton shape="square" :icon="() => h(SettingOutlined, { style: 'color: #1677ff' })" />
    </Card>
    <h2 class="mt30 mb10">文字描述信息</h2>
    <p class="mb10">通过 <code>description</code> 在图标下方展示文字；两者上下排列，空间不足时通常搭配方形按钮使用</p>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton shape="square" description="HELP" :right="152">
        <template #icon>
          <GlobalOutlined />
        </template>
      </FloatButton>
      <FloatButton shape="square" description="HELP INFO" :right="96" />
      <FloatButton type="primary" shape="square" description="客服">
        <template #icon>
          <CustomerServiceOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">链接跳转</h2>
    <p class="mb10"
      >设置 <code>href</code> 后按钮渲染为 <code>a</code> 标签，跳转行为与原生链接一致，<code>target</code>
      控制打开方式</p
    >
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton href="https://themusecatcher.github.io/vue-amazing-ui/" :right="96">
        <template #icon>
          <img style="width: 1em; height: 1em" src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg" />
        </template>
      </FloatButton>
      <FloatButton
        type="primary"
        shape="square"
        description="CSDN"
        href="https://themusecatcher.blog.csdn.net"
        target="_blank"
      />
    </Card>
    <h2 class="mt30 mb10">菜单模式</h2>
    <p class="mb10"
      >设置 <code>menuTrigger</code> 后，点击或悬停按钮展开 <code>#menu</code> 内的多个悬浮按钮，展开状态由
      <code>openChange</code> 回传</p
    >
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton shape="square" description="HELP" :right="96" menu-trigger="click" @openChange="onOpenChange">
        <template #icon>
          <CustomerServiceOutlined />
        </template>
        <template #menu>
          <FloatButton shape="square">
            <template #icon>
              <MessageOutlined />
            </template>
          </FloatButton>
          <FloatButton>
            <template #icon>
              <CommentOutlined />
            </template>
          </FloatButton>
        </template>
      </FloatButton>
      <FloatButton type="primary" menu-trigger="hover" @openChange="onOpenChange">
        <template #icon>
          <CustomerServiceOutlined />
        </template>
        <template #menu>
          <FloatButton>
            <template #icon>
              <MessageOutlined />
            </template>
          </FloatButton>
          <FloatButton>
            <template #icon>
              <CommentOutlined />
            </template>
          </FloatButton>
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">气泡卡片</h2>
    <p class="mb10"
      >通过 <code>tooltip</code> 设置气泡内容，<code>tooltipProps</code> 可透传 <code>Tooltip</code> 的属性</p
    >
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton tooltip="Diamond" :right="96">
        <template #icon>
          <SketchOutlined />
        </template>
      </FloatButton>
      <FloatButton
        type="primary"
        tooltip="Diamond"
        :tooltip-props="{
          bgColor: '#fff',
          tooltipStyle: {
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.88)'
          },
          placement: 'top'
        }"
      >
        <template #icon>
          <SketchOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">自定义层级</h2>
    <p class="mb10">
      通过 <code>zIndex</code> 调整按钮层级（默认 <code>99</code>）；按钮上的气泡是浮层（默认
      <code>1070</code>），恒在按钮之上
    </p>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton tooltip="Diamond" :right="96">
        <template #icon>
          <SketchOutlined />
        </template>
      </FloatButton>
      <FloatButton type="primary" tooltip="Diamond" :z-index="3000">
        <template #icon>
          <SketchOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">徽标数</h2>
    <p class="mb10">通过 <code>badgeProps</code> 在按钮右上角叠加徽标，属性与 <code>Badge</code> 一致</p>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton :badge-props="{ dot: true }" :right="152">
        <template #icon>
          <MessageOutlined />
        </template>
      </FloatButton>
      <FloatButton :badge-props="{ value: 5, color: 'blue' }" :bottom="100">
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
      <FloatButton :badge-props="{ value: 5 }">
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
      <FloatButton :badge-props="{ value: 123 }" :right="96">
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
    </Card>
  </div>
</template>
