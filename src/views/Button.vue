<script setup lang="ts">
function onClick () {
  console.log('click')
}
</script>
<template>
  <div>
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
  </div>
</template>
<style lang="less" scoped>
</style>
