<script setup lang="ts">
import { ref } from 'vue'

const tip = ref('加载中...')
const spinning = ref(true)

</script>

<template>
  <div style="width: 500px; height: 200px; margin: 30px auto;">
    <Spin :tip="tip" :spinning="spinning" size="small">
      <p class="spin-content">当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，延迟`delay`ms时间后，显示 loading 效果；如果 spinning 状态在 `delay` 时间内结束，则不显示 loading 状态；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。</p>
    </Spin>
    <a-spin :tip="tip" size="default" :spinning="spinning"></a-spin>
  </div>
</template>

<style lang="less" scoped>
</style>
