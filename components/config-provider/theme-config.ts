/**
 * ConfigProvider 的配置结构与小判定
 *
 * 单独成文件的原因：编排（`theme-scope`）、`<html>` 写入（`theme-global-writer`）、
 * 浮层转发（`use-theme-teleport`）与种子派生（`use-theme-seed`）都需要这些类型和判定；
 * 放在编排文件里会让子模块反向依赖编排层，形成循环依赖。
 *
 * 这里的函数全部是纯函数（不读写 DOM、不依赖 Vue），可直接单测。
 */

import type { ThemeMode, ThemeSeed } from '../theme'
import { THEME_COMPONENT_KEYS, type ThemeComponentKey } from '../theme/component-vars.js'

export type { ThemeComponentKey }

/** 单个组件的粗粒度主题配置：只放“通用主色”，细节令牌仍由组件 CSS 公开 */
export interface ComponentThemeConfig {
  /**
   * 组件主色：只接受不透明 `#rgb` / `#rrggbb` / `#rrggbbff`（8 位仅当 alpha 为 `ff`，
   * 与 `seed` 同一归一化口径），按色阶派生 base / hover / active / bg / border / solid
   */
  primaryColor?: string
}

/** 主题结构：颜色种子 + 模式 + 组件级主色 */
export interface ThemeConfig {
  seed?: ThemeSeed
  mode?: ThemeMode
  /**
   * 组件级主色：键为组件名（如 `Button` / `Slider`），值为 `{ primaryColor }`。
   *
   * 键类型收窄为 `ThemeComponentKey`（39 个已接线组件）：写错组件名在编译期即报错，
   * 不再依赖开发环境告警。未接线的组件（如 `Divider` / `Dropdown`）确实无法配置，
   * 需要时用嵌套 `ConfigProvider` 或 `--va-<component>-*` 令牌。
   *
   * - 组件配置优先于 `seed`（组件令牌覆盖全局令牌）；
   * - 运行期移除某个组件的配置会回落到 `seed`；
   * - 组件细节（如 Slider 的 rail / handle / tooltip）仍用 `--va-<component>-*` 覆盖，
   *   不进入 `components` 配置面。
   */
  components?: Partial<Record<ThemeComponentKey, ComponentThemeConfig>>
}

/** 使用者传入的主题结构（别名，与文档契约同名） */
export type ConfigProviderTheme = ThemeConfig

/** 主题是否真的被配置过：空对象 / 空种子 / 空组件配置视为未配置（默认不写） */
export function hasThemeConfig(theme: ThemeConfig | undefined): theme is ThemeConfig {
  return hasGlobalConfig(theme) || hasComponentConfig(theme)
}

/** 是否配置了全局主题域（seed 或 mode）：只有它参与 `<html>` 写入权仲裁 */
export function hasGlobalConfig(theme: ThemeConfig | undefined): boolean {
  return theme?.mode !== undefined || hasSeed(theme)
}

/** 是否传了非空种子（决定是否需要写全局变量；只切 mode 时交给静态表） */
export function hasSeed(theme: ThemeConfig | undefined): boolean {
  return hasSeedValue(theme?.seed)
}

/** 种子对象本身是否非空 */
export function hasSeedValue(seed: ThemeSeed | undefined): seed is ThemeSeed {
  return seed !== undefined && Object.keys(seed).length > 0
}

/** 是否传了有效的组件级配置（至少一个组件写了 primaryColor） */
export function hasComponentConfig(theme: ThemeConfig | undefined): boolean {
  const components = theme?.components
  if (!components) {
    return false
  }
  return Object.values(components).some((config) => config?.primaryColor !== undefined)
}

/** 把 `InputSearch` 之类的组件键转成 `--va-cp-input-search-*` 的 kebab 段 */
export function componentKeyToKebab(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/** 支持 `theme.components.<Component>.primaryColor` 的组件集合（运行期键来自运行期数据，故放宽为 string） */
export const COMPONENT_THEME_SUPPORT: ReadonlySet<string> = new Set(THEME_COMPONENT_KEYS)
