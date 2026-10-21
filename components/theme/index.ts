/**
 * 主题派生的库内出口
 *
 * 只包含纯函数与类型：不访问 DOM、不依赖 Vue，构建期（`build/gen-theme.ts`）与运行期共用。
 */

export {
  assertVarContract,
  createSeeds,
  DEFAULT_PRIMARY,
  DEFAULT_SEEDS,
  derive,
  deriveColorStates,
  deriveFocusShadow,
  isHexColor,
  normalizeSeedColor,
  SEED_KEYS
} from './derive'
export type { ColorStates, ResolvedSeeds, SeedKey, ThemeSeed } from './derive'
export { MODE_ATTRIBUTE, THEME_VAR_NAMES } from './vars'
export type { ResolvedMode, ThemeMode, ThemeSnapshot, ThemeVarName, ThemeVars } from './vars'
export {
  COMPONENT_THEME_NAMES,
  COMPONENT_VAR_NAMES,
  COMPONENT_VARS,
  COMPONENT_VARS_BY_COMPONENT,
  THEME_COMPONENTS,
  THEME_COMPONENT_KEYS
} from './component-vars.js'
// 类型从真实 `.ts` 出，不经过手写 `.d.ts`：后者不会被 tsc 搬进产物，转发的声明会在 `es|lib` 里悬空
export type {
  ComponentThemeState,
  ComponentVarMeta,
  ThemeComponentKey,
  ThemeComponentMeta
} from './component-vars.types'
