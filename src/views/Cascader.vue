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
const optionsDisabled = ref([
  {
    value: '1',
    label: '北京',
    disabled: true,
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
const optionsCustom = ref([
  {
    code: '1',
    name: '北京',
    items: [
      {
        code: '11',
        name: '北京市',
        items: [
          {
            code: '111',
            name: '东城区'
          },
          {
            code: '112',
            name: '西城区'
          }
        ]
      }
    ]
  },
  {
    code: '2',
    name: '浙江',
    items: [
      {
        code: '21',
        name: '杭州市',
        items: [
          {
            code: '211',
            name: '西湖区'
          },
          {
            code: '212',
            name: '余杭区'
          }
        ]
      },
      {
        code: '22',
        name: '湖州市',
        items: [
          {
            code: '221',
            name: '吴兴区'
          },
          {
            code: '222',
            name: '安吉区'
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
    <Cascader :options="options" v-model:selected-value="selectedValue" />
    <h2 class="mt30 mb10">禁用</h2>
    <Cascader :options="options" v-model:selected-value="selectedValue" disabled />
    <h2 class="mt30 mb10">禁用某一级</h2>
    <h3 class="mb10">只禁用第一级：disabled: [true]</h3>
    <h3 class="mb10">禁用前两级：disabled: [true, true]</h3>
    <Cascader
      :options="options"
      v-model:selected-value="selectedValue"
      :disabled="[true]"
      @change="onChange" />
    <h2 class="mt30 mb10">禁用选项</h2>
    <h3 class="mb10">只需指定 options 里的 disabled 字段</h3>
    <Cascader
      :options="optionsDisabled"
      v-model:selected-value="selectedValue"
      @change="onChange" />
    <h2 class="mt30 mb10">选择即改变</h2>
    <Cascader
      :options="options"
      v-model:selected-value="selectedValue"
      change-on-select
      @change="onChange" />
    <h2 class="mt30 mb10">支持清除</h2>
    <Cascader
      :options="options"
      v-model:selected-value="selectedValue"
      allow-clear
      @change="onChange" />
    <h2 class="mt30 mb10">支持搜索</h2>
    <Cascader
      :options="options"
      v-model:selected-value="selectedValue"
      search
      @change="onChange" />
    <h2 class="mt30 mb10">自定义搜索过滤函数</h2>
    <Cascader
      :options="options"
      v-model:selected-value="selectedValue"
      search
      :filter="filter"
      @change="onChange" />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Cascader
      :options="options"
      v-model:selected-value="selectedValue"
      :width="160"
      :height="36"
      :gap="12"
      @change="onChange" />
    <h2 class="mt30 mb10">自定义字段名</h2>
    <Cascader
      :options="optionsCustom"
      v-model:selected-value="selectedValue"
      label="name"
      value="code"
      children="items"
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
