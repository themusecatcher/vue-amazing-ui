<script setup lang="ts">
function onClick () {
  console.log('click')
}
</script>
<template>
  <Button
    type="primary"
    effect="reverse"
    size="middle"
    :width="120"
    :height="40"
    :borderRadius="4"
    :disabled="false"
    :center="false"
    @click="onClick">
    按钮Button
  </Button>
</template>
<style lang="less" scoped>
</style>
