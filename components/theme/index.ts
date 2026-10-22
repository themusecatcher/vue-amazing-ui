/**
 * 主题派生的库内出口
 *
 * 只包含纯函数与类型：不访问 DOM、不依赖 Vue，构建期（`build/gen-theme.ts`）与运行期共用。
 *
 * 只聚合「运行期真正会被引用」的成员：入口按需引入时会经过本地常量再导出（见下），
 * 而产物只保留入口或库内实际引用到的绑定 —— 仅构建期 / 测试使用的成员（`assertVarContract`、
 * `createSeeds`、`isHexColor`、`SEED_KEYS`、`COMPONENT_*` 注册表）请直接从 `./derive`、
 * `./component-vars.js` 引入，否则会形成「index.d.ts 有声明、index.js 无导出」的错位。
 */

import * as deriveSource from './derive'
import * as varsSource from './vars'
import * as componentVarsSource from './component-vars.js'

export type { ColorStates, ResolvedSeeds, SeedKey, ThemeSeed } from './derive'
export type { ResolvedMode, ThemeMode, ThemeSnapshot, ThemeVarName, ThemeVars } from './vars'
// 类型从真实 `.ts` 出，不经过手写 `.d.ts`：后者不会被 tsc 搬进产物，转发的声明会在 `es|lib` 里悬空
export type {
  ComponentThemeState,
  ComponentVarMeta,
  ThemeComponentKey,
  ThemeComponentMeta
} from './component-vars.types'

// 经本地常量再导出（同 grid/index.ts）：纯转发模块会被 Rollup 转发优化整体剔除产物 JS，
// 而 index.d.ts 仍会生成，致深层路径 `vue-amazing-ui/es|lib/theme` 报 ERR_MODULE_NOT_FOUND
export const DEFAULT_PRIMARY = deriveSource.DEFAULT_PRIMARY
export const DEFAULT_SEEDS = deriveSource.DEFAULT_SEEDS
export const derive = deriveSource.derive
export const deriveColorStates = deriveSource.deriveColorStates
export const deriveFocusShadow = deriveSource.deriveFocusShadow
export const normalizeSeedColor = deriveSource.normalizeSeedColor
export const MODE_ATTRIBUTE = varsSource.MODE_ATTRIBUTE
export const THEME_VAR_NAMES = varsSource.THEME_VAR_NAMES
export const COMPONENT_VARS_BY_COMPONENT = componentVarsSource.COMPONENT_VARS_BY_COMPONENT
export const THEME_COMPONENT_KEYS = componentVarsSource.THEME_COMPONENT_KEYS
