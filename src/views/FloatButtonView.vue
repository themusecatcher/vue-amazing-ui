<script setup lang="ts">
import { h, ref } from 'vue'
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
import { generate } from '@ant-design/colors'
const primaryColor = ref('#ff6900')
function getColorPalettes(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--float-btn-primary-color': color,
    '--float-btn-primary-color-hover': colorPalettes[4]
  }
  return style
}
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
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton @click="onClick">
        <template #icon>
          <GlobalOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">位置</h2>
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
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton type="primary" :right="96">
        <template #icon>
          <StarFilled spin style="color: gold" />
        </template>
      </FloatButton>
      <FloatButton shape="square" :icon="() => h(SettingOutlined, { style: 'color: #1677ff' })" />
    </Card>
    <h2 class="mt30 mb10">文字描述信息</h2>
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
        href="https://blog.csdn.net/Dandrose"
        target="_blank"
      />
    </Card>
    <h2 class="mt30 mb10">菜单模式</h2>
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
    <h2 class="mt30 mb10">徽标数</h2>
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
    <h2 class="mt30 mb10">自定义主题色</h2>
    <Flex vertical>
      <Space align="center">
        floatButtonPrimaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" />
      </Space>
      <Card width="50%" style="height: 300px; transform: translate(0)">
        <FloatButton :style="getColorPalettes(primaryColor)" type="primary" :right="96">
          <template #icon>
            <MessageOutlined />
          </template>
        </FloatButton>
        <FloatButton :style="getColorPalettes(primaryColor)" type="primary" shape="square">
          <template #icon>
            <CommentOutlined />
          </template>
        </FloatButton>
      </Card>
    </Flex>
  </div>
</template>
