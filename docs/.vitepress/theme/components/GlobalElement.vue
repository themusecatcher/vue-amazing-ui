<script setup lang="ts">
interface Props {
  hideSponsor?: boolean // 是否隐藏 赞助 按钮
  hideBackTop?: boolean // 是否隐藏 BackTop 组件
  hideWatermark?: boolean // 是否隐藏 Watermark 组件
}
withDefaults(defineProps<Props>(), {
  hideSponsor: false,
  hideBackTop: false,
  hideWatermark: false
})
</script>
<template>
  <FloatButton
    :bottom="!hideSponsor ? 160 : 100"
    type="primary"
    :tooltip-props="{
      tooltipStyle: {
        textAlign: 'center',
        fontWeight: 500,
        padding: '8px 12px'
      }
    }"
  >
    <template #icon>
       <span class="mail-icon">
        <svg width="1.25em" height="1.25em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <path d="M3 7l9 6l9-6"></path>
          </g>
        </svg>
      </span>
    </template>
    <template #tooltip>
      <span class="mail-icon">
        <svg width="1.25em" height="1.25em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <path d="M3 7l9 6l9-6"></path>
          </g>
        </svg>
      </span> Email me Anytime:
      <br/>
      themusecatcher@163.com
    </template>
  </FloatButton>
  <FloatButton
    v-if="!hideSponsor"
    :bottom="100"
    type="primary"
    tooltip="✨ 成为赞助者"
    :tooltip-props="{
      tooltipStyle: {
        fontWeight: 500,
        padding: '8px 12px'
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
<style lang="less" scoped>
.mail-icon {
  display: inline-block;
  color: inherit;
  vertical-align: -0.25em;
}
</style>

