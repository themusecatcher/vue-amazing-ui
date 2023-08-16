<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPages = ref([
  {
    key: 1,
    tab: '八分'
  },
  {
    key: 2,
    tab: '开卷八分钟'
  }
])
const activeKey = ref(1)
watchEffect(() => { // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
</script>
<template>
  <Tabs class="m-tabs" :tab-pages="tabPages" v-model:active-key="activeKey">
    <template #1>
      <iframe class="m-iframe-ideal" src="https://www.vistopia.com.cn/detail/11"></iframe>
    </template>
    <template #2>
      <iframe class="m-iframe-ideal" src="https://www.vistopia.com.cn/detail/23"></iframe>
    </template>
  </Tabs>
</template>
<style lang="less" scoped>
.m-tabs {
  height: calc(100vh - 72px);
}
.m-iframe-ideal {
  width: 100%;
  height: 100%;
  border: none;
  object-fit: contain;
}
</style>
