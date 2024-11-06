<script setup lang="ts">
interface Props {
  hideBackTop?: boolean // 是否隐藏 BackTop 组件
  hideWatermark?: boolean // 是否隐藏 Watermark 组件
}
withDefaults(defineProps<Props>(), {
  hideBackTop: false,
  hideWatermark: false
})
</script>
<template>
  <FloatButton
    :bottom="100"
    type="primary"
    tooltip="✨ 成为赞助者"
    :tooltip-props="{
      tooltipStyle: {
        fontWeight: 500
      }
    }"
    href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
    target="_blank"
  >
    <template #description>
      <span style="font-size: 14px; font-weight: 600;">赞助</span>
    </template>
  </FloatButton>
  <BackTop v-if="!hideBackTop" />
  <Watermark v-if="!hideWatermark" fullscreen content="Vue Amazing UI" />
</template>

