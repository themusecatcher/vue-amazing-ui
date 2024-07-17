---
layout: home

title: Vue Amazing UI
titleTemplate: Amazing UI Components Library

hero:
  name: Vue Amazing UI
  text: Amazing UI 组件库
  tagline: 基于 Vue3 + TS + Vite 开发
  image:
    src: /amazing-logo.svg
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
  - icon: 🛠️
    title: 最新的技术
    details: '采用 Vue@3.4.31 + TypeScript@5.5.3 + Vite@5.3.3 + Less@4.2.0'
  - icon: 🚀
    title: 开箱即可用
    details: 共有 58 个常用基础 UI 组件以及 13 个常用工具函数，持续探索优化中...
  - icon: ⚡️
    title: 单文件组件
    details: '所有组件均为 SFC，样式全部采用 box-sizing: border-box; 模式'
---

<Watermark fullscreen content="Vue Amazing UI" />

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchVersion } from './.vitepress/utils/fetchVersion'
import pkg from '../package.json'

const dependencies = pkg.dependencies
const devDependencies = pkg.devDependencies
function getVersion (target: string): string {
  for (let name of Object.keys(dependencies)) {
    if (name === target) {
      return dependencies[name].replace('^', '')
    }
  }
  for (let name of Object.keys(devDependencies)) {
    if (name === target) {
      return devDependencies[name].replace('^', '')
    }
  }
  return ''
}
function fetchDesc () {
  const featureDetails: any = document.querySelector('div.VPFeatures.VPHomeFeatures > div.container > div.items :first-child > div.VPLink.no-icon.VPFeature .box > p.details')
  const developDesc = `采用 Vue@${getVersion('vue')} + TypeScript@${getVersion('typescript')} + Vite@${getVersion('vite')} + Less@${getVersion('less')}`
  featureDetails.textContent = developDesc
}
onMounted(() => {
  fetchVersion()
  fetchDesc()
})
</script>
