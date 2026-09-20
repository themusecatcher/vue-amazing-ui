<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
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
// 长列表（10 项）：默认 maxDisplay 为 8，会展示 8 项并出现滚动条
const optionsLong = ref<SelectOption[]>([
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
    label: '巴黎',
    value: 9
  },
  {
    label: '里约热内卢',
    value: 10
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
const placementOptions = [
  {
    label: 'bottom',
    value: 'bottom'
  },
  {
    label: 'top',
    value: 'top'
  }
]
const size = ref<SelectProps['size']>('large')
// 各分节独立绑定：避免操作一个用例时其余用例同步联动，便于单独核对每个特性
const basicValue = ref<SelectProps['modelValue']>(5)
const disabledValue = ref<SelectProps['modelValue']>(5)
const disabledOptionValue = ref<SelectProps['modelValue']>(5)
const fieldNameValue = ref<SelectProps['modelValue']>(5)
const customStyleValue = ref<SelectProps['modelValue']>(5)
const sizeValue = ref<SelectProps['modelValue']>(5)
const clearableValue = ref<SelectProps['modelValue']>(5)
const searchableValue = ref<SelectProps['modelValue']>(5)
const filterValue = ref<SelectProps['modelValue']>(5)
const keyboardValue = ref<SelectProps['modelValue']>(5)
const placementValue = ref<SelectProps['modelValue']>(5)
// 长列表（10 项）的选中项，用于观察面板滚动与「打开时自动滚到选中项」
const maxDisplayValue = ref<SelectProps['modelValue']>(5)
const scrollbarValue = ref<SelectProps['modelValue']>(5)
const placement = ref<SelectProps['placement']>('bottom')
watchEffect(() => {
  console.log('basicValue', basicValue.value)
})
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
// 挂载容器：不传 to 时优先挂到最近的承载层内容容器
const toValue = ref<SelectProps['modelValue']>(5)
// 下拉面板样式的公开入口：popupClassName / dropdownMenuStyle
const panelValue = ref<SelectProps['modelValue']>(1)
const panelZIndexValue = ref<SelectProps['modelValue']>(1)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Select :options="options" v-model="basicValue" @change="onChange" @openChange="onOpenChange" />
    <h2 class="mt30 mb10">禁用</h2>
    <Select :options="options" disabled v-model="disabledValue" />
    <h2 class="mt30 mb10">禁用选项</h2>
    <Select :options="optionsDisabled" v-model="disabledOptionValue" />
    <h2 class="mt30 mb10">自定义节点字段名</h2>
    <Select :options="optionsCustom" label="name" value="id" v-model="fieldNameValue" />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Select :width="150" :height="36" search :options="options" v-model="customStyleValue" />
    <h2 class="mt30 mb10">自定义下拉面板</h2>
    <p class="mb10">
      通过 <code>popupClassName</code> 自定义面板类名、<code>dropdownMenuStyle</code> 设置面板样式，两者均落在
      <code>Teleport</code> 后的面板上，需写在全局样式中；<code>zIndex</code> 用于覆盖面板层级（默认 1050）
    </p>
    <Flex gap="large" wrap="wrap">
      <Flex vertical gap="small" align="start">
        <span class="demo-label">默认面板</span>
        <Select :options="options" v-model="panelValue" :width="180" />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">自定义类名与样式</span>
        <Select
          :options="options"
          v-model="panelValue"
          :width="180"
          popup-class-name="custom-select-panel"
          :dropdown-menu-style="{
            background: 'rgba(255, 105, 0, 0.05)',
            border: '1px solid #ff6900',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(255, 105, 0, 0.25)'
          }"
        />
      </Flex>
      <Flex vertical gap="small" align="start">
        <span class="demo-label">自定义层级</span>
        <Select :options="options" v-model="panelZIndexValue" :width="180" :z-index="1100" />
      </Flex>
    </Flex>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Space align="center" :size="24">
        <Select :options="options" v-model="sizeValue" :size="size" />
        <Select :options="options" search allow-clear v-model="sizeValue" :size="size" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">支持清除</h2>
    <Select :options="options" allow-clear v-model="clearableValue" />
    <h2 class="mt30 mb10">支持搜索</h2>
    <Select :options="options" search allow-clear v-model="searchableValue" />
    <h2 class="mt30 mb10">搜索过滤函数</h2>
    <Select :options="options" search :filter="filter" v-model="filterValue" />
    <h2 class="mt30 mb10">键盘操作</h2>
    <p class="mb10">
      聚焦后按 <code>↑</code> <code>↓</code> 移动高亮（自动跳过禁用项、到达列表端点时环形回绕并滚入可视区），按
      <code>Enter</code> 选中，按 <code>Esc</code> 关闭面板；面板收起时按 <code>↑</code> <code>↓</code> 可直接展开
    </p>
    <Space align="start" :size="40">
      <Select :options="options" v-model="keyboardValue" />
      <Select :options="optionsDisabled" v-model="keyboardValue" />
    </Space>
    <h2 class="mt30 mb10">下拉面板弹出位置</h2>
    <Space vertical>
      <Radio :options="placementOptions" v-model:value="placement" button button-style="solid" />
      <Space align="center" :size="24">
        <Select :options="options" v-model="placementValue" :placement="placement" />
        <Select :options="options" search allow-clear v-model="placementValue" :placement="placement" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">下拉面板挂载容器</h2>
    <p class="mb10">
      不传 <code>to</code> 时面板优先挂到最近的承载层内容容器（<code>Modal</code> / <code>Drawer</code> /
      <code>Dialog</code> 卡片或上层浮层面板），无承载层时为 <code>body</code>；设为 <code>false</code> 时面板留在原地
    </p>
    <Space>
      <Select :options="options" v-model="toValue" :width="200" />
      <Select :options="options" v-model="toValue" :to="false" :width="200" />
    </Space>
    <h2 class="mt30 mb10">下拉面板数</h2>
    <p class="mb10"> 选项较多时面板默认展示 8 项，超出部分通过滚动查看；可通过 <code>maxDisplay</code> 调整展示项数 </p>
    <Space align="start" :size="40">
      <Select :options="optionsLong" v-model="maxDisplayValue" />
      <Select :options="optionsLong" v-model="maxDisplayValue" :max-display="4" />
    </Space>
    <h2 class="mt30 mb10">下拉面板滚动条</h2>
    <p class="mb10">通过 <code>scrollbarProps</code> 定制面板内滚动条</p>
    <Select :options="optionsLong" v-model="scrollbarValue" :scrollbar-props="{ size: 8, delay: 2000 }" />
  </div>
</template>
<style lang="less">
/* 面板经 Teleport 挂载，scoped 样式无法命中，故用 popupClassName 下发类名 + 全局样式；
   选项规则把类名重复一次以提升特异性，覆盖带 scope 属性的组件内规则 */
@demo-primary: #ff6900;

.custom-select-panel {
  &.custom-select-panel .select-options-panel .select-option {
    color: darken(@demo-primary, 12%);
    font-weight: 500;
  }
  .select-options-panel .select-option.option-hover {
    background: fade(@demo-primary, 10%);
  }
  .select-options-panel .select-option.option-selected {
    color: darken(@demo-primary, 12%);
    background: fade(@demo-primary, 16%);
  }
}
.demo-label {
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}
</style>
