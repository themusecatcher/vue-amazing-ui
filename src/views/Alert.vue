<script setup lang="ts">
function onClose (e: MouseEvent) {
  console.log(e, 'I was closed.')
}
</script>
<template>
  <div style="width: 425px;">
    <h1>Alert 警告提示</h1>
    <h2 class="mt30 mb10">共有四种样式 success、info、warning、error</h2>
    <Alert message="Info Text" />
    <Alert message="Success Text" type="success" />
    <Alert message="Warning Text" type="warn" />
    <Alert message="Error Text" type="error" />
    <h2 class="mt30 mb10">可关闭的警告提示</h2>
    <Alert
      message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
      type="warn"
      closable
      @close="onClose"
    />
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description Error Description"
      type="error"
      closable
      @close="onClose"
    />
  </div>
</template>
