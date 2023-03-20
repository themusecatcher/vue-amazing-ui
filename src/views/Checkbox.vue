<script setup lang="ts">
import { ref, watch, computed } from 'vue'

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
watch(value, (to) => {
  console.log('p to:', to)
})
function onChange (value: any[]) {
  console.log('change:', value)
}

const checkAll = ref(false) // 全选v-model
const indeterminate = computed(() => {
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    false
  }
}) // 全选样式控制
watch(checkAll, (to) => {
  console.log('p to:', to)
  if (to) {
    value.value = options.value.map(option => option.value)
  } else {
    value.value = []
  }
})
</script>
<template>
  <div>
    <h2>Checkbox 组件</h2>
    <p class="u-intro">用于在一组可选项中进行多项选择</p>
    <Checkbox
      :options="options"
      :gap="16"
      :vertical="false"
      @change="onChange"
      v-model:value="value"/>
    <h2 class="mt30 mb10">Checkbox 实现全选效果</h2>
    <Checkbox
      class="mb10"
      :indeterminate="indeterminate"
      v-model:checked="checkAll">
      Check All
    </Checkbox>
    <Checkbox
      :options="options"
      :gap="16"
      :vertical="false"
      @change="onChange"
      v-model:value="value" />
    <a-divider />
    <h2 class="mt30 mb10">Ant Design Vue 的 a-checkbox-group 组件</h2>
    <a-checkbox
      :indeterminate="indeterminate"
      v-model:checked="checkAll"
      class="border-box">
      Check all
    </a-checkbox>
    <br/>
    <a-checkbox-group
      class="border-box"
      v-model:value="value"
      @change="onChange"
      :options="options" />
  </div>
</template>
<style lang="less" scoped>
.border-box {
  margin-bottom: 10px;
  :deep(*) {
    box-sizing: border-box;
  }
}
</style>
