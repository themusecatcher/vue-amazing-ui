import type { InjectionKey } from 'vue'

/**
 * 「跳过把主题色阶写入全局 CSS 变量」的注入键。
 *
 * 该写入只应由**应用最外层**的 ConfigProvider 执行：`createDiscreteApi` 会在其独立应用内
 * 再挂一个 ConfigProvider（上层没有 `common` 注入），若它也写入，会覆盖主应用写入的
 * `--link-*`，并在 `dispose()` 时把它们一并移除（主应用不会重跑写入）。离散实例经由
 * 此键显式跳过，其浮层链接配色沿用主应用主题。
 */
export const SKIP_LINK_CSS_VARS_KEY: InjectionKey<boolean> = Symbol('skipLinkCssVars')
