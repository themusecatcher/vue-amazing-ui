<script setup lang="ts">
import { ref } from 'vue'
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
    <h2 class="mt30 mb10">小尺寸卡片</h2>
    <Card size="small" title="Small size card" :width="300">
      <template #extra>
        <a href="#">more</a>
      </template>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </Card>
    <h2 class="mt30 mb10">简洁卡片</h2>
    <Card :width="300">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <h2 class="mt30 mb10">预加载卡片</h2>
    <Space vertical>
      <Card :loading="loading" title="Card title" :width="300">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Button @click="loading = !loading">Toggle loading</Button>
    </Space>
    <h2 class="mt30 mb10">在灰色背景上使用无边框的卡片</h2>
    <div style="display: inline-block; background: #ececec; padding: 30px; border-radius: 8px">
      <Card title="Card title" :bordered="false" :width="300">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
    <h2 class="mt30 mb10">自定义标题和内容区域样式</h2>
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
    <h2 class="mt30 mb10">内部卡片</h2>
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
