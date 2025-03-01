<script setup lang="ts">
import { SoundOutlined } from '@ant-design/icons-vue'
import MailSVG from './MailSVG.vue'
import ArrowDownSVG from './ArrowDownSVG.vue'
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
    v-if="!hideSponsor"
    :bottom="220"
    type="primary"
    tooltip="成为赞助者 ✨"
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
      <span style="font-size: 14px; font-weight: 600">赞助</span>
    </template>
  </FloatButton>
  <FloatButton
    :bottom="160"
    type="primary"
    :tooltip-props="{
      maxWidth: 200,
      tooltipStyle: {
        fontWeight: 500,
        padding: '8px 12px'
      }
    }"
  >
    <template #icon>
      <SoundOutlined />
    </template>
    <template #tooltip> 文档网站部署在静态网站服务 GitHub Pages，为了您的流程访问，建议打开代理 </template>
  </FloatButton>
  <FloatButton
    :bottom="100"
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
      <MailSVG /> Email Me<ArrowDownSVG />
      <br />
      themusecatcher@163.com
    </template>
  </FloatButton>
  <BackTop v-if="!hideBackTop" />
  <Watermark v-if="!hideWatermark" fullscreen content="Vue Amazing UI" />
</template>
