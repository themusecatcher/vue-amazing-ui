<script setup lang="ts">
import { computed, h } from 'vue'
import type { CSSProperties } from 'vue'
export interface Props {
  text?: string // 文本
  patterns?: string[] // 需要高亮的文本内容
  autoEscape?: boolean // 自动转义。默认情况下，patterns 中的元素会被转化为正则表达式进行匹配，这个过程中需要进行自动转义，正则表达式最终匹配的是元素的字面内容，例如 \( 匹配的就是 \(。如果你需要 n-highlight 组件去匹配使用 patterns 中元素本身构造的正则表达式，例如 \( 匹配的是 (，则可以设为 false。如果你看不懂这些，不要改这个设置。
  caseSensitive?: boolean // 区分大小写
  highlightTag?: string // 高亮内容的 HTML 元素类型
  highlightClass?: string // 高亮内容的类名
  highlightStyle?: CSSProperties // 高亮内容的样式
}
const props = withDefaults(defineProps<Props>(), {
  text: undefined,
  patterns: () => [],
  autoEscape: true,
  caseSensitive: false,
  highlightTag: 'mark',
  highlightClass: undefined,
  highlightStyle: () => ({})
})
const textOrVnodeChildren = computed(() => {
  if (props.patterns.length === 0 || !props.text) {
    return [props.text]
  } else {
    const patternStr = props.patterns.map((word) => (props.autoEscape ? escapeRegExp(word) : word)).join('|')
    const regex = new RegExp(`(${patternStr})`, props.caseSensitive ? 'g' : 'gi')
    const splitItems = splitAndMarkByRegex(props.text, regex)
    return splitItems.map((item: { text: string; isMatch: boolean }) => {
      if (item.isMatch) {
        return h(
          props.highlightTag,
          {
            class: ['highlight-mark', props.highlightClass],
            style: props.highlightStyle
          },
          item.text
        )
      }
      return item.text
    })
  }
})
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function splitAndMarkByRegex(str: string, regex: RegExp): Array<{ text: string; isMatch: boolean }> {
  const result = []
  let lastIndex = 0
  let match
  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      result.push({
        text: str.slice(lastIndex, match.index),
        isMatch: false
      })
    }
    result.push({
      text: match[0],
      isMatch: true
    })
    lastIndex = regex.lastIndex
    if (!regex.global) {
      break
    }
  }
  if (lastIndex < str.length) {
    result.push({
      text: str.slice(lastIndex),
      isMatch: false
    })
  }
  return result
}
</script>
<template>
  <span class="m-highlight">
    <template v-for="(textOrVnode, index) in textOrVnodeChildren" :key="index">
      <template v-if="typeof textOrVnode === 'string'">{{ textOrVnode }}</template>
      <component v-else :is="textOrVnode" />
    </template>
  </span>
</template>   
