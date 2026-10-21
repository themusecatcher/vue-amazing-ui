<script setup lang="ts">
import { provide } from 'vue'
import type { VNode } from 'vue'
import { createZIndexManager, Z_INDEX_INJECT_KEY } from 'components/utils'
import { useThemeScope } from './theme-scope'
import type { ThemeConfig } from './theme-scope'

export interface Props {
  /** 主题：种子 + 模式 + 组件级主色；未传时不写任何变量，使用静态默认表 */
  theme?: ThemeConfig
  /**
   * 是否不渲染 DOM 包裹元素
   *
   * 默认 `false`：渲染包裹元素，变量与 `data-va-mode` 写在该元素上，只作用于自身子树 ——
   * 与组件树的组合语义一致，SSR 首帧可直接序列化。Teleport 到 body 的浮层由边界转发补齐
   * （浮层根节点自带当前作用域的令牌与模式，见 `THEME_TELEPORT_KEY`），因此不需要为了浮层
   * 把主题抬到 `<html>`。
   *
   * 传 `true` 时：不产生包裹节点，最顶层实例写 `<html>` —— 用于「应用级主题」，
   * 使页面链接、body 级元素与所有浮层共享同一套变量；多实例同时存在时按挂载顺序仲裁
   * 唯一写入者（见 theme-scope）。
   *
   * 注意：只有 `theme.components` 而没有 `seed` / `mode` 时，`abstract: true` 不参与
   * `<html>` 写入（否则会在卸载时误清其它实例写入的全局变量），开发环境会告警；
   * 应用级组件配置请与 `seed` / `mode` 同层，或改用 `abstract: false`。
   */
  abstract?: boolean
  /** ConfigProvider 被渲染成的元素，abstract 为 false 时有效 */
  tag?: string
  /** 浮层起始层级 (z-index)，传入后甲、乙两类浮层按「后出现者在上」自增分配；不传则各组件沿用自身默认层级 */
  baseZIndex?: number
}
// 声明组件插槽类型
export interface ConfigProviderSlots {
  default?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  theme: undefined,
  abstract: false,
  tag: 'div',
  baseZIndex: undefined
})
defineSlots<ConfigProviderSlots>()
// 主题域：合并种子 → 派生 → 写作用域（最外层写 <html>，嵌套写包裹元素）
const { scopeStyle, scopeMode } = useThemeScope({
  getTheme: () => props.theme,
  getAbstract: () => props.abstract
})
// 层级管理层：传入 baseZIndex 时建立分配器并向下注入，甲、乙两类浮层据此自增分配；
// 未传则不注入，各组件回退到自身既有硬编码层级（可关闭开关）。嵌套 ConfigProvider 未传时会继承外层分配器。
// 注：在 setup 阶段读取一次，运行期改变 baseZIndex 需重新挂载才生效。
if (typeof props.baseZIndex === 'number') {
  provide(Z_INDEX_INJECT_KEY, createZIndexManager(props.baseZIndex))
}
</script>
<template>
  <slot v-if="abstract"></slot>
  <component v-else :is="tag" class="config-provider-wrap" :style="scopeStyle" :data-va-mode="scopeMode">
    <slot></slot>
  </component>
</template>
