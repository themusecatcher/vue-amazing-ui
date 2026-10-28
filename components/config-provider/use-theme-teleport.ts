/**
 * Teleport 浮层的主题转发
 *
 * 变量写在包裹元素上时，Teleport 到 body 的浮层拿不到 DOM 继承（Vue 的 inject 还在，
 * CSS 继承链断了），因此由 Provider 把「当前作用域真实生效的内容」下发到浮层根节点。
 *
 * 这里只负责「确定需要转发之后，转发什么」；是否需要转发由编排层判定（依赖祖先作用域、
 * 是否拿到 `<html>` 写入权、`mode="auto"` 首帧延迟等）。
 *
 * 两条刻意规则（都对应过真实缺陷）：
 * - 没有生效种子时不带全局变量表：否则默认色表会被内联到浮层，覆盖宿主用纯 CSS 写在
 *   `:root` 上的主题；
 * - 未显式配置 mode 时不下发 `data-va-mode`：让浮层继续继承 `<html>` 上的模式，而不是
 *   被强制成 `light`（宿主可能用纯 CSS `data-va-mode` 切暗色）。
 */

import type { ResolvedMode, ThemeSnapshot } from '../theme'
import type { TeleportTheme } from './context'

export interface TeleportThemeInput {
  /** 当前作用域是否配置了有效种子 */
  seeded: boolean
  /** 是否显式配置了 `mode`（`light` / `dark` / `auto`） */
  explicitMode: boolean
  /**
   * 惰性取 42 个全局变量的派生结果
   *
   * 只有 `seeded` 为 true 时才会调用：只配置 `theme.components` 时不应触发 `derive`
   * （与「未配置种子不派生」的口径保持一致）。
   */
  getSnapshot: () => ThemeSnapshot
  /** 组件级主色变量（必须与全局变量一起带走，否则组件配置在弹层内失效） */
  componentVars: Readonly<Record<string, string>>
  /** 当前作用域解析后的模式 */
  mode: ResolvedMode
}

/**
 * 组装转发内容（纯函数，便于单测）
 *
 * 调用方需先确认「确实需要转发」且不处于 `mode="auto"` 的首帧延迟期。
 */
export function resolveTeleportTheme(input: TeleportThemeInput): TeleportTheme {
  return {
    vars: { ...(input.seeded ? input.getSnapshot() : {}), ...input.componentVars },
    mode: input.seeded || input.explicitMode ? input.mode : undefined
  }
}
