<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { generate } from '@ant-design/colors'
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
const selectedValue = ref(['2', '21', '212'])
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
function onChange(values: (number | string)[], labels: string[]) {
  console.log('values', values)
  console.log('labels', labels)
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
    <Cascader :options="options" v-model="selectedValue" />
    <h2 class="mt30 mb10">禁用</h2>
    <Cascader :options="options" v-model="selectedValue" disabled />
    <h2 class="mt30 mb10">禁用某一级</h2>
    <h3 class="mb10">只禁用第一级：disabled: [true]</h3>
    <h3 class="mb10">禁用前两级：disabled: [true, true]</h3>
    <Cascader :options="options" v-model="selectedValue" :disabled="[true]" @change="onChange" />
    <h2 class="mt30 mb10">禁用选项</h2>
    <h3 class="mb10">只需指定 options 里的 disabled 字段</h3>
    <Cascader :options="optionsDisabled" v-model="selectedValue" @change="onChange" />
    <h2 class="mt30 mb10">自定义字段名</h2>
    <Cascader
      :options="optionsCustom"
      v-model="selectedValue"
      label="name"
      value="code"
      children="items"
      @change="onChange"
    />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Cascader :options="options" v-model="selectedValue" :width="100" :height="36" :gap="12" @change="onChange" />
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Cascader :options="options" v-model="selectedValue" :size="size" @change="onChange" />
      <Cascader :options="options" v-model="selectedValue" :size="size" allow-clear search @change="onChange" />
    </Space>
    <h2 class="mt30 mb10">选择即改变</h2>
    <Cascader :options="options" v-model="selectedValue" change-on-select @change="onChange" />
    <h2 class="mt30 mb10">支持清除</h2>
    <Cascader :options="options" v-model="selectedValue" allow-clear @change="onChange" />
    <h2 class="mt30 mb10">支持搜索</h2>
    <Cascader :options="options" v-model="selectedValue" search @change="onChange" />
    <h2 class="mt30 mb10">自定义搜索过滤函数</h2>
    <Cascader :options="options" v-model="selectedValue" allow-clear search :filter="filter" @change="onChange" />
    <h2 class="mt30 mb10">自定义主题色</h2>
    <Space vertical>
      <Space align="center"> primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> </Space>
      <Space align="center">
        primaryShadowColor:<ColorPicker style="width: 200px" v-model:value="primaryShadowColor" />
      </Space>
      <Cascader
        :style="getThemeStyle(primaryColor)"
        :options="options"
        v-model="selectedValue"
        allow-clear
        search
        @change="onChange"
      />
    </Space>
  </div>
</template>
