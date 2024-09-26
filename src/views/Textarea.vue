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
function onChange(e: Event) {
  console.log('change e:', e, lazyValue.value)
}
function onEnter(e: KeyboardEvent) {
  console.log('enter e:', e, lazyValue.value)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical>
      <Alert>
        <template #message>
          .lazy:
          <br />
          默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。
          <br />
          你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：
          <br />
          {{ '<Textarea v-model:value.lazy="msg" />' }}
        </template>
      </Alert>
      <Textarea v-model:value="value" placeholder="Basic usage rows 2" :rows="2" @change="onChange" @enter="onEnter" />
      <Textarea
        v-model:value.lazy="lazyValue"
        placeholder="Lazy usage rows 2"
        :rows="2"
        @change="onChange"
        @enter="onEnter"
      />
    </Space>
    <h2 class="mt30 mb10">适应文本高度的文本域</h2>
    <Space vertical :width="300">
      <Textarea v-model:value="value" placeholder="Autosize height based on content lines" auto-size />
    </Space>
    <h2 class="mt30 mb10">自定义行数</h2>
    <Space vertical :width="300">
      <Textarea
        v-model:value="value"
        placeholder="Autosize height with minimum and maximum number of lines"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
    </Space>
    <h2 class="mt30 mb10">带清除图标</h2>
    <Space vertical :width="300">
      <Textarea v-model:value="value" placeholder="textarea with clear icon" allow-clear />
    </Space>
    <h2 class="mt30 mb10">带数字提示</h2>
    <Space vertical :width="300">
      <Textarea v-model:value="value" placeholder="textarea with show count" show-count :maxlength="10" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Space vertical :width="300">
      <Textarea v-model:value="value" placeholder="disabled textarea" disabled />
    </Space>
  </div>
</template>
