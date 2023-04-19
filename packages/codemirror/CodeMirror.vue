<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { vue } from '@codemirror/lang-vue'
import { oneDark } from '@codemirror/theme-one-dark'

const code = ref(`<script setup lang="ts">
import { dateFormat, requestAnimationFrame, cancelAnimationFrame, rafTimeout, cancelRaf, throttle, debounce, add } from 'vue-amazing-ui'

<\/script>
<script setup lang="ts">
import { dateFormat, requestAnimationFrame, cancelAnimationFrame, rafTimeout, cancelRaf, throttle, debounce, add } from 'vue-amazing-ui'

<\/script>`)
const extensions = [vue(), oneDark]

// Codemirror EditorView instance ref
const view = shallowRef() // ref() 的浅层作用形式，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的
function handleReady (payload: any) {
  view.value = payload.view
  console.log(view.value)
}
// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r:number, range: any) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  // more state info ...
  // return ...
}

interface Props {
  placeholder?: string // 占位文本
  codeStyle?: CSSProperties // 图片样式
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Code goes here...',
  codeStyle: () => { return {} }
})
const emits = defineEmits(['change', 'focus', 'blur'])
function onChange (value: string, viewUpdate: any) {
  emits('change', value, viewUpdate)
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
      v-model="code"
      :placeholder="placeholder"
      :style="codeStyle"
      :autofocus="true"
      indent-with-tab
      :tab-size="2"
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
  .cm-scroller {
    border-radius: 8px;
    .cm-gutterElement span {
    }
  }
}
</style>
