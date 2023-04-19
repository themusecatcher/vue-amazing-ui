<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { vue } from '@codemirror/lang-vue'
import { oneDark } from '@codemirror/theme-one-dark'
interface Props {
  codeStyle?: CSSProperties // 图片样式
  dark?: boolean // 是否暗黑主题
  code?: string // 代码串
  // placeholder?: string // 占位文本
  // autofocus?: boolean // 自动聚焦
  // disabled?: boolean // 禁用输入行为和更改状态
  // indentWithTab?: boolean // 启用tab按键
  // tabSize?: number // tab按键缩进空格数
}
const props = withDefaults(defineProps<Props>(), {
  // placeholder: 'Code goes here...',
  codeStyle: () => { return {} },
  dark: false,
  code: '',
  // autofocus: false,
  // disabled: false,
  // indentWithTab: true,
  // tabSize: 2
})
const extensions = props.dark ? [vue(), oneDark] : [vue()]
const codeValue = ref(props.code)
const emits = defineEmits(['update:code', 'ready', 'change', 'focus', 'blur'])
function handleReady (payload: any) {
  // console.log('ready')
  emits('ready', payload)
}
function onChange (value: string, viewUpdate: any) {
  emits('change', value, viewUpdate)
  emits('update:code', value)
}
function onFocus (viewUpdate: any) {
  emits('focus', viewUpdate)
}
function onBlur (viewUpdate: any) {
  emits('blur', viewUpdate)
}
</script>
<template>
  <div>
    <Codemirror
      v-model="codeValue"
      :style="codeStyle"
      :extensions="extensions"
      @ready="handleReady"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      v-bind="$attrs"
    />
  </div>
</template>
<style lang="less" scoped>
:deep(.cm-editor) {
  border-radius: 8px;
  outline: none;
  border: 1px solid transparent;
  .cm-scroller {
    border-radius: 8px;
  }
}
:deep(.cm-focused) {
  border: 1px solid fade(@themeColor, 48%);
}
</style>
