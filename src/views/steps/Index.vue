<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { StepsProps, StepsItem } from 'vue-amazing-ui'
const stepsItems = ref<StepsItem[]>([
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
const minStepsItems = ref<StepsItem[]>([
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
// 各分节独立绑定，操作任一用例不会联动其余用例
const basicCurrent = ref(3)
const placementCurrent = ref(3)
const miniCurrent = ref(3)
const verticalCurrent = ref(3)
const dotCurrent = ref(3)
const clickableCurrent = ref(3)
const configCurrent = ref(3)
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
const size = ref<StepsProps['size']>('small')
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
const place = ref<StepsProps['labelPlacement']>('bottom')
function onChange(index: number) {
  // 父组件获取切换后的选中步骤
  console.log('change', index)
}
function onPrev() {
  if (clickableCurrent.value > 1) {
    clickableCurrent.value--
  }
}
function onNext() {
  if (stepsItems.value.length >= clickableCurrent.value) {
    clickableCurrent.value++
  }
}
const state = reactive<StepsProps>({
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
    <Steps :items="stepsItems" :current="basicCurrent" @change="onChange" />
    <h2 class="mt30 mb10">标签放置位置</h2>
    <Flex vertical>
      <RadioGroup :options="placeOptions" v-model:value="place" button button-style="solid" />
      <Steps :items="stepsItems" :label-placement="place" :current="placementCurrent" />
    </Flex>
    <h2 class="mt30 mb10">迷你版</h2>
    <Flex vertical>
      <RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Steps :items="minStepsItems" :size="size" :current="miniCurrent" />
    </Flex>
    <h2 class="mt30 mb10">垂直步骤条</h2>
    <Space :gap="120">
      <Steps :items="stepsItems" vertical :current="verticalCurrent" />
      <Steps :items="stepsItems" vertical size="small" :current="verticalCurrent" />
    </Space>
    <h2 class="mt30 mb10">点状步骤条</h2>
    <Space vertical>
      <Steps :items="stepsItems" dotted v-model:current="dotCurrent" />
      <Steps :items="stepsItems" vertical dotted v-model:current="dotCurrent" />
    </Space>
    <h2 class="mt30 mb10">可点击</h2>
    <p class="mb10">设置 <code>v-model:current</code> 后即可点击</p>
    <Flex vertical>
      <Space>
        <Button @click="onPrev">Prev</Button>
        <Button @click="onNext">Next</Button>
      </Space>
      <Steps :items="stepsItems" v-model:current="clickableCurrent" />
      <Steps :items="stepsItems" vertical v-model:current="clickableCurrent" />
    </Flex>
    <h2 class="mt30 mb10">步骤条配置器</h2>
    <Row :gutter="24">
      <Col :span="6">
        <Space gap="small" vertical>
          size:
          <RadioGroup :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          vertical:
          <Switch v-model:value="state.vertical" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          labelPlacement:
          <RadioGroup :options="placeOptions" v-model:value="state.labelPlacement" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          dotted:
          <Switch v-model:value="state.dotted" />
        </Space>
      </Col>
    </Row>
    <Steps
      class="mt30"
      :items="stepsItems"
      :size="state.size"
      :vertical="state.vertical"
      :label-placement="state.labelPlacement"
      :dotted="state.dotted"
      v-model:current="configCurrent"
    />
  </div>
</template>
