<script setup lang="ts">
function onClick () {
  console.log('click')
}
</script>
<template>
  <div>
    <h2 class="mb10">Button 按钮基本使用</h2>
    <Button
      class="mr30"
      type="default"
      effect="reverse"
      size="small"
      :borderRadius="4"
      :disabled="false"
      :center="false"
      @click="onClick">
      按钮Button
    </Button>
    <Button
      class="mr30"
      type="primary"
      effect="fade"
      size="middle"
      :width="120"
      :height="40"
      :borderRadius="4"
      :disabled="false"
      :center="false"
      @click="onClick">
      按钮Button
    </Button>
    <Button
      type="danger"
      effect="fade"
      size="large"
      :borderRadius="4"
      :disabled="false"
      :center="false"
      @click="onClick">
      按钮Button
    </Button>
    <h2 class="mt30 mb10">Ant Design Vue 按钮</h2>
    <a-button class="border-box" type="primary">按钮Button</a-button>
  </div>
</template>
<style lang="less" scoped>
.border-box {
  box-sizing: border-box;
}
</style>
