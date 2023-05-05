<script setup lang="ts">
</script>
<template>
  <div>
  <h2 class="mb10">QRCode 二维码基本使用</h2>
  <QRCode value="https://blog.csdn.net/Dandrose"/>
  <h2 class="mt30 mb10">无边框，纠错等级M (bordered: false & errorLevel: M)</h2>
  <QRCode
    value="https://blog.csdn.net/Dandrose"
    errorLevel="M"/>
  <h2 class="mt30 mb10">自定义二维码颜色和背景色 (color: '#1677FF', backgroundColor: 'rgba(0,0,0,0.25)')</h2>
  <QRCode
    value="https://blog.csdn.net/Dandrose"
    color="#1677FF"
    backgroundColor="f5f5f5"/>
  </div>
</template>
