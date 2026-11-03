<script setup lang="ts">
import { ref } from 'vue'
const gapOptions = ref([
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
  },
  {
    label: 'customize',
    value: 'customize'
  }
])
const gapSize = ref<'small' | 'middle' | 'large' | 'customize'>('middle')
const customGapSize = ref(16)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">基础用法，默认为水平排列</p>
    <Space align="center">
      Space
      <Button type="primary">Button</Button>
      <Popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No">
        <Button>Confirm</Button>
      </Popconfirm>
    </Space>
    <h2 class="mt30 mb10">设置间距</h2>
    <p class="mb10">通过 <code>gap</code> 设置间距，可选档位或自定义数值</p>
    <Flex vertical>
      <RadioGroup :options="gapOptions" v-model:value="gapSize" />
      <Slider v-if="gapSize === 'customize'" v-model:value="customGapSize" />
      <Space :gap="gapSize !== 'customize' ? gapSize : customGapSize">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </Flex>
    <h2 class="mt30 mb10">垂直间距</h2>
    <p class="mb10">开启 <code>vertical</code> 后内容按垂直方向排列</p>
    <Space vertical>
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
    <p class="mb10">通过 <code>align</code> 控制交叉轴的对齐方式</p>
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
    <p class="mb10"><code>gap</code> 数组分别设置水平与垂直间距，超出容器宽度时自动换行</p>
    <Space :gap="[8, 16]" style="width: 100%">
      <template v-for="n in 16" :key="n">
        <Button type="primary">Button</Button>
      </template>
    </Space>
    <h2 class="mt30 mb10">分隔符</h2>
    <p class="mb10">通过 <code>split</code> 插槽在相邻内容之间插入间隔元素，分隔符两侧各占一份 <code>gap</code> 间距</p>
    <Space align="center" :gap="8">
      <template #split>
        <Divider vertical />
      </template>
      <a href="#">Link</a>
      <a href="#">Link</a>
      <a href="#">Link</a>
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
