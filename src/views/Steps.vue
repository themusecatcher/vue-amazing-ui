<script setup lang="ts">
import { ref, watch } from 'vue'
const steps = ref([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  },
  {
    title: 'Step 4',
    description: 'description 4'
  },
  {
    title: 'Step 5',
    description: 'description 5'
  }
])
const current = ref(3)
watch(current, (to) => {
  console.log('p to:', to)
})

function onChange (index: number) { // 父组件获取切换后的选中步骤
  console.log('current:', index)
}
function onPrevious () {
  if (current.value > 1) {
    current.value--
  }
}
function onNext () {
  if (steps.value.length >= current.value) {
    current.value++
  }
}
</script>
<template>
  <div>
    <h2 class="mb10">Steps 步骤条基本使用</h2>
    <Steps
      :steps="steps"
      :width="'100%'"
      :descMaxWidth="160"
      :current="current"
      @change="onChange" />
    <h2 class="mb10">步骤条设置 v-model: current 后可点击</h2>
    <Steps
      :steps="steps"
      :width="'100%'"
      :descMaxWidth="160"
      v-model:current="current"
      @change="onChange" />
    <Button @click="onPrevious()" size="large" class="mt30 mr30">Previous</Button>
    <Button @click="onNext()" size="large">Next</Button>
    <h2 class="mt30 mb10">Ant Design Vue 步骤条</h2>
    <a-steps class="border-box" v-model:current="current">
      <a-step title="Step 1" description="This is a description." />
      <a-step title="Step 2" description="This is a description." />
      <a-step title="Step 3" description="This is a description." />
      <a-step title="Step 4" description="This is a description." />
      <a-step title="Step 5" description="This is a description." />
    </a-steps>
  </div>
</template>
<style lang="less" scoped>
.border-box {
  :deep(*) {
    box-sizing: border-box;
  }
}
</style>
