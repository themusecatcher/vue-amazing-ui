<script setup lang="ts">
</script>
<template>
  <div>
  <h2 class="mb10">QRCode 二维码基本使用</h2>
  <QRCode
    value="https://blog.csdn.net/Dandrose"
    :size="180"
    :bordered="true"
    color="#000"
    backgroundColor="#FFF"
    :scale="8"
    errorLevel="H"/>
  </div>
</template>
<style lang="less" scoped>
</style>
