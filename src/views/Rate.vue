<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value', value.value)
})
function onChange(value: number) {
  console.log('change value', value)
}
function onHoverChange(value: number) {
  console.log('hover value', value)
}
const characterOptions = [
  {
    label: 'star-outlined',
    value: 'star-outlined'
  },
  {
    label: 'star-filled',
    value: 'star-filled'
  },
  {
    label: 'heart-outlined',
    value: 'heart-outlined'
  },
  {
    label: 'heart-filled',
    value: 'heart-filled'
  },
  {
    label: 'custom-character',
    value: 'custom-character'
  }
]
const state = reactive({
  allowClear: true,
  allowHalf: true,
  count: 5,
  character: 'star-filled',
  customCharacter: 'S',
  size: 36,
  color: '#fadb14',
  gap: 8,
  disabled: false,
  value: 3
})
const score = ref(2.5)
watchEffect(() => {
  console.log('score', score.value)
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Rate v-model:value="value" />
    <h2 class="mt30 mb10">禁用</h2>
    <Rate v-model:value="value" disabled />
    <h2 class="mt30 mb10">空心星型</h2>
    <Rate character="star-outlined" :size="30" v-model:value="value" />
    <h2 class="mt30 mb10">实心心型</h2>
    <Rate character="heart-filled" :size="30" v-model:value="value" />
    <h2 class="mt30 mb10">空心心型</h2>
    <Rate character="heart-outlined" :size="30" v-model:value="value" />
    <h2 class="mt30 mb10">支持选中半星</h2>
    <Rate v-model:value="value" :size="30" allow-half />
    <h2 class="mt30 mb10">使用中文文字: 好</h2>
    <Rate character="好" :size="36" v-model:value="value" @change="onChange" @hover-change="onHoverChange" />
    <h2 class="mt30 mb10">使用英文字母: A</h2>
    <Rate character="A" :size="48" v-model:value="value" @change="onChange" @hover-change="onHoverChange" />
    <h2 class="mt30 mb10">自定义选中颜色</h2>
    <Rate color="#1677FF" :size="30" v-model:value="value" />
    <h2 class="mt30 mb10">自定义间距</h2>
    <Rate :size="30" :gap="16" v-model:value="value" />
    <h2 class="mt30 mb10">自定义 star 总数</h2>
    <Rate :size="30" :count="10" v-model:value="value" />
    <h2 class="mt30 mb10">评分配置器</h2>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Space gap="small" vertical> allowClear:<Switch v-model="state.allowClear" /> </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> allowHalf:<Switch v-model="state.allowHalf" /> </Space>
      </Col>
      <Col :span="6">
        <Flex vertical> count:<Slider v-model:value="state.count" :min="3" :max="10" /> </Flex>
      </Col>
      <Col :span="6">
        <Flex vertical> size:<Slider v-model:value="state.size" :min="10" :max="100" /> </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> color:<Input v-model:value="state.color" placeholder="color" /> </Flex>
      </Col>
      <Col :span="6">
        <Flex vertical> gap:<Slider v-model:value="state.gap" :min="0" :max="100" /> </Flex>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical> disabled:<Switch v-model="state.disabled" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> effect：<Select :options="characterOptions" v-model="state.character" /> </Flex>
      </Col>
      <Col :span="6" v-if="state.character === 'custom-character'">
        <Flex gap="small" vertical>
          character:<Input v-model:value="state.customCharacter" placeholder="customCharacter" />
        </Flex>
      </Col>
    </Row>
    <Badge :value="score" style="margin-top: 30px">
      <Rate
        :allow-clear="state.allowClear"
        :allow-half="state.allowHalf"
        :count="state.count"
        :character="state.character === 'custom-character' ? state.customCharacter : state.character"
        :size="state.size"
        :color="state.color"
        :gap="state.gap"
        :disabled="state.disabled"
        v-model:value="score"
      />
    </Badge>
  </div>
</template>
