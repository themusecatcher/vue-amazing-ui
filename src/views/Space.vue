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
  <div style="width: 500px;">
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
    <h2 class="mt30 mb10">自动换行</h2>
    <Space :size="[8, 16]" wrap>
      <template v-for="n in 10" :key="n">
        <Button>Button</Button>
      </template>
    </Space>
  </div>
</template>
