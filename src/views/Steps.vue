<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'
const steps = ref([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  },
  {
    title: 'Step 4',
    description: 'description 4'
  },
  {
    title: 'Step 5',
    description: 'description 5'
  }
])
const minSteps = ref([
  {
    title: 'Step 1'
  },
  {
    title: 'Step 2'
  },
  {
    title: 'Step 3'
  },
  {
    title: 'Step 4'
  },
  {
    title: 'Step 5'
  }
])
const current = ref(3)
watchEffect(() => {
  console.log('current:', current.value)
})
const sizeOptions = [
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'small',
    value: 'small'
  }
]
const size = ref('small')
const placeOptions = [
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'bottom',
    value: 'bottom'
  }
]
const place = ref('bottom')
function onChange(index: number) {
  // 父组件获取切换后的选中步骤
  console.log('change:', index)
}
function onPrevious() {
  if (current.value > 1) {
    current.value--
  }
}
function onNext() {
  if (steps.value.length >= current.value) {
    current.value++
  }
}
const state = reactive({
  size: 'default',
  vertical: false,
  labelPlacement: 'right',
  dotted: false,
  current: 3
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Steps :steps="steps" :current="current" @change="onChange" />
    <h2 class="mt30 mb10">标签放置位置</h2>
    <Flex vertical gap="middle">
      <Radio :options="placeOptions" v-model:value="place" button button-style="solid" />
      <Steps :steps="steps" :label-placement="place" :current="current" />
    </Flex>
    <h2 class="mt30 mb10">迷你版</h2>
    <Flex vertical gap="middle">
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Steps :steps="minSteps" :size="size" :current="current" />
    </Flex>
    <h2 class="mt30 mb10">垂直步骤条</h2>
    <Space :gap="120">
      <Steps :steps="steps" vertical :current="current" />
      <Steps :steps="steps" vertical size="small" :current="current" />
    </Space>
    <h2 class="mt30 mb10">点状步骤条</h2>
    <Space vertical>
      <Steps :steps="steps" dotted v-model:current="current" />
      <Steps :steps="steps" vertical dotted v-model:current="current" />
    </Space>
    <h2 class="mt30 mb10">可点击</h2>
    <h3 class="mb10">设置 v-model:current 后即可点击</h3>
    <Space>
      <Button @click="onPrevious">Previous</Button>
      <Button @click="onNext">Next</Button>
    </Space>
    <br />
    <br />
    <Steps :steps="steps" v-model:current="current" />
    <br />
    <Steps :steps="steps" vertical v-model:current="current" />
    <h2 class="mt30 mb10">步骤条配置器</h2>
    <Row :gutter="24">
      <Col :span="6">
        <Space vertical>
          size:
          <Radio :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space vertical>
          vertical:
          <Switch v-model:checked="state.vertical" />
        </Space>
      </Col>
      <Col :span="6">
        <Space vertical>
          labelPlacement:
          <Radio :options="placeOptions" v-model:value="state.labelPlacement" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space vertical>
          dotted:
          <Switch v-model:checked="state.dotted" />
        </Space>
      </Col>
    </Row>
    <Steps
      class="mt30"
      :steps="steps"
      :size="state.size"
      :vertical="state.vertical"
      :label-placement="state.labelPlacement"
      :dotted="state.dotted"
      v-model:current="current"
    />
  </div>
</template>
