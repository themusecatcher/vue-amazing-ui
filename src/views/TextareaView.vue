<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { generate } from '@ant-design/colors'
const value = ref('')
const lazyValue = ref('')
const primaryColor = ref('#ff6900')
const primaryShadowColor = ref('rgba(255, 116, 32, 0.1)')
watchEffect(() => {
  console.log('value', value.value)
})
watchEffect(() => {
  console.log('lazyValue', lazyValue.value)
})
function getThemeStyle(color: string) {
  const colorPalettes = generate(color)
  const style = {
    '--textarea-primary-color-hover': colorPalettes[4],
    '--textarea-primary-color-focus': colorPalettes[4],
    '--textarea-primary-shadow-color': primaryShadowColor.value
  }
  return style
}
function onChange(e: Event) {
  console.log('change', e)
}
function onEnter(e: KeyboardEvent) {
  console.log('enter', e)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical>
      <Alert type="info">
        .lazy:
        <br />
        默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。
        <br />
        你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：
        <br />
        {{ '<Textarea v-model:value.lazy="msg" />' }}
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
    <Textarea :width="360" v-model:value="value" placeholder="Autosize height based on content lines" auto-size />
    <h2 class="mt30 mb10">自定义行数</h2>
    <Textarea
      :width="360"
      v-model:value="value"
      placeholder="Autosize height with minimum and maximum number of lines"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
    <h2 class="mt30 mb10">带清除图标</h2>
    <Textarea :width="360" v-model:value="value" placeholder="textarea with clear icon" allow-clear />
    <h2 class="mt30 mb10">带数字提示</h2>
    <Textarea :width="360" v-model:value="value" placeholder="textarea with show count" show-count :maxlength="10" />
    <h2 class="mt30 mb10">禁用</h2>
    <Textarea :width="360" v-model:value="value" placeholder="disabled textarea" disabled />
    <h2 class="mt30 mb10">自定义主题色</h2>
    <Space vertical>
      <Space align="center"> primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> </Space>
      <Space align="center">
        primaryShadowColor:<ColorPicker style="width: 200px" v-model:value="primaryShadowColor" />
      </Space>
      <Textarea
        :width="360"
        :style="getThemeStyle(primaryColor)"
        v-model:value="value"
        placeholder="custom theme textarea"
      />
    </Space>
  </div>
</template>
