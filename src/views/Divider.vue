<script setup lang="ts">
</script>
<template>
  <div>
    <h2 class="mb10">Divider 分割线基本使用</h2>
    <Divider>Center Text</Divider>
    <h2 class="mt30 mb10">Divider 中间无文字</h2>
    <Divider />
    <h2 class="mt30 mb10">Divider (orientation: left)</h2>
    <Divider orientation="left">Left Text</Divider>
    <h2 class="mt30 mb10">Divider (orientation: right)</h2>
    <Divider orientation="right">Right Text</Divider>
    <h2 class="mt30 mb10">Divider (orientation: left & orientation-margin: 120)</h2>
    <Divider orientation="left" :orientation-margin="120">Left Text</Divider>
    <h2 class="mt30 mb10">Divider (orientation: right & orientation-margin: 120)</h2>
    <Divider orientation="right" :orientation-margin="120">Right Text</Divider>
    <h2 class="mt30 mb10">Divider (dashed: true)</h2>
    <Divider dashed>Center Text</Divider>
  </div>
</template>
<style lang="less" scoped>
</style>
