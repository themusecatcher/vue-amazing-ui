<script setup lang="ts">
function onClose (e: MouseEvent) {
  console.log(e, 'I was closed.')
}
</script>
<template>
  <div>
    <h1>Badge 徽标数</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h2 class="mt30 mb10">状态点</h2>
    <Badge status="success" />
    <Badge status="error" />
    <Badge status="default" />
    <Badge status="processing" />
    <Badge status="warn" />
    <br />
    <Badge status="success" text="Success" />
    <br />
    <Badge status="error" text="Error" />
    <br />
    <Badge status="default" text="Default" />
    <br />
    <a-badge status="processing" text="Processing" />
    <br />
    <a-badge status="warn" text="warning" />
  </div>
</template>
