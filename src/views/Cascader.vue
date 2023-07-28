<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    value: '1',
    label: '北京',
    children: [
      {
        value: '11',
        label: '北京市',
        children: [
          {
            value: '111',
            label: '东城区'
          },
          {
            value: '112',
            label: '西城区'
          },
          {
            value: '113',
            label: '海淀区'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '浙江',
    children: [
      {
        value: '21',
        label: '杭州市',
        children: [
          {
            value: '211',
            label: '西湖区'
          },
          {
            value: '212',
            label: '余杭区'
          }
        ]
      },
      {
        value: '22',
        label: '湖州市',
        children: [
          {
            value: '221',
            label: '吴兴区'
          },
          {
            value: '222',
            label: '安吉区'
          }
        ]
      }
    ]
  }
])
const selectedValue = ref(['2', '21', '212'])
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (values: (number|string)[], labels: string[]) {
  console.log('values:', values)
  console.log('labels:', labels)
}
function onAntChange (values: (number|string)[], selectedOptions: any) {
  console.log('values:', values)
  console.log('selectedOptions:', selectedOptions)
}
// 自定义过滤函数，但选项的 value 值大于 输入项时返回 true
function filter (inputValue: string, option: any) {
  return option.value > inputValue
}
</script>
<template>
  <div>
    <h1>Cascader 级联选择</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Cascader :options="options" v-model:selectedValue="selectedValue" />
    <h2 class="mt30 mb10">点击每级下拉时，选项值都会发生变化 (changeOnSelect: true)</h2>
    <Cascader
      :options="options"
      v-model:selectedValue="selectedValue"
      change-on-select
      @change="onChange" />
    <h2 class="mt30 mb10">只禁用第一级下拉 (disabled: [true])</h2>
    <Cascader
      :options="options"
      v-model:selectedValue="selectedValue"
      :disabled="[true]"
      @change="onChange" />
    <h2 class="mt30 mb10">支持清除 (allowClear: true)</h2>
    <Cascader
      :options="options"
      v-model:selectedValue="selectedValue"
      allow-clear
      @change="onChange" />
    <h2 class="mt30 mb10">支持搜索 (search: true)</h2>
    <Cascader
      :options="options"
      v-model:selectedValue="selectedValue"
      search
      @change="onChange" />
    <h2 class="mt30 mb10">自定义搜索过滤函数</h2>
    <Cascader
      :options="options"
      v-model:selectedValue="selectedValue"
      search
      :filter="filter"
      @change="onChange" />
    <h2 class="mt30 mb10">设置每级宽度都为120px，间距12px (width: 120)</h2>
    <Cascader
      :options="options"
      v-model:selectedValue="selectedValue"
      :width="120"
      :gap="12"
      @change="onChange" />
    <h2 class="mt30 mb10">Ant Design Vue 级联选择</h2>
    <a-cascader
      :options="options"
      style="width: 200px;"
      placeholder="Please select"
      :disabled="false"
      allowClear
      v-model:value="selectedValue"
      @change="onAntChange" />
  </div>
</template>
