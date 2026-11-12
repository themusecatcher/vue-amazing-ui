---
layout: home

title: Vue Amazing UI
titleTemplate: Amazing UI Components Library
description: 基于 Vue3 + TypeScript + Vite 开发的 Amazing UI 组件库，主题可调、支持明暗双主题与按需引入，全量 TypeScript 与 SFC 编写，支持服务端渲染

hero:
  name: Vue Amazing UI
  text: Amazing UI 组件库
  tagline: Vue3 + TypeScript + Vite 开发
  image:
    src: /amazing-logo.svg
    alt: Vue Amazing UI
  actions:
    - theme: brand
      text: ✨ 开始使用
      link: /guide/features
    - theme: alt
      text: GitHub
      link: https://github.com/themusecatcher/vue-amazing-ui
features:
  - icon: 💡
    title: 最新技术
    details: '基于 Vue@3.5.45 · TypeScript@5.9.3 · Vite@7.3.7 等最新技术栈'
  - icon: 🚀
    title: 开箱即用
    details: 目前共包含 73 个基础 UI 组件以及 16 个工具函数，持续探索更新中
  - icon: 😉
    title: 有点意思
    details: '主题可调，明暗双主题，全量使用 TypeScript 和 SFC，支持 tree shaking'
---

<GlobalElement />

<script setup lang="ts">
import { onMounted } from 'vue'
import { setLabel } from './.vitepress/utils/versionLabel'
import { setupHeroTitleAnimation } from './.vitepress/utils/heroTitle'
import pkg from '../package.json'

onMounted(() => {
  setLabel(pkg.version)
  setupHeroTitleAnimation()
})
</script>
