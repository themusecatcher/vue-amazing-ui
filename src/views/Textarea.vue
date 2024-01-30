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
</script>
<template>
  <div>
    <h1>Textarea 文本域</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space direction="vertical">
      <Textarea
        v-model:value="value"
        placeholder="Basic usage rows 2"
        :rows="2"
        @change="onChange"
        @enter="onEnter" />
      .lazy: 默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。<br/>你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：
      <Textarea
        v-model:value.lazy="lazyValue"
        placeholder="Lazy usage rows 2"
        :rows="2"
        @change="onChange" />
    </Space>
    <h2 class="mt30 mb10">适应文本高度的文本域</h2>
    <Space direction="vertical" :width="300">
      <Textarea
        v-model:value="value"
        placeholder="Autosize height based on content lines"
        auto-size
      />
    </Space>
    <h2 class="mt30 mb10">设置行数</h2>
    <Space direction="vertical" :width="300">
      <Textarea
        v-model:value="value"
        placeholder="Autosize height with minimum and maximum number of lines"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
    </Space>
    <h2 class="mt30 mb10">带移除图标</h2>
    <Space direction="vertical" :width="300">
      <Textarea v-model:value="value" placeholder="textarea with clear icon" allow-clear />
    </Space>
    <h2 class="mt30 mb10">带数字提示</h2>
    <Space direction="vertical" :width="300">
      <Textarea v-model:value="value" show-count :maxlength="10" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Space direction="vertical" :width="300">
      <Textarea v-model:value="value" disabled />
    </Space>
  </div>
</template>
