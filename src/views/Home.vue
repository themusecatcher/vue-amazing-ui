<script setup lang="ts">

</script>
<template>
  <div class="home">
    <h1>Vue Amazing UI</h1>
    <p class="u-tip mb10 mt10">该组件库采用 Vue3 + TS + Vite3 + Less 实现！</p>
    <p class="u-tip">开箱即用！</p>
    <h2 class="mt30">主要有以下三种使用方式：</h2>
    <ul class="ml20">
      <li class="u-tip mb10 mt10">（yarn add vue-amazing-ui）安装组件库后，全局引入所有组件</li>
      <li class="u-tip mb10">（yarn add vue-amazing-ui）安装组件库后，按需引入部分组件</li>
      <li class="u-tip mb10"> git clone<a href="https://github.com/themusecatcher/vue-amazing-ui" target="_blank">组件库项目</a>到本地后，从packages下单独拷贝某个单文件组件（SFC）到需要组件的项目内使用。</li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.u-tip {
  font-size: 16px;
  color: #333;
}
</style>
