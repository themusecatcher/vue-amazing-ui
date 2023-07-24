<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
const lazyValue = ref('')
watchEffect(() => {
  console.log('value:', value.value)
})
watchEffect(() => {
  console.log('lazyValue:', lazyValue.value)
})
function onChange (e: Event) {
  console.log('change e:', e)
}
function onEnter (e: KeyboardEvent) {
  console.log('enter e:', e)
}
function onAntChange (e: Event) {
  console.log('ant change:', e)
}
function onAntEnter (e: Event) {
  console.log('ant enter:', e)
}
</script>
<template>
  <div>
    <h1>Textarea 文本域</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space direction="vertical">
      <a-textarea
        v-model:value="value"
        placeholder="Autosize height based on content lines" />
      <Textarea
        v-model:value="value"
        placeholder="Autosize height based on content lines" />
    </Space>
    <h2 class="mt30 mb10">适应文本高度的文本域</h2>
    <Space direction="vertical" width="200px">
      <a-textarea
        v-model:value="value"
        placeholder="Autosize height based on content lines"
        auto-size
      />
      <Textarea
        v-model:value="value"
        placeholder="Autosize height based on content lines"
        auto-size
      />
    </Space>
    <h2 class="mt30 mb10">带移除图标</h2>
    <Input allow-clear v-model:value="value" placeholder="input with clear icon" suffix="RMB" />
    <h2 class="mt30 mb10">带数字提示</h2>
    <Input v-model:value="value" show-count allow-clear suffix="RMB"/>
    <h2 class="mt30 mb10">禁用</h2>
    <Input v-model:value="value" disabled show-count allow-clear suffix="RMB"/>
    <a-input v-model:value="value" disabled show-count allow-clear suffix="RMB" />
    <h2 class="mt30 mb10">ant design vue</h2>
  </div>
</template>
<style lang="less" scoped>
.u-svg {
  display: inline-flex;
  align-items: center;
  color: inherit;
  line-height: 0;
  text-align: center;
  vertical-align: -0.125em;
}
</style>
