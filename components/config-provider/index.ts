import ConfigProvider from './ConfigProvider.vue'
import { withInstall } from '../utils/type'

export type { Props as ConfigProviderProps } from './ConfigProvider.vue'
export type { ComponentThemeConfig, ConfigProviderTheme, ThemeComponentKey, ThemeConfig } from './theme-scope'
export type { ThemeSeed, ThemeMode, ResolvedMode, ThemeVars, ThemeSnapshot } from '../theme'

export default withInstall(ConfigProvider)
