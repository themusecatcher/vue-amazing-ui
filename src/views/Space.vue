<script setup lang="ts">
import { ref } from 'vue'
const options = ref([
      {
        label: 'small',
        value: 'small'
      },
      {
        label: 'middle',
        value: 'middle',
      },
      {
        label: 'large',
        value: 'large'
      }
    ])
const size = ref('small')
</script>
<template>
  <div>
    <h1>Space 间距</h1>
    <h2 class="mt30 mb10">水平间距</h2>
    <Radio :options="options" v-model:value="size" />
    <br/><br/>
    <Space :size="size">
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
    </Space>
    <h2 class="mt30 mb10">垂直间距</h2>
    <Space direction="vertical">
      <Card title="Card" style="width: 300px">
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Card" style="width: 300px">
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
    <h2 class="mt30 mb10">对齐</h2>
    <div class="space-align-container">
      <div class="space-align-block">
        <Space align="center">
          center
          <Button type="primary">Primary</Button>
          <span class="mock-block">Block</span>
        </Space>
      </div>
      <div class="space-align-block">
        <Space align="start">
          start
          <Button type="primary">Primary</Button>
          <span class="mock-block">Block</span>
        </Space>
      </div>
      <div class="space-align-block">
        <Space align="end">
          end
          <Button type="primary">Primary</Button>
          <span class="mock-block">Block</span>
        </Space>
      </div>
      <div class="space-align-block">
        <Space align="baseline">
          baseline
          <Button type="primary">Primary</Button>
          <span class="mock-block">Block</span>
        </Space>
      </div>
    </div>
    <h2 class="mt30 mb10">自动换行</h2>
    <Space :size="[8, 16]" style="width: 600px;">
      <template v-for="n in 10" :key="n">
        <Button>Button</Button>
      </template>
    </Space>
  </div>
</template>
<style lang="less" scoped>
.space-align-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.space-align-block {
  margin: 8px 4px;
  border: 1px solid #40a9ff;
  padding: 4px;
  flex: none;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}
</style>
