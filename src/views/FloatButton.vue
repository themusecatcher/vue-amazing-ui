<script setup lang="ts">
import { ref } from 'vue'
import {
  FileTextOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  SketchOutlined,
  MessageOutlined,
  CommentOutlined
} from '@ant-design/icons-vue'
function onClick(e: Event) {
  console.log('click', e)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton @click="onClick">
        <template #icon>
          <FileTextOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">类型</h2>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton :right="80">
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
      <FloatButton type="primary" :right="80">
        <template #icon>
          <CustomerServiceOutlined />
        </template>
      </FloatButton>
      <FloatButton shape="square" type="primary">
        <template #icon>
          <CustomerServiceOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">文字描述信息</h2>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton shape="square" description="HELP" :right="136">
        <template #icon>
          <FileTextOutlined />
        </template>
      </FloatButton>
      <FloatButton shape="square" description="HELP INFO" :right="80" />
      <FloatButton shape="square" type="primary" description="客服">
        <template #icon>
          <CustomerServiceOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">气泡卡片</h2>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton tooltip="Diamond" :right="80">
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
          }
        }"
      >
        <template #icon>
          <SketchOutlined />
        </template>
      </FloatButton>
    </Card>
    <h2 class="mt30 mb10">菜单模式</h2>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton menu-trigger="click" type="primary">
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
      <FloatButton menu-trigger="click" shape="square" description="INFO" :right="80">
        <template #icon>
          <CustomerServiceOutlined />
        </template>
        <template #menu>
          <FloatButton shape="square" type="primary">
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
    <h2 class="mt30 mb10">徽标数</h2>
    <Card width="50%" style="height: 300px; transform: translate(0)">
      <FloatButton shape="circle" :badge-props="{ dot: true }" :right="136">
        <template #icon>
          <MessageOutlined />
        </template>
      </FloatButton>
      <FloatButton :badge-props="{ value: 5, color: 'blue' }" :bottom="104">
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
      <FloatButton :badge-props="{ value: 5 }">
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
      <FloatButton :badge-props="{ value: 123 }" :right="80">
        <template #icon>
          <CommentOutlined />
        </template>
      </FloatButton>
    </Card>
  </div>
</template>
