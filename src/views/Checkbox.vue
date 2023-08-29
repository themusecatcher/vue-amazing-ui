<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'

const options = ref([
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
const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: any[]) {
  console.log('change:', value)
}

const checkAll = ref(false) // 全选v-model
const indeterminate = computed(() => { // 全选样式控制
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    return false
  }
})
watch(checkAll, (to) => {
  console.log('checkAll:', to)
  if (to) {
    value.value = options.value.map(option => option.value)
  } else {
    value.value = []
  }
})
</script>
<template>
  <div>
    <h1>Checkbox 多选框</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Checkbox :options="options" v-model:value="value" @change="onChange" />
    <h2 class="mt30 mb10">禁用</h2>
    <Checkbox :options="options" v-model:value="value" disabled />
    <h2 class="mt30 mb10">禁用选项</h2>
    <Checkbox :options="optionsDisabled" v-model:value="value" />
    <h2 class="mt30 mb10">实现全选效果</h2>
    <Checkbox class="mb10" :indeterminate="indeterminate" v-model:checked="checkAll">Check All</Checkbox>
    <br/>
    <Checkbox :options="options" v-model:value="value" />
    <h2 class="mt30 mb10">垂直排列</h2>
    <Checkbox
      :options="options"
      vertical
      v-model:value="value" />
    <h2 class="mt30 mb10">自定义间距</h2>
    <Checkbox :gap="24" :options="options" v-model:value="value" />
    <h2 class="mt30 mb10">自定义展示区域宽高</h2>
    <Checkbox vertical :width="120" :height="150" :options="options" v-model:value="value" />
    <a-divider />
    <h2 class="mt30 mb10">Ant Design Vue 多选框组件</h2>
    <a-checkbox
      :indeterminate="indeterminate"
      v-model:checked="checkAll">
      Check all
    </a-checkbox>
    <br/>
    <a-checkbox-group
      v-model:value="value"
      @change="onChange"
      :options="options" />
  </div>
</template>
