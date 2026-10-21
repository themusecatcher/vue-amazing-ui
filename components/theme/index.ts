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
