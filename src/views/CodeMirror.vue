<script setup lang="ts">

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
        <a class="u-file" href="https://codemirror.net/" target="_blank">CodeMirror官网</a>
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
      :codeStyle="{ width: '1000px', height: '400px', fontSize: '16px' }"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur" />
  </div>
</template>
<style lang="less" scoped>

</style>
