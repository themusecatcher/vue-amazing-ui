<script setup lang="ts">
import { PICKER_ICONS } from './icons'
import type { PickerIconName } from './icons'
export interface PickerIconProps {
  name: PickerIconName // 图标名
}
defineProps<PickerIconProps>()
</script>
<template>
  <svg
    class="picker-icon"
    width="1em"
    height="1em"
    viewBox="64 64 896 896"
    fill="currentColor"
    focusable="false"
    aria-hidden="true"
  >
    <path v-for="(path, index) in PICKER_ICONS[name]" :key="index" :d="path" />
  </svg>
</template>
