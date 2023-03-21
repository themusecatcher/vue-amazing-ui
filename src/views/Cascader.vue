<script setup lang="ts">
import { ref, watch } from 'vue'

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
const selectedValue = ref<any[]>(['2', '21', '212'])
watch(selectedValue, (to) => {
  console.log('p to:', to)
})
function onChange (value: Array<number|string>, label: Array<string>) {
  selectedValue.value = value
  console.log('value:', value)
  console.log('label:', label)
}
function onAntChange (value: Array<number|string>, selectedOptions: any) {
  selectedValue.value = value
  console.log('value:', value)
  console.log('selectedOptions:', selectedOptions)
}
</script>
<template>
  <div>
    <h2 class="mb10">Cascader 级联选择基本使用</h2>
    <Cascader
      v-model:selectedValue="selectedValue"
      label="label"
      value="value"
      children="children"
      changeOnSelect
      :options="options"
      :zIndex="9"
      :gap="8"
      :provinceWidth="120"
      :cityWidth="120"
      :areaWidth="120"
      :width="120"
      :height="36"
      :provinceDisabled="false"
      :cityDisabled="false"
      :disabled="false"
      :num="6"
      @change="onChange" />
    <h2 class="mt30 mb10">Ant Design Vue 级联选择</h2>
    <a-cascader
      class="border-box"
      :options="options"
      style="width: 200px;"
      placeholder="Please select"
      :disabled="false"
      allowClear
      changeOnSelect
      v-model:value="selectedValue"
      @change="onAntChange" />
  </div>
</template>
<style lang="less" scoped>
.border-box {
  :deep(*) {
    box-sizing: border-box;
  }
}
</style>
