<script setup lang="ts">
import { ref, watch } from 'vue'

const checked = ref(false)
function onChange (checked: boolean) {
  console.log('checked:', checked)
}
watch(checked, (to) => {
  console.log('to:', to)
})
</script>

<template>
  <div>
    <Switch class="mb30" v-model:checked="checked" @change="onChange" checkedInfo="开" uncheckedInfo="关" :disabled="false" />
    <br/>
    <Switch class="mb30" v-model:checked="checked" @change="onChange" :disabled="false" />
    <br/>
    <Switch v-model:checked="checked" @change="onChange" :disabled="true" />
  </div>
</template>
<style lang="less" scoped>
</style>
