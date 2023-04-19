<script setup lang="ts">
import { ref } from 'vue'

const code = ref(`<script setup lang="ts">
import { dateFormat, requestAnimationFrame, cancelAnimationFrame, rafTimeout, cancelRaf, throttle, debounce, add } from 'vue-amazing-ui'
<\/script>
`)
function onReady (payload: any) {
  console.log('ready:', payload)
}
function onChange (value: string, viewUpdate: any) {
  console.log('change:', value)
  console.log('change:', viewUpdate)
}
function onFocus (viewUpdate: any) {
  console.log('focus:', viewUpdate)
}
function onBlur (viewUpdate: any) {
  console.log('blur:', viewUpdate)
}
</script>
<template>
  <div>
    <h1>vue-codemirror 参考文档</h1>
    <ul class="m-list">
      <li>
        <a class="u-file" href="https://www.npmjs.com/package/vue-codemirror" target="_blank">vue-codemirror 插件</a>
      </li>
      <li>
        <a class="u-file" href="https://codemirror.net/" target="_blank">CodeMirror 官网</a>
      </li>
      <li>
        <a class="u-file" href="https://codemirror.net/docs/ref/" target="_blank">CodeMirror6 APIs</a>
      </li>
      <li>
        <a class="u-file" href="https://github.com/orgs/codemirror/repositories?q=lang-&type=all" target="_blank">CodeMirror6 Languages</a>
      </li>
      <li>
        <a class="u-file" href="https://github.com/orgs/codemirror/repositories?q=theme&type=all" target="_blank">CodeMirror6 Themes</a>
      </li>
    </ul>
    <h2 class="mt30 mb10">CodeMirror</h2>
    <CodeMirror
      v-model:code="code"
      dark
      :codeStyle="{ width: '1000px', height: '500px', fontSize: '16px' }"
      @ready="onReady"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur" />
  </div>
</template>
<style lang="less" scoped>

</style>
