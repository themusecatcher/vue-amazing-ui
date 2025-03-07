<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'
import type { StepsProps, StepsItem } from 'vue-amazing-ui'
import { generate } from '@ant-design/colors'
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
const current = ref(3)
const primaryColor = ref('#ff6900')
watchEffect(() => {
  console.log('current', current.value)
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
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--steps-primary-color': color,
    '--steps-primary-color-hover': color,
    '--steps-icon-color': colorPalettes[0],
    '--steps-icon-color-hover': color
  }
  return style
}
function onChange(index: number) {
  // 父组件获取切换后的选中步骤
  console.log('change', index)
}
function onPrev() {
  if (current.value > 1) {
    current.value--
  }
}
function onNext() {
  if (stepsItems.value.length >= current.value) {
    current.value++
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
    <Steps :items="stepsItems" :current="current" @change="onChange" />
    <h2 class="mt30 mb10">标签放置位置</h2>
    <Flex vertical>
      <Radio :options="placeOptions" v-model:value="place" button button-style="solid" />
      <Steps :items="stepsItems" :label-placement="place" :current="current" />
    </Flex>
    <h2 class="mt30 mb10">迷你版</h2>
    <Flex vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Steps :items="minStepsItems" :size="size" :current="current" />
    </Flex>
    <h2 class="mt30 mb10">垂直步骤条</h2>
    <Space :gap="120">
      <Steps :items="stepsItems" vertical :current="current" />
      <Steps :items="stepsItems" vertical size="small" :current="current" />
    </Space>
    <h2 class="mt30 mb10">点状步骤条</h2>
    <Space vertical>
      <Steps :items="stepsItems" dotted v-model:current="current" />
      <Steps :items="stepsItems" vertical dotted v-model:current="current" />
    </Space>
    <h2 class="mt30 mb10">可点击</h2>
    <h3 class="mb10">设置 v-model:current 后即可点击</h3>
    <Flex vertical>
      <Space>
        <Button @click="onPrev">Prev</Button>
        <Button @click="onNext">Next</Button>
      </Space>
      <Steps :items="stepsItems" v-model:current="current" />
      <Steps :items="stepsItems" vertical v-model:current="current" />
    </Flex>
    <h2 class="mt30 mb10">自定义主题色</h2>
    <Flex vertical>
      <Space align="center">
        stepsPrimaryColor:
        <ColorPicker style="width: 200px" v-model:value="primaryColor" />
      </Space>
      <Steps :style="getThemeStyle(primaryColor)" :items="stepsItems" v-model:current="current" />
    </Flex>
    <h2 class="mt30 mb10">步骤条配置器</h2>
    <Row :gutter="24">
      <Col :span="6">
        <Space gap="small" vertical>
          size:
          <Radio :options="sizeOptions" v-model:value="state.size" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          vertical:
          <Switch v-model="state.vertical" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          labelPlacement:
          <Radio :options="placeOptions" v-model:value="state.labelPlacement" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          dotted:
          <Switch v-model="state.dotted" />
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
      v-model:current="current"
    />
  </div>
</template>
