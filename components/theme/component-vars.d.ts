/**
 * 组件级公开令牌注册表的**值**声明（实现见同名 `.js`）
 *
 * `.js` 是 Node 脚本与运行期共用的单一数据源；本文件只负责让 `vue-tsc` / Vite 能解析
 * `import ... from './component-vars.js'`，不参与运行时。
 *
 * 类型（`ThemeComponentKey` / `ComponentVarMeta` / `ThemeComponentMeta` / `ComponentThemeState`）
 * 在 `component-vars.types.ts` —— 手写的 `.d.ts` 不会被 `tsc` 搬进产物，而类型是公开 API，
 * 必须由编译器产出声明才能让使用方解析 `import type { ThemeComponentKey } from 'vue-amazing-ui'`。
 * 本文件因此只声明 `.js` 导出了哪些值，且保持被 `tsconfig.dts.json` 排除（产物中无此声明，运行时也不需要）。
 */

import type { ComponentVarMeta, ThemeComponentKey, ThemeComponentMeta } from './component-vars.types'

export declare const COMPONENT_VAR_NAMES: readonly string[]

export declare const COMPONENT_VARS: Record<string, ComponentVarMeta>

/** 支持 `theme.components.<Component>.primaryColor` 的公开令牌组件名 */
export declare const COMPONENT_THEME_NAMES: readonly string[]

/** 全部已接线组件（含只走内部桥变量、没有公开令牌映射的组件） */
export declare const THEME_COMPONENTS: readonly ThemeComponentMeta[]

/** 配置键集合 */
export declare const THEME_COMPONENT_KEYS: readonly ThemeComponentKey[]

/** 组件名 → 该组件带 `themeRole` 的令牌条目（运行期按组件取用，避免全表扫描） */
export declare const COMPONENT_VARS_BY_COMPONENT: Readonly<
  Record<string, ReadonlyArray<readonly [string, ComponentVarMeta]>>
>
