/**
 * 主题变量契约（消费面）
 *
 * 别名变量是组件唯一可见的颜色入口：组件样式只允许 `var(--va-*)`，色值只允许出现在
 * 构建产物 `components/style/generated/theme.css` 与组件 Local 变量的默认值中。
 *
 * 命名口径：`--va-<role>[-<subrole>]-<type>[-<state>]`，角色在左、细分用途居中、类型在右、
 * 状态最右，最多四段。派生规则为色阶索引映射（见 `derive.ts`）。
 */

/**
 * 颜色别名清单（42 个，增删必须同步更新本节与派生函数的返回键集合）
 *
 * 准入标准：每个变量必须至少有一个组件消费者。零消费的「预留位」会让使用者覆盖后
 * 毫无效果，比没有这个变量更糟；确需扩展时先找到消费点再加。
 */
export const THEME_VAR_NAMES = [
  '--va-primary-color',
  '--va-primary-color-hover',
  '--va-primary-color-active',
  '--va-primary-bg-color',
  '--va-primary-border-color',
  '--va-primary-text-color',
  '--va-text-color-solid',
  '--va-success-color',
  '--va-success-bg-color',
  '--va-success-border-color',
  '--va-warning-color',
  '--va-warning-bg-color',
  '--va-warning-border-color',
  '--va-error-color',
  '--va-error-bg-color',
  '--va-error-border-color',
  '--va-info-color',
  '--va-info-bg-color',
  '--va-info-border-color',
  '--va-text-color-1',
  '--va-text-color-2',
  '--va-text-color-3',
  '--va-text-color-disabled',
  '--va-bg-container-color',
  '--va-bg-elevated-color',
  '--va-bg-layout-color',
  '--va-bg-spotlight-color',
  '--va-bg-brand-dark-color',
  '--va-bg-brand-dark-deep-color',
  '--va-border-color',
  '--va-border-split-color',
  '--va-fill-color-1',
  '--va-fill-color-2',
  '--va-fill-color-3',
  '--va-fill-color-4',
  '--va-shadow-color',
  '--va-focus-shadow',
  '--va-popup-shadow',
  '--va-mask-color',
  '--va-link-color',
  '--va-link-color-hover',
  '--va-link-color-active'
] as const

/** 别名变量名（含 `--va-` 前缀） */
export type ThemeVarName = (typeof THEME_VAR_NAMES)[number]

/** 变量名 → sRGB 色值（`#hex` 或 `rgba()`） */
export type ThemeVars = Record<ThemeVarName, string>

/** 只读快照：仅供 canvas / SVG / 第三方 JS 读取，禁止借它写行内变量 */
export type ThemeSnapshot = Readonly<ThemeVars>

/* -------------------------------------------------------------------------- */
/* 模式（派生入参，不是另一套种子）                                             */
/* -------------------------------------------------------------------------- */

/** 使用者可传的模式 */
export type ThemeMode = 'light' | 'dark' | 'auto'

/** 派生函数的实际入参 */
export type ResolvedMode = 'light' | 'dark'

/** 暗色默认表的宿主选择器属性（写在 `<html>` 或嵌套作用域的包裹元素上） */
export const MODE_ATTRIBUTE = 'data-va-mode'
