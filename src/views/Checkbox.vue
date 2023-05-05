<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市上海市上海市上海市',
        value: 2,
        disabled: true
      },
      {
        label: '郑州市',
        value: 3
      },
      {
        label: '纽约市纽约市纽约市纽约市',
        value: 4
      },
      {
        label: '旧金山',
        value: 5
      },
      {
        label: '悉尼市',
        value: 6
      },
      {
        label: '伦敦市',
        value: 7
      },
      {
        label: '巴黎市',
        value: 8
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
const indeterminate = computed(() => {
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    return false
  }
}) // 全选样式控制
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
    <h2 class="mb10">Checkbox 多选框基本使用</h2>
    <Checkbox
      :options="options"
      @change="onChange"
      v-model:value="value"/>
    <h2 class="mt30 mb10">实现全选效果</h2>
    <Checkbox
      class="mb10"
      :indeterminate="indeterminate"
      v-model:checked="checkAll">
      Check All
    </Checkbox>
    <br/>
    <Checkbox
      :options="options"
      @change="onChange"
      v-model:value="value" />
    <h2 class="mt30 mb10">垂直排列</h2>
    <Checkbox
      :options="options"
      vertical
      @change="onChange"
      v-model:value="value"/>
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
