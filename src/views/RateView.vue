<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'
import { ThunderboltFilled, LikeFilled, FireFilled } from '@ant-design/icons-vue'
const value = ref(3)
const tooltipsChinese = ['极差', '失望', '一般', '满意', '惊喜']
const tooltipsEnglish = ['terrible', 'bad', 'normal', 'good', 'wonderful']
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
  disabled: false
})
watchEffect(() => {
  console.log('value', value.value)
})
function onChange(value: number) {
  console.log('change', value)
}
function onHoverChange(value: number) {
  console.log('hover change', value)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Rate v-model:value="value" @change="onChange" @hoverChange="onHoverChange" />
    <h2 class="mt30 mb10">文案提示</h2>
    <Space vertical>
      <Space align="center">
        <Rate v-model:value="value" :tooltips="tooltipsChinese" />
        <Tag color="blue" :bordered="false">
          {{ tooltipsChinese[value - 1] }}
        </Tag>
      </Space>
      <Space align="center">
        <Rate
          v-model:value="value"
          :tooltips="tooltipsEnglish"
          :tooltip-props="{
            bgColor: '#fff',
            tooltipStyle: {
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.88)'
            }
          }"
        />
        <Tag color="red" :bordered="false">
          {{ tooltipsEnglish[value - 1] }}
        </Tag>
      </Space>
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Rate v-model:value="value" disabled />
    <h2 class="mt30 mb10">预置图标</h2>
    <Space vertical>
      <Rate v-model:value="value" character="star-outlined" :size="24" />
      <Rate v-model:value="value" character="heart-filled" :size="24" />
      <Rate v-model:value="value" character="heart-outlined" :size="24" />
    </Space>
    <h2 class="mt30 mb10">半星</h2>
    <Rate v-model:value="value" :size="24" allow-half />
    <h2 class="mt30 mb10">自定义字符</h2>
    <Space vertical>
      <Rate v-model:value="value" character="好" :size="32" allow-half />
      <Rate v-model:value="value" character="A" :size="48" allow-half />
      <Rate v-model:value="value" :size="32" allow-half>
        <template #character>
          <ThunderboltFilled />
        </template>
      </Rate>
    </Space>
    <h2 class="mt30 mb10">自定义颜色</h2>
    <Space vertical>
      <Rate v-model:value="value" color="#1677FF" :size="32" allow-half />
      <Rate v-model:value="value" color="#ff6900" :size="32" allow-half>
        <template #character>
          <LikeFilled />
        </template>
      </Rate>
      <Rate v-model:value="value" color="#d4380d" :size="32" allow-half>
        <template #character>
          <FireFilled />
        </template>
      </Rate>
    </Space>
    <h2 class="mt30 mb10">自定义间距</h2>
    <Rate v-model:value="value" :size="32" :gap="16" />
    <h2 class="mt30 mb10">自定义 star 总数</h2>
    <Rate v-model:value="value" :size="32" :count="10" />
    <h2 class="mt30 mb10">评分配置器</h2>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Space vertical> allowClear:<Switch v-model="state.allowClear" /> </Space>
      </Col>
      <Col :span="6">
        <Space vertical> allowHalf:<Switch v-model="state.allowHalf" /> </Space>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> count:<Slider v-model:value="state.count" :min="3" :max="10" /> </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> size:<Slider v-model:value="state.size" :min="10" :max="100" /> </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> color:<Input v-model:value="state.color" placeholder="color" /> </Flex>
      </Col>
      <Col :span="6">
        <Flex gap="small" vertical> gap:<Slider v-model:value="state.gap" :min="0" :max="100" /> </Flex>
      </Col>
      <Col :span="6">
        <Space vertical> disabled:<Switch v-model="state.disabled" /> </Space>
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
    <Badge :value="value" style="margin-top: 30px">
      <Rate
        v-bind="state"
        :character="state.character === 'custom-character' ? state.customCharacter : state.character"
        v-model:value="value"
      />
    </Badge>
  </div>
</template>
