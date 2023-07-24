<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
function onClick (e: Event) {
  console.log('click', e)
}
</script>
<template>
  <div>
    <h1>Button 按钮</h1>
    <h2 class="mt30 mb10">基本使用，共五种类型</h2>
    <Button
      class="mr30"
      :loading="loading"
      @click="onClick">
      Default Button
    </Button>
    <Button
      class="mr30"
      effect="reverse"
      :loading="loading"
      @click="onClick">
      Reverse Button
    </Button>
    <Button
      class="mr30"
      type="primary"
      :loading="loading"
      @click="onClick">
      Primary Button
    </Button>
    <Button
      class="mr30"
      type="danger"
      :loading="loading"
      @click="onClick">
      Danger Button
    </Button>
    <Button
      class="mr30"
      type="dashed"
      :loading="loading"
      @click="onClick">
      Dashed Button
    </Button>
    <Button
      class="mr30"
      disabled
      :loading="loading"
      @click="onClick">
      Disabled Button
    </Button>
    <h2 class="mt30 mb10">大(large)、中(default)、小(small)三种尺寸</h2>
    <Button
      class="mr30"
      size="large"
      :loading="loading"
      @click="onClick">
      Default Button
    </Button>
    <Button
      class="mr30"
      :loading="loading"
      @click="onClick">
      Default Button
    </Button>
    <Button
      size="small"
      :loading="loading"
      @click="onClick">
      Default Button
    </Button>
    <h2 class="mt30 mb10">自定义按钮宽高 (width: 150 & height: 40)</h2>
    <Button
      class="mr30"
      :width="150"
      :height="40"
      :loading="loading"
      @click="onClick">
      Default Button
    </Button>
    <h2 class="mt30 mb10">加载中状态</h2>
    <Button
      class="mr30"
      loading
      @click="onClick">
      Default Button
    </Button>
    <h3 class="mt30">Loading state: <Switch v-model:checked="loading" /></h3>
    <h2 class="mt30 mb10">Ant Design Vue 按钮</h2>
    <a-button type="default" :loading="loading" @click="onClick">按钮Button</a-button>
  </div>
</template>
