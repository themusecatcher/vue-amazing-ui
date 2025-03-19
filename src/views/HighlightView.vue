<script setup lang="ts">
import { ref } from 'vue'
const text = ref(
  'Vue Amazing UI 是一个 Vue3 的组件库，主题可调，全量使用 TypeScript 和 SFC，支持 tree shaking，有点意思'
)
const patterns = ref(['Vue Amazing UI', 'Vue3', 'TypeScript', 'SFC', 'tree shaking'])
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Highlight :text="text" :patterns="patterns" />
    <h2 class="mt30 mb10">样式</h2>
    <Highlight
      text="Vue Amazing UI 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接"
      :patterns="['Vue Amazing UI', 'TypeScript']"
      :highlight-style="{
        padding: '0 6px',
        borderRadius: '3px',
        display: 'inline-block',
        color: '#fff',
        background: '#1677ff',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }"
    />
    <h2 class="mt30 mb10">区分大小写</h2>
    <Highlight
      text="Vue Amazing UI 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接"
      :patterns="['Vue Amazing UI', 'typeScript']"
      case-sensitive
    />
    <h2 class="mt30 mb10">高亮标签</h2>
    <Highlight
      :text="text"
      :patterns="patterns"
      highlight-tag="span"
      :highlight-style="{ fontWeight: '500', color: '#ff6900', textDecoration: 'underline' }"
    />
  </div>
</template>
