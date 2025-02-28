<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { RadioProps, RadioOption } from 'vue-amazing-ui'
const options = ref<RadioOption[]>([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const optionsDisabled = ref<RadioOption[]>([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2,
    disabled: true
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
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
const checked = ref<RadioProps['checked']>(false)
const value = ref<RadioProps['value']>(2)
const buttonSize = ref<RadioProps['buttonSize']>('middle')
const primaryColor = ref('#ff6900')
watchEffect(() => {
  console.log('checked', checked.value)
})
watchEffect(() => {
  console.log('value', value.value)
})
const horizontalGap = ref(16)
const verticalGap = ref(8)
function onChange(value: string | number | boolean) {
  console.log('change', value)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Radio v-model:checked="checked" @change="onChange">Radio</Radio>
    <h2 class="mt30 mb10">选项列表</h2>
    <Radio :options="options" v-model:value="value" @change="onChange" />
    <h2 class="mt30 mb10">按钮样式</h2>
    <Space vertical>
      <Radio v-model:checked="checked" button>Radio Button</Radio>
      <Radio :options="options" v-model:value="value" button />
    </Space>
    <h2 class="mt30 mb10">填底的按钮样式</h2>
    <Space vertical>
      <Radio v-model:checked="checked" button button-style="solid">Radio Button Solid</Radio>
      <Radio :options="options" v-model:value="value" button button-style="solid" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Space vertical>
      <Radio v-model:checked="checked" disabled>Radio</Radio>
      <Radio :options="options" v-model:value="value" disabled />
      <Radio :options="options" v-model:value="value" button disabled />
    </Space>
    <h2 class="mt30 mb10">禁用选项</h2>
    <Space vertical>
      <Radio :options="optionsDisabled" v-model:value="value" />
      <Radio :options="optionsDisabled" v-model:value="value" button />
      <Radio :options="optionsDisabled" v-model:value="value" button button-style="solid" />
    </Space>
    <h2 class="mt30 mb10">垂直排列</h2>
    <Radio vertical :options="options" v-model:value="value" />
    <h2 class="mt30 mb10">自定义选项名</h2>
    <Radio :options="options" v-model:value="value">
      <template #default="{ option, label, index }">
        <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
        <span v-if="index === 3" style="color: #1677ff">{{ option.label }}</span>
      </template>
    </Radio>
    <h2 class="mt30 mb10">自定义间距</h2>
    <Flex vertical>
      <Row :gutter="24">
        <Col :span="12">
          <Flex gap="small" vertical> horizontal gap: <Slider v-model:value="horizontalGap" /> </Flex>
        </Col>
        <Col :span="12">
          <Flex gap="small" vertical> vertical gap: <Slider v-model:value="verticalGap" /> </Flex>
        </Col>
      </Row>
      <Radio :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="value" />
    </Flex>
    <h2 class="mt30 mb10">按钮大小</h2>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="buttonSize" />
      <Radio v-model:checked="checked" button :button-size="buttonSize">Radio Button</Radio>
      <Radio :options="options" v-model:value="value" button :button-size="buttonSize" />
      <Radio :options="options" v-model:value="value" button button-style="solid" :button-size="buttonSize" />
    </Space>
    <h2 class="mt30 mb10">自定义主题色</h2>
    <Space vertical>
      <Space align="center">radioPrimaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /></Space>
      <Radio :style="`--radio-primary-color: ${primaryColor}`" :options="options" v-model:value="value" />
      <Radio :style="`--radio-primary-color: ${primaryColor}`" :options="options" v-model:value="value" button button-style="solid" />
    </Space>
  </div>
</template>
