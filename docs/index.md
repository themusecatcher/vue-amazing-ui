---
layout: home

title: Vue Amazing UI
titleTemplate: Amazing UI Components Library

hero:
  name: Vue Amazing UI
  text: Amazing UI 组件库
  tagline: 基于 Vue3 + TS + Vite 开发
  image:
    src: /logo-with-shadow.png
    alt: Vue Amazing UI
  actions:
    - theme: brand
      text: Get Started
      link: /guide/features
    - theme: alt
      text: View on GitHub
      link: https://github.com/themusecatcher/vue-amazing-ui
    - theme: alt
      text: View on NPM
      link: https://www.npmjs.com/package/vue-amazing-ui

features:
  # - icon: 💡
  #   title: Instant Server Start
  #   details: On demand file serving over native ESM, no bundling required!
  # - icon: ⚡️
  #   title: Lightning Fast HMR
  #   details: Hot Module Replacement (HMR) that stays fast regardless of app size.
  # - icon: 🛠️
  #   title: Rich Features
  #   details: Out-of-the-box support for TypeScript, JSX, CSS and more.
---

<script setup>
import { onMounted } from 'vue'
import { fetchReleaseTag } from './.vitepress/utils/fetchReleaseTag.js'

onMounted(() => {
  fetchReleaseTag()
})
</script>
