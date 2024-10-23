<template>
  <FloatButton
    :bottom="96"
    type="primary"
    tooltip="成为赞助者✨"
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
  <BackTop />
  <Watermark fullscreen content="Vue Amazing UI" />
</template>

