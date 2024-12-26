<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'
const options = ref([
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
const optionsDisabled = ref([
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
const checked = ref(false)
const value = ref([2])
watchEffect(() => {
  console.log('checked', checked.value)
})
watchEffect(() => {
  console.log('value', value.value)
})
function onChange(value: boolean | (string | number)[]) {
  console.log('change', value)
}
const checkAll = ref(false) // 全选v-model
const indeterminate = computed(() => {
  // 全选样式控制
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    return false
  }
})
watch(checkAll, (to) => {
  console.log('checkAll', to)
  if (to) {
    value.value = options.value.map((option) => option.value)
  } else {
    value.value = []
  }
})
const horizontalGap = ref(16)
const verticalGap = ref(8)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Checkbox v-model:checked="checked" @change="onChange">Checkbox</Checkbox>
    <h2 class="mt30 mb10">选项列表</h2>
    <Checkbox :options="options" v-model:value="value" @change="onChange" />
    <h2 class="mt30 mb10">禁用</h2>
    <Checkbox :options="options" v-model:value="value" disabled />
    <h2 class="mt30 mb10">禁用选项</h2>
    <Checkbox :options="optionsDisabled" v-model:value="value" />
    <h2 class="mt30 mb10">全选</h2>
    <Space vertical>
      <Checkbox :indeterminate="indeterminate" v-model:checked="checkAll">Check All</Checkbox>
      <Checkbox :options="options" v-model:value="value" />
    </Space>
    <h2 class="mt30 mb10">垂直排列</h2>
    <Checkbox :options="options" vertical v-model:value="value" />
    <h2 class="mt30 mb10">自定义选项名</h2>
    <Checkbox :options="options" v-model:value="value">
      <template #default="{ option, label, index }">
        <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
        <span v-if="index === 3" style="color: #1677ff">{{ option.label }}</span>
      </template>
    </Checkbox>
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
      <Checkbox :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="value" />
    </Flex>
  </div>
</template>
