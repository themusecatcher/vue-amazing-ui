---
layout: home

title: Vue Amazing UI
titleTemplate: Amazing UI Components Library

hero:
  name: Vue Amazing UI
  text: Amazing UI 组件库
  tagline: 基于 Vue3 + TypeScript + Vite 开发
  image:
    src: /amazing-logo.svg
    alt: Vue Amazing UI
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/features
    - theme: alt
      text: 成为赞助者 ✨
      link: https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html
features:
  - icon: 💡
    title: 最新技术
    details: '基于 Vue@3.5.13、TypeScript@5.7.2、Vite@6.0.5 等最新技术栈开发'
  - icon: 🚀
    title: 开箱即用
    details: 目前共包含 63 个基础 UI 组件以及 16 个工具函数，持续探索更新中...
  - icon: 😉
    title: 有点意思
    details: '全量使用 TypeScript，支持 tree shaking，全部采用单文件组件（SFC）'
---

<GlobalElement hide-sponsor />

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
  const developDesc = `基于 Vue@${getVersion('vue')}、TypeScript@${getVersion('typescript')}、Vite@${getVersion('vite')} 等最新技术栈开发`
  featureDetails.textContent = developDesc
}
onMounted(() => {
  fetchVersion()
  fetchDesc()
})
</script>
