<script setup lang="ts">
import { ref } from 'vue'
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
const cardWidth = {
  small: 240,
  middle: 300,
  large: 360
}
const size = ref('middle')
const loading = ref(true)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Card title="Default size card" :width="300">
      <template #extra>
        <a href="#">more</a>
      </template>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </Card>
    <h2 class="mt30 mb10">在灰色背景上使用无边框的卡片</h2>
    <div style="display: inline-block; background: #ececec; padding: 30px; border-radius: 8px">
      <Card title="Card title" :bordered="false" :width="300">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
    <h2 class="mt30 mb10">简洁卡片</h2>
    <Card hoverable :width="300">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Card :size="size" :title="`${size.toUpperCase()} size card`" :width="cardWidth[size as keyof typeof cardWidth]">
        <template #extra>
          <a href="#">more</a>
        </template>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </Card>
    </Space>
    <h2 class="mt30 mb10">鼠标移过时可浮起</h2>
    <Card hoverable title="Card title" :width="300">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <h2 class="mt30 mb10">预加载卡片</h2>
    <Space vertical>
      <Space align="center">Loading State:<Switch v-model="loading" /></Space>
      <Card :loading="loading" title="Card title" :width="300">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Card
      title="Default size card"
      :width="300"
      :headStyle="{ fontSize: '18px', color: '#fff', backgroundColor: '#1677ff' }"
      :bodyStyle="{ fontSize: '16px', color: '#fff', backgroundColor: '#52c41a' }"
    >
      <template #extra>
        <a href="#">more</a>
      </template>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </Card>
    <h2 class="mt30 mb10">内部嵌套卡片</h2>
    <Card title="Card title" :width="360">
      <p style="font-size: 14px; color: rgba(0, 0, 0, 0.85); margin-bottom: 16px; font-weight: 500">Group title</p>
      <Card title="Inner card title">
        <template #extra>
          <a href="#">More</a>
        </template>
        Inner Card content
      </Card>
      <Card title="Inner card title" :style="{ marginTop: '16px' }">
        <template #extra>
          <a href="#">More</a>
        </template>
        Inner Card content
      </Card>
    </Card>
    <h2 class="mt30 mb10">栅格卡片</h2>
    <div style="background-color: #ececec; padding: 20px; border-radius: 8px">
      <Row :gutter="16">
        <Col :span="8">
          <Card title="Card title" :bordered="false">
            <p>card content</p>
          </Card>
        </Col>
        <Col :span="8">
          <Card title="Card title" :bordered="false">
            <p>card content</p>
          </Card>
        </Col>
        <Col :span="8">
          <Card title="Card title" :bordered="false">
            <p>card content</p>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>
