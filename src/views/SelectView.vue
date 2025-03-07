<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
import { generate } from '@ant-design/colors'
const options = ref<SelectOption[]>([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '上海市',
    value: 2
  },
  {
    label: '纽约市',
    value: 3
  },
  {
    label: '旧金山',
    value: 4
  },
  {
    label: '布宜诺斯艾利斯',
    value: 5
  },
  {
    label: '伊斯坦布尔',
    value: 6
  },
  {
    label: '拜占庭',
    value: 7
  },
  {
    label: '君士坦丁堡',
    value: 8
  },
  {
    label: '墨尔本',
    value: 9
  }
])
const optionsDisabled = ref<SelectOption[]>([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '上海市',
    value: 2,
    disabled: true
  },
  {
    label: '纽约市',
    value: 3
  },
  {
    label: '旧金山',
    value: 4
  },
  {
    label: '布宜诺斯艾利斯',
    value: 5
  },
  {
    label: '伊斯坦布尔',
    value: 6
  },
  {
    label: '拜占庭',
    value: 7
  },
  {
    label: '君士坦丁堡',
    value: 8
  }
])
const optionsCustom = ref<SelectOption[]>([
  {
    name: '北京市',
    id: 1
  },
  {
    name: '上海市',
    id: 2
  },
  {
    name: '纽约市',
    id: 3
  },
  {
    name: '旧金山',
    id: 4
  },
  {
    name: '布宜诺斯艾利斯',
    id: 5
  },
  {
    name: '伊斯坦布尔',
    id: 6
  },
  {
    name: '拜占庭',
    id: 7
  },
  {
    name: '君士坦丁堡',
    id: 8
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
const size = ref('large')
const selectedValue = ref<SelectProps['modelValue']>(5)
const primaryColor = ref('#ff6900')
const primaryShadowColor = ref('rgba(255, 116, 32, 0.1)')
watchEffect(() => {
  console.log('selectedValue', selectedValue.value)
})
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--select-primary-color-hover': colorPalettes[4],
    '--select-primary-color-focus': colorPalettes[4],
    '--select-primary-shadow-color': primaryShadowColor.value,
    '--select-item-bg-color-active': colorPalettes[0]
  }
  return style
}
function onChange(value: string | number, label: string, index: number) {
  console.log('value', value)
  console.log('label', label)
  console.log('index', index)
}
function onOpenChange(open: boolean) {
  console.log('openChange', open)
}
// 自定义过滤函数，当选项的 value 值大于 输入项时返回 true
function filter(inputValue: string, option: any) {
  return option.value > inputValue
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Select :options="options" v-model="selectedValue" @change="onChange" @openChange="onOpenChange" />
    <h2 class="mt30 mb10">禁用</h2>
    <Select :options="options" disabled v-model="selectedValue" />
    <h2 class="mt30 mb10">禁用选项</h2>
    <Select :options="optionsDisabled" v-model="selectedValue" />
    <h2 class="mt30 mb10">自定义节点字段名</h2>
    <Select :options="optionsCustom" label="name" value="id" v-model="selectedValue" />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Select :width="150" :height="36" search :options="options" v-model="selectedValue" />
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Select :options="options" v-model="selectedValue" :size="size" />
      <Select :options="options" search allow-clear v-model="selectedValue" :size="size" />
    </Space>
    <h2 class="mt30 mb10">支持清除</h2>
    <Select :options="options" allow-clear v-model="selectedValue" />
    <h2 class="mt30 mb10">支持搜索</h2>
    <Select :options="options" search allow-clear v-model="selectedValue" />
    <h2 class="mt30 mb10">自定义搜索过滤函数</h2>
    <Select :options="options" search :filter="filter" v-model="selectedValue" />
    <h2 class="mt30 mb10">自定义下拉面板数</h2>
    <Select :options="options" :max-display="8" v-model="selectedValue" />
    <h2 class="mt30 mb10">自定义下拉面板滚动条</h2>
    <Select :options="options" v-model="selectedValue" :scrollbar-props="{ size: 8, delay: 2000 }" />
    <h2 class="mt30 mb10">自定义主题色</h2>
    <Space vertical>
      <Space align="center"> primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> </Space>
      <Space align="center">
        primaryShadowColor:<ColorPicker style="width: 200px" v-model:value="primaryShadowColor" />
      </Space>
      <Select :style="getThemeStyle(primaryColor)" search :options="options" v-model="selectedValue" />
    </Space>
  </div>
</template>
