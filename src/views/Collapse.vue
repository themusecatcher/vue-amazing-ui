<script setup lang="ts">
import { ref, watch } from 'vue'

const collapseData = ref([
  {
    header: 'This is panel header 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    header: 'This is panel header 2',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world. hello world hello worldhello worldhello worldhello worldhello world'
  },
  {
    header: 'This is panel header 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
const activeKey = ref([1])
watch(activeKey, (to) => {
  console.log('p to:', to)
})

function onChange (key: any) {
  console.log('change:', key)
}
</script>
<template>
  <div>
    <Collapse :collapseData="collapseData" v-model:activeKey="activeKey" />
    <h2 class="mt30 mb10"></h2>
    <a-collapse v-model:activeKey="activeKey" @change="onChange">
      <a-collapse-panel
        v-for="(data, index) in collapseData" :key="index"
        :header="data.header">
        <p>{{ data.text }}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<style lang="less" scoped>

</style>
