<script setup lang="ts">
import MailSVG from './MailSVG.vue'
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
      <MailSVG />
    </template>
    <template #tooltip>
      <MailSVG /> Email me Anytime:
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
